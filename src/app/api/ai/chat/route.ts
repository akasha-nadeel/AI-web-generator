import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { buildEditorChatPrompt } from "@/lib/ai/prompts/editorChat";
import { rateLimit } from "@/lib/rate-limit";

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

    const { message, siteJson } = await req.json();

    const systemPrompt = buildEditorChatPrompt(JSON.stringify(siteJson, null, 2));

    let updatedSiteJson;

    if (process.env.OPENAI_API_KEY) {
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
            { role: "user", content: message },
          ],
          temperature: 0.5,
          response_format: { type: "json_object" },
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        updatedSiteJson = JSON.parse(content);
      }
    } else if (process.env.ANTHROPIC_API_KEY) {
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
          messages: [{ role: "user", content: message + "\n\nReturn ONLY the updated JSON." }],
        }),
      });

      const data = await response.json();
      const content = data.content?.[0]?.text;
      if (content) {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          updatedSiteJson = JSON.parse(jsonMatch[0]);
        }
      }
    }

    if (!updatedSiteJson) {
      return NextResponse.json(
        { error: "AI not configured. Add OPENAI_API_KEY or ANTHROPIC_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    return NextResponse.json({ siteJson: updatedSiteJson });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
