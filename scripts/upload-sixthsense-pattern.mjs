// One-off uploader for the SIXTH SENSE BAR vintage gold-on-black bar/lounge
// pattern. Pure-black + ornate vintage gold #D4AF37 single-accent system,
// ORNATE FILIGREE CROWN EMBLEM logo (a stylized '6' inside a heraldic crown
// with curling filigree scrollwork extending laterally — appears in nav top-
// left + as a CENTERED SECTION-DIVIDER ornament between sections + in the
// footer + on the map pin), tracking-wide all-caps light-serif wordmark
// 'SIXTH SENSE BAR' below the crown emblem, full-bleed dimly-lit warm-amber
// bar/cocktail hero photograph with HEAVY DARK OVERLAY + centered all-caps
// hero title 'SIXTH SENSE BAR' + lorem subtitle + WARM ORANGE-AMBER FILLED
// PILL 'LEARN MORE' CTA, dim ambient bokeh background, CENTERED SECTION
// HEADINGS in tracking-wide all-caps WHITE bold sans + small GOLD SHORT
// HORIZONTAL UNDERLINE BAR beneath each heading (~60-100px gold rule), 4-
// COLUMN LATEST NEWS ROW with date-square LEFT (~52-60px dark-bordered
// square containing day + JAN month abbreviation in 2-line stack) + 2-line
// title+author RIGHT layout per card, OUR EVENTS 2-pane SPLIT with LEFT 50%
// EVENT-LIST PANEL (vertical stack of 2 event entries with date-large +
// title + venue + dotted divider between, plus dark 'EVENT CALENDER' button
// at bottom) + RIGHT 50% layered image stack of party/celebration scene with
// floating event-detail card overlay, GALLERY 4-column image grid (cocktails
// / drinks / bottles / decanter) with subtle border separators between, dark
// outlined 'DISCOVER ALL ITEMS' centered pill button below gallery, WHO WE
// ARE? 2-pane split with LEFT body + 2 GOLD ICON STAT BLOCKS (wine-bottle-
// and-glass icon + clinking-glasses icon, both gold line-art, with tracking-
// wide all-caps lorem stat label below) + RIGHT image showing the bar
// website displayed on a laptop/device frame, CONTACT 2-pane SPLIT with LEFT
// 50% DARK FORM PANEL (1px gold border, First/Last name 2-col + Phone/Email
// 2-col + Message textarea + DARK NAVY 'SEND MESSAGE' filled rectangle) +
// RIGHT 50% TESTIMONIAL CARD (1px gold border, large gold quote glyphs " "
// flanking the gray quote text + 5 GOLD STAR ratings + circular avatar +
// name+role + dot pagination), CENTERED ORNATE FILIGREE CROWN as section-
// divider between contact and footer, DARK FOOTER with 3-col contact info
// (Address / Telephone / Email each with small gold paper-airplane/phone/
// envelope icon prefix) + 'FOLLOW US ON:' label + horizontal row of 4
// VINTAGE-GOLD-OUTLINED SOCIAL ICON PILLS (facebook/twitter/linkedin/
// pinterest in small dark squares with gold-tinted icons inside) + RIGHT
// MAP EMBED with custom gold-themed map pin showing 'SIXTH SENSE' label.
// First pattern for Nightclub / Bar industry — vintage gold-on-black old-
// world bar/lounge/cocktail-bar/whiskey-bar mood (NOT modern minimalist
// craft-cocktail, NOT clubby-neon — this is the speakeasy-classic-bar-with-
// crown-heraldry-and-filigree aesthetic, royal/palace-bar mood).
//
// Run with: node scripts/upload-sixthsense-pattern.mjs

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
  colorPalette: "#0A0A0A, #141414, #1A1A1A, #FFFFFF, #BCBCBC, #6B6B6B, #D4AF37, #B8941F, #E8C566, #DC4B2C",
  colorMode: "dark",
  accentUsage:
    "VINTAGE GOLD-ON-BLACK BAR/LOUNGE palette built on a confident PURE-BLACK + RICH VINTAGE GOLD single-accent system. (1) PURE BLACK #0A0A0A (with very-dark-gray variant #141414) is the primary section background — true dimly-lit speakeasy/lounge black, NOT navy-tinged, NOT charcoal-tinged. (2) SLIGHTLY LIGHTER CHARCOAL #1A1A1A for occasional card layers + form-input bg + footer bg variation. (3) RICH VINTAGE GOLD #D4AF37 (with deeper variant #B8941F for darker contexts + brighter variant #E8C566 for highlights/sparkles) is the SIGNATURE PRIMARY ACCENT — used for: ORNATE FILIGREE CROWN EMBLEM logo (heraldic crown with curling filigree scrollwork extending laterally + stylized '6' inside the crown shield, all in vintage-gold line-art with subtle inner-stroke detail), centered SECTION-DIVIDER ORNAMENT (the same crown emblem repeated as a horizontal ornamental divider with curling filigree extending wider on both sides between sections), 'SIXTH SENSE BAR' wordmark TRACKING-WIDE ALL-CAPS LIGHT-SERIF letterforms in nav (smaller) and below hero crown (larger), SHORT HORIZONTAL GOLD UNDERLINE BARS (~60-100px × 1.5-2px gold rule) BENEATH every centered section heading (LATEST NEWS / OUR EVENTS / GALLERY / WHO WE ARE? / CONTACT / TESTIMONIAL), GOLD ICON LINE-ART for Who-We-Are stat icons (wine-bottle-and-glass, clinking-glasses) + Contact info icons (paper-airplane / phone / envelope) + dot pagination on testimonial card + map pin custom gold-theme, GOLD STAR RATINGS in testimonial (5 vintage-gold stars), GOLD CURLY QUOTE GLYPHS (large vintage-gold opening + closing curly quote marks flanking the testimonial text), GOLD-OUTLINED SOCIAL ICON PILLS in footer (small dark squares with gold-tinted icons inside or vintage-gold borders), GOLD-DOTTED DIVIDERS BETWEEN EVENT LIST ENTRIES (the dotted-line separator in the Our Events left panel between event entries — a thin gold horizontal dotted line). (4) WARM ORANGE-AMBER #DC4B2C is reserved EXCLUSIVELY for ONE element: the hero 'LEARN MORE' FILLED PILL CTA bg — slightly warmer/more orange than the gold (suggests an inviting amber-cocktail glow); this single warm-orange CTA is the design's only chromatic departure from gold + black + white. (5) PURE WHITE #FFFFFF for primary text (centered hero title, section headings, news titles, event titles, 'WHO WE ARE?' heading, contact heading, footer contact label values, footer 'FOLLOW US ON:' label). (6) LIGHT GRAY #BCBCBC for body text and descriptions. (7) MUTED GRAY #6B6B6B for tertiary text (date sub-labels, author bylines, copyright, secondary footer text, time labels). The accent system is STRICTLY single vintage-gold + ONE warm-orange CTA — NEVER multi-color, NEVER bright neon, NEVER modern saturation — the discipline of vintage-gold-only is what gives the design its old-world bar/speakeasy/palace-bar identity.",
  typography:
    "DUAL TYPOGRAPHIC SYSTEM combining: (A) TRACKING-WIDE LIGHT-SERIF/SERIF DISPLAY ALL-CAPS for the wordmark + section headings (vintage signage-style); (B) CLEAN MODERN SANS for body and labels. SPECIFIC PAIRINGS: (1) 'SIXTH SENSE BAR' WORDMARK rendered in TRACKING-WIDE ALL-CAPS LIGHT-SERIF (Cinzel / Playfair Display Light / Cormorant Garamond Bold All-Caps with letter-spacing widely tracked) WHITE — appears in nav top-left in 14-18px AND below the hero crown ornament in 28-40px (much larger). The all-caps + serif + tracking-wide combination evokes vintage signage / engraved menu / speakeasy hand-lettering. (2) HERO MASSIVE CENTERED TITLE 'SIXTH SENSE BAR' (or domain-equivalent venue name) rendered in 36-56px sans bold (700-800) WHITE all-caps with SLIGHT tracking-wide; centered horizontally and vertically on the hero. (3) Section headings 'LATEST NEWS' / 'OUR EVENTS' / 'GALLERY' / 'WHO WE ARE?' / 'CONTACT' / 'TESTIMONIAL' rendered in 28-40px sans bold (700-800) WHITE ALL-CAPS centered, tracking-wide; with a SHORT GOLD HORIZONTAL UNDERLINE BAR (~60-100px × 1.5-2px gold rule) directly below the heading with ~16-24px gap. (4) Hero subtitle (lorem ipsum body) rendered in 14-16px regular sans LIGHT-GRAY #BCBCBC centered 1-2 lines below the hero title. (5) Latest News date squares contain a 2-line stack: large day-number '11' / '12' / '13' / '15' (18-22px sans bold WHITE) + small month abbreviation 'JAN' / 'JAN' / 'JAN' / 'JAN' (10-12px regular WHITE all-caps below the day). (6) Latest News card titles 'Lorem ipsum dummy text' rendered in 14-16px sans medium (500-600) WHITE 2-line wrap. (7) Latest News bylines 'by admin' / 'by editor' / 'by administrator' rendered in 11-13px regular sans MUTED GRAY italic-OR-not below each title. (8) Latest News descriptions 'The quick brown fox jumps over the lazy dog. Lorem Ipsum Dummy text.' rendered in 12-14px regular sans MUTED GRAY 2-line wrap below the byline. (9) Our Events left-panel event-entry structure: TOP a small WARM-AMBER OUTLINED PILL TAG '4 Days Event Ceremony' (~120-140×24-28px transparent fill with 1-2px warm-amber #DC4B2C border + warm-amber text) at the top of the events panel; BELOW per event: small tracking-wide gray date label 'Start: 12 January 2018' / 'Location: Paradeplatz, Zurich' (10-12px regular MUTED GRAY) + bigger tracking-wide ALL-CAPS WHITE event name 'SIXTH SENSE BAR LOREM IPSUM DUMMY TEXT' (14-18px sans bold). (10) Our Events right-pane large date '29 January 2018' rendered in 22-28px sans bold WHITE prominently in the layered image-stack overlay. (11) Discover All Items pill button text rendered in 13-15px sans medium WHITE all-caps with small grid-of-squares icon prefix (~14-16px line-art icon). (12) Who We Are body paragraph rendered in 13-15px regular sans LIGHT-GRAY ~3 lines. (13) Who We Are stat labels '100% DESERUNT MOLLIT ANIM ID EST LABORUM' / 'SUNT IN CULPA QUI OFFICIA SED UT PERSPICIATIS' rendered in 11-13px sans medium WHITE TRACKING-WIDE ALL-CAPS centered below each gold icon (the all-caps tracking-wide treatment turns the lorem stat into vintage-bar engraved-plaque labels). (14) Contact form input placeholders rendered in 13-15px regular sans MUTED GRAY in dark-bordered form fields. (15) Send Message button text rendered in 13-15px sans medium WHITE on DARK NAVY filled rectangle bg. (16) Testimonial quote rendered in 14-16px regular sans LIGHT-GRAY italic-script-feel (slight italic OR a script feel) flanked by LARGE GOLD CURLY OPENING + CLOSING QUOTE GLYPHS (~32-40px gold sans). (17) Testimonial name 'JOHN SMITH' rendered in 14-16px sans bold (700) WHITE TRACKING-WIDE ALL-CAPS centered + role 'Assistant Manager, Pis' rendered in 11-13px regular MUTED GRAY centered below. (18) Footer 'FOLLOW US ON:' label rendered in 13-15px sans bold WHITE TRACKING-WIDE ALL-CAPS. (19) Footer contact info labels 'Physical Address' / 'Telephone' / 'Email' rendered in 13-15px sans medium WHITE + 11-13px regular gray multi-line value below each (with small gold icon prefix to the LEFT of each). NO heavy bold sans for body, NO condensed display anywhere, NO neon-like fonts — strict vintage-engraved tracking-wide-all-caps display + clean-sans body.",
  layout:
    "VINTAGE GOLD-ON-BLACK BAR/LOUNGE flow — pure-black sections throughout with ornate filigree-crown moments serving as decorative section-dividers + centered serif-display all-caps headings with gold underline rules. TOP NAV (overlaid on hero photo, FLOATING-TRANSPARENT bar): LEFT a small ORNATE FILIGREE CROWN EMBLEM LOGO (~80-100px wide containing the heraldic crown with stylized '6' inside + lateral filigree scrollwork in vintage-gold + small SIXTH SENSE BAR wordmark below in tracking-wide all-caps light-serif white), CENTERED nav links 'HOME / NEWS / EVENTS / GALLERY / ABOUT / CONTACT' in 13-15px regular sans WHITE TRACKING-WIDE ALL-CAPS (active link 'HOME' rendered in WARM-AMBER #DC4B2C — the only link colored to indicate active state); the entire nav is INTENTIONALLY EDITORIAL — no inline CTA, no hamburger, just logo + center nav (vintage-bar-website convention) → HERO (full-bleed dimly-lit warm-amber bar/cocktail photo + heavy dark overlay): a full-bleed cinematic photograph of a moody bar interior (e.g. a wine glass with golden-amber wine in foreground + softly-lit ambient bar bokeh background with warm tungsten lights / cocktail glasses on a bar / bottles arranged in a backbar shelf — warm-amber-and-gold lighting palette) running edge-to-edge with a HEAVY DARK GRADIENT OVERLAY (~50-60% opacity black overlay with vignette darker at edges) over the photo to make centered text readable. Content CENTERED both horizontally AND vertically: 36-56px sans bold WHITE TRACKING-WIDE ALL-CAPS hero title 'SIXTH SENSE BAR' (or domain-equivalent venue name), BELOW it ~16-24px gap to a 14-16px regular sans LIGHT-GRAY 1-2 line lorem subtitle, BELOW it ~24-32px gap to a SINGLE WARM-AMBER #DC4B2C FILLED PILL 'LEARN MORE' CTA (~140-160×40-44px, fully-rounded rectangle with white sans medium text). FLOATING centered in the hero ABOVE the title (small ~36-44px) is the SAME ORNATE FILIGREE CROWN EMBLEM in vintage-gold serving as a decorative anchor — the crown ABOVE the title combo evokes royal-bar-heraldry → CENTERED FILIGREE CROWN SECTION-DIVIDER (between hero and Latest News): a CENTERED ORNATE FILIGREE CROWN ORNAMENT (the same crown design but with WIDER LATERAL FILIGREE SCROLLWORK extending ~280-360px on each side of the central crown) in vintage-gold serves as a horizontal ornamental divider; this same crown-divider repeats between major sections throughout the design → LATEST NEWS (black): centered 28-40px sans bold WHITE ALL-CAPS 'LATEST NEWS' heading + GOLD UNDERLINE BAR below (~60-100px × 1.5-2px gold rule); BELOW a 4-COLUMN GRID of NEWS CARDS (each ~280-320×420-480px structure): each card has a FULL-BLEED PHOTO TOP (~280×220-260px square-ish, news-relevant photograph — bar items, glasses, drinks), BELOW the photo a horizontal row containing: LEFT a SMALL DATE-SQUARE (~52-60px dark bg with subtle 1px gold border + 2-line stack: large WHITE bold day-number '11' + small WHITE caps month 'JAN' below) + RIGHT a 2-LINE WHITE sans medium news title 'Lorem ipsum dummy text', BELOW the title row a small italic muted-gray byline 'by admin' + BELOW a 2-line muted-gray description → CENTERED FILIGREE CROWN SECTION-DIVIDER → OUR EVENTS (black, split layout): centered 28-40px sans bold WHITE ALL-CAPS 'OUR EVENTS' + GOLD UNDERLINE BAR; BELOW a SPLIT layout: LEFT 50% column contains an EVENT-LIST PANEL with: TOP a SMALL WARM-AMBER OUTLINED PILL TAG '4 Days Event Ceremony' (~120-140×24-28px transparent fill with 1-2px warm-amber border + warm-amber text), BELOW a VERTICAL STACK of 2 EVENT ENTRIES separated by a HORIZONTAL DOTTED GOLD DIVIDER LINE — each event entry has: small tracking-wide gray date label 'Start: 12 January 2018' + 'Location: Paradeplatz, Zurich' + bigger TRACKING-WIDE ALL-CAPS WHITE event name 'SIXTH SENSE BAR LOREM IPSUM DUMMY TEXT' below + 4-line LIGHT-GRAY description, BELOW the event-entries a DARK 'EVENT CALENDER' OUTLINED PILL/RECTANGLE BUTTON (~140-160×40-44px transparent fill with 1-2px subtle border + WHITE text); RIGHT 50% column contains a LAYERED IMAGE STACK of party/celebration scene (multiple small overlapping party photos arranged with one main centered photograph showing celebration silhouettes + a smaller floating event-detail card overlay showing '29 January 2018' large bold WHITE date + 2-line event location info below) → CENTERED FILIGREE CROWN SECTION-DIVIDER → GALLERY (black): centered 28-40px sans bold WHITE ALL-CAPS 'GALLERY' + GOLD UNDERLINE BAR + 14-16px LIGHT-GRAY 2-line subtitle 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG. LOREM IPSUM DUMMY TEXT.' (small caps tracking-wide); BELOW a 4-COLUMN HORIZONTAL IMAGE GRID (each image ~260-320×260-320px square or slightly wider, full-bleed cocktail/drink/whiskey/decanter photographs) — images sit edge-to-edge with subtle 1-2px dark borders separating them; BELOW the gallery grid a CENTERED OUTLINED 'DISCOVER ALL ITEMS' pill button (~160-180×40-44px transparent fill with 1px subtle white-ish border + WHITE all-caps text + small grid-of-4-squares icon prefix on the left) → WHO WE ARE? (black, split layout): centered 28-40px sans bold WHITE ALL-CAPS 'WHO WE ARE?' + GOLD UNDERLINE BAR; BELOW a SPLIT layout: LEFT 50% column contains: a 3-4 line LIGHT-GRAY body paragraph + BELOW a HORIZONTAL ROW of 2 GOLD ICON STAT BLOCKS (each ~280-320px wide block) — STAT BLOCK 1 has a centered GOLD LINE-ART ICON of WINE-BOTTLE + WINE-GLASS (~52-60px) + below it tracking-wide WHITE all-caps lorem stat label '100% DESERUNT MOLLIT ANIM ID EST LABORUM' (11-13px sans medium); STAT BLOCK 2 has a centered GOLD LINE-ART ICON of CLINKING-GLASSES (~52-60px) + below it 'SUNT IN CULPA QUI OFFICIA SED UT PERSPICIATIS' label; RIGHT 50% column contains an IMAGE showing the bar website displayed on a LAPTOP/DEVICE FRAME (rounded-corner laptop chassis containing a screenshot of the SIXTH SENSE BAR site itself — meta-self-reference showing the design displayed on a device) → CONTACT (black, split layout): centered 28-40px sans bold WHITE ALL-CAPS 'CONTACT' + GOLD UNDERLINE BAR; BELOW a SPLIT layout: LEFT 50% column contains a DARK FORM PANEL (~480-560×360-440px) with 1px GOLD BORDER and ~24-32px internal padding containing: 2-COLUMN ROW of First Name + Last Name input fields (each ~50% width, ~44-52px tall, dark bg with 1px subtle border, gray placeholder), 2-COLUMN ROW of Phone + Email input fields, 1-FULL-WIDTH 'Type your message here...' TEXTAREA (~120-160px tall), and a DARK NAVY/CHARCOAL #1A1A2E FILLED 'SEND MESSAGE' RECTANGLE button (~140-160×40-44px) at the bottom; RIGHT 50% column contains a TESTIMONIAL CARD (~480-560×360-440px) with 1px GOLD BORDER and ~24-32px internal padding containing: TOP centered 22-28px sans bold WHITE all-caps 'TESTIMONIAL' subheading + small gold underline rule, BELOW a LARGE GOLD CURLY OPENING QUOTE GLYPH (~32-40px gold) + multi-line testimonial quote in 14-16px regular sans LIGHT-GRAY italic-script-feel + a LARGE GOLD CURLY CLOSING QUOTE GLYPH on the right side, BELOW the quote a centered row of 5 GOLD STAR RATING glyphs (~14-18px each, with some filled gold and others just gold-outline depending on the rating), BELOW a centered CIRCULAR AVATAR (~52-60px), BELOW the avatar a 14-16px sans bold WHITE TRACKING-WIDE ALL-CAPS name 'JOHN SMITH' + 11-13px regular gray role 'Assistant Manager, Pis' centered below, BELOW the name+role a small horizontal row of 3 DOT pagination indicators (one filled gold + two muted gray) → CENTERED FILIGREE CROWN SECTION-DIVIDER → DARK FOOTER: TOP a horizontal row split into 2 main groups: LEFT a 3-COLUMN CONTACT INFO ROW where each contact-info entry has: SMALL GOLD LINE-ART ICON LEFT (paper-airplane location-pin / phone / envelope, ~28-32px) + RIGHT a 2-line stack of bold WHITE label ('Physical Address' / 'Telephone' / 'Email') + multi-line gray contact value below (each contact entry ~280-320px wide with the 3 entries stacked OR side-by-side); BELOW the contact info row a CENTERED 'FOLLOW US ON:' tracking-wide all-caps WHITE label + a HORIZONTAL ROW of 4 SOCIAL ICON PILLS (each ~36-44px small dark-bg square with rounded 4-6px corners + GOLD-TINTED brand icons inside — facebook / twitter / linkedin / pinterest); RIGHT a MAP EMBED (~480-560×220-260px showing a Zurich-style map view with a CUSTOM GOLD-THEMED MAP PIN containing the SIXTH SENSE BAR ornate-gold mini-logo at the bar's location); BOTTOM a thin horizontal divider line + bottom row '© COPYRIGHT 2017 | ALL RIGHT RESERVED' centered in 11-13px tracking-wide muted-gray ALL-CAPS sans.",
  signaturePatterns: [
    "ORNATE FILIGREE CROWN EMBLEM LOGO + REPEATED AS SECTION-DIVIDER ORNAMENT — the brand uses an ORNATE FILIGREE CROWN EMBLEM (heraldic crown with stylized '6' inside + curling lateral filigree scrollwork) rendered in vintage-gold; the EXACT same crown design appears in: (1) nav top-left as the brand logo, (2) above the hero title as a decorative anchor, (3) BETWEEN every major section as a CENTERED HORIZONTAL ORNAMENTAL DIVIDER (with WIDER lateral filigree extending ~280-360px on each side), (4) in the footer crown section, (5) on the custom map pin; the repetition + filigree treatment is the design's most distinctive identity vocabulary and instantly evokes royal-bar-heraldry / palace-bar / speakeasy aesthetics",
    "TRACKING-WIDE ALL-CAPS LIGHT-SERIF WORDMARK 'SIXTH SENSE BAR' — the venue name is rendered in TRACKING-WIDE ALL-CAPS LIGHT-SERIF letterforms (Cinzel / Playfair Display Light / Cormorant Garamond Bold All-Caps with widely-tracked letter-spacing) WHITE; the all-caps + serif + extreme tracking-wide combination evokes vintage signage / engraved menu / speakeasy hand-lettering — appears identically in nav (small) + below hero crown ornament (much larger) + footer (small)",
    "PURE-BLACK + VIVID VINTAGE-GOLD SINGLE-ACCENT DISCIPLINE — the entire color identity is built on pure-black backgrounds + ONE rich vintage-gold #D4AF37 applied to ALL accents (logo, section-divider ornaments, underline bars below headings, icon line-art, star ratings, quote glyphs, social icon pills, dotted divider lines); the discipline of refusing all secondary accent colors (no neon, no multi-color) is what makes the design feel old-world bar/speakeasy/palace-bar rather than modern-club/cocktail-lounge",
    "WARM-AMBER #DC4B2C 'LEARN MORE' SOLO PILL CTA — ONE element across the entire design departs from gold + black + white: the hero 'LEARN MORE' filled pill CTA bg uses warm-amber #DC4B2C (orangier than gold — suggests an inviting amber-cocktail glow); the single-warm-orange CTA is the design's only chromatic departure and immediately reads as the primary action without competing with the vintage-gold ornamentation",
    "CENTERED ALL-CAPS SECTION HEADINGS WITH SHORT GOLD UNDERLINE BAR BENEATH — every major section heading uses CENTERED 28-40px sans bold WHITE ALL-CAPS text + a SHORT HORIZONTAL GOLD UNDERLINE BAR (~60-100px × 1.5-2px gold rule) directly below with ~16-24px gap; the centered-all-caps + short-gold-rule combination is the design's signature heading vocabulary used identically across LATEST NEWS / OUR EVENTS / GALLERY / WHO WE ARE? / CONTACT / TESTIMONIAL",
    "DATE-SQUARE PREFIX ON LATEST NEWS CARDS — Latest News cards use a horizontal row layout below the photo: SMALL DATE-SQUARE LEFT (~52-60px dark bg with subtle 1px gold border + 2-line stack: large WHITE day-number '11' + small WHITE caps 'JAN' below) + 2-line title RIGHT; the date-square-as-prefix is signature event/news-card-anchor pattern, similar to but distinct from the circular blue date badge in Oraz Music",
    "OUR EVENTS 2-PANE SPLIT WITH EVENT-LIST + LAYERED IMAGE STACK — the Our Events section uses a SPLIT LAYOUT: LEFT 50% column has an EVENT-LIST PANEL with vertical stack of 2 event entries separated by HORIZONTAL DOTTED GOLD DIVIDER LINE + warm-amber outlined pill tag at top + dark 'EVENT CALENDER' button at bottom; RIGHT 50% column has a LAYERED IMAGE STACK with multiple overlapping party/celebration photos and a floating event-detail card overlay showing date + venue info — the editorial-magazine layered image treatment is rare in marketing sites",
    "GOLD ICON STAT BLOCKS for Who-We-Are stats — Who-We-Are body uses 2 GOLD ICON STAT BLOCKS (wine-bottle-and-glass + clinking-glasses, ~52-60px gold line-art icons centered) + tracking-wide ALL-CAPS WHITE lorem stat label below each (11-13px sans medium); the gold-line-art-icon-with-tracking-wide-caps-label gives the stats a vintage-bar engraved-plaque feel rather than a modern-tech metric card feel",
    "CONTACT 2-PANE SPLIT WITH GOLD-BORDER FORM + GOLD-BORDER TESTIMONIAL CARD — the Contact section uses a SPLIT LAYOUT: LEFT 50% column is a DARK FORM PANEL with 1px GOLD BORDER (1+1+1 row layout: First/Last 2-col + Phone/Email 2-col + textarea + dark navy 'SEND MESSAGE' button); RIGHT 50% column is a TESTIMONIAL CARD with 1px GOLD BORDER (centered 'TESTIMONIAL' heading + large gold curly quote glyphs flanking the testimonial text + 5 gold star ratings + circular avatar + name+role + dot pagination); the matching gold-border treatment ties both panels together as 'venue communication' UX",
    "LARGE GOLD CURLY QUOTE GLYPHS FLANKING TESTIMONIAL — the testimonial uses a LARGE GOLD CURLY OPENING QUOTE GLYPH before and a LARGE GOLD CURLY CLOSING QUOTE GLYPH after the testimonial text (~32-40px each in vintage-gold sans); the giant-quote-glyph treatment is editorial-magazine-quality and rare in marketing-site testimonials",
    "5 GOLD STAR RATINGS + CIRCULAR AVATAR + NAME+ROLE + DOT PAGINATION TESTIMONIAL STRUCTURE — testimonial card structure: GOLD QUOTES + QUOTE TEXT + 5 GOLD STARS + CIRCULAR AVATAR + ALL-CAPS NAME + GRAY ROLE + 3 DOT PAGINATION (one gold + two gray); the strict component sequence is signature testimonial-card vocabulary",
    "GOLD-TINTED SOCIAL ICON SQUARES IN FOOTER — the footer 'FOLLOW US ON' row uses 4 SMALL DARK-BG SQUARE PILLS (each ~36-44px with rounded 4-6px corners + GOLD-TINTED facebook/twitter/linkedin/pinterest icons inside); the gold-on-dark-square treatment maintains the vintage-gold discipline + reads as 'engraved bar coaster' aesthetic",
    "FOOTER CONTACT INFO WITH GOLD ICON PREFIX (paper-airplane / phone / envelope) — footer Contact Info row has 3 entries each with a SMALL GOLD LINE-ART ICON LEFT (paper-airplane location-pin / phone / envelope ~28-32px) + bold WHITE label + multi-line gray contact value below; consistent gold-icon + 2-line-text pairing across all 3 contact entries",
    "CUSTOM GOLD-THEMED MAP PIN WITH BAR LOGO — the footer map embed has a CUSTOM GOLD-THEMED MAP PIN at the venue's location showing the SIXTH SENSE BAR ornate-gold mini-logo + 'SIXTH SENSE' label in gold-and-red below; the custom-themed map pin is rare and gives the venue an identity-anchored geographic moment",
    "ACTIVE NAV LINK IN WARM-AMBER — the nav 'HOME' active link is rendered in WARM-AMBER #DC4B2C (the same color as the LEARN MORE CTA) instead of underline/dot/pill; ties the active-state to the primary action color creating UX cohesion (warm-amber = current location + primary action affordance)",
  ],
  uniqueTechniques: [
    "Ornate filigree crown emblem repeated as logo + section-divider + map pin — using the EXACT same heraldic-crown-with-filigree ornament as the brand logo AND as a horizontal section-divider ornament between every major section AND as the custom map pin creates exceptional brand consistency through repetition; transferable to any venue/luxury-brand wanting heraldic identity ornamentation that doesn't feel arbitrary",
    "Single-vintage-gold + single-warm-amber-CTA chromatic discipline — restricting the entire design to PURE-BLACK + VINTAGE-GOLD + ONE WARM-AMBER PRIMARY-ACTION color creates a signature old-world-bar identity that no modern multi-color design can achieve; the warm-amber CTA reads as 'amber cocktail glow' inviting the eye while the gold ornaments do the brand-recognition work; transferable to any venue/luxury context wanting confident chromatic restraint",
    "Tracking-wide all-caps light-serif wordmark for vintage signage — using TRACKING-WIDE ALL-CAPS LIGHT-SERIF letterforms (Cinzel / Playfair Display Light / Cormorant Garamond) for the venue name evokes vintage engraved menu / speakeasy hand-lettering; transferable to any vintage/heritage/old-world brand wanting typographic period-correctness",
    "Centered all-caps section heading + short gold underline bar — using centered 28-40px sans bold WHITE ALL-CAPS section headings + a short ~60-100px × 1.5-2px gold horizontal rule directly below creates vintage-bar editorial-pacing; the short-gold-rule is more refined than full-width dividers + transferable to any vintage/luxury context",
    "Dotted gold divider lines between event-list entries — using a HORIZONTAL DOTTED GOLD DIVIDER LINE between vertically-stacked event entries (instead of solid lines or no dividers) feels like a vintage menu / cocktail card / engraved program separator; transferable to any list-of-items context wanting period-correct separation",
    "Gold-line-art icon stat blocks with tracking-wide caps labels — using GOLD LINE-ART ICONS (wine-bottle / clinking-glasses) + tracking-wide ALL-CAPS WHITE lorem labels below each gives the stats a vintage-bar engraved-plaque feel; transferable to any vintage/heritage venue wanting stat-blocks that don't feel modern-tech",
    "Large gold curly quote glyphs flanking testimonials — placing LARGE GOLD CURLY OPENING QUOTE before and LARGE GOLD CURLY CLOSING QUOTE after the testimonial text (~32-40px each in vintage-gold) gives testimonials editorial-magazine-quality + transferable to any vintage/luxury context wanting elevated testimonial treatment",
    "Custom themed map pin with brand logo — using a CUSTOM GOLD-THEMED MAP PIN containing the brand mini-logo at the venue's location (instead of generic map pin) is a rare premium-brand touch that turns the contact map from utility into identity; transferable to any venue/restaurant/local-business with map embeds",
  ],
  spacing:
    "Vintage gold-on-black bar/lounge spacing — sections separated by 64-96px on desktop with CENTERED FILIGREE CROWN SECTION-DIVIDER ornaments (each ornament ~80-120px tall with ~32-48px breathing room above and below) acting as visual section breaks. Hero is full-viewport with content centered both H + V + ~24-32px between crown ornament and title + 16-24px between title and subtitle + 24-32px between subtitle and CTA. Section centered headings have ~16-24px gap to gold underline rule + ~32-48px gap below to content. Latest News 4-card grid has 16-24px gaps + 16-24px internal vertical spacing per card. Our Events 2-pane split has 32-48px gap between left event-list panel and right layered image stack + 24-32px vertical spacing between event entries (with dotted gold divider). Gallery 4-image grid has 1-2px subtle borders between images (no gaps, edge-to-edge). Who-We-Are 2-pane split has 32-48px gap between body+stats LEFT and image RIGHT + 32-48px horizontal gap between the 2 stat blocks. Contact 2-pane split has 32-48px gap between form panel LEFT and testimonial card RIGHT + 24-32px internal padding inside both gold-bordered cards. Footer contact info row has 24-32px horizontal gap between 3 contact entries + 16-24px gap between social icons. Map embed positioned ~32-48px right of footer contact info. Section centered headings + content gap 24-32px. CTA pill internal padding ~12-16px vertical + ~28-36px horizontal. Crown section dividers add ~64-96px vertical breathing room between major sections. Overall feeling is editorial-vintage-bar — generous-but-disciplined spacing — like a well-set vintage bar where every glass has its place.",
  moodKeywords:
    "vintage, old-world, gold-on-black, bar, lounge, speakeasy, palace-bar, royal, heraldic, crown, filigree, ornate, editorial, dimly-lit, ambient-warm, whiskey-bar, cocktail-bar, wine-bar, tavern, restaurant-bar, hotel-bar, classic, timeless, all-caps-vintage, dark-luxury",
  animations:
    "Vintage editorial motion — hero photo: very slow zoom (1.0 → 1.04 over 14s) for ambient candlelit life. Hero text fade-up: title slides up + fades (0.7s ease-out, y-32px → 0), subtitle fades in (0.4s delay), CTA fades in (0.7s delay). Crown ornament above hero title: subtle continuous pulse (3s ease-in-out brightness 1.0 → 1.08 → 1.0 mimicking candlelight flicker). Section centered headings + GOLD UNDERLINE BAR: heading fades-up + the underline bar DRAWS-IN from center outward (0.6s ease-out width 0% → 100% from center) on scroll-into-view; the draw-in-from-center treatment makes the bar feel like an engraved underline being struck. CENTERED FILIGREE CROWN SECTION-DIVIDERS: fade-in on scroll (0.5s ease-out) + the lateral filigree scrollwork can have a slow stagger reveal (the central crown appears first, then filigree extends outward 0.4s ease-out). Latest News card stagger fade-up (0.1s between cards, 0.5s ease-out, y-24px → 0); hover on card → subtle lift + the date-square subtle scale 1.0 → 1.03 + the gold border on the date-square brightens. Event list entries: stagger fade-up; the WARM-AMBER OUTLINED pill tag has a subtle continuous pulse (1.5s ease-in-out brightness shift). Layered party-image stack: the floating event-detail card fades-in last (0.4s delay) + has a gentle hover float animation (subtle translate-y up-down 4px over 3s ease-in-out). Gallery 4-image grid: stagger fade-in left-to-right (0.06s between, 0.4s ease-out); hover on image → subtle scale 1.0 → 1.03 + slight brightness increase. DISCOVER ALL ITEMS button hover → border brightens + slight scale + the grid icon prefix subtly rotates 90°. Who-We-Are gold icon stat blocks: gold icons fade-in with stagger + a subtle 0.4s rotation pulse on the wine-bottle/clinking-glasses suggesting light glinting off them. Contact form input focus → border ring in gold at low opacity. Send Message button hover → bg darkens slightly + subtle scale. Testimonial gold star ratings: stars stagger-fill-in left-to-right on scroll-into-view (0.08s between each star). Testimonial dot pagination click → active dot transitions horizontally with smooth slide (0.3s ease-out). Warm-amber LEARN MORE CTA hover → slight scale 1.0 → 1.04 + slight darker amber + box-shadow 0 4px 16px amber at 30% opacity (warm amber glow mimicking candlelit cocktail). Footer crown section-divider: same fade+filigree-extend animation. Footer social icon pills: stagger fade-in + hover → slight scale + the gold icon brightens. Custom gold map pin on map: subtle continuous pulse (1.5s ease-in-out scale 1.0 → 1.05 → 1.0) drawing attention. Active nav 'HOME' link: subtle continuous warm-amber color brightness pulse (3s ease-in-out). Logo crown emblem hover (in nav): the entire emblem does a subtle 0.4s rotation pulse (5deg back-and-forth) suggesting royal-seal interaction. Overall motion is candlelit-vintage-deliberate — never bouncy, never aggressive, never fast — the cadence of a classic bar where every motion is intentional.",
  heroTreatment:
    "FULL-BLEED DIMLY-LIT WARM-AMBER BAR/COCKTAIL HERO with heavy dark overlay + crown ornament above title + centered all-caps title + warm-amber CTA. The hero photograph is a moody dimly-lit bar interior cinematic shot (e.g. a wine-glass holding golden-amber wine in foreground with softly-lit ambient bar bokeh background showing warm tungsten lights / cocktail glasses on a polished bar / bottles arranged in a backbar shelf with shallow depth-of-field — warm-amber-and-gold lighting palette throughout, NOT bright daytime, NOT fluorescent — speakeasy/lounge ambient warmth) running edge-to-edge with a HEAVY DARK GRADIENT OVERLAY (~50-60% opacity black overlay with a subtle radial vignette darker at edges) over the photo to make centered text readable while preserving the warm-amber moodiness. NAV (overlaid at the very top of the hero, transparent floating bar): LEFT a small ORNATE FILIGREE CROWN EMBLEM LOGO (~80-100px wide containing the heraldic crown with stylized '6' inside + lateral filigree scrollwork in vintage-gold #D4AF37 + small SIXTH SENSE BAR wordmark below in tracking-wide all-caps light-serif white), CENTERED nav links 'HOME / NEWS / EVENTS / GALLERY / ABOUT / CONTACT' in 13-15px regular sans WHITE TRACKING-WIDE ALL-CAPS (the active link 'HOME' rendered in WARM-AMBER #DC4B2C — only colored link to indicate active state); NO inline CTA, NO right-side buttons — the entire nav is logo + center nav (vintage-bar-website convention). INSIDE the hero, content is CENTERED both horizontally AND vertically (~50% from top): ABOVE the title a small ~36-44px CENTERED ORNATE FILIGREE CROWN EMBLEM in vintage-gold serving as a decorative anchor (the crown ABOVE the title combo evokes royal-bar-heraldry), BELOW the crown ~16-24px gap to a 36-56px sans bold (700-800) WHITE TRACKING-WIDE ALL-CAPS hero title 'SIXTH SENSE BAR' (or domain-equivalent venue name — extra letter-spacing for vintage-engraved feel), BELOW it ~16-24px gap to a 14-16px regular sans LIGHT-GRAY #BCBCBC 1-2 line lorem subtitle ('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor et dolore magna aliqua. Ut enim ad minim veniam, qu' or domain-equivalent venue tagline), BELOW it ~24-32px gap to a SINGLE WARM-AMBER #DC4B2C FILLED PILL 'LEARN MORE' CTA (~140-160×40-44px, fully-rounded rectangle with WHITE sans medium 13-15px text in tracking-wide all-caps). The overall feeling is dimly-lit speakeasy/lounge invitation — the visual equivalent of stepping through the door of a classic bar at golden-hour — vintage warmth + heraldic confidence + minimal modern noise.",
};

const record = {
  name: "Sixth Sense Vintage Gold Bar Lounge",
  industries: [
    "bar",
    "bar lounge",
    "lounge",
    "lounge bar",
    "cocktail bar",
    "cocktail lounge",
    "wine bar",
    "wine lounge",
    "whiskey bar",
    "whiskey lounge",
    "scotch bar",
    "speakeasy",
    "speakeasy bar",
    "vintage bar",
    "classic bar",
    "tavern",
    "pub",
    "british pub",
    "irish pub",
    "sports bar",
    "dive bar",
    "tiki bar",
    "rooftop bar",
    "sky bar",
    "sky lounge",
    "hotel bar",
    "hotel lounge",
    "restaurant bar",
    "wine cellar",
    "champagne bar",
    "martini bar",
    "gin bar",
    "rum bar",
    "tequila bar",
    "mezcal bar",
    "craft cocktail bar",
    "mixology bar",
    "cigar bar",
    "cigar lounge",
    "hookah lounge",
    "shisha lounge",
    "jazz bar",
    "jazz lounge",
    "live music bar",
    "piano bar",
    "karaoke bar",
    "dance club",
    "nightclub",
    "discotheque",
    "private club",
    "members club",
    "social club",
    "country club",
    "gentleman's club",
    "wine tasting room",
    "tasting room",
    "distillery tasting room",
    "brewery taproom",
    "taproom",
    "brewpub",
    "vineyard tasting room",
  ],
  moods: [
    "vintage",
    "old-world",
    "gold-on-black",
    "bar",
    "lounge",
    "speakeasy",
    "palace-bar",
    "royal",
    "heraldic",
    "crown",
    "filigree",
    "ornate",
    "editorial",
    "dimly-lit",
    "ambient-warm",
    "whiskey-bar",
    "cocktail-bar",
    "wine-bar",
    "tavern",
    "restaurant-bar",
    "hotel-bar",
    "classic",
    "timeless",
    "all-caps-vintage",
    "dark-luxury",
    "vintage-bar",
    "speakeasy-classic",
    "premium-bar",
  ],
  color_mode: "dark",
  brief_json: brief,
};

console.log("[upload] Inserting Sixth Sense vintage gold bar/lounge pattern into design_patterns...");

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
