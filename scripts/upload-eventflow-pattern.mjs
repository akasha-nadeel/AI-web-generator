// One-off uploader for the EVENTFLOW vibrant nightlife events pattern.
// Dark navy-black + vivid purple→pink gradient as the signature accent
// system, gradient-pill CTAs ('Buy Ticket →' with purple#8B5CF6→pink#E91E63
// gradient + small → arrow), hot-pink ALL-CAPS tracking-wide section labels
// ('EVENT SCHEDULE' / 'STATS' / 'MUSIC' / 'GALLERY'), day-tab pill selector
// with hot-pink filled ACTIVE state + tiny downward triangle pointer, dark
// rounded event row cards with photo-LEFT + content-MIDDLE + circular-icon
// time/address + Buy-Ticket-pill RIGHT, upcoming events vertical photo cards
// with thin hot-pink solid underline at the bottom edge, MASSIVE hot-pink
// stats numbers ('457' / '17' / '780' / '45' at 80-120px) with small white
// labels below, dark rounded music track rows with circular pink play button
// on the right, irregular bento 5+4 photo gallery mosaic, FULL-BLEED PURPLE
// →PINK GRADIENT NEWSLETTER BANNER, dark footer with subtle wavy-musical-
// staff decorative line illustration. First pattern for Events / Concerts /
// Nightlife industry — vibrant party/concert/festival energy (NOT generic
// dark-tech, NOT corporate event — confidently club/concert/party mood).
//
// Run with: node scripts/upload-eventflow-pattern.mjs

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
  colorPalette: "#0A0F1A, #131826, #1A2030, #FFFFFF, #B0B7C3, #E91E63, #8B5CF6, #FF1F8E",
  colorMode: "dark",
  accentUsage:
    "DARK PARTY/NIGHTLIFE palette built on a confident PURPLE→PINK GRADIENT accent system over deep dark-navy backgrounds. (1) DEEP DARK NAVY-BLACK #0A0F1A is the primary section background — slightly cooler than pure black, with a subtle blue undertone matching the nightlife/concert mood. (2) SLIGHTLY LIGHTER DARK NAVY #131826 is the card panel color — used for event row cards, music track rows, footer bg; ~30% lighter than the section bg, just enough to define cards without harsh contrast. (3) #1A2030 for hover states + slightly elevated card layers. (4) HOT PINK / MAGENTA #E91E63 (with vibrant variant #FF1F8E) is the SIGNATURE accent — used for: ALL-CAPS section eyebrow labels ('EVENT SCHEDULE' / 'STATS' / 'MUSIC' / 'GALLERY' in tracking-wide hot pink), day-tab pill ACTIVE state (selected day filled in hot pink + tiny downward triangle pointer below), MASSIVE STATS NUMBERS ('457' / '17' / '780' / '45' at 80-120px), thin solid HOT-PINK UNDERLINE at the bottom edge of upcoming-events vertical photo cards, the circular pink PLAY BUTTON on each music track row, the outlined HOT-PINK PILL 'VISIT FULL GALLERY' button, breadcrumb separator dots, calendar timeline date markers (selected dates highlighted in hot pink dots). (5) PURPLE #8B5CF6 (with violet variant #A855F7) is the GRADIENT PARTNER — paired with hot pink for the SIGNATURE GRADIENT PILL 'Buy Ticket →' CTAs (linear-gradient(135deg, #8B5CF6 0%, #E91E63 100%) — purple top-left → pink bottom-right) AND for the FULL-BLEED NEWSLETTER BANNER section bg (massive vivid purple→pink gradient banner with white centered headline + rounded white pill input + circular pink send button). (6) PURE WHITE #FFFFFF for primary text (headings, event titles, music track names, footer headings, nav links). (7) LIGHT GRAY #B0B7C3 for body text and time/address details. (8) MUTED GRAY #6B7280 for tertiary text (dates, copyright, secondary footer links). (9) The EventFlow LOGO uses a small PURPLE PAW-PRINT-LIKE icon (~20-28px, three small purple dots in paw arrangement) next to the white wordmark — appears identically in nav and footer. The accent system is STRICTLY purple→pink gradient for primary CTAs + hot-pink solid for labels/active-states/numbers — NEVER orange, NEVER cyan, NEVER yellow as accents (the entire chromatic identity is purple-pink only).",
  typography:
    "BOLD MODERN SANS as the entire typographic system — Inter / Plus Jakarta Sans / DM Sans / Manrope at 700-900 weight for all headings, 400-500 for body and labels. SPECIFIC PAIRINGS: (1) Sub-page hero title 'EVENT' (or page name) rendered in 56-80px BOLD UPPERCASE SANS white centered with TIGHT tracking, with a small breadcrumb 'Home < Event' below in 14-16px regular sans white with hot-pink chevron separator. (2) Major section headings like 'Follow Event Schedule' / 'UPCOMING EVENTS' / 'STATS' / 'MUSIC' / 'GALLERY' rendered in 32-48px BOLD SANS white (case varies — 'Follow Event Schedule' is sentence-case, others like 'UPCOMING EVENTS' are all-caps). (3) ALL-CAPS hot-pink section eyebrow labels in 12-14px tracking-widest hot-pink #E91E63 — '/EVENT SCHEDULE' / 'UPCOMING EVENTS' / 'STATS' / 'MUSIC' / 'GALLERY'. (4) Event row card titles 'Events That Leave a Impression' / 'Sparkle & Shine on Celebrations' / 'Sparkle & Shine Events' rendered in 18-22px sans bold (700) white. (5) Event row card body description in 14-15px regular sans light-gray. (6) Day-tab pill labels 'Day 01' / 'Day 02' / 'Day 03' rendered in 14-16px sans medium (500-600) — bold white when active, gray when inactive — paired with smaller date sub-labels '16 April 2024' below in 12-13px regular. (7) MASSIVE STATS NUMBERS '457' / '17' / '780' / '45' rendered in 80-120px BOLD SANS (800-900) HOT PINK #E91E63 — these are the design's most arresting typographic moment. (8) Stats sub-labels 'hours of music were played' / 'parties last month' / 'visitors last month' / 'residents played' rendered in 12-14px regular sans light-gray. (9) Music track names 'Best Dancing Tracks' / 'Groove in Da House' / '10 Year Anniversary' / 'Latin Lovers Mix' rendered in 16-18px sans bold (700) white + 'by [artist]' subtitle in 12-13px regular gray below. (10) Newsletter banner heading 'Get Latest Updates Subscribe To Our Newsletter' rendered in 36-56px sans bold (700-800) white, centered, may break to 2 lines. (11) Footer column headings 'Upcoming Events' / 'Quick links' / 'Our Company' / 'Contact' rendered in 16-18px sans bold (700) white. (12) Footer link items 'About Us' / 'Service' / 'Online Ticket' rendered in 14-15px regular sans light-gray. (13) Body paragraphs 14-16px regular sans light-gray with comfortable line-height ~1.6. (14) Nav links 'HOME +' / 'PAGES +' etc. rendered in 12-14px sans medium (500) tracking-wide all-caps white with small + plus indicator after each (suggesting dropdown). NO italic, NO serif, NO condensed display — strict bold modern sans throughout.",
  layout:
    "DARK NIGHTLIFE EVENTS flow alternating dark-navy section bg + occasional vivid gradient accent banner: TOP NAV (dark with logo + horizontal nav + CTA): EventFlow LOGO LEFT (small purple paw-print-like icon + white wordmark), CENTERED nav links 'HOME + / PAGES + / SERVICES + / EVENT + / BLOG + / CONTACT' in tracking-wide all-caps white sans (each parent link has a small + dropdown indicator), RIGHT a row containing: gradient pill 'Buy Ticket →' CTA (purple→pink gradient), small CART icon, small SEARCH icon, small HAMBURGER icon → SUB-PAGE HERO (full-bleed concert/crowd photo with heavy dark overlay): a full-bleed dark photograph (concert crowd silhouette with hands raised, backlit by stage lights) with a heavy dark gradient overlay (~70-80% black opacity) over it, content CENTERED: large MASSIVE BOLD UPPERCASE white sans page title 'EVENT' (56-80px), small breadcrumb below 'Home < Event' (14-16px white sans, with hot-pink chevron separator) → EVENT SCHEDULE (dark navy bg): TOP-LEFT quadrant has a hot-pink ALL-CAPS section eyebrow 'EVENT SCHEDULE' + below it a 32-40px sans bold heading 'Follow Event Schedule'; TOP-RIGHT quadrant has a 3-tab DAY PILL SELECTOR row ('Day 01 / Day 02 / Day 03') where the active 'Day 01' pill is filled HOT PINK + has a small downward TRIANGLE POINTER beneath it (visually anchoring it to the events below) and inactive pills are dark with a thin hot-pink border outline; each pill contains 2 lines: 'Day 01' bold + small date '16 April 2024' below; BELOW the heading + tabs row a VERTICAL STACK of 3 EVENT ROW CARDS (each ~1200×140-160px, dark card bg #131826, rounded 16-20px corners): each card has 4 horizontal segments LEFT-TO-RIGHT — (1) LEFT 25%: rounded-16px event PHOTO (~280×120px); (2) MIDDLE 40%: event title bold white + 2-line gray description below; (3) MIDDLE-RIGHT 20%: small CIRCULAR HOT-PINK BG ICONS for clock + map-pin (~28-32px circles with tiny dark icons inside) paired with 2-line text beside each: '10 Am To 10 Pm / 20 April 2024' for time + 'Mirpur 01 Road N 12 Dhaka, Bangladesh' for address; (4) RIGHT 15%: a 'Buy Ticket →' gradient pill CTA → UPCOMING EVENTS (dark navy bg with subtle photo darken background): TOP-LEFT hot-pink ALL-CAPS eyebrow 'UPCOMING EVENTS' + below it 24-32px sans bold heading 'Best Music Events'; CENTER a horizontal CALENDAR TIMELINE STRIP showing 'APRIL 2018' header + a horizontal axis with month markers and small dots representing dates (selected dates highlighted in hot-pink dots); BELOW it a HORIZONTAL CAROUSEL ROW of 5 UPCOMING EVENT VERTICAL PHOTO CARDS (each ~240×320-360px, full-bleed photo top with rounded 12-16px top corners, dark card bottom containing event name in 16-18px sans bold + 2-line gray description, with a SOLID HOT-PINK HORIZONTAL UNDERLINE BAR at the bottom edge of the card as the signature accent) — each card hover scales slightly → STATS + MUSIC SPLIT (dark navy bg with overlay subtle silhouette photo): LEFT 40% column: hot-pink ALL-CAPS eyebrow 'STATS' + small subtitle 'For Last Month' + a 4-ROW STAT BLOCK where each row contains a MASSIVE HOT-PINK NUMBER ('457' / '17' / '780' / '45' at 80-120px sans bold hot-pink) + a small 1-line gray label below ('hours of music were played' / 'parties last month' / 'visitors last month' / 'residents played'); RIGHT 60% column: hot-pink ALL-CAPS eyebrow 'MUSIC' + small subtitle 'Here are some of Best Tracks form Our Residents' + a VERTICAL STACK of 4 MUSIC TRACK ROWS (each ~480-560×64-72px, dark card bg, rounded 12px corners) where each row contains: track name 'Best Dancing Tracks' + 'by [artist]' subtitle in light-gray on the LEFT, duration '00:00' in muted gray + a CIRCULAR HOT-PINK PLAY BUTTON (~36-44px, hot-pink filled circle with white play triangle inside) on the RIGHT; below the track list a SMALL HOT-PINK 'MORE TRACKS →' text-link → GALLERY (dark navy bg): TOP-LEFT large bold sans 'GALLERY' heading + small light-gray subtitle 'We Have the Best Guests' below; TOP-RIGHT a 'VISIT FULL GALLERY' OUTLINED HOT-PINK PILL BUTTON (transparent fill, 1-2px hot-pink border, hot-pink text inside, fully-rounded); BELOW a IRREGULAR BENTO 5+4 PHOTO MOSAIC GRID (9 nightclub/party photos arranged in 2 rows: top row 5 photos at varying widths, bottom row 4 photos at varying widths offset to fit gaps; rounded 8-12px corners on each, ~8-12px gaps between) → NEWSLETTER BANNER (FULL-BLEED VIVID PURPLE→PINK GRADIENT): a massive horizontal banner (~280-360px tall) with a vivid linear-gradient(90deg, #8B5CF6 0%, #C084FC 50%, #E91E63 100%) bg, centered content: 36-56px sans bold white heading 'Get Latest Updates Subscribe To Our Newsletter' (may break 2 lines), BELOW it a LARGE ROUNDED-PILL INPUT FIELD (~480-560×56-64px, semi-transparent white bg or white pill bg, gray placeholder 'Enter your email' inside) with a CIRCULAR LIGHT-PINK SEND BUTTON (~44-52px circle with hot-pink paper-airplane icon) on the RIGHT side of the input → DARK FOOTER: TOP-LEFT EventFlow logo (small purple paw + white wordmark); TOP-RIGHT a row of 4 small SOCIAL ICONS in white (facebook / x / instagram / pinterest); BELOW a 4-COLUMN GRID: COL1 'Upcoming Events' bold heading + 2 stacked event cards each containing 'date in dark theme' + 'event name bold' + 'Get A Ticket →' small text-link with hot-pink arrow; COL2 'Quick links' bold heading + vertical text-link list ('About Us / Service / Online Ticket / Blog Post / Contact Us'); COL3 'Our Company' bold heading + vertical text-link list ('Jubilee Events / Gala Affairs / Inspire and Delight Events / Enchanted Gatherings / Eventful Ventures'); COL4 'Contact' bold heading + 3 contact rows each with small CIRCULAR HOT-PINK ICON (envelope / map-pin / phone) + light-gray contact value beside; SUBTLE WAVY MUSICAL STAFF LINE ILLUSTRATION (decorative line-art musical staff with notes) stretching across the bottom-right of the footer in muted dark-pink at low opacity ~15-20% as a thematic decorative element; BOTTOM divider line + bottom row '© EventFlow 2024 | All Rights Reserved' on LEFT in muted gray + 'Terms & Condition / Privacy Policy / Contact Us' inline links on RIGHT in muted gray.",
  signaturePatterns: [
    "PURPLE→PINK GRADIENT PILL CTAs WITH → ARROW — every primary CTA on the site is a fully-rounded pill with a vivid linear-gradient(135deg, #8B5CF6 0%, #E91E63 100%) background (purple top-left → pink bottom-right) + white bold text + a small → right-arrow glyph after the label ('Buy Ticket →'); the gradient-pill CTA is the design's most distinctive identity choice — refuses both flat solid CTAs and outlined CTAs in favor of energetic dual-color gradient",
    "FULL-BLEED VIVID PURPLE→PINK GRADIENT NEWSLETTER BANNER — a massive horizontal banner section uses a vivid horizontal gradient (linear-gradient(90deg, #8B5CF6 0%, #C084FC 50%, #E91E63 100%)) as the FULL-BLEED section background with centered white headline + rounded pill input field + circular send button; the banner is the design's most chromatic moment, breaking up the dark navy rhythm with pure energy",
    "DAY-TAB PILL SELECTOR with HOT-PINK FILLED ACTIVE + DOWNWARD TRIANGLE POINTER — the event schedule section uses a horizontal row of 3 day pills ('Day 01 / Day 02 / Day 03') where the ACTIVE pill is filled HOT PINK #E91E63 with white text AND has a small DOWNWARD TRIANGLE POINTER (~12-16px) beneath it (visually anchoring it to the events list below — like a speech-bubble tail), and inactive pills are dark with a thin hot-pink border outline; the triangle pointer below the active tab is rare and instantly identifiable",
    "HOT-PINK ALL-CAPS TRACKING-WIDE SECTION EYEBROW LABELS — every section starts with a small 12-14px hot-pink #E91E63 ALL-CAPS tracking-widest eyebrow label ('EVENT SCHEDULE' / 'UPCOMING EVENTS' / 'STATS' / 'MUSIC' / 'GALLERY') above the larger heading; consistent typographic vocabulary across all sections, signature label-then-heading rhythm",
    "EVENT ROW CARDS WITH 4-SEGMENT HORIZONTAL LAYOUT — schedule events are presented as wide horizontal cards (each ~1200×140-160px, dark card bg #131826, rounded 16-20px corners) split into 4 segments: LEFT 25% rounded-corner event photo + MIDDLE 40% event title bold + 2-line gray description + MIDDLE-RIGHT 20% icon-paired time/address pairs + RIGHT 15% gradient 'Buy Ticket →' pill CTA; the 4-segment horizontal card is more interesting than a typical vertical event card and presents more information per row",
    "MASSIVE HOT-PINK STATS NUMBERS — the stats section uses MASSIVE 80-120px hot-pink #E91E63 sans bold numbers ('457' / '17' / '780' / '45') stacked vertically with small light-gray sub-labels below each ('hours of music were played' / 'parties last month' / 'visitors last month' / 'residents played'); the giant pink numbers are the design's most arresting typographic moment and make stats feel like a stadium scoreboard",
    "MUSIC TRACK ROWS WITH CIRCULAR HOT-PINK PLAY BUTTON — vertical stack of music track rows (dark cards, rounded 12px corners) each containing track name + artist subtitle on LEFT + duration + a CIRCULAR HOT-PINK PLAY BUTTON (~36-44px hot-pink filled circle with white play triangle) on RIGHT; the circular pink play button feels like a Spotify/SoundCloud play interaction, perfectly matching the music-events theme",
    "VERTICAL UPCOMING-EVENT PHOTO CARDS WITH HOT-PINK SOLID UNDERLINE — the upcoming events carousel uses tall vertical photo cards (each ~240×320-360px) with a full-bleed photo top + dark card bottom + a solid HOT-PINK HORIZONTAL UNDERLINE BAR (1.5-2px tall) at the very bottom edge of each card as the signature accent; the pink underline ties the cards to the hot-pink labels + active-state vocabulary",
    "OUTLINED HOT-PINK PILL BUTTON for secondary CTAs — secondary CTAs like 'VISIT FULL GALLERY' use a fully-rounded transparent-fill pill with a 1-2px hot-pink border + hot-pink text inside (no fill, no gradient); contrasts with the gradient-fill primary CTAs and is reserved for less-urgent actions",
    "CIRCULAR HOT-PINK BG ICONS for time/address pairs — event row cards use small CIRCULAR HOT-PINK BG ICONS (~28-32px filled hot-pink circles with tiny dark icons inside for clock / map-pin) paired with 2-line text beside each (time + date / address); the same circle treatment appears in the footer contact column for envelope / map-pin / phone contact rows",
    "CALENDAR TIMELINE STRIP for upcoming events — the upcoming events section uses a horizontal CALENDAR TIMELINE STRIP showing month header ('APRIL 2018') + a horizontal axis line with month markers and small dots representing dates (selected dates highlighted in hot-pink dots); the timeline is rare in event websites and adds editorial-magazine quality",
    "BENTO 5+4 PHOTO GALLERY MOSAIC — the gallery section uses an irregular 9-photo bento mosaic (top row 5 photos at varying widths + bottom row 4 photos at varying widths offset to fit) with rounded 8-12px corners + ~8-12px gaps; more interesting than a uniform 3x3 grid and creates magazine-spread quality",
    "PURPLE PAW-PRINT-LIKE LOGO ICON — the EventFlow brand uses a small PURPLE paw-print-like icon (~20-28px, three small purple dots in paw arrangement) next to the white sans wordmark in both nav and footer; distinctive brand mark that hints at music/club/party energy without being literal",
    "WAVY MUSICAL-STAFF LINE-ART FOOTER DECORATION — the footer has a SUBTLE WAVY MUSICAL STAFF LINE ILLUSTRATION (decorative line-art musical staff with notes) stretching across the bottom-right of the footer in muted dark-pink at ~15-20% opacity; thematic decorative element that adds music-industry warmth without competing with content",
    "NAV LINKS WITH + DROPDOWN INDICATOR — top nav links 'HOME + / PAGES + / SERVICES + / EVENT + / BLOG +' each have a small + plus glyph after the label suggesting dropdown menus; tracking-wide all-caps treatment + the + indicator gives the nav a clear hierarchical info-architecture feel",
  ],
  uniqueTechniques: [
    "Purple→pink gradient as the signature dual-color identity — using a single horizontal/diagonal gradient from purple #8B5CF6 to hot-pink #E91E63 across all primary CTAs + the newsletter banner bg ties the entire design together with one chromatic gesture; the gradient does what a single solid accent could not — it injects energy/movement/nightlife into every primary action",
    "Active-tab triangle pointer + filled-pink — the day-tab selector's active state (filled hot-pink pill + small downward triangle pointer beneath it visually anchoring to the events below) is a speech-bubble-tail trick that turns the tab from a flat selector into a visual conversation between selector and content; rare and instantly readable",
    "Circular pink play buttons paired with track rows — putting a CIRCULAR HOT-PINK PLAY BUTTON on the right of every music track row makes the design feel immediately interactive in the way Spotify/SoundCloud rows do; this single component teaches the user 'this is real music, you can play it' without any explanatory text",
    "Massive hot-pink stats numbers — 80-120px hot-pink sans bold numbers stacked vertically with small gray labels below give the stats section the visual weight of a stadium scoreboard; this typographic confidence is what makes a stat row feel like a brag rather than a footnote",
    "Hot-pink underline accent bar at the bottom edge of vertical event cards — placing a thin solid hot-pink horizontal bar at the very bottom edge of each vertical upcoming-event photo card is a signature decorative move that ties the cards to the hot-pink label+active-state vocabulary; subtler than a border but more distinctive than no accent",
    "Calendar timeline strip with hot-pink date markers — using a horizontal calendar timeline strip (month header + horizontal axis with month markers + selected dates highlighted in hot-pink dots) instead of a typical event-list-with-date-headers gives the upcoming-events section editorial-magazine quality and pairs naturally with the music-festival mood",
    "Bento 5+4 irregular photo mosaic gallery — using 5 photos in the top row + 4 in the bottom row at varying widths (instead of uniform 3x3) creates magazine-spread asymmetry; the slight irregularity reads as 'curated photo collection' rather than 'photo grid'",
    "Wavy musical-staff line-art as footer thematic decoration — placing a subtle wavy line-art musical staff illustration across the bottom-right of the dark footer at low opacity adds music-industry warmth without competing with content; thematic decoration that signals industry without being literal",
  ],
  spacing:
    "Dark nightlife events spacing — sections separated by 96-128px on desktop, content max-width ~1280-1440px with comfortable side gutters, headline-to-body gap 24-40px. Sub-page hero is full-viewport with ~120-160px vertical padding around centered title. Event row cards are 1200×140-160px with 32-40px internal padding + 24-32px vertical spacing between cards. Upcoming events horizontal carousel uses 24-32px horizontal gaps between cards. Stats 4-row block: each massive number gets 80-120px gap from neighbor for breathing room. Music track rows 16-24px vertical spacing between rows + 24-32px internal padding. Gallery bento mosaic 8-12px gaps between photos. Newsletter banner is FULL-BLEED with 80-120px vertical internal padding. Footer 4-column grid 32-48px column gaps + 16-24px internal vertical spacing within each column. Section eyebrow labels (hot-pink all-caps) get 16-24px gap below them before the heading begins. Active day-pill triangle pointer sits 8-12px below the pill bottom edge. Circular hot-pink icons in event row cards have 16-24px gap from the text beside them. Cards generally have 24-40px internal padding. The overall feeling is dense-but-organized — like a concert poster wall, energetic without feeling cramped.",
  moodKeywords:
    "dark, vibrant, energetic, nightlife, concert, party, club, festival, electric, modern, bold, music-events, gradient, purple-pink, vivid, magenta, ticketing, event-promotion, edm, live-music",
  animations:
    "Energetic nightlife motion — sub-page hero photo: very slow zoom (1.0 → 1.04 over 12s) for ambient life. Hero text: fade-up 0.6s ease-out (y-32px → 0). Section eyebrow labels (hot-pink all-caps): fade-in 0.4s on scroll. Day-tab pill click: smooth color crossfade between active/inactive states (0.3s ease-out) + the downward triangle pointer slides horizontally to the new active position (0.4s cubic-bezier(.22,1,.36,1)). Event row cards: stagger fade-up on scroll (0.1s between cards, 0.5s ease-out, y-32px → 0); hover → subtle lift (translateY -4px) + shadow increase + the gradient pill 'Buy Ticket' brightens slightly. Upcoming events horizontal carousel: cards stagger fade-up (0.08s between); hover → scale 1.0 → 1.03 + the bottom hot-pink underline bar pulses brighter. Calendar timeline: animate the active date dot pulsing (2s infinite ease-in-out 0.95→1.05 scale + brightness). Massive hot-pink stats numbers: count-up animation on scroll-into-view (count from 0 → final value over 1.5-2s with ease-out). Music track rows: hover → row bg lightens slightly + the play button scales 1.0 → 1.08 + arrow brightness; click play → ripple effect on the play button. Gallery bento mosaic: stagger fade-in on scroll (0.06s between photos); hover → slight scale 1.0 → 1.04 + brightness increase. Newsletter banner: subtle continuous gradient shift (background-position animates 0% → 100% → 0% over 8-12s creating a slow chromatic flow). Newsletter input focus → border ring in pink at low opacity. Send button hover → scale 1.0 → 1.1 + paper-plane icon translate-x 2-4px right. Gradient pill CTAs hover → slight scale 1.0 → 1.04 + box-shadow 0 8px 32px hot-pink at 30% opacity (glowing pink shadow), arrow → translate-x 4px right. Outlined pill CTAs hover → bg fills hot-pink + text turns white. Footer social icons hover → color shift to hot-pink + scale 1.0 → 1.1. Overall motion is energetic, glowing, club-like — pulsing, scaling, gradient-shifting — never static, always alive.",
  heroTreatment:
    "FULL-BLEED CINEMATIC SUB-PAGE HERO with dark concert-crowd photo + heavy dark overlay + centered MASSIVE WHITE BOLD UPPERCASE PAGE TITLE + small breadcrumb. The hero photograph is a dramatic concert/crowd photograph (silhouetted crowd with hands raised, backlit by stage lights or laser beams, party energy) running edge-to-edge with a heavy DARK GRADIENT OVERLAY (~70-80% black opacity, possibly with subtle radial gradient darker at edges) over the full photo. ABOVE the photo a dark NAV: EventFlow LOGO LEFT (small ~24-28px purple paw-print-like icon + white sans wordmark), CENTERED nav links 'HOME + / PAGES + / SERVICES + / EVENT + / BLOG + / CONTACT' in 12-14px tracking-wide all-caps white sans medium (each parent link has a small + dropdown indicator), RIGHT a row containing: gradient pill 'Buy Ticket →' CTA (purple→pink gradient, ~140-160×40-44px), small white CART icon (~20-24px), small white SEARCH icon, small white HAMBURGER icon. INSIDE the hero, content is CENTERED both horizontally AND vertically: MASSIVE BOLD UPPERCASE WHITE SANS PAGE TITLE (56-80px bold sans, all-caps, tight tracking, e.g. 'EVENT' for events page or 'HOME' for homepage variant), BELOW it a small breadcrumb '[Home] < [Current Page]' in 14-16px regular white sans with a HOT-PINK CHEVRON SEPARATOR < between segments. NO additional CTA in this sub-page hero (CTAs live in the section content below). The hero is intentionally sparse — title + breadcrumb only — letting the dramatic concert photo do the emotional work. For a HOMEPAGE variant the hero can use the same template with a longer title + a gradient-pill 'Buy Ticket →' CTA centered below the breadcrumb. The overall feeling is concert-promoter / nightclub / festival-website energy — dramatic, bold, energetic, immediate.",
};

const record = {
  name: "EventFlow Vibrant Nightlife Events",
  industries: [
    "events",
    "event",
    "event planner",
    "event planning",
    "event agency",
    "event promotion",
    "event promoter",
    "event marketing",
    "event production",
    "event ticketing",
    "ticketing",
    "ticket sales",
    "concert",
    "concerts",
    "concert promoter",
    "concert venue",
    "live music",
    "live music venue",
    "music festival",
    "festival",
    "festivals",
    "edm festival",
    "music event",
    "music events",
    "nightclub",
    "nightclub events",
    "club events",
    "party",
    "party events",
    "private parties",
    "dj events",
    "dj agency",
    "rave",
    "rave events",
    "anniversary events",
    "gala",
    "gala events",
    "corporate events",
    "celebration events",
    "live performance",
    "performance venue",
    "entertainment events",
    "entertainment promoter",
    "comedy events",
    "comedy show",
  ],
  moods: [
    "dark",
    "vibrant",
    "energetic",
    "nightlife",
    "concert",
    "party",
    "club",
    "festival",
    "electric",
    "modern",
    "bold",
    "music-events",
    "gradient",
    "purple-pink",
    "vivid",
    "magenta",
    "ticketing",
    "event-promotion",
    "edm",
    "live-music",
    "dark-vibrant",
    "neon",
    "high-energy",
  ],
  color_mode: "dark",
  brief_json: brief,
};

console.log("[upload] Inserting EventFlow vibrant nightlife events pattern into design_patterns...");

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
