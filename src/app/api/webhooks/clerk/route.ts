import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type === "user.created") {
      const supabase = createServerClient();
      const email = data.email_addresses?.[0]?.email_address || "";
      const name = `${data.first_name || ""} ${data.last_name || ""}`.trim() || null;

      await supabase.from("users").upsert(
        {
          clerk_id: data.id,
          email,
          name,
          plan: "free",
          credits_remaining: 30,
        },
        { onConflict: "clerk_id" }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Clerk webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
