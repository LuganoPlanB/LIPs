/** Supported translation codes in display order. */
export const SUPPORTED_LANGUAGES = ["en", "it", "de", "fr"];

const DEFAULT_LANGUAGE = "en";
const LIP_FILE_RE = /^..\/(lip-(\d{4})(?:-([a-z]{2}))?)\.md$/;

/**
 * Normalizes a language code to the supported set.
 *
 * @param {string | null | undefined} value
 * @returns {string}
 */
export function normalizeLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value) ? value : DEFAULT_LANGUAGE;
}

/**
 * Parses the imported markdown module map into browsable LIP metadata.
 *
 * @param {Record<string, () => Promise<string>>} modules
 * @returns {Array<{id: string, title: string, languages: string[], files: Record<string, string>}>}
 */
export function collectLipLibrary(modules) {
  const lips = new Map();

  for (const path of Object.keys(modules)) {
    const match = path.match(LIP_FILE_RE);
    if (!match) {
      continue;
    }

    const [, , id, rawLanguage] = match;
    const fileName = path.replace("../", "");
    const language = normalizeLanguage(rawLanguage);
    const entry = lips.get(id) ?? {
      id,
      title: `LIP ${id}`,
      languages: [],
      files: {},
      explicitLanguages: {},
    };

    if (!entry.files[language] || rawLanguage) {
      entry.files[language] = fileName;
      entry.explicitLanguages[language] = Boolean(rawLanguage);
    }
    if (!entry.languages.includes(language)) {
      entry.languages.push(language);
    }
    lips.set(id, entry);
  }

  return [...lips.values()]
    .map(({ explicitLanguages, ...entry }) => ({
      ...entry,
      languages: [...entry.languages].sort(
        (left, right) =>
          SUPPORTED_LANGUAGES.indexOf(left) - SUPPORTED_LANGUAGES.indexOf(right),
      ),
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
}

/**
 * Finds the nearest valid document selection for the requested LIP and language.
 *
 * @param {Array<{id: string, title: string, languages: string[], files: Record<string, string>}>} library
 * @param {string | null | undefined} lipId
 * @param {string | null | undefined} language
 * @returns {{lip: {id: string, title: string, languages: string[], files: Record<string, string>} | null, language: string}}
 */
export function resolveSelection(library, lipId, language) {
  const fallbackLip = library[0] ?? null;
  const lip = library.find((entry) => entry.id === lipId) ?? fallbackLip;

  if (!lip) {
    return { lip: null, language: normalizeLanguage(language) };
  }

  const normalizedLanguage = normalizeLanguage(language);
  const selectedLanguage = lip.files[normalizedLanguage]
    ? normalizedLanguage
    : lip.languages[0];

  return { lip, language: selectedLanguage };
}

/**
 * Creates previous and next links for the current selection.
 *
 * @param {Array<{id: string, title: string, languages: string[], files: Record<string, string>}>} library
 * @param {{id: string, title: string, languages: string[], files: Record<string, string>}} currentLip
 * @returns {{previous: object | null, next: object | null}}
 */
export function findNeighbors(library, currentLip) {
  const index = library.findIndex((entry) => entry.id === currentLip.id);

  return {
    previous: index > 0 ? library[index - 1] : null,
    next: index >= 0 && index < library.length - 1 ? library[index + 1] : null,
  };
}
