// One-off uploader for the BOLDERS / Harveyst minimal interior design studio
// pattern. Calm whitespace-driven design with slash-prefixed section labels
// '/ 01' '/ Dining room' '/ Gallery' '/ Our Work', sentence-case bold sans
// headings, vertical scroll-down indicator on hero, vertical thumbnail
// strip + main image on hero, large editorial pull-quote with author photo
// + social icons, typographic "Our Work" list with FLOATING PHOTO overlapping
// the active row, slider hero with dot indicators, text-link-with-hairline
// secondaries. Second pattern for Architecture / Interior Design,
// complementing Zenspace's monumental editorial with a calm minimalist
// design-studio mood (Studio McGee / Athena Calderone / Vincent Van Duysen
// adjacent — but app-builder studio vibe).
//
// Run with: node scripts/upload-bolders-pattern.mjs

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
  colorPalette: "#FFFFFF, #FAFAFA, #0F0F0F, #1A1A1A, #888888, #C5C5C5, #E5E5E5",
  colorMode: "light",
  accentUsage:
    "STRICT MONOCHROME with PURE WHITE pages and BLACK content — no chromatic accent at all. The design's voice is built on absolute typographic + photographic discipline + extreme whitespace: (1) PURE WHITE #FFFFFF dominates the page bg with NO color tint anywhere (different from Zenspace's warm cream), (2) DEEP BLACK #0F0F0F is used as the primary text + heading color, (3) muted gray #888888 is used for body copy + tertiary text + slash glyphs, (4) light gray #E5E5E5 is used for hairline dividers between rows. CTA pills are FILLED BLACK on white sections with white text + a small white arrow → at the right edge — but this design uses TEXT-LINK-WITH-HAIRLINE secondaries far more than pill CTAs (text label + → arrow + a 1px horizontal line under the entire row, anchored bottom-left). NO chromatic accents whatsoever. Photography brings ALL the chroma — interior images carry warm wood tones, leather upholstery, sage green chair fabric, terracotta accent objects — and the design's monochrome chrome lets these natural interior colors breathe. The discipline: this design refuses any branded color choice (no orange, no green, no blue, no terracotta), trusting the photography to do all chromatic work. Buttons + chrome stay pure black/white/gray.",
  typography:
    "TWO-WEIGHT SANS-SERIF system in SENTENCE CASE — Inter / Geist / DM Sans / Manrope at (a) BOLD weight for major headings and (b) regular weight for body, with NO italics, NO serifs, NO all-caps. Major section headings 36-56px in deep black bold sentence-case ('The new housing development', 'Bring an unforgettable aesthetic experience', 'Creativity, rigor, and customer satisfaction', 'We design every project with joy', 'Newsletter Subs'). Pull-quote heading rendered LARGER at 40-56px with curly opening + closing quotation marks ('\"Harveyst will set a new standard for your workplace design.\"'). Body copy 14-16px regular sans muted gray #888888. The unique typographic moment: SLASH-PREFIXED SECTION LABELS — every section announces itself with a small slash followed by a label ('/ 01', '/ Dining room', '/ Gallery', '/ Our Work') in 13-15px sentence-case dark sans, with the slash as a literal part of the label rather than a divider. The OUR WORK SECTION is its own typographic moment: a vertical TYPOGRAPHIC LIST where each row is a project name rendered LARGE (28-40px sentence-case sans-serif, slightly serif-feeling soft proportions like in old Apple Marketing Pro / Söhne / Mona Sans Light), prefixed by a tiny number ('01' / '02' / '03' / '04' / '05') in muted gray on the left and an arrow → on the right; the typeface for these names FEELS more refined/elegant than the bold sentence-case section titles, almost like a humanist-sans (could be New York / Apple Garamond-feeling) — this is the only typographic variation. Vertical SCROLL DOWN label on the hero is rotated 90° (vertical orientation) with a small downward arrow ↓.",
  layout:
    "CALM MINIMAL WHITESPACE-DRIVEN STUDIO flow on pure white #FFFFFF: TOP NAV (clean white): a small abstract LOGOMARK LEFT (geometric icon — looks like vertical bars), CENTERED nav links in sentence-case (Home [active] / Template / Resources / Community), and a 1px-outlined PILL CTA on the RIGHT ('Hire Us →' with small arrow) → HERO (split 50/50, white left + photo right): LEFT half contains: a SLASH-PREFIXED PAGE NUMBER '/ 01' anchored top-left (small 13px gray sans), BELOW it a SLASH-PREFIXED CATEGORY LABEL '/ Dining room' (in slightly larger 15-17px sans), BELOW it a MASSIVE bold sentence-case 2-line headline 'The new housing / development' (~52-72px Inter Bold), BELOW it a 3-line gray description, then ABUNDANT WHITESPACE, then anchored at the BOTTOM-LEFT a vertical column with TWO TEXT-LINK-WITH-HAIRLINE secondary CTAs stacked: each is the label text + a small arrow → on the right + a thin horizontal hairline drawn UNDER the entire row width ('Explore our Workspace →' / hairline / 'Explore our Amenities →' / hairline); LEFT-EDGE-MIDDLE has a small VERTICAL 'Scroll Down' label (rotated 90°) with a thin downward arrow ↓; RIGHT half contains: a TALL FULL-HEIGHT INTERIOR PHOTOGRAPH of a dining room (warm wood, sage chairs, pendant lamp) AND a VERTICAL THUMBNAIL STRIP of 4 small square room variant photos stacked vertically at the photograph's LEFT edge (overlapping the photo), with the active thumbnail being slightly larger or with a brighter border, plus the TOP-RIGHT of the photo holds a 1px-outlined 'Hire Us →' pill button → PULL-QUOTE SECTION (white): split 40/60, LEFT has a tall portrait/photo of a CEO (woman at laptop, casual studio environment) in a perfect rectangle ~480px tall, RIGHT-TOP has a HUGE editorial PULL QUOTE in deep black bold sentence-case sans wrapped with curly quotation marks ('\" Harveyst will set a new standard for your workplace design. \"') at 40-56px spanning 3 lines, BELOW the quote a 2-line gray description, then ABUNDANT WHITESPACE, then anchored at the BOTTOM a horizontal 1px hairline rule, BELOW it the AUTHOR ATTRIBUTION row: 'Christine Sulvani / CEO & Senior Designer' on the LEFT in stacked sentence-case + 3 SOCIAL ICON CIRCLES (Instagram / Facebook / Twitter, each a 32-40px thin-bordered circle with a centered glyph) on the RIGHT → GALLERY SECTION (white): TOP-LEFT has a SLASH-PREFIXED LABEL '/ Gallery' + a bold sentence-case 2-line heading 'Bring an unforgettable / aesthetic experience' anchored LEFT, TOP-RIGHT has a 2-line gray description + a pair of SLIDER ARROW CIRCLES (left = 1px outlined gray, right = darker outlined) anchored top-right; BELOW it a horizontal 3-CARD CAROUSEL ROW where each card is a tall LANDSCAPE INTERIOR PHOTOGRAPH (~640×420px) with rounded corners (~8-12px); each card has a CAPTION OVERLAY at the BOTTOM-LEFT (white text on the image, e.g. 'The Sullivans' home / Aesthetic and modern design the Sullivan family home is a cool example.') and a small 1px-OUTLINED CIRCULAR ↗ ARROW BUTTON anchored at the BOTTOM-RIGHT of each card; the third card peeks at the right edge (partially clipped) signaling 'more available' → OUR WORK TYPOGRAPHIC LIST SECTION (white): TOP-LEFT slash label '/ Our Work' + bold sentence-case 2-line heading 'Creativity, rigor, and / customer satisfaction', TOP-RIGHT has a 3-line gray description; BELOW it a VERTICAL TYPOGRAPHIC LIST of 5 numbered project rows separated by 1px hairline dividers — each row has a small gray '01' / '02' / '03' / '04' / '05' on the FAR LEFT, the project name centered horizontally in LARGE refined sentence-case sans (e.g. 'Okana's Work office' / 'Modern Kitchen' / 'Living Room' / 'Appartment' / 'Modern House') at 28-40px, and a small ARROW ICON on the FAR RIGHT (the FIRST/active row uses a 1px-outlined CIRCULAR arrow → button while the others use simple inline → arrows); ANCHORED ON THE ACTIVE ROW IS A FLOATING SQUARE PHOTOGRAPH that overlays the row partially — the photo (a small ~280×220px interior photo of an office) sits CENTERED on the row, slightly clipped/peeking, creating the effect of the photo 'belonging to' the active project name and being the visual preview hovering over the typographic list → CALL-TO-ACTION HERO-SLIDER (white, full-bleed image-dominant): a wide CINEMATIC INTERIOR PHOTOGRAPH (living room with light blue accent chair, warm wood, soft natural light) running edge-to-edge, with TEXT OVERLAID on the LEFT side: a 3-line bold sentence-case headline 'We design / every project / with joy' in dark text on light photo, BELOW it a small 'Special Offers' label + 'Forty Percent Off Prices' in dark sans, then a FILLED BLACK 'Go To Amenities →' PILL CTA, then 3 small DOT INDICATORS at the very bottom showing slider position (active dot = filled black, inactive = outlined) → FOOTER (white): a clean minimalist 4-COL layout: COL1 contains a bold sentence-case 'Newsletter Subs' heading + an EMAIL INPUT row (just 'Enter Your Email' placeholder text + a 1px-outlined CIRCULAR ARROW BUTTON → on the right + a hairline rule beneath) + a 2-line gray tagline below; COL2 has 'Contact / About' stacked in dark sentence-case; COL3 has 'Home / Company / Product' stacked in dark sentence-case + 4 SOCIAL ICON CIRCLES (Instagram / Facebook / Twitter / YouTube) in a horizontal row; bottom hairline divider + bottom row with 'Privacy Policy / Terms & Conditions' on LEFT + 'Copyright © 2023 Bolders, Inc. All rights reserved.' on RIGHT.",
  signaturePatterns: [
    "SLASH-PREFIXED SECTION LABELS — every section announces itself with a small slash followed by a label ('/ 01', '/ Dining room', '/ Gallery', '/ Our Work') in 13-15px sentence-case dark sans; the slash is part of the label rather than a divider — design's most repeated structural micro-element",
    "VERTICAL SCROLL DOWN INDICATOR — left edge of the hero has a small 'Scroll Down' label rotated 90° (vertical orientation) with a thin downward arrow ↓ — editorial-architectural detail signaling the page expects scroll engagement",
    "TEXT-LINK-WITH-HAIRLINE secondary CTAs — secondary actions use a label + small → arrow with a thin 1px hairline drawn UNDER the entire row width, no pill, no border around the text; multiple stacked ('Explore our Workspace →' / hairline / 'Explore our Amenities →' / hairline) creating a subtle list of options",
    "VERTICAL THUMBNAIL STRIP overlapping main hero image — 3-4 small square room-variant photos stacked vertically at the LEFT edge of the main hero photograph, partially overlapping it, with the active thumbnail slightly larger or brighter-bordered for variant nav",
    "OUR WORK TYPOGRAPHIC LIST with FLOATING PHOTO overlay — projects shown as a vertical typographic list (numbered '01' to '05' + project name centered in large refined sans + arrow on right + hairline between rows) with a SMALL FLOATING PHOTOGRAPH overlaying the ACTIVE row centered, creating the effect of the photo 'belonging to' the focused project",
    "1px-OUTLINED CIRCULAR ARROW BUTTONS — slider arrows, gallery card corner buttons, email-form submit buttons, scroll-down arrows, and Hire Us pill all share a 1px-outlined circular shape (~32-44px) containing a single arrow glyph centered (→ ↗ ↓) — the design's most repeated UI element",
    "GALLERY CARDS with CAPTION-OVERLAY BOTTOM-LEFT + CORNER ↗ BUTTON — gallery cards are landscape interior photos with rounded corners holding a white-text caption (title + 2-line description) overlaid at the BOTTOM-LEFT and a 1px-outlined circular ↗ button at the BOTTOM-RIGHT corner",
    "PEEKING CARD AT VIEWPORT EDGE — gallery carousel rows have the third card partially clipped at the right edge of the viewport, signaling 'more available' without needing arrows or a count number",
    "LARGE EDITORIAL PULL-QUOTE with CURLY QUOTATION MARKS — a feature pull quote is rendered at 40-56px deep-black bold sentence-case sans wrapped with literal curly opening + closing quote glyphs ('\" ... \"'), separating the quote visually from regular headings",
    "AUTHOR ATTRIBUTION ROW with HAIRLINE + SOCIAL ICONS — pull-quote section ends with a horizontal 1px hairline followed by author name + role stacked LEFT and 3 thin-bordered circular social-icon buttons on the RIGHT — pure editorial column-rule convention",
    "BOLD SENTENCE-CASE HEADINGS, NEVER ALL-CAPS — every heading uses sentence case at 36-56px bold sans; the design's voice rejects all-caps shouting in favor of calm conversational typographic confidence",
    "FILLED BLACK PILL with WHITE ARROW for primary CTA — primary CTAs are deep-black filled rounded pills with white text + small white arrow → at the right edge ('Hire Us →', 'Go To Amenities →')",
    "CLEAN MINIMALIST 3-COL FOOTER with EMAIL INPUT as text-with-hairline + circular arrow button — footer's email subscribe is just a placeholder + a circular arrow button submit on the right with a thin hairline beneath the input — no boxed input, no fill, just typography + line",
    "EXTREME WHITESPACE / GENEROUS NEGATIVE SPACE — every section has 80-160px of vertical breathing room around content blocks; the hero left-half has nearly half its space empty between the headline+description and the bottom text-link CTAs, signaling architectural calm and confidence",
    "SLIDER DOT INDICATORS at BOTTOM — full-bleed CTA-hero slider uses 3 small dot indicators at the very bottom (active = filled black, inactive = outlined) for slide nav rather than arrows",
  ],
  uniqueTechniques: [
    "Slash-prefixed section labels as connective tissue — every section announces itself with a literal '/' slash before its label ('/ 01', '/ Dining room', '/ Gallery', '/ Our Work'), making the slash a tiny brand-level element that ties all sections together; this is more disciplined than typical tracking-wide labels and signals architectural-drafting/blueprint convention",
    "Floating photograph anchored to active typographic list row — the Our Work section uses a vertical typographic list of project names with a SMALL PHOTOGRAPH overlaying the active row (clipped/peeking, centered horizontally on the row); this visual technique replaces typical hover-photo-preview SaaS patterns with a static focused composition that feels editorial-magazine rather than app-feel",
    "Text-link-with-hairline secondary CTAs (instead of pills) — secondary actions use just label + arrow + a thin underline below, NO pill or border around the text; using these stacked vertically creates a subtle calm list of options that contrasts the bold black-pill primary CTA — this 2-tier CTA system is more elegant than dual-pill systems used by most studio sites",
    "Vertical scroll down indicator with rotated label — placing 'Scroll Down' rotated 90° on the left edge of the hero with a thin ↓ arrow signals 'this page expects scroll engagement' before the user has interacted; this is a subtle editorial-architectural detail that elevates the design's confidence",
    "Vertical thumbnail strip overlapping main image — placing 3-4 small square thumbnails AT THE LEFT EDGE of the main hero photograph (partially overlapping it) for variant navigation is unusual — most thumbnail strips sit BESIDE the main image; the overlap creates an editorial gallery-print quality",
    "Trusting photography as the only chroma — the design refuses chromatic accent in chrome (no orange, no green, no terracotta), letting the natural interior colors of the photographs (warm wood, sage chair fabric, terracotta accent objects) carry all chroma; this restraint is what makes the studio feel premium and is the design's central discipline",
    "Single-typeface hierarchy through size + weight + casing — using only sentence-case sans at varying sizes (13-72px) and weights (regular + bold) without ever introducing all-caps, italics, or serif accents creates calm typographic confidence; pairs with abundant whitespace for an architectural-magazine feel",
  ],
  spacing:
    "Calm architectural-studio spacing — extreme whitespace and generous negative space everywhere. Sections separated by 96-160px on desktop, content max-width ~1280px with comfortable side gutters, headline-to-body gap 24-32px, hero left-half has ~120-200px of empty vertical space between the headline+description and the bottom text-link CTAs, gallery cards 32-48px gaps between, typographic list rows 24-32px vertical padding around hairline dividers. Card border-radius 8-12px (modest, not super-rounded), button border-radius full-rounded (pill) for CTAs, image corner-radius 8-12px on photographs. Pull-quote section has the photograph and quote separated by ~80-120px of horizontal space. The whole design BREATHES — every element has abundant room around it, signaling the studio is confident enough to leave space empty.",
  moodKeywords: "minimal, calm, whitespace, architectural, studio, refined, sophisticated, monochrome, magazine, photography-led, editorial, contemporary, design-studio, scandinavian, japanese-minimal, restrained",
  animations:
    "Calm refined gallery-quality — section content fades in with a vertical slide-up on scroll-in (0.6s ease-out, y-32px → 0). Slash-prefixed labels: gentle fade-in with the slash glyph drawing in slightly before the label (0.3s + 0.2s). Hero text staggers in (label → headline → description → CTAs, 0.15s delays). Vertical scroll-down indicator: subtle continuous bounce on the ↓ arrow (4-6px translate-y loop over 2s). Vertical thumbnail strip: smooth cross-fade between active variants (0.4s) + thumbnail scale 1.03 on hover. Gallery cards: stagger fade-up (0.08s between, 0.5s ease-out), hover → scale 1.02 + ↗ button bg-darken. Our Work typographic list: hover on row → row name slightly slides right (4-8px) + ↗ button activates + the floating photo cross-fades to that row's photo (0.4s); active row stays elevated. Pull-quote curly quotes: gentle fade-in stagger (opening quote → quote text → closing quote, 0.1s delays). Slider dot indicators: smooth dot fill transition (0.3s) on slide change. Text-link-with-hairline CTAs: hover → hairline thickens slightly + arrow translate-x 4px right. Black pill CTAs: hover → bg lighten 10% + arrow translate-x 4px. Circular icon buttons: hover → bg darken or fill swap. Scroll velocity is uninterrupted — no scroll-snap, no parallax — the design's calm comes from absent motion as much as from present motion. Overall vocabulary stays gallery-quality refined, never aggressive.",
  heroTreatment:
    "CALM SPLIT-50/50 HERO on pure white #FFFFFF. ABOVE the hero, a clean white nav bar contains: a small abstract LOGOMARK on the LEFT (geometric icon — vertical bars / waveform style), CENTERED sentence-case nav links (Home [active] / Template / Resources / Community), and a 1px-outlined PILL 'Hire Us →' button on the RIGHT. INSIDE the hero, LEFT half contains (anchored top-left): a SLASH-PREFIXED PAGE NUMBER '/ 01' in small 13px gray sans, BELOW IT a SLASH-PREFIXED CATEGORY LABEL '/ Dining room' (or domain-equivalent) in slightly larger 15-17px dark sans, BELOW IT a MASSIVE bold sentence-case 2-LINE HEADLINE 'The new housing / development' (or domain-equivalent, ~52-72px Inter/Geist Bold), BELOW IT a 3-line muted-gray description, then ABUNDANT VERTICAL WHITESPACE, then anchored at the BOTTOM-LEFT of the left half a vertical stack of TWO TEXT-LINK-WITH-HAIRLINE secondary CTAs: each is just label text + a small arrow → on the right + a thin 1px horizontal hairline drawn UNDER the entire row width ('Explore our Workspace →' [hairline] / 'Explore our Amenities →' [hairline]). LEFT-EDGE-MIDDLE of the hero (NOT the left half — actual viewport left edge) contains a small VERTICAL 'Scroll Down' label rotated 90° with a thin downward arrow ↓. RIGHT half contains: a TALL FULL-HEIGHT INTERIOR PHOTOGRAPH (a beautifully styled dining room — warm wood floor, sage upholstered chairs, pendant lamp, bookshelf, soft natural light) running edge to edge with rounded corners (~8-12px), AND a VERTICAL THUMBNAIL STRIP of 4 small square room-variant photos stacked vertically at the photograph's LEFT EDGE (slightly OVERLAPPING the main photo) with the active thumbnail slightly brighter or larger, plus the TOP-RIGHT corner of the photo holds an additional 1px-outlined 'Hire Us →' pill button. The overall feeling is calm minimalist design studio — the visual confidence comes from abundant whitespace + slash labels + bold sentence-case headlines + the variant-thumbnail-overlap technique, with photography carrying all the chroma. NOT cinematic, NOT monumental — restrained and architectural.",
};

const record = {
  name: "Bolders Calm Minimal Interior Studio",
  industries: [
    "architecture",
    "interior design",
    "interior",
    "interiors",
    "interior decor",
    "interior architecture",
    "interior studio",
    "design studio",
    "architecture studio",
    "architecture firm",
    "interior design firm",
    "residential design",
    "commercial design",
    "hospitality design",
    "kitchen design",
    "bathroom design",
    "home staging",
    "home decor",
    "lighting design",
    "design consultancy",
    "minimalist interior",
    "scandinavian interior",
    "japanese minimal",
    "wabi-sabi",
    "rendering studio",
    "3d visualization",
    "construction",
    "renovation",
    "remodeling",
    "landscape architecture",
    "urban design",
    "real estate development",
  ],
  moods: [
    "minimal",
    "calm",
    "whitespace",
    "architectural",
    "studio",
    "refined",
    "sophisticated",
    "monochrome",
    "magazine",
    "photography-led",
    "editorial",
    "contemporary",
    "design-studio",
    "scandinavian",
    "japanese-minimal",
    "restrained",
    "quiet",
    "modern-minimal",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Bolders calm minimal interior studio pattern into design_patterns...");

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
