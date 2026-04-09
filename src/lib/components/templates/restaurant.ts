import { ComponentDefinition } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT NAV — Black bar, white links, red pill CTA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantNav: ComponentDefinition = {
  id: "restaurant-nav",
  category: "navigation",
  name: "Restaurant Dark Nav",
  description: "Black nav bar with white links and red pill CTA",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand", required: true },
    links: { type: "list", label: "Links", required: true },
    ctaText: { type: "text", label: "CTA", required: false },
  },
  defaultContent: {
    brand: "Sunrise Bistro",
    links: ["About", "Menu", "Contact"],
    ctaText: "Book a Table",
  },
  html: `<style>
.dn-nav{background:#000;padding:16px 80px}
.dn-inner{max-width:1440px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.dn-brand{font-size:20px;font-weight:400;color:#fff;font-family:{{fontHeading}};text-transform:uppercase;text-decoration:none;letter-spacing:-0.01em}
.dn-links{display:flex;align-items:center;gap:32px}
.dn-links a{font-size:15px;color:rgba(255,255,255,0.7);text-decoration:none;font-family:{{fontBody}};font-weight:400;transition:color .2s}
.dn-links a:hover{color:{{primary}}}
.dn-cta{height:40px;padding:0 24px;border-radius:56px;background:{{primary}};color:#fff;font-size:14px;font-weight:700;font-family:{{fontBody}};text-decoration:none;display:inline-flex;align-items:center;border:none;white-space:nowrap}
@media(max-width:768px){.dn-nav{padding:14px 24px}.dn-links{display:none}}
</style>
<nav class="dn-nav">
  <div class="dn-inner">
    <a href="#" class="dn-brand">{{brand}}</a>
    <div class="dn-links">{{#links}}<a href="#">{{.}}</a>{{/links}}</div>
    <a href="#" class="dn-cta">{{ctaText}}</a>
  </div>
</nav>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT HERO — Cream bg, massive uppercase heading, food image
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantHero: ComponentDefinition = {
  id: "restaurant-hero",
  category: "hero",
  name: "Restaurant Editorial Hero",
  description: "Cream background hero with massive condensed uppercase heading and food photography",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    subtitle: { type: "text", label: "Subtitle", required: true },
    ctaText: { type: "text", label: "CTA", required: true },
    heroImage: { type: "image", label: "Hero Image", required: true },
    stat: { type: "text", label: "Stat Number", required: false },
    statLabel: { type: "text", label: "Stat Label", required: false },
  },
  defaultContent: {
    headline: "WHERE ELEGANCE MEETS FLAVOR",
    subtitle: "Experience authentic cuisine crafted with passion, premium ingredients, and centuries of culinary tradition.",
    ctaText: "Explore Menu",
    heroImage: "/images/restaurant-hero.png",
    stat: "10+",
    statLabel: "Years of Excellence",
  },
  html: `<style>
html,body{background:#000!important}
.dh-hero{position:relative;min-height:calc(100vh - 72px);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;background:#000}
.dh-bg{position:absolute;inset:0;z-index:0}
.dh-bg img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;display:block}
.dh-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.25) 0%,rgba(0,0,0,0.55) 100%)}
.dh-inner{position:relative;z-index:10;max-width:1440px;margin:0 auto;padding:0 80px 48px;width:100%}
.dh-heading{font-size:clamp(48px,7vw,100px);font-weight:400;color:#fff;font-family:{{fontHeading}};text-transform:uppercase;line-height:1.05;letter-spacing:-0.01em;margin:0 0 24px;max-width:700px}
.dh-row{display:flex;align-items:flex-end;gap:48px}
.dh-left{flex:1}
.dh-sub{font-size:16px;color:rgba(255,255,255,0.75);font-family:{{fontBody}};line-height:1.6;max-width:420px;margin:0 0 32px}
.dh-cta{height:48px;padding:0 32px;border-radius:56px;background:{{primary}};color:#fff;font-size:15px;font-weight:700;font-family:{{fontBody}};text-decoration:none;display:inline-flex;align-items:center;gap:8px;border:none}
.dh-stat{text-align:right}
.dh-stat-num{font-size:72px;font-weight:400;color:#fff;font-family:{{fontHeading}};line-height:1;letter-spacing:-0.02em}
.dh-stat-label{font-size:13px;color:rgba(255,255,255,0.6);font-family:{{fontBody}};text-transform:uppercase;letter-spacing:0.05em;margin-top:4px}
@media(max-width:1024px){.dh-row{flex-direction:column;align-items:flex-start;gap:24px}.dh-stat{text-align:left}}
@media(max-width:768px){.dh-inner{padding:0 24px 48px}}
</style>
<section class="dh-hero">
  <div class="dh-bg"><img src="{{heroImage}}" alt="" /></div>
  <div class="dh-inner">
    <h1 class="dh-heading">{{headline}}</h1>
    <div class="dh-row">
      <div class="dh-left">
        <p class="dh-sub">{{subtitle}}</p>
        <a href="#" class="dh-cta">{{ctaText}} &rarr;</a>
      </div>
      <div class="dh-stat">
        <div class="dh-stat-num">{{stat}}</div>
        <div class="dh-stat-label">{{statLabel}}</div>
      </div>
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT MARQUEE — Red scrolling ticker band
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantMarquee: ComponentDefinition = {
  id: "restaurant-marquee",
  category: "cta",
  name: "Restaurant Red Marquee",
  description: "Red scrolling ticker band with food items",
  source: "custom",
  slots: {
    items: { type: "list", label: "Marquee Items", required: true },
  },
  defaultContent: {
    items: [
      { label: "FRESH SUSHI ROLLS" },
      { label: "SIGNATURE RAMEN" },
      { label: "PREMIUM WAGYU" },
    ],
  },
  html: `<style>
.dmq-bar{background:{{primary}};padding:20px 0;overflow:hidden;white-space:nowrap}
.dmq-track{display:inline-flex;animation:dmq-scroll 20s linear infinite}
.dmq-item{font-size:28px;font-weight:400;color:#fff;font-family:{{fontHeading}};text-transform:uppercase;letter-spacing:-0.01em;padding:0 24px;display:inline-flex;align-items:center;gap:24px}
.dmq-item::after{content:"\\2726";font-size:16px;opacity:0.7}
@keyframes dmq-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
</style>
<div class="dmq-bar">
  <div class="dmq-track">
    {{#items}}<span class="dmq-item">{{label}}</span>{{/items}}{{#items}}<span class="dmq-item">{{label}}</span>{{/items}}{{#items}}<span class="dmq-item">{{label}}</span>{{/items}}{{#items}}<span class="dmq-item">{{label}}</span>{{/items}}
  </div>
</div>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT ABOUT — White bg, monospace label, heading, image
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantAbout: ComponentDefinition = {
  id: "restaurant-about",
  category: "about",
  name: "Restaurant About",
  description: "White background about section with monospace label and large heading",
  source: "custom",
  slots: {
    sectionLabel: { type: "text", label: "Section Label", required: false },
    headline: { type: "text", label: "Headline", required: true },
    body: { type: "text", label: "Body Text", required: true },
    image: { type: "image", label: "Image", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
  },
  defaultContent: {
    sectionLabel: "{About Us}",
    headline: "A STORY BUILT ON PASSION AND FLAVOR",
    body: "From our humble beginnings, we set out to craft dishes that honor tradition while embracing innovation. Every plate tells a story of dedication, fresh ingredients, and the art of Japanese cuisine.",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=500&fit=crop",
    ctaText: "More About Us",
  },
  html: `<style>
.dab-section{background:#fff;padding:112px 80px}
.dab-inner{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.dab-label{font-size:14px;color:rgba(23,23,23,0.4);font-family:'Courier New',monospace;margin-bottom:24px}
.dab-heading{font-size:clamp(36px,5vw,64px);font-weight:400;color:{{text}};font-family:{{fontHeading}};text-transform:uppercase;line-height:1.1;letter-spacing:-0.01em;margin:0 0 28px}
.dab-body{font-size:16px;color:rgba(23,23,23,0.6);font-family:{{fontBody}};line-height:1.7;margin:0 0 32px}
.dab-cta{font-size:15px;font-weight:700;color:{{text}};font-family:{{fontBody}};text-decoration:underline;text-underline-offset:4px}
.dab-img{width:100%;border-radius:10px;object-fit:cover;aspect-ratio:4/3;display:block}
@media(max-width:1024px){.dab-inner{grid-template-columns:1fr;gap:40px}}
@media(max-width:768px){.dab-section{padding:80px 24px}}
</style>
<section class="dab-section">
  <div class="dab-inner">
    <div>
      <div class="dab-label">{{sectionLabel}}</div>
      <h2 class="dab-heading">{{headline}}</h2>
      <p class="dab-body">{{body}}</p>
      <a href="#" class="dab-cta">{{ctaText}}</a>
    </div>
    <img src="{{image}}" alt="" class="dab-img" />
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT MENU — Cream bg, menu cards with images, prices, ratings
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantMenu: ComponentDefinition = {
  id: "restaurant-menu",
  category: "features",
  name: "Restaurant Menu Grid",
  description: "Cream background menu grid with food cards, prices and ratings",
  source: "custom",
  slots: {
    sectionLabel: { type: "text", label: "Section Label", required: false },
    headline: { type: "text", label: "Headline", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
    items: { type: "list", label: "Menu Items", required: true },
  },
  defaultContent: {
    sectionLabel: "{Our Menu}",
    headline: "DISCOVER THE ART OF TASTE",
    ctaText: "View All Menu",
    items: [
      { image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=400&fit=crop", name: "Sashimi Board", desc: "Chef's selection of 12 premium daily cuts", price: "$38", rating: "4.9" },
      { image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop", name: "Dragon Roll", desc: "Shrimp tempura, avocado, eel sauce", price: "$24", rating: "4.8" },
      { image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop", name: "Wagyu A5 Steak", desc: "Japanese wagyu glazed with white miso", price: "$65", rating: "5.0" },
    ],
  },
  html: `<style>
.dmn-section{background:{{bg}};padding:112px 80px}
.dmn-inner{max-width:1440px;margin:0 auto}
.dmn-top{text-align:center;margin-bottom:64px}
.dmn-label{font-size:14px;color:rgba(23,23,23,0.4);font-family:'Courier New',monospace;margin-bottom:20px}
.dmn-heading{font-size:clamp(40px,6vw,80px);font-weight:400;color:{{text}};font-family:{{fontHeading}};text-transform:uppercase;line-height:1.1;letter-spacing:-0.01em;margin:0}
.dmn-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px}
.dmn-card{background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 0.6px 1.5px rgba(0,0,0,0.08),0 2.3px 5.9px rgba(0,0,0,0.06),0 10px 26px rgba(0,0,0,0.02)}
.dmn-card-img{width:100%;aspect-ratio:5/4;object-fit:cover;display:block}
.dmn-card-body{padding:24px}
.dmn-card-name{font-size:22px;font-weight:400;color:{{text}};font-family:{{fontHeading}};text-transform:uppercase;letter-spacing:-0.01em;margin:0 0 8px}
.dmn-card-desc{font-size:14px;color:rgba(23,23,23,0.5);font-family:{{fontBody}};line-height:1.5;margin:0 0 16px}
.dmn-card-row{display:flex;align-items:center;justify-content:space-between}
.dmn-card-price{font-size:20px;font-weight:700;color:{{text}};font-family:{{fontBody}}}
.dmn-card-rating{font-size:13px;color:{{primary}};font-family:{{fontBody}};font-weight:600;display:flex;align-items:center;gap:4px}
.dmn-card-rating::before{content:"\\2605"}
.dmn-card-cta{display:block;margin-top:20px;height:40px;border-radius:56px;background:#000;color:#fff;font-size:13px;font-weight:700;font-family:{{fontBody}};text-decoration:none;display:flex;align-items:center;justify-content:center;text-transform:uppercase;letter-spacing:0.03em}
.dmn-more{text-align:center}
.dmn-more-btn{height:48px;padding:0 32px;border-radius:56px;background:transparent;color:{{text}};font-size:15px;font-weight:700;font-family:{{fontBody}};text-decoration:none;display:inline-flex;align-items:center;border:1.5px solid rgba(23,23,23,0.2)}
@media(max-width:1024px){.dmn-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.dmn-section{padding:80px 24px}.dmn-grid{grid-template-columns:1fr}}
</style>
<section class="dmn-section">
  <div class="dmn-inner">
    <div class="dmn-top">
      <div class="dmn-label">{{sectionLabel}}</div>
      <h2 class="dmn-heading">{{headline}}</h2>
    </div>
    <div class="dmn-grid">
      {{#items}}<div class="dmn-card"><img src="{{image}}" alt="{{name}}" class="dmn-card-img" /><div class="dmn-card-body"><h3 class="dmn-card-name">{{name}}</h3><p class="dmn-card-desc">{{desc}}</p><div class="dmn-card-row"><span class="dmn-card-price">{{price}}</span><span class="dmn-card-rating">{{rating}}</span></div><a href="#" class="dmn-card-cta">Book a Table</a></div></div>{{/items}}
    </div>
    <div class="dmn-more"><a href="#" class="dmn-more-btn">{{ctaText}}</a></div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT SPECIALS — Black bg, featured dishes on frosted glass
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantSpecials: ComponentDefinition = {
  id: "restaurant-specials",
  category: "features",
  name: "Restaurant Specials",
  description: "Black background specials section with frosted glass cards and numbered list",
  source: "custom",
  slots: {
    sectionLabel: { type: "text", label: "Section Label", required: false },
    headline: { type: "text", label: "Headline", required: true },
    featureName: { type: "text", label: "Feature Name", required: true },
    featureYear: { type: "text", label: "Feature Year", required: false },
    items: { type: "list", label: "Special Items", required: true },
  },
  defaultContent: {
    sectionLabel: "{Chef's Special}",
    headline: "A SYMPHONY OF TRADITION AND MODERN TASTE",
    featureName: "Omakase Experience",
    featureYear: "(2024-2025)",
    items: [
      { num: "01", name: "Crispy Tempura Bites" },
      { num: "02", name: "Spicy Tuna Tartare" },
      { num: "03", name: "Truffle Mushroom Soup" },
      { num: "04", name: "Edamame with Sea Salt" },
    ],
  },
  html: `<style>
.dsp-section{background:#000;padding:112px 80px}
.dsp-inner{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
.dsp-label{font-size:14px;color:rgba(255,255,255,0.35);font-family:'Courier New',monospace;margin-bottom:24px}
.dsp-heading{font-size:clamp(36px,5vw,64px);font-weight:400;color:#fff;font-family:{{fontHeading}};text-transform:uppercase;line-height:1.1;letter-spacing:-0.01em;margin:0}
.dsp-right{background:rgba(255,255,255,0.06);border-radius:10px;padding:48px;border:1px solid rgba(255,255,255,0.1)}
.dsp-feat{font-size:32px;font-weight:400;color:#fff;font-family:{{fontHeading}};text-transform:uppercase;letter-spacing:-0.01em;margin:0 0 4px}
.dsp-year{font-size:13px;color:rgba(255,255,255,0.4);font-family:'Courier New',monospace;margin-bottom:32px}
.dsp-list{list-style:none;padding:0;margin:0}
.dsp-list li{display:flex;align-items:center;gap:16px;padding:14px 0;border-top:1px solid rgba(255,255,255,0.1)}
.dsp-num{font-size:13px;color:{{primary}};font-family:'Courier New',monospace;font-weight:700;width:28px;flex-shrink:0}
.dsp-name{font-size:16px;color:rgba(255,255,255,0.8);font-family:{{fontBody}};font-weight:500}
@media(max-width:1024px){.dsp-inner{grid-template-columns:1fr;gap:40px}}
@media(max-width:768px){.dsp-section{padding:80px 24px}.dsp-right{padding:32px}}
</style>
<section class="dsp-section">
  <div class="dsp-inner">
    <div>
      <div class="dsp-label">{{sectionLabel}}</div>
      <h2 class="dsp-heading">{{headline}}</h2>
    </div>
    <div class="dsp-right">
      <h3 class="dsp-feat">{{featureName}}</h3>
      <div class="dsp-year">{{featureYear}}</div>
      <ul class="dsp-list">
        {{#items}}<li><span class="dsp-num">{{num}}</span><span class="dsp-name">{{name}}</span></li>{{/items}}
      </ul>
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT TESTIMONIALS — Cream bg, review cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantTestimonials: ComponentDefinition = {
  id: "restaurant-testimonials",
  category: "testimonials",
  name: "Restaurant Testimonials",
  description: "Testimonial cards with quotes and author info",
  source: "custom",
  slots: {
    sectionLabel: { type: "text", label: "Section Label", required: false },
    headline: { type: "text", label: "Headline", required: true },
    reviews: { type: "list", label: "Reviews", required: true },
  },
  defaultContent: {
    sectionLabel: "{Testimonials}",
    headline: "WHAT OUR GUESTS SAY",
    reviews: [
      { quote: "An extraordinary dining experience. Every dish was a work of art.", author: "Sakura Tanaka", role: "Business Executive", stars: "5" },
      { quote: "The freshest sushi I have ever tasted outside of Tokyo. Truly remarkable.", author: "Aiko Matsuda", role: "Culinary Reviewer", stars: "5" },
      { quote: "Impeccable service and stunning presentation. We keep coming back.", author: "Emi Suzuki", role: "Food Photographer", stars: "5" },
    ],
  },
  html: `<style>
.dtm-section{background:{{bg}};padding:112px 80px}
.dtm-inner{max-width:1440px;margin:0 auto}
.dtm-top{text-align:center;margin-bottom:64px}
.dtm-label{font-size:14px;color:rgba(23,23,23,0.4);font-family:'Courier New',monospace;margin-bottom:20px}
.dtm-heading{font-size:clamp(40px,6vw,80px);font-weight:400;color:{{text}};font-family:{{fontHeading}};text-transform:uppercase;line-height:1.1;letter-spacing:-0.01em;margin:0}
.dtm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.dtm-card{background:#fff;border-radius:10px;padding:40px 32px;box-shadow:0 0.6px 1.5px rgba(0,0,0,0.08),0 2.3px 5.9px rgba(0,0,0,0.06)}
.dtm-stars{color:{{primary}};font-size:16px;letter-spacing:2px;margin-bottom:20px}
.dtm-quote{font-size:17px;color:{{text}};font-family:{{fontBody}};line-height:1.7;font-style:italic;margin:0 0 28px}
.dtm-author{font-size:15px;font-weight:700;color:{{text}};font-family:{{fontBody}};margin:0 0 2px}
.dtm-role{font-size:13px;color:rgba(23,23,23,0.45);font-family:{{fontBody}}}
@media(max-width:1024px){.dtm-grid{grid-template-columns:1fr}}
@media(max-width:768px){.dtm-section{padding:80px 24px}}
</style>
<section class="dtm-section">
  <div class="dtm-inner">
    <div class="dtm-top">
      <div class="dtm-label">{{sectionLabel}}</div>
      <h2 class="dtm-heading">{{headline}}</h2>
    </div>
    <div class="dtm-grid">
      {{#reviews}}<div class="dtm-card"><div class="dtm-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p class="dtm-quote">"{{quote}}"</p><div class="dtm-author">{{author}}</div><div class="dtm-role">{{role}}</div></div>{{/reviews}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT TEAM — White bg, chef portrait grid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantTeam: ComponentDefinition = {
  id: "restaurant-team",
  category: "team",
  name: "Restaurant Chef Grid",
  description: "White background 3-column chef portrait grid",
  source: "custom",
  slots: {
    sectionLabel: { type: "text", label: "Section Label", required: false },
    headline: { type: "text", label: "Headline", required: true },
    members: { type: "list", label: "Team Members", required: true },
  },
  defaultContent: {
    sectionLabel: "{Our Chefs}",
    headline: "THE TEAM BEHIND EVERY DISH",
    members: [
      { image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=700&fit=crop", name: "Takahashi Aya", role: "Sous Chef" },
      { image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=500&h=700&fit=crop", name: "Sato Kenichi", role: "Head Chef" },
      { image: "https://images.unsplash.com/photo-1583394293214-28ez9ae2e3ac?w=500&h=700&fit=crop", name: "Nakamura Sho", role: "Pastry Chef" },
    ],
  },
  html: `<style>
.dte-section{background:#fff;padding:112px 80px}
.dte-inner{max-width:1440px;margin:0 auto}
.dte-top{text-align:center;margin-bottom:64px}
.dte-label{font-size:14px;color:rgba(23,23,23,0.4);font-family:'Courier New',monospace;margin-bottom:20px}
.dte-heading{font-size:clamp(40px,6vw,80px);font-weight:400;color:{{text}};font-family:{{fontHeading}};text-transform:uppercase;line-height:1.1;letter-spacing:-0.01em;margin:0}
.dte-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.dte-card{}
.dte-img{width:100%;aspect-ratio:3/4;object-fit:cover;display:block;border-radius:10px;margin-bottom:16px}
.dte-name{font-size:20px;font-weight:400;color:{{text}};font-family:{{fontHeading}};text-transform:uppercase;letter-spacing:-0.01em;margin:0 0 4px}
.dte-role{font-size:14px;color:rgba(23,23,23,0.5);font-family:{{fontBody}}}
@media(max-width:1024px){.dte-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.dte-section{padding:80px 24px}.dte-grid{grid-template-columns:1fr}}
</style>
<section class="dte-section">
  <div class="dte-inner">
    <div class="dte-top">
      <div class="dte-label">{{sectionLabel}}</div>
      <h2 class="dte-heading">{{headline}}</h2>
    </div>
    <div class="dte-grid">
      {{#members}}<div class="dte-card"><img src="{{image}}" alt="{{name}}" class="dte-img" /><div class="dte-name">{{name}}</div><div class="dte-role">{{role}}</div></div>{{/members}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT LOCATIONS — White bg, 2-col image overlay cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantLocations: ComponentDefinition = {
  id: "restaurant-locations",
  category: "features",
  name: "Restaurant Locations",
  description: "White background locations section with overlay image cards",
  source: "custom",
  slots: {
    sectionLabel: { type: "text", label: "Section Label", required: false },
    headline: { type: "text", label: "Headline", required: true },
    places: { type: "list", label: "Location Cards", required: true },
  },
  defaultContent: {
    sectionLabel: "{Our Locations}",
    headline: "CELEBRATE EVERY MOMENT WITH SUNRISE BISTRO EVENTS",
    places: [
      { photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=500&fit=crop", city: "Downtown", addr: "123 Main St, San Francisco, CA 94102" },
      { photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=500&fit=crop", city: "Waterfront", addr: "456 Harbor Blvd, San Francisco, CA 94111" },
    ],
  },
  html: `<style>
.dlc-section{background:#fff;padding:112px 80px}
.dlc-inner{max-width:1440px;margin:0 auto}
.dlc-top{margin-bottom:64px}
.dlc-label{font-size:14px;color:rgba(23,23,23,0.4);font-family:'Courier New',monospace;margin-bottom:20px}
.dlc-heading{font-size:clamp(36px,5vw,64px);font-weight:400;color:#171717;font-family:{{fontHeading}};text-transform:uppercase;line-height:1.1;letter-spacing:-0.01em;margin:0;max-width:800px}
.dlc-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.dlc-card{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:7/5}
.dlc-card-img{width:100%;height:100%;object-fit:cover;display:block}
.dlc-card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.65) 100%)}
.dlc-card-body{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:32px}
.dlc-card-city{font-size:clamp(28px,3.5vw,44px);font-weight:400;color:#fff;font-family:{{fontHeading}};text-transform:uppercase;letter-spacing:-0.01em;margin:0 0 6px}
.dlc-card-addr{font-size:14px;color:rgba(255,255,255,0.65);font-family:{{fontBody}};line-height:1.5;margin:0 0 20px}
.dlc-card-cta{display:inline-flex;align-items:center;height:40px;padding:0 24px;border-radius:56px;background:{{primary}};color:#fff;font-size:13px;font-weight:700;font-family:{{fontBody}};text-decoration:none;text-transform:uppercase;letter-spacing:0.04em;gap:6px}
@media(max-width:1024px){.dlc-grid{grid-template-columns:1fr}}
@media(max-width:768px){.dlc-section{padding:80px 24px}}
</style>
<section class="dlc-section">
  <div class="dlc-inner">
    <div class="dlc-top">
      <div class="dlc-label">{{sectionLabel}}</div>
      <h2 class="dlc-heading">{{headline}}</h2>
    </div>
    <div class="dlc-grid">
      {{#places}}<div class="dlc-card"><img src="{{photo}}" alt="{{city}}" class="dlc-card-img" /><div class="dlc-card-body"><h3 class="dlc-card-city">{{city}}</h3><p class="dlc-card-addr">{{addr}}</p><a href="#" class="dlc-card-cta">Location &rarr;</a></div></div>{{/places}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT BLOG — Cream bg, 2-col article cards with tall images
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantBlog: ComponentDefinition = {
  id: "restaurant-blog",
  category: "blog",
  name: "Restaurant Blog Section",
  description: "Cream background blog section with tall image article cards",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    intro: { type: "text", label: "Intro Text", required: false },
    posts: { type: "list", label: "Blog Posts", required: true },
  },
  defaultContent: {
    headline: "OUR LATEST BLOGS.",
    intro: "Explore culinary stories, behind-the-scenes moments, and the latest from our kitchen to your table.",
    posts: [
      { photo: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=800&fit=crop", tag: "(Culinary)", date: "Mar 15, 2026", title: "THE ART OF PLATING: HOW OUR CHEFS CREATE EDIBLE MASTERPIECES" },
      { photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop", tag: "(Ingredients)", date: "Feb 28, 2026", title: "FROM OCEAN TO TABLE: SOURCING THE FRESHEST FISH DAILY" },
    ],
  },
  html: `<style>
.dbl-section{background:{{bg}};padding:112px 80px}
.dbl-inner{max-width:1440px;margin:0 auto}
.dbl-top{display:flex;align-items:flex-start;justify-content:space-between;gap:48px;margin-bottom:64px}
.dbl-headline{font-size:clamp(40px,6vw,80px);font-weight:400;color:{{text}};font-family:{{fontHeading}};text-transform:uppercase;line-height:1.1;letter-spacing:-0.01em;margin:0;flex-shrink:0}
.dbl-intro{font-size:16px;color:rgba(23,23,23,0.5);font-family:{{fontBody}};line-height:1.7;max-width:400px;padding-top:12px}
.dbl-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.dbl-card{background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 0.6px 1.5px rgba(0,0,0,0.06),0 2.3px 5.9px rgba(0,0,0,0.04)}
.dbl-card-img{width:100%;aspect-ratio:3/4;object-fit:cover;display:block}
.dbl-card-body{padding:24px 24px 28px}
.dbl-card-meta{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.dbl-card-tag{font-size:13px;color:{{primary}};font-family:'Courier New',monospace;font-weight:600}
.dbl-card-date{font-size:13px;color:rgba(23,23,23,0.4);font-family:{{fontBody}}}
.dbl-card-title{font-size:clamp(18px,2vw,24px);font-weight:400;color:{{text}};font-family:{{fontHeading}};text-transform:uppercase;line-height:1.2;letter-spacing:-0.01em;margin:0}
@media(max-width:1024px){.dbl-top{flex-direction:column;gap:16px}.dbl-grid{grid-template-columns:1fr}}
@media(max-width:768px){.dbl-section{padding:80px 24px}}
</style>
<section class="dbl-section">
  <div class="dbl-inner">
    <div class="dbl-top">
      <h2 class="dbl-headline">{{headline}}</h2>
      <p class="dbl-intro">{{intro}}</p>
    </div>
    <div class="dbl-grid">
      {{#posts}}<div class="dbl-card"><img src="{{photo}}" alt="" class="dbl-card-img" /><div class="dbl-card-body"><div class="dbl-card-meta"><span class="dbl-card-tag">{{tag}}</span><span class="dbl-card-date">{{date}}</span></div><h3 class="dbl-card-title">{{title}}</h3></div></div>{{/posts}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESTAURANT FOOTER — Black bg, photo gallery, newsletter, brand, links
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const restaurantFooter: ComponentDefinition = {
  id: "restaurant-footer",
  category: "footer",
  name: "Restaurant Premium Footer",
  description: "Black footer with photo gallery, newsletter signup, large brand name, and link columns",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand", required: true },
    photos: { type: "list", label: "Gallery Photos", required: true },
    newsletterHeading: { type: "text", label: "Newsletter Heading", required: true },
    columns: { type: "list", label: "Link Columns", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
  },
  defaultContent: {
    brand: "Sunrise Bistro",
    photos: [
      { src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=300&fit=crop" },
      { src: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&h=300&fit=crop" },
      { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop" },
      { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop" },
      { src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop" },
    ],
    newsletterHeading: "SIGN UP FOR UPDATES, OFFERS, AND DELICIOUS SURPRISES",
    columns: [
      { title: "Pages", links: ["About", "Menu", "Gallery", "Contact"] },
      { title: "Utility", links: ["Style Guide", "Licenses", "Changelog"] },
      { title: "Follow Us", links: ["Instagram", "Facebook", "Twitter"] },
    ],
    copyright: "2026 Sunrise Bistro. All rights reserved.",
  },
  html: `<style>
.dft-section{background:#000;padding:0;overflow:hidden}
.dft-inner{max-width:1440px;margin:0 auto;padding:0 80px}
.dft-gallery{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;padding:80px 80px 0;max-width:1440px;margin:0 auto}
.dft-gallery-img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;border-radius:10px}
.dft-divider{border:none;border-top:1px dashed rgba(255,255,255,0.15);margin:48px 0}
.dft-newsletter{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding-bottom:48px}
.dft-nl-heading{font-size:clamp(28px,3.5vw,48px);font-weight:400;color:#fff;font-family:{{fontHeading}};text-transform:uppercase;line-height:1.1;letter-spacing:-0.01em;margin:0}
.dft-nl-right{}
.dft-nl-label{font-size:13px;color:rgba(255,255,255,0.4);font-family:'Courier New',monospace;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.05em}
.dft-nl-form{display:flex;gap:0;border:1px solid rgba(255,255,255,0.2);border-radius:56px;overflow:hidden;height:52px}
.dft-nl-input{flex:1;background:transparent;border:none;padding:0 24px;font-size:15px;color:#fff;font-family:{{fontBody}};outline:none}
.dft-nl-input::placeholder{color:rgba(255,255,255,0.3)}
.dft-nl-btn{width:52px;height:52px;border-radius:50%;background:{{primary}};border:none;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin:0}
.dft-brand-row{display:grid;grid-template-columns:1fr auto;gap:48px;align-items:start;padding:48px 0;border-top:1px solid rgba(255,255,255,0.1)}
.dft-big-brand{font-size:clamp(64px,12vw,180px);font-weight:400;color:#FEF6DF;font-family:{{fontHeading}};text-transform:uppercase;letter-spacing:-0.02em;line-height:0.9;margin:0;opacity:0.9}
.dft-cols{display:grid;grid-template-columns:repeat(3,140px);gap:32px;padding-top:12px}
.dft-col-title{font-size:13px;font-weight:700;color:#fff;font-family:{{fontBody}};margin-bottom:16px;text-transform:uppercase;letter-spacing:0.05em}
.dft-col-links{list-style:none;padding:0;margin:0}
.dft-col-links li{margin-bottom:10px}
.dft-col-links a{font-size:14px;color:rgba(255,255,255,0.45);text-decoration:none;font-family:{{fontBody}};transition:color .2s}
.dft-col-links a:hover{color:{{primary}}}
.dft-bottom{display:flex;align-items:center;justify-content:space-between;padding:20px 0;border-top:1px solid rgba(255,255,255,0.08);margin-top:16px}
.dft-copy{font-size:12px;color:rgba(255,255,255,0.25);font-family:{{fontBody}}}
.dft-socials{display:flex;gap:16px}
.dft-socials a{width:18px;height:18px;color:rgba(255,255,255,0.3);transition:color .2s}
.dft-socials a:hover{color:{{primary}}}
@media(max-width:1024px){.dft-gallery{grid-template-columns:repeat(3,1fr);padding:48px 80px 0}.dft-newsletter{grid-template-columns:1fr}.dft-brand-row{grid-template-columns:1fr}.dft-cols{padding-top:32px}}
@media(max-width:768px){.dft-gallery{grid-template-columns:repeat(2,1fr);padding:48px 24px 0;gap:8px}.dft-inner{padding:0 24px}.dft-cols{grid-template-columns:repeat(2,1fr)}.dft-bottom{flex-direction:column;gap:8px;align-items:flex-start}}
</style>
<footer class="dft-section">
  <div class="dft-gallery">
    {{#photos}}<img src="{{src}}" alt="" class="dft-gallery-img" />{{/photos}}
  </div>
  <div class="dft-inner">
    <hr class="dft-divider" />
    <div class="dft-newsletter">
      <h3 class="dft-nl-heading">{{newsletterHeading}}</h3>
      <div class="dft-nl-right">
        <div class="dft-nl-label">Newsletter</div>
        <div class="dft-nl-form">
          <input type="email" class="dft-nl-input" placeholder="Enter your email" />
          <button class="dft-nl-btn">&rarr;</button>
        </div>
      </div>
    </div>
    <div class="dft-brand-row">
      <p class="dft-big-brand">{{brand}}</p>
      <div class="dft-cols">
        {{#columns}}<div>
          <h4 class="dft-col-title">{{title}}</h4>
          <ul class="dft-col-links">{{#links}}<li><a href="#">{{.}}</a></li>{{/links}}</ul>
        </div>{{/columns}}
      </div>
    </div>
    <div class="dft-bottom">
      <span class="dft-copy">&copy; {{copyright}}</span>
      <div class="dft-socials">
        <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
        <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
        <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg></a>
      </div>
    </div>
  </div>
</footer>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const restaurantComponents: ComponentDefinition[] = [
  restaurantNav,
  restaurantHero,
  restaurantMarquee,
  restaurantAbout,
  restaurantMenu,
  restaurantSpecials,
  restaurantTestimonials,
  restaurantTeam,
  restaurantLocations,
  restaurantBlog,
  restaurantFooter,
];
