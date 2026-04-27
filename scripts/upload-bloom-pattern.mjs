// One-off uploader for the BLOOM romantic wedding planner pattern.
// Soft blush-pink + sage-green wedding planner aesthetic with sage-green
// pill CTAs (Celebrate With Us ↗ / View More ↗ / Ask For Call ↗), wordmark
// logo with a peach floral icon REPLACING the middle letter "BL🌸OM",
// hand-drawn watercolor peach/pink floral illustrations as decorative
// accents (corners, beside headings, between sections), dotted/dashed
// sage-green pill outline for section labels (Our Services), italic serif
// elegant headings paired with bold uppercase serif statement headlines,
// tall photo service cards with bottom-anchored small "Wedding" label +
// big title (Organization / Decoration / Floristics), full-bleed soft
// blush-pink section backgrounds (NOT the typical wedding cream/gold),
// hand-drawn line-art warm-orange step icons (envelope-with-letter,
// paper-with-pen-and-inkwell, joined-wedding-rings), bento 3+2 photo
// collage of wedding moments with rounded corners, pink form card on
// pink section bg with rounded white pill input fields, contact info
// triplet with circle email/phone/pin icons. First pattern for Wedding
// industry — romantic feminine soft hand-crafted boutique wedding planner
// mood (NOT generic wedding gold/cream — confidently uses blush-pink +
// sage-green as the signature combo).
//
// Run with: node scripts/upload-bloom-pattern.mjs

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
  colorPalette: "#FFFFFF, #FBDDE3, #F5C9D2, #A8D49A, #0F1419, #6B6B6B, #E8A77F",
  colorMode: "light",
  accentUsage:
    "DUAL-ACCENT romantic wedding palette built on a confident SOFT BLUSH PINK + SAGE GREEN combo (NOT the generic wedding cream/gold/champagne palette — this design's quiet confidence is in REFUSING the expected wedding palette and choosing blush-pink-on-white with sage-green-as-CTA-color). (1) PURE WHITE #FFFFFF is the primary canvas for hero overlay text, services section, team intro section. (2) SOFT BLUSH PINK #FBDDE3 (slightly cool, NOT salmon, NOT peach) is the FULL-BLEED section bg for the about/process section + the footer/contact section — these are the emotional and final sections, soaked in the romantic blush. (3) PALE PINK #F5C9D2 is a slightly DEEPER pink used INSIDE the blush sections for the contact form card panel — a subtle 2-tone pink-on-pink that gives the form depth without breaking the romance. (4) SAGE GREEN #A8D49A is the SIGNATURE CTA color — used for ALL pill buttons ('Celebrate With Us ↗' in hero, 'View More ↗' in about, 'Ask For Call ↗' in footer form), ALL section label outlines (the dashed-border 'Our Services' pill outline), AND the active nav state (current page link 'Home' renders in sage-green text rather than underline or dot). The sage-green-as-CTA color is the single most distinctive choice — wedding sites usually use gold or pink-as-CTA but this design plays the CTA against the blush bg with sage-green for a soft natural-meadow contrast that feels both romantic AND fresh. (5) DEEP NAVY #0F1419 is the primary heading + body color (NOT pure black — slightly warmer/softer for the romantic mood). (6) MID GRAY #6B6B6B for body copy and small tertiary text. (7) PEACH/CORAL #E8A77F is reserved EXCLUSIVELY for the logo's floral icon (the peach dahlia/lotus flower replacing the middle letter in 'BL🌸OM') and for the warm-orange tones in hand-drawn step icons (envelope, paper-with-pen, wedding rings); peach is NEVER used as a CTA color — it's purely decorative warmth. CTAs are ALWAYS sage-green pills with a small ↗ up-right arrow, never any other shape or color.",
  typography:
    "ELEGANT SERIF + CLEAN SANS pairing — Playfair Display / Cormorant Garamond / DM Serif Display for ALL headings (regular and italic variants used purposefully) + Inter / Karla / Manrope for body and small labels. SPECIFIC PAIRINGS: (1) Hero eyebrow 'The best Wedding Day' rendered in 16-18px italic serif (Playfair Italic) white on photo, slightly off-white tone, romantic + handwritten feeling. (2) Hero MASSIVE statement headline 'WE'RE GETTING MARRIED' rendered in 64-96px BOLD UPPERCASE SERIF (Playfair Display 800 or DM Serif Display Bold) white on photo, tight tracking, single line on desktop — the all-caps serif treatment is the design's most powerful typographic move because it's elegant AND bold simultaneously (most wedding sites pick one or the other). (3) Section headings like 'Making Your Day Special' / 'Let's introduce ourselves!' rendered in 40-56px ITALIC SERIF (Playfair Italic / Cormorant Italic) deep-navy with NORMAL casing — soft and conversational, contrasting with the all-caps hero headline. (4) About section heading 'We will take on all the worries and plan your wedding' rendered in 36-48px REGULAR SERIF (Playfair Regular / Cormorant Regular) deep-navy, multi-line, NOT italic, NOT all-caps — a third typographic register for body-style introspective headings. (5) Service card titles 'Organization' / 'Decoration' / 'Floristics' rendered in 18-22px CLEAN SANS-SERIF MEDIUM-BOLD (Inter 500-600) deep-navy, centered. (6) Service card eyebrow label 'Wedding' rendered ABOVE each title in 11-13px regular sans, mid-gray, light tracking. (7) Step labels 'Contact With Us' / 'Sign a Contract' / 'Wedding Day' rendered in 16-18px sans bold deep-navy, centered. (8) Body paragraphs 14-16px regular sans, mid-gray, comfortable line-height ~1.6. (9) Nav links 14-16px regular sans deep-navy, with active link in SAGE GREEN. (10) CTA pill text 14-16px sans medium deep-navy on sage-green pill bg. (11) Section label inside dashed-border pill 'Our Services' rendered in 12-14px sans medium sage-green, slight tracking. (12) Logo wordmark 'BL🌸OM' uses a clean modern serif or geometric sans for the letters in white (in hero/footer) + the peach-floral icon REPLACES the middle 'O'. NO heavy bold sans, NO condensed display, NO mixed-weight gimmicks — the typographic discipline is restraint + elegance.",
  layout:
    "ROMANTIC WEDDING-PLANNER editorial flow alternating PURE WHITE and SOFT BLUSH PINK sections: TOP NAV (overlaid on hero photo): logo 'BL🌸OM' wordmark LEFT in white serif/sans with peach floral icon replacing the middle O, CENTERED nav links 'Home / About Us / Our Team / Contact' in small white sans (active page in SAGE GREEN), RIGHT a row of 4 small white CIRCLE SOCIAL ICONS (phone, youtube, facebook, instagram outlines) → FULL-BLEED CINEMATIC HERO (single dominant photo): a romantic engagement-style photograph (couple in soft sunset forest light, bride wearing flower crown, intimate close-up) running edge-to-edge with NO solid overlay — content centered: small italic serif eyebrow 'The best Wedding Day' (16-18px white italic) + MASSIVE BOLD UPPERCASE SERIF HEADLINE 'WE'RE GETTING MARRIED' (64-96px white serif bold all-caps, tight tracking) + SAGE-GREEN PILL CTA 'Celebrate With Us ↗' centered below → SERVICES (white): centered DASHED-BORDER SAGE-GREEN PILL OUTLINE LABEL 'Our Services' (small sage-green sans inside a thin dashed sage-green rounded pill), BELOW it the centered ITALIC SERIF section heading 'Making Your Day Special' (40-56px Playfair Italic deep-navy) with a HAND-DRAWN PEACH/PINK WATERCOLOR FLORAL ILLUSTRATION (small sprig of stylized abstract peach + sage flowers, ~120-160px) positioned to the RIGHT of the heading, BELOW a 3-COLUMN GRID OF TALL PHOTO SERVICE CARDS (each ~340×440px, rounded 16-20px corners): each card shows a full-bleed wedding-related photograph (table-with-bouquet / hanging-lantern / bride-with-bouquet) with content BOTTOM-ANCHORED INSIDE the photo: small 'Wedding' eyebrow label (11-13px regular gray-on-photo) + bigger title 'Organization' / 'Decoration' / 'Floristics' (18-22px sans medium bold) — labels visible against natural darker bottom zones of the photos → ABOUT + COLLAGE (full-bleed soft blush pink): TOP HALF a SPLIT CONTENT BAND: LEFT column 'We will take on all the worries and plan your wedding' (36-48px regular serif deep-navy, multi-line, NOT italic) + a HAND-DRAWN PEACH PINK FLORAL SPRIG to the right of the heading column; RIGHT column 'We understand how important your wedding day is...' body paragraph + 'From planning to execution...' second paragraph in 14-16px sans gray + 'View More ↗' SAGE-GREEN PILL CTA below; BOTTOM HALF a BENTO 3+2 PHOTO COLLAGE GRID (5 wedding moment photos arranged: top row 3 equal-width photos of varying heights, bottom row 2 photos OFFSET-CENTERED beneath the gaps of the top row creating a checkerboard-bento mosaic) — each photo with rounded 12-16px corners; BELOW the collage a 3-COLUMN ICON STEP ROW: each column shows a HAND-DRAWN WARM-ORANGE LINE-ART ICON (envelope with letter / paper with pen and inkwell / interlocked wedding rings, ~80-100px) centered above a bold step label ('Contact With Us' / 'Sign a Contract' / 'Wedding Day') + a small 2-line description in sans gray below → TEAM INTRO (white): centered SMALL HAND-DRAWN PEACH-PINK DAHLIA/LOTUS FLOWER ILLUSTRATION at the top (~80-100px), BELOW it the ITALIC SERIF section heading 'Let's introduce ourselves!' (40-56px Playfair Italic deep-navy) centered, BELOW it a 3-line centered body description in sans gray, BELOW a 3-COLUMN TEAM CARD GRID (each ~240×320px rounded 16-20px corners, FRAMED with a 1-2px sage-green border): each card shows a portrait photograph FILLING the card with bottom-anchored content INSIDE the photo: name (16-18px sans bold) + role label '/Founder' / 'Organizer / Decorator' (12-13px sans gray) + a small horizontal pair of black social icons (facebook + instagram); the MIDDLE card has a SUBTLE GREEN OVERLAY TINT on its photograph (a wash of the sage-green at ~30-40% opacity) differentiating it visually; HAND-DRAWN PEACH-PINK FLORAL ILLUSTRATIONS in the BOTTOM-LEFT and BOTTOM-RIGHT corners of the section (decorative leaf + flower clusters at ~120-180px) → FOOTER / CONTACT (full-bleed soft blush pink): LEFT column the 'BL🌸OM' wordmark logo at smaller size (~80-100px wide) with the peach floral icon, MIDDLE column 3 contact info rows each structured as: small CIRCULAR DARK ICON on the LEFT (envelope / phone / map-pin in deep-navy on a small light-pink circle ~32-40px) + 'Our Email' / 'Our Phone Number' / 'Our Address' bold label deep-navy ABOVE + 'hello@yourwedding.com' / '+880 12352659' / 'House 12, Road 5, Rajshahi, Bangladesh' value in sans gray BELOW; RIGHT column a PALE-PINK FORM CARD (~360-420px wide, slightly deeper pink than the section bg, rounded 16-20px corners, ~32-40px internal padding) containing 2 ROUNDED-WHITE PILL INPUT FIELDS ('Your Name' / 'Your Phone Number' placeholders in mid-gray, ~48-56px tall, fully-rounded white pills) + 'Ask For Call ↗' SAGE-GREEN PILL CTA bottom-right; HAND-DRAWN PEACH-PINK FLORAL ILLUSTRATION in the TOP-LEFT of the footer (~120-160px); below everything a thin separator line + centered '@2026 All Right Reserved' copyright in 12-13px sans gray.",
  signaturePatterns: [
    "SAGE-GREEN PILL CTAs WITH ↗ UP-RIGHT ARROW — every CTA on the site is a fully-rounded sage-green #A8D49A pill (~140-180px wide, ~48-56px tall) with deep-navy text + a small ↗ up-right arrow glyph after the label ('Celebrate With Us ↗' / 'View More ↗' / 'Ask For Call ↗'); the sage-green-as-CTA-color on a romantic blush-pink palette is the design's most distinctive identity choice — refuses the wedding-industry default of gold or pink CTAs",
    "WORDMARK LOGO WITH PEACH FLORAL ICON REPLACING THE MIDDLE LETTER — the brand wordmark 'BLOOM' is rendered as 'BL🌸OM' where the middle 'O' is REPLACED by a hand-drawn peach/coral dahlia or lotus flower illustration (~24-36px tall, in the line-height of the wordmark); the floral-as-letter trick is the brand's signature mark and appears identically in the hero nav (white wordmark on photo) and the footer (white wordmark on pink), always with the peach flower in the same position",
    "DASHED/DOTTED SAGE-GREEN PILL OUTLINE FOR SECTION LABELS — section eyebrow labels like 'Our Services' are rendered as small sage-green sans text inside a fully-rounded pill OUTLINE made of a thin DASHED sage-green border (1-2px dashed stroke); this dashed-pill-outline label is rare and instantly identifiable, replacing the typical solid pill or underline section-label conventions",
    "HAND-DRAWN WATERCOLOR PEACH/PINK FLORAL ILLUSTRATIONS as decorative accents — small abstract floral sprigs in hand-drawn watercolor style (peach/coral + soft pink + sage leaf accents) appear as decorative elements: beside section headings (small sprig to the right of 'Making Your Day Special'), in section corners (bottom-left and bottom-right of team intro section), beside the about-section heading, in the footer top-left; the florals are NEVER full photo florals — always hand-drawn watercolor illustration aesthetic, romantic and feminine",
    "ITALIC SERIF ELEGANT HEADINGS PAIRED WITH BOLD UPPERCASE SERIF STATEMENT — the design uses TWO distinct serif registers: italic serif (Playfair Italic / Cormorant Italic) for SOFT CONVERSATIONAL headings ('Making Your Day Special' / 'Let's introduce ourselves!') AND BOLD UPPERCASE SERIF for the MONUMENTAL HERO STATEMENT ('WE'RE GETTING MARRIED'); the all-caps serif treatment is uncommon in wedding designs and is the design's most powerful typographic moment",
    "TALL PHOTO SERVICE CARDS with BOTTOM-ANCHORED LABEL+TITLE INSIDE THE PHOTO — service cards are tall portrait photos (~340×440px, ratio ~3:4) with rounded 16-20px corners; content lives INSIDE the photo at the bottom: small 'Wedding' eyebrow label (11-13px regular gray) + bigger title 'Organization / Decoration / Floristics' (18-22px sans medium bold), centered horizontally; the photos themselves carry the visual weight while the labels read against the naturally darker bottom zones — no overlay scrim, no card chrome",
    "FULL-BLEED SOFT BLUSH-PINK SECTION BACKGROUNDS — the about/process section AND the footer/contact section run FULL-WIDTH soaked in soft blush pink #FBDDE3, contrasting with the pure-white services and team-intro sections; the alternating white-blush-white-blush rhythm is the structural pacing of the entire page and the blush-as-section-bg is more confident than the typical wedding-site cream-or-champagne",
    "HAND-DRAWN WARM-ORANGE LINE-ART STEP ICONS — the 3-step process row uses HAND-DRAWN line-art icons in warm orange/peach tones (NOT flat solid icons, NOT outline icons in dark colors): an envelope-with-letter-poking-out / a paper-with-pen-and-inkwell / a pair of interlocked wedding rings, each ~80-100px tall, with visible hand-drawn line-art texture; the warmth of the peach tones echoes the floral illustrations and ties the design's hand-crafted-warmth language together",
    "BENTO 3+2 PHOTO COLLAGE — the about section's photo collage uses 5 wedding-moment photos in a CHECKERBOARD-BENTO layout: top row 3 equal-width photos at varying heights, bottom row 2 photos OFFSET-CENTERED beneath the gaps between the top row's photos creating a dynamic mosaic; each photo has rounded 12-16px corners; this 3+2 offset-bento is more interesting than a typical 6-grid or 4-grid",
    "PALE-PINK FORM CARD ON SOFT BLUSH-PINK SECTION BG — the contact form sits inside a FORM CARD that uses a SLIGHTLY DEEPER PINK #F5C9D2 than the surrounding section blush #FBDDE3, creating a subtle 2-tone pink-on-pink layered effect; the form contains 2 fully-rounded WHITE PILL INPUT FIELDS for name + phone + a sage-green pill CTA, all styled to feel light and inviting rather than transactional",
    "ACTIVE NAV STATE IN SAGE GREEN — the current page nav link renders in SAGE GREEN #A8D49A text (NOT underline, NOT dot, NOT pill) while inactive links remain white; pairs naturally with the sage-green CTA system and reinforces the dual-accent identity",
    "TEAM CARDS WITH 1-2PX SAGE-GREEN BORDER + MIDDLE-CARD GREEN OVERLAY VARIANT — team member cards (~240×320px, rounded 16-20px corners) are FRAMED with a thin 1-2px sage-green border that ties them to the CTA system; the MIDDLE card has a SUBTLE GREEN OVERLAY TINT on its photograph (a wash of sage-green at ~30-40% opacity) differentiating one team member visually — a small editorial-magazine touch",
    "CONTACT INFO TRIPLET WITH CIRCULAR ICONS LEFT + LABEL-ABOVE-VALUE PAIRS RIGHT — the footer contact column shows 3 stacked rows where each row has a small circular dark-icon-on-light-pink-bg (~32-40px) on the LEFT (envelope / phone / map-pin) + a 2-line text block on the RIGHT: bold label deep-navy ABOVE ('Our Email' / 'Our Phone Number' / 'Our Address') + value in sans gray BELOW; consistent left-icon + right-text-stack pattern across all 3 rows",
    "REFUSES THE WEDDING CREAM/GOLD/CHAMPAGNE PALETTE — the entire color identity (soft blush pink + sage green + peach floral accents) is a CONFIDENT REJECTION of the wedding-industry default of cream + gold + champagne; the discipline of choosing fresh natural-meadow tones over the expected luxury-banquet palette is what makes this design feel modern + romantic rather than dated + formal",
  ],
  uniqueTechniques: [
    "Floral-as-letter logo wordmark — replacing the middle letter of the brand name with a hand-drawn peach/coral floral illustration (BL🌸OM with the floral icon sized to match the cap-height of the surrounding letters) is a signature brand mark technique that works for any flower-related or romantic-mood brand; it makes the wordmark instantly memorable without requiring a separate logo lockup",
    "Sage-green-on-blush-pink dual accent rejecting the wedding default — using SAGE GREEN as the CTA color + active-nav color on a BLUSH PINK + WHITE base is a confident dual-accent system that refuses the wedding-industry default of gold/cream/champagne; the natural-meadow palette feels modern + romantic + fresh without losing any of the wedding-industry warmth",
    "Dashed-sage-pill section labels — section eyebrow labels rendered inside thin DASHED sage-green pill outlines (rather than solid pills, underlines, or plain caps) gives the design a hand-stitched-decorative quality that matches the watercolor-floral language without becoming twee; this dashed-pill-outline pattern is rare in webdesign and instantly identifiable",
    "Hand-drawn watercolor florals as decorative spacers — placing small abstract watercolor floral sprigs (peach/pink + sage leaf accents) BESIDE headings (small sprig to the right of 'Making Your Day Special'), in section corners (bottom-left and bottom-right of team intro), and in the footer top-left adds romantic-feminine warmth without becoming overwhelming or cliche; functions as a typographic spacer with personality, not just decoration",
    "Bottom-anchored label-above-title INSIDE photo for service cards — putting the small 'Wedding' eyebrow + bigger service title BOTTOM-ANCHORED INSIDE a tall portrait wedding photo (with NO overlay scrim, relying on the natural darker bottom zones of the photo) gives the cards photographic weight + typographic clarity simultaneously; this works because wedding photography has predictable lighting where the lower-third tends to be darker (table edges, dress folds, ground)",
    "Italic-serif-conversational + bold-uppercase-serif-monumental dual register — pairing italic serif (Playfair Italic) for soft conversational section headings ('Making Your Day Special') with bold uppercase serif for the hero monumental statement ('WE'RE GETTING MARRIED') uses two distinct serif registers to create both elegance AND power; the all-caps serif treatment is rare in wedding designs and is the design's most powerful typographic moment",
    "2-tone pink-on-pink form card — placing a slightly DEEPER PINK form card (#F5C9D2) inside a soft blush-pink section bg (#FBDDE3) creates a subtle 2-tone pink-on-pink layered effect that gives the form depth and presence without breaking the romantic mood; pairing the deeper pink with fully-rounded WHITE PILL INPUT FIELDS keeps the form feeling light and inviting rather than transactional",
    "Middle-card green-overlay tint on team grid — applying a subtle sage-green wash (~30-40% opacity) to the MIDDLE card of a 3-card team grid differentiates one team member visually without creating an obvious 'featured' badge; subtle editorial touch that adds rhythm to a grid that would otherwise feel uniform",
  ],
  spacing:
    "Romantic boutique wedding spacing — sections separated by 96-128px on desktop, content max-width ~1200-1320px with comfortable side gutters, headline-to-body gap 24-40px, generous breathing room throughout. Hero photo is full viewport with ~80-100px vertical padding above the bottom-aligned CTA. Services 3-card grid uses 24-32px horizontal gaps between cards. Bento 3+2 photo collage uses 16-24px gaps. Step icon row uses 32-48px between icon-label pairs and 16-24px gap between icon and label. Team 3-card grid uses 24-32px horizontal gaps. Section labels (dashed sage pills) get 32-48px gap below them before the heading begins. Italic serif section headings get 48-72px gap above the content/grid below. Pink full-bleed sections use 96-128px vertical padding (top + bottom internal). Footer contact triplet rows have 24-32px vertical spacing between rows. Pink form card has 32-40px internal padding, 16-24px gap between input fields. Hand-drawn floral decorations are positioned with intentional negative space so they feel like organic accents rather than crowding. Overall the feeling is comfortable, warm, generous breathing room — never cramped, never sparse — the spacing of a thoughtful boutique wedding planner who values calm.",
  moodKeywords:
    "romantic, soft, feminine, hand-crafted, blush-pink, sage-green, floral, elegant, warm, friendly, boutique, wedding-planner, watercolor, italic-serif, intimate, dreamy, fresh, natural-meadow",
  animations:
    "Soft romantic motion — hero photo: very slow gentle zoom (1.0 → 1.03 over 14s) for ambient life, pairs naturally with the romantic mood. Hero text staggered fade-in: italic eyebrow fades in first (0.4s), then massive serif headline slides up 24px → 0 with 0.15s delay (0.6s ease-out), then sage-green CTA pill scales in 0.95 → 1.0 with 0.3s delay. Hand-drawn floral decorations: subtle gentle sway animation (1-2deg rotation, 4-6s duration, ease-in-out infinite) — almost imperceptible movement that gives them life like a real flower in light breeze. Section eyebrow labels (dashed sage pills): fade-in 0.4s on scroll-into-view. Italic serif section headings: fade-up 0.6s ease-out, y-32px → 0 on scroll. Service card grid: stagger fade-up (0.1s between each card, 0.5s ease-out, y-40px → 0). Service card hover: subtle scale 1.0 → 1.02 with shadow increase + bottom-anchored label brightens slightly. Bento photo collage: stagger fade-up (0.08s between photos in the order top-left → top-mid → top-right → bottom-left → bottom-right). Step icons (envelope / paper / rings): individually fade+scale-in on scroll (0.5s ease-out, scale 0.9 → 1.0) with stagger between the 3 icons. Team cards: stagger fade-up (0.12s between cards, 0.5s ease-out); hover → border brightens + subtle scale 1.0 → 1.015. Sage-green pill CTAs: hover → slight scale 1.0 → 1.04 + slight darker sage shade + arrow ↗ translate-x 2-4px right. Pink form card: subtle entrance fade-up on scroll (0.6s ease-out). Input fields: focus → border ring in sage-green at ~30% opacity (no harsh blue browser default). Active nav state: smooth color transition from white to sage-green on click (0.3s ease-out). Overall motion is romantic, gentle, organic — never bouncy, never aggressive, never fast — the cadence of a slow romantic walk through a flower garden.",
  heroTreatment:
    "FULL-BLEED CINEMATIC ROMANTIC PORTRAIT HERO — a single dominant engagement-style photograph (couple in soft sunset forest light, bride wearing a wildflower crown, intimate close-up; warm sepia-amber tones from natural backlight) running edge-to-edge with NO solid overlay or gradient. ABOVE the photo a minimal nav contains: 'BL🌸OM' wordmark LEFT in white serif/sans where the middle 'O' is REPLACED by a small peach/coral hand-drawn floral illustration (~24-32px), CENTERED nav links 'Home / About Us / Our Team / Contact' in 14-16px white sans (active link 'Home' rendered in SAGE GREEN #A8D49A), and RIGHT a horizontal row of 4 small CIRCLE OUTLINE SOCIAL ICONS in white (phone / youtube / facebook / instagram, ~24-32px each, ~16-24px gap between). INSIDE the hero, content is CENTERED and VERTICALLY-CENTERED (or slightly above center): TOP a small italic serif eyebrow 'The best Wedding Day' (16-18px Playfair Italic / Cormorant Italic, white slightly off-white), BELOW it the MASSIVE BOLD UPPERCASE SERIF HEADLINE 'WE'RE GETTING MARRIED' (64-96px Playfair Display 800 / DM Serif Display Bold, white, tight tracking, single line on desktop wrapping to 2 lines on mobile — the all-caps serif treatment is the design's most powerful typographic moment), BELOW it ~48-64px gap to the SAGE-GREEN PILL CTA 'Celebrate With Us ↗' (sage-green #A8D49A bg, deep-navy text, fully-rounded ~48-56px tall, ~200-240px wide, with a small ↗ up-right arrow glyph after the label). The hero photo is the visual anchor — the romantic warmth + the bride's flower crown reinforce the floral-language theme of the entire site, and the photograph carries the white text via its naturally darker zones. The overall feeling is intimate, romantic, dreamy boutique-wedding-planner — feminine warmth + restrained typography + fresh sage-green CTA contrast — the visual equivalent of a hand-written wedding invitation in a wildflower meadow.",
};

const record = {
  name: "Bloom Romantic Wedding Planner",
  industries: [
    "wedding",
    "wedding planner",
    "wedding planning",
    "wedding service",
    "wedding agency",
    "wedding studio",
    "bridal",
    "bridal service",
    "bridal boutique",
    "marriage",
    "ceremony",
    "reception",
    "engagement",
    "engagement service",
    "anniversary",
    "elopement",
    "destination wedding",
    "wedding venue",
    "venue",
    "events",
    "event planner",
    "event planning",
    "event service",
    "event agency",
    "event studio",
    "event design",
    "florist",
    "wedding florist",
    "floral design",
    "flower shop",
    "wedding decoration",
    "wedding decorator",
    "wedding stylist",
    "wedding catering",
    "romantic event",
    "private event",
    "engagement party",
    "bridal shower",
  ],
  moods: [
    "romantic",
    "soft",
    "feminine",
    "hand-crafted",
    "blush-pink",
    "sage-green",
    "floral",
    "elegant",
    "warm",
    "friendly",
    "boutique",
    "wedding-planner",
    "watercolor",
    "italic-serif",
    "intimate",
    "dreamy",
    "fresh",
    "natural-meadow",
    "wedding",
    "bridal",
    "engagement",
    "romantic-elegant",
    "soft-romantic",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Bloom romantic wedding planner pattern into design_patterns...");

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
