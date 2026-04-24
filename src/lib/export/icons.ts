// Best-effort inline-SVG → lucide-react conversion. Each entry matches a
// distinctive substring of the SVG's `d=` path data; on hit, the entire
// <svg>…</svg> is replaced with a lucide component (className/style/aria
// attributes from the original <svg> are preserved).
//
// Conservative by design: anything we can't fingerprint stays as raw inline
// SVG. The JSX still compiles and the page still renders — we just lose
// the import-side ergonomics for that one icon.

interface IconRule {
  /** lucide-react export name. */
  name: string;
  /** A unique substring expected to appear in the SVG's `d=` data. */
  fingerprint: string;
}

const RULES: IconRule[] = [
  { name: "Menu", fingerprint: "M4 6h16M4 12h16M4 18h16" },
  { name: "X", fingerprint: "M18 6L6 18M6 6l12 12" },
  { name: "ArrowRight", fingerprint: "M5 12h14M12 5l7 7-7 7" },
  { name: "ArrowLeft", fingerprint: "M19 12H5M12 19l-7-7 7-7" },
  { name: "ChevronDown", fingerprint: "m6 9 6 6 6-6" },
  { name: "ChevronUp", fingerprint: "m18 15-6-6-6 6" },
  { name: "ChevronRight", fingerprint: "m9 18 6-6-6-6" },
  { name: "ChevronLeft", fingerprint: "m15 18-6-6 6-6" },
  { name: "Check", fingerprint: "M20 6 9 17l-5-5" },
  { name: "Plus", fingerprint: "M5 12h14M12 5v14" },
  { name: "Minus", fingerprint: "M5 12h14" },
  { name: "Star", fingerprint: "M11.525 2.295" },
  { name: "Mail", fingerprint: "M4 4h16c1.1 0 2 .9 2 2v12" },
  { name: "Phone", fingerprint: "M22 16.92v3a2 2 0 0 1-2.18 2" },
  { name: "MapPin", fingerprint: "M20 10c0 4.993-5.539 10.193-7.399 11.799" },
  { name: "ArrowUpRight", fingerprint: "M7 7h10v10M7 17 17 7" },
  // Brand icons (Twitter/Facebook/Instagram/Linkedin) intentionally omitted —
  // lucide-react ≥1 dropped them from the core export list. We leave such
  // SVGs as raw inline markup, which still renders correctly.
];

const SVG_TAG_RE = /<svg\b[^>]*>[\s\S]*?<\/svg>/gi;
const PATH_D_RE = /<path[^>]*\bd\s*=\s*"([^"]+)"/i;
const PRESERVED_ATTRS = ["className", "class", "style", "aria-label", "aria-hidden", "role"];
const ATTR_PICK_RE = /(\w[\w-]*)\s*=\s*("[^"]*"|\{[^}]*\})/g;

interface SwapResult {
  jsx: string;
  imports: Set<string>;
}

export function swapInlineSvgs(jsx: string): SwapResult {
  const imports = new Set<string>();
  const out = jsx.replace(SVG_TAG_RE, (svg) => {
    const pathMatch = svg.match(PATH_D_RE);
    if (!pathMatch) return svg;
    const d = pathMatch[1];
    const rule = RULES.find((r) => d.includes(r.fingerprint));
    if (!rule) return svg;
    imports.add(rule.name);
    const passthrough = pickAttrs(svg);
    return `<${rule.name}${passthrough} />`;
  });
  return { jsx: out, imports };
}

function pickAttrs(svgTag: string): string {
  const open = svgTag.match(/<svg\b([^>]*)>/i);
  if (!open) return "";
  const parts: string[] = [];
  ATTR_PICK_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ATTR_PICK_RE.exec(open[1])) !== null) {
    if (PRESERVED_ATTRS.includes(m[1])) parts.push(`${m[1]}=${m[2]}`);
  }
  return parts.length ? " " + parts.join(" ") : "";
}
