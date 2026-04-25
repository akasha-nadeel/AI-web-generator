// One-off uploader for the JOURNIA premium editorial travel magazine pattern.
// Pure black + white monochrome editorial travel design — photography brings
// all the color, condensed all-caps grotesque headings, tracking-wide tiny
// section labels, ↗-arrow pill CTAs (black filled / white outlined), B&W
// desaturation on secondary destination images, asymmetric magazine image
// grids, +/− accordions, full-bleed cinematic hero. First pattern for
// Travel / Tourism / Hotel — Condé Nast Traveler / National Geographic
// editorial vibe.
//
// Run with: node scripts/upload-journia-pattern.mjs

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
  colorPalette: "#FFFFFF, #0A0A0A, #6B7280, #E5E7EB, #000000",
  colorMode: "light",
  accentUsage:
    "There is NO chromatic accent color — this is a STRICTLY monochrome editorial design where the photography supplies all chroma. The accent role is filled by pure BLACK #0A0A0A, used sparingly but decisively: (1) primary CTA pills are solid black filled rectangles with white sans-serif label + small white ↗ arrow icon ('CONTACT US', 'Explore More', 'Start Your Journey'), (2) the bold all-caps section headings are deep black on white, (3) the entire footer is a black surface with white text + white email-form 'SEND' button, (4) horizontal hairline dividers between stats are 1px #E5E7EB, (5) icons in feature cards are 1.5px stroke black line icons. Secondary CTAs invert: 1px BLACK BORDER outlined pill, white fill, black text + black ↗ ('Explore More', 'See More'). Body/secondary text is gray #6B7280. Critically: do NOT introduce any blue/orange/green/yellow accent — the design's whole power comes from monochrome restraint plus photography-as-color.",
  typography:
    "BOLD CONDENSED GROTESQUE ALL-CAPS for every heading — Aeonik Bold / Neue Haas Grotesk Display Bold / Druk Wide Bold / Anton at 700-800 weight, slightly compressed letterforms, very tight letter-spacing, ~52-72px for major headings, 32-40px for subsection headings. Headlines NEVER use serif or italic — pure modern grotesque feel throughout. Above every section heading there is a TINY all-caps TRACKING-WIDE section label (10-11px, weight 500, tracking 0.15em, color #6B7280, e.g. 'ABOUT US' / 'POPULAR DESTINATIONS' / 'RECOMMENDED DESTINATIONS' / 'WHAT WE OFFER' / 'WHY CHOOSE US' / 'GALLERY' / 'REVIEWS & FEEDBACK' / 'FREQUENTLY ASK QUESTIONS' / 'BLOG'). Body copy is standard sans (Inter / Geist / Aeonik Regular at 14-16px, line-height 1.55-1.65, color #6B7280). Stat NUMBERS are massive bold all-caps black at ~64-80px ('150+', '15+', '98%'). Testimonials use ITALIC body in serif-feel sans (or just italic sans) for the quote text ONLY — body italic is the single typographic exception. Nav links are 12-13px sans medium weight uppercase or sentence-case-but-styled-uppercase.",
  layout:
    "LIGHT editorial magazine flow on white: TOP white nav bar (full-width, no float, simple): 'JOURNIA' wordmark logo LEFT in compact bold all-caps + center horizontal nav links (HOME / ABOUT US / DESTINATIONS / TESTIMONIAL / FAQ / BLOG) in small dark sans + RIGHT cluster ('EN ▼' language selector + black pill 'CONTACT US' with white ↗) → FULL-BLEED CINEMATIC HERO photo (epic landscape — couple on mountain ridge looking over bay/ocean) with NO dark overlay, photo at full saturation, content overlaid: BOTTOM-LEFT massive bold white all-caps 2-line condensed headline 'DISCOVER THE WORLD ONE / MEANINGFUL JOURNEY AT A TIME' + below it a white pill 'Explore More ↗', BOTTOM-RIGHT a small white descriptive paragraph + 2 circular slider arrow icons (left arrow, right arrow in white circles) → ABOUT section: 2-col split, LEFT a tall portrait travel photo (hiker with yellow backpack), RIGHT 'ABOUT US' tiny label + bold all-caps 2-line heading + body description + 3 STAT ROWS each separated by a horizontal 1px hairline ('150+ │ DESTINATIONS / Carefully curated travel spots' / '15+ │ YEARS EXPERIENCE / Delivering reliable services' / '98% │ POSITIVE REVIEWS / High satisfaction rate') → POPULAR DESTINATIONS: 'POPULAR DESTINATIONS' label + bold heading LEFT + outlined 'Explore More ↗' pill RIGHT, then ASYMMETRIC 3-IMAGE GRID (one BIG portrait image left ~60% width + 2 smaller portrait images right 20%/20%), with caption below the big image ('RAJA AMPAT, INDONESIA' + description) → RECOMMENDED DESTINATIONS: label + bold heading + outlined 'Explore More ↗' pill, then a 4-IMAGE PORTRAIT ROW where the FIRST image is FULL COLOR with a 'CAPPADOCIA' caption + description overlay anchored bottom-left, and IMAGES 2/3/4 are DESATURATED BLACK & WHITE (the design's signature destination treatment) → WHAT WE OFFER: label + bold 2-line heading LEFT + small description RIGHT, then 3 BORDERED RECTANGULAR FEATURE CARDS in a row, each with: a small line-icon (calendar / location-pin / headset) top-left + bold all-caps card title + description + small ↗ arrow bottom-right (EASY BOOKING PROCESS / CURATED DESTINATIONS / 24/7 TRAVEL SUPPORT) → WHY CHOOSE US: label + bold heading LEFT + small description RIGHT, then 2-col split: LEFT a portrait travel photo (pagoda island) + a small caption below the image, RIGHT a 4-ROW ACCORDION list where the OPEN item shows a − minus icon + answer text and CLOSED items show a + plus icon (CURATED DESTINATIONS / EASY & FAST BOOKING / BEST VALUE PRICING / TRUSTED PARTNERS), each row separated by a horizontal hairline → GALLERY: small 'GALLERY' label CENTERED + centered 2-line bold heading 'EXPLORE STUNNING MOMENTS FROM OUR FAVORITE TRAVEL DESTINATIONS', then an ASYMMETRIC 4-IMAGE COMPOSITION with a TEXT-AND-LABEL block sitting in the middle column (top-left: selfie portrait, top-right: city selfie, center text col: description + 'TRAVEL MOMENTS' bold sub-heading + 2nd description + 'See More ↗' outlined pill at bottom, bottom-left: boat on water with white circular play-button overlay indicating video) → REVIEWS & FEEDBACK: label + bold heading LEFT + small description RIGHT, then 3 TESTIMONIAL CARDS in a row, each card has a large gray quote-mark glyph at TOP-LEFT, italic body quote in middle, avatar circle + bold name + 'Solo Traveler' role at the bottom-left → FULL-BLEED CTA BAND: a wide warm-toned cinematic photo (woman holding map, golden hour) BLEEDING edge-to-edge with white overlay text bottom-left 'READY TO START YOUR NEXT JOURNEY?' as bold all-caps + small description + a white pill 'Start Your Journey ↗' → FAQ: label + bold 2-line heading LEFT + small description below, RIGHT a 4-row +/− accordion (HOW DO I BOOK A TRAVEL PACKAGE? / CAN I CUSTOMIZE MY TRIP? / WHAT IS YOUR CANCELLATION POLICY? / DO YOU OFFER TRAVEL INSURANCE?) with the first item OPEN and answer text shown → BLOG: label + bold 2-line heading LEFT + outlined 'See More ↗' pill RIGHT, then MAGAZINE LAYOUT: LEFT one BIG featured blog (large landscape photo + bold all-caps post title 'TRAVELING TOGETHER REACHING NEW HEIGHTS' + description), RIGHT 4 STACKED SMALLER BLOG ROWS each with a small square photo on the LEFT + bold all-caps title + description on the RIGHT → NEWSLETTER + FOOTER: full-bleed dark cinematic mountain photo with bold white all-caps 'STAY CONNECTED WITH US' headline overlay top-left + a smaller inset photo of group selfie anchored RIGHT + email subscribe form (white email input + black 'SEND' button beside it) + small subscribe disclaimer below → BLACK FOOTER: 4-col on solid black bg: COL1 'JOURNIA' logo + tagline + 3 white circular social icons (telegram/instagram/x) / COL2 'EXPLORE' (Destinations / Adventure Trips / Culture Experience / Family Gateway) / COL3 'CUSTOMER SUPPORT' (FAQs / Contact Us / Travel Insurance / Cancellation Policy) / COL4 'ACTIVITIES' (Organized Trips / Booking / Requests) / bottom legal bar (Terms & Conditions │ Copyright 2025. All Right Reserved │ Cookies Policy).",
  signaturePatterns: [
    "TINY ALL-CAPS TRACKING-WIDE SECTION LABEL above every heading — 10-11px, weight 500, tracking 0.15em, gray #6B7280 ('ABOUT US' / 'POPULAR DESTINATIONS' / 'RECOMMENDED DESTINATIONS' / 'WHAT WE OFFER' / 'WHY CHOOSE US' / 'GALLERY' / 'REVIEWS & FEEDBACK' / 'FREQUENTLY ASK QUESTIONS' / 'BLOG') — appears above every single section heading without exception",
    "BOLD CONDENSED ALL-CAPS GROTESQUE HEADINGS — every section heading uses a slightly compressed grotesque (Aeonik Bold / Neue Haas Grotesk Display / Druk / Anton) at 700-800 weight, all-caps, tight tracking, 52-72px — no serifs, no italics, no decorative type",
    "DUAL PILL CTA SYSTEM — black-filled pill (white text + white ↗ arrow) for primary actions, 1px-black-outlined white-fill pill (black text + black ↗ arrow) for secondary actions; the ↗ arrow icon glyph appears on EVERY pill button across the design",
    "B&W DESATURATION on secondary destination images — the RECOMMENDED DESTINATIONS row has the FIRST image in FULL COLOR with a caption overlay and the remaining 3 images rendered DESATURATED to grayscale, creating an editorial-magazine focal hierarchy without any chromatic accent",
    "STAT ROWS divided by horizontal hairlines — '150+' / '15+' / '98%' rendered as massive bold all-caps black numbers (~72-80px) on the LEFT of each row with a label + description on the RIGHT, separated row-from-row by 1px #E5E7EB hairline dividers — no boxes, just typography",
    "ASYMMETRIC IMAGE GRIDS — destination grids never use uniform tiles; instead one BIG portrait image dominates plus 2-3 smaller portraits at varying widths (60/20/20 or 50/16/16/18) for an editorial composition",
    "+/− ACCORDION with HAIRLINE DIVIDERS — every accordion row has a + (closed) or − (open) icon anchored RIGHT, no rounded corners or backgrounds, just text and hairlines between rows; appears in WHY CHOOSE US and FAQ sections",
    "TESTIMONIAL CARD with LARGE QUOTE-MARK GLYPH at top — each testimonial card has a giant gray '\"' glyph at the top-left corner, italic body quote, and avatar + bold name + role footer aligned bottom-left",
    "CIRCULAR SLIDER ARROW BUTTONS — hero has two distinct white circular icon buttons (one with a left-arrow, one with a right-arrow) for slider navigation, anchored bottom-right of the hero photo",
    "FEATURE CARD with ICON TOP-LEFT + ↗ ARROW BOTTOM-RIGHT — 'WHAT WE OFFER' cards have a 1.5px stroke line-icon top-left and a small ↗ arrow at the bottom-right corner of each card, signaling the card is clickable",
    "FULL-BLEED CINEMATIC HERO with no dark overlay — the hero photo runs at full saturation with white text overlaid in the bottom corners only (heading bottom-left, description bottom-right) — no center crop, no gradient mask, the photo IS the hero",
    "FULL-BLEED CTA BAND with warm photo + white-pill CTA — a single mid-page section uses a full-bleed warm-toned cinematic photo with bold white all-caps overlay headline at bottom-left + a white pill CTA, breaking the white-page rhythm with imagery",
    "GALLERY composition with PLAY BUTTON OVERLAY — the gallery section shows a 4-image asymmetric layout where ONE of the images has a large white circular play-button overlay centered on it, signaling that it's a video",
    "MAGAZINE BLOG LAYOUT — one BIG featured blog post on the LEFT (landscape photo + bold all-caps headline + description) paired with 4 STACKED smaller blog rows on the RIGHT (small square photo + bold title + description per row)",
    "BLACK FOOTER with 4-COL LINKS + EMAIL SUBSCRIBE — the only black surface in the entire design (other than CTA pills) is the footer, which combines a logo+tagline+social-icons column with 3 link columns and an email subscribe section above it",
  ],
  uniqueTechniques: [
    "STRICT MONOCHROME RESTRAINT — the entire design uses only #FFFFFF, #0A0A0A, and grays; the photography is the SOLE source of chroma. Adding any chromatic accent (orange/blue/green) would destroy the design's editorial-magazine voice. This is the central design discipline of the whole pattern",
    "B&W DESATURATION OF SECONDARY IMAGES as a focal-hierarchy device — instead of using color or size to draw the eye to the 'featured' destination, the first image is in full color while siblings are pushed to grayscale; this is the design's most distinctive editorial signature",
    "↗-ARROW PILL VOCABULARY — every CTA across the entire design ends with the same ↗ glyph, creating a brand-level micro-language that ties black-filled and outlined pills together as a single unified call-to-action system",
    "TYPOGRAPHIC STAT TREATMENT (no boxes, no cards) — the stats section is just three rows of huge bold numbers + tiny label + thin gray description separated by 1px hairlines, demonstrating that editorial layouts can show numbers without ANY boxing or chrome",
    "ASYMMETRIC IMAGE COMPOSITION as a layout philosophy — every image grid in the design uses non-uniform tile widths (the popular destinations grid, the gallery, the recommended destinations row, the blog magazine layout) — uniform tile grids are intentionally avoided to keep the editorial feel",
    "SECTION LABEL + BOLD-CAPS HEADING + GRAY DESCRIPTION SPLIT — every section uses the same 3-part anchor: (1) tiny tracking-wide gray label, (2) bold condensed all-caps multi-line heading anchored LEFT, (3) small gray description anchored RIGHT — this rhythm repeats 8+ times and is the design's primary structural device",
    "CINEMATIC FULL-SATURATION HERO with no overlay — the hero photo sits at full color/saturation with white text laid in the bottom corners only, defying the standard 'dark gradient overlay' convention; this requires the photo's bottom edge to be naturally darker (rocks, ground) but the photographic-truth feel pays off",
  ],
  spacing:
    "Generous editorial-magazine spacing — sections separated by 96-128px on desktop, content max-width ~1280px with comfortable side gutters, headline-to-body gap 24-32px, accordion row vertical padding 20-28px, stat-row vertical padding 32-40px between hairlines, card internal padding 28-36px. The design BREATHES — there is no compressed energy or kinetic tightness. Image grids have small gaps (8-12px) so the photography reads as a continuous editorial composition rather than a separated tile grid.",
  moodKeywords: "editorial, premium, magazine, sophisticated, calm, monochrome, journalistic, wanderlust, curated, restrained, photography-led, conde-nast, condé-nast-traveler, national-geographic, refined",
  animations:
    "Subtle and disciplined — fade-up reveal on scroll for headings (0.5s ease-out, y-20px → 0), staggered fade for stat rows (0.1s delay between each), staggered fade for image-grid items (0.08s delay between each), hover scale 1.03 on photo cards with subtle shadow elevation, hover background-darken for black pill CTAs + ↗ icon translate-x 4px, hover invert for outlined pills (white→black bg, black→white text), accordion open transition 0.3s height auto + +/− icon rotate, slider arrow buttons hover invert circle bg. NO bouncing, NO continuous motion, NO bold parallax — the design's editorial restraint extends to motion. The hero photo may have a very slow zoom (1.0 → 1.05 over 8s) for cinematic life.",
  heroTreatment:
    "FULL-BLEED CINEMATIC LANDSCAPE PHOTOGRAPH (an aspirational travel scene — two hikers on a mountain ridge looking out over a bay/ocean with islands and distant peaks, golden-hour or soft-overcast light) at FULL SATURATION with NO dark overlay or gradient mask. ABOVE the photo sits a SIMPLE WHITE TOP NAV BAR (full-width, not floating) containing: 'JOURNIA' bold all-caps wordmark logo on the LEFT in tight black sans-serif, CENTERED horizontal nav links (HOME / ABOUT US / DESTINATIONS / TESTIMONIAL / FAQ / BLOG) in small dark sans, and on the RIGHT an 'EN ▼' language dropdown + a black-filled pill 'CONTACT US' with white text and a small white ↗ arrow. OVERLAID on the photograph: BOTTOM-LEFT positioned content includes a MASSIVE bold condensed all-caps WHITE 2-line headline 'DISCOVER THE WORLD ONE / MEANINGFUL JOURNEY AT A TIME' (~64-80px, tight letter-spacing) and BELOW the headline a single white-filled pill 'Explore More ↗' (white bg, dark text, small ↗ icon). BOTTOM-RIGHT positioned content includes a small white descriptive paragraph ('Explore handpicked destinations and thoughtfully designed trips that turn every journey into lasting memories.') and to its right two CIRCULAR WHITE ICON BUTTONS (left-arrow circle + right-arrow circle) for slider navigation. CRITICALLY there is NO color tint, NO dark gradient, NO centered hero text — the photo's natural bottom-edge darkness (rocks, foreground) carries the white text, and the entire effect is editorial photography-first, not branded-poster overlay.",
};

const record = {
  name: "Journia Editorial Travel Magazine",
  industries: [
    "travel",
    "tourism",
    "hotel",
    "travel agency",
    "tour operator",
    "vacation",
    "trip planning",
    "destination",
    "adventure travel",
    "luxury travel",
    "boutique travel",
    "travel platform",
    "booking",
    "resort",
    "hospitality",
    "cruise",
    "safari",
    "expedition",
    "guided tours",
    "travel blog",
  ],
  moods: [
    "editorial",
    "premium",
    "magazine",
    "sophisticated",
    "calm",
    "monochrome",
    "journalistic",
    "wanderlust",
    "curated",
    "restrained",
    "photography-led",
    "refined",
    "cinematic",
    "minimal",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Journia editorial travel pattern into design_patterns...");

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
