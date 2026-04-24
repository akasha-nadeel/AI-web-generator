// Pure helpers for the /api/export/nextjs route: eligibility decision and
// ZIP filename. Kept separate from the route handler so the decision logic
// is unit-testable without mocking Clerk + Supabase.

export interface ExportUser {
  id: string;
  plan: "free" | "pro" | "business";
}

export interface ExportSite {
  id: string;
  user_id: string;
  name: string;
  site_json: { html?: string } | null;
  created_at: string;
}

export interface ExportDecision {
  ok: boolean;
  status: number;
  error?: string;
  code?: string;
}

// Sites generated before this date predate the export pipeline (no
// data-reveal hooks, no section ids, no runtime markers). UI gates this
// too — the API enforces it as defense in depth.
export const EXPORT_AVAILABILITY_DATE = new Date("2026-04-22T00:00:00Z");

export function checkExportEligibility(
  user: ExportUser | null | undefined,
  site: ExportSite | null | undefined
): ExportDecision {
  if (!user) return { ok: false, status: 404, error: "User not found" };
  if (user.plan === "free") {
    return {
      ok: false,
      status: 403,
      error: "Next.js export is a Pro feature.",
      code: "PRO_REQUIRED",
    };
  }
  if (!site) return { ok: false, status: 404, error: "Project not found" };
  if (site.user_id !== user.id) {
    return { ok: false, status: 403, error: "You don't own this project" };
  }
  if (!site.site_json?.html) {
    return { ok: false, status: 400, error: "Project has no generated site yet." };
  }
  if (new Date(site.created_at) < EXPORT_AVAILABILITY_DATE) {
    return {
      ok: false,
      status: 400,
      error:
        "This site was generated before Next.js export launched. Regenerate to enable export.",
      code: "SITE_TOO_OLD",
    };
  }
  return { ok: true, status: 200 };
}

export function buildExportFilename(siteName: string, date: Date = new Date()): string {
  const slug =
    siteName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "site";
  const stamp = date.toISOString().slice(0, 10);
  return `weavo-${slug}-${stamp}.zip`;
}
