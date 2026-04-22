import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";
import { getOrCreateUser } from "@/lib/supabase/queries";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const supabase = createServerClient();
    const user = await getOrCreateUser(clerkId, "", null);
    if (!user) return NextResponse.json({ versions: [] });

    const { data: site } = await supabase
      .from("sites")
      .select("user_id")
      .eq("id", id)
      .single();
    if (!site || site.user_id !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { data: versions } = await supabase
      .from("site_versions")
      .select("id, source, summary, created_at")
      .eq("site_id", id)
      .order("created_at", { ascending: false })
      .limit(50);

    return NextResponse.json({ versions: versions || [] });
  } catch (error) {
    console.error("List versions error:", error);
    return NextResponse.json({ error: "Failed to list versions" }, { status: 500 });
  }
}
