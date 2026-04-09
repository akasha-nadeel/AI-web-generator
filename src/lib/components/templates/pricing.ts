import { ComponentDefinition } from "../types";

export const pricingThreeCol: ComponentDefinition = {
  id: "pricing-three-col",
  category: "pricing",
  name: "Three Column Pricing",
  description: "Three pricing cards with featured middle option",
  source: "preline",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    plans: { type: "list", label: "Plans", required: true },
  },
  defaultContent: {
    title: "Simple Pricing",
    subtitle: "Choose the plan that works best for you.",
    plans: [
      { name: "Starter", price: "9", period: "/month", features: ["5 Projects", "Basic Support", "1 User"], featured: false, ctaText: "Get Started" },
      { name: "Professional", price: "29", period: "/month", features: ["Unlimited Projects", "Priority Support", "5 Users", "Analytics"], featured: true, ctaText: "Get Started" },
      { name: "Enterprise", price: "99", period: "/month", features: ["Everything in Pro", "Dedicated Support", "Unlimited Users", "Custom Integrations", "SLA"], featured: false, ctaText: "Contact Us" },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 1100px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 64px;">
      <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; margin-bottom: 16px; font-family: {{fontHeading}};">{{title}}</h2>
      <p style="font-size: 18px; color: {{text}}; opacity: 0.6; font-family: {{fontBody}};">{{subtitle}}</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: center;">
      {{#plans}}<div style="background: {{bg}}; border: 2px solid {{primary}}22; border-radius: 20px; padding: 40px 32px; text-align: center; position: relative;">
        <h3 style="font-size: 20px; font-weight: 600; color: {{text}}; margin-bottom: 8px; font-family: {{fontHeading}};">{{name}}</h3>
        <div style="margin-bottom: 24px;">
          <span style="font-size: 48px; font-weight: 800; color: {{text}}; font-family: {{fontHeading}};">\${{price}}</span>
          <span style="font-size: 16px; color: {{text}}; opacity: 0.5;">{{period}}</span>
        </div>
        <ul style="list-style: none; padding: 0; margin-bottom: 32px;">
          {{#features}}<li style="padding: 8px 0; font-size: 15px; color: {{text}}; opacity: 0.7; border-bottom: 1px solid {{text}}0a; font-family: {{fontBody}};">{{.}}</li>{{/features}}
        </ul>
        <a href="#" style="display: block; background: {{primary}}; color: #ffffff; padding: 14px; border-radius: 10px; text-decoration: none; font-weight: 600; font-family: {{fontBody}};">{{ctaText}}</a>
      </div>{{/plans}}
    </div>
  </div>
</section>`,
};

export const pricingComponents = [pricingThreeCol];
