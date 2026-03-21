# LIPs: Lugano Improvement Proposals

This repository contains Lugano Improvement Proposals (LIPs): concise, versioned documents used to propose, discuss, and track improvements to Lugano’s civic digital infrastructure and related public processes.

For the full purpose, roles, workflow, and required sections, see [LIP-0001](lip-0001.md).

## Contributing

1. Open an issue to outline the problem and proposed direction.
2. Submit a draft LIP as a pull request.

Draft filename: `lip-<author>-<short-title>.md`
After assignment: `lip-XXXX.md`

## Linting

Run `python3 scripts/liplint.py lip-*.md` to check wrapping.

Run `python3 scripts/liplint.py --write lip-*.md` to rewrite plain
paragraphs to 72 columns while preserving markdown lists and fenced
code blocks.
