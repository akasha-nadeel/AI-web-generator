// Post-JSX pass: rewrite internal <a href="/…"> into next/link <Link>.
//
// Runs after swapInlineSvgs in renderSectionFile, mirroring the regex-based
// pattern used by icons.ts / images.ts. Only rewrites anchors whose href is
// a relative path beginning with "/" (and not "//"). External URLs, hash
// anchors (#), mailto:, tel:, and dynamic hrefs (`href={…}`) are untouched.
//
// Caller injects `import Link from "next/link";` when `hasLink` is true.

const OPEN_A_RE = /<a\b([^>]*?)(\/?)>/g;
const HREF_STRING_RE = /\bhref\s*=\s*"([^"]*)"/;
const CLOSE_A = "</a>";

interface LinkResult {
  jsx: string;
  hasLink: boolean;
}

export function rewriteInternalLinks(jsx: string): LinkResult {
  let out = "";
  let hasLink = false;
  let cursor = 0;
  OPEN_A_RE.lastIndex = 0;

  let m: RegExpExecArray | null;
  while ((m = OPEN_A_RE.exec(jsx)) !== null) {
    const [full, attrs, selfClose] = m;
    if (selfClose === "/") continue; // self-closing <a /> is pathological; leave alone

    const hrefMatch = attrs.match(HREF_STRING_RE);
    if (!hrefMatch) continue; // no static href — skip (e.g. href={var})
    const href = hrefMatch[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue; // external / protocol-relative

    const openStart = m.index;
    const openEnd = m.index + full.length;
    // Anchors can't legally nest in HTML, so the next </a> closes this one.
    const closeStart = jsx.indexOf(CLOSE_A, openEnd);
    if (closeStart < 0) continue; // malformed — leave alone

    out += jsx.slice(cursor, openStart);
    out += `<Link${attrs}>`;
    out += jsx.slice(openEnd, closeStart);
    out += `</Link>`;
    cursor = closeStart + CLOSE_A.length;
    hasLink = true;
    OPEN_A_RE.lastIndex = cursor;
  }
  out += jsx.slice(cursor);
  return { jsx: out, hasLink };
}
