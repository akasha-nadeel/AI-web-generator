import { ComponentDefinition } from "../types";

export const testimonialsCards: ComponentDefinition = {
  id: "testimonials-cards",
  category: "testimonials",
  name: "Testimonial Cards",
  description: "Grid of testimonial cards with quotes and avatars",
  source: "flowbite",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    testimonials: { type: "list", label: "Testimonials", required: true },
  },
  defaultContent: {
    title: "What Our Clients Say",
    testimonials: [
      { name: "Sarah Johnson", role: "CEO, TechCorp", quote: "Outstanding service and results. They exceeded every expectation we had.", avatar: "SJ" },
      { name: "Michael Chen", role: "Founder, StartUp", quote: "Working with this team was a game-changer for our business. Highly recommend!", avatar: "MC" },
      { name: "Emily Davis", role: "Marketing Director", quote: "Professional, creative, and always on time. The best decision we ever made.", avatar: "ED" },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; text-align: center; margin-bottom: 64px; font-family: {{fontHeading}};">{{title}}</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      {{#testimonials}}<div style="background: {{text}}08; border: 1px solid {{text}}11; border-radius: 16px; padding: 32px;">
        <div style="font-size: 32px; color: {{primary}}; margin-bottom: 16px;">&ldquo;</div>
        <p style="font-size: 15px; color: {{text}}; opacity: 0.7; line-height: 1.7; margin-bottom: 24px; font-family: {{fontBody}};">{{quote}}</p>
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: {{primary}}33; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: {{primary}};">{{avatar}}</div>
          <div>
            <div style="font-size: 14px; font-weight: 600; color: {{text}}; font-family: {{fontHeading}};">{{name}}</div>
            <div style="font-size: 12px; color: {{text}}; opacity: 0.5; font-family: {{fontBody}};">{{role}}</div>
          </div>
        </div>
      </div>{{/testimonials}}
    </div>
  </div>
</section>`,
};

export const testimonialsQuote: ComponentDefinition = {
  id: "testimonials-quote",
  category: "testimonials",
  name: "Single Quote",
  description: "Large centered testimonial quote",
  source: "flowbite",
  slots: {
    quote: { type: "longtext", label: "Quote", required: true },
    name: { type: "text", label: "Name", required: true },
    role: { type: "text", label: "Role", required: true },
  },
  defaultContent: {
    quote: "This is by far the best service we have ever used. The results speak for themselves — our business has grown 3x since we started working together.",
    name: "Amanda Rodriguez",
    role: "CEO, GrowthLab",
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 800px; margin: 0 auto; text-align: center;">
    <div style="font-size: 64px; color: {{primary}}; opacity: 0.3; margin-bottom: 8px;">&ldquo;</div>
    <p style="font-size: 24px; color: {{text}}; opacity: 0.8; line-height: 1.6; margin-bottom: 32px; font-style: italic; font-family: {{fontBody}};">{{quote}}</p>
    <div style="font-size: 16px; font-weight: 600; color: {{text}}; font-family: {{fontHeading}};">{{name}}</div>
    <div style="font-size: 14px; color: {{primary}}; margin-top: 4px; font-family: {{fontBody}};">{{role}}</div>
  </div>
</section>`,
};

export const testimonialsComponents = [testimonialsCards, testimonialsQuote];
