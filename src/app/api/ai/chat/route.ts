import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { buildEditorChatPrompt } from "@/lib/ai/prompts/editorChat";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

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
    const { message, html, siteJson } = body;

    // Support both new format (html) and legacy format (siteJson with html property)
    const currentHtml = html || siteJson?.html;

    if (!message || !currentHtml) {
      return NextResponse.json(
        { error: "Message and current HTML are required" },
        { status: 400 }
      );
    }

    const systemPrompt = buildEditorChatPrompt(currentHtml);

    let updatedHtml: string | null = null;

    if (process.env.ANTHROPIC_API_KEY) {
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
          messages: [{ role: "user", content: message }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.content?.[0]?.text;
        if (content) {
          updatedHtml = extractHtml(content);
        }
      }
    } else if (process.env.OPENAI_API_KEY) {
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
            { role: "user", content: message },
          ],
          temperature: 0.5,
          max_tokens: 16000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          updatedHtml = extractHtml(content);
        }
      }
    } else if (process.env.GEMINI_API_KEY) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: message }] }],
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 16000,
            },
          }),
        }
      );

      if (response.ok) {
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

    if (!updatedHtml) {
      return NextResponse.json(
        { error: "AI failed to process your request. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ html: updatedHtml });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
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
