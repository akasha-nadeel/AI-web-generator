import { NextRequest, NextResponse } from "next/server";
import { getTemplatePreview, getPreviewTheme } from "@/lib/templates/preview-data";
import { assemblePreviewHtml } from "@/lib/assembler/assembler";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ industryId: string }> }
) {
  const { industryId } = await params;
  const preview = getTemplatePreview(industryId);
  const theme = getPreviewTheme(industryId);

  if (preview && theme) {
    const html = assemblePreviewHtml(preview.sections, theme, preview.siteName);
    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Fallback: Check if industryId is actually a generated site ID in the database
  const supabase = createServerClient();
  const { data: site } = await supabase
    .from("sites")
    .select("site_json")
    .eq("id", industryId)
    .single();

  if (site?.site_json?.html) {
    return new NextResponse(site.site_json.html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new NextResponse("Template not found", { status: 404 });
}
