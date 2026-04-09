import { ComponentDefinition } from "../types";

export const navSimple: ComponentDefinition = {
  id: "nav-simple",
  category: "navigation",
  name: "Simple Navigation",
  description: "Clean horizontal navbar with logo and links",
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
  html: `<nav style="background-color: {{bg}}; border-bottom: 1px solid rgba(255,255,255,0.1);">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 72px;">
    <a href="#" style="font-size: 24px; font-weight: 700; color: {{primary}}; text-decoration: none; font-family: {{fontHeading}};">{{brand}}</a>
    <div style="display: flex; align-items: center; gap: 32px;">
      {{#links}}<a href="#" style="color: {{text}}; text-decoration: none; font-size: 14px; opacity: 0.8; font-family: {{fontBody}};">{{.}}</a>{{/links}}
      <a href="#" style="background: {{primary}}; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; font-family: {{fontBody}};">{{ctaText}}</a>
    </div>
  </div>
</nav>`,
};

export const navCentered: ComponentDefinition = {
  id: "nav-centered",
  category: "navigation",
  name: "Centered Navigation",
  description: "Navbar with centered logo and links on both sides",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    links: { type: "list", label: "Navigation Links", required: true },
  },
  defaultContent: {
    brand: "Brand",
    links: ["Home", "About", "Services", "Portfolio", "Contact"],
  },
  html: `<nav style="background-color: {{bg}}; border-bottom: 1px solid rgba(255,255,255,0.1);">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: center; height: 72px; gap: 48px;">
    {{#links}}<a href="#" style="color: {{text}}; text-decoration: none; font-size: 14px; opacity: 0.8; font-family: {{fontBody}};">{{.}}</a>{{/links}}
  </div>
</nav>`,
};

export const navTransparent: ComponentDefinition = {
  id: "nav-transparent",
  category: "navigation",
  name: "Transparent Navigation",
  description: "Transparent navbar that overlays hero section",
  source: "custom",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    links: { type: "list", label: "Navigation Links", required: true },
  },
  defaultContent: {
    brand: "Brand",
    links: ["Home", "About", "Services", "Contact"],
  },
  html: `<nav style="position: absolute; top: 0; left: 0; right: 0; z-index: 10;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 72px;">
    <a href="#" style="font-size: 24px; font-weight: 700; color: #ffffff; text-decoration: none; font-family: {{fontHeading}};">{{brand}}</a>
    <div style="display: flex; align-items: center; gap: 32px;">
      {{#links}}<a href="#" style="color: #ffffff; text-decoration: none; font-size: 14px; opacity: 0.85; font-family: {{fontBody}};">{{.}}</a>{{/links}}
    </div>
  </div>
</nav>`,
};

export const navigationComponents = [navSimple, navCentered, navTransparent];
