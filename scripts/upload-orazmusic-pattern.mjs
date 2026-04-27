// One-off uploader for the ORAZ MUSIC ambient indigo music portal/blog
// pattern. Dark midnight indigo #1A1F35 + vivid blue accent #4F8FFF system,
// 'ORAZ MUSIC' minimal-nav wordmark with hamburger LEFT, full-bleed right-
// aligned vocalist/musician hero photograph + LEFT-anchored white sans bold
// 'Golden Dragon Internal Flight' track-title + small sub-attribution
// 'Estas Tonne. Shardo Studios 2016', 'Latest [Word]' / 'Top [Word]' SECTION
// HEADINGS where 'Latest'/'Top' is muted gray and the [Word] is bold WHITE,
// LATEST EVENTS row of 3 horizontal event cards each with CIRCULAR BLUE DATE
// BADGE top-left of the card photograph (showing day + month abbreviation)
// + bottom-anchored title + tiny attendee info row, OUTLINED BLUE 'RSVP +'
// PILL on featured event card top-right, LATEST SONGS 4-card SQUARE PHOTO
// GRID with bottom-anchored centered title + gray artist subtitle, TOP
// ALBUMS LEFT 50% TABULAR LEADERBOARD with columns # / Album+Artist / Genre /
// Hit — each row: rank number + CIRCULAR BLUE PLAY BUTTON + small square
// thumbnail + 2-line title+artist + blue genre tag + gray hit count, LATEST
// VIDEOS RIGHT 50% 2x2 grid of video thumbnails with bottom-anchored title+
// artist overlay, LATEST POSTS 3-card row with full-bleed photo + bottom-
// anchored DATE label + 2-line title overlay, dark midnight footer with
// MULTI-COLOR BRAND-PILL SOCIAL ICON ROW (each social icon is a small solid
// brand-colored square pill: facebook blue + twitter cyan + reddit red +
// linkedin teal + pinterest red + tumblr navy + instagram pink-orange
// gradient) as the design's most distinctive footer signature, 4-column dark
// footer with logo+lorem LEFT + Useful Link + Genres + Contact Us. SECOND
// pattern for Music / Entertainment industry — paired with Tidal (bold
// premium-cinematic-streaming) this covers the SOFTER ambient-indigo music-
// portal/blog/community/jamendo aesthetic.
//
// Run with: node scripts/upload-orazmusic-pattern.mjs

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
  colorPalette: "#1A1F35, #232842, #2D334F, #FFFFFF, #B8BBC8, #6B6F80, #4F8FFF, #3D78D9, #1877F2, #00D4FF, #FF4500, #006FFF, #BD081C, #36465D, #E1306C",
  colorMode: "dark",
  accentUsage:
    "AMBIENT INDIGO MUSIC-PORTAL palette built on a confident DEEP MIDNIGHT INDIGO + VIVID BLUE single-accent system over indigo backgrounds, with a SCOPED MULTI-COLOR BRAND-PILL SOCIAL-ICON discipline in the footer. (1) DEEP MIDNIGHT INDIGO #1A1F35 (with slightly lighter variant #232842) is the primary section background — soft cool indigo (NOT pure-black, NOT navy-blue, NOT slate-gray) with a subtle blue undertone matching the music-portal/community/blog mood; the indigo is calming rather than dramatic, suiting a music-discovery library experience rather than a cinematic launch screen. (2) SLIGHTLY LIGHTER INDIGO #2D334F for occasional hover states + slightly elevated card layers + table row alternation. (3) VIVID BLUE #4F8FFF (with deeper variant #3D78D9) is the SIGNATURE PRIMARY ACCENT — used for: CIRCULAR BLUE DATE BADGE on event cards (small ~52-60px solid bright-blue circle with white day-number + month abbreviation inside, top-left of each event card photograph), CIRCULAR BLUE PLAY BUTTON on Top Albums tabular rows (small ~32-40px filled blue circle with white play triangle inside, after the rank number column), BLUE GENRE TAG TEXT in album rows ('Pop' / 'Videos' / 'Rock' rendered in 14-15px sans medium blue text in the genre column), OUTLINED BLUE 'RSVP +' PILL CTA on the featured event card top-right (small fully-rounded pill with 1-2px blue border + blue text + small + glyph after, transparent fill), occasional inline blue link colors. (4) PURE WHITE #FFFFFF for primary text (track titles, song titles, video titles, post titles, headings). (5) LIGHT GRAY-INDIGO #B8BBC8 for body text and secondary info (artist names, attribution sub-text, genre labels in some contexts). (6) MUTED GRAY-INDIGO #6B6F80 for tertiary text (date labels in event cards, attendee info, copyright, secondary footer links, hit counts in album leaderboard, table column headers '#' '/Album/Artist' 'Genre' 'Hit'). (7) SCOPED MULTI-COLOR BRAND-PILL SOCIAL ICONS — the footer social-icon row uses SOLID BRAND-COLORED SQUARE PILL TILES (each ~44-52px rounded-square solid bg with white icon inside) in each platform's actual brand color: FACEBOOK #1877F2 (vivid blue) + TWITTER/X #00D4FF (cyan) + REDDIT #FF4500 (red-orange) + LINKEDIN #006FFF (deeper blue) + PINTEREST #BD081C (deep red) + TUMBLR #36465D (navy) + INSTAGRAM #E1306C-to-#FFCB48 (pink-to-orange gradient or solid pink-magenta) — the multi-color brand-pill row is the design's most distinctive footer signature and the only place multi-color appears. (8) The ORAZ MUSIC LOGO uses a 2-tone wordmark: 'ORAZ' in WHITE bold sans + a slight letter-gap + 'MUSIC' in MUTED LIGHT-GRAY sans medium of the same size beside it — the contrast between bold-white 'ORAZ' and gray 'MUSIC' is the signature wordmark treatment, no separate icon mark; appears in nav (top-left small) and footer (bottom-left larger). The accent system overall is single vivid-blue + scoped-brand-pill multi-color social row + ambient indigo-base — softer than Tidal's red-on-black, more community/portal-like.",
  typography:
    "BOLD MODERN SANS as the entire typographic system — Inter / Plus Jakarta Sans / Manrope / DM Sans at 600-800 weight for major headings, 400-500 for body and labels. SPECIFIC PAIRINGS: (1) HERO LARGE LEFT-ALIGNED HEADING in 36-56px sans bold (700) WHITE — 1 LINE for typical track titles like 'Golden Dragon Internal Flight' (or domain-equivalent featured-track / featured-event title); the heading is large but NOT massive (this is a music-portal-discovery hero, not a cinematic-trailer hero — the energy is calmer/exploratory). (2) Hero sub-attribution 'Estas Tonne. Shardo Studios 2016' rendered in 14-16px regular sans LIGHT-GRAY-INDIGO #B8BBC8 below the title with ~12-16px gap. (3) MIXED-WEIGHT SECTION HEADINGS like 'Latest Events' / 'Latest Songs' / 'Top Albums' / 'Latest Videos' / 'Latest Posts' rendered with the FIRST WORD in a softer LIGHT-GRAY ('Latest' / 'Top' in 14-16px regular sans light-gray-indigo #B8BBC8) + the SECOND WORD in BOLD WHITE ('Events' / 'Songs' / 'Albums' / 'Videos' / 'Posts' in 14-16px sans bold WHITE) — the gray-then-white-bold mixed-weight section heading is the signature label vocabulary. (4) Event card titles 'Off Rock Fan' / 'Rock Wall Music' / 'Ultra Music Festival' rendered in 16-20px sans bold (700) WHITE on the event card overlay-area below the title bar. (5) Event card attendee info '🎫 tzjoomla — 1 attendee' rendered in 12-13px regular sans MUTED GRAY-INDIGO at the bottom of each event card with a small ticket icon prefix. (6) Circular date badge inside small ~52-60px BLUE CIRCLE: '31 Aug' / '03 Oct' / '31 Oct' rendered as 2-line stack — '31' large bold WHITE 18-22px + 'Aug' / 'Oct' small uppercase WHITE 11-12px below. (7) Song card titles 'She Will Be Loved' / 'All Woman' / 'I Want To Know What Love Is' / 'I Will Always Love You' rendered in 14-16px sans bold (700) WHITE centered below the square photo + artist name 'Frankie Lotus' / 'Sam Smith' / 'Daniel Castro' / 'Whitney Houston' rendered in 11-13px regular sans MUTED GRAY-INDIGO centered below the title. (8) Top Albums tabular column headers '#' / 'Album/Artist' / 'Genre' / 'Hit' rendered in 11-13px sans medium MUTED GRAY-INDIGO at the top of the table (very small + tracking-slight). (9) Album leaderboard row data: rank number '01' / '02' / '03' rendered in 12-14px regular MUTED GRAY-INDIGO + album name 'Brina Blum' / 'I Miss You' / 'She Will Be Loved' rendered in 14-16px sans bold (700) WHITE + artist 'Jimmi Page' / 'Clean Bandit' rendered in 12-13px regular sans MUTED GRAY-INDIGO below the title + genre tag 'Pop' / 'Videos' / 'Rock' rendered in 14-15px sans medium VIVID BLUE #4F8FFF + hit count '212' / '195' / '169' rendered in 14-15px regular MUTED GRAY-INDIGO right-aligned. (10) Video card titles 'I Miss You' / 'Hotel California' / 'I'll Play The Blues For You' / 'Stay With Me' rendered in 14-16px sans bold WHITE bottom-anchored on each video thumbnail + artist 'Clean Bandit' / 'Eagles' / 'Daniel Castro' / 'Sam Smith' rendered in 11-13px regular sans LIGHT-GRAY below the title (with a subtle bottom-fade gradient on the thumbnail for legibility). (11) Latest Posts card date 'Thursday, 22 February 2018' rendered in 11-13px regular MUTED GRAY-INDIGO bottom-overlay on the card + post title 'Remember those great Volkswagen ads?' rendered in 16-20px sans bold (700) WHITE bottom-overlay below the date (with subtle bottom-fade gradient on the photo for legibility). (12) Footer column headings 'Useful Link' / 'Genres' / 'Contact Us' rendered in 14-16px sans bold (700) WHITE. (13) Footer link items 'Pop / Rock / Jazz / Ballad' rendered in 13-15px regular sans LIGHT-GRAY-INDIGO. (14) Footer contact info labels 'ADDRESS' / 'PHONE' / 'EMAIL' rendered in 11-12px tracking-wide MUTED GRAY-INDIGO ALL-CAPS + 13-15px regular WHITE value below each. (15) Footer 'ORAZ MUSIC' wordmark rendered same as nav (white bold + gray medium). NO italic, NO serif, NO condensed display — strict bold-modern sans throughout (calm music-portal voice).",
  layout:
    "AMBIENT INDIGO MUSIC-PORTAL/COMMUNITY flow — deep midnight indigo sections throughout with ambient cool lighting feel. TOP NAV (overlaid on hero photo, FLOATING-TRANSPARENT bar): LEFT a small WHITE HAMBURGER MENU ICON (~20-24px, 3 horizontal lines) + small ORAZ MUSIC wordmark beside it (white 'ORAZ' bold + gray 'MUSIC' medium); the entire nav is INTENTIONALLY MINIMAL: just hamburger + logo, no center links, no inline CTA — extreme minimalism reads as portal/library/blog rather than marketing-funnel → HERO (full-bleed cinematic right-aligned vocalist photo on indigo bg): a full-bleed cinematic photograph of a musician in performance (vocalist holding a mic, guitarist playing, etc., dramatic stage-lit lighting) positioned anchored to the RIGHT 60-65% of the hero with the LEFT 35-40% remaining a darker fade-into-indigo zone for the heading text; the photo has a subtle indigo color-grade or gradient edge softening into the indigo bg seamlessly. Content LEFT-aligned starting around 5-7% from the left edge and VERTICALLY-CENTERED: 36-56px sans bold WHITE 1-line track-title heading 'Golden Dragon Internal Flight' (or domain-equivalent featured-track/featured-event), BELOW it ~12-16px gap to a 14-16px regular sans LIGHT-GRAY-INDIGO 1-line sub-attribution 'Estas Tonne. Shardo Studios 2016' (or domain-equivalent artist + studio + year credit) → LATEST EVENTS (indigo): 'Latest Events' MIXED-WEIGHT SECTION HEADING (gray 'Latest' + bold-WHITE 'Events') TOP-LEFT; BELOW a 3-COLUMN GRID of HORIZONTAL EVENT CARDS (each ~360-400×220-260px, dark indigo card bg #232842, rounded 8-12px corners): each card structure: TOP-LEFT inside the card photo, a small CIRCULAR BLUE DATE BADGE (~52-60px solid bright-blue #4F8FFF circle with WHITE day-number '31' large bold + 'Aug' month abbreviation small below — 2-line stack inside the circle); the FULL-BLEED EVENT PHOTO occupies the upper 70% of the card (cinematic event/concert photograph) with a subtle bottom-fade for legibility; BOTTOM 30% of the card has TITLE 'Off Rock Fan' bold WHITE + small attendee info row '🎫 tzjoomla • 1 attendee' in 12-13px muted-gray-indigo with ticket icon prefix; the FEATURED 3rd event card 'Ultra Music Festival' has an additional OUTLINED BLUE 'RSVP +' PILL CTA top-right of the card (small ~70-80×28-32px transparent fill with 1-2px blue border + blue text + small + glyph after) → LATEST SONGS (indigo): 'Latest Songs' MIXED-WEIGHT SECTION HEADING TOP-LEFT; BELOW a 4-COLUMN GRID of SQUARE PHOTO CARDS (each ~240-280×280-320px, full-bleed photo top with rounded 8-12px corners, NO card chrome — just the photo + text below): each card has a SQUARE COVER PHOTO (~240×240-260px, photograph of artist or musician) + BELOW the photo CENTERED title 'She Will Be Loved' / 'All Woman' / 'I Want To Know What Love Is' / 'I Will Always Love You' bold WHITE 14-16px + below the title CENTERED artist 'Frankie Lotus' / 'Sam Smith' / 'Daniel Castro' / 'Whitney Houston' regular sans MUTED GRAY-INDIGO 11-13px → TOP ALBUMS + LATEST VIDEOS SPLIT (indigo, 50%/50%): LEFT 50% column TOP 'Top Albums' MIXED-WEIGHT SECTION HEADING; BELOW a TABULAR LEADERBOARD layout (Spotify/iTunes-style row table) with column header row '#' / 'Album/Artist' / 'Genre' / 'Hit' (small muted-gray-indigo 11-13px sans medium) + 5 ROWS each containing: COL1 RANK NUMBER '01' / '02' / '03' / '04' / '05' (12-14px regular gray) + COL2 a horizontal row containing CIRCULAR BLUE PLAY BUTTON (~32-40px solid blue with white play triangle) + small SQUARE THUMBNAIL (~44-52px rounded 4-6px corners) + 2-LINE title+artist stack (album name bold WHITE 14-16px / artist regular gray 12-13px below) + COL3 GENRE TAG ('Pop' / 'Videos' / 'Rock') in 14-15px sans medium VIVID BLUE + COL4 HIT COUNT (212 / 195 / 169 / 153 / 105) right-aligned in 14-15px regular muted-gray; rows separated by 12-16px vertical spacing with subtle 1px hairline bottom-divider per row; RIGHT 50% column TOP 'Latest Videos' MIXED-WEIGHT SECTION HEADING; BELOW a 2x2 GRID of VIDEO THUMBNAIL CARDS (each ~280×160-180px, full-bleed video screenshot with rounded 8-12px corners, NO card chrome) with content BOTTOM-ANCHORED INSIDE each video thumbnail: title 'I Miss You' / 'Hotel California' / 'I'll Play The Blues For You' / 'Stay With Me' bold WHITE 14-16px + artist 'Clean Bandit' / 'Eagles' / 'Daniel Castro' / 'Sam Smith' regular light-gray 11-13px below (with subtle bottom-fade gradient overlay on the video thumb for legibility) → LATEST POSTS (indigo): 'Latest Posts' MIXED-WEIGHT SECTION HEADING TOP-LEFT; BELOW a 3-COLUMN GRID of BLOG POST CARDS (each ~360-400×220-260px, full-bleed photo with rounded 8-12px corners, NO card chrome — just photo + bottom-overlay): each card has a FULL-BLEED PHOTO + BOTTOM-OVERLAY content area (with subtle bottom-fade gradient for legibility): SMALL DATE 'Thursday, 22 February 2018' regular muted-gray-indigo 11-13px + 2-LINE POST TITLE 'Remember those great Volkswagen ads?' / 'Topo Designs Rover Pack Review' / 'Half of what we know about coffee is wrong' bold WHITE 16-20px → DARK MIDNIGHT FOOTER (continuation of indigo bg): TOP a 4-COLUMN GRID — COL1 (~30%): ORAZ MUSIC LOGO (white 'ORAZ' bold + gray 'MUSIC' medium, ~140-180px wide) + 4-line lorem ipsum description in 13-15px regular light-gray-indigo + a HORIZONTAL ROW of MULTI-COLOR BRAND-PILL SOCIAL ICONS (7 small ~44-52px rounded-square solid brand-colored tiles each with WHITE icon inside: facebook #1877F2 + twitter/X #00D4FF cyan + reddit #FF4500 red-orange + linkedin #006FFF deeper blue + pinterest #BD081C deep red + tumblr #36465D navy + instagram #E1306C pink-to-orange gradient — separated by ~6-10px gaps); COL2 'Useful Link' bold WHITE heading + vertical text-link list ('Pop / Rock / Jazz / Ballad'); COL3 'Genres' bold WHITE heading + vertical text-link list ('Pop / Rock / Jazz / Ballad'); COL4 'Contact Us' bold WHITE heading + 3 contact info rows each with TINY TRACKING-WIDE ALL-CAPS muted-gray label ('ADDRESS' / 'PHONE' / 'EMAIL') + 1-2 line value in regular WHITE below ('4035 Hilliard Road 268 Toronto, ON Canada' / '88-123-456-789' / 'info@youramazon.com').",
  signaturePatterns: [
    "MULTI-COLOR BRAND-PILL SOCIAL ICONS in footer — the footer social-icon row uses SOLID BRAND-COLORED SQUARE PILL TILES (each ~44-52px rounded-square solid bg with white icon inside) in each platform's actual brand color: FACEBOOK vivid blue #1877F2 + TWITTER/X cyan #00D4FF + REDDIT red-orange #FF4500 + LINKEDIN deeper blue #006FFF + PINTEREST deep red #BD081C + TUMBLR navy #36465D + INSTAGRAM pink-to-orange gradient #E1306C; the multi-color brand-pill row is the design's most distinctive footer signature and the only place multi-color appears, scoped strictly to social-platform recognition",
    "MIXED-WEIGHT 'GRAY + BOLD-WHITE' SECTION HEADINGS — every section heading uses a TWO-WORD MIXED-WEIGHT format where the FIRST WORD ('Latest' / 'Top') is rendered in 14-16px regular sans LIGHT-GRAY-INDIGO + the SECOND WORD ('Events' / 'Songs' / 'Albums' / 'Videos' / 'Posts') is rendered in 14-16px sans BOLD WHITE; the gray-then-white-bold mixed-weight is signature label vocabulary giving every section a 'temporal-modifier + content-type' typographic structure",
    "CIRCULAR BLUE DATE BADGE on event cards (top-left inside photo) — every event card has a small CIRCULAR BLUE DATE BADGE (~52-60px solid bright-blue #4F8FFF circle) positioned TOP-LEFT inside the event card photograph showing the day-number large WHITE bold ('31') above the month abbreviation small WHITE caps ('Aug') as a 2-line stack inside the circle; the date-as-circle-badge is the signature event-card-anchor pattern",
    "TOP ALBUMS SPOTIFY/ITUNES TABULAR LEADERBOARD with circular blue play button + thumbnail + title/artist + genre + hit count — the Top Albums section uses a TABULAR LEADERBOARD layout with column headers (# / Album/Artist / Genre / Hit) + 5 rows where each row has: rank number + CIRCULAR BLUE PLAY BUTTON (~32-40px solid blue with white play triangle) + small SQUARE THUMBNAIL (~44-52px rounded) + 2-line title+artist stack + GENRE TAG in vivid blue + hit count right-aligned; this Spotify/iTunes tabular pattern is the design's most data-rich element and immediately signals 'this is a music library/discovery interface'",
    "ORAZ MUSIC 2-TONE WORDMARK LOGO — the brand uses a 2-tone wordmark: 'ORAZ' in WHITE bold sans + a slight letter-gap + 'MUSIC' in MUTED LIGHT-GRAY sans medium (same size); the contrast between bold-white 'ORAZ' (the brand name) and gray 'MUSIC' (the descriptor) is the signature wordmark treatment, no separate icon mark — works for any brand wanting a 2-word wordmark with brand-name-emphasis",
    "MINIMAL 'HAMBURGER + LOGO' ONLY NAV — the top nav is INTENTIONALLY MINIMAL: just a small white HAMBURGER MENU ICON LEFT + ORAZ MUSIC wordmark beside it; NO center nav links, NO inline CTA, NO right-side buttons — extreme nav minimalism reads as portal/library/blog rather than marketing-funnel; works for any content-platform brand wanting an app-like navigation feel",
    "SQUARE PHOTO + CENTERED TITLE+ARTIST 4-CARD SONG GRID — the Latest Songs section uses 4 SQUARE PHOTO CARDS (each ~240-280px) with NO card chrome — just the square photo + centered title bold WHITE + centered artist gray below; the chrome-less square-with-text-below pattern is signature music-cover-grid vocabulary instantly readable as 'these are music tracks' without explicit metaphor",
    "VIDEO THUMBNAIL CARDS WITH BOTTOM-ANCHORED OVERLAID TITLE+ARTIST — the Latest Videos 2x2 grid uses video thumbnails with content (title bold WHITE + artist light-gray) BOTTOM-ANCHORED INSIDE each thumbnail (overlaid on the thumb at the lower portion with subtle bottom-fade gradient for legibility); same convention as Latest Posts cards which also use bottom-overlaid date+title — consistent overlay vocabulary across all photo-content cards",
    "OUTLINED BLUE 'RSVP +' PILL CTA on featured event card — the FEATURED event card (e.g. 'Ultra Music Festival') has an additional OUTLINED BLUE 'RSVP +' PILL CTA top-right of the card (small ~70-80×28-32px transparent fill with 1-2px blue border + blue text + small + glyph after); the outlined-blue-with-plus-glyph pill is signature CTA vocabulary for inline secondary actions, transferable to any 'add/subscribe/RSVP' inline action",
    "FULL-BLEED RIGHT-ANCHORED HERO PHOTO + LEFT TEXT (50/50 organic split) — the hero photograph runs full-bleed but is positioned anchored to the RIGHT 60-65% with the LEFT 35-40% being a darker indigo-fade zone for the heading text; the photo edge softens into the indigo bg via subtle gradient creating an organic 60/40 split rather than a hard horizontal divide; signature hero composition for music-portal/blog hero contexts",
    "BLUE GENRE-TAG TEXT in album leaderboard genre column — the Top Albums tabular Genre column uses 14-15px sans medium VIVID BLUE #4F8FFF text for genre values ('Pop' / 'Videos' / 'Rock' / 'Jazz' / 'Ballad'); the blue-as-genre-classifier-text gives the column instant scannability as a category dimension separate from the album title (white) and artist (gray)",
    "TINY TRACKING-WIDE ALL-CAPS LABELS in footer contact info — footer Contact Us column uses TINY TRACKING-WIDE ALL-CAPS LABELS ('ADDRESS' / 'PHONE' / 'EMAIL' in 11-12px muted-gray sans) ABOVE each contact value (in 13-15px regular WHITE) — 2-line stacked structure with the small caps label as a discrete prefix",
    "POST CARDS WITH BOTTOM-OVERLAID DATE + TITLE — Latest Posts 3-card grid uses full-bleed photo cards with content (small date label gray + 2-line post title bold WHITE) BOTTOM-OVERLAID INSIDE each card photograph (with subtle bottom-fade gradient for legibility); same overlay convention as Latest Videos creating a unified content-card vocabulary across the design",
    "CIRCULAR BLUE PLAY BUTTON for tabular album rows — each album leaderboard row uses a CIRCULAR BLUE PLAY BUTTON (~32-40px solid blue #4F8FFF circle with white play triangle inside) positioned between the rank number and the thumbnail; the play-button-in-row is the design's primary interaction affordance and immediately signals 'click to play' Spotify/SoundCloud-style — works for any audio/podcast/music context with track-list-row interactions",
  ],
  uniqueTechniques: [
    "Multi-color brand-pill social icons as scoped exception to single-blue discipline — using SOLID BRAND-COLORED SQUARE PILL TILES for footer social icons (each platform in its actual brand color) is more distinctive than typical white-outline social icons + creates a small-scale rainbow moment scoped to the one place where brand-recognition is the goal; transferable to any context wanting authentic platform recognition over visual unity",
    "Mixed-weight gray+bold-white section heading vocabulary — using TWO-WORD section headings where the temporal-modifier ('Latest' / 'Top') is gray + the content-type ('Events' / 'Songs' / 'Albums') is bold-white creates a typographic structure that's more interesting than uniform-bold headings + immediately readable as 'time + thing'; transferable to any content-platform with section-heading systems (Latest Posts / Top Trending / Most Liked etc.)",
    "Circular date badge inside event card photo (top-left position) — placing a small CIRCULAR BLUE DATE BADGE (day-large + month-small as 2-line stack inside the circle) at TOP-LEFT inside each event card photograph turns the date into a visual stamp/anchor rather than a separate metadata field; transferable to any event/calendar/blog context where date-prominence matters",
    "Tabular Spotify/iTunes album leaderboard with inline circular play buttons — using a TABULAR LAYOUT with columns (# / title-artist / genre / hits) + a CIRCULAR BLUE PLAY BUTTON inline on each row instantly signals 'this is a music library' without explicit metaphor; transferable to any audio/podcast/playlist/track-listing context",
    "Right-anchored hero photo organic-fade-into-indigo-bg — positioning the hero photograph anchored to the RIGHT 60-65% with the LEFT 35-40% being a darker indigo-fade zone (created by subtle gradient softening the photo edge into the bg) creates an organic asymmetric hero that feels editorial rather than full-bleed-cinematic; transferable to any portal/blog/library hero context where text needs space without losing the photo immersion",
    "Bottom-overlaid title+meta on video/post photo cards — placing content (date / title / artist) BOTTOM-ANCHORED INSIDE each photo card via overlay with subtle bottom-fade gradient is more compact than separate-card-text-below + creates a Netflix/Pinterest-style content-discovery feel; transferable to any image-heavy content grid (videos, posts, articles, shows)",
    "Minimal hamburger+logo only nav for content-portal/library — using just hamburger LEFT + logo (no center links, no inline CTA, no right-side buttons) reads as content-platform/library/blog rather than marketing-funnel; transferable to any content-discovery brand wanting app-like navigation",
  ],
  spacing:
    "Ambient indigo music-portal spacing — sections separated by 64-96px on desktop (tighter than typical marketing-site spacing — feels content-portal/library-like, dense without being cramped). Hero is full-viewport with content LEFT-anchored at ~5-7% from edge + vertically-centered. Hero title-to-attribution gap 12-16px. Mixed-weight section headings have ~32-48px gap to the content grid below. Latest Events 3-card grid 24-32px column gaps + circular date badge positioned 12-16px from top-left of the card photo. Latest Songs 4-card grid 16-24px column gaps + 12-16px gap between square photo and centered title below. Top Albums tabular leaderboard rows 12-16px vertical spacing + 1px hairline bottom-divider per row + 16-24px gaps between table columns. Latest Videos 2x2 grid 16-24px gaps. Latest Posts 3-card grid 24-32px column gaps. Footer 4-column grid 32-48px column gaps + 16-24px internal vertical spacing within each column. Multi-color brand-pill social icons 6-10px gaps between pills. Section headings + content gap 24-32px. Card internal padding minimal (8-16px) since most cards are photo-dominated with bottom-overlay text. Circular date badges 12-16px from card edges. Circular play buttons 12-16px from rank number + thumbnail. Overall feeling is dense-content-portal — tighter than marketing sites, looser than data tables — the spacing of a music library/discovery interface like Spotify/SoundCloud/Bandcamp.",
  moodKeywords:
    "dark, ambient, indigo, music-portal, blog, community, library, soft, calm, content-discovery, spotify-style, jamendo, soundcloud, music-blog, music-library, dark-blue, content-platform, multi-color-social, mixed-weight-typography, square-cover-grid",
  animations:
    "Soft music-portal motion — hero photo: very slow zoom (1.0 → 1.03 over 14s) for ambient life. Hero text fade-in: heading slides up 24px → 0 with fade (0.6s ease-out), attribution fades in (0.3s delay). Mixed-weight section headings: fade-in 0.4s ease-out on scroll. Event cards: stagger fade-up on scroll (0.1s between cards, 0.5s ease-out, y-32px → 0); circular date badges scale-in (0.95 → 1.0 with stagger 0.05s after card appears); hover on card → subtle lift (translateY -4px) + box-shadow increase + the date badge brightens slightly. Outlined RSVP+ pill hover → bg fills blue + text turns white + the + glyph rotates 90° to ×. Square photo song cards: stagger fade-up (0.08s between cards); hover → subtle scale 1.0 → 1.03 + a subtle PLAY icon overlay fades in centered on the photo (semi-transparent dark overlay + white play triangle) — communicates 'click to play this song'. Top Albums tabular rows: stagger fade-in (0.06s between rows); hover on row → row bg lightens slightly + the CIRCULAR BLUE PLAY BUTTON brightens + slight scale 1.0 → 1.05; click play → subtle pulse on the play button + a small sound-wave equalizer animation could appear briefly. Genre tag text hover → underline expands from left. Latest Videos 2x2 grid: stagger fade-up; hover → scale 1.0 → 1.03 + a PLAY icon overlay fades in centered (similar to song cards but the play icon is larger ~64px). Latest Posts 3-card grid: stagger fade-up; hover → subtle scale + the bottom-overlay text brightens slightly. Multi-color brand-pill social icons: stagger fade-in (0.05s between, 0.4s ease-out scale 0.9 → 1.0); hover → slight scale 1.0 → 1.1 + slight brightness pulse + the icon does a tiny wiggle. Footer column links hover → subtle color shift to blue + 2-3px translate-x right. Hamburger menu icon hover → all 3 lines slightly translate-x with stagger creating a wave. Wordmark 'ORAZ MUSIC' hover: the gray 'MUSIC' subtly brightens to slightly-lighter-gray. Overall motion is calm-deliberate-content-portal — never bouncy, never aggressive, never fast — the cadence of a comfortable music library where you browse leisurely.",
  heroTreatment:
    "FULL-BLEED RIGHT-ANCHORED MUSICIAN/PERFORMER HERO with left-anchored heading + sub-attribution. The hero photograph is a cinematic vocalist/musician photograph (a singer holding a microphone close to their face with eyes closed in performance, OR a guitarist playing intensely, OR a band on stage — dramatic stage-lit lighting with cool indigo/blue ambient background) positioned anchored to the RIGHT 60-65% of the hero with the LEFT 35-40% being a darker indigo-fade zone (created by subtle gradient softening the photo's left edge into the section's indigo #1A1F35 bg) for the heading text. NAV (overlaid at the very top of the hero, transparent floating bar): LEFT a small WHITE HAMBURGER MENU ICON (~20-24px, 3 horizontal lines) + ORAZ MUSIC wordmark beside it (small ~120-140px wide, 'ORAZ' in white bold sans + slight letter gap + 'MUSIC' in muted-light-gray sans medium of the same size); the entire nav is INTENTIONALLY MINIMAL — NO center nav links, NO inline CTA, NO right-side buttons — just hamburger + logo. INSIDE the hero, content is LEFT-ALIGNED starting around 5-7% from the left edge and VERTICALLY CENTERED: 36-56px sans bold (700) WHITE 1-line track-title heading 'Golden Dragon Internal Flight' (or domain-equivalent featured-track / featured-event / featured-piece title), BELOW it ~12-16px gap to a 14-16px regular sans LIGHT-GRAY-INDIGO #B8BBC8 1-line sub-attribution 'Estas Tonne. Shardo Studios 2016' (or domain-equivalent artist + studio + year credit). NO play button overlay (this is a portal/discovery hero, not a click-to-watch hero — the listening happens in the song/album/video sections below), NO carousel arrows, NO pagination dots — the hero is intentionally minimal/sparse, letting the photograph + 2 lines of text do all the work. The overall feeling is calm content-portal/blog/community — the visual equivalent of a music magazine cover or a Spotify featured-artist page — soft, ambient, indigo-cool, exploratory.",
};

const record = {
  name: "Oraz Music Ambient Indigo Music Portal",
  industries: [
    "music",
    "music portal",
    "music blog",
    "music community",
    "music library",
    "music discovery",
    "music magazine",
    "music journalism",
    "music news",
    "music reviews",
    "music platform",
    "music service",
    "music streaming",
    "music app",
    "music site",
    "music website",
    "audio platform",
    "audio library",
    "audio community",
    "audio app",
    "music label",
    "record label",
    "indie music label",
    "music distribution",
    "music industry",
    "music charts",
    "music rankings",
    "music aggregator",
    "playlist platform",
    "playlist sharing",
    "playlist community",
    "podcast platform",
    "podcast network",
    "podcast directory",
    "podcast community",
    "podcast blog",
    "audiobook platform",
    "audiobook library",
    "music event listing",
    "concert listing",
    "concert directory",
    "live music platform",
    "music festival platform",
    "festival listing",
    "music venue",
    "music venue listing",
    "music news site",
    "music critic",
    "music critique",
    "musician portfolio",
    "artist portfolio",
    "band portfolio",
    "band website",
    "musician website",
    "song lyrics platform",
    "lyrics website",
    "lyrics community",
    "music education",
    "music school",
    "music tutorial",
    "music learning platform",
    "instrument learning",
    "music sheet platform",
    "sheet music website",
    "dj platform",
    "dj community",
    "remix platform",
    "remix community",
    "beat marketplace",
    "beat selling",
    "music sample library",
    "sample marketplace",
    "music software",
    "audio software",
    "music production tool",
    "audio gear marketplace",
    "music equipment",
  ],
  moods: [
    "dark",
    "ambient",
    "indigo",
    "music-portal",
    "blog",
    "community",
    "library",
    "soft",
    "calm",
    "content-discovery",
    "spotify-style",
    "jamendo",
    "soundcloud",
    "music-blog",
    "music-library",
    "dark-blue",
    "content-platform",
    "multi-color-social",
    "mixed-weight-typography",
    "square-cover-grid",
    "music-community",
    "music-magazine",
    "ambient-music-portal",
    "midnight-blue",
    "calm-portal",
  ],
  color_mode: "dark",
  brief_json: brief,
};

console.log("[upload] Inserting Oraz Music ambient indigo music portal pattern into design_patterns...");

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
