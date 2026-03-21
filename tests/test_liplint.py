"""Tests for the LIP markdown linter."""

from __future__ import annotations

import unittest

from scripts.liplint import format_markdown


class FormatMarkdownTests(unittest.TestCase):
    """Exercise the minimal markdown wrapping rules."""

    def test_wraps_plain_paragraphs_to_72_columns(self) -> None:
        source = (
            "This is a long paragraph that should be wrapped to seventy two columns "
            "without changing the markdown meaning of the document.\n"
        )

        expected = (
            "This is a long paragraph that should be wrapped to seventy two columns\n"
            "without changing the markdown meaning of the document.\n"
        )

        self.assertEqual(format_markdown(source), expected)

    def test_preserves_list_items(self) -> None:
        source = (
            "* this is a very long list item that should stay on one line even if it "
            "goes past the wrapping limit because list structure must not be broken\n"
            "* second item\n"
        )

        self.assertEqual(format_markdown(source), source)

    def test_preserves_list_continuation_lines(self) -> None:
        source = (
            "* item\n"
            "  continuation text that should remain attached to the list item even if "
            "it is longer than seventy two columns and would otherwise be wrapped\n"
        )

        self.assertEqual(format_markdown(source), source)

    def test_preserves_fenced_code_blocks(self) -> None:
        source = (
            "```\n"
            "Title: A line that is intentionally much longer than seventy two columns "
            "and must remain untouched inside a fenced block\n"
            "```\n"
        )

        self.assertEqual(format_markdown(source), source)


if __name__ == "__main__":
    unittest.main()
