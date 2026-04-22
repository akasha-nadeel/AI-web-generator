export const APP_NAME = "Weavo";
export const APP_DESCRIPTION =
  "Generate stunning websites in seconds with AI. Describe your business, pick your style, and let Weavo build your dream website.";

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    sites: 1,
    generations: 3,
    model: {
      label: "Standard",
      name: "Claude Sonnet 4.6",
      detail: "Streamlined design engine",
    },
    features: [
      "1 website",
      "3 AI generations",
      "Basic components",
      "Export as ZIP",
    ],
  },
  pro: {
    name: "Pro",
    price: 9,
    sites: 5,
    generations: 50,
    model: {
      label: "Pro",
      name: "Claude Sonnet 4.6",
      detail: "Full design library + patterns",
    },
    features: [
      "5 websites",
      "50 AI generations/month",
      "All components",
      "Unsplash integration",
      "Priority generation",
    ],
  },
  business: {
    name: "Business",
    price: 19,
    sites: -1, // unlimited
    generations: 150,
    model: {
      label: "Premium",
      name: "Claude Opus 4.7",
      detail: "Maximum design intelligence",
    },
    features: [
      "Unlimited websites",
      "150 AI generations/month",
      "All components",
      "Custom fonts upload",
      "E-commerce sections",
      "Priority support",
    ],
  },
} as const;

export type PlanType = keyof typeof PLANS;

export const FREE_CREDITS = 30;

export const MODEL_COSTS = {
  haiku: {
    id: "haiku",
    label: "Fast",
    name: "Claude Haiku 4.5",
    apiModel: "claude-haiku-4-5-20251001",
    detail: "Quick drafts, simple layouts",
    credits: 5,
    requiresPayment: false,
  },
  sonnet: {
    id: "sonnet",
    label: "Balanced",
    name: "Claude Sonnet 4.6",
    apiModel: "claude-sonnet-4-6",
    detail: "Full design library, recommended default",
    credits: 15,
    requiresPayment: true,
  },
  opus: {
    id: "opus",
    label: "Premium",
    name: "Claude Opus 4.7",
    apiModel: "claude-opus-4-7",
    detail: "Maximum design intelligence",
    credits: 60,
    requiresPayment: true,
  },
} as const;

export type ModelKey = keyof typeof MODEL_COSTS;

// Chat-edit costs are intentionally smaller than full generation:
// a chat edit modifies an existing site rather than building one from
// scratch. Conversational (CHAT:) replies cost 0 — they're effectively
// free because they don't change the site and can't be abused to extract
// value. Only successful HTML updates deduct.
export const CHAT_EDIT_CREDITS: Record<"haiku" | "sonnet", number> = {
  haiku: 2,
  sonnet: 5,
};

export function canUseModel(plan: string, modelKey: ModelKey): boolean {
  const model = MODEL_COSTS[modelKey];
  if (!model.requiresPayment) return true;
  return plan !== "free";
}

export const CREDIT_PACKS = [
  {
    id: "starter",
    name: "Starter",
    credits: 100,
    price: 7,
    popular: false,
    description: "Test the waters. Enough for a first real site.",
  },
  {
    id: "popular",
    name: "Popular",
    credits: 300,
    price: 15,
    popular: true,
    description: "Best balance. Build a few sites and iterate.",
    savingsLabel: "Save 29%",
  },
  {
    id: "studio",
    name: "Studio",
    credits: 800,
    price: 30,
    popular: false,
    description: "For heavy users building multiple projects.",
    savingsLabel: "Save 46%",
  },
] as const;

export type CreditPackId = (typeof CREDIT_PACKS)[number]["id"];

export const INDUSTRIES = [
  { id: "restaurant", label: "Restaurant & Food", icon: "UtensilsCrossed" },
  { id: "portfolio", label: "Portfolio & Personal", icon: "User" },
  { id: "agency", label: "Agency & Business", icon: "Building2" },
  { id: "ecommerce", label: "Online Store", icon: "ShoppingBag" },
  { id: "blog", label: "Blog & Media", icon: "FileText" },
  { id: "fitness", label: "Fitness & Health", icon: "Dumbbell" },
  { id: "realestate", label: "Real Estate", icon: "Home" },
  { id: "saas", label: "SaaS & Tech", icon: "Laptop" },
  { id: "education", label: "Education", icon: "GraduationCap" },
  { id: "photography", label: "Photography", icon: "Camera" },
  { id: "medical", label: "Medical & Healthcare", icon: "Heart" },
  { id: "nonprofit", label: "Non-Profit", icon: "HandHeart" },
] as const;

export type IndustryType = (typeof INDUSTRIES)[number]["id"];

export const INDUSTRY_DEFAULT_PAGES: Record<string, string[]> = {
  restaurant: ["Home", "Menu", "About", "Gallery", "Contact"],
  portfolio: ["Home", "Projects", "About", "Contact"],
  agency: ["Home", "Services", "About", "Team", "Contact"],
  ecommerce: ["Home", "Products", "About", "Contact"],
  blog: ["Home", "Blog", "About", "Contact"],
  fitness: ["Home", "Programs", "About", "Trainers", "Contact"],
  realestate: ["Home", "Listings", "About", "Contact"],
  saas: ["Home", "Features", "Pricing", "About", "Contact"],
  education: ["Home", "About", "Events", "Programs", "Research", "Contact"],
  photography: ["Home", "Portfolio", "About", "Contact"],
  medical: ["Home", "Services", "Team", "About", "Contact"],
  nonprofit: ["Home", "Mission", "Programs", "About", "Contact"],
};

export const FONT_STYLES = [
  { id: "modern", label: "Modern", fonts: { heading: "Inter", body: "Inter" } },
  {
    id: "classic",
    label: "Classic",
    fonts: { heading: "Playfair Display", body: "Lora" },
  },
  {
    id: "playful",
    label: "Playful",
    fonts: { heading: "Poppins", body: "Nunito" },
  },
  {
    id: "bold",
    label: "Bold",
    fonts: { heading: "Space Grotesk", body: "DM Sans" },
  },
  {
    id: "editorial",
    label: "Editorial",
    fonts: { heading: "DM Sans", body: "DM Sans" },
  },
  {
    id: "athletic",
    label: "Athletic",
    fonts: { heading: "Manrope", body: "Manrope" },
  },
  {
    id: "storefront",
    label: "Storefront",
    fonts: { heading: "DM Serif Display", body: "Inter" },
  },
  {
    id: "condensed",
    label: "Condensed",
    fonts: { heading: "Anton", body: "DM Sans" },
  },
  {
    id: "geometric",
    label: "Geometric",
    fonts: { heading: "Montserrat", body: "Montserrat" },
  },
] as const;

export type FontStyleType = (typeof FONT_STYLES)[number]["id"];

export const COLOR_PALETTES = [
  {
    id: "ocean",
    name: "Ocean",
    colors: {
      primary: "#0ea5e9",
      secondary: "#0284c7",
      accent: "#38bdf8",
      bg: "#0f172a",
      text: "#f8fafc",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    colors: {
      primary: "#f97316",
      secondary: "#ea580c",
      accent: "#fb923c",
      bg: "#1c1917",
      text: "#fafaf9",
    },
  },
  {
    id: "forest",
    name: "Forest",
    colors: {
      primary: "#22c55e",
      secondary: "#16a34a",
      accent: "#4ade80",
      bg: "#0f1f15",
      text: "#f0fdf4",
    },
  },
  {
    id: "lavender",
    name: "Lavender",
    colors: {
      primary: "#a855f7",
      secondary: "#9333ea",
      accent: "#c084fc",
      bg: "#1a0f2e",
      text: "#faf5ff",
    },
  },
  {
    id: "rose",
    name: "Rose",
    colors: {
      primary: "#f43f5e",
      secondary: "#e11d48",
      accent: "#fb7185",
      bg: "#1f0c14",
      text: "#fff1f2",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    colors: {
      primary: "#6366f1",
      secondary: "#4f46e5",
      accent: "#818cf8",
      bg: "#0f0f23",
      text: "#eef2ff",
    },
  },
  {
    id: "coral",
    name: "Coral",
    colors: {
      primary: "#ec4899",
      secondary: "#db2777",
      accent: "#f472b6",
      bg: "#1f0a18",
      text: "#fdf2f8",
    },
  },
  {
    id: "clean",
    name: "Clean",
    colors: {
      primary: "#3b82f6",
      secondary: "#2563eb",
      accent: "#60a5fa",
      bg: "#ffffff",
      text: "#0f172a",
    },
  },
  {
    id: "blaze",
    name: "Blaze",
    colors: {
      primary: "#fd6934",
      secondary: "#dbff02",
      accent: "#00c4d1",
      bg: "#000000",
      text: "#ffffff",
    },
  },
  {
    id: "noir",
    name: "Noir",
    colors: {
      primary: "#d4e510",
      secondary: "#b8cc0e",
      accent: "#e2f04a",
      bg: "#0a0a0a",
      text: "#f5f5f5",
    },
  },
  {
    id: "storefront",
    name: "Storefront",
    colors: {
      primary: "#e8490c",
      secondary: "#111111",
      accent: "#e8490c",
      bg: "#f5f5f0",
      text: "#111111",
    },
  },
  {
    id: "sushi",
    name: "Sushi",
    colors: {
      primary: "#E94222",
      secondary: "#000000",
      accent: "#E94222",
      bg: "#FEF6DF",
      text: "#171717",
    },
  },
] as const;

export type ColorPaletteType = (typeof COLOR_PALETTES)[number]["id"];
