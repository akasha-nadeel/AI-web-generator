import { ComponentDefinition } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO NAV — Transparent overlay, "Portilo." italic brand + CONTACT pill
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioNav: ComponentDefinition = {
  id: "portfolio-nav",
  category: "navigation",
  name: "Portfolio Navigation",
  description: "Transparent nav overlay with italic brand and bordered contact button",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: false },
  },
  defaultContent: {
    brand: "Portilo",
    ctaText: "Contact",
  },
  html: `<style>
.pnav{position:absolute;top:0;left:0;right:0;z-index:100;padding:24px 48px}
.pnav-inner{display:flex;align-items:center;justify-content:space-between}
.pnav-brand{font-size:24px;font-weight:700;color:#fff;text-decoration:none;font-family:{{fontHeading}};font-style:italic}
.pnav-brand span{color:{{primary}}}
.pnav-cta{padding:10px 28px;border-radius:6px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.05);color:#fff;text-decoration:none;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:2px;font-family:{{fontBody}};backdrop-filter:blur(4px)}
@media(max-width:768px){.pnav{padding:16px 20px}.pnav-cta{padding:8px 18px;font-size:10px}}
</style>
<nav class="pnav"><div class="pnav-inner">
<a href="#" class="pnav-brand">{{brand}}<span>.</span></a>
<a href="#contact" class="pnav-cta">{{ctaText}}</a>
</div></nav>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO HERO — Full-screen portrait background image
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioHero: ComponentDefinition = {
  id: "portfolio-hero",
  category: "hero",
  name: "Portfolio Hero",
  description: "Full-screen hero with portrait background, massive name, availability, bio, rate, and hire CTA",
  source: "custom",
  slots: {
    heroImage: { type: "image", label: "Hero Background Image", required: true },
    availableText: { type: "text", label: "Availability Text", required: false },
    name: { type: "text", label: "Display Name", required: true },
    role: { type: "text", label: "Role / Title", required: true },
    location: { type: "text", label: "Location", required: false },
    bio: { type: "longtext", label: "Bio Text", required: true },
    rate: { type: "text", label: "Hourly Rate", required: false },
    rateLabel: { type: "text", label: "Rate Label", required: false },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
  },
  defaultContent: {
    heroImage: "/images/portfolio-hero.png",
    availableText: "Available for work",
    name: "LEON",
    role: "Product Designer",
    location: "Bangladesh",
    bio: "LEON \u2014 PRODUCT DESIGNER, I'M SPECIALIZES IN WEBSITE DESIGN, PROTOTYPING, WIRE-FRAMING, AND DESIGN SYSTEMS, TURNING COMPLEX IDEAS INTO CLEAN, FUNCTIONAL INTERFACES DESIGN.",
    rate: "$75",
    rateLabel: "Hourly Rate",
    ctaText: "HIRE ME",
  },
  html: `<style>
html,body{background:#111!important}
.ph{position:relative;width:100%;height:100vh;overflow:hidden}
.ph-bg{position:absolute;inset:0;z-index:0}
.ph-bg img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;object-position:center 20%;display:block}
.ph-content{position:relative;z-index:10;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:140px 48px 48px;box-sizing:border-box}
.ph-avail{display:inline-flex;align-items:center;gap:8px;margin-bottom:28px}
.ph-avail-dot{width:8px;height:8px;border-radius:50%;background:{{primary}};box-shadow:0 0 10px {{primary}}}
.ph-avail-txt{font-size:13px;color:rgba(255,255,255,0.5);font-family:{{fontBody}};letter-spacing:0.3px}
.ph-name{font-size:clamp(80px,14vw,150px);font-weight:900;color:#fff;line-height:0.85;margin:0 0 24px;font-family:{{fontHeading}};text-transform:uppercase;letter-spacing:-3px}
.ph-role{font-size:16px;color:rgba(255,255,255,0.45);font-family:{{fontBody}};display:flex;align-items:center;gap:12px}
.ph-role-line{width:28px;height:2px;background:{{primary}}}
.ph-mid{display:flex;align-items:flex-end;justify-content:space-between;padding:0 0 0;max-width:520px}
.ph-quote{font-size:36px;color:rgba(255,255,255,0.12);font-family:serif;line-height:1;margin-bottom:14px}
.ph-bio{font-size:10.5px;color:rgba(255,255,255,0.28);line-height:1.8;text-transform:uppercase;letter-spacing:0.5px;max-width:400px;font-family:{{fontBody}}}
.ph-rate-block{position:absolute;bottom:32px;right:48px;text-align:right;z-index:10}
.ph-rate-num{font-size:clamp(48px,6vw,72px);font-weight:800;color:#fff;font-family:{{fontHeading}};line-height:1;letter-spacing:-1px}
.ph-rate-num small{font-size:0.35em;color:rgba(255,255,255,0.35);font-weight:400}
.ph-rate-label{font-size:12px;color:rgba(255,255,255,0.3);letter-spacing:1px;font-family:{{fontBody}};margin-top:2px}
.ph-social{position:absolute;right:16px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:2px;z-index:20}
.ph-social-btn{width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,0.06);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;text-decoration:none}
.ph-social-btn svg{width:16px;height:16px;stroke:rgba(255,255,255,0.45);fill:none;stroke-width:1.8}
.ph-cta-wrap{margin-top:24px}
.ph-cta{display:flex;align-items:center;justify-content:center;width:100%;height:54px;border-radius:16px;color:#fff;text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:4px;font-family:{{fontBody}};background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(6px)}
@media(max-width:768px){.ph-content{padding:80px 20px 32px}.ph-name{font-size:56px!important}.ph-rate-block{position:relative;bottom:auto;right:auto;text-align:left;margin-top:24px}.ph-social{display:none}.ph-mid{flex-direction:column;align-items:flex-start}}
</style>
<section class="ph">
<div class="ph-bg"><img src="{{heroImage}}" alt=""/></div>
<div class="ph-content">
<div>
<div class="ph-avail"><span class="ph-avail-dot"></span><span class="ph-avail-txt">{{availableText}}</span></div>
<h1 class="ph-name">{{name}}</h1>
<p class="ph-role"><span class="ph-role-line"></span> {{role}}, {{location}}</p>
</div>
<div class="ph-mid">
<div>
<div class="ph-quote">\u275D</div>
<p class="ph-bio">{{bio}}</p>
<div class="ph-cta-wrap"><a href="#contact" class="ph-cta">{{ctaText}}</a></div>
</div>
</div>
</div>
<div class="ph-rate-block"><div class="ph-rate-num">{{rate}}<small>.00</small></div><div class="ph-rate-label">{{rateLabel}}</div></div>
<div class="ph-social">
<a href="#" class="ph-social-btn"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="rgba(255,255,255,0.45)" stroke="none"/></svg></a>
<a href="#" class="ph-social-btn"><svg viewBox="0 0 24 24"><path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-7-8.5L19.5 4H18l-5 6.2L9 4H4z"/></svg></a>
<a href="#" class="ph-social-btn"><svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="rgba(255,255,255,0.45)" stroke="none"/></svg></a>
</div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO SKILLS — Orange glow bg, italic heading, skill cards with
// diagonal-hatched percentage, progress bar (Image 18)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioSkills: ComponentDefinition = {
  id: "portfolio-skills",
  category: "features",
  name: "Portfolio Skills",
  description: "About section with skill percentage cards, diagonal-hatch pattern, orange glow background",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    accentText: { type: "text", label: "Accent Text (colored)", required: false },
    skills: { type: "list", label: "Skills", required: true },
  },
  defaultContent: {
    label: "//ABOUT ME",
    title: "My Experience And Expertise With Design Tools Used",
    accentText: "Through Out My Career.",
    skills: [
      { name: "Website Design", number: "/01", description: "Scalable UI Components", percentage: "90" },
      { name: "App UI Design", number: "/02", description: "Device-Friendly Layouts", percentage: "75" },
      { name: "Prototyping", number: "/03", description: "Add Motion And Transitions", percentage: "90" },
      { name: "Web Flow/ Framer Dev", number: "/04", description: "Build Dynamic Sites", percentage: "85" },
    ],
  },
  html: `<style>
.psk{position:relative;background:#111;padding:96px 48px;overflow:hidden}
.psk-glow{position:absolute;top:-150px;right:-80px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.25) 0%,rgba(249,115,22,0.08) 40%,transparent 70%);pointer-events:none}
.psk-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.psk-label{font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:2px;margin-bottom:20px;font-family:{{fontBody}}}
.psk-title{font-size:clamp(32px,5vw,52px);font-weight:400;color:rgba(255,255,255,0.75);line-height:1.2;margin-bottom:56px;font-family:{{fontHeading}};font-style:italic;max-width:800px}
.psk-title span{color:{{primary}}}
.psk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.psk-card{border:none;border-radius:0;overflow:hidden}
.psk-card-top{padding:16px 0 12px}
.psk-card-row{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:2px}
.psk-card-name{font-size:12px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.5px;font-family:{{fontHeading}}}
.psk-card-num{font-size:12px;color:rgba(255,255,255,0.2);font-family:{{fontBody}}}
.psk-card-desc{font-size:11px;color:rgba(255,255,255,0.25);font-family:{{fontBody}}}
.psk-card-pct-wrap{background:#1c1c1c;border:1px solid rgba(255,255,255,0.06);padding:28px 20px 0;position:relative;overflow:hidden}
.psk-card-hatch{position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px);pointer-events:none}
.psk-card-pct{font-size:clamp(56px,6vw,80px);font-weight:300;color:rgba(255,255,255,0.85);font-family:{{fontHeading}};line-height:1;position:relative;z-index:1}
.psk-card-pct span{font-size:0.5em;color:rgba(255,255,255,0.4)}
.psk-bar{height:20px;background:rgba(255,255,255,0.04);margin-top:16px;position:relative;z-index:1}
.psk-bar-fill{height:100%;background:{{primary}}}
@media(max-width:1024px){.psk-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.psk{padding:64px 20px}.psk-grid{grid-template-columns:1fr}}
</style>
<section class="psk">
<div class="psk-glow"></div>
<div class="psk-inner">
<p class="psk-label">{{label}}</p>
<h2 class="psk-title">{{title}} <span>{{accentText}}</span></h2>
<div class="psk-grid">
{{#skills}}<div class="psk-card">
<div class="psk-card-top"><div class="psk-card-row"><span class="psk-card-name">{{name}}</span><span class="psk-card-num">{{number}}</span></div><span class="psk-card-desc">{{description}}</span></div>
<div class="psk-card-pct-wrap"><div class="psk-card-hatch"></div><div class="psk-card-pct">{{percentage}}<span>%</span></div><div class="psk-bar"><div class="psk-bar-fill" style="width:{{percentage}}%"></div></div></div>
</div>{{/skills}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO SERVICES — Left stacked list + right preview card (Image 19)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioServices: ComponentDefinition = {
  id: "portfolio-services",
  category: "features",
  name: "Portfolio Services",
  description: "Stacked service list on left with preview card on right, tags row",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    previewImage: { type: "image", label: "Preview Image", required: false },
    previewDesc: { type: "longtext", label: "Preview Description", required: false },
    services: { type: "list", label: "Services", required: true },
  },
  defaultContent: {
    label: "//WHAT I DO?",
    previewImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
    previewDesc: "This Project Involved The End-To-End UI/UX Design Of A Modern SaaS (Software As A Service) Platform, Focusing On Usability, Responsiveness, And Conversion Optimization.",
    services: [
      { name: "Web Design" },
      { name: "Web Development" },
      { name: "App Design" },
      { name: "UI/UX Research" },
      { name: "Branding" },
      { name: "Web Development" },
    ],
  },
  html: `<style>
.psv{background:#111;padding:96px 48px;border-top:1px solid rgba(255,255,255,0.06)}
.psv-inner{max-width:1200px;margin:0 auto}
.psv-layout{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.psv-list{display:flex;flex-direction:column;gap:4px;padding-top:20px}
.psv-item{font-size:clamp(32px,4vw,52px);font-weight:400;color:rgba(255,255,255,0.2);font-family:{{fontHeading}};font-style:italic;padding:6px 0;cursor:default;transition:color .3s}
.psv-item:hover{color:#fff;font-weight:700;font-style:normal}
.psv-right{}
.psv-preview-img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;border-radius:4px}
.psv-sep{width:100%;height:1px;background:rgba(255,255,255,0.1);margin:24px 0}
.psv-preview-about{font-size:12px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;font-family:{{fontHeading}}}
.psv-preview-desc{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.8;font-family:{{fontBody}}}
.psv-tags-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.psv-tags-label{font-size:12px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:2px;font-family:{{fontHeading}}}
.psv-tag{font-size:10px;font-weight:600;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;padding:8px 18px;border:1px solid rgba(255,255,255,0.15);border-radius:20px;font-family:{{fontBody}}}
.psv-tag-active{border-color:{{primary}};color:{{primary}}}
@media(max-width:768px){.psv{padding:64px 20px}.psv-layout{grid-template-columns:1fr}}
</style>
<section class="psv"><div class="psv-inner">
<div class="psv-layout">
<div class="psv-list">
{{#services}}<div class="psv-item">{{name}}</div>{{/services}}
</div>
<div class="psv-right">
<img class="psv-preview-img" src="{{previewImage}}" alt="Preview"/>
<div class="psv-sep"></div>
<p class="psv-preview-about">About</p>
<p class="psv-preview-desc">{{previewDesc}}</p>
<div class="psv-sep"></div>
<div class="psv-tags-row"><span class="psv-tags-label">Tags</span><span class="psv-tag">UI</span><span class="psv-tag psv-tag-active">App Design</span><span class="psv-tag">UX Design</span></div>
</div>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO PROJECTS — Split layout: image left, text right (Image 20)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioProjects: ComponentDefinition = {
  id: "portfolio-projects",
  category: "gallery",
  name: "Portfolio Projects",
  description: "Split layout with project card on left and heading/CTA on right",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    ctaText: { type: "text", label: "CTA Button Text", required: false },
    projects: { type: "list", label: "Projects", required: true },
  },
  defaultContent: {
    label: "//RECENT WORK",
    title: "My Recent Project That I Done.",
    subtitle: "I Start By Understanding The User Needs And Mapping Out The App Flow Through Wireframes.",
    ctaText: "SEE ALL OF MY WORK",
    projects: [
      { title: "Project Title Goes Here", description: "About Project By Understanding The User Needs And Mapping Out The App Flow Through Wireframes.", image: "/images/portfolio-project.png" },
    ],
  },
  html: `<style>
.ppj{background:#0d0d0d;padding:96px 48px;border-top:1px solid rgba(255,255,255,0.06)}
.ppj-inner{max-width:1200px;margin:0 auto}
.ppj-split{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center}
.ppj-card{border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;background:#111}
.ppj-card-badge{display:inline-block;padding:6px 14px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;font-size:10px;font-weight:700;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1.5px;font-family:{{fontBody}};margin:20px 20px 12px}
.ppj-card-desc{font-size:11px;color:rgba(255,255,255,0.3);line-height:1.7;text-transform:uppercase;letter-spacing:0.5px;padding:0 20px 16px;font-family:{{fontBody}};max-width:300px}
.ppj-card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}
.ppj-card-title{padding:16px 20px;font-size:13px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:1px;font-family:{{fontHeading}}}
.ppj-right{text-align:left}
.ppj-label{font-size:12px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;font-family:{{fontBody}}}
.ppj-title{font-size:clamp(32px,4.5vw,48px);font-weight:400;color:#fff;font-family:{{fontHeading}};font-style:italic;line-height:1.2;margin-bottom:20px}
.ppj-subtitle{font-size:13px;color:rgba(255,255,255,0.3);line-height:1.7;font-family:{{fontBody}};margin-bottom:32px}
.ppj-cta{display:inline-block;padding:14px 32px;background:{{primary}};color:#fff;text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;font-family:{{fontBody}};border-radius:4px;margin-bottom:20px}
.ppj-next{display:inline-flex;align-items:center;gap:8px;padding:10px 24px;border:1px solid rgba(255,255,255,0.12);border-radius:4px;color:rgba(255,255,255,0.4);text-decoration:none;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;font-family:{{fontBody}};margin-left:12px}
@media(max-width:768px){.ppj{padding:64px 20px}.ppj-split{grid-template-columns:1fr}}
</style>
<section class="ppj"><div class="ppj-inner">
{{#projects}}<div class="ppj-split">
<div class="ppj-card">
<span class="ppj-card-badge">About Project</span>
<p class="ppj-card-desc">{{description}}</p>
<img src="{{image}}" alt="{{title}}"/>
<div class="ppj-card-title">{{title}}</div>
</div>
<div class="ppj-right">
<p class="ppj-label">{{label}}</p>
<h2 class="ppj-title">{{title}}</h2>
<p class="ppj-subtitle">{{subtitle}}</p>
<a href="#" class="ppj-cta">{{ctaText}}</a>
<a href="#" class="ppj-next">Next &rarr;</a>
</div>
</div>{{/projects}}
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO PRICING — Centered heading, toggle, 3 cards with
// feature checklist, middle card highlighted (Image 21)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioPricing: ComponentDefinition = {
  id: "portfolio-pricing",
  category: "pricing",
  name: "Portfolio Pricing",
  description: "Pricing cards with feature checklists, middle card featured with orange CTA",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    plans: { type: "list", label: "Plans", required: true },
  },
  defaultContent: {
    label: "//PRICING",
    title: "My Pricing Plan For You.",
    plans: [
      { name: "Starter Plan", price: "$299", period: "/Monthly", badge: "", btnStyle: "", description: "My Basic Pricing Plan Is Designed To Offer Extra Ordinary Value And Feature", ctaText: "GET STARTED", featureList: [{ item: "All Template Unlocked" }, { item: "Unlimited Request" }, { item: "Poject Mangement" }, { item: "Unlimited Revisions" }, { item: "Pause Or Cancel Anytime" }, { item: "Email Support" }] },
      { name: "Starter Plan", price: "$299", period: "/Monthly", badge: "Pro", btnStyle: "background:#f97316;border-color:#f97316", description: "My Basic Pricing Plan Is Designed To Offer Extra Ordinary Value And Feature", ctaText: "GET STARTED", featureList: [{ item: "All Template Unlocked" }, { item: "Unlimited //" }, { item: "Poject Mangement" }, { item: "Unlimited Revisions" }, { item: "Pause Or Cancel Anytime" }, { item: "Email Support" }] },
      { name: "Starter Plan", price: "$299", period: "/Monthly", badge: "", btnStyle: "", description: "My Basic Pricing Plan Is Designed To Offer Extra Ordinary Value And Feature", ctaText: "GET STARTED", featureList: [{ item: "All Template Unlocked" }, { item: "Unlimited Request" }, { item: "Poject Mangement" }, { item: "Unlimited Revisions" }, { item: "Pause Or Cancel Anytime" }, { item: "Email Support" }] },
    ],
  },
  html: `<style>
.ppr{background:#0d0d0d;padding:96px 48px;border-top:1px solid rgba(255,255,255,0.06)}
.ppr-inner{max-width:1200px;margin:0 auto}
.ppr-head{text-align:center;margin-bottom:40px}
.ppr-label{font-size:12px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;font-family:{{fontBody}}}
.ppr-title{font-size:clamp(32px,5vw,48px);font-weight:400;color:#fff;font-family:{{fontHeading}};font-style:italic;line-height:1.2}
.ppr-toggle{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:48px}
.ppr-toggle span{font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1.5px;font-family:{{fontBody}}}
.ppr-toggle-pill{width:40px;height:20px;border-radius:10px;background:rgba(255,255,255,0.12);position:relative}
.ppr-toggle-dot{width:16px;height:16px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px}
.ppr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.ppr-card{background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:28px 24px;display:flex;flex-direction:column}
.ppr-card-price-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.ppr-card-price{font-size:18px;font-weight:700;color:#fff;font-family:{{fontHeading}}}
.ppr-card-period{font-size:11px;color:rgba(255,255,255,0.3);font-family:{{fontBody}};margin-left:4px}
.ppr-card-plus{width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(255,255,255,0.3);flex-shrink:0}
.ppr-card-name{font-size:13px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.5px;font-family:{{fontHeading}}}
.ppr-card-badge{display:inline-block;padding:3px 10px;background:{{primary}};color:#fff;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-radius:3px;margin-left:10px;font-family:{{fontBody}};vertical-align:middle}
.ppr-card-badge:empty{display:none}
.ppr-card-desc{font-size:12px;color:rgba(255,255,255,0.25);line-height:1.6;font-family:{{fontBody}};margin:8px 0 24px}
.ppr-card-divider{height:1px;background:rgba(255,255,255,0.06);margin-bottom:20px}
.ppr-card-included{font-size:11px;font-weight:600;color:rgba(255,255,255,0.5);margin-bottom:16px;font-family:{{fontBody}}}
.ppr-card-list{list-style:none;padding:0;margin:0 0 28px;flex:1}
.ppr-card-list li{font-size:12px;color:rgba(255,255,255,0.4);line-height:2.4;font-family:{{fontBody}};display:flex;align-items:center;gap:8px}
.ppr-card-list li::before{content:"\\2713";color:{{primary}};font-size:11px;font-weight:700}
.ppr-card-btn{display:block;text-align:center;padding:14px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;background:transparent;color:#fff;text-decoration:none;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;font-family:{{fontBody}};margin-top:auto}
.ppr-card-btn-featured{background:{{primary}};border-color:{{primary}};border-radius:24px}
@media(max-width:768px){.ppr{padding:64px 20px}.ppr-grid{grid-template-columns:1fr}}
</style>
<section class="ppr"><div class="ppr-inner">
<div class="ppr-head"><p class="ppr-label">{{label}}</p><h2 class="ppr-title">{{title}}</h2></div>
<div class="ppr-toggle"><span>Monthly</span><div class="ppr-toggle-pill"><div class="ppr-toggle-dot"></div></div><span>Annual</span></div>
<div class="ppr-grid">
{{#plans}}<div class="ppr-card">
<div class="ppr-card-price-row"><div><span class="ppr-card-price">{{price}}</span><span class="ppr-card-period">{{period}}</span></div><span class="ppr-card-plus">+</span></div>
<div><span class="ppr-card-name">{{name}}</span> <span class="ppr-card-badge">{{badge}}</span></div>
<p class="ppr-card-desc">{{description}}</p>
<div class="ppr-card-divider"></div>
<p class="ppr-card-included">What's included</p>
<ul class="ppr-card-list">{{#featureList}}<li>{{item}}</li>{{/featureList}}</ul>
<a href="#" class="ppr-card-btn" style="{{btnStyle}}">{{ctaText}}</a>
</div>{{/plans}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO TESTIMONIALS — Cards with avatar + company logo, italic
// quote highlighting, 3x2 grid + STATS row below (Image 22)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioTestimonials: ComponentDefinition = {
  id: "portfolio-testimonials",
  category: "testimonials",
  name: "Portfolio Testimonials",
  description: "Testimonial cards with avatar, company logo, italic quote highlights in 3x2 grid",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    testimonials: { type: "list", label: "Testimonials Row 1", required: true },
    testimonials2: { type: "list", label: "Testimonials Row 2", required: true },
  },
  defaultContent: {
    label: "//TESTIMONIAL",
    title: "Trusted By International Brand",
    testimonials: [
      { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#f97316", company: "Hero" },
      { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#6366f1", company: "vivo" },
      { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#22c55e", company: "ASUS" },
    ],
    testimonials2: [
      { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#f43f5e", company: "Hero" },
      { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#eab308", company: "vivo" },
      { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#06b6d4", company: "ASUS" },
    ],
  },
  html: `<style>
.ptm{background:#0d0d0d;padding:80px 0 64px;overflow:hidden;border-top:1px solid rgba(255,255,255,0.06)}
.ptm-head{text-align:center;margin-bottom:48px;padding:0 48px}
.ptm-label{font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:3px;margin-bottom:16px;font-family:{{fontBody}}}
.ptm-title{font-size:clamp(32px,5vw,48px);font-weight:400;color:#fff;font-family:{{fontHeading}};font-style:italic;line-height:1.25}
.ptm-track{display:flex;gap:14px;padding:0 20px;margin-bottom:14px}
.ptm-r2{margin-left:-200px}
.ptm-card{min-width:430px;max-width:430px;background:#151515;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px 20px 4px;flex-shrink:0}
.ptm-card-top{display:flex;align-items:center;justify-content:space-between;padding:0 4px 16px}
.ptm-card-info{display:flex;align-items:center;gap:12px}
.ptm-avatar{width:46px;height:46px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;font-family:{{fontBody}}}
.ptm-card-name{font-size:12px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.5px;font-family:{{fontHeading}}}
.ptm-card-role{font-size:10px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.5px;font-family:{{fontBody}};margin-top:3px}
.ptm-card-logo{font-size:15px;font-weight:700;color:rgba(255,255,255,0.22);letter-spacing:1px;font-family:{{fontHeading}};font-style:italic}
.ptm-card-qbox{background:#1a1a1a;border-radius:10px;padding:20px 22px}
.ptm-card-quote{font-size:14px;color:rgba(255,255,255,0.4);line-height:1.75;font-family:{{fontBody}};margin:0}
.ptm-card-quote b{color:#fff;font-weight:700}
@media(max-width:768px){.ptm{padding:48px 0 40px}.ptm-card{min-width:300px;max-width:300px}.ptm-head{padding:0 20px}}
</style>
<section class="ptm">
<div class="ptm-head"><p class="ptm-label">{{label}}</p><h2 class="ptm-title">{{title}}</h2></div>
<div class="ptm-track ptm-r1">
{{#testimonials}}<div class="ptm-card">
<div class="ptm-card-top"><div class="ptm-card-info"><div class="ptm-avatar" style="background:{{bgColor}}">{{initials}}</div><div><div class="ptm-card-name">{{name}}</div><div class="ptm-card-role">{{role}}</div></div></div><span class="ptm-card-logo">{{company}}</span></div>
<div class="ptm-card-qbox"><p class="ptm-card-quote">{{quote}}</p></div>
</div>{{/testimonials}}
</div>
<div class="ptm-track ptm-r2">
{{#testimonials2}}<div class="ptm-card">
<div class="ptm-card-top"><div class="ptm-card-info"><div class="ptm-avatar" style="background:{{bgColor}}">{{initials}}</div><div><div class="ptm-card-name">{{name}}</div><div class="ptm-card-role">{{role}}</div></div></div><span class="ptm-card-logo">{{company}}</span></div>
<div class="ptm-card-qbox"><p class="ptm-card-quote">{{quote}}</p></div>
</div>{{/testimonials2}}
</div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO STATS — 4 big numbers in bordered row (Image 22 bottom)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioStats: ComponentDefinition = {
  id: "portfolio-stats",
  category: "features",
  name: "Portfolio Stats",
  description: "Stats row with large numbers, labels, and border dividers",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    stats: { type: "list", label: "Stats", required: true },
  },
  defaultContent: {
    label: "//STATS",
    stats: [
      { number: "50+", label: "Global Clients" },
      { number: "12+", label: "Years Of Experience" },
      { number: "15+", label: "Awards Won" },
      { number: "99%", label: "Success Rate" },
    ],
  },
  html: `<style>
.pst{background:#0d0d0d;padding:64px 48px 96px;border-top:1px solid rgba(255,255,255,0.06)}
.pst-inner{max-width:1200px;margin:0 auto}
.pst-label{font-size:12px;color:rgba(255,255,255,0.2);text-transform:uppercase;letter-spacing:2px;text-align:center;margin-bottom:48px;font-family:{{fontBody}}}
.pst-grid{display:grid;grid-template-columns:repeat(4,1fr)}
.pst-card{text-align:center;padding:32px 16px;border:1px solid rgba(255,255,255,0.06)}
.pst-card:first-child{border-left:1px solid rgba(255,255,255,0.06)}
.pst-num{font-size:clamp(40px,5vw,56px);font-weight:800;color:#fff;font-family:{{fontHeading}};line-height:1;margin-bottom:8px}
.pst-label2{font-size:11px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:2px;font-family:{{fontBody}}}
@media(max-width:768px){.pst{padding:48px 20px}.pst-grid{grid-template-columns:repeat(2,1fr)}.pst-num{font-size:36px}}
</style>
<section class="pst"><div class="pst-inner">
<p class="pst-label">{{label}}</p>
<div class="pst-grid">
{{#stats}}<div class="pst-card"><div class="pst-num">{{number}}</div><div class="pst-label2">{{label}}</div></div>{{/stats}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO CTA — LET'S WORK TOGETHER bold heading
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioCta: ComponentDefinition = {
  id: "portfolio-cta",
  category: "cta",
  name: "Portfolio CTA",
  description: "Bold CTA with massive heading",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: false },
    email: { type: "text", label: "Email", required: false },
  },
  defaultContent: {
    headline: "LET'S WORK TOGETHER",
    ctaText: "Get In Touch",
    email: "hello@alexchen.design",
  },
  html: `<style>
.pcta{background:#111;padding:120px 48px;text-align:center;border-top:1px solid rgba(255,255,255,0.06)}
.pcta-inner{max-width:800px;margin:0 auto}
.pcta-heading{font-size:clamp(48px,10vw,100px);font-weight:900;color:#fff;font-family:{{fontHeading}};text-transform:uppercase;line-height:1;letter-spacing:-2px;margin-bottom:32px}
.pcta-email{font-size:14px;color:rgba(255,255,255,0.25);font-family:{{fontBody}};margin-bottom:40px}
.pcta-btn{display:inline-flex;align-items:center;gap:8px;padding:16px 48px;background:{{primary}};color:#fff;text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;font-family:{{fontBody}};border-radius:4px}
@media(max-width:768px){.pcta{padding:80px 20px}}
</style>
<section class="pcta"><div class="pcta-inner">
<h2 class="pcta-heading">{{headline}}</h2>
<p class="pcta-email">{{email}}</p>
<a href="#contact" class="pcta-btn">{{ctaText}} &rarr;</a>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTFOLIO FOOTER — Full-screen portrait background image with watermark
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioFooter: ComponentDefinition = {
  id: "portfolio-footer",
  category: "footer",
  name: "Portfolio Footer",
  description: "Full-screen footer with portrait background, watermark name, brand, and description",
  source: "custom",
  slots: {
    footerImage: { type: "image", label: "Footer Background Image", required: true },
    brand: { type: "text", label: "Brand Name", required: true },
    name: { type: "text", label: "Display Name (watermark)", required: true },
    role: { type: "text", label: "Role", required: false },
    experience: { type: "text", label: "Experience", required: false },
    location: { type: "text", label: "Location", required: false },
    city: { type: "text", label: "City", required: false },
    description: { type: "longtext", label: "Footer Description", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
  },
  defaultContent: {
    footerImage: "/images/portfolio-footer.png",
    brand: "Portilo",
    name: "LEON",
    role: "Product Designer",
    experience: "12+ Years Of Experience",
    location: "Based In Bangladesh",
    city: "Sylhet",
    description: "CREATIVE PRODUCT DESIGNER FROM BANGLADESH, CRAFTING HIGH-PERFORMANCE, INTERACTIVE WEBSITES WITH PRECISION.",
    copyright: "2025 DESIGN BY LEON",
  },
  html: `<style>
.pf{position:relative;width:100%;min-height:100vh;overflow:hidden}
.pf-bg{position:absolute;inset:0;z-index:0}
.pf-bg img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;object-position:center top;display:block}
.pf-bg::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.35);z-index:1}
.pf-top{position:relative;z-index:10;display:flex;justify-content:space-between;padding:32px 48px 0}
.pf-top-item{font-family:{{fontBody}};line-height:1.6}
.pf-top-strong{display:block;font-size:12px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:2px}
.pf-top-sub{font-size:11px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:1.5px}
.pf-brand{position:absolute;left:48px;top:50%;transform:translateY(-50%);font-size:24px;font-weight:700;color:rgba(255,255,255,0.5);font-family:{{fontHeading}};font-style:italic;z-index:10}
.pf-brand span{color:{{primary}}}
.pf-desc{position:absolute;bottom:100px;left:50%;transform:translateX(-50%);text-align:center;max-width:750px;width:100%;padding:0 48px;z-index:10}
.pf-desc p{font-size:clamp(14px,2vw,18px);color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:2px;line-height:1.7;font-family:{{fontBody}}}
.pf-bottom{position:absolute;bottom:0;left:0;right:0;z-index:10;display:flex;justify-content:space-between;align-items:center;padding:24px 48px}
.pf-copy{font-size:11px;color:rgba(255,255,255,0.18);text-transform:uppercase;letter-spacing:1.5px;font-family:{{fontBody}}}
.pf-backtop{display:flex;align-items:center;gap:8px;font-size:11px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:1.5px;font-family:{{fontBody}};text-decoration:none}
.pf-backtop svg{width:18px;height:18px;stroke:rgba(255,255,255,0.35);fill:none;stroke-width:1.5}
@media(max-width:768px){.pf-top{padding:24px 20px 0;flex-direction:column;gap:8px}.pf-brand{position:relative;left:auto;top:auto;transform:none;text-align:center;margin:20px 0}.pf-desc{padding:0 20px;bottom:80px}.pf-bottom{padding:16px 20px;flex-direction:column;gap:8px;text-align:center}}
</style>
<footer class="pf">
<div class="pf-bg"><img src="{{footerImage}}" alt=""/></div>
<div class="pf-top">
<div class="pf-top-item"><span class="pf-top-strong">{{location}}</span><span class="pf-top-sub">{{city}}</span></div>
<div class="pf-top-item" style="text-align:right"><span class="pf-top-strong">{{role}}</span><span class="pf-top-sub">{{experience}}</span></div>
</div>
<div class="pf-brand">{{brand}}<span>.</span></div>
<div class="pf-desc"><p>{{description}}</p></div>
<div class="pf-bottom">
<span class="pf-copy">&copy;{{copyright}}</span>
<a href="#" class="pf-backtop"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Back To Top</a>
</div>
</footer>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const portfolioComponents: ComponentDefinition[] = [
  portfolioNav,
  portfolioHero,
  portfolioSkills,
  portfolioServices,
  portfolioProjects,
  portfolioPricing,
  portfolioTestimonials,
  portfolioStats,
  portfolioCta,
  portfolioFooter,
];
