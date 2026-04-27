/**
 * Request classifier for dynamic prompt assembly.
 * Analyzes user input to determine what prompt sections are relevant.
 */

export interface Classification {
  uiType: "app" | "marketing" | "editorial";
  appReference: string | null;
  mood: string;
  colorMode: "dark" | "light";
  imageCategories: string[];
  industryIcons: string[];
  layoutStyle: string;
  typography: {
    heading: string;
    body: string;
    googleFontsUrl: string;
  };
  headingAccent: string;
  logoIcon: string;
  confidence: number;
}

// ── UI Type Detection ──────────────────────────────────────────────

const APP_PATTERNS = [
  /\bnetflix\b/i, /\bdisney\+?\b/i, /\bhulu\b/i, /\bspotify\b/i,
  /\bapple music\b/i, /\bairbnb\b/i, /\bbooking\.com\b/i,
  /\btwitter\b/i, /\byoutube\b/i, /\bamazon\b/i, /\bubereats?\b/i,
  /\bdashboard\b/i, /\badmin panel\b/i, /\bstreaming\s+(site|platform|app|service)\b/i,
  /\bclone\b/i, /\bsocial media\s+(app|platform|site)\b/i,
  /\bmarketplace\b/i, /\be-?commerce store\b/i, /\bapp\b/i,
];

const EDITORIAL_PATTERNS = [
  /\bblog\b/i, /\bmagazine\b/i, /\bnews site\b/i,
  /\bdocumentation\b/i, /\bwiki\b/i,
];

const APP_REFERENCES: Record<string, string> = {
  netflix: "netflix", "disney+": "netflix", "disney plus": "netflix", hulu: "netflix",
  spotify: "spotify", "apple music": "spotify",
  airbnb: "airbnb", "booking.com": "airbnb",
  twitter: "twitter", x: "twitter",
  youtube: "youtube",
  amazon: "amazon",
  ubereats: "amazon", "uber eats": "amazon",
};

function detectUIType(prompt: string): "app" | "marketing" | "editorial" {
  if (APP_PATTERNS.some((p) => p.test(prompt))) return "app";
  if (EDITORIAL_PATTERNS.some((p) => p.test(prompt))) return "editorial";
  return "marketing";
}

function detectAppReference(prompt: string): string | null {
  const lower = prompt.toLowerCase();
  for (const [keyword, ref] of Object.entries(APP_REFERENCES)) {
    if (lower.includes(keyword)) return ref;
  }
  return null;
}

// ── Color Mode Detection ───────────────────────────────────────────

const DARK_INDUSTRIES = [
  "streaming", "gym", "fitness", "nightclub", "gaming", "tech", "saas",
  "music", "automotive", "cybersecurity", "photography", "dashboard",
];
const LIGHT_INDUSTRIES = [
  "travel", "restaurant", "wedding", "real-estate", "real estate", "fashion",
  "beauty", "spa", "education", "healthcare", "architecture", "interior",
  "law", "dental", "skincare", "medical",
];

function detectColorMode(mood: string, industry: string, uiType: string): "dark" | "light" {
  const m = mood.toLowerCase();
  const i = industry.toLowerCase();

  if (uiType === "app") return "dark"; // most apps default dark
  if (["cinematic", "gaming", "cyberpunk", "neon", "dark", "moody", "bold"].some((k) => m.includes(k))) return "dark";
  if (DARK_INDUSTRIES.some((k) => i.includes(k))) return "dark";
  if (LIGHT_INDUSTRIES.some((k) => i.includes(k))) return "light";
  if (["luxury", "elegant", "minimal", "clean", "friendly", "warm", "soft"].some((k) => m.includes(k))) return "light";
  return "dark";
}

// ── Typography Selection ───────────────────────────────────────────

interface TypographyPair {
  heading: string;
  body: string;
  googleFontsUrl: string;
}

const TYPOGRAPHY_MAP: Record<string, TypographyPair> = {
  luxury: {
    heading: "Playfair Display",
    body: "Inter",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&display=swap",
  },
  tech: {
    heading: "Space Grotesk",
    body: "Inter",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
  },
  bold: {
    heading: "Bebas Neue",
    body: "Inter",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap",
  },
  friendly: {
    heading: "Outfit",
    body: "DM Sans",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Outfit:wght@600;700;800&display=swap",
  },
  clean: {
    heading: "Plus Jakarta Sans",
    body: "Inter",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
  },
  cinematic: {
    heading: "Inter",
    body: "Inter",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
  },
  editorial: {
    heading: "Fraunces",
    body: "Inter",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,800;1,700&family=Inter:wght@400;500;600&display=swap",
  },
};

function selectTypography(mood: string, industry: string): TypographyPair {
  const m = mood.toLowerCase();
  const i = industry.toLowerCase();

  if (["luxury", "elegant", "premium", "sophisticated"].some((k) => m.includes(k))) return TYPOGRAPHY_MAP.luxury;
  if (["travel", "wedding", "spa", "beauty", "fashion"].some((k) => i.includes(k))) return TYPOGRAPHY_MAP.luxury;
  if (["tech", "modern", "futuristic", "startup"].some((k) => m.includes(k))) return TYPOGRAPHY_MAP.tech;
  if (["tech", "saas", "software", "cybersecurity"].some((k) => i.includes(k))) return TYPOGRAPHY_MAP.tech;
  if (["bold", "athletic", "energetic", "powerful", "high-energy"].some((k) => m.includes(k))) return TYPOGRAPHY_MAP.bold;
  if (["gym", "fitness", "sports"].some((k) => i.includes(k))) return TYPOGRAPHY_MAP.bold;
  if (["friendly", "playful", "fun", "warm", "cheerful"].some((k) => m.includes(k))) return TYPOGRAPHY_MAP.friendly;
  if (["children", "pets", "education"].some((k) => i.includes(k))) return TYPOGRAPHY_MAP.friendly;
  if (["clean", "minimal", "minimalist", "simple"].some((k) => m.includes(k))) return TYPOGRAPHY_MAP.clean;
  if (["cinematic", "dramatic", "moody"].some((k) => m.includes(k))) return TYPOGRAPHY_MAP.cinematic;
  if (["streaming", "entertainment", "gaming"].some((k) => i.includes(k))) return TYPOGRAPHY_MAP.cinematic;
  if (["editorial", "magazine"].some((k) => m.includes(k))) return TYPOGRAPHY_MAP.editorial;
  return TYPOGRAPHY_MAP.clean; // safe default
}

// ── Image Category Selection ───────────────────────────────────────

const INDUSTRY_IMAGE_MAP: Record<string, string[]> = {
  restaurant:    ["restaurant-venue", "restaurant-food", "food-coffee", "portraits"],
  food:          ["restaurant-food", "food-coffee", "restaurant-venue", "portraits"],
  cafe:          ["food-coffee", "restaurant-venue", "lifestyle", "portraits"],
  gym:           ["gym-venue", "gym-people", "sports", "portraits"],
  fitness:       ["gym-venue", "gym-people", "sports", "portraits"],
  tech:          ["tech", "abstract", "workspace", "portraits"],
  saas:          ["tech", "abstract", "workspace", "portraits"],
  software:      ["tech", "abstract", "workspace", "portraits"],
  travel:        ["travel-destinations", "travel-hotels", "ocean", "nature", "portraits"],
  tourism:       ["travel-destinations", "travel-hotels", "nature", "portraits"],
  "real-estate": ["real-estate", "interior", "portraits"],
  "real estate": ["real-estate", "interior", "portraits"],
  realestate:    ["real-estate", "interior", "portraits"],
  property:      ["real-estate", "interior", "portraits"],
  beauty:        ["beauty", "skincare", "portraits", "women-portraits"],
  spa:           ["beauty", "health-wellness", "portraits"],
  skincare:      ["skincare", "beauty", "portraits", "women-portraits"],
  fashion:       ["fashion", "quiet-luxury", "portraits", "women-portraits"],
  photography:   ["portfolio", "nature", "city", "abstract"],
  creative:      ["portfolio", "abstract", "workspace", "lifestyle"],
  agency:        ["business", "workspace", "lifestyle", "portraits"],
  education:     ["education", "lifestyle", "portraits"],
  medical:       ["medical", "portraits", "health-wellness"],
  healthcare:    ["medical", "portraits", "health-wellness"],
  dental:        ["dental", "portraits", "medical"],
  automotive:    ["automotive", "city", "portraits"],
  interior:      ["interior", "real-estate", "quiet-luxury"],
  "interior design": ["interior", "real-estate", "quiet-luxury"],
  architecture:  ["real-estate", "interior", "city"],
  sports:        ["sports", "gym-people", "portraits"],
  entertainment: ["cinema", "nature", "city", "dark-moody"],
  streaming:     ["cinema", "nature", "city", "ocean", "dark-moody"],
  music:         ["music", "dark-moody", "portraits"],
  nightclub:     ["dark-moody", "music", "city"],
  gaming:        ["dark-moody", "tech", "abstract"],
  ecommerce:     ["ecommerce", "fashion", "lifestyle", "portraits"],
  "e-commerce":  ["ecommerce", "fashion", "lifestyle", "portraits"],
  wedding:       ["couple-romance", "spring-nature", "quiet-luxury", "portraits"],
  pets:          ["pets", "nature", "lifestyle"],
  children:      ["children-family", "lifestyle-friends", "spring-nature"],
  nonprofit:     ["lifestyle", "diverse-people", "nature", "portraits"],
  charity:       ["lifestyle", "diverse-people", "nature", "portraits"],
  law:           ["business", "city", "portraits"],
  portfolio:     ["portfolio", "abstract", "nature", "city"],
  blog:          ["lifestyle", "workspace", "abstract", "portraits"],
  magazine:      ["lifestyle", "workspace", "abstract", "portraits"],
  news:          ["lifestyle", "workspace", "city", "portraits"],
  dashboard:     ["tech", "abstract", "workspace"],
};

function selectImageCategories(industry: string, uiType: string, appRef: string | null): string[] {
  const i = industry.toLowerCase();

  // App UIs need specific categories
  if (appRef === "netflix") return ["cinema", "nature", "city", "ocean", "dark-moody"];
  if (appRef === "spotify") return ["music", "dark-moody", "portraits"];
  if (appRef === "airbnb") return ["travel-destinations", "travel-hotels", "interior", "nature"];
  if (appRef === "amazon") return ["ecommerce", "fashion", "tech", "lifestyle"];
  if (appRef === "twitter") return ["portraits", "diverse-people", "lifestyle"];
  if (appRef === "youtube") return ["cinema", "nature", "city", "portraits"];

  // Look up industry
  for (const [key, categories] of Object.entries(INDUSTRY_IMAGE_MAP)) {
    if (i.includes(key)) return categories;
  }

  // Default: broad general set
  return ["portraits", "lifestyle", "business", "nature", "city"];
}

// ── Icon Selection ─────────────────────────────────────────────────

const COMMON_ICONS = [
  "menu", "close", "arrow-right", "chevron-down", "chevron-right",
  "search", "star", "check", "phone", "mail", "map-pin",
  "instagram", "facebook", "twitter", "youtube",
];

const INDUSTRY_ICON_MAP: Record<string, string[]> = {
  gym:          ["dumbbell", "heart", "trophy", "users", "zap", "target"],
  fitness:      ["dumbbell", "heart", "trophy", "users", "zap", "target"],
  restaurant:   ["utensils", "clock", "star", "map-pin"],
  food:         ["utensils", "clock", "star"],
  tech:         ["code", "zap", "shield", "globe", "sparkles"],
  saas:         ["code", "zap", "shield", "globe", "sparkles"],
  travel:       ["globe", "map-pin", "camera", "heart"],
  photography:  ["camera", "sparkles", "heart"],
  agency:       ["target", "zap", "globe", "sparkles"],
  education:    ["globe", "users", "sparkles"],
  medical:      ["heart", "shield", "users", "phone"],
  healthcare:   ["heart", "shield", "users"],
  dental:       ["heart", "shield", "users", "sparkles"],
  automotive:   ["zap", "shield", "target"],
  beauty:       ["heart", "sparkles", "star"],
  fashion:      ["heart", "star", "sparkles"],
  ecommerce:    ["shopping-cart", "filter", "heart", "star"],
  "e-commerce": ["shopping-cart", "filter", "heart", "star"],
  streaming:    ["play", "bell", "search"],
  music:        ["play", "heart", "users"],
  gaming:       ["zap", "target", "trophy"],
  sports:       ["trophy", "target", "users", "heart"],
  portfolio:    ["camera", "sparkles", "star", "globe"],
  blog:         ["star", "users", "sparkles", "mail"],
  magazine:     ["star", "users", "sparkles", "mail"],
  news:         ["star", "users", "globe", "mail"],
  realestate:   ["map-pin", "globe", "shield", "users"],
  "real-estate": ["map-pin", "globe", "shield", "users"],
  "real estate": ["map-pin", "globe", "shield", "users"],
  property:     ["map-pin", "globe", "shield", "users"],
  nonprofit:    ["heart", "users", "shield", "globe"],
  charity:      ["heart", "users", "shield", "globe"],
};

function selectIcons(industry: string): string[] {
  const i = industry.toLowerCase();
  const extra: string[] = [];
  for (const [key, icons] of Object.entries(INDUSTRY_ICON_MAP)) {
    if (i.includes(key)) {
      extra.push(...icons);
      break;
    }
  }
  // Deduplicate and merge with common
  return [...new Set([...COMMON_ICONS, ...extra])];
}

// ── Logo Icon Selection ────────────────────────────────────────────

const LOGO_ICON_MAP: Record<string, string> = {
  gym: "dumbbell", fitness: "dumbbell",
  restaurant: "utensils", food: "utensils", cafe: "utensils",
  tech: "code", saas: "code", software: "code",
  photography: "camera", creative: "camera",
  agency: "target", business: "target",
  education: "globe", school: "globe",
  medical: "heart", healthcare: "heart", health: "heart",
  travel: "globe", tourism: "globe",
  music: "play",
  fashion: "sparkles", beauty: "sparkles", skincare: "sparkles",
  streaming: "play", entertainment: "play",
  ecommerce: "shopping-cart", "e-commerce": "shopping-cart",
  automotive: "zap",
  dental: "shield",
  sports: "trophy",
  law: "shield",
  portfolio: "camera",
  blog: "sparkles", magazine: "sparkles", news: "globe",
  realestate: "map-pin", "real-estate": "map-pin", "real estate": "map-pin", property: "map-pin",
  nonprofit: "heart", charity: "heart",
};

function selectLogoIcon(industry: string): string {
  const i = industry.toLowerCase();
  for (const [key, icon] of Object.entries(LOGO_ICON_MAP)) {
    if (i.includes(key)) return icon;
  }
  return "sparkles";
}

// ── Layout Style Selection ─────────────────────────────────────────

function selectLayoutStyle(mood: string, industry: string): string {
  const m = mood.toLowerCase();
  const i = industry.toLowerCase();

  if (["luxury", "elegant", "premium", "sophisticated"].some((k) => m.includes(k))) return "luxury";
  if (["travel", "wedding", "spa", "fashion", "beauty"].some((k) => i.includes(k))) return "luxury";
  if (["tech", "modern", "futuristic", "startup"].some((k) => m.includes(k))) return "tech";
  if (["tech", "saas", "software"].some((k) => i.includes(k))) return "tech";
  if (["bold", "athletic", "energetic", "powerful"].some((k) => m.includes(k))) return "bold";
  if (["gym", "fitness", "sports"].some((k) => i.includes(k))) return "bold";
  if (["creative", "artistic", "playful"].some((k) => m.includes(k))) return "creative";
  if (["agency", "portfolio", "photography", "creative"].some((k) => i.includes(k))) return "creative";
  if (["dental", "medical", "healthcare", "law"].some((k) => i.includes(k))) return "medical";
  if (["fintech", "banking", "finance"].some((k) => i.includes(k))) return "fintech";
  if (["beauty", "skincare", "cosmetics"].some((k) => i.includes(k))) return "beauty";
  if (["architecture", "real-estate", "real estate", "interior"].some((k) => i.includes(k))) return "architecture";
  return "general";
}

// ── Heading Accent Technique ───────────────────────────────────────

function selectHeadingAccent(layoutStyle: string, uiType: string): string {
  if (uiType === "app") return "Use the app's natural heading style — movie titles bold white, product names clean, etc.";
  switch (layoutStyle) {
    case "luxury":
      return "Use ITALIC on ONE key accent word in the hero heading — e.g., \"Discover the <em>extraordinary</em>\". Import italic weight for the heading font.";
    case "bold":
      return "COLOR one accent word with the accent color — e.g., \"Forge Your <span class='text-lime-400'>Ultimate Self</span>\".";
    case "tech":
      return "COLOR the accent word OR use a gradient text effect on one key word.";
    case "creative":
      return "Use italic serif for accent words within sans-serif headings for editorial contrast.";
    case "medical":
      return "Mix sans-serif + italic serif — key words in italic Playfair Display within Inter headings.";
    default:
      return "Use font-weight contrast — one key word in a heavier weight. Keep it subtle.";
  }
}

// ── Confidence Scoring ─────────────────────────────────────────────

function calculateConfidence(industry: string, mood: string, uiType: string, prompt: string): number {
  let score = 0.5;
  if (industry !== "general" && industry !== "") score += 0.2;
  if (mood !== "modern" && mood !== "") score += 0.1;
  if (uiType === "app" && detectAppReference(prompt)) score += 0.2;
  if (prompt.length > 30) score += 0.1;
  return Math.min(score, 1);
}

// ── Industry Auto-Detection from Description ───────────────────────

/**
 * Scan a free-text description for any keyword we have specific design
 * support for (image categories, icons, logo, layout). Returns the
 * canonical industry key the rest of the classifier already understands,
 * or null if nothing matched.
 *
 * Why this exists: the wizard no longer asks the user to pick an industry
 * chip. We derive it from the description so all of selectImageCategories /
 * selectIcons / selectLogoIcon / selectLayoutStyle still get a meaningful
 * input — without that, every site falls through to generic defaults.
 *
 * Matching rules:
 *  - Word-boundary regex (avoids "art" matching inside "smart")
 *  - Multi-word keys ("real estate") match across hyphen OR space
 *  - Longest keyword wins (so "real estate" beats "real")
 *  - First match returned (no scoring — we just need *a* signal)
 */
export function detectIndustryFromPrompt(text: string): string | null {
  if (!text || typeof text !== "string") return null;
  const lower = text.toLowerCase();

  // Union of all industry keys that drive a downstream design decision.
  const knownKeys = new Set<string>([
    ...Object.keys(INDUSTRY_IMAGE_MAP),
    ...Object.keys(INDUSTRY_ICON_MAP),
    ...Object.keys(LOGO_ICON_MAP),
  ]);

  // Sort longest first so "real estate" matches before "real".
  const sorted = [...knownKeys].sort((a, b) => b.length - a.length);

  for (const key of sorted) {
    // Allow hyphen OR space in multi-word keys (handles both "real-estate"
    // and "real estate" in user input). Escape other regex metachars.
    const pattern = key
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/[-\s]+/g, "[-\\s]+");
    if (new RegExp(`\\b${pattern}\\b`, "i").test(lower)) {
      return key;
    }
  }

  return null;
}

// ── Main Classifier ────────────────────────────────────────────────

export function classifyRequest(
  prompt: string,
  industry: string,
  mood: string
): Classification {
  const uiType = detectUIType(prompt);
  const appReference = detectAppReference(prompt);
  const colorMode = detectColorMode(mood, industry, uiType);
  const typography = selectTypography(mood, industry);
  const imageCategories = selectImageCategories(industry, uiType, appReference);
  const industryIcons = selectIcons(industry);
  const layoutStyle = selectLayoutStyle(mood, industry);
  const headingAccent = selectHeadingAccent(layoutStyle, uiType);
  const logoIcon = selectLogoIcon(industry);
  const confidence = calculateConfidence(industry, mood, uiType, prompt);

  return {
    uiType,
    appReference,
    mood: mood || "modern",
    colorMode,
    imageCategories,
    industryIcons,
    layoutStyle,
    typography,
    headingAccent,
    logoIcon,
    confidence,
  };
}

// ── AI Classification (for low-confidence cases) ───────────────────

export const AI_CLASSIFY_PROMPT = `You are a web design intent classifier. Given a website request, analyze it and return ONLY a JSON object:

{
  "uiType": "app" | "marketing" | "editorial",
  "appReference": null | "netflix" | "spotify" | "airbnb" | "twitter" | "youtube" | "amazon",
  "mood": "luxury" | "tech" | "bold" | "friendly" | "clean" | "cinematic" | "editorial",
  "colorMode": "dark" | "light",
  "industry": "the detected primary industry",
  "layoutStyle": "luxury" | "tech" | "bold" | "creative" | "medical" | "fintech" | "beauty" | "architecture" | "general"
}

Return ONLY valid JSON. No markdown, no explanation.`;

export function parseAIClassification(response: string): Partial<Classification> | null {
  try {
    const json = JSON.parse(response.trim());
    const result: Partial<Classification> = {};
    if (json.uiType) result.uiType = json.uiType;
    if (json.appReference) result.appReference = json.appReference;
    if (json.colorMode) result.colorMode = json.colorMode;
    if (json.layoutStyle) result.layoutStyle = json.layoutStyle;
    return result;
  } catch {
    return null;
  }
}

export function mergeClassifications(
  base: Classification,
  aiOverride: Partial<Classification>
): Classification {
  return {
    ...base,
    ...aiOverride,
    // Re-derive dependent fields if AI changed key fields
    imageCategories: aiOverride.uiType || aiOverride.appReference
      ? selectImageCategories(
          base.mood,
          aiOverride.uiType || base.uiType,
          aiOverride.appReference ?? base.appReference
        )
      : base.imageCategories,
    confidence: 0.9,
  };
}
