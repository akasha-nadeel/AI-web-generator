// One-off uploader for the ALEX JORDAN designer portfolio pattern.
// Monochrome editorial portfolio with vibrant orange accent — first
// pattern for Portfolio / Freelancer industry.
//
// Run with: node scripts/upload-alexjordan-pattern.mjs

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
  colorPalette: "#F5F0EA, #0C0C0C, #F25014, #FFFFFF, #888888",
  colorMode: "mixed",
  accentUsage:
    "Vibrant orange-red #F25014 — used sparingly but POWERFULLY as a signature. Primary uses: oversized hero name wordmark, tiny uppercase section labels ('AREAS / EXPERTII', 'PROJECTS I'VE DONE', 'AWARDS I WON'), 'Get in Touch' CTA pill, oversized quotation marks on testimonials, 'TOP PICK' pricing badge. Never used for body text or backgrounds — only as punctuation punches through monochrome content.",
  typography:
    "Clean modern sans for everything (Inter / Satoshi / GT Walsheim, 700-800 weight). NO serif anywhere. Hero name wordmark is DISPLAY scale (200-280px). Section headings large and bold (48-72px). Body is 16-18px regular. Small uppercase labels (10-12px, letter-spacing wide) in orange. All typography is confident and modern — the design speaks through photography + accent usage, not typography variety.",
  layout:
    "Thin horizontal nav (ornament-asterisk logo + name left, centered links, orange pill CTA right) → FULL-BLEED grayscale portrait hero photo + MASSIVE orange name wordmark overlapping image bottom (breaking the image plane) → cream section with centered FADED-GRADIENT paragraph (text fades from dark to light within same block) + client logo row with each logo as its own graphic mark → DARK section with small orange label + paragraph + large accordion-style expertise list (Figma / Webflow / SaaS / Framer with ↓ arrows, one expanded showing text + artistic image on right) → cream testimonial section with oversized orange quote mark + centered testimonial + tiny avatar circle → cream projects section with small orange label + horizontal scrolling project carousel (black moody product photography) → DARK awards section with small orange label + award list (Webby / Awwwards / D&AD etc, each with ↗ arrow, horizontal rule separators) → cream pricing section with 2-card split (light card / dark card with orange TOP PICK badge) → DARK CTA footer with centered heading + orange pill + MASSIVE gray ghost wordmark mirroring the hero name.",
  signaturePatterns: [
    "Grayscale full-bleed portrait hero photo with MASSIVE orange name wordmark (200-280px) overlapping/breaking the image bottom — personal brand masthead",
    "Faded-gradient paragraph text — first sentences in dark text, remainder fades to light gray within same block (teaser technique)",
    "Tiny uppercase orange section labels with symbols/dividers ('AREAS / EXPERTII ||', 'PROJECTS I'VE DONE', 'AWARDS I WON')",
    "Large accordion-style expertise list on dark — each row is a 48-64px heading with ↓ arrow, one expanded showing text + moody artistic image",
    "Oversized orange quote mark (double quotation) at top of centered testimonial",
    "Award list with ↗ arrows and full-width horizontal rule separators — reads like a credits roll",
    "Client logo constellation row — each logo is its own graphic mark (not uniform style), diverse visual treatment signals real client breadth",
    "Ghost wordmark in footer — same name as hero but in faded gray at massive scale, mirroring the hero masthead",
    "Black moody product photography for portfolio items (not screenshots) — futuristic luxury objects signal premium design practice",
    "Two-card pricing split (cream light card + near-black dark card with orange TOP PICK badge) with black pill on light and white pill on dark",
  ],
  uniqueTechniques: [
    "Orange-as-punctuation — one vibrant color used only for emphasis punches (labels, name, CTAs, quotes, badges) through otherwise monochrome layout, creating maximum visual contrast from minimum color",
    "Mid-paragraph text fade-out — body copy starts in dark readable text then fades to light gray by the end, making the reader lean in; creates implicit 'there's more here if you stick around'",
    "Hero wordmark personal branding — giant name in orange overlapping grayscale portrait creates instant 'this is MY brand' recognition without needing a tagline",
    "Portfolio shown as museum photography — black luxury objects instead of app screenshots reframes the designer as an artist/curator, not a technician",
    "Ghost wordmark mirror — footer repeats the hero name at giant scale in gray, creating bookends that reinforce the personal brand throughout the page",
  ],
  spacing:
    "Generous editorial spacing — sections separated by 96-128px, accordion list rows have 32-40px vertical padding, testimonial has massive whitespace around the quote (80-120px top/bottom). Hero is 100vh. Overall feeling is calm, confident, expensive.",
  moodKeywords: "editorial, minimal, premium, confident, monochrome, sophisticated, moody, personal-brand, designer, portfolio-quality",
  animations:
    "Hero name wordmark fades up from bottom on load with 0.8s ease. Paragraph text fade-gradient is static CSS (linear-gradient text mask). Accordion expansion: smooth 0.3s height + fade-in for content + 90deg rotate on ↓ arrow. Project carousel: horizontal scroll with momentum + subtle scale 1.02 on hover. Award list rows: hover color shift to orange + ↗ arrow translate 4px right. CTA pill hover: subtle scale 1.05 + darker orange fill. Ghost footer wordmark stays static (it's atmosphere, not interactive).",
  heroTreatment:
    "FULL-BLEED grayscale (desaturated B&W) PORTRAIT photograph — subject (person, typically head-and-shoulders) looking down or to the side, artistic/moody lighting, soft gradient background. Thin horizontal navigation at TOP with ornament-asterisk logo + name left, centered minimal text links, orange pill 'Get in Touch' CTA right. At the BOTTOM of the hero, overlapping the image edge by 30-40%: MASSIVE orange wordmark of the person's name (200-280px, bold sans, vibrant #F25014 color) rendered so large that it breaks below the image frame and extends into the next section. The combination of grayscale portrait + orange name wordmark creates an editorial magazine cover feel.",
};

const record = {
  name: "Alex Jordan Designer Portfolio",
  industries: [
    "portfolio",
    "freelancer",
    "designer",
    "creative professional",
    "personal brand",
    "creator",
    "photographer",
    "illustrator",
    "developer portfolio",
    "consultant",
  ],
  moods: [
    "editorial",
    "minimal",
    "premium",
    "confident",
    "monochrome",
    "sophisticated",
    "moody",
    "bold",
    "personal-brand",
  ],
  color_mode: "mixed",
  brief_json: brief,
};

console.log("[upload] Inserting Alex Jordan portfolio pattern into design_patterns...");

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
