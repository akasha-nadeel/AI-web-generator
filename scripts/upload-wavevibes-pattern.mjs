// One-off uploader for the WAVE VIBES sparkling beverage e-commerce pattern.
// Vibrant / playful / product-focused counterpoint to the HomeDecor editorial look.
//
// Run with: node scripts/upload-wavevibes-pattern.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");
const envText = readFileSync(envPath, "utf8");
for (const line of envText.split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (m && !process.env[m[1]]) {
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[m[1]] = val;
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const brief = {
  colorPalette: "#FFFFFF, #0A0B3D, #F7E67D, #E0157F, #FFCF3D",
  colorMode: "light",
  accentUsage:
    "Hot pink/magenta #E0157F — product CTAs on floating callout cards (Buy Now pill), featured product highlight. Deep navy #0A0B3D — primary page CTA (Open New Tastes pill), headline text, nav color. Butter yellow #F7E67D — floating product callout cards, flavor tab indicators. Multi-color flavor chip trio — yellow/purple/coral circular tabs act as interactive flavor selectors.",
  typography:
    "Massive bold modern sans-serif display for headlines (Archivo Black / Satoshi 800 / Inter Tight 700, 64-88px, navy color, 3-line stack). Compact clean sans body (15-16px, neutral gray). Nav is minimal sans (14px medium). All-caps sans for CTA pill labels (13-14px, letter-spacing wide). Typography stays deliberately clean — the product photography does the talking.",
  layout:
    "Minimal horizontal nav (wave/ripple logo left, Shop/Ingredients/About us links, Account/Cart right) → SPLIT HERO with text column LEFT (~45%) + full-bleed vibrant product photograph RIGHT (~55%), blurred natural backdrop (pool water, citrus, beach, etc.). Left column: giant bold 3-line headline in navy + short descriptive paragraph + dark-navy pill CTA with arrow + row of 3 colored circular flavor tabs. Right column: hero product shot with white hotspot dot on product + FLOATING yellow callout card overlapping product (badge + product name + hot-pink mini-CTA pill) + bottom text overlay (Sparkling Non-Alcoholic Drink chip + product name + volume in white) → Below hero: scrollable flavor carousel, ingredients panel with color blocks, full-bleed lifestyle photo band, reviews marquee, footer with giant brand wordmark.",
  signaturePatterns: [
    "Split-hero 45/55 with text left, full-bleed vibrant product photo right (not lifestyle — isolated hero product with environmental backdrop)",
    "Floating yellow callout card overlapping product photo — contains 'New flavour' tag pill + product name + hot-pink mini 'Buy Now' pill",
    "White hotspot dot markers on product photo (indicates interactive points)",
    "Row of 3 colored circular flavor tabs under CTA (yellow/purple/coral/etc — clickable flavor selector)",
    "Dark-navy full pill CTA with right-arrow icon (Open New Tastes →)",
    "Wavy ripple logo (stacked thin wavy horizontal lines) — graphic brand mark",
    "Bottom product overlay combo: small category chip + product name + volume (e.g. '/ 335ml') in white on the hero image",
    "Hot pink/magenta reserved exclusively for product-level CTAs (Buy Now) — navy reserved for page-level CTAs",
    "Product photography as centerpiece — water dripping, vibrant natural backdrops, not flat-lay studio shots",
  ],
  uniqueTechniques: [
    "Two-tier CTA hierarchy: dark navy pill for the BRAND action (explore flavors), hot pink mini pill for the PRODUCT action (buy this one) — visually distinct so users never confuse which they're clicking",
    "Floating product callout card — a yellow 'card within the image' breaks the 2D plane and makes the product feel interactive, like a shoppable Instagram post",
    "Colored flavor selector trio — tiny clickable circles in product-flavor colors replace traditional tab navigation, making flavor exploration feel like a toy",
    "White hotspot dot — single interactive marker overlaid on the product invites clicks without crowding the shot",
    "Blurred natural environment backgrounds (pool, beach, citrus grove) — brand story told through environment not copy",
  ],
  spacing:
    "Moderate playful spacing — hero occupies full viewport but internal elements feel compact. Text column has ~40px between headline and paragraph, ~48px between paragraph and CTA, ~32px between CTA and flavor tabs. Product side has minimal internal spacing — image dominates edge-to-edge with overlays layered over.",
  moodKeywords: "vibrant, playful, fresh, product-focused, modern, bold, youthful, commerce-forward",
  animations:
    "Flavor tab hover: circle scales to 1.15 + subtle bounce, reveals flavor name tooltip. Product image: parallax tilt 2-3deg on mouse move. Floating callout card: float up-down 4px every 3s. Buy Now pill: hover color shift + scale 1.05. CTA arrow: slides right 4px on hover. Flavor change: product image crossfades to new flavor variant when tab clicked.",
  heroTreatment:
    "SPLIT HERO 45/55 (text left, product right). LEFT COLUMN on white: thin minimal top nav (wavy logo + 3-5 text links + Account/Cart) → giant 3-line bold sans headline in deep navy ('Bold flavors, / natural energy, / zero compromise.') → 2-line small gray descriptive paragraph → dark navy pill CTA with white text + right arrow icon ('Open New Tastes →') → row of 3 colored circular flavor tabs (yellow/purple/coral with tiny fruit/flavor icons inside). RIGHT COLUMN: full-bleed vibrant product photograph (isolated hero product — can/bottle with water droplets against blurred natural scene — pool, beach, citrus). Overlaid: white hotspot dot on product surface + FLOATING yellow callout card overlapping product (80×120px, rounded-xl, contains: small 'New flavour' tag pill + product name in dark serif + hot-pink 'Buy Now' mini pill with arrow). Bottom of right column: white text overlay — small category chip ('Sparkling Non-Alcoholic Drink') + bold product name + thin volume marker ('/ 335ml').",
};

const record = {
  name: "Wave Vibes Sparkling Beverage",
  industries: [
    "e-commerce",
    "ecommerce",
    "online store",
    "shop",
    "retail",
    "beverage",
    "drink",
    "food",
    "consumer goods",
    "cpg",
    "product",
  ],
  moods: [
    "vibrant",
    "playful",
    "fresh",
    "bold",
    "modern",
    "youthful",
    "product-focused",
    "energetic",
    "commerce-forward",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Wave Vibes e-commerce pattern into design_patterns...");

const { data, error } = await supabase
  .from("design_patterns")
  .insert(record)
  .select()
  .single();

if (error) {
  console.error("[upload] FAILED:", error);
  process.exit(1);
}

console.log("[upload] SUCCESS");
console.log(`  id: ${data.id}`);
console.log(`  name: ${data.name}`);
console.log(`  industries: ${data.industries.join(", ")}`);
console.log(`  moods: ${data.moods.join(", ")}`);
console.log(`  signature_patterns: ${brief.signaturePatterns.length}`);
console.log(`  unique_techniques: ${brief.uniqueTechniques.length}`);
