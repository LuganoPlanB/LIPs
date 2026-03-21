import test from "node:test";
import assert from "node:assert/strict";

import { renderMarkdown } from "./markdown.mjs";

test("renderMarkdown renders headings and paragraphs", () => {
  const html = renderMarkdown("# Title\n\nThis is a paragraph.\n");

  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /<p>This is a paragraph\.<\/p>/);
});

test("renderMarkdown renders unordered lists", () => {
  const html = renderMarkdown("* first\n* second\n");

  assert.equal(html, "<ul><li>first</li><li>second</li></ul>");
});

test("renderMarkdown keeps indented list details in the same item", () => {
  const html = renderMarkdown("* Preamble\n  RFC 822 style headers.\n");

  assert.equal(html, "<ul><li>Preamble RFC 822 style headers.</li></ul>");
});

test("renderMarkdown preserves fenced blocks and links", () => {
  const html = renderMarkdown(
    "```\nLIP: 1\n```\n\nSee [repo](https://example.com).\n",
  );

  assert.match(html, /<pre><code>LIP: 1<\/code><\/pre>/);
  assert.match(html, /<a href="https:\/\/example\.com">repo<\/a>/);
});
