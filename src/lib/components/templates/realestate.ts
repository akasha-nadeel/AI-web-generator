import { ComponentDefinition } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE NAV — Grid-icon logo + Menu text overlay
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateNav: ComponentDefinition = {
  id: "realestate-nav",
  category: "navigation",
  name: "Real Estate Navigation",
  description: "Minimal overlay nav with grid-icon logo and menu text",
  source: "custom",
  slots: {
    menuText: { type: "text", label: "Menu Text", required: true },
  },
  defaultContent: {
    menuText: "Menu",
  },
  html: `<style>
.rn{position:absolute;top:0;left:0;right:0;z-index:100;padding:28px 48px}
.rn-inner{display:flex;align-items:center;justify-content:space-between}
.rn-logo{display:grid;grid-template-columns:1fr 1fr;gap:4px;width:26px;height:26px}
.rn-logo span{background:{{primary}};border-radius:3px}
.rn-menu{font-size:18px;color:{{primary}};font-family:{{fontBody}};font-weight:500;cursor:pointer;text-decoration:none}
@media(max-width:768px){.rn{padding:20px 20px}}
</style>
<nav class="rn"><div class="rn-inner">
<div class="rn-logo"><span></span><span></span><span></span><span></span></div>
<a href="#" class="rn-menu">{{menuText}}</a>
</div></nav>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE HERO — Split-text diagonal reading, full-viewport
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateHero: ComponentDefinition = {
  id: "realestate-hero",
  category: "hero",
  name: "Real Estate Hero",
  description: "Full-viewport hero with split title top-left/bottom-right and centered CTA",
  source: "custom",
  slots: {
    heroImage: { type: "image", label: "Background Image", required: true },
    titleTop: { type: "text", label: "Title Top", required: true },
    titleBottom: { type: "text", label: "Title Bottom", required: true },
    description: { type: "longtext", label: "Description", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
  },
  defaultContent: {
    heroImage: "/images/realestate-hero-bg.png",
    titleTop: "Find Your",
    titleBottom: "Next Home",
    description: "Search through our collection of properties in Iceland, Switzerland and Ireland",
    ctaText: "Explore All",
  },
  html: `<style>
html,body{margin:0;padding:0}
.rh{position:relative;width:100%;height:100vh;overflow:hidden;background:#0a1628}
.rh-bg{position:absolute;inset:0}
.rh-bg img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;object-position:center 85%;display:block}
.rh-overlay{display:none}
.rh-content{position:relative;z-index:10;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:72px 40px 32px}
.rh-top{}
.rh-title-top{font-size:clamp(52px,6.5vw,88px);font-weight:700;color:#fff;font-family:{{fontHeading}};line-height:1;margin:0;letter-spacing:-1px}
.rh-center{display:flex;flex-direction:column;align-items:center;gap:20px;padding:0 20px}
.rh-desc{text-align:center;font-size:15px;color:rgba(255,255,255,0.6);max-width:380px;line-height:1.7;font-family:{{fontBody}};margin:0;font-weight:400}
.rh-btn{display:inline-flex;align-items:center;gap:10px;background:#fff;color:#111;padding:14px 30px;border-radius:12px;text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:500;border:none;cursor:pointer}
.rh-btn-plus{font-size:12px;color:#999}
.rh-bottom{text-align:right}
.rh-title-bot{font-size:clamp(90px,15vw,220px);font-weight:700;color:#fff;font-family:{{fontHeading}};line-height:0.82;margin:0;letter-spacing:-5px}
@media(max-width:768px){.rh{height:auto;min-height:100vh;display:flex;flex-direction:column}.rh-content{padding:64px 20px 24px;flex:1}.rh-title-top{font-size:42px}.rh-title-bot{font-size:56px}.rh-desc{font-size:13px;max-width:280px}}
</style>
<section class="rh">
<div class="rh-bg"><img src="{{heroImage}}" alt=""/></div>
<div class="rh-overlay"></div>
<div class="rh-content">
<div class="rh-top"><h1 class="rh-title-top">{{titleTop}}</h1></div>
<div class="rh-center">
<p class="rh-desc">{{description}}</p>
<a href="#" class="rh-btn"><span class="rh-btn-plus">+</span> {{ctaText}}</a>
</div>
<div class="rh-bottom"><h1 class="rh-title-bot">{{titleBottom}}</h1></div>
</div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE LISTINGS — Featured properties with location filter tabs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateListings: ComponentDefinition = {
  id: "realestate-listings",
  category: "gallery",
  name: "Real Estate Listings",
  description: "Property cards with location filter tabs and pricing",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: true },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    ctaText: { type: "text", label: "CTA Text", required: false },
    filterLabel: { type: "text", label: "Filter Label", required: false },
    locations: { type: "list", label: "Location Tabs", required: true },
    properties: { type: "list", label: "Properties", required: true },
  },
  defaultContent: {
    label: "Featured Properties",
    title: "Explore Our Top Listings",
    subtitle: "Our featured properties page showcases a curated selection of the finest homes for sale in Ireland, Switzerland and Iceland",
    ctaText: "Explore All",
    filterLabel: "Choose Your Location",
    locations: ["Iceland", "Switzerland", "Ireland"],
    properties: [
      { image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", name: "Modern City Loft", location: "Dublin", specs: "2 Beds \u00B7 2 Baths \u00B7 1,200 m\u00B2", type: "Rent", price: "$10,000" },
      { image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop", name: "Old Studio", location: "Zurich, Kreis 5", specs: "2 Beds \u00B7 2 Baths \u00B7 1,100 m\u00B2", type: "Sale", price: "$720,000" },
    ],
  },
  html: `<style>
.rl{padding:100px 48px;background:#fff}
.rl-inner{max-width:1200px;margin:0 auto}
.rl-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px}
.rl-header-left{max-width:720px}
.rl-label{font-size:13px;color:{{primary}};font-family:{{fontBody}};font-weight:500;margin-bottom:20px}
.rl-label::before{content:'\u2726 ';font-size:10px}
.rl-title{font-size:clamp(36px,4vw,50px);font-weight:700;color:#111;font-family:{{fontHeading}};line-height:1.1;margin:0 0 18px}
.rl-subtitle{font-size:15px;color:#666;line-height:1.75;font-family:{{fontBody}};max-width:560px;margin:0}
.rl-explore{display:inline-flex;align-items:center;gap:10px;background:#111;color:#fff;padding:16px 28px;border-radius:12px;text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:500;white-space:nowrap;border:none;cursor:pointer;margin-top:8px}
.rl-explore::before{content:'+';font-size:13px;color:rgba(255,255,255,0.4)}
.rl-filter{display:flex;align-items:center;gap:20px;margin-bottom:36px;flex-wrap:wrap}
.rl-filter-label{font-size:13px;color:#111;font-family:{{fontBody}};font-weight:600}
.rl-filter-label::before{content:'\u2726 ';font-size:10px;color:{{primary}}}
.rl-tabs{display:flex;gap:0}
.rl-tab{padding:20px 56px;font-size:14px;font-family:{{fontBody}};font-weight:500;border:1px solid #e0e0e0;cursor:pointer;text-align:center;position:relative;background:#fff;color:#555}
.rl-tab:first-child{background:#111;color:#fff;border-color:#111}
.rl-tab::before{content:'+';position:absolute;top:8px;left:50%;transform:translateX(-50%);font-size:10px;color:rgba(0,0,0,0.25)}
.rl-tab:first-child::before{content:'\u00D7';color:rgba(255,255,255,0.5)}
.rl-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.rl-card{cursor:pointer}
.rl-card-img{width:100%;height:420px;overflow:hidden;border-radius:4px}
.rl-card-img img{width:100%;height:100%;object-fit:cover;display:block}
.rl-card-info{display:flex;justify-content:space-between;align-items:flex-end;padding:16px 16px 14px;border-radius:8px;transition:background .3s,color .3s}
.rl-card-left{}
.rl-card-name{font-size:22px;font-weight:600;color:#111;font-family:{{fontHeading}};margin:0;display:inline;transition:color .3s}
.rl-card-loc{font-size:13px;font-weight:400;color:#999;font-family:{{fontBody}};margin-left:10px;transition:color .3s}
.rl-card-specs{font-size:13px;color:#888;font-family:{{fontBody}};margin-top:6px;transition:color .3s}
.rl-card-right{text-align:right}
.rl-card-type{font-size:12px;color:#999;font-family:{{fontBody}};display:block;margin-bottom:2px;transition:color .3s}
.rl-card-price{font-size:22px;font-weight:700;color:#111;font-family:{{fontBody}};transition:color .3s}
.rl-card:hover .rl-card-info{background:#111;border-radius:8px}
.rl-card:hover .rl-card-name,.rl-card:hover .rl-card-price{color:#fff}
.rl-card:hover .rl-card-loc,.rl-card:hover .rl-card-specs,.rl-card:hover .rl-card-type{color:rgba(255,255,255,0.5)}
@media(max-width:768px){.rl{padding:60px 20px}.rl-grid{grid-template-columns:1fr}.rl-header{flex-direction:column;gap:16px}.rl-tab{padding:16px 28px;font-size:13px}.rl-card-img{height:280px}}
</style>
<section class="rl"><div class="rl-inner">
<div class="rl-header">
<div class="rl-header-left">
<div class="rl-label">{{label}}</div>
<h2 class="rl-title">{{title}}</h2>
<p class="rl-subtitle">{{subtitle}}</p>
</div>
<a href="#" class="rl-explore">{{ctaText}}</a>
</div>
<div class="rl-filter">
<span class="rl-filter-label">{{filterLabel}}</span>
<div class="rl-tabs">{{#locations}}<div class="rl-tab">{{.}}</div>{{/locations}}</div>
</div>
<div class="rl-grid">
{{#properties}}
<div class="rl-card">
<div class="rl-card-img"><img src="{{image}}" alt=""/></div>
<div class="rl-card-info">
<div class="rl-card-left">
<span class="rl-card-name">{{name}}</span><span class="rl-card-loc">{{location}}</span>
<div class="rl-card-specs">{{specs}}</div>
</div>
<div class="rl-card-right">
<span class="rl-card-type">{{type}}</span>
<span class="rl-card-price">{{price}}</span>
</div>
</div>
</div>
{{/properties}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE SERVICES — Service tabs with content area + images
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateServices: ComponentDefinition = {
  id: "realestate-services",
  category: "features",
  name: "Real Estate Services",
  description: "Service tabs with detailed content, bullet points, and property images",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: true },
    title: { type: "text", label: "Title", required: true },
    description: { type: "longtext", label: "Description", required: true },
    filterLabel: { type: "text", label: "Filter Label", required: false },
    services: { type: "list", label: "Service Tabs", required: true },
    contentTitle: { type: "text", label: "Content Title", required: true },
    contentDesc: { type: "longtext", label: "Content Description", required: true },
    subTitle: { type: "text", label: "Sub Title", required: false },
    bullets: { type: "list", label: "Bullet Points", required: true },
    ctaLabel: { type: "text", label: "CTA Card Label", required: false },
    ctaText: { type: "text", label: "CTA Button Text", required: false },
    image1: { type: "image", label: "Image 1", required: true },
    image2: { type: "image", label: "Image 2", required: true },
    thumbImage: { type: "image", label: "Thumbnail Image", required: false },
  },
  defaultContent: {
    label: "Our Services",
    title: "We Help You Buy, Sell, Rent, and Manage Properties With Ease.",
    description: "What makes us different? We offer personalized real estate services with a client-first approach. Our local market expertise ensures a seamless experience and outstanding results.",
    filterLabel: "Choose Your Service",
    services: ["Buy", "Sell", "Rent", "Manage"],
    contentTitle: "Find Your Perfect Home",
    contentDesc: "We guide you through every step of finding and buying your dream property, ensuring a smooth and confident process from your first search to the final closing.",
    subTitle: "What makes us Expectational",
    bullets: ["We find properties that match your needs.", "We provide expert guidance through the process.", "We handle all negotiations for you.", "We assist with all paperwork and closing."],
    ctaLabel: "Find Your Next Home",
    ctaText: "Explore Properties",
    image1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop",
    image2: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=500&fit=crop",
    thumbImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=150&fit=crop",
  },
  html: `<style>
.rs{padding:100px 48px;background:#f8f8f8}
.rs-inner{max-width:1200px;margin:0 auto}
.rs-header{margin-bottom:48px}
.rs-label{font-size:13px;color:{{primary}};font-family:{{fontBody}};font-weight:500;margin-bottom:20px}
.rs-label::before{content:'\u2726 ';font-size:10px}
.rs-title{font-size:clamp(34px,3.8vw,46px);font-weight:700;color:#111;font-family:{{fontHeading}};line-height:1.18;margin:0 0 24px;max-width:650px;margin-left:auto}
.rs-desc{font-size:15px;color:#555;line-height:1.75;font-family:{{fontBody}};max-width:580px;margin:0;margin-left:auto;font-style:italic}
.rs-filter{display:flex;align-items:center;gap:20px;margin-bottom:48px;flex-wrap:wrap}
.rs-filter-label{font-size:13px;color:#111;font-family:{{fontBody}};font-weight:600}
.rs-filter-label::before{content:'\u2726 ';font-size:10px;color:{{primary}}}
.rs-tabs{display:grid;grid-template-columns:repeat(3,1fr);max-width:680px}
.rs-tab{padding:20px 32px;font-size:14px;font-family:{{fontBody}};font-weight:500;border:1px solid #ddd;cursor:pointer;text-align:center;position:relative;background:#fff;color:#555}
.rs-tab:first-child{background:#111;color:#fff;border-color:#111}
.rs-tab::before{content:'+';position:absolute;top:8px;left:50%;transform:translateX(-50%);font-size:10px;color:rgba(0,0,0,0.25)}
.rs-tab:first-child::before{content:'\u00D7';color:rgba(255,255,255,0.5)}
.rs-content{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.rs-content-title{font-size:clamp(28px,3vw,36px);font-weight:700;color:#111;font-family:{{fontHeading}};line-height:1.2;margin:0 0 18px}
.rs-content-desc{font-size:14px;color:#555;line-height:1.8;font-family:{{fontBody}};margin:0 0 32px}
.rs-sub{font-size:20px;color:#bbb;font-family:{{fontHeading}};font-weight:400;margin:0 0 18px;font-style:italic}
.rs-bullets{list-style:none;padding:0;margin:0 0 36px}
.rs-bullets li{font-size:14px;color:#444;font-family:{{fontBody}};padding:5px 0;display:flex;align-items:center;gap:10px}
.rs-bullets li::before{content:'\u2726';font-size:8px;color:{{primary}}}
.rs-cta-card{display:flex;align-items:center;gap:16px;margin-top:12px}
.rs-cta-thumb{width:80px;height:60px;border-radius:8px;overflow:hidden;flex-shrink:0}
.rs-cta-thumb img{width:100%;height:100%;object-fit:cover}
.rs-cta-text{font-size:14px;font-weight:700;color:#111;font-family:{{fontBody}};margin:0 0 8px}
.rs-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#111;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:12px;font-family:{{fontBody}};font-weight:600}
.rs-cta-btn::before{content:'+';font-size:11px;color:rgba(255,255,255,0.4)}
.rs-images{display:grid;grid-template-columns:1.4fr 1fr;gap:12px}
.rs-img{border-radius:10px;overflow:hidden;height:380px}
.rs-img img{width:100%;height:100%;object-fit:cover;display:block}
@media(max-width:768px){.rs{padding:60px 20px}.rs-content{grid-template-columns:1fr}.rs-title,.rs-desc{margin-left:0;max-width:100%}.rs-tabs{grid-template-columns:1fr 1fr;max-width:100%}.rs-images{grid-template-columns:1fr 1fr}.rs-img{height:220px}}
</style>
<section class="rs"><div class="rs-inner">
<div class="rs-header">
<div class="rs-label">{{label}}</div>
<h2 class="rs-title">{{title}}</h2>
<p class="rs-desc">{{description}}</p>
</div>
<div class="rs-filter">
<span class="rs-filter-label">{{filterLabel}}</span>
<div class="rs-tabs">{{#services}}<div class="rs-tab">{{.}}</div>{{/services}}</div>
</div>
<div class="rs-content">
<div class="rs-left">
<h3 class="rs-content-title">{{contentTitle}}</h3>
<p class="rs-content-desc">{{contentDesc}}</p>
<div class="rs-sub">{{subTitle}}</div>
<ul class="rs-bullets">{{#bullets}}<li>{{.}}</li>{{/bullets}}</ul>
<div class="rs-cta-card">
<div class="rs-cta-thumb"><img src="{{thumbImage}}" alt=""/></div>
<div><p class="rs-cta-text">{{ctaLabel}}</p><a href="#" class="rs-cta-btn">{{ctaText}}</a></div>
</div>
</div>
<div class="rs-images">
<div class="rs-img"><img src="{{image1}}" alt=""/></div>
<div class="rs-img"><img src="{{image2}}" alt=""/></div>
</div>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE TEAM — Split white/dark layout with expert cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateTeam: ComponentDefinition = {
  id: "realestate-team",
  category: "team",
  name: "Real Estate Team",
  description: "Split white/dark layout with contact info and team member photo cards",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: true },
    title: { type: "text", label: "Title", required: true },
    phone: { type: "text", label: "Phone", required: true },
    email: { type: "text", label: "Email", required: true },
    address: { type: "text", label: "Address", required: true },
    contactBtn: { type: "text", label: "Contact Button", required: false },
    description: { type: "longtext", label: "Description", required: true },
    tagline: { type: "text", label: "Tagline", required: false },
    brand: { type: "text", label: "Brand Name", required: true },
    brandTag: { type: "text", label: "Brand Tagline", required: false },
    members: { type: "list", label: "Team Members", required: true },
  },
  defaultContent: {
    label: "Our Team",
    title: "Our Team of Experts",
    phone: "+323 323 3232",
    email: "hello@dwello.com",
    address: "123 Main Street @Capital City,",
    contactBtn: "Contact us",
    description: "We are a passionate team of experts dedicated to your real estate success.",
    tagline: "Real Estate made easy",
    brand: "Dwello",
    brandTag: "Real Estate made easy.",
    members: [
      { image: "/images/team-member-1.jpg", name: "Mark", role: "Real Estate Agent" },
      { image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop", name: "Zack", role: "Real Estate Advisor" },
      { image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop", name: "Idris", role: "Property Consultant" },
    ],
  },
  html: `<style>
.rt-top{padding:100px 48px 60px;background:#fff}
.rt-inner{max-width:1200px;margin:0 auto}
.rt-label{font-size:13px;color:{{primary}};font-family:{{fontBody}};font-weight:500;margin-bottom:20px}
.rt-label::before{content:'\u2726 ';font-size:10px}
.rt-title{font-size:clamp(36px,4vw,48px);font-weight:700;color:#111;font-family:{{fontHeading}};line-height:1.1;margin:0 0 40px;max-width:550px;margin-left:auto}
.rt-grid{display:grid;grid-template-columns:260px 1fr;gap:80px;margin-bottom:48px}
.rt-contact-group{margin-bottom:18px}
.rt-contact-lbl{font-size:11px;color:{{primary}};font-family:{{fontBody}};font-weight:500;margin-bottom:4px;display:block}
.rt-contact-val{font-size:15px;color:#111;font-family:{{fontBody}};font-weight:600}
.rt-contact-btn{display:inline-flex;align-items:center;gap:8px;background:#111;color:#fff;padding:14px 24px;border-radius:8px;text-decoration:none;font-size:13px;font-family:{{fontBody}};font-weight:600;margin-top:16px;border:none;cursor:pointer}
.rt-contact-btn::before{content:'+';font-size:12px;color:rgba(255,255,255,0.4)}
.rt-right-desc{font-size:17px;color:#111;font-family:{{fontBody}};font-weight:500;line-height:1.65;margin:0 0 20px}
.rt-right-tag{font-size:22px;color:{{primary}};font-family:{{fontHeading}};font-weight:400;font-style:italic;margin:0}
.rt-brand{display:flex;flex-direction:column;gap:2px}
.rt-brand-name{font-size:34px;font-weight:700;color:#111;font-family:{{fontHeading}};margin:0}
.rt-brand-tag{font-size:13px;color:#888;font-family:{{fontBody}}}
.rt-dark{background:#111;padding:48px 48px 80px}
.rt-diamond{text-align:center;margin-bottom:28px;font-size:20px;color:rgba(255,255,255,0.15)}
.rt-members{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:1200px;margin:0 auto}
.rt-member{position:relative;height:480px;border-radius:14px;overflow:hidden;background:#1a1a1a}
.rt-member img{width:100%;height:100%;object-fit:cover;display:block}
.rt-member-ov{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.85) 100%)}
.rt-member-plus{position:absolute;top:16px;right:16px;font-size:18px;color:rgba(255,255,255,0.5)}
.rt-member-info{position:absolute;bottom:24px;left:24px}
.rt-member-name{font-size:24px;font-weight:600;color:#fff;font-family:{{fontHeading}};margin:0}
.rt-member-role{font-size:13px;color:rgba(255,255,255,0.55);font-family:{{fontBody}};margin-top:4px}
@media(max-width:768px){.rt-top{padding:60px 20px 40px}.rt-dark{padding:32px 20px 60px}.rt-grid{grid-template-columns:1fr;gap:28px}.rt-title{margin-left:0}.rt-members{grid-template-columns:1fr}.rt-member{height:360px}}
</style>
<section>
<div class="rt-top"><div class="rt-inner">
<div class="rt-label">{{label}}</div>
<h2 class="rt-title">{{title}}</h2>
<div class="rt-grid">
<div class="rt-left">
<div class="rt-contact-group"><span class="rt-contact-lbl">Phone</span><div class="rt-contact-val">{{phone}}</div></div>
<div class="rt-contact-group"><span class="rt-contact-lbl">Email</span><div class="rt-contact-val">{{email}}</div></div>
<div class="rt-contact-group"><span class="rt-contact-lbl">Address</span><div class="rt-contact-val">{{address}}</div></div>
<a href="#" class="rt-contact-btn">{{contactBtn}}</a>
</div>
<div class="rt-right">
<p class="rt-right-desc">{{description}}</p>
<div class="rt-right-tag">{{tagline}}</div>
</div>
</div>
<div class="rt-brand"><span class="rt-brand-name">{{brand}}</span><span class="rt-brand-tag">{{brandTag}}</span></div>
</div></div>
<div class="rt-dark">
<div class="rt-diamond">\u2726\u2726</div>
<div class="rt-members">
{{#members}}
<div class="rt-member">
<img src="{{image}}" alt="{{name}}"/>
<div class="rt-member-ov"></div>
<span class="rt-member-plus">+</span>
<div class="rt-member-info"><div class="rt-member-name">{{name}}</div><div class="rt-member-role">{{role}}</div></div>
</div>
{{/members}}
</div>
</div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE ABOUT — Dark bento grid with stats + images
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateAbout: ComponentDefinition = {
  id: "realestate-about",
  category: "about",
  name: "Real Estate About",
  description: "Dark bento grid with stat cards and property images",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: true },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    btnText: { type: "text", label: "Button Text", required: false },
    stat1Num: { type: "text", label: "Stat 1 Number", required: true },
    stat1Desc: { type: "text", label: "Stat 1 Description", required: true },
    stat2Num: { type: "text", label: "Stat 2 Number", required: true },
    stat2Desc: { type: "text", label: "Stat 2 Description", required: true },
    stat3Num: { type: "text", label: "Stat 3 Number", required: true },
    stat3Desc: { type: "text", label: "Stat 3 Description", required: true },
    stat4Num: { type: "text", label: "Stat 4 Number", required: true },
    stat4Desc: { type: "text", label: "Stat 4 Description", required: true },
    stat5Num: { type: "text", label: "Stat 5 Number", required: true },
    stat5Desc: { type: "text", label: "Stat 5 Description", required: true },
    stat6Num: { type: "text", label: "Stat 6 Number", required: true },
    stat6Desc: { type: "text", label: "Stat 6 Description", required: true },
    aboutImage1: { type: "image", label: "Large Image", required: true },
    statBg2: { type: "image", label: "Stat 2 Background", required: true },
    statBg3: { type: "image", label: "Stat 3 Background", required: true },
    statBg5: { type: "image", label: "Stat 5 Background", required: true },
    statBg6: { type: "image", label: "Stat 6 Background", required: true },
  },
  defaultContent: {
    label: "About us",
    title: "Our Proven Track Record of Success in Helping You Achieve Your Goals.",
    subtitle: "We believe that a company\u2019s success is best measured by its results. Our achievements are a direct reflection of our dedication to our clients and their real estate goals.",
    btnText: "About us",
    stat1Num: "150",
    stat1Desc: "Properties Sold",
    stat2Num: "100M",
    stat2Desc: "In Property Value Sold",
    stat3Num: "150k",
    stat3Desc: "Online Property Views",
    stat4Num: "130",
    stat4Desc: "Properties Rented",
    stat5Num: "20",
    stat5Desc: "Years of Experience",
    stat6Num: "100.",
    stat6Desc: "Satisfied Clients",
    aboutImage1: "/images/images-about-us/about-4.jpg",
    statBg2: "/images/images-about-us/about-3.jpg",
    statBg3: "/images/images-about-us/about-7.jpg",
    statBg5: "/images/images-about-us/about-2.jpg",
    statBg6: "/images/images-about-us/about-1.jpg",
  },
  html: `<style>
.ra{padding:100px 48px;background:#1a1a1a}
.ra-inner{max-width:1200px;margin:0 auto}
.ra-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px}
.ra-header-left{max-width:680px}
.ra-label{font-size:13px;color:{{primary}};font-family:{{fontBody}};font-weight:500;margin-bottom:20px}
.ra-label::before{content:'\u2726 ';font-size:10px}
.ra-title{font-size:clamp(34px,3.8vw,46px);font-weight:700;color:#fff;font-family:{{fontHeading}};line-height:1.18;margin:0 0 20px}
.ra-subtitle{font-size:15px;color:rgba(255,255,255,0.45);line-height:1.75;font-family:{{fontBody}};max-width:520px;margin:0;font-style:italic}
.ra-btn{display:inline-flex;align-items:center;gap:10px;background:transparent;color:#fff;padding:14px 24px;border-radius:10px;text-decoration:none;font-size:13px;font-family:{{fontBody}};font-weight:500;border:1px solid rgba(255,255,255,0.25);cursor:pointer;white-space:nowrap;margin-top:8px}
.ra-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:220px 220px 240px;gap:8px}
.ra-stat{border-radius:12px;padding:24px 22px;display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden;background-size:cover;background-position:center}
.ra-stat::before{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.1) 100%);z-index:0}
.ra-no-bg{background:#3a3a3a}
.ra-no-bg::before{display:none}
.ra-stat>*{position:relative;z-index:1}
.ra-stat-x{position:absolute;top:16px;left:18px;font-size:15px;color:rgba(255,255,255,0.5);font-weight:300}
.ra-stat-num{font-size:clamp(36px,3.5vw,54px);font-weight:700;color:#fff;font-family:{{fontHeading}};line-height:1;margin:0}
.ra-stat-num .ra-plus{font-size:0.5em;font-weight:400;vertical-align:super;margin-left:1px}
.ra-stat-desc{font-size:13px;color:rgba(255,255,255,0.7);font-family:{{fontBody}};font-weight:500;margin-top:4px}
.ra-img{border-radius:12px;overflow:hidden;position:relative}
.ra-img img{width:100%;height:100%;object-fit:cover;display:block}
.ra-img-diamond{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:rgba(255,255,255,0.35);font-size:36px;display:flex;gap:4px}
.ra-s1{grid-column:1;grid-row:1}
.ra-s2{grid-column:2;grid-row:1}
.ra-i1{grid-column:3/5;grid-row:1/3}
.ra-s3{grid-column:1;grid-row:2}
.ra-s4{grid-column:2;grid-row:2}
.ra-s5{grid-column:1/3;grid-row:3}
.ra-s5 .ra-stat-num,.ra-s5 .ra-stat-desc,.ra-s5 .ra-stat-x{text-align:center}
.ra-s5{align-items:center}
.ra-s6{grid-column:3/5;grid-row:3}
.ra-s6{align-items:center}
.ra-s6 .ra-stat-num,.ra-s6 .ra-stat-desc{text-align:center}
.ra-s6-stars{display:flex;align-items:center;justify-content:center;gap:2px;margin-top:6px}
.ra-s6-stars span{color:{{primary}};font-size:14px;letter-spacing:2px}
.ra-s6-avatars{display:flex;align-items:center;justify-content:center;margin-top:4px;gap:0}
.ra-s6-avatars span{width:28px;height:28px;border-radius:50%;border:2px solid #1a1a1a;display:inline-block;margin-left:-8px;background:#555}
.ra-s6-avatars span:first-child{margin-left:0}
@media(max-width:768px){.ra{padding:60px 20px}.ra-header{flex-direction:column;gap:16px}.ra-grid{grid-template-columns:1fr 1fr;grid-template-rows:200px 200px 240px 200px;gap:8px}.ra-s1{grid-column:1;grid-row:1}.ra-s2{grid-column:2;grid-row:1}.ra-s3{grid-column:1;grid-row:2}.ra-s4{grid-column:2;grid-row:2}.ra-i1{grid-column:1/3;grid-row:3;height:240px}.ra-s5{grid-column:1/3;grid-row:4}.ra-s6{grid-column:1/3;grid-row:5}}
</style>
<section class="ra"><div class="ra-inner">
<div class="ra-header">
<div class="ra-header-left">
<div class="ra-label">{{label}}</div>
<h2 class="ra-title">{{title}}</h2>
<p class="ra-subtitle">{{subtitle}}</p>
</div>
<a href="#" class="ra-btn">{{btnText}}</a>
</div>
<div class="ra-grid">
<div class="ra-stat ra-s1 ra-no-bg"><span class="ra-stat-x">\u00D7</span><div class="ra-stat-num">{{stat1Num}}<span class="ra-plus">+</span></div><div class="ra-stat-desc">{{stat1Desc}}</div></div>
<div class="ra-stat ra-s2" style="background-image:url('{{statBg2}}')"><span class="ra-stat-x">\u00D7</span><div class="ra-stat-num">{{stat2Num}}<span class="ra-plus">+</span></div><div class="ra-stat-desc">{{stat2Desc}}</div></div>
<div class="ra-img ra-i1"><img src="{{aboutImage1}}" alt=""/><span class="ra-img-diamond">\u2B26\u2B26</span></div>
<div class="ra-stat ra-s3" style="background-image:url('{{statBg3}}')"><span class="ra-stat-x">\u00D7</span><div class="ra-stat-num">{{stat3Num}}<span class="ra-plus">+</span></div><div class="ra-stat-desc">{{stat3Desc}}</div></div>
<div class="ra-stat ra-s4 ra-no-bg"><span class="ra-stat-x">\u00D7</span><div class="ra-stat-num">{{stat4Num}}<span class="ra-plus">+</span></div><div class="ra-stat-desc">{{stat4Desc}}</div></div>
<div class="ra-stat ra-s5" style="background-image:url('{{statBg5}}')"><span class="ra-stat-x">\u00D7</span><div class="ra-stat-num">{{stat5Num}}<span class="ra-plus">+</span></div><div class="ra-stat-desc">{{stat5Desc}}</div></div>
<div class="ra-stat ra-s6" style="background-image:url('{{statBg6}}')"><span class="ra-stat-x">\u00D7</span><div class="ra-stat-num">{{stat6Num}}<span class="ra-plus">+</span></div><div class="ra-s6-stars"><span>\u2605\u2605\u2605\u2605\u2605</span></div><div class="ra-s6-avatars"><span></span><span></span><span></span><span></span><span></span></div><div class="ra-stat-desc">{{stat6Desc}}</div></div>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE REVIEWS — Staggered testimonial grid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateReviews: ComponentDefinition = {
  id: "realestate-reviews",
  category: "testimonials",
  name: "Real Estate Reviews",
  description: "Staggered 2x2 testimonial grid with property images and star ratings",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: true },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    btnText: { type: "text", label: "Button Text", required: false },
    reviews: { type: "list", label: "Reviews", required: true },
  },
  defaultContent: {
    label: "Reviews",
    title: "Discover Why We Are The Top-Rated Real Estate Service in The Area.",
    subtitle: "We are proud to share the experiences of our clients. Read their stories to learn more about our service and how we can help you.",
    btnText: "Read All",
    reviews: [
      { quote: "I will definitely recommend Dwello to anyone looking to sell. Their dedication and hard work were truly outstanding.", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop", stars: "\u2605\u2605\u2605\u2605\u2605", initial: "I", name: "Idris", role: "Entrepreneur" },
      { quote: "Selling my home was effortless with Dwello. Their professional guidance and deep market knowledge made all the difference.", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&h=300&fit=crop", stars: "\u2605\u2605\u2605\u2605", initial: "L", name: "Leo", role: "Seller" },
      { quote: "Thanks to the Dwello team, I found the perfect home. Their commitment and expertise were evident in every interaction.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop", stars: "\u2605\u2605\u2605\u2605\u2605", initial: "J", name: "John", role: "Buyer" },
      { quote: "Dwello made buying my first home a wonderful journey. They were patient, knowledgeable, and guided me with confidence every step of the way.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop", stars: "\u2605\u2605\u2605\u2605", initial: "M", name: "Maria", role: "Investor" },
    ],
  },
  html: `<style>
.rr{padding:100px 48px;background:#fff}
.rr-inner{max-width:1200px;margin:0 auto}
.rr-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px}
.rr-header-left{max-width:620px}
.rr-label{font-size:13px;color:{{primary}};font-family:{{fontBody}};font-weight:500;margin-bottom:20px}
.rr-label::before{content:'\u2726 ';font-size:10px}
.rr-title{font-size:clamp(34px,3.8vw,46px);font-weight:700;color:#111;font-family:{{fontHeading}};line-height:1.18;margin:0 0 20px}
.rr-subtitle{font-size:15px;color:#555;line-height:1.75;font-family:{{fontBody}};font-style:italic;margin:0}
.rr-btn{display:inline-flex;align-items:center;gap:8px;background:#111;color:#fff;padding:14px 24px;border-radius:10px;text-decoration:none;font-size:13px;font-family:{{fontBody}};font-weight:500;border:none;cursor:pointer;white-space:nowrap;margin-top:8px}
.rr-btn::before{content:'+';color:rgba(255,255,255,0.4)}
.rr-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px 56px}
.rr-item{display:flex;flex-direction:column;gap:20px}
.rr-item:nth-child(n+3) .rr-media{flex-direction:row-reverse}
.rr-quote{font-size:15px;color:#111;font-family:{{fontBody}};line-height:1.75;font-style:italic;margin:0}
.rr-media{display:flex;align-items:flex-end;gap:16px}
.rr-img{width:180px;height:148px;border-radius:18px;overflow:hidden;flex-shrink:0}
.rr-img img{width:100%;height:100%;object-fit:cover;display:block}
.rr-info{}
.rr-stars{color:{{primary}};font-size:14px;letter-spacing:2px;margin-bottom:10px}
.rr-author{display:flex;align-items:center;gap:8px}
.rr-avatar{width:28px;height:28px;border-radius:50%;background:#888;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:700;font-family:{{fontBody}};flex-shrink:0}
.rr-author-name{font-size:14px;font-weight:700;color:#111;font-family:{{fontBody}}}
.rr-author-role{font-size:12px;color:#999;font-family:{{fontBody}}}
@media(max-width:768px){.rr{padding:60px 20px}.rr-grid{grid-template-columns:1fr;gap:36px}.rr-header{flex-direction:column;gap:16px}.rr-img{width:140px;height:120px}}
</style>
<section class="rr"><div class="rr-inner">
<div class="rr-header">
<div class="rr-header-left">
<div class="rr-label">{{label}}</div>
<h2 class="rr-title">{{title}}</h2>
<p class="rr-subtitle">{{subtitle}}</p>
</div>
<a href="#" class="rr-btn">{{btnText}}</a>
</div>
<div class="rr-grid">
{{#reviews}}
<div class="rr-item">
<p class="rr-quote">\u201C{{quote}}\u201D</p>
<div class="rr-media">
<div class="rr-img"><img src="{{image}}" alt=""/></div>
<div class="rr-info">
<div class="rr-stars">{{stars}}</div>
<div class="rr-author">
<div class="rr-avatar">{{initial}}</div>
<div><div class="rr-author-name">{{name}}</div><div class="rr-author-role">{{role}}</div></div>
</div>
</div>
</div>
</div>
{{/reviews}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE CONTACT — Dark form + numbered feature cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateContact: ComponentDefinition = {
  id: "realestate-contact",
  category: "contact",
  name: "Real Estate Contact",
  description: "Dark contact form with numbered feature cards and images",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: true },
    title: { type: "text", label: "Title", required: true },
    description: { type: "longtext", label: "Description", required: true },
    cards: { type: "list", label: "Feature Cards", required: true },
  },
  defaultContent: {
    label: "Contact us",
    title: "Ready to Start Your Journey?",
    description: "Ready to start your real estate journey? Our team is here to help you every step of the way. Contact us today to schedule a consultation and take the first step toward achieving your goals",
    cards: [
      { num: "01", title: "Fast Reply", desc: "Skip the wait. Get fast, reliable answers to all your property questions.", image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=300&fit=crop" },
      { num: "02", title: "Effortless Contact", desc: "Get in touch easily and get a quick, expert answer to your real estate questions.", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop" },
    ],
  },
  html: `<style>
.rc{padding:100px 48px;background:#111}
.rc-inner{max-width:1200px;margin:0 auto}
.rc-label{font-size:13px;color:rgba(255,255,255,0.5);font-family:{{fontBody}};font-weight:500;margin-bottom:24px}
.rc-label::before{content:'\u2726 ';font-size:10px}
.rc-layout{display:grid;grid-template-columns:1fr 1fr;gap:80px}
.rc-title{font-size:clamp(32px,3.5vw,42px);font-weight:700;color:#fff;font-family:{{fontHeading}};line-height:1.18;margin:0 0 36px}
.rc-right-desc{font-size:14px;color:rgba(255,255,255,0.45);line-height:1.85;font-family:{{fontBody}};margin:0 0 40px}
.rc-form{display:flex;flex-direction:column;gap:28px}
.rc-field-lbl{font-size:11px;color:rgba(255,255,255,0.6);font-family:{{fontBody}};font-weight:500;margin-bottom:8px;display:block}
.rc-field input,.rc-field textarea,.rc-field select{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.15);color:#fff;font-size:14px;font-family:{{fontBody}};padding:10px 0;outline:none;resize:none;box-sizing:border-box}
.rc-field input::placeholder,.rc-field textarea::placeholder{color:rgba(255,255,255,0.25)}
.rc-field select{color:rgba(255,255,255,0.25);appearance:none;-webkit-appearance:none;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255,255,255,0.3)'/%3E%3C/svg%3E") no-repeat right center}
.rc-field select option{background:#222;color:#fff}
.rc-submit{width:100%;padding:16px;background:transparent;border:1px solid rgba(255,255,255,0.15);color:#fff;font-size:14px;font-family:{{fontBody}};font-weight:500;border-radius:8px;cursor:pointer;margin-top:8px}
.rc-cards{display:flex;flex-direction:column;gap:28px}
.rc-card{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start}
.rc-card:nth-child(even) .rc-card-text{order:2}
.rc-card:nth-child(even) .rc-card-img{order:1}
.rc-card-text{padding:4px 0}
.rc-card-plus{font-size:14px;color:rgba(255,255,255,0.25);margin-bottom:6px}
.rc-card-num{font-size:14px;color:rgba(255,255,255,0.6);font-family:{{fontBody}};font-weight:700;margin-bottom:10px}
.rc-card-img{height:200px;border-radius:14px;overflow:hidden}
.rc-card-img img{width:100%;height:100%;object-fit:cover;display:block}
.rc-card-title{font-size:17px;font-weight:700;color:#fff;font-family:{{fontBody}};margin:0 0 8px}
.rc-card-desc{font-size:13px;color:rgba(255,255,255,0.45);font-family:{{fontBody}};line-height:1.65;margin:0}
@media(max-width:768px){.rc{padding:60px 20px}.rc-layout{grid-template-columns:1fr;gap:48px}.rc-card{grid-template-columns:1fr}}
</style>
<section class="rc"><div class="rc-inner">
<div class="rc-label">{{label}}</div>
<div class="rc-layout">
<div class="rc-left">
<h2 class="rc-title">{{title}}</h2>
<form class="rc-form">
<div class="rc-field"><span class="rc-field-lbl">Your Name *</span><input type="text" placeholder="Enter Your First & Last name"/></div>
<div class="rc-field"><span class="rc-field-lbl">Email *</span><input type="email" placeholder="circle@email.com"/></div>
<div class="rc-field"><span class="rc-field-lbl">Select Your Location *</span><select><option>I want to live in ...</option><option>Iceland</option><option>Switzerland</option><option>Ireland</option></select></div>
<div class="rc-field"><span class="rc-field-lbl">Your Message *</span><textarea rows="3" placeholder="How can we help you?"></textarea></div>
<button type="button" class="rc-submit">Submit</button>
</form>
</div>
<div class="rc-right">
<p class="rc-right-desc">{{description}}</p>
<div class="rc-cards">
{{#cards}}
<div class="rc-card">
<div class="rc-card-text">
<div class="rc-card-plus">+</div>
<div class="rc-card-num">{{num}}</div>
<h4 class="rc-card-title">{{title}}</h4>
<p class="rc-card-desc">{{desc}}</p>
</div>
<div class="rc-card-img"><img src="{{image}}" alt=""/></div>
</div>
{{/cards}}
</div>
</div>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE FAQ — Accordion questions with CTA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateFaq: ComponentDefinition = {
  id: "realestate-faq",
  category: "faq",
  name: "Real Estate FAQ",
  description: "Accordion-style FAQ with expand icons and bottom CTA",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: true },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    questions: { type: "list", label: "Questions", required: true },
    bottomText: { type: "text", label: "Bottom Text", required: false },
    bottomBtn: { type: "text", label: "Bottom Button", required: false },
  },
  defaultContent: {
    label: "Frequently Asked Questions",
    title: "The Answers to Your Real Estate Questions.",
    subtitle: "We know you have questions. Our team has compiled a list of the most common inquiries to provide you with the answers you need to start your real estate journey with confidence.",
    questions: [
      { question: "What is my first step in the home buying process?" },
      { question: "How do I determine the right price for my home?" },
      { question: "Why should I hire a real estate agent?" },
      { question: "What are closing costs?" },
    ],
    bottomText: "Still Got a Question?",
    bottomBtn: "Feel Free to Contact us!",
  },
  html: `<style>
.rf{padding:100px 48px;background:#fff}
.rf-inner{max-width:1200px;margin:0 auto}
.rf-header{margin-bottom:48px}
.rf-label{font-size:13px;color:{{primary}};font-family:{{fontBody}};font-weight:500;margin-bottom:20px}
.rf-label::before{content:'\u2726 ';font-size:10px}
.rf-title{font-size:clamp(34px,3.8vw,46px);font-weight:700;color:#111;font-family:{{fontHeading}};line-height:1.18;margin:0 0 20px;max-width:600px;margin-left:auto}
.rf-subtitle{font-size:15px;color:#555;line-height:1.75;font-family:{{fontBody}};max-width:520px;font-style:italic;margin:0;margin-left:auto}
.rf-list{border-top:1px solid #e0e0e0;max-width:750px;margin:0 auto}
.rf-item{padding:24px 0;border-bottom:1px solid #e0e0e0;display:flex;justify-content:space-between;align-items:center;cursor:pointer}
.rf-question{font-size:16px;color:#111;font-family:{{fontBody}};font-weight:400}
.rf-icon{font-size:18px;color:#aaa;font-family:{{fontBody}};flex-shrink:0;margin-left:16px}
.rf-bottom{display:flex;flex-direction:column;gap:10px;margin-top:48px}
.rf-bottom-text{font-size:15px;font-weight:600;color:#111;font-family:{{fontBody}}}
.rf-bottom-btn{display:inline-flex;align-items:center;gap:8px;background:#111;color:#fff;padding:14px 24px;border-radius:8px;text-decoration:none;font-size:13px;font-family:{{fontBody}};font-weight:600;border:none;cursor:pointer;width:fit-content}
.rf-bottom-btn::before{content:'+';font-size:12px;color:rgba(255,255,255,0.4)}
@media(max-width:768px){.rf{padding:60px 20px}.rf-title,.rf-subtitle{margin-left:0;max-width:100%}}
</style>
<section class="rf"><div class="rf-inner">
<div class="rf-header">
<div class="rf-label">{{label}}</div>
<h2 class="rf-title">{{title}}</h2>
<p class="rf-subtitle">{{subtitle}}</p>
</div>
<div class="rf-list">
{{#questions}}
<div class="rf-item">
<span class="rf-question">{{question}}</span>
<span class="rf-icon">+</span>
</div>
{{/questions}}
</div>
<div class="rf-bottom">
<span class="rf-bottom-text">{{bottomText}}</span>
<a href="#" class="rf-bottom-btn">{{bottomBtn}}</a>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE BLOG — Blog cards row with staggered image heights
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateBlog: ComponentDefinition = {
  id: "realestate-blog",
  category: "blog",
  name: "Real Estate Blog",
  description: "4-column blog cards with staggered image heights and category labels",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: true },
    title: { type: "text", label: "Title", required: true },
    description: { type: "longtext", label: "Description", required: false },
    btnText: { type: "text", label: "Button Text", required: false },
    posts: { type: "list", label: "Blog Posts", required: true },
  },
  defaultContent: {
    label: "Blogs",
    title: "Real Estate Insights",
    description: "Get the latest market updates, expert tips, and helpful advice to guide your real estate journey.",
    btnText: "View All",
    posts: [
      { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop", category: "News", date: "Sep 21, 2025", postTitle: "Local Market Update" },
      { image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", category: "Guides", date: "Sep 21, 2025", postTitle: "Your Guide to Finding a Dream Home" },
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop", category: "News", date: "Jan 5, 2025", postTitle: "Current State of the Real Estate Market" },
      { image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop", category: "Tips", date: "Dec 1, 2025", postTitle: "Top Tips for Real Estate Success" },
    ],
  },
  html: `<style>
.rb{padding:80px 48px;background:#f5f5f5}
.rb-inner{max-width:1200px;margin:0 auto}
.rb-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:36px}
.rb-header-left{}
.rb-label{font-size:13px;color:{{primary}};font-family:{{fontBody}};font-weight:500;margin-bottom:14px}
.rb-label::before{content:'\u2726 ';font-size:10px}
.rb-title{font-size:clamp(30px,3.2vw,40px);font-weight:700;color:#111;font-family:{{fontHeading}};line-height:1.1;margin:0}
.rb-header-right{max-width:300px;text-align:right}
.rb-desc{font-size:14px;color:#777;line-height:1.7;font-family:{{fontBody}};margin:0 0 14px}
.rb-btn{display:inline-flex;align-items:center;gap:8px;background:#111;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-size:13px;font-family:{{fontBody}};font-weight:500;border:none;cursor:pointer}
.rb-btn::before{content:'+';color:rgba(255,255,255,0.4)}
.rb-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.rb-card{}
.rb-card-img{height:260px;border-radius:16px;overflow:hidden;margin-bottom:12px}
.rb-card:nth-child(2) .rb-card-img,.rb-card:nth-child(3) .rb-card-img,.rb-card:nth-child(4) .rb-card-img{height:210px}
.rb-card-img img{width:100%;height:100%;object-fit:cover;display:block}
.rb-card-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.rb-card-cat{font-size:12px;color:{{primary}};font-family:{{fontBody}};font-weight:500}
.rb-card-date{font-size:12px;color:#999;font-family:{{fontBody}}}
.rb-card-title{font-size:15px;font-weight:600;color:#111;font-family:{{fontBody}};line-height:1.4;margin:0}
@media(max-width:768px){.rb{padding:60px 20px}.rb-grid{grid-template-columns:1fr 1fr;gap:16px}.rb-header{flex-direction:column;align-items:flex-start;gap:14px}.rb-header-right{text-align:left;max-width:100%}.rb-card-img,.rb-card:nth-child(2) .rb-card-img,.rb-card:nth-child(3) .rb-card-img,.rb-card:nth-child(4) .rb-card-img{height:180px}}
</style>
<section class="rb"><div class="rb-inner">
<div class="rb-header">
<div class="rb-header-left">
<div class="rb-label">{{label}}</div>
<h2 class="rb-title">{{title}}</h2>
</div>
<div class="rb-header-right">
<p class="rb-desc">{{description}}</p>
<a href="#" class="rb-btn">{{btnText}}</a>
</div>
</div>
<div class="rb-grid">
{{#posts}}
<div class="rb-card">
<div class="rb-card-img"><img src="{{image}}" alt=""/></div>
<div class="rb-card-meta"><span class="rb-card-cat">{{category}}</span><span class="rb-card-date">{{date}}</span></div>
<h3 class="rb-card-title">{{postTitle}}</h3>
</div>
{{/posts}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REALESTATE FOOTER — Newsletter + 4-col links + giant watermark
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateFooter: ComponentDefinition = {
  id: "realestate-footer",
  category: "footer",
  name: "Real Estate Footer",
  description: "Dark footer with newsletter, 4-column links, giant brand watermark",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    tagline: { type: "text", label: "Tagline", required: false },
    email: { type: "text", label: "Email", required: true },
    phone: { type: "text", label: "Phone", required: true },
    address: { type: "text", label: "Address", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
  },
  defaultContent: {
    brand: "Dwello",
    tagline: "Real estate made easy",
    email: "hello@dwello.com",
    phone: "+323 323 3232",
    address: "123 Main Street @Capital City,",
    copyright: "\u00A9 2025 Dwello. All rights reserved.",
  },
  html: `<style>
.rft{background:#111;padding:48px 48px 0}
.rft-inner{max-width:1200px;margin:0 auto}
.rft-newsletter{display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,0.08)}
.rft-news-left{display:flex;align-items:flex-end;gap:20px;flex:1;max-width:520px}
.rft-news-wrap{flex:1}
.rft-news-label{font-size:12px;color:rgba(255,255,255,0.6);font-family:{{fontBody}};font-weight:500;margin-bottom:12px}
.rft-news-field-lbl{font-size:11px;color:rgba(255,255,255,0.6);font-family:{{fontBody}};margin-bottom:4px;display:block}
.rft-news-input{background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.3);color:#fff;font-size:14px;font-family:{{fontBody}};padding:8px 0;outline:none;width:100%}
.rft-subscribe{background:transparent;border:1px solid rgba(255,255,255,0.2);color:#fff;padding:10px 24px;border-radius:6px;font-size:13px;font-family:{{fontBody}};cursor:pointer;white-space:nowrap;flex-shrink:0}
.rft-news-tag{font-size:14px;color:rgba(255,255,255,0.35);font-family:{{fontBody}};font-style:italic}
.rft-links{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;padding:48px 0;border-bottom:none}
.rft-col-title{font-size:11px;color:rgba(255,255,255,0.3);font-family:{{fontBody}};margin-bottom:18px;text-transform:capitalize}
.rft-col a{display:block;font-size:16px;color:#fff;font-family:{{fontBody}};font-weight:600;text-decoration:none;padding:3px 0;line-height:1.7}
.rft-col span{display:block;font-size:15px;color:#fff;font-family:{{fontBody}};font-weight:600;padding:3px 0;line-height:1.7}
.rft-watermark{font-size:clamp(120px,22vw,300px);font-weight:900;color:#fff;font-family:{{fontHeading}};line-height:0.78;padding:16px 0 0;letter-spacing:-8px;overflow:hidden;margin:0 -48px}
.rft-bottom{display:flex;justify-content:center;align-items:center;padding:16px 0 24px;gap:24px}
.rft-copy{font-size:11px;color:rgba(255,255,255,0.3);font-family:{{fontBody}}}
.rft-copy a{color:rgba(255,255,255,0.3);text-decoration:underline}
.rft-legal{display:flex;gap:16px}
.rft-legal a{font-size:11px;color:rgba(255,255,255,0.3);text-decoration:underline;font-family:{{fontBody}}}
@media(max-width:768px){.rft{padding:32px 20px 0}.rft-newsletter{flex-direction:column;gap:16px;align-items:flex-start}.rft-news-left{flex-direction:column;align-items:flex-start;max-width:100%;width:100%}.rft-links{grid-template-columns:1fr 1fr;gap:24px}.rft-watermark{font-size:56px;letter-spacing:-3px;margin:0 -20px}.rft-bottom{flex-direction:column;gap:8px;text-align:center}}
</style>
<footer class="rft"><div class="rft-inner">
<div class="rft-newsletter">
<div class="rft-news-left">
<div class="rft-news-wrap">
<div class="rft-news-label">Newsletter *</div>
<span class="rft-news-field-lbl">Email *</span>
<input class="rft-news-input" type="email" placeholder="your@email.com"/>
</div>
<button class="rft-subscribe">Subscribe</button>
</div>
<div class="rft-news-tag">{{tagline}}</div>
</div>
<div class="rft-links">
<div class="rft-col"><div class="rft-col-title">Navigation</div><a href="#">Home</a><a href="#">About us</a><a href="#">Properties</a><a href="#">Agents</a><a href="#">Blogs</a><a href="#">Contact us</a></div>
<div class="rft-col"><div class="rft-col-title">Other Pages</div><a href="#">Reviews</a><a href="#">404</a><a href="#">Property Page</a></div>
<div class="rft-col"><div class="rft-col-title">Social Media</div><a href="#">Instagram</a><a href="#">Youtube</a><a href="#">X</a></div>
<div class="rft-col"><div class="rft-col-title">Contact us</div><span>{{email}}</span><span>{{phone}}</span><span>{{address}}</span></div>
</div>
<div class="rft-watermark">{{brand}}</div>
<div class="rft-bottom">
<span class="rft-copy">{{copyright}}</span>
<div class="rft-legal"><a href="#">Terms & Conditions</a><a href="#">Privacy Policy</a></div>
</div>
</div></footer>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const realestateComponents: ComponentDefinition[] = [
  realestateNav,
  realestateHero,
  realestateListings,
  realestateServices,
  realestateTeam,
  realestateAbout,
  realestateReviews,
  realestateContact,
  realestateFaq,
  realestateBlog,
  realestateFooter,
];
