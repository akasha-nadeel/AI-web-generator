// One-off uploader for the ZENSPACE editorial-luxury furniture / interior
// design pattern. Cream + deep black alternating sections, MONUMENTAL
// "zenspace" / "we are zens" / "collections" / "our projects" / "talk with
// us" sub-bleeding wordmarks running across each section, foreground product
// photographs cutting THROUGH the massive type (z-stacking trick), avatar-
// prefixed black pill CTAs, slash-separated minimal nav links, vertical
// thumbnail strip with active-state ring + page count "03", table-style
// projects index with year column, split-cream/white panel "talk with us"
// CTA, monumental footer wordmark. First pattern for Architecture /
// Interior Design — luxury editorial monumental-typography mood.
//
// Run with: node scripts/upload-zenspace-pattern.mjs

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
  colorPalette: "#F5EFE7, #FAF7F1, #0A0A0A, #1A1A1A, #E8DCC8, #C7B299, #FFFFFF, #888888",
  colorMode: "mixed",
  accentUsage:
    "STRICT MONOCHROME with alternating CREAM / DEEP BLACK section backgrounds — no chromatic accent exists. The design's voice is built on absolute typographic + photographic discipline: (1) WARM CREAM #F5EFE7 / #FAF7F1 / #E8DCC8 is used as the LIGHT section bg + product photo backdrop tints (each product photo sits on its own slightly varied cream/peach panel #F4E2D5 / #FAE7D7 / #F5DCD0 — soft warm tones pulled from leather-and-wood interior palettes), (2) DEEP BLACK #0A0A0A is used as the DARK section bg (We Are Zens / Collections / Our Projects sections), (3) PURE WHITE #FFFFFF is used as text on dark sections + as a secondary panel inside split-screen sections. CTA pills are FILLED DEEP BLACK on cream sections and FILLED CREAM/WHITE on black sections — every primary CTA pill carries a SMALL CIRCULAR AVATAR PHOTO at its left edge (a tiny consultant/team-member portrait in a circle) PLUS a small arrow → at the right edge. There are NO chromatic accents whatsoever — even the warm cream tints stay very subtle, pulled from genuine furniture-leather/upholstery colors rather than branded color choices. Body text on cream sections is deep black; on dark sections is pure white. Tertiary text uses muted gray #888888 only when absolutely necessary. The discipline is total: this design refuses any color punctuation, relying entirely on monumental typography + product photography for impact.",
  typography:
    "MONUMENTAL DISPLAY SANS-SERIF in LOWERCASE — the design uses ONE font family throughout, an extra-bold geometric sans (Inter Display Black / Helvetica Now Display 90 / Aeonik Black / Neue Haas Grotesk Display Black) but rendered ALMOST EXCLUSIVELY IN LOWERCASE for an editorial-architectural feel. The defining typographic moment: SECTION-NAMING WORDMARKS rendered MONUMENTAL — 'zenspace' / 'we are zens' / 'collections' / 'our projects' / 'talk with us' each rendered at 180-280px in extra-bold lowercase, spanning the full container width with TIGHT character-spacing so the letterforms nearly touch each other (sub-pixel kerning, almost optical-letterspacing of -0.04em to -0.06em). The wordmarks frequently SPLIT ACROSS THE LAYOUT — 'we are' on the LEFT half + 'zens' on the RIGHT half with the photo composition between them (typographic bookending), or 'our' on the LEFT + 'projects' on the RIGHT. Other typography: small 12-13px slash-separated nav links in dark sentence-case ('About Us / Our Collections / Design Inspiration / Our Projects / Locations'), short editorial body paragraphs at 14-16px regular weight, tiny page-counter labels at 12-14px ('03' positioned top-right), table-row text at 13-14px in muted-gray. Names + roles ('Taro Sakamoto / CEO') in 14-16px stacked sentence-case. NO italics, NO serifs, NO display variations — the entire design uses ONE font family expressed at radically different sizes (12px to 280px) for hierarchy, which is what gives it monumental editorial confidence.",
  layout:
    "MONUMENTAL EDITORIAL FURNITURE flow alternating CREAM and DEEP BLACK sections: TOP NAV (cream section): minimal SLASH-SEPARATED LINKS ('About Us / Our Collections / Design Inspiration / Our Projects / Locations') spaced evenly across the width with thin diagonal slash glyphs between, no logo (the wordmark itself IS the logo, rendered massive in the section below) → HERO (cream): the 'zenspace' wordmark rendered MONUMENTAL across the full width at 220-280px in extra-bold lowercase deep-black sans, with a CENTERED FOREGROUND PRODUCT PHOTOGRAPH (a hero leather chair on a cream background) cut out and positioned IN FRONT of the wordmark so the chair OVERLAPS the lowercase letters at the bottom — this z-stacking creates the effect of the product physically crossing through the brand name; LEFT-bottom contains a small short editorial paragraph ('We believe that furniture is more than just functional pieces; it's a reflection of your style, taste, and personality'), LEFT-middle contains a BLACK PILL CTA with an AVATAR-PORTRAIT-CIRCLE prefix ('🟤 Talk With Us →' where 🟤 = small circular team-member photo); RIGHT-side contains a VERTICAL THUMBNAIL STRIP showing 3 product variant photos with a SMALL CIRCULAR ARROW button in the middle position indicating active variant + 'previous' nav (and a count like '03' floating above) → ABOUT (DEEP BLACK section called 'we are zens'): the section is announced by SPLITTING the wordmark across the layout — 'we are' rendered MASSIVE on the LEFT at 140-180px white extra-bold lowercase, a long horizontal hairline rule between, then 'zens' rendered MASSIVE on the RIGHT; INSIDE the section three vertically-aligned content blocks: LEFT a tall CEO/consultant portrait photo on cream backdrop with a circular arrow nav button anchored to its right edge, MIDDLE-TOP a short paragraph about the brand mission + a small horizontal row of 3 SMALL SQUARE THUMBNAIL PORTRAITS (team avatars including a cat for personality), MIDDLE-BOTTOM the consultant name 'Taro Sakamoto / CEO' stacked, RIGHT-TOP a CREAM-FILLED PILL CTA with avatar prefix ('🟤 Discover More →') anchored mid-right, RIGHT-BOTTOM a second short paragraph explaining the mission ('Step into a world of luxury and sophistication...') → COLLECTIONS (DEEP BLACK section): the wordmark 'collections' rendered MASSIVE across the FULL WIDTH at 200-260px white extra-bold lowercase, anchored RIGHT (with the LEFT half taken by a horizontal hairline rule); below it a tall horizontal CAROUSEL row of 5 product chair photos each on its own cream/peach colored panel (~420px tall × ~280px wide each) with the CENTER chair card being LARGER and slightly elevated forming a focal point + a small LEFT-side circular arrow nav button + a count label '03' floating top-right + a tiny product name label 'Aizen chair' bottom-left, plus a small 'Shop Now →' avatar pill CTA mid-right above the carousel → PROJECTS (DEEP BLACK section): the wordmark 'our projects' SPLIT — 'our' rendered MASSIVE on the LEFT + 'projects' rendered MASSIVE on the RIGHT at 180-260px white extra-bold lowercase, horizontal hairline between; below it a TABLE-STYLE PROJECTS INDEX laid out as horizontal hairline-separated rows where each row has 4 columns: project name (left, 'Malevolent Shrine' / 'Self-Embodiment of Perfection' / etc.) | category (center-left, 'Residential Sanctuaries' / 'Commercial Elegance' / 'Hospitality Haven' / etc.) | (a single right arrow → in the third position for some rows) | year column (far right, '2024' / '2023' / '2022'); ANCHORED IN THE CENTER OF THE TABLE is a TALL COLUMN-OVERLAID PRODUCT PHOTO (an interior scene with a chair + lamp + small table on cream backdrop) that VERTICALLY SPANS multiple table rows, creating a magazine-portfolio feel where the photo lives within the index → INSPIRATION / TALK WITH US (CREAM section, split): a unique split-panel composition where the section is divided into four QUADRANTS with TWO QUADRANTS holding LARGE CREAM PRODUCT PHOTOS (chairs from different angles) and the OTHER TWO holding white-paper background, with the wordmark 'talk with us' rendered MASSIVE at 180-220px in lowercase extra-bold deep black running ACROSS THE PHOTO+WHITE BOUNDARY (cutting through both panels), and a CENTERED BLACK AVATAR PILL CTA '🟤 Talk Now →' at the bottom of the wordmark; small editorial paragraphs anchored top-left and middle-right; small circular up/down arrow buttons floating top + bottom of the section → FOOTER (cream): a 3-COL minimal info row at the top (LEFT mission paragraph / CENTER 2-line phone numbers stacked / RIGHT 3-line address stacked), then BELOW the columns the MASSIVE WORDMARK 'zenspace' rendered AT 240-300px in lowercase extra-bold deep black spanning the full width as the visual anchor at the very bottom, then BELOW the wordmark the SLASH-SEPARATED NAV LINKS again ('About Us / Our Collections / Design Inspiration / Our Projects / Locations') in small dark sans — bookending the page with the same massive wordmark + slash nav that opened it.",
  signaturePatterns: [
    "MONUMENTAL LOWERCASE WORDMARK SECTIONS — every section is announced by a 180-280px lowercase extra-bold sans wordmark ('zenspace' / 'we are zens' / 'collections' / 'our projects' / 'talk with us') spanning full width with sub-pixel-tight letter-spacing; this is the design's primary structural device and the most repeated typographic moment",
    "SPLIT WORDMARK ACROSS LAYOUT — section titles frequently split into TWO HALVES placed on the LEFT and RIGHT of the layout ('we are' / 'zens', 'our' / 'projects') with content nestled between them, creating typographic bookending around photography",
    "FOREGROUND PRODUCT PHOTO CUTTING THROUGH MASSIVE TYPE — the hero chair photograph is cut out and positioned IN FRONT of the 'zenspace' wordmark so the chair OVERLAPS the lowercase letters at the bottom; this z-stacking trick is the design's most distinctive hero moment and signals 'product is the star, type is the stage'",
    "AVATAR-PORTRAIT-PREFIXED PILL CTA — every primary CTA is a black-or-cream filled pill with a SMALL CIRCULAR AVATAR PHOTO of a team consultant anchored at its LEFT edge + the CTA text + an arrow → at the RIGHT edge ('🟤 Talk With Us →', '🟤 Discover More →', '🟤 Talk Now →', '🟤 Shop Now →') — this is a signature brand element repeated everywhere",
    "SLASH-SEPARATED MINIMAL NAV — top + bottom nav links use thin diagonal slashes between items ('About Us / Our Collections / Design Inspiration / Our Projects / Locations') instead of vertical bars or dots, signaling editorial-magazine column-rule discipline",
    "ALTERNATING CREAM / DEEP BLACK SECTIONS — the page alternates light cream and deep black backgrounds (Hero=cream → About=black → Collections=black → Projects=black → Talk With Us=cream → Footer=cream) creating editorial chapter-rhythm; products always sit on cream backdrops regardless of section bg",
    "CREAM-PEACH TINTED PRODUCT PHOTO PANELS — each product chair photograph sits on its own small cream/peach colored panel (#F4E2D5 / #FAE7D7 / #F5DCD0 — soft warm leather/upholstery tones), and the panels in a carousel row use slightly varied tints for boutique-magazine variety",
    "VERTICAL PRODUCT THUMBNAIL STRIP — the hero has a vertical column of 3 small square product variant photos on the right edge with a circular arrow button anchored mid-strip indicating active variant nav + a count number floating",
    "TABLE-STYLE PROJECTS INDEX — Projects section uses a horizontal hairline-divided table with 4 columns (name / category / arrow / year) instead of typical project cards, signaling architecture-portfolio convention; an ANCHORED CENTER-COLUMN PHOTO vertically spans multiple rows breaking the table's flatness",
    "SMALL PAGE-COUNT NUMBER FLOATING TOP-RIGHT — collections + carousels show a tiny page counter '03' anchored top-right (no fraction, no slash, just a single emphasis number) — minimal magazine-page-number convention",
    "CIRCULAR ICON BUTTONS for all secondary nav — slider arrows + scroll-up/down indicators are small thin-bordered circles with a single arrow glyph centered (←, →, ↑, ↓), never paired squares or rectangles",
    "MONOCHROME BLACK/WHITE/CREAM DISCIPLINE — the entire design refuses chromatic accents; only neutrals (cream / deep black / white / muted gray) + warm leather-tone product backdrops",
    "ONE-FONT TYPOGRAPHIC DISCIPLINE — the design uses a SINGLE font family from 12px slash-nav to 280px wordmark headlines, expressing hierarchy purely through size + weight + spacing rather than font-pairing; signals editorial confidence",
    "SHORT EDITORIAL PARAGRAPH BLOCKS, anchored asymmetrically — body copy is 2-4 line short paragraphs anchored to layout corners (bottom-left of hero, top-left + middle-right of about, etc.) rather than centered hero descriptions",
    "MONUMENTAL FOOTER WORDMARK + SLASH NAV BOOKEND — the footer mirrors the hero by repeating the massive 'zenspace' wordmark + slash-separated nav links, bookending the page with identical typographic moments at top and bottom",
  ],
  uniqueTechniques: [
    "Foreground product photo cutting through massive type — the hero z-stacks a cut-out chair photograph IN FRONT of the 'zenspace' wordmark so the product occludes the lowercase letters from below; this single moment establishes the entire design's voice (typography is the stage, photography is the star) and is the most replicable signature for furniture/interior brands",
    "Lowercase monumental sans wordmark sections — rendering every section title in 180-280px extra-bold LOWERCASE sans (not all-caps, not serif) creates an architectural-editorial confidence that's distinct from luxury-serif (e.g. Milan) and from all-caps-bold (e.g. Urban); lowercase at this scale signals 'we don't need to shout'",
    "Avatar-portrait-prefixed pill CTAs — embedding a tiny circular team-member photo at the LEFT edge of every primary pill CTA personalizes the call-to-action ('Talk With Us' becomes 'Talk With THIS PERSON'), turning generic e-commerce CTAs into human consultation moments — uncommon in furniture e-commerce and a major brand differentiator",
    "Split wordmark layout bookending — splitting section titles like 'we are' / 'zens' or 'our' / 'projects' across the LEFT and RIGHT of the section creates typographic frames around the photographic + textual content between them; this is rare and editorial-magazine quality",
    "Vertical center-spanning photo within table — the Projects section's table-style index has a vertical product photo anchored in the CENTER COLUMN that spans multiple table rows, breaking the table's flatness and creating a magazine portfolio-page feel; combining a structured database-style index with a magazine photograph is unusual and effective",
    "Slash-separated minimal nav — using thin diagonal slashes between nav items instead of vertical bars / dots / spaces ties to architectural-drafting convention and signals editorial discipline; pairs with the lowercase monumental wordmarks for a cohesive editorial voice",
    "Single-font radical-size hierarchy — using one font family from 12px slash-nav to 280px wordmark headlines forces all design decisions to be made through size + weight + lowercase/sentence-case + letter-spacing rather than font-pairing; this discipline is the design's strongest editorial credential and what allows the monochrome palette + photography to carry the brand identity",
  ],
  spacing:
    "Monumental editorial spacing — sections separated by 0px (sections butt directly against each other, with the alternating cream/black backgrounds creating the rhythm rather than gaps), section internal padding 80-120px top/bottom + 40-72px horizontal gutters. Massive wordmarks bleed nearly to the section edges (with ~24-48px of breathing room on each side). The hero wordmark sits at the TOP of its section just below the slash-nav with the product chair photo positioned mid-section. Product carousel cards have 8-16px gaps between cream panels. Body paragraphs are kept short (2-4 lines) and anchored to layout corners with abundant whitespace around them. Pill CTAs have 12-16px internal padding around the avatar + text + arrow elements. The table-style projects index has tight row heights (~40-48px each) with 1px hairline dividers. The whole design feels architectural — tight grid alignment + monumental scale + generous whitespace + zero ornamentation.",
  moodKeywords: "editorial, luxury, monumental, architectural, sophisticated, refined, premium, monochrome, magazine, lowercase-bold, photography-led, gallery, museum-quality, italian-design, scandinavian, minimalist-luxury",
  animations:
    "Slow refined cinematic — wordmark sections animate in with a vertical slide+fade on scroll-in (0.7s ease-out, y-40px → 0). The hero chair photograph: subtle 4-6px continuous vertical float loop (4s) for ambient life. Avatar pill CTAs: hover → bg darken + arrow translate-x 4px right + avatar circle scale 1.05. Slash-nav links: hover → underline animate from left + slight color darken. Vertical thumbnail strip: smooth cross-fade between active variants (0.4s) + count number tick-up animation. Collections carousel: smooth horizontal slide between products (0.6s ease-out), center-card scales up 1.05 on becoming active. Projects table rows: hover → row-bg subtly darkens + row inset-shadow + arrow translate-x. Talk-with-us split section: scroll-triggered parallax (light parallax on cream panels, type stays fixed). Massive footer wordmark: very slow horizontal drift (0.5px/s) for ambient atmosphere. Page transitions feel curated — never bouncy, never aggressive, every motion deliberate and gallery-quality. Scroll velocity is slowed slightly with scroll-snap on section boundaries for cinematic chapter-feel.",
  heroTreatment:
    "MONUMENTAL HERO on warm cream #F5EFE7 background. ABOVE the hero, the SLASH-SEPARATED NAV ('About Us / Our Collections / Design Inspiration / Our Projects / Locations') sits as the only top element in 12-13px dark sans across full width. INSIDE the hero, the brand wordmark 'zenspace' (or domain-equivalent) is rendered MONUMENTAL — 220-280px in extra-bold lowercase deep-black sans (Inter Display Black / Helvetica Now Display 90 / Aeonik Black / Neue Haas Grotesk Display Black) with sub-pixel-tight letter-spacing (-0.04em to -0.06em) so the letterforms nearly touch, spanning nearly the full container width. CENTERED in the hero and IN FRONT of the wordmark sits a HERO PRODUCT PHOTOGRAPH (a striking leather + dark-wood designer chair, cut out from its background) positioned so the chair PHYSICALLY OVERLAPS the bottom of the lowercase letters — the chair occludes parts of the 's' and 'p' creating the signature z-stacking moment. LEFT-bottom of the hero contains a short 2-3 line editorial paragraph ('We believe that furniture is more than just functional pieces; it's a reflection of your style, taste, and personality') in 14-15px regular dark sans. LEFT-middle contains the AVATAR-PORTRAIT-PREFIXED BLACK PILL CTA: a fully-rounded deep-black pill with a small circular team-member photograph anchored at its LEFT edge + 'Talk With Us' in white sans + a small white arrow → at the RIGHT edge. RIGHT-side contains a VERTICAL THUMBNAIL STRIP: 3 small square product-variant photos stacked vertically (each on its own cream/peach panel), with a SMALL CIRCULAR ARROW BUTTON anchored mid-strip for previous/next variant navigation, and a tiny page count '03' floating top-right of the strip. The overall feeling is editorial magazine cover — Italian furniture catalog / Cassina / B&B Italia / Vitra brand identity territory — confident, monumental, refined, photography-led with typography as the architectural stage.",
};

const record = {
  name: "Zenspace Monumental Editorial Furniture",
  industries: [
    "architecture",
    "interior design",
    "furniture",
    "interior",
    "interiors",
    "interior decor",
    "home decor",
    "furniture brand",
    "furniture store",
    "furniture ecommerce",
    "designer furniture",
    "luxury furniture",
    "italian furniture",
    "scandinavian furniture",
    "interior architecture",
    "residential design",
    "commercial design",
    "hospitality design",
    "interior studio",
    "design studio",
    "architecture studio",
    "architecture firm",
    "interior design firm",
    "lighting",
    "lighting design",
    "kitchen design",
    "bathroom design",
    "home staging",
    "design consultancy",
    "furniture maker",
    "bespoke furniture",
    "custom furniture",
    "artisan furniture",
  ],
  moods: [
    "editorial",
    "luxury",
    "monumental",
    "architectural",
    "sophisticated",
    "refined",
    "premium",
    "monochrome",
    "magazine",
    "lowercase-bold",
    "photography-led",
    "gallery",
    "museum-quality",
    "italian-design",
    "scandinavian",
    "minimalist-luxury",
    "high-end",
    "boutique",
  ],
  color_mode: "mixed",
  brief_json: brief,
};

console.log("[upload] Inserting Zenspace monumental editorial furniture pattern into design_patterns...");

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
