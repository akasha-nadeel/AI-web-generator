// One-off uploader for the VELOCITY CLUB sports/fitness pattern.
// Sage-green + black + off-white athletic club design with floating glass
// panels over action photography hero, green-pill keyword highlights,
// inline sport icons in headlines, photo-bg pricing cards — first pattern
// for Gym / Fitness / Sports industry.
//
// Run with: node scripts/upload-velocity-pattern.mjs

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
  colorPalette: "#F5F3EE, #FFFFFF, #0A0A0A, #7DA077, #D4E0CC",
  colorMode: "light",
  accentUsage:
    "Sage-olive green #7DA077 is the SIGNATURE accent — used as (1) full-card background on pricing cards + featured training card + 'Experience' coaching card, (2) KEYWORD PILL highlights inside paragraphs (words like 'specialized', 'performance', 'Your Play,', 'Sports Facilities' wrapped in rounded green tags), (3) tinted photo card backgrounds on Welcome section ('Outdoor area' + 'Futal court' cards), (4) subtle wavy watermark pattern on pricing cards. Lighter sage-green #D4E0CC is used for the keyword pill highlights and some tinted backgrounds. Black #0A0A0A powers ALL CTAs — every primary action is a black pill with a white circle+arrow ↗ icon on its right edge. Off-white cream #F5F3EE is the page background. NO other accent colors — the design is sage + black + cream only.",
  typography:
    "Bold geometric sans-serif across the design (Plus Jakarta Sans / Manrope / Inter at 600-800). Hero headline 'Refresh, Relax, and Rediscover / Life's simple Pleasures' at 56-72px bold white. Section headings 'Discover Excellence in Courts, Fields, and Beyond' / 'We aim to empower athletes by instilling confidence' at 48-64px bold black. Pill labels small 11-13px medium. Body 14-16px regular. Pricing card headings 'N Season Package' are LARGE white (56-72px bold) on green. Small italic accent ('All in one-sports facilites center') appears once in the hero for a brand-voice nuance — otherwise no italics. No serif anywhere. Confident athletic voice at every scale.",
  layout:
    "FULL-BLEED hero photograph (athlete in action — cyclist / runner / tennis) with FLOATING WHITE PILL NAV at top split into 3 groups (About/Offer/facilites/Membership pills LEFT + centered BLACK PILL 'Velocity Club' logo + [search pill + black 'Book Now ↗' pill + menu circle] RIGHT) → hero LEFT panel floats: 3 avatar circles + short white paragraph + tiny italic tagline + black 'Join with us ↗' pill + bottom-left 2-line white hero headline + description; hero RIGHT floats: vertical stack of 3 individual pill social buttons (instagram / Twitter / Facebook) + FROSTED GLASS 'Refer a friends' card with white 'Share link' pill + avatar cluster + bottom-right white 'Download Our App' card with Apple/Android circles → Welcome section 3-col: [pill label 'Sports center' + bold heading 'Welcome to Velocity Club...' + black 'Get in touch ↗' pill] | green-tinted rounded photo card with 'Outdoor area' pill + overlay caption + black ↗ circle | green-tinted card with 'indoor' pill + 'Futal court' overlay + description below + 2 circle nav arrows (outlined + filled black) → thin horizontal rule divider → Discover section split: LEFT [black flower logo circle + tab pills 'Competition / Training(active black) / Friendly match' + green tinted photo card 'We provide premium courts' with black 'Book a Court ↗' pill + 2 circle arrows + '1/5' pagination]; RIGHT [bold heading 'Discover Excellence in Courts, Fields, and Beyond' + small photo card with black '+' overlay + asterisk * icon + description paragraph] → Facilities section: [pill 'Facilities' + heading 'Explore Our Facilities' + search pill + black 'View All ↗' pill] + 4-col facility card row (each: full-bleed sport photo, pill category label top-left, overlay caption bottom-left) + 2 circle arrows left + description right → Empower section: bold heading 'We aim to empower athletes...' + horizontal scroll row of MIXED cards (large green 'Experience' photo card with avatar cluster + black '↗' circle + 3-avatar+count badge + flower logo, white progress-ring card '08hr / 15min Comprehensive Solutions' with black '+' overlay, green 'Attention to Details' photo card with hand icon, each card has a black '+' circle button) + below: paragraph with green-pill keyword highlights ('Providing [specialized] training to help athletes reach peak [performance] and transform their potential') → Pricing: [$ icon black circle + 'Pricing' pill] + centered heading 'Find the Perfect Plan for Your Athletic [bicycle-icon] Journey' (inline sport icon mid-heading) + 'See More Options' + black '>>' chevron circle button + 2 large pricing cards side-by-side (photo-bg green with wavy watermark, 'Best Seller' pill top-left, 'Recommended by US Coaches' pill + 2 avatars top-right, big white 'N Season Package' + 'Individualized Training', BIG BLACK PILL '$50 /Session', '1 Year Expiry' pill bottom-left, '$N / Total Cost' + white ↗ circle bottom-right) → Team: [person-icon black circle + 'Team' pill + centered 'Meet the dedicated team' heading + 'Read More ↗'] + 5-card team row with BLACK COMMUNITY CTA card embedded in middle (breaks the photo grid: 'Join our community of athletes. hello-community.com ↗'), each photo card has name+role overlay bottom + email/chat icon pair top-right → Footer: [flower logo + 'Velocity Club' + tagline with green-pill keyword highlights] LEFT + 4 columns (Facilites list / About / Social in outlined pills / Join us form with email+name+training type dropdown+'START MOVING >>' pill) + thin legal row.",
  signaturePatterns: [
    "Floating white pill NAV split into 3 sections — LEFT has nav items as pills (About Us / Offer / facilites / Membership), CENTER is a separate BLACK pill with flower logo + 'Velocity Club', RIGHT has a utility cluster (search pill + black 'Book Now ↗' pill + menu circle). Three independent pill groups instead of one unified bar",
    "BLACK PILL CTAs with TRAILING WHITE CIRCLE+ARROW ICON — every primary action is a dark pill with a white circle containing a ↗ arrow anchored on its right edge. Used 20+ times across the page",
    "GREEN PILL KEYWORD HIGHLIGHTS — critical words inside paragraphs are wrapped in sage-green rounded pills ('specialized', 'performance', 'Your Play,', 'Sports Facilities') instead of bold/italic/colored text",
    "Frosted glass translucent floating panels over hero photo — 'Refer a friends' card, app-download card, and avatar+description panels all float with backdrop-blur over the full-bleed action photograph",
    "Vertical stack of INDIVIDUAL PILL social buttons on hero right side — instagram, Twitter, Facebook each as standalone rounded white pills stacked vertically (not unified in a bar)",
    "Pill-label + section-heading opener — every section starts with a tiny pill label (often with a small black circle icon beside it) above the bold heading: '$ Pricing', '👤 Team', 'Facilities', 'Sports center'",
    "Image cards with PILL category label top + TEXT OVERLAY bottom — consistent card pattern across Welcome, Facilities, Empower, Team sections — rounded photo with a small category pill anchored top-left and a headline text overlay bottom-left (white on photo)",
    "Circle navigation arrows as pairs — every carousel uses TWO small circle buttons (one outlined, one filled black with white arrow) placed together, always the same size and spacing",
    "Avatar cluster with + count badge — 3-4 overlapping avatar circles plus a '+N' circle, used on hero panel, 'Experience' coaching card, 'Recommended by US Coaches' pricing card, and 'Refer a friends' glass panel",
    "Inline sport icons within headlines — bicycle icon mid-sentence in pricing heading 'Find the Perfect Plan for Your Athletic [bike-icon] Journey', asterisk icon as paragraph opener, flower logo in circle as decorative anchors",
    "Tab pill bar — outlined rounded pills with one active state filled black ('Competition / Training / Friendly match')",
    "Horizontal mixed-height mixed-type scroll row — Empower section mixes large green photo cards + white stat cards + green themed cards in one horizontal scroll, asymmetric but visually rhythmic",
    "Circular progress-ring stat card — white card with an arc/donut chart showing '08hr / 15min' and 'Comprehensive Solutions' label, sitting inside a horizontal scroll row of photo cards",
    "Photo-background pricing cards with sage wave watermark — 2 big pricing cards use athletic photography as their background tinted green with a subtle wavy 'V' watermark, giant white 'N Season Package' heading + big black pill price + corner badges (Best Seller, Recommended, 1 Year Expiry)",
    "Black community CTA card embedded in team row — team section shows 5 cards side by side but the middle card is a black pill-friendly card 'Join our community of athletes' + white URL pill, breaking the grid of coach portraits",
    "Footer with pill-shaped inputs and outlined-pill social buttons — Join Us form has rounded pill inputs (email / name / training type dropdown) and a 'START MOVING >>' black pill CTA; social section uses outlined rounded pills for each platform name instead of icons",
  ],
  uniqueTechniques: [
    "Split 3-group floating nav — breaking the nav pill into three independent pills (left items / center logo / right utilities) creates a club-lobby feel and gives the centered black logo pill weight as a brand mark without needing its own row",
    "Green-pill keyword highlighting inside flowing text — wrapping single words like 'specialized' and 'performance' in sage-green rounded pills embedded mid-paragraph turns prose into a rhythmic visual beat; instantly athletic and playful without color-shouting",
    "Inline sport-icon as typographic punctuation — a bicycle/flower/asterisk icon drops INTO a headline between words (not before/after) creating an unexpected visual pause that makes the design feel crafted and sport-specific",
    "Photo-bg pricing cards with wavy V watermark — pricing becomes visual instead of a spec table; the card IS an athletic photograph tinted green with a subtle watermark, pushing the price into a big black pill that contrasts hard against the soft background",
    "Black community CTA inside team row — inserting a black promotional card in the MIDDLE of a row of coach portraits breaks grid expectations and subtly reframes the team section as 'join us' instead of just 'look at who we have'",
    "Progress-ring stat card mixed into photo scroll — one white data card with a circular time-progress ring sits between green athletic photo cards in the Empower row, making stats feel like training data rather than a separate metrics section",
    "Frosted glass panels floating over action photography — instead of laying UI onto a dark overlay, the hero content floats in backdrop-blurred white glass panels (refer-a-friend card, app card) while the photo shows through underneath, creating a layered depth that feels like a sport dashboard",
  ],
  spacing:
    "Athletic energetic spacing — sections separated by 96-128px, hero panels float with 24-48px margin from viewport edges, card internal padding 20-32px, horizontal scroll gaps 16-24px. Pricing cards are large and breathy with 48-64px internal padding. Footer has generous column gaps 48-64px. Overall feeling is confident and active but not cramped — spacious like a good training facility.",
  moodKeywords: "athletic, vibrant, confident, modern, energetic, community, premium, active, sport, club, fresh, clean",
  animations:
    "Hero photo: slow ken-burns zoom 1.0→1.05 over 20s. Hero floating panels: staggered fade-in-up on load (0.1s delay between each, 0.6s duration). Black-pill CTAs: hover → circle arrow rotates 45° + pill subtle scale 1.05. Green pill keyword highlights: subtle fade-in as paragraph enters viewport (stagger across words). Facility cards: hover → 1.02 scale + overlay darkens slightly + arrow in corner slides up-right. Progress ring card: stroke-dasharray animation 0→full on scroll into view. Pricing cards: hover → subtle tilt (perspective) + shadow lift. Tab pills: smooth black background transition on tab change. Carousel circle arrows: hover → scale 1.1 + subtle shadow. Team cards: hover → email/chat icons slide in from right, name overlay shifts slightly. Footer 'START MOVING' button: continuous subtle pulse to keep it active.",
  heroTreatment:
    "FULL-BLEED action photograph (athlete in motion — a cyclist against bright blue sky / a runner / a tennis player) occupying 100vw × 100vh. At TOP with 24-32px margin from edges, a FLOATING NAV split into 3 independent white pill groups: LEFT pill cluster contains menu items as mini-pills ('About Us / Offer / facilites / Membership'), CENTER has a SEPARATE BLACK PILL containing a small flower logo icon + 'Velocity Club' wordmark, RIGHT has a utility pill cluster (white pill search input with magnifying icon + BLACK 'Book Now ↗' pill + white circle hamburger menu). On the LEFT side of the hero content area (~25% width), floating glass panels: 3 overlapping avatar circles (team members), a short 3-4 line white description paragraph, a tiny italic tagline 'All in one-sports facilites center', and a black 'Join with us ↗' pill CTA. At the BOTTOM-LEFT: a LARGE white bold sans-serif 2-line headline (e.g. 'Refresh, Relax, and Rediscover / Life's simple Pleasures') at 56-72px + 2-line description beneath. On the RIGHT side: vertical stack of 3 INDIVIDUAL white pill buttons (instagram / Twitter / Facebook) floating near the top, then a FROSTED GLASS translucent card 'Refer a friends / Share your referral link with friends' containing a white 'Share link' pill + avatar cluster, and at the BOTTOM-RIGHT a white rounded card 'Download Our App' with a small (+) icon between words and Apple + Android circle buttons. Everything floats over the photograph with backdrop-blur and subtle shadow — no solid color overlay on the photo itself.",
};

const record = {
  name: "Velocity Club Sports Athletic",
  industries: [
    "gym",
    "fitness",
    "sports",
    "athletic club",
    "sports center",
    "sports facility",
    "training center",
    "tennis club",
    "golf club",
    "personal training",
    "coaching",
    "athletic training",
    "fitness club",
    "sports academy",
    "yoga studio",
    "crossfit",
  ],
  moods: [
    "athletic",
    "vibrant",
    "confident",
    "modern",
    "energetic",
    "community",
    "premium",
    "active",
    "sport",
    "club",
    "fresh",
    "clean",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Velocity Club sports pattern into design_patterns...");

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
