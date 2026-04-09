export type ComponentCategory =
  | "navigation"
  | "hero"
  | "features"
  | "about"
  | "testimonials"
  | "pricing"
  | "gallery"
  | "team"
  | "faq"
  | "contact"
  | "cta"
  | "blog"
  | "footer";

export interface SlotDefinition {
  type: "text" | "longtext" | "image" | "link" | "list" | "icon";
  label: string;
  required: boolean;
}

export interface ComponentDefinition {
  id: string;
  category: ComponentCategory;
  name: string;
  description: string;
  source: string;
  slots: Record<string, SlotDefinition>;
  html: string;
  defaultContent: Record<string, unknown>;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  fontHeading: string;
  fontBody: string;
}

export interface SiteSection {
  componentId: string;
  content: Record<string, unknown>;
}

export interface SitePage {
  name: string;
  slug: string;
  sections: SiteSection[];
}

export interface SiteJSON {
  theme: ThemeConfig;
  pages: SitePage[];
}
