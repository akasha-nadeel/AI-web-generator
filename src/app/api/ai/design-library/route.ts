import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { extractDesignDNA } from "@/lib/ai/prompts/modules/design-extractor";
import {
  saveDesignPattern,
  listDesignPatterns,
  deleteDesignPattern,
} from "@/lib/ai/design-library";

// Gate POST/DELETE behind ADMIN_EMAIL. Comma-separated list supported.
// If unset, admin ops are disabled entirely (safer than permissive default).
async function isAdmin(clerkId: string | null): Promise<boolean> {
  if (!clerkId) return false;
  const allowed = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length === 0) return false;
  try {
    const client = await clerkClient();
    const u = await client.users.getUser(clerkId);
    const emails = u.emailAddresses.map((e) => e.emailAddress.toLowerCase());
    return emails.some((e) => allowed.includes(e));
  } catch {
    return false;
  }
}

/**
 * POST /api/ai/design-library
 * Upload design screenshots → extract design DNA → store in library.
 * Admin-only (checks against ADMIN_EMAIL env var).
 */
export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!(await isAdmin(clerkId))) {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    const body = await req.json();
    const { name, industries, moods, images } = body as {
      name: string;
      industries: string[];
      moods: string[];
      images: Array<{ data: string; type: string }>;
    };

    if (!name || !industries?.length || !moods?.length || !images?.length) {
      return NextResponse.json(
        { error: "Missing required fields: name, industries, moods, images" },
        { status: 400 }
      );
    }

    // Determine which AI provider to use for extraction
    const provider = process.env.ANTHROPIC_API_KEY
      ? ("anthropic" as const)
      : process.env.OPENAI_API_KEY
        ? ("openai" as const)
        : process.env.GEMINI_API_KEY
          ? ("gemini" as const)
          : null;
    const apiKey =
      process.env.ANTHROPIC_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.GEMINI_API_KEY;

    if (!provider || !apiKey) {
      return NextResponse.json(
        { error: "No AI API key configured for extraction" },
        { status: 500 }
      );
    }

    // Extract design DNA from the uploaded screenshots
    const brief = await extractDesignDNA(images, apiKey, provider);
    if (!brief) {
      return NextResponse.json(
        { error: "Failed to extract design patterns from images. Try different screenshots." },
        { status: 422 }
      );
    }

    // Save to library
    const pattern = await saveDesignPattern(name, industries, moods, brief);
    if (!pattern) {
      return NextResponse.json(
        { error: "Failed to save design pattern to database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      pattern,
      message: `Design pattern "${name}" saved successfully with ${brief.signaturePatterns.length} signature patterns detected.`,
    });
  } catch (error) {
    console.error("[DesignLibrary] Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process design upload" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/design-library
 * List all stored design patterns.
 */
export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const patterns = await listDesignPatterns();
    return NextResponse.json({ patterns, count: patterns.length });
  } catch (error) {
    console.error("[DesignLibrary] List error:", error);
    return NextResponse.json(
      { error: "Failed to list design patterns" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ai/design-library
 * Delete a design pattern by ID.
 */
export async function DELETE(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!(await isAdmin(clerkId))) {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing pattern ID" }, { status: 400 });
    }

    const success = await deleteDesignPattern(id);
    if (!success) {
      return NextResponse.json({ error: "Failed to delete pattern" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DesignLibrary] Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete design pattern" },
      { status: 500 }
    );
  }
}
