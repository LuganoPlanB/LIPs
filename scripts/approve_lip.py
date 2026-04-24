#!/usr/bin/env python3
"""Approve a draft LIP by assigning the next repository number."""

from __future__ import annotations

import argparse
import re
import sys
from datetime import date
from pathlib import Path

NUMBERED_LIP_RE = re.compile(r"^lip-(\d{4})\.md$")
HEADING_RE = re.compile(r"^#\s+(.+?)\s*$")
HEADER_RE = re.compile(r"^([A-Za-z][A-Za-z-]*):\s*(.*)$")


def find_repo_root(start: Path) -> Path:
    """Return the nearest ancestor containing the repository README."""
    for path in [start, *start.parents]:
        if (path / "README.md").is_file() and (path / "scripts").is_dir():
            return path
    raise ValueError("could not find repository root")


def next_lip_number(repo_root: Path) -> int:
    """Return the next available numeric LIP identifier."""
    numbers = []
    for path in repo_root.glob("lip-*.md"):
        match = NUMBERED_LIP_RE.match(path.name)
        if match:
            numbers.append(int(match.group(1)))
    return max(numbers, default=0) + 1


def split_leading_title(text: str) -> tuple[str | None, str]:
    """Remove and return a leading H1 title when present."""
    lines = text.splitlines()
    if not lines:
        return None, text

    match = HEADING_RE.match(lines[0])
    if not match:
        return None, text

    rest = lines[1:]
    if rest and not rest[0].strip():
        rest = rest[1:]
    return match.group(1), "\n".join(rest) + "\n"


def parse_preamble(text: str) -> tuple[dict[str, str], list[str], str]:
    """Parse a leading fenced metadata preamble."""
    lines = text.splitlines()
    if not lines or lines[0].strip() != "```":
        raise ValueError("draft must start with a fenced metadata preamble")

    end = None
    for index, line in enumerate(lines[1:], start=1):
        if line.strip() == "```":
            end = index
            break
    if end is None:
        raise ValueError("metadata preamble fence is not closed")

    fields: dict[str, str] = {}
    order: list[str] = []
    for line in lines[1:end]:
        if not line.strip():
            continue
        match = HEADER_RE.match(line)
        if not match:
            raise ValueError(f"invalid metadata header: {line}")
        key, value = match.groups()
        fields[key] = value
        order.append(key)

    body = "\n".join(lines[end + 1 :])
    if body and not body.endswith("\n"):
        body += "\n"
    return fields, order, body.lstrip("\n")


def render_preamble(
    fields: dict[str, str],
    order: list[str],
    lip_number: int,
    title: str,
    status: str,
    created: str,
) -> str:
    """Render canonical approved metadata while preserving optional headers."""
    fields = dict(fields)
    fields["LIP"] = str(lip_number)
    fields["Title"] = title
    fields["Status"] = status
    fields["Created"] = created

    canonical = [
        "LIP",
        "Title",
        "Author",
        "Authors",
        "Discussions-To",
        "Status",
        "Type",
        "Created",
    ]
    rendered_order: list[str] = []
    for key in canonical:
        if key in fields and key not in rendered_order:
            rendered_order.append(key)
    for key in order:
        if key in fields and key not in rendered_order:
            rendered_order.append(key)

    lines = ["```"]
    lines.extend(f"{key}: {fields[key]}" for key in rendered_order)
    lines.append("```")
    return "\n".join(lines) + "\n\n"


def approve_lip(
    draft_path: Path,
    repo_root: Path,
    status: str,
    created: str,
    keep_source: bool,
) -> Path:
    """Approve a draft LIP and return the assigned file path."""
    source = draft_path.resolve()
    if not source.is_file():
        raise ValueError(f"missing draft: {draft_path}")
    if source.parent != repo_root.resolve():
        raise ValueError("draft must be a top-level LIP Markdown file")
    if NUMBERED_LIP_RE.match(source.name):
        raise ValueError("draft is already a numbered LIP")

    lip_number = next_lip_number(repo_root)
    target = repo_root / f"lip-{lip_number:04d}.md"
    if target.exists():
        raise ValueError(f"target already exists: {target}")

    title, remainder = split_leading_title(source.read_text(encoding="utf-8"))
    fields, order, body = parse_preamble(remainder)
    title = title or fields.get("Title")
    if not title:
        raise ValueError("draft needs either a leading H1 or a Title header")

    approved = render_preamble(fields, order, lip_number, title, status, created) + body
    target.write_text(approved, encoding="utf-8")
    if keep_source:
        print(f"created: {target}")
    else:
        source.unlink()
        print(f"renamed: {source.name} -> {target.name}")
    return target


def build_parser() -> argparse.ArgumentParser:
    """Create the command line interface."""
    parser = argparse.ArgumentParser(
        description="Assign the next LIP number and mark a draft as accepted."
    )
    parser.add_argument("draft", help="Top-level draft LIP Markdown file.")
    parser.add_argument(
        "--status",
        default="Accepted",
        help="Approved status to write. Defaults to Accepted.",
    )
    parser.add_argument(
        "--date",
        default=date.today().isoformat(),
        help="Created date to write in ISO format. Defaults to today.",
    )
    parser.add_argument(
        "--keep-source",
        action="store_true",
        help="Copy to the numbered LIP instead of renaming the draft.",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    """Run the approval command."""
    args = build_parser().parse_args(argv)
    draft = Path(args.draft)

    try:
        repo_root = find_repo_root(Path.cwd())
        approve_lip(draft, repo_root, args.status, args.date, args.keep_source)
    except ValueError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    except OSError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
