import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";
import { getOrCreateUser } from "@/lib/supabase/queries";
import {
  validateSubdomain,
  isSubdomainAvailable,
  publicUrlFor,
} from "@/lib/publishing/subdomain";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: siteId } = await params;
    const body = await req.json().catch(() => ({}));
    const requestedSlug = typeof body.subdomain === "string" ? body.subdomain : "";

    const check = validateSubdomain(requestedSlug);
    if (!check.ok) {
      return NextResponse.json({ error: check.reason }, { status: 400 });
    }

    const supabase = createServerClient();
    const user = await getOrCreateUser(clerkId, "", null);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { data: site } = await supabase
      .from("sites")
      .select("id, user_id, site_json, subdomain")
      .eq("id", siteId)
      .single();

    if (!site || site.user_id !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const siteJson = site.site_json as { html?: string } | null;
    if (!siteJson?.html) {
      return NextResponse.json(
        { error: "Site has no generated HTML yet." },
        { status: 400 }
      );
    }

    // Re-publishing under the same slug is a no-op on the slug check.
    if (site.subdomain !== check.normalized) {
      const available = await isSubdomainAvailable(check.normalized, siteId);
      if (!available) {
        return NextResponse.json(
          { error: "That subdomain is already taken." },
          { status: 409 }
        );
      }
    }

    const { error: updateError } = await supabase
      .from("sites")
      .update({
        subdomain: check.normalized,
        status: "published",
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", siteId);

    if (updateError) {
      // Race condition on the unique index — another site grabbed the slug
      // between our availability check and the UPDATE.
      return NextResponse.json(
        { error: "That subdomain is already taken." },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      subdomain: check.normalized,
      url: publicUrlFor(check.normalized),
    });
  } catch (error) {
    console.error("Publish site error:", error);
    return NextResponse.json({ error: "Publish failed" }, { status: 500 });
  }
}
