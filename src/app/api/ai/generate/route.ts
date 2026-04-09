import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateUser, createSite, deductCredit, logGeneration } from "@/lib/supabase/queries";
import { buildGenerationPrompt, buildUserPrompt } from "@/lib/ai/prompts/generation";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit: 5 generations per minute per user
    const rl = rateLimit(`generate:${clerkId}`, { maxRequests: 5, windowMs: 60_000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const user = await getOrCreateUser(clerkId, "", null);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check credits
    if (user.credits_remaining <= 0) {
      return NextResponse.json(
        { error: "No credits remaining. Please upgrade your plan." },
        { status: 402 }
      );
    }

    const body = await req.json();
    const { businessName, industry, description, colorPalette, fontStyle, overallFeel, pages } = body;

    const systemPrompt = buildGenerationPrompt();
    const userPrompt = buildUserPrompt({
      businessName,
      industry,
      description,
      colorPalette,
      fontStyle,
      overallFeel,
      pages,
    });

    // Try AI generation
    let siteJson;

    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;

    if (process.env.OPENAI_API_KEY) {
      // Use OpenAI
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        siteJson = JSON.parse(content);
      }
    } else if (process.env.ANTHROPIC_API_KEY) {
      // Use Anthropic
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 8000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt + "\n\nReturn ONLY valid JSON." }],
        }),
      });

      const data = await response.json();
      const content = data.content?.[0]?.text;
      if (content) {
        // Extract JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          siteJson = JSON.parse(jsonMatch[0]);
        }
      }
    }

    if (!siteJson) {
      // Fallback: generate a basic site structure without AI
      siteJson = generateFallbackSite(businessName, industry, description, colorPalette, fontStyle, pages);
    }

    // Create site in database
    const fontMap: Record<string, { heading: string; body: string }> = {
      modern: { heading: "Inter", body: "Inter" },
      classic: { heading: "Playfair Display", body: "Lora" },
      playful: { heading: "Poppins", body: "Nunito" },
      bold: { heading: "Space Grotesk", body: "DM Sans" },
    };
    const fonts = fontMap[fontStyle] || fontMap.modern;

    const themeJson = {
      ...colorPalette,
      fontHeading: fonts.heading,
      fontBody: fonts.body,
    };

    const site = await createSite(
      user.id,
      businessName,
      industry,
      themeJson,
      siteJson
    );

    // Deduct credit
    await deductCredit(user.id);

    // Log generation
    await logGeneration(
      site?.id || "",
      user.id,
      `${businessName} - ${industry}`,
      siteJson,
      process.env.OPENAI_API_KEY ? "gpt-4o-mini" : "claude-sonnet"
    );

    return NextResponse.json({ siteId: site?.id, siteJson });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}

function generateFallbackSite(
  businessName: string,
  industry: string,
  description: string,
  colorPalette: { primary: string; secondary: string; accent: string; bg: string; text: string },
  fontStyle: string,
  pages: string[]
) {
  const fontMap: Record<string, { heading: string; body: string }> = {
    modern: { heading: "Inter", body: "Inter" },
    classic: { heading: "Playfair Display", body: "Lora" },
    playful: { heading: "Poppins", body: "Nunito" },
    bold: { heading: "Space Grotesk", body: "DM Sans" },
  };
  const fonts = fontMap[fontStyle] || fontMap.modern;

  return {
    theme: {
      ...colorPalette,
      fontHeading: fonts.heading,
      fontBody: fonts.body,
    },
    pages: pages.map((pageName, index) => ({
      name: pageName,
      slug: index === 0 ? "index" : pageName.toLowerCase().replace(/\s+/g, "-"),
      sections: [
        {
          componentId: "nav-simple",
          content: {
            brand: businessName,
            links: pages,
            ctaText: "Contact Us",
          },
        },
        ...(index === 0
          ? [
              {
                componentId: "hero-centered",
                content: {
                  headline: `Welcome to ${businessName}`,
                  subheadline: description,
                  ctaText: "Learn More",
                  ctaLink: "#contact",
                },
              },
              {
                componentId: "features-cards",
                content: {
                  title: "Our Services",
                  features: [
                    { title: "Quality Service", description: "We deliver exceptional quality in everything we do.", icon: "⭐" },
                    { title: "Expert Team", description: "Our experienced team is here to help you succeed.", icon: "👥" },
                    { title: "Fast Delivery", description: "Quick turnaround without compromising on quality.", icon: "🚀" },
                  ],
                },
              },
              {
                componentId: "cta-simple",
                content: {
                  title: "Ready to Get Started?",
                  subtitle: `Contact ${businessName} today and let's make something great together.`,
                  ctaText: "Get in Touch",
                },
              },
            ]
          : pageName.toLowerCase() === "about"
          ? [
              {
                componentId: "about-story",
                content: {
                  title: `About ${businessName}`,
                  story: description,
                  image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
                  stats: [
                    { number: "10+", label: "Years Experience" },
                    { number: "500+", label: "Happy Clients" },
                  ],
                },
              },
            ]
          : pageName.toLowerCase() === "contact"
          ? [
              {
                componentId: "contact-split",
                content: {
                  title: "Get in Touch",
                  subtitle: "We'd love to hear from you.",
                  email: `hello@${businessName.toLowerCase().replace(/\s+/g, "")}.com`,
                  phone: "+1 (555) 123-4567",
                  address: "123 Business Ave, City, ST 12345",
                },
              },
            ]
          : [
              {
                componentId: "hero-centered",
                content: {
                  headline: pageName,
                  subheadline: `Learn more about our ${pageName.toLowerCase()}.`,
                  ctaText: "Contact Us",
                  ctaLink: "#contact",
                },
              },
            ]),
        {
          componentId: "footer-simple",
          content: {
            brand: businessName,
            links: ["Home", "About", "Contact", "Privacy"],
            copyright: `${new Date().getFullYear()} ${businessName}. All rights reserved.`,
          },
        },
      ],
    })),
  };
}
