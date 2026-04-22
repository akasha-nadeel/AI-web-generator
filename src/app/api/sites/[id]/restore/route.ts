import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";
import { getOrCreateUser } from "@/lib/supabase/queries";

// Restore a site to a previous version.
// Snapshots the CURRENT state first (so the restore itself is undoable),
// then overwrites site_json with the chosen version.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { versionId } = await req.json();
    if (!versionId) return NextResponse.json({ error: "Missing versionId" }, { status: 400 });

    const supabase = createServerClient();
    const user = await getOrCreateUser(clerkId, "", null);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Ownership + fetch current site_json
    const { data: site } = await supabase
      .from("sites")
      .select("user_id, site_json")
      .eq("id", id)
      .single();
    if (!site || site.user_id !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Load target version (must belong to the same site + user)
    const { data: version } = await supabase
      .from("site_versions")
      .select("id, site_json, site_id, user_id")
      .eq("id", versionId)
      .single();
    if (!version || version.site_id !== id || version.user_id !== user.id) {
      return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    // Snapshot current state before restoring so the restore is itself reversible.
    if (site.site_json) {
      await supabase.from("site_versions").insert({
        site_id: id,
        user_id: user.id,
        site_json: site.site_json,
        source: "restore",
        summary: "Before restore",
      });
    }

    await supabase
      .from("sites")
      .update({ site_json: version.site_json, updated_at: new Date().toISOString() })
      .eq("id", id);

    return NextResponse.json({ success: true, site_json: version.site_json });
  } catch (error) {
    console.error("Restore version error:", error);
    return NextResponse.json({ error: "Restore failed" }, { status: 500 });
  }
}
