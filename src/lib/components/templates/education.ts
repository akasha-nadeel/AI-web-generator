import { ComponentDefinition } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU NAV — White academic nav with crest icon + serif brand
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduNav: ComponentDefinition = {
  id: "edu-nav",
  category: "navigation",
  name: "Education Academic Nav",
  description: "White nav bar with crest icon, serif brand name, navigation links, search and hamburger",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    links: { type: "list", label: "Navigation Links", required: true },
  },
  defaultContent: {
    brand: "Harbor",
    links: ["About", "Event", "Research", "Contact Us"],
  },
  html: `<style>
.en{background:#fff;padding:0 48px;height:72px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #eee;position:relative;z-index:100}
.en-left{display:flex;align-items:center;gap:10px}
.en-crest{width:36px;height:36px;display:flex;align-items:center;justify-content:center}
.en-crest svg{width:36px;height:36px}
.en-brand{font-size:22px;font-weight:700;color:#1a1a1a;font-family:{{fontHeading}};text-decoration:none}
.en-right{display:flex;align-items:center;gap:32px}
.en-links{display:flex;align-items:center;gap:28px}
.en-links a{color:#444;text-decoration:none;font-size:15px;font-family:{{fontBody}};font-weight:400;transition:color 0.2s}
.en-links a:hover{color:#1a1a1a}
.en-icons{display:flex;align-items:center;gap:12px}
.en-icon{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.2s}
.en-icon:hover{background:#f5f5f5}
.en-icon svg{width:18px;height:18px;color:#1a1a1a}
.en-hamburger{width:40px;height:40px;border-radius:50%;background:#1a1a1a;display:flex;align-items:center;justify-content:center;cursor:pointer}
.en-hamburger svg{width:18px;height:18px;color:#fff}
@media(max-width:768px){.en{padding:0 20px;height:60px}.en-links{display:none!important}.en-brand{font-size:18px}}
</style>
<nav class="en">
<div class="en-left">
<div class="en-crest"><svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#1a1a1a" stroke-width="1.5"/><circle cx="20" cy="20" r="15" stroke="#1a1a1a" stroke-width="0.8"/><path d="M14 28V16l6-4 6 4v12" stroke="#1a1a1a" stroke-width="1.5" stroke-linejoin="round"/><line x1="14" y1="20" x2="26" y2="20" stroke="#1a1a1a" stroke-width="1"/><line x1="17" y1="20" x2="17" y2="28" stroke="#1a1a1a" stroke-width="1"/><line x1="20" y1="20" x2="20" y2="28" stroke="#1a1a1a" stroke-width="1"/><line x1="23" y1="20" x2="23" y2="28" stroke="#1a1a1a" stroke-width="1"/></svg></div>
<a href="#" class="en-brand">{{brand}}</a>
</div>
<div class="en-right">
<div class="en-links">{{#links}}<a href="#">{{.}}</a>{{/links}}</div>
<div class="en-icons">
<div class="en-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
<div class="en-hamburger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg></div>
</div>
</div>
</nav>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU HERO — Full-width campus image with serif title overlay
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduHero: ComponentDefinition = {
  id: "edu-hero",
  category: "hero",
  name: "Education Hero",
  description: "Full-width campus photo with large serif Welcome title, description, and CTA at bottom",
  source: "custom",
  slots: {
    titleLine1: { type: "text", label: "Title Line 1", required: true },
    titleLine2: { type: "text", label: "Title Line 2", required: true },
    description: { type: "longtext", label: "Description", required: true },
    ctaText: { type: "text", label: "CTA Text", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
  },
  defaultContent: {
    titleLine1: "Welcome to",
    titleLine2: "Harbor.",
    description: "We are committed to empowering students with world-class education, cutting-edge research opportunities, and an inclusive community. Whether you're here.",
    ctaText: "Get Started",
    backgroundImage: "/images/education-hero-bg.png",
  },
  html: `<style>
.eh{position:relative;min-height:92vh;margin:0;border-radius:0;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end}
.eh-bg{position:absolute;inset:0;z-index:0}
.eh-bg img{width:100%;height:100%;object-fit:cover;display:block}
.eh-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,0.35) 100%)}
.eh-title{position:absolute;top:12%;left:48px;z-index:2}
.eh-title h1{font-size:clamp(52px,7vw,96px);font-weight:400;color:#fff;font-family:{{fontHeading}};line-height:1.05;margin:0}
.eh-bottom{position:relative;z-index:2;display:flex;align-items:flex-end;justify-content:space-between;padding:0 48px 48px;gap:40px}
.eh-desc{max-width:480px}
.eh-desc p{font-size:15px;color:rgba(255,255,255,0.85);line-height:1.7;font-family:{{fontBody}};margin:0}
.eh-cta{display:inline-flex;align-items:center;gap:10px;background:#fff;color:#1a1a1a;padding:16px 28px;border-radius:50px;text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:500;white-space:nowrap;transition:background 0.2s}
.eh-cta:hover{background:#f0f0f0}
.eh-cta svg{width:16px;height:16px}
@media(max-width:768px){.eh{min-height:75vh;margin:0;border-radius:0}.eh-title{top:8%;left:24px}.eh-title h1{font-size:clamp(36px,10vw,52px)}.eh-bottom{flex-direction:column;padding:0 24px 32px;gap:20px}}
</style>
<section class="eh">
<div class="eh-bg"><img src="{{backgroundImage}}" alt="Campus"/></div>
<div class="eh-title"><h1>{{titleLine1}}<br>{{titleLine2}}</h1></div>
<div class="eh-bottom">
<div class="eh-desc"><p>{{description}}</p></div>
<a href="#" class="eh-cta">{{ctaText}} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
</div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU NEWS — Campus News asymmetric grid layout
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduNews: ComponentDefinition = {
  id: "edu-news",
  category: "blog",
  name: "Education Campus News",
  description: "Asymmetric news grid with large featured article left and 3 stacked cards right with tag pills",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    ctaText: { type: "text", label: "CTA Text", required: true },
    featuredImage: { type: "image", label: "Featured Image", required: true },
    featuredTitle: { type: "text", label: "Featured Title", required: true },
    featuredTags: { type: "list", label: "Featured Tags", required: true },
    articles: { type: "list", label: "Articles", required: true },
  },
  defaultContent: {
    title: "Campus News.",
    ctaText: "See All News",
    featuredImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=1000&fit=crop",
    featuredTitle: "Mental Health Matters University form Expands Counseling Services.",
    featuredTags: ["Research", "Interviews", "Admission"],
    articles: [
      { image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=400&h=300&fit=crop", title: "Harbor University Research Team Unveils Breakthrough Renewable.", desc: "Harbor University's research team has announced a groundbreaking advancement in renewable.", tags: "Admission,Research" },
      { image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=300&fit=crop", title: "Harbor Graduate Launches form Groundbreaking Tech Startup.", desc: "A recent Harbor University graduate has made for the headlines by launching a groundbreaking.", tags: "Admission,Research" },
      { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", title: "Harbor University Celebrates Anniversary with Special.", desc: "Harbor University is proudly celebrating its anniversary, marking a century.", tags: "Admission,Research" },
    ],
  },
  html: `<style>
.enw{padding:80px 48px;background:#fff}
.enw-inner{max-width:1200px;margin:0 auto}
.enw-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:48px}
.enw-title{font-size:clamp(36px,4vw,52px);font-weight:400;color:#1a1a1a;font-family:{{fontHeading}};margin:0}
.enw-see{display:inline-flex;align-items:center;gap:8px;color:#1a1a1a;text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:500}
.enw-see-arrow{width:32px;height:32px;border-radius:50%;background:#1a1a1a;display:flex;align-items:center;justify-content:center}
.enw-see-arrow svg{width:14px;height:14px;color:#fff}
.enw-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px}
.enw-featured{}
.enw-featured-img{width:100%;aspect-ratio:3/4;border-radius:12px;overflow:hidden;margin-bottom:20px}
.enw-featured-img img{width:100%;height:100%;object-fit:cover;display:block}
.enw-featured h3{font-size:22px;font-weight:400;color:#1a1a1a;font-family:{{fontHeading}};line-height:1.35;margin:0 0 16px}
.enw-tags{display:flex;gap:8px;flex-wrap:wrap}
.enw-tag{padding:6px 16px;border-radius:50px;border:1px solid #ddd;font-size:13px;color:#555;font-family:{{fontBody}};background:transparent}
.enw-right{display:flex;flex-direction:column;gap:24px}
.enw-article{display:grid;grid-template-columns:200px 1fr;gap:20px;align-items:start}
.enw-article-img{width:100%;aspect-ratio:4/3;border-radius:10px;overflow:hidden}
.enw-article-img img{width:100%;height:100%;object-fit:cover;display:block}
.enw-article-body h4{font-size:18px;font-weight:600;color:#1a1a1a;font-family:{{fontHeading}};line-height:1.35;margin:0 0 8px}
.enw-article-body p{font-size:13px;color:#777;line-height:1.6;font-family:{{fontBody}};margin:0 0 12px}
@media(max-width:768px){.enw{padding:48px 20px}.enw-grid{grid-template-columns:1fr}.enw-article{grid-template-columns:120px 1fr;gap:12px}}
</style>
<section class="enw"><div class="enw-inner">
<div class="enw-header">
<h2 class="enw-title">{{title}}</h2>
<a href="#" class="enw-see">{{ctaText}} <span class="enw-see-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></a>
</div>
<div class="enw-grid">
<div class="enw-featured">
<div class="enw-featured-img"><img src="{{featuredImage}}" alt=""/></div>
<h3>{{featuredTitle}}</h3>
<div class="enw-tags">{{#featuredTags}}<span class="enw-tag">{{.}}</span>{{/featuredTags}}</div>
</div>
<div class="enw-right">
{{#articles}}<div class="enw-article">
<div class="enw-article-img"><img src="{{image}}" alt=""/></div>
<div class="enw-article-body">
<h4>{{title}}</h4>
<p>{{desc}}</p>
<div class="enw-tags"><span class="enw-tag">Admission</span><span class="enw-tag">Research</span></div>
</div>
</div>{{/articles}}
</div>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU PROGRAMS — Browse programs 3x2 grid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduPrograms: ComponentDefinition = {
  id: "edu-programs",
  category: "features",
  name: "Education Programs Grid",
  description: "Browse programs by field of study with 3-column grid of program links with arrow icons",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    ctaText: { type: "text", label: "CTA Text", required: false },
    programs: { type: "list", label: "Programs", required: true },
  },
  defaultContent: {
    title: "Browse programs by.",
    subtitle: "This user-friendly tool offers options to filter programs by field of study, degree level, and even learning formats like online or on-campus.",
    ctaText: "Explore All",
    programs: ["Computer Science", "Civil Engineering", "Electrical Engineering", "Textile Engineering", "Chemical Engineering", "Mechanical Engineering"],
  },
  html: `<style>
.ep{padding:80px 48px;background:#f5f5f5}
.ep-inner{max-width:1200px;margin:0 auto}
.ep-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:56px}
.ep-left{max-width:600px}
.ep-title{font-size:clamp(36px,4vw,52px);font-weight:400;color:#1a1a1a;font-family:{{fontHeading}};margin:0 0 16px}
.ep-subtitle{font-size:15px;color:#777;line-height:1.7;font-family:{{fontBody}};margin:0}
.ep-cta{display:inline-flex;align-items:center;gap:8px;color:#1a1a1a;text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:500;margin-top:8px}
.ep-cta-arrow{width:32px;height:32px;border-radius:50%;background:#1a1a1a;display:flex;align-items:center;justify-content:center}
.ep-cta-arrow svg{width:14px;height:14px;color:#fff}
.ep-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
.ep-item{display:flex;align-items:center;justify-content:space-between;padding:24px 20px;border-bottom:1px solid #ddd;font-size:17px;font-weight:500;color:#1a1a1a;font-family:{{fontBody}};text-decoration:none;transition:background 0.2s;cursor:pointer}
.ep-item:hover{background:rgba(0,0,0,0.03)}
.ep-item:nth-child(3n+1),.ep-item:nth-child(3n+2){border-right:1px solid #ddd}
.ep-item-arrow{width:28px;height:28px;border-radius:50%;background:#1a1a1a;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ep-item-arrow svg{width:12px;height:12px;color:#fff}
@media(max-width:768px){.ep{padding:48px 20px}.ep-header{flex-direction:column;gap:20px}.ep-grid{grid-template-columns:1fr}.ep-item:nth-child(3n+1),.ep-item:nth-child(3n+2){border-right:none}}
</style>
<section class="ep"><div class="ep-inner">
<div class="ep-header">
<div class="ep-left">
<h2 class="ep-title">{{title}}</h2>
<p class="ep-subtitle">{{subtitle}}</p>
</div>
<a href="#" class="ep-cta">{{ctaText}} <span class="ep-cta-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></a>
</div>
<div class="ep-grid">
{{#programs}}<a href="#" class="ep-item">{{.}} <span class="ep-item-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></a>{{/programs}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU ABOUT — Two-column with campus image + text
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduAbout: ComponentDefinition = {
  id: "edu-about",
  category: "about",
  name: "Education About Section",
  description: "Two-column layout with campus image on left and title, description, CTA on right",
  source: "custom",
  slots: {
    title: { type: "text", label: "Title", required: true },
    description: { type: "longtext", label: "Description", required: true },
    ctaText: { type: "text", label: "CTA Text", required: true },
    image: { type: "image", label: "Image", required: true },
  },
  defaultContent: {
    title: "Where Knowledge Meets Innovation.",
    description: "At Harbor University, we believe in nurturing minds and in for empowering future leaders through world-class education and a commitment to community impact.",
    ctaText: "Get Started Now",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=900&fit=crop",
  },
  html: `<style>
.ea{padding:80px 48px;background:#fff}
.ea-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.ea-img{border-radius:12px;overflow:hidden;aspect-ratio:4/5}
.ea-img img{width:100%;height:100%;object-fit:cover;display:block}
.ea-content{}
.ea-title{font-size:clamp(32px,3.5vw,48px);font-weight:400;color:#1a1a1a;font-family:{{fontHeading}};line-height:1.15;margin:0 0 24px}
.ea-desc{font-size:16px;color:#666;line-height:1.75;font-family:{{fontBody}};margin:0 0 32px}
.ea-cta{display:inline-flex;align-items:center;gap:10px;color:#1a1a1a;text-decoration:none;font-size:15px;font-family:{{fontBody}};font-weight:500}
.ea-cta-arrow{width:32px;height:32px;border-radius:50%;background:#1a1a1a;display:flex;align-items:center;justify-content:center}
.ea-cta-arrow svg{width:14px;height:14px;color:#fff}
@media(max-width:768px){.ea{padding:48px 20px}.ea-inner{grid-template-columns:1fr;gap:32px}}
</style>
<section class="ea"><div class="ea-inner">
<div class="ea-img"><img src="{{image}}" alt="Campus"/></div>
<div class="ea-content">
<h2 class="ea-title">{{title}}</h2>
<p class="ea-desc">{{description}}</p>
<a href="#" class="ea-cta">{{ctaText}} <span class="ea-cta-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></a>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU EVENTS — Upcoming Events 3-column cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduEvents: ComponentDefinition = {
  id: "edu-events",
  category: "features",
  name: "Education Upcoming Events",
  description: "Three-column event cards with tall images, date, and event title with navigation arrows",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    events: { type: "list", label: "Events", required: true },
  },
  defaultContent: {
    title: "Upcoming Events.",
    events: [
      { image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&h=800&fit=crop", date: "5 August 2025  5:00 PM", eventTitle: "Global learning opportunities." },
      { image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=800&fit=crop", date: "May 8, 2025  5:00 PM", eventTitle: "Global learning opportunities." },
      { image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=800&fit=crop", date: "Apr 9, 2025  5:00 PM", eventTitle: "Student Films the Stars." },
    ],
  },
  html: `<style>
.eev{padding:80px 48px;background:#fff}
.eev-inner{max-width:1200px;margin:0 auto}
.eev-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:40px}
.eev-title{font-size:clamp(36px,4vw,52px);font-weight:400;color:#1a1a1a;font-family:{{fontHeading}};margin:0}
.eev-arrows{display:flex;gap:8px}
.eev-arrow{width:40px;height:40px;border-radius:50%;border:1px solid #ddd;background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s}
.eev-arrow:hover{background:#1a1a1a;border-color:#1a1a1a}
.eev-arrow:hover svg{color:#fff}
.eev-arrow svg{width:16px;height:16px;color:#1a1a1a}
.eev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.eev-card{}
.eev-card-img{width:100%;aspect-ratio:3/4;border-radius:12px;overflow:hidden;margin-bottom:14px}
.eev-card-img img{width:100%;height:100%;object-fit:cover;display:block}
.eev-date{display:flex;align-items:center;gap:8px;font-size:13px;color:#666;font-family:{{fontBody}};margin-bottom:6px}
.eev-date svg{width:14px;height:14px;color:#999}
.eev-card h3{font-size:18px;font-weight:400;color:#1a1a1a;font-family:{{fontHeading}};margin:0;line-height:1.4}
@media(max-width:768px){.eev{padding:48px 20px}.eev-grid{grid-template-columns:1fr;gap:32px}}
</style>
<section class="eev"><div class="eev-inner">
<div class="eev-header">
<h2 class="eev-title">{{title}}</h2>
<div class="eev-arrows">
<button class="eev-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
<button class="eev-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
</div>
</div>
<div class="eev-grid">
{{#events}}<div class="eev-card">
<div class="eev-card-img"><img src="{{image}}" alt=""/></div>
<div class="eev-date"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> {{date}}</div>
<h3>{{eventTitle}}</h3>
</div>{{/events}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU STORIES — Testimonial with serif italic title + rating
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduStories: ComponentDefinition = {
  id: "edu-stories",
  category: "testimonials",
  name: "Education Stories Testimonial",
  description: "Testimonial section with italic serif title, long quote, avatar with rating and navigation arrows",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    quote: { type: "longtext", label: "Quote", required: true },
    avatar: { type: "image", label: "Avatar Image", required: true },
    name: { type: "text", label: "Name", required: true },
    role: { type: "text", label: "Role", required: true },
    rating: { type: "text", label: "Rating", required: true },
  },
  defaultContent: {
    title: "Stories.",
    quote: "Harbor University transformed my academic journey. The are for incredibly in supportive, and the campus atmosphere fosters a true sense of community. The skill I've gained have not only prepared me for my career but also given me confidence for myself. Choosing Harbor was the best decision I've made. The education I received was top-notch.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    name: "Darlene Robertson",
    role: "CSE Students, Harbor",
    rating: "4.9",
  },
  html: `<style>
.es{padding:80px 48px;background:#f5f5f5}
.es-inner{max-width:1200px;margin:0 auto}
.es-top{display:grid;grid-template-columns:280px 1fr;gap:64px;margin-bottom:48px;align-items:start}
.es-title{font-size:clamp(36px,4vw,52px);font-weight:400;color:#1a1a1a;font-family:{{fontHeading}};font-style:italic;margin:0}
.es-quote{font-size:18px;color:#444;line-height:1.75;font-family:{{fontBody}};margin:0}
.es-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:32px;border-top:1px solid #ddd}
.es-person{display:flex;align-items:center;gap:14px}
.es-avatar{width:48px;height:48px;border-radius:50%;overflow:hidden}
.es-avatar img{width:100%;height:100%;object-fit:cover;display:block}
.es-name{font-size:15px;font-weight:600;color:#1a1a1a;font-family:{{fontBody}};margin:0}
.es-role{font-size:13px;color:#888;font-family:{{fontBody}};margin:2px 0 0}
.es-rating{display:flex;align-items:center;gap:10px}
.es-stars{color:#f5a623;font-size:18px;letter-spacing:2px}
.es-score{font-size:18px;color:#1a1a1a;font-family:{{fontBody}};font-weight:600}
.es-score span{color:#999;font-weight:400}
.es-arrows{display:flex;gap:8px}
.es-arrow{width:40px;height:40px;border-radius:50%;border:1px solid #ccc;background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s}
.es-arrow:hover{background:#1a1a1a;border-color:#1a1a1a}
.es-arrow:hover svg{color:#fff}
.es-arrow svg{width:16px;height:16px;color:#1a1a1a}
@media(max-width:768px){.es{padding:48px 20px}.es-top{grid-template-columns:1fr;gap:24px}.es-bottom{flex-wrap:wrap;gap:20px}}
</style>
<section class="es"><div class="es-inner">
<div class="es-top">
<h2 class="es-title">{{title}}</h2>
<p class="es-quote">{{quote}}</p>
</div>
<div class="es-bottom">
<div class="es-person">
<div class="es-avatar"><img src="{{avatar}}" alt="{{name}}"/></div>
<div><p class="es-name">{{name}}</p><p class="es-role">{{role}}</p></div>
</div>
<div class="es-rating">
<span class="es-stars">\u2605\u2605\u2605\u2605\u2605</span>
<span class="es-score">{{rating}}<span>/5.0</span></span>
</div>
<div class="es-arrows">
<button class="es-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
<button class="es-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
</div>
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU RESEARCH — Research & Innovations 3-col cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduResearch: ComponentDefinition = {
  id: "edu-research",
  category: "features",
  name: "Education Research Cards",
  description: "Three-column research cards with date pill, category tag, title, description and arrow icon",
  source: "custom",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    papers: { type: "list", label: "Research Papers", required: true },
  },
  defaultContent: {
    title: "Research & Innovations.",
    papers: [
      { date: "Jan 1, 2025", category: "AI Solutions", paperTitle: "AI driven healthcare diagnostics.", desc: "A study on how artificial intelligence can enhance early detection and diagnosis of diseases, particularly in." },
      { date: "Jan 1, 2024", category: "Health", paperTitle: "Genetic mapping of rare.", desc: "Focused on rural healthcare needs, this study explores how AI can improve the early diagnosis of diseases where access." },
      { date: "Jan 1, 2025", category: "Tech Innovations", paperTitle: "Precision Healthcare via AI.", desc: "This study investigates the application of artificial intelligence to improve early disease detection and diagnosis." },
    ],
  },
  html: `<style>
.er{padding:80px 48px;background:#fff}
.er-inner{max-width:1200px;margin:0 auto}
.er-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:40px}
.er-title{font-size:clamp(36px,4vw,52px);font-weight:400;color:#1a1a1a;font-family:{{fontHeading}};margin:0}
.er-arrows{display:flex;gap:8px}
.er-arr{width:40px;height:40px;border-radius:50%;border:1px solid #ddd;background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s}
.er-arr:hover{background:#1a1a1a;border-color:#1a1a1a}
.er-arr:hover svg{color:#fff}
.er-arr svg{width:16px;height:16px;color:#1a1a1a}
.er-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.er-card{background:#f5f5f5;border-radius:14px;padding:28px 24px;display:flex;flex-direction:column;min-height:320px}
.er-meta{display:flex;align-items:center;gap:10px;margin-bottom:24px}
.er-date{padding:6px 14px;border-radius:50px;border:1px solid #ccc;font-size:12px;color:#555;font-family:{{fontBody}}}
.er-cat{font-size:12px;color:#888;font-family:{{fontBody}}}
.er-card h3{font-size:20px;font-weight:600;color:#1a1a1a;font-family:{{fontHeading}};line-height:1.35;margin:0 0 12px}
.er-card p{font-size:14px;color:#777;line-height:1.65;font-family:{{fontBody}};margin:0}
.er-card-arrow{margin-top:auto;align-self:flex-end;width:36px;height:36px;border-radius:50%;background:#1a1a1a;display:flex;align-items:center;justify-content:center}
.er-card-arrow svg{width:14px;height:14px;color:#fff}
@media(max-width:768px){.er{padding:48px 20px}.er-grid{grid-template-columns:1fr;gap:16px}}
</style>
<section class="er"><div class="er-inner">
<div class="er-header">
<h2 class="er-title">{{title}}</h2>
<div class="er-arrows">
<button class="er-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
<button class="er-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
</div>
</div>
<div class="er-grid">
{{#papers}}<div class="er-card">
<div class="er-meta"><span class="er-date">{{date}}</span><span class="er-cat">{{category}}</span></div>
<h3>{{paperTitle}}</h3>
<p>{{desc}}</p>
<span class="er-card-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
</div>{{/papers}}
</div>
</div></section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU CTA — Full-width campus image with dark overlay
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduCta: ComponentDefinition = {
  id: "edu-cta",
  category: "cta",
  name: "Education CTA Banner",
  description: "Full-width campus image with dark overlay, centered serif heading, subtitle and CTA button",
  source: "custom",
  slots: {
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: true },
    ctaText: { type: "text", label: "CTA Text", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
  },
  defaultContent: {
    title: "We're here to help you.",
    subtitle: "We're here to help you achieve your goals, overcome challenges and make every step smoother along the way.",
    ctaText: "Get Started",
    backgroundImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=700&fit=crop",
  },
  html: `<style>
.ec{position:relative;min-height:480px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.ec-bg{position:absolute;inset:0;z-index:0}
.ec-bg img{width:100%;height:100%;object-fit:cover;display:block}
.ec-bg::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,0.45)}
.ec-content{position:relative;z-index:2;text-align:center;padding:48px;max-width:700px}
.ec-title{font-size:clamp(36px,4.5vw,56px);font-weight:400;color:#fff;font-family:{{fontHeading}};font-style:italic;line-height:1.15;margin:0 0 20px}
.ec-sub{font-size:15px;color:rgba(255,255,255,0.8);line-height:1.7;font-family:{{fontBody}};margin:0 0 32px}
.ec-btn{display:inline-flex;align-items:center;gap:10px;background:#333;color:#fff;padding:16px 28px;border-radius:50px;text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:500;transition:background 0.2s}
.ec-btn:hover{background:#555}
.ec-btn svg{width:16px;height:16px}
@media(max-width:768px){.ec{min-height:380px}.ec-content{padding:32px 24px}}
</style>
<section class="ec">
<div class="ec-bg"><img src="{{backgroundImage}}" alt=""/></div>
<div class="ec-content">
<h2 class="ec-title">{{title}}</h2>
<p class="ec-sub">{{subtitle}}</p>
<a href="#" class="ec-btn">{{ctaText}} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
</div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDU FOOTER — Dark academic footer with 4 columns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const eduFooter: ComponentDefinition = {
  id: "edu-footer",
  category: "footer",
  name: "Education Footer",
  description: "Dark footer with crest logo, description, social icons, page links, support links, and address",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    description: { type: "longtext", label: "Description", required: false },
    pagesLinks: { type: "list", label: "Pages Links", required: true },
    supportLinks: { type: "list", label: "Support Links", required: true },
    address: { type: "longtext", label: "Address", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
  },
  defaultContent: {
    brand: "Harbor",
    description: "Through our collaborative approach and innovative design solutions, we transform visions into reality, blending functionality expression.",
    pagesLinks: ["Home", "About", "Events", "Programs"],
    supportLinks: ["Contact Us", "Privacy Policy", "404"],
    address: "Emily Hattson 940 Goldendale Dr, Wasilla, Alaska 99654, USA",
    copyright: "Copyright 2024 Harbor, Inc. All rights reserved.",
  },
  html: `<style>
.ef{background:#1a1a1a;padding:64px 48px 0}
.ef-inner{max-width:1200px;margin:0 auto}
.ef-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.5fr;gap:48px;padding-bottom:48px}
.ef-brand-col{}
.ef-logo{display:flex;align-items:center;gap:10px;margin-bottom:20px}
.ef-logo-crest{width:32px;height:32px}
.ef-logo-crest svg{width:32px;height:32px}
.ef-logo-name{font-size:20px;font-weight:700;color:#fff;font-family:{{fontHeading}}}
.ef-desc{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;font-family:{{fontBody}};margin:0 0 20px}
.ef-socials{display:flex;gap:10px}
.ef-social{width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;transition:all 0.2s}
.ef-social:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.4)}
.ef-social svg{width:16px;height:16px;color:rgba(255,255,255,0.6)}
.ef-col-title{font-size:15px;font-weight:600;color:#fff;font-family:{{fontBody}};margin:0 0 20px}
.ef-links{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px}
.ef-links a{color:rgba(255,255,255,0.5);text-decoration:none;font-size:14px;font-family:{{fontBody}};transition:color 0.2s}
.ef-links a:hover{color:#fff}
.ef-address{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;font-family:{{fontBody}};margin:0 0 16px}
.ef-map{display:inline-flex;align-items:center;gap:8px;color:#fff;text-decoration:none;font-size:14px;font-family:{{fontBody}};font-weight:500}
.ef-map svg{width:16px;height:16px}
.ef-bottom{border-top:1px solid rgba(255,255,255,0.1);padding:24px 0;text-align:center}
.ef-copy{font-size:13px;color:rgba(255,255,255,0.4);font-family:{{fontBody}};margin:0}
@media(max-width:768px){.ef{padding:48px 20px 0}.ef-grid{grid-template-columns:1fr 1fr;gap:32px}}
</style>
<footer class="ef"><div class="ef-inner">
<div class="ef-grid">
<div class="ef-brand-col">
<div class="ef-logo">
<div class="ef-logo-crest"><svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#fff" stroke-width="1.5"/><circle cx="20" cy="20" r="15" stroke="#fff" stroke-width="0.8"/><path d="M14 28V16l6-4 6 4v12" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/><line x1="14" y1="20" x2="26" y2="20" stroke="#fff" stroke-width="1"/><line x1="17" y1="20" x2="17" y2="28" stroke="#fff" stroke-width="1"/><line x1="20" y1="20" x2="20" y2="28" stroke="#fff" stroke-width="1"/><line x1="23" y1="20" x2="23" y2="28" stroke="#fff" stroke-width="1"/></svg></div>
<span class="ef-logo-name">{{brand}}</span>
</div>
<p class="ef-desc">{{description}}</p>
<div class="ef-socials">
<a href="#" class="ef-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
<a href="#" class="ef-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
<a href="#" class="ef-social"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
</div>
</div>
<div>
<h4 class="ef-col-title">Pages</h4>
<ul class="ef-links">{{#pagesLinks}}<li><a href="#">{{.}}</a></li>{{/pagesLinks}}</ul>
</div>
<div>
<h4 class="ef-col-title">Support</h4>
<ul class="ef-links">{{#supportLinks}}<li><a href="#">{{.}}</a></li>{{/supportLinks}}</ul>
</div>
<div>
<h4 class="ef-col-title">Address</h4>
<p class="ef-address">{{address}}</p>
<a href="#" class="ef-map"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> See on Map</a>
</div>
</div>
<div class="ef-bottom">
<p class="ef-copy">{{copyright}}</p>
</div>
</div></footer>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const educationComponents: ComponentDefinition[] = [
  eduNav,
  eduHero,
  eduNews,
  eduPrograms,
  eduAbout,
  eduEvents,
  eduStories,
  eduResearch,
  eduCta,
  eduFooter,
];
