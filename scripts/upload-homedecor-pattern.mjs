// One-off uploader for the HOME DECOR e-commerce reference pattern.
// Uses hand-crafted DesignBrief (higher quality than Haiku extractor).
//
// Run with: node scripts/upload-homedecor-pattern.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Load env from .env.local
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
  colorPalette: "#F5EDE4, #2A1810, #B5542A, #F5EE7D, #1A0E08",
  colorMode: "mixed",
  accentUsage:
    "Butter yellow #F5EE7D — primary CTA pills (Shop Now, Start Your Journey), feature highlight blocks, 'Why' section background. Terracotta/rust #B5542A — hero environment tone, subtle product accents. Deep chocolate #2A1810 — alternating dark bands, footer, single-product feature background.",
  typography:
    "Editorial display serif for all headings (Fraunces / Canela / Tiempos Headline style, 400-500 weight, slight italic personality, 48-96px hero, 32-48px section). OVERSIZED brand wordmark treatment — logo text rendered at 200-300px breaking the hero image boundary. Clean sans-serif body (Inter style, 400 weight, 15-17px). Decorative ornament character (❋) integrated into logo mark.",
  layout:
    "Thin centered horizontal nav (logo center, Shop/About/Inspiration left, Search/Cart right) → full-bleed cinematic warm-interior hero with centered serif headline + yellow pill CTA + massive wordmark overlapping below → 3-col product card row on cream ('Dream Decor') with arrow nav → DARK section splitting 2×2 product grid LEFT with one hero product RIGHT on warm-dark bg ('Most Loved Pieces') → full-bleed interior editorial photo → dark brown band with offset white serif copy → chip filter row + 4-col product grid ('All Products | New in | Lighting | Furniture | Textiles | Wall Art | Decor Accents') → 50/50 yellow feature block (text left + artisan photo right with nested photo + Explore arrow) → cream split section (dark interior photo left, large serif sustainability headline right, outlined pill) → deep brown testimonial band with yellow pill CTA → white 'Why' section with copy left + yellow 2×2 feature-icon grid right → terracotta mission footer panel with centered serif copy.",
  signaturePatterns: [
    "Oversized brand wordmark (200-300px) overlapping bottom of hero image — creates iconic masthead feel",
    "Qualitative descriptor tags under product names ('Sleek & versatile', 'Cozy & eco-friendly', 'Warm & Ambient')",
    "Ornament character ❋ embedded in logo wordmark",
    "Tiny colored flag icons next to product prices (origin/shipping indicator)",
    "2×2 dark product grid paired with ONE large hero product on dark background — magazine spread layout",
    "Category chip filter row above product grids (All Products | New in | Lighting | Furniture...)",
    "Yellow accent blocks for mission/feature sections (not buttons) — big blocks of color, not just CTAs",
    "Alternating cream → dark brown → yellow → cream band structure creates editorial rhythm",
    "Outlined pill buttons on cream (Sustainability Promise →) paired with filled yellow pills on dark (Start Your Journey →)",
  ],
  uniqueTechniques: [
    "Hero wordmark overlap — logo text scales to stadium-display size and sits half-on half-off the hero image, making the hero image itself feel like a postage stamp inside the wordmark",
    "Product card pairing: a 2×2 small-product grid on one side with a single dramatically-lit hero product on the other — catalog meets editorial spread",
    "Yellow as a material, not just an accent — entire blocks (mission, feature grid) render in butter yellow, giving it weight equal to the dark/cream bands",
    "Small inline 'nested' photos inside larger text blocks (artisan photo inside the yellow feature block) — layered like a scrapbook",
    "Descriptor tags use ampersand + two adjectives ('Sleek & versatile') — editorial magazine voice applied to commerce",
  ],
  spacing:
    "Generous editorial spacing — sections 80-120px apart, product cards have 24-32px internal padding, headings have 20-32px gap to body text. Hero takes 85-100vh. Overall feeling is calm, breathing, magazine-laid-out — never cramped.",
  moodKeywords: "warm, artisanal, editorial, sustainable, handcrafted, cozy, premium, natural, magazine-quality",
  animations:
    "Subtle hover scale on product cards (1.02-1.03 with soft shadow lift), smooth horizontal scroll for product rows, arrow-nav buttons have hover color shift, yellow blocks have no hover effect (they're content surfaces not interactive), lazy fade-in-up on section entry (staggered 0.08s between cards).",
  heroTreatment:
    "FULL-BLEED warm-terracotta cozy interior photograph (living room with sofa, pillows, greenery in rust/amber tones). Centered layered content: thin serif heading (2 lines, 48-64px, 'Create a Home / That's Uniquely You') + yellow pill CTA ('Shop Now →', rounded-full, black text on butter yellow). BELOW the image boundary — MASSIVE cream-white wordmark 'HOMEDECOR' at 240-320px rendered in display serif, overlapping the image bottom edge by ~40%. Thin navigation at top: logo 'HOME ❋ DECOR' centered, minimal links left and right.",
};

const record = {
  name: "HomeDecor Artisanal E-commerce",
  industries: ["e-commerce", "ecommerce", "online store", "shop", "retail", "home decor", "furniture"],
  moods: ["warm", "artisanal", "editorial", "sustainable", "handcrafted", "cozy", "premium", "natural"],
  color_mode: "mixed",
  brief_json: brief,
};

console.log("[upload] Inserting HomeDecor e-commerce pattern into design_patterns...");

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
