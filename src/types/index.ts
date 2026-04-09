export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  fontHeading: string;
  fontBody: string;
}

export interface SlotDefinition {
  type: "text" | "longtext" | "image" | "link" | "list" | "icon";
  label: string;
  required: boolean;
  maxLength?: number;
  listItemSlots?: Record<string, SlotDefinition>;
}

export interface ComponentDefinition {
  id: string;
  category: ComponentCategory;
  name: string;
  description: string;
  source: "hyperui" | "preline" | "flowbite" | "meraki" | "custom";
  slots: Record<string, SlotDefinition>;
  html: string;
  defaultContent: Record<string, unknown>;
}

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

export interface SiteSection {
  componentId: string;
  content: Record<string, unknown>;
  style?: Record<string, string>;
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

export interface GenerationInput {
  industry: string;
  businessName: string;
  description: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
  };
  fontStyle: string;
  overallFeel: string;
  pages: string[];
  inspirationAnalysis?: ImageAnalysis;
}

export interface ImageAnalysis {
  colors: string[];
  layoutStyle: string;
  fontMood: string;
  mood: string;
}

export interface ChatPatch {
  changes: Array<{
    path: string;
    value: unknown;
    action: "update" | "insert" | "remove";
  }>;
}

export interface UserProfile {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  plan: "free" | "pro" | "business";
  creditsRemaining: number;
  createdAt: string;
}

export interface Site {
  id: string;
  userId: string;
  name: string;
  industry: string | null;
  themeJson: ThemeConfig;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  siteId: string;
  name: string;
  slug: string;
  sectionsJson: SiteSection[];
  sortOrder: number;
  createdAt: string;
}
