const LIST_ITEM_RE = /^\s*[*+-]\s+/;
const HEADING_RE = /^(#{1,6})\s+(.*)$/;
const FENCE_RE = /^\s*```/;

/**
 * Renders the subset of markdown used by the LIP documents.
 *
 * @param {string} markdown
 * @returns {string}
 */
export function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (FENCE_RE.test(line)) {
      const codeLines = [];
      index += 1;

      while (index < lines.length && !FENCE_RE.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      output.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(HEADING_RE);
    if (heading) {
      const level = heading[1].length;
      output.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (LIST_ITEM_RE.test(line)) {
      const items = [];

      while (index < lines.length && LIST_ITEM_RE.test(lines[index])) {
        const itemLines = [lines[index].replace(LIST_ITEM_RE, "").trim()];
        index += 1;

        while (index < lines.length && lines[index].trim() && !LIST_ITEM_RE.test(lines[index])) {
          itemLines.push(lines[index].trim());
          index += 1;
        }

        items.push(itemLines.join(" "));
      }

      output.push(
        `<ul>${items
          .map((item) => `<li>${renderInline(item)}</li>`)
          .join("")}</ul>`,
      );
      continue;
    }

    const paragraph = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !FENCE_RE.test(lines[index]) &&
      !HEADING_RE.test(lines[index]) &&
      !LIST_ITEM_RE.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    output.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return output.join("\n");
}

/**
 * Renders inline markdown tokens used in the LIPs.
 *
 * @param {string} text
 * @returns {string}
 */
function renderInline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

/**
 * Escapes HTML-sensitive characters.
 *
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
