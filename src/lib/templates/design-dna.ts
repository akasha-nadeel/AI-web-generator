/**
 * Design DNA — maps each template to EXACT, CONCRETE design specifications.
 * When a user clicks "Generate Like This" on a template, this DNA gets injected
 * into the AI generation prompt so it produces a site that MATCHES the template's design.
 *
 * These are NOT vague guidelines — they are specific design rules the AI must follow.
 */

export interface DesignDNA {
  /** Template display name */
  name: string;
  /** Exact design rules the AI must follow — written as a prompt block */
  designRules: string;
}

export const TEMPLATE_DESIGN_DNA: Record<string, DesignDNA> = {
  restaurant: {
    name: "Sunrise Bistro",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Primary accent: #E94222 (warm red-orange) — use for CTA buttons, hover states, star ratings, marquee bg
- Background cream: #FEF6DF (warm cream) — used for menu, testimonials, blog sections
- White sections: #fff — used for about, team, locations sections
- Dark sections: #000 — used for nav, hero, specials, footer
- Text on light: #171717, body text at rgba(23,23,23,0.6)
- Text on dark: #fff, body text at rgba(255,255,255,0.75)
- Labels on light: rgba(23,23,23,0.4)
- Labels on dark: rgba(255,255,255,0.35)
- Card backgrounds: #fff with soft multi-layer shadow

**TYPOGRAPHY:**
- Heading font: 'Anton' (condensed) — import from Google Fonts. Use font-weight 400 (Anton is inherently bold)
- Body font: 'DM Sans' — import from Google Fonts
- Label font: 'Courier New', monospace — for section labels only
- ALL headings: uppercase, letter-spacing -0.01em, font-weight 400 (not 700)
- Hero title: clamp(48px, 7vw, 100px), Anton, uppercase, white
- Large section headings: clamp(40px, 6vw, 80px), Anton
- Medium section headings: clamp(36px, 5vw, 64px), Anton
- Body text: 14-17px, DM Sans, font-weight 400
- Testimonial quotes: 17px, DM Sans, italic

**HERO SECTION:**
- Full-viewport, bg #000, food photography with gradient overlay: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55))
- Content at bottom (justify-content: flex-end)
- Title: clamp(48px, 7vw, 100px), Anton, uppercase, white, max-width 700px
- Bottom row: subtitle left (16px, rgba(255,255,255,0.75)) + stat number right (72px, Anton)
- CTA button: pill (border-radius 56px), bg #E94222, white text, 48px height, font-weight 700
- Padding: 0 80px 48px (desktop)

**SECTION LABELS — CRITICAL:**
- Wrapped in curly braces: {About Us}, {Our Menu}, {Chef's Special}, {Testimonials}
- Font: 'Courier New', monospace, 14px
- Color on light bg: rgba(23,23,23,0.4)
- Color on dark bg: rgba(255,255,255,0.35)

**BUTTONS:**
- Primary CTA: border-radius 56px (full pill), bg #E94222, color #fff, font-weight 700, height 48px, padding 0 32px, DM Sans, 15px
- Secondary: border-radius 56px, transparent bg, border 1.5px solid rgba(23,23,23,0.2), color #171717, font-weight 700
- Menu card button: border-radius 56px, bg #000, color #fff, full-width, 13px uppercase, letter-spacing 0.03em
- Hero CTA has arrow suffix →

**SECTION ORDER (backgrounds):**
1. Nav (#000 black)
2. Hero (#000 with food image)
3. Marquee (#E94222 red, scrolling ticker with ✦ diamond separators)
4. About (#fff white)
5. Menu (#FEF6DF cream)
6. Specials (#000 black, frosted glass card: rgba(255,255,255,0.06) bg)
7. Testimonials (#FEF6DF cream)
8. Team (#fff white)
9. Locations (#fff white, cards with gradient overlays)
10. Blog (#FEF6DF cream)
11. Footer (#000 black)

**CARD STYLES:**
- Border-radius: 10px on all cards
- Shadow: 0 0.6px 1.5px rgba(0,0,0,0.08), 0 2.3px 5.9px rgba(0,0,0,0.06), 0 10px 26px rgba(0,0,0,0.02)
- Menu card images: aspect-ratio 5/4
- Blog card images: aspect-ratio 3/4 (tall/portrait)
- Team member images: border-radius 10px, aspect-ratio 3/4
- Location cards: border-radius 12px, aspect-ratio 7/5, gradient overlay

**LAYOUT:**
- Max-width: 1440px centered (NOT 1200px)
- Section padding: 112px 80px (desktop), 80px 24px (mobile)
- Grid gaps: 24px
- Nav: flat black bar, 16px 80px padding, brand 20px Anton uppercase, links rgba(255,255,255,0.7)

**FOOTER:**
- Photo gallery strip (5 columns, square images, 10px radius)
- Dashed divider: 1px dashed rgba(255,255,255,0.15)
- Newsletter: pill-shaped input + circular red submit button
- Giant brand name: clamp(64px, 12vw, 180px), Anton, #FEF6DF cream color
- 3 link columns, copyright bar at bottom

**SIGNATURE ELEMENTS:**
- {Curly brace} section labels in Courier New monospace
- Marquee with ✦ diamond separators on #E94222 red background
- Star ratings: ★ character in #E94222
- Numbered specials: 01, 02, 03, 04 in Courier New, primary red
- Price: 20px, DM Sans, font-weight 700
`,
  },

  portfolio: {
    name: "Portfolio Studio",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- DARK MODE throughout — every section is dark
- Primary accent: #f97316 orange — use sparingly (progress bars, dots, active tags, featured buttons, checkmarks)
- Section backgrounds alternate: #111 and #0d0d0d
- Card backgrounds: #151515, #1a1a1a, #1c1c1c
- Text: #fff for headings, rgba(255,255,255,0.25) to rgba(255,255,255,0.4) for body (very ghostly/muted)
- Borders: rgba(255,255,255,0.06) to rgba(255,255,255,0.15) (barely visible)
- html/body background: #111

**TYPOGRAPHY:**
- Heading font: 'Space Grotesk' — import from Google Fonts
- Body font: 'DM Sans' — import from Google Fonts
- Hero name: clamp(80px, 14vw, 150px), font-weight 900, uppercase, letter-spacing -3px
- Section titles: clamp(32px, 5vw, 52px), font-weight 400, ITALIC, color rgba(255,255,255,0.75) — NOT bold
- Section labels: 12px, uppercase, letter-spacing 2px, rgba(255,255,255,0.2-0.4)
- Body text: 10.5px-13px, uppercase, letter-spacing 0.5px — ultra-small and muted
- ALL text is uppercase throughout the site

**SECTION LABELS — CRITICAL:**
- Prefix: // (double forward slash)
- Examples: //ABOUT ME, //WHAT I DO?, //RECENT WORK, //PRICING, //TESTIMONIAL, //STATS
- Style: 12px, uppercase, letter-spacing 2px, rgba(255,255,255,0.2-0.4)

**HERO SECTION:**
- Full viewport (100vh) with full-bleed portrait photograph (object-fit cover, object-position center 20%)
- Name: clamp(80px, 14vw, 150px), font-weight 900, uppercase, white, Space Grotesk
- Availability badge: small green glowing dot (8px, box-shadow glow in #f97316) + text 13px
- Role line: preceded by a 28px × 2px horizontal line in #f97316, then role text
- Rate block: absolute positioned bottom-right, large number clamp(48px, 6vw, 72px)
- Social buttons: vertical strip, 42px × 42px each, border-radius 12px, bg rgba(255,255,255,0.06)
- Full-width CTA at bottom: border-radius 16px, bg rgba(255,255,255,0.03), border rgba(255,255,255,0.08)

**BUTTONS:**
- Primary CTA: padding 14px 32px, bg #f97316, border-radius 4px (sharp!), 12px uppercase, letter-spacing 1.5px
- Secondary: border 1px solid rgba(255,255,255,0.12), border-radius 4px, transparent bg
- Featured pricing button: border-radius 24px, bg #f97316
- Nav CTA: border-radius 6px, border rgba(255,255,255,0.2), bg rgba(255,255,255,0.05), 11px uppercase

**SECTION PATTERNS:**
1. Skills: 4-column grid, each card has skill name + /01 /02 number, percentage display with diagonal hatch pattern overlay, progress bar in #f97316
2. Services: 2-column (list left, preview right), service names as large italic text clamp(32px, 4vw, 52px), hover changes color to white
3. Projects: 2-column split, project cards with 4px border-radius, numbered items
4. Pricing: 3-column, bg #111, border-radius 12px, "Pro" badge in #f97316, checkmark features with ✓ in orange
5. Testimonials: horizontal scrolling rows (2 tracks offset), cards 430px wide, bg #151515, border-radius 12px, colored avatar squares
6. Stats: 4-column grid, bordered cells, large numbers clamp(40px, 5vw, 56px) weight 800
7. CTA: centered, massive uppercase heading clamp(48px, 10vw, 100px), weight 900
8. Footer: full-viewport portrait image bg, brand watermark, minimal bottom bar

**LAYOUT:**
- Section padding: 96px 48px (desktop), 64px 20px (mobile)
- Section separators: 1px solid rgba(255,255,255,0.06) border-top on every section
- Max-width varies: most sections 1200px
- Minimal border-radius: mostly 4px, exceptions at 10-12px for avatars/testimonial cards
- No standard nav links — just brand (italic with . colored orange) + single CTA
- Brand dot: the period "." after brand name is colored #f97316

**SIGNATURE ELEMENTS:**
- // double-slash section label prefix
- Ultra-muted body text (0.25-0.4 opacity)
- Ultra-small text sizes (10-13px)
- Everything uppercase
- Section titles are italic + light weight (400), NOT bold
- Diagonal hatch pattern on skill cards
- Horizontal scrolling testimonial tracks
- Two full-viewport image sections (hero + footer)
`,
  },

  agency: {
    name: "A GenC Creative Studio",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Primary accent: #3b82f6 blue — for label dots, pricing label, process step labels, green checkmarks use #4ade80
- Light sections: #f5f5f5 (NOT white, NOT #fff) — about, projects, process, testimonials, FAQ
- Dark sections: #0a0a0a — team, pricing
- Hero background: #111 with background image
- Card backgrounds: #fff on light sections, #161616 or #141414 on dark sections
- Card borders: 1px solid #eee (light) or rgba(255,255,255,0.06) (dark)
- Text on light: #111
- Text on dark: #fff, body at rgba(255,255,255,0.3-0.5)
- Muted text: #888, #999

**TYPOGRAPHY:**
- Heading font: 'Inter' — import from Google Fonts
- Body font: 'Inter' — same font
- Hero brand name: clamp(72px, 14vw, 190px), font-weight 900, capitalize, letter-spacing -4px
- Section titles: clamp(36px-48px, 5vw-8vw, 52px-96px), font-weight 800-900, ITALIC, letter-spacing -1px to -3px
- Body text: 12-14px, font-weight 400-500, color #888
- Labels: 12px, font-weight 600

**SECTION LABELS — CRITICAL:**
- Prefix: filled bullet dot (7px circle) before the label text
- Use CSS ::before pseudo-element with a 7px × 7px circle, background #111 (light sections) or #fff (dark sections) or {{primary}} (pricing)
- Text: 12px, font-weight 600, Inter
- Examples: • Why choose us, • Case studies, • Our Crew, • Client Feedback, • How we work

**HERO SECTION:**
- Full viewport (100vh), bg #111 with full-bleed image (opacity 0.65)
- Massive brand name: clamp(72px, 14vw, 190px), weight 900, capitalize, with ® superscript
- Label below: 36px white line + 11px uppercase label text, letter-spacing 4px
- Bottom area: slash "/" divider + italic description (14px) on left, two CTAs on right
- CTA 1: pill (border-radius 40px), bg rgba(255,255,255,0.06), border rgba(255,255,255,0.12), with green dot ::after
- CTA 2: pill (border-radius 40px), bg #fff, color #111, with arrow SVG
- "Scroll down" text rotated 90° on right edge

**BUTTONS:**
- Hero CTAs: border-radius 40px (pill), 14px 28px padding, 12px uppercase
- Card buttons: border-radius 12px, bg #111, color #fff, 13px, font-weight 600
- Pricing buttons: border-radius 14px, varied styles per tier (white filled, transparent outlined, dark #222)
- Pricing features: ✓ checkmark in green (#4ade80) circles

**SECTION ORDER:**
1. Nav (absolute, transparent) — brand left, pill-shaped glass nav center, book + calendar right
2. Hero (#111 + image)
3. About (#f5f5f5) — split layout: image left, description + stats cards right. Stat cards: white bg, border-radius 16px
4. Projects (#f5f5f5) — numbered project grid (01. 02. 03. etc), cards with 16px border-radius, row 1: 2-col (1.85fr 1fr), row 2: 3-col
5. Team (#0a0a0a) — staggered cards (2nd card offset 60px down, 3rd offset 120px), circular 180px portraits, corner bracket decorations, bg #161616, border-radius 16px
6. Testimonials (#f5f5f5) — large card with quote, portrait, brand logos, navigation arrows, stats row below (3-column)
7. Process (#f5f5f5) — numbered step cards .01 .02 .03, first card dark #111, rest white, border-radius 20px, large watermark numbers
8. Pricing (#0a0a0a) — 3-tier grid, bg #141414, Monthly/Yearly toggle, feature checklists with green checkmarks
9. FAQ (#f5f5f5) — centered accordion
10. Blog (#f5f5f5) — article cards
11. Contact (#0a0a0a)
12. Footer (#0a0a0a)

**LAYOUT:**
- Section padding: 96px 48px (desktop), 64px 20px (mobile)
- Light sections separated by 1px solid #e5e5e5 border-top
- Max-width: 1200px centered
- Card border-radius: 16px (about cards), 20px (process/pricing), 12px (images)
- Star ratings: ★ in #e8a838 gold

**SIGNATURE ELEMENTS:**
- Bullet dot • label prefix (7px filled circle)
- Section titles are ITALIC + bold (800-900 weight)
- Staggered team card layout with corner bracket decorations (::before/::after)
- Numbered project items (01. 02. 03. etc)
- Process steps with .01, .02, .03 numbered format
- ® superscript on brand name
- Nav is pill-shaped glass bar (backdrop-filter blur)
`,
  },

  ecommerce: {
    name: "Chicago Storefront",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Primary accent: #e8490c red-orange — for brand dot, category labels, CTA highlights
- Background: #f5f5f0 warm off-white — main page background
- Dark sections: #111 — marquee bar, promo sections, footer
- Text: #111 on light, #fff on dark
- Muted text: rgba(0,0,0,0.5) on light, rgba(255,255,255,0.5-0.75) on dark
- Card backgrounds: #fff on light sections

**TYPOGRAPHY:**
- Heading font: 'DM Serif Display' (elegant serif) — import from Google Fonts, use font-weight 400, ITALIC style for hero
- Body font: 'Inter' — import from Google Fonts
- Hero headline: 56px, font-weight 400, font-style italic, DM Serif Display, white
- Section titles: 36-48px, DM Serif Display
- Product names: DM Serif Display, medium weight
- Body/descriptions: 14px, Inter, font-weight 400
- Nav brand: 22px, font-weight 400, DM Serif Display

**NAV:**
- Transparent over hero image
- Centered brand with colored dot (10px circle in #e8490c) before the brand name
- Left: text links (14px, Inter, white)
- Right: search icon + shopping bag icon
- Grid layout: 3-column (left links | center brand | right icons)

**HERO SECTION:**
- Full viewport (100vh), full-bleed lifestyle photo with bottom gradient overlay
- Content at bottom: 2-column grid (1.4fr + 0.6fr)
- Left: large italic serif headline (56px, DM Serif Display, italic, white)
- Right: description text (14px) + white pill CTA button
- CTA: pill (border-radius 40px), bg #fff, color #111, 13px font-weight 500, border rgba(255,255,255,0.3)

**SECTION PATTERNS:**
1. Marquee (#111): scrolling announcement strip, 11px uppercase, letter-spacing 0.12em
2. Featured Products (#f5f5f0): product cards with gray photo background, orange category label, product name in serif, price
3. Promo Banner: split image + text, accent colored elements
4. Shop All (#f5f5f0): full product grid
5. Reviews: customer review cards
6. Brand Story: split layout with image and text
7. Footer (#111): dark, multi-column links, brand with dot

**BUTTONS:**
- Primary: pill (border-radius 40px), bg #fff or #111 depending on section, height 44px
- Product cards: subtle, minimal
- All buttons: 13px, font-weight 500, Inter

**LAYOUT:**
- Max-width: 1400px centered
- Section padding: 80-100px vertical
- Card border-radius: 10px
- Warm off-white #f5f5f0 main background
- Clean, editorial feel — let the products be the focus
- Product images on neutral/gray backgrounds

**SIGNATURE ELEMENTS:**
- Colored dot before brand name (10px circle in #e8490c)
- Italic serif headlines (DM Serif Display italic)
- Scrolling announcement marquee strip
- Warm off-white background throughout
- Minimal, editorial layout focused on products
`,
  },

  blog: {
    name: "Muse Editorial Blog",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Primary accent: #d4e510 lime/yellow-green — CTA buttons, highlights
- Background: dark — hero uses photo, other sections use photo-based or minimal dark/white contrast
- Text on dark: #fff, muted at rgba(255,255,255,0.4-0.7)
- Trust logos: rgba(255,255,255,0.5), uppercase, 16px, font-weight 700
- CTA button text: #0a0a0a (dark text on lime bg)

**TYPOGRAPHY:**
- Heading font: 'DM Sans' — import from Google Fonts
- Body font: 'DM Sans' — same font
- Hero headline: 72px, font-weight 400 (NOT bold), letter-spacing -2px, DM Sans
- Section headings: 48px, font-weight 400, letter-spacing -1.5px
- Body text: 15-16px, DM Sans, font-weight 400
- Nav: brand 16px font-weight 500, links 14px font-weight 400

**NAV:**
- Absolute positioned over hero, transparent background
- Brand with dot prefix: 6px white circle before brand name
- Brand: 16px, font-weight 500, rgba(255,255,255,0.9), letter-spacing 0.5px
- Links: 14px, rgba(255,255,255,0.6), DM Sans
- Right CTA: text link "Subscribe", 14px, font-weight 500, white

**HERO SECTION:**
- Full viewport (100vh), full-bleed lifestyle photograph
- Gradient overlay: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65))
- Centered content: headline 72px + subtitle 16px + lime CTA button
- CTA button: pill (border-radius 30px), bg #d4e510 lime, color #0a0a0a dark, height 52px, padding 0 36px, 15px font-weight 600
- Trust bar at bottom: border-top rgba(255,255,255,0.1), centered trust label + logo names in uppercase

**SECTION PATTERNS:**
1. White sections: clean white bg with bold headline, paragraph text, optional CTA — creates contrast
2. Photo sections: full-bleed editorial photos (min-height 85vh) with overlaid headline at bottom-left, gradient overlay
3. Article grid: article cards with images, category tags, dates, excerpts
4. Newsletter: lime CTA button for email signup

**BUTTONS:**
- Primary: pill (border-radius 30px), bg #d4e510 lime, color #0a0a0a, height 52px, padding 0 36px, 15px font-weight 600
- Text links: underlined or plain, font-weight 500

**LAYOUT:**
- Max-width: 1400px for wide sections, 800px for text content
- Emphasis on full-bleed photography — images are the star
- Alternating: photo section → white text section → photo section
- Generous whitespace in text sections
- Minimal, editorial feel — no heavy UI elements

**FOOTER:**
- Dark background
- Multi-column links
- Minimal, clean
- Brand with dot prefix

**SIGNATURE ELEMENTS:**
- Dot prefix before brand name (6px white circle)
- Lime/yellow-green #d4e510 as the only accent color
- Large editorial photography sections with gradient overlays
- Alternating photo and white text sections
- Headings are light weight (400), NOT bold
- Trust bar at bottom of hero with branded logo names
`,
  },

  fitness: {
    name: "WARAS Fitness Club",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Primary accent: #fd6934 vibrant orange — CTA buttons, nav CTA
- Secondary accent: #dbff02 electric lime — marquee background, secondary highlights
- Tertiary: #00c4d1 teal/cyan — class category tags
- Background: #000 pure black for most sections
- White section: #fff for split/coaching section only
- Text: #fff on dark, #000 on white sections
- Muted text: rgba(255,255,255,0.5-0.7) on dark, rgba(0,0,0,0.5-0.6) on light

**TYPOGRAPHY:**
- Heading font: 'Manrope' — import from Google Fonts
- Body font: 'Manrope' — same font
- Hero heading: 64px, font-weight 800, uppercase, letter-spacing -0.5px
- Section titles: 48px, font-weight 600
- Body text: 16px, font-weight 400-500
- Stat numbers: 48px, font-weight 800
- Nav brand: 16px, font-weight 800, uppercase, letter-spacing 1px
- Labels: 13px, font-weight 500, uppercase, letter-spacing 0.03em

**NAV:**
- Absolute positioned, transparent background
- Brand: uppercase, 16px, font-weight 800, letter-spacing 1px
- Links: 14px, rgba(255,255,255,0.7), font-weight 500
- CTA: pill (border-radius 40px), bg #fd6934, color #fff, 13px font-weight 600, height 40px

**HERO SECTION:**
- Full viewport (100vh), full-bleed gym photo with bottom gradient: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 50%, black 100%)
- Content centered at bottom, max-width 800px
- Label: 13px, uppercase, rgba(255,255,255,0.6)
- Heading: 64px, font-weight 800, uppercase, white, centered
- Subheadline: 16px, rgba(255,255,255,0.7), centered
- Dual CTAs: primary pill (bg #fd6934) + secondary pill (transparent, border rgba(255,255,255,0.3))

**BUTTONS:**
- Primary: pill (border-radius 40px), bg #fd6934, color #fff, height 48px, padding 0 28px, 14px font-weight 600
- Secondary: pill (border-radius 40px), transparent bg, border 1px solid rgba(255,255,255,0.3), color #fff
- On white section: pill (border-radius 40px), bg #000, color #fff

**SECTION ORDER:**
1. Nav (absolute, transparent)
2. Hero (#000 + gym photo + gradient)
3. Stats (#000) — 4-column grid with vertical dividers (1px rgba(255,255,255,0.1)), numbers 48px weight 800, labels 14px
4. Marquee (#dbff02 lime) — scrolling text band, 14px, font-weight 700, black text, uppercase, ★ separator
5. Locations (#000) — 3-column card grid, aspect-ratio 0.73, gradient overlay, city + name overlay
6. Split (#fff white) — 2-column: text left (48px heading, 16px description, black pill CTA) + large image right (border-radius 12px)
7. Promo (#000) — promotional banner/section
8. Classes (#000) — 3-column card grid, aspect-ratio 0.73, color-coded category tags (green #357A5A, red #CB3B31, teal #00C4D1), difficulty + duration meta
9. CTA (photo bg) — full-bleed photo, 70vh min-height, centered uppercase heading 56px, orange CTA
10. Footer (#000) — brand, tagline, 4 link columns, contact emails, photo gallery row, copyright

**LAYOUT:**
- Section padding: 80px 40px (desktop), 60px 24px (mobile)
- Max-width: 1200px centered, footer 1400px
- Card border-radius: 10px
- Grid gaps: 16px for cards
- Dark mode throughout except ONE white split section
- Stats use vertical dividers between columns

**SIGNATURE ELEMENTS:**
- Lime-green #dbff02 marquee scrolling band with ★ separators
- Color-coded class category tags
- Stats bar with vertical dividers
- Full-bleed photos with bottom gradient fades
- Uppercase headings throughout
- Pill-shaped buttons everywhere (40px radius)
`,
  },

  realestate: {
    name: "Dwello Premium Real Estate",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this Dwello-style design:

**COLOR SCHEME:**
- Primary accent: #f97316 orange — use for ALL section labels, star ratings, highlights
- Dark sections: #111 black, #1a1a1a slightly lighter dark
- Light sections: #fff white, #f8f8f8 light gray, #f5f5f5 warm gray
- Text on light: #111 black
- Text on dark: #fff white, #999 or #888 for muted/secondary text
- Buttons: #111 black bg with white text OR #fff white bg with #111 text (depending on section)
- Button border-radius: 12px (rounded rectangle, NOT pill/rounded-full)
- Section labels: #f97316 orange, 13px, font-weight 500

**TYPOGRAPHY:**
- Font: 'Montserrat' for EVERYTHING (headings AND body) — import from Google Fonts with weights 400,500,600,700,800
- Hero top title: clamp(52px, 6.5vw, 88px), bold, white
- Hero bottom title: clamp(90px, 15vw, 220px), bold, white — this is the MASSIVE text
- Section headings: clamp(34px, 3.8vw, 46px), font-weight 700
- Body text: 14-15px, font-weight 400
- Section label text: 13px, font-weight 500, #f97316 orange
- Description/tagline text: italic style for elegance

**HERO SECTION — CRITICAL LAYOUT:**
- Full-viewport (100vh) dark hero with building/property background image (object-fit: cover)
- Dark gradient overlay at bottom for text readability
- Title SPLIT across the hero:
  - "Find Your" — top-left area, clamp(52px, 6.5vw, 88px) size
  - "Next Home" — bottom-right area, clamp(90px, 15vw, 220px) MASSIVE size
- Center of hero: small description text (font-weight 400) + white rounded CTA button (border-radius 12px)
- The split creates a diagonal reading pattern across the hero
- Nav overlays the hero (position absolute, transparent bg)

**SECTION LABELS — CRITICAL PATTERN:**
- EVERY section label uses a "✦" (diamond/star) prefix: e.g. "✦ Featured Properties", "✦ Our Services", "✦ Reviews"
- Style: 13px, font-weight 500, color #f97316 orange
- Use CSS ::before pseudo-element with content "✦ " or just put "✦ " directly in the text
- This is NOT a "+" — it is specifically the ✦ character

**BUTTON STYLE — CRITICAL:**
- Background: #111 black with white text (on light sections) or #fff white with #111 text (on dark sections/hero)
- Padding: 14px 30px
- Border-radius: 12px (rounded rectangle — NOT rounded-full, NOT pill shape)
- Font-weight: 500
- Font-size: 14-15px
- Hover: slight brightness increase
- Some buttons have a "+" prefix in their text (e.g. "+ Explore All")

**SECTION PATTERNS — MATCH THESE EXACTLY:**

1. **Featured Listings** (bg: #fff): "✦ Featured Properties" orange label, large heading, location filter tabs as ROUNDED RECTANGLES with 1px border (first tab filled black, rest outlined), 2-column property cards with large image (border-radius 4px), property name, location, specs (beds/baths/sqm), price in bold
2. **Services Section** (bg: #f8f8f8 light gray): tab/filter UI for service types (Buy, Sell, Rent, Manage — rounded rectangle tabs, first filled black, rest outlined), split layout with bullet list left + property images right
3. **Team Section — TWO PARTS**:
   - Part 1 (bg: #fff): "✦ Our Team" label, heading, contact info with orange labels, CTA button, brand tagline
   - Part 2 (bg: #111 dark): team member cards — large portrait photos in dark cards (bg #1a1a1a, border-radius 14px, height ~480px), name and role below
4. **About/Stats Section** (bg: #1a1a1a dark): title, grid of stats with LARGE bold numbers (150, 100M, 150K, etc.) with property images interspersed in the grid
5. **Reviews Section** (bg: #fff): "✦ Reviews" label, heading, review cards with italic quote text, property image, star ratings in #f97316 orange, reviewer avatar circle, name, role
6. **Contact Section** (bg: #111 dark): "✦ Contact us" label, heading, form on left (transparent bg inputs with bottom border only: 1px solid rgba(255,255,255,0.15), padding 10px 0), numbered cards on right (01, 02) with images
7. **FAQ Section** (bg: #fff): "✦ FAQ" label, heading, accordion items with "+" expand icons that become "×" when open
8. **Blog Section** (bg: #f5f5f5 warm gray): "✦ Blogs" label, heading, blog cards with image, category tag, date, title
9. **Footer** (bg: #111 dark): newsletter email input + bordered subscribe button, tagline, multi-column links, GIANT brand name watermark at bottom, copyright bar

**LAYOUT RULES:**
- Section backgrounds follow this exact order: #fff → #f8f8f8 → #fff → #111 → #1a1a1a → #fff → #111 → #fff → #f5f5f5 → #111
- Section padding: 100px top/bottom, 48px sides (desktop). 60px top/bottom, 20px sides (mobile)
- Grid gaps: 24px for card grids, 32px for larger sections
- Max width: 1200px centered
- Every section has the orange "✦ Label" and large heading pattern
- Filter tabs are ROUNDED RECTANGLES with borders — NOT pills
- Card border-radius: 4px for images, 8px for info areas, 14px for team cards
`,
  },

  saas: {
    name: "SaaS Platform",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Primary accent: #6366f1 indigo — buttons, icons, highlights, stat numbers, avatar circles
- Secondary: #4f46e5 deeper indigo
- Lighter accent: #818cf8 for hover states
- Background: #0f0f23 deep dark navy — ALL sections use this as base
- Text: #eef2ff light blue-white
- Muted text: at 0.4-0.5 opacity of #eef2ff
- Cards: background rgba(238,242,255,0.02-0.05), border 1px solid rgba(238,242,255,0.04-0.08)
- Section labels: #6366f1 indigo color

**TYPOGRAPHY:**
- Heading font: 'Inter' — import from Google Fonts
- Body font: 'Inter' — same font
- Hero heading: 88px, font-weight 800, letter-spacing -0.035em, line-height 0.98
- Section titles: 40-44px, font-weight 700, letter-spacing -0.02em
- Body text: 16-17px, font-weight 400, opacity 0.5
- Labels: 13px, uppercase, letter-spacing 0.15em, opacity 0.4 or primary color
- Stat numbers: 36px, font-weight 700, letter-spacing -0.02em

**NAV:**
- Floating pill-shaped glassmorphism navbar
- Max-width 1100px, centered, border-radius 100px
- Background: {{bg}}cc with backdrop-filter blur(24px), border rgba(text,0.03)
- Brand: 20px, font-weight 700, letter-spacing -0.02em
- Links: 14px, opacity 0.65
- CTA: pill (border-radius 100px), bg #6366f1, color #fff, 13px font-weight 600

**HERO SECTION:**
- Full viewport, dark background #0f0f23
- Decorative glow orbs: blurred circles (600px + 400px) in primary/secondary colors at 0.12 opacity
- Top label: dot + uppercase text, 13px, letter-spacing 0.15em
- Heading: 88px, font-weight 800, with accent colored word in #6366f1
- Subheadline: 18px, opacity 0.5, max-width 480px
- CTA: pill (border-radius 100px), bg #6366f1, 15px font-weight 600, with arrow →
- Stats row: 3 stat blocks below (36px numbers, 13px labels)

**SECTION PATTERNS:**
1. Features (bento grid): asymmetric 3-column grid, first and fourth cards span 2 columns. Cards: border-radius 20px, bg rgba(text,0.02), border 1px solid rgba(text,0.04). Icon: 28px emoji in 52px × 52px rounded(14px) bg of primary color at 0.07 opacity
2. Pricing: 3-column cards, border-radius 20px, dark glass cards. Middle card highlighted. Star ratings in #6366f1
3. Testimonials: 3-column card grid, star ratings in primary, avatar initials in primary-colored circles
4. CTA: large bold heading, primary CTA button
5. Footer: multi-column mega footer, dark

**BUTTONS:**
- Primary: pill (border-radius 100px), bg #6366f1, color #fff, padding 16px 36px, 15px font-weight 600
- Hover: translateY(-2px) + box-shadow
- Card hover: translateY(-4px)

**LAYOUT:**
- Dark mode throughout — single background color #0f0f23
- Section padding: 96px 24px
- Max-width: 1200px centered
- Card border-radius: 20px
- Subtle glass/blur effects
- Gradient glow orbs as decorative elements

**SIGNATURE ELEMENTS:**
- Floating glassmorphism pill navbar
- Glow orbs (blurred gradient circles) behind hero
- Bento-style asymmetric feature grid (first card spans 2 columns)
- Everything uses the same dark navy background
- Accent word in headings colored #6366f1
- Label dot prefix (6px circle in primary color)
`,
  },

  education: {
    name: "Academic Institution",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Light mode — background: #ffffff white
- Text: #0f172a dark
- Primary accent: #3b82f6 blue — use for links, buttons, category tags
- Secondary: #2563eb deeper blue
- Cards: white with subtle shadow
- Light sections: #f8fafc very light blue-gray

**TYPOGRAPHY:**
- Heading font: 'Playfair Display' (elegant serif) — import from Google Fonts
- Body font: 'Lora' (readable serif) — import from Google Fonts
- Headings: Playfair Display, 700 weight, large
- Body: Lora, 400 weight, 16px
- Labels and tags: Inter or system sans-serif, small uppercase

**HERO SECTION:**
- Light background with campus photography
- Elegant Playfair Display heading
- Subtitle in muted text
- Blue CTA button + secondary outlined button
- Optional: search bar for courses

**SECTION PATTERNS:**
- Course/program cards: white cards with shadow, category badge in blue, title, duration, instructor, "Enroll" button
- Faculty/instructor profiles: circular photos, name, credentials, department
- Events section: date badge + event title + location
- Stats: large numbers in blue accent (5000+ Students, 200+ Courses, etc.)
- Testimonials: student quotes with photo, name, program
- CTA: blue background section

**LAYOUT:**
- Light mode throughout — #ffffff background
- Section padding: 96px 24px
- Max-width: 1200px centered
- Card border-radius: 20px with subtle borders
- Serif headings (Playfair Display) for scholarly authority
- Academic, clean, professional feel
- Footer: multi-column mega footer
`,
  },

  photography: {
    name: "Photography Portfolio",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Primary accent: #f43f5e rose/red-pink — buttons, highlights, accent words, stat numbers
- Secondary: #e11d48 deeper rose
- Background: #1f0c14 deep dark rose-tinted black — ALL sections
- Text: #fff1f2 light rose-white
- Muted text: at 0.4-0.55 opacity
- Cards: background rgba(255,241,242,0.02-0.05), border 1px solid rgba(255,241,242,0.04-0.08)
- The IMAGES are the color — UI should be minimal

**TYPOGRAPHY:**
- Heading font: 'Playfair Display' (elegant serif) — import from Google Fonts
- Body font: 'Lora' — import from Google Fonts
- Hero heading: large Playfair Display with accent word in #f43f5e
- Section titles: 40px, Playfair Display, font-weight 700
- Body: 16px, Lora, font-weight 400, line-height 1.8
- Labels: 13px, uppercase, letter-spacing 0.15em

**NAV:**
- Transparent overlay on hero
- Brand in Playfair Display
- Links: minimal, 14px
- CTA: pill button, bg #f43f5e

**HERO SECTION:**
- Full-bleed signature photograph taking the viewport
- Dark gradient overlay for text readability
- Heading with accent word in #f43f5e
- Subtitle in muted text
- Rose CTA button (pill, bg #f43f5e)

**SECTION PATTERNS:**
1. Gallery: masonry grid with varied image sizes — THIS IS THE STAR. CSS columns or grid with varied heights
2. About: split layout — image + text with stat numbers in #f43f5e
3. CTA: bold call-to-action section
4. Footer: multi-column mega footer

**BUTTONS:**
- Primary: pill (border-radius 100px), bg #f43f5e, color #fff, 13px font-weight 600
- Hover effects: translateY(-1px) + shadow

**LAYOUT:**
- Dark mode throughout — rose-tinted #1f0c14
- Section padding: 96px 24px
- Max-width: 1200px, gallery can go wider to 1400px
- Card border-radius: 20px
- Minimal UI — let photographs dominate
- Very generous spacing around images
- The images ARE the design — keep everything else subtle

**SIGNATURE ELEMENTS:**
- Rose-tinted dark background (#1f0c14) — unique and warm
- Serif typography (Playfair Display) for elegance
- Rose accent #f43f5e used sparingly
- Image-focused, minimal UI
- Masonry photo grid as centerpiece
- Label dot prefix in rose color
`,
  },

  medical: {
    name: "Healthcare Clinic",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Primary accent: #3b82f6 calming blue — buttons, labels, stat numbers, accent words, icons
- Secondary: #2563eb deeper blue
- Background: #ffffff white — ALL sections use white as base
- Text: #0f172a dark navy
- Muted text: at 0.4-0.55 opacity
- Cards: background rgba(15,23,42,0.02-0.05), border 1px solid rgba(15,23,42,0.04-0.08)
- Success/trust: #22c55e green for checkmarks

**TYPOGRAPHY:**
- Heading font: 'Playfair Display' (trustworthy serif) — import from Google Fonts
- Body font: 'Lora' — import from Google Fonts
- Headings: Playfair Display, 700 weight, with accent word in #3b82f6
- Section titles: 40px, font-weight 700
- Body: 16px, Lora, 400 weight, line-height 1.8 — highly readable
- Labels: 13px, uppercase, letter-spacing 0.15em, #3b82f6
- Credentials: 12px, muted opacity

**NAV:**
- Medical-style nav with healthcare branding
- Brand: Playfair Display, 700 weight
- CTA: pill button, bg #3b82f6, color #fff, "Book Appointment"

**HERO SECTION:**
- Light background with welcoming medical imagery (NOT clinical)
- Serif heading (Playfair Display) with accent word in #3b82f6
- Reassuring subtitle
- Blue CTA pill button "Book Appointment"
- Stats row: bold numbers in #3b82f6 (years, patients, etc.)

**SECTION PATTERNS:**
1. Doctor profile: featured doctor card with photo, name, specialty, credentials
2. Testimonials: patient review cards with star ratings in #3b82f6, avatar initials in blue circles
3. About: split layout — image + text with stat numbers in #3b82f6
4. Team: doctor/staff cards with photos, names, specializations
5. Mission: organization values section
6. Footer: multi-column mega footer

**BUTTONS:**
- Primary: pill (border-radius 100px), bg #3b82f6, color #fff, 13px font-weight 600
- Hover: translateY(-1px) + box-shadow

**LAYOUT:**
- Light mode throughout — NO dark sections
- Section padding: 96px 24px
- Max-width: 1200px centered
- Card border-radius: 20px
- Soft borders, clean layout
- Blue accent conveys trust and calm
- Serif headings give medical authority
- "Book Appointment" CTA prominent throughout

**SIGNATURE ELEMENTS:**
- Serif typography (Playfair Display) for trust
- Calming blue #3b82f6 accent
- Accent word in headings colored blue
- Clean white backgrounds — calming feel
- Stats with blue numbers
- Label prefix dot in blue
`,
  },

  nonprofit: {
    name: "Impact Organization",
    designRules: `
EXACT DESIGN SYSTEM — You MUST match this design:

**COLOR SCHEME:**
- Primary accent: #22c55e green — buttons, stat numbers, accent words, icon backgrounds, CTA
- Secondary: #16a34a deeper green
- Lighter green: #4ade80 for highlights
- Background: #0f1f15 deep green-black — used for base/dark sections
- Text: #f0fdf4 soft green-white
- Muted text: at 0.4-0.5 opacity
- Cards: background rgba(240,253,244,0.02-0.05), border 1px solid rgba(240,253,244,0.04-0.08)
- Section labels: #22c55e green

**TYPOGRAPHY:**
- Heading font: 'Poppins' (friendly, warm) — import from Google Fonts
- Body font: 'Nunito' (rounded, approachable) — import from Google Fonts
- Hero heading: large Poppins with accent word in #22c55e
- Section titles: 40-44px, Poppins, font-weight 700
- Body: 16-17px, Nunito, font-weight 400, line-height 1.6-1.8
- Labels: 13px, uppercase, letter-spacing 0.15em

**NAV:**
- Floating glassmorphism pill navbar
- border-radius 100px, backdrop-filter blur(24px)
- Brand: 20px, Poppins, font-weight 700
- CTA: pill button, bg #22c55e, color #fff, "Donate Now"

**HERO SECTION:**
- Full-bleed emotional hero image (people, community)
- Dark gradient overlay
- Large heading with accent word in #22c55e
- Mission statement subtitle
- Green CTA pill "Donate Now" + secondary ghost button

**SECTION PATTERNS:**
1. Features (bento grid): asymmetric grid, first+fourth cards span 2 columns. Cards with icon, title, description
2. About: split layout — image + text with stats in #22c55e
3. CTA: bold donation/volunteer call-to-action
4. Footer: multi-column mega footer

**BUTTONS:**
- Primary: pill (border-radius 100px), bg #22c55e, color #fff, 13px-15px font-weight 600
- Hover: translateY(-1px) + box-shadow
- "Donate Now" prominent and repeated

**LAYOUT:**
- Dark green-black #0f1f15 as primary background
- Section padding: 96px 24px
- Max-width: 1200px centered
- Card border-radius: 20px with subtle borders
- Warm, inviting, human feel despite dark bg
- Donate CTA appears multiple times

**SIGNATURE ELEMENTS:**
- Warm green accent (#22c55e) — nature/growth feel
- Poppins + Nunito fonts — friendly, approachable
- Floating glass navbar
- Bento feature grid (asymmetric)
- Accent word colored in headings
- Emotional imagery with real people
- Label dot prefix in green
`,
  },
};

/**
 * Build a design DNA instruction string for the AI prompt.
 * This tells the AI EXACTLY what design system to follow.
 */
export function buildDesignDNAPrompt(industryId: string): string {
  const dna = TEMPLATE_DESIGN_DNA[industryId];
  if (!dna) return "";

  return `
### DESIGN SYSTEM — MANDATORY (from template: "${dna.name}")
The user selected a specific template design. You MUST generate a site that MATCHES this design system exactly. This is NOT optional — follow every rule below:
${dna.designRules}
CRITICAL RULES:
- You MUST use the EXACT color values specified above
- You MUST use the EXACT font families specified above (import them from Google Fonts)
- You MUST follow the layout patterns described above
- You MUST match the section structure and ordering
- The generated site should look like it was built from this design system
- Do NOT deviate from the color scheme, typography, or layout patterns
- The site should feel like a sibling of the template — same design DNA, different content`;
}
