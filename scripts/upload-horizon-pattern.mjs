// One-off uploader for the HORIZON ESTATE real estate pattern.
// Editorial-calm cream-and-black premium real estate with regular-weight
// giant headlines, micro bar charts on stats, branded agent badges,
// and full-featured search card — second pattern for Real Estate / Property,
// complementing Nestora's bright sky-blue friendly aesthetic.
//
// Run with: node scripts/upload-horizon-pattern.mjs

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
  colorPalette: "#F4F3EE, #FFFFFF, #0E0E0E, #9A9A9A, #00B67A",
  colorMode: "light",
  accentUsage:
    "The design is effectively MONOCHROME — cream background #F4F3EE, white cards #FFFFFF, near-black #0E0E0E for text + CTAs, muted gray #9A9A9A for secondary copy and icon labels. The ONLY color accent is teal-green #00B67A used in exactly TWO places: (1) a small 'New' rounded pill inline beside the 'Mortgage' nav item, (2) the Trustpilot star + rating badge in the pre-footer. All CTAs are BLACK rectangular pills (slightly rounded corners, not full-radius) with white text — never colored. The restraint is the signature — color is a wayfinder, not decoration.",
  typography:
    "ONE modern sans-serif family across the entire site (Satoshi / Inter / General Sans style at 400-500 medium weight). The signature technique: MASSIVE headlines are rendered in REGULAR/MEDIUM weight (400-500), NOT bold — 64-96px 'Find a place you will call home' / 'We help you find the home that will be yours' sit calm and magazine-like instead of aggressive. Body and muted paragraphs at 13-14px regular gray. Meta labels and stat-card titles at 11-13px. Stat numbers ('19%', '$820,000') are large (32-44px) but still regular weight. The two-line stacked uppercase 'HORIZON / ESTATE' logo is 10-12px letter-spaced sans. No italic, no serif anywhere — the voice is understated and editorial.",
  layout:
    "Thin horizontal NAV (stacked uppercase 'HORIZON/ESTATE' logo left, centered dropdown links Properties▼/Mortgage[NEW]/Company▼/Careers▼/Blog, outlined rounded '↓ Post a property' pill right) → HERO: 2-column split (big 2-line regular-weight headline 'Find a place you will call home' left 60% + small muted paragraph right 40%) + small black 'Book a call' pill, then FULL-BLEED edge-to-edge modern architectural home photograph occupying bottom half (dark contemporary villa with glass + wood + landscape + car, no overlay text) → Search section: 2-col heading/paragraph, WHITE CARD with tab bar (Buy active / Rent / New developments / Commercial properties) + 4 dropdown filters (All countries / New property / $280k-$500k / All sizes m²) + '+ More options' left + 'Clear filters' + black 'Show properties' pill right → 'New properties' heading + 3×2 property grid (rounded-top image + title with price right-aligned + gray location line + 4-icon spec row: m²/floors/beds/baths) → 'See what we offer and how it works' split: LEFT narrow white card with 'Property selection' heading + description + outlined 'Get consultation' pill + step-list below (muted steps + one active bold-black: Request & requirements / Property selection / Legal support / Key transfer); RIGHT large architectural photo with SMALL WHITE FLOORPLAN CARD overlaid bottom-right corner showing blueprint → 'Expert agents' heading + arrow pair + 4-card row (portrait photo with 'HORIZON ESTATE' text watermark top-left corner + name + role + rating '5.0 / 120 reviews' + black phone pill + small outlined '@' email icon) → 'Reliable facilities for stable investments' heading + 2 paragraphs right + 3 STAT CARDS in row (each: small gray label + large number + MINI GRAYSCALE BAR CHART beneath with horizontal line markers on top of bars: '19% Total return' / '$820,000 Cumulative net cashflow' / '14% Average IRR') → 'Offers for investment' heading + VERTICAL LIST of horizontal investment cards (3-col: image left / title+location+spec+description+[black 'Book now' + outlined 'Download brochure ↓'] middle / price stack right with 3 numbers stacked 'Invest $X / IRR % / Return $Y') → WHITE ROUNDED CARD: 'Smart selection of premium real estate' heading + 2-line description + [black 'Explore properties' pill + outlined 'Get consultation' pill], with a small SOFT-EDGED rounded photo of a happy couple inset on the right INSIDE the same card → 2-col trust line: 'We help you discover and own the world's finest real estate' heading left + TRUSTPILOT GREEN-STAR badge with '★★★★★ 1,280 reviews' right → Footer: 4-column grid (stacked HORIZON ESTATE logo / sales@ + phone / socials Instagram/Facebook/X.com/LinkedIn / copyright + privacy link).",
  signaturePatterns: [
    "Two-line stacked uppercase wordmark logo — 'HORIZON / ESTATE' in small 10-12px letter-spaced sans, used in nav AND footer AND as watermark on agent photos",
    "REGULAR-WEIGHT giant headlines — 64-96px sans-serif at 400-500 weight (not bold), every section opens with a calm magazine-scale headline instead of a bold title",
    "2-column section opener — large headline left 60% + small muted 2-3 line gray paragraph right 40%, pattern repeated across every major section",
    "White-card search widget with tab bar + dropdown filters — Buy/Rent/New developments/Commercial tabs on top, 4 dropdown selects row, '+ More options' + 'Clear filters' + black 'Show properties' pill footer — a clean embedded MLS-style search",
    "Standardized 4-icon property spec row — every property card uses the SAME meta line: '⤢ Nm² | N floor | N beds | N baths' with unified thin line icons, creating a consistent scannable data layer",
    "Image-top property card with right-aligned price — title on the left and price on the right of the SAME row below the image, gray location line beneath, then spec row",
    "Floorplan thumbnail card overlaid on property photo — small white card with architectural blueprint positioned bottom-right corner of the main 'how it works' photo, signaling architectural depth",
    "Muted-to-active step list — vertical list of process steps where all are muted gray except the currently-active step which is bold black, giving a clear 'you are here' cue",
    "HORIZON ESTATE text watermark on agent photos — each agent portrait has a tiny stacked 'HORIZON ESTATE' label in the top-left corner of the photo, framing agents as institutional reps not freelancers",
    "Phone pill + '@' icon CTA pair — agents use a black rounded pill with phone number + a separate small outlined square with '@' email icon beside it",
    "Stat card with mini grayscale bar chart — each KPI card has a small label top, big number middle, and a tiny 10-bar grayscale chart WITH horizontal line markers on top of the bars underneath (understated data viz)",
    "Horizontal investment offer card — 3-column layout: square image left / title + location + spec + 2-line description + [black 'Book now' + outlined 'Download brochure ↓'] middle / price stack right ($X Invest, Y% IRR, $Z Return with tiny gray labels)",
    "Photo inset inside CTA card — final 'Smart selection' card has a small soft-edged rounded photo panel on its right side INSIDE the card (not side-by-side outside), creating a tight editorial composition",
    "Small teal 'New' pill inline with nav item — the Mortgage link has a compact rounded green-teal badge right after the word, the only chromatic accent in the entire nav",
    "Trustpilot green-star badge as trust line — green 4-point star + 'Trustpilot' wordmark + 5 green stars + review count presented as the social proof moment before footer",
  ],
  uniqueTechniques: [
    "Regular-weight massive headlines — 64-96px headlines rendered at 400-500 weight instead of the usual 700-800 creates a calm, expensive, editorial voice that reads as 'premium investment-grade' rather than 'aggressive real estate hype'; the most recognizable signature of the whole design",
    "Mini bar charts under stat numbers — tiny 10-bar grayscale columns with thin horizontal line markers capping each bar, sitting UNDER the '19%' / '$820,000' stat headlines, makes investment stats feel data-driven without becoming a dashboard",
    "Floorplan thumbnail overlay on property photo — a small white card containing a blueprint line-drawing positioned bottom-right of the large architectural photo, quietly signals that this platform is for buyers who care about layouts, not just facades",
    "Agent photo institutional watermark — every agent portrait has a tiny stacked 'HORIZON ESTATE' label in the top-left, unifying the agent roster as employees of a brand rather than independent contractors, which changes perceived trust",
    "Photo-inside-CTA-card composition — the final 'Smart selection of premium real estate' pitch is a single white rounded card that contains heading + buttons on the left AND a small soft-masked rounded photo of happy buyers on the right, INSIDE the same card, creating one tight editorial moment instead of two adjacent blocks",
    "Cream not white — the entire page background is warm off-white #F4F3EE rather than pure white, which makes the white cards feel lifted and gives the page an understated paper-like quality without resorting to gray",
    "Standardized spec row as invisible grid — the '⤢ Nm² | N floor | N beds | N baths' line appears on EVERY property card (grid cards, investment cards) with identical icons and order, creating a consistent data layer that buyers learn to scan without re-reading labels",
  ],
  spacing:
    "Editorial restrained premium spacing — sections separated by 96-128px, two-column openers have 48-64px gap between headline and paragraph, cards have 20-28px internal padding. Property grid gap 24-32px. Hero headline has 16-24px line-height (tight for the scale). The cream background + white cards create natural breathing rhythm. Overall feeling: calm, confident, magazine-like, investment-grade, no cramping anywhere.",
  moodKeywords: "editorial, minimal, premium, calm, confident, magazine, sophisticated, understated, investment-grade, european, professional, monochrome",
  animations:
    "Hero headline: fade + subtle up-shift on load (0.6s ease-out). Property cards: hover → shadow lift + 1.01 scale, image slight zoom inside card frame. Filter dropdowns: expand with 0.2s ease + chevron rotate. Tab bar: underline slide transition on tab click. Agent carousel: horizontal arrow navigation with 0.4s transition + subtle scale 1.02 on hover. Stat cards: on scroll-into-view, bar-chart bars stagger-grow from 0 height (0.05s delay between each). Investment cards: hover → border color darken + CTA fill. Final CTA pills: standard hover scale 1.02. Trustpilot badge: static. Overall animation mood is restrained and editorial — no flash, everything feels considered.",
  heroTreatment:
    "Cream (#F4F3EE) full-width viewport hero. TOP: thin horizontal NAV — stacked uppercase small 'HORIZON / ESTATE' two-line wordmark logo on the LEFT, centered nav items with dropdown chevrons (Properties ▼ / Mortgage with small teal 'New' pill beside it / Company ▼ / Careers ▼ / Blog), outlined rounded '↓ Post a property' pill on the RIGHT. BELOW NAV, a 2-column layout: LEFT 60% width contains a MASSIVE 2-line headline 'Find a place you will call home' in 64-96px regular-weight (400-500, NOT bold) black sans-serif with tight line-height; below it, a small black rectangular 'Book a call' pill (13-14px, ~100px wide) — no icon. RIGHT 40% width contains a small muted-gray paragraph (13-14px, 3 lines) with brand positioning text (e.g. 'With us you will find not just accommodation, but a place where your new life begins, full of cosiness and possibilities.') top-aligned to the headline. BELOW everything, a FULL-BLEED edge-to-edge (100vw) modern architectural photograph filling the bottom half of the hero — a sleek contemporary home with glass walls, cantilevered decks, wood accents, landscaped grounds, possibly a car in the driveway. NO TEXT OVERLAY on the photograph — it stands alone as visual evidence. No scroll indicator. The impression is calm, editorial, expensive, and confident — the opposite of bright friendly real estate.",
};

const record = {
  name: "Horizon Estate Editorial Premium",
  industries: [
    "real estate",
    "property",
    "realty",
    "real estate agency",
    "luxury real estate",
    "premium real estate",
    "property investment",
    "investment real estate",
    "brokerage",
    "residential",
    "villa",
    "mortgage",
  ],
  moods: [
    "editorial",
    "minimal",
    "premium",
    "calm",
    "confident",
    "magazine",
    "sophisticated",
    "understated",
    "investment-grade",
    "european",
    "monochrome",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Horizon Estate real estate pattern into design_patterns...");

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
