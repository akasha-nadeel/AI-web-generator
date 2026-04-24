import type { Element } from "domhandler";
import { getOuterHTML, textContent } from "domutils";
import type { ParsedHtml } from "./parser.ts";

const SECTION_TAGS = new Set(["header", "nav", "section", "footer", "main", "aside"]);

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
  let mainCounter = 1;

  // Buffer of consecutive non-sectioning children. Flushed into a single
  // synthetic "Main"/"Content" component whenever a real section tag appears
  // or we finish walking. This preserves top-level <nav> + semantic sections
  // while still capturing the AI's div-wrapped content that would otherwise
  // be dropped on the floor.
  let buffer: Element[] = [];
  const flushBuffer = (): void => {
    if (buffer.length === 0) return;
    const html = buffer.map((el) => getOuterHTML(el)).join("");
    const textLen = html.replace(/<[^>]+>/g, "").trim().length;
    if (textLen > 0) {
      const baseName = mainCounter === 1 ? "Main" : `Main${mainCounter}`;
      const name = uniquify(baseName, usedNames);
      sections.push({
        id: mainCounter === 1 ? "main" : `main-${mainCounter}`,
        name,
        tag: "main",
        html: `<main>${html}</main>`,
      });
      mainCounter++;
    }
    buffer = [];
  };

  for (const child of body.children) {
    if (child.type !== "tag") continue;
    const el = child as Element;
    // <script> and <style> are inert at this layer — the translator strips
    // them. Skip so they neither get their own component nor pad a Main.
    if (el.name === "script" || el.name === "style") continue;

    if (SECTION_TAGS.has(el.name)) {
      flushBuffer();
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
    } else {
      buffer.push(el);
    }
  }
  flushBuffer();

  return sections;
}

export function firstHeadingText(el: Element): string | null {
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

export function pascalCase(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("")
    .slice(0, 40);
}

export function slugify(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

export function uniquify(name: string, used: Set<string>): string {
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
