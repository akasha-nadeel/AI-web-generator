// One-off uploader for the MILAN minimal-elegant boutique fashion pattern.
// Elegant serif wordmark, centered overhead flat-lay hero product photo,
// sentence-case bold sans-serif headings, pill-chip filter bar above product
// grid, 4-col product cards with heart-favorite icons, mixed-size category
// grids with corner-positioned Shop Now pills, category labels overlaid as
// white text on tinted product photos, COUNTDOWN TIMER promotional banner,
// MASSIVE SPACED-OUT SERIF "M I L A N" wordmark footer — second pattern for
// Fashion / Clothing, complementing Urban's editorial-magazine-monochrome
// mood with a minimal-elegant-boutique mood (Massimo Dutti / COS / Aritzia
// vibe).
//
// Run with: node scripts/upload-milan-pattern.mjs

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
  colorPalette: "#FFFFFF, #0F0F0F, #F0F0F0, #DCDFD8, #E8E2DA, #B5BFB6, #C4BBA6, #6B7280",
  colorMode: "light",
  accentUsage:
    "DEEP BLACK #0F0F0F is the only chromatic accent — used for: (1) all primary CTA pills (filled black bg + white text — 'Explore Collection', 'Shop Now', 'Get in touch'), (2) the active state on filter pill chips ('Shirt' filled black with white text while siblings remain outlined gray), (3) the current PAGE NUMBER in product pagination (active page is a small black filled square with white digit, others remain plain gray digits), (4) heart-favorite icons (when favorited), (5) product card prices in bold black, (6) all section headings in deep black, (7) the elegant serif 'MILAN' nav wordmark and the MASSIVE 'M I L A N' decorative footer wordmark — both rendered in deep gray-black serif. NO chromatic accent color exists — the entire design uses only neutrals: white, deep black, and a CURATED PALETTE of soft tinted backgrounds for product cards (#F0F0F0 cool gray, #DCDFD8 sage-gray, #E8E2DA cream-beige, #B5BFB6 muted sage, #C4BBA6 muted beige). These tints vary CARD BY CARD across grids, giving the layout boutique-magazine variety while staying strictly neutral. Body text is muted #6B7280 gray. The discipline of this design is its refusal of any color punctuation — even a tiny accent would break the boutique-elegance.",
  typography:
    "TWO-FONT TYPOGRAPHIC SYSTEM — (1) ELEGANT MINIMAL SERIF for the brand mark only — the 'MILAN' logo in the nav uses a refined display serif (Cormorant Display / Playfair Display / Garamond / EB Garamond / Bodoni Moda) at medium weight, ~22-26px in the nav, and the same serif RECURS as a MASSIVE DECORATIVE FOOTER WORDMARK 'M I L A N' rendered with WIDE LETTER-SPACING (0.4-0.6em) at 140-180px in muted gray spanning full footer width — this serif appears NOWHERE else in the design; (2) MODERN BOLD SANS-SERIF for everything else — section headings in SENTENCE CASE (not all-caps) using Inter / Geist / DM Sans / Manrope at 600-700 weight, 32-48px ('Live, Love, and Let Your Spirit Fly!', 'Resilient Materials, Timeless Comfort.', 'Trending Now', 'Featured Collection', 'Special Descount'). Body 14-16px regular sans muted gray. Product names in normal-weight sans 14-16px on TWO LINES, prices in bold black sans 14-16px aligned right. Filter pill chips use small sentence-case 13-14px (active state white-on-black, inactive gray-on-light-gray). The COUNTDOWN TIMER digits ('59 : 05 : 30 : 59') are rendered in HUGE BOLD SANS at 56-72px with tiny 11-12px gray labels below each (Days / Hour / Minutes / Seconds). NO italic, NO accent typeface variation — just the 2-font discipline (serif logo + sans everything else).",
  layout:
    "MINIMAL-ELEGANT BOUTIQUE FASHION flow on white: TOP CLEAN WHITE NAV BAR (full width, no float, no border): elegant SERIF 'MILAN' wordmark LEFT in medium weight, CENTERED nav links in sentence-case sans (Home / Shop ▼ / Products ▼ / Pages ▼ / Blog / Catalog), RIGHT cluster of icons (user 👤 + heart ♡ + search ⌕ + shopping cart 🛒) → CENTERED OVERHEAD HERO: a wide rectangular OVERHEAD FLAT-LAY PHOTOGRAPH of a folded white T-SHIRT on a gray surface flanked by a magazine ('NATURALS') on the left side and an open book on the right side (still-life styling, neutral lighting), with CENTERED DARK TEXT overlaid on top of the photograph: a 2-line BOLD SENTENCE-CASE headline 'Live, Love, and Let / Your Spirit Fly!' + a centered 2-3 line gray description + a single CENTERED FILLED BLACK PILL 'Explore Collection' button — note the hero text is DARK on a LIGHT photo (different from typical white-on-photo hero), creating a clean editorial-still-life feel rather than a fashion-cover feel → MATERIALS SECTION: split layout, LEFT contains a bold sentence-case 2-line heading 'Resilient Materials, / Timeless Comfort.' + paragraph description, RIGHT contains a 3-photo arrangement (1 tall portrait card on the left + 2 smaller stacked cards on the right) of male models in tinted-bg rounded rectangles → PRODUCT FILTER + GRID: a HORIZONTAL PILL-CHIP FILTER BAR at the top with ~10 chips (All / Shirt [active black] / Trouser / Shorts / Cap / Jacket / Hoodie / Sneakers / Sock / T-Shirt / Jeans), then a 4-COLUMN PRODUCT GRID where each card has: a TINTED ROUNDED-RECTANGLE BACKGROUND (~16-20px radius) with a full-body MALE MODEL photograph centered, a small WHITE-CIRCLE HEART-FAVORITE button anchored top-right, and BELOW the photo a horizontal info row with product NAME on the LEFT (2-line sans, e.g. 'Oversized Striped shirt') and PRICE on the RIGHT (bold black, e.g. '$40.00'); NUMBER PAGINATION at the bottom centered: < [1] 2 3 4 ... 9 10 > where the current page is a small BLACK FILLED SQUARE with white digit, prev/next arrows are tiny outlined squares → TRENDING NOW: heading 'Trending Now' sentence-case bold sans LEFT, then a 2x2 MIXED-SIZE PHOTO GRID where each tile has a tinted-rounded-rectangle bg + a full-portrait fashion photograph + a SMALL BLACK 'Shop Now' PILL anchored to a different CORNER of each tile (some bottom-left, some bottom-right) creating a playful asymmetric placement that gives the grid kinetic editorial energy → FEATURED COLLECTION: heading 'Featured Collection' bold sans LEFT, then a 3x2 ASYMMETRIC PHOTO GRID with 6 tiles (Jeans / Hoodie [center featured] / Bags / T-Shirts / Sneakers / Jacket); each tile has a tinted-rounded-rectangle bg + a fashion photograph and the CATEGORY LABEL is RENDERED AS WHITE TEXT CENTERED DIRECTLY ON THE PHOTO (no badge, no card — just the word floating on the image); the CENTER 'Hoodie' tile is FEATURED with a darker overlay containing the category name + a promotional sub-line ('Open With Buy And Apply Code / get Offers') + a black 'Shop Now' pill → SPECIAL DISCOUNT PROMOTIONAL CARD: a wide rounded-rectangle banner card on light-gray background, LEFT contains a bold sentence-case 'Special Descount' heading + a HUGE COUNTDOWN TIMER ROW '59 : 05 : 30 : 59' with tiny labels below each digit-block (Days / Hour / Minutes / Seconds) + a 'Shop Collection →' arrow link, RIGHT contains a rounded-corner photograph of a model in a beige blazer → FOOTER on white: 4-col layout: COL1 elegant SERIF 'MILAN' wordmark + 'Explore Our Vast Collection Of Fashion' tagline + description + an inline horizontal email-input + filled black 'Get in touch' pill / COL2 'Products' (Shirts / Shoes / Pants / Sunglasses / Suits) / COL3 'Caregores' (Men / Women / Kids / Brands) / COL4 'Social Media' (Instagram / Facebook / Tiktok / Twitter); BELOW the columns a MASSIVE SPACED-OUT SERIF WORDMARK 'M I L A N' in elegant gray serif at 140-180px with very wide letter-spacing (0.4-0.6em between each letter) spanning the full footer width — this is the design's most distinctive editorial signature and creates a Mediterranean-luxury atmosphere.",
  signaturePatterns: [
    "ELEGANT MINIMAL SERIF brand wordmark — the 'MILAN' logo is rendered in a refined display serif (Cormorant / Playfair / Garamond / Bodoni Moda) at medium weight, signaling boutique-elegance immediately; this serif appears nowhere else except as the massive decorative footer wordmark, creating typographic bookends",
    "MASSIVE SPACED-OUT SERIF FOOTER WORDMARK — the brand name 'M I L A N' is rendered at 140-180px in elegant muted-gray serif with WIDE letter-spacing (0.4-0.6em) spanning the full footer width as a decorative typographic anchor at the very bottom of the page; this is the design's most editorial signature and instantly differentiates from sans-bold bleeding wordmarks (Untu Care, Smart Shop)",
    "OVERHEAD FLAT-LAY HERO with DARK TEXT overlaid — instead of a full-bleed model photograph with white text, the hero is an OVERHEAD STILL-LIFE composition of a folded T-shirt + magazine + open book, with bold dark sentence-case text and a black pill CTA centered on top; an editorial-still-life feel rather than a fashion-cover feel",
    "PILL-CHIP FILTER BAR above product grid — a horizontal scrollable row of ~10 PILL CHIPS (All / Shirt / Trouser / Shorts / Cap / Jacket / Hoodie / Sneakers / Sock / T-Shirt / Jeans) where the ACTIVE chip is filled black with white text and inactive chips are outlined-gray; this is a SaaS/e-commerce convention done minimally elegant",
    "4-COL PRODUCT GRID with HEART-FAVORITE TOP-RIGHT — each product card has a tinted-rounded-rectangle background (~16-20px radius) holding a full-body male model photograph, with a small WHITE-CIRCLE heart-favorite icon button anchored TOP-RIGHT of the card",
    "NAME-LEFT / PRICE-RIGHT product info row — under each product image, a horizontal info row places the product name (2-line sans, normal weight) on the LEFT and the price (bold black sans) on the RIGHT — no rating stars, no extra metadata, just clean name+price",
    "NUMBERED PAGINATION with CURRENT-PAGE BLACK SQUARE — page numbers '< 1 2 3 4 ... 9 10 >' rendered centered with the active page as a small BLACK FILLED SQUARE containing white digit and prev/next arrows as tiny outlined gray squares; the use of squares (not circles) ties to refined-architectural details elsewhere",
    "MIXED-SIZE 2x2 GRID with CORNER-POSITIONED SHOP NOW PILLS — Trending Now uses a 2x2 grid where each tile is a tinted-rounded-rectangle holding a full-portrait fashion photograph, and the 'Shop Now' black pill is anchored to a DIFFERENT CORNER on each tile (some bottom-left, some bottom-right) creating playful asymmetric placement",
    "CATEGORY LABEL AS WHITE TEXT CENTERED DIRECTLY ON PHOTO — Featured Collection labels (Jeans / Hoodie / Bags / T-Shirts / Sneakers / Jacket) are rendered as just plain WHITE text centered on each photo, with NO badge, no card, no chip — minimal restraint that signals confidence in the photography",
    "FEATURED CENTER TILE with DARK PROMO OVERLAY — the center tile of Featured Collection (Hoodie) gets a darker overlay containing a category label + a 2-line promotional sub-line ('Open With Buy And Apply Code / get Offers') + a black 'Shop Now' pill, drawing the eye to ONE featured promotion in an otherwise minimal grid",
    "COUNTDOWN TIMER promotional banner — a wide rounded-rectangle promo card on light-gray bg with a HUGE bold sans countdown timer row '59 : 05 : 30 : 59' (Days : Hour : Minutes : Seconds) split into 4 number-blocks with tiny labels under each, paired with a model photograph on the right and a 'Shop Collection →' arrow link",
    "SOFT-NEUTRAL TINTED PRODUCT BACKDROPS varying card by card — every product/category card has its own soft tint (cool gray / sage-gray / cream-beige / muted sage / muted beige) — the variation is intentional boutique-magazine choreography rather than uniform white tiles",
    "WHITE-CIRCLE ICON BUTTONS — heart-favorite icons (and similar UI buttons) are rendered as plain white-fill circles with a thin gray icon centered, anchored to product card corners; the button is invisible until you look for it",
    "ARROW-SUFFIX TEXT LINK — secondary CTAs use a 'Shop Collection →' or '→' arrow-suffixed text link rather than a pill, mixed with primary black pills to create CTA hierarchy",
    "STILL-LIFE / NEUTRAL PHOTOGRAPHY VOCABULARY — every photograph (overhead flat-lay hero + male model portraits + still-life category tiles) shares a consistent neutral-tone color story (creams, grays, sages, beiges) with no high-saturation imagery anywhere; the photography choice is half the brand identity",
  ],
  uniqueTechniques: [
    "Two-font typographic bookend system — one elegant minimal serif used ONLY for the brand wordmark (small in nav + massive at footer) and one modern bold sans for everything else; this creates strong typographic identity moments at the top and bottom of the page without requiring serif throughout",
    "Massive spaced-out serif decorative footer wordmark — rendering 'M I L A N' at 140-180px with 0.4-0.6em letter-spacing in muted-gray serif as a Mediterranean-luxury typographic anchor differentiates this design from the more common bold-sans bleeding wordmarks; this technique signals 'European boutique' rather than 'fashion-magazine cover'",
    "Overhead still-life hero instead of model fashion hero — leading with an editorial flat-lay (folded shirt + magazine + book) rather than a model photograph subverts e-commerce convention and signals quiet-luxury / lifestyle-brand rather than apparel-store; pairs with dark text on light photo for refined feel",
    "Asymmetric corner-positioned Shop Now pills — placing the 'Shop Now' pill at a DIFFERENT corner on each tile of the Trending Now grid creates kinetic visual rhythm without using motion or color; this is a tiny but distinctive layout signature that boutique fashion grids rarely commit to",
    "Category label as floating white text on photo — using just plain white centered text (no badge, no card, no overlay panel) as the category label on Featured Collection tiles is a brave restraint move that requires high-quality photography to carry the design — most fashion sites would use a badge or a dark overlay panel",
    "Refused chromatic accent — the entire design has ZERO color punctuation (no violet, no orange, no green); accent comes only from black, soft neutral tints, and photography. This monochrome-with-tints discipline is what separates 'boutique-elegant' from 'editorial-magazine' (Urban) — both are monochrome, but Urban has its single violet Subscribe accent; Milan refuses even that",
    "Countdown timer as elegant promotional unit — a 4-block countdown ('59 : 05 : 30 : 59') sized at 56-72px in bold sans with tiny labels below is integrated as a boutique-quality promotional banner rather than a flashy urgency widget; this elevates a typically aggressive e-commerce pattern into a refined moment",
  ],
  spacing:
    "Generous boutique spacing — sections separated by 100-128px on desktop, content max-width ~1280px with comfortable side gutters, product grid gap 16-24px, mixed-size category grid gap 12-20px, card internal padding 24-36px, button border-radius full-rounded (pill) for CTAs, image corner-radius 16-24px on product photos and category tiles. Filter pill chips have ~12px horizontal padding and 8-10px vertical. Pagination spacing tight (8-12px between numbers). The hero photograph dominates the viewport with comfortable text breathing-room around the centered headline. Footer has ~80-100px of vertical space dedicated to the massive decorative wordmark below the columns. The whole design feels intentionally calm and uncluttered — boutique store rather than busy marketplace.",
  moodKeywords: "minimal, elegant, boutique, refined, neutral, quiet-luxury, european, mediterranean, sophisticated, calm, photography-led, magazine, editorial-still-life, modern, monochrome",
  animations:
    "Quiet and refined — hero text fades in with stagger (headline → desc → pill, 0.15s delays). Section headings: simple fade-up on scroll-in (0.5s ease-out). Filter pill chips: smooth color/bg transition on click (0.2s). Product cards: stagger fade-up on viewport entry (0.07s between, 0.4s ease-out), hover scale 1.03 + tint slightly saturates + heart icon brightens. Category tiles: hover → photo scale 1.04 + label slightly brighter + Shop Now pill background-darken. Featured collection center tile: gentle pulse on the dark overlay (subtle opacity 0.85 → 0.95 over 3s). Countdown timer: digits flip/fade transition every second (0.3s). Pagination square: hover → fill slightly. The massive footer wordmark: very slow horizontal drift (0.5px/s) for ambient life. Heart favorite: bounce + fill animation on click (0.3s). Get-in-touch pill: hover → bg darken + scale 1.03. Overall motion stays quiet-boutique — never aggressive, never bouncy, every transition feels calm and intentional.",
  heroTreatment:
    "CENTERED OVERHEAD STILL-LIFE HERO (NOT a model fashion hero) — the hero is a wide rectangular OVERHEAD FLAT-LAY PHOTOGRAPH showing: a folded WHITE T-SHIRT laid out neatly in the center on a soft gray surface, with a styled MAGAZINE labeled 'NATURALS' to the LEFT (cover visible, plant illustration), and an OPEN BOOK to the RIGHT (pages turning naturally), all in soft natural lighting with a still-life editorial feel. The composition fills the hero panel edge to edge with rounded corners at 16-24px. ABOVE the hero, a CLEAN WHITE TOP NAV BAR (full-width, no float): elegant minimal SERIF 'MILAN' wordmark LEFT (Cormorant / Playfair / Garamond at medium weight ~22-26px), CENTERED horizontal nav links (Home / Shop ▼ / Products ▼ / Pages ▼ / Blog / Catalog) in small sentence-case sans, RIGHT cluster of icons (user 👤 + heart ♡ + search ⌕ + shopping cart 🛒). OVERLAID on the hero photograph: CENTERED 2-line BOLD DARK SENTENCE-CASE headline 'Live, Love, and Let / Your Spirit Fly!' (~36-48px Inter/Geist Bold), below it a centered 2-3 line muted-gray description ('Milanis your ultimate destination for stylish, modern, and trend-setting fashion. We bring you carefully curated collections that let you express your personality, stay ahead of trends, and embrace elegance in every outfit.'), and a single CENTERED FILLED BLACK PILL 'Explore Collection' button at the bottom. Critically the hero text is DARK on a LIGHT photo (the natural gray surface of the flat-lay carries dark text well), creating an editorial-still-life voice rather than the typical fashion-cover voice. The overall feeling is quiet-luxury, European boutique, lifestyle-brand — closer to Aesop / COS / Massimo Dutti than Zara / H&M.",
};

const record = {
  name: "Milan Minimal Elegant Boutique Fashion",
  industries: [
    "fashion",
    "clothing",
    "apparel",
    "fashion ecommerce",
    "fashion store",
    "fashion brand",
    "boutique",
    "fashion boutique",
    "ready to wear",
    "menswear",
    "womenswear",
    "minimalist fashion",
    "quiet luxury",
    "european fashion",
    "italian fashion",
    "luxury fashion",
    "premium fashion",
    "lifestyle brand",
    "lifestyle fashion",
    "online clothing store",
    "shoes",
    "footwear",
    "bags",
    "handbags",
    "leather goods",
    "fashion accessories",
    "jewelry",
    "watches",
    "eyewear",
    "denim",
    "outerwear",
    "knitwear",
    "loungewear",
    "elevated basics",
    "sustainable fashion",
  ],
  moods: [
    "minimal",
    "elegant",
    "boutique",
    "refined",
    "neutral",
    "quiet-luxury",
    "european",
    "mediterranean",
    "sophisticated",
    "calm",
    "photography-led",
    "magazine",
    "editorial-still-life",
    "modern",
    "monochrome",
    "lifestyle",
    "premium-minimal",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Milan minimal-boutique fashion pattern into design_patterns...");

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
