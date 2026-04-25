// One-off uploader for the UNTU CARE editorial-cinematic medical pattern.
// Full-bleed cinematic dental hero with nav overlaid directly on photo,
// scattered tilted polaroid-style photo composition in About, numbered
// "01/02/03" blue-prefix service cards, big centered all-caps quote with
// dark→light fade emphasis, embedded video with play-button, blue-gradient
// footer with MASSIVE "UNTU CARE" wordmark bleeding off bottom — second
// pattern for Medical / Healthcare / Dental, complementing DentLab's
// friendly-card-app mood with an editorial-magazine cinematic mood.
//
// Run with: node scripts/upload-untucare-pattern.mjs

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
  colorPalette: "#FFFFFF, #F5F7F9, #1A6BFF, #2E7BEF, #C5E2DA, #1A1F2E, #6B7280, #7CB5FF",
  colorMode: "light",
  accentUsage:
    "COBALT BLUE #1A6BFF (slightly teal-leaning, brighter than DentLab's indigo) is the primary accent — used for: (1) every TINY all-caps section LABEL ('BEST DENTAL CARE' / 'About Us' / 'Service' / 'Team' / 'Testimonial') rendered in tracking-wide small blue text above section headings, (2) all primary CTA pills (filled blue background + white text + small white arrow → — 'Book Appointment →', 'View All Service →'), (3) the NUMBERED SERVICE CARD prefix labels '01/', '02/', '03/', '04/' rendered in blue bold above each service title, (4) the STAT NUMBERS in the testimonial header ('10K+', '99%', '95%') rendered as huge bold blue numbers, (5) the FOOTER GRADIENT (cobalt blue #1A6BFF at top fading down to lighter sky-blue #7CB5FF at bottom). SOFT TEAL #C5E2DA (a desaturated greenish-teal pulled from dentist-scrub colors) is the unique tint behind doctor portrait cards — not sky-blue like other medical patterns, this teal signals 'medical-staff color' subliminally. White-fill outlined pill (1.5px blue border) is the secondary CTA. NO secondary brand color — single blue + tonal teal is the entire chromatic system, photography brings the rest. Body text is muted gray #6B7280 on white #FFFFFF or light-gray-blue #F5F7F9 alternating sections.",
  typography:
    "FRIENDLY MODERN SANS-SERIF in SENTENCE CASE for headings — Inter / Geist / DM Sans / Manrope / Plus Jakarta Sans at 600-700 weight, 36-56px headings ('Experience Comfortable Dental Care For A Brighter Smile', 'Compassionate Care, Trusted Expertise.', 'Where Every Treatment Begins With Trust', 'Behind Every Smile', 'What Our Patients Say'). Headings are conversational and warm — NEVER all-caps for the main display headings. Stat numbers '10K+', '99%', '95%' are huge bold BLUE at 56-72px. Body copy 14-16px muted gray. Above every section sits a TINY ALL-CAPS or SENTENCE-CASE BLUE LABEL (10-12px, tracking 0.1-0.15em, #1A6BFF) that names the section ('BEST DENTAL CARE', 'About Us', 'Service', 'Team', 'Testimonial'). The numbered service prefixes '01/' '02/' '03/' '04/' are blue bold 12-14px above each card title. Critically: there is ONE special typographic moment — a CENTERED ALL-CAPS BOLD QUOTE BLOCK between sections where the FIRST HALF of the text is rendered in DARK NAVY #1A1F2E and the SECOND HALF fades to LIGHT GRAY #C0C7D2 ('MORE THAN JUST HEALTHY TEETH, WE BELIEVE IN CREATING HAPPY EXPERIENCES. OUR TEAM LISTENS, UNDERSTANDS, AND GUIDES YOU THROUGH EVERY STEP,' [DARK] 'MAKING SURE YOUR JOURNEY TO A BRIGHTER SMILE FEELS EFFORTLESS AND REASSURING.' [LIGHT GRAY]) — this fade-emphasis trick is the typographic centerpiece of the design. The MASSIVE FOOTER WORDMARK 'UNTU CARE' is bold all-caps sans at ~200-280px, white, bleeding off the bottom edge of the footer.",
  layout:
    "EDITORIAL CINEMATIC MEDICAL flow: TOP a MINIMAL TRANSPARENT NAV overlaid directly ON THE HERO PHOTO (no floating pill, no white bar — just white text on top of the cinematic photograph): 'UNTU CARE' wordmark LEFT in white bold all-caps + centered horizontal nav links (HOME / ABOUT US / SERVICE / TESTIMONIAL) in small white all-caps + 'Contact Us →' on the RIGHT with a small circular arrow icon button → FULL-BLEED CINEMATIC HERO PHOTOGRAPH (close-up of patient receiving dental treatment with teal-scrub dentist + blue-glove hands visible, intimate framing) running edge-to-edge with NO solid overlay, just the photo's natural darker zones carrying the text: BOTTOM-LEFT overlay contains a tiny BLUE 'BEST DENTAL CARE' all-caps tracking-wide label + a 3-LINE bold sentence-case white headline 'Experience Comfortable / Dental Care For A / Brighter Smile' (with the LAST LINE rendered in semi-transparent lighter blue/white for visual layering) + below it a horizontal row containing a WHITE PILL 'Book Appointment →' button + a small inline white text 'Or Call: (303) 9988-7766'; BOTTOM-RIGHT overlay contains a SEMI-TRANSPARENT DARK GLASS CARD ('10K+' huge bold white number + a 2-3 line description 'Our clinic ensures a relaxed and efficient dental journey, making your smile shine without stress or discomfort.') → ABOUT SECTION on white: a SCATTERED TILTED PHOTO COMPOSITION — 4 RECTANGULAR PORTRAIT PHOTOS at the four corners of the section, each ROTATED slightly (-4° / +4° / -3° / +5° random tilts) with soft drop shadow, creating a polaroid-album feeling around a centered text block; the CENTERED TEXT BLOCK contains a tiny BLUE 'About Us' label + bold sentence-case heading 'Compassionate Care, Trusted Expertise.' + description + TWO PILLS (filled blue 'Book Appointment →' + outlined 'About Us') → SERVICES SECTION on light-gray-blue #F5F7F9: LEFT col contains tiny BLUE 'Service' label + bold heading 'Where Every Treatment / Begins With Trust', RIGHT col contains a small description + a filled blue 'View All Service →' pill, BELOW THAT a 2x2 GRID of service cards on the LEFT half (each card: blue '01/', '02/', '03/', '04/' number prefix + bold sentence-case title + muted-gray description, white card with subtle border, no icon) and a LARGE rounded-corner photograph of dental-office equipment spanning the RIGHT half across both grid rows (the photo is the visual anchor for the services block) → DOCTORS SECTION on white: tiny BLUE 'Team' label centered + centered bold sentence-case heading 'Behind Every Smile' + description, then a 3-column DOCTOR CARD ROW with each portrait set against a SOFT TEAL-GREEN ROUNDED RECTANGLE BACKDROP (#C5E2DA, pulled from scrub colors) + bold name below + tiny role label ('Dr. Amelia / Chief Dentist', 'Dr. Sofia Rahman / Cosmetic Dentist', 'Dr. Rafi Putra / Chief Dentist'), centered blue 'Book Appointment →' pill at the bottom → CINEMATIC QUOTE + VIDEO BAND on white: a CENTERED ALL-CAPS BOLD BLOCK QUOTE spanning ~70% width where the FIRST HALF of the quote is rendered in DARK NAVY and the SECOND HALF fades to LIGHT GRAY ('MORE THAN JUST HEALTHY TEETH, WE BELIEVE IN CREATING HAPPY EXPERIENCES. OUR TEAM LISTENS, UNDERSTANDS, AND GUIDES YOU THROUGH EVERY STEP, MAKING SURE YOUR JOURNEY TO A BRIGHTER SMILE FEELS EFFORTLESS AND REASSURING.'), then a FULL-BLEED ROUNDED-CORNER PHOTOGRAPH of dentists treating patient with a WHITE/BLUE TRIANGULAR PLAY BUTTON OVERLAY centered indicating the embedded testimonial-video → TESTIMONIAL SECTION on light-gray-blue: tiny BLUE 'Testimonial' label LEFT + bold heading 'What Our Patients Say' CENTERED + description CENTERED, then a CENTERED 3-COL STAT ROW with HUGE BLUE NUMBERS '10K+ / Smiling Clients', '99% / Treatment Success', '95% / Satisfaction Rate' (numbers above, labels below, no boxes), then a 3-COLUMN ROW of testimonial cards with each card containing: avatar circle + bold name + 'Patient' role at TOP-LEFT, 5 BLACK STAR icons at TOP-RIGHT, and a quote body below — white cards with subtle border → FOOTER: a BLUE GRADIENT BACKGROUND fading from cobalt blue #1A6BFF at the top to lighter sky-blue #7CB5FF at the bottom, with 4-COL CONTENT at the top: COL1 'hello@untucare.com' email link + 'JI. Sukarame No. 21, Indonesia' address + 'Mon-Sat: 08.00 - 20.00' hours + a WHITE PILL 'Book Appointment →' / COL2 'Company' (About Us / Service / Testimonial / Pricing) / COL3 'Social' (Instagram / Linkedin / Facebook / Youtube) / COL4 'Resource' (Blog / Careers / Press Releases); BELOW the columns sits a MASSIVE WHITE WORDMARK 'UNTU CARE' rendered at 200-280px bold all-caps spanning the full footer width and BLEEDING off the bottom edge of the page (only the top half of the letterforms is visible) — this is the design's most editorial-magazine signature moment.",
  signaturePatterns: [
    "TRANSPARENT NAV OVERLAID DIRECTLY ON CINEMATIC HERO PHOTO — no floating pill, no white bar, no glass blur; the nav is just white text floating on top of the full-bleed photograph (logo left, links center, contact button right), giving an editorial-magazine cover feel rather than typical SaaS-app feel",
    "SCATTERED TILTED POLAROID-STYLE PHOTO COMPOSITION in About — 4 rectangular portrait photos placed at the four corners of the section, each ROTATED slightly (-4° / +4° / -3° / +5°) with soft drop shadows, creating a polaroid-album / scrapbook feeling around a centered text block; this is the most distinctive layout signature",
    "NUMBERED SERVICE CARD PREFIXES — each service card has a small blue '01/', '02/', '03/', '04/' label rendered in bold blue above the title (no icon), creating an editorial-numbered-list feel for the services grid instead of typical icon cards",
    "CENTERED ALL-CAPS QUOTE with DARK→LIGHT FADE EMPHASIS — a single block quote between sections where the FIRST HALF of the text is rendered in dark navy and the SECOND HALF fades to light gray, using typographic color rather than weight/italic to emphasize the opening clause; this is a unique typographic centerpiece",
    "MASSIVE BLEEDING FOOTER WORDMARK — the brand name 'UNTU CARE' rendered at ~200-280px bold all-caps in white, spanning the full footer width and BLEEDING off the bottom edge of the page (only the top half of the letterforms visible); a magazine-cover-final-page editorial signature",
    "BLUE-TO-LIGHT-BLUE GRADIENT FOOTER — instead of a solid dark navy footer, this footer uses a cobalt-blue-to-sky-blue gradient (top to bottom) creating an atmospheric premium-clinic feel that pairs with the bleeding wordmark",
    "TINY BLUE ALL-CAPS or SENTENCE-CASE LABELS above every heading — 10-12px tracking-wide blue text ('BEST DENTAL CARE', 'About Us', 'Service', 'Team', 'Testimonial') announcing each section, never the gray of typical labels",
    "SOFT TEAL-GREEN BACKDROP behind doctor portraits — instead of sky-blue (DentLab's choice), this design uses a desaturated greenish-teal #C5E2DA pulled from dentist-scrub colors as the rounded-rectangle backdrop behind each doctor photo, signaling 'medical staff' tonally",
    "DARK GLASS INFO CARD bottom-right of hero — a semi-transparent dark glass card overlaid on the cinematic hero photo containing a huge stat ('10K+') and a description; complements the bottom-left text overlay creating a 2-corner hero composition",
    "CENTERED 3-COL STAT ROW with HUGE BLUE NUMBERS (no boxes) — testimonial section opens with three stats rendered as just typography ('10K+ Smiling Clients', '99% Treatment Success', '95% Satisfaction Rate'), blue numbers above gray labels — no cards, no borders, pure type",
    "INLINE PILL + 'OR CALL' TEXT in hero CTA — instead of two side-by-side pills, the hero pairs a single primary white pill with an inline 'Or Call: (303) 9988-7766' text label to its right, a phone-first medical convention",
    "FULL-WIDTH CINEMATIC VIDEO EMBED with PLAY BUTTON beneath the centered quote — a rounded-corner full-bleed photograph with a white/blue triangular play button overlay positioned centered on it, signaling embedded testimonial/intro video",
    "5-STAR ROW with AVATAR-LEFT in testimonial cards — each white testimonial card has avatar + bold name + 'Patient' role anchored at the TOP-LEFT and 5 black star icons at the TOP-RIGHT, with the quote body below — different from typical centered or top-quote-glyph treatments",
    "ARROW SUFFIX (→) on every CTA pill — every primary blue pill ends with a small white right-arrow ('Book Appointment →', 'View All Service →') creating a branded CTA micro-language",
    "ALTERNATING WHITE / LIGHT-GRAY-BLUE SECTIONS — services + testimonials use a soft #F5F7F9 background while hero/about/team/quote use white, creating gentle section rhythm without harsh dividers",
  ],
  uniqueTechniques: [
    "Scattered tilted polaroid composition as About-section technique — placing 4 portrait photos at the corners of the section with random small rotations and drop shadows around a centered text block creates an editorial-album feel that NO typical medical site uses; this is the design's strongest unique element and signals 'real human stories, not stock photography'",
    "Typographic dark→light fade for quote emphasis — splitting a long block quote so the first half is dark navy and the second half fades to light gray uses pure typographic color (not weight, not italic) to differentiate the opening from the conclusion; this is rare and editorial, and it draws the eye through the quote in a directed way",
    "Bleeding wordmark footer signature — rendering the brand name 'UNTU CARE' at 200-280px in white and BLEEDING it off the bottom edge of the footer transforms the footer from a navigation utility into a magazine-cover-final-page typographic moment, leaving a strong brand impression as the user exits the page",
    "Nav-on-photo with no overlay — placing the navigation directly on top of the cinematic hero photograph with NO solid bar, NO glass blur, NO floating pill is bolder than most medical sites; it requires the photographer to control the top-edge brightness but the editorial payoff is the design feels like a magazine cover rather than a typical clinic landing page",
    "Numbered service cards instead of icon service cards — using '01/' '02/' '03/' '04/' blue bold prefixes above sentence-case service titles signals editorial/curated rather than feature-list/SaaS, and ties the design language to magazine TOC conventions rather than typical 4-icon-grid medical layouts",
    "Teal-scrub-color portrait backdrop — using a soft greenish-teal (#C5E2DA, pulled from real dentist scrub colors) instead of sky-blue or sage as the doctor-card backdrop is a subtle medical-authenticity cue that signals 'real practice' subliminally without ever being didactic about it",
    "Asymmetric services-with-flanking-photo — services live as a 2x2 card grid on the LEFT half with a single tall office-equipment photograph on the RIGHT half, breaking the typical 4-col uniform grid and giving the section a magazine-feature-page feel",
  ],
  spacing:
    "Editorial cinematic generous spacing — sections separated by 96-128px on desktop, content max-width ~1280px with comfortable side gutters, hero is full viewport height, headline-to-body gap 24-32px, card internal padding 28-36px, service card grid gap 16-24px, doctor-card teal-backdrop padding 20-32px around portraits. Image corner-radius 16-24px on photographs, full-rounded pill buttons. The design BREATHES with magazine-quality whitespace; the quote section has 80-120px of vertical room to itself; the bleeding footer wordmark gets the entire bottom of the page as its visual stage. Tilted polaroid photos have small offsets (8-16px overlap) but otherwise float independently.",
  moodKeywords: "editorial, cinematic, premium, magazine, sophisticated, aspirational, polaroid, story-driven, photography-led, boutique-clinic, specialist, modern-medical, refined, calm",
  animations:
    "Cinematic and refined — hero photo has a slow zoom (1.0 → 1.05 over 10s) for ambient life, hero text fades in with stagger (label → headline → CTA, 0.15s delays). Scattered polaroid photos in About: each rotates into final position from a slightly different starting tilt on scroll-in (0.6s ease-out, stagger 0.1s between photos). The dark→light quote fade animates IN as a wipe (gradient mask sliding from left to right over 1.5s) when entering viewport. Service cards stagger fade-up (0.08s between). Doctor cards: hover → photo scale 1.04 + teal backdrop saturates slightly. Stat numbers: count-up animation on scroll-in (0.8s ease-out 0 → target). Pill CTAs: hover → background-darken + arrow translate-x 4px right. Footer wordmark: very slow horizontal drift (1px/s) for ambient motion. Video play button: gentle pulse ring on hover. Overall motion vocabulary stays elegant and editorial — never bouncy, never aggressive.",
  heroTreatment:
    "FULL-BLEED CINEMATIC CLOSE-UP PHOTOGRAPH (intimate dental treatment scene — patient mouth open with clear dentist hands in blue rubber gloves and teal/turquoise scrubs visible, soft natural lighting) running edge-to-edge with NO dark overlay, NO gradient mask, NO solid bar — the photo IS the hero canvas. ABOVE the photo, a MINIMAL TRANSPARENT NAV is overlaid directly on the photograph: 'UNTU CARE' wordmark on the LEFT in white bold all-caps, CENTERED horizontal nav links (HOME / ABOUT US / SERVICE / TESTIMONIAL) in small white all-caps tracking-wide, and on the RIGHT a 'Contact Us' label paired with a small circular arrow icon button. OVERLAID on the photograph: BOTTOM-LEFT positioned content includes a tiny BLUE 'BEST DENTAL CARE' all-caps tracking-wide LABEL + a 3-LINE bold sentence-case white HEADLINE 'Experience Comfortable / Dental Care For A / Brighter Smile' (with the LAST LINE rendered in a slightly more transparent lighter blue/white for layered visual emphasis) + below it a horizontal row containing a WHITE-FILLED PILL 'Book Appointment →' (with small dark-blue arrow) + an inline white text 'Or Call: (303) 9988-7766' to the right of the pill (medical phone-first convention). BOTTOM-RIGHT positioned content includes a SEMI-TRANSPARENT DARK GLASS CARD (~280-320px wide, soft blur, dark fill at ~60% opacity, rounded corners) containing a huge bold white '10K+' stat at the top and a 2-3 line muted-white description ('Our clinic ensures a relaxed and efficient dental journey, making your smile shine without stress or discomfort.') beneath it. The overall feeling is editorial, cinematic, premium-private-clinic — closer to a magazine spread or boutique brand site than a typical local-clinic landing page.",
};

const record = {
  name: "Untu Care Editorial Cinematic Medical",
  industries: [
    "medical",
    "healthcare",
    "dental",
    "dentist",
    "clinic",
    "doctor",
    "hospital",
    "boutique clinic",
    "private clinic",
    "specialist practice",
    "cosmetic dentistry",
    "orthodontist",
    "pediatric dentist",
    "dental clinic",
    "medical spa",
    "premium medical",
    "concierge medicine",
    "wellness clinic",
    "plastic surgery",
    "dermatology",
    "fertility clinic",
    "ivf",
    "aesthetic medicine",
  ],
  moods: [
    "editorial",
    "cinematic",
    "premium",
    "magazine",
    "sophisticated",
    "aspirational",
    "polaroid",
    "story-driven",
    "photography-led",
    "boutique-clinic",
    "specialist",
    "modern-medical",
    "refined",
    "calm",
    "luxury-medical",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Untu Care editorial medical pattern into design_patterns...");

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
