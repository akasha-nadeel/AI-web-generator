// Splits an HTML document into top-level sections for scoped editing.
//
// Why this exists: regenerating a 20k-char site to change one hero is
// slow, expensive, and risks truncation. By isolating the section(s) that
// actually change, we keep the prompt small and splice byte-exact elsewhere.
//
// Strategy: walk <section>, <header>, <footer>, <nav>, <main>, <aside>
// tags with a tag-name stack. Only OUTERMOST matches count — nested
// sections inside another are ignored (they'll travel with their parent).

// Tags we treat as top-level layout sections.
// NOTE: <main> and <article> are CONTAINERS that typically wrap many
// <section>s — including them here would collapse the whole page into one
// span and defeat scoping. We deliberately skip them so their children
// become the sections.
const SECTION_TAGS = ["section", "header", "footer", "nav", "aside"] as const;
const SECTION_TAG_SET = new Set<string>(SECTION_TAGS);

export interface SectionSpan {
  index: number;        // position in the returned array
  tag: string;          // lowercase tag name, e.g. "section"
  start: number;        // byte offset of opening "<" in the original HTML
  end: number;          // byte offset one past the closing ">"
  content: string;      // html.substring(start, end), includes outer tag
  preview: string;      // short text extract for the classifier
}

export interface SectionSplit {
  sections: SectionSpan[];
  // Pieces of HTML BETWEEN sections (including the shell — doctype, <html>,
  // <head>, <body> open, anything loose, and the closing tags). Length is
  // sections.length + 1. Concatenating interleaved is the original HTML.
  gaps: string[];
}

function buildPreview(content: string, max = 120): string {
  // Strip tags, collapse whitespace, take first N chars.
  const text = content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max) + "…" : text;
}

/**
 * Tokenize HTML at the level of start/end tags for the section tags we care
 * about. Returns null if the HTML is too malformed to split reliably — the
 * caller should fall back to full-HTML regen in that case.
 */
export function splitSections(html: string): SectionSplit | null {
  if (typeof html !== "string" || html.length < 100) return null;

  // Match either an opening or closing tag for any section tag.
  // We deliberately don't try to be a full HTML parser — this only needs to
  // handle AI-generated markup, which is well-formed ~99% of the time.
  const tagRegex = /<(\/?)(section|header|footer|nav|main|aside)\b([^>]*)>/gi;

  const spans: SectionSpan[] = [];
  const stack: Array<{ tag: string; startIdx: number }> = [];
  let m: RegExpExecArray | null;

  while ((m = tagRegex.exec(html)) !== null) {
    const isClosing = m[1] === "/";
    const tag = m[2].toLowerCase();
    if (!SECTION_TAG_SET.has(tag)) continue;

    if (!isClosing) {
      // Opening tag. Record its position only if we're at depth 0 —
      // nested openings still get pushed so closings balance, but with
      // startIdx: -1 so we know to ignore them when closing.
      stack.push({
        tag,
        startIdx: stack.length === 0 ? m.index : -1,
      });
    } else {
      // Closing tag. Only pop if it matches the top of the stack.
      // If not, the HTML is mismatched — bail out to fallback.
      if (stack.length === 0) return null;
      const top = stack[stack.length - 1];
      if (top.tag !== tag) return null;
      stack.pop();
      if (top.startIdx >= 0 && stack.length === 0) {
        // This was a top-level section — record its span.
        const end = m.index + m[0].length;
        const content = html.substring(top.startIdx, end);
        spans.push({
          index: spans.length,
          tag,
          start: top.startIdx,
          end,
          content,
          preview: buildPreview(content),
        });
      }
    }
  }

  if (stack.length !== 0) return null; // unbalanced
  if (spans.length < 2) return null;   // nothing useful to scope

  // Build gaps (everything between sections, plus before/after).
  const gaps: string[] = [];
  let cursor = 0;
  for (const s of spans) {
    gaps.push(html.substring(cursor, s.start));
    cursor = s.end;
  }
  gaps.push(html.substring(cursor));

  return { sections: spans, gaps };
}

/**
 * Rebuild the full HTML from a split, with some sections replaced.
 * `replacements` maps section index → new content (including outer tag).
 * Indexes not present in the map keep their original content.
 */
export function spliceSections(
  split: SectionSplit,
  replacements: Map<number, string>
): string {
  const parts: string[] = [];
  for (let i = 0; i < split.sections.length; i++) {
    parts.push(split.gaps[i]);
    const replaced = replacements.get(i);
    parts.push(replaced ?? split.sections[i].content);
  }
  parts.push(split.gaps[split.gaps.length - 1]);
  return parts.join("");
}

// Sentinel markers used when asking the editor model to return only the
// modified sections. Chosen to be exotic enough that natural HTML won't
// collide with them, and easy to regex out.
export const SCOPE_START = (n: number) => `<!-- WVSCOPE:${n}:START -->`;
export const SCOPE_END = (n: number) => `<!-- WVSCOPE:${n}:END -->`;

/**
 * Parse a model response that should contain zero or more
 *   <!-- WVSCOPE:N:START -->...<!-- WVSCOPE:N:END -->
 * blocks. Returns a map of section index → new content. Non-marker text
 * between/around blocks is ignored (models sometimes narrate).
 */
export function parseScopedResponse(raw: string): Map<number, string> {
  const out = new Map<number, string>();
  // Match the whole block; capture the index and the inner content.
  // [\s\S] so we cross newlines without the /s flag (for TS target compat).
  const blockRegex = /<!--\s*WVSCOPE:(\d+):START\s*-->([\s\S]*?)<!--\s*WVSCOPE:\1:END\s*-->/g;
  let m: RegExpExecArray | null;
  while ((m = blockRegex.exec(raw)) !== null) {
    const idx = parseInt(m[1], 10);
    if (Number.isFinite(idx)) {
      out.set(idx, m[2].trim());
    }
  }
  return out;
}
