import { UNIVERSAL_FALLBACK_PHOTO } from "./prompts/modules/image-data";

const UNSPLASH_FALLBACK_URL = `https://images.unsplash.com/${UNIVERSAL_FALLBACK_PHOTO}?auto=format&fit=crop&q=80&w=1600`;

// Match the full URL inside src="..." / src='...' for Unsplash + Pexels.
const IMAGE_URL_PATTERN = /(https:\/\/images\.unsplash\.com\/photo-[^\s"'<>)]+|https:\/\/images\.pexels\.com\/photos\/[^\s"'<>)]+)/g;

const HEAD_TIMEOUT_MS = 3000;
const MAX_CONCURRENT = 10;

async function headOk(url: string): Promise<boolean> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), HEAD_TIMEOUT_MS);
  try {
    const res = await fetch(url, { method: "HEAD", signal: ctrl.signal });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function checkInBatches(urls: string[]): Promise<Set<string>> {
  const broken = new Set<string>();
  for (let i = 0; i < urls.length; i += MAX_CONCURRENT) {
    const batch = urls.slice(i, i + MAX_CONCURRENT);
    const results = await Promise.all(batch.map((u) => headOk(u).then((ok) => ({ url: u, ok }))));
    for (const { url, ok } of results) if (!ok) broken.add(url);
  }
  return broken;
}

/**
 * HEAD-check every Unsplash/Pexels URL in the generated HTML and swap
 * broken ones (404, timeout) for a known-good fallback. Guards against
 * AI hallucinating photo IDs or upstream deletions.
 */
export async function validateAndFixImages(
  html: string
): Promise<{ html: string; checked: number; swapped: number }> {
  const urls = Array.from(new Set(html.match(IMAGE_URL_PATTERN) ?? []));
  if (urls.length === 0) return { html, checked: 0, swapped: 0 };

  const broken = await checkInBatches(urls);
  if (broken.size === 0) return { html, checked: urls.length, swapped: 0 };

  let fixed = html;
  for (const url of broken) {
    // Escape regex metacharacters in the URL before building the replacer.
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    fixed = fixed.replace(new RegExp(escaped, "g"), UNSPLASH_FALLBACK_URL);
  }

  return { html: fixed, checked: urls.length, swapped: broken.size };
}
