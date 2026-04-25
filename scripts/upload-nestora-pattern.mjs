// One-off uploader for the NESTORA real estate pattern.
// Bright sky-blue modern real estate with fanned property carousel,
// massive wordmark hero, and giant footer brand bleed — first
// pattern for Real Estate / Property industry.
//
// Run with: node scripts/upload-nestora-pattern.mjs

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
  colorPalette: "#3B9FE8, #E7F2FA, #0E1220, #FFFFFF, #7A8597",
  colorMode: "light",
  accentUsage:
    "Bright sky-blue #3B9FE8 is the SIGNATURE color — used as (1) full-bleed hero background, (2) rounded section-wrapper panels behind Featured Properties + Testimonials, (3) bottom CTA card background, (4) open-accordion background tint. Pale blue #E7F2FA is the soft wrapper tint. Near-black #0E1220 powers ALL headings, body text, and the solid pill CTAs that anchor each section (black pill with white text + arrow). White is used for nav pill, hero CTA, and surfaces. Accent is NEVER used for text — it's always atmosphere/container.",
  typography:
    "Bold geometric sans-serif across the ENTIRE design — no serif, no italic anywhere (Manrope / Plus Jakarta Sans / Inter at 700-800). Hero wordmark is MASSIVE display (96-140px, tight tracking, ALL CAPS 'NESTORA PROPERTY' in white). Section headings are large bold 40-56px, black. Body is 14-16px regular, muted gray #7A8597. Filter pills and spec labels are small 11-13px medium. Footer wordmark is GIANT (240-340px) bold lowercase. The entire design speaks in one confident, modern sans-serif voice — variety comes from scale, not family.",
  layout:
    "Floating white pill NAV at top of hero (logo dots + 'Nestora' left, centered Home/Properties/About/Agent/Blog links, white rounded 'Contact' pill right) → FULL-BLEED sky-blue hero with massive white 'NESTORA PROPERTY' wordmark + short description + white 'Available Properties →' pill, architectural building photo bleeding off right 40%, tiny circle-arrow indicator bottom-right → Featured Properties section wrapped in PALE-BLUE rounded container: centered heading + description + FANNED 5-card carousel (small-medium-LARGEST-medium-small with location pin label top + price overlay bottom on each), black circle nav arrows below → Most Exclusive Properties on white: centered heading + filter-pill bar (active = solid black pill, others = outlined rounded pills: All/Villas/Apartments/Duplex/Urban Loft/Coastal/Penthouse/Eco-Smart/Urban Condos/Historic), 3×2 property card grid (rounded image + icon spec row 'sqft / bed / bath' + bold price + address), black 'Available Properties →' pill CTA → Journey section SPLIT (left: two image cards with circular 'YEARS OF EXPERIENCE 12' rotated badge overlapping + stat card '1,200 + Property Closing' below; right: large 'Our Journey Toward Excellence' heading + body + black 'Learn More →' pill) → Testimonials wrapped in PALE-BLUE rounded container: centered heading + 3 testimonial cards (quote + avatar + name + role), black circle arrows → Latest Articles on white: 3 article cards (rounded image + date badge + 'Articles' tag + title + 'Read More →' link) → Meet Our Agents on white: 4 full-height agent photo cards (photo fills card + name + role + 4-icon social row: phone/whatsapp/instagram/linkedin) + circle arrows → FAQ on white: centered heading + accordion rows (+ icons, first one open with pale-blue tint + answer paragraph) → Full-width SKY-BLUE rounded CTA card: 'Let's Collaborate and Achieve Greatness!' heading + description + white 'Talk to an Agent →' pill, architectural roof peak photo bleeding right → Footer on white: brand + tagline + email subscribe input-pill with dark 'Subscribe Now →' button LEFT, three columns (Extra Links / Social Media / Office Address) RIGHT, GIANT lowercase 'Nestora' wordmark bleeding OFF bottom edge (only top 60% visible), thin legal bar underneath.",
  signaturePatterns: [
    "Floating white pill NAV at top of sky-blue hero — logo + centered links + rounded 'Contact' pill right, entire bar rounded into a capsule shape",
    "MASSIVE white ALL-CAPS sans-serif wordmark spanning hero width (96-140px) — brand + category ('NESTORA PROPERTY') rendered as architectural title over a full-bleed sky-blue + building photo",
    "Pale-blue rounded section-WRAPPER — Featured Properties and Testimonials sit inside rounded-3xl light-blue containers (#E7F2FA), creating visual rhythm between white page sections",
    "Fanned depth carousel — 5 property cards arranged small→medium→LARGEST→medium→small with the center card tallest and sides progressively shorter, creating 3D perspective / stack feel",
    "Image-as-card property tiles — property cards ARE the photograph with location pin label overlay on top-left and price overlay at bottom, no traditional card padding around the image",
    "Filter pill bar with solid-black active state — 'All' in filled black pill, remaining categories (Villas/Apartments/Duplex Homes/Urban Loft etc.) as outlined rounded pills on white",
    "Property spec icon row — tiny meta line below each image: '⤢ 1,850 sq.ft  ⬓ 2 bed  🛁 2 bath' with minimal line-icons and small labels, always above bold price and address",
    "Circular rotated-text 'YEARS OF EXPERIENCE' stamp — large white circle with the phrase curving around its edge (SVG textPath) and a giant number '12' centered inside, overlapping two photo cards",
    "Giant footer wordmark bleeding off bottom — brand name in lowercase bold sans at 240-340px rendered so large it extends below the page edge (only top 60% visible), creating dramatic closure",
    "Sky-blue rounded CTA card with architectural photo — full-width #3B9FE8 rounded panel containing headline + white pill CTA on left, roof/peak architecture photo bleeding off right side",
    "Black circle nav arrows — all carousels (Featured, Testimonials, Agents) use two small black circle buttons with white arrow icons centered below the content",
    "Full-height agent photo cards with social-icon row — agent headshot fills the entire card edge-to-edge, name + role below image, 4 small circular social icons (phone/whatsapp/instagram/linkedin) as the card footer",
  ],
  uniqueTechniques: [
    "Fanned property-card depth carousel — 5 cards visually staged at different heights (shortest at edges, tallest center) creating a physical stacking feel instead of flat horizontal scroll; the center card also exposes full spec bar while side cards show only location + price",
    "Circular rotated-text experience stamp — 'YEARS OF EXPERIENCE' curved around a circle using SVG textPath with a slow 20-30s rotate animation, giant '12' sitting dead-center; sits OVER two photo cards like a wax seal",
    "Full-brand bleed-off footer — the brand name is the PAGE ENDING, rendered so massive it crosses the viewport edge, giving the site a clear sonic closure mark; no thin copyright bar competes with it",
    "Color-wrapper rhythm — instead of alternating dark/light sections, the page stays white but drops IN pale-blue rounded containers for feature sections, so the background breathes without losing the light mode",
    "Sky-blue as atmosphere, black as action — the brand color is reserved for emotional/container moments (hero, wrappers, final CTA) while all clickable CTAs are black pills — clear visual hierarchy between brand presence and user action",
  ],
  spacing:
    "Generous modern real-estate spacing — sections separated by 80-120px, pale-blue wrapper containers have 64-96px internal padding, property grid has 24-32px gaps, fanned carousel cards overlap slightly. Hero is full viewport (~100vh). Footer wordmark sits flush to a clean bottom edge with 48-64px breathing room above the columns. Overall feeling is confident, trustworthy, and uncramped.",
  moodKeywords: "bright, trustworthy, professional, modern, clean, premium-but-approachable, confident, spacious, corporate-friendly, real-estate",
  animations:
    "Hero wordmark slides up + fades in on load (0.6s ease-out, 0.2s delay). Fanned carousel: snap-scroll with 0.5s cubic-bezier transition, center card scales to 1.05 with shadow lift. Property grid cards: hover → scale 1.02 + shadow increase + faint blue ring. Filter pills: smooth background color transition on click + subtle scale pulse. Circular experience badge: slow continuous rotation (24s linear infinite). FAQ accordion: 0.3s height expansion + content fade-in + plus-icon rotates to minus. Article and agent carousel arrows: hover → scale 1.1 + shadow. Hero CTA pill: hover → subtle scale 1.05 + faint lift. Footer giant wordmark stays static (it's atmosphere, not interactive).",
  heroTreatment:
    "FULL-BLEED bright sky-blue (#3B9FE8) panel filling the viewport. At TOP: a floating WHITE pill-shaped NAV bar (rounded-full, subtle shadow) centered horizontally with margin from the top edge — contains three-dot-cluster logo + 'Nestora' wordmark on the left, centered nav links (Home / Properties / About / Agent / Blog in dark text), and a white rounded 'Contact' pill button on the right. BELOW (content area, left-aligned): a MASSIVE white ALL-CAPS sans-serif wordmark spanning most of the page width — 'NESTORA PROPERTY' at 96-140px, ultra-bold (800), tight tracking, possibly wrapping to two lines on narrower screens. Below that: a short 3-line description paragraph in white/80% at 14-16px, then a white rounded 'Available Properties →' pill CTA button with dark text and subtle shadow. On the RIGHT side of the hero: a modern architectural building photograph (minimalist textured facade, cantilever or stepped geometry) bleeding off the right edge and partially overlapping the bottom — photo fills roughly 40-50% of the right half. In the bottom-right corner: a small thin-circle with a downward-arrow icon (scroll cue). No other imagery or icons in the hero — the impression is bold, confident, spacious, and architectural.",
};

const record = {
  name: "Nestora Real Estate Premium",
  industries: [
    "real estate",
    "property",
    "realty",
    "real estate agency",
    "property listing",
    "home buying",
    "realtor",
    "residential",
    "housing",
    "property management",
    "brokerage",
  ],
  moods: [
    "bright",
    "trustworthy",
    "professional",
    "modern",
    "clean",
    "premium",
    "approachable",
    "confident",
    "spacious",
    "corporate",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Nestora real estate pattern into design_patterns...");

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
