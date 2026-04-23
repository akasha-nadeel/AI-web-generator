import type { Element, Text } from "domhandler";
import { parse } from "./parser.ts";

/**
 * Element-name table for HTML void elements that must self-close in JSX.
 * https://developer.mozilla.org/en-US/docs/Glossary/Void_element
 */
const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/** HTML attributes whose JSX-equivalent name differs in casing or spelling. */
const ATTR_RENAME: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  colspan: "colSpan",
  rowspan: "rowSpan",
  maxlength: "maxLength",
  minlength: "minLength",
  readonly: "readOnly",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  crossorigin: "crossOrigin",
  enctype: "encType",
  formaction: "formAction",
  formenctype: "formEncType",
  formmethod: "formMethod",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  frameborder: "frameBorder",
  hreflang: "hrefLang",
  usemap: "useMap",
  srcset: "srcSet",
  srclang: "srcLang",
  novalidate: "noValidate",
  contenteditable: "contentEditable",
  spellcheck: "spellCheck",
  "accept-charset": "acceptCharset",
  "http-equiv": "httpEquiv",
  // SVG
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-opacity": "strokeOpacity",
  "fill-rule": "fillRule",
  "fill-opacity": "fillOpacity",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
};

const SKIP_TAGS = new Set(["script"]);

/** Inline event-handler attributes are stripped — the hook library handles
 *  smooth scroll, mobile nav, accordion, reveal. */
function isEventHandler(attr: string): boolean {
  return /^on[a-z]/.test(attr);
}

interface ConvertResult {
  /** JSX expression — a single root element string, suitable for `return ( … )`. */
  body: string;
  /** Raw style strings extracted from `<style>` blocks for relocation into globals.css. */
  inlineStyles: string[];
}

/**
 * Convert an outer-HTML string into a JSX expression. Caller wraps the result
 * in a component declaration. Inline `<style>` content is collected for
 * relocation into globals.css.
 */
export function htmlToJsx(html: string): ConvertResult {
  const parsed = parse(html);
  // Fragment inputs (a single <section>…</section>) parse with the section as
  // a top-level child of the Document, not under <body>. Try body first for
  // full-document inputs, then fall back to the Document children.
  const scope = parsed.body ?? parsed.doc;
  const root = scope.children.find((c) => c.type === "tag") as Element | undefined;
  if (!root) return { body: "<></>", inlineStyles: [] };
  const ctx: Ctx = { inlineStyles: [] };
  const body = renderElement(root, ctx, 0);
  return { body, inlineStyles: ctx.inlineStyles };
}

interface Ctx {
  inlineStyles: string[];
}

function renderElement(el: Element, ctx: Ctx, depth: number): string {
  const tag = el.name;
  if (SKIP_TAGS.has(tag)) return "";

  if (tag === "style") {
    const css = el.children
      .filter((c) => c.type === "text")
      .map((c) => (c as { data: string }).data)
      .join("");
    if (css.trim()) ctx.inlineStyles.push(css);
    return "";
  }

  const attrs = renderAttrs(el.attribs);
  const isVoid = VOID_TAGS.has(tag);

  if (isVoid || el.children.length === 0) {
    return `<${tag}${attrs} />`;
  }

  const inner = el.children.map((c) => renderNode(c, ctx, depth + 1)).join("");
  return `<${tag}${attrs}>${inner}</${tag}>`;
}

function renderNode(node: { type: string }, ctx: Ctx, depth: number): string {
  if (node.type === "tag") return renderElement(node as Element, ctx, depth);
  if (node.type === "text") return escapeJsxText((node as unknown as Text).data);
  // Comments, CDATA, directives — drop.
  return "";
}

function renderAttrs(attribs: Record<string, string>): string {
  const parts: string[] = [];
  for (const [rawName, rawValue] of Object.entries(attribs)) {
    if (isEventHandler(rawName)) continue;
    const name = renameAttr(rawName);
    if (name === "style") {
      const obj = cssStringToJsxStyle(rawValue);
      if (obj) parts.push(`style={${obj}}`);
      continue;
    }
    parts.push(`${name}=${quoteAttr(rawValue)}`);
  }
  return parts.length ? " " + parts.join(" ") : "";
}

function renameAttr(name: string): string {
  const lower = name.toLowerCase();
  if (lower in ATTR_RENAME) return ATTR_RENAME[lower];
  // data-*, aria-* keep kebab. Everything else passes through unchanged.
  return name;
}

function quoteAttr(value: string): string {
  // Empty value = boolean attribute. JSX accepts bare presence.
  if (value === "") return '""';
  // If the value contains a double-quote, fall back to a JSX expression with
  // a JS string literal so we don't have to escape inside an attribute.
  if (value.includes('"')) {
    return "{" + JSON.stringify(value) + "}";
  }
  return `"${value}"`;
}

function escapeJsxText(text: string): string {
  // Curly braces are JSX expression delimiters; escape them as expressions.
  // Decoded entities (`&`, `<`, `>`) are fine in JSX text content.
  return text.replace(/[{}]/g, (ch) => `{'${ch}'}`);
}

/**
 * Parses a CSS declaration string (the value of a `style` attribute) into a
 * JSX `style` object literal. Returns null if the input is empty or unparseable.
 */
function cssStringToJsxStyle(css: string): string | null {
  const decls = css
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean);
  const pairs: string[] = [];
  for (const decl of decls) {
    const colon = decl.indexOf(":");
    if (colon === -1) continue;
    const prop = decl.slice(0, colon).trim();
    const value = decl.slice(colon + 1).trim();
    if (!prop) continue;
    const key = cssPropToJsxKey(prop);
    pairs.push(`${key}: ${JSON.stringify(value)}`);
  }
  if (pairs.length === 0) return null;
  return `{ ${pairs.join(", ")} }`;
}

function cssPropToJsxKey(prop: string): string {
  // CSS custom properties stay quoted-string keys.
  if (prop.startsWith("--")) return JSON.stringify(prop);
  // Vendor prefix `-webkit-foo` → `WebkitFoo`; standard `font-size` → `fontSize`.
  const camel = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(camel) ? camel : JSON.stringify(prop);
}
