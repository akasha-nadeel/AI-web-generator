// One-off uploader for the TIDAL bold cinematic music streaming pattern.
// Pure-black + vivid signature red #FF0524 single-accent system, TIDAL
// wave-mark logo (small geometric stack of waves/triangles forming a
// stylized 'fan' icon ~24-32px) + tracking-wide 'TIDAL' wordmark, full-bleed
// red-tinted concert/musician hero photo with massive sans bold heading
// stacked LEFT-aligned ('TIDAL LIVE' tiny eyebrow + giant 'Where live /
// happens'), small red-pill 'Download Now' nav CTA top-right, FULL-BLEED
// SOLID RED PROMO BANDS (alternating between black sections — 'Stream your
// favorite songs' headphones banner red bg + 'Brand values' red-tinted
// concert crowd hero), dark sound-quality comparison feature row with
// AUDIO-WAVEFORM RED BAR-GRAPH visualizations above each tier name (Normal /
// Hi-Fi / Master), red-edge-light silhouette-with-headphones HALF-BLEED
// promo card paired with right-side text + CTA, MASSIVE NUMBERED RED STATS
// '1' '2' '3' (160-220px red sans bold) above brand-value cards, SPLIT
// 'Anytime. Anywhere.' card with text LEFT + red-tinted dancing-silhouettes
// photo RIGHT, FAQ 3-column dark grid with centered 'FAQ' bold heading,
// CENTERED TIDAL WAVE-MARK + WORDMARK over red concert crowd as the brand-
// values section keystone, 4-column dark footer with TIDAL wave-mark
// bottom-left + horizontal social icon row bottom-right + cookie/copyright.
// First pattern for Music / Entertainment industry — bold cinematic music-
// streaming-platform mood (NOT generic dark-tech, NOT generic spotify-card —
// this is the high-fidelity premium-streaming editorial brand voice with
// confident single-red-accent discipline).
//
// Run with: node scripts/upload-tidal-pattern.mjs

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
  colorPalette: "#000000, #0A0A0A, #131313, #FFFFFF, #B0B0B0, #6B6B6B, #FF0524, #E50420",
  colorMode: "dark",
  accentUsage:
    "BOLD CINEMATIC MUSIC-STREAMING palette built on a confident SINGLE VIVID RED accent over pure-black backgrounds. (1) PURE BLACK #000000 (with very-dark-gray variant #0A0A0A) is the primary section background — true cinematic theatre black, NOT navy-tinged, NOT charcoal-tinged. (2) SLIGHTLY LIGHTER GRAPHITE #131313 for occasional card layers + footer bg variation, ~5-10% lighter than section bg. (3) VIVID SIGNATURE RED #FF0524 (with slightly deeper variant #E50420 for hover/active) is the SINGLE SIGNATURE ACCENT — used EVERYWHERE: 'TIDAL LIVE' tiny eyebrow label in hero, 'Download Now' nav PILL CTA (small filled red pill top-right), FULL-BLEED RED SOLID PROMO BAND BACKGROUNDS for emotional/marketing sections ('Stream your favorite songs' headphones banner + 'Brand values' tinted concert hero), AUDIO-WAVEFORM RED BAR-GRAPH visualizations above the Normal/Hi-Fi/Master sound-quality tier comparison, RED EDGE-LIGHT GLOW on silhouette-with-headphones promo photos (the silhouettes are lit from behind with vivid red so the head/shoulders glow red against pure black), MASSIVE NUMBERED RED STATS '1' '2' '3' (160-220px sans bold red) above brand-value cards, RED-TINTED CONCERT CROWD HERO PHOTOS (concert-crowd photos with red color-grade overlay applied so the entire image reads in monochromatic red-and-black duotone), RED ARROW/CHEVRON glyphs in supplementary inline links, FOOTER 'TIDAL' tiny tertiary indicator dots (small red dots beside text where present). (4) PURE WHITE #FFFFFF for primary text (massive headings, body bold, brand values cards). (5) LIGHT GRAY #B0B0B0 for body text and descriptions. (6) MUTED GRAY #6B6B6B for tertiary text (FAQ category labels in footer columns, copyright, secondary footer links, eyebrow descriptions). (7) The TIDAL LOGO uses a small TIDAL WAVE-MARK ICON (~24-32px geometric stack of stylized waves/triangles in a 'rising sound waves / wedge fan' arrangement — typically 4-5 small triangular-or-trapezoidal segments stacked from short to tall like a sound-equalizer bar in white) placed TO THE LEFT of the white sans tracking-wide 'TIDAL' wordmark — appears identically in nav (top-left) AND footer (bottom-left, slightly smaller). The accent system is STRICTLY single-color vivid red — NEVER multi-color, NEVER gradient, NEVER teal/cyan/orange secondary — the discipline of single-red identity is what makes it feel premium-streaming-platform cinematic rather than chaotic.",
  typography:
    "BOLD MODERN SANS as the entire typographic system — Inter / Plus Jakarta Sans / Manrope / DM Sans at 700-900 weight for all major headings, 400-500 for body and labels. SPECIFIC PAIRINGS: (1) HERO MASSIVE LEFT-ALIGNED HEADING in 56-96px sans bold (700-900) WHITE — TWO LINES typically: line 1 'Where live' + line 2 'happens' (or domain-equivalent two-line statement); preceded by a tiny tracking-wide RED ALL-CAPS eyebrow 'TIDAL LIVE' (12-14px) ABOVE the heading. (2) Major emotional section headings like 'Stream your favorite songs' / 'Elevate your sound' / 'Discover innovative audio formats' / 'Anytime. Anywhere.' / 'FAQ' / 'Brand values' rendered in 36-64px sans bold (700-800) WHITE (centered or left-aligned depending on the section); 'Anytime. Anywhere.' uses a stacked 2-line format with each word on its own line; sentence-case throughout (NOT all-caps) except for the 'FAQ' acronym which is naturally all-caps. (3) Sound-quality tier labels 'Normal' / 'Hi-Fi' / 'Master' rendered in 24-32px sans bold (700) WHITE + tiny gray bitrate sub-label below (e.g. '160 kbps' / '1411 kbps' / '2304 - 9216 kbps' — exact text varies). (4) MASSIVE NUMBERED RED STATS '1' / '2' / '3' rendered in 160-220px sans bold (800-900) VIVID RED #FF0524 — these are the design's most arresting typographic moment, looming above each brand-value card. (5) Brand-value card titles 'Superior Sound Quality' / 'Deeper Connection with Fans' / 'Commitment to the Art' rendered in 16-20px sans bold (700) WHITE below the giant red number. (6) Brand-value card descriptions 14-16px regular sans LIGHT-GRAY 2-3 line. (7) Promo banner sub-heading text 'Get the ultimate music experience with a library of over 100 million songs and 650,000 videos.' rendered in 14-16px regular sans WHITE (NOT red — sits centered on the red banner bg). (8) Section-eyebrow descriptions rendered in 14-16px regular sans LIGHT-GRAY centered below major headings. (9) Footer column headings 'GET STARTED' / 'DISCOVER US' / 'ACCOUNT' / 'COMPANY' rendered in 14-16px sans bold (700) WHITE TRACKING-WIDE all-caps (the only place all-caps is used apart from the small RED 'TIDAL LIVE' eyebrow). (10) Footer link items 'Download TIDAL' / 'Pricing & Plans' / 'About TIDAL' rendered in 13-15px regular sans LIGHT-GRAY. (11) Body paragraphs 14-16px regular sans LIGHT-GRAY with comfortable line-height ~1.55-1.65. (12) FAQ question titles 'Can I try TIDAL free of charge?' / 'Does Hifi work with mobile bandwidth?' rendered in 14-16px sans bold (600) WHITE + below it a multi-line gray answer paragraph. (13) Nav links 'About TIDAL' / 'Support' rendered in 13-15px regular sans WHITE (no all-caps for nav, no underlines). (14) TIDAL wordmark 'TIDAL' rendered in tracking-wide bold sans WHITE (~16-22px) — appears in nav top-left, in keystone brand-values centered logo block (much larger ~48-64px), and in footer bottom-left (small ~14-18px). NO italic, NO serif, NO condensed display — strict bold-modern sans throughout (premium-streaming-platform-editorial voice).",
  layout:
    "BOLD CINEMATIC MUSIC-STREAMING flow — alternating PURE BLACK sections with occasional FULL-BLEED RED PROMO BANDS for marketing/emotional sections. TOP NAV (overlaid on hero photo or on dark sections): TIDAL LOGO LEFT (small white wave-mark icon + tracking-wide 'TIDAL' wordmark, ~120-140px wide), CENTERED-RIGHT-ish nav links 'About TIDAL / Support' in 13-15px white sans (small minimal nav, only 2 links), RIGHT a SMALL FILLED RED PILL CTA 'Download Now' (~120-140×36-40px, vivid red bg, white text, fully-rounded) → HERO (full-bleed red-tinted concert/musician photo): a full-bleed cinematic photograph (a silhouette of a musician with guitar against a dramatic deep-red back-lit stage, or a back-shot crowd at a concert with a 'HANGOUT'-style stage banner visible in the background) running edge-to-edge with an overlaid RED COLOR-GRADE TINT giving the photo a monochromatic red-and-black duotone look. Content LEFT-aligned starting around 6-8% from the left edge and VERTICALLY CENTERED-LOWER (~55-65% down): TINY TRACKING-WIDE RED ALL-CAPS EYEBROW 'TIDAL LIVE' (12-14px), BELOW it a MASSIVE 56-96px SANS BOLD WHITE 2-LINE LEFT-ALIGNED HEADING 'Where live / happens' (or domain-equivalent — typically a 2-3 word phrase per line), BELOW it a 14-16px regular sans WHITE 1-line subtitle 'Experience music in real-time with others.' On the RIGHT side of the hero a small CIRCULAR LIVE BADGE (small ~80-100px white-bordered circle containing the TIDAL wave-mark + a tiny 'LIVE' label, positioned floating over the photo) appears as a content-anchor ornament → PROMO BAND #1 — STREAM YOUR FAVORITE SONGS (FULL-BLEED VIVID RED #FF0524): a horizontal solid-red full-bleed band (~280-360px tall) with content split: LEFT 65% column has CENTERED 36-56px sans bold WHITE 2-line stacked heading 'Stream your / favorite songs' + below it a 14-16px regular WHITE 2-line subtitle 'Get the ultimate music experience with a library of over 100 million songs and 650,000 videos.'; RIGHT 35% column shows a LARGE BLACK HEADPHONES PRODUCT PHOTO (~280-360px wide, isolated black headphones photograph cut out so it floats against the red bg) → ELEVATE YOUR SOUND COMPARISON (dark): centered 36-56px sans bold WHITE heading 'Elevate your sound' + centered 14-16px gray 2-line subtitle 'With our lossless audio experience and high-fidelity sound quality, stream music like you've never heard it before. No compromises. Just pure sound.'; BELOW a 3-COLUMN HORIZONTAL FEATURE COMPARISON ROW with each column containing TOP-DOWN: AUDIO-WAVEFORM RED BAR-GRAPH VISUALIZATION (~120-160px tall × column-width-ish, displaying ~30-50 vertical bars of varying heights in vivid red on black, showing as a sound-equalizer or waveform — each tier 'Normal' has shorter bars indicating lower fidelity, 'Hi-Fi' has medium bars with more variation, 'Master' has the most varied tall bars indicating high fidelity), BELOW the waveform a tier name 'Normal' / 'Hi-Fi' / 'Master' bold WHITE (24-32px), tiny gray bitrate sub-label '160 kbps' / '1411 kbps' / '2304 - 9216 kbps', BELOW a 4-line gray description paragraph; columns separated by ~80-120px gaps; the TOP and BOTTOM of this section have THIN HORIZONTAL RED LINE DIVIDERS spanning full width (~2-3px solid red) → DISCOVER INNOVATIVE AUDIO FORMATS PROMO (split half-bleed): a wide horizontal section split LEFT 50% / RIGHT 50%: LEFT half is a HALF-BLEED RED-EDGE-LIT SILHOUETTE PHOTO of a person wearing headphones in profile, lit from behind with vivid red so the silhouette glows in red against pure-black bg (the silhouette face/headphones outline appears red-glowing); RIGHT half is dark with content: 36-56px sans bold WHITE 2-line heading 'Discover innovative / audio formats', BELOW it 14-16px regular gray 1-line subtitle 'Add new dimension to your music.' → BRAND VALUES (FULL-BLEED RED-TINTED CONCERT CROWD HERO + dark below): top portion is a FULL-BLEED concert-crowd cinematic photograph with red color-grade overlay (a tilted-up shot of a concert crowd with hands-raised silhouettes against deep-red stage lights), CENTERED on this top portion is a KEYSTONE BRAND BADGE composed of: a LARGE WHITE TIDAL WAVE-MARK ICON (~80-120px) ABOVE a LARGE 'TIDAL' wordmark (48-64px tracking-wide bold sans white) BELOW a centered 14-16px regular WHITE 2-line description 'We are a global music streaming platform that brings fans closer to artists through unique experiences and the highest sound quality.'; BELOW the keystone-band on dark bg: a centered 36-56px sans bold WHITE heading 'Brand values' + BELOW it a 3-COLUMN ROW of BRAND VALUE BLOCKS where each block has TOP-CENTERED a MASSIVE 160-220px VIVID RED SANS BOLD NUMBER ('1' / '2' / '3') + BELOW the number a smaller 16-20px sans bold WHITE tier title ('Superior Sound Quality' / 'Deeper Connection with Fans' / 'Commitment to the Art') + BELOW the title a 3-4 line regular gray description → ANYTIME ANYWHERE SPLIT (dark, full-width split): LEFT 40% column is dark with content: 36-56px sans bold WHITE STACKED 2-LINE heading 'Anytime. / Anywhere.' (each word on its own line, period included), BELOW it 14-16px regular gray 3-line description 'Listen on your terms on any device, whether you're offline, off-the-beaten path, at home or in the car.'; RIGHT 60% column is a HALF-BLEED RED-EDGE-LIT photograph of two dancing silhouettes (concert/festival energy with raised hands, lit from behind with vivid red so the figures glow in red against pure-black bg) → FAQ (dark): centered 36-56px sans bold WHITE 'FAQ' heading + below it a 3-COLUMN GRID of FAQ blocks (each ~360-440×120-160px) where each block contains: TOP a 14-16px sans bold WHITE question 'Can I try TIDAL free of charge?' / 'Does Hifi work with mobile bandwidth?' / 'Can I import my playlists from other streaming services I use?', BELOW a 4-6 line gray answer paragraph; columns separated by ~80-120px horizontal gap → DARK FOOTER: TOP a 4-COLUMN GRID — COL1 'GET STARTED' tracking-wide bold WHITE all-caps heading + vertical text-link list ('Download TIDAL / Pricing & Plans / Get Support'); COL2 'DISCOVER US' bold heading + vertical list ('About TIDAL / TIDAL Rising / Behind The Beats'); COL3 'ACCOUNT' bold heading + vertical list ('Sign Up / Log In / Manage Account'); COL4 'COMPANY' bold heading + vertical list ('Partners / Careers / Press'); BOTTOM a horizontal divider line + bottom row: BOTTOM-LEFT a small TIDAL wave-mark icon + small '© 2026 Aspiro AB' copyright in muted gray sans + BOTTOM-RIGHT a horizontal row of 5 SOCIAL ICONS in small white outline (facebook / instagram / x / youtube / tiktok), with ~12-16px gap between each icon.",
  signaturePatterns: [
    "PURE BLACK + SINGLE VIVID RED #FF0524 single-accent discipline — the entire color identity is built on pure-black backgrounds + ONE vivid signature red applied to ALL accents (eyebrow labels, nav CTA pill, full-bleed promo bands, audio-waveform visualizations, edge-light photo glow, MASSIVE numbered stats, photo color-grade tints, social brand-value markers); the discipline of refusing all secondary accent colors (no blue, no orange, no gradient) is what makes the design feel premium-streaming-platform cinematic rather than generic-dark-tech",
    "TIDAL WAVE-MARK ICON + TRACKING-WIDE WORDMARK LOGO — the brand uses a small WHITE WAVE-MARK ICON (~24-32px geometric stack of 4-5 stylized triangular/trapezoidal segments arranged in a 'rising sound waves / wedge fan' formation suggesting equalizer bars or sound waves) placed to the LEFT of a tracking-wide bold sans 'TIDAL' wordmark; the wave-mark + wordmark appears identically in nav (top-left), as the keystone centered brand-values section logo (much larger), and in the footer bottom-left (small)",
    "FULL-BLEED VIVID RED PROMO BANDS alternating with pure-black sections — the design uses occasional FULL-BLEED solid-red horizontal banner sections (e.g. 'Stream your favorite songs' headphones banner, brand-values keystone red-tinted concert photo) breaking up the dark rhythm; the alternating pure-black + vivid-red bands create a rhythm that reads as 'editorial magazine spread' rather than uniform-dark-page",
    "AUDIO-WAVEFORM RED BAR-GRAPH VISUALIZATIONS for sound-quality tier comparison — the Elevate-Your-Sound section uses 3 columns each containing a vertical 30-50-bar AUDIO WAVEFORM visualization (vivid red bars on black, varying heights showing as a sound-equalizer or waveform pattern) ABOVE each tier name (Normal / Hi-Fi / Master); the bar-counts and bar-height-variation actually communicate fidelity (Normal = shorter+simpler / Master = tallest+most-varied) — the waveform IS the visual data, not just decoration",
    "RED EDGE-LIGHT SILHOUETTE PHOTOGRAPHY — promotional photographs use SILHOUETTES (people, dancers, headphones-wearer) lit from BEHIND with vivid red light so the subject glows in red against pure-black background; this red-edge-light treatment is the design's most cinematic visual technique and is repeated in the headphones-wearer half-bleed promo + the 'Anytime. Anywhere.' dancing-silhouettes split + the hero's red-tinted concert photography",
    "MASSIVE NUMBERED RED STATS '1' '2' '3' as brand-value section anchors — the brand-values section uses MASSIVE 160-220px VIVID RED sans bold numbers ('1' / '2' / '3') rendered ABOVE each brand-value card title; the numbers function as both 'sequence indicator' AND 'visual section anchor' — the giant red numerals are the design's most arresting typographic moment and instantly read as 'this is important, here are 3 things to remember'",
    "RED COLOR-GRADE OVERLAY ON CONCERT/CROWD PHOTOGRAPHS — the design's main hero photographs (concert/musician/crowd shots) all receive a UNIFIED RED COLOR-GRADE TINT applied as an overlay so the photos read as monochromatic red-and-black duotone rather than full-color; this consistent treatment unifies the entire design's photography vocabulary into one cohesive cinematic visual language and removes any incidental color noise from the photos",
    "KEYSTONE CENTERED BRAND BADGE on red-tinted concert hero — the brand-values section uses a CENTERED KEYSTONE BRAND BADGE composed of: large WHITE TIDAL WAVE-MARK ICON ABOVE the large 'TIDAL' wordmark BELOW a centered 2-line description; this 'logo-as-section-keystone' is the design's most editorial-cinematic moment and communicates brand-as-anchor of the philosophy section",
    "MINIMAL 2-LINK NAV + RED 'DOWNLOAD NOW' PILL — the top nav uses just 2 nav links 'About TIDAL / Support' (in white sans) + a small filled red pill CTA 'Download Now' RIGHT; this extreme minimalism reads as premium-confident — the marketing weight is carried by the hero photo + giant heading, not by nav links",
    "STACKED 2-LINE HEADINGS WITH PERIODS — major headings often use STACKED 2-LINE format with each line containing 1-2 short words AND a period included ('Anytime. / Anywhere.' / 'Where live / happens' / 'Stream your / favorite songs' / 'Discover innovative / audio formats'); the period treatment as a typographic moment (rare in marketing-site headings) gives statements editorial-confidence finality",
    "TINY TRACKING-WIDE RED ALL-CAPS EYEBROW LABELS — the hero uses a tiny 12-14px tracking-widest RED ALL-CAPS eyebrow 'TIDAL LIVE' ABOVE the massive heading; the red-eyebrow + white-massive-heading combo is the design's most signature heading entry-treatment",
    "HALF-BLEED PROMO PHOTO PAIR (split layout with photo half-bleeding into dark) — promo sections like 'Discover innovative audio formats' and 'Anytime. Anywhere.' use a HALF-BLEED layout where one HALF of the section is a red-edge-lit photograph and the OTHER HALF is dark with text + heading; the half-bleed photo + dark-text split is repeated and creates rhythm without breaking the color discipline",
    "FOOTER WITH SMALL TIDAL WAVE-MARK + 5-SOCIAL-ICONS HORIZONTAL ROW — the dark footer ends with: bottom-left a small TIDAL wave-mark + copyright text + bottom-right a horizontal row of 5 SOCIAL ICONS (facebook / instagram / x / youtube / tiktok) in small white outline; the horizontal social-icons row + wave-mark-as-bottom-anchor is the design's distinctive footer signature",
    "HORIZONTAL THIN RED LINE DIVIDERS at section TOP and BOTTOM of comparison row — the Elevate-Your-Sound 3-column comparison section is bookended by THIN HORIZONTAL RED LINE DIVIDERS (~2-3px solid red) spanning full width at both top and bottom; the red-line-bookend treatment is rare and gives the comparison section additional architectural definition",
    "FAQ AS 3-COLUMN HORIZONTAL TEXT GRID (not accordion) — the FAQ section uses a 3-COLUMN HORIZONTAL GRID of question-and-answer text blocks (no accordion, no expand/collapse, all answers visible simultaneously); this answers-always-visible approach is more confident than accordion-based FAQs and respects user time",
  ],
  uniqueTechniques: [
    "Pure-black + single-vivid-red discipline as cinematic music-streaming identity — refusing all secondary accent colors (no orange, no blue, no purple, no gradient) in favor of a single vivid red #FF0524 across every CTA + label + visualization + photo color-grade is the design's most powerful identity choice; the discipline is what makes a music-streaming platform feel like 'premium high-fidelity cinema' rather than 'consumer app dashboard'",
    "Red color-grade tint on all photography for unified visual language — applying a unified RED color-grade overlay to every concert/musician/crowd photograph throughout the site (so all photos read as monochromatic red-and-black duotone) creates a unified cinematic visual language that no full-color marketing-site can achieve; the technique works for any music/film/entertainment brand wanting to elevate stock photography to brand-cohesive editorial",
    "Audio-waveform red bar-graph as comparative visual data — using a 30-50-bar VIVID RED audio-waveform visualization above each sound-quality tier (Normal / Hi-Fi / Master) where the BAR HEIGHTS AND VARIATION actually communicate fidelity (shorter bars = lower fidelity / taller varied bars = higher fidelity) makes the visualization function as DATA, not decoration; transferable to any quality-tier-comparison context (subscriptions, pricing, performance levels)",
    "Red edge-light silhouette photography for promo sections — silhouettes of people lit from BEHIND with vivid red light so the subject glows red against pure-black background creates the design's most cinematic visual moments; this back-lit-silhouette technique reduces every photo to two colors (black + red) and works perfectly for any music/concert/entertainment context where shape + emotion matters more than detail",
    "Massive 160-220px red numbered stats above brand-value cards — using MASSIVE 160-220px sans bold red numerals ('1' / '2' / '3') ABOVE each card title in a 3-step value-proposition section instantly reads as 'numbered manifesto' and gives the section visual weight that a typical card grid never achieves; the numerals function as anchors AND ornaments simultaneously",
    "Stacked 2-line headings with periods — using STACKED 2-LINE format with periods included ('Anytime. / Anywhere.' / 'Where live / happens') treats the heading as multiple statements rather than one phrase; the period gives each line editorial-confident finality and is rare in marketing-site headings — works for any premium brand wanting heading restraint with personality",
    "Keystone centered brand badge on red-tinted hero — placing the LARGE WHITE WAVE-MARK + WORDMARK + DESCRIPTION centered on a red-tinted concert hero photograph turns the brand mark into the visual keystone of the brand-values section; this 'logo-as-section-anchor' on a cinematic photo is more editorial than typical 'about us' card layouts and works for any brand wanting to assert mission visually",
  ],
  spacing:
    "Bold cinematic music-streaming spacing — sections separated by 96-160px on desktop, content max-width ~1280-1440px with comfortable side gutters, headline-to-body gap 24-40px. Hero is full-viewport with content vertically-centered-lower (~55-65% down) + ~80-120px from left edge. Full-bleed red promo bands have 80-120px vertical internal padding. Elevate-Your-Sound 3-column comparison has 80-120px gaps between columns + ~32-48px gap between waveform and tier name + ~16-24px gap between tier name and bitrate sub-label + ~24-32px gap between bitrate and description. Discover-Innovative-Audio-Formats half-bleed has the photo at exactly 50% of section width + ~80-120px gap between text and right-edge-of-photo. Brand-values 3-column row has 80-120px gaps between columns + ~32-48px gap between massive red numeral and card title + ~16-24px gap between title and description. Anytime-Anywhere split has the photo at exactly 60% of section width + ~80-120px gap between text and left-edge-of-photo. FAQ 3-column grid has 80-120px column gaps + ~24-32px gap between question and answer. Footer 4-column grid 32-48px column gaps + 16-24px internal vertical spacing. Section eyebrow heading + content gap 24-32px. CTA pill internal padding ~12-16px vertical + ~24-32px horizontal. Overall feeling is generous editorial-magazine spaciousness — never cramped, never sparse — the spacing of a confident premium-streaming-platform editorial campaign.",
  moodKeywords:
    "dark, cinematic, bold, premium, music-streaming, hi-fi, editorial, single-color-accent, vivid-red, brand-confident, entertainment, music-platform, audiophile, streaming-service, monochromatic, duotone, concert, live-music, red-and-black, music-industry, audio-quality, premium-audio",
  animations:
    "Cinematic editorial motion — hero photo: very slow zoom (1.0 → 1.04 over 14s) for ambient life + the red color-grade tint subtly intensifies on initial paint (0.6s ease-out fade-in from 0% → final tint). Hero text staggered fade-in: tiny RED 'TIDAL LIVE' eyebrow fades in first (0.4s), then massive 2-line headline slides up 32px → 0 with 0.15s delay (0.6s ease-out), then subtitle fades in (0.8s delay). Floating LIVE badge on hero: subtle continuous pulse (1.5s ease-in-out brightness 1.0 → 1.1 → 1.0 + scale 1.0 → 1.02 → 1.0). Full-bleed RED promo bands: subtle entrance treatment — when scrolling into view, the red bg crossfades-in from black to red (0.6s ease-out) creating a 'reveal' moment, while the heading text simultaneously fades-up. Audio-waveform red bar-graph: each bar animates HEIGHT from 0 → final height with stagger left-to-right (0.05s between bars, 0.4s ease-out per bar) creating an equalizer-bouncing-into-life effect; on hover individual bars can pulse subtly. Red edge-light silhouette photos: very subtle RED-GLOW PULSE on the silhouette (1.5s ease-in-out, the red back-light glow brightness shifts 1.0 → 1.08 → 1.0 indefinitely creating an ambient stage-light feel). Discover-Innovative-Audio-Formats split: photo half-bleeds-in from left (0.6s ease-out, x-32px → 0 + opacity), text fades-up on right (0.5s delay). Brand-values massive red numbers: sequence stagger fade-in (0.15s between each number, 0.6s ease-out, scale 0.95 → 1.0 + opacity 0 → 1) — the numbers feel like they're being declared one by one. Anytime-Anywhere split: 'Anytime.' line fades-in first (0.5s ease-out), 'Anywhere.' line fades-in with 0.2s delay (felt like a beat between statements), photo half-bleeds-in from right (0.5s delay). FAQ 3-column blocks: stagger fade-up (0.1s between, 0.5s ease-out). Section thin RED LINE DIVIDERS: line draws-in from left to right (0.7s ease-out path-draw) when section enters viewport. Red 'Download Now' pill CTA: hover → slight scale 1.0 → 1.05 + brightness shift to deeper red + box-shadow 0 4px 16px red at 30% opacity (red glow). Nav links hover → underline-from-left expands (0.3s ease-out width 0% → 100% from left). Footer social icons hover → red color shift + scale 1.0 → 1.1. Wave-mark icon hover (in nav/footer): individual wave bars stagger pulse (0.08s between, 0.3s ease-out brightness 1.0 → 1.4 → 1.0). Overall motion is cinematic-confident-deliberate — never bouncy, never aggressive, never fast — every animation is the cadence of a premium music platform: pulsing, glowing, fade-up, draw-in.",
  heroTreatment:
    "FULL-BLEED CINEMATIC RED-TINTED CONCERT/MUSICIAN HERO with tiny tracking-wide RED ALL-CAPS eyebrow + MASSIVE 2-line stacked white sans bold heading + minimal nav + small red CTA pill. The hero photograph is a dramatic cinematic concert/musician shot (a silhouette of a guitarist against a deep-red stage back-light, OR a back-shot of a concert crowd with arms raised against a stage with visible 'HANGOUT' or band-name backdrop, OR a close-up of an artist on stage in red lighting) running edge-to-edge with a UNIFIED RED COLOR-GRADE TINT applied as an overlay so the photo reads as a MONOCHROMATIC RED-AND-BLACK DUOTONE (every full-color photo gets this treatment for unified visual language). NAV (overlaid on hero photo): TIDAL LOGO LEFT (small ~24-32px white WAVE-MARK ICON — geometric stack of 4-5 stylized triangular/trapezoidal segments arranged in a 'rising waves / wedge fan' formation suggesting equalizer bars — + tracking-wide bold sans 'TIDAL' wordmark beside it in white), CENTERED-RIGHT-ish nav links 'About TIDAL / Support' in 13-15px regular white sans (extreme minimalism — only 2 links), RIGHT a small FILLED RED PILL CTA 'Download Now' (~120-140×36-40px, vivid red #FF0524 bg, white sans medium text, fully-rounded). INSIDE the hero, content is LEFT-ALIGNED starting around 6-8% from the left edge and VERTICALLY CENTERED-LOWER (~55-65% down): TINY TRACKING-WIDE RED ALL-CAPS EYEBROW 'TIDAL LIVE' (12-14px regular vivid-red sans, tracking-widest), BELOW it ~12-16px gap to a MASSIVE 56-96px sans bold (700-900) WHITE 2-LINE STACKED LEFT-ALIGNED HEADING 'Where live / happens' (or domain-equivalent — typically 2-3 short words per line with optional period), BELOW it ~24-32px gap to a 14-16px regular sans WHITE 1-line subtitle 'Experience music in real-time with others.' On the RIGHT side of the hero (around the right 25-30% area, vertically anchored center) a SMALL CIRCULAR LIVE BADGE (~80-100px white-bordered circle containing a small TIDAL wave-mark icon in the center + a tiny 'LIVE' label below the wave-mark in tracking-wide red small caps) floats over the photo as a content-anchor ornament. The overall feeling is bold cinematic premium-music-streaming — confident, dramatic, brand-asserting, single-color-disciplined — the visual equivalent of opening a high-end music documentary or concert-film title sequence.",
};

const record = {
  name: "Tidal Bold Cinematic Music Streaming",
  industries: [
    "music",
    "music streaming",
    "music platform",
    "music service",
    "music app",
    "audio streaming",
    "audio platform",
    "music subscription",
    "music label",
    "record label",
    "music industry",
    "music distribution",
    "music publisher",
    "music production",
    "production company",
    "audio production",
    "studio",
    "recording studio",
    "music studio",
    "podcast platform",
    "podcast network",
    "podcast service",
    "audiobook platform",
    "live music",
    "live streaming",
    "live music platform",
    "concert platform",
    "concert promoter",
    "music festival",
    "music festival platform",
    "entertainment",
    "entertainment platform",
    "entertainment service",
    "entertainment industry",
    "media",
    "media platform",
    "media streaming",
    "video streaming",
    "video platform",
    "film studio",
    "film production",
    "movie streaming",
    "tv streaming",
    "broadcasting",
    "radio",
    "radio station",
    "online radio",
    "dj agency",
    "dj platform",
    "artist platform",
    "artist management",
    "talent agency",
    "music technology",
    "music tech",
    "audio technology",
    "audio equipment",
    "headphones brand",
    "audio gear",
    "high fidelity audio",
    "audiophile",
    "premium audio",
    "lossless audio",
  ],
  moods: [
    "dark",
    "cinematic",
    "bold",
    "premium",
    "music-streaming",
    "hi-fi",
    "editorial",
    "single-color-accent",
    "vivid-red",
    "brand-confident",
    "entertainment",
    "music-platform",
    "audiophile",
    "streaming-service",
    "monochromatic",
    "duotone",
    "concert",
    "live-music",
    "red-and-black",
    "music-industry",
    "audio-quality",
    "premium-audio",
    "dark-cinematic",
    "high-fidelity",
  ],
  color_mode: "dark",
  brief_json: brief,
};

console.log("[upload] Inserting Tidal bold cinematic music streaming pattern into design_patterns...");

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
