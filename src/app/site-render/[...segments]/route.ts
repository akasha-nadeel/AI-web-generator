import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { capForPlan, planTier } from "@/lib/publishing/bandwidth";

const NOT_FOUND_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<title>Site not found</title>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  body { font-family: ui-sans-serif,system-ui,sans-serif; background:#0b0b0c; color:#e9e9ea;
         display:grid; place-items:center; min-height:100vh; margin:0; padding:24px; }
  .card { max-width:420px; text-align:center; }
  h1 { font-size:22px; font-weight:600; margin:0 0 8px; }
  p { color:#a1a1aa; font-size:14px; line-height:1.5; margin:0 0 16px; }
  a { color:#e9e9ea; text-decoration:underline; text-underline-offset:3px; font-size:13px; }
</style></head>
<body><div class="card">
  <h1>Site not found</h1>
  <p>This Weavo site isn't published, or the address is wrong.</p>
  <a href="https://weavo.site">Build your own at weavo.site</a>
</div></body></html>`;

function capExceededHtml(tier: "free" | "paid", resetAt: string | null): string {
  const resetText = resetAt
    ? new Date(resetAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "soon";
  const body =
    tier === "paid"
      ? `This site hit its monthly bandwidth limit. It will be back on ${resetText}.`
      : `This site hit its monthly bandwidth limit. The owner can upgrade to raise it, or it will reset on ${resetText}.`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<title>Temporarily unavailable</title>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  body { font-family: ui-sans-serif,system-ui,sans-serif; background:#0b0b0c; color:#e9e9ea;
         display:grid; place-items:center; min-height:100vh; margin:0; padding:24px; }
  .card { max-width:460px; text-align:center; }
  h1 { font-size:22px; font-weight:600; margin:0 0 8px; }
  p { color:#a1a1aa; font-size:14px; line-height:1.6; margin:0 0 16px; }
</style></head>
<body><div class="card">
  <h1>Temporarily unavailable</h1>
  <p>${body}</p>
</div></body></html>`;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ segments: string[] }> }
) {
  const { segments } = await params;
  const subdomain = segments?.[0];
  if (!subdomain) {
    return new NextResponse(NOT_FOUND_HTML, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const supabase = createServerClient();
  const { data: site } = await supabase
    .from("sites")
    .select("id, user_id, site_json, status, bandwidth_used_bytes, bandwidth_reset_at")
    .eq("subdomain", subdomain)
    .eq("status", "published")
    .single();

  if (!site) {
    return new NextResponse(NOT_FOUND_HTML, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Owner's plan → bandwidth cap. We fetch plan here (not joined above) so
  // the hot path stays a single subdomain-indexed lookup first.
  const { data: owner } = await supabase
    .from("users")
    .select("plan")
    .eq("id", site.user_id)
    .single();

  const tier = planTier(owner?.plan || "free");
  const cap = capForPlan(owner?.plan || "free");

  // Lazy monthly reset happens in the RPC (increment_site_bandwidth), but
  // we also need the "current" used value for the pre-flight cap check.
  // If the reset marker is already in the past, treat used as 0 — the
  // RPC will catch up and reset on the next increment.
  const resetDue = new Date(site.bandwidth_reset_at).getTime() < Date.now();
  const currentUsed = resetDue ? 0 : site.bandwidth_used_bytes;

  if (currentUsed >= cap) {
    return new NextResponse(capExceededHtml(tier, site.bandwidth_reset_at), {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Retry-After": "3600",
      },
    });
  }

  const html = (site.site_json as { html?: string } | null)?.html;
  if (!html) {
    return new NextResponse(NOT_FOUND_HTML, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const bytes = Buffer.byteLength(html, "utf8");

  // Fire-and-forget: we don't want bandwidth tracking latency on the
  // response path. If the RPC fails, a tiny bit of usage is uncounted —
  // acceptable trade-off for fast page loads.
  supabase
    .rpc("increment_site_bandwidth", { p_site_id: site.id, p_bytes: bytes })
    .then(({ error }) => {
      if (error) console.warn("[bandwidth] increment failed:", error.message);
    });

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=300",
      "X-Robots-Tag": "index, follow",
    },
  });
}
