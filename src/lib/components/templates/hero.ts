import { ComponentDefinition } from "../types";

export const heroCentered: ComponentDefinition = {
  id: "hero-centered",
  category: "hero",
  name: "Centered Hero",
  description: "Full-width hero with centered headline, subheadline, and CTA",
  source: "hyperui",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    subheadline: { type: "longtext", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
    ctaLink: { type: "link", label: "CTA Link", required: false },
  },
  defaultContent: {
    headline: "Welcome to Our Business",
    subheadline: "We help you achieve great things with our amazing services.",
    ctaText: "Get Started",
    ctaLink: "#contact",
  },
  html: `<section style="background-color: {{bg}}; padding: 120px 24px 100px; text-align: center; position: relative; overflow: hidden;">
  <div style="position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, {{primary}}22 0%, transparent 70%);"></div>
  <div style="max-width: 800px; margin: 0 auto; position: relative; z-index: 1;">
    <h1 style="font-size: 56px; font-weight: 800; color: {{text}}; line-height: 1.1; margin-bottom: 24px; font-family: {{fontHeading}};">{{headline}}</h1>
    <p style="font-size: 20px; color: {{text}}; opacity: 0.7; line-height: 1.6; margin-bottom: 40px; font-family: {{fontBody}};">{{subheadline}}</p>
    <a href="{{ctaLink}}" style="display: inline-block; background: {{primary}}; color: #ffffff; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; font-family: {{fontBody}};">{{ctaText}}</a>
  </div>
</section>`,
};

export const heroSplit: ComponentDefinition = {
  id: "hero-split",
  category: "hero",
  name: "Split Hero",
  description: "Two-column hero with text on left and image on right",
  source: "hyperui",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    subheadline: { type: "longtext", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
    image: { type: "image", label: "Hero Image", required: true },
  },
  defaultContent: {
    headline: "Grow Your Business With Us",
    subheadline: "Professional solutions that drive results and help your business reach new heights.",
    ctaText: "Learn More",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  html: `<section style="background-color: {{bg}}; padding: 80px 24px;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
    <div>
      <h1 style="font-size: 48px; font-weight: 800; color: {{text}}; line-height: 1.1; margin-bottom: 24px; font-family: {{fontHeading}};">{{headline}}</h1>
      <p style="font-size: 18px; color: {{text}}; opacity: 0.7; line-height: 1.6; margin-bottom: 32px; font-family: {{fontBody}};">{{subheadline}}</p>
      <a href="#" style="display: inline-block; background: {{primary}}; color: #ffffff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; font-family: {{fontBody}};">{{ctaText}}</a>
    </div>
    <div>
      <img src="{{image}}" alt="" style="width: 100%; border-radius: 16px; object-fit: cover; aspect-ratio: 4/3;" />
    </div>
  </div>
</section>`,
};

export const heroImageBg: ComponentDefinition = {
  id: "hero-image-bg",
  category: "hero",
  name: "Image Background Hero",
  description: "Full-screen hero with background image and overlay text",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    subheadline: { type: "longtext", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
    backgroundImage: { type: "image", label: "Background Image", required: true },
  },
  defaultContent: {
    headline: "Experience Excellence",
    subheadline: "Discover what makes us different and why thousands trust us.",
    ctaText: "Explore Now",
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop",
  },
  html: `<section style="position: relative; min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden;">
  <div style="position: absolute; inset: 0; background-image: url('{{backgroundImage}}'); background-size: cover; background-position: center;"></div>
  <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, {{bg}}cc, {{bg}}ee);"></div>
  <div style="position: relative; z-index: 1; max-width: 800px; padding: 40px 24px;">
    <h1 style="font-size: 56px; font-weight: 800; color: #ffffff; line-height: 1.1; margin-bottom: 24px; font-family: {{fontHeading}};">{{headline}}</h1>
    <p style="font-size: 20px; color: #ffffff; opacity: 0.85; line-height: 1.6; margin-bottom: 40px; font-family: {{fontBody}};">{{subheadline}}</p>
    <a href="#" style="display: inline-block; background: {{primary}}; color: #ffffff; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; font-family: {{fontBody}};">{{ctaText}}</a>
  </div>
</section>`,
};

export const heroGradient: ComponentDefinition = {
  id: "hero-gradient",
  category: "hero",
  name: "Gradient Hero",
  description: "Hero with vibrant gradient background",
  source: "custom",
  slots: {
    headline: { type: "text", label: "Headline", required: true },
    subheadline: { type: "longtext", label: "Subheadline", required: true },
    ctaText: { type: "text", label: "CTA Button", required: true },
    secondaryCtaText: { type: "text", label: "Secondary CTA", required: false },
  },
  defaultContent: {
    headline: "Build Something Amazing",
    subheadline: "The all-in-one platform to launch, grow, and scale your business online.",
    ctaText: "Start Free",
    secondaryCtaText: "Watch Demo",
  },
  html: `<section style="background: linear-gradient(135deg, {{bg}} 0%, {{secondary}} 50%, {{primary}}33 100%); padding: 120px 24px 100px; text-align: center; position: relative; overflow: hidden;">
  <div style="max-width: 800px; margin: 0 auto; position: relative; z-index: 1;">
    <h1 style="font-size: 56px; font-weight: 800; color: {{text}}; line-height: 1.1; margin-bottom: 24px; font-family: {{fontHeading}};">{{headline}}</h1>
    <p style="font-size: 20px; color: {{text}}; opacity: 0.75; line-height: 1.6; margin-bottom: 40px; font-family: {{fontBody}};">{{subheadline}}</p>
    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
      <a href="#" style="display: inline-block; background: {{primary}}; color: #ffffff; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; font-family: {{fontBody}};">{{ctaText}}</a>
      <a href="#" style="display: inline-block; border: 1px solid {{text}}44; color: {{text}}; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; font-family: {{fontBody}};">{{secondaryCtaText}}</a>
    </div>
  </div>
</section>`,
};

export const heroComponents = [heroCentered, heroSplit, heroImageBg, heroGradient];
