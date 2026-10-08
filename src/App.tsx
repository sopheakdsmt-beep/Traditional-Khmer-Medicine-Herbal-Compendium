import { useEffect, useMemo, useState } from "react";
import { ailments, formulas, plantById, plants } from "./data";
import { clashesFor, humoralLabel, matchingAilments, searchPlants } from "./logic";
import { HabitPlate, SectionPlate } from "./plates";
import type { Lang, PlateView, Plant, WarningSeverity } from "./types";

const severityRank: Record<WarningSeverity, number> = {
  contraindication: 0,
  interaction: 1,
  caution: 2,
};

export function App() {
  const [lang, setLang] = useState<Lang>("kh");
  const [query, setQuery] = useState("");
  const [ailmentId, setAilmentId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState(plants[0].id);
  const [view, setView] = useState<PlateView>("habit");
  const [anatomyId, setAnatomyId] = useState<string | null>(plants[0].anatomy[0]?.id ?? null);
  const [tray, setTray] = useState<string[]>([]);
  const [zoom, setZoom] = useState(false);
  const [prepIndex, setPrepIndex] = useState(0);

  const results = useMemo(() => searchPlants(query, ailmentId), [query, ailmentId]);
  const visibleAilments = useMemo(() => matchingAilments(query), [query]);
  const selected = plantById.get(selectedId) ?? results[0] ?? plants[0];
  const preparation = selected.preparations[prepIndex] ?? selected.preparations[0];
  const clashes = useMemo(() => clashesFor(tray), [tray]);
  const activeAilment = ailments.find((item) => item.id === ailmentId) ?? null;
  const suggested = formulas.filter((formula) =>
    activeAilment ? formula.ailmentId === activeAilment.id : tray.length > 0 && formula.plantIds.every((id) => tray.includes(id)),
  );
  const anatomy = selected.anatomy.find((mark) => mark.id === anatomyId) ?? selected.anatomy[0];

  useEffect(() => {
    if (results.length === 0) return;
    if (!results.some((plant) => plant.id === selectedId)) {
      setSelectedId(results[0].id);
    }
  }, [results, selectedId]);

  useEffect(() => {
    setPrepIndex(0);
    setAnatomyId(selected.anatomy[0]?.id ?? null);
    setView("habit");
    setZoom(false);
  }, [selected.id]);

  const primary = (kh: string, en: string) => (lang === "kh" ? kh : en);
  const secondary = (kh: string, en: string) => (lang === "kh" ? en : kh);

  function toggleAilment(id: string) {
    setAilmentId((current) => (current === id ? null : id));
  }

  function toggleTray(id: string) {
    setTray((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <div className="app">
      <header className="mast">
        <div className="brand">
          <span className="seal" aria-hidden="true">
            ឱ
          </span>
          <div>
            <p className="eyebrow">Traditional Khmer Medicine</p>
            <h1>{primary("បណ្ណាល័យឱសថបុរាណ និងរុក្ខជាតិឱសថ", "Khmer Herbal Compendium")}</h1>
            <p className="brand-sub">
              {secondary("បណ្ណាល័យឱសថបុរាណ និងរុក្ខជាតិឱសថ", "Khmer Herbal Compendium")}
            </p>
          </div>
        </div>
        <div className="mast-actions">
          <p className="study-note">
            {primary(
              "កម្រិតក្នុងទីនេះជាការកត់ត្រាប្រពៃណីសម្រាប់សិក្សា មិនមែនវេជ្ជបញ្ជា។",
              "Doses here are traditional study notes, not a prescription.",
            )}
          </p>
          <div className="lang" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === "kh"} onClick={() => setLang("kh")}>
              ខ្មែរ
            </button>
            <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
        </div>
      </header>

      <div className="workspace">
        <aside className="rail">
          <label className="search">
            <span>{primary("ស្វែងរករោគ ឬរុក្ខជាតិ", "Search ailment or plant")}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={primary("គ្រុនក្តៅ · ស្លឹកបាស · Curcuma", "fever · slok bas · Curcuma")}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </label>

          <div className="ailment-row" role="listbox" aria-label={primary("រោគសញ្ញា", "Ailments")}>
            {visibleAilments.map((ailment) => (
              <button
                key={ailment.id}
                type="button"
                className={ailmentId === ailment.id ? "chip on" : "chip"}
                aria-pressed={ailmentId === ailment.id}
                onClick={() => toggleAilment(ailment.id)}
              >
                <strong>{primary(ailment.khmer, ailment.english)}</strong>
                <small>{secondary(ailment.khmer, ailment.english)}</small>
              </button>
            ))}
          </div>

          {activeAilment && (
            <p className="quality">
              {primary(activeAilment.qualityKh, activeAilment.qualityEn)}
            </p>
          )}

          <p className="count">
            {results.length} {primary("រុក្ខជាតិ", "plants")}
          </p>

          <ul className="plant-list">
            {results.map((plant) => (
              <li key={plant.id}>
                <button
                  type="button"
                  className={plant.id === selected.id ? "plant on" : "plant"}
                  onClick={() => setSelectedId(plant.id)}
                >
                  <span className={`dot ${plant.humoral}`} aria-hidden="true" />
                  <span>
                    <strong>{primary(plant.khmer, plant.english)}</strong>
                    <small>
                      {secondary(plant.khmer, plant.english)} · <em>{plant.latin}</em>
                    </small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <p className="empty">{primary("ពុំឃើញក្នុងបណ្ណាល័យនេះ។", "Nothing in this compendium matches.")}</p>
          )}
        </aside>

        <section className="plate-pane" aria-label={primary("ផ្ទាំងរុក្ខជាតិ", "Botanical plate")}>
          <div className="plate-tools">
            <div className="segmented" role="group" aria-label={primary("ទិដ្ឋភាព", "View")}>
              <button type="button" aria-pressed={view === "habit"} onClick={() => setView("habit")}>
                {primary("ទម្រង់ដើម", "Habit")}
              </button>
              <button type="button" aria-pressed={view === "section"} onClick={() => setView("section")}>
                {primary("កាត់ផ្តេក", "Cross-section")}
              </button>
            </div>
            <button type="button" className="zoom" aria-pressed={zoom} onClick={() => setZoom((value) => !value)}>
              {zoom ? primary("មើលទាំងផ្ទាំង", "Fit plate") : primary("ពង្រីក", "Enlarge")}
            </button>
          </div>
          <div className={zoom ? "plate-scroll zoomed" : "plate-scroll"}>
            {view === "habit" ? (
              <HabitPlate plant={selected} />
            ) : (
              <SectionPlate
                plant={selected}
                activeId={anatomy?.id ?? null}
                onSelect={(id) => setAnatomyId(id)}
              />
            )}
          </div>
          {view === "section" && anatomy && (
            <article className="callout">
              <p className="callout-kicker">
                {selected.anatomy.findIndex((mark) => mark.id === anatomy.id) + 1}.{" "}
                {primary(anatomy.labelKh, anatomy.labelEn)}
              </p>
              <h2>{secondary(anatomy.labelKh, anatomy.labelEn)}</h2>
              <p>{primary(anatomy.noteKh, anatomy.noteEn)}</p>
              <div className="callout-picks">
                {selected.anatomy.map((mark, index) => (
                  <button
                    key={mark.id}
                    type="button"
                    className={mark.id === anatomy.id ? "mini on" : "mini"}
                    onClick={() => setAnatomyId(mark.id)}
                  >
                    {index + 1}. {primary(mark.labelKh, mark.labelEn)}
                  </button>
                ))}
              </div>
            </article>
          )}
          {view === "habit" && (
            <article className="callout">
              <p className="callout-kicker">{primary("សញ្ញាសម្គាល់", "Field marks")}</p>
              <h2>{primary(selected.khmer, selected.english)}</h2>
              <p>{primary(selected.identifyKh, selected.identifyEn)}</p>
              <p className="habitat">{primary(selected.habitatKh, selected.habitatEn)}</p>
            </article>
          )}
        </section>

        <section className="reading" aria-label={primary("រូបមន្ត", "Preparation")}>
          <header className="identity">
            <p className="latin">
              {selected.latin} · {selected.family}
            </p>
            <h2>{primary(selected.khmer, selected.english)}</h2>
            <p className="roman">
              {secondary(selected.khmer, selected.english)} · {selected.roman}
            </p>
            <ul className="meta">
              <li className={`pill ${selected.humoral}`}>
                {primary("គុណ", "Quality")} · {humoralLabel(selected, lang)}
              </li>
              <li>{primary(selected.tasteKh, selected.tasteEn)}</li>
              <li>{primary(selected.partsKh, selected.partsEn)}</li>
            </ul>
            <ul className="tag-row">
              {[...selected.warnings]
                .sort((a, b) => severityRank[a.severity] - severityRank[b.severity])
                .map((warning) => (
                  <li key={warning.tagEn} className={`tag-pill ${warning.severity}`}>
                    {primary(warning.tagKh, warning.tagEn)}
                  </li>
                ))}
            </ul>
            <button
              type="button"
              className={tray.includes(selected.id) ? "tray-add in" : "tray-add"}
              onClick={() => toggleTray(selected.id)}
            >
              {tray.includes(selected.id)
                ? primary("ដកចេញពីរូបមន្ត", "Remove from formula")
                : primary("ដាក់ក្នុងរូបមន្ត", "Add to formula")}
            </button>
          </header>

          {selected.preparations.length > 1 && (
            <div className="prep-switch">
              {selected.preparations.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={index === prepIndex ? "chip on" : "chip"}
                  onClick={() => setPrepIndex(index)}
                >
                  {primary(item.nameKh, item.nameEn)}
                </button>
              ))}
            </div>
          )}

          {preparation && (
            <div className="columns">
              <article>
                <p className="form-label">
                  {primary(preparation.formKh, preparation.formEn)}
                </p>
                <h3>{primary(preparation.nameKh, preparation.nameEn)}</h3>
                <p className="quiet">{secondary(preparation.nameKh, preparation.nameEn)}</p>
                <ol className="steps">
                  {(lang === "kh" ? preparation.stepsKh : preparation.stepsEn).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <ol className="steps ghost">
                  {(lang === "kh" ? preparation.stepsEn : preparation.stepsKh).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
              <article className="dose-card">
                <h3>{primary("កម្រិត និងរយៈពេល", "Dose and course")}</h3>
                <p>{primary(preparation.doseKh, preparation.doseEn)}</p>
                <p className="quiet">{secondary(preparation.doseKh, preparation.doseEn)}</p>
                <h3>{primary("ពេលណាត្រូវឈប់", "When to stop")}</h3>
                <p>{primary(preparation.courseKh, preparation.courseEn)}</p>
                <p className="quiet">{secondary(preparation.courseKh, preparation.courseEn)}</p>
                <h3>{primary("ស្លាកប្រុងប្រយ័ត្ន", "Warning tags")}</h3>
                <ul className="tags">
                  {[...selected.warnings]
                    .sort((a, b) => severityRank[a.severity] - severityRank[b.severity])
                    .map((warning) => (
                      <li key={warning.tagEn} className={`tag ${warning.severity}`}>
                        <strong>{primary(warning.tagKh, warning.tagEn)}</strong>
                        <span>{primary(warning.detailKh, warning.detailEn)}</span>
                        <small>{secondary(warning.detailKh, warning.detailEn)}</small>
                      </li>
                    ))}
                </ul>
              </article>
            </div>
          )}

          {suggested.length > 0 && (
            <div className="patterns">
              <h3>{primary("រូបមន្តដែលមានកត់ត្រា", "Recorded patterns")}</h3>
              {suggested.map((formula) => (
                <article key={formula.id}>
                  <header>
                    <strong>{primary(formula.nameKh, formula.nameEn)}</strong>
                    <button type="button" onClick={() => setTray(formula.plantIds)}>
                      {primary("ដាក់គ្រឿងទាំងនេះ", "Load these plants")}
                    </button>
                  </header>
                  <p>{primary(formula.useKh, formula.useEn)}</p>
                  <p className="quiet">
                    {formula.plantIds
                      .map((id) => plantById.get(id))
                      .filter((plant): plant is Plant => Boolean(plant))
                      .map((plant) => primary(plant.khmer, plant.english))
                      .join(" · ")}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <footer className={clashes.length ? "dock alert" : "dock"}>
        <div className="dock-copy">
          <p className="eyebrow">{primary("រូបមន្តកំពុងផ្គុំ", "Formula tray")}</p>
          {tray.length === 0 ? (
            <p>{primary("ប៉ះ «ដាក់ក្នុងរូបមន្ត» ដើម្បីពិនិត្យគូហាម។", "Add plants to check incompatible pairs.")}</p>
          ) : clashes.length === 0 ? (
            <p>{primary("ពុំឃើញគូបញ្ច្រាសក្នុងថាសនេះ។", "No opposing pair in this tray.")}</p>
          ) : (
            <p>
              {primary("មានគូហាម", "Incompatible pair")}:{" "}
              {clashes
                .map((clash) => `${primary(clash.a.khmer, clash.a.english)} + ${primary(clash.b.khmer, clash.b.english)}`)
                .join(" · ")}
            </p>
          )}
        </div>
        <ul className="tray">
          {tray.map((id) => {
            const plant = plantById.get(id);
            if (!plant) return null;
            const hot = clashes.some((clash) => clash.a.id === id || clash.b.id === id);
            return (
              <li key={id}>
                <button type="button" className={hot ? "tray-chip hot" : "tray-chip"} onClick={() => toggleTray(id)}>
                  {primary(plant.khmer, plant.english)}
                  <span aria-hidden="true"> ×</span>
                </button>
              </li>
            );
          })}
        </ul>
        {clashes[0] && (
          <p className="clash-reason">{primary(clashes[0].reasonKh, clashes[0].reasonEn)}</p>
        )}
      </footer>
    </div>
  );
}
