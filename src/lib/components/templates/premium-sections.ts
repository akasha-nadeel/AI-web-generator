import { ComponentDefinition } from "../types";

// ──────────────────────────────────────────────────────────
// FEATURES — BENTO GRID
// ──────────────────────────────────────────────────────────

export const featuresBento: ComponentDefinition = {
  id: "features-bento",
  category: "features",
  name: "Bento Features Grid",
  description: "Modern bento-style asymmetric grid of feature cards",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Section Title", required: true },
    subtitle: { type: "longtext", label: "Section Subtitle", required: false },
    features: { type: "list", label: "Features", required: true },
  },
  defaultContent: {
    label: "What We Offer",
    title: "Everything You Need",
    subtitle: "A comprehensive suite of tools designed for modern teams.",
    features: [
      { name: "Smart Automation", description: "Automate repetitive tasks and focus on what truly matters.", icon: "\u26A1" },
      { name: "Real-time Sync", description: "Stay in sync with your team across all devices.", icon: "\uD83D\uDD04" },
      { name: "Deep Analytics", description: "Understand your data with powerful visual insights.", icon: "\uD83D\uDCCA" },
      { name: "Enterprise Security", description: "Bank-level encryption keeps your data safe and private.", icon: "\uD83D\uDD12" },
      { name: "API Integrations", description: "Connect with 200+ tools your team already uses.", icon: "\uD83D\uDD17" },
      { name: "24/7 Support", description: "Expert help whenever you need it, day or night.", icon: "\uD83D\uDCAC" },
    ],
  },
  html: `<style>
.fb-wrap{padding:96px 24px;}
.fb-inner{max-width:1200px;margin:0 auto;}
.fb-header{margin-bottom:56px;}
.fb-label{font-size:13px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.4;margin-bottom:12px;}
.fb-title{font-size:44px;font-weight:700;letter-spacing:-0.02em;margin-bottom:12px;line-height:1.1;}
.fb-subtitle{font-size:17px;opacity:0.5;max-width:500px;line-height:1.6;}
.fb-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.fb-card{border-radius:20px;padding:36px 32px;transition:border-color 0.3s;}
.fb-card:hover{border-color:rgba(128,128,128,0.2) !important;}
.fb-card:nth-child(1){grid-column:span 2;}
.fb-card:nth-child(4){grid-column:span 2;}
.fb-icon{font-size:28px;margin-bottom:20px;display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:14px;}
.fb-cn{font-size:19px;font-weight:600;margin-bottom:8px;letter-spacing:-0.01em;}
.fb-cd{font-size:14px;opacity:0.5;line-height:1.6;}
@media(max-width:768px){.fb-grid{grid-template-columns:1fr;}.fb-card:nth-child(1),.fb-card:nth-child(4){grid-column:span 1;}.fb-title{font-size:32px;}.fb-card{padding:28px 24px;}}
</style>
<section class="fb-wrap" style="background-color:{{bg}};">
  <div class="fb-inner">
    <div class="fb-header">
      <div class="fb-label" style="color:{{primary}};font-family:{{fontBody}};">{{label}}</div>
      <h2 class="fb-title" style="color:{{text}};font-family:{{fontHeading}};">{{title}}</h2>
      <p class="fb-subtitle" style="color:{{text}};font-family:{{fontBody}};">{{subtitle}}</p>
    </div>
    <div class="fb-grid">
      {{#features}}<div class="fb-card" style="background:{{text}}06;border:1px solid {{text}}0a;">
        <div class="fb-icon" style="background:{{primary}}12;">{{icon}}</div>
        <h3 class="fb-cn" style="color:{{text}};font-family:{{fontHeading}};">{{name}}</h3>
        <p class="fb-cd" style="color:{{text}};font-family:{{fontBody}};">{{description}}</p>
      </div>{{/features}}
    </div>
  </div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// ABOUT — MODERN SPLIT
// ──────────────────────────────────────────────────────────

export const aboutModern: ComponentDefinition = {
  id: "about-modern",
  category: "about",
  name: "Modern About",
  description: "Split about section with image, accent title, and statistics row",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Title", required: true },
    accentWord: { type: "text", label: "Accent Word", required: false },
    story: { type: "longtext", label: "Story Text", required: true },
    image: { type: "image", label: "Image", required: true },
    stats: { type: "list", label: "Stats", required: false },
  },
  defaultContent: {
    label: "About Us",
    title: "Built on Trust,",
    accentWord: "Driven by Results",
    story: "Founded with a passion for excellence, we have been serving our community for over a decade. Our mission is to deliver outstanding results that exceed expectations.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=500&fit=crop",
    stats: [
      { number: "10+", desc: "Years" },
      { number: "500+", desc: "Clients" },
      { number: "50+", desc: "Team" },
      { number: "98%", desc: "Satisfaction" },
    ],
  },
  html: `<style>
.am-wrap{padding:96px 24px;}
.am-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.am-label{font-size:13px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.4;margin-bottom:16px;}
.am-title{font-size:40px;font-weight:700;line-height:1.1;letter-spacing:-0.02em;margin-bottom:24px;}
.am-story{font-size:16px;line-height:1.8;opacity:0.55;margin-bottom:40px;}
.am-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding-top:24px;}
.am-stat{text-align:center;padding:16px 0;}
.am-sn{font-size:28px;font-weight:700;letter-spacing:-0.02em;}
.am-sd{font-size:12px;opacity:0.4;margin-top:4px;letter-spacing:0.05em;text-transform:uppercase;}
.am-img{width:100%;border-radius:20px;object-fit:cover;aspect-ratio:5/4;}
@media(max-width:768px){.am-inner{grid-template-columns:1fr;gap:40px;}.am-title{font-size:32px;}.am-stats{grid-template-columns:repeat(2,1fr);}}
</style>
<section class="am-wrap" style="background-color:{{bg}};">
  <div class="am-inner">
    <div>
      <div class="am-label" style="color:{{primary}};font-family:{{fontBody}};">{{label}}</div>
      <h2 class="am-title" style="color:{{text}};font-family:{{fontHeading}};">{{title}} <span style="color:{{primary}};">{{accentWord}}</span></h2>
      <p class="am-story" style="color:{{text}};font-family:{{fontBody}};">{{story}}</p>
      <div class="am-stats" style="border-top:1px solid {{text}}10;">
        {{#stats}}<div class="am-stat">
          <div class="am-sn" style="color:{{primary}};font-family:{{fontHeading}};">{{number}}</div>
          <div class="am-sd" style="color:{{text}};font-family:{{fontBody}};">{{desc}}</div>
        </div>{{/stats}}
      </div>
    </div>
    <div>
      <img src="{{image}}" alt="About" class="am-img" />
    </div>
  </div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// TESTIMONIALS — MODERN CARDS
// ──────────────────────────────────────────────────────────

export const testimonialsModern: ComponentDefinition = {
  id: "testimonials-modern",
  category: "testimonials",
  name: "Modern Testimonials",
  description: "Premium testimonial cards with star ratings and avatar initials",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Section Title", required: true },
    testimonials: { type: "list", label: "Testimonials", required: true },
  },
  defaultContent: {
    label: "Testimonials",
    title: "Loved by Thousands",
    testimonials: [
      { name: "Sarah Johnson", role: "CEO, TechCorp", quote: "Outstanding service and results. They exceeded every expectation we had.", avatar: "SJ" },
      { name: "Michael Chen", role: "Founder, StartUp", quote: "Working with this team was a game-changer for our business. Highly recommend!", avatar: "MC" },
      { name: "Emily Davis", role: "Marketing Director", quote: "Professional, creative, and always on time. The best decision we ever made.", avatar: "ED" },
    ],
  },
  html: `<style>
.tm-wrap{padding:96px 24px;}
.tm-inner{max-width:1200px;margin:0 auto;}
.tm-header{text-align:center;margin-bottom:56px;}
.tm-label{font-size:13px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.4;margin-bottom:12px;}
.tm-title{font-size:40px;font-weight:700;letter-spacing:-0.02em;}
.tm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.tm-card{border-radius:20px;padding:36px 32px;transition:border-color 0.3s,transform 0.3s;}
.tm-card:hover{transform:translateY(-4px);}
.tm-stars{font-size:14px;letter-spacing:2px;margin-bottom:20px;}
.tm-quote{font-size:15px;line-height:1.7;opacity:0.65;margin-bottom:28px;}
.tm-author{display:flex;align-items:center;gap:12px;}
.tm-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#fff;}
.tm-name{font-size:14px;font-weight:600;}
.tm-role{font-size:12px;opacity:0.45;margin-top:2px;}
@media(max-width:768px){.tm-grid{grid-template-columns:1fr;}.tm-title{font-size:32px;}}
</style>
<section class="tm-wrap" style="background-color:{{bg}};">
  <div class="tm-inner">
    <div class="tm-header">
      <div class="tm-label" style="color:{{primary}};font-family:{{fontBody}};">{{label}}</div>
      <h2 class="tm-title" style="color:{{text}};font-family:{{fontHeading}};">{{title}}</h2>
    </div>
    <div class="tm-grid">
      {{#testimonials}}<div class="tm-card" style="background:{{text}}05;border:1px solid {{text}}0a;">
        <div class="tm-stars" style="color:{{primary}};">\u2605\u2605\u2605\u2605\u2605</div>
        <p class="tm-quote" style="color:{{text}};font-family:{{fontBody}};">{{quote}}</p>
        <div class="tm-author">
          <div class="tm-av" style="background:{{primary}};">{{avatar}}</div>
          <div>
            <div class="tm-name" style="color:{{text}};font-family:{{fontHeading}};">{{name}}</div>
            <div class="tm-role" style="color:{{text}};font-family:{{fontBody}};">{{role}}</div>
          </div>
        </div>
      </div>{{/testimonials}}
    </div>
  </div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// CTA — BOLD
// ──────────────────────────────────────────────────────────

export const ctaBold: ComponentDefinition = {
  id: "cta-bold",
  category: "cta",
  name: "Bold CTA Section",
  description: "Full-width bold call-to-action with subtle glow effect",
  source: "custom",
  slots: {
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
  },
  defaultContent: {
    title: "Ready to Get Started?",
    subtitle: "Join thousands of satisfied customers and take your project to the next level.",
    ctaText: "Start Now",
  },
  html: `<style>
.cb-wrap{padding:96px 24px;position:relative;overflow:hidden;}
.cb-glow{position:absolute;width:500px;height:500px;border-radius:50%;filter:blur(120px);opacity:0.1;pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%);}
.cb-inner{max-width:700px;margin:0 auto;text-align:center;position:relative;z-index:1;}
.cb-title{font-size:44px;font-weight:700;line-height:1.1;letter-spacing:-0.02em;margin-bottom:16px;}
.cb-sub{font-size:18px;opacity:0.5;line-height:1.6;margin-bottom:40px;}
.cb-btn{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;border-radius:12px;text-decoration:none;font-size:16px;font-weight:600;transition:all 0.25s;}
.cb-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.15);}
@media(max-width:768px){.cb-title{font-size:32px;}.cb-sub{font-size:16px;}.cb-btn{padding:14px 32px;font-size:15px;}}
</style>
<section class="cb-wrap" style="background-color:{{bg}};border-top:1px solid {{text}}08;border-bottom:1px solid {{text}}08;">
  <div class="cb-glow" style="background:{{primary}};"></div>
  <div class="cb-inner">
    <h2 class="cb-title" style="color:{{text}};font-family:{{fontHeading}};">{{title}}</h2>
    <p class="cb-sub" style="color:{{text}};font-family:{{fontBody}};">{{subtitle}}</p>
    <a href="#" class="cb-btn" style="background:{{primary}};color:#fff;font-family:{{fontBody}};">{{ctaText}}</a>
  </div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// FOOTER — MEGA
// ──────────────────────────────────────────────────────────

export const footerMega: ComponentDefinition = {
  id: "footer-mega",
  category: "footer",
  name: "Mega Footer",
  description: "Premium footer with oversized ghost brand, columns, and tagline",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    tagline: { type: "text", label: "Tagline", required: false },
    columns: { type: "list", label: "Link Columns", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
  },
  defaultContent: {
    brand: "Brand",
    tagline: "Building the future, together.",
    columns: [
      { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
      { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
      { title: "Support", links: ["Help Center", "Contact", "FAQ", "Status"] },
    ],
    copyright: "2026 Brand. All rights reserved.",
  },
  html: `<style>
.fm-wrap{padding:80px 24px 32px;}
.fm-inner{max-width:1200px;margin:0 auto;}
.fm-top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px;margin-bottom:64px;}
.fm-brand{font-size:24px;font-weight:700;letter-spacing:-0.02em;margin-bottom:12px;}
.fm-tagline{font-size:14px;opacity:0.4;line-height:1.6;max-width:260px;}
.fm-col-title{font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:20px;opacity:0.4;}
.fm-col-link{display:block;font-size:14px;opacity:0.55;text-decoration:none;margin-bottom:12px;transition:opacity 0.2s;}
.fm-col-link:hover{opacity:1;}
.fm-ghost{font-size:120px;font-weight:800;letter-spacing:-0.05em;opacity:0.04;text-align:center;margin-bottom:24px;line-height:1;}
.fm-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:24px;}
.fm-copy{font-size:13px;opacity:0.3;}
@media(max-width:768px){.fm-top{grid-template-columns:1fr 1fr;gap:32px;}.fm-ghost{font-size:60px;}.fm-bottom{flex-direction:column;gap:12px;text-align:center;}}
</style>
<footer class="fm-wrap" style="background-color:{{bg}};border-top:1px solid {{text}}08;">
  <div class="fm-inner">
    <div class="fm-top">
      <div>
        <div class="fm-brand" style="color:{{text}};font-family:{{fontHeading}};">{{brand}}</div>
        <div class="fm-tagline" style="color:{{text}};font-family:{{fontBody}};">{{tagline}}</div>
      </div>
      {{#columns}}<div>
        <h4 class="fm-col-title" style="color:{{text}};font-family:{{fontBody}};">{{title}}</h4>
        {{#links}}<a href="#" class="fm-col-link" style="color:{{text}};font-family:{{fontBody}};">{{.}}</a>{{/links}}
      </div>{{/columns}}
    </div>
    <div class="fm-ghost" style="color:{{text}};font-family:{{fontHeading}};">{{brand}}</div>
    <div class="fm-bottom" style="border-top:1px solid {{text}}08;">
      <span class="fm-copy" style="color:{{text}};font-family:{{fontBody}};">&copy; {{copyright}}</span>
      <span class="fm-copy" style="color:{{text}};font-family:{{fontBody}};">Designed with care</span>
    </div>
  </div>
</footer>`,
};

// ──────────────────────────────────────────────────────────
// GALLERY — MASONRY
// ──────────────────────────────────────────────────────────

export const galleryMasonry: ComponentDefinition = {
  id: "gallery-masonry",
  category: "gallery",
  name: "Masonry Gallery",
  description: "Premium masonry-style gallery with hover zoom effect",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Section Title", required: true },
    images: { type: "list", label: "Gallery Images", required: true },
  },
  defaultContent: {
    label: "Portfolio",
    title: "Selected Work",
    images: [
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop", alt: "Project 1" },
      { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop", alt: "Project 2" },
      { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", alt: "Project 3" },
      { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=500&fit=crop", alt: "Project 4" },
      { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop", alt: "Project 5" },
      { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=500&fit=crop", alt: "Project 6" },
    ],
  },
  html: `<style>
.gm-wrap{padding:96px 24px;}
.gm-inner{max-width:1200px;margin:0 auto;}
.gm-header{text-align:center;margin-bottom:56px;}
.gm-label{font-size:13px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.4;margin-bottom:12px;}
.gm-title{font-size:40px;font-weight:700;letter-spacing:-0.02em;}
.gm-grid{columns:3;column-gap:16px;}
.gm-item{break-inside:avoid;margin-bottom:16px;border-radius:16px;overflow:hidden;position:relative;}
.gm-item img{width:100%;display:block;transition:transform 0.4s;object-fit:cover;}
.gm-item:hover img{transform:scale(1.04);}
@media(max-width:768px){.gm-grid{columns:2;}.gm-title{font-size:32px;}}
@media(max-width:480px){.gm-grid{columns:1;}}
</style>
<section class="gm-wrap" style="background-color:{{bg}};">
  <div class="gm-inner">
    <div class="gm-header">
      <div class="gm-label" style="color:{{primary}};font-family:{{fontBody}};">{{label}}</div>
      <h2 class="gm-title" style="color:{{text}};font-family:{{fontHeading}};">{{title}}</h2>
    </div>
    <div class="gm-grid">
      {{#images}}<div class="gm-item">
        <img src="{{src}}" alt="{{alt}}" />
      </div>{{/images}}
    </div>
  </div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// PRICING — MODERN
// ──────────────────────────────────────────────────────────

export const pricingModern: ComponentDefinition = {
  id: "pricing-modern",
  category: "pricing",
  name: "Modern Pricing",
  description: "Premium pricing cards with featured middle card highlight",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Section Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    plans: { type: "list", label: "Plans", required: true },
  },
  defaultContent: {
    label: "Pricing",
    title: "Simple, Transparent Pricing",
    subtitle: "Choose the plan that fits your needs. No hidden fees.",
    plans: [
      { name: "Starter", price: "$9", period: "/month", features: ["5 Projects", "Basic Support", "1 User"], ctaText: "Get Started" },
      { name: "Professional", price: "$29", period: "/month", features: ["Unlimited Projects", "Priority Support", "5 Users", "Analytics"], ctaText: "Get Started" },
      { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Dedicated Support", "Unlimited Users", "SLA"], ctaText: "Contact Us" },
    ],
  },
  html: `<style>
.pm-wrap{padding:96px 24px;}
.pm-inner{max-width:1100px;margin:0 auto;}
.pm-header{text-align:center;margin-bottom:56px;}
.pm-label{font-size:13px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.4;margin-bottom:12px;}
.pm-title{font-size:40px;font-weight:700;letter-spacing:-0.02em;margin-bottom:12px;}
.pm-subtitle{font-size:17px;opacity:0.5;line-height:1.6;}
.pm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start;}
.pm-card{border-radius:20px;padding:40px 32px;transition:transform 0.3s;}
.pm-card:hover{transform:translateY(-4px);}
.pm-card:nth-child(2){border-width:2px !important;transform:scale(1.02);}
.pm-card:nth-child(2):hover{transform:scale(1.02) translateY(-4px);}
.pm-cn{font-size:18px;font-weight:600;margin-bottom:16px;}
.pm-cp{font-size:48px;font-weight:800;letter-spacing:-0.03em;line-height:1;}
.pm-cper{font-size:16px;opacity:0.4;font-weight:400;}
.pm-feats{list-style:none;padding:0;margin:28px 0;padding-top:24px;}
.pm-feats li{padding:8px 0;font-size:14px;opacity:0.6;display:flex;align-items:center;gap:8px;}
.pm-btn{display:block;text-align:center;padding:14px;border-radius:12px;text-decoration:none;font-size:15px;font-weight:600;transition:all 0.25s;}
.pm-btn:hover{transform:translateY(-1px);}
@media(max-width:768px){.pm-grid{grid-template-columns:1fr;max-width:400px;margin:0 auto;}.pm-title{font-size:32px;}.pm-card:nth-child(2){transform:none;}.pm-card:nth-child(2):hover{transform:translateY(-4px);}}
</style>
<section class="pm-wrap" style="background-color:{{bg}};">
  <div class="pm-inner">
    <div class="pm-header">
      <div class="pm-label" style="color:{{primary}};font-family:{{fontBody}};">{{label}}</div>
      <h2 class="pm-title" style="color:{{text}};font-family:{{fontHeading}};">{{title}}</h2>
      <p class="pm-subtitle" style="color:{{text}};font-family:{{fontBody}};">{{subtitle}}</p>
    </div>
    <div class="pm-grid">
      {{#plans}}<div class="pm-card" style="background:{{text}}05;border:1px solid {{primary}}22;">
        <div class="pm-cn" style="color:{{text}};font-family:{{fontHeading}};">{{name}}</div>
        <div class="pm-cp" style="color:{{text}};font-family:{{fontHeading}};">{{price}}<span class="pm-cper" style="color:{{text}};">{{period}}</span></div>
        <ul class="pm-feats" style="color:{{text}};font-family:{{fontBody}};border-top:1px solid {{text}}0a;">
          {{#features}}<li><span style="color:{{primary}};font-weight:700;font-size:12px;">\u2713</span> {{.}}</li>{{/features}}
        </ul>
        <a href="#" class="pm-btn" style="background:{{primary}};color:#fff;font-family:{{fontBody}};">{{ctaText}}</a>
      </div>{{/plans}}
    </div>
  </div>
</section>`,
};

// ──────────────────────────────────────────────────────────
// EXPORTS
// ──────────────────────────────────────────────────────────

export const premiumSectionComponents = [
  featuresBento,
  aboutModern,
  testimonialsModern,
  ctaBold,
  footerMega,
  galleryMasonry,
  pricingModern,
];
