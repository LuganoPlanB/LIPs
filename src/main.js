import "lugano-planb-vite-theme/theme.css";
import "./lips/lips.css";
import { mountPlanBHeader } from "lugano-planb-vite-theme";
import {
  collectLipLibrary,
  findNeighbors,
  resolveSelection,
  SUPPORTED_LANGUAGES,
} from "./lips/domain.mjs";
import { renderMarkdown } from "./lips/markdown.mjs";

const app = document.querySelector("#app");
const lipModules = import.meta.glob("../lip-*.md", {
  query: "?raw",
  import: "default",
});
const library = collectLipLibrary(lipModules);

mountPlanBHeader({
  target: app,
  headerContent: {
    eyebrow: "Lugano LIPS",
    title: "Lugano Improvement Proposals",
    lede: "Browse community-authored proposals in English, Italian, German, and French.",
  },
});

const content = document.createElement("main");
content.className = "planb-container planb-main";
app.append(content);

if (!library.length) {
  content.innerHTML = `
    <section class="planb-panel">
      <h2>No LIPs found</h2>
      <p class="lips-browser__empty">Add files named <code>lip-0001-en.md</code> and translations to browse them here.</p>
    </section>
  `;
} else {
  render();
}

window.addEventListener("popstate", render);

/**
 * Renders the LIP browser for the current URL state.
 */
async function render() {
  const selection = resolveSelection(
    library,
    currentUrl().searchParams.get("lip"),
    currentUrl().searchParams.get("lang"),
  );

  if (!selection.lip) {
    return;
  }

  syncUrl(selection.lip.id, selection.language);
  document.documentElement.lang = selection.language;

  const markdown = await loadLipMarkdown(selection.lip, selection.language);
  const neighbors = findNeighbors(library, selection.lip);

  content.innerHTML = `
    <section class="planb-panel lips-browser">
      <div class="lips-browser__controls">
        <label class="lips-browser__label">
          <span>Proposal</span>
          <select class="lips-browser__select" data-role="lip-select">
            ${library
              .map(
                (lip) =>
                  `<option value="${lip.id}" ${
                    lip.id === selection.lip.id ? "selected" : ""
                  }>${lip.title}</option>`,
              )
              .join("")}
          </select>
        </label>
        <div class="lips-browser__languages" role="group" aria-label="Language selection">
          ${SUPPORTED_LANGUAGES.map((language) =>
            `<button class="lips-browser__lang" type="button" data-role="language" data-language="${language}" aria-pressed="${
              language === selection.language
            }" ${selection.lip.files[language] ? "" : "disabled"}>${language}</button>`,
          ).join("")}
        </div>
      </div>

      <div class="lips-browser__meta">
        <span>Viewing LIP ${selection.lip.id}</span>
        <span>Language: ${selection.language.toUpperCase()}</span>
        <span>Available: ${selection.lip.languages
          .map((language) => language.toUpperCase())
          .join(", ")}</span>
      </div>

      <div class="lips-browser__links">
        ${renderNeighborLink("Previous", neighbors.previous, selection.language)}
        ${renderNeighborLink("Next", neighbors.next, selection.language)}
      </div>

      <article class="lips-browser__document">
        ${renderMarkdown(markdown)}
      </article>
    </section>
  `;

  wireControls(selection);
}

/**
 * Loads the selected markdown file as raw text.
 *
 * @param {{files: Record<string, string>}} lip
 * @param {string} language
 * @returns {Promise<string>}
 */
function loadLipMarkdown(lip, language) {
  const modulePath = `../${lip.files[language]}`;
  return lipModules[modulePath]();
}

/**
 * Attaches events to proposal and language controls.
 *
 * @param {{lip: {id: string, files: Record<string, string>}, language: string}} selection
 */
function wireControls(selection) {
  content.querySelector("[data-role='lip-select']").addEventListener("change", (event) => {
    navigate(event.target.value, selection.language);
  });

  for (const button of content.querySelectorAll("[data-role='language']")) {
    button.addEventListener("click", () => {
      navigate(selection.lip.id, button.dataset.language);
    });
  }

  for (const link of content.querySelectorAll("[data-role='neighbor']")) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      navigate(link.dataset.lip, link.dataset.lang);
    });
  }
}

/**
 * Moves the app state to a different LIP or language.
 *
 * @param {string} lipId
 * @param {string} language
 */
function navigate(lipId, language) {
  const url = currentUrl();
  url.searchParams.set("lip", lipId);
  url.searchParams.set("lang", language);
  window.history.pushState({}, "", url);
  render();
}

/**
 * Rewrites the current URL when it does not match a valid selection.
 *
 * @param {string} lipId
 * @param {string} language
 */
function syncUrl(lipId, language) {
  const url = currentUrl();

  if (url.searchParams.get("lip") === lipId && url.searchParams.get("lang") === language) {
    return;
  }

  url.searchParams.set("lip", lipId);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url);
}

/**
 * Returns a mutable URL object for the current document location.
 *
 * @returns {URL}
 */
function currentUrl() {
  return new URL(window.location.href);
}

/**
 * Renders a previous or next link for the current language when available.
 *
 * @param {string} label
 * @param {{id: string, files: Record<string, string>, languages: string[]} | null} lip
 * @param {string} language
 * @returns {string}
 */
function renderNeighborLink(label, lip, language) {
  if (!lip) {
    return `<a class="lips-browser__nav" aria-disabled="true">${label}</a>`;
  }

  const targetLanguage = lip.files[language] ? language : lip.languages[0];
  return `<a class="lips-browser__nav" href="?lip=${lip.id}&lang=${targetLanguage}" data-role="neighbor" data-lip="${lip.id}" data-lang="${targetLanguage}">${label}: LIP ${lip.id}</a>`;
}
