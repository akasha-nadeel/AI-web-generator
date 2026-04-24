// Mode B: rewrites JSX <img …/> tags to next/image <Image …/> with explicit
// width/height (required by next/image when not using `fill`). Dimensions
// come from Unsplash URL params when present, else from a sensible default.
//
// Mode C: post-translation pass that fetches referenced Unsplash images,
// writes them to public/images/{hash}.{ext}, and rewrites component `src`
// attributes to the local path. Fail-soft: individual fetch failures fall
// back to the remote URL. See convertImagesModeC below.

import { createHash } from "node:crypto";
import type { BinaryFileMap } from "./zip.ts";

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

// ── Mode C: offline image bundling ───────────────────────────────────

const MAX_BUNDLED_IMAGES = 50;
const DEFAULT_FETCH_TIMEOUT_MS = 10_000;
const SRC_RE = /src="(https?:\/\/[^"]+)"/g;

export interface ModeCOptions {
  /** Per-image timeout in ms. Default: 10s. Exposed mainly for tests. */
  timeoutMs?: number;
  /** Max unique images to bundle. Default: 50. Exposed mainly for tests. */
  maxImages?: number;
  /** Fetch impl override. Default: globalThis.fetch. Exposed for tests. */
  fetch?: typeof globalThis.fetch;
}

/**
 * Walks the component file map, fetches each unique Unsplash URL in parallel
 * (capped and timed out), writes the bytes to public/images/, and rewrites
 * `src="…"` references to the local path. Individual fetch failures or the
 * 51st+ unique URL leave their `src` attribute untouched — Next.js will
 * still serve them remotely via remotePatterns in next.config.ts.
 */
export async function convertImagesModeC(
  files: BinaryFileMap,
  opts: ModeCOptions = {}
): Promise<BinaryFileMap> {
  const timeoutMs = opts.timeoutMs ?? DEFAULT_FETCH_TIMEOUT_MS;
  const maxImages = opts.maxImages ?? MAX_BUNDLED_IMAGES;
  const fetchImpl = opts.fetch ?? globalThis.fetch;

  const unique = collectUnsplashUrls(files);
  const toFetch = unique.slice(0, maxImages);

  const results = await Promise.all(
    toFetch.map(async (url) => {
      try {
        const buf = await fetchWithTimeout(fetchImpl, url, timeoutMs);
        return { url, buf, ok: true as const };
      } catch (err) {
        console.warn(
          `[Export] bundle fetch failed for ${url}:`,
          err instanceof Error ? err.message : err
        );
        return { url, ok: false as const };
      }
    })
  );

  const rewrites = new Map<string, string>();
  const out: BinaryFileMap = { ...files };
  for (const r of results) {
    if (!r.ok) continue;
    const hash = createHash("sha1").update(r.url).digest("hex").slice(0, 12);
    const ext = pickExt(r.url);
    const publicPath = `public/images/${hash}.${ext}`;
    const srcPath = `/images/${hash}.${ext}`;
    out[publicPath] = r.buf;
    rewrites.set(r.url, srcPath);
  }

  if (rewrites.size === 0) return out;

  for (const [path, contents] of Object.entries(out)) {
    if (typeof contents !== "string") continue;
    if (!path.endsWith(".tsx") && !path.endsWith(".ts")) continue;
    out[path] = rewriteSrcAttrs(contents, rewrites);
  }
  return out;
}

function collectUnsplashUrls(files: BinaryFileMap): string[] {
  const seen = new Set<string>();
  for (const [path, content] of Object.entries(files)) {
    if (typeof content !== "string") continue;
    if (!path.endsWith(".tsx") && !path.endsWith(".ts")) continue;
    for (const m of content.matchAll(SRC_RE)) {
      const url = m[1];
      if (url.includes("images.unsplash.com") || url.includes("plus.unsplash.com")) {
        seen.add(url);
      }
    }
  }
  return [...seen];
}

function rewriteSrcAttrs(content: string, mapping: Map<string, string>): string {
  return content.replace(SRC_RE, (full, url: string) => {
    const local = mapping.get(url);
    return local ? `src="${local}"` : full;
  });
}

async function fetchWithTimeout(
  fetchImpl: typeof globalThis.fetch,
  url: string,
  timeoutMs: number
): Promise<Buffer> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetchImpl(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
  } finally {
    clearTimeout(timer);
  }
}

function pickExt(url: string): string {
  const path = url.split("?")[0];
  const m = path.match(/\.(jpe?g|png|webp|avif|gif)$/i);
  const raw = (m ? m[1] : "jpg").toLowerCase();
  return raw === "jpeg" ? "jpg" : raw;
}
