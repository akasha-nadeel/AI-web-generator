import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateUser, createSite, logGeneration } from "@/lib/supabase/queries";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/ai/prompts/generation";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 120; // Allow up to 120s for AI generation (32k token responses need more time)

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

    const body = await req.json();
    const { prompt, industry, mood, pages, templateId } = body;

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const userPrompt = buildUserPrompt({
      prompt: prompt.trim(),
      industry: industry || "general",
      mood: mood || "modern",
      pages: pages || [],
      templateId: templateId || undefined,
    });

    // Try AI generation — Anthropic first, then OpenAI, then Gemini
    let generatedHtml: string | null = null;
    let modelUsed = "unknown";

    if (process.env.ANTHROPIC_API_KEY) {
      modelUsed = "claude-sonnet-4-20250514";
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: modelUsed,
          max_tokens: 16384,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Anthropic API error:", errorData);
      } else {
        const data = await response.json();
        const content = data.content?.[0]?.text;
        if (content) {
          generatedHtml = extractHtml(content);
        }
      }
    } else if (process.env.OPENAI_API_KEY) {
      modelUsed = "gpt-4o";
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: modelUsed,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 16384,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("OpenAI API error:", errorData);
      } else {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          generatedHtml = extractHtml(content);
        }
      }
    } else if (process.env.GEMINI_API_KEY) {
      modelUsed = "gemini-2.0-flash";
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelUsed}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [{ parts: [{ text: userPrompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8192,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Gemini API error:", errorData);
      } else {
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content) {
          generatedHtml = extractHtml(content);
        }
      }
    } else {
      return NextResponse.json(
        { error: "No AI API key configured. Add ANTHROPIC_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    if (!generatedHtml) {
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 500 }
      );
    }

    // Store the generated HTML in site_json as { html: "..." }
    const siteData = { html: generatedHtml };

    // Extract a site name from the prompt
    const siteName = extractSiteName(prompt);

    const site = await createSite(
      user.id,
      siteName,
      industry || "general",
      {}, // theme_json — not needed anymore since HTML contains everything
      siteData
    );

    // Log generation
    await logGeneration(
      site?.id || "",
      user.id,
      prompt.slice(0, 200),
      { model: modelUsed, promptLength: prompt.length },
      modelUsed
    );

    return NextResponse.json({
      siteId: site?.id,
      html: generatedHtml,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Extract clean HTML from AI response.
 * Handles cases where the AI wraps HTML in markdown code fences.
 */
function extractHtml(content: string): string | null {
  let html = content.trim();

  // Remove markdown code fences if present
  const codeBlockMatch = html.match(/```(?:html)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (codeBlockMatch) {
    html = codeBlockMatch[1].trim();
  }

  // Validate it looks like HTML
  if (html.includes("<!DOCTYPE html>") || html.includes("<html")) {
    return html;
  }

  // Try to find HTML within the response
  const htmlMatch = html.match(/(<!DOCTYPE html>[\s\S]*<\/html>)/i);
  if (htmlMatch) {
    return htmlMatch[1];
  }

  return null;
}

/**
 * Extract a reasonable site name from the user's prompt.
 */
function extractSiteName(prompt: string): string {
  // Take first ~50 chars, trim to last complete word
  const truncated = prompt.slice(0, 50).trim();
  const lastSpace = truncated.lastIndexOf(" ");
  const name = lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated;
  return name || "My Website";
}
