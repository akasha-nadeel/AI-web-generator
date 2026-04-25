// One-off uploader for the TOTAAL BEAUTY skincare e-commerce pattern.
// Classic beauty/skincare online-store design with multi-row nav,
// featured categories, trust bar, bestselling products, before/after
// slider, popular brands, promo banner, testimonials, and newsletter —
// first pattern for Beauty / Spa / Skincare industry.
//
// Run with: node scripts/upload-totaalbeauty-pattern.mjs

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
  colorPalette: "#FFFFFF, #F5EFE4, #1B2838, #2D5F3F, #F5C144",
  colorMode: "light",
  accentUsage:
    "Dark navy #1B2838 is the SIGNATURE brand color — used for (1) the top utility info strip, (2) every CTA pill ('EXPERIENCE BENEFITS', 'SHOP NOW', 'VIEW ALL', 'SUBSCRIBE', 'ABOUT US'), (3) the 'NEW' rectangular badge top-left of product cards, (4) the horizontal trust bar between sections, (5) date badges on blog cards, (6) subscribe-form button. Secondary dark forest green #2D5F3F appears rarely but deliberately — only on the '+' symbols in stat counters ('10+ Years / 1000+ Happy Clients / 15+ Services') and the 'SHOP NOW' CTA on the Gluta-C pink promo banner. Yellow #F5C144 is used ONLY for star ratings (testimonials + rating badge overlay on hero photos). Cream/beige #F5EFE4 is the ambient rest color for Information and Testimonial sections. White is the main page background. No other chromatic accents.",
  typography:
    "TWO contrasting typefaces by role: (1) a SCRIPT/ITALIC handwritten wordmark for the 'Totaal Beauty' brand logo (paired with a small yellow lemon fruit icon) — used once in nav and once in footer, giving warmth and personal-brand feel; (2) a clean modern SANS-SERIF for ALL other type — ALL-CAPS letter-spaced section headings ('FEATURED CATEGORIES', 'BESTSELLING', 'INFORMATION', 'BEFORE & AFTER', 'POPULAR BRANDS', 'WHAT CLIENTS ARE SAYING', 'IN THE BLOGS') at 28-40px medium-bold, hero headline 'Experience The Glow With Totaal Beauty' at 48-64px medium-bold (NOT all caps, sentence-case for the hero only), body 14-16px regular, nav links 12-14px uppercase letter-spaced. No serif anywhere. The script logo is the one-and-only typographic warmth moment.",
  layout:
    "TWO-ROW NAV: (row 1) dark navy utility info strip with small white text: 'Distributor region | Free delivery from €N | Tel. XXX | Chat hours' — beauty/retail trust messaging from first pixel; (row 2) white nav bar with language switch 'ENGLISH (EN) ▼' far LEFT, centered SCRIPT 'Totaal Beauty' wordmark + small yellow lemon icon with primary nav links below (HOME / INFORMATION / ANTI-PIGMENT▼ / SOAPS▼ / CARE▼ / ADVANTAGE PACKAGE / NEW / BLOGS / TO NOTICE / ABOUT US), search+heart+user+cart icon cluster far RIGHT → HERO: full-width photograph of beauty/spa scene (facial treatment / skincare) + LEFT overlay: small letter-spaced 'BRAND NL' label + 2-line medium-bold sans headline 'Experience The Glow With Totaal Beauty' + 2-line description + 2-button row (navy 'EXPERIENCE BENEFITS' + outlined white 'SHOP NOW') + small white pagination dots bottom-center → About section: letter-spaced ALL-CAPS 'ABOUT BRAND' heading + 2-col (LEFT long paragraph + 3 stat row '10+ Years / 1000+ Happy Clients / 15+ Services' where ONLY the + symbols are dark green + navy 'ABOUT US' pill; RIGHT beauty model photo with yellow-star '5.0 Rating' badge overlay top-right) → Featured Categories: centered letter-spaced 'FEATURED CATEGORIES' heading + 4-col photo card grid (Facial Care / Body Care / Oral Care / Hair Care) with white text overlay on each photo → DARK NAVY TRUST BAR: horizontal navy band with 4 white icon+label items (CLEAN SKINCARE / EUROPEAN DELIVERY / SUSTAINABILITY / AUTHORIZED RETAILER) + short gray description under each → Bestselling: 'BESTSELLING' heading + 3-col product cards on light-gray backgrounds with 'NEW' navy rectangular pill top-left + centered product image + product name + euro price; outlined square nav arrows on sides; navy 'VIEW ALL' pill below → Information: cream-bg section, 'INFORMATION' heading + 2-col (LEFT accordion items 'Kojic Acid Soap / Redone Wax / Gummy Wax / Crest 3D Whitening Strips' with ▼ chevrons and thin gray separators, first one open with description; RIGHT product photo) → 'BEFORE & AFTER' heading + split-image slider comparison with vertical draggable circle handle showing before/after face closeup → 'POPULAR BRANDS' heading + 5-col brand logo row + 2-col category image tiles ('ANTI-PIGMENT' + 'SOAPS') → Pink-peach gradient PROMO BANNER with (LEFT white card 'LIMITED OFFER' small label + product name heading + dark green 'SHOP NOW' pill; RIGHT model photo cutout on pink gradient; BOTTOM product arrangement on yellow/orange band) → 'WHAT CLIENTS ARE SAYING' heading + 3-col testimonial cards on cream background (yellow stars + quote + avatar + name) → 'IN THE BLOGS' heading + 3-col blog cards with photo + navy date pill top-left of image + title below + navy 'VIEW ALL' pill → NEWSLETTER panel: teal/blue panel with LEFT white card 'SUBSCRIBE TO OUR NEWSLETTER' + description + email input + navy 'SUBSCRIBE' pill; RIGHT beauty model photo → Footer: LEFT logo + company description + 3 small dark-square social icons (facebook/instagram/youtube); 3 columns (CATEGORIES / MY ACCOUNT / INFORMATION) with text links; bottom bar has language switch + copyright + Trustpilot badge + VISA/MasterCard/PayPal logos.",
  signaturePatterns: [
    "Two-row nav with utility info strip on top — dark navy horizontal strip containing distributor region + delivery threshold + phone + chat hours in small white text above the main white nav bar, establishing retail/trust context from the very first pixel",
    "Script/italic brand logo with fruit icon — the 'Totaal Beauty' wordmark is hand-written script style paired with a small yellow lemon icon, used as the only typographic warmth moment on a page that is otherwise modern sans-serif",
    "Letter-spaced ALL-CAPS sans section headings — every section title ('FEATURED CATEGORIES', 'BESTSELLING', 'INFORMATION', 'BEFORE & AFTER', 'POPULAR BRANDS', 'WHAT CLIENTS ARE SAYING', 'IN THE BLOGS') is a single-line letter-spaced medium-bold uppercase heading centered at the top of the section",
    "Dark navy rectangular 'NEW' badge top-left of product cards — consistent e-commerce marker used on all product tiles in the Bestselling row",
    "Dark navy horizontal TRUST BAR — dedicated full-width navy band between sections with 4 white-icon+label items in a single row (CLEAN SKINCARE / EUROPEAN DELIVERY / SUSTAINABILITY / AUTHORIZED RETAILER) plus a short gray description under each — premium beauty authentication signal",
    "Photo category tiles with white text overlay — 4-column grid where each tile IS a large photograph with just the category name ('FACIAL CARE' / 'BODY CARE' / 'ORAL CARE' / 'HAIR CARE') overlaid in white sans-serif, no card padding or description",
    "Product cards on light gray surface — product images float on a soft #F0F0F0 gray background panel rather than pure white, giving the product photography more dimension",
    "Yellow-star rating badge overlay — small white rounded card with 5 yellow stars + '5.0 Rating' anchored to a corner of the About model photo, standard e-commerce social proof",
    "Before/After vertical-drag slider — interactive split-image slider with a vertical divider line and a draggable circle handle (⋮⋮) revealing beauty treatment results — industry-specific interaction",
    "Stats with colored-only-plus-signs — '10+ Years Experience / 1000+ Happy Clients / 15+ Services' where ONLY the '+' symbols are dark forest green while the numbers and labels remain default; subtle brand-color punctuation technique",
    "5-column popular brands logo row — diverse brand logos (Belo Essentials / Crest / FeMas / Gluta-C / kojie-san) at equal size in a horizontal row, a retail-authority signal",
    "Pink-peach gradient promo banner with model cutout — full-width banner with a pink-to-peach gradient background, a white card on the left containing offer label + heading + green CTA pill, and a model photograph cut out against the gradient on the right, with a product arrangement on a yellow/orange bottom band — magazine-ad style execution",
    "Dark cream testimonial cards on beige background — Information and Testimonial sections use a cream/beige #F5EFE4 background with slightly darker cream cards, yellow stars above quotes, small round avatar + name below",
    "Blog cards with navy date-pill badge — each blog tile has a small navy rounded date badge anchored top-left of its featured image plus a clean title below",
    "Newsletter in white card floating on teal/blue panel + photo — instead of a plain form, the signup is a white rectangular card overlapping the left side of a teal panel with a beauty model photo filling the right half",
    "Traditional e-commerce footer with payment + Trustpilot row — logo + description + social squares LEFT + 3 column link lists + bottom legal bar with language switch + Trustpilot badge + VISA/MasterCard/PayPal logos",
  ],
  uniqueTechniques: [
    "Two-row nav with trust-first info strip — starting every page load with a small dark navy utility strip containing distributor/delivery/phone/chat information before any branding means the user's 'can I trust this shop?' questions are answered before they see the logo; quintessential European beauty-retail pattern",
    "Script logo + all-caps sans pairing — using a hand-written italic wordmark ONCE for the brand name while everything else is letter-spaced sans ALL-CAPS creates a single warmth anchor that carries the brand personality without infecting the rest of the type system (which stays clean and commerce-friendly)",
    "Before/After split-slider interactive — a draggable-handle split image showing facial transformation is a beauty-industry-native interaction that turns passive product browsing into engaged proof-consumption; rare outside skincare",
    "Dark navy trust bar between product sections — a dedicated horizontal navy band between Categories and Bestselling listing the 4 brand promises (clean / delivery / sustainability / authorized) with icons; this pattern frontloads the 'why buy from us' answer into the main scroll path instead of hiding it in footer or about",
    "Green-only-plus-signs in stats — painting only the '+' symbols in '10+ / 1000+ / 15+' a distinct color while keeping numbers + labels default is a micro typographic technique that adds a color punch without chromatic noise",
    "Magazine-ad promo banner with photo cutout + product row — full-width pink-peach gradient banner carrying a model photograph (no compositing frame), a white offer card, and a product arrangement on a yellow bottom band, all as one banner — treating the promo as a glossy magazine page rather than a web callout",
    "White newsletter card floating on teal panel with adjacent model photo — the subscribe form is not centered on a plain background; it is a white card overlapping a teal section that ALSO contains a beauty model photo on its right half, creating a magazine-editorial closing spread instead of a plain footer form",
  ],
  spacing:
    "Spacious e-commerce rhythm — sections separated by 64-96px, product grid gap 16-24px, card padding 16-24px, hero is full viewport height. Cream/beige sections (Information + Testimonials) create visual rest between white commerce sections. The design is shoppable and clean — not editorial, not minimal, but confident commerce with breathing room. Footer is densely packed but organized in clear 4 columns.",
  moodKeywords: "clean, professional, trustworthy, e-commerce, beauty, skincare, wellness, approachable, european, friendly, premium-retail, warm",
  animations:
    "Hero: ken-burns slow zoom on photograph + text fade-in-up on load (0.6s ease). Hero slider: auto-advance with 5s interval + fade transition between slides. Category photo tiles: hover → image scale 1.05 + dark overlay deepens + text overlay subtle lift. Product cards: hover → shadow lift + image slight zoom + possible quick-view icon slide-in. Trust bar: icons pulse on scroll-into-view. Before/after slider: smooth drag with CSS clip-path transition, handle cursor changes to ⋮⋮. Promo banner: product arrangement subtle parallax. Testimonial cards: carousel-style horizontal scroll on mobile. Newsletter button: hover scale 1.05 + subtle color shift. Nav search icon: expands to full search bar on click with 0.3s slide. Overall animation is polite commerce — no flash, everything serves shopping UX.",
  heroTreatment:
    "FULL-WIDTH hero PHOTOGRAPH (beauty/spa scene — woman receiving facial treatment, soft earth-tone lighting, subtle flower accent) filling the hero viewport below the nav. TOP: a DARK NAVY #1B2838 utility info strip (~32-40px tall) with small white text showing distributor region + delivery threshold + phone + chat hours; below it a WHITE nav bar with 'ENGLISH (EN) ▼' language switcher far LEFT, a CENTERED SCRIPT 'Totaal Beauty' wordmark paired with a tiny yellow lemon fruit icon, a row of primary nav links just below the logo (HOME / INFORMATION / ANTI-PIGMENT▼ / SOAPS▼ / CARE▼ / ADVANTAGE PACKAGE / NEW / BLOGS / TO NOTICE / ABOUT US) in letter-spaced medium sans, and a cluster of 4 utility icons (search / heart / user / cart) far RIGHT. OVERLAID on the LEFT side of the photograph: a small letter-spaced all-caps label 'BRAND NL' in white (12-14px), then a MEDIUM-BOLD modern sans-serif 2-line headline in white 'Experience The Glow With Totaal Beauty' at 48-64px (sentence case, not all caps — the hero is the ONLY place sentence-case is used on this design), a 2-line white description paragraph below, and a 2-button row: a DARK NAVY PILL 'EXPERIENCE BENEFITS' with white uppercase text + an OUTLINED WHITE/TRANSPARENT PILL 'SHOP NOW'. SMALL white pagination dots at the bottom-center of the hero indicate that it is a slider. The overall impression is clean, professional, European-beauty-retail — warm photography with trustworthy typography.",
};

const record = {
  name: "Totaal Beauty Skincare E-commerce",
  industries: [
    "beauty",
    "skincare",
    "spa",
    "cosmetics",
    "beauty store",
    "skincare shop",
    "beauty e-commerce",
    "personal care",
    "wellness",
    "anti-aging",
    "facial care",
    "body care",
    "hair care",
    "beauty products",
    "dermatology products",
  ],
  moods: [
    "clean",
    "professional",
    "trustworthy",
    "e-commerce",
    "beauty",
    "skincare",
    "wellness",
    "approachable",
    "european",
    "friendly",
    "premium-retail",
    "warm",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Totaal Beauty skincare pattern into design_patterns...");

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
