import type { Element } from "domhandler";
import { getOuterHTML, textContent } from "domutils";
import type { ParsedHtml } from "./parser.ts";

const SECTION_TAGS = new Set(["header", "section", "footer", "main", "aside"]);

export interface Section {
  /** DOM id attribute when present, else derived from heading or fallback. */
  id: string;
  /** PascalCase component name. */
  name: string;
  /** The original tag (header/section/footer/main/aside). */
  tag: string;
  /** Outer HTML of the section, ready to feed into the JSX converter. */
  html: string;
}

/**
 * Walks the body's direct children, picks every top-level sectioning tag,
 * and packages each into a {@link Section}. Skips text nodes and inline
 * cruft. Names are uniquified and PascalCased so they can become file +
 * component identifiers.
 */
export function extractSections(parsed: ParsedHtml): Section[] {
  const body = parsed.body;
  if (!body) return [];

  const usedNames = new Set<string>();
  const sections: Section[] = [];
  let fallbackCounter = 1;

  for (const child of body.children) {
    if (child.type !== "tag") continue;
    const el = child as Element;
    if (!SECTION_TAGS.has(el.name)) continue;

    const id = el.attribs.id ?? "";
    const heading = firstHeadingText(el);
    const baseName = pascalCase(id || heading || el.name) || `Section${fallbackCounter++}`;
    const name = uniquify(baseName, usedNames);
    sections.push({
      id: id || slugify(baseName),
      name,
      tag: el.name,
      html: getOuterHTML(el),
    });
  }

  return sections;
}

function firstHeadingText(el: Element): string | null {
  for (const tag of walkTags(el)) {
    if (tag.name === "h1" || tag.name === "h2" || tag.name === "h3") {
      const t = textContent(tag).trim();
      if (t) return t;
    }
  }
  return null;
}

function* walkTags(el: Element): Generator<Element> {
  yield el;
  for (const c of el.children) {
    if (c.type === "tag") yield* walkTags(c as Element);
  }
}

function pascalCase(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("")
    .slice(0, 40);
}

function slugify(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

function uniquify(name: string, used: Set<string>): string {
  if (!used.has(name)) {
    used.add(name);
    return name;
  }
  let n = 2;
  while (used.has(`${name}${n}`)) n++;
  const out = `${name}${n}`;
  used.add(out);
  return out;
}
