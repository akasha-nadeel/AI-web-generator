import { parseDocument } from "htmlparser2";
import type { Document, Element } from "domhandler";
import * as DomUtils from "domutils";

export type { Document, Element };
export { DomUtils };

export interface ParsedHtml {
  doc: Document;
  head: Element | null;
  body: Element | null;
}

/**
 * Forgiving full-document parse. Always returns a Document; head/body may be
 * null for fragments. Caller decides how to handle missing structure.
 */
export function parse(html: string): ParsedHtml {
  // Tags are lowercased so the section walker can match `<SECTION>` and
  // `<section>` interchangeably. Attribute names are preserved as written so
  // SVG camelCase (`viewBox`, `strokeWidth`, `clipPath`) survives intact —
  // JSX requires the camelCase form.
  const doc = parseDocument(html, {
    recognizeSelfClosing: true,
    lowerCaseTags: true,
    lowerCaseAttributeNames: false,
  });
  const htmlEl = findElement(doc, "html");
  const root = htmlEl ?? doc;
  return {
    doc,
    head: findElement(root, "head"),
    body: findElement(root, "body"),
  };
}

export function findElement(scope: { children: Document["children"] }, tagName: string): Element | null {
  for (const child of scope.children) {
    if (child.type === "tag" && (child as Element).name === tagName) return child as Element;
  }
  return null;
}
