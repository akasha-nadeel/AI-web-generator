// Multi-page SPA → Next.js route detector + onclick-to-href rewriter.
//
// The AI occasionally emits a multi-"page" single-HTML SPA shaped like:
//
//   <body>
//     <nav>  <button onclick="showPage('shop')">Shop</button>  </nav>
//     <div id="homePage" class="page-section active">…</div>
//     <div id="shopPage" class="page-section">…</div>
//     <aside class="cart-panel">…</aside>
//     <footer>…</footer>
//   </body>
//
// Plus CSS `.page-section { display: none }` / `.active { display: block }`.
// The inline JS that toggles `.active` gets stripped by our JSX pass, which
// leaves every "page" stacked in the exported site. Instead of shipping a
// tiny JS page-switcher (would freeze the URL at "/" and hide content from
// crawlers), we detect the pattern here and convert it into real Next.js
// routes: app/page.tsx (home) + app/{slug}/page.tsx per other page + a
// shared app/layout.tsx that holds the nav/footer/cart chrome.
//
// Detection is deliberately conservative (triple-guard). If any check fails
// we return null so the caller falls through to the existing single-page
// code path unchanged.
//
// To roll this back, revert this file plus the multi-page branch in
// translate.ts; no schema or data migrations involved.

import type { Element } from "domhandler";
import { getOuterHTML } from "domutils";
import type { ParsedHtml } from "./parser.ts";
import { firstHeadingText, pascalCase, slugify, uniquify } from "./sections.ts";

export interface SpaRoute {
  /** URL slug. Empty string for the home route (served at "/"). */
  slug: string;
  /** PascalCase identifier — used as the component name and file stem. */
  componentName: string;
  /** Outer HTML of the page-section element, post-onclick-rewrite. */
  html: string;
  isHome: boolean;
}

export interface SpaChromeEntry {
  /** Original DOM element — kept only to let the caller inspect tag/attribs. */
  element: Element;
  /** "before" if it appeared before the first page-section; "after" otherwise. */
  position: "before" | "after";
  /** PascalCase identifier — used as the component name and file stem. */
  componentName: string;
  /** Outer HTML of the chrome element, post-onclick-rewrite. */
  html: string;
}

export interface SpaRoutePlan {
  routes: SpaRoute[];
  /** Retains original DOM order within each position group. */
  chrome: SpaChromeEntry[];
}

const SHOW_PAGE_RE = /\bshowPage\s*\(\s*['"]([\w-]+)['"]\s*\)/g;
const SHOW_PAGE_SINGLE_RE = /showPage\s*\(\s*['"]([\w-]+)['"]\s*\)/;

function hasPageSectionClass(el: Element): boolean {
  const cls = el.attribs?.class ?? "";
  return /\bpage-section\b/.test(cls);
}

function hasActiveClass(el: Element): boolean {
  const cls = el.attribs?.class ?? "";
  return /\bactive\b/.test(cls);
}

/**
 * Conservative detection + planning for multi-page SPA conversion.
 *
 * Returns null (falling back to the single-page code path) unless ALL of:
 *   1. Body has ≥2 direct-child <div>s carrying the `page-section` class.
 *   2. The raw HTML contains at least one `onclick="showPage('x')"` whose
 *      argument resolves to one of those divs (by id or stripped-Page id).
 *   3. Every detected page-section yields a usable, unique slug via the
 *      two-stage derivation (id first, then heading text).
 *
 * Side effect: once the plan is built, Phase 2 runs — DOM mutation that
 * rewrites recognised `onclick="showPage(slug)"` attributes into real
 * `href="/slug"` anchors so the downstream JSX pipeline (which strips all
 * `on*` handlers) produces navigable links.
 */
export function detectSpaRoutes(parsed: ParsedHtml, rawHtml: string): SpaRoutePlan | null {
  const body = parsed.body;
  if (!body) return null;

  // Single pass over body children: collect page-section divs and "other"
  // (chrome) elements separately, each tagged with its original filtered-
  // index so we can later decide before/after relative to the first page.
  const pageSections: { el: Element; idx: number }[] = [];
  const others: { el: Element; idx: number }[] = [];
  let idx = 0;
  for (const child of body.children) {
    if (child.type !== "tag") continue;
    const el = child as Element;
    if (el.name === "script" || el.name === "style") continue;
    if (el.name === "div" && hasPageSectionClass(el)) {
      pageSections.push({ el, idx });
    } else {
      others.push({ el, idx });
    }
    idx++;
  }

  // Guard (a): need at least two page-sections. A single one isn't multi-page.
  if (pageSections.length < 2) return null;

  // Guard (c) up front: derive a usable slug for every page-section. Two-
  // stage: first try the id (normalise away common AI conventions — trailing
  // "Page" like `homePage`, leading `page-` like `page-home`); if the id is
  // absent or slugifies to nothing, fall back to the first heading text.
  // Duplicate slugs abort the whole plan.
  const usedSlugs = new Set<string>();
  const usedNames = new Set<string>();
  const routes: SpaRoute[] = [];
  for (const { el } of pageSections) {
    const id = el.attribs.id ?? "";
    let raw = normaliseSectionId(id);
    if (!raw) {
      const heading = firstHeadingText(el);
      if (heading) raw = heading;
    }
    if (!raw) return null;
    const slug = slugify(raw);
    if (!slug) return null;
    if (usedSlugs.has(slug)) return null;
    usedSlugs.add(slug);

    const baseName = pascalCase(raw) || `Page${routes.length + 1}`;
    const componentName = uniquify(`${baseName}Page`, usedNames);
    routes.push({ slug, componentName, html: "", isHome: false });
  }

  // Guard (b): at least one showPage(…) call in the raw HTML must resolve to
  // a known section — either by raw id, by its normalised form (no `Page`
  // suffix, no `page-` prefix), or by the derived slug. Covers the three
  // AI conventions in the wild (`homePage` / `page-home` / heading-derived)
  // while still rejecting coincidental `page-section` class usage.
  const resolvable = new Set<string>();
  for (let i = 0; i < pageSections.length; i++) {
    const id = pageSections[i].el.attribs.id ?? "";
    if (id) {
      resolvable.add(id);
      const normalised = normaliseSectionId(id);
      if (normalised) resolvable.add(normalised);
    }
    resolvable.add(routes[i].slug);
  }
  let hasMatchingNav = false;
  for (const m of rawHtml.matchAll(SHOW_PAGE_RE)) {
    if (resolvable.has(m[1])) { hasMatchingNav = true; break; }
  }
  if (!hasMatchingNav) return null;

  // Home = page-section with .active class, else first. Only one home.
  let homeIdx = pageSections.findIndex(({ el }) => hasActiveClass(el));
  if (homeIdx < 0) homeIdx = 0;
  routes[homeIdx].isHome = true;

  // Map every recognisable showPage argument (raw id, normalised id, or
  // already-slugified form) onto its emission path. The home route emits to
  // "/" (not "/{slug}") so nav links going to the home div rewrite correctly.
  const idToEmitPath = new Map<string, string>();
  for (let i = 0; i < pageSections.length; i++) {
    const { el } = pageSections[i];
    const id = el.attribs.id ?? "";
    const emitPath = routes[i].isHome ? "" : routes[i].slug;
    if (id) {
      idToEmitPath.set(id, emitPath);
      const normalised = normaliseSectionId(id);
      if (normalised) idToEmitPath.set(normalised, emitPath);
    }
    idToEmitPath.set(routes[i].slug, emitPath);
  }

  // Phase 2: onclick="showPage('x')" → href="/x" DOM rewrite.
  // Runs before JSX conversion so the jsx.ts on* stripper doesn't discard
  // the slug information first. Only rewrites when we recognise the target;
  // unknown handlers (openCart, etc.) are left alone and get stripped
  // downstream as today — their buttons become inert (documented caveat).
  for (const { el } of pageSections) rewriteShowPageClicks(el, idToEmitPath);
  for (const { el } of others) rewriteShowPageClicks(el, idToEmitPath);

  // Build chrome entries with original-order positions so the layout can
  // render them in their original DOM order around {children}.
  const firstPageIdx = pageSections[0].idx;
  const chrome: SpaChromeEntry[] = [];
  for (const { el, idx: elIdx } of others) {
    const id = el.attribs.id ?? "";
    const heading = firstHeadingText(el);
    const baseName = pascalCase(id || heading || el.name) || `Chrome${chrome.length + 1}`;
    const componentName = uniquify(baseName, usedNames);
    chrome.push({
      element: el,
      position: elIdx < firstPageIdx ? "before" : "after",
      componentName,
      html: getOuterHTML(el),
    });
  }

  // Force every page-section visible. The source CSS uses
  // `.page-section { display: none } .page-section.active { display: block }`
  // to toggle the active page in-browser, but once pages are split into
  // separate routes only the home div carries `.active` — leaving every
  // other route's outer div hidden by the surviving globals.css rule. Adding
  // `active` here makes the `.page-section.active` selector match, so the
  // route renders instead of a blank page.
  for (const { el } of pageSections) {
    const cls = el.attribs.class ?? "";
    if (!/\bactive\b/.test(cls)) {
      el.attribs.class = cls ? `${cls} active` : "active";
    }
  }

  // Capture the (now post-mutation) HTML for each route.
  for (let i = 0; i < routes.length; i++) {
    routes[i].html = getOuterHTML(pageSections[i].el);
  }

  return { routes, chrome };
}

// Strip the AI's common id conventions so showPage arguments match:
//   "homePage"    → "home"
//   "page-home"   → "home"
//   "page_home"   → "home"
//   "PageHome"    → "Home"
// Returns "" if the id normalises to empty.
function normaliseSectionId(id: string): string {
  if (!id) return "";
  let out = id;
  out = out.replace(/^page[-_]/i, "");
  out = out.replace(/[Pp]age$/, "");
  return out;
}

function rewriteShowPageClicks(root: Element, idToEmitPath: Map<string, string>): void {
  for (const el of walkElements(root)) {
    const onclick = el.attribs?.onclick;
    if (!onclick) continue;
    const m = onclick.match(SHOW_PAGE_SINGLE_RE);
    if (!m) continue;
    const emitPath = idToEmitPath.get(m[1]);
    if (emitPath === undefined) continue;
    el.attribs.href = emitPath === "" ? "/" : `/${emitPath}`;
    delete el.attribs.onclick;
    if (el.name === "button") el.name = "a";
  }
}

function* walkElements(root: Element): Generator<Element> {
  yield root;
  for (const c of root.children) {
    if (c.type === "tag") yield* walkElements(c as Element);
  }
}
