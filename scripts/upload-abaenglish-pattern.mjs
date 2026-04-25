// One-off uploader for the ABA ENGLISH education / online learning pattern.
// Lime-green + dark-green + multi-color card story (pink/orange/blue accent
// cards) on a light-blue card-stack page, lime-green icon-badge tag pills
// above every section, sentence-case friendly bold sans headings, asymmetric
// featured-card grids (1 big colored + 4 small white), 3-toggle pricing pill
// with lime-bordered Most Popular center card, peeking testimonial carousel,
// inline-emoji playful headings, dark-green rounded card sections for live
// teachers and mobile app, FAQ floating-card open state, app-store black
// pill row. First pattern for Education / Online Learning — friendly modern
// language-learning / e-learning mood (Duolingo / Babbel / MasterClass vibe).
//
// Run with: node scripts/upload-abaenglish-pattern.mjs

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
  colorPalette: "#EBF1F8, #FFFFFF, #C7F94B, #2A4B3D, #0F0F0F, #E882F7, #FF8E47, #6FA8E0, #6B7280",
  colorMode: "light",
  accentUsage:
    "MULTI-COLOR ACCENT SYSTEM with lime-green as the brand center — the design uses a coordinated 4-color accent palette where each color has a specific role and never overlaps duties: (1) LIME GREEN #C7F94B is the brand-feature color — used for tag-pill icon badges above every section ('How It Works', 'Course Levels', 'Live Teachers & Classes', 'Premium Features', 'Mobile App', 'Testimonials', 'Pricing', 'Faq', 'CTA'), the FEATURED card backgrounds in How It Works, the lime-bordered Most Popular pricing card frame, and one accent illustration block in Mobile App; (2) DARK FOREST GREEN #2A4B3D is the trust/teacher color — used as the background for the Live Teachers & Classes section and the Mobile App section (large rounded panels), giving these sections an authoritative product-feel; (3) PINK / MAGENTA #E882F7 is the playful-beginner color — used as the background for the A1 Beginner level card in Course Levels and one of the Premium Features carousel cards (Official ABA Certificates); (4) ORANGE #FF8E47 and SOFT BLUE #6FA8E0 appear as additional Premium Features carousel card backgrounds (Exclusive Video Lessons + Downloadable Students Book) creating a 4-color rotating story. PURE BLACK #0F0F0F is used for primary CTA pills (filled black + white text — 'Watch Demo', 'Start A1', 'Get Started', 'Subscribe', 'Start Learning for Free', 'Explore Live Classes'), the active state in toggle pills, Black filled circular slider arrows (right side of pair), App Store / Google Play badge buttons, and section heading text. WHITE outlined pills are secondary CTAs ('Try a Practice Lesson', 'Give Review', etc.). ORANGE STAR RATINGS for testimonials. The 4-color discipline: each color is used in exactly the same role across the design — lime never becomes a background for a CTA, dark green never becomes a card-bg for premium features, pink only on bold-emphasis cards. This consistency is what stops the multi-color design from feeling random or childish.",
  typography:
    "FRIENDLY MODERN BOLD SANS-SERIF in SENTENCE CASE — Inter / Geist / DM Sans / Plus Jakarta Sans / Manrope at 600-700 weight, slightly rounded letterforms, 36-52px section headings, NEVER all-caps for major headings ('A Simple and Smart Way to Learn English', 'English Courses for Every Level', 'Learn Live with Certified Teachers', 'Everything You Need to Master English', 'Learn Anytime Anywhere', 'Reviews from our users', 'Choose the Plan That Works for You', 'Frequently Asked Questions!', 'Start Your English Journey Today', 'Stay Updated'). Body 14-16px regular sans muted gray #6B7280. Card titles within feature/level cards use 18-22px bold sentence-case dark-text. Pricing CARDS show prices as huge bold black '$49' at 48-56px with smaller '/Year' suffix in gray. Course-level BADGES inside cards (e.g. 'A1 Beginner', 'A2 Elementary', 'B1 Intermediate') are tiny rounded pill chips with a black-text level code + small label. Tag pills above sections use small sentence-case 12-14px text paired with a tiny lime-green ROUNDED-SQUARE icon badge holding a thin-line glyph ('How It Works' / 'Course Levels' etc.) — the tag pill itself is a 1px outlined rounded pill. Inline emojis are used playfully WITHIN headings ('Learn Live with [tiny avatar emoji] Certified [tiny avatar emoji] Teachers') as a friendly approachable touch. Cinematic course-card thumbnails use bold all-caps display sans for their internal title (e.g. 'BLENDER 3D FUNDAMENTALS') with a ghost outlined number watermark like '01'.",
  layout:
    "FRIENDLY EDUCATION CARD-STACK on light blue #EBF1F8 page bg with EVERY MAJOR SECTION wrapped in a rounded white or colored card: TOP NAV (clean, friendly): brand logo LEFT + nav links CENTER + a primary CTA pill RIGHT (the nav itself sits on a clean white bar or floats just inside viewport edges) → HOW IT WORKS: at the top a small TAG PILL CENTERED (a 1px-outlined rounded pill containing a tiny lime-green icon-badge + sentence-case label '🟢 How It Works'), centered bold sentence-case 2-line heading + centered description, then a 4-COLUMN CARD ROW where the FIRST card is FEATURED with a LIME-GREEN BACKGROUND ('Learn from Real Situations.' + black 'Watch Demo' pill) and the OTHER 3 cards are white outlined ('Practice What You Learn.' + outlined 'Try a Practice Lesson' pill, 'Learn with Live Teachers.' + outlined 'See Teacher Sessions', 'Track Your Progress.' + outlined 'View Progress Tools'); each card has a rounded photograph at the top → COURSE LEVELS: tag pill 'Course Levels' centered, centered bold heading 'English Courses for Every Level', then an ASYMMETRIC GRID with a BIG PINK/MAGENTA CARD on the LEFT (~50% width, level badge 'A1 Beginner' + bold heading + photo + black 'Start A1' pill) flanked by a 2x2 GRID OF SMALLER WHITE CARDS on the RIGHT (A2 Elementary / B1 Intermediate / B2 Upper Intermediate / C1 Advanced — each with level badge + 2-3 line heading + outlined 'Start [level]' pill) → LIVE TEACHERS: a wide DARK FOREST GREEN ROUNDED CARD spanning the full container, LEFT half contains the lime-green tag pill 'Live Teachers & Classes' + bold WHITE heading 'Learn Live with [emoji] Certified [emoji] Teachers' (with INLINE EMOJI/AVATAR icons embedded in the heading) + description + black-bg pill 'Explore Live Classes' + a 2x2 CHECKMARK FEATURE LIST with green checks (Native-speaking teachers / Daily live sessions / Sync across all devices / Pronunciation-focused lessons / Small learning groups / Topic-based classes); RIGHT half is a rounded-corner photograph of a teacher at a chalkboard with a translucent WHITE PLAY BUTTON overlay (video preview) → PREMIUM FEATURES: tag pill 'Premium Features' LEFT, bold sentence-case 2-line heading + small description split LEFT/RIGHT, then a HORIZONTAL CAROUSEL of FULL-COLOR PREMIUM CARDS (4 visible at once) with each card having a different bright background (LIME GREEN / ORANGE / PINK MAGENTA / SOFT BLUE) + bold sentence-case title + description + a rounded photograph at the bottom; below the carousel a horizontal PROGRESS BAR + a pair of CIRCULAR ARROW BUTTONS (left arrow = white-outlined circle, right arrow = BLACK FILLED CIRCLE — asymmetric pair signals primary forward direction) → MOBILE APP: a wide DARK FOREST GREEN ROUNDED CARD, LEFT half is a LIME GREEN ROUNDED INNER PANEL containing a cutout-style photograph of a smiling student holding a phone, RIGHT half contains the tag pill 'Mobile App' + bold WHITE 'Learn Anytime Anywhere' heading + description + TWO BLACK APP STORE PILL BUTTONS side-by-side (Google Play + App Store official badge style) + a 2x2 CHECKMARK FEATURE LIST in white text → TESTIMONIALS: tag pill 'Testimonials' LEFT, bold heading 'Reviews from our users' + description, then a PEEKING CAROUSEL: a centered LARGE WHITE TESTIMONIAL CARD (rounded photo on the left + quote text on the right + bottom row with 'Sofia / Spain' name on the left and 'Grade 5.0 ⭐⭐⭐⭐⭐' with ORANGE STAR RATINGS on the right), with PARTIAL/PEEKING preview photos of the prev and next testimonials on each side (cropped/masked to show small portrait thumbnails), CIRCULAR BLACK ARROW BUTTONS positioned on each side of the central card; bottom-right shows a black 'Start Learning for Free' pill + outlined 'Give Review' pill → PRICING: centered tag pill 'Pricing', centered bold heading 'Choose the Plan That Works for You' + description, a 3-OPTION TOGGLE PILL ('Monthly Plan' / 'Yearly Plan' [active black filled] / 'Quarterly Plan'), then a 3-COL PRICING CARD ROW where the CENTER card is FEATURED with a LIME-GREEN BORDER FRAME around it + a small black '★ Most Popular ★' badge anchored to the top edge + filled black 'Get Started' pill (the side cards are plain white with outlined 'Get Started' pills); below the row a small horizontal CHECKMARK LIST ('Switch or cancel anytime / No hidden fees / 30-day money-back guarantee') → FAQ: tag pill 'Faq' LEFT, bold 2-line heading 'Frequently Asked Questions!', LEFT-BOTTOM a small white card 'Stil Have Questions? / Contact Us / We are happy to help you' with 3 small overlapping avatar circles + black 'Start Learning for Free' pill; RIGHT a vertical ACCORDION with rounded white card items where CLOSED items are simple cards with question + '+' icon and the OPEN item is a slightly elevated FLOATING CARD with bigger shadow + '×' close icon + answer body text → CTA BANNER: a wide BLACK ROUNDED CARD spanning the container, LEFT half has the tag pill 'CTA' + bold WHITE 'Start Your English Journey Today' heading + description + a single WHITE PILL 'Start Learning Free' button; RIGHT half is a rounded-corner photograph of a happy student on a yellow couch with laptop → FOOTER: TOP a wide white-rounded SUBSCRIBE CARD (LEFT bold 'Stay Updated' + description, RIGHT a horizontal email-input pill + filled black 'Subscribe' button + small disclaimer below); BOTTOM a 6-COL FOOTER on the page bg: COL1 brand logo 'ABA English' + tagline + 4 BLACK CIRCULAR SOCIAL ICONS (facebook / linkedin / youtube / instagram) / COL2 'About' (About Us / Method / Teachers / Careers) / COL3 'Courses' (Kids & Teens / Business English / Kids & Teens) / COL4 'Support' (Contact / Help Center / FAQ) / COL5 'Legal' (Terms / Privacy / Cookies) / COL6 'Download App' (Google Play + App Store black pill badges); centered copyright bar at the bottom.",
  signaturePatterns: [
    "LIME-GREEN ICON-BADGE TAG PILL above every section — a small 1px-outlined rounded pill containing a tiny lime-green ROUNDED-SQUARE icon badge with a thin-line glyph + sentence-case label ('How It Works' / 'Course Levels' / 'Live Teachers & Classes' / 'Premium Features' / 'Mobile App' / 'Testimonials' / 'Pricing' / 'Faq' / 'CTA') — appears above every single section as the design's most repeated brand element",
    "MULTI-COLOR CARD STORY with role-disciplined accents — sections use a 4-color rotation (LIME GREEN = featured/active, DARK FOREST GREEN = trust/product, PINK MAGENTA = bold-emphasis/intro, ORANGE/BLUE = premium-feature variety) where each color has exactly one role across the design — never randomized, always purposeful",
    "ASYMMETRIC '1-BIG-COLORED + 4-SMALL-WHITE' GRID — Course Levels uses a unique split where 1 large colored card (~50% width) is paired with a 2x2 grid of 4 smaller white outlined cards (~50% width), creating featured-vs-other hierarchy without uniform tile grid",
    "CIRCULAR SLIDER ARROW PAIR with ASYMMETRIC COLORS — slider navigation pairs a WHITE-OUTLINED left arrow with a BLACK-FILLED right arrow (not symmetric), signaling 'forward is primary' — appears in Premium Features carousel and Testimonials",
    "PROGRESS BAR INDICATOR below carousels — a thin horizontal progress bar showing carousel position appears beneath the Premium Features card row alongside the asymmetric arrow pair",
    "3-OPTION TOGGLE PILL for pricing periods — a single rounded-pill containing 3 options ('Monthly Plan' / 'Yearly Plan' [active black filled] / 'Quarterly Plan') with the active option getting a black-filled rounded-pill highlight inside the larger pill — modern SaaS/billing convention done friendly",
    "LIME-BORDERED MOST POPULAR PRICING CARD with star badge — the center pricing card is wrapped in a LIME-GREEN BORDER FRAME (~12-16px border with internal padding) and gets a small black '★ Most Popular ★' badge anchored to the top edge; it also has the only black-filled CTA in the row (the side cards have outlined CTAs)",
    "INLINE EMOJI / AVATAR icons WITHIN headings — playful approachable touch where small face-emoji or avatar tokens are embedded directly in the headline text ('Learn Live with [emoji] Certified [emoji] Teachers'), softening the otherwise-formal product copy",
    "PEEKING TESTIMONIAL CAROUSEL with partial side-previews — a centered large white testimonial card with photo+quote+name+star-rating, flanked by PARTIAL/PEEKING preview photos of the prev and next testimonials cropped to show just thumbnails, plus circular black arrow buttons each side",
    "FAQ ACCORDION with FLOATING-CARD OPEN STATE — closed accordion items are simple flat white cards with a '+' icon, while the OPEN item becomes a FLOATING CARD with a bigger shadow and '×' close icon + answer body — this elevated-state contrast makes the open item stand out as a focused element",
    "CHECKMARK FEATURE LISTS in 2-COLUMN PAIRS — recurring layout pattern where 4-6 features are listed in a 2-column grid with green checkmark icons before each item (used in Live Teachers, Mobile App, and below Pricing as the trust-bullet row)",
    "DARK-GREEN ROUNDED CARD SECTIONS as accent product-feel breaks — Live Teachers & Mobile App both use a wide DARK FOREST GREEN rounded card panel that spans the container, breaking the white-card rhythm with authoritative product-feature anchors",
    "FRIENDLY CARD-STACK PAGE ARCHITECTURE — every section is wrapped in its own rounded card (white or colored) on a light-blue page bg, similar in structure to DentLab medical but using multi-color emphasis cards instead of uniform white cards",
    "BLACK FILLED + WHITE OUTLINED DUAL PILL CTA SYSTEM — primary CTAs are filled black pills with white text, secondary CTAs are 1px-outlined white pills with black text — fully rounded, no arrows or icons typically (clean and friendly)",
    "ORANGE STAR RATINGS for testimonials — the 5-star rating in testimonial cards uses orange-amber filled stars (different from typical gold or black) signaling warmth and approachability, paired with the 'Grade' label for an academic-progress feel",
  ],
  uniqueTechniques: [
    "Role-disciplined multi-color accent system — instead of randomly applying colors, the design assigns ONE role per color (lime = featured, dark green = product-trust, pink = bold-emphasis, orange/blue = variety), creating an immediately legible visual language where users learn 'lime means primary' / 'dark green means deep-trust' / 'pink means call-out' subconsciously; this discipline is what stops the multi-color design from feeling childish or messy and is the design's most replicable strength",
    "Lime-green icon-badge tag-pill above every section — a tiny lime ROUNDED-SQUARE icon badge inside an outlined rounded pill repeated above every section creates a reusable navigational scent that ties all sections together with a single brand element; this is more disciplined than typical uppercase tracking-wide labels and signals 'modern e-learning app'",
    "Asymmetric circular slider arrow pair (white-outlined + black-filled) — making the 'next/forward' arrow black-filled and the 'previous/back' arrow white-outlined breaks symmetric carousel-arrow convention and immediately signals direction-of-flow, especially for first-time users who haven't engaged with the carousel yet",
    "Lime-bordered Most Popular pricing card frame — wrapping the recommended plan in a thick lime-green border frame (with internal padding) is more visually anchoring than a tiny corner badge; the entire card becomes the recommendation, not just a label",
    "Inline-emoji headings — embedding small face/avatar emoji tokens directly in headline text ('Learn Live with [emoji] Certified [emoji] Teachers') softens the formal product voice and signals the product is approachable for non-native speakers / younger learners; this is rare in adult-product design and a key signature of consumer education tech",
    "Peeking partial-thumbnail testimonial preview — flanking the central testimonial card with cropped/masked previews of prev/next testimonial photos (rather than just dot indicators or full-card previews) creates a 'there's more to see' visual scent without consuming layout space",
    "FAQ accordion with elevated floating-card open state — when an accordion item opens, the entire card lifts off the page with a deeper shadow and rounded edges that make it feel like a focused dialog rather than an in-flow expansion; this prevents the open item from getting visually lost in a long accordion",
  ],
  spacing:
    "Friendly app-feel spacing — sections (cards) separated by 24-40px with the light-blue page bg showing between, card border-radius 24-32px (very rounded for friendly feel), card internal padding 32-48px, button border-radius full-rounded (pill), feature card image corner-radius 16-24px. The pricing toggle pill has 8-12px internal padding around the active black-filled option. The lime-bordered Most Popular card uses ~12-16px border thickness creating clear emphasis. Carousel cards have 16-24px gaps. Multi-card grids use 16-24px gaps. Generous breathing room — friendly e-learning feel rather than dense dashboard. The dark-green section cards span container width with ~48-72px internal padding around content. Hero is full viewport.",
  moodKeywords: "friendly, energetic, modern, approachable, playful, education, e-learning, language-learning, edtech, multi-color, brand-energetic, app-feel, contemporary, optimistic, inclusive, student-friendly",
  animations:
    "Energetic but disciplined — section cards fade-in-up on scroll-in (0.5s ease-out, y-24px → 0, stagger 0.08s between cards). Lime-green icon-badge tag pills: gentle scale-in (0.4s) with the icon-badge briefly bouncing 1.0 → 1.1 → 1.0. Course-level cards: hover → scale 1.03 + shadow elevation. Premium Features carousel: smooth horizontal slide between cards (0.4s ease-out), progress bar animates as cards advance, arrow press triggers slight pulse. Pricing toggle pill: active black-fill animates with smooth slide between options (0.3s ease-out). Lime-bordered Most Popular card: subtle continuous border-glow pulse (lime brightness 0.9 → 1.0 over 2s loop). FAQ accordion: open transition lifts the card with shadow (0.3s ease-out + height auto). Peeking testimonial carousel: cross-fade transitions between testimonials (0.5s) with side-thumbnails sliding in. CTAs: hover → bg darken + scale 1.03. Inline emoji avatars in headings: gentle continuous wobble (rotate -3° / +3° over 4s). Checkmark green checks: scale-in on viewport entry (0.3s). The motion vocabulary is friendly-energetic — playful but not childish, app-quality but not boring.",
  heroTreatment:
    "Hero on light-blue page bg #EBF1F8 with the typical FRIENDLY EDUCATION CARD layout: TOP NAV with brand logo LEFT + centered nav + black-pill primary CTA RIGHT (clean white nav bar, no float). The hero CARD itself follows the design's signature recipe: a small LIME-GREEN ICON-BADGE TAG PILL CENTERED at the top of the hero card containing a tiny rounded-square lime icon + a sentence-case label ('Welcome' / 'Start Learning' / domain-appropriate phrase), below it a CENTERED bold sentence-case 2-line headline (~48-64px Inter/Geist Bold, 'A Simple and Smart Way to Learn English'-style structure), a centered 2-3 line muted-gray description, and a single CENTERED FILLED BLACK PILL primary CTA. BELOW the hero text the page transitions immediately into the FEATURE CARD ROW (How It Works) with the FEATURED LIME-GREEN CARD as the first of 4 cards. Critically the hero is NOT a full-bleed cinematic photograph and NOT a split text+model layout — it's a centered-content card with optional decorative imagery (could be a video preview, an animated illustration, or a feature-card-row that doubles as the hero). The overall feeling is friendly, modern, approachable — like a student-app onboarding screen rather than a marketing landing page. Inline emoji or avatar tokens may be embedded in the headline text ('Learn English with [emoji] Real Teachers') for added approachability. The lime-green tag pill at the very top of the hero is the visual punctuation that tells users 'this is the welcome moment'.",
};

const record = {
  name: "ABA English Friendly E-Learning",
  industries: [
    "education",
    "online learning",
    "e-learning",
    "edtech",
    "language learning",
    "online course",
    "online courses",
    "course platform",
    "lms",
    "learning management",
    "training",
    "online training",
    "tutoring",
    "online tutoring",
    "school",
    "academy",
    "online academy",
    "bootcamp",
    "coding bootcamp",
    "skill development",
    "professional learning",
    "certification",
    "test prep",
    "music lessons",
    "art lessons",
    "kids learning",
    "k-12",
    "university",
    "mooc",
    "self-paced learning",
    "live classes",
    "language school",
  ],
  moods: [
    "friendly",
    "energetic",
    "modern",
    "approachable",
    "playful",
    "education",
    "e-learning",
    "language-learning",
    "edtech",
    "multi-color",
    "brand-energetic",
    "app-feel",
    "contemporary",
    "optimistic",
    "inclusive",
    "student-friendly",
    "duolingo-style",
    "babbel-style",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting ABA English education pattern into design_patterns...");

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
