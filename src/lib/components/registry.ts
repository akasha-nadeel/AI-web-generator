import { ComponentDefinition, ComponentCategory } from "./types";
import { navigationComponents } from "./templates/navigation";
import { heroComponents } from "./templates/hero";
import { featuresComponents } from "./templates/features";
import { aboutComponents } from "./templates/about";
import { testimonialsComponents } from "./templates/testimonials";
import { pricingComponents } from "./templates/pricing";
import { galleryComponents } from "./templates/gallery";
import { teamComponents } from "./templates/team";
import { faqComponents } from "./templates/faq";
import { contactComponents } from "./templates/contact";
import { ctaComponents } from "./templates/cta";
import { footerComponents } from "./templates/footer";
import { restaurantComponents } from "./templates/restaurant";
import { portfolioComponents } from "./templates/portfolio";
import { premiumHeroComponents } from "./templates/premium-heroes";
import { premiumSectionComponents } from "./templates/premium-sections";
import { medicalComponents } from "./templates/medical";
import { blogComponents } from "./templates/blog";
import { fitnessComponents } from "./templates/fitness";
import { ecommerceComponents } from "./templates/ecommerce";
import { agencyComponents } from "./templates/agency";
import { realestateComponents } from "./templates/realestate";
import { educationComponents } from "./templates/education";

const allComponents: ComponentDefinition[] = [
  ...navigationComponents,
  ...heroComponents,
  ...featuresComponents,
  ...aboutComponents,
  ...testimonialsComponents,
  ...pricingComponents,
  ...galleryComponents,
  ...teamComponents,
  ...faqComponents,
  ...contactComponents,
  ...ctaComponents,
  ...footerComponents,
  ...restaurantComponents,
  ...portfolioComponents,
  ...premiumHeroComponents,
  ...premiumSectionComponents,
  ...medicalComponents,
  ...blogComponents,
  ...fitnessComponents,
  ...ecommerceComponents,
  ...agencyComponents,
  ...realestateComponents,
  ...educationComponents,
];

const componentMap = new Map<string, ComponentDefinition>(
  allComponents.map((c) => [c.id, c])
);

export function getComponent(id: string): ComponentDefinition | undefined {
  return componentMap.get(id);
}

export function getComponentsByCategory(
  category: ComponentCategory
): ComponentDefinition[] {
  return allComponents.filter((c) => c.category === category);
}

export function getAllComponents(): ComponentDefinition[] {
  return allComponents;
}

export function getComponentIds(): string[] {
  return allComponents.map((c) => c.id);
}

export function getComponentSummary(): string {
  return allComponents
    .map(
      (c) =>
        `- ${c.id} (${c.category}): ${c.description}. Slots: ${Object.entries(c.slots)
          .map(([key, slot]) => `${key}(${slot.type})`)
          .join(", ")}`
    )
    .join("\n");
}

export function getCategories(): ComponentCategory[] {
  return [
    "navigation",
    "hero",
    "features",
    "about",
    "testimonials",
    "pricing",
    "gallery",
    "team",
    "faq",
    "contact",
    "cta",
    "footer",
  ];
}
