"""Validate the static adventure's local links, assets, and basic accessibility."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[str] = []
        self.errors: list[str] = []
        self.ids: set[str] = set()
        self.main_count = 0
        self.title_depth = 0
        self.title_text: list[str] = []
        self.has_language = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)

        if tag == "html" and values.get("lang"):
            self.has_language = True
        if tag == "main":
            self.main_count += 1
        if tag == "title":
            self.title_depth += 1
        if tag == "img" and not values.get("alt"):
            self.errors.append("image is missing non-empty alt text")
        if "autoplay" in values:
            self.errors.append(f"<{tag}> must not autoplay")

        element_id = values.get("id")
        if element_id:
            if element_id in self.ids:
                self.errors.append(f"duplicate id #{element_id}")
            self.ids.add(element_id)

        for attribute in ("href", "src"):
            value = values.get(attribute)
            if value:
                self.references.append(value)

    def handle_data(self, data: str) -> None:
        if self.title_depth:
            self.title_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "title" and self.title_depth:
            self.title_depth -= 1


def local_target(page: Path, reference: str) -> Path | None:
    parsed = urlparse(reference)
    if parsed.scheme or parsed.netloc or reference.startswith(("#", "mailto:", "tel:")):
        return None
    relative = unquote(parsed.path)
    if not relative:
        return None
    return (page.parent / relative).resolve()


def main() -> int:
    pages = sorted(ROOT.glob("*.html"))
    failures: list[str] = []
    reference_count = 0

    if len(pages) != 15:
        failures.append(f"expected 15 HTML pages, found {len(pages)}")

    for page in pages:
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))

        if not parser.has_language:
            parser.errors.append("document language is missing")
        if parser.main_count != 1:
            parser.errors.append(f"expected one <main>, found {parser.main_count}")
        if not "".join(parser.title_text).strip():
            parser.errors.append("document title is empty")
        if "main-content" not in parser.ids:
            parser.errors.append("#main-content skip target is missing")

        for reference in parser.references:
            target = local_target(page, reference)
            if target is None:
                continue
            reference_count += 1
            try:
                target.relative_to(ROOT)
            except ValueError:
                parser.errors.append(f"reference leaves repository: {reference}")
                continue
            if not target.exists():
                parser.errors.append(f"missing target: {reference}")

        failures.extend(f"{page.name}: {error}" for error in parser.errors)

    if failures:
        print("Static site validation failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"Validated {len(pages)} pages and {reference_count} local references.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
