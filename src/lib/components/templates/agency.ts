import { ComponentDefinition } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY NAV — Pill-shaped centered nav, brand left, meet button right
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyNav: ComponentDefinition = {
  id: "agency-nav",
  category: "navigation",
  name: "Agency Navigation",
  description: "Pill-shaped centered nav with brand and meet button",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
  },
  defaultContent: {
    brand: "A GenC",
    ctaText: "Book",
  },
  html: `<style>
.an{position:absolute;top:0;left:0;right:0;z-index:100;padding:20px 40px}
.an-inner{display:flex;align-items:center;justify-content:space-between}
.an-brand{font-size:20px;font-weight:800;color:#fff;text-decoration:none;font-family:{{fontHeading}};letter-spacing:-0.5px;word-spacing:-0.15em}
.an-brand sup{font-size:7px;vertical-align:top;position:relative;top:-0.15em;font-weight:400;line-height:1}
.an-pill{display:flex;align-items:center;background:rgba(50,50,50,0.7);backdrop-filter:blur(16px);border-radius:40px;padding:4px 6px}
.an-pill a{padding:10px 22px;font-size:13px;color:rgba(255,255,255,0.65);text-decoration:none;font-family:{{fontBody}};border-radius:36px;transition:all .3s;font-weight:500}
.an-pill a:hover{color:#fff;background:rgba(255,255,255,0.08)}
.an-right{display:flex;align-items:center;gap:10px}
.an-cta{font-size:13px;color:#fff;font-family:{{fontBody}};font-weight:500;text-decoration:none}
.an-cta-icon{width:36px;height:36px;border-radius:10px;border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;background:transparent}
.an-cta-icon svg{width:15px;height:15px;stroke:#fff;fill:none;stroke-width:1.5}
@media(max-width:768px){.an{padding:16px 20px}.an-pill{display:none}}
</style>
<nav class="an"><div class="an-inner">
<a href="#" class="an-brand">{{brand}}<sup>\u00AE</sup></a>
<div class="an-pill">
<a href="#studio">Studio</a>
<a href="#projects">Project <sup style="font-size:10px;color:rgba(255,255,255,0.35)">(12)</sup></a>
<a href="#services">Service</a>
<a href="#blog">Blog</a>
</div>
<div class="an-right">
<a href="#contact" class="an-cta">{{ctaText}}</a>
<div class="an-cta-icon"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/></svg></div>
</div>
</div></nav>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY HERO — Dark, massive brand name, 3D art bg, dual CTAs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyHero: ComponentDefinition = {
  id: "agency-hero",
  category: "hero",
  name: "Agency Hero",
  description: "Dark hero with massive brand name, 3D background, dual CTA buttons",
  source: "custom",
  slots: {
    heroImage: { type: "image", label: "Hero Background Image", required: true },
    name: { type: "text", label: "Brand Name", required: true },
    label: { type: "text", label: "Label", required: false },
    description: { type: "longtext", label: "Description", required: true },
    ctaText1: { type: "text", label: "CTA Button 1", required: false },
    ctaText2: { type: "text", label: "CTA Button 2", required: false },
  },
  defaultContent: {
    heroImage: "/images/agency-hero-bg.png",
    name: "A GenC",
    label: "CREATIVE STUDIO",
    description: "We turn ambitious ideas into striking digital realities through strategy, design, and relentless attention to detail.",
    ctaText1: "See Projects",
    ctaText2: "Get in Touch",
  },
  html: `<style>
html,body{margin:0;padding:0}
.ah{position:relative;width:100%;height:100vh;overflow:hidden;background:#111}
.ah-bg{position:absolute;inset:0;z-index:0}
.ah-bg img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;display:block;opacity:0.65}
.ah-content{position:relative;z-index:10;height:100%;display:flex;flex-direction:column;justify-content:center;padding:0 48px}
.ah-name{font-size:clamp(72px,14vw,190px);font-weight:900;color:#fff;line-height:0.88;font-family:{{fontHeading}};margin:0;letter-spacing:-4px;text-transform:capitalize;word-spacing:-0.15em}
.ah-name sup{font-size:0.12em;vertical-align:top;position:relative;top:-0.05em;font-weight:400;letter-spacing:0;line-height:1}
.ah-label{display:flex;align-items:center;gap:14px;margin-top:20px}
.ah-label-line{width:36px;height:2px;background:#fff}
.ah-label-txt{font-size:11px;font-weight:700;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:4px;font-family:{{fontBody}}}
.ah-bottom{position:absolute;bottom:40px;left:48px;right:48px;z-index:10;display:flex;justify-content:space-between;align-items:flex-end}
.ah-desc{max-width:360px}
.ah-slash{font-size:18px;color:rgba(255,255,255,0.25);font-family:{{fontBody}};margin-bottom:14px}
.ah-desc p{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.75;font-style:italic;font-family:{{fontBody}};margin:0}
.ah-btns{display:flex;gap:10px;align-items:center}
.ah-btn{padding:14px 28px;border-radius:40px;font-size:12px;font-weight:600;text-decoration:none;font-family:{{fontBody}};display:flex;align-items:center;gap:8px;letter-spacing:0.3px}
.ah-btn1{background:rgba(255,255,255,0.06);color:#fff;border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(6px)}
.ah-btn1::after{content:'';width:6px;height:6px;border-radius:50%;background:#4ade80;display:inline-block}
.ah-btn2{background:#fff;color:#111;border:none}
.ah-btn2 svg{width:16px;height:16px;stroke:#111;fill:none;stroke-width:2}
.ah-scroll{position:absolute;right:16px;top:50%;transform:translateY(-50%) rotate(90deg);font-size:10px;color:rgba(255,255,255,0.25);letter-spacing:3px;text-transform:uppercase;font-family:{{fontBody}};white-space:nowrap}
@media(max-width:768px){.ah{height:auto;min-height:100vh;display:flex;flex-direction:column}.ah-content{padding:0 20px;flex:1;justify-content:flex-end;padding-bottom:24px}.ah-name{font-size:48px!important;letter-spacing:-2px}.ah-bottom{position:relative;bottom:auto;left:auto;right:auto;padding:0 20px 32px;flex-direction:column;gap:20px;align-items:flex-start}.ah-desc{max-width:100%}.ah-btns{width:100%}.ah-btn{padding:14px 24px;font-size:11px}.ah-scroll{display:none}}
</style>
<section class="ah">
<div class="ah-bg"><img src="{{heroImage}}" alt=""/></div>
<div class="ah-content">
<h1 class="ah-name">{{name}}<sup>\u00AE</sup></h1>
<div class="ah-label"><span class="ah-label-line"></span><span class="ah-label-txt">{{label}}</span></div>
</div>
<div class="ah-bottom">
<div class="ah-desc"><div class="ah-slash">/</div><p>{{description}}</p></div>
<div class="ah-btns">
<a href="#work" class="ah-btn ah-btn1">{{ctaText1}}</a>
<a href="#contact" class="ah-btn ah-btn2">{{ctaText2}} <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
</div>
</div>
<span class="ah-scroll">Scroll down</span>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY ABOUT — Light bg, split layout, stats cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyAbout: ComponentDefinition = {
  id: "agency-about",
  category: "about",
  name: "Agency About",
  description: "Light split section with image, description, social icons and stats cards",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    image: { type: "image", label: "Image", required: true },
    description: { type: "longtext", label: "Description", required: true },
    descFaded: { type: "longtext", label: "Description (faded)", required: false },
    statNumber: { type: "text", label: "Stat Number", required: false },
    statLabel: { type: "text", label: "Stat Label", required: false },
    factNumber: { type: "text", label: "Fact Number", required: false },
    factLabel: { type: "text", label: "Fact Label", required: false },
    factImage: { type: "image", label: "Fact Background Image", required: false },
    ctaText: { type: "text", label: "CTA Text", required: false },
    fieldsCount: { type: "text", label: "Fields Count", required: false },
    countriesCount: { type: "text", label: "Countries", required: false },
  },
  defaultContent: {
    label: "Why choose us",
    title: "The People Behind Every Pixel",
    image: "/images/car-image.jfif",
    description: "At A GenC\u00AE Studio, we unite creative thinkers, brand architects,",
    descFaded: "and digital craftspeople to deliver work that moves audiences and drives real business results.",
    statNumber: "260+",
    statLabel: "Projects Shipped",
    factNumber: "97%",
    factLabel: "Client satisfaction across every engagement.",
    factImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=600&fit=crop",
    ctaText: "View Plans",
    fieldsCount: "Over 80 Industries",
    countriesCount: "9 Countries Worldwide",
  },
  html: `<style>
.aab{background:#f5f5f5;padding:96px 48px}
.aab-inner{max-width:1200px;margin:0 auto}
.aab-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px}
.aab-label{display:flex;align-items:center;gap:8px;font-size:12px;color:#111;font-weight:600;font-family:{{fontBody}}}
.aab-label::before{content:'';width:7px;height:7px;border-radius:50%;background:#111;display:inline-block}
.aab-title{font-size:clamp(32px,5vw,48px);font-weight:800;color:#111;font-family:{{fontHeading}};line-height:1.15;max-width:500px;letter-spacing:-1px}
.aab-socials{display:flex;gap:8px}
.aab-social{width:38px;height:38px;border-radius:50%;border:1px solid #ddd;display:flex;align-items:center;justify-content:center;text-decoration:none}
.aab-social svg{width:14px;height:14px;stroke:#333;fill:none;stroke-width:1.8}
.aab-grid{display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:end}
.aab-img{width:100%;border-radius:12px;object-fit:cover;aspect-ratio:3/4;display:block}
.aab-right{display:flex;flex-direction:column;gap:24px}
.aab-desc{font-size:clamp(20px,2.5vw,28px);color:#111;font-family:{{fontHeading}};line-height:1.55;font-weight:500;margin:0}
.aab-desc-faded{color:#999}
.aab-meta{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #ddd;padding-top:20px}
.aab-fields{display:flex;align-items:center;gap:10px}
.aab-fields svg{width:28px;height:28px;stroke:#666;fill:none;stroke-width:1.2}
.aab-fields-txt{font-size:12px;color:#666;font-family:{{fontBody}};line-height:1.5}
.aab-fields-txt strong{display:block;color:#333}
.aab-avatars{display:flex;align-items:center}
.aab-avatar{width:32px;height:32px;border-radius:50%;background:#bbb;border:2px solid #f5f5f5;margin-left:-10px;object-fit:cover}
.aab-avatar:first-child{margin-left:0}
.aab-avatar-count{width:32px;height:32px;border-radius:50%;background:#111;color:#fff;font-size:10px;font-weight:700;font-family:{{fontBody}};display:flex;align-items:center;justify-content:center;margin-left:-10px;border:2px solid #f5f5f5}
.aab-cards{display:grid;grid-template-columns:1.15fr 1fr;gap:16px;align-items:stretch}
.aab-card{background:#fff;border-radius:16px;padding:28px;border:1px solid #eee;display:flex;flex-direction:column}
.aab-card-num{font-size:clamp(40px,4.5vw,56px);font-weight:800;color:#111;font-family:{{fontHeading}};line-height:1;margin-bottom:4px;letter-spacing:-2px}
.aab-card-lbl{font-size:12px;color:#888;font-family:{{fontBody}};margin-bottom:20px}
.aab-logos{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px 12px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #eee}
.aab-logo{font-size:13px;color:#bbb;font-family:{{fontBody}};font-weight:600;font-style:italic;padding:4px 0;display:flex;align-items:center;gap:4px}
.aab-logo svg{width:12px;height:12px;fill:#ccc;stroke:none}
.aab-card-btn{display:block;width:100%;padding:16px;background:#111;color:#fff;text-align:center;border-radius:12px;font-size:13px;font-weight:600;text-decoration:none;font-family:{{fontBody}};box-sizing:border-box}
.aab-card2{position:relative;overflow:hidden;border-radius:16px;border:none;padding:0;min-height:260px}
.aab-card2-img{position:absolute;inset:0;z-index:0}
.aab-card2-img img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;display:block}
.aab-card2-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.6) 100%);z-index:1}
.aab-card2-head{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:16px 20px}
.aab-card2-tag{font-size:12px;font-weight:700;color:#fff;font-family:{{fontBody}}}
.aab-card2-date{font-size:11px;color:rgba(255,255,255,0.5);font-family:{{fontBody}}}
.aab-card2-body{position:relative;z-index:2;padding:0 20px 20px;margin-top:auto;display:flex;flex-direction:column;gap:6px}
.aab-card2-num{font-size:clamp(52px,7vw,80px);font-weight:800;color:#fff;font-family:{{fontHeading}};line-height:1;letter-spacing:-3px}
.aab-card2-lbl{font-size:12px;color:rgba(255,255,255,0.75);font-family:{{fontBody}};max-width:200px;line-height:1.5}
.aab-card2{display:flex;flex-direction:column}
@media(max-width:768px){.aab{padding:64px 20px}.aab-grid{grid-template-columns:1fr}.aab-cards{grid-template-columns:1fr}.aab-top{flex-direction:column;gap:16px}}
</style>
<section class="aab"><div class="aab-inner">
<div class="aab-top">
<div><p class="aab-label">{{label}}</p><h2 class="aab-title">{{title}}</h2></div>
<div class="aab-socials">
<a href="#" class="aab-social"><svg viewBox="0 0 24 24"><path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-7-8.5L19.5 4H18l-5 6.2L9 4H4z"/></svg></a>
<a href="#" class="aab-social"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0"/></svg></a>
<a href="#" class="aab-social"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 8a6 6 0 0 1-12 0"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="16" y1="11" x2="16" y2="16"/></svg></a>
</div>
</div>
<div class="aab-grid">
<img class="aab-img" src="{{image}}" alt="About"/>
<div class="aab-right">
<p class="aab-desc">{{description}} <span class="aab-desc-faded">{{descFaded}}</span></p>
<div class="aab-meta">
<div class="aab-fields"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg><div class="aab-fields-txt"><strong>{{fieldsCount}}</strong>{{countriesCount}}</div></div>
<div class="aab-avatars"><div class="aab-avatar" style="background:#c4956a"></div><div class="aab-avatar" style="background:#8b7d6b"></div><div class="aab-avatar" style="background:#6b8e9b"></div><div class="aab-avatar-count">12</div></div>
</div>
<div class="aab-cards">
<div class="aab-card">
<div class="aab-card-num">{{statNumber}}</div>
<div class="aab-card-lbl">{{statLabel}}</div>
<div class="aab-logos"><span class="aab-logo">hues</span><span class="aab-logo" style="font-style:normal;font-family:serif">theo</span><span class="aab-logo"><svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 19h2l1-3h3l1 3h2l1.27 2.66 1.89-.66C17.73 16.95 18 14 17 8z"/></svg> Leaf</span><span class="aab-logo"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg> Crona</span><span class="aab-logo"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> Mercury</span></div>
<a href="#pricing" class="aab-card-btn">{{ctaText}}</a>
</div>
<div class="aab-card aab-card2">
<div class="aab-card2-img"><img src="{{factImage}}" alt=""/></div>
<div class="aab-card2-overlay"></div>
<div class="aab-card2-head"><span class="aab-card2-tag">A GenC Fact</span><span class="aab-card2-date">04/04</span></div>
<div class="aab-card2-body"><div class="aab-card2-num">{{factNumber}}</div><div class="aab-card2-lbl">{{factLabel}}</div></div>
</div>
</div>
</div>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY PROJECTS — Selected Work grid, numbered projects
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyProjects: ComponentDefinition = {
  id: "agency-projects",
  category: "gallery",
  name: "Agency Projects",
  description: "Selected work showcase with numbered project cards in grid layout",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    badge: { type: "text", label: "Badge", required: false },
    projects1: { type: "list", label: "Row 1 Projects (2)", required: true },
    projects2: { type: "list", label: "Row 2 Projects (3)", required: true },
  },
  defaultContent: {
    label: "Case studies",
    title: "Recent Work.",
    subtitle: "A selection of projects where strategy met craft. Each one solved a real problem for a real brand.",
    badge: "22-26\u00B0",
    projects1: [
      { number: "01", name: "Halcyon Dashboard", year: "2026", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop" },
      { number: "02", name: "Orion Platform", year: "2025", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=700&h=500&fit=crop" },
    ],
    projects2: [
      { number: "03", name: "Prism Mobile App", year: "2024", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop" },
      { number: "04", name: "Vanta Rebrand", year: "2023", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop" },
      { number: "05", name: "Kova E-Commerce", year: "2025", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop" },
    ],
  },
  html: `<style>
.apj{background:#f5f5f5;padding:96px 48px;border-top:1px solid #e5e5e5}
.apj-inner{max-width:1200px;margin:0 auto}
.apj-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
.apj-label{display:flex;align-items:center;gap:8px;font-size:12px;color:#111;font-weight:600;font-family:{{fontBody}}}
.apj-label::before{content:'';width:7px;height:7px;border-radius:50%;background:#111}
.apj-title{font-size:clamp(48px,8vw,96px);font-weight:900;color:#111;font-family:{{fontHeading}};line-height:1;letter-spacing:-3px;margin:0}
.apj-title sup{font-size:0.2em;color:#888;font-weight:400;vertical-align:super;letter-spacing:0}
.apj-sub-row{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px}
.apj-subtitle{font-size:13px;color:#888;font-family:{{fontBody}};line-height:1.7;max-width:420px;margin:0}
.apj-badge{font-size:13px;color:#888;font-family:{{fontBody}};letter-spacing:0.5px}
.apj-row2{display:grid;grid-template-columns:1.85fr 1fr;gap:16px}
.apj-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-top:32px}
.apj-item{}
.apj-card{position:relative;border-radius:16px;overflow:hidden;height:420px}
.apj-card img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;display:block}
.apj-card-info{display:flex;justify-content:space-between;align-items:baseline;padding:14px 4px 0}
.apj-card-name{font-size:14px;font-weight:700;color:#111;font-family:{{fontHeading}}}
.apj-card-num{font-size:12px;color:#999;font-family:{{fontBody}};font-weight:400}
.apj-card-year{font-size:12px;color:#999;font-family:{{fontBody}}}
@media(max-width:768px){.apj{padding:64px 20px}.apj-row2,.apj-row3{grid-template-columns:1fr}}
</style>
<section class="apj"><div class="apj-inner">
<div class="apj-top"><p class="apj-label">{{label}}</p></div>
<h2 class="apj-title">{{title}} <sup>(5)</sup></h2>
<div class="apj-sub-row"><p class="apj-subtitle">{{subtitle}}</p><span class="apj-badge">{{badge}}</span></div>
<div class="apj-row2">
{{#projects1}}<div class="apj-item"><div class="apj-card"><img src="{{image}}" alt="{{name}}"/></div><div class="apj-card-info"><div><span class="apj-card-num">{{number}}.</span> <span class="apj-card-name">{{name}}</span></div><span class="apj-card-year">{{year}}</span></div></div>{{/projects1}}
</div>
<div class="apj-row3">
{{#projects2}}<div class="apj-item"><div class="apj-card"><img src="{{image}}" alt="{{name}}"/></div><div class="apj-card-info"><div><span class="apj-card-num">{{number}}.</span> <span class="apj-card-name">{{name}}</span></div><span class="apj-card-year">{{year}}</span></div></div>{{/projects2}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY TEAM — Dark bg, staggered member cards with corner brackets
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyTeam: ComponentDefinition = {
  id: "agency-team",
  category: "team",
  name: "Agency Team",
  description: "Dark section with staggered team member cards, corner brackets, circular portraits",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    members: { type: "list", label: "Team Members", required: true },
  },
  defaultContent: {
    label: "Our Crew",
    title: "Creatives Who Care About the Craft",
    members: [
      { name: "Sara Mitchell", role: "Creative Director", tag: "#thevisionary", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face" },
      { name: "David Park", role: "Lead Developer", tag: "#theengineer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
      { name: "Nina Alvarez", role: "Brand Strategist", tag: "#thestoryteller", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" },
    ],
  },
  html: `<style>
.atm{background:#0a0a0a;padding:96px 48px;overflow:hidden}
.atm-inner{max-width:1200px;margin:0 auto}
.atm-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:64px}
.atm-label{display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,0.6);font-weight:600;font-family:{{fontBody}}}
.atm-label::before{content:'';width:7px;height:7px;border-radius:50%;background:#fff}
.atm-title{font-size:clamp(36px,5vw,56px);font-weight:800;color:#fff;font-family:{{fontHeading}};font-style:italic;line-height:1.15;max-width:500px;text-align:right;letter-spacing:-1px}
.atm-cards{display:flex;gap:24px;justify-content:center;align-items:flex-start}
.atm-card{width:320px;background:#161616;border-radius:16px;padding:24px;flex-shrink:0;position:relative;border:1px solid rgba(255,255,255,0.06)}
.atm-card:nth-child(2){margin-top:60px}
.atm-card:nth-child(3){margin-top:120px}
.atm-card::before,.atm-card::after{content:'';position:absolute;width:20px;height:20px;border-color:rgba(255,255,255,0.12);border-style:solid}
.atm-card::before{top:-8px;left:-8px;border-width:1px 0 0 1px}
.atm-card::after{bottom:-8px;right:-8px;border-width:0 1px 1px 0}
.atm-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.atm-card-role{font-size:12px;color:rgba(255,255,255,0.5);font-family:{{fontBody}};font-weight:500}
.atm-card-socials{display:flex;gap:6px}
.atm-card-soc{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center}
.atm-card-soc svg{width:12px;height:12px;stroke:rgba(255,255,255,0.4);fill:none;stroke-width:1.8}
.atm-avatar{width:180px;height:180px;border-radius:50%;margin:0 auto 24px;overflow:hidden;border:3px solid rgba(255,255,255,0.08)}
.atm-avatar img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;display:block}
.atm-card-tag{font-size:11px;color:rgba(255,255,255,0.25);font-family:{{fontBody}};margin-bottom:4px}
.atm-card-name{font-size:18px;font-weight:700;color:#fff;font-family:{{fontHeading}}}
@media(max-width:1024px){.atm-cards{flex-direction:column;align-items:center}.atm-card:nth-child(2),.atm-card:nth-child(3){margin-top:0}}
@media(max-width:768px){.atm{padding:64px 20px}.atm-top{flex-direction:column;gap:16px}.atm-title{text-align:left}}
</style>
<section class="atm"><div class="atm-inner">
<div class="atm-top"><p class="atm-label">{{label}}</p><h2 class="atm-title">{{title}}</h2></div>
<div class="atm-cards">
{{#members}}<div class="atm-card">
<div class="atm-card-top"><span class="atm-card-role">{{role}}</span><div class="atm-card-socials"><span class="atm-card-soc"><svg viewBox="0 0 24 24"><path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-7-8.5L19.5 4H18l-5 6.2L9 4H4z"/></svg></span><span class="atm-card-soc"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></span><span class="atm-card-soc"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/></svg></span></div></div>
<div class="atm-avatar"><img src="{{avatar}}" alt="{{name}}"/></div>
<div class="atm-card-tag">{{tag}}</div>
<div class="atm-card-name">{{name}}</div>
</div>{{/members}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY TESTIMONIALS — Quote, portrait, stats row
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyTestimonials: ComponentDefinition = {
  id: "agency-testimonials",
  category: "testimonials",
  name: "Agency Testimonials",
  description: "Featured testimonial with quote, portrait, brand card and stats row below",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    quote: { type: "longtext", label: "Quote", required: true },
    authorName: { type: "text", label: "Author Name", required: true },
    authorRole: { type: "text", label: "Author Role", required: true },
    authorImage: { type: "image", label: "Author Portrait", required: false },
    stat1: { type: "text", label: "Stat 1 Number", required: false },
    stat1Label: { type: "text", label: "Stat 1 Label", required: false },
    stat2: { type: "text", label: "Stat 2 Number", required: false },
    stat2Label: { type: "text", label: "Stat 2 Label", required: false },
    stat3: { type: "text", label: "Stat 3 Number", required: false },
    stat3Label: { type: "text", label: "Stat 3 Label", required: false },
  },
  defaultContent: {
    label: "Client Feedback",
    title: "Kind Words.",
    subtitle: "Hear directly from the founders, marketers, and product leads we\u2019ve partnered with.",
    quote: "A GenC didn\u2019t just redesign our product \u2014 they rethought how our users experience it. The results spoke for themselves within the first month.",
    authorName: "Rachel Owens",
    authorRole: "Head of Product, Nimbus",
    authorImage: "/images/men-image.jpg",
    stat1: "1.8M+",
    stat1Label: "Users reached",
    stat2: "92%",
    stat2Label: "Conversion lift",
    stat3: "74%",
    stat3Label: "Repeat clients",
  },
  html: `<style>
.ats{background:#f5f5f5;padding:96px 48px}
.ats-inner{max-width:1200px;margin:0 auto}
.ats-top{margin-bottom:48px}
.ats-label{display:flex;align-items:center;gap:8px;font-size:12px;color:#111;font-weight:600;font-family:{{fontBody}};margin-bottom:8px}
.ats-label::before{content:'';width:7px;height:7px;border-radius:50%;background:{{primary}}}
.ats-title{font-size:clamp(48px,8vw,80px);font-weight:900;color:#111;font-family:{{fontHeading}};line-height:1;letter-spacing:-3px}
.ats-subtitle{font-size:13px;color:#888;font-family:{{fontBody}};line-height:1.7;max-width:420px;margin-top:16px}
.ats-card{background:#fff;border-radius:20px;padding:40px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;border:1px solid #eee;margin-bottom:24px}
.ats-quote-col{}
.ats-quote-mark{font-size:48px;color:#ccc;font-family:serif;line-height:1;margin-bottom:16px}
.ats-quote-text{font-size:16px;color:#111;font-family:{{fontBody}};line-height:1.7;font-weight:500}
.ats-quote-text span{color:#999;font-weight:400}
.ats-stars{display:flex;gap:2px;margin-top:20px}
.ats-star{color:#e8a838;font-size:16px}
.ats-world{display:flex;align-items:center;gap:8px;margin-top:24px;padding-top:20px;border-top:1px dashed #ddd}
.ats-world svg{width:24px;height:24px;stroke:#888;fill:none;stroke-width:1.2}
.ats-world-txt{font-size:11px;color:#888;font-family:{{fontBody}};line-height:1.5}
.ats-portrait{border-radius:12px;overflow:hidden;position:relative;min-height:280px}
.ats-portrait img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;display:block;position:absolute;inset:0;z-index:0}
.ats-portrait-info{position:absolute;bottom:16px;left:16px;z-index:2}
.ats-portrait-name{font-size:16px;font-weight:700;color:#fff;font-family:{{fontHeading}}}
.ats-portrait-role{font-size:11px;color:rgba(255,255,255,0.6);font-family:{{fontBody}};margin-top:2px}
.ats-brand-col{display:flex;flex-direction:column;gap:12px}
.ats-brand-card{background:#f5f5f5;border-radius:12px;padding:16px;flex:1;border:1px solid #eee;display:flex;flex-direction:column;justify-content:center;align-items:center}
.ats-brand-card-txt{font-size:13px;font-weight:700;color:#333;font-family:{{fontHeading}}}
.ats-nav{display:flex;gap:8px;justify-content:flex-end}
.ats-nav-btn{width:36px;height:36px;border-radius:50%;border:1px solid #ddd;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}
.ats-nav-btn svg{width:14px;height:14px;stroke:#333;fill:none;stroke-width:2}
.ats-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.ats-stat{background:#fff;border-radius:16px;padding:28px;border:1px solid #eee}
.ats-stat-label{font-size:13px;font-weight:700;color:#111;font-family:{{fontHeading}};margin-bottom:24px}
.ats-stat-num{font-size:clamp(36px,5vw,52px);font-weight:800;color:#111;font-family:{{fontHeading}};letter-spacing:-1px}
.ats-stat-desc{font-size:11px;color:#999;font-family:{{fontBody}};line-height:1.5;margin-top:4px;max-width:180px}
@media(max-width:1024px){.ats-card{grid-template-columns:1fr}.ats-stats{grid-template-columns:1fr}}
@media(max-width:768px){.ats{padding:64px 20px}}
</style>
<section class="ats"><div class="ats-inner">
<div class="ats-top"><p class="ats-label">{{label}}</p><h2 class="ats-title">{{title}}</h2><p class="ats-subtitle">{{subtitle}}</p></div>
<div class="ats-card">
<div class="ats-quote-col">
<div class="ats-quote-mark">\u201C\u201C</div>
<p class="ats-quote-text">{{quote}}</p>
<div class="ats-stars"><span class="ats-star">\u2605</span><span class="ats-star">\u2605</span><span class="ats-star">\u2605</span><span class="ats-star">\u2605</span><span class="ats-star">\u2605</span></div>
<div class="ats-world"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg><div class="ats-world-txt">A GenC\u00AE supports clients<br/>from all over the world</div></div>
</div>
<div class="ats-portrait"><img src="{{authorImage}}" alt="{{authorName}}"/><div class="ats-portrait-info"><div class="ats-portrait-name">{{authorName}}</div><div class="ats-portrait-role">{{authorRole}}</div></div></div>
<div class="ats-brand-col">
<div class="ats-brand-card"><div class="ats-brand-card-txt">ALYN</div></div>
<div class="ats-nav"><span class="ats-nav-btn"><svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></span><span class="ats-nav-btn"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></div>
</div>
</div>
<div class="ats-stats">
<div class="ats-stat"><div class="ats-stat-label">{{stat1Label}}</div><div class="ats-stat-num">{{stat1}}</div></div>
<div class="ats-stat"><div class="ats-stat-label">{{stat2Label}}</div><div class="ats-stat-num">{{stat2}}</div><div class="ats-stat-desc">Clients reported better ROI within 1 month.</div></div>
<div class="ats-stat"><div class="ats-stat-label">{{stat3Label}}</div><div class="ats-stat-num">{{stat3}}</div><div class="ats-stat-desc">Come back for second or third projects.</div></div>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY PROCESS — Numbered step cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyProcess: ComponentDefinition = {
  id: "agency-process",
  category: "features",
  name: "Agency Process",
  description: "Numbered process steps with cards, first dark with image, others light",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    steps: { type: "list", label: "Steps", required: true },
  },
  defaultContent: {
    label: "How we work",
    title: "Clarity at Every Stage",
    subtitle: "No black boxes. We keep you in the loop from first sketch to final deploy.",
    steps: [
      { number: ".01", stepLabel: "Discovery", stepTitle: "Research, Audit and Strategy Alignment", stepImage: "/images/process-phone.png" },
      { number: ".02", stepLabel: "Design Sprint", stepTitle: "Wireframes, Prototypes and Visual Direction" },
      { number: ".03", stepLabel: "Build & Ship", stepTitle: "Development, QA and Launch Support" },
    ],
  },
  html: `<style>
.apr{background:#f5f5f5;padding:96px 48px;border-top:1px solid #e5e5e5}
.apr-inner{max-width:1200px;margin:0 auto}
.apr-top{display:grid;grid-template-columns:auto 1fr;gap:48px;align-items:start;margin-bottom:48px}
.apr-label{display:flex;align-items:center;gap:8px;font-size:12px;color:#111;font-weight:600;font-family:{{fontBody}};padding-top:12px}
.apr-label::before{content:'';width:7px;height:7px;border-radius:50%;background:#111}
.apr-right{}
.apr-title{font-size:clamp(36px,5vw,52px);font-weight:800;color:#111;font-family:{{fontHeading}};line-height:1.15;font-style:italic;letter-spacing:-1px}
.apr-subtitle{font-size:13px;color:#888;font-family:{{fontBody}};line-height:1.7;margin-top:12px;max-width:450px}
.apr-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr;gap:16px}
.apr-card{background:#fff;border-radius:20px;padding:28px;border:1px solid #eee;display:flex;flex-direction:column;justify-content:space-between;min-height:420px;position:relative;overflow:hidden}
.apr-card:first-child{background:#111;border:none}
.apr-card:first-child .apr-card-label,.apr-card:first-child .apr-card-title{color:#fff}
.apr-card:first-child .apr-card-label{color:{{primary}}}
.apr-card:first-child .apr-card-num{color:rgba(255,255,255,0.06)}
.apr-card-img{position:absolute;top:-10%;left:-25%;bottom:0;width:120%;z-index:1}
.apr-card-img img{width:100%!important;height:100%!important;max-width:none!important;object-fit:contain;object-position:left bottom;display:block;mix-blend-mode:multiply}
.apr-card-img img[src=""]{display:none}
.apr-card:nth-child(n+2) .apr-card-img{display:none}
.apr-card-watermark{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:clamp(100px,14vw,180px);font-weight:900;color:rgba(255,255,255,0.04);font-family:{{fontHeading}};white-space:nowrap;z-index:0;letter-spacing:-10px;word-spacing:-40px;display:none}
.apr-card:first-child .apr-card-watermark{display:block}
.apr-card:first-child .apr-card-label,.apr-card:first-child .apr-card-title{position:relative;z-index:2}
.apr-card:first-child .apr-card-num{color:rgba(255,255,255,0.12);z-index:2}
.apr-card-label{font-size:11px;color:{{primary}};font-weight:600;text-transform:capitalize;font-family:{{fontBody}};letter-spacing:0.5px}
.apr-card-title{font-size:20px;font-weight:700;color:#111;font-family:{{fontHeading}};line-height:1.35;margin-top:8px;max-width:200px}
.apr-card-num{font-size:clamp(80px,10vw,120px);font-weight:900;color:rgba(0,0,0,0.04);font-family:{{fontHeading}};position:absolute;bottom:-10px;right:12px;line-height:1;letter-spacing:-3px}
@media(max-width:768px){.apr{padding:64px 20px}.apr-grid{grid-template-columns:1fr}.apr-top{grid-template-columns:1fr}}
</style>
<section class="apr"><div class="apr-inner">
<div class="apr-top"><p class="apr-label">{{label}}</p><div class="apr-right"><h2 class="apr-title">{{title}}</h2><p class="apr-subtitle">{{subtitle}}</p></div></div>
<div class="apr-grid">
{{#steps}}<div class="apr-card"><span class="apr-card-watermark">A GenC</span><div class="apr-card-img"><img src="{{stepImage}}" alt=""/></div><div style="position:relative;z-index:2"><div class="apr-card-label">{{stepLabel}}</div><div class="apr-card-title">{{stepTitle}}</div></div><div class="apr-card-num">{{number}}</div></div>{{/steps}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY PRICING — Dark bg, 3 tier pricing cards with features
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyPricing: ComponentDefinition = {
  id: "agency-pricing",
  category: "pricing",
  name: "Agency Pricing",
  description: "Dark pricing section with 3 tiers, duration badges, feature checklists",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    plans: { type: "list", label: "Plans", required: true },
  },
  defaultContent: {
    label: "Investment",
    title: "Pricing",
    plans: [
      { planName: "Starter", duration: "1-2 Weeks", price: "$1,200", period: "/Project", desc: "Perfect for landing pages, small sites, or quick design sprints.", ctaLabel: "Get Started", btnStyle: "background:#fff;color:#111", featureList: [{ item: "Single-page or micro-site design" }, { item: "Responsive build in Figma" }, { item: "Two revision rounds included" }, { item: "Delivered within 10 business days" }, { item: "Async communication via Slack" }] },
      { planName: "Growth", duration: "3-4 Weeks", price: "$4,800", period: "/Project", desc: "For brands ready to level up their digital presence.", ctaLabel: "Get Started", btnStyle: "background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.2)", featureList: [{ item: "Multi-page site or web app design" }, { item: "Brand system and component library" }, { item: "Interactive prototype delivery" }, { item: "Weekly check-in calls" }, { item: "Priority turnaround" }] },
      { planName: "Enterprise", duration: "2-5 Months", price: "Custom", period: "", desc: "End-to-end engagements for complex products and platforms.", ctaLabel: "Talk to Us", btnStyle: "background:#222;color:#fff", featureList: [{ item: "Full discovery and strategy phase" }, { item: "Design system + development handoff" }, { item: "Dedicated project manager" }, { item: "Phased milestone delivery" }, { item: "Post-launch optimization support" }] },
    ],
  },
  html: `<style>
.aprc{background:#0a0a0a;padding:96px 48px}
.aprc-inner{max-width:1200px;margin:0 auto}
.aprc-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px}
.aprc-left{}
.aprc-label{display:flex;align-items:center;gap:8px;font-size:12px;color:{{primary}};font-weight:600;font-family:{{fontBody}};margin-bottom:8px}
.aprc-label::before{content:'';width:7px;height:7px;border-radius:50%;background:{{primary}}}
.aprc-title{font-size:clamp(48px,8vw,80px);font-weight:900;color:#fff;font-family:{{fontHeading}};line-height:1;letter-spacing:-3px}
.aprc-title sup{font-size:0.2em;color:#666;font-weight:400;vertical-align:super}
.aprc-toggle{display:flex;background:#222;border-radius:40px;padding:4px}
.aprc-toggle span{padding:10px 24px;font-size:12px;color:rgba(255,255,255,0.5);font-family:{{fontBody}};border-radius:36px;font-weight:600}
.aprc-toggle span:first-child{background:#fff;color:#111}
.aprc-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;margin-bottom:1px}
.aprc-card{background:#141414;border-radius:0;padding:32px;border:1px solid rgba(255,255,255,0.06)}
.aprc-card:first-child{border-radius:16px 0 0 0}
.aprc-card:last-child{border-radius:0 16px 0 0}
.aprc-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.aprc-card-name{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:#fff;font-family:{{fontBody}}}
.aprc-card-name::before{content:'';width:6px;height:6px;border-radius:50%;background:#fff}
.aprc-card-dur{font-size:11px;color:rgba(255,255,255,0.4);padding:6px 14px;border:1px solid rgba(255,255,255,0.1);border-radius:20px;font-family:{{fontBody}}}
.aprc-card-price{font-size:clamp(36px,5vw,48px);font-weight:800;color:#fff;font-family:{{fontHeading}};letter-spacing:-1px;margin-bottom:4px}
.aprc-card-price span{font-size:0.35em;color:rgba(255,255,255,0.35);font-weight:400}
.aprc-card-desc{font-size:12px;color:rgba(255,255,255,0.3);font-family:{{fontBody}};line-height:1.6;margin-bottom:24px}
.aprc-card-btn{display:block;width:100%;padding:16px;text-align:center;border-radius:14px;font-size:13px;font-weight:600;text-decoration:none;font-family:{{fontBody}};box-sizing:border-box}
.aprc-feat{background:#141414;border:1px solid rgba(255,255,255,0.06);border-top:none;padding:28px 32px}
.aprc-feat:first-of-type{border-top:1px solid rgba(255,255,255,0.06)}
.aprc-feat-title{font-size:13px;font-weight:700;color:#fff;font-family:{{fontBody}};margin-bottom:20px}
.aprc-feat-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px}
.aprc-feat-list li{display:flex;align-items:center;gap:10px;font-size:12px;color:rgba(255,255,255,0.45);font-family:{{fontBody}}}
.aprc-feat-list li::before{content:'\u2713';width:20px;height:20px;border-radius:50%;background:rgba(74,222,128,0.1);color:#4ade80;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0}
@media(max-width:768px){.aprc{padding:64px 20px}.aprc-grid{grid-template-columns:1fr}.aprc-card:first-child,.aprc-card:last-child{border-radius:0}}
</style>
<section class="aprc"><div class="aprc-inner">
<div class="aprc-top"><div class="aprc-left"><p class="aprc-label">{{label}}</p><h2 class="aprc-title">{{title}} <sup>(3)</sup></h2></div><div class="aprc-toggle"><span>Monthly</span><span>Yearly</span></div></div>
<div class="aprc-grid">
{{#plans}}<div class="aprc-card">
<div class="aprc-card-top"><span class="aprc-card-name">{{planName}}</span><span class="aprc-card-dur">{{duration}}</span></div>
<div class="aprc-card-price">{{price}}<span>{{period}}</span></div>
<p class="aprc-card-desc">{{desc}}</p>
<a href="#contact" class="aprc-card-btn" style="{{btnStyle}}">{{ctaLabel}}</a>
</div>{{/plans}}
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px">
{{#plans}}<div class="aprc-feat">
<div class="aprc-feat-title">What's included:</div>
<ul class="aprc-feat-list">{{#featureList}}<li>{{item}}</li>{{/featureList}}</ul>
</div>{{/plans}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY FAQ — Centered accordion, light bg
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyFaq: ComponentDefinition = {
  id: "agency-faq",
  category: "faq",
  name: "Agency FAQ",
  description: "Centered FAQ with large heading, expandable accordion items",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    faqs: { type: "list", label: "FAQ Items", required: true },
  },
  defaultContent: {
    label: "Questions & Answers",
    title: "Got Questions?",
    faqs: [
      { question: "How does a typical project kick off?", answer: "We start with a free 30-minute discovery call to understand your goals, timeline, and budget before sending a tailored proposal." },
      { question: "What is your average turnaround time?", answer: "" },
      { question: "Do you work with startups or only large companies?", answer: "" },
      { question: "Can I request revisions after delivery?", answer: "" },
      { question: "What happens if the project scope changes?", answer: "" },
    ],
  },
  html: `<style>
.afq{background:#f5f5f5;padding:96px 48px}
.afq-inner{max-width:700px;margin:0 auto;text-align:center}
.afq-label{display:flex;align-items:center;gap:8px;font-size:12px;color:#111;font-weight:600;font-family:{{fontBody}};justify-content:center;margin-bottom:12px}
.afq-label::before{content:'';width:7px;height:7px;border-radius:50%;background:#111}
.afq-title{font-size:clamp(42px,7vw,72px);font-weight:900;color:#111;font-family:{{fontHeading}};line-height:1;letter-spacing:-2px;margin-bottom:48px}
.afq-list{text-align:left;display:flex;flex-direction:column;gap:8px}
.afq-item{background:#fff;border-radius:14px;padding:20px 24px;border:1px solid #eee}
.afq-item-top{display:flex;justify-content:space-between;align-items:center}
.afq-item-q{font-size:16px;font-weight:600;color:#111;font-family:{{fontHeading}}}
.afq-item-icon{width:32px;height:32px;border-radius:50%;border:1px solid #ddd;display:flex;align-items:center;justify-content:center;font-size:18px;color:#888;flex-shrink:0}
.afq-item-a{font-size:13px;color:#888;font-family:{{fontBody}};line-height:1.7;margin-top:12px;max-width:500px}
.afq-item-a:empty{display:none}
@media(max-width:768px){.afq{padding:64px 20px}}
</style>
<section class="afq"><div class="afq-inner">
<p class="afq-label">{{label}}</p>
<h2 class="afq-title">{{title}}</h2>
<div class="afq-list">
{{#faqs}}<div class="afq-item"><div class="afq-item-top"><span class="afq-item-q">{{question}}</span><span class="afq-item-icon">\u2014</span></div><p class="afq-item-a">{{answer}}</p></div>{{/faqs}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY BLOG — 3-column insight cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyBlog: ComponentDefinition = {
  id: "agency-blog",
  category: "gallery",
  name: "Agency Blog",
  description: "3-column blog/insight cards with author, date, image and title",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    posts: { type: "list", label: "Posts", required: true },
  },
  defaultContent: {
    label: "From the Blog",
    title: "Perspectives on Design & Growth.",
    subtitle: "A GenC shares lessons learned from building brands, shipping products, and everything in between.",
    posts: [
      { author: "Sara Mitchell", authorRole: "Creative Dir.", date: "Mar 2026", postTitle: "Why Brand Strategy Should Come Before Any Visual Design Work", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop" },
      { author: "David Park", authorRole: "Lead Dev", date: "Jan 2026", postTitle: "Performance Budgets: The Hidden Driver of Great User Experience", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop" },
      { author: "Nina Alvarez", authorRole: "Strategist", date: "Nov 2025", postTitle: "Storytelling in UI: How Micro-Copy Shapes Product Perception", image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&h=350&fit=crop" },
    ],
  },
  html: `<style>
.abg{background:#f5f5f5;padding:96px 48px;border-top:1px solid #e5e5e5}
.abg-inner{max-width:1200px;margin:0 auto}
.abg-top{display:grid;grid-template-columns:auto 1fr;gap:48px;align-items:start;margin-bottom:48px}
.abg-label{display:flex;align-items:center;gap:8px;font-size:12px;color:#111;font-weight:600;font-family:{{fontBody}};padding-top:8px}
.abg-label::before{content:'';width:7px;height:7px;border-radius:50%;background:{{primary}}}
.abg-right{}
.abg-title{font-size:clamp(32px,4.5vw,48px);font-weight:800;color:#111;font-family:{{fontHeading}};line-height:1.2;font-style:italic;letter-spacing:-1px}
.abg-subtitle{font-size:13px;color:#888;font-family:{{fontBody}};line-height:1.7;margin-top:12px;max-width:420px}
.abg-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px}
.abg-card{}
.abg-card-author{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.abg-card-author-info{display:flex;align-items:center;gap:10px}
.abg-card-avatar{width:32px;height:32px;border-radius:50%;background:#ddd;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#666;font-family:{{fontBody}}}
.abg-card-name{font-size:12px;font-weight:700;color:#111;font-family:{{fontBody}}}
.abg-card-role{font-size:10px;color:{{primary}};font-family:{{fontBody}}}
.abg-card-date{font-size:11px;color:#999;font-family:{{fontBody}};display:flex;align-items:center;gap:4px}
.abg-card-img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;margin-bottom:14px}
.abg-card-title{font-size:15px;font-weight:700;color:#111;font-family:{{fontHeading}};line-height:1.5}
.abg-marquee{margin-top:64px;overflow:hidden;white-space:nowrap}
.abg-marquee-txt{font-size:clamp(48px,8vw,100px);font-weight:900;color:rgba(0,0,0,0.05);font-family:{{fontHeading}};letter-spacing:-2px;display:inline-block}
@media(max-width:768px){.abg{padding:64px 20px}.abg-grid{grid-template-columns:1fr}.abg-top{grid-template-columns:1fr}}
</style>
<section class="abg"><div class="abg-inner">
<div class="abg-top"><p class="abg-label">{{label}}</p><div class="abg-right"><h2 class="abg-title">{{title}}</h2><p class="abg-subtitle">{{subtitle}}</p></div></div>
<div class="abg-grid">
{{#posts}}<div class="abg-card">
<div class="abg-card-author"><div class="abg-card-author-info"><div class="abg-card-avatar">WH</div><div><div class="abg-card-name">{{author}}</div><div class="abg-card-role">{{authorRole}}</div></div></div><span class="abg-card-date">\u23F0 {{date}}</span></div>
<img class="abg-card-img" src="{{image}}" alt="{{postTitle}}"/>
<h3 class="abg-card-title">{{postTitle}}</h3>
</div>{{/posts}}
</div>
<div class="abg-marquee"><span class="abg-marquee-txt">Contact Us \u00B7 Contact Us \u00B7 Contact Us \u00B7 Contact Us \u00B7</span></div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY CONTACT — Dark bg, white form card
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyContact: ComponentDefinition = {
  id: "agency-contact",
  category: "contact",
  name: "Agency Contact",
  description: "Dark contact section with centered heading and white form card",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    ctaText: { type: "text", label: "Submit Button Text", required: false },
  },
  defaultContent: {
    label: "Start a conversation",
    title: "Ready to Build Something?",
    subtitle: "Drop us a line about your next project \u2014 we\u2019ll get back within 24 hours.",
    ctaText: "Send Message",
  },
  html: `<style>
.act{background:#111;padding:48px}
.act-wrap{background:#0a0a0a;border-radius:32px;padding:80px 48px;text-align:center}
.act-label{display:flex;align-items:center;gap:8px;font-size:12px;color:#fff;font-weight:600;font-family:{{fontBody}};justify-content:center;margin-bottom:16px}
.act-label::before{content:'';width:7px;height:7px;border-radius:50%;background:#fff}
.act-title{font-size:clamp(32px,5vw,48px);font-weight:800;color:#fff;font-family:{{fontHeading}};font-style:italic;line-height:1.2;margin-bottom:12px;letter-spacing:-1px}
.act-subtitle{font-size:13px;color:rgba(255,255,255,0.4);font-family:{{fontBody}};margin-bottom:12px}
.act-badges{display:flex;gap:24px;justify-content:center;margin-bottom:40px}
.act-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.6);font-family:{{fontBody}}}
.act-badge svg{width:16px;height:16px;stroke:rgba(255,255,255,0.5);fill:none;stroke-width:1.5}
.act-form{background:#fff;border-radius:24px;padding:40px;max-width:560px;margin:0 auto;text-align:left}
.act-field{margin-bottom:28px}
.act-field-label{font-size:12px;font-weight:600;color:{{primary}};font-family:{{fontBody}};margin-bottom:8px}
.act-field input,.act-field textarea{width:100%;border:none;border-bottom:1px solid #e5e5e5;padding:10px 0;font-size:14px;color:#111;font-family:{{fontBody}};background:transparent;outline:none;box-sizing:border-box}
.act-field textarea{min-height:60px;resize:vertical}
.act-submit{display:block;width:100%;padding:18px;background:#111;color:#fff;border:none;border-radius:16px;font-size:14px;font-weight:600;font-family:{{fontBody}};cursor:pointer;margin-top:12px;text-align:center;text-decoration:none}
.act-avail{display:inline-flex;align-items:center;gap:8px;background:#222;border-radius:40px;padding:12px 24px;margin-top:32px}
.act-avail-dot{width:8px;height:8px;border-radius:50%;background:#4ade80}
.act-avail-txt{font-size:12px;color:#fff;font-family:{{fontBody}};font-weight:600}
@media(max-width:768px){.act{padding:20px}.act-wrap{padding:48px 20px;border-radius:20px}.act-form{padding:28px}}
</style>
<section class="act"><div class="act-wrap">
<p class="act-label">{{label}}</p>
<h2 class="act-title">{{title}}</h2>
<p class="act-subtitle">{{subtitle}}</p>
<div class="act-badges"><span class="act-badge"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> 24/7 Full Time Support</span><span class="act-badge"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg> 365/12 Full Time Support</span></div>
<div class="act-form">
<div class="act-field"><label class="act-field-label">Your Email*</label><input type="email" placeholder="Enter the Email"/></div>
<div class="act-field"><label class="act-field-label">Your Phone*</label><input type="tel" placeholder="Enter your phone number"/></div>
<div class="act-field"><label class="act-field-label">Message</label><textarea placeholder="Let us know about your project"></textarea></div>
<a href="#" class="act-submit">{{ctaText}}</a>
</div>
<div class="act-avail"><span class="act-avail-dot"></span><span class="act-avail-txt">Available for work</span></div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AGENCY FOOTER — Light bg, image, nav columns, watermark
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyFooter: ComponentDefinition = {
  id: "agency-footer",
  category: "footer",
  name: "Agency Footer",
  description: "Light footer with image, navigation columns, email, and large brand watermark",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    email: { type: "text", label: "Email", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
    footerImage: { type: "image", label: "Footer Image", required: false },
  },
  defaultContent: {
    brand: "A GenC",
    email: "hello@agenc.studio",
    copyright: "2026 A GenC Studio. All Rights Reserved",
    footerImage: "/images/footer-image.jfif",
  },
  html: `<style>
.aft{background:#f5f5f5;padding:80px 48px 0;overflow:hidden}
.aft-inner{max-width:1200px;margin:0 auto}
.aft-grid{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:48px;margin-bottom:48px}
.aft-img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:8px;display:block;max-width:300px}
.aft-nav{display:flex;flex-direction:column;gap:8px}
.aft-nav-title{font-size:12px;color:#888;font-family:{{fontBody}};margin-bottom:12px;font-weight:500}
.aft-nav a{font-size:18px;font-weight:700;color:#111;text-decoration:none;font-family:{{fontHeading}};padding:4px 0;display:block}
.aft-nav a:hover{color:#666}
.aft-connect{display:flex;align-items:center;gap:24px;margin-bottom:48px}
.aft-connect-label{display:flex;align-items:center;gap:8px;font-size:12px;color:#111;font-weight:600;font-family:{{fontBody}}}
.aft-connect-label::before{content:'';width:7px;height:7px;border-radius:50%;background:#111}
.aft-email{font-size:16px;font-weight:600;color:#111;text-decoration:underline;font-family:{{fontBody}}}
.aft-bottom{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-top:1px solid #ddd}
.aft-copy{font-size:11px;color:#888;font-family:{{fontBody}}}
.aft-links{display:flex;gap:24px;align-items:center}
.aft-links a{font-size:11px;color:#888;text-decoration:none;font-family:{{fontBody}}}
.aft-up{width:28px;height:28px;border-radius:50%;border:1px solid #ddd;display:flex;align-items:center;justify-content:center;cursor:pointer;background:transparent;margin-left:8px}
.aft-up svg{width:12px;height:12px;stroke:#888;fill:none;stroke-width:2}
.aft-watermark{font-size:clamp(100px,18vw,220px);font-weight:900;color:#111;font-family:{{fontHeading}};text-align:center;line-height:0.8;padding:16px 0 0;letter-spacing:-6px;word-spacing:-0.15em;overflow:hidden;margin:0 -48px}
.aft-watermark sup{font-size:0.15em;vertical-align:top;position:relative;top:-0.1em;font-weight:400;letter-spacing:0;line-height:1}
@media(max-width:768px){.aft{padding:48px 20px 0}.aft-grid{grid-template-columns:1fr}.aft-bottom{flex-direction:column;gap:8px;text-align:center}.aft-watermark{margin:0 -20px;font-size:80px!important;letter-spacing:-3px}}
</style>
<footer class="aft"><div class="aft-inner">
<div class="aft-grid">
<img class="aft-img" src="{{footerImage}}" alt=""/>
<div class="aft-nav"><span class="aft-nav-title">Navigation</span><a href="#">Home</a><a href="#">Studio</a><a href="#">Projects</a><a href="#">404</a></div>
<div class="aft-nav"><span class="aft-nav-title">Social Media</span><a href="#">Twitter</a><a href="#">Dribbble</a><a href="#">Instagram</a><a href="#">Facebook</a></div>
</div>
<div class="aft-connect"><span class="aft-connect-label">Stay Connected</span><a href="mailto:{{email}}" class="aft-email">{{email}}</a></div>
<div class="aft-bottom"><span class="aft-copy">\u00A9{{copyright}}</span><div class="aft-links"><a href="#">Terms of Use</a><a href="#">Privacy Policy</a><span class="aft-up"><svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg></span></div></div>
<div class="aft-watermark">{{brand}}<sup>\u00AE</sup></div>
</div></footer>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const agencyComponents: ComponentDefinition[] = [
  agencyNav,
  agencyHero,
  agencyAbout,
  agencyProjects,
  agencyTeam,
  agencyTestimonials,
  agencyProcess,
  agencyPricing,
  agencyFaq,
  agencyBlog,
  agencyContact,
  agencyFooter,
];
