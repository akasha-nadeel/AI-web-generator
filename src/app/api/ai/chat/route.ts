import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { buildEditorChatPrompt } from "@/lib/ai/prompts/editorChat";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 300;

interface ChatImage {
  data: string; // base64 data URL (data:image/png;base64,...)
  type: string; // e.g. "image/png"
}

interface ParsedImage {
  dataUrl: string;
  mimeType: string;
  base64: string;
}

function parseDataUrl(dataUrl: string): { base64: string; mimeType: string } | null {
  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) return null;
  return { mimeType: match[1], base64: match[2] };
}

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit: 20 chat messages per minute per user
    const rl = rateLimit(`chat:${clerkId}`, { maxRequests: 20, windowMs: 60_000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, html, siteJson, images } = body;

    // Support both new format (html) and legacy format (siteJson with html property)
    const currentHtml = html || siteJson?.html;

    if (!message || !currentHtml) {
      return NextResponse.json(
        { error: "Message and current HTML are required" },
        { status: 400 }
      );
    }

    // Parse attached images
    const parsedImages: ParsedImage[] = [];
    if (Array.isArray(images)) {
      for (const img of images as ChatImage[]) {
        if (img.data && typeof img.data === "string") {
          const parsed = parseDataUrl(img.data);
          if (parsed) {
            parsedImages.push({
              dataUrl: img.data,
              mimeType: parsed.mimeType,
              base64: parsed.base64,
            });
          }
        }
      }
    }

    // Build user message — append placeholder instructions when images are attached
    let userMessage = message;
    if (parsedImages.length > 0) {
      const placeholders = parsedImages.map((_, i) => `{{USER_IMAGE_${i + 1}}}`).join(", ");
      userMessage += `\n\n[ATTACHED ${parsedImages.length} IMAGE(S). Use ${placeholders} as the exact src or url() value wherever the image(s) should appear in the HTML. Output the placeholder exactly as written — it will be replaced with the real image data automatically. For background images use style="background-image: url({{USER_IMAGE_1}}); background-size: cover; background-position: center;"]`;
    }

    const systemPrompt = buildEditorChatPrompt(currentHtml);

    let updatedHtml: string | null = null;

    // Abort after 120s to prevent indefinite hangs
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120_000);

    try {
      if (process.env.ANTHROPIC_API_KEY) {
        // Build multimodal content
        const userContent: Array<{ type: string; [key: string]: unknown }> = [];

        for (const img of parsedImages) {
          userContent.push({
            type: "image",
            source: {
              type: "base64",
              media_type: img.mimeType,
              data: img.base64,
            },
          });
        }

        userContent.push({ type: "text", text: userMessage });

        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 16000,
            system: systemPrompt,
            messages: [{ role: "user", content: parsedImages.length > 0 ? userContent : userMessage }],
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Anthropic chat API error:", response.status, errorData);
        } else {
          const data = await response.json();
          const content = data.content?.[0]?.text;
          if (content) {
            updatedHtml = extractHtml(content);
          }
        }
      } else if (process.env.OPENAI_API_KEY) {
        // Build multimodal content
        const userContent: Array<{ type: string; [key: string]: unknown }> = [];

        for (const img of parsedImages) {
          userContent.push({
            type: "image_url",
            image_url: { url: img.dataUrl, detail: "high" },
          });
        }

        userContent.push({ type: "text", text: userMessage });

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: parsedImages.length > 0 ? userContent : userMessage },
            ],
            temperature: 0.5,
            max_tokens: 16000,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("OpenAI chat API error:", response.status, errorData);
        } else {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            updatedHtml = extractHtml(content);
          }
        }
      } else if (process.env.GEMINI_API_KEY) {
        // Build multimodal parts
        const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

        for (const img of parsedImages) {
          parts.push({
            inlineData: {
              mimeType: img.mimeType,
              data: img.base64,
            },
          });
        }

        parts.push({ text: userMessage });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemPrompt }] },
              contents: [{ parts }],
              generationConfig: {
                temperature: 0.5,
                maxOutputTokens: 16000,
              },
            }),
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Gemini chat API error:", response.status, errorData);
        } else {
          const data = await response.json();
          const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (content) {
            updatedHtml = extractHtml(content);
          }
        }
      } else {
        return NextResponse.json(
          { error: "No AI API key configured. Add ANTHROPIC_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY." },
          { status: 500 }
        );
      }
    } finally {
      clearTimeout(timeout);
    }

    if (!updatedHtml) {
      return NextResponse.json(
        { error: "AI failed to process your request. Please try again." },
        { status: 500 }
      );
    }

    // Replace image placeholders with actual data URLs
    for (let i = 0; i < parsedImages.length; i++) {
      updatedHtml = updatedHtml.replaceAll(`{{USER_IMAGE_${i + 1}}}`, parsedImages[i].dataUrl);
    }

    return NextResponse.json({ html: updatedHtml });
  } catch (error) {
    console.error("Chat error:", error);
    const msg =
      error instanceof Error && error.name === "AbortError"
        ? "Request timed out. Try a simpler change."
        : "Chat failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function extractHtml(content: string): string | null {
  let html = content.trim();

  // Remove markdown code fences if present
  const codeBlockMatch = html.match(/```(?:html)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (codeBlockMatch) {
    html = codeBlockMatch[1].trim();
  }

  if (html.includes("<!DOCTYPE html>") || html.includes("<html")) {
    return html;
  }

  const htmlMatch = html.match(/(<!DOCTYPE html>[\s\S]*<\/html>)/i);
  if (htmlMatch) {
    return htmlMatch[1];
  }

  return null;
}
