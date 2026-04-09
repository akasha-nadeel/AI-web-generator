import { ComponentDefinition } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ECOMMERCE MARQUEE BAR — Scrolling announcement strip
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecomMarquee: ComponentDefinition = {
  id: "ecom-marquee",
  category: "navigation",
  name: "Ecom Announcement Bar",
  description: "Scrolling announcement marquee with dark background",
  source: "custom",
  slots: {
    items: { type: "list", label: "Marquee Items", required: true },
  },
  defaultContent: {
    items: [
      { label: "FREE SHIPPING ON SELECTED ORDERS" },
      { label: "30 DAY RETURNS" },
    ],
  },
  html: `<style>
.em-bar{background:#111;padding:10px 0;overflow:hidden;white-space:nowrap}
.em-track{display:inline-flex;animation:em-scroll 25s linear infinite}
.em-item{font-size:11px;font-weight:500;color:rgba(255,255,255,0.8);font-family:{{fontBody}};text-transform:uppercase;letter-spacing:0.12em;padding:0 40px;display:inline-flex;align-items:center}
@keyframes em-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
</style>
<div class="em-bar">
  <div class="em-track">
    {{#items}}<span class="em-item">{{label}}</span>{{/items}}{{#items}}<span class="em-item">{{label}}</span>{{/items}}{{#items}}<span class="em-item">{{label}}</span>{{/items}}{{#items}}<span class="em-item">{{label}}</span>{{/items}}
  </div>
</div>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ECOMMERCE NAV — Clean centered-logo nav
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecomNav: ComponentDefinition = {
  id: "ecom-nav",
  category: "navigation",
  name: "Ecom Store Nav",
  description: "Clean white nav with centered brand, left links, right icons",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    leftLinks: { type: "list", label: "Left Links", required: true },
  },
  defaultContent: {
    brand: "Chicago",
    leftLinks: ["Shop All", "Behind The Brand"],
  },
  html: `<style>
.en-nav{background:transparent;padding:16px 40px;position:relative;z-index:20}
.en-inner{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
.en-left{display:flex;align-items:center;gap:28px}
.en-left a{font-size:14px;color:#fff;text-decoration:none;font-family:{{fontBody}};font-weight:400}
.en-brand{font-size:22px;font-weight:400;color:#fff;text-decoration:none;font-family:{{fontHeading}};text-align:center;display:flex;align-items:center;justify-content:center;gap:8px}
.en-brand-dot{width:10px;height:10px;border-radius:50%;background:{{primary}};display:inline-block}
.en-right{display:flex;align-items:center;justify-content:flex-end;gap:20px}
.en-icon{width:20px;height:20px;color:#fff;opacity:0.8}
@media(max-width:768px){.en-nav{padding:14px 20px!important}.en-left{display:none!important}}
</style>
<nav class="en-nav">
  <div class="en-inner">
    <div class="en-left">{{#leftLinks}}<a href="#">{{.}}</a>{{/leftLinks}}</div>
    <a href="#" class="en-brand"><span class="en-brand-dot"></span>{{brand}}</a>
    <div class="en-right">
      <svg class="en-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <svg class="en-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
    </div>
  </div>
</nav>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ECOMMERCE HERO — Full-bleed photo with large italic serif headline
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecomHero: ComponentDefinition = {
  id: "ecom-hero",
  category: "hero",
  name: "Ecom Hero",
  description: "Full-bleed hero with large italic serif headline, description, and pill CTA",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand", required: true },
    navLinks: { type: "list", label: "Nav Links", required: true },
    headline: { type: "text", label: "Headline", required: true },
    description: { type: "text", label: "Description", required: true },
    ctaLabel: { type: "text", label: "CTA Text", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
  },
  defaultContent: {
    brand: "Chicago",
    navLinks: ["Shop All", "Behind The Brand"],
    headline: "Meet Chicago, the flexible ecommerce template.",
    description: "Gear built for runners who never stop. Designed for speed, endurance, and the toughest conditions.",
    ctaLabel: "Shop All",
    backgroundImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&h=900&fit=crop",
  },
  html: `<style>
.eh-hero{position:relative;min-height:100vh;display:flex;flex-direction:column;overflow:hidden}
.eh-bg{position:absolute;inset:0;z-index:0}
.eh-bg img{width:100%;height:100%;object-fit:cover;display:block;object-position:center 55%}
.eh-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.55) 100%)}
.eh-nav{position:relative;z-index:20;padding:16px 40px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;max-width:1400px;margin:0 auto;width:100%}
.eh-nav-left{display:flex;align-items:center;gap:28px}
.eh-nav-left a{font-size:14px;color:#fff;text-decoration:none;font-family:{{fontBody}};font-weight:400}
.eh-nav-brand{font-size:22px;font-weight:400;color:#fff;text-decoration:none;font-family:{{fontHeading}};text-align:center;display:flex;align-items:center;justify-content:center;gap:8px}
.eh-nav-dot{width:10px;height:10px;border-radius:50%;background:{{primary}};display:inline-block}
.eh-nav-right{display:flex;align-items:center;justify-content:flex-end;gap:20px}
.eh-nav-icon{width:20px;height:20px;color:#fff;opacity:0.8}
.eh-content{position:relative;z-index:10;padding:0 48px 64px;max-width:1440px;margin:auto auto 0;width:100%;display:grid;grid-template-columns:1.4fr 0.6fr;gap:48px;align-items:end}
.eh-heading{font-size:56px;font-weight:400;font-style:italic;color:#fff;font-family:{{fontHeading}};line-height:1.1;margin:0;letter-spacing:-0.3px}
.eh-right{display:flex;flex-direction:column;align-items:flex-start;gap:20px}
.eh-cta{height:44px;padding:0 24px;border-radius:40px;background:#fff;color:#111;font-size:13px;font-weight:500;text-decoration:none;font-family:{{fontBody}};display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.3);white-space:nowrap;flex-shrink:0}
.eh-desc{font-size:14px;color:rgba(255,255,255,0.75);line-height:1.5;font-family:{{fontBody}};max-width:380px;margin:0}
@media(max-width:1024px){.eh-heading{font-size:42px!important}}
@media(max-width:768px){.eh-content{padding:0 24px 48px!important;grid-template-columns:1fr!important;gap:24px!important}.eh-heading{font-size:32px!important}.eh-nav{padding:14px 20px!important}.eh-nav-left{display:none!important}}
</style>
<section class="eh-hero">
  <div class="eh-bg"><img src="{{backgroundImage}}" alt="" /></div>
  <nav class="eh-nav">
    <div class="eh-nav-left">{{#navLinks}}<a href="#">{{.}}</a>{{/navLinks}}</div>
    <a href="#" class="eh-nav-brand"><span class="eh-nav-dot"></span>{{brand}}</a>
    <div class="eh-nav-right">
      <svg class="eh-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <svg class="eh-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
    </div>
  </nav>
  <div class="eh-content">
    <h1 class="eh-heading">{{headline}}</h1>
    <div class="eh-right">
      <p class="eh-desc">{{description}}</p>
      <a href="#" class="eh-cta">{{ctaLabel}}</a>
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ECOMMERCE FEATURED — "Featured" product cards on light bg
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecomFeatured: ComponentDefinition = {
  id: "ecom-featured",
  category: "features",
  name: "Ecom Featured Products",
  description: "Featured product cards with gray photo bg, orange category label, name, and price",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    products: { type: "list", label: "Products", required: true },
  },
  defaultContent: {
    title: "Featured",
    products: [
      { image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop", category: "ALL WEATHER", name: "Elite Windbreaker", price: "$139" },
      { image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop", category: "PERFORMANCE", name: "Racing Shorts", price: "$49" },
      { image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=600&fit=crop", category: "LIFESTYLE", name: "Athletics Cap", price: "$29" },
    ],
  },
  html: `<style>
.ef-section{background:{{bg}};padding:80px 48px}
.ef-inner{max-width:1400px;margin:0 auto}
.ef-title{font-size:48px;font-weight:700;font-style:italic;color:{{text}};font-family:{{fontHeading}};margin:0 0 40px;line-height:1}
.ef-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.ef-card{cursor:pointer}
.ef-img-wrap{background:#e8e8e4;border-radius:4px;overflow:hidden;aspect-ratio:5/6;margin-bottom:12px}
.ef-img-wrap img{width:100%;height:100%;object-fit:cover;display:block}
.ef-cat{font-size:11px;font-weight:500;color:{{primary}};font-family:{{fontBody}};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px}
.ef-name{font-size:16px;font-weight:600;color:{{text}};font-family:{{fontBody}};margin-bottom:2px}
.ef-price{font-size:15px;font-weight:400;color:{{text}};font-family:{{fontBody}}}
@media(max-width:1024px){.ef-grid{grid-template-columns:repeat(2,1fr)!important}.ef-title{font-size:36px!important}}
@media(max-width:768px){.ef-section{padding:56px 24px!important}.ef-grid{grid-template-columns:1fr!important}}
</style>
<section class="ef-section">
  <div class="ef-inner">
    <h2 class="ef-title">{{title}}</h2>
    <div class="ef-grid">
      {{#products}}<div class="ef-card"><div class="ef-img-wrap"><img src="{{image}}" alt="{{name}}" /></div><div class="ef-cat">{{category}}</div><div class="ef-name">{{name}}</div><div class="ef-price">{{price}}</div></div>{{/products}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ECOMMERCE PROMO — Full-bleed photo CTA banner
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecomPromo: ComponentDefinition = {
  id: "ecom-promo",
  category: "cta",
  name: "Ecom Promo Banner",
  description: "Full-bleed photo with large italic headline, description, and pill CTA",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    description: { type: "text", label: "Description", required: true },
    ctaLabel: { type: "text", label: "CTA Text", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
  },
  defaultContent: {
    headline: "Footwear formulated for champion athletes.",
    description: "Check out our new line of running shoes, designed for road, performance, and distance athletes.",
    ctaLabel: "Shop Shoes",
    backgroundImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1600&h=800&fit=crop",
  },
  html: `<style>
.ep-section{position:relative;min-height:500px;display:flex;align-items:flex-end;overflow:hidden}
.ep-bg{position:absolute;inset:0;z-index:0}
.ep-bg img{width:100%;height:100%;object-fit:cover;display:block}
.ep-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 20%,rgba(0,0,0,0.5) 100%)}
.ep-content{position:relative;z-index:10;padding:0 48px 56px;max-width:680px}
.ep-heading{font-size:48px;font-weight:400;font-style:italic;color:#fff;font-family:{{fontHeading}};line-height:1.12;margin:0 0 16px}
.ep-desc{font-size:15px;color:rgba(255,255,255,0.75);line-height:1.5;font-family:{{fontBody}};margin:0 0 28px}
.ep-cta{height:44px;padding:0 28px;border-radius:40px;background:#fff;color:#111;font-size:13px;font-weight:500;text-decoration:none;font-family:{{fontBody}};display:inline-flex;align-items:center;justify-content:center}
@media(max-width:768px){.ep-content{padding:0 24px 40px!important}.ep-heading{font-size:32px!important}}
</style>
<section class="ep-section">
  <div class="ep-bg"><img src="{{backgroundImage}}" alt="" /></div>
  <div class="ep-content">
    <h2 class="ep-heading">{{headline}}</h2>
    <p class="ep-desc">{{description}}</p>
    <a href="#" class="ep-cta">{{ctaLabel}}</a>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ECOMMERCE SHOP ALL — Product grid with filter pills
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecomShopAll: ComponentDefinition = {
  id: "ecom-shop-all",
  category: "gallery",
  name: "Ecom Shop All Grid",
  description: "Full product grid with filter pills and 3-col product cards",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    subtitle: { type: "text", label: "Subtitle", required: false },
    filters: { type: "list", label: "Filter Pills", required: false },
    resultCount: { type: "text", label: "Result Count", required: false },
    products: { type: "list", label: "Products", required: true },
    ctaLabel: { type: "text", label: "Load More Text", required: false },
  },
  defaultContent: {
    title: "Shop All",
    subtitle: "The latest in lifestyle and performance running, meticulously crafted for wherever your journey takes you",
    filters: ["Featured", "Low to High", "High to Low"],
    resultCount: "9 RESULTS",
    products: [
      { image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop", category: "PERFORMANCE", name: "Racing Singlet", price: "$65" },
      { image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop", category: "PERFORMANCE", name: "Speed Shorts", price: "$49" },
      { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop", category: "FOOTWEAR", name: "Racing Shoe", price: "$220" },
      { image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop", category: "ALL WEATHER", name: "Windbreaker Pro", price: "$139" },
      { image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop", category: "PERFORMANCE", name: "Training Tee", price: "$49" },
      { image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=500&fit=crop", category: "LIFESTYLE", name: "Athletics Cap", price: "$29" },
    ],
    ctaLabel: "Load More",
  },
  html: `<style>
.es-section{background:{{bg}};padding:80px 48px}
.es-inner{max-width:1400px;margin:0 auto}
.es-title{font-size:48px;font-weight:700;font-style:italic;color:{{text}};font-family:{{fontHeading}};margin:0 0 12px;line-height:1}
.es-subtitle{font-size:16px;color:rgba(17,17,17,0.5);font-family:{{fontBody}};margin:0 0 32px;max-width:560px;line-height:1.5;font-style:italic}
.es-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;padding-top:16px;border-top:1px solid rgba(0,0,0,0.08)}
.es-filters{display:flex;gap:8px}
.es-pill{height:36px;padding:0 18px;border-radius:40px;font-size:13px;font-family:{{fontBody}};font-weight:500;display:inline-flex;align-items:center;border:1px solid rgba(0,0,0,0.15);background:transparent;color:{{text}};cursor:pointer;text-decoration:none}
.es-pill:first-child{background:{{text}};color:{{bg}};border-color:{{text}}}
.es-count{font-size:11px;font-weight:500;color:rgba(17,17,17,0.4);font-family:{{fontBody}};letter-spacing:0.08em;text-transform:uppercase}
.es-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.es-card{cursor:pointer}
.es-img-wrap{background:#e8e8e4;border-radius:4px;overflow:hidden;aspect-ratio:4/5;margin-bottom:12px}
.es-img-wrap img{width:100%;height:100%;object-fit:cover;display:block}
.es-cat{font-size:11px;font-weight:500;color:{{primary}};font-family:{{fontBody}};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px}
.es-name{font-size:15px;font-weight:600;color:{{text}};font-family:{{fontBody}};margin-bottom:2px}
.es-price{font-size:14px;font-weight:400;color:{{text}};font-family:{{fontBody}}}
.es-load{text-align:center;margin-top:48px}
.es-load-btn{height:44px;padding:0 32px;border-radius:40px;background:{{text}};color:{{bg}};font-size:13px;font-weight:500;text-decoration:none;font-family:{{fontBody}};display:inline-flex;align-items:center;justify-content:center;border:none;cursor:pointer}
@media(max-width:1024px){.es-grid{grid-template-columns:repeat(2,1fr)!important}.es-title{font-size:36px!important}}
@media(max-width:768px){.es-section{padding:56px 24px!important}.es-grid{grid-template-columns:1fr!important}.es-bar{flex-direction:column!important;align-items:flex-start!important;gap:12px}}
</style>
<section class="es-section">
  <div class="es-inner">
    <h2 class="es-title">{{title}}</h2>
    <p class="es-subtitle">{{subtitle}}</p>
    <div class="es-bar">
      <div class="es-filters">{{#filters}}<span class="es-pill">{{.}}</span>{{/filters}}</div>
      <span class="es-count">{{resultCount}}</span>
    </div>
    <div class="es-grid">
      {{#products}}<div class="es-card"><div class="es-img-wrap"><img src="{{image}}" alt="{{name}}" /></div><div class="es-cat">{{category}}</div><div class="es-name">{{name}}</div><div class="es-price">{{price}}</div></div>{{/products}}
    </div>
    <div class="es-load"><button class="es-load-btn">{{ctaLabel}}</button></div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ECOMMERCE REVIEWS — Photo review cards with star ratings
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecomReviews: ComponentDefinition = {
  id: "ecom-reviews",
  category: "testimonials",
  name: "Ecom Photo Reviews",
  description: "Review cards with dark photos, usernames, star ratings, and review text",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    reviews: { type: "list", label: "Reviews", required: true },
  },
  defaultContent: {
    title: "What Other Runners Say",
    reviews: [
      { image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=400&fit=crop", username: "@usain_voltage", stars: "4.5", review: "Super lightweight and responsive! Feels like running on air. Totally worth it for serious runners." },
      { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop", username: "@couchp0tat014", stars: "4.5", review: "The softest hoodie I have ever bought. Perfect for lounging or casual wear. Fits oversized." },
      { image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop", username: "@elliotkipchoge", stars: "5", review: "Blocks the wind without overheating. Stylish but needs an extra pocket." },
    ],
  },
  html: `<style>
.er-section{background:{{bg}};padding:80px 48px}
.er-inner{max-width:1400px;margin:0 auto}
.er-title{font-size:48px;font-weight:700;font-style:italic;color:{{text}};font-family:{{fontHeading}};margin:0 0 40px;line-height:1.1}
.er-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.er-card{}
.er-img{width:100%;aspect-ratio:1;object-fit:cover;display:block;border-radius:4px;margin-bottom:12px}
.er-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.er-user{font-size:12px;color:rgba(17,17,17,0.45);font-family:{{fontBody}}}
.er-stars{font-size:12px;color:{{primary}};font-family:{{fontBody}};letter-spacing:1px}
.er-review{font-size:14px;font-weight:600;color:{{text}};font-family:{{fontBody}};line-height:1.5}
@media(max-width:1024px){.er-grid{grid-template-columns:repeat(2,1fr)!important}.er-title{font-size:36px!important}}
@media(max-width:768px){.er-section{padding:56px 24px!important}.er-grid{grid-template-columns:1fr!important}}
</style>
<section class="er-section">
  <div class="er-inner">
    <h2 class="er-title">{{title}}</h2>
    <div class="er-grid">
      {{#reviews}}<div class="er-card"><img src="{{image}}" alt="" class="er-img" /><div class="er-meta"><span class="er-user">{{username}}</span><span class="er-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div><p class="er-review">{{review}}</p></div>{{/reviews}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ECOMMERCE STORY — Full-bleed brand story CTA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecomStory: ComponentDefinition = {
  id: "ecom-story",
  category: "about",
  name: "Ecom Brand Story",
  description: "Full-bleed dark photo with bold serif headline, description, and outline CTA",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    description: { type: "text", label: "Description", required: true },
    ctaLabel: { type: "text", label: "CTA Text", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
  },
  defaultContent: {
    headline: "Born from the streets of Chicago",
    description: "From humble beginnings, our gear is built to stand behind you on every journey. We take pride in what we make, knowing that it is the backbone of your training.",
    ctaLabel: "Behind the Brand",
    backgroundImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&h=800&fit=crop",
  },
  html: `<style>
.ey-section{position:relative;min-height:500px;display:flex;align-items:flex-end;overflow:hidden}
.ey-bg{position:absolute;inset:0;z-index:0}
.ey-bg img{width:100%;height:100%;object-fit:cover;display:block}
.ey-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 20%,rgba(0,0,0,0.65) 100%)}
.ey-content{position:relative;z-index:10;padding:0 48px 56px;display:flex;align-items:flex-end;justify-content:space-between;width:100%;max-width:1400px;margin:0 auto;gap:48px}
.ey-left{max-width:520px}
.ey-heading{font-size:48px;font-weight:700;font-style:italic;color:#fff;font-family:{{fontHeading}};line-height:1.1;margin:0 0 16px}
.ey-desc{font-size:14px;color:rgba(255,255,255,0.65);line-height:1.6;font-family:{{fontBody}};margin:0}
.ey-cta{height:44px;padding:0 28px;border-radius:40px;background:transparent;color:#fff;font-size:13px;font-weight:500;text-decoration:none;font-family:{{fontBody}};display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.4);white-space:nowrap;flex-shrink:0}
@media(max-width:768px){.ey-content{flex-direction:column!important;align-items:flex-start!important;padding:0 24px 40px!important;gap:20px}.ey-heading{font-size:32px!important}}
</style>
<section class="ey-section">
  <div class="ey-bg"><img src="{{backgroundImage}}" alt="" /></div>
  <div class="ey-content">
    <div class="ey-left">
      <h2 class="ey-heading">{{headline}}</h2>
      <p class="ey-desc">{{description}}</p>
    </div>
    <a href="#" class="ey-cta">{{ctaLabel}}</a>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ECOMMERCE FOOTER — Oversized brand footer with gradient text
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecomFooter: ComponentDefinition = {
  id: "ecom-footer",
  category: "footer",
  name: "Ecom Oversized Footer",
  description: "Footer with link columns, newsletter input, oversized gradient brand name, and bottom bar",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    columns: { type: "list", label: "Footer Columns", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
    tagline: { type: "text", label: "Tagline", required: false },
  },
  defaultContent: {
    brand: "Chicago",
    columns: [
      { title: "Shop", links: ["Shop all", "Behind the brand", "New arrivals"] },
      { title: "Support", links: ["Contact", "Terms", "FAQ's"] },
    ],
    copyright: "2026 Chicago",
    tagline: "Run to win.",
  },
  html: `<style>
.efo-section{background:{{bg}};padding:64px 48px 0;overflow:hidden}
.efo-inner{max-width:1400px;margin:0 auto}
.efo-top{display:grid;grid-template-columns:1fr repeat(2,160px) 1fr;gap:48px;margin-bottom:48px;align-items:start}
.efo-logo{display:flex;align-items:center;gap:8px}
.efo-logo-dot{width:10px;height:10px;border-radius:50%;background:{{primary}}}
.efo-logo-name{font-size:16px;font-weight:400;color:{{text}};font-family:{{fontHeading}}}
.efo-col-title{font-size:14px;font-weight:600;color:{{text}};font-family:{{fontBody}};margin-bottom:16px}
.efo-col-links{list-style:none;padding:0;margin:0}
.efo-col-links li{margin-bottom:10px}
.efo-col-links a{font-size:14px;color:rgba(17,17,17,0.5);text-decoration:none;font-family:{{fontBody}}}
.efo-newsletter{text-align:right}
.efo-nl-title{font-size:14px;font-weight:600;color:{{text}};font-family:{{fontBody}};margin-bottom:16px}
.efo-nl-form{display:flex;gap:8px;justify-content:flex-end}
.efo-nl-input{height:40px;padding:0 14px;border-radius:4px;border:1px solid rgba(0,0,0,0.15);background:transparent;font-size:13px;font-family:{{fontBody}};color:{{text}};width:180px}
.efo-nl-btn{height:40px;padding:0 18px;border-radius:4px;background:{{text}};color:{{bg}};font-size:13px;font-weight:600;font-family:{{fontBody}};border:none;cursor:pointer}
.efo-brand{font-size:clamp(120px,18vw,280px);font-weight:700;color:{{text}};font-family:{{fontHeading}};line-height:0.85;text-align:center;margin:0;padding:0 0 0;background:linear-gradient(180deg,{{text}} 40%,transparent 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;user-select:none;overflow:hidden;white-space:nowrap}
.efo-bottom{display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-top:1px solid rgba(0,0,0,0.08);margin-top:-20px;position:relative;z-index:2}
.efo-copy{font-size:12px;color:rgba(17,17,17,0.35);font-family:{{fontBody}}}
.efo-icons{display:flex;gap:12px}
.efo-icon{width:18px;height:18px;color:rgba(17,17,17,0.35)}
.efo-tagline{font-size:12px;color:rgba(17,17,17,0.35);font-family:{{fontBody}};font-style:italic}
@media(max-width:1024px){.efo-top{grid-template-columns:1fr 1fr!important;gap:32px}.efo-newsletter{text-align:left!important}.efo-nl-form{justify-content:flex-start!important}}
@media(max-width:768px){.efo-section{padding:48px 24px 0!important}.efo-top{grid-template-columns:1fr!important;gap:28px}.efo-bottom{flex-direction:column!important;gap:8px!important;align-items:flex-start}}
</style>
<footer class="efo-section">
  <div class="efo-inner">
    <div class="efo-top">
      <div class="efo-logo"><span class="efo-logo-dot"></span><span class="efo-logo-name">{{brand}}</span></div>
      {{#columns}}<div>
        <h4 class="efo-col-title">{{title}}</h4>
        <ul class="efo-col-links">{{#links}}<li><a href="#">{{.}}</a></li>{{/links}}</ul>
      </div>{{/columns}}
      <div class="efo-newsletter">
        <h4 class="efo-nl-title">Join the Club</h4>
        <div class="efo-nl-form">
          <input type="email" placeholder="name@email.com" class="efo-nl-input" />
          <button class="efo-nl-btn">Submit</button>
        </div>
      </div>
    </div>
    <p class="efo-brand">{{brand}}</p>
    <div class="efo-bottom">
      <span class="efo-copy">&copy;{{copyright}}</span>
      <div class="efo-icons">
        <svg class="efo-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        <svg class="efo-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
        <svg class="efo-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        <svg class="efo-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      </div>
      <span class="efo-tagline">{{tagline}}</span>
    </div>
  </div>
</footer>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ecommerceComponents: ComponentDefinition[] = [
  ecomMarquee,
  ecomNav,
  ecomHero,
  ecomFeatured,
  ecomPromo,
  ecomShopAll,
  ecomReviews,
  ecomStory,
  ecomFooter,
];
