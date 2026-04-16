/**
 * Layout patterns organized by style group.
 * Each group returns patterns relevant to a specific design direction.
 */

// ── Universal patterns (always available for marketing pages) ──────

const UNIVERSAL = [
  `- **Split Layout:** Text on one side + large image on the other. Good for: about sections, feature highlights, "why choose us"`,
  `- **Card Grid:** 3-column grid of cards. Good for: services, features, team members, pricing`,
  `- **Image Cards with Data Overlays:** Image-filled cards with badges (rating, price). Good for: destinations, portfolio, menu items, properties`,
  `- **Full-bleed Image Section:** Background image with text overlay and gradient. Good for: hero, CTA, testimonial backgrounds`,
];

// ── Luxury / Elegant patterns ──────────────────────────────────────

const LUXURY = [
  `- **Mixed-Weight Editorial Text:** A large paragraph block where specific words/phrases are \`font-semibold\` or \`font-bold\` while the rest stays \`font-normal\`, creating visual emphasis within flowing body copy. Pair with large font size (\`text-2xl\` or \`text-3xl\`). Good for: about sections, brand stories, mission statements`,
  `- **Split-Phrase Display Heading:** One large heading phrase broken across the layout — e.g. "Radiant Skin" in one area and "Awaits" in another. Words can have different weights: one word bold, another light/outline. Use massive font sizes (\`text-6xl md:text-8xl lg:text-9xl\`). Good for: beauty, luxury, editorial hero sections`,
  `- **Ghost/Watermark Background Text:** A very large word in \`text-gray-100\` or \`opacity-[0.06]\` positioned behind the main content using \`absolute\` positioning and \`text-[8rem] md:text-[12rem] font-bold\`. The foreground heading sits on top. Creates depth without clutter. Good for: product sections, about sections`,
  `- **Mixed Sans-Serif + Italic Serif Headings:** Within the same heading, most words use a clean sans-serif while KEY accent words use an italic serif (e.g. Playfair Display italic + Inter). Apply to headings and large body paragraphs for premium editorial feel. Good for: dental, medical, law, luxury`,
  `- **Parentheses-Wrapped CTAs:** Instead of traditional button borders, wrap CTA text in parentheses: "( Book an Appointment )". Use \`text-sm tracking-wide\` with subtle hover underline. Good for: premium services, editorial, medical, luxury`,
  `- **Large Editorial Paragraph as Section Hero:** The PARAGRAPH itself is the focal point — display-sized text (\`text-2xl md:text-3xl lg:text-4xl leading-relaxed\`) centered, with select phrases in bold italic serif. Good for: about sections, mission statements`,
  `- **Massive Email Typography Footer:** Contact email as giant display text (\`text-5xl md:text-7xl lg:text-8xl font-bold\`) spanning full width. Pair with small email input and centered dark pill nav. Good for: creative agencies, studios, beauty brands`,
];

// ── Tech / SaaS patterns ───────────────────────────────────────────

const TECH = [
  `- **Visual Equation Layout:** [Input collage] **=** [Product Logo] **=** [Output checklist]. Literal large "=" characters between elements. Creates clear value proposition. Good for: AI, SaaS, tech startups`,
  `- **Giant Inline Stats in Paragraphs:** Stat like "$1.4T" or "90%" at 3-4x surrounding text size WITHIN a flowing paragraph. Not in a card — embedded in the sentence. Good for: pitch decks, data-driven pages, fintech`,
  `- **Dot-Notation Process Steps:** Steps numbered "0.01", "0.02", "0.03" with number left, description right, horizontal line between. Creates a technical, systematic feel. Good for: AI, tech, SaaS`,
  `- **Floating Centered Nav Pill:** Nav is a floating pill/capsule (\`mx-auto max-w-2xl rounded-full border shadow-sm px-6 py-3\`) centered at top. Good for: SaaS, design tools, modern startups`,
  `- **Floating Brand Icons Constellation:** Centered stats with brand/app icons scattered at various absolute positions, creating an orbit effect. Good for: SaaS, platforms, marketplaces`,
  `- **Masonry Testimonial Wall:** Pinterest-style masonry (4 columns). Cards at different heights based on quote length. Creates a "wall of love" effect. Good for: SaaS, products with testimonials`,
  `- **Device Mockup Showcase Row:** Horizontal row of phone/device mockups with category labels above each. Tab pills to filter views. Good for: app showcases, design tools`,
  `- **Feature Cards with UI Screenshots:** Large rounded cards (\`bg-gray-50 rounded-2xl p-8\`) with centered UI screenshot. Bold title + small description below. Good for: SaaS features, product capabilities`,
  `- **Logo Marquee Rows:** Multiple horizontal rows of brand logos auto-scrolling with CSS animation. Rows scroll in opposite directions. Good for: SaaS, platforms needing social proof`,
  `- **Serif Heading with Period:** Large serif heading ending with a period — "Discover real-world design inspiration." Declarative, confident feel. Good for: SaaS, editorial, tools`,
];

// ── Bold / Athletic patterns ───────────────────────────────────────

const BOLD = [
  `- **Stats as Giant Numbers:** Large bold statistics (\`text-5xl md:text-6xl font-bold\`) like "1000+", "95%", "9/10" with descriptive subtitle. "+" or "%" symbol in accent color. Good for: social proof, achievements`,
  `- **Avatar Stack with Social Proof:** 3-4 overlapping circular images (\`-ml-3\` each) + bold count text ("23K Users"). Last circle = colored "+" icon. Good for: SaaS, beauty, trust-building hero`,
  `- **Vertical Pill Tags:** Small outlined pill labels stacked vertically (\`flex flex-col gap-2\`): "Real Stories", "Real Results". Good for: testimonials, social proof sections`,
  `- **Giant Stats in Brand Color (Staggered):** MASSIVE numbers (\`text-7xl md:text-8xl font-bold\`) in brand color on white, arranged in scattered layout. Numbers ARE the visual design. Good for: about sections, achievements`,
];

// ── Creative / Agency patterns ─────────────────────────────────────

const CREATIVE = [
  `- **Perspective Fan Gallery:** 4 images in fanned/perspective layout — overlapping, tilted with CSS transforms, creating 3D spread. Center elevated, outer tilted. Use \`rotate(-6deg)\` to \`rotate(6deg)\` with \`hover:rotate(0) hover:scale-105\`. Good for: galleries, portfolios`,
  `- **Bento Grid:** Mixed-size cards in asymmetric grid. Good for: feature showcases, portfolios`,
  `- **Parentheses Section Badges:** Section labels in colored pills: "(About Us)", "(Project)". Use \`bg-violet-500 text-white text-xs px-3 py-1 rounded-full\`. Good for: creative agencies, portfolios`,
  `- **Colored Keyword Highlights:** Keywords colored in accent (purple/violet) WITHOUT bolding: "where <span class='text-violet-500'>creativity</span>...". Color IS the emphasis. Good for: creative, agency sites`,
  `- **3D Hero with Brand Name Overlay:** Full-viewport 3D render/photo as hero. Brand name in large thin display font centered. Optional pricing pill. Good for: creative agencies, studios, luxury`,
  `- **+ Prefixed Stats Grid:** Stats with literal "+" prefix: "+ 10,587 Instagram". Large bold number, small gray label. Good for: agencies, studios, creators`,
  `- **Service List Rows:** Full-width horizontal rows with divider line. Left: icon + service name. Right: count + arrow "↗". Good for: agencies, freelancers, studios`,
  `- **Portfolio Carousel with Labels:** Large project cards in horizontal scroll. Below: name (bold, left) + category (right). Prev/next arrows. Good for: portfolios, design showcases`,
  `- **Project Price Cards Grid:** 2x2 grid with title + description + "Hire us ↗" + large price. One card inverted (dark bg) for featured option. Good for: freelancers, agencies`,
  `- **Dual Accent Color System:** Two contrasting accents — e.g. purple for labels + lime-green for CTAs. Creates energy and playfulness. Good for: creative agencies, startups`,
  `- **Dark CTA Banner with Team Photos:** Dark section with large white heading. Team member photos (circular) arranged in a row. Accent CTA pill. Good for: agencies, studios`,
];

// ── Medical / Professional patterns ────────────────────────────────

const MEDICAL = [
  `- **Numbered Staggered Service Cards:** 3-column grid with vertical offsets — cards in second column shift down ~40px. Each card: small image, "( + )" button, numbered "(01)", italic serif title. Use \`translate-y-10\` on alternate columns. Good for: services, product categories`,
  `- **Team Member Slider:** Large name display (italic serif + bold sans), portrait photo centered, bio text beside, specialization tags, "1/5" pagination. Good for: team sections, doctor profiles`,
  `- **Cinematic Full-Bleed Hero Portrait:** Full-viewport close-up portrait as background (\`h-screen object-cover\`), white text overlaid. Dark warm tones. Brand uppercase top-left, nav top-right. Good for: dental, beauty, fashion, luxury`,
  `- **Split FAQ Accordion:** Left: heading + subtitle + contact links. Right: accordion rows with question + "+" expand icon. Good for: FAQ, services, pricing pages`,
  `- **Horizontal Testimonial Scroll with Logo Bar:** Testimonial cards in horizontal scroll + client logo bar below. Prev/next arrows. Good for: agencies, SaaS, client-driven businesses`,
];

// ── Fintech patterns ───────────────────────────────────────────────

const FINTECH = [
  `- **Fanned/Stacked Product Showcase:** 3-4 products (cards, phones) in cascading tilted stack — overlapping with \`rotate(-8deg)\` to \`rotate(4deg)\`. Creates 3D fan effect. Good for: fintech, banking, product launches`,
  `- **Floating Activity Bubbles:** Chat-bubble elements (\`rounded-full px-4 py-2 shadow-lg\`) scattered with \`absolute\` positioning. Each: avatar + name + amount. "Live activity" social proof. Good for: fintech, SaaS, payment platforms`,
  `- **Dark Bento Grid with Texture Backgrounds:** Asymmetric grid on dark bg. Cards use rich photographic textures (not flat colors) with white text. Some cards with device mockups. Good for: fintech, tech, SaaS`,
  `- **Vertical Rotated Watermark:** Large text rotated 90° on page edge using \`writing-mode: vertical-rl\` at very light opacity. Good for: fintech, tech, modern brands`,
  `- **Pill Button Pair:** Two side-by-side pills: filled (black bg, white text) + outlined (border only). Both \`rounded-full px-6 py-2.5 text-sm uppercase tracking-wider\`. Good for: fintech, SaaS`,
];

// ── Beauty / Skincare patterns ─────────────────────────────────────

const BEAUTY = [
  `- **Floating Decorative Icon Badges:** Small circular badges (\`w-10 h-10 rounded-full border\`) with thin-stroke SVG icons scattered absolutely across the hero. Purely decorative texture. Good for: tech, beauty, SaaS`,
  `- **Accent-Bordered Images:** Photos with one edge having a colored strip (4-8px). Use \`border-l-4 border-green-400\` or offset colored div. Good for: beauty, fashion, creative`,
  `- **Monochromatic Brand Color System:** ENTIRE site uses ONE dominant color for backgrounds, text, cards. White text on colored bg, colored text on white bg. Light tint for softer sections. Good for: agencies, bold brands`,
];

// ── Architecture / Real Estate patterns ────────────────────────────

const ARCHITECTURE = [
  `- **Hero Credential Badge Bar:** Full-width strip at hero bottom. Semi-transparent dark bg. Contains badges: colored icon + credential text. Use \`flex justify-around bg-black/70 backdrop-blur\`. Good for: architecture, manufacturing, B2B`,
  `- **Split Product Detail:** Left: heading + description + download buttons + variant thumbnails. Right: large product image on tinted bg. Download buttons as small pills ("PDF ↓"). Good for: product pages, architecture, e-commerce`,
  `- **Color/Material Swatch Selector:** Row of circular swatches (\`w-10 h-10 rounded-full border-2\`). Active swatch has ring highlight. Below product image. Good for: product configurators, e-commerce`,
  `- **Icon Category Cards Row:** 5-7 small cards with centered line icon + category label. Clean white cards with subtle border. Good for: product categories, services, navigation`,
  `- **Warm Off-White Background System:** Use \`bg-[#FAF7F2]\` or \`bg-amber-50/50\` as primary background. Paired with orange/warm accent. Creates premium feel. Good for: architecture, luxury, sustainability`,
];

// ── General / Multipurpose patterns ────────────────────────────────

const GENERAL = [
  `- **Editorial Section with Label:** Small muted uppercase label above large serif heading, "See All →" link right-aligned. Below: horizontal card row with image + title + metadata. Good for: tours, products, collections`,
  `- **Numbered Accordion Feature List:** Vertical list with colored circle badges "(01)", "(02)". Active item shows description, inactive only number + title. Next to large image. Good for: project details, process steps`,
  `- **Color Block + Image Mosaic Hero:** Left: solid brand-color rectangle with white heading. Right: irregular mosaic of images with colored blocks filling gaps. Good for: agencies, creative studios`,
  `- **Full-Bleed Typography Section:** Entire section is solid brand-color bg with MASSIVE white text (\`text-[8rem] md:text-[12rem]\`). Pure typographic impact as section divider. Good for: bold brands, agencies`,
  `- **Icon Timeline / Process:** Vertical timeline with brand-colored circles connected by dashed lines. Steps alternate left/right. Good for: process, strategy, methodology`,
  `- **Dark Footer with Newsletter:** Dark bg, logo top-left, social icons top-right. 4-column grid: links, legal, contact, newsletter input + subscribe button. Good for: comprehensive footer`,
];

// ── Layout style to patterns mapping ───────────────────────────────

const STYLE_PATTERNS: Record<string, string[][]> = {
  luxury:       [UNIVERSAL, LUXURY],
  tech:         [UNIVERSAL, TECH],
  bold:         [UNIVERSAL, BOLD],
  creative:     [UNIVERSAL, CREATIVE],
  medical:      [UNIVERSAL, MEDICAL, LUXURY],
  fintech:      [UNIVERSAL, FINTECH, TECH],
  beauty:       [UNIVERSAL, BEAUTY, LUXURY],
  architecture: [UNIVERSAL, ARCHITECTURE],
  general:      [UNIVERSAL, GENERAL],
};

/**
 * Build the layout patterns section for a given style.
 */
export function buildLayoutPrompt(layoutStyle: string): string {
  const groups = STYLE_PATTERNS[layoutStyle] || STYLE_PATTERNS.general;
  const patterns = groups.flat();

  return `#### Layout Patterns
Use a MIX of these layouts — don't repeat the same card grid for every section:

${patterns.join("\n")}`;
}


// ── App-specific layout code snippets ──────────────────────────────

const APP_LAYOUTS: Record<string, string> = {
  netflix: `#### App Layout: Streaming Platform
**Full-Viewport Hero Banner:**
\`\`\`html
<div class="relative h-[70vh] md:h-[85vh] w-full">
  <img src="..." class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent"></div>
  <div class="absolute bottom-[15%] left-4 md:left-12 max-w-xl z-10">
    <h1 class="text-4xl md:text-6xl font-bold mb-3">Title</h1>
    <div class="flex items-center gap-3 text-sm text-zinc-300 mb-4">
      <span class="text-green-500 font-semibold">98% Match</span>
      <span class="border border-zinc-500 px-1.5 text-xs">TV-MA</span>
      <span>2h 14m</span><span>2024</span>
    </div>
    <p class="text-zinc-300 text-sm md:text-base mb-6 line-clamp-3">Description...</p>
    <div class="flex gap-3">
      <button class="bg-white text-black px-6 py-2.5 rounded font-semibold">Play</button>
      <button class="bg-zinc-700/80 text-white px-6 py-2.5 rounded font-semibold">More Info</button>
    </div>
  </div>
</div>
\`\`\`

**Horizontal Scroll Carousel:**
\`\`\`html
<div class="mb-8">
  <div class="flex items-center justify-between mb-4 px-4 md:px-12">
    <h2 class="text-xl font-semibold">Category Title</h2>
    <button class="text-sm text-zinc-400 hover:text-white">See All</button>
  </div>
  <div class="flex gap-3 overflow-x-auto px-4 md:px-12 pb-4 scrollbar-hide" style="scrollbar-width: none;">
    <div class="flex-shrink-0 w-[200px] md:w-[250px]"><!-- Card --></div>
    <!-- 8-12 cards per row -->
  </div>
</div>
\`\`\`
Generate 4-6 carousel rows with different categories, 8-12 items each with DIFFERENT images.`,

  spotify: `#### App Layout: Music Platform
- Sidebar navigation with playlists on left
- Main content area with album/playlist grids
- Now Playing bar fixed at bottom
- Dark mode with vibrant accent colors
- Horizontal scroll rows of album/playlist cards`,

  airbnb: `#### App Layout: Marketplace/Booking
- Prominent search bar with filters (location, dates, guests)
- Grid of listing cards with images, ratings, prices, locations
- Filter sidebar or horizontal filter pills
- Light mode, clean and airy

**Product Grid:**
\`\`\`html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <div class="group cursor-pointer">
    <div class="aspect-square overflow-hidden rounded-xl">
      <img src="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div class="mt-2">
      <div class="flex justify-between"><h3 class="font-medium">Location</h3><span>★ 4.9</span></div>
      <p class="text-zinc-500 text-sm">Details</p>
      <p class="font-semibold mt-1">$149 <span class="font-normal">night</span></p>
    </div>
  </div>
</div>
\`\`\``,

  twitter: `#### App Layout: Social Media Feed
**Three-Column Layout:**
\`\`\`html
<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr_350px]">
  <!-- Left sidebar: nav icons + labels -->
  <!-- Center: feed with post cards -->
  <!-- Right: trending sidebar -->
</div>
\`\`\`
**Post Card:**
\`\`\`html
<div class="py-4 px-4 border-b border-zinc-800">
  <div class="flex gap-3">
    <img src="..." class="w-10 h-10 rounded-full" />
    <div class="flex-1">
      <div class="flex items-center gap-2">
        <span class="font-semibold text-sm">Name</span>
        <span class="text-zinc-500 text-sm">@handle · 2h</span>
      </div>
      <p class="mt-1 text-sm">Post content...</p>
      <div class="flex gap-8 mt-3 text-zinc-500 text-sm"><!-- Engagement icons --></div>
    </div>
  </div>
</div>
\`\`\``,

  amazon: `#### App Layout: E-commerce Store
**Product Grid:**
\`\`\`html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
  <div class="group cursor-pointer">
    <div class="aspect-square overflow-hidden rounded-lg bg-zinc-100">
      <img src="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div class="mt-2">
      <h3 class="font-medium text-sm">Product Name</h3>
      <div class="flex items-center gap-1 mt-1"><!-- Stars --><span class="text-xs text-zinc-500">(128)</span></div>
      <p class="font-semibold mt-1">$49.99</p>
    </div>
  </div>
</div>
\`\`\`
- Multi-level navigation with categories
- Hero banner/carousel with promotions
- Category sections, deals section`,

  youtube: `#### App Layout: Video Platform
- Large featured video player area
- Grid of video thumbnails with title, channel, views, time ago
- Sidebar with recommended videos
- Category filter pills below nav
\`\`\`html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <div class="group cursor-pointer">
    <div class="relative aspect-video overflow-hidden rounded-xl">
      <img src="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      <span class="absolute bottom-2 right-2 bg-black/80 text-xs px-1.5 py-0.5 rounded">12:34</span>
    </div>
    <div class="flex gap-3 mt-2">
      <img src="..." class="w-9 h-9 rounded-full" />
      <div>
        <h3 class="font-medium text-sm line-clamp-2">Title</h3>
        <p class="text-zinc-500 text-sm">Channel · 1.2M views · 3 days ago</p>
      </div>
    </div>
  </div>
</div>
\`\`\``,
};

/**
 * Get the app-specific layout section for a given app reference.
 */
export function getAppLayout(appReference: string | null): string | null {
  if (!appReference) return null;
  return APP_LAYOUTS[appReference] || null;
}
