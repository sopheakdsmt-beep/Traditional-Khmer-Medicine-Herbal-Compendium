import assert from "node:assert/strict";
import test from "node:test";
import { clashesFor, matchingAilments, searchPlants } from "../src/logic.ts";

test("fever search finds ivy gourd by Khmer ailment", () => {
  const found = searchPlants("គ្រុនក្តៅ", null).map((plant) => plant.id);
  assert.ok(found.includes("slok-bas"));
  assert.ok(found.includes("sdav"));
  assert.equal(found.includes("romdeng"), false);
});

test("botanical name search finds turmeric", () => {
  const found = searchPlants("Curcuma", null);
  assert.equal(found.length, 1);
  assert.equal(found[0]?.khmer, "រមៀត");
});

test("local name search finds wild ginger aliases", () => {
  assert.equal(searchPlants("plai", null)[0]?.id, "khnhei-prey");
  assert.equal(searchPlants("ខ្ញីព្រៃ", null)[0]?.id, "khnhei-prey");
});

test("exact kitchen ginger ranks ahead of wild ginger", () => {
  const found = searchPlants("ខ្ញី", null).map((plant) => plant.id);
  assert.equal(found[0], "khnhei");
  assert.ok(found.includes("khnhei-prey"));
});

test("ailment filter narrows the atlas", () => {
  const stomach = searchPlants("", "gastritis").map((plant) => plant.id);
  assert.deepEqual(stomach.sort(), ["romiet", "slok-krey", "trachiak"].sort());
});

test("heating and cooling plants clash in one formula", () => {
  const clashes = clashesFor(["sdav", "khnhei", "slok-krey"]);
  assert.equal(clashes.length, 1);
  assert.equal(clashes[0]?.a.id === "sdav" || clashes[0]?.b.id === "sdav", true);
});

test("lemongrass stays compatible with both humoral sides", () => {
  assert.equal(clashesFor(["slok-krey", "sdav", "romiet"]).length, 0);
});

test("ailment chips follow a plant query", () => {
  const names = matchingAilments("ស្លឹកបាស").map((ailment) => ailment.id);
  assert.ok(names.includes("fever"));
  assert.equal(names.includes("postpartum"), false);
});
