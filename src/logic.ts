import { ailments, plantById, plants } from "./data.ts";
import type { Ailment, Plant } from "./types";

export type Clash = {
  a: Plant;
  b: Plant;
  reasonKh: string;
  reasonEn: string;
};

const fold = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .trim();

export function plantHaystack(plant: Plant): string {
  return fold(
    [
      plant.khmer,
      plant.roman,
      plant.latin,
      plant.english,
      plant.family,
      plant.partsKh,
      plant.partsEn,
      ...plant.aliases,
    ].join(" "),
  );
}

export function ailmentHaystack(ailment: Ailment): string {
  return fold(`${ailment.khmer} ${ailment.english}`);
}

function searchRank(plant: Plant, needle: string): number {
  const exact = [plant.khmer, plant.latin, plant.english, plant.roman, ...plant.aliases].map(fold);
  if (exact.some((field) => field === needle)) return 0;
  if (exact.some((field) => field.startsWith(needle))) return 1;
  return 2;
}

export function searchPlants(query: string, ailmentId: string | null): Plant[] {
  const needle = fold(query);
  return plants
    .filter((plant) => {
      const ailmentOk = !ailmentId || plant.ailments.includes(ailmentId);
      if (!ailmentOk) return false;
      if (!needle) return true;
      if (plantHaystack(plant).includes(needle)) return true;
      return plant.ailments.some((id) => {
        const ailment = ailments.find((item) => item.id === id);
        return ailment ? ailmentHaystack(ailment).includes(needle) : false;
      });
    })
    .sort((a, b) => searchRank(a, needle) - searchRank(b, needle));
}

export function matchingAilments(query: string): Ailment[] {
  const needle = fold(query);
  if (!needle) return ailments;
  return ailments.filter(
    (ailment) =>
      ailmentHaystack(ailment).includes(needle) ||
      plants.some(
        (plant) =>
          plant.ailments.includes(ailment.id) && plantHaystack(plant).includes(needle),
      ),
  );
}

export function clashesFor(ids: string[]): Clash[] {
  const found: Clash[] = [];
  const unique = [...new Set(ids)];
  for (let i = 0; i < unique.length; i += 1) {
    for (let j = i + 1; j < unique.length; j += 1) {
      const a = plantById.get(unique[i]);
      const b = plantById.get(unique[j]);
      if (!a || !b) continue;
      if (a.clashesWith.includes(b.id) || b.clashesWith.includes(a.id)) {
        const speaker = a.clashesWith.includes(b.id) ? a : b;
        found.push({
          a,
          b,
          reasonKh: speaker.clashKh,
          reasonEn: speaker.clashEn,
        });
      }
    }
  }
  return found;
}

export function humoralLabel(plant: Plant, lang: "kh" | "en"): string {
  const labels = {
    hot: { kh: "ក្តៅ", en: "Heating" },
    cold: { kh: "ត្រជាក់", en: "Cooling" },
    neutral: { kh: "អព្យាក្រឹត", en: "Neutral" },
  } as const;
  return labels[plant.humoral][lang];
}
