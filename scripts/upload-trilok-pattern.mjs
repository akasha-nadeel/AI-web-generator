// One-off uploader for the TRILOK dark cinematic streaming/gaming entertainment
// platform pattern. Pure-black + vivid signature red #E63838 single-accent
// system with bold-color-block genre tile palette as scoped exception, full-
// bleed cinematic immersive hero photo (movie/game scene with subject) +
// CENTERED RED-CIRCLE-OUTLINE PLAY BUTTON overlay, tiny tracking-wide white
// eyebrow ("STAR FOX ENTERTAINMENT PRESENTS"), RED ALTERNATE-LANGUAGE SUBTITLE
// ("BEDER MEYE" — secondary-language transliteration above the main title),
// MASSIVE STYLIZED STENCIL/JUNGLE-LETTERFORM HERO TITLE ("JYOTSNA" — display
// font with cinematic theatrical poster-style letterforms, sometimes with
// foliage/texture wrapping the letters), meta-info ROW with • bullet
// separators (year • runtime • language • genre), 'STREAMING NOW' red label
// below play button, bottom-right HORIZONTAL ROW of 5 SMALL THUMBNAIL POSTER
// PREVIEW CARDS as carousel pagination indicators, MASSIVE RED CONDENSED ALL-
// CAPS 2-LINE SECTION LABELS on the LEFT side of every section ('LATEST /
// RELEASE' / 'TOP / TRENDING' / 'SELECT / GENERE'), 'DRAG TO NEXT →' small
// text indicator below each section label, MOVIE/GAME POSTER CARD CAROUSEL
// ROWS (4 visible vertical cards per row + edge-peek hint of next), TOP
// TRENDING uses MASSIVE NUMBERED OVERLAYS (1 / 2 / 3 / 4 in 240-340px white
// outline-stroke condensed bold sans) at BOTTOM-LEFT of each poster with the
// number FLOWING OFF the card edge into the row below, SELECT GENRE row with
// BOLD COLOR-BLOCK SQUARE TILES (red ROMANTIC / purple THRILLER / teal COMEDY
// / orange ADVENTURE — each ~280-320px solid color tile with white centered
// all-caps label), 'trilok.' lowercase wordmark logo with small red accent
// dot after the period, top-right small CIRCULAR RED 'Aa' ACCESSIBILITY
// TOGGLE BUTTON, 4-column dark footer with logo + Company/Premium/Quick/
// Follow link columns + small social icon row. First pattern for Gaming
// industry — also covers streaming/entertainment-platform/movie-app moods
// (the dark cinematic immersive content-discovery aesthetic).
//
// Run with: node scripts/upload-trilok-pattern.mjs

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
  colorPalette: "#0A0807, #141110, #1F1A18, #FFFFFF, #B8AFA8, #6B6360, #E63838, #C92E2E, #E63838, #8B5CF6, #2DD4BF, #F97316",
  colorMode: "dark",
  accentUsage:
    "DARK CINEMATIC IMMERSIVE-CONTENT palette built on a confident SINGLE VIVID RED #E63838 primary accent over deep-warm-black backgrounds + a SCOPED 4-color genre-tile palette for the 'Select Genre' content-discovery row. (1) DEEP WARM BLACK #0A0807 (with very-dark-warm-gray variant #141110) is the primary section background — slightly warm-tinged black (NOT cold-blue navy black, NOT pure-cinematic theatre black) suggesting candle-lit ambient cinema warmth + suiting movie/game poster art that often has warm tones. (2) SLIGHTLY LIGHTER WARM-CHARCOAL #1F1A18 for occasional card layers + footer bg variation. (3) VIVID SIGNATURE RED #E63838 (with deeper variant #C92E2E for hover/active) is the SIGNATURE PRIMARY ACCENT — used for: 'Sign Up' top-right NAV PILL CTA (small filled red pill ~80-100×36-40px), the LARGE CENTERED PLAY BUTTON OUTLINE on hero (~80-100px circle with 2-3px red border + white play triangle inside, sometimes with a subtle red glow/halo), 'STREAMING NOW' tiny tracking-wide red label below play button, RED ALTERNATE-LANGUAGE SUBTITLE 'BEDER MEYE' (or domain-equivalent secondary-language script) ABOVE the main hero title in 14-16px tracking-wide red sans, MASSIVE 2-LINE RED CONDENSED ALL-CAPS SECTION LABELS on the LEFT side of every section ('LATEST / RELEASE' / 'TOP / TRENDING' / 'SELECT / GENERE' at 64-96px each line, vivid red), the SMALL CIRCULAR RED 'Aa' ACCESSIBILITY TOGGLE BUTTON top-right of nav (small ~36-44px filled red circle with white 'Aa' inside), the 'trilok.' LOGO ACCENT DOT (the small red dot after the period in 'trilok.' lowercase wordmark), 'DRAG TO NEXT →' small accent text + arrow indicator below each section label, ROMANTIC genre tile bg (the first of the 4 color tiles in the genre row uses the brand red #E63838). (4) PURE WHITE #FFFFFF for primary text (massive titles, body bold, MASSIVE numbered Top-Trending overlays). (5) WARM LIGHT GRAY #B8AFA8 for body text and descriptions + secondary meta info. (6) MUTED WARM GRAY #6B6360 for tertiary text (drag indicators, copyright, secondary footer links). (7) SCOPED 4-COLOR GENRE-TILE PALETTE (used STRICTLY for the 'Select Genre' content-discovery row ONLY, never elsewhere): VIVID RED #E63838 for ROMANTIC + VIVID PURPLE #8B5CF6 for THRILLER + VIVID TEAL #2DD4BF for COMEDY + VIVID ORANGE #F97316 for ADVENTURE — these 4 colors are confidently saturated solid blocks (no gradient, no texture) and only appear as the genre-tile bgs; the discipline of restricting multi-color to ONE specific content-discovery row preserves the design's overall single-red identity while providing visual differentiation in the one place where category navigation actually matters. (8) The TRILOK LOGO uses a lowercase 'trilok.' wordmark in WHITE sans bold tracking-tight + a small RED ACCENT DOT immediately AFTER the period (the dot is the only red mark in the otherwise-white wordmark, signaling brand recognition); appears identically in nav (top-center) and footer (bottom-left). The accent system overall is single vivid red + scoped 4-color genre palette + warm dark-base — confident cinematic-immersive content-discovery identity.",
  typography:
    "MIXED TYPOGRAPHIC SYSTEM combining: (A) BOLD CONDENSED MODERN SANS for section labels + meta + UI; (B) STYLIZED THEATRICAL DISPLAY for the MASSIVE hero title; (C) CLEAN MODERN SANS for body. SPECIFIC PAIRINGS: (1) MASSIVE HERO TITLE rendered in 96-160px BOLD CONDENSED DISPLAY OR STYLIZED THEATRICAL POSTER LETTERFORMS — the title can appear in: a) heavily-condensed bold sans (Druk Wide / Anton / Bebas Neue Bold / Barlow Condensed Black) WHITE with letter-spacing tight to negative; OR b) STYLIZED THEATRICAL POSTER FONT with foliage/jungle/texture/distress wrapping the letterforms (the JYOTSNA reference shows letters with foliage/dripping textural elements giving them a movie-poster-stencil quality); the choice depends on genre/mood — horror/thriller use the textural variant, action/adventure use the condensed bold. (2) RED ALTERNATE-LANGUAGE SUBTITLE 'BEDER MEYE' (or domain-equivalent secondary-script) rendered in 14-18px tracking-wide RED #E63838 sans medium ABOVE the main title. (3) Tiny tracking-widest WHITE ALL-CAPS PRESENTS-EYEBROW 'STAR FOX ENTERTAINMENT PRESENTS' rendered in 11-13px regular sans WHITE tracking-widest, ABOVE the red language subtitle (3-tier eyebrow stack: tracking-wide white presents → red language → MASSIVE display title). (4) Hero meta-info row '2023 • 2h 7m • Multi Language • Sci-fi/Adventure' rendered in 14-16px regular sans LIGHT-WARM-GRAY with • bullet separators between items. (5) Hero description (body paragraph) rendered in 14-16px regular sans LIGHT-WARM-GRAY 2-3 lines with a 'more' inline LINK (small white sans medium with subtle underline) at the end. (6) MASSIVE 2-LINE RED CONDENSED ALL-CAPS SECTION LABELS 'LATEST / RELEASE' / 'TOP / TRENDING' / 'SELECT / GENERE' rendered in 64-96px BOLD CONDENSED ALL-CAPS sans (700-900) VIVID RED #E63838 — STACKED vertically as 2 lines on the LEFT side of each section (each line on its own line with each line containing 1 word); the giant red section labels are the design's most repeated structural identity gesture. (7) 'DRAG TO NEXT →' indicator rendered in 11-13px tracking-wide regular sans MUTED WARM GRAY with a small ↘/→ arrow glyph after, BELOW the section label on the LEFT side. (8) Movie/game poster card titles 'SABOO' / 'VIKINGS' / 'Trikon Premer Goppo' / 'Gladiator' rendered in 18-28px sans bold (700-900) WHITE with small inline tag like 'ULTIMATE SOLDIER' eyebrow above (12-14px regular sans); titles are typically OVERLAID on the poster image at the bottom-half (anchored bottom-center on each poster with subtle bottom-fade gradient overlay for legibility). (9) 'STREAMING NOW' label below play button rendered in 12-14px tracking-wide RED sans medium #E63838. (10) Genre tile labels 'ROMANTIC' / 'THRILLER' / 'COMEDY' / 'ADVENTURE' rendered in 22-32px sans bold (700) WHITE all-caps tracking-wide centered on each colored tile. (11) MASSIVE NUMBERED OVERLAYS '1' / '2' / '3' / '4' on Top Trending posters rendered in 240-340px BOLD CONDENSED OUTLINE-STROKE sans (Anton / Bebas Neue / Druk Bold) WHITE with an OUTLINE-ONLY treatment (1.5-3px white stroke with transparent fill) so the number reads as 'numeral skeleton' allowing the poster behind to show through partially; the number is positioned BOTTOM-LEFT of each poster card with the number FLOWING DOWN OFF THE CARD EDGE into the row below — Netflix-Top-10-style anchor. (12) Footer column headings 'Company' / 'Premium Movies' / 'Quick Links' / 'Follow Us' rendered in 14-16px sans medium (500-600) WHITE. (13) Footer link items 'About Us' / 'Privacy Policy' / 'Contact Us' rendered in 13-15px regular sans WARM LIGHT-GRAY. (14) 'trilok.' wordmark rendered in 18-24px sans bold (700-800) WHITE lowercase tracking-tight with a small RED #E63838 accent dot after the period. NO italic, NO serif (except possibly stylized display poster fonts for the hero title). Dominant typographic identity is BOLD CONDENSED ALL-CAPS sans with the MASSIVE display-poster hero title as the cinematic flourish.",
  layout:
    "DARK CINEMATIC IMMERSIVE-CONTENT-DISCOVERY flow — pure-warm-black sections throughout with subtle ambient red glow at edges. TOP NAV (overlaid on hero photo, FLOATING-TRANSPARENT bar): LEFT a small WHITE HAMBURGER MENU ICON (~20-24px, 3 horizontal lines), CENTERED 'trilok.' wordmark logo (small ~80-100px wide, white sans bold lowercase + small red dot accent), RIGHT a horizontal pair: small RED FILLED PILL 'Sign Up' (~80-100×36-40px, vivid red #E63838 bg, white text, fully-rounded with a tiny down-chevron after suggesting dropdown/menu) + small CIRCULAR RED 'Aa' ACCESSIBILITY TOGGLE (~36-44px filled red circle with white 'Aa' inside) — the entire nav is INTENTIONALLY MINIMAL: 1 hamburger + centered logo + 1 CTA pill + 1 accessibility toggle → HERO (full-bleed cinematic immersive content photograph): a full-bleed cinematic photograph of a featured movie/show/game scene (e.g. a girl in jungle/horror setting with dramatic warm-amber lighting and out-of-focus crowd silhouettes in background) running edge-to-edge with a SUBTLE DARKENING VIGNETTE OVERLAY (~30-40% opacity at edges and bottom, lighter at center to preserve subject visibility). Content LEFT-aligned starting around 5-7% from the left edge: a 3-TIER EYEBROW STACK consisting of: TINY TRACKING-WIDEST WHITE ALL-CAPS 'STAR FOX ENTERTAINMENT PRESENTS' eyebrow (11-13px regular sans) + below it ~12-16px gap to RED ALTERNATE-LANGUAGE SUBTITLE 'BEDER MEYE' (14-18px tracking-wide red sans medium) + below it ~16-24px gap to a MASSIVE STYLIZED HERO TITLE 'JYOTSNA' (96-160px bold condensed display OR stylized theatrical poster font with foliage/textural letterforms — varies by genre); BELOW the title ~24-32px gap to a META-INFO ROW '2023 • 2h 7m • Multi Language • Sci-fi/Adventure' (14-16px regular light-warm-gray with • bullet separators); BELOW it ~16-24px gap to a 2-3 LINE BODY DESCRIPTION 'A jungle at a wildlife amusement park, which contains cloned dinosaurs, soon becomes a horrifying experience...' (14-16px regular light-warm-gray) with a 'more' inline link at the end. CENTERED on the hero (or slightly right-of-center, vertically-centered): a LARGE RED-CIRCLE-OUTLINE PLAY BUTTON (~80-100px circle with 2-3px red #E63838 border + transparent fill + white play triangle inside, sometimes with a subtle red halo glow); BELOW the play button a tiny tracking-wide RED 'STREAMING NOW' label (12-14px regular). BOTTOM-LEFT of the hero a horizontal pair of SMALL CIRCULAR ←/→ NAV ARROW BUTTONS (~36-44px each, transparent bg with subtle white border, white arrow inside) for hero carousel control. BOTTOM-RIGHT of the hero a horizontal row of 5 SMALL THUMBNAIL POSTER PREVIEW CARDS (each ~80×100-120px small movie/show/game poster thumbnails, with one slightly highlighted/active) showing carousel position + previews of upcoming hero slides → LATEST RELEASE (dark): LEFT 12-14% column contains a MASSIVE 2-LINE RED CONDENSED ALL-CAPS SECTION LABEL 'LATEST / RELEASE' (each word on its own line at 64-96px in vivid red) + below it ~16-24px gap to small 'DRAG TO NEXT →' tracking-wide muted-gray indicator; RIGHT 86-88% column contains a HORIZONTAL CAROUSEL ROW of 4-5 VERTICAL POSTER CARDS (each ~280-320×420-480px, full-bleed movie/show/game artwork photograph, rounded 8-12px corners) with content BOTTOM-ANCHORED INSIDE each poster: small white sans medium eyebrow tag like 'ULTIMATE SOLDIER' (12-14px) + bigger title 'SABOO' / 'VIKINGS' / 'Trikon Premer Goppo' (18-28px sans bold) — the labels read against subtle bottom-fade gradient overlay for legibility; the 4th-5th poster shows partially clipped on the right edge as edge-peek hint of more content → TOP TRENDING (dark): LEFT 12-14% column contains MASSIVE 2-LINE RED CONDENSED ALL-CAPS SECTION LABEL 'TOP / TRENDING' (64-96px each line vivid red) + below 'DRAG TO NEXT →' indicator; RIGHT 86-88% column contains a HORIZONTAL CAROUSEL ROW of 4-5 VERTICAL POSTER CARDS but with the SIGNATURE MASSIVE NUMBERED OVERLAYS — each poster has a MASSIVE NUMBER (1 / 2 / 3 / 4 / 5) rendered in 240-340px BOLD CONDENSED OUTLINE-STROKE sans WHITE (Anton/Bebas Neue/Druk Bold weight, 1.5-3px white stroke with TRANSPARENT FILL so the poster behind shows through the numeral interior) positioned BOTTOM-LEFT of each poster card with the number FLOWING DOWN OFF THE CARD EDGE into the row below the card (the bottom of the numeral extends beyond the poster bottom, creating dramatic visual anchoring); the poster titles 'Gladiator' / 'OMMIANUO MAMAO' (or stylized variants per genre) appear OVER the poster + the number appears BEHIND the poster (the number layer sits in z-order behind the poster edge but in front of the dark section bg) → SELECT GENRE (dark): LEFT 12-14% column contains MASSIVE 2-LINE RED CONDENSED ALL-CAPS SECTION LABEL 'SELECT / GENERE' (64-96px each line vivid red) + below 'DRAG TO NEXT →' indicator; RIGHT 86-88% column contains a HORIZONTAL ROW of 4 BOLD COLOR-BLOCK GENRE TILES (each ~280-320×320-360px square, solid saturated color bg, rounded 12-16px corners, no border, no photo): TILE 1 'ROMANTIC' VIVID RED #E63838 + TILE 2 'THRILLER' VIVID PURPLE #8B5CF6 + TILE 3 'COMEDY' VIVID TEAL #2DD4BF + TILE 4 'ADVENTURE' VIVID ORANGE #F97316; each tile has a CENTERED 22-32px sans bold WHITE all-caps label ('ROMANTIC' / 'THRILLER' / 'COMEDY' / 'ADVENTURE') + the 5th tile peeks partially clipped on the right edge → DARK FOOTER: TOP a 4-COLUMN GRID — COL1 (~25%): 'trilok.' wordmark + 2 contact info rows with small icons LEFT (envelope + phone) + email/phone text (e.g. 'trilok99@example.com' + '+91 2390 21940'); COL2 'Company' bold heading + vertical text-link list ('About Us / Privacy Policy / Contact Us'); COL3 'Premium Movies' bold heading + vertical text-link list ('Primal / Dead Evil / Joker'); COL4 'Quick Links' bold heading + vertical text-link list ('Terms of Use / Error / Share Feedback'); COL5 'Follow Us' bold heading + horizontal row of 4-5 small SOCIAL ICONS (facebook / twitter / instagram / pinterest / x in white outline); BOTTOM a small horizontal divider line + bottom row 'Site created on Google Chrome XXX, Microsoft Edge XX, Mozilla Firefox 77, Safari X.X.X. © 2023 trilok All rights reserved.' (small muted-warm-gray sans).",
  signaturePatterns: [
    "MASSIVE 2-LINE RED CONDENSED ALL-CAPS SECTION LABELS on LEFT side — every major section uses a MASSIVE 2-LINE RED CONDENSED ALL-CAPS LABEL stacked on the LEFT side of the section ('LATEST / RELEASE' / 'TOP / TRENDING' / 'SELECT / GENERE' at 64-96px each line in vivid red #E63838); the 2-line vertical stack with each word on its own line gives every section a monumental-section-anchor that reads as cinema-poster-credit-roll typography — the design's most repeated structural identity gesture",
    "MASSIVE NUMBERED OUTLINE-STROKE OVERLAYS on Top Trending posters — Top Trending poster cards have MASSIVE 240-340px BOLD CONDENSED OUTLINE-STROKE numbers (1/2/3/4/5) in white with TRANSPARENT FILL (1.5-3px white stroke only, no fill) positioned BOTTOM-LEFT of each poster with the number FLOWING DOWN OFF THE CARD EDGE into the row below; the 'numeral skeleton' treatment (Netflix Top 10 style but more dramatic) is the design's most arresting visual moment and instantly communicates 'leaderboard / trending' without any chart UI",
    "BOLD COLOR-BLOCK GENRE TILES for content discovery — the Select Genre row uses 4 SOLID SATURATED COLOR-BLOCK SQUARE TILES (~280-320×320-360px) instead of poster cards: ROMANTIC vivid red #E63838 + THRILLER vivid purple #8B5CF6 + COMEDY vivid teal #2DD4BF + ADVENTURE vivid orange #F97316; the multi-color tiles are STRICTLY scoped to this one content-discovery row (preserving the design's overall single-red discipline) and confidently use color-as-genre-language rather than imagery",
    "FULL-BLEED CINEMATIC HERO + CENTERED RED-CIRCLE-OUTLINE PLAY BUTTON — the hero photograph runs edge-to-edge with a SUBTLE DARKENING VIGNETTE + a CENTERED LARGE RED-CIRCLE-OUTLINE PLAY BUTTON (~80-100px circle with 2-3px red border + transparent fill + white play triangle + subtle red halo glow); the centered play button reads as 'click to watch trailer / play' and is the design's most identifiable hero interaction element",
    "3-TIER HERO EYEBROW STACK (white-presents → red-language-subtitle → MASSIVE display title) — the hero title is preceded by 2 stacked eyebrow lines: TINY TRACKING-WIDEST WHITE ALL-CAPS 'STAR FOX ENTERTAINMENT PRESENTS' (presents-credit) + RED ALTERNATE-LANGUAGE SUBTITLE 'BEDER MEYE' (transliteration of the title in a secondary language script); the 3-tier stack mimics movie-poster credit hierarchy and is rare in marketing-site headings",
    "STYLIZED THEATRICAL DISPLAY HERO TITLE — the MASSIVE hero title is rendered in 96-160px STYLIZED THEATRICAL POSTER FONT with foliage/jungle/texture/distress wrapping the letterforms (e.g. JYOTSNA reference shows letters with foliage/dripping organic elements giving them movie-poster-stencil quality); for genres that don't fit the textural treatment, fallback is BOLD CONDENSED display sans (Druk Wide / Anton / Bebas Neue / Barlow Condensed Black) at the same massive size",
    "CARD-CAROUSEL EDGE-PEEK HINT for content rows — Latest Release / Top Trending / Select Genre rows all show 4 FULL CARDS + the 5th CARD PARTIALLY CLIPPED on the right edge (~80-120px shown) creating a permanent 'there's more to drag' visual hint without requiring extra UI; pairs with the 'DRAG TO NEXT →' indicator below each section label",
    "'DRAG TO NEXT →' INDICATOR below section labels — every section has a small tracking-wide muted-warm-gray 'DRAG TO NEXT →' text + arrow indicator placed below the MASSIVE red section label on the LEFT column; it reads as both an instruction and a pacing element that gives users permission to interact horizontally",
    "BOTTOM-RIGHT 5-THUMBNAIL POSTER PREVIEW PAGINATION — the hero has a horizontal row of 5 SMALL THUMBNAIL POSTER PREVIEW CARDS bottom-right (~80×100-120px each) showing previews of upcoming hero slides + carousel position; one thumbnail is slightly highlighted/larger as the active state — much more cinematic than dot pagination",
    "SMALL CIRCULAR RED 'Aa' ACCESSIBILITY TOGGLE in nav — top-right of nav has a SMALL CIRCULAR RED 'Aa' BUTTON (~36-44px filled red circle with white 'Aa' inside) signaling accessibility/text-size toggle; rare and signals the platform's commitment to viewer accessibility (a distinctive premium-streaming touch)",
    "'trilok.' LOWERCASE WORDMARK WITH RED ACCENT DOT — the brand uses a lowercase 'trilok.' wordmark in WHITE sans bold tracking-tight + a small RED #E63838 ACCENT DOT immediately AFTER the period; the period-becomes-red is the distinctive brand signature mark, identical in nav and footer",
    "BOTTOM-ANCHORED OVERLAID POSTER TITLES — Latest Release / Top Trending poster cards have content (small eyebrow tag + bigger title) BOTTOM-ANCHORED INSIDE each poster image (overlaid on the image at the lower portion with subtle bottom-fade gradient for legibility) rather than below the poster card; matches Netflix/Disney+/HBO content-discovery interface conventions",
    "BOTTOM-LEFT HERO CAROUSEL ARROW BUTTONS — the hero has a horizontal pair of SMALL CIRCULAR ←/→ NAV ARROW BUTTONS (~36-44px transparent bg with subtle white border, white arrows inside) bottom-left for hero slide navigation; the arrow placement (bottom-left) + transparent style is signature minimal carousel control",
    "RED 'STREAMING NOW' LABEL BELOW PLAY BUTTON — directly below the centered red-circle-outline play button is a tiny tracking-wide RED 'STREAMING NOW' label (12-14px regular red sans); the label functions as both a status indicator AND a call-to-attention pulse moment — works for any content-platform with a 'now playing / live / streaming' state",
    "RED ALTERNATE-LANGUAGE SUBTITLE in hero title stack — the design uses a RED SECONDARY-LANGUAGE TRANSLITERATION ('BEDER MEYE' as transliteration of 'JYOTSNA') in 14-18px tracking-wide red sans medium ABOVE the main title; signals the platform's multi-language identity AND mimics movie-poster international-distribution credits — distinctive identity moment that works for any content-platform supporting localization",
  ],
  uniqueTechniques: [
    "Massive numbered outline-stroke overlays flowing off poster edges — using 240-340px BOLD CONDENSED OUTLINE-STROKE numbers (1/2/3/4/5) with TRANSPARENT FILL and 1.5-3px white stroke positioned BOTTOM-LEFT of each Top Trending poster with the number FLOWING DOWN OFF THE CARD EDGE creates the 'numeral skeleton' Netflix-Top-10 leaderboard treatment but more dramatic; the outline-only treatment lets the poster image show through, and the off-edge flow creates dramatic visual anchoring transferable to any leaderboard/ranking/trending context",
    "Massive 2-line condensed-red section label as cinematic structural anchor — using MASSIVE 2-LINE VIVID RED CONDENSED ALL-CAPS section labels stacked on the LEFT side of every section ('LATEST / RELEASE') turns each section into a vertical-credit-roll-style anchor that reads as movie-poster credit hierarchy rather than typical section headings; transferable to any cinematic/entertainment/content-discovery context where typography needs to feel theatrical",
    "Bold solid-color genre tiles as content-discovery vocabulary — using 4 SOLID SATURATED COLOR-BLOCK SQUARE TILES (red/purple/teal/orange) instead of poster imagery for genre selection makes the design CONFIDENT about color-as-genre-language and respects the user's ability to associate color with mood (red=passion/romantic, purple=mystery/thriller, teal=lightness/comedy, orange=energy/adventure); transferable to any context where category navigation can be color-coded rather than image-coded",
    "3-tier hero eyebrow stack mimicking movie-poster credit hierarchy — stacking TINY TRACKING-WIDEST WHITE 'PRESENTS' eyebrow + RED SECONDARY-LANGUAGE TRANSLITERATION + MASSIVE DISPLAY TITLE replicates the typographic hierarchy of physical movie posters and trailers; transferable to any cinematic/trailer/event-launch context where credit hierarchy adds editorial weight",
    "Red-circle-outline play button + 'STREAMING NOW' label below — placing a CENTERED LARGE RED-CIRCLE-OUTLINE PLAY BUTTON (transparent fill, red stroke, white play triangle, subtle red halo glow) on the hero photo + a small RED 'STREAMING NOW' label below creates a complete 'tap to watch' interaction signal that needs no additional UI explanation; transferable to any video/content/streaming context",
    "Stylized theatrical display hero title — using 96-160px STYLIZED THEATRICAL POSTER FONT with foliage/jungle/texture/distress wrapping the letterforms gives the title cinema-poster-stencil quality; transferable to any genre-specific brand where the title can be styled to match the genre (horror = textural/distressed; sci-fi = condensed/futuristic; romantic = serif/elegant) — works for any branded content where the title IS the brand for that piece",
    "Red accent dot on lowercase wordmark — the 'trilok.' wordmark with a small RED accent dot AFTER the period is a tiny but distinctive brand mark that turns ordinary punctuation into brand identity; transferable to any wordmark logo design where you want a subtle color accent without redesigning the entire mark",
  ],
  spacing:
    "Dark cinematic immersive content-discovery spacing — sections separated by 64-96px on desktop (tighter than typical marketing-site spacing — feels cinematic and dense like a content-platform interface). Hero is full-viewport with content LEFT-anchored at ~5-7% from edge + vertically-centered-lower (~55-65% down). Hero 3-tier eyebrow stack has 12-16px between presents/language/title lines + 24-32px gap below title to meta-info row + 16-24px gap to body description. Centered play button has ~16-24px gap to STREAMING NOW label below. 5-thumbnail bottom-right pagination has 8-12px gap between thumbnails. Section MASSIVE 2-line red labels have 0-8px between the 2 stacked words + 16-24px gap to DRAG TO NEXT indicator below. Section LEFT label column is 12-14% of width + RIGHT carousel column is 86-88% with carousel cards at 24-32px gaps between cards + 80-120px shown of the 5th edge-peek card. Top Trending massive numbered overlays positioned with the bottom of the numeral extending 60-100px below the poster card bottom edge. Genre tiles have 16-24px gaps between tiles. Footer 5-column grid 32-48px column gaps + 16-24px internal vertical spacing. Overall feeling is dense-cinematic-content-platform — tighter than marketing sites, looser than data tables — the spacing of a Netflix/Disney+/HBO content discovery interface.",
  moodKeywords:
    "dark, cinematic, immersive, content-platform, streaming, gaming, movie-platform, entertainment, theatrical, bold-typography, single-red-accent, leaderboard, content-discovery, netflix-style, condensed-bold, vivid-red, scoped-multi-color, warm-black, cinema-poster",
  animations:
    "Cinematic content-platform motion — hero photo: very slow zoom (1.0 → 1.04 over 14s) for ambient life. Hero text staggered fade-up: tiny WHITE 'PRESENTS' eyebrow fades in first (0.4s), then RED language subtitle fades in (0.15s delay), then MASSIVE display title slides up + fades (0.3s delay, 0.7s ease-out, y-32px → 0); meta-info row fades in (0.5s delay), description fades in (0.7s delay). Centered red-circle-outline play button: pulsing red halo glow continuously (1.5s ease-in-out, the red-glow opacity shifts 0.3 → 0.6 → 0.3 indefinitely creating a 'this is interactive' affordance); hover → scale 1.0 → 1.08 + the play triangle inside brightens slightly + the halo intensifies. Bottom-right 5-thumbnail pagination: stagger fade-in (0.06s between, 0.4s ease-out); the active thumbnail subtly pulses/scales 1.0 → 1.04 → 1.0 indefinitely. MASSIVE 2-line red section labels: each line of the 2-line stack stagger-fade-up on scroll-into-view (0.1s between lines, 0.6s ease-out, y-24px → 0). Card carousel rows: cards stagger fade-up (0.08s between cards, 0.5s ease-out); on horizontal scroll/drag → smooth ease-out translate (0.5s); hover on poster card → subtle scale 1.0 → 1.03 + bottom-anchored title brightens slightly + a subtle border glow appears. MASSIVE numbered outline-stroke overlays on Top Trending: each numeral fades in with stagger (0.12s between, 0.7s ease-out + scale 0.9 → 1.0); on scroll into viewport the numerals slide-up subtly (y+24px → 0) creating a 'leaderboard reveal' moment. BOLD COLOR-BLOCK genre tiles: stagger fade-in (0.1s between tiles, 0.5s ease-out, scale 0.95 → 1.0); hover → subtle scale 1.0 → 1.04 + slight brightness pulse + the white label gets a subtle text-shadow glow; click → tile briefly flashes brighter then deepens. Hero carousel ←/→ arrow buttons: hover → scale 1.0 → 1.1 + bg fills with semi-transparent white. RED 'Sign Up' nav pill hover → slight scale 1.0 → 1.05 + slight darker red + small down-chevron rotates 180°. Circular red 'Aa' accessibility toggle: hover → scale 1.0 → 1.1 + slight darker red. Hamburger menu icon hover → all 3 lines slightly translate-x with stagger (10ms between) creating a 'wave' micro-animation. Footer social icons hover → red color shift + scale 1.0 → 1.1. 'trilok.' wordmark logo hover: the red accent dot pulses slightly (0.4s ease-out scale 1.0 → 1.3 → 1.0). Overall motion is cinematic-confident-content-platform — never bouncy, never sluggish, always purposeful — the pacing of a polished streaming app interface where every animation suggests interactivity.",
  heroTreatment:
    "FULL-BLEED CINEMATIC IMMERSIVE-CONTENT HERO with 3-tier eyebrow + MASSIVE stylized-theatrical title + centered red-outline play button + bottom-left arrows + bottom-right poster-thumbnail pagination. The hero photograph is a dramatic cinematic immersive content scene (e.g. for a movie/show: a young female protagonist in jungle/horror/action setting with dramatic warm-amber lighting; for a game: a cinematic in-game character close-up with motion-blur background; for an event: a performer mid-action under stage lights) — the photo carries warm tones (amber/orange/red lighting) that match the warm-black section bg, running edge-to-edge with a SUBTLE DARKENING VIGNETTE OVERLAY (~30-40% opacity at edges and bottom, lighter at center for subject visibility). NAV (overlaid at the very top of the hero, transparent floating bar): LEFT a small WHITE HAMBURGER MENU ICON (~20-24px, 3 horizontal lines), CENTERED 'trilok.' wordmark logo (small ~80-100px wide, white sans bold lowercase + small RED #E63838 accent dot after the period), RIGHT a horizontal pair: small RED FILLED PILL 'Sign Up' (~80-100×36-40px, vivid red bg, white text, fully-rounded with a tiny down-chevron after) + small CIRCULAR RED 'Aa' ACCESSIBILITY TOGGLE (~36-44px filled red circle with white 'Aa' inside). INSIDE the hero, content is LEFT-ALIGNED starting around 5-7% from the left edge and VERTICALLY CENTERED-LOWER (~55-65% down): a 3-TIER EYEBROW STACK consisting of: TINY TRACKING-WIDEST WHITE ALL-CAPS 'STAR FOX ENTERTAINMENT PRESENTS' (or domain-equivalent presents-credit, 11-13px regular sans WHITE letter-tracking-widest), BELOW it ~12-16px gap to RED ALTERNATE-LANGUAGE SUBTITLE 'BEDER MEYE' (or domain-equivalent secondary-language transliteration, 14-18px tracking-wide red #E63838 sans medium), BELOW it ~16-24px gap to a MASSIVE STYLIZED HERO TITLE 'JYOTSNA' (or domain-equivalent title, 96-160px STYLIZED THEATRICAL POSTER FONT with foliage/jungle/texture/distress wrapping the letterforms — letters can have foliage tendrils, drips, distress, or other organic textural elements that match the content's genre/mood; for non-textural genres, fallback is BOLD CONDENSED DISPLAY sans like Druk Wide / Anton / Bebas Neue Bold at the same massive size); BELOW the title ~24-32px gap to a META-INFO ROW '2023 • 2h 7m • Multi Language • Sci-fi/Adventure' (14-16px regular light-warm-gray with • bullet separators between each item); BELOW it ~16-24px gap to a 2-3 LINE BODY DESCRIPTION 'A jungle at a wildlife amusement park, which contains cloned dinosaurs, soon becomes a horrifying experience...' (14-16px regular light-warm-gray) with a 'more' inline link at the end. CENTERED on the hero (or slightly right-of-center, vertically-centered): a LARGE RED-CIRCLE-OUTLINE PLAY BUTTON (~80-100px circle with 2-3px red #E63838 border + TRANSPARENT FILL + white play triangle inside, with a SUBTLE RED HALO GLOW around the circle that pulses); BELOW the play button ~16-24px gap to a tiny tracking-wide RED 'STREAMING NOW' label (12-14px regular sans red). BOTTOM-LEFT of the hero a horizontal pair of SMALL CIRCULAR ←/→ NAV ARROW BUTTONS (~36-44px each, transparent bg with subtle white border, white arrows inside) for hero carousel control. BOTTOM-RIGHT of the hero a horizontal row of 5 SMALL THUMBNAIL POSTER PREVIEW CARDS (each ~80×100-120px showing small movie/show/game posters in rounded 4-8px corners, with one thumbnail slightly highlighted/larger as the active state) showing carousel position + previews of upcoming hero slides. The overall feeling is cinematic immersive content-platform — Netflix/Disney+/HBO content-discovery interface with theatrical typographic confidence — the visual equivalent of opening a premium streaming app in dark mode.",
};

const record = {
  name: "Trilok Dark Cinematic Content Platform",
  industries: [
    "gaming",
    "game",
    "video games",
    "video game studio",
    "game studio",
    "game developer",
    "game development",
    "game publisher",
    "game publishing",
    "indie games",
    "mobile games",
    "mobile gaming",
    "console games",
    "pc games",
    "esports",
    "esports team",
    "esports organization",
    "esports league",
    "game streaming",
    "game streaming platform",
    "twitch alternative",
    "gaming community",
    "gaming platform",
    "gaming app",
    "game launcher",
    "game library",
    "game store",
    "game marketplace",
    "gaming hardware",
    "gaming peripherals",
    "gaming chair brand",
    "gaming pc brand",
    "gaming gear",
    "gaming accessories",
    "gaming merchandise",
    "game guild",
    "game clan",
    "game tournament",
    "game event",
    "game convention",
    "streaming",
    "streaming platform",
    "streaming service",
    "video streaming",
    "video streaming platform",
    "movie streaming",
    "tv streaming",
    "show streaming",
    "media streaming",
    "ott platform",
    "netflix alternative",
    "movie platform",
    "movie app",
    "tv app",
    "show app",
    "movie discovery",
    "movie library",
    "movie collection",
    "film studio",
    "production studio",
    "film production",
    "tv production",
    "media production",
    "entertainment platform",
    "entertainment service",
    "entertainment app",
    "content platform",
    "content discovery",
    "content library",
    "anime platform",
    "anime streaming",
    "documentary platform",
    "documentary streaming",
    "comic platform",
    "comic reader",
    "manga platform",
    "manga reader",
    "audiobook platform",
    "audiobook app",
    "podcast platform",
    "podcast app",
  ],
  moods: [
    "dark",
    "cinematic",
    "immersive",
    "content-platform",
    "streaming",
    "gaming",
    "movie-platform",
    "entertainment",
    "theatrical",
    "bold-typography",
    "single-red-accent",
    "leaderboard",
    "content-discovery",
    "netflix-style",
    "condensed-bold",
    "vivid-red",
    "scoped-multi-color",
    "warm-black",
    "cinema-poster",
    "dark-cinematic",
    "premium-streaming",
    "content-app",
    "movie-app",
    "gaming-app",
    "esports",
    "theatrical-typography",
  ],
  color_mode: "dark",
  brief_json: brief,
};

console.log("[upload] Inserting Trilok dark cinematic content platform pattern into design_patterns...");

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
