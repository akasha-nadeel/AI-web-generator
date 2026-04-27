// One-off smoke test for detectIndustryFromPrompt() coverage across all
// 12 wizard industries. Zero API cost — pure local regex match. Run with:
//   node scripts/smoke-test-industry-detect.mjs
//
// We import the .ts source via tsx-style dynamic import — but since the
// classifier has no runtime deps beyond TypeScript types, we just read
// and inline the exported function below.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const classifierPath = join(__dirname, "..", "src", "lib", "ai", "prompts", "modules", "classifier.ts");
const src = readFileSync(classifierPath, "utf8");

// Crude extraction: read the three map literals and the detect function.
// Fragile but sufficient for a one-off smoke test that runs against the
// SAME source the app uses.
function extractMap(name) {
  const re = new RegExp(`const ${name}[^=]*=\\s*\\{([\\s\\S]*?)\\};`, "m");
  const m = src.match(re);
  if (!m) throw new Error(`Could not find ${name}`);
  // Build a JS object from "key: value" lines.
  // We only need the KEYS for detectIndustryFromPrompt — values can be ignored.
  const keys = new Set();
  const keyRe = /^\s*"?([a-z][a-z0-9 _-]*?)"?\s*:/gim;
  let km;
  while ((km = keyRe.exec(m[1])) !== null) {
    keys.add(km[1].trim());
  }
  return keys;
}

const imageKeys = extractMap("INDUSTRY_IMAGE_MAP");
const iconKeys = extractMap("INDUSTRY_ICON_MAP");
const logoKeys = extractMap("LOGO_ICON_MAP");
const knownKeys = new Set([...imageKeys, ...iconKeys, ...logoKeys]);

// Mirror detectIndustryFromPrompt() logic exactly (classifier.ts:343-381).
function detectIndustryFromPrompt(text) {
  if (!text || typeof text !== "string") return null;
  const lower = text.toLowerCase();
  const sorted = [...knownKeys].sort((a, b) => b.length - a.length);
  for (const key of sorted) {
    const pattern = key
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/[-\s]+/g, "[-\\s]+");
    if (new RegExp(`\\b${pattern}\\b`, "i").test(lower)) {
      return key;
    }
  }
  return null;
}

const tests = [
  { wizard: "restaurant",  prompt: "Italian restaurant in Brooklyn",                 acceptable: ["restaurant", "food"] },
  { wizard: "portfolio",   prompt: "freelance designer portfolio",                   acceptable: ["portfolio"] },
  { wizard: "agency",      prompt: "creative digital agency",                        acceptable: ["agency", "creative"] },
  { wizard: "ecommerce",   prompt: "ecommerce store for sustainable fashion",        acceptable: ["ecommerce", "e-commerce", "fashion"] },
  { wizard: "blog",        prompt: "personal blog about hiking",                     acceptable: ["blog"] },
  { wizard: "fitness",     prompt: "boutique fitness studio",                        acceptable: ["fitness", "gym"] },
  { wizard: "realestate",  prompt: "real estate agency Manhattan",                   acceptable: ["real-estate", "real estate", "realestate", "agency"] },
  { wizard: "saas",        prompt: "SaaS productivity tool",                         acceptable: ["saas", "software", "tech"] },
  { wizard: "education",   prompt: "online education platform for kids",             acceptable: ["education"] },
  { wizard: "photography", prompt: "wedding photographer portfolio",                 acceptable: ["photography", "portfolio", "wedding"] },
  { wizard: "medical",     prompt: "dental clinic in Boston",                        acceptable: ["dental", "medical", "healthcare"] },
  { wizard: "nonprofit",   prompt: "nonprofit for clean water access",               acceptable: ["nonprofit", "charity"] },
];

let pass = 0;
let fail = 0;
console.log("=".repeat(80));
console.log("Industry detection smoke test — 12 wizard industries");
console.log("=".repeat(80));
for (const t of tests) {
  const got = detectIndustryFromPrompt(t.prompt);
  const ok = got !== null && t.acceptable.includes(got);
  if (ok) pass++; else fail++;
  console.log(
    `${ok ? "✓" : "✗"} [${t.wizard.padEnd(11)}] "${t.prompt}"`,
  );
  console.log(
    `    detected: ${JSON.stringify(got).padEnd(20)} acceptable: ${JSON.stringify(t.acceptable)}`
  );
}
console.log("=".repeat(80));
console.log(`PASS: ${pass} / ${tests.length}    FAIL: ${fail} / ${tests.length}`);
console.log("=".repeat(80));
process.exit(fail === 0 ? 0 : 1);
