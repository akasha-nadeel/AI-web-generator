import { ComponentDefinition } from "../types";

export const faqAccordion: ComponentDefinition = {
  id: "faq-accordion",
  category: "faq",
  name: "FAQ Accordion",
  description: "Frequently asked questions with expandable answers",
  source: "flowbite",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    items: { type: "list", label: "FAQ Items", required: true },
  },
  defaultContent: {
    title: "Frequently Asked Questions",
    items: [
      { question: "How do I get started?", answer: "Simply sign up for an account, choose your plan, and you can start using our services immediately. Our onboarding process will guide you through everything." },
      { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partner." },
      { question: "Can I cancel my subscription?", answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees." },
      { question: "Do you offer customer support?", answer: "Absolutely! Our support team is available via email and chat. Pro and Enterprise plans include priority support with faster response times." },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 800px; margin: 0 auto;">
    <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; text-align: center; margin-bottom: 64px; font-family: {{fontHeading}};">{{title}}</h2>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      {{#items}}<details style="background: {{text}}06; border: 1px solid {{text}}0a; border-radius: 12px; padding: 24px;">
        <summary style="font-size: 17px; font-weight: 600; color: {{text}}; cursor: pointer; list-style: none; font-family: {{fontHeading}};">{{question}}</summary>
        <p style="margin-top: 16px; font-size: 15px; color: {{text}}; opacity: 0.65; line-height: 1.7; font-family: {{fontBody}};">{{answer}}</p>
      </details>{{/items}}
    </div>
  </div>
</section>`,
};

export const faqComponents = [faqAccordion];
