// One-off uploader for the DENTLAB/MEDICARE friendly card-based medical pattern.
// Cobalt blue + dark navy + soft blue-gray bg, every section wrapped in a
// rounded white card, sentence-case bold sans-serif headings, blue rounded-
// square service icons with white symbols, blue circle + white checkmark
// bullets, sky-blue tint behind doctor portraits, avatar carousel
// testimonials with active-ring state, full-bleed blue grid-pattern CTA
// before the dark footer. First pattern for Medical / Healthcare / Dental —
// friendly approachable clean trustworthy medical mood.
//
// Run with: node scripts/upload-dentlab-pattern.mjs

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
  colorPalette: "#F1F5F9, #FFFFFF, #3B5BDF, #131A2E, #E0E7FF, #0F172A, #64748B",
  colorMode: "light",
  accentUsage:
    "ROYAL COBALT BLUE #3B5BDF (close to indigo-600 / a saturated blue-violet) is the trust-signaling primary accent — used for: (1) all primary CTA pills (filled blue background + white text — 'Book Appointment', 'Explore All Experts', 'Subscribe'), (2) outlined-pill secondaries (1.5px blue border, white fill, blue text — 'Schedule Visit'), (3) the 'Contact Us' nav pill in the floating dark nav bar, (4) blue ROUNDED-SQUARE service icon backgrounds (~48-56px squircles with WHITE tooth/medical icons inside), (5) blue CIRCLE bullets containing WHITE CHECKMARK icons in feature lists, (6) the active-state ring around the centered avatar in the testimonial carousel, (7) the giant decorative quote-mark glyph beneath testimonial bodies, (8) the full-bleed blue CTA banner band before the footer (with subtle white grid-line pattern overlay). DARK NAVY #131A2E (close to slate-900) is used for: the FLOATING TOP NAV BAR (rounded pill shape, white logo + white nav links + blue Contact Us pill), the FOOTER background, and dark-navy circular social icons. SKY BLUE / LIGHT INDIGO #E0E7FF is the unique tint behind each doctor portrait (soft wash creating a friendly studio backdrop). Background is #F1F5F9 (very light blue-gray) so white cards POP. Body text uses #64748B muted gray. The blue is friendly and trustworthy — never harsh-clinical.",
  typography:
    "FRIENDLY BOLD SANS-SERIF in SENTENCE CASE (not all-caps) — Geist Bold / Inter Bold / DM Sans Bold / Plus Jakarta Sans Bold / Manrope Bold at 600-700 weight, with slightly rounded letterforms for warmth. Major headings 40-56px ('Bright Smiles Begin Here', 'Our Dental Services', 'Meet Our Dentists', 'Your Smile Deserves the Best Care', 'What our patients say', 'Ready for a Brighter Healthier Smile?'). Stat numbers are huge bold dark navy at 48-64px ('16k+', '250+', '8k+', '98%'). Body copy 14-16px regular sans gray #64748B. Section labels are small (12-13px) sentence-case with a small bullet/dot prefix ('• About Us'). Critically: NO all-caps, NO italic, NO serif accents — the design's voice is approachable, conversational, modern-medical. Card titles for services + features use 18-22px semi-bold dark navy with a colon-or-dash separator before description ('Root Canal & Fillings - Our experienced professionals are dedicated...').",
  layout:
    "LIGHT BLUE-GRAY page on #F1F5F9 with EVERY MAJOR SECTION wrapped in a rounded WHITE CARD (~24-32px border-radius, soft 1px border + subtle shadow) creating a stacked-card layout: TOP a FLOATING DARK NAVY ROUNDED-PILL NAV BAR with 'DentLab' wordmark LEFT, centered horizontal links (Home / About Us / Services / Doctors / Doctors), and a BLUE 'Contact Us' pill RIGHT — the nav itself sits inside a wide rounded-pill capsule that floats just inside the viewport edges → HERO SECTION as a WIDE WHITE ROUNDED CARD split 50/50: LEFT half contains a massive bold sentence-case 2-line headline 'Bright Smiles / Begin Here', a gray description, two PILLS side-by-side (filled blue 'Book Appointment' + outlined blue 'Schedule Visit'), and a small social-proof row at bottom (3 small overlapping avatar circles + '40,000+ / Satisfied Clients' text); RIGHT half is a large rounded-corner photograph of a patient receiving dental care → ABOUT/MISSION CARD: a tall white rounded card with a small '• About Us' label CENTERED + a large bold centered 3-line statement ('At MediCare we combine modern technology with compassionate care...') → 4-COL STAT CARD GRID: 4 separate small white rounded cards (subtle border) each containing a huge bold dark-navy NUMBER ('16k+', '250+', '8k+', '98%') + a bold small label ('Happy Patients', 'Expert Doctors', 'Successful Treatments', 'Patient Satisfaction') + a small gray description, arranged horizontally → SERVICES CARD: title 'Our Dental Services' + description CENTERED inside a white rounded card, then a SERVICES LAYOUT below with 2-COL-LEFT × IMAGE-CENTER × 2-COL-RIGHT structure: TWO STACKED service cards on the LEFT (each card: blue rounded-square ~48px ICON with white tooth/dental glyph in TOP-LEFT, bold title, gray description below), a CENTRAL ROUNDED-CORNER PHOTO of dentists with patient between the columns, TWO STACKED service cards on the RIGHT mirroring the left — so 4 service cards flank a central image → SECONDARY ABOUT CARD: split layout, LEFT a rounded-corner portrait photo of a dentist with clipboard, RIGHT a bold heading 'Your Smile Deserves the Best Care' + description + 4 FEATURE ROWS each prefixed by a BLUE CIRCLE ICON containing a WHITE CHECKMARK + bold title + dash + gray description, then a filled blue 'Book Appointment' pill at the bottom → DOCTORS CARD: 'Meet Our Dentists' centered title + description + 4 DOCTOR CARDS in a row, each card has the doctor's photo set against a SKY-BLUE TINTED ROUNDED RECTANGLE (#E0E7FF), name in bold dark navy below + role label in gray; centered blue 'Explore All Experts' pill at the bottom → TESTIMONIAL CARD: 'What our patients say' centered title + description, an AVATAR CAROUSEL ROW (5 small circular avatars horizontally, with the CENTER avatar emphasized — larger, blue ring around it, indicating the active speaker), CIRCULAR ARROW BUTTONS on each side of the avatar row for prev/next, below it the active person's name + role, then the italicized-feeling quote body, then a LARGE DECORATIVE BLUE QUOTE GLYPH at the bottom → FULL-BLEED BLUE CTA BAND: cobalt blue #3B5BDF rounded-rectangle band with subtle WHITE GRID-LINE PATTERN OVERLAY (faint perspective grid texture), bold white heading on LEFT 'Ready for a Brighter Healthier Smile?' and a WHITE pill 'Book Appointment' on RIGHT → DARK NAVY FOOTER: 4-col on solid #131A2E: COL1 'DentLab' logo + tagline + 4 dark circular social icons (facebook / twitter / instagram / linkedin) / COL2 'Quick Links:' (Home / About Us / Contact / Book Now) / COL3 'Contact Info:' with tiny icons (📍 address / 📞 phone / ✉ email) / COL4 'Our Newsletter' with white pill email input + blue 'Subscribe' pill / bottom hairline divider + centered 'Copyright © DentLab All Right Reserved.'.",
  signaturePatterns: [
    "EVERY SECTION WRAPPED IN A WHITE ROUNDED CARD — the entire page is a STACK of large rounded white cards (24-32px radius, soft border + subtle shadow) sitting on a light blue-gray page background; this is the design's primary structural device, not a one-off — hero, about, stats, services, doctors, testimonial all live inside their own card",
    "FLOATING DARK NAVY ROUNDED-PILL NAV BAR — the nav is a wide rounded-pill capsule in dark navy #131A2E floating at the top with white logo on left, centered nav links, and a blue 'Contact Us' pill anchored right; the entire nav sits inside its own pill shape rather than a bar that spans edge-to-edge",
    "BLUE ROUNDED-SQUARE SERVICE ICONS with WHITE GLYPHS — small 48-56px cobalt blue squircles (12-14px corner radius) containing white centered medical/tooth icons, anchored top-left of each service card",
    "BLUE CIRCLE + WHITE CHECKMARK FEATURE BULLETS — feature/benefit lists use a small filled blue circle containing a white checkmark icon as the bullet, paired with bold-title + dash + gray-description",
    "DUAL PILL CTA SYSTEM — filled blue pill (white text) for primary actions + 1.5px-blue-outlined white-fill pill (blue text) for secondaries; pills are FULLY ROUNDED (high border-radius), no arrows or trailing icons, just clean text",
    "STAT CARD ROW with HUGE NUMBERS — 4 small white rounded cards in a row, each containing a 48-64px bold dark-navy number ('16k+'), a small bold label ('Happy Patients'), and a 2-3 line muted-gray description; cards have no shadow, just a subtle border",
    "SKY-BLUE TINTED BACKDROP behind doctor portraits — each doctor card has a soft sky-blue / pale-indigo (#E0E7FF) rounded rectangle as the photo background, creating a friendly studio-portrait feel + visual unity across the 4-doctor row",
    "AVATAR CAROUSEL with ACTIVE-RING + ARROW NAV — the testimonial section shows a horizontal row of 5 small circular avatars where the CENTER avatar is larger and surrounded by a blue ring (active state), with circular arrow buttons on each side for prev/next navigation",
    "GIANT DECORATIVE QUOTE GLYPH below testimonial body — a single large blue '\"' (or low-9 quote mark) sits centered BELOW the quote text as a typographic flourish, not above it",
    "SERVICES LAYOUT with CENTRAL PHOTO between TWO CARD COLUMNS — services use a unique 2-card-left | photo-center | 2-card-right structure where the central rounded-corner photo of dentists+patient anchors the section visually, breaking from typical 3 or 4-col uniform grids",
    "FULL-BLEED BLUE CTA BAND with WHITE GRID-LINE PATTERN — a single horizontal cobalt blue rounded band before the footer with a subtle white perspective grid-line texture overlay, bold white heading on left + white pill CTA on right",
    "AVATAR-STACK SOCIAL PROOF in hero — the hero's bottom shows 3 small overlapping avatar circles + a bold '40,000+' number + 'Satisfied Clients' label, a tiny but trust-building social-proof element",
    "SENTENCE-CASE FRIENDLY HEADINGS — every heading is sentence case ('Bright Smiles Begin Here', 'Meet Our Dentists') with friendly slightly-rounded bold sans-serif; never all-caps, italic, or serif — the typographic voice is consistently approachable and conversational",
    "TINY DOT-PREFIXED CENTERED LABELS — small section labels are sentence case with a tiny bullet/dot prefix ('• About Us') and centered above headings, lighter than tracking-wide all-caps labels in other premium designs",
    "DARK NAVY FOOTER with 4-COL + DARK CIRCULAR SOCIAL ICONS — footer is solid #131A2E with logo+tagline+4 dark circular social icons col, then Quick Links col, then Contact Info col with tiny address/phone/email icons, then Newsletter col with white pill email input + blue Subscribe pill",
  ],
  uniqueTechniques: [
    "Card-stack page architecture — instead of full-bleed sections separated by spacing, EVERY section is its own large white rounded-card surface stacked on a tinted blue-gray background, giving the entire page a 'medical-app' UI feel that separates it from typical landing pages and signals 'modern healthcare software' subconsciously",
    "Sky-blue portrait backdrop trick — placing each doctor's photo against a soft #E0E7FF rounded rectangle is a subtle but effective way to (a) unify a row of varied photos, (b) feel friendly/studio-quality without expensive photography, (c) signal medical/clean without using clinical white — the most distinctive doctor-card pattern in the design",
    "Active-ring avatar carousel — instead of a single large testimonial card with arrows, the testimonial section is a row of small avatars with the center one ringed in blue (active), creating an at-a-glance preview of upcoming/past speakers; this is a SaaS-pattern adapted for healthcare and is more space-efficient than card sliders",
    "Centered photo flanked by 2x2 service cards — services break the typical 3/4-col grid by placing a single rounded-corner photograph of dentists+patient in the geometric center of the section with 2 service cards on each side, making the photo the visual anchor and reducing card-grid monotony",
    "Faint white grid-line CTA banner — the pre-footer CTA uses a saturated blue background with a subtle white perspective grid-line pattern overlay that adds technical/medical character without busy texture; many medical sites either go flat-color or use heavy patterns, this lands in between and feels modern-tech-medical",
    "Dot-prefix sentence-case labels — section labels are '• About Us' rather than 'ABOUT US' tracking-wide all-caps, a softer typography choice that fits the friendly-approachable medical voice; pairs naturally with the sentence-case bold headings",
    "Single-color disciplined accent — only ONE blue (#3B5BDF) is used as the chromatic accent across the entire design, applied to every CTA, every icon, every state highlight; this restraint creates instant recognition and maximum trust signal — never paired with a secondary brand color",
  ],
  spacing:
    "Soft generous medical-app spacing — sections (cards) separated by 24-40px gaps showing the blue-gray page background between them, card internal padding 40-64px, card border-radius 24-32px, button border-radius full-rounded (pill), service-card padding 24-32px, stat-card padding 28-36px, image corner-radius 16-24px. Everything has rounded corners — no sharp 90° angles anywhere. The design BREATHES with comfortable padding inside each card, while the gaps between cards keep the rhythm visible. Friendly, never cramped.",
  moodKeywords: "friendly, clean, approachable, trustworthy, modern, professional, healthcare, medical-app, soft, warm, family-friendly, gentle, caring, contemporary",
  animations:
    "Soft and subtle — card sections fade-in-up on scroll (0.5s ease-out, y-24px → 0, staggered 0.08s between cards), stat numbers count-up animation when entering viewport (0.8s ease-out from 0 to target). Hover scale 1.02 on white cards with shadow elevation (subtle, ~12px blur deeper). Pill CTAs hover → background-darken 5% + slight scale 1.03. Doctor cards hover → scale 1.03 + sky-blue backdrop saturates slightly. Service icon hover → tiny scale 1.1 with subtle blue-glow shadow. Avatar carousel: 0.4s ease cross-fade between active states, ring grows on entry. CTA banner grid pattern: very slow horizontal drift (0.5px/s) for ambient life. NO bouncing, NO bold parallax, NO aggressive transitions — the whole motion vocabulary stays gentle and reassuring, matching the medical-care voice.",
  heroTreatment:
    "Hero is a LARGE WHITE ROUNDED CARD (~32px border-radius, soft border + subtle shadow) sitting on a light blue-gray #F1F5F9 page background, with a FLOATING DARK NAVY ROUNDED-PILL NAV BAR above it. The nav pill contains 'DentLab' wordmark on the LEFT in white bold sentence-case, CENTERED nav links (Home / About Us / Services / Doctors / Doctors) in white medium-weight sans, and a filled blue 'Contact Us' rounded-pill button on the RIGHT. INSIDE the hero card the layout is split 50/50: LEFT HALF contains a 2-line massive bold sentence-case dark-navy headline 'Bright Smiles / Begin Here' (~48-56px Geist/Inter Bold), below it a 2-line gray description ('Gentle, expert dental care for all ages, experience comfort, confidence and lasting oral health.'), then TWO PILL CTAs side-by-side (filled cobalt blue 'Book Appointment' with white text + 1.5px-blue-outlined white-fill 'Schedule Visit' with blue text), then at the bottom a SMALL SOCIAL-PROOF ROW: 3 small overlapping circular avatar photos + a bold '40,000+' number + 'Satisfied Clients' label in gray. RIGHT HALF is a large rounded-corner photograph (24px radius) of a smiling patient receiving dental care. The overall feeling is friendly, trustworthy, modern-medical — soft and approachable rather than clinical, and the floating nav pill + card hero combination immediately signals 'this is a polished medical-app product' rather than a typical clinic website.",
};

const record = {
  name: "DentLab Friendly Card Medical",
  industries: [
    "medical",
    "healthcare",
    "dental",
    "dentist",
    "clinic",
    "doctor",
    "hospital",
    "medical clinic",
    "dental clinic",
    "orthodontist",
    "pediatric dentist",
    "family doctor",
    "general practitioner",
    "telehealth",
    "telemedicine",
    "wellness",
    "physiotherapy",
    "chiropractor",
    "optometrist",
    "vision care",
    "veterinary",
    "pediatrics",
    "primary care",
    "urgent care",
    "health services",
  ],
  moods: [
    "friendly",
    "clean",
    "approachable",
    "trustworthy",
    "modern",
    "professional",
    "healthcare",
    "medical-app",
    "soft",
    "warm",
    "family-friendly",
    "gentle",
    "caring",
    "contemporary",
    "card-based",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting DentLab medical pattern into design_patterns...");

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
