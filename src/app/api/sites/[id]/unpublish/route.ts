import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";
import { getOrCreateUser } from "@/lib/supabase/queries";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: siteId } = await params;
    const supabase = createServerClient();
    const user = await getOrCreateUser(clerkId, "", null);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { data: site } = await supabase
      .from("sites")
      .select("id, user_id")
      .eq("id", siteId)
      .single();

    if (!site || site.user_id !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Release the subdomain so someone else can claim it. Keep status
    // separate from subdomain — user can republish later with a new slug.
    await supabase
      .from("sites")
      .update({
        subdomain: null,
        status: "draft",
        published_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", siteId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unpublish site error:", error);
    return NextResponse.json({ error: "Unpublish failed" }, { status: 500 });
  }
}
