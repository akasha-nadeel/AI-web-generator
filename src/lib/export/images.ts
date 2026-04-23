// Mode B: rewrites JSX <img …/> tags to next/image <Image …/> with explicit
// width/height (required by next/image when not using `fill`). Dimensions
// come from Unsplash URL params when present, else from a sensible default.
//
// Mode C (image bundling) lives in a sibling helper added in Phase 7.

const DEFAULT_W = 1200;
const DEFAULT_H = 800;

interface ConvertResult {
  jsx: string;
  hasImages: boolean;
}

const IMG_TAG_RE = /<img\b([^>]*?)\/?>/gi;

export function convertImagesModeB(jsx: string): ConvertResult {
  let hasImages = false;
  const out = jsx.replace(IMG_TAG_RE, (_match, rawAttrs: string) => {
    hasImages = true;
    const attrs = parseAttrs(rawAttrs);
    if (!("width" in attrs) || !("height" in attrs)) {
      const src = attrs["src"];
      const dims = src ? extractUnsplashDims(stripBraces(src)) : null;
      const w = dims?.w ?? DEFAULT_W;
      const h = dims?.h ?? DEFAULT_H;
      attrs["width"] = `{${w}}`;
      attrs["height"] = `{${h}}`;
    }
    return `<Image${serializeAttrs(attrs)} />`;
  });
  return { jsx: out, hasImages };
}

interface AttrMap {
  [name: string]: string;
}

/**
 * Walks the raw attribute slice and extracts `name="…"` and `name={…}` pairs.
 * Brace values are tracked with a depth counter so that nested object literals
 * such as `style={{ color: "red" }}` are captured as a single expression rather
 * than being chopped at the first inner `}`.
 */
function parseAttrs(raw: string): AttrMap {
  const map: AttrMap = {};
  let i = 0;
  while (i < raw.length) {
    while (i < raw.length && /\s/.test(raw[i])) i++;
    if (i >= raw.length) break;
    const nameStart = i;
    while (i < raw.length && /[\w-]/.test(raw[i])) i++;
    const name = raw.slice(nameStart, i);
    if (!name) {
      i++;
      continue;
    }
    while (i < raw.length && /\s/.test(raw[i])) i++;
    if (raw[i] !== "=") {
      // Boolean attribute like `disabled`. Mark with empty string value.
      map[name] = '""';
      continue;
    }
    i++; // consume '='
    while (i < raw.length && /\s/.test(raw[i])) i++;
    if (raw[i] === '"' || raw[i] === "'") {
      const quote = raw[i];
      const valStart = ++i;
      while (i < raw.length && raw[i] !== quote) i++;
      map[name] = `"${raw.slice(valStart, i)}"`;
      i++; // consume closing quote
    } else if (raw[i] === "{") {
      const valStart = ++i;
      let depth = 1;
      while (i < raw.length && depth > 0) {
        if (raw[i] === "{") depth++;
        else if (raw[i] === "}") depth--;
        if (depth > 0) i++;
      }
      map[name] = `{${raw.slice(valStart, i)}}`;
      i++; // consume closing '}'
    }
  }
  return map;
}

function serializeAttrs(map: AttrMap): string {
  const keys = Object.keys(map);
  if (keys.length === 0) return "";
  return " " + keys.map((k) => `${k}=${map[k]}`).join(" ");
}

function stripBraces(s: string): string {
  // Values arrive quoted ("...") or expression-wrapped ({"..."}). Strip both.
  if (s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1);
  if (s.startsWith("{") && s.endsWith("}")) {
    const inner = s.slice(1, -1).trim();
    if (inner.startsWith('"') && inner.endsWith('"')) return inner.slice(1, -1);
    if (inner.startsWith("'") && inner.endsWith("'")) return inner.slice(1, -1);
    return inner;
  }
  return s;
}

function extractUnsplashDims(url: string): { w: number; h: number } | null {
  if (!url.includes("images.unsplash.com")) return null;
  const w = parseQueryNum(url, "w") ?? DEFAULT_W;
  const h = parseQueryNum(url, "h") ?? Math.round((w * DEFAULT_H) / DEFAULT_W);
  return { w, h };
}

function parseQueryNum(url: string, key: string): number | null {
  const m = url.match(new RegExp(`[?&]${key}=(\\d+)`));
  return m ? parseInt(m[1], 10) : null;
}
