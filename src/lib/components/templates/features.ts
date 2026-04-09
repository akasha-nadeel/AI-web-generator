import { ComponentDefinition } from "../types";

export const featuresGrid: ComponentDefinition = {
  id: "features-grid",
  category: "features",
  name: "Features Grid",
  description: "3-column grid of feature cards with icons",
  source: "preline",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    subtitle: { type: "longtext", label: "Section Subtitle", required: false },
    features: { type: "list", label: "Features", required: true },
  },
  defaultContent: {
    title: "Why Choose Us",
    subtitle: "Everything you need to succeed, all in one place.",
    features: [
      { title: "Fast & Reliable", description: "Lightning-fast performance you can count on.", icon: "⚡" },
      { title: "Secure & Private", description: "Your data is protected with enterprise-grade security.", icon: "🔒" },
      { title: "24/7 Support", description: "Our team is always here to help you succeed.", icon: "💬" },
      { title: "Easy to Use", description: "Intuitive interface that anyone can master.", icon: "✨" },
      { title: "Customizable", description: "Tailor everything to match your brand perfectly.", icon: "🎨" },
      { title: "Analytics", description: "Deep insights to help you make better decisions.", icon: "📊" },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 64px;">
      <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; margin-bottom: 16px; font-family: {{fontHeading}};">{{title}}</h2>
      <p style="font-size: 18px; color: {{text}}; opacity: 0.6; max-width: 600px; margin: 0 auto; font-family: {{fontBody}};">{{subtitle}}</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
      {{#features}}<div style="background: {{bg}}; border: 1px solid {{text}}11; border-radius: 16px; padding: 32px;">
        <div style="font-size: 32px; margin-bottom: 16px;">{{icon}}</div>
        <h3 style="font-size: 20px; font-weight: 600; color: {{text}}; margin-bottom: 8px; font-family: {{fontHeading}};">{{title}}</h3>
        <p style="font-size: 15px; color: {{text}}; opacity: 0.6; line-height: 1.6; font-family: {{fontBody}};">{{description}}</p>
      </div>{{/features}}
    </div>
  </div>
</section>`,
};

export const featuresAlternating: ComponentDefinition = {
  id: "features-alternating",
  category: "features",
  name: "Alternating Features",
  description: "Features displayed in alternating left-right layout with images",
  source: "preline",
  slots: {
    features: { type: "list", label: "Features", required: true },
  },
  defaultContent: {
    features: [
      { title: "Designed for Growth", description: "Our platform scales with your business, from startup to enterprise.", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" },
      { title: "Built for Teams", description: "Collaborate seamlessly with your entire team in real-time.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 80px;">
    {{#features}}<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
      <div>
        <h3 style="font-size: 32px; font-weight: 700; color: {{text}}; margin-bottom: 16px; font-family: {{fontHeading}};">{{title}}</h3>
        <p style="font-size: 17px; color: {{text}}; opacity: 0.65; line-height: 1.7; font-family: {{fontBody}};">{{description}}</p>
      </div>
      <div>
        <img src="{{image}}" alt="{{title}}" style="width: 100%; border-radius: 16px; object-fit: cover;" />
      </div>
    </div>{{/features}}
  </div>
</section>`,
};

export const featuresCards: ComponentDefinition = {
  id: "features-cards",
  category: "features",
  name: "Feature Cards",
  description: "Highlighted feature cards with colored accents",
  source: "preline",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    features: { type: "list", label: "Features", required: true },
  },
  defaultContent: {
    title: "Our Services",
    features: [
      { title: "Web Design", description: "Beautiful, responsive websites crafted for your brand.", icon: "🌐" },
      { title: "Development", description: "Custom solutions built with modern technologies.", icon: "💻" },
      { title: "Marketing", description: "Strategic campaigns that drive real results.", icon: "📈" },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; text-align: center; margin-bottom: 64px; font-family: {{fontHeading}};">{{title}}</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      {{#features}}<div style="background: linear-gradient(135deg, {{primary}}11, {{primary}}05); border: 1px solid {{primary}}22; border-radius: 16px; padding: 40px 32px; text-align: center;">
        <div style="font-size: 40px; margin-bottom: 20px;">{{icon}}</div>
        <h3 style="font-size: 22px; font-weight: 600; color: {{text}}; margin-bottom: 12px; font-family: {{fontHeading}};">{{title}}</h3>
        <p style="font-size: 15px; color: {{text}}; opacity: 0.6; line-height: 1.6; font-family: {{fontBody}};">{{description}}</p>
      </div>{{/features}}
    </div>
  </div>
</section>`,
};

export const featuresComponents = [featuresGrid, featuresAlternating, featuresCards];
