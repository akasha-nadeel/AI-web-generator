import { NextRequest, NextResponse } from "next/server";
import { getTemplatePreview, getPreviewTheme } from "@/lib/templates/preview-data";
import { assemblePreviewHtml } from "@/lib/assembler/assembler";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ industryId: string }> }
) {
  const { industryId } = await params;
  const preview = getTemplatePreview(industryId);
  const theme = getPreviewTheme(industryId);

  if (!preview || !theme) {
    return new NextResponse("Template not found", { status: 404 });
  }

  const html = assemblePreviewHtml(preview.sections, theme, preview.siteName);

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
