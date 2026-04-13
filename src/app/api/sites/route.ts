import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";
import { getOrCreateUser } from "@/lib/supabase/queries";

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createServerClient();
    const user = await getOrCreateUser(clerkId, "", null);
    if (!user) return NextResponse.json({ sites: [], credits: 3, plan: "free" });

    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("id");
    const status = searchParams.get("status"); // "archived" for trash, null for active

    // Single site fetch
    if (siteId) {
      const { data: site } = await supabase
        .from("sites")
        .select("*")
        .eq("id", siteId)
        .eq("user_id", user.id)
        .single();
      return NextResponse.json({ site });
    }

    // Build query
    let query = supabase
      .from("sites")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    // Filter by status
    if (status === "archived") {
      query = query.eq("status", "archived");
    } else {
      query = query.neq("status", "archived");
    }

    const { data: sites } = await query;

    return NextResponse.json({
      sites: sites || [],
      credits: user.credits_remaining,
      plan: user.plan,
    });
  } catch (error) {
    console.error("Get sites error:", error);
    return NextResponse.json({ sites: [], credits: 3, plan: "free" });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createServerClient();
    const user = await getOrCreateUser(clerkId, "", null);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();
    const { id, site_json, siteJson, action } = body;
    if (!id) return NextResponse.json({ error: "Missing site ID" }, { status: 400 });

    // Verify ownership
    const { data: site } = await supabase
      .from("sites")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!site || site.user_id !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Restore from trash
    if (action === "restore") {
      await supabase
        .from("sites")
        .update({ status: "draft", updated_at: new Date().toISOString() })
        .eq("id", id);
      return NextResponse.json({ success: true });
    }

    // Archive (soft-delete)
    if (action === "archive") {
      await supabase
        .from("sites")
        .update({ status: "archived", updated_at: new Date().toISOString() })
        .eq("id", id);
      return NextResponse.json({ success: true });
    }

    // Normal update (site JSON) — support both property names
    const jsonData = site_json || siteJson;
    if (!jsonData) {
      return NextResponse.json({ error: "Missing site data" }, { status: 400 });
    }
    await supabase
      .from("sites")
      .update({ site_json: jsonData, updated_at: new Date().toISOString() })
      .eq("id", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update site error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("id");
    const permanent = searchParams.get("permanent") === "true";
    if (!siteId) return NextResponse.json({ error: "Missing site ID" }, { status: 400 });

    const supabase = createServerClient();
    const user = await getOrCreateUser(clerkId, "", null);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Verify ownership
    const { data: site } = await supabase
      .from("sites")
      .select("user_id")
      .eq("id", siteId)
      .single();

    if (!site || site.user_id !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (permanent) {
      // Hard delete (from trash)
      await supabase.from("sites").delete().eq("id", siteId);
    } else {
      // Soft delete (move to trash)
      await supabase
        .from("sites")
        .update({ status: "archived", updated_at: new Date().toISOString() })
        .eq("id", siteId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete site error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
