import { ComponentDefinition } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS NAV — Frosted glass sticky nav (FitBricks style)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessNav: ComponentDefinition = {
  id: "fitness-nav",
  category: "navigation",
  name: "Fitness Frosted Nav",
  description: "Sticky frosted-glass nav with brand, links, and orange CTA pill",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    links: { type: "list", label: "Navigation Links", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
  },
  defaultContent: {
    brand: "WARAS",
    links: ["About", "Programs", "Trainers", "Club"],
    ctaText: "Claim free trial",
  },
  html: `<style>
.fn-nav{position:absolute;top:0;left:0;right:0;z-index:100;padding:16px 20px}
.fn-inner{max-width:1400px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;background:transparent;border-radius:50px;padding:12px 8px 12px 24px;border:none}
.fn-brand{font-size:16px;font-weight:800;color:#fff;text-decoration:none;font-family:{{fontHeading}};letter-spacing:1px;text-transform:uppercase}
.fn-links{display:flex;align-items:center;gap:28px}
.fn-links a{color:rgba(255,255,255,0.7);text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:500}
.fn-cta{height:40px;padding:0 20px;border-radius:40px;background:{{primary}};color:#fff;font-size:13px;font-weight:600;text-decoration:none;font-family:{{fontBody}};display:inline-flex;align-items:center;justify-content:center;white-space:nowrap}
@media(max-width:768px){.fn-links{display:none!important}.fn-inner{padding:10px 6px 10px 18px!important}}
</style>
<nav class="fn-nav">
  <div class="fn-inner">
    <a href="#" class="fn-brand">{{brand}}</a>
    <div class="fn-links">{{#links}}<a href="#">{{.}}</a>{{/links}}</div>
    <a href="#" class="fn-cta">{{ctaText}}</a>
  </div>
</nav>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS HERO — Full-bleed photo with uppercase heading + double CTA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessHero: ComponentDefinition = {
  id: "fitness-hero",
  category: "hero",
  name: "Fitness Full-Bleed Hero",
  description: "Full-viewport hero with gym photo, uppercase heading, dual CTAs, and bottom gradient fade to black",
  source: "custom",
  slots: {
    label: { type: "text", label: "Top Label", required: false },
    headline: { type: "text", label: "Headline", required: true },
    subheadline: { type: "text", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "Primary CTA", required: true },
    secondaryCta: { type: "text", label: "Secondary CTA", required: false },
    backgroundImage: { type: "image", label: "Background Image", required: true },
  },
  defaultContent: {
    label: "Your fitness journey starts here",
    headline: "More Than a Gym — It's a Lifestyle",
    subheadline: "Join a community that pushes limits and celebrates every victory — big or small.",
    ctaText: "Start Your Free Trial",
    secondaryCta: "Visit us",
    backgroundImage: "/images/fitness-hero-bg.png",
  },
  html: `<style>
.fh-hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden}
.fh-bg{position:absolute;inset:0;z-index:0}
.fh-bg img{width:100%;height:100%;object-fit:cover;object-position:center 10%;display:block}
.fh-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 50%,rgb(0,0,0) 100%)}
.fh-content{position:relative;z-index:10;text-align:center;padding:0 40px 80px;max-width:800px;margin:0 auto}
.fh-label{font-size:13px;font-weight:500;color:rgba(255,255,255,0.6);font-family:{{fontBody}};margin-bottom:20px;letter-spacing:0.03em;text-transform:uppercase}
.fh-heading{font-size:64px;font-weight:800;color:#fff;font-family:{{fontHeading}};line-height:1.1;letter-spacing:-0.5px;text-transform:uppercase;margin:0 0 20px}
.fh-sub{font-size:16px;color:rgba(255,255,255,0.7);line-height:1.5;font-family:{{fontBody}};margin:0 0 32px}
.fh-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.fh-btn-primary{height:48px;padding:0 28px;border-radius:40px;background:{{primary}};color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};display:inline-flex;align-items:center;justify-content:center;border:none;cursor:pointer}
.fh-btn-secondary{height:48px;padding:0 28px;border-radius:40px;background:transparent;color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.3);cursor:pointer}
@media(max-width:1024px){.fh-heading{font-size:50px!important}}
@media(max-width:768px){.fh-heading{font-size:38px!important}.fh-content{padding:0 24px 60px!important}}
</style>
<section class="fh-hero">
  <div class="fh-bg"><img src="{{backgroundImage}}" alt="" /></div>
  <div class="fh-content">
    <p class="fh-label">{{label}}</p>
    <h1 class="fh-heading">{{headline}}</h1>
    <p class="fh-sub">{{subheadline}}</p>
    <div class="fh-btns">
      <a href="#" class="fh-btn-primary">{{ctaText}}</a>
      <a href="#" class="fh-btn-secondary">{{secondaryCta}}</a>
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS STATS — 4-column stats with dividers on black bg
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessStats: ComponentDefinition = {
  id: "fitness-stats",
  category: "features",
  name: "Fitness Stats Bar",
  description: "4-column stats row with large numbers, labels, and vertical dividers on black background",
  source: "custom",
  slots: {
    stats: { type: "list", label: "Stats", required: true },
    note: { type: "text", label: "Footer Note", required: false },
  },
  defaultContent: {
    stats: [
      { number: "1,5K+", desc: "Active Members" },
      { number: "98%", desc: "Feel stronger in 2 months" },
      { number: "24/7", desc: "Gym access" },
      { number: "150+", desc: "Classes monthly" },
    ],
    note: "No hidden fees. Cancel anytime.",
  },
  html: `<style>
.fs-section{background:#000;padding:80px 40px}
.fs-inner{max-width:1200px;margin:0 auto}
.fs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
.fs-stat{text-align:center;padding:0 24px;border-right:1px solid rgba(255,255,255,0.1)}
.fs-stat:last-child{border-right:none}
.fs-num{font-size:48px;font-weight:800;color:#fff;font-family:{{fontHeading}};line-height:1;margin-bottom:8px}
.fs-desc{font-size:14px;color:rgba(255,255,255,0.5);font-family:{{fontBody}};font-weight:400}
.fs-note{text-align:center;margin-top:40px;font-size:13px;color:rgba(255,255,255,0.35);font-family:{{fontBody}}}
@media(max-width:1024px){.fs-grid{grid-template-columns:repeat(2,1fr)!important;gap:40px 0}.fs-stat{border-right:none!important;padding:0 16px}.fs-stat:nth-child(odd){border-right:1px solid rgba(255,255,255,0.1)!important}}
@media(max-width:768px){.fs-section{padding:60px 24px!important}.fs-num{font-size:36px!important}}
</style>
<section class="fs-section">
  <div class="fs-inner">
    <div class="fs-grid">
      {{#stats}}<div class="fs-stat"><div class="fs-num">{{number}}</div><div class="fs-desc">{{desc}}</div></div>{{/stats}}
    </div>
    <p class="fs-note">{{note}}</p>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS MARQUEE — Scrolling lime-green ticker band
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessMarquee: ComponentDefinition = {
  id: "fitness-marquee",
  category: "cta",
  name: "Fitness Marquee Band",
  description: "Full-width scrolling marquee with lime green background and repeating text items",
  source: "custom",
  slots: {
    items: { type: "list", label: "Marquee Items", required: true },
  },
  defaultContent: {
    items: [
      { label: "30+ Clubs in 10 Cities" },
      { label: "Certified Personal Trainers" },
      { label: "20+ Class Variations" },
      { label: "All-in-One App" },
    ],
  },
  html: `<style>
.fm-band{background:{{secondary}};padding:16px 0;overflow:hidden;white-space:nowrap}
.fm-track{display:inline-flex;animation:fm-scroll 20s linear infinite}
.fm-item{font-size:14px;font-weight:700;color:#000;font-family:{{fontBody}};text-transform:uppercase;letter-spacing:0.03em;padding:0 32px;display:inline-flex;align-items:center;gap:32px}
.fm-item::after{content:"★";font-size:10px;color:rgba(0,0,0,0.3)}
@keyframes fm-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
</style>
<div class="fm-band">
  <div class="fm-track">
    {{#items}}<span class="fm-item">{{label}}</span>{{/items}}{{#items}}<span class="fm-item">{{label}}</span>{{/items}}{{#items}}<span class="fm-item">{{label}}</span>{{/items}}{{#items}}<span class="fm-item">{{label}}</span>{{/items}}
  </div>
</div>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS LOCATIONS — Location cards grid with photo overlays
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessLocations: ComponentDefinition = {
  id: "fitness-locations",
  category: "gallery",
  name: "Fitness Club Locations",
  description: "Location cards grid with full-bleed photos, gradient overlays, city labels",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    subtitle: { type: "text", label: "Subtitle", required: false },
    locations: { type: "list", label: "Locations", required: true },
  },
  defaultContent: {
    title: "Find a Club Near You",
    subtitle: "Premium facilities in major cities across the country.",
    locations: [
      { name: "Lower Manhattan", city: "New York", image: "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=500&h=680&fit=crop" },
      { name: "Santa Monica", city: "Los Angeles", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=680&fit=crop" },
      { name: "Lincoln Park", city: "Chicago", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&h=680&fit=crop" },
    ],
  },
  html: `<style>
.fl-section{background:#000;padding:80px 40px}
.fl-inner{max-width:1200px;margin:0 auto}
.fl-title{font-size:48px;font-weight:600;color:#fff;font-family:{{fontHeading}};margin:0 0 8px;line-height:1.2}
.fl-subtitle{font-size:16px;color:rgba(255,255,255,0.5);font-family:{{fontBody}};margin:0 0 48px}
.fl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.fl-card{position:relative;border-radius:10px;overflow:hidden;aspect-ratio:0.73}
.fl-card img{width:100%;height:100%;object-fit:cover;display:block}
.fl-card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 0%,rgba(0,0,0,0.8) 100%)}
.fl-card-info{position:absolute;bottom:20px;left:20px;z-index:2}
.fl-card-city{font-size:12px;font-weight:500;color:rgba(255,255,255,0.5);font-family:{{fontBody}};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px}
.fl-card-name{font-size:20px;font-weight:600;color:#fff;font-family:{{fontHeading}}}
@media(max-width:1024px){.fl-grid{grid-template-columns:repeat(2,1fr)!important}.fl-title{font-size:36px!important}}
@media(max-width:768px){.fl-section{padding:60px 24px!important}.fl-grid{grid-template-columns:1fr!important}.fl-card{aspect-ratio:1.2}}
</style>
<section class="fl-section">
  <div class="fl-inner">
    <h2 class="fl-title">{{title}}</h2>
    <p class="fl-subtitle">{{subtitle}}</p>
    <div class="fl-grid">
      {{#locations}}<div class="fl-card"><img src="{{image}}" alt="{{name}}" /><div class="fl-card-info"><div class="fl-card-city">{{city}}</div><div class="fl-card-name">{{name}}</div></div></div>{{/locations}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS SPLIT — Split section with text + image (trainer/coaching)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessSplit: ComponentDefinition = {
  id: "fitness-split",
  category: "about",
  name: "Fitness Split Section",
  description: "Split layout with heading, description, CTA on left and large image on right",
  source: "custom",
  slots: {
    title: { type: "text", label: "Heading", required: true },
    subtitle: { type: "text", label: "Subheading", required: false },
    description: { type: "text", label: "Description", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
    image: { type: "image", label: "Image", required: true },
  },
  defaultContent: {
    title: "Real Coaches. Real Results.",
    subtitle: "Certified Personal Training — Starting from $45/Session",
    description: "Our certified trainers design programs tailored to your unique goals, body type, and schedule. Whether you want to build muscle, lose weight, or improve endurance — we've got you covered.",
    ctaText: "About Personal Training",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&h=800&fit=crop",
  },
  html: `<style>
.fsp-section{background:#fff;padding:100px 40px}
.fsp-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.fsp-title{font-size:48px;font-weight:600;color:#000;font-family:{{fontHeading}};line-height:1.15;margin:0 0 12px}
.fsp-subtitle{font-size:16px;font-weight:600;color:rgba(0,0,0,0.5);font-family:{{fontBody}};margin:0 0 20px}
.fsp-desc{font-size:16px;color:rgba(0,0,0,0.6);line-height:1.5;font-family:{{fontBody}};margin:0 0 32px}
.fsp-cta{height:48px;padding:0 28px;border-radius:40px;background:#000;color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};display:inline-flex;align-items:center;justify-content:center}
.fsp-img{width:100%;aspect-ratio:7/8;object-fit:cover;border-radius:12px;display:block}
@media(max-width:1024px){.fsp-inner{grid-template-columns:1fr!important;gap:40px}.fsp-title{font-size:36px!important}}
@media(max-width:768px){.fsp-section{padding:64px 24px!important}.fsp-title{font-size:28px!important}}
</style>
<section class="fsp-section">
  <div class="fsp-inner">
    <div>
      <h2 class="fsp-title">{{title}}</h2>
      <p class="fsp-subtitle">{{subtitle}}</p>
      <p class="fsp-desc">{{description}}</p>
      <a href="#" class="fsp-cta">{{ctaText}}</a>
    </div>
    <div><img src="{{image}}" alt="" class="fsp-img" /></div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS CLASSES — Class cards grid with color-coded tags
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessClasses: ComponentDefinition = {
  id: "fitness-classes",
  category: "features",
  name: "Fitness Class Cards",
  description: "Class cards grid with background photos, color-coded category tags, difficulty, and duration",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    subtitle: { type: "text", label: "Subtitle", required: false },
    classes: { type: "list", label: "Classes", required: true },
  },
  defaultContent: {
    title: "Explore Our Classes",
    subtitle: "From high-intensity training to mindful movement — find your perfect workout.",
    classes: [
      { name: "Hatha Yoga", tag: "Mind & Body", tagColor: "#357A5A", level: "Easy", duration: "60 min", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=680&fit=crop" },
      { name: "HIIT Burn", tag: "Cardio", tagColor: "#CB3B31", level: "Hard", duration: "45 min", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=680&fit=crop" },
      { name: "Kettlebell Power", tag: "Strength", tagColor: "#00C4D1", level: "Medium", duration: "45 min", image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=680&fit=crop" },
    ],
  },
  html: `<style>
.fc-section{background:#000;padding:80px 40px}
.fc-inner{max-width:1200px;margin:0 auto}
.fc-title{font-size:48px;font-weight:600;color:#fff;font-family:{{fontHeading}};margin:0 0 8px;line-height:1.2}
.fc-subtitle{font-size:16px;color:rgba(255,255,255,0.5);font-family:{{fontBody}};margin:0 0 48px}
.fc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.fc-card{position:relative;border-radius:10px;overflow:hidden;aspect-ratio:0.73}
.fc-card img{width:100%;height:100%;object-fit:cover;display:block}
.fc-card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.85) 100%)}
.fc-tag{position:absolute;top:16px;left:16px;z-index:2;font-size:11px;font-weight:600;color:#fff;padding:5px 10px;border-radius:6px;font-family:{{fontBody}};text-transform:uppercase;letter-spacing:0.03em}
.fc-card-info{position:absolute;bottom:20px;left:20px;right:20px;z-index:2}
.fc-card-name{font-size:20px;font-weight:600;color:#fff;font-family:{{fontHeading}};margin-bottom:6px}
.fc-card-meta{font-size:12px;color:rgba(255,255,255,0.5);font-family:{{fontBody}}}
@media(max-width:1024px){.fc-grid{grid-template-columns:repeat(2,1fr)!important}.fc-title{font-size:36px!important}}
@media(max-width:768px){.fc-section{padding:60px 24px!important}.fc-grid{grid-template-columns:1fr!important}.fc-card{aspect-ratio:1.2}}
</style>
<section class="fc-section">
  <div class="fc-inner">
    <h2 class="fc-title">{{title}}</h2>
    <p class="fc-subtitle">{{subtitle}}</p>
    <div class="fc-grid">
      {{#classes}}<div class="fc-card"><img src="{{image}}" alt="{{name}}" /><span class="fc-tag" style="background:{{tagColor}}">{{tag}}</span><div class="fc-card-info"><div class="fc-card-name">{{name}}</div><div class="fc-card-meta">{{level}} · {{duration}}</div></div></div>{{/classes}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS CTA — Full-bleed photo with uppercase heading
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessCta: ComponentDefinition = {
  id: "fitness-cta",
  category: "cta",
  name: "Fitness Final CTA",
  description: "Full-bleed photo CTA with uppercase heading, subtitle, and orange button",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    subheadline: { type: "text", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "CTA Text", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
  },
  defaultContent: {
    headline: "Take the First Step Toward a Stronger You",
    subheadline: "Start your transformation today. Your first class is on us.",
    ctaText: "Contact us",
    backgroundImage: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1600&h=900&fit=crop",
  },
  html: `<style>
.fct-section{position:relative;min-height:70vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.fct-bg{position:absolute;inset:0;z-index:0}
.fct-bg img{width:100%;height:100%;object-fit:cover;display:block;opacity:0.6}
.fct-bg::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,0.4)}
.fct-content{position:relative;z-index:10;text-align:center;padding:0 40px;max-width:800px}
.fct-heading{font-size:56px;font-weight:800;color:#fff;font-family:{{fontHeading}};line-height:1.1;text-transform:uppercase;margin:0 0 16px}
.fct-sub{font-size:16px;color:rgba(255,255,255,0.7);line-height:1.5;font-family:{{fontBody}};margin:0 0 32px}
.fct-btn{height:48px;padding:0 28px;border-radius:40px;background:{{primary}};color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};display:inline-flex;align-items:center;justify-content:center;border:none;cursor:pointer}
@media(max-width:1024px){.fct-heading{font-size:40px!important}}
@media(max-width:768px){.fct-heading{font-size:30px!important}.fct-content{padding:0 24px!important}.fct-section{min-height:50vh!important}}
</style>
<section class="fct-section">
  <div class="fct-bg"><img src="{{backgroundImage}}" alt="" /></div>
  <div class="fct-content">
    <h2 class="fct-heading">{{headline}}</h2>
    <p class="fct-sub">{{subheadline}}</p>
    <a href="#" class="fct-btn">{{ctaText}}</a>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS FOOTER — Dark multi-column footer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessFooter: ComponentDefinition = {
  id: "fitness-footer",
  category: "footer",
  name: "Fitness Footer",
  description: "Premium dark footer with brand, tagline, app badges, 4 link columns, contact emails, photo gallery row, and copyright",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    tagline: { type: "text", label: "Tagline", required: false },
    columns: { type: "list", label: "Footer Columns", required: true },
    emails: { type: "list", label: "Contact Emails", required: false },
    photos: { type: "list", label: "Gallery Photos", required: false },
    copyright: { type: "text", label: "Copyright", required: true },
  },
  defaultContent: {
    brand: "WARAS",
    tagline: "Your Trusted Fitness Partner",
    columns: [
      { title: "Programs", links: ["Hatha Yoga", "HIIT Burn", "Kettlebell Conditioning", "Hip Hop Sweat", "Functional Strength"] },
      { title: "Pages", links: ["About Us", "Trainers", "Programs", "Location", "Contact Us"] },
      { title: "Resources", links: ["Blog", "Career", "Privacy Policy", "Terms & Conditions"] },
      { title: "Social", links: ["Instagram", "Facebook", "Twitter", "Youtube"] },
    ],
    emails: [
      { label: "careers@waras.com" },
      { label: "partnership@waras.com" },
      { label: "enterprise@waras.com" },
    ],
    photos: [
      { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop" },
      { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop" },
      { src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&h=300&fit=crop" },
      { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop" },
    ],
    copyright: "2026 WARAS. All rights reserved.",
  },
  html: `<style>
.ff-section{background:#000;padding:80px 40px 32px;border-top:1px solid rgba(255,255,255,0.08)}
.ff-inner{max-width:1200px;margin:0 auto}
.ff-top{display:grid;grid-template-columns:1.4fr repeat(4,1fr);gap:40px;margin-bottom:64px}
.ff-brand-col{}
.ff-logo{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.ff-logo-icon{width:28px;height:28px;background:{{primary}};border-radius:6px;display:flex;align-items:center;justify-content:center}
.ff-logo-icon svg{width:16px;height:16px}
.ff-brand-name{font-size:20px;font-weight:800;color:#fff;font-family:{{fontHeading}};text-transform:uppercase;letter-spacing:1px}
.ff-tagline{font-size:14px;color:{{primary}};font-family:{{fontBody}};margin-bottom:24px}
.ff-badges{display:flex;gap:10px}
.ff-badge-img{height:44px;border-radius:8px;display:block;object-fit:contain}
.ff-col-title{font-size:12px;font-weight:700;color:#fff;font-family:{{fontBody}};margin-bottom:20px;text-transform:uppercase;letter-spacing:0.08em}
.ff-col-links{list-style:none;padding:0;margin:0}
.ff-col-links li{margin-bottom:12px}
.ff-col-links a{font-size:14px;color:rgba(255,255,255,0.55);text-decoration:none;font-family:{{fontBody}};transition:color 0.2s}
.ff-mid{display:grid;grid-template-columns:1.4fr 3fr;gap:40px;margin-bottom:40px;align-items:end}
.ff-contact-title{font-size:12px;font-weight:700;color:#fff;font-family:{{fontBody}};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px}
.ff-email{font-size:14px;color:rgba(255,255,255,0.55);font-family:{{fontBody}};margin-bottom:10px}
.ff-photos{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.ff-photo{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;display:block}
.ff-bottom{border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;margin-top:16px}
.ff-copy{font-size:12px;color:rgba(255,255,255,0.3);font-family:{{fontBody}}}
@media(max-width:1024px){.ff-top{grid-template-columns:1fr 1fr!important;gap:32px}.ff-mid{grid-template-columns:1fr!important}}
@media(max-width:768px){.ff-section{padding:48px 24px 24px!important}.ff-top{grid-template-columns:1fr!important;gap:28px}.ff-photos{grid-template-columns:repeat(2,1fr)!important}}
</style>
<footer class="ff-section">
  <div class="ff-inner">
    <div class="ff-top">
      <div class="ff-brand-col">
        <div class="ff-logo">
          <span class="ff-logo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
          <span class="ff-brand-name">{{brand}}</span>
        </div>
        <p class="ff-tagline">{{tagline}}</p>
        <div class="ff-badges">
          <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" class="ff-badge-img" /></a>
          <a href="#"><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" class="ff-badge-img" /></a>
        </div>
      </div>
      {{#columns}}<div>
        <h4 class="ff-col-title">{{title}}</h4>
        <ul class="ff-col-links">{{#links}}<li><a href="#">{{.}}</a></li>{{/links}}</ul>
      </div>{{/columns}}
    </div>
    <div class="ff-mid">
      <div>
        <h4 class="ff-contact-title">Contact</h4>
        {{#emails}}<p class="ff-email">{{label}}</p>{{/emails}}
      </div>
      <div class="ff-photos">
        {{#photos}}<img src="{{src}}" alt="" class="ff-photo" />{{/photos}}
      </div>
    </div>
    <div class="ff-bottom">
      <p class="ff-copy">&copy; {{copyright}}</p>
    </div>
  </div>
</footer>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FITNESS PROMO — Split lime panel + photo with benefit card overlay
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessPromo: ComponentDefinition = {
  id: "fitness-promo",
  category: "cta",
  name: "Fitness Promo Split",
  description: "Split section with lime-green panel (badge, headline, CTA) and photo with overlaid benefit card",
  source: "custom",
  slots: {
    badge: { type: "text", label: "Badge Text", required: false },
    headline: { type: "text", label: "Headline", required: true },
    description: { type: "text", label: "Description", required: true },
    ctaText: { type: "text", label: "CTA Text", required: true },
    image: { type: "image", label: "Photo", required: true },
    cardText: { type: "text", label: "Benefit Card Text", required: true },
    benefits: { type: "list", label: "Benefits", required: true },
  },
  defaultContent: {
    badge: "NEW CLASS LAUNCH",
    headline: "Pilates Reformer at WARAS — Starting from $25/Session",
    description: "Join our Pilates Reformer class and sculpt your way to a stronger, leaner, more aligned body.",
    ctaText: "RESERVE YOUR SPOT TODAY",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=900&fit=crop",
    cardText: "Whether you're chasing better posture, core strength, or a toned silhouette — this is your move.",
    benefits: [
      { label: "Suitable for all fitness levels" },
      { label: "Improves posture, flexibility & muscle control" },
      { label: "Low-impact, high-result training" },
    ],
  },
  html: `<style>
.fp-section{padding:0;background:#000}
.fp-inner{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1.2fr;min-height:700px}
.fp-left{background:{{secondary}};padding:48px 48px 48px;display:flex;flex-direction:column;justify-content:space-between;border-radius:12px;margin:16px 0 16px 16px}
.fp-badge{display:inline-block;font-size:11px;font-weight:600;color:#000;font-family:{{fontBody}};letter-spacing:0.06em;text-transform:uppercase;border:1.5px solid rgba(0,0,0,0.3);border-radius:40px;padding:6px 14px;margin-bottom:32px;align-self:flex-start}
.fp-headline{font-size:46px;font-weight:700;color:#000;font-family:{{fontHeading}};line-height:1.12;margin:0 0 24px;letter-spacing:-0.5px}
.fp-desc{font-size:16px;color:rgba(0,0,0,0.6);line-height:1.6;font-family:{{fontBody}};margin:0 0 40px}
.fp-cta{display:inline-flex;align-items:center;gap:10px;height:52px;padding:0 28px;border-radius:0;background:#000;color:#fff;font-size:13px;font-weight:700;text-decoration:none;font-family:{{fontBody}};letter-spacing:0.06em;text-transform:uppercase;border:none;cursor:pointer;align-self:flex-start}
.fp-cta::after{content:"→";font-size:16px}
.fp-right{position:relative;margin:16px 16px 16px 0;border-radius:12px;overflow:hidden}
.fp-right img{width:100%;height:100%;object-fit:cover;display:block}
.fp-card{position:absolute;bottom:24px;right:24px;background:#fff;border-radius:12px;padding:28px 28px 24px;max-width:380px;box-shadow:0 8px 32px rgba(0,0,0,0.12)}
.fp-card-text{font-size:17px;font-weight:600;color:#111;font-family:{{fontHeading}};line-height:1.4;margin:0 0 20px}
.fp-benefit{display:flex;align-items:flex-start;gap:10px;margin-bottom:14px}
.fp-benefit:last-child{margin-bottom:0}
.fp-check{width:22px;height:22px;border-radius:50%;background:{{secondary}};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.fp-check svg{width:12px;height:12px}
.fp-benefit-text{font-size:14px;color:#333;font-family:{{fontBody}};line-height:1.45}
@media(max-width:1024px){.fp-inner{grid-template-columns:1fr!important}.fp-left{margin:16px 16px 0!important;padding:40px!important}.fp-right{margin:0 16px 16px!important;min-height:500px}.fp-headline{font-size:36px!important}}
@media(max-width:768px){.fp-left{padding:32px 24px!important}.fp-headline{font-size:28px!important}.fp-card{position:relative!important;bottom:auto!important;right:auto!important;margin:0 16px 16px!important;max-width:100%!important;border-radius:0 0 12px 12px!important}.fp-right{min-height:400px!important;border-radius:12px 12px 0 0!important;margin-bottom:0!important}}
</style>
<section class="fp-section">
  <div class="fp-inner">
    <div class="fp-left">
      <div>
        <span class="fp-badge">{{badge}}</span>
        <h2 class="fp-headline">{{headline}}</h2>
        <p class="fp-desc">{{description}}</p>
      </div>
      <a href="#" class="fp-cta">{{ctaText}}</a>
    </div>
    <div class="fp-right">
      <img src="{{image}}" alt="" />
      <div class="fp-card">
        <p class="fp-card-text">{{cardText}}</p>
        {{#benefits}}<div class="fp-benefit"><span class="fp-check"><svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span class="fp-benefit-text">{{label}}</span></div>{{/benefits}}
      </div>
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const fitnessComponents: ComponentDefinition[] = [
  fitnessNav,
  fitnessHero,
  fitnessStats,
  fitnessMarquee,
  fitnessLocations,
  fitnessSplit,
  fitnessPromo,
  fitnessClasses,
  fitnessCta,
  fitnessFooter,
];
