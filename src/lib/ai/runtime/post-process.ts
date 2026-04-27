/**
 * HTML post-processor — runs after Claude generates a site, before saving.
 *
 * Three jobs, ordered by risk (least → most):
 *   1. Inject the weavo-runtime script before </body> (idempotent)
 *   2. Add data-reveal to top-level sections that don't have it
 *   3. Add semantic IDs to sections + repair nav anchors
 *
 * All transforms are regex-based and fail soft: if a step can't run safely,
 * it's skipped rather than corrupting the document. The original AI output
 * always survives even if no enhancements apply.
 */

import { getRuntimeScriptTag, WEAVO_RUNTIME_MARKER } from "./weavo-runtime";

interface EnhanceResult {
  html: string;
  injectedRuntime: boolean;
  addedReveals: number;
  addedIds: number;
  fixedNavLinks: number;
  injectedViewport: boolean;
  responsiveWarnings: string[];
}

const SECTION_TAG_REGEX = /<(section|header|footer|main|aside)\b([^>]*)>/gi;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
}

function hasAttribute(attrs: string, name: string): boolean {
  return new RegExp(`\\b${name}\\s*=`, "i").test(attrs);
}

function getAttribute(attrs: string, name: string): string | null {
  const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? m[1] : null;
}

/**
 * Find the heading text inside a section's content slice.
 * Returns the inner text of the first h1/h2/h3 found, or null.
 */
function firstHeadingText(sectionContent: string): string | null {
  const m = sectionContent.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i);
  if (!m) return null;
  // Strip nested tags, collapse whitespace.
  return m[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Inject the runtime script before </body>. Idempotent — skips if already
 * present (detected via the marker comment).
 */
function injectRuntime(html: string): { html: string; injected: boolean } {
  if (html.includes(WEAVO_RUNTIME_MARKER)) return { html, injected: false };
  const tag = getRuntimeScriptTag();
  if (/<\/body>/i.test(html)) {
    return { html: html.replace(/<\/body>/i, `${tag}\n</body>`), injected: true };
  }
  // No </body> — append at end as last resort.
  return { html: html + "\n" + tag, injected: true };
}

/**
 * Add data-reveal to top-level <section>/<header>/<footer> tags that lack it.
 * We skip <header> when it sits inside the very first viewport (the hero
 * area) — that content is already visible on load and shouldn't fade in.
 */
function addReveals(html: string): { html: string; count: number } {
  let count = 0;
  let firstHeaderSeen = false;

  const result = html.replace(SECTION_TAG_REGEX, (match, tag: string, attrs: string) => {
    const tagLower = tag.toLowerCase();
    // Don't fade-in the first <header> (it's the top nav / hero region).
    if (tagLower === "header" && !firstHeaderSeen) {
      firstHeaderSeen = true;
      return match;
    }
    if (hasAttribute(attrs, "data-reveal") || hasAttribute(attrs, "data-reveal-stagger")) {
      return match;
    }
    count++;
    return `<${tag}${attrs} data-reveal>`;
  });

  return { html: result, count };
}

/**
 * Add semantic IDs to top-level sections that lack them, derived from
 * the first heading text inside. Returns the modified html and a map of
 * heading-text → id so we can repair nav links.
 */
function addSectionIds(html: string): {
  html: string;
  count: number;
  headingMap: Map<string, string>;
} {
  let count = 0;
  const usedIds = new Set<string>();
  const headingMap = new Map<string, string>(); // lowercased heading text → id

  // Pre-collect existing IDs so we don't collide.
  const existingIdRegex = /\bid\s*=\s*["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = existingIdRegex.exec(html)) !== null) usedIds.add(m[1]);

  // We need to look at the section's CONTENT to find the heading, which
  // means walking the document and tracking close tags. Use the same
  // tag-stack walker pattern as html-sections.ts but simpler.
  const tagRegex = /<(\/?)(section|header|footer|main|aside)\b([^>]*)>/gi;
  const stack: Array<{ tag: string; openIdx: number; openMatchEnd: number; attrs: string }> = [];
  const inserts: Array<{ at: number; text: string; attrs: string }> = [];

  let tm: RegExpExecArray | null;
  while ((tm = tagRegex.exec(html)) !== null) {
    const isClosing = tm[1] === "/";
    const tag = tm[2].toLowerCase();
    if (!isClosing) {
      stack.push({
        tag,
        openIdx: tm.index,
        openMatchEnd: tm.index + tm[0].length,
        attrs: tm[3],
      });
    } else {
      const top = stack.pop();
      if (!top || top.tag !== tag) continue;
      // Only operate on TOP-LEVEL sections (stack now empty).
      if (stack.length !== 0) continue;
      if (hasAttribute(top.attrs, "id")) {
        const existing = getAttribute(top.attrs, "id");
        // Even if it has an id, record the heading→id mapping for nav repair.
        const content = html.substring(top.openMatchEnd, tm.index);
        const heading = firstHeadingText(content);
        if (heading && existing) headingMap.set(heading.toLowerCase(), existing);
        continue;
      }
      const content = html.substring(top.openMatchEnd, tm.index);
      const heading = firstHeadingText(content);
      let id: string;
      if (heading) {
        id = slugify(heading);
        if (!id) id = top.tag;
      } else {
        id = top.tag;
      }
      // Ensure uniqueness.
      let candidate = id;
      let n = 2;
      while (usedIds.has(candidate)) candidate = `${id}-${n++}`;
      usedIds.add(candidate);
      if (heading) headingMap.set(heading.toLowerCase(), candidate);
      // Schedule an attribute insert at top.openMatchEnd-1 (just before '>').
      inserts.push({ at: top.openMatchEnd - 1, text: ` id="${candidate}"`, attrs: top.attrs });
      count++;
    }
  }

  // Apply inserts back-to-front so earlier offsets stay valid.
  inserts.sort((a, b) => b.at - a.at);
  let out = html;
  for (const ins of inserts) {
    out = out.substring(0, ins.at) + ins.text + out.substring(ins.at);
  }

  return { html: out, count, headingMap };
}

/**
 * Repair nav anchors: for each <a href="#xyz"> inside <nav>, if #xyz doesn't
 * resolve to any element ID, try to find a section whose heading text matches
 * the link's visible text and rewrite the href accordingly.
 */
function fixNavLinks(html: string, headingMap: Map<string, string>): { html: string; count: number } {
  let count = 0;
  // Collect all known IDs.
  const knownIds = new Set<string>();
  const idRegex = /\bid\s*=\s*["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = idRegex.exec(html)) !== null) knownIds.add(m[1]);

  const result = html.replace(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gi, (navMatch, navInner: string) => {
    const repaired = navInner.replace(
      /<a\b([^>]*?)href\s*=\s*["']#([^"']*)["']([^>]*)>([\s\S]*?)<\/a>/gi,
      (linkMatch, before: string, href: string, after: string, inner: string) => {
        if (href && knownIds.has(href)) return linkMatch;
        const linkText = inner
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        if (!linkText) return linkMatch;
        // Try exact heading match first, then partial.
        let target = headingMap.get(linkText);
        if (!target) {
          for (const [heading, id] of headingMap.entries()) {
            if (heading.includes(linkText) || linkText.includes(heading)) {
              target = id;
              break;
            }
          }
        }
        if (!target) return linkMatch;
        count++;
        return `<a${before}href="#${target}"${after}>${inner}</a>`;
      }
    );
    return navMatch.replace(navInner, repaired);
  });

  return { html: result, count };
}

/**
 * Ensure <meta name="viewport" content="width=device-width, initial-scale=1.0">
 * is present in <head>. Without it, mobile browsers render at desktop width
 * and zoom out — Tailwind breakpoints fire correctly in our preview iframes
 * but the site is broken on real phones. Universally needed; safe to inject.
 */
const VIEWPORT_META_REGEX = /<meta\s+[^>]*name\s*=\s*["']viewport["']/i;
const HEAD_OPEN_REGEX = /<head\b[^>]*>/i;

function ensureViewportMeta(html: string): { html: string; injected: boolean } {
  if (VIEWPORT_META_REGEX.test(html)) return { html, injected: false };
  if (!HEAD_OPEN_REGEX.test(html)) return { html, injected: false };
  return {
    html: html.replace(
      HEAD_OPEN_REGEX,
      (m) => `${m}\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">`
    ),
    injected: true,
  };
}

/**
 * Detection-only scan for two responsive red flags. We don't auto-fix —
 * rewriting class lists could damage carefully-tuned designs. The counts
 * are logged so we can see when the AI drifts and tighten the prompt.
 *
 *   1. Unprefixed `text-{6,7,8,9}xl` — applies to mobile, will overflow
 *      on a 375px viewport. Correct form is `text-3xl md:text-6xl` etc.
 *   2. Fixed `w-[Npx]` for N >= 400 with no responsive alternative on
 *      the same element — content wider than the smallest mobile
 *      viewport (~375px) almost always causes horizontal scroll.
 */
const OVERSIZE_TEXT_TOKEN = /^text-[6-9]xl$/;
const FIXED_WIDTH_TOKEN = /^w-\[(\d+)px\]$/;
const RESPONSIVE_WIDTH_HINT = /(?:^|\s)(?:sm:|md:|lg:|xl:|2xl:)w-/;
const CLASS_ATTR_REGEX = /\bclass\s*=\s*"([^"]*)"/gi;

function scanResponsiveWarnings(html: string): string[] {
  let oversizeText = 0;
  let fixedWidth = 0;
  let m: RegExpExecArray | null;
  while ((m = CLASS_ATTR_REGEX.exec(html)) !== null) {
    const classList = m[1];
    const tokens = classList.split(/\s+/).filter(Boolean);
    let hasResponsiveWidth: boolean | null = null;
    for (const tok of tokens) {
      if (OVERSIZE_TEXT_TOKEN.test(tok)) oversizeText++;
      const w = FIXED_WIDTH_TOKEN.exec(tok);
      if (w && parseInt(w[1], 10) >= 400) {
        if (hasResponsiveWidth === null) hasResponsiveWidth = RESPONSIVE_WIDTH_HINT.test(classList);
        if (!hasResponsiveWidth) fixedWidth++;
      }
    }
  }
  const warnings: string[] = [];
  if (oversizeText > 0) {
    warnings.push(`${oversizeText} unprefixed text-{6-9}xl (overflows mobile)`);
  }
  if (fixedWidth > 0) {
    warnings.push(`${fixedWidth} fixed w-[≥400px] without responsive alt`);
  }
  return warnings;
}

/**
 * Top-level entry point — runs all enhancements and returns the result
 * along with a small report for logging.
 */
export function enhanceGeneratedHtml(html: string): EnhanceResult {
  // Order matters: add IDs first so nav-link repair has a heading map to
  // resolve against, then reveals (cosmetic), then runtime (idempotent).
  const ids = addSectionIds(html);
  const nav = fixNavLinks(ids.html, ids.headingMap);
  const reveals = addReveals(nav.html);
  const runtime = injectRuntime(reveals.html);
  const viewport = ensureViewportMeta(runtime.html);
  const responsiveWarnings = scanResponsiveWarnings(viewport.html);
  return {
    html: viewport.html,
    injectedRuntime: runtime.injected,
    addedReveals: reveals.count,
    addedIds: ids.count,
    fixedNavLinks: nav.count,
    injectedViewport: viewport.injected,
    responsiveWarnings,
  };
}
