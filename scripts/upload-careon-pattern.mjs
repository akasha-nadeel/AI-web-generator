// One-off uploader for the CAREON warm friendly editorial nonprofit/charity
// pattern. Cream/off-white + forest-dark-green + mint-light-green + soft-coral
// accent system, sun-burst-rays green LOGO ICON + 'CareOn' wordmark, MINT-
// LIGHT-GREEN PILL 'Login' + DARK-FOREST-GREEN PILL 'Contact Us' DUAL NAV
// CTAs, full-bleed warm friendly diverse-faces photo hero with FLOATING DUAL
// WHITE CARDS on the right (donation-tracker card with progress bar + program-
// card with green pill tag + 'Donate' dark-green CTA), MASSIVE 3-LINE BLACK
// SANS BOLD HERO HEADING ('Every Act of / Charity Creates / Endless Impact')
// + 'Join the Mission ↗' dark-green pill CTA bottom-left, FULL-BLEED MINT-
// CREAM SECTION with 'Challenge for Charity' centered featured-card carousel
// with green-pill ←/→ side-arrows + bottom CATEGORY ICON-LABEL ROW (Poverty/
// Education/Fishery/Water with line-icons), 'Discover Causes You Love' 3-COL
// CAUSE-CARD GRID with rounded photo-top + heading + description + GREEN
// PROGRESS BAR + '$X raised' bold black + 'X days left' gray, 4-TAB PILL
// SELECTOR with downward triangle pointer for HOW-IT-WORKS (Pledge/Support/
// Donate/Inspire — active filled mint-green with white text + downward
// triangle), 'News & Updates' SPLIT: LARGE FEATURED CARD LEFT (full-bleed
// photo + bottom white card with date/title/description/Read More) + 4-STACK
// VERTICAL THUMBNAIL LIST RIGHT (small square thumb LEFT + date+title+Read
// More-pill RIGHT), Testimonials with split-quote layout (square avatar LEFT
// + giant centered black bold quote + smaller secondary photo RIGHT + name
// in small gray below quote), small ←/→ pagination arrows + numbered dots,
// COLORED CATEGORY-BADGE PILLS (blue Education / pink Women / green
// Environment / orange Health) on insight cards as a multi-color discipline
// for ONE category-tagging context, FULL-BLEED DARK FOREST GREEN FOOTER with
// newsletter input + 4-col link grid + sun-burst logo + bottom social row.
// First pattern for Nonprofit / Charity industry — warm editorial friendly
// charity/nonprofit/foundation mood (NOT corporate-NGO, NOT austere — this
// is the warm-friendly-faces-and-progress editorial nonprofit voice).
//
// Run with: node scripts/upload-careon-pattern.mjs

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
  colorPalette: "#FAFAF7, #FFFFFF, #F0F4EC, #DCE9CE, #1A2E1F, #0F1F12, #2F4F2F, #4A7C4E, #B8DDA0, #F4D5C0, #1A1A1A, #6B6B6B",
  colorMode: "light",
  accentUsage:
    "WARM EDITORIAL FRIENDLY NONPROFIT palette built on a confident FOREST-DARK-GREEN + MINT-LIGHT-GREEN dual accent over warm cream/off-white backgrounds. (1) WARM CREAM/OFF-WHITE #FAFAF7 (slightly warmer than pure white, softer than ivory) is the primary section background — sets a friendly + non-corporate mood (NOT pure-white-clinical, NOT cold-gray). (2) PURE WHITE #FFFFFF is for floating hero CARDS + cause CARDS + featured news CARDS, providing clean cardlike contrast against the cream sections. (3) PALE MINT-CREAM #F0F4EC is for FULL-BLEED MINT-CREAM SECTION BACKGROUNDS like the 'Challenge for Charity' featured-carousel section — softer alternating section bg color that feels warm and natural-meadow without being saturated. (4) DEEP FOREST GREEN #1A2E1F (with darker variant #0F1F12) is the SIGNATURE PRIMARY ACCENT — used for: ALL primary FILLED PILL CTAs ('Contact Us' nav pill, 'Donate' on hero program card, 'Join the Mission ↗' hero CTA, 'Take a Pledge', 'Subscribe' submit), sun-burst-rays green LOGO ICON (the 8-12-pointed sun-burst centered icon ABOVE/BESIDE the 'CareOn' wordmark in deep forest green), the FULL-BLEED FOREST-GREEN FOOTER background, the dark forest-green pagination arrow dot ('←/→' carousel arrows in the brand-values section), and the 'Submit' nav button background in dark forest green. (5) MINT LIGHT-GREEN #B8DDA0 (with paler variant #DCE9CE) is the SECONDARY ACCENT — used for: 'Login' nav PILL CTA bg (mint pill with dark-forest-green text, paired with the dark 'Contact Us' pill creating dual-pill nav signature), 'Education Support' green PILL TAG on hero program card (with small icon prefix), GREEN PROGRESS BARS in cause cards + hero donation tracker (linear progress fill in mint green with rounded ends), the active downward-triangle-pointer 4-TAB PILL ACTIVE STATE bg (selected tab filled mint green with white text), the carousel side-arrow circular bg ('←/→' green-tinted circles), the GREEN 'How It Works' eyebrow label sun-burst tiny icon prefix, GREEN check/leaf icons throughout. (6) SOFT CORAL #F4D5C0 (very subtle peach) appears in the donation tracker progress bar background (the muted coral provides contrast for the mint green progress fill), and as occasional small accent moments. (7) CHARCOAL-NEAR-BLACK #1A1A1A for primary text (massive headings, body bold). (8) MUTED GRAY #6B6B6B for tertiary text (descriptions, '7 days left' subtitles, copyright). (9) ONE LIMITED-SCOPE MULTI-COLOR DISCIPLINE — for INSIGHT/STORY CATEGORY BADGES ONLY, the design uses small COLORED PILL TAG BADGES in 4 distinct colors (BLUE 'Education' / PINK 'Women' / GREEN 'Environment' / ORANGE 'Health'); these multi-color category badges appear ONLY on insight cards as a tagging vocabulary and are NEVER used elsewhere — keeping the category-color discipline strictly scoped. The accent system overall is forest-green + mint-green dual + cream + coral with limited multi-color category badges — warm editorial nonprofit confidence without becoming generic.",
  typography:
    "BOLD MODERN SANS as the entire typographic system — Inter / Plus Jakarta Sans / DM Sans / Manrope at 700-900 for major headings, 400-500 for body. SPECIFIC PAIRINGS: (1) HERO MASSIVE 3-LINE LEFT-ALIGNED HEADING in 56-88px sans bold (700-900) WHITE on photo (or NEAR-BLACK #1A1A1A on cream sections) — typically 3 LINES like 'Every Act of / Charity Creates / Endless Impact' with each line containing 2-3 short words, tight tracking, sentence-case (NOT all-caps). (2) Section headings like 'Join Hands, Spread Kindness' / 'Discover Causes You Love' / 'Your Actions Make a Difference' / 'News & Updates' / 'Their Lives, Our Mission' / 'Latest Insights' / 'Stay Connected' rendered in 36-56px sans bold (700-800) NEAR-BLACK #1A1A1A centered (most sections) or left-aligned ('Stay Connected'). (3) Sub-section featured-block headings like 'Challenge For Charity' rendered in 24-32px sans bold (700) NEAR-BLACK centered above the carousel. (4) Section-eyebrow labels like 'How It Works' / 'Donations' / 'Stories' rendered in 12-14px sans medium (500-600) DEEP FOREST GREEN with a tiny SUN-BURST-RAYS ICON PREFIX (small ~12-14px green sun-burst icon to the LEFT of the label text) — the green-eyebrow-with-sun-burst-icon is signature label vocabulary. (5) Cause card titles 'Help Kids Reach Their Potential With Education' / 'Support The Hungry With Food Packs' rendered in 18-22px sans bold (700) NEAR-BLACK on white cards, 2-3 line wrap. (6) Cause card 'raised amount' '$120,999 raised' rendered in 14-16px sans bold (700) NEAR-BLACK + 'X days left' subtitle in 12-14px regular gray on the same row. (7) Hero floating donation tracker 'tracker amount' '$245,800.50' rendered in 28-36px sans bold (700) NEAR-BLACK + below it '512 Investors' bold + '56%' percentage right-aligned. (8) Hero program card subhead 'Donation and Charity Program' rendered in 22-28px sans bold (700) NEAR-BLACK + below it 14-16px regular gray description + green PILL TAG 'Education Support' above the heading + 'Donate' DARK FOREST GREEN FILLED PILL bottom. (9) 4-tab pill selector labels 'Pledge' / 'Support' / 'Donate' / 'Inspire' rendered in 14-16px sans medium (500-600), active tab is white text on mint-green pill bg, inactive tabs are NEAR-BLACK text on white pill bg with subtle border + small icon prefix per tab. (10) News featured-card title rendered in 22-28px sans bold (700) NEAR-BLACK on white card with the rest of the white card flowing below the photo. (11) News 4-stack thumbnail-list titles rendered in 14-16px sans bold (700) NEAR-BLACK + 12-13px gray date label above. (12) Testimonial GIANT CENTERED QUOTE rendered in 22-28px regular sans NEAR-BLACK (NOT italic — straight regular weight in curly quotes ' '), centered, multi-line. (13) Testimonial NAME ATTRIBUTION 'Santi., Scholarship Recipient, Bandung, Indonesia' rendered in 14-16px regular sans MUTED GRAY centered below the quote. (14) Body paragraphs 14-16px regular sans MUTED GRAY ~1.55-1.65 line-height. (15) Footer column headings 'Information' / 'What we do' / 'Quick Links' / 'Resources' rendered in 14-16px sans medium (500-600) MUTED LIGHT-GRAY (against dark forest green bg) — NOT bold, NOT all-caps. (16) Footer link items 'Empower Communities' / 'About Us' rendered in 14-16px regular sans LIGHTER GRAY/CREAM. (17) Insight card categorized labels 'Education' / 'Women' / 'Environment' rendered in 11-13px sans medium (500) WHITE on small COLORED PILL bg (blue/pink/green/orange respectively). NO italic, NO serif, NO condensed display — strict bold-modern sans (warm editorial friendly nonprofit voice).",
  layout:
    "WARM EDITORIAL FRIENDLY NONPROFIT flow — alternating warm cream/off-white sections with full-bleed mint-cream feature sections + dark forest green footer. TOP NAV (overlaid on hero photo OR on cream sections): CareOn LOGO LEFT (small ~24-32px GREEN SUN-BURST-RAYS ICON — 8-12 short triangular rays radiating from a small center forming a sun shape — + dark forest-green sans 'CareOn' wordmark beside it), CENTERED nav links 'Campaigns / About Us / Resources / How It Works' in 14-16px regular sans NEAR-BLACK or WHITE (depending on overlay context), RIGHT a HORIZONTAL PAIR of 2 PILL CTAs: MINT LIGHT-GREEN PILL 'Login' (~80-100×36-40px, mint bg #B8DDA0, dark forest-green text, fully-rounded) + DARK FOREST-GREEN FILLED PILL 'Contact Us' (~120-140×36-40px, dark green bg, white text, fully-rounded) — the dual-pill CTA pair (mint + dark green) is the design's signature nav vocabulary → HERO (full-bleed warm friendly diverse-faces photograph + light overlay): a full-bleed photograph of multiple smiling diverse young people (community workers, volunteers, recipients) standing close together holding clothing/donations/items in a warm-lit indoor setting (cream/beige/peach tones in the photography that match the cream section bg), running edge-to-edge with a SUBTLE SOFT-WHITE OVERLAY (~10-15% opacity to brighten/soften the photo without darkening it like a bar/club hero would). Content LEFT-aligned starting around 6-8% from the left edge: MASSIVE 56-88px sans bold (700-900) WHITE 3-LINE LEFT-ALIGNED HEADING 'Every Act of / Charity Creates / Endless Impact' (each line on its own line, with each line containing 2-3 short words), BELOW it ~24-32px gap to a 14-16px regular sans WHITE 2-line subtitle 'Compassion opens doors to a better future, bringing hope and transformation to those in need.', BELOW it ~32-40px gap to a SINGLE FILLED DARK FOREST-GREEN PILL CTA 'Join the Mission ↗' (~140-160×52-56px, dark forest-green bg, white text, fully-rounded with small ↗ up-right arrow). FLOATING ON THE RIGHT 28-32% of the hero photo, vertically centered: TWO STACKED FLOATING WHITE CARDS — TOP CARD is a DONATION TRACKER (~360-420×140-180px, pure white bg, rounded 16-20px corners, ~24-32px internal padding) containing: large 'donation amount' '$245,800.50' bold near-black centered/left, BELOW it a HORIZONTAL PROGRESS BAR (mint-green progress fill #B8DDA0 on coral-pink track #F4D5C0, ~6-8px tall, fully-rounded ends, ~50-60% filled), BELOW the bar a LEFT '512 Investors' bold near-black + RIGHT '56%' percentage muted gray; BOTTOM CARD is a PROGRAM CARD (~360-420×280-320px, pure white bg, rounded 16-20px corners, ~24-32px internal padding) containing: TOP a small MINT-GREEN PILL TAG 'Education Support' (with a tiny icon prefix), BELOW the tag a 22-28px sans bold near-black 2-line program-name heading 'Donation and / Charity Program', BELOW it a 14-16px regular gray 2-line description 'Donation and Charity Program to Support Communities in Need', BELOW it a CENTERED DARK FOREST-GREEN FILLED PILL 'Donate' (~140-160×44-48px) → JOIN HANDS SPREAD KINDNESS + CHALLENGE FOR CHARITY (FULL-BLEED PALE MINT-CREAM #F0F4EC SECTION): centered 36-56px sans bold near-black 'Join Hands, Spread Kindness' heading + centered 14-16px regular gray 2-line subtitle 'Discover and Support Fundraisers Inspired by the Causes You Truly Care About'; BELOW a CENTERED FEATURED-CARD CAROUSEL containing: centered 24-32px sans bold near-black 'Challenge For Charity' sub-heading + centered 14-16px regular gray 1-line subtitle 'Turn Challenges Into Donations For Social Good.' + a CENTERED CARD CAROUSEL row showing 1 LARGE FEATURED-CENTER PHOTO CARD (~640-720×320-360px, full-bleed photo with rounded 16-20px corners showing donation/volunteer activity) flanked by 2 PARTIALLY-VISIBLE EDGE PHOTO CARDS (showing only ~80-120px on each side with the same rounded-corners) creating the carousel-with-edge-peek visual; FLOATING on the LEFT and RIGHT of the featured center card are GREEN-TINTED CIRCULAR ARROW NAV BUTTONS ('←' on left in pale mint-green-tinted circle, '→' on right in DEEPER FOREST-GREEN-tinted circle — directional asymmetry: forward is darker); BELOW the carousel a CENTERED CATEGORY ICON-LABEL ROW with 4 categories: 'Poverty / Education / Fishery / Water' each rendered as a small line-icon ABOVE its label text in 12-14px regular gray, separated by ~32-48px horizontal gaps; BELOW the category row a centered 14-16px regular gray italic-feel sentence 'Together, even the smallest donations can turn into something powerful' with the words 'smallest donations' rendered in NEAR-BLACK BOLD as inline emphasis → DISCOVER CAUSES YOU LOVE (cream): centered 36-56px sans bold near-black 'Discover Causes You Love' heading + centered 14-16px regular gray 2-line subtitle 'Support Causes You Truly Believe In And Turn Your Contribution Into Lasting Impact.'; BELOW a 3-COLUMN CAUSE-CARD GRID (each card ~320-360×440-480px, white card bg, rounded 16-20px corners, no border or subtle 1px border): each card structure TOP-DOWN: rounded-top-corners FULL-BLEED PHOTO (~320×220-260px) at the top of the card (cause-relevant photography — children studying, food being served, hands holding seedling), BELOW the photo on white card area: 18-22px sans bold near-black 2-line cause title 'Help Kids Reach Their Potential With Education', BELOW it 14-16px regular gray 1-line description, BELOW a HORIZONTAL GREEN PROGRESS BAR (mint-green fill #B8DDA0 on near-white #F0F4EC track, ~4-6px tall, rounded ends, varying fill % per cause), BELOW the bar a LEFT '$120,999 raised' bold near-black + RIGHT '7 days left' regular muted gray on the same row; BELOW the 3-card grid a CENTERED PAGINATION ROW with: rounded-square left arrow '←' button + numbered dots '1 2 3 ...' + right arrow '→' button → YOUR ACTIONS MAKE A DIFFERENCE (cream): centered green sun-burst eyebrow '🌿 How It Works' (small green sun-burst icon prefix + tracking-wide green sans label) + centered 36-56px sans bold near-black 'Your Actions Make a Difference' heading + centered 14-16px regular gray subtitle 'Every step you take brings us closer to a transformed [region]. Here's how you can contribute.'; BELOW a 4-TAB PILL SELECTOR ROW (4 horizontally-aligned pills, each ~140-180×52-56px, white bg with subtle 1px border, fully-rounded, near-black text + small icon prefix per tab — 'Pledge / Support / Donate / Inspire' icons being hand-up / heart-outline / coin-stack / lightbulb); the ACTIVE TAB ('Pledge') is filled MINT-GREEN bg #B8DDA0 with white text + has a SMALL DOWNWARD TRIANGLE POINTER beneath it (~10-14px) anchoring it to the content card below; BELOW the active tab a SPLIT CONTENT CARD (~1100-1200×220-260px, light mint-cream bg, rounded 16-20px corners): LEFT 50% column contains 24-32px sans bold near-black 2-line heading 'Make a [GREEN-COLORED INLINE WORD 'commitment to support'] / a cause you care about.' (with the colored emphasis on the inline phrase 'commitment to support' rendered in MINT GREEN), BELOW it 14-16px regular gray 3-line description, BELOW it a CORAL/PINK FILLED PILL CTA 'Take a Pledge' (small ~120×40-44px); RIGHT 50% column contains a rounded photo of community/celebration/team-with-hands-up (warm-toned photograph with sun-burst light) → CAMPAIGNS (FULL-BLEED LIGHT TAN/BEIGE SECTION with subtle leaf decorative illustrations bottom-corners): green sun-burst eyebrow '🌿 Donations' centered + centered 36-56px sans bold near-black 'Campaigns' heading + centered 14-16px regular gray subtitle 'Browse active campaigns and support causes that matter to you.'; BELOW a 3-COLUMN CAMPAIGN-CARD GRID (each card ~320-360×320-360px white bg with subtle border, rounded 16-20px corners): each card has a FULL-BLEED PHOTO TOP (~320×180-220px), BELOW it a SMALL COLORED CATEGORY PILL TAG ('Education' in BLUE) + 16-20px sans bold near-black 1-2 line title 'Books for Every Child' + 14-16px regular gray description + a PROGRESS BAR (mint green / golden yellow / vivid green showing different fill levels — '20% raised' / '50% funded' / '100% funded' status text below); BELOW the 3-card grid a CENTERED 'Load More...' OUTLINED PILL CTA → NEWS & UPDATES (cream, split layout): centered 36-56px sans bold near-black 'News & Updates' heading + centered 14-16px gray subtitle 'Discover the latest from our community and the causes we champion.'; BELOW a SPLIT layout: LEFT 55% column contains ONE LARGE FEATURED NEWS CARD (~600-700×360-420px) with full-bleed top photograph (~600×220-260px) + WHITE CARD AREA at the bottom with: 14-16px regular gray date 'January 28, 2025', 22-28px sans bold near-black 2-line title 'Help Orphanage Children Build a Brighter Future', 14-16px regular gray 4-line description, BELOW a 'Read More →' OUTLINED PILL CTA; RIGHT 45% column contains a 4-STACK VERTICAL THUMBNAIL LIST: each row has a SMALL SQUARE PHOTO LEFT (~140-160×120-140px, rounded 12-16px corners) + 14-16px regular gray date + 16-20px sans bold near-black 2-line title + 'Read More →' OUTLINED PILL CTA on the RIGHT; the 4 rows are separated by ~16-24px vertical spacing → THEIR LIVES OUR MISSION (cream): centered 36-56px sans bold near-black 'Their Lives, Our Mission' heading + centered 14-16px regular gray 2-line subtitle 'Testimonials and stories from those who have been empowered by your kindness.'; BELOW a SPLIT-QUOTE LAYOUT: LEFT 25% column contains a SQUARE PORTRAIT PHOTO (~200×200-220px rounded 16-20px corners, cause beneficiary portrait); CENTER 50% column contains a GIANT CENTERED 22-28px regular sans NEAR-BLACK QUOTE in CURLY QUOTES ' ' ('I honestly don't know where I would be without their help. The educational scholarship I received has opened up a world of opportunities for me and my family.'), BELOW the quote a 14-16px regular muted-gray attribution 'Santi., Scholarship Recipient, Bandung, Indonesia'; RIGHT 25% column contains a SECONDARY SUPPORTING PHOTO (~200×200-220px rounded — typically a related context photo); BELOW the layout a CENTERED PAGINATION ROW with rounded-square ← arrow + numbered dots + → arrow → LATEST INSIGHTS (cream): green sun-burst eyebrow '🌿 Stories' centered + centered 36-56px sans bold near-black 'Latest Insights' heading + centered 14-16px gray 1-line subtitle 'Stories of impact, community, and change from across [region].'; BELOW a 3-COLUMN INSIGHT-CARD GRID (each card ~280-320×320-360px white bg, rounded 16-20px corners): each card has a FULL-BLEED PHOTO TOP (~280×180-220px), BELOW it on white area: small 'date' '📅 Feb 15, 2026' regular gray + a SMALL COLORED CATEGORY PILL TAG ('Education' in blue / 'Women' in pink / 'Environment' in green / 'Health' in orange — different category gets different brand color), 16-20px sans bold near-black 2-line title 'How Community-Led Education is Transforming Rural India' + 14-16px regular gray 2-line description → STAY CONNECTED (FULL-BLEED LIGHT SKY-BLUE SECTION with leaf decorative illustration bottom-right): LEFT 55% column contains 36-56px sans bold near-black 'Stay Connected' heading + 14-16px regular gray 2-line subtitle 'Get inspiring stories, campaign updates, and ways to make a difference delivered to your inbox.' + a HORIZONTAL ROUNDED-PILL EMAIL INPUT (~480-560×56-64px, white bg, gray placeholder 'Enter your email') with a CORAL/PINK FILLED PILL 'Subscribe' button (~120-140px wide) inside on the right edge; RIGHT 45% column has a HAND-DRAWN/ILLUSTRATED LEAF/BOTANICAL DECORATION (mint-green leaf cluster ~280-320px) bottom-right corner adding warmth → DARK FOREST GREEN FOOTER (FULL-BLEED #1A2E1F): TOP a 5-COLUMN GRID — COL1 (~25%): CareOn LOGO (sun-burst-rays icon + 'CareOn' wordmark, both in cream/light tone for footer contrast), BELOW it 'Join Our Newsletter' label and a HORIZONTAL ROUNDED-PILL EMAIL INPUT (~280-320×48-52px, dark-green-tinted bg with subtle border, light placeholder text) with a SLIGHTLY-DARKER-FOREST-GREEN 'Submit' filled pill embedded on the right; COL2 'Information' label + 3-line address+phone+email contact info; COL3 'What we do' + 4 vertical text-link items ('Empower Communities / Provide Aid & Relief / Support Education / Improve Healthcare'); COL4 'Quick Links' + 4 vertical text-link items ('About Us / Campaigns / Donate / Get Involved'); COL5 'Resources' + 3 vertical text-link items ('Success Story / Help and FAQs / Our Blog'); BOTTOM a horizontal divider line + bottom row '© 2025 CareOn. All right reserved' on LEFT in muted cream + 3 SOCIAL ICONS (facebook / instagram / x) on RIGHT in muted cream, ~16-24px gap.",
  signaturePatterns: [
    "MINT-LIGHT-GREEN + DARK-FOREST-GREEN DUAL PILL NAV CTAs — the top nav uses TWO horizontally-paired pill CTAs RIGHT: a MINT LIGHT-GREEN PILL 'Login' (~80-100×36-40px, mint bg #B8DDA0, dark forest-green text) + a DARK FOREST-GREEN FILLED PILL 'Contact Us' (~120-140×36-40px, dark green bg, white text); the dual-pill (light + dark) tonal pairing is the design's signature nav vocabulary — softer + more inviting than a single bold CTA pair, suggests 'enter for free' + 'contact us for more'",
    "FLOATING DUAL-CARD ON HERO (donation tracker + program card stacked) — the hero photo has TWO STACKED FLOATING WHITE CARDS on the right 28-32%: TOP CARD is a DONATION TRACKER with massive '$245,800.50' amount + horizontal PROGRESS BAR (mint-green on coral-pink track) + 'X Investors' + '%'; BOTTOM CARD is a PROGRAM CARD with mint pill TAG + 2-line bold heading + description + 'Donate' DARK FOREST-GREEN FILLED PILL; the floating dual-card is the design's most identifiable hero element and instantly communicates 'we're transparent + here's a specific cause to back NOW'",
    "SUN-BURST-RAYS GREEN LOGO ICON — the brand uses a small DEEP-FOREST-GREEN SUN-BURST-RAYS ICON (~24-32px composed of 8-12 short triangular rays radiating from a small center forming a stylized sun shape) placed to the LEFT of the dark forest-green sans 'CareOn' wordmark; the same sun-burst icon also serves as a TINY EYEBROW LABEL PREFIX (~12-14px green sun-burst) before tracking-wide green section eyebrow labels ('How It Works' / 'Donations' / 'Stories') — establishing the icon as the brand's universal symbolic language for warmth + giving",
    "MASSIVE 3-LINE LEFT-ALIGNED HERO HEADING with single CTA — the hero uses a MASSIVE 3-LINE WHITE SANS BOLD heading (each line containing 2-3 short words: 'Every Act of / Charity Creates / Endless Impact') LEFT-ALIGNED + a single 'Join the Mission ↗' DARK FOREST-GREEN PILL CTA below; the 3-line heading is the design's most powerful typographic statement and the single-CTA (vs dual CTAs) reinforces editorial-confidence focus",
    "GREEN PROGRESS BAR + AMOUNT-RAISED + DAYS-LEFT 2-COLUMN ROW on cause cards — every cause card uses a HORIZONTAL GREEN PROGRESS BAR (mint-green fill on light track, ~4-6px tall, rounded ends) + below it a 2-COLUMN ROW: '$X raised' bold near-black LEFT + 'X days left' regular muted gray RIGHT; the progress-bar + 2-column-status row is the design's signature transparency mechanism and is repeated identically across all cause-card contexts (hero tracker, cause grid, campaign cards)",
    "FEATURED-CARD CAROUSEL WITH EDGE-PEEK + GREEN CIRCULAR ARROWS + BOTTOM CATEGORY ICON-LABEL ROW — the 'Challenge for Charity' section uses a CENTERED FEATURED-CENTER PHOTO CARD (large) flanked by 2 PARTIALLY-VISIBLE EDGE PHOTO CARDS showing only ~80-120px on each side (creating an edge-peek-carousel preview) + GREEN-TINTED CIRCULAR ←/→ ARROW BUTTONS floating on left and right (with directional asymmetry: dark-forest-green on right = forward, pale-mint on left = backward); BELOW the carousel a CENTERED CATEGORY ICON-LABEL ROW (Poverty / Education / Fishery / Water — small line-icon above each label) — the multi-element treatment turns a simple slider into a thoughtful curated experience",
    "4-TAB PILL SELECTOR WITH DOWNWARD TRIANGLE POINTER for 'How It Works' — the How-It-Works section uses a HORIZONTAL ROW of 4 PILL TABS ('Pledge / Support / Donate / Inspire') each with a small icon prefix per tab; the ACTIVE TAB is filled MINT-GREEN bg with white text AND has a SMALL DOWNWARD TRIANGLE POINTER beneath it (~10-14px) anchoring it to the content card below — the same speech-bubble-tail interaction as event websites for day-tab selectors, repurposed for action-type selection",
    "INLINE COLORED EMPHASIS WORDS in headings — the active 'How It Works' content card uses INLINE MINT-GREEN COLORED WORDS within an otherwise-near-black heading ('Make a [commitment to support] a cause you care about.' — where 'commitment to support' is mint green); the colored-keyword-emphasis-within-bold-heading is signature heading vocabulary, used sparingly for emphasis without breaking heading boldness",
    "NEWS SPLIT: LARGE FEATURED CARD LEFT + 4-STACK VERTICAL THUMBNAIL LIST RIGHT — the News & Updates section uses a SPLIT LAYOUT: LEFT 55% column has ONE LARGE FEATURED NEWS CARD (full-bleed photo top + white card area below with date + title + 4-line description + Read More pill); RIGHT 45% column has a 4-STACK VERTICAL THUMBNAIL LIST (small square photo LEFT + date + 2-line title + Read More pill RIGHT per row); the asymmetric split (1 featured + 4 supplementary) gives the section editorial-magazine quality without being symmetrical",
    "TESTIMONIAL SPLIT-QUOTE LAYOUT: PORTRAIT PHOTO LEFT + GIANT CENTERED QUOTE CENTER + SUPPORTING PHOTO RIGHT — testimonials use a 25% / 50% / 25% split: LEFT square portrait photo of beneficiary, CENTER giant 22-28px regular sans NEAR-BLACK quote in curly quotes (NOT italic) + small attribution beneath, RIGHT a secondary supporting photo (related context); the photo-flanked-quote layout is rare and gives the testimonial editorial-magazine treatment beyond typical card grids",
    "LIMITED-SCOPE MULTI-COLOR CATEGORY BADGES (blue/pink/green/orange) on insight cards ONLY — insight/story cards use a SMALL COLORED PILL TAG BADGE in 4 distinct brand colors (BLUE 'Education' / PINK 'Women' / GREEN 'Environment' / ORANGE 'Health') as category indicators; the multi-color tagging is STRICTLY scoped to insight cards — keeping the design's overall green-only discipline intact while allowing visual variety in the one-context where category navigation matters",
    "GREEN SUN-BURST EYEBROW LABELS — section eyebrow labels like '🌿 How It Works' / '🌿 Donations' / '🌿 Stories' rendered in 12-14px sans medium DEEP FOREST GREEN with a tiny SUN-BURST-RAYS ICON PREFIX (small ~12-14px green sun-burst to the LEFT of the label text); the green-eyebrow-with-sun-burst-icon is signature label vocabulary across all sections",
    "CORAL/PINK 'TAKE A PLEDGE' / 'SUBSCRIBE' WARM SECONDARY CTAs — secondary CTAs in specific contexts (Take a Pledge in How-It-Works, Subscribe in Stay Connected newsletter) use a SOFT CORAL/PINK FILLED PILL (small ~120×40-44px) instead of the dark forest green; the warm coral CTA is reserved for emotional/nurturing actions (pledge / subscribe) while dark-green is for transactional actions (donate / contact / submit) — a subtle UX-meaning split",
    "FULL-BLEED LIGHT SKY-BLUE NEWSLETTER SECTION WITH LEAF DECORATIVE ILLUSTRATION — the 'Stay Connected' newsletter section uses a FULL-BLEED LIGHT SKY-BLUE SECTION BG (~#D8E8F0 ish) breaking the cream rhythm; LEFT 55% has heading + subtitle + horizontal pill-input + coral subscribe button; RIGHT 45% has a HAND-DRAWN/ILLUSTRATED MINT-GREEN LEAF/BOTANICAL CLUSTER DECORATION bottom-right corner adding warmth + softness without being twee",
    "FULL-BLEED MINT-CREAM SECTION BACKGROUNDS for featured content — sections like 'Join Hands, Spread Kindness' / 'Challenge for Charity' use a FULL-BLEED PALE MINT-CREAM bg #F0F4EC (slightly green-tinted off-white), softer alternating bg color than the cream-warm-white default; gives the page rhythm without heavy contrast",
    "DARK FOREST-GREEN FULL-BLEED FOOTER with newsletter input + 4-col grid + bottom social row — the footer uses FULL-BLEED DEEP FOREST GREEN #1A2E1F with newsletter pill-input + 'Submit' green pill on the LEFT, 4-COLUMN LINK GRID in the middle, sun-burst-rays + 'CareOn' wordmark in cream/light at the very LEFT-TOP, and bottom-row copyright + 3 social icons; the dark-forest-green footer is the inverted finale to the cream-warm body, providing tonal closure",
  ],
  uniqueTechniques: [
    "Mint + dark-forest-green dual-pill nav CTA pair as design identity — using TWO tonally-related pill CTAs in the nav (light mint 'Login' + dark forest 'Contact Us') instead of a single bold CTA gives the nav a softer + more invitational tone; pairs naturally with nonprofit mission of welcoming people in rather than aggressively converting them; transferable to any service/community brand wanting friendly-not-pushy nav",
    "Floating dual-card hero with donation tracker + program-CTA card — placing TWO STACKED WHITE FLOATING CARDS on the right side of the hero (top tracker showing TOTAL FUNDS RAISED + progress + investor count; bottom program card with mint pill tag + heading + description + Donate CTA) instantly communicates organizational TRANSPARENCY (we tell you the numbers) AND specific ACTION (here's exactly what to fund); the floating-dual-card is more confident than a single hero card and works for any campaign-driven brand",
    "Inline colored emphasis words within bold headings — using inline MINT-GREEN COLORED WORDS within an otherwise-near-black heading ('Make a [commitment to support] a cause you care about.') is more elegant than highlighting the entire heading or using all-caps; transferable to any context where you want to emphasize specific phrases without breaking heading typography",
    "Limited-scope multi-color category badge discipline — restricting multi-color (BLUE/PINK/GREEN/ORANGE) pill badges to ONE specific context (insight card category tags) preserves the design's overall green-only discipline while allowing visual variety in the one place where category navigation actually matters; a powerful design discipline pattern transferable to any system that needs both brand-cohesion + category-differentiation",
    "Green sun-burst-rays as universal warmth symbol — using a small DEEP-FOREST-GREEN SUN-BURST-RAYS ICON as both the LOGO icon AND the section eyebrow prefix establishes the icon as the brand's universal symbolic language for warmth + giving; pairing the same icon in both nav-logo and section-label-prefix is rare brand consistency and gives every section a 'curated by the brand' feel",
    "Mint + dark-green CTA UX-meaning split (mint=enter/welcome, dark-green=transact, coral=pledge/subscribe) — using THREE distinct CTA color treatments by intent (mint = welcome/enter, dark forest green = transact/donate/contact, coral pink = warm-action like pledge/subscribe) gives users color-coded action affordance without explicit instructions; transferable to any service brand that has multiple CTA intents (free/paid, info/action, browse/buy)",
    "Featured-card carousel with edge-peek preview — using a CENTERED FEATURED-CENTER CARD flanked by PARTIALLY-VISIBLE EDGE PHOTOS (showing only ~80-120px of each side) is more inviting than a single-card carousel because it telegraphs 'there's more to swipe' without requiring extra UI; the edge-peek treatment is signature carousel design",
    "Photo-flanked centered-quote testimonial layout — using a 25% / 50% / 25% split where LEFT is a square portrait of the testimonial subject + CENTER is a giant 22-28px regular sans quote in curly quotes + RIGHT is a supporting photograph gives the testimonial editorial-magazine treatment that no typical card grid can achieve; works for any context with strong personal stories",
  ],
  spacing:
    "Warm editorial nonprofit spacing — sections separated by 96-128px on desktop, content max-width ~1280-1400px with comfortable side gutters, headline-to-body gap 24-40px. Hero is full-viewport with content vertically-centered + ~80-120px from left edge + floating dual cards anchored 32-48px from right edge with ~24px vertical gap between top tracker and bottom program card. Stat/cause/insight cards have 24-32px gaps in 3-column grids + 24-32px internal padding + 16-24px gaps between photo and content. 4-tab pill selector has 12-16px between tabs + 24-32px gap to content card below + 8-12px below for triangle pointer. Featured carousel has 32-48px between center card and edge-peek cards. News split: 32-48px between large featured card and 4-stack list + 16-24px vertical spacing in the 4-stack rows. Testimonial split-quote has 32-48px between portrait photo and centered quote. Footer 5-column grid 32-48px column gaps + 16-24px internal vertical spacing. Section eyebrow heading + content gap 24-32px. CTA pill internal padding ~12-16px vertical + ~24-36px horizontal. Floating hero cards have 24-32px internal padding + 16-24px gap between heading and description elements. Newsletter section has 80-120px vertical internal padding. Overall feeling is generous warm friendly editorial — never cramped, never clinical — the spacing of a well-designed magazine about purposeful work.",
  moodKeywords:
    "warm, friendly, editorial, nonprofit, charity, community, hopeful, compassionate, light, cream, forest-green, mint-green, sun-burst, donation, fundraising, transparency, social-impact, foundation, ngo, humanitarian, accessible, welcoming, professional-warm, modern-charity",
  animations:
    "Warm editorial motion — hero photo: very slow zoom (1.0 → 1.04 over 14s) for ambient life. Hero text staggered fade-up: 3 lines of MASSIVE heading slide-up sequentially (0.15s between, 0.6s ease-out, y-32px → 0), subtitle fades-in (0.8s delay), CTA fades-in (1s delay). Floating dual cards: TOP TRACKER CARD fades-in from right (0.6s ease-out + x+24px → 0, 0.3s delay), then PROGRESS BAR fills from 0% → 56% with ease-out (1s, 0.5s delay after card appears) + the dollar amount $245,800.50 count-up animation (0 → final over 1.5s); BOTTOM PROGRAM CARD fades-in from right (0.6s ease-out + x+24px → 0, 0.5s delay after tracker). Section headings + eyebrow labels: fade-up 0.5s ease-out on scroll-into-view (with green sun-burst icon doing a subtle 360° rotation animation 0.6s ease-in-out as it appears). Featured carousel arrows: hover → scale 1.0 → 1.1 + slight glow; click → smooth slide-translate of carousel cards (0.5s ease-out + edge-peek cards smoothly animate position). Cause card grid: stagger fade-up on scroll (0.1s between cards, 0.5s ease-out, y-32px → 0); hover → subtle lift (translateY -4px) + shadow increase + the green progress bar pulses brighter for 0.6s. PROGRESS BARS: each bar fills from 0% → final % with smooth ease-out animation (1s) on scroll-into-view; the $ amount above counts up (0 → final) simultaneously over the same duration. 4-tab pill click: smooth color crossfade between active/inactive tabs (0.3s ease-out) + the downward triangle pointer slides horizontally to the new active position (0.4s cubic-bezier(.22,1,.36,1)) + the content card crossfades to the new tab content (0.3s ease-out). News featured-card photo: subtle zoom on hover (1.0 → 1.03 over 0.4s ease-out). News thumbnail rows: stagger fade-up + hover → row bg lightens slightly + thumbnail zooms slightly. Testimonial layout: portrait photo fades-in from left (0.5s ease-out + x-24px → 0), centered quote fades-up (0.5s delay), supporting photo fades-in from right (0.7s delay). Pagination arrows: hover → bg darken + scale 1.0 → 1.05. Insight cards: stagger fade-up + hover → category pill brightens. Stay Connected leaf decoration: subtle gentle sway animation (1-2deg rotation, 4-6s duration, ease-in-out infinite) — almost imperceptible movement giving the leaves life. Subscribe input focus → border ring in coral at low opacity. Coral 'Take a Pledge' / 'Subscribe' CTAs: hover → slight scale 1.0 → 1.05 + slight darker coral. Dark forest-green CTAs: hover → slight scale + slight brighter green + arrow ↗ translate-x 4px right. Mint Login pill hover → slight scale + brighter mint. Footer social icons hover → cream brightens + scale 1.0 → 1.1. Sun-burst-rays icon hover (logo): rays do a subtle 0.4s rotation (15deg back-and-forth pulse). Overall motion is warm-deliberate-confident — never bouncy, never aggressive, never fast — the cadence of a thoughtful charitable foundation: fade-up, count-up, gentle pulse, smooth crossfade.",
  heroTreatment:
    "FULL-BLEED CINEMATIC WARM-FRIENDLY DIVERSE-FACES HERO with massive 3-line bold heading + dual floating donation/program cards. The hero photograph is a warm-friendly photograph of MULTIPLE SMILING DIVERSE YOUNG PEOPLE (community workers, volunteers, beneficiaries — wearing earthy/warm-toned clothing in cream/peach/beige, holding clothing donations or supplies, diverse ethnic/gender representation) standing close together in a warm-lit indoor setting (loft/community-center with natural cream + peach + brown tones, golden hour soft natural light from windows), running edge-to-edge with a SUBTLE SOFT-WHITE OVERLAY (~10-15% opacity to brighten/soften the photo without darkening it like a bar/club hero would — preserving the warm friendly photograph quality). The composition is THOUGHTFUL: the photograph's subject group is positioned in the LEFT 60-70% of the frame leaving the RIGHT 30-40% as a slightly less-busy zone for the floating cards. NAV (overlaid on hero photo at the very top): CareOn LOGO LEFT (small ~24-32px DEEP-FOREST-GREEN SUN-BURST-RAYS ICON — 8-12 short triangular rays radiating from a small center forming a stylized sun shape — + dark forest-green sans 'CareOn' wordmark beside it), CENTERED nav links 'Campaigns / About Us / Resources / How It Works' in 14-16px regular sans NEAR-BLACK or DARK-FOREST-GREEN, RIGHT a HORIZONTAL PAIR of 2 PILL CTAs: MINT LIGHT-GREEN PILL 'Login' (~80-100×36-40px, mint bg #B8DDA0, dark forest-green text, fully-rounded) + DARK FOREST-GREEN FILLED PILL 'Contact Us' (~120-140×36-40px, dark green bg, white text, fully-rounded). INSIDE the hero, content is LEFT-ALIGNED starting around 6-8% from the left edge and VERTICALLY CENTERED-LOWER (~50-60% down): MASSIVE 56-88px sans bold (700-900) WHITE 3-LINE LEFT-ALIGNED HEADING 'Every Act of / Charity Creates / Endless Impact' (3 separate lines, each containing 2-3 short words, tight tracking, sentence-case), BELOW it ~24-32px gap to a 14-16px regular sans WHITE 2-line subtitle 'Compassion opens doors to a better future, bringing hope and transformation to those in need.', BELOW it ~32-40px gap to a SINGLE FILLED DARK FOREST-GREEN PILL CTA 'Join the Mission ↗' (~140-160×52-56px, dark forest-green bg #1A2E1F, white sans medium text, fully-rounded with a small ↗ up-right arrow glyph after the text). FLOATING ON THE RIGHT 28-32% of the hero photo, vertically centered: TWO STACKED FLOATING WHITE CARDS — TOP CARD is a DONATION TRACKER (~360-420×140-180px, pure white #FFFFFF bg, rounded 16-20px corners, subtle box-shadow for floating-card depth, ~24-32px internal padding) containing: large '$245,800.50' bold near-black 28-36px heading-amount, BELOW it a HORIZONTAL PROGRESS BAR (mint-green #B8DDA0 progress fill on coral-pink #F4D5C0 track, ~6-8px tall, fully-rounded ends, ~50-60% filled), BELOW the bar a 2-COLUMN ROW: '512 Investors' bold near-black 14-16px LEFT + '56%' regular muted-gray 14-16px RIGHT-aligned; with ~24px vertical gap between the tracker and the program card. BOTTOM CARD is a PROGRAM CARD (~360-420×280-320px, pure white #FFFFFF bg, rounded 16-20px corners, subtle box-shadow, ~24-32px internal padding) containing: TOP a small MINT-GREEN PILL TAG '🌿 Education Support' (~120-140×24-28px, mint #B8DDA0 bg, dark forest-green text + tiny green sun-burst icon prefix), BELOW the tag a 22-28px sans bold near-black 2-line program-name heading 'Donation and / Charity Program', BELOW it a 14-16px regular muted-gray 2-line description 'Donation and Charity Program to Support Communities in Need', BELOW it ~16-20px gap to a CENTERED DARK FOREST-GREEN FILLED PILL 'Donate' (~140-160×44-48px, dark forest-green bg, white sans medium text, fully-rounded). The overall feeling is warm editorial friendly nonprofit — confident, welcoming, transparent, hopeful — the visual equivalent of being warmly invited into a community foundation that knows what it's doing and tells you the numbers honestly.",
};

const record = {
  name: "CareOn Warm Editorial Nonprofit",
  industries: [
    "nonprofit",
    "non-profit",
    "non profit",
    "charity",
    "charitable",
    "foundation",
    "foundation organization",
    "ngo",
    "humanitarian",
    "humanitarian organization",
    "social impact",
    "social good",
    "social cause",
    "fundraising",
    "fundraiser",
    "donation",
    "donations",
    "giving",
    "philanthropy",
    "philanthropic",
    "community organization",
    "community service",
    "community foundation",
    "religious organization",
    "church",
    "faith based organization",
    "mission organization",
    "missionary",
    "outreach organization",
    "advocacy",
    "advocacy group",
    "activism",
    "environmental nonprofit",
    "environmental cause",
    "humanitarian aid",
    "disaster relief",
    "disaster relief organization",
    "international aid",
    "global aid",
    "education nonprofit",
    "scholarship",
    "scholarship foundation",
    "youth nonprofit",
    "youth organization",
    "children charity",
    "children foundation",
    "orphanage",
    "homeless shelter",
    "food bank",
    "food pantry",
    "soup kitchen",
    "animal welfare",
    "animal shelter",
    "animal rescue",
    "wildlife conservation",
    "conservation organization",
    "health nonprofit",
    "medical charity",
    "research foundation",
    "medical research foundation",
    "cancer foundation",
    "veterans organization",
    "veterans foundation",
    "women empowerment",
    "women empowerment organization",
    "girls education",
    "literacy nonprofit",
    "human rights",
    "human rights organization",
    "civil rights organization",
    "social welfare",
    "welfare organization",
    "volunteer organization",
    "volunteering",
    "volunteer agency",
    "crowdfunding",
    "crowdfunding platform",
    "donor platform",
    "giving platform",
    "social enterprise",
  ],
  moods: [
    "warm",
    "friendly",
    "editorial",
    "nonprofit",
    "charity",
    "community",
    "hopeful",
    "compassionate",
    "light",
    "cream",
    "forest-green",
    "mint-green",
    "sun-burst",
    "donation",
    "fundraising",
    "transparency",
    "social-impact",
    "foundation",
    "ngo",
    "humanitarian",
    "accessible",
    "welcoming",
    "professional-warm",
    "modern-charity",
    "warm-editorial",
    "soft",
    "approachable",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting CareOn warm editorial nonprofit pattern into design_patterns...");

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
