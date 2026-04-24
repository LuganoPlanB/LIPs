"""Tests for approving draft LIPs."""

from __future__ import annotations

import tempfile
import unittest
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path

from scripts.approve_lip import approve_lip, next_lip_number


class ApproveLipTests(unittest.TestCase):
    """Exercise the draft-to-numbered-LIP workflow."""

    def make_repo(self) -> tempfile.TemporaryDirectory[str]:
        """Create a minimal temporary repository shape."""
        temp = tempfile.TemporaryDirectory()
        root = Path(temp.name)
        (root / "README.md").write_text("# LIPs\n", encoding="utf-8")
        (root / "scripts").mkdir()
        return temp

    def test_next_lip_number_ignores_drafts_and_translations(self) -> None:
        with self.make_repo() as temp_path:
            root = Path(temp_path)
            (root / "lip-0001.md").write_text("", encoding="utf-8")
            (root / "lip-0001-it.md").write_text("", encoding="utf-8")
            (root / "lip-example-draft.md").write_text("", encoding="utf-8")

            self.assertEqual(next_lip_number(root), 2)

    def test_approve_lip_assigns_number_and_metadata(self) -> None:
        with self.make_repo() as temp_path:
            root = Path(temp_path)
            (root / "lip-0001.md").write_text("", encoding="utf-8")
            draft = root / "lip-example-draft.md"
            draft.write_text(
                "# Example Proposal\n"
                "```\n"
                "Author: Ada Lovelace\n"
                "Discussions-To: https://example.test/discuss\n"
                "Status: Draft\n"
                "Type: Informational\n"
                "Created: 2026-01-01\n"
                "```\n"
                "\n"
                "# Abstract\n"
                "\n"
                "Body.\n",
                encoding="utf-8",
            )

            with redirect_stdout(StringIO()):
                target = approve_lip(
                    draft,
                    root,
                    status="Accepted",
                    created="2026-04-24",
                    keep_source=False,
                )

            self.assertEqual(target.name, "lip-0002.md")
            self.assertFalse(draft.exists())
            self.assertEqual(
                target.read_text(encoding="utf-8"),
                "```\n"
                "LIP: 2\n"
                "Title: Example Proposal\n"
                "Author: Ada Lovelace\n"
                "Discussions-To: https://example.test/discuss\n"
                "Status: Accepted\n"
                "Type: Informational\n"
                "Created: 2026-04-24\n"
                "```\n"
                "\n"
                "# Abstract\n"
                "\n"
                "Body.\n",
            )

    def test_keep_source_copies_draft(self) -> None:
        with self.make_repo() as temp_path:
            root = Path(temp_path)
            draft = root / "lip-example-draft.md"
            draft.write_text(
                "# Example Proposal\n"
                "```\n"
                "Author: Ada Lovelace\n"
                "Status: Draft\n"
                "Type: Informational\n"
                "Created: 2026-01-01\n"
                "```\n"
                "\n"
                "# Abstract\n",
                encoding="utf-8",
            )

            with redirect_stdout(StringIO()):
                target = approve_lip(
                    draft,
                    root,
                    status="Accepted",
                    created="2026-04-24",
                    keep_source=True,
                )

            self.assertEqual(target.name, "lip-0001.md")
            self.assertTrue(draft.exists())


if __name__ == "__main__":
    unittest.main()
