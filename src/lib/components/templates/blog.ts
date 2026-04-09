import { ComponentDefinition } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOG NAV — Transparent overlay nav (like Meridian)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blogNav: ComponentDefinition = {
  id: "blog-nav",
  category: "navigation",
  name: "Blog Overlay Nav",
  description: "Transparent overlay navigation with brand, links, and CTA",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    links: { type: "list", label: "Navigation Links", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
  },
  defaultContent: {
    brand: "muse",
    links: ["Culture", "Design", "Travel", "About"],
    ctaText: "Subscribe",
  },
  html: `<style>
.bn-nav{position:absolute;top:0;left:0;right:0;z-index:100;padding:20px 40px}
.bn-inner{max-width:1400px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.bn-brand{font-size:16px;font-weight:500;color:rgba(255,255,255,0.9);text-decoration:none;font-family:{{fontBody}};letter-spacing:0.5px;display:flex;align-items:center;gap:8px}
.bn-brand::before{content:"";width:6px;height:6px;border-radius:50%;background:#fff}
.bn-links{display:flex;align-items:center;gap:28px}
.bn-links a{color:rgba(255,255,255,0.6);text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:400}
.bn-cta{color:#fff;text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:500}
@media(max-width:768px){.bn-links{display:none!important}.bn-nav{padding:16px 20px!important}}
</style>
<nav class="bn-nav">
  <div class="bn-inner">
    <a href="#" class="bn-brand">{{brand}}</a>
    <div class="bn-links">
      {{#links}}<a href="#">{{.}}</a>{{/links}}
    </div>
    <a href="#" class="bn-cta">{{ctaText}}</a>
  </div>
</nav>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOG HERO — Full-viewport lifestyle photo with overlay text + trust bar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blogHero: ComponentDefinition = {
  id: "blog-hero",
  category: "hero",
  name: "Blog Full-Bleed Hero",
  description: "Full-viewport lifestyle photo with centered headline, subtitle, CTA, and trust logos bar",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline Line 1", required: true },
    headline2: { type: "text", label: "Headline Line 2", required: false },
    subheadline: { type: "text", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
    trustText: { type: "text", label: "Trust Text", required: false },
    trustLogos: { type: "list", label: "Trust Logos", required: false },
  },
  defaultContent: {
    headline: "Read today.",
    headline2: "Think tomorrow.",
    subheadline: "Stories and insights at the intersection of\nculture, design, and the human experience.",
    ctaText: "Start Reading",
    backgroundImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&h=1000&fit=crop",
    trustText: "Trusted by curious minds",
    trustLogos: ["Medium", "Substack", "The Verge", "Wired"],
  },
  html: `<style>
.bh-hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden}
.bh-bg{position:absolute;inset:0;z-index:0}
.bh-bg img{width:100%;height:100%;object-fit:cover;display:block}
.bh-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.35) 50%,rgba(0,0,0,0.65) 100%)}
.bh-content{position:relative;z-index:10;text-align:center;padding:0 40px;max-width:800px}
.bh-heading{font-size:72px;font-weight:400;color:#fff;font-family:{{fontHeading}};line-height:1.05;letter-spacing:-2px;margin:0}
.bh-sub{font-size:16px;color:rgba(255,255,255,0.7);line-height:1.7;font-family:{{fontBody}};margin:24px 0 36px;white-space:pre-line}
.bh-cta{display:inline-flex;align-items:center;justify-content:center;height:52px;padding:0 36px;border-radius:30px;background:{{primary}};color:#0a0a0a;font-size:15px;font-weight:600;text-decoration:none;font-family:{{fontBody}};border:none;cursor:pointer;letter-spacing:0.3px}
.bh-trust{position:absolute;bottom:0;left:0;right:0;z-index:10;padding:28px 40px;display:flex;align-items:center;justify-content:center;gap:48px;border-top:1px solid rgba(255,255,255,0.1)}
.bh-trust-label{font-size:12px;color:rgba(255,255,255,0.4);font-family:{{fontBody}};white-space:nowrap}
.bh-trust-logos{display:flex;align-items:center;gap:40px}
.bh-logo{font-size:16px;font-weight:700;color:rgba(255,255,255,0.5);font-family:{{fontBody}};letter-spacing:0.5px;text-transform:uppercase}
@media(max-width:1024px){.bh-heading{font-size:52px!important;letter-spacing:-1px}}
@media(max-width:768px){.bh-heading{font-size:40px!important}.bh-content{padding:0 24px!important}.bh-trust{flex-direction:column;gap:16px;padding:20px 24px!important}.bh-trust-logos{gap:24px!important}.bh-logo{font-size:13px!important}}
</style>
<section class="bh-hero">
  <div class="bh-bg"><img src="{{backgroundImage}}" alt="" /></div>
  <div class="bh-content">
    <h1 class="bh-heading">{{headline}}<br>{{headline2}}</h1>
    <p class="bh-sub">{{subheadline}}</p>
    <a href="#" class="bh-cta">{{ctaText}}</a>
  </div>
  <div class="bh-trust">
    <span class="bh-trust-label">{{trustText}}</span>
    <div class="bh-trust-logos">
      {{#trustLogos}}<span class="bh-logo">{{.}}</span>{{/trustLogos}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOG PHOTO SECTION — Full-bleed photo with overlaid text (like Meridian pages)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blogPhotoSection: ComponentDefinition = {
  id: "blog-photo-section",
  category: "about",
  name: "Blog Photo Section",
  description: "Full-bleed editorial photo with large overlaid headline and description text",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    description: { type: "text", label: "Description", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
  },
  defaultContent: {
    headline: "Say goodbye to bland content and hello to bold storytelling.",
    description: "We believe every story deserves to be told with depth, beauty, and authenticity.",
    backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop",
  },
  html: `<style>
.bps-section{position:relative;min-height:85vh;display:flex;align-items:flex-end;overflow:hidden}
.bps-bg{position:absolute;inset:0;z-index:0}
.bps-bg img{width:100%;height:100%;object-fit:cover;display:block}
.bps-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.55) 100%)}
.bps-content{position:relative;z-index:10;padding:60px 60px 72px;max-width:700px}
.bps-heading{font-size:48px;font-weight:400;color:#fff;font-family:{{fontHeading}};line-height:1.15;letter-spacing:-1.5px;margin:0 0 16px}
.bps-desc{font-size:15px;color:rgba(255,255,255,0.65);line-height:1.7;font-family:{{fontBody}};margin:0}
@media(max-width:1024px){.bps-heading{font-size:36px!important;letter-spacing:-1px}.bps-content{padding:40px 40px 52px!important}}
@media(max-width:768px){.bps-heading{font-size:28px!important}.bps-content{padding:32px 24px 40px!important}.bps-section{min-height:60vh!important}}
</style>
<section class="bps-section">
  <div class="bps-bg"><img src="{{backgroundImage}}" alt="" /></div>
  <div class="bps-content">
    <h2 class="bps-heading">{{headline}}</h2>
    <p class="bps-desc">{{description}}</p>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOG WHITE SECTION — Clean white section with headline + description + optional image
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blogWhiteSection: ComponentDefinition = {
  id: "blog-white-section",
  category: "about",
  name: "Blog White Section",
  description: "Clean white section with bold headline, paragraph, and optional CTA — contrast to photo sections",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    description: { type: "text", label: "Description", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
    stats: { type: "list", label: "Stats", required: false },
  },
  defaultContent: {
    headline: "The Daily Muse is where culture, creativity, and curiosity collide.",
    description: "We bring together the sharpest writers and the most compelling stories. Every piece is crafted to make you think deeper, see clearer, and live more intentionally.",
    ctaText: "About us",
    stats: [
      { number: "500+", desc: "Articles published" },
      { number: "120K", desc: "Monthly readers" },
      { number: "50+", desc: "Contributors" },
      { number: "12", desc: "Awards won" },
    ],
  },
  html: `<style>
.bws-section{background:#ffffff;padding:100px 60px}
.bws-inner{max-width:1200px;margin:0 auto}
.bws-heading{font-size:48px;font-weight:400;color:#0a0a0a;font-family:{{fontHeading}};line-height:1.15;letter-spacing:-1.5px;margin:0 0 24px;max-width:700px}
.bws-desc{font-size:16px;color:#666;line-height:1.8;font-family:{{fontBody}};margin:0 0 40px;max-width:600px}
.bws-cta{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 32px;border-radius:28px;background:#0a0a0a;color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};border:none;cursor:pointer;margin-bottom:56px}
.bws-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;border-top:1px solid #e5e5e5;padding-top:40px}
.bws-stat-num{font-size:44px;font-weight:400;color:#0a0a0a;font-family:{{fontHeading}};line-height:1;letter-spacing:-1px}
.bws-stat-desc{font-size:13px;color:#999;font-family:{{fontBody}};margin-top:8px}
@media(max-width:1024px){.bws-heading{font-size:36px!important;letter-spacing:-1px}.bws-stats{grid-template-columns:repeat(2,1fr)!important}}
@media(max-width:768px){.bws-section{padding:64px 24px!important}.bws-heading{font-size:28px!important}.bws-stats{grid-template-columns:1fr 1fr!important;gap:24px!important}.bws-stat-num{font-size:32px!important}}
</style>
<section class="bws-section">
  <div class="bws-inner">
    <h2 class="bws-heading">{{headline}}</h2>
    <p class="bws-desc">{{description}}</p>
    <a href="#" class="bws-cta">{{ctaText}}</a>
    <div class="bws-stats">
      {{#stats}}<div><div class="bws-stat-num">{{number}}</div><div class="bws-stat-desc">{{desc}}</div></div>{{/stats}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOG FEATURED ARTICLES — Article cards grid with images
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blogArticles: ComponentDefinition = {
  id: "blog-articles",
  category: "features",
  name: "Blog Featured Articles",
  description: "Featured articles grid with large photo cards, category tags, titles, and read time",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Section Title", required: true },
    articles: { type: "list", label: "Articles", required: true },
  },
  defaultContent: {
    label: "Featured Stories",
    title: "Latest from the journal",
    articles: [
      { name: "The Art of Slow Living", tag: "Culture", readTime: "8 min read", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=500&fit=crop" },
      { name: "Design Trends Shaping 2026", tag: "Design", readTime: "6 min read", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=700&h=500&fit=crop" },
      { name: "Finding Inspiration in Silence", tag: "Creativity", readTime: "5 min read", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&h=500&fit=crop" },
    ],
  },
  html: `<style>
.ba-section{background:#ffffff;padding:100px 60px}
.ba-inner{max-width:1200px;margin:0 auto}
.ba-label{font-size:12px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:1.5px;font-family:{{fontBody}};margin-bottom:12px}
.ba-title{font-size:40px;font-weight:400;color:#0a0a0a;font-family:{{fontHeading}};letter-spacing:-1px;margin:0 0 48px}
.ba-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.ba-card{border-radius:16px;overflow:hidden;background:#f9f9f9;cursor:pointer;transition:transform 0.3s}
.ba-card:hover{transform:translateY(-4px)}
.ba-card-img{width:100%;aspect-ratio:7/5;object-fit:cover;display:block}
.ba-card-body{padding:24px}
.ba-card-tag{display:inline-block;font-size:11px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:1px;font-family:{{fontBody}};margin-bottom:10px}
.ba-card-title{font-size:20px;font-weight:700;color:#0a0a0a;font-family:{{fontHeading}};line-height:1.3;margin:0 0 8px}
.ba-card-meta{font-size:13px;color:#999;font-family:{{fontBody}}}
@media(max-width:1024px){.ba-grid{grid-template-columns:1fr 1fr!important}}
@media(max-width:768px){.ba-section{padding:64px 24px!important}.ba-title{font-size:28px!important}.ba-grid{grid-template-columns:1fr!important}}
</style>
<section class="ba-section">
  <div class="ba-inner">
    <div class="ba-label">{{label}}</div>
    <h2 class="ba-title">{{title}}</h2>
    <div class="ba-grid">
      {{#articles}}<div class="ba-card">
        <img src="{{image}}" alt="{{name}}" class="ba-card-img" />
        <div class="ba-card-body">
          <span class="ba-card-tag">{{tag}}</span>
          <h3 class="ba-card-title">{{name}}</h3>
          <span class="ba-card-meta">{{readTime}}</span>
        </div>
      </div>{{/articles}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOG NEWSLETTER — Full-bleed photo CTA with subscribe form
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blogNewsletter: ComponentDefinition = {
  id: "blog-newsletter",
  category: "cta",
  name: "Blog Newsletter CTA",
  description: "Full-bleed photo section with newsletter headline, description, and email subscribe form",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    description: { type: "text", label: "Description", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
    ctaText: { type: "text", label: "Button Text", required: true },
    placeholder: { type: "text", label: "Input Placeholder", required: false },
  },
  defaultContent: {
    headline: "Designed to make\nevery story unforgettable.",
    description: "All your inspiration, one effortless experience.",
    backgroundImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&h=900&fit=crop",
    ctaText: "Subscribe",
    placeholder: "Enter your email",
  },
  html: `<style>
.bnl-section{position:relative;min-height:80vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.bnl-bg{position:absolute;inset:0;z-index:0}
.bnl-bg img{width:100%;height:100%;object-fit:cover;display:block}
.bnl-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.5) 100%)}
.bnl-content{position:relative;z-index:10;text-align:center;padding:0 40px;max-width:680px}
.bnl-heading{font-size:52px;font-weight:400;color:#fff;font-family:{{fontHeading}};line-height:1.15;letter-spacing:-1.5px;margin:0 0 16px;white-space:pre-line}
.bnl-desc{font-size:16px;color:rgba(255,255,255,0.6);line-height:1.7;font-family:{{fontBody}};margin:0 0 36px}
.bnl-form{display:flex;gap:0;max-width:420px;margin:0 auto;border-radius:32px;overflow:hidden;background:rgba(255,255,255,0.12);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.15);padding:5px}
.bnl-input{flex:1;height:44px;padding:0 20px;background:transparent;border:none;color:#fff;font-size:14px;font-family:{{fontBody}};outline:none}
.bnl-input::placeholder{color:rgba(255,255,255,0.4)}
.bnl-btn{height:44px;padding:0 28px;border-radius:26px;background:{{primary}};color:#0a0a0a;font-size:14px;font-weight:600;border:none;cursor:pointer;font-family:{{fontBody}};white-space:nowrap}
@media(max-width:768px){.bnl-heading{font-size:32px!important;letter-spacing:-1px}.bnl-content{padding:0 24px!important}.bnl-form{flex-direction:column;border-radius:16px;padding:8px}.bnl-btn{border-radius:12px;width:100%}.bnl-section{min-height:60vh!important}}
</style>
<section class="bnl-section">
  <div class="bnl-bg"><img src="{{backgroundImage}}" alt="" /></div>
  <div class="bnl-content">
    <h2 class="bnl-heading">{{headline}}</h2>
    <p class="bnl-desc">{{description}}</p>
    <div class="bnl-form">
      <input type="email" class="bnl-input" placeholder="{{placeholder}}" />
      <button class="bnl-btn">{{ctaText}}</button>
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOG FOOTER — Minimal dark footer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blogFooter: ComponentDefinition = {
  id: "blog-footer",
  category: "footer",
  name: "Blog Footer",
  description: "Minimal dark footer with brand, columns, and copyright line",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    tagline: { type: "text", label: "Tagline", required: false },
    columns: { type: "list", label: "Footer Columns", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
  },
  defaultContent: {
    brand: "muse",
    tagline: "Ideas, culture, and creative inspiration for curious minds.",
    columns: [
      { title: "Journal", links: ["Culture", "Design", "Travel", "Technology"] },
      { title: "Company", links: ["About", "Contributors", "Advertise", "Contact"] },
      { title: "Connect", links: ["Twitter", "Instagram", "RSS", "Newsletter"] },
    ],
    copyright: "2026 The Daily Muse. All rights reserved.",
  },
  html: `<style>
.bf-section{background:#0a0a0a;padding:72px 60px 36px}
.bf-inner{max-width:1200px;margin:0 auto}
.bf-top{display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:48px;margin-bottom:56px}
.bf-brand{font-size:18px;font-weight:500;color:#fff;font-family:{{fontBody}};display:flex;align-items:center;gap:8px;margin-bottom:16px}
.bf-brand::before{content:"";width:6px;height:6px;border-radius:50%;background:#666}
.bf-tagline{font-size:14px;color:#666;line-height:1.6;font-family:{{fontBody}};max-width:280px}
.bf-col-title{font-size:12px;font-weight:600;color:#666;font-family:{{fontBody}};margin-bottom:20px;text-transform:uppercase;letter-spacing:1px}
.bf-col-links{list-style:none;padding:0;margin:0}
.bf-col-links li{margin-bottom:12px}
.bf-col-links a{font-size:14px;color:#999;text-decoration:none;font-family:{{fontBody}}}
.bf-bottom{border-top:1px solid #1a1a1a;padding-top:24px;text-align:center}
.bf-copyright{font-size:12px;color:#444;font-family:{{fontBody}}}
@media(max-width:768px){.bf-section{padding:48px 24px 28px!important}.bf-top{grid-template-columns:1fr 1fr!important;gap:32px}}
</style>
<footer class="bf-section">
  <div class="bf-inner">
    <div class="bf-top">
      <div>
        <div class="bf-brand">{{brand}}</div>
        <p class="bf-tagline">{{tagline}}</p>
      </div>
      {{#columns}}<div>
        <h4 class="bf-col-title">{{title}}</h4>
        <ul class="bf-col-links">{{#links}}<li><a href="#">{{.}}</a></li>{{/links}}</ul>
      </div>{{/columns}}
    </div>
    <div class="bf-bottom">
      <p class="bf-copyright">&copy; {{copyright}}</p>
    </div>
  </div>
</footer>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const blogComponents: ComponentDefinition[] = [
  blogNav,
  blogHero,
  blogPhotoSection,
  blogWhiteSection,
  blogArticles,
  blogNewsletter,
  blogFooter,
];
