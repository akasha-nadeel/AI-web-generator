import { ComponentDefinition } from "../types";

export const ctaSimple: ComponentDefinition = {
  id: "cta-simple",
  category: "cta",
  name: "Simple CTA",
  description: "Centered call-to-action banner",
  source: "hyperui",
  slots: {
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    ctaText: { type: "text", label: "CTA Button Text", required: true },
  },
  defaultContent: {
    title: "Ready to Get Started?",
    subtitle: "Join thousands of satisfied customers and take your business to the next level.",
    ctaText: "Start Now",
  },
  html: `<section style="background: linear-gradient(135deg, {{primary}}22, {{secondary}}33); padding: 96px 24px;">
  <div style="max-width: 700px; margin: 0 auto; text-align: center;">
    <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; margin-bottom: 16px; font-family: {{fontHeading}};">{{title}}</h2>
    <p style="font-size: 18px; color: {{text}}; opacity: 0.65; margin-bottom: 40px; line-height: 1.6; font-family: {{fontBody}};">{{subtitle}}</p>
    <a href="#" style="display: inline-block; background: {{primary}}; color: #ffffff; padding: 16px 48px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; font-family: {{fontBody}};">{{ctaText}}</a>
  </div>
</section>`,
};

export const ctaComponents = [ctaSimple];
