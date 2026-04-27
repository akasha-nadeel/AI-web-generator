/**
 * Design DNA Extractor — Vision pre-pass for uploaded reference images.
 *
 * When a user uploads Akasha-design (or any reference) images, this module
 * sends them to a fast AI call that extracts a structured design brief.
 * The brief is injected into the USER prompt (not the system prompt),
 * keeping the system prompt the same size while giving the generation AI
 * concrete, actionable directives instead of "match this image."
 */

export interface DesignBrief {
  /** e.g. "#1A1A2E, #E94560, #F5F5F5" */
  colorPalette: string;
  /** e.g. "dark" | "light" | "mixed" */
  colorMode: string;
  /** e.g. "Orange #FF6B00 — used for CTAs, section labels, stats" */
  accentUsage: string;
  /** e.g. "Inter 800 headings + Playfair Display italic accent words" */
  typography: string;
  /** e.g. "Full-bleed cinematic hero, alternating dark/light sections, card grid" */
  layout: string;
  /** e.g. "Pill-shaped nav, parentheses-wrapped CTAs, + prefixed section labels" */
  signaturePatterns: string[];
  /** e.g. "Ghost watermark text, fanned perspective cards, bento stats grid" */
  uniqueTechniques: string[];
  /** e.g. "Generous — sections separated by 80-120px, cards have 32-48px padding" */
  spacing: string;
  /** e.g. "premium, editorial, confident, spacious" */
  moodKeywords: string;
  /** e.g. "Subtle hover scale on cards, staggered fade-in on load" */
  animations: string;
  /** e.g. "ONE full-bleed bg image, dark overlay, centered massive heading, two pill CTAs" */
  heroTreatment: string;
  /** Raw text from AI if parsing partially fails */
  raw?: string;
}

/**
 * The extraction prompt — acts as a DESIGN CURATOR, not just an analyst.
 * When given multiple images, it picks the strongest/most beautiful patterns
 * from each and synthesizes one cohesive, non-conflicting design direction.
 */
const EXTRACTION_PROMPT = `You are an elite design curator. Given reference screenshot(s) of website(s), your job is to extract a PRODUCTION-READY design brief that a frontend developer can implement directly in code.

You don't just describe — you CURATE. Pick the strongest, most visually striking patterns. Discard generic or weak elements. The brief you produce will be the ONLY design guidance the developer receives (they won't see the screenshots), so be precise enough to build from.

## If you see MULTIPLE images:
- They may show different sections of ONE design, OR different designs entirely
- If same design: synthesize all sections into one complete page flow
- If different designs: pick the BEST pattern from each — the most striking hero from one, the best card layout from another, the strongest typography from a third. Resolve conflicts (e.g. if one is dark and one is light, pick the one that's more impactful). The output must feel like ONE cohesive design, not a collage.

## Response format (one field per line, no markdown, no extra text):

COLOR_PALETTE: [exact hex codes, comma-separated. At minimum: primary background, secondary background, text color, accent color. e.g. #0A0A0A, #FFFFFF, #F5F5F5, #FF6B00]
COLOR_MODE: [dark | light | mixed]
ACCENT_USAGE: [the accent color(s) and exactly WHERE each is applied. e.g. "Orange #FF6B00 — CTA buttons, + prefixed labels, stat numbers, hover underlines. Secondary: #8B5CF6 — section badges only"]
TYPOGRAPHY: [be specific about visual weight and style combinations. e.g. "Massive bold geometric sans-serif headings (800 weight, ~48-72px) + italic serif for accent/emotional words within headings (Playfair Display style) + light sans-serif body (400 weight, 16-18px). Special: mixed-weight words within same heading — some bold, some thin"]
LAYOUT: [describe the FULL page flow with → arrows. e.g. "Floating pill nav (centered, rounded-full, glass effect) → full-bleed dark hero with ONE large bg image + dark overlay + centered display heading + two CTA pills → 3-col icon feature cards on white with generous padding → split section (large image left, text + stats right) → dark testimonial section with large quote + avatar → 4-col footer on dark"]
SIGNATURE_PATTERNS: [3-8 DISTINCTIVE patterns, pipe-separated. Focus on what makes this design NOT generic. e.g. "floating centered nav pill with glass blur | + prefixed colored section labels | parentheses-wrapped CTAs like ( Book Now ) | bullet-dot ● badges above headings | fanned perspective image cards with CSS rotate | ghost watermark text at 12rem behind content | numbered steps with dot-notation 0.01, 0.02 | massive email as footer display text"]
UNIQUE_TECHNIQUES: [2-5 creative/unusual techniques, pipe-separated. These are the "wow" elements. e.g. "giant inline stat numbers ($1.4T) embedded within flowing paragraph at 3x text size | team member photos emerging from bottom edge of dark CTA section | split-phrase display heading with one word bold and one word thin across two lines | color-only keyword emphasis — purple words in black paragraph, no bold"]
SPACING: [specific spacing description. e.g. "Very generous luxury spacing — sections separated by 96-128px, card internal padding 32-48px, heading to body gap 24px, overall feeling of breathing room"]
MOOD: [4-6 mood keywords. e.g. "premium, editorial, confident, spacious, high-contrast, magazine-quality"]
ANIMATIONS: [implementable animation descriptions. e.g. "Staggered fade-in-up on cards (0.1s delay between each), subtle hover scale 1.02 on cards with shadow increase, smooth scroll behavior, hero text fade-in on load with 0.5s delay"]
HERO_TREATMENT: [specifically describe the hero section in detail — this is the most important section. e.g. "ONE full-bleed background image, dark gradient overlay (bg-black/60), centered content: small colored label above, massive 2-line display heading (72-96px), 1-line subtitle in lighter weight, two pill CTAs side by side (one filled accent, one outlined white). Nav floats on top with logo left, links center, CTA right"]

## Rules:
- Extract what you ACTUALLY SEE, not what you assume or wish was there
- For colors, sample the EXACT hex values from the dominant surfaces
- For typography, describe visual weight, approximate size, and style combinations precisely
- SIGNATURE_PATTERNS must only include patterns that differentiate this design from a generic Bootstrap/template site — the things that would make someone say "that's a unique design"
- HERO_TREATMENT is critical — the hero makes or breaks the design, describe it completely
- If a pattern appears across multiple images, it's a strong signal — prioritize it
- If two images conflict (different color modes, different typography), pick the one with stronger visual impact
- Keep each field to 1-3 lines max`;

/**
 * Extract design DNA from uploaded reference images via a fast AI vision call.
 * Uses Claude Haiku for speed and cost efficiency (~300-500 tokens output).
 */
export async function extractDesignDNA(
  images: Array<{ data: string; type: string }>,
  apiKey: string,
  provider: "anthropic" | "openai" | "gemini" = "anthropic"
): Promise<DesignBrief | null> {
  try {
    if (provider === "anthropic") {
      return await extractViaAnthropic(images, apiKey);
    } else if (provider === "openai") {
      return await extractViaOpenAI(images, apiKey);
    } else if (provider === "gemini") {
      return await extractViaGemini(images, apiKey);
    }
    return null;
  } catch (e) {
    console.warn("[DesignExtractor] Extraction failed, falling back to generic:", e);
    return null;
  }
}

/**
 * Format the extracted design brief into a concrete user-prompt injection.
 * This replaces the generic "analyze the reference image(s)" text.
 */
export function formatDesignBriefForPrompt(brief: DesignBrief): string {
  const lines: string[] = [
    `DESIGN BRIEF EXTRACTED FROM REFERENCE IMAGE(S):`,
    ``,
    `COLOR PALETTE: ${brief.colorPalette}`,
    `COLOR MODE: ${brief.colorMode}`,
    `ACCENT COLOR USAGE: ${brief.accentUsage}`,
    `TYPOGRAPHY: ${brief.typography}`,
    `PAGE LAYOUT FLOW: ${brief.layout}`,
  ];

  if (brief.signaturePatterns.length > 0) {
    lines.push(`SIGNATURE UI PATTERNS (must replicate these):`);
    for (const p of brief.signaturePatterns) {
      lines.push(`  • ${p.trim()}`);
    }
  }

  if (brief.uniqueTechniques.length > 0) {
    lines.push(`UNIQUE TECHNIQUES (implement these creative elements):`);
    for (const t of brief.uniqueTechniques) {
      lines.push(`  • ${t.trim()}`);
    }
  }

  if (brief.heroTreatment) {
    lines.push(`HERO SECTION (most important — build this first):`);
    lines.push(`  ${brief.heroTreatment}`);
  }

  lines.push(`SPACING: ${brief.spacing}`);
  lines.push(`MOOD: ${brief.moodKeywords}`);
  lines.push(`ANIMATIONS: ${brief.animations}`);
  lines.push(``);
  lines.push(`YOU MUST faithfully reproduce these design patterns, typography, layout structure, and spacing. This brief IS the design spec — match it precisely.`);
  lines.push(`EXCEPTION — accent color: if the user's request below mentions a specific color preference ("red theme", "blue accents", etc.), USE THAT COLOR as the accent throughout instead of the colors in this brief. The user's color choice always wins; everything else from this brief stays.`);

  return lines.join("\n");
}

// ── Provider Implementations ────────────────────────────────────────

function parseDataUrl(dataUrl: string): { base64: string; mediaType: string } {
  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (match) {
    return { mediaType: match[1], base64: match[2] };
  }
  return { mediaType: "image/png", base64: dataUrl };
}

async function extractViaAnthropic(
  images: Array<{ data: string; type: string }>,
  apiKey: string
): Promise<DesignBrief | null> {
  const content: Array<{ type: string; [key: string]: unknown }> = [];

  for (const img of images) {
    const { base64, mediaType } = parseDataUrl(img.data);
    content.push({
      type: "image",
      source: { type: "base64", media_type: mediaType, data: base64 },
    });
  }

  content.push({
    type: "text",
    text: "Curate the strongest design patterns from these website screenshot(s) into one cohesive design brief.",
  });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      temperature: 0,
      system: EXTRACTION_PROMPT,
      messages: [{ role: "user", content }],
    }),
  });

  if (!response.ok) {
    console.warn("[DesignExtractor] Anthropic API error:", response.status);
    return null;
  }

  const data = await response.json();
  const text = data.content?.[0]?.text;
  return text ? parseBrief(text) : null;
}

async function extractViaOpenAI(
  images: Array<{ data: string; type: string }>,
  apiKey: string
): Promise<DesignBrief | null> {
  const content: Array<{ type: string; [key: string]: unknown }> = [];

  for (const img of images) {
    content.push({
      type: "image_url",
      image_url: { url: img.data, detail: "high" },
    });
  }

  content.push({
    type: "text",
    text: "Curate the strongest design patterns from these website screenshot(s) into one cohesive design brief.",
  });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: EXTRACTION_PROMPT },
        { role: "user", content },
      ],
      temperature: 0,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    console.warn("[DesignExtractor] OpenAI API error:", response.status);
    return null;
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  return text ? parseBrief(text) : null;
}

async function extractViaGemini(
  images: Array<{ data: string; type: string }>,
  apiKey: string
): Promise<DesignBrief | null> {
  const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [];

  for (const img of images) {
    const { base64, mediaType } = parseDataUrl(img.data);
    parts.push({ inline_data: { mime_type: mediaType, data: base64 } });
  }

  parts.push({ text: "Extract the design patterns from these website screenshot(s)." });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: EXTRACTION_PROMPT }] },
        contents: [{ parts }],
        generationConfig: { temperature: 0, maxOutputTokens: 800 },
      }),
    }
  );

  if (!response.ok) {
    console.warn("[DesignExtractor] Gemini API error:", response.status);
    return null;
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ? parseBrief(text) : null;
}

// ── Parser ──────────────────────────────────────────────────────────

function extractField(text: string, field: string): string {
  const regex = new RegExp(`^${field}:\\s*(.+)`, "mi");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function extractListField(text: string, field: string): string[] {
  const value = extractField(text, field);
  if (!value) return [];
  return value
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseBrief(text: string): DesignBrief {
  return {
    colorPalette: extractField(text, "COLOR_PALETTE") || "not detected",
    colorMode: extractField(text, "COLOR_MODE") || "mixed",
    accentUsage: extractField(text, "ACCENT_USAGE") || "not detected",
    typography: extractField(text, "TYPOGRAPHY") || "not detected",
    layout: extractField(text, "LAYOUT") || "not detected",
    signaturePatterns: extractListField(text, "SIGNATURE_PATTERNS"),
    uniqueTechniques: extractListField(text, "UNIQUE_TECHNIQUES"),
    spacing: extractField(text, "SPACING") || "standard",
    moodKeywords: extractField(text, "MOOD") || "modern",
    animations: extractField(text, "ANIMATIONS") || "subtle hover effects, fade-in on load",
    heroTreatment: extractField(text, "HERO_TREATMENT") || "",
    raw: text,
  };
}
