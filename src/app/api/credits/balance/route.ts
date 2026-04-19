import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/lib/supabase/queries";
import { getCreditBalance } from "@/lib/supabase/credits";

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getOrCreateUser(clerkId, "", null);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const balance = await getCreditBalance(user.id);
  return NextResponse.json({
    balance: balance ?? 0,
    plan: user.plan,
    hasEverPaid: user.has_ever_paid ?? false,
  });
}
