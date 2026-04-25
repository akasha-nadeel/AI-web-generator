// One-off uploader for the URBAN / Smart Shop fashion editorial e-commerce pattern.
// Cinematic editorial fashion hero with white tag badge + black pill CTA,
// 2-line stacked bold all-caps section headings with horizontal line
// extending to the right, tinted-bg product cards in 4/6-up grids, black
// "Limited Edition" / "30% OFF" rectangle badges, square outlined slider
// arrow buttons, brand logo row on white tinted cards, fanned 3-polaroid
// mini-collage, centered all-caps-stars testimonial with side-faded
// previews, photo-overlaid newsletter with bleeding brand wordmark, purple
// Subscribe accent. First pattern for Fashion / Clothing industry.
//
// Run with: node scripts/upload-urban-pattern.mjs

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
  colorPalette: "#FFFFFF, #0F0F0F, #F5F5F5, #EFEAE5, #F4DAD2, #6B7280, #FFB800, #6366F1",
  colorMode: "light",
  accentUsage:
    "DEEP BLACK #0F0F0F is the primary accent — used for: (1) all primary CTA pills (filled black background + white text + small white ↗ arrow — 'Explore Deals ↗'), (2) the 'EXCLUSIVE COLLECTION' white-rectangle TAG badge in the hero contrasts with black-pill CTA below it, (3) BLACK RECTANGULAR PRODUCT BADGES ('Limited Edition' / '30% OFF') anchored top-right or top-left of product cards, (4) all all-caps section headings + product labels in deep black, (5) the 5-STAR ROW in testimonials uses solid black filled stars (not gold), (6) the BRAND WORDMARK 'SAMRT SHOP' in the newsletter footer is rendered white over photo bleeding off bottom edge. INDIGO/VIOLET #6366F1 is a single small accent moment — used ONLY for the newsletter 'Subscribe' button and possibly tiny cosmetic-product highlights — appears nowhere else in the design (this is intentional restraint, the violet is a one-off color punctuation rather than a brand secondary). GOLD #FFB800 for star RATINGS on product cards (4.5 stars + count). The product cards each have their own SOFT TINTED BACKGROUND (light cream #EFEAE5 / blush #F4DAD2 / cool gray #F0F0F0) — these tints vary by product giving the grid editorial-magazine variety rather than uniform white. White-fill outlined pill (1.5px black border) is the secondary CTA. SQUARE OUTLINED BUTTONS (1.5px black border, white fill) house slider-navigation arrows (←/→) — these are a unique micro-element, not circular like most slider arrows.",
  typography:
    "BOLD ALL-CAPS SANS-SERIF for every section heading + a unique STACKED-2-LINE TREATMENT — every section headline is split across TWO LINES with a horizontal hairline extending to the right of the text ('SHOP BY / CATEGORY', 'RECOMMENDED / FOR YOU', 'BROWSE / BY BRAND', 'NEW SALE FOR MEN'). Headings use Inter / Helvetica / SF Pro / Geist Bold or Black at 700-800 weight, 36-56px, slightly tight letter-spacing, deep black #0F0F0F. The HERO HEADLINE is massive bold all-caps white at 56-72px ('PREMIUM CLOTHS & ACCESSORIES COLLECTION'). Product titles use sentence-case sans 13-15px medium ('Bose Head Phone 45'), product CATEGORY LABELS in product cards use SMALL ALL-CAPS sans ('JACKET', 'HOODDIE', 'T-SHIRT') at 11-12px tracking 0.05em. Star RATING TEXT: '4.5 (1235)' in tiny gray sans. Prices in bold black sans-serif 16-18px with a tiny superscript currency label ('$320.50 AED'). Testimonial quote is bold sentence-case sans-serif 24-32px CENTERED. The MASSIVE FOOTER WORDMARK 'SAMRT SHOP' is rendered white in bold all-caps at 180-260px and bleeds off the bottom of the newsletter photo section. Body copy 14-16px regular sans #6B7280.",
  layout:
    "FASHION-EDITORIAL E-COMMERCE flow on white: TOP CLEAN WHITE NAV BAR (full width, no float, no border): 'URBAN' wordmark LEFT in compact bold all-caps, CENTERED nav links (WOMEN [active+underlined] / MEN / KIDS / ACCESSORIES) in small all-caps medium-weight, RIGHT cluster (search-icon ⌕ + shopping-bag-icon 🛍 + user-icon 👤 + country-flag + 'DZD ▼' currency selector) → FULL-BLEED CINEMATIC EDITORIAL FASHION HERO (two models in white shirts/floral skirts against deep blue sky, magazine-cover framing) running edge-to-edge with NO solid overlay, BOTTOM-LEFT positioned content: a WHITE RECTANGULAR TAG BADGE (rounded ~6-8px corners, ~28-32px tall) containing 'EXCLUSIVE COLLECTION' in tiny dark all-caps, a 2-LINE massive bold all-caps WHITE headline 'PREMIUM CLOTHS / & ACCESSORIES COLLECTION', a 2-line white description, and a single FILLED BLACK PILL button 'Explore Deals ↗' with white text and small white arrow → SHOP BY CATEGORY: heading 'SHOP BY / CATEGORY' stacked LEFT with HORIZONTAL HAIRLINE extending right to fill the row, then a 5-CARD MIXED-SIZE GRID (TOP ROW: 1 tall fashion model card spanning ~33% + 1 wider product showcase card spanning ~67%; BOTTOM ROW: 3 equal product showcase cards) where each card has its OWN TINTED background (soft pinks / creams / cool grays) + a floating product photograph CENTERED + a label below ('Cloths & Fashion / 125 Collection', 'Accessories / 125 Collection', 'Cosmetics / 125 Collection', 'Phone / 125 Collection', 'Electronics / 125 Collection') + a small ↗ arrow icon TOP-RIGHT corner of every card → RECOMMENDED FOR YOU: heading 'RECOMMENDED / FOR YOU' stacked LEFT with HAIRLINE EXTENDING + outlined 'Explore Deals ↗' pill on RIGHT, then a 6-PRODUCT (2 rows × 3 cols) GRID where each card is structured: tinted-bg square photo area with product image floating + an OPTIONAL BLACK RECTANGULAR 'Limited Edition' BADGE anchored top-right of the photo area, then BELOW the photo a horizontal info row containing on the LEFT (product title + 4.5 yellow stars + '(1235)' rating count) and on the RIGHT (price '$320.50' + tiny 'AED' currency superscript) → BROWSE BY BRAND: heading 'BROWSE / BY BRAND' stacked LEFT with HAIRLINE + outlined 'Explore Deals ↗' pill RIGHT, then a TALL FEATURED FASHION HERO PANEL (model with yellow sunglasses against teal/green wall) with a FLOATING RECTANGULAR PRODUCT CARD overlay showing a related product (small product photo + 'Green Summer Jacket' name + 4.5 stars + '$320.50' price + ↗ arrow) anchored center, plus SQUARE OUTLINED LEFT/RIGHT ARROW BUTTONS (1.5px border, ~40-48px squares with arrow glyphs) for slider navigation positioned vertically-centered on each side, BELOW that a 5-COLUMN ROW of WHITE rounded-rectangle BRAND CARDS each containing a single brand logo (LC Waikiki / sinsay / be camaïeu / COOL CLUB / celio) → NEW SALE FOR MEN: heading 'NEW SALE FOR MEN' all-caps LEFT (single line) + SQUARE OUTLINED LEFT/RIGHT ARROW BUTTONS RIGHT for slider nav, then a 4-COLUMN PRODUCT GRID (each card: tinted gray bg + floating product + optional white '30% OFF' tag top-LEFT + bottom info row with all-caps small label 'JACKET' / 'HOODDIE' / 'T-SHIRT' on LEFT + price '$40' / '$35' on RIGHT), and BELOW the row a SMALL FANNED 3-PORTRAIT POLAROID MINI-COLLAGE (3 small rectangular man-photos rotated -8° / 0° / +8° with soft drop shadows, centered) → TESTIMONIAL: centered 5 SOLID BLACK STARS at top, a large centered bold sentence-case 3-line QUOTE ('My first shopping experience with Smart Shop was amazing. The quality of the dress is excellent, and I received the delivery on time. Definitely ordering again!'), bold name 'Nusrat Jahan' + italic 'Product Manger' role, then a small location row with pin icon '📍 Lost Angeles, USA', SQUARE OUTLINED ARROW BUTTONS positioned LEFT-EDGE and RIGHT-EDGE of viewport for prev/next, FADED PARTIAL PREVIEW QUOTES bleeding in from each side (left edge: '...he exact color / t overall, I loved' / right edge: '\"I bought a b... / the material is...'), small DOT INDICATOR pagination at bottom → NEWSLETTER + BLEEDING WORDMARK SECTION: a full-bleed CINEMATIC PHOTO panel (orange jacket model in field with grass + blue sky) with a centered text block on top: bold all-caps white 'DON\\'T MISS OUT!' heading + small white description, then a horizontal email-input + 'Subscribe' BUTTON with the Subscribe button as the ONLY VIOLET/INDIGO #6366F1 color in the design, and overlaid AT THE BOTTOM of this photo section the MASSIVE WHITE bold all-caps WORDMARK 'SAMRT SHOP' rendered at 180-260px BLEEDING off the bottom edge of the photo (top half visible, bottom half cut off — magazine final-page signature) → FOOTER on white: 4-col with PAGES (Shop / Collections / Blog / About) / CATEGORY (Cloths / Accessories / Electronics / Cosmetics) / BRAND (Brand Name × 4) / FOLLOW US (Instagram / Tiktok / X / Facebook) + bottom row 'Privacy Policy' LEFT + 'Copyright © 2025 Smart Shop, All Rights Reserved.' RIGHT.",
  signaturePatterns: [
    "STACKED-2-LINE BOLD ALL-CAPS SECTION HEADING with horizontal HAIRLINE EXTENDING RIGHT — 'SHOP BY / CATEGORY', 'RECOMMENDED / FOR YOU', 'BROWSE / BY BRAND' — every section heading is intentionally broken across 2 lines and paired with a thin horizontal line that extends from the heading's right edge to the section's right edge (or to a paired CTA), creating an editorial-magazine column-rule feel — most distinctive typographic signature",
    "SQUARE OUTLINED SLIDER ARROW BUTTONS — slider navigation uses 1.5px-bordered SQUARES (~40-48px) with arrow glyphs inside, NOT circles; the squares show up as paired left/right buttons next to section headings or floating at viewport edges of the testimonial section",
    "TINTED-BACKGROUND PRODUCT CARDS — each product card has its own SOFT TINTED background (light cream / blush pink / cool gray / warm beige) with the product photograph floating on top; the tint VARIES across the grid giving the row editorial-magazine variety rather than uniform white tiles",
    "BLACK RECTANGULAR PRODUCT BADGES — small black rectangles with rounded corners (~4-6px) containing white tiny all-caps text ('Limited Edition' / '30% OFF') anchored top-right or top-left of product card images",
    "MIXED-SIZE CATEGORY GRID — Shop By Category breaks from uniform tiles using a 5-card mix: TOP row of 1 tall + 1 wide (33%/67%), BOTTOM row of 3 equal (33% each), creating a magazine-feature layout instead of a 5-up uniform grid",
    "↗ ARROW ICON TOP-RIGHT of every card — every category card and product showcase card has a small ↗ arrow glyph in the TOP-RIGHT corner indicating clickability, mirroring the same arrow vocabulary used in primary CTA pills",
    "DUAL PILL CTA SYSTEM — filled black pill (white text + white ↗) for primary, white-fill outlined pill (black text + black ↗) for secondary; pills are FULLY ROUNDED, no extra adornment",
    "STAR RATING + COUNT + PRICE + CURRENCY SUPERSCRIPT — product card bottom info row pairs left-side ('product title' + 4.5 yellow stars + '(1235)' count) with right-side ('$320.50' price + tiny 'AED' currency label as superscript)",
    "WHITE RECTANGULAR TAG BADGE in hero — a small white rectangular badge (rounded 6-8px corners, ~28-32px tall) containing 'EXCLUSIVE COLLECTION' all-caps appears above the hero headline; this is a unique tag shape (not pill, not chip) that announces the campaign",
    "BRAND LOGO ROW on WHITE TINTED CARDS — a 5-column horizontal row of white rounded-rectangle cards each holding a single brand logo (LC Waikiki / sinsay / be camaïeu / COOL CLUB / celio) creating a brand-marketplace credibility band",
    "FLOATING PRODUCT INFO CARD over editorial photo — Browse-by-Brand has a tall fashion model image with a small rectangular product info card (tiny product thumb + name + 4.5 stars + price + ↗) floating on top, anchored in the center of the photo",
    "FANNED 3-PORTRAIT POLAROID MINI-COLLAGE — Below the New Sale For Men row sits a small 3-photo collage of fanned tilted men's portraits (rotations -8° / 0° / +8°) with soft drop shadows, centered — a casual-magazine moment between sections",
    "CENTERED 5 BLACK SOLID STARS above bold testimonial quote — testimonial header is just 5 small filled black stars centered above a large bold sentence-case 3-line quote, with side-faded preview quotes bleeding in from left/right edges of the viewport",
    "MASSIVE BLEEDING WORDMARK over CINEMATIC NEWSLETTER PHOTO — the brand name 'SAMRT SHOP' rendered in white bold all-caps at 180-260px BLEEDING off the bottom edge of a full-bleed cinematic photo (orange jacket + blue sky + grass) — top half visible, bottom half cut off — magazine-cover-final-page signature; pairs with a centered email-subscribe form ABOVE it inside the same photo panel",
    "VIOLET/INDIGO ONE-OFF SUBSCRIBE BUTTON — the 'Subscribe' button in the newsletter form is the ONLY violet/indigo #6366F1 color in the entire design; everywhere else is monochrome black/white, this single splash of color is intentional disciplined punctuation",
  ],
  uniqueTechniques: [
    "Stacked 2-line all-caps heading + horizontal-line extender — splitting every section heading across 2 lines and pairing it with a hairline that extends to the right gives the design a magazine-column-rule feel that mass-fashion-ecommerce sites rarely achieve; this is the design's strongest editorial signature and immediately separates it from typical Shopify/template fashion sites",
    "Square outlined slider arrows instead of circular — slider navigation uses 1.5px-border SQUARES with arrow glyphs rather than the standard circular icon buttons; this is a tiny but distinctive micro-element that ties to the editorial-architectural feel of the rest of the design",
    "Tinted product backdrop variation across the grid — instead of uniform white product tiles, each product card has its OWN soft tint (cream / blush / cool gray / warm beige); the variation is intentional and creates magazine-spread visual rhythm without ever needing solid colored sections",
    "Mixed-size category grid (1 tall + 1 wide / 3 equal) — breaking from uniform 5-up tiles by using a 33%/67% top row + 33%/33%/33% bottom row creates a magazine-feature layout; this is rare in e-commerce category browsers and a signature of premium-positioned fashion brands",
    "Single violet Subscribe accent + black/white everything else — every CTA, badge, star, heading, and label across the entire design is monochrome black/white EXCEPT the newsletter Subscribe button which is the only violet #6366F1 splash; this disciplined punctuation creates an aha-moment color hit and is more memorable than spreading violet across many places",
    "Bleeding wordmark inside a cinematic photo panel — the brand wordmark 'SAMRT SHOP' is rendered MASSIVE white all-caps at 180-260px bleeding off the bottom of the newsletter cinematic photo, NOT in a separate solid section; this transforms what would be a utility footer band into a magazine-cover-final-page typographic moment with photo backdrop",
    "Side-faded preview testimonials — the testimonial section shows a bold center quote with PARTIAL PREVIEW QUOTES bleeding in from the left and right edges of the viewport (faded with horizontal gradient to background), giving an at-a-glance peripheral preview of prev/next reviews",
  ],
  spacing:
    "Editorial fashion-magazine spacing — sections separated by 80-120px on desktop (slightly tighter than luxury editorial designs to keep grid density energetic), product card grid gap 16-24px, mixed-size category grid gap 16-20px, card internal padding 24-36px, button border-radius full-rounded (pill) for CTAs but 6-8px for the rectangular tag badges and product info card. Image corner-radius 12-20px on product photos and category cards. The fanned polaroid collage uses 8-16px overlap between photos. Hero is full viewport. The bleeding wordmark gets the bottom 40% of the newsletter photo as its visual stage. Generous gutters around the editorial 2-line headings + hairlines create magazine-grid breathing room.",
  moodKeywords: "editorial, fashion, magazine, premium, urban, modern, minimal, sophisticated, photography-led, e-commerce, retail, contemporary, monochrome, magazine-cover, vogue",
  animations:
    "Editorial and refined — hero photo slow zoom (1.0 → 1.04 over 10s) for cinematic life, hero text fades in stagger (tag → headline → desc → CTA, 0.15s delays). Section headings: hairline extender draws from heading-edge to the right on scroll-in (0.6s ease-out). Product cards: stagger fade-up on viewport entry (0.07s between, 0.4s ease-out), hover scale 1.03 + tint slightly saturates + ↗ arrow translate-up-right by 4px. Category cards: hover → product image scale 1.05 + ↗ arrow shift. Square slider arrows: hover → background fill swap (white→black, black→white). Star ratings: gold stars fill in left-to-right on viewport entry (0.4s). Brand logo cards: hover → subtle scale 1.05 + slight gray-to-color transition. Floating product info card on Browse-By-Brand: gentle 4-6px vertical float loop (3s). Bleeding wordmark: very slow horizontal drift (0.5px/s) for ambient life. Subscribe button: hover → violet brightens slightly + scale 1.04. Side-faded testimonial previews: cross-fade transitions on prev/next (0.4s). Overall motion stays editorial-magazine — never bouncy, never aggressive, all transitions feel intentional.",
  heroTreatment:
    "FULL-BLEED CINEMATIC EDITORIAL FASHION PHOTOGRAPH (two female models in pristine white button-down shirts and floral-print skirts against a deep blue sky, magazine-cover framing — confident pose, natural light, beauty-shot quality) running edge-to-edge with NO solid overlay, just the photo's natural deeper-blue zones carrying the white text. ABOVE the photo, a CLEAN WHITE TOP NAV BAR (full-width, no float): 'URBAN' wordmark LEFT in compact bold all-caps black, CENTERED horizontal nav links (WOMEN [active + underlined] / MEN / KIDS / ACCESSORIES) in small all-caps black medium-weight, and on the RIGHT a cluster of icons (search ⌕ + shopping-bag 🛍 + user 👤) followed by a country-flag + 'DZD ▼' currency selector. OVERLAID on the photograph, BOTTOM-LEFT positioned content (anchored ~80-100px from left, ~80-100px from bottom): (1) a small WHITE RECTANGULAR TAG BADGE (rounded 6-8px corners, ~28-32px tall, ~140-160px wide) containing 'EXCLUSIVE COLLECTION' in tiny dark all-caps, (2) below it a 2-LINE massive bold all-caps WHITE HEADLINE 'PREMIUM CLOTHS / & ACCESSORIES COLLECTION' (~56-72px Inter/Helvetica/SF Pro Bold, tight letter-spacing), (3) a 2-line white description ('Level up your fashion experience with up to 50% off top quality products & brand only for a limited time'), (4) a single FILLED BLACK PILL button 'Explore Deals ↗' (~140-160px wide, fully rounded, deep black bg with white text + small white right-up-arrow ↗ icon). Critically there is NO dark overlay, NO gradient, NO right-side text — the photo's natural blue sky carries the white text and the entire bottom-right of the hero is left to the model imagery. The overall feeling is editorial fashion magazine cover — Vogue / Zara campaign / premium e-commerce — confident, photography-led, monochrome with one accent moment (the white tag badge) above the black pill CTA.",
};

const record = {
  name: "Urban Editorial Fashion E-commerce",
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
    "kidswear",
    "streetwear",
    "urban fashion",
    "luxury fashion",
    "premium fashion",
    "fashion retail",
    "fashion marketplace",
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
    "lingerie",
    "denim",
    "outerwear",
    "athleisure",
  ],
  moods: [
    "editorial",
    "fashion",
    "magazine",
    "premium",
    "urban",
    "modern",
    "minimal",
    "sophisticated",
    "photography-led",
    "e-commerce",
    "retail",
    "contemporary",
    "monochrome",
    "magazine-cover",
    "vogue",
    "high-fashion",
    "campaign",
  ],
  color_mode: "light",
  brief_json: brief,
};

console.log("[upload] Inserting Urban editorial fashion pattern into design_patterns...");

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
