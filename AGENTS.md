# Repository Guidelines

## Project Structure & Module Organization

This repository hosts Lugano Improvement Proposals (LIPs) and the small
Vite reader used to render them.

- `lip-0001.md` defines the LIP process, required sections, and lifecycle.
- `lip-*.md` files are proposal documents and translations.
- Accepted LIPs should be available in four languages: English, Italian,
  German, and French. Use suffixes such as `lip-0002-it.md`,
  `lip-0002-de.md`, and `lip-0002-fr.md`; the unsuffixed assigned file may
  serve as the English source.
- `scripts/liplint.py` checks and rewrites proposal paragraph wrapping.
- `tests/` contains Python tests for the linter.
- `src/lips/` contains the reader domain and Markdown rendering code, with
  colocated `.test.mjs` files.
- `src/theme/` is a nested theme package with its own `AGENTS.md`.

## Build, Test, and Development Commands

- `npm install` installs Vite and the local `src/theme` dependency.
- `npm run dev` starts the local Vite reader.
- `npm run build` builds the static reader.
- `npm run preview` previews the built output.
- `python3 scripts/liplint.py lip-*.md` checks LIP Markdown wrapping.
- `python3 scripts/liplint.py --write lip-*.md` normalizes plain paragraphs to
  72 columns while preserving lists and fenced code blocks.
- `scripts/approve_lip.py lip-<author>-<short-title>.md` assigns the next
  `lip-XXXX.md` number and marks a ready draft as accepted.

Run theme-package commands from `src/theme/` when changing that package.

## Coding Style & Naming Conventions

Prefer simple, readable code and small direct changes. JavaScript
modules use `.mjs` in `src/lips/`; keep domain logic separated from
rendering and IO. Markdown proposal drafts use
`lip-<author>-<short-title>.md`; assigned proposals use `lip-XXXX.md`.
Keep LIP prose concise, standards-track in tone, and aligned with the
terminology in `lip-0001.md`.

## Testing Guidelines

Use the smallest relevant test surface for code changes. Run Python
linter tests when touching `scripts/liplint.py` or `tests/`. Run the
colocated Node tests when changing `src/lips/*.mjs`. For Markdown-only
changes, run `liplint` on the touched LIP files.

## Commit & Pull Request Guidelines

History mostly follows short conventional commits such as `feat: ...`,
`fix: ...`, and `ci: ...`; keep using that style. PRs should describe
the proposal or behavior change, link the relevant issue, and state the
validation commands run. Include screenshots only for reader or theme UI
changes.

## Agent-Specific Instructions

Do not over-engineer. Prefer minimal, clear edits and avoid new
dependencies unless explicitly requested. For larger planned work, write
detailed Org plans under `.gestalt/plans/<topic>.org`; do not commit
`.gestalt` files.
