import { ComponentDefinition } from "../types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEDICAL NAV — Clean white navbar with blue accents
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const medicalNav: ComponentDefinition = {
  id: "medical-nav",
  category: "navigation",
  name: "Medical Navigation",
  description: "Clean white navigation bar with logo icon, links, and login button",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    links: { type: "list", label: "Navigation Links", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
  },
  defaultContent: {
    brand: "Healis",
    links: ["Home", "About us", "Services", "Locations"],
    ctaText: "Login",
  },
  html: `<style>
.mn-links{display:flex;align-items:center;gap:32px}
.mn-cta{display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 24px;border-radius:24px;background:{{primary}};color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};white-space:nowrap;border:none;cursor:pointer}
@media(max-width:768px){.mn-links{display:none!important}.mn-inner{padding:0 16px!important}}
@media(min-width:769px) and (max-width:1024px){.mn-links{gap:20px!important}.mn-links a{font-size:13px!important}}
</style>
<nav style="position:relative;z-index:100;background:#ffffff;border-bottom:1px solid #f0f0f0;">
  <div class="mn-inner" style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:72px;">
    <a href="#" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
      <div style="width:32px;height:32px;border-radius:8px;background:{{primary}};display:flex;align-items:center;justify-content:center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L12 22M2 12L22 12" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>
      </div>
      <span style="font-size:20px;font-weight:700;color:#0f172a;font-family:{{fontBody}};letter-spacing:-0.3px;">{{brand}}</span>
    </a>
    <div class="mn-links">
      {{#links}}<a href="#" style="color:#64748b;text-decoration:none;font-size:15px;font-family:{{fontBody}};font-weight:500;white-space:nowrap;">{{.}}</a>{{/links}}
    </div>
    <a href="#" class="mn-cta">{{ctaText}}</a>
  </div>
</nav>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEDICAL HERO — Large display heading with doctor image + video call UI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const medicalHero: ComponentDefinition = {
  id: "medical-hero",
  category: "hero",
  name: "Medical Hero",
  description: "Large display heading with doctor image, badge pill, specialty bar, and video call UI overlay",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Main Headline", required: true },
    badge: { type: "text", label: "Badge Text", required: false },
    description: { type: "text", label: "Description", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
    image: { type: "image", label: "Doctor Image", required: true },
    specialties: { type: "list", label: "Specialty Tags", required: false },
  },
  defaultContent: {
    headline: "Healis Clinic",
    badge: "Expert Guidance",
    description: "We provide compassionate care and advanced treatments tailored to your needs. Experience convenient access to healthcare.",
    ctaText: "Explore services",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop",
    specialties: ["Cardiology", "Pediatrics", "Dermatology", "Gastroenterology"],
  },
  html: `<style>
.mh-section{background:#ffffff;overflow:hidden}
.mh-wrap{max-width:1200px;margin:0 auto;padding:64px 40px 0}
.mh-top{display:grid;grid-template-columns:1fr 380px;gap:48px;align-items:start;position:relative}
.mh-left{padding-top:24px}
.mh-badge{display:inline-flex;align-items:center;gap:8px;background:{{primary}};color:#fff;font-size:13px;font-weight:600;padding:8px 20px;border-radius:24px;font-family:{{fontBody}};margin-bottom:24px}
.mh-badge::before{content:"";width:8px;height:8px;border-radius:50%;background:#fff}
.mh-heading{font-size:80px;font-weight:800;color:#0f172a;font-family:{{fontHeading}};line-height:0.95;letter-spacing:-3px;margin:0 0 28px}
.mh-desc{font-size:15px;color:#64748b;line-height:1.7;max-width:380px;margin:0 0 32px;font-family:{{fontBody}}}
.mh-cta{display:inline-flex;align-items:center;gap:8px;height:48px;padding:0 28px;border-radius:12px;background:{{primary}};color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};border:none;cursor:pointer}
.mh-right{position:relative}
.mh-img{width:100%;aspect-ratio:3/4;object-fit:cover;object-position:top;border-radius:20px;display:block}
.mh-video-ui{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:10px;align-items:center;background:#fff;padding:10px 16px;border-radius:40px;box-shadow:0 8px 32px rgba(0,0,0,0.12)}
.mh-vid-btn{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer}
.mh-bar{margin:40px 0 0;background:{{primary}};border-radius:16px;padding:22px 40px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap}
.mh-bar-item{color:#fff;font-size:17px;font-weight:600;font-family:{{fontHeading}};padding:0 20px}
.mh-bar-item+.mh-bar-item{border-left:1px solid rgba(255,255,255,0.3)}
@media(max-width:1024px){.mh-top{grid-template-columns:1fr 280px!important;gap:32px}.mh-heading{font-size:56px!important;letter-spacing:-2px}.mh-wrap{padding:40px 24px 0}}
@media(max-width:768px){.mh-top{grid-template-columns:1fr!important}.mh-heading{font-size:42px!important;letter-spacing:-1px}.mh-right{max-width:300px;margin:0 auto}.mh-bar{padding:16px 20px!important}.mh-bar-item{font-size:14px!important;padding:0 12px!important}}
</style>
<section class="mh-section">
  <div class="mh-wrap">
    <div class="mh-top">
      <div class="mh-left">
        <div class="mh-badge">{{badge}}</div>
        <h1 class="mh-heading">{{headline}}</h1>
        <p class="mh-desc">{{description}}</p>
        <a href="#" class="mh-cta">{{ctaText}}</a>
      </div>
      <div class="mh-right">
        <img src="{{image}}" alt="Doctor" class="mh-img" />
        <div class="mh-video-ui">
          <div class="mh-vid-btn" style="background:{{primary}};"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg></div>
          <div class="mh-vid-btn" style="background:#ef4444;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
        </div>
      </div>
    </div>
    <div class="mh-bar">
      {{#specialties}}<span class="mh-bar-item">{{.}}</span>{{/specialties}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEDICAL DOCTOR PROFILE — Featured doctor card with stats
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const medicalDoctor: ComponentDefinition = {
  id: "medical-doctor",
  category: "about",
  name: "Medical Doctor Profile",
  description: "Featured doctor profile with photo, credentials, stats, and achievements section",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    doctorName: { type: "text", label: "Doctor Name", required: true },
    doctorTitle: { type: "text", label: "Doctor Title", required: true },
    doctorDesc: { type: "text", label: "Doctor Description", required: true },
    doctorImage: { type: "image", label: "Doctor Photo", required: true },
    tag1: { type: "text", label: "Tag 1", required: false },
    tag2: { type: "text", label: "Tag 2", required: false },
    achieveTitle: { type: "text", label: "Achievements Title", required: true },
    achieveAccent: { type: "text", label: "Achievements Accent Word", required: true },
    achieveDesc: { type: "text", label: "Achievements Description", required: true },
    achieveImage: { type: "image", label: "Achievement Image", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
    stats: { type: "list", label: "Stats", required: true },
  },
  defaultContent: {
    label: "Healis Health Solution",
    doctorName: "Dr. Diana Clay",
    doctorTitle: "Lead Cardiologist",
    doctorDesc: "A dedicated cardiologist focused on heart health and patient-centered care.",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop",
    tag1: "Boston Health Center",
    tag2: "Cardiology",
    achieveTitle: "Professional achievements of our",
    achieveAccent: "specialists",
    achieveDesc: "Our doctors have successfully treated thousands of patients, achieving a remarkable satisfaction rate. Their dedication to research has led to numerous published papers in esteemed medical journals.",
    achieveImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    ctaText: "Book now",
    stats: [
      { number: "95%", desc: "Patient satisfaction rate" },
      { number: "120", desc: "Research papers published" },
    ],
  },
  html: `<style>
.md-section{background:#ffffff;padding:80px 40px}
.md-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
.md-profile{background:#f8fafc;border-radius:24px;padding:32px;position:relative;overflow:hidden}
.md-profile-img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:16px;display:block;margin-bottom:20px}
.md-tags{display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap}
.md-tag{font-size:12px;color:#64748b;background:#f1f5f9;padding:6px 14px;border-radius:20px;font-family:{{fontBody}};font-weight:500}
.md-doc-name{font-size:28px;font-weight:800;color:#0f172a;font-family:{{fontHeading}};margin:0 0 4px}
.md-doc-desc{font-size:14px;color:#64748b;line-height:1.6;font-family:{{fontBody}};margin-bottom:20px}
.md-socials{display:flex;gap:8px;margin-bottom:20px}
.md-social{width:32px;height:32px;border-radius:8px;background:{{primary}};display:flex;align-items:center;justify-content:center}
.md-book-btn{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 24px;border-radius:12px;background:{{primary}};color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};border:none;cursor:pointer}
.md-achieve{display:flex;flex-direction:column;justify-content:center}
.md-achieve-title{font-size:32px;font-weight:800;color:#0f172a;font-family:{{fontHeading}};line-height:1.2;margin:0 0 16px}
.md-achieve-accent{color:{{primary}};font-style:italic}
.md-achieve-desc{font-size:14px;color:#64748b;line-height:1.7;font-family:{{fontBody}};margin-bottom:24px}
.md-achieve-img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:16px;display:block;margin-bottom:24px}
.md-stats{display:flex;gap:32px;margin-bottom:24px}
.md-stat-num{font-size:36px;font-weight:800;color:#0f172a;font-family:{{fontHeading}};line-height:1}
.md-stat-desc{font-size:13px;color:#94a3b8;font-family:{{fontBody}};margin-top:4px}
.md-learn{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 24px;border-radius:12px;background:{{primary}};color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};border:none;cursor:pointer}
@media(max-width:1024px){.md-inner{grid-template-columns:1fr!important;gap:40px}.md-profile{max-width:500px}}
@media(max-width:768px){.md-section{padding:48px 20px!important}.md-achieve-title{font-size:24px!important}.md-stat-num{font-size:28px!important}}
</style>
<section class="md-section">
  <div class="md-inner">
    <div class="md-profile">
      <img src="{{doctorImage}}" alt="{{doctorName}}" class="md-profile-img" />
      <div class="md-tags">
        <span class="md-tag">{{tag1}}</span>
        <span class="md-tag">{{tag2}}</span>
      </div>
      <h3 class="md-doc-name">{{doctorName}}</h3>
      <p class="md-doc-desc">{{doctorDesc}}</p>
      <div class="md-socials">
        <div class="md-social"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></div>
        <div class="md-social"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="{{primary}}"/><circle cx="17.5" cy="6.5" r="1.5" fill="{{primary}}"/></svg></div>
        <div class="md-social"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></div>
      </div>
      <a href="#" class="md-book-btn">{{ctaText}}</a>
    </div>
    <div class="md-achieve">
      <h2 class="md-achieve-title">{{achieveTitle}} <span class="md-achieve-accent">{{achieveAccent}}</span></h2>
      <img src="{{achieveImage}}" alt="Achievement" class="md-achieve-img" />
      <p class="md-achieve-desc">{{achieveDesc}}</p>
      <div class="md-stats">
        {{#stats}}<div><div class="md-stat-num">{{number}}</div><div class="md-stat-desc">{{desc}}</div></div>{{/stats}}
      </div>
      <a href="#" class="md-learn">Learn more</a>
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEDICAL TESTIMONIALS — Patient reviews with avatars
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const medicalTestimonials: ComponentDefinition = {
  id: "medical-testimonials",
  category: "testimonials",
  name: "Medical Testimonials",
  description: "Patient testimonials section with label, accent heading, and review cards with avatars",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Section Title", required: true },
    accentWord: { type: "text", label: "Accent Word", required: true },
    reviews: { type: "list", label: "Reviews", required: true },
  },
  defaultContent: {
    label: "Healis Health Solution",
    title: "What our patients says about",
    accentWord: "Healis",
    reviews: [
      { quote: "The care I received was exceptional, and the staff made me feel at ease throughout my treatment.", reviewer: "James", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
      { quote: "The care I received was exceptional, and the staff made me feel at ease throughout my treatment.", reviewer: "Laura", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
      { quote: "Incredibly professional team. They took the time to explain everything and truly listened to my concerns.", reviewer: "David", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
    ],
  },
  html: `<style>
.mt-section{background:#ffffff;padding:80px 40px}
.mt-inner{max-width:1200px;margin:0 auto;text-align:center}
.mt-label{display:inline-block;font-size:13px;font-weight:600;color:{{primary}};padding:6px 16px;border-radius:20px;border:1px solid {{primary}};font-family:{{fontBody}};margin-bottom:20px}
.mt-title{font-size:40px;font-weight:800;color:#0f172a;font-family:{{fontHeading}};margin:0 0 48px;line-height:1.2}
.mt-accent{color:{{primary}};font-style:italic}
.mt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.mt-card{background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;padding:28px;text-align:left;position:relative}
.mt-avatar{width:56px;height:56px;border-radius:14px;object-fit:cover;display:block;margin-bottom:20px}
.mt-quote{font-size:15px;color:#475569;line-height:1.7;font-family:{{fontBody}};margin:0 0 16px;font-style:italic}
.mt-reviewer{font-size:14px;font-weight:700;color:#0f172a;font-family:{{fontBody}}}
@media(max-width:1024px){.mt-grid{grid-template-columns:1fr 1fr!important}}
@media(max-width:768px){.mt-section{padding:48px 20px!important}.mt-title{font-size:28px!important}.mt-grid{grid-template-columns:1fr!important}}
</style>
<section class="mt-section">
  <div class="mt-inner">
    <span class="mt-label">{{label}}</span>
    <h2 class="mt-title">{{title}} <span class="mt-accent">{{accentWord}}</span></h2>
    <div class="mt-grid">
      {{#reviews}}<div class="mt-card">
        <img src="{{image}}" alt="{{reviewer}}" class="mt-avatar" />
        <p class="mt-quote">"{{quote}}"</p>
        <span class="mt-reviewer">{{reviewer}}</span>
      </div>{{/reviews}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEDICAL TEAM — Team grid with doctor cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const medicalTeam: ComponentDefinition = {
  id: "medical-team",
  category: "team",
  name: "Medical Team",
  description: "Team section with doctor cards featuring photos, names, roles, descriptions, and book buttons",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Section Title", required: true },
    accentWord: { type: "text", label: "Accent Word", required: true },
    subtitle: { type: "text", label: "Subtitle", required: false },
    members: { type: "list", label: "Team Members", required: true },
  },
  defaultContent: {
    label: "Healis Health Solution",
    title: "Our amazing",
    accentWord: "team",
    subtitle: "Meet our dedicated healthcare professionals.",
    members: [
      { name: "Dr. James", role: "Medical Director", desc: "Oversees medical operations and ensures quality patient care.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop" },
      { name: "Dr. Sarah", role: "Cardiologist", desc: "Specialized in heart disease prevention and treatment.", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop" },
      { name: "Dr. Michael", role: "Pediatrician", desc: "Dedicated to children's health and well-being.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop" },
    ],
  },
  html: `<style>
.mteam-section{background:#f8fafc;padding:80px 40px}
.mteam-inner{max-width:1200px;margin:0 auto}
.mteam-header{text-align:right;margin-bottom:48px}
.mteam-label{display:inline-block;font-size:13px;font-weight:600;color:{{primary}};padding:6px 16px;border-radius:20px;border:1px solid {{primary}};font-family:{{fontBody}};margin-bottom:16px}
.mteam-title{font-size:40px;font-weight:800;color:#0f172a;font-family:{{fontHeading}};margin:0 0 8px;line-height:1.2}
.mteam-accent{color:{{primary}};font-style:italic}
.mteam-subtitle{font-size:15px;color:#64748b;font-family:{{fontBody}};margin:0}
.mteam-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.mteam-card{background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0}
.mteam-img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block}
.mteam-info{padding:20px}
.mteam-name{font-size:18px;font-weight:700;color:#0f172a;font-family:{{fontHeading}};margin:0 0 2px}
.mteam-role{font-size:13px;color:{{primary}};font-weight:600;font-family:{{fontBody}};margin-bottom:8px}
.mteam-desc{font-size:13px;color:#64748b;line-height:1.6;font-family:{{fontBody}};margin-bottom:16px}
.mteam-book{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 20px;border-radius:10px;background:{{primary}};color:#fff;font-size:13px;font-weight:600;text-decoration:none;font-family:{{fontBody}};border:none;cursor:pointer}
@media(max-width:1024px){.mteam-grid{grid-template-columns:1fr 1fr!important}}
@media(max-width:768px){.mteam-section{padding:48px 20px!important}.mteam-title{font-size:28px!important}.mteam-grid{grid-template-columns:1fr!important}.mteam-header{text-align:center!important}}
</style>
<section class="mteam-section">
  <div class="mteam-inner">
    <div class="mteam-header">
      <span class="mteam-label">{{label}}</span>
      <h2 class="mteam-title">{{title}} <span class="mteam-accent">{{accentWord}}</span></h2>
      <p class="mteam-subtitle">{{subtitle}}</p>
    </div>
    <div class="mteam-grid">
      {{#members}}<div class="mteam-card">
        <img src="{{image}}" alt="{{name}}" class="mteam-img" />
        <div class="mteam-info">
          <h3 class="mteam-name">{{name}}</h3>
          <div class="mteam-role">{{role}}</div>
          <p class="mteam-desc">{{desc}}</p>
          <a href="#" class="mteam-book">Book</a>
        </div>
      </div>{{/members}}
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEDICAL ABOUT/PARTNER — Split layout with stats
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const medicalAbout: ComponentDefinition = {
  id: "medical-about",
  category: "about",
  name: "Medical About",
  description: "Split layout about section with doctor image, heading with accent word, description, and stats",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Section Title", required: true },
    accentWord: { type: "text", label: "Accent Word", required: true },
    description: { type: "text", label: "Description", required: true },
    image: { type: "image", label: "Image", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
    stats: { type: "list", label: "Stats", required: true },
  },
  defaultContent: {
    label: "Healis Health Solution",
    title: "Your trusted health",
    accentWord: "partner",
    description: "At Healis, we're your trusted health partner. Our experienced team delivers personalized, high-quality care to enhance your well-being and guide you to a healthier life.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=700&fit=crop",
    ctaText: "Book",
    stats: [
      { number: "17k+", desc: "Satisfied patients" },
      { number: "17k+", desc: "Satisfied patients" },
    ],
  },
  html: `<style>
.mab-section{background:#ffffff;padding:80px 40px}
.mab-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.mab-img-col{position:relative}
.mab-img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:24px;display:block}
.mab-content{}
.mab-label{display:inline-block;font-size:13px;font-weight:600;color:{{primary}};padding:6px 16px;border-radius:20px;border:1px solid {{primary}};font-family:{{fontBody}};margin-bottom:20px}
.mab-title{font-size:40px;font-weight:800;color:#0f172a;font-family:{{fontHeading}};line-height:1.2;margin:0 0 16px}
.mab-accent{color:{{primary}};font-style:italic}
.mab-desc{font-size:15px;color:#64748b;line-height:1.7;font-family:{{fontBody}};margin-bottom:32px}
.mab-stats{display:flex;gap:48px;margin-bottom:32px}
.mab-stat-num{font-size:40px;font-weight:800;color:#0f172a;font-family:{{fontHeading}};line-height:1}
.mab-stat-desc{font-size:13px;color:#94a3b8;font-family:{{fontBody}};margin-top:4px}
.mab-cta{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 28px;border-radius:12px;background:{{primary}};color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};border:none;cursor:pointer}
@media(max-width:1024px){.mab-inner{grid-template-columns:1fr!important;gap:40px}.mab-img{max-width:400px}}
@media(max-width:768px){.mab-section{padding:48px 20px!important}.mab-title{font-size:28px!important}.mab-stat-num{font-size:32px!important}}
</style>
<section class="mab-section">
  <div class="mab-inner">
    <div class="mab-img-col">
      <img src="{{image}}" alt="Healthcare" class="mab-img" />
    </div>
    <div class="mab-content">
      <span class="mab-label">{{label}}</span>
      <h2 class="mab-title">{{title}} <span class="mab-accent">{{accentWord}}</span></h2>
      <p class="mab-desc">{{description}}</p>
      <div class="mab-stats">
        {{#stats}}<div><div class="mab-stat-num">{{number}}</div><div class="mab-stat-desc">{{desc}}</div></div>{{/stats}}
      </div>
      <a href="#" class="mab-cta">{{ctaText}}</a>
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEDICAL MISSION — Values section with bullet points + facility image
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const medicalMission: ComponentDefinition = {
  id: "medical-mission",
  category: "about",
  name: "Medical Mission & Values",
  description: "Mission section with facility image, heading with accent, bullet-point values, and CTA",
  source: "custom",
  slots: {
    label: { type: "text", label: "Section Label", required: false },
    title: { type: "text", label: "Section Title", required: true },
    accentWord: { type: "text", label: "Accent Word", required: true },
    description: { type: "text", label: "Description", required: true },
    image: { type: "image", label: "Facility Image", required: true },
    ctaText: { type: "text", label: "CTA Text", required: false },
    values: { type: "list", label: "Core Values", required: true },
  },
  defaultContent: {
    label: "Healis Health Solution",
    title: "Our mission and core",
    accentWord: "values",
    description: "We are dedicated to providing exceptional patient care while fostering a culture of community involvement and continuous improvement. Our commitment ensures that every patient receives personalized attention and the highest quality of service.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
    ctaText: "Learn more",
    values: [
      { text: "Putting patients first in everything we do" },
      { text: "Engaging with our community for healthier lives" },
      { text: "Striving for excellence through continuous improvement" },
    ],
  },
  html: `<style>
.mmis-section{background:#f8fafc;padding:80px 40px}
.mmis-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.mmis-img-col{}
.mmis-img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:24px;display:block}
.mmis-content{}
.mmis-label{display:inline-block;font-size:13px;font-weight:600;color:{{primary}};padding:6px 16px;border-radius:20px;border:1px solid {{primary}};font-family:{{fontBody}};margin-bottom:20px}
.mmis-title{font-size:36px;font-weight:800;color:#0f172a;font-family:{{fontHeading}};line-height:1.2;margin:0 0 16px}
.mmis-accent{color:{{primary}};font-style:italic}
.mmis-desc{font-size:14px;color:#64748b;line-height:1.7;font-family:{{fontBody}};margin-bottom:24px}
.mmis-values{list-style:none;padding:0;margin:0 0 28px}
.mmis-val{display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;font-size:14px;color:#334155;font-family:{{fontBody}};line-height:1.5}
.mmis-check{width:20px;height:20px;border-radius:6px;background:{{primary}};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.mmis-cta{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 28px;border-radius:12px;background:{{primary}};color:#fff;font-size:14px;font-weight:600;text-decoration:none;font-family:{{fontBody}};border:none;cursor:pointer}
@media(max-width:1024px){.mmis-inner{grid-template-columns:1fr!important;gap:40px}}
@media(max-width:768px){.mmis-section{padding:48px 20px!important}.mmis-title{font-size:26px!important}}
</style>
<section class="mmis-section">
  <div class="mmis-inner">
    <div class="mmis-img-col">
      <img src="{{image}}" alt="Our facility" class="mmis-img" />
    </div>
    <div class="mmis-content">
      <span class="mmis-label">{{label}}</span>
      <h2 class="mmis-title">{{title}} <span class="mmis-accent">{{accentWord}}</span></h2>
      <p class="mmis-desc">{{description}}</p>
      <ul class="mmis-values">
        {{#values}}<li class="mmis-val"><span class="mmis-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>{{text}}</li>{{/values}}
      </ul>
      <a href="#" class="mmis-cta">{{ctaText}}</a>
    </div>
  </div>
</section>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEDICAL FOOTER — Clean white footer with blue accents
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const medicalFooter: ComponentDefinition = {
  id: "medical-footer",
  category: "footer",
  name: "Medical Footer",
  description: "Clean medical footer with logo, tagline, link columns, and copyright",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    tagline: { type: "text", label: "Tagline", required: false },
    columns: { type: "list", label: "Footer Columns", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
  },
  defaultContent: {
    brand: "Healis",
    tagline: "Your trusted health partner, delivering quality care since 2010.",
    columns: [
      { title: "Services", links: ["Cardiology", "Pediatrics", "Dermatology", "Urgent Care"] },
      { title: "Company", links: ["About Us", "Our Team", "Careers", "Blog"] },
      { title: "Contact", links: ["Locations", "Book Online", "Emergency", "Support"] },
    ],
    copyright: "2026 Healis Health. All rights reserved.",
  },
  html: `<style>
.mf-section{background:#ffffff;border-top:1px solid #e2e8f0;padding:64px 40px 32px}
.mf-inner{max-width:1200px;margin:0 auto}
.mf-top{display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:40px;margin-bottom:48px}
.mf-brand-col{}
.mf-logo{display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:16px}
.mf-logo-icon{width:32px;height:32px;border-radius:8px;background:{{primary}};display:flex;align-items:center;justify-content:center}
.mf-logo-text{font-size:20px;font-weight:700;color:#0f172a;font-family:{{fontBody}}}
.mf-tagline{font-size:14px;color:#94a3b8;line-height:1.6;font-family:{{fontBody}};max-width:280px}
.mf-col-title{font-size:14px;font-weight:700;color:#0f172a;font-family:{{fontBody}};margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px}
.mf-col-links{list-style:none;padding:0;margin:0}
.mf-col-links li{margin-bottom:10px}
.mf-col-links a{font-size:14px;color:#64748b;text-decoration:none;font-family:{{fontBody}}}
.mf-bottom{border-top:1px solid #e2e8f0;padding-top:24px;text-align:center}
.mf-copyright{font-size:13px;color:#94a3b8;font-family:{{fontBody}}}
@media(max-width:768px){.mf-section{padding:40px 20px 24px!important}.mf-top{grid-template-columns:1fr 1fr!important;gap:28px}}
</style>
<footer class="mf-section">
  <div class="mf-inner">
    <div class="mf-top">
      <div class="mf-brand-col">
        <div class="mf-logo">
          <div class="mf-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L12 22M2 12L22 12" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg></div>
          <span class="mf-logo-text">{{brand}}</span>
        </div>
        <p class="mf-tagline">{{tagline}}</p>
      </div>
      {{#columns}}<div>
        <h4 class="mf-col-title">{{title}}</h4>
        <ul class="mf-col-links">{{#links}}<li><a href="#">{{.}}</a></li>{{/links}}</ul>
      </div>{{/columns}}
    </div>
    <div class="mf-bottom">
      <p class="mf-copyright">© {{copyright}}</p>
    </div>
  </div>
</footer>`,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const medicalComponents: ComponentDefinition[] = [
  medicalNav,
  medicalHero,
  medicalDoctor,
  medicalTestimonials,
  medicalTeam,
  medicalAbout,
  medicalMission,
  medicalFooter,
];
