import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/supabase/queries";
import { createServerClient } from "@/lib/supabase/server";
import { translateHtmlToNextjs } from "@/lib/export/translate";
import { buildZip } from "@/lib/export/zip";
import { convertImagesModeC } from "@/lib/export/images";
import {
  buildExportFilename,
  checkExportEligibility,
  type ExportSite,
  type ExportUser,
} from "@/lib/export/response";
import {
  checkExportRateLimit,
  EXPORT_RATE_LIMIT_PER_HOUR,
} from "@/lib/export/rate-limit";

// Node runtime is required: translate.ts does a readFileSync on the hooks
// templates directory at request time, and jszip's nodebuffer type only
// works under Node (not Edge).
export const runtime = "nodejs";
export const maxDuration = 30;

interface ExportRequestBody {
  projectId?: string;
  bundleImages?: boolean;
}

export async function POST(req: NextRequest) {
  const startedAt = Date.now();
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as ExportRequestBody;
    const projectId = typeof body.projectId === "string" ? body.projectId : "";
    const bundleImages = Boolean(body.bundleImages);

    if (!projectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    const user = (await getUserByClerkId(clerkId)) as ExportUser | null;

    const supabase = createServerClient();
    const { data: siteRow } = await supabase
      .from("sites")
      .select("id, user_id, name, site_json, created_at")
      .eq("id", projectId)
      .maybeSingle();
    const site = siteRow as ExportSite | null;

    const eligibility = checkExportEligibility(user, site);
    if (!eligibility.ok) {
      return NextResponse.json(
        { error: eligibility.error, code: eligibility.code },
        { status: eligibility.status }
      );
    }

    // checkExportEligibility guarantees both are populated when ok=true.
    const userOk = user!;
    const siteOk = site!;
    const html = siteOk.site_json!.html as string;

    const rate = await checkExportRateLimit(supabase, userOk.id);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Export limit reached — max ${EXPORT_RATE_LIMIT_PER_HOUR} per hour. Try again shortly.`,
          code: "RATE_LIMITED",
          remaining: rate.remaining,
        },
        { status: 429 }
      );
    }

    const files = translateHtmlToNextjs(html, { siteName: siteOk.name });
    const bundled = bundleImages ? await convertImagesModeC(files) : files;
    const buf = await buildZip(bundled);

    const { error: logError } = await supabase.from("exports_log").insert({
      user_id: userOk.id,
      project_id: siteOk.id,
    });
    if (logError) {
      // Don't block the download on an audit-log write failure, but surface
      // it in logs so we notice if the table is missing or misconfigured.
      console.warn("[Export] exports_log insert failed:", logError.message);
    }

    const sectionCount = Object.keys(files).filter(
      (p) =>
        p.startsWith("components/") &&
        p.endsWith(".tsx") &&
        !p.endsWith("ClientRuntime.tsx")
    ).length;
    const sizeKb = (buf.length / 1024).toFixed(1);
    const seconds = ((Date.now() - startedAt) / 1000).toFixed(2);
    console.log(
      `[Export] user=${userOk.id} project=${siteOk.id} mode=${bundleImages ? "C" : "B"} sections=${sectionCount} size=${sizeKb}KB time=${seconds}s remaining=${Math.max(0, rate.remaining - 1)}/${EXPORT_RATE_LIMIT_PER_HOUR}`
    );

    const filename = buildExportFilename(siteOk.name);
    return new Response(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(buf.length),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[Export] failed", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
