// One-off uploader for the HYPEGYM aggressive dark gym pattern.
// Black + hot-pink bodybuilding-intensity gym design with ghost stencil
// outline text watermarks, diagonal pink gradient bleeds, condensed
// all-caps headlines, pink-gradient CTAs with trailing arrow circles —
// second pattern for Gym / Fitness / Sports, complementing Velocity Club's
// bright community mood with a dark intense mood.
//
// Run with: node scripts/upload-hypegym-pattern.mjs

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
  colorPalette: "#0A0A0A, #1A1A1A, #EC2F65, #FF1758, #FFFFFF",
  colorMode: "dark",
  accentUsage:
    "Hot pink/magenta #EC2F65 with a gradient stretching toward #FF1758 is the RELENTLESS signature — used everywhere: (1) all primary CTA pills are a pink→magenta gradient background with white uppercase text and a trailing black circle containing a white arrow anchored to the right edge, (2) diagonal angular pink gradient BANDS bleeding from page edges cutting across every section, (3) tiny pink square bullet before every section heading, (4) pink icons on contact info strip + meta rows, (5) pink stroke color for the ghost outline text watermark above each section heading, (6) pink gradient LABEL BADGES anchored to bottom-left of facility photo cards, (7) pink gradient FILL for active/open states (selected feature card, open accordion items, pricing highlight), (8) pink gradient footer social icon squares + pink ► arrows before each footer link. Black #0A0A0A is the page background, slightly lighter #1A1A1A for surfaces/cards. No other accent color exists — the entire design is dark + hot pink.",
  typography:
    "CONDENSED STENCIL-BOLD ALL-CAPS sans-serif for every heading (Bebas Neue / Anton / Oswald Bold / Barlow Condensed Black at 800-900). Tall narrow aggressive letterforms are the typographic signature — headlines like 'UNLEASH YOUR POWER / THROUGH EXPERT TRAINING' and 'COMMITTED TO YOUR TRANSFORMATION JOURNEY' at 72-120px condensed bold white all-caps. Above every heading there is a GHOST OUTLINE WATERMARK — the SAME condensed all-caps font rendered at 56-80px but as STROKE ONLY (no fill, pink 1.5-2px stroke, letter-spaced wider), sitting behind/above the solid heading as a two-layer typographic stack. Body is standard sans-serif regular (Inter / Barlow at 400, 14-16px) in muted gray #9A9A9A. Meta labels are ALL CAPS 11-12px with tiny pink icons. Every bit of display type shouts — the design has zero calm in its typography.",
  layout:
    "DARK hero (black + gym photo): TOP bar has HYPEGYM stylized-H logo LEFT + horizontal info strip with 3 pink-icon contact items (📍 address | 🕐 hours | 📞 phone), BELOW those main nav links (Home / About / Classes▼ / Trainers / Pricing / Pages▼), white 'JOIN NOW →' pill with black arrow circle RIGHT → full-bleed dark gym photograph with DIAGONAL PINK GRADIENT ANGULAR BANDS bleeding from left edge → LEFT overlay: ghost outline 'PUSH BEYOND LIMITS' in pink stencil stroke above massive bold white condensed 'UNLEASH YOUR POWER / THROUGH EXPERT TRAINING' → RIGHT overlay: floating video preview card with white play-button circle + gray description paragraph + pink-gradient 'GET FREE CONSULTATION →' pill → About section: LEFT overlapping photo collage (big + smaller offset) with pink angled gradient from left, RIGHT has ghost outline 'ABOUT' + pink square bullet + bold 'COMMITTED TO YOUR TRANSFORMATION JOURNEY' (with pink gradient shape behind heading from right) + description + 2x2 stat card grid (pink icon + '15 YEARS OF EXCELLENCE' / '1000+ USERS JOINED' / '5000+ SUCCESS STORIES' / 'COMMUNITY-DRIVEN') + pink 'MORE ABOUT US →' pill → Classes section: ghost outline 'CLASSES' + pink bullet + 'FIND YOUR PERFECT TRAINING PROGRAM' centered + description, then 4 horizontal class cards stacked vertically — each card: photo left + dark info right (class name ALL CAPS + description + 4-col meta row SESSION/DURATION/LEVEL/COACH with tiny pink icons + pink 'LEARN MORE →' pill + outlined 'CONTACT COACH →' pill) → Why section: ghost 'WHY HYPEGYM' + pink bullet + 'BUILT DIFFERENT, BETTER AND PROVEN' + 2-col (LEFT dumbbell photo with pink angled gradient, RIGHT 3 stacked feature cards with middle one PINK-GRADIENT-FILLED and others dark outlined: EXPERT COACHING STAFF / PREMIUM FACILITY DESIGN / FLEXIBLE TRAINING SCHEDULE) → Facilities: ghost 'FACILITIES' + pink bullet + 'WORLD-CLASS FACILITIES FOR OPTIMAL PERFORMANCE' + description, 3x2 grid of facility photo cards with PINK GRADIENT LABEL BADGES at bottom-left of each image (DEDICATED TRAINING ZONES / TOP-TIER EQUIPMENT BRANDS / CLEAN PRIVATE AMENITIES / RECOVERY & WELLNESS AREA / FUNCTIONAL TRAINING STUDIO / CARDIO INNOVATION ZONE) → Testimonials: LEFT pink-tinted gym photo with ghost 'TESTIMONIALS' + pink bullet + 'SEE WHAT MEMBERS HAVE ACCOMPLISHED' overlay, 2 floating dark testimonial cards with 5 pink stars + quote + avatar + member duration → FAQ: ghost 'FAQ' + pink bullet + 'COMMON QUESTIONS FROM MEMBERS VISITORS' + description right, 2-column accordion grid where OPEN items are PINK-GRADIENT-FILLED with minus icon + answer and CLOSED items are dark outlined with plus icon → Final CTA: ghost 'READY TO BEGIN?' + bold 'START TRAINING WITH EXPERT GUIDANCE' with pink angular gradient shape from left, athletic photo right, pink 'CONTACT US →' pill → Footer: LEFT stacked HYPEGYM logo + 'BUILT DIFFERENT, BETTER AND PROVEN' tagline + description + 4 pink gradient social icon squares; MIDDLE two columns (QUICK LINKS + SUPPORT) each link prefixed by a pink ► arrow; RIGHT 'GET WEEKLY TRAINING TIPS' + email input + pink gradient 'SUBSCRIBE →' pill + no-spam disclaimer; bottom legal bar.",
  signaturePatterns: [
    "GHOST OUTLINE STENCIL TEXT WATERMARK above every section heading — the same word the section is about ('ABOUT' / 'CLASSES' / 'FACILITIES' / 'TESTIMONIALS' / 'FAQ' / 'READY TO BEGIN?') rendered HUGE in condensed all-caps with pink stroke only (no fill) positioned behind/above the solid bold heading — the most distinctive and relentlessly-repeated signature",
    "Small PINK SQUARE BULLET before every heading — tiny solid pink rectangle (6-10px) anchored just before the first word of each bold section heading",
    "DIAGONAL PINK GRADIENT ANGULAR BANDS bleeding from page edges — slanted pink→magenta gradient shapes cutting across hero, about, testimonial, and CTA sections at 15-20° angles, usually bleeding in from the left edge",
    "PINK GRADIENT CTA PILL with TRAILING BLACK CIRCLE + WHITE ARROW — white uppercase text on pink-to-magenta gradient bg + black circle with white arrow anchored to the pill's right edge, repeated 15+ times across the page",
    "Contact info strip at top of nav — 3 items with tiny pink icons (📍 address / 🕐 open hours / 📞 phone) rendered horizontally as an info bar above the main nav links",
    "Condensed stencil-style bold ALL-CAPS headings throughout — every heading uses a tall narrow compressed condensed-bold typeface at 72-120px, maximum muscular weight, no variation",
    "Horizontal class card with photo-left / info-right + 4-col meta row — each class card has a tall gym photo on the left and a dark panel on the right containing the ALL CAPS class name, description, and a 4-column icon meta row (SESSION / DURATION / LEVEL / COACH with tiny pink icons) + two pills (pink 'LEARN MORE' + outlined 'CONTACT COACH')",
    "Facility card with PINK GRADIENT LABEL BADGE — photo card with the facility name label as a pink gradient filled badge anchored to the bottom-left corner of the image",
    "FAQ accordion with PINK-FILLED open state + dark-outlined closed state — open items are a full pink gradient background with minus icon and answer text; closed items are dark rectangular with a plus icon and question; binary visual state",
    "Stat card 2x2 grid with pink icon + ALL CAPS label — dark rectangular cards with a pink icon on the left and an ALL CAPS stat phrase ('15 YEARS OF EXCELLENCE' / '1000+ USERS JOINED') on the right, arranged in a 2x2 block",
    "Middle feature card pink-gradient-filled, others outlined — Why Us section has 3 stacked feature cards with the MIDDLE one fully pink-gradient (PREMIUM FACILITY DESIGN) while the other two are dark outlined, drawing the eye to one 'featured' highlight",
    "Pink gradient square SOCIAL ICONS in footer — each social platform (youtube/facebook/twitter/linkedin) is a small rounded square with pink gradient background and white icon, horizontal row in footer",
    "Pink ► chevron bullets before footer links — QUICK LINKS + SUPPORT columns each list links prefixed by a small pink right-chevron arrow for a gym-industrial feel",
    "Overlapping photo collage — About section has ONE big photo + ONE smaller photo offset below-right, creating a dynamic multi-image composition rather than a single-photo block",
    "Floating video preview card with white play circle overlay — rectangular dark-bordered card containing a gym photo with a large white circular play button centered on top, positioned over the hero",
  ],
  uniqueTechniques: [
    "Ghost outline + bold heading typographic stack — every section headline is a 2-layer vertical composition: the concept word in HUGE condensed pink-stroke-only stencil outline text, and the full bold filled heading underneath; creates an editorial-poster quality without needing serifs or italics and is the most recognizable typographic signature of the whole design",
    "Diagonal pink gradient banding as atmosphere — angular slanted pink→magenta gradient shapes bleeding in from left/right edges across sections create kinetic aggressive energy without requiring solid pink backgrounds; the design stays dark but feels HOT",
    "Pink-gradient pill + trailing black-arrow-circle CTA — a consistent button shape where the arrow sits in its own black circle on the pill's right edge (rather than inline with the text) becomes a brand-level visual hook; users learn to recognize the pill-arrow combo as THE action",
    "Binary accordion states — open FAQ items are fully pink-gradient filled while closed items are dark-outlined, with no intermediate hover state, creating a clear muscle-binary visual of 'active/inactive' that matches the gym brand energy",
    "Middle-card-highlighted 3-stack — in the Why Us section, 3 feature cards are stacked with ONLY the middle one pink-filled; this is a subtle hierarchy technique that draws the eye to the featured claim without making the others feel muted",
    "Top 3-item contact info strip above nav — gym-industry convention of showing address + hours + phone up top gets styled as pink-iconed horizontal strip, an authentic local-gym signal absent from most modern web designs",
    "Condensed all-caps EVERYTHING — every heading in the entire design uses a single condensed stencil-bold all-caps typeface; this uniformity + narrowness creates maximum 'strength training' visual personality and is the core reason the design feels muscular and intense",
  ],
  spacing:
    "Dark aggressive compact spacing — sections separated by 80-100px (tighter than luxury designs for energy), stat card 2x2 grid has 16-20px gaps, class card stack has 24-32px between cards, card internal padding 20-32px. Hero is full viewport. The dark background + hot-pink accents + diagonal bleeds create visual density and movement; spacing is muscular and compressed but not cramped — every element feels stacked tightly to match the gym-intensity mood.",
  moodKeywords: "aggressive, bold, muscular, intense, masculine, bodybuilding, powerful, high-energy, dark, dramatic, performance, gym",
  animations:
    "Ghost outline text: letter-by-letter stroke-draw reveal on scroll into view (0.05s per letter). Diagonal pink gradient bands: slow slide-in from edge on section load (0.8s ease-out), subtle continuous drift 2-3px for energy. Hero headline: fade + up-shift on load (0.6s). Video preview card: hover → scale 1.03 + shadow glow pink, play button pulse ring. Pink CTAs: hover → gradient hue-shift + arrow translate-x 4px right + pill scale 1.05. Stat cards: staggered fade-up on scroll (0.1s delay between each). Class cards: hover → border glow pink + photo slight zoom + pink arrow icon slide. Facility cards: hover → image scale 1.05 + pink badge brightness pulse. FAQ accordion: 0.3s gradient fade-in on open + plus→minus icon rotate. Footer subscribe button: subtle continuous pulse on pink gradient. Overall animation energy matches the brand — kinetic, assertive, confident.",
  heroTreatment:
    "FULL-BLEED dark hero dominated by a gym photograph (bodybuilder with towel, barbells and equipment in background, moody low-key lighting). At the TOP, a DARK horizontal NAV PANEL containing: HYPEGYM stylized-H logo + wordmark on the LEFT, a CONTACT INFO STRIP with three pink-iconed items (📍 'Strength Boulevard, Cityville, ST 12345' / 🕐 'Open: 5 AM - 11 PM' / 📞 '(555) 123-4567') arranged horizontally near the top, the MAIN NAV LINKS below (Home / About / Classes▼ / Trainers / Pricing / Pages▼) in medium-weight white sans-serif, and a white 'JOIN NOW →' pill with black arrow circle on the far RIGHT. DIAGONAL PINK GRADIENT ANGULAR BANDS cut across the hero from the left edge at ~15-20° slant. Overlaid on the photo LEFT side: the signature GHOST OUTLINE 'PUSH BEYOND LIMITS' in condensed all-caps pink stroke-only stencil font (no fill), and BELOW it the MASSIVE bold white condensed all-caps 2-line headline 'UNLEASH YOUR POWER / THROUGH EXPERT TRAINING' at 80-120px with tight tracking. On the RIGHT side: a floating rectangular VIDEO PREVIEW CARD (another gym photo inside) with a large white circular play button overlay centered on the card, below it a short description paragraph in muted gray, then a PINK GRADIENT CTA pill 'GET FREE CONSULTATION →' with black arrow circle on its right edge. The overall impression is aggressive, muscular, unapologetically dark, high-energy — maximum 'hit the gym NOW' intensity.",
};

const record = {
  name: "HypeGym Aggressive Dark Gym",
  industries: [
    "gym",
    "fitness",
    "sports",
    "bodybuilding",
    "crossfit",
    "strength training",
    "powerlifting",
    "fitness center",
    "personal training",
    "athletic training",
    "hardcore gym",
    "fitness studio",
    "boxing gym",
    "mma gym",
    "martial arts",
    "combat sports",
  ],
  moods: [
    "aggressive",
    "bold",
    "muscular",
    "intense",
    "masculine",
    "bodybuilding",
    "powerful",
    "high-energy",
    "dark",
    "dramatic",
    "performance",
    "hardcore",
  ],
  color_mode: "dark",
  brief_json: brief,
};

console.log("[upload] Inserting HypeGym aggressive gym pattern into design_patterns...");

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
