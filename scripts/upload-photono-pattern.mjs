// One-off uploader for the PHOTONO editorial photography studio pattern.
// Massive condensed bold all-caps typography as the entire typographic
// system (Druk Wide Bold / Anton / Bebas Neue / Barlow Condensed Black at
// 80-150px+), full-bleed cinematic hero with text in BOTH bottom corners
// + vertical service category list with embedded "ARTIST" thumbnail card,
// segmented slider progress bar with circular arrow nav, staggered uneven-
// height photographer portrait row, mixed-casing service list (sentence-
// case "One Two Three" + MASSIVE all-caps service names with → arrows),
// numbered photo collection grid with names+dates in small all-caps below
// each, MASSIVE "COLLECTION" word as section terminator below the grid,
// split-bg cinematic-photo-top + pure-black-bottom CTA with the word
// "PHOTOGRAPHER" rendered MASSIVE straddling the boundary, stacked vertical
// 3-line PHO/TO/NO logo in black footer. First pattern for Photography
// industry — editorial magazine photo-studio mood (Magnum / Nat Geo / Vogue
// editorial photography vibe).
//
// Run with: node scripts/upload-photono-pattern.mjs

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
  colorPalette: "#FFFFFF, #0A0A0A, #1A1A1A, #888888, #C5C5C5, #E5E5E5",
  colorMode: "mixed",
  accentUsage:
    "STRICT MONOCHROME with PURE WHITE pages and PURE BLACK final-CTA + footer sections — no chromatic accent at all. The design is built on monumental typography + photography. (1) PURE WHITE #FFFFFF dominates the about/why-choose-us/collection/services sections, (2) PURE BLACK #0A0A0A is the FOOTER background + the bottom half of the final CTA banner, (3) photography brings all the chroma — interior shadow, golden floral fabric in the hero portrait, varied editorial portrait colors. CTAs use minimal text-with-arrow treatments rather than filled pills: 'LET'S TALK ↗' top-right of nav with a small ↗, 'FOR ALL YOUR NEEDS →' inline text-link in the final CTA banner, 'WATCH THIS' / category labels rendered as plain text. Heading text is deep black on white sections + pure white on dark sections. Body text uses muted gray #888888 (lighter than other patterns since the design's monumental headlines do not need body to compete). Hairline dividers in the numbered service list are #E5E5E5 1px gray. The discipline is total: this design refuses any chromatic accent — no orange wordmark like Alex Jordan portfolio, no violet like Urban — relying entirely on massive typography + photography weight. White logo wordmark 'PHOTONO' top-left of nav and stacked 3-line 'PHO/TO/NO' wordmark in the footer in white on black bg.",
  typography:
    "MASSIVE CONDENSED BOLD ALL-CAPS DISPLAY SANS as the dominant typographic system — Druk Wide Bold / Anton / Bebas Neue Bold / Barlow Condensed Black / Oswald Bold at 800-900 weight, slightly compressed letterforms with tight tracking, used for: hero headlines ('THE BEST FOR ALL YOUR PHOTOGRAPHY NEEDS' at 84-120px white on photo, right-aligned 4-line stack), hero left-side vertical service list ('NATURAL / PRODUCT / WEDDING / PREWEDDING / VIDEOGRAPHY / EVENT / POTRAIT' rendered in white compact all-caps stacked vertically), about-section centered 2-line heading ('A DEDICATED TEAM OF PHOTOGRAPHERS, CAPTURING / PRECIOUS MOMENTS WITH EVERY CLICK' at 48-64px deep-black bold all-caps), Why Choose Us 4-row feature names ('COMPLETE SERVICE' / 'UNLIMITED EDITING' / 'FIXED RATE' / 'SECURED PAYMENT' at 56-80px deep-black condensed bold all-caps), numbered photo collection grid name labels ('LESLIE ALEXANDER' / 'KATHRYN MURPHY' / 'DIANNE RUSSELL' / 'ELEANOR' at 16-18px small bold all-caps below each photo + tiny date '8/2/23' in even smaller gray sans below the name), MASSIVE 'COLLECTION' WORD beneath the grid at 180-260px deep-black condensed bold all-caps spanning nearly full width, services list massive entries ('FASHION PHOTOGRAPHY' / 'PREWEDDING PHOTOGRAPHY' / 'POTRAIT PHOTOGRAPHY' / 'MATERNITY PHOTOGRAPHY' / 'WHAT DO YOU WANT?' at 56-80px each), and the FINAL CTA WORD 'PHOTOGRAPHER' rendered MONUMENTAL at 140-220px white compact all-caps straddling the photo/black boundary. SECONDARY TYPOGRAPHY: tiny tracking-wide ALL-CAPS labels in 12-14px ('ABOUT US', 'WHY CHOOSE US', 'INSTANTLY GET THE BEST', 'CHOOSE US TO IMMORTALIZE YOUR PRECIOUS MOMENTS IN PRICELESS AND IMMERSIVE WORKS OF VISUAL ART', 'FOR ALL YOUR NEEDS') in muted gray, paired with sentence-case nav links ('PORTFOLIO / ABOUT US' centered nav). UNIQUE MIXED-CASING: the services list pairs SENTENCE-CASE NUMBER WORDS ('One' / 'Two' / 'Three' / 'Four' / 'Five' in 14-15px regular gray sans) on the LEFT with MASSIVE ALL-CAPS service names on the RIGHT — the casing contrast is intentional and signature. Body copy 14-16px regular sans muted gray. NO italic, NO serif anywhere.",
  layout:
    "EDITORIAL PHOTOGRAPHY-MAGAZINE flow alternating WHITE and BLACK sections: TOP NAV (overlaid on photo): 'PHOTONO' wordmark LEFT in compact white bold all-caps, CENTERED 'PORTFOLIO / ABOUT US' nav links in small white sans, RIGHT 'LET'S TALK ↗' text-link with small ↗ arrow → FULL-BLEED CINEMATIC HERO (massive editorial portrait): a full-viewport portrait photograph (a confident woman in a golden floral printed top, dramatic light) running edge-to-edge with NO solid overlay, content laid OUT IN BOTH BOTTOM CORNERS over the natural darker photo zones: LEFT-side vertical column contains the SERVICE CATEGORY LIST stacked vertically in white compact all-caps ('NATURAL / PRODUCT / WEDDING / PREWEDDING' as a top group, then a SMALL THUMBNAIL CARD labeled 'ARTIST' embedded in the middle of the list — a small ~140×190px portrait photo with the 'ARTIST' label in white compact all-caps centered ON the image, then 'VIDEOGRAPHY / EVENT / POTRAIT' as a bottom group), and BELOW the list a SEGMENTED SLIDER PROGRESS BAR (5 small horizontal segments with 1-2 highlighted) + a pair of small ← → CIRCLE NAV BUTTONS; RIGHT-bottom contains a MASSIVE 4-LINE WHITE CONDENSED BOLD ALL-CAPS HEADLINE 'THE BEST FOR / ALL YOUR / PHOTOGRAPHY / NEEDS' at 84-120px right-aligned, BELOW it a small tracking-wide 3-line tagline in white sans ('CHOOSE US TO IMMORTALIZE YOUR / PRECIOUS MOMENTS IN PRICELESS AND / IMMERSIVE WORKS OF VISUAL ART') → ABOUT US (white): centered tiny tracking-wide 'ABOUT US' label, BELOW it a centered MASSIVE 2-line condensed bold all-caps heading 'A DEDICATED TEAM OF PHOTOGRAPHERS, CAPTURING / PRECIOUS MOMENTS WITH EVERY CLICK', BELOW it a 3-line centered gray description, then a STAGGERED 5-PHOTOGRAPHER PORTRAIT ROW where the photos have UNEVEN HEIGHTS (left portrait shorter, second slightly taller, CENTER PORTRAIT is the LARGEST/TALLEST and slightly elevated, fourth tilts back down, fifth back up) creating a wave-pattern of staggered photo heights with subtle drop shadows — each portrait shows a photographer holding their camera in different shooting poses → WHY CHOOSE US (white, split): LEFT half contains a small tracking-wide 'WHY CHOOSE US' label + a 5-line gray body paragraph anchored top-left, RIGHT half contains a 4-ROW VERTICAL FEATURE LIST where each row is a MASSIVE CONDENSED BOLD ALL-CAPS feature name ('COMPLETE SERVICE' / 'UNLIMITED EDITING' / 'FIXED RATE' / 'SECURED PAYMENT') at 56-80px paired with a SMALL tracking-wide 3-line gray description below each — no cards, no boxes, just typography + space → COLLECTION (white): a HORIZONTAL CAROUSEL ROW of 4 numbered tall portrait photos ('01 / 02 / 03 / 04' tiny labels above each photo, photos at varying widths and slightly varying heights with the FIRST photo larger/taller — creating a magazine-spread asymmetric feel), each photo has a NAME label in small bold all-caps below ('LESLIE ALEXANDER' / 'KATHRYN MURPHY' / 'DIANNE RUSSELL' / 'ELEANOR') + a TINY DATE in gray sans below the name ('8/2/23' / '8/15/23' / '5/27/23' / '5/30/23'); BELOW the entire photo row at the bottom of the section the WORD 'COLLECTION' is rendered MONUMENTAL at 180-260px deep-black condensed bold all-caps spanning nearly full width with a pair of CIRCULAR ← → arrow nav buttons at the right edge → SERVICES LIST (white): TOP-LEFT small tracking-wide 'WHY CHOOSE US' label, BELOW it a VERTICAL 5-ROW SERVICE LIST where each row is structured: TINY SENTENCE-CASE NUMBER WORD on the FAR LEFT ('One' / 'Two' / 'Three' / 'Four' / 'Five' in 14px regular gray), CENTERED MASSIVE CONDENSED BOLD ALL-CAPS SERVICE NAME ('FASHION PHOTOGRAPHY' / 'PREWEDDING PHOTOGRAPHY' / 'POTRAIT PHOTOGRAPHY' / 'MATERNITY PHOTOGRAPHY' / 'WHAT DO YOU WANT?' at 56-80px) with a small description in muted gray below the service name, and a small ARROW → glyph on the FAR RIGHT; rows separated by 1px hairline dividers → FINAL CTA (split bg — top half cinematic photo + bottom half pure black): the TOP HALF of the CTA banner is a cinematic photograph (close-up of hands holding a vintage film camera on a wooden table), the BOTTOM HALF is solid pure black, and STRADDLING THE BOUNDARY between them is the WORD 'PHOTOGRAPHER' rendered MONUMENTAL at 140-220px white compact bold all-caps (visible against both halves — top half it's white-on-photo, bottom half it's white-on-black — the word is the visual anchor); to the LEFT-TOP of the photo a small tracking-wide 'INSTANTLY GET THE BEST' label, to the RIGHT of the wordmark on the BLACK section the small tracking-wide text 'FOR ALL YOUR NEEDS →' with small arrow → BLACK FOOTER (continuation of the CTA black bg): LEFT a STACKED VERTICAL 3-LINE LOGO 'PHO / TO / NO' rendered as 3 separate lines of compact white bold all-caps each on its own line (each line ~72-100px), CENTER-TOP a small horizontal nav row ('About / Portfolio / Service / About Us' in small white sentence-case), CENTER-MIDDLE 'Contact Us' label + 2-line phone + email in white sentence-case sans, CENTER-RIGHT 'Location' label + 3-line address in white sentence-case sans, BOTTOM-LEFT a vertical column of 4 SMALL CIRCULAR SOCIAL ICONS in dark-gray + 1 SQUARE social icon (linkedin icon variant), BOTTOM-CENTER copyright '© 2021 — Copyright / All Rights reserved' in muted gray small sans, BOTTOM-RIGHT a tiny LANGUAGE SELECTOR row 'En Es Fr De Ru' as horizontal letter pairs with the active language highlighted.",
  signaturePatterns: [
    "MASSIVE CONDENSED BOLD ALL-CAPS as the entire typographic system — every section heading, service name, and feature name uses Druk Wide Bold / Anton / Bebas Neue Bold / Barlow Condensed Black at 56-220px in compact bold all-caps, no variation; the design has zero typographic restraint and lets the headlines dominate every section",
    "FULL-BLEED CINEMATIC PORTRAIT HERO with text in BOTH BOTTOM CORNERS — a single dominant editorial portrait runs full-viewport with NO overlay, and the content lives in both the LEFT corner (vertical service list + ARTIST thumbnail + slider progress) and the RIGHT corner (4-line massive headline + small tagline) — splits the hero across two anchored corners rather than centering",
    "VERTICAL SERVICE CATEGORY LIST stacked in the hero — the LEFT side of the hero shows ~7 service categories ('NATURAL / PRODUCT / WEDDING / PREWEDDING / VIDEOGRAPHY / EVENT / POTRAIT') stacked vertically in white compact all-caps as a directory of services, simultaneously communicating depth-of-offering AND providing nav scent",
    "EMBEDDED 'ARTIST' THUMBNAIL CARD in the middle of the vertical category list — a small ~140×190px portrait photo with the 'ARTIST' label in white compact all-caps centered ON the image is embedded BETWEEN the top-group and bottom-group of category names; functions as a category preview / focused-state indicator",
    "SEGMENTED SLIDER PROGRESS BAR + CIRCULAR ← → ARROWS — the hero bottom-left has a 5-segment horizontal progress bar (with 1-2 segments highlighted indicating slide position) paired with a pair of small ← → circular nav buttons; segmented progress is rare and editorial",
    "STAGGERED UNEVEN-HEIGHT PHOTOGRAPHER PORTRAIT ROW — the about section uses 5 photographer portraits at NON-UNIFORM heights creating a wave-pattern (small / medium / TALLEST CENTER / medium / small) with subtle drop shadows; the central portrait being the tallest creates an organic magazine-spread anchor without explicit cards or borders",
    "MASSIVE 'COLLECTION' WORD as SECTION TERMINATOR below the photo grid — the photo collection section places the photos FIRST and then the word 'COLLECTION' is rendered MONUMENTAL at 180-260px below them as the section's typographic anchor; this inverts the usual heading-then-content pattern and signals 'these photos ARE the collection'",
    "MIXED-CASING SERVICE LIST — service rows pair SENTENCE-CASE NUMBER WORDS ('One' / 'Two' / 'Three' / 'Four' / 'Five' in regular gray) on the FAR LEFT with MASSIVE CONDENSED BOLD ALL-CAPS service names on the RIGHT; the casing contrast is intentional and is the design's most distinctive typographic moment in service listings",
    "WHY CHOOSE US FEATURES AS PURE TYPOGRAPHY — feature blocks ('COMPLETE SERVICE' / 'UNLIMITED EDITING' / 'FIXED RATE' / 'SECURED PAYMENT') use NO icons, NO cards, NO boxes — just MASSIVE all-caps name + small description below; this typographic confidence is what separates the design from typical 3-or-4-icon feature grids",
    "SPLIT-BG CTA with WORDMARK STRADDLING THE BOUNDARY — the final CTA banner's top half is a cinematic photo and the bottom half is pure black, with the word 'PHOTOGRAPHER' rendered MONUMENTAL straddling the boundary so the top half of the letterforms sits on the photo and the bottom half sits on the black; this z-stacking trick is the design's most distinctive CTA moment",
    "STACKED VERTICAL 3-LINE FOOTER LOGO 'PHO / TO / NO' — the footer brand wordmark is rendered as THREE SEPARATE LINES (each part of the brand on its own line in compact white bold all-caps at 72-100px each), turning the logo into a vertical column rather than a horizontal wordmark; different from the horizontal nav logo above",
    "NUMBERED PHOTO COLLECTION GRID with NAME + DATE LABELS — each portrait photo in the collection row has a tiny numerical index above ('01 / 02 / 03 / 04'), a NAME LABEL in small bold all-caps below ('LESLIE ALEXANDER'), and a SMALL DATE in muted gray below the name ('8/2/23'); editorial-portfolio convention",
    "TINY TRACKING-WIDE ALL-CAPS LABELS for tertiary text — 'ABOUT US', 'WHY CHOOSE US', 'INSTANTLY GET THE BEST', 'FOR ALL YOUR NEEDS' all rendered in 12-14px tracking-wide all-caps sans (small + tracking-wide is the secondary text vocabulary, contrasting with massive headline vocabulary)",
    "TEXT-LINK CTAs WITHOUT PILLS — primary CTAs use plain text + an arrow → / ↗ rather than filled pills ('LET'S TALK ↗', 'FOR ALL YOUR NEEDS →'); the design's editorial confidence rejects standard button chrome",
    "MINIMAL CENTER-NAV — the top nav uses 'PHOTONO' wordmark LEFT, 'PORTFOLIO / ABOUT US' centered (only 2 links), and 'LET'S TALK ↗' RIGHT — extreme nav minimalism leaving the headlines to do all the work",
  ],
  uniqueTechniques: [
    "Massive condensed all-caps as the entire typographic operating system — using Druk Wide Bold / Anton / Bebas Neue Bold / Barlow Condensed Black at 56-220px for every heading, service name, feature name, and CTA wordmark forces every section to have a monumental moment; this discipline is what separates editorial photography studios from typical-portfolio sites and is the design's strongest brand signal",
    "Word straddling the photo/black-bg boundary — placing the word 'PHOTOGRAPHER' MONUMENTAL exactly on the boundary between the cinematic photo top half and pure black bottom half of the CTA so the top half of the letters reads as white-on-photo and bottom half reads as white-on-black is a unique z-stacking treatment that creates a memorable final-page typographic climax",
    "Mixed-casing service list pairing — pairing tiny sentence-case 'One/Two/Three/Four/Five' number words (gray, regular weight) with MASSIVE all-caps service names (deep black, condensed bold) on the same row creates a typographic 'whisper next to a shout' contrast; this is the design's most replicable service-listing technique and works for any service-based business",
    "Photos-first then 'COLLECTION' wordmark below — placing the photo collection grid FIRST and then rendering the section name 'COLLECTION' MONUMENTAL beneath them inverts the usual section-heading-then-content pattern and signals 'these photographs ARE the collection — no introduction needed'; an editorial confidence move",
    "Embedded category-thumbnail card in vertical service list — placing a small 'ARTIST' photo card BETWEEN the top and bottom groups of vertical service category names converts a flat directory list into a focused-state preview, communicating both 'available services' and 'currently viewing this category' in the same minimal element",
    "Segmented slider progress bar — using 5 small horizontal segments (with 1-2 highlighted indicating position) instead of dot indicators or a continuous progress bar is rare and editorial-magazine quality; pairs naturally with the photography subject matter of multi-shot collections",
    "Stacked 3-line vertical wordmark footer logo — rendering the brand 'PHO / TO / NO' as three separate lines each in compact white bold all-caps creates a verticality that matches the editorial-photography aspect ratio language and gives the footer a typographic anchor stronger than horizontal wordmark logos",
  ],
  spacing:
    "Editorial photography-magazine spacing — sections separated by 96-160px on desktop, content max-width ~1280-1440px with comfortable side gutters, headline-to-body gap 24-40px, vertical service list internal line-height 0.95-1.05 (tight stack for vertical density), staggered photographer portrait row uses 16-32px gaps and 0px vertical alignment so portraits sit at varying heights organically. Why Choose Us 4-row feature list has 48-72px vertical spacing between rows. Numbered service list rows have 32-48px vertical padding around 1px hairline dividers. The COLLECTION photo carousel has 16-24px horizontal gaps. The MASSIVE 'COLLECTION' word and 'PHOTOGRAPHER' final-CTA wordmarks each get 80-120px of vertical breathing room around them. Hero photo is full viewport. Footer uses 80-120px internal padding with the stacked 3-line logo getting its own column with abundant vertical space. Generous architectural breathing room, never cramped — magazine-spread spacing.",
  moodKeywords: "editorial, magazine, photography-led, condensed-bold, monumental, dramatic, professional, portfolio, photo-studio, magnum-style, vogue-editorial, monochrome, high-contrast, condensed-typography, editorial-photography, studio",
  animations:
    "Cinematic editorial — hero photo: very slow zoom (1.0 → 1.04 over 12s) for ambient life. Hero text staggered fade-in (left vertical service list slides in from left, right massive headline slides in from right with 0.15s delay, ARTIST thumbnail card scale-in 0.95 → 1.0 with delay). Slider progress segments: animate position smoothly between slides (0.4s ease-out). Massive headlines fade-up on scroll-in (0.6s ease-out, y-32px → 0). Staggered photographer portraits: each portrait fades+slides up with stagger (0.08s between each, varying y-offsets matching their height differences for organic feel). Why Choose Us features: each row stagger fade-up (0.1s between, 0.5s ease-out). COLLECTION wordmark: slow horizontal slide-in from left (1.0s ease-out) when entering viewport. Service list rows: hover → row name slightly translate-x right (4-8px) + arrow → translate-x right + hairline darken; mixed-casing 'One/Two/Three' label brightens slightly. Final CTA PHOTOGRAPHER wordmark: subtle continuous parallax — top half of letters drifts slightly faster than bottom half on scroll, emphasizing the boundary trick. Stacked footer logo PHO/TO/NO: each line fades in with stagger (0.2s between PHO → TO → NO). Slider arrows: hover → bg fill swap. Text-link CTAs: hover → arrow translate-x 4-6px right + slight color brighten. Overall motion is deliberate cinematic-editorial — never bouncy, never aggressive, never distracting from the photography.",
  heroTreatment:
    "FULL-BLEED CINEMATIC EDITORIAL PORTRAIT HERO — a dominant single portrait photograph (a confident woman in dramatic golden floral fabric, soft yet bold light, magazine-cover quality) running edge-to-edge with NO overlay or gradient. ABOVE the photo a minimal nav contains: 'PHOTONO' (or domain-equivalent) wordmark LEFT in compact white bold all-caps, CENTERED 'PORTFOLIO / ABOUT US' nav links in small white sans, and 'LET'S TALK ↗' text-link RIGHT with small ↗ arrow. INSIDE the hero, content lives in BOTH BOTTOM CORNERS (over the natural darker zones of the photograph): LEFT-side vertical column at ~80-120px from the left edge contains: a SERVICE CATEGORY LIST stacked vertically in white compact bold all-caps ('NATURAL / PRODUCT / WEDDING / PREWEDDING' as a top group at the top of the column), then MIDDLE OF THE LIST a SMALL EMBEDDED THUMBNAIL CARD ~140×190px (a portrait photograph with the word 'ARTIST' rendered in white compact all-caps centered on top of the image — functions as a focused-state preview of the artist category), then 'VIDEOGRAPHY / EVENT / POTRAIT' as a bottom group below the card; BELOW the entire vertical column at the very bottom-left a SEGMENTED 5-SEGMENT slider progress bar (~120-160px wide horizontal bar with 1-2 segments highlighted in white) paired with two small CIRCULAR ← → ARROW BUTTONS in white-bordered circles. RIGHT-side bottom-anchored content contains: a MASSIVE 4-LINE WHITE CONDENSED BOLD ALL-CAPS HEADLINE 'THE BEST FOR / ALL YOUR / PHOTOGRAPHY / NEEDS' (84-120px, right-aligned, tight tracking, Druk/Anton/Bebas Neue/Barlow Condensed Black) + BELOW it a small tracking-wide 3-line tagline ('CHOOSE US TO IMMORTALIZE YOUR / PRECIOUS MOMENTS IN PRICELESS AND / IMMERSIVE WORKS OF VISUAL ART') in 11-13px tracking-wide white sans-serif. Critically the hero is split across BOTH bottom corners (no center-aligned hero text, no overlay, no gradient mask) — the photograph carries the white text via its naturally darker zones, creating an editorial magazine-cover effect. The overall feeling is editorial photography studio confidence — Magnum-meets-Vogue magazine voice — typography is monumental, photography is the star, and chrome is minimal.",
};

const record = {
  name: "Photono Editorial Photography Studio",
  industries: [
    "photography",
    "photographer",
    "photo studio",
    "photography studio",
    "videography",
    "videographer",
    "video studio",
    "wedding photography",
    "fashion photography",
    "portrait photography",
    "product photography",
    "event photography",
    "editorial photography",
    "documentary photography",
    "lifestyle photography",
    "real estate photography",
    "food photography",
    "automotive photography",
    "newborn photography",
    "maternity photography",
    "boudoir photography",
    "headshot photography",
    "corporate photography",
    "commercial photography",
    "advertising photography",
    "fine art photography",
    "photo agency",
    "photography collective",
    "creative studio",
    "media production",
    "film studio",
  ],
  moods: [
    "editorial",
    "magazine",
    "photography-led",
    "condensed-bold",
    "monumental",
    "dramatic",
    "professional",
    "portfolio",
    "photo-studio",
    "magnum-style",
    "vogue-editorial",
    "monochrome",
    "high-contrast",
    "condensed-typography",
    "editorial-photography",
    "studio",
    "bold-typography",
    "magazine-cover",
  ],
  color_mode: "mixed",
  brief_json: brief,
};

console.log("[upload] Inserting Photono editorial photography studio pattern into design_patterns...");

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
