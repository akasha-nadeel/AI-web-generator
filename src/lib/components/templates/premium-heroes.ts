import { ComponentDefinition } from "../types";

// ──────────────────────────────────────────────────────────
// PREMIUM NAVIGATION
// ──────────────────────────────────────────────────────────

export const navFloating: ComponentDefinition = {
  id: "nav-floating",
  category: "navigation",
  name: "Floating Glass Navigation",
  description: "Modern floating navbar with glassmorphism pill shape",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    links: { type: "list", label: "Navigation Links", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: false },
  },
  defaultContent: {
    brand: "Brand",
    links: ["Home", "About", "Services", "Contact"],
    ctaText: "Get Started",
  },
  html: `<style>
.nf-bar{position:absolute;top:0;left:0;right:0;z-index:50;padding:20px 24px;}
.nf-pill{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:14px 28px;border-radius:100px;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);}
.nf-right{display:flex;align-items:center;gap:28px;}
.nf-lnk{text-decoration:none;font-size:14px;opacity:0.65;transition:opacity 0.2s;}
.nf-lnk:hover{opacity:1;}
.nf-btn{padding:9px 22px;border-radius:100px;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.02em;transition:all 0.2s;}
.nf-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,0.15);}
@media(max-width:768px){.nf-right{gap:16px;}.nf-lnk{font-size:12px;}.nf-btn{padding:7px 16px;font-size:12px;}.nf-pill{padding:10px 20px;}}
@media(max-width:540px){.nf-lnk{display:none;}}
</style>
<nav class="nf-bar">
  <div class="nf-pill" style="background:{{bg}}cc;border:1px solid {{text}}08;">
    <a href="#" style="font-size:20px;font-weight:700;color:{{text}};text-decoration:none;font-family:{{fontHeading}};letter-spacing:-0.02em;">{{brand}}</a>
    <div class="nf-right">
      {{#links}}<a href="#" class="nf-lnk" style="color:{{text}};font-family:{{fontBody}};">{{.}}</a>{{/links}}
      <a href="#" class="nf-btn" style="background:{{primary}};color:#fff;font-family:{{fontBody}};">{{ctaText}}</a>
    </div>
  </div>
</nav>`,
};

// ──────────────────────────────────────────────────────────
// HERO — EDITORIAL (Agency, Blog style)
// ──────────────────────────────────────────────────────────

export const heroEditorial: ComponentDefinition = {
  id: "hero-editorial",
  category: "hero",
  name: "Editorial Hero",
  description: "Magazine-style hero with oversized typography, accent word, and stats bar",
  source: "custom",
  slots: {
    label: { type: "text", label: "Top Label", required: false },
    headline: { type: "text", label: "Main Headline", required: true },
    accentWord: { type: "text", label: "Accent Colored Word", required: false },
    subheadline: { type: "longtext", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
    stats: { type: "list", label: "Stats", required: false },
  },
  defaultContent: {
    label: "Creative Studio",
    headline: "We Design Digital",
    accentWord: "Experiences",
    subheadline: "Award-winning studio specializing in brand design, digital products, and creative strategy.",
    ctaText: "View Our Work",
    stats: [
      { number: "150+", desc: "Projects" },
      { number: "12", desc: "Awards" },
      { number: "98%", desc: "Happy Clients" },
    ],
  },
  html: `<style>
.he-wrap{min-height:100vh;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
.he-glow{position:absolute;border-radius:50%;filter:blur(120px);opacity:0.12;pointer-events:none;}
.he-g1{width:600px;height:600px;top:-200px;right:-100px;}
.he-g2{width:400px;height:400px;bottom:-150px;left:-50px;}
.he-inner{max-width:1200px;margin:0 auto;padding:160px 48px 80px;width:100%;box-sizing:border-box;}
.he-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.5;margin-bottom:32px;}
.he-dot{width:6px;height:6px;border-radius:50%;}
.he-h1{font-size:88px;font-weight:800;line-height:0.98;letter-spacing:-0.035em;margin-bottom:32px;}
.he-sub{font-size:18px;line-height:1.7;opacity:0.5;max-width:480px;margin-bottom:48px;}
.he-cta{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;border-radius:100px;text-decoration:none;font-size:15px;font-weight:600;transition:all 0.25s;}
.he-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.2);}
.he-cta:hover .he-arrow{transform:translateX(4px);}
.he-arrow{transition:transform 0.25s;font-size:18px;}
.he-stats{display:flex;gap:48px;margin-top:80px;padding-top:32px;}
.he-sn{font-size:36px;font-weight:700;letter-spacing:-0.02em;}
.he-sl{font-size:13px;opacity:0.4;margin-top:4px;letter-spacing:0.02em;}
@media(max-width:1024px){.he-h1{font-size:64px;}.he-inner{padding:140px 32px 60px;}.he-stats{gap:32px;}}
@media(max-width:768px){.he-h1{font-size:44px;}.he-inner{padding:120px 24px 48px;}.he-sub{font-size:16px;}.he-stats{flex-wrap:wrap;gap:24px;}.he-sn{font-size:28px;}.he-cta{padding:14px 28px;font-size:14px;}}
@media(max-width:480px){.he-h1{font-size:36px;}.he-stats{gap:20px;}.he-sn{font-size:24px;}}
</style>
<section class="he-wrap" style="background-color:{{bg}};">
  <div class="he-glow he-g1" style="background:{{primary}};"></div>
  <div class="he-glow he-g2" style="background:{{secondary}};"></div>
  <div class="he-inner">
    <div class="he-label" style="color:{{text}};font-family:{{fontBody}};"><span class="he-dot" style="background:{{primary}};"></span> {{label}}</div>
    <h1 class="he-h1" style="color:{{text}};font-family:{{fontHeading}};">{{headline}} <span style="color:{{primary}};">{{accentWord}}</span></h1>
    <p class="he-sub" style="color:{{text}};font-family:{{fontBody}};">{{subheadline}}</p>
    <a href="#" class="he-cta" style="background:{{primary}};color:#fff;font-family:{{fontBody}};">{{ctaText}} <span class="he-arrow">&rarr;</span></a>
    <div class="he-stats" style="border-top:1px solid {{text}}12;">
      {{#stats}}<div>
        <div class="he-sn" style="color:{{text}};font-family:{{fontHeading}};">{{number}}</div>
        <div class="he-sl" style="color:{{text}};font-family:{{fontBody}};">{{desc}}</div>
      </div>{{/stats}}
    </div>
  </div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// HERO — SPLIT MODERN (Medical, Education, Real Estate)
// ──────────────────────────────────────────────────────────

export const heroSplitModern: ComponentDefinition = {
  id: "hero-split-modern",
  category: "hero",
  name: "Modern Split Hero",
  description: "Asymmetric split layout with badges, text, trust indicators, and image",
  source: "custom",
  slots: {
    badge: { type: "text", label: "Badge Text", required: false },
    headline: { type: "text", label: "Headline", required: true },
    accentWord: { type: "text", label: "Accent Word", required: false },
    subheadline: { type: "longtext", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "Primary CTA", required: true },
    secondaryCta: { type: "text", label: "Secondary CTA", required: false },
    image: { type: "image", label: "Hero Image", required: true },
    trustText: { type: "text", label: "Trust Text", required: false },
  },
  defaultContent: {
    badge: "Trusted by 10,000+",
    headline: "Your Health,",
    accentWord: "Our Priority",
    subheadline: "Compassionate, modern healthcare with a patient-first approach. Book appointments online, 24/7.",
    ctaText: "Book Now",
    secondaryCta: "Learn More",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop",
    trustText: "Trusted by 500+ families",
  },
  html: `<style>
.hsm-wrap{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;}
.hsm-inner{max-width:1200px;margin:0 auto;padding:140px 48px 80px;width:100%;box-sizing:border-box;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.hsm-badge{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:100px;font-size:13px;font-weight:500;margin-bottom:24px;letter-spacing:0.02em;}
.hsm-h1{font-size:64px;font-weight:800;line-height:1.02;letter-spacing:-0.03em;margin-bottom:24px;}
.hsm-sub{font-size:17px;line-height:1.7;opacity:0.55;margin-bottom:36px;max-width:460px;}
.hsm-ctas{display:flex;align-items:center;gap:20px;margin-bottom:32px;}
.hsm-btn{display:inline-flex;align-items:center;gap:8px;padding:15px 32px;border-radius:12px;text-decoration:none;font-size:15px;font-weight:600;transition:all 0.25s;}
.hsm-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.15);}
.hsm-ghost{text-decoration:none;font-size:15px;font-weight:500;opacity:0.7;transition:opacity 0.2s;}
.hsm-ghost:hover{opacity:1;}
.hsm-trust{display:flex;align-items:center;gap:10px;font-size:13px;opacity:0.4;}
.hsm-avatars{display:flex;}
.hsm-avatars span{width:28px;height:28px;border-radius:50%;margin-right:-8px;display:inline-block;}
.hsm-img{width:100%;border-radius:20px;object-fit:cover;aspect-ratio:4/5;box-shadow:0 24px 64px rgba(0,0,0,0.12);}
@media(max-width:1024px){.hsm-h1{font-size:48px;}.hsm-inner{gap:40px;padding:120px 32px 60px;}}
@media(max-width:768px){.hsm-inner{grid-template-columns:1fr;gap:32px;padding:120px 24px 48px;}.hsm-h1{font-size:40px;}.hsm-img{aspect-ratio:4/3;max-height:360px;}}
@media(max-width:480px){.hsm-h1{font-size:32px;}.hsm-btn{padding:13px 24px;font-size:14px;}}
</style>
<section class="hsm-wrap" style="background-color:{{bg}};">
  <div class="hsm-inner">
    <div>
      <div class="hsm-badge" style="background:{{primary}}15;color:{{primary}};font-family:{{fontBody}};">{{badge}}</div>
      <h1 class="hsm-h1" style="color:{{text}};font-family:{{fontHeading}};">{{headline}} <span style="color:{{primary}};">{{accentWord}}</span></h1>
      <p class="hsm-sub" style="color:{{text}};font-family:{{fontBody}};">{{subheadline}}</p>
      <div class="hsm-ctas">
        <a href="#" class="hsm-btn" style="background:{{primary}};color:#fff;font-family:{{fontBody}};">{{ctaText}}</a>
        <a href="#" class="hsm-ghost" style="color:{{text}};font-family:{{fontBody}};">{{secondaryCta}} &rarr;</a>
      </div>
      <div class="hsm-trust" style="color:{{text}};font-family:{{fontBody}};">
        <div class="hsm-avatars">
          <span style="background:{{primary}}44;border:2px solid {{bg}};"></span>
          <span style="background:{{accent}}44;border:2px solid {{bg}};"></span>
          <span style="background:{{secondary}}44;border:2px solid {{bg}};"></span>
        </div>
        {{trustText}}
      </div>
    </div>
    <div>
      <img src="{{image}}" alt="" class="hsm-img" />
    </div>
  </div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// HERO — FULLSCREEN MODERN (Fitness, Photography, Ecommerce, Nonprofit)
// ──────────────────────────────────────────────────────────

export const heroFullscreenModern: ComponentDefinition = {
  id: "hero-fullscreen-modern",
  category: "hero",
  name: "Modern Fullscreen Hero",
  description: "Full-viewport hero with dramatic background image and gradient overlay",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    subheadline: { type: "longtext", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
    scrollText: { type: "text", label: "Scroll Indicator Text", required: false },
  },
  defaultContent: {
    headline: "Push Your Limits",
    subheadline: "Premium fitness training designed to transform your body and mind.",
    ctaText: "Start Your Journey",
    backgroundImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop",
    scrollText: "Scroll to explore",
  },
  html: `<style>
.hfm-wrap{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;}
.hfm-bg{position:absolute;inset:0;background-size:cover;background-position:center;}
.hfm-ov{position:absolute;inset:0;}
.hfm-inner{position:relative;z-index:1;max-width:900px;padding:160px 48px 100px;width:100%;box-sizing:border-box;}
.hfm-h1{font-size:80px;font-weight:800;color:#fff;line-height:0.98;letter-spacing:-0.03em;margin-bottom:24px;}
.hfm-sub{font-size:19px;color:#fff;opacity:0.75;line-height:1.7;max-width:540px;margin-bottom:40px;}
.hfm-cta{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;border-radius:12px;text-decoration:none;font-size:15px;font-weight:600;color:#fff;transition:all 0.25s;letter-spacing:0.01em;}
.hfm-cta:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,0.3);}
.hfm-scroll{position:absolute;bottom:40px;left:48px;z-index:1;display:flex;align-items:center;gap:12px;font-size:12px;color:#fff;opacity:0.4;letter-spacing:0.1em;text-transform:uppercase;}
.hfm-line{width:24px;height:1px;background:#fff;opacity:0.5;}
@media(max-width:1024px){.hfm-h1{font-size:60px;}.hfm-inner{padding:140px 32px 80px;}}
@media(max-width:768px){.hfm-h1{font-size:42px;}.hfm-inner{padding:120px 24px 60px;}.hfm-sub{font-size:16px;}.hfm-scroll{left:24px;bottom:24px;}}
@media(max-width:480px){.hfm-h1{font-size:34px;}.hfm-cta{padding:14px 28px;font-size:14px;}}
</style>
<section class="hfm-wrap">
  <div class="hfm-bg" style="background-image:url('{{backgroundImage}}');"></div>
  <div class="hfm-ov" style="background:linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.1) 30%,rgba(0,0,0,0.5) 70%,rgba(0,0,0,0.85) 100%);"></div>
  <div class="hfm-inner">
    <h1 class="hfm-h1" style="font-family:{{fontHeading}};">{{headline}}</h1>
    <p class="hfm-sub" style="font-family:{{fontBody}};">{{subheadline}}</p>
    <a href="#" class="hfm-cta" style="background:{{primary}};font-family:{{fontBody}};">{{ctaText}} <span style="font-size:18px;">&rarr;</span></a>
  </div>
  <div class="hfm-scroll" style="font-family:{{fontBody}};"><span class="hfm-line"></span> {{scrollText}}</div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// HERO — GRADIENT MODERN (SaaS / Tech)
// ──────────────────────────────────────────────────────────

export const heroGradientModern: ComponentDefinition = {
  id: "hero-gradient-modern",
  category: "hero",
  name: "Modern Gradient Hero",
  description: "SaaS-style hero with gradient orbs, dual CTAs, and feature pills",
  source: "custom",
  slots: {
    badge: { type: "text", label: "Badge Text", required: false },
    headline: { type: "text", label: "Headline", required: true },
    subheadline: { type: "longtext", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "Primary CTA", required: true },
    secondaryCta: { type: "text", label: "Secondary CTA", required: false },
    features: { type: "list", label: "Feature Pills", required: false },
  },
  defaultContent: {
    badge: "Now in Beta",
    headline: "Automate Your Workflow",
    subheadline: "The all-in-one platform that helps teams ship faster with intelligent automation.",
    ctaText: "Get Started Free",
    secondaryCta: "Watch Demo",
    features: [
      { name: "Smart Automation", icon: "\u26A1" },
      { name: "Team Collab", icon: "\uD83D\uDC65" },
      { name: "Analytics", icon: "\uD83D\uDCCA" },
      { name: "Security", icon: "\uD83D\uDD12" },
    ],
  },
  html: `<style>
.hgm-wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;text-align:center;}
.hgm-orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:0.18;pointer-events:none;}
.hgm-o1{width:500px;height:500px;top:-150px;right:-100px;}
.hgm-o2{width:400px;height:400px;bottom:-100px;left:-50px;}
.hgm-o3{width:300px;height:300px;top:50%;left:50%;transform:translate(-50%,-50%);}
.hgm-inner{position:relative;z-index:1;max-width:800px;padding:160px 48px 40px;width:100%;box-sizing:border-box;}
.hgm-badge{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:100px;font-size:13px;font-weight:500;margin-bottom:28px;letter-spacing:0.03em;}
.hgm-h1{font-size:72px;font-weight:800;line-height:1.02;letter-spacing:-0.03em;margin-bottom:24px;}
.hgm-sub{font-size:19px;line-height:1.7;opacity:0.55;max-width:580px;margin:0 auto 40px;}
.hgm-ctas{display:flex;align-items:center;justify-content:center;gap:16px;}
.hgm-btn{display:inline-flex;align-items:center;gap:8px;padding:15px 32px;border-radius:12px;text-decoration:none;font-size:15px;font-weight:600;transition:all 0.25s;}
.hgm-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.15);}
.hgm-ghost{border:1px solid rgba(128,128,128,0.2);}
.hgm-pills{position:relative;z-index:1;display:flex;justify-content:center;gap:16px;flex-wrap:wrap;padding:60px 48px 80px;max-width:700px;margin:0 auto;width:100%;box-sizing:border-box;}
.hgm-pill{display:flex;align-items:center;gap:8px;padding:12px 22px;border-radius:14px;font-size:14px;font-weight:500;}
@media(max-width:1024px){.hgm-h1{font-size:56px;}}
@media(max-width:768px){.hgm-h1{font-size:40px;}.hgm-inner{padding:120px 24px 32px;}.hgm-sub{font-size:16px;}.hgm-pills{padding:40px 24px 60px;gap:10px;}.hgm-pill{padding:10px 16px;font-size:13px;}}
@media(max-width:480px){.hgm-h1{font-size:32px;}.hgm-ctas{flex-direction:column;gap:12px;}.hgm-btn{width:100%;justify-content:center;}}
</style>
<section class="hgm-wrap" style="background-color:{{bg}};">
  <div class="hgm-orb hgm-o1" style="background:{{primary}};"></div>
  <div class="hgm-orb hgm-o2" style="background:{{secondary}};"></div>
  <div class="hgm-orb hgm-o3" style="background:{{accent}};"></div>
  <div class="hgm-inner">
    <div class="hgm-badge" style="background:{{primary}}15;color:{{primary}};font-family:{{fontBody}};">{{badge}}</div>
    <h1 class="hgm-h1" style="color:{{text}};font-family:{{fontHeading}};">{{headline}}</h1>
    <p class="hgm-sub" style="color:{{text}};font-family:{{fontBody}};">{{subheadline}}</p>
    <div class="hgm-ctas">
      <a href="#" class="hgm-btn" style="background:{{primary}};color:#fff;font-family:{{fontBody}};">{{ctaText}}</a>
      <a href="#" class="hgm-btn hgm-ghost" style="color:{{text}};font-family:{{fontBody}};">{{secondaryCta}}</a>
    </div>
  </div>
  <div class="hgm-pills">
    {{#features}}<div class="hgm-pill" style="background:{{text}}08;color:{{text}};font-family:{{fontBody}};border:1px solid {{text}}10;"><span>{{icon}}</span> {{name}}</div>{{/features}}
  </div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// EXPORTS
// ──────────────────────────────────────────────────────────

export const premiumHeroComponents = [
  navFloating,
  heroEditorial,
  heroSplitModern,
  heroFullscreenModern,
  heroGradientModern,
];
