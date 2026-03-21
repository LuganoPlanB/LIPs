#!/usr/bin/env python3
"""Lint and optionally rewrite LIP markdown files to 72 columns."""

from __future__ import annotations

import argparse
import re
import sys
import textwrap
from pathlib import Path

WIDTH = 72
LIST_MARKER_RE = re.compile(r"^\s*(?:[*+-]\s+|\d+\.\s+)")
BLOCK_MARKER_RE = re.compile(r"^\s*(?:#{1,6}\s|>|---+$|\*\*\*+$|___+$)")
FENCE_RE = re.compile(r"^\s*```")


def is_list_line(line: str) -> bool:
    """Return True when the line starts a markdown list item."""
    return bool(LIST_MARKER_RE.match(line))


def is_block_line(line: str) -> bool:
    """Return True when the line should be preserved as-is."""
    return bool(BLOCK_MARKER_RE.match(line))


def wrap_paragraph(lines: list[str]) -> list[str]:
    """Wrap a plain paragraph to the configured width."""
    text = " ".join(part.strip() for part in lines)
    if not text:
        return []
    return textwrap.wrap(
        text,
        width=WIDTH,
        break_long_words=False,
        break_on_hyphens=False,
    )


def format_markdown(text: str) -> str:
    """Wrap plain paragraphs while keeping markdown block structure intact."""
    source = text.splitlines()
    output: list[str] = []
    paragraph: list[str] = []
    in_fence = False
    in_list = False

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            output.extend(wrap_paragraph(paragraph))
            paragraph = []

    for line in source:
        if FENCE_RE.match(line):
            flush_paragraph()
            in_list = False
            in_fence = not in_fence
            output.append(line)
            continue

        if in_fence:
            output.append(line)
            continue

        if not line.strip():
            flush_paragraph()
            in_list = False
            output.append("")
            continue

        if in_list:
            output.append(line.rstrip())
            continue

        if is_list_line(line):
            flush_paragraph()
            in_list = True
            output.append(line.rstrip())
            continue

        if is_block_line(line):
            flush_paragraph()
            output.append(line.rstrip())
            continue

        paragraph.append(line)

    flush_paragraph()
    return "\n".join(output) + "\n"


def lint_file(path: Path, write: bool) -> bool:
    """Check one file and optionally rewrite it in place."""
    original = path.read_text(encoding="utf-8")
    formatted = format_markdown(original)
    if formatted == original:
        print(f"ok: {path}")
        return True

    if write:
        path.write_text(formatted, encoding="utf-8")
        print(f"fixed: {path}")
        return True

    print(f"needs-wrap: {path}")
    return False


def build_parser() -> argparse.ArgumentParser:
    """Create the command line interface."""
    parser = argparse.ArgumentParser(
        description="Lint LIP markdown files and wrap plain text to 72 columns."
    )
    parser.add_argument("paths", nargs="+", help="Files to lint.")
    parser.add_argument(
        "--write",
        action="store_true",
        help="Rewrite files in place instead of only reporting issues.",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    """Run the linter."""
    args = build_parser().parse_args(argv)
    ok = True

    for raw_path in args.paths:
        path = Path(raw_path)
        if not path.is_file():
            print(f"missing: {path}", file=sys.stderr)
            ok = False
            continue
        ok = lint_file(path, args.write) and ok

    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
