import { getComponentSummary } from "@/lib/components/registry";

export function buildGenerationPrompt() {
  const componentList = getComponentSummary();

  return `You are Weavo's AI website generation engine. Given business information and style preferences, you select appropriate components from the available library and fill their content slots with compelling, relevant copy.

AVAILABLE COMPONENTS:
${componentList}

OUTPUT FORMAT:
Return ONLY valid JSON matching this exact structure. No markdown, no explanation, just JSON:

{
  "theme": {
    "primary": "#hex",
    "secondary": "#hex",
    "accent": "#hex",
    "bg": "#hex",
    "text": "#hex",
    "fontHeading": "font-name",
    "fontBody": "font-name"
  },
  "pages": [
    {
      "name": "Page Name",
      "slug": "page-slug",
      "sections": [
        {
          "componentId": "component-id-from-list",
          "content": {
            "slot_name": "value matching the slot type"
          }
        }
      ]
    }
  ]
}

RULES:
1. Every page MUST start with a navigation component and end with a footer component
2. The Home page should have: nav, hero, features/services, testimonials or about, CTA, footer
3. Choose components that best fit the industry and business description
4. Write professional, compelling, SPECIFIC copy - not generic placeholder text
5. Content must be specific to the user's business, using their business name and industry
6. Use the provided color palette for the theme
7. For list-type slots (features, testimonials, etc.), provide complete objects matching the slot structure
8. Only use component IDs from the AVAILABLE COMPONENTS list above
9. For image slots, use relevant Unsplash URLs with ?w=800&h=600&fit=crop format
10. Make the website feel complete and professional`;
}

export function buildUserPrompt(input: {
  businessName: string;
  industry: string;
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
}) {
  const fontMap: Record<string, { heading: string; body: string }> = {
    modern: { heading: "Inter", body: "Inter" },
    classic: { heading: "Playfair Display", body: "Lora" },
    playful: { heading: "Poppins", body: "Nunito" },
    bold: { heading: "Space Grotesk", body: "DM Sans" },
  };

  const fonts = fontMap[input.fontStyle] || fontMap.modern;

  return `Generate a website for:

Business Name: ${input.businessName}
Industry: ${input.industry}
Description: ${input.description}
Style: ${input.overallFeel}
Color Palette: primary=${input.colorPalette.primary}, secondary=${input.colorPalette.secondary}, accent=${input.colorPalette.accent}, bg=${input.colorPalette.bg}, text=${input.colorPalette.text}
Fonts: heading=${fonts.heading}, body=${fonts.body}
Pages needed: ${input.pages.join(", ")}

Generate a complete, professional website with compelling content specific to "${input.businessName}". Make the copy engaging and tailored to the ${input.industry} industry.`;
}
