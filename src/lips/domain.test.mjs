import test from "node:test";
import assert from "node:assert/strict";

import {
  SUPPORTED_LANGUAGES,
  collectLipLibrary,
  findNeighbors,
  normalizeLanguage,
  resolveSelection,
} from "./domain.mjs";

test("normalizeLanguage falls back to english", () => {
  assert.equal(normalizeLanguage("it"), "it");
  assert.equal(normalizeLanguage("es"), "en");
  assert.deepEqual(SUPPORTED_LANGUAGES, ["en", "it", "de", "fr"]);
});

test("collectLipLibrary groups translated files by LIP id", () => {
  const library = collectLipLibrary({
    "../lip-0001.md": async () => "",
    "../lip-0001-en.md": async () => "",
    "../lip-0001-it.md": async () => "",
    "../lip-0002-fr.md": async () => "",
    "../README.md": async () => "",
  });

  assert.equal(library.length, 2);
  assert.equal(library[0].id, "0001");
  assert.deepEqual(library[0].languages, ["en", "it"]);
  assert.equal(library[0].files.en, "lip-0001-en.md");
  assert.equal(library[1].files.fr, "lip-0002-fr.md");
});

test("resolveSelection picks the requested lip and best language fallback", () => {
  const library = collectLipLibrary({
    "../lip-0001-en.md": async () => "",
    "../lip-0001-de.md": async () => "",
  });

  const selection = resolveSelection(library, "0001", "fr");
  assert.equal(selection.lip.id, "0001");
  assert.equal(selection.language, "en");
});

test("findNeighbors returns previous and next lips", () => {
  const library = collectLipLibrary({
    "../lip-0001-en.md": async () => "",
    "../lip-0002-en.md": async () => "",
    "../lip-0003-en.md": async () => "",
  });

  const neighbors = findNeighbors(library, library[1]);
  assert.equal(neighbors.previous.id, "0001");
  assert.equal(neighbors.next.id, "0003");
});
