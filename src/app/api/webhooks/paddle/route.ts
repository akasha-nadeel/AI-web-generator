import { NextRequest, NextResponse } from "next/server";
import { EventName } from "@paddle/paddle-node-sdk";
import { getPaddle } from "@/lib/paddle";
import { getUserByClerkId } from "@/lib/supabase/queries";
import { addCredits } from "@/lib/supabase/credits";
import { createServerClient } from "@/lib/supabase/server";
import { CREDIT_PACKS } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("paddle-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }

  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[paddle webhook] PADDLE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const rawBody = await req.text();

  let event;
  try {
    const paddle = getPaddle();
    event = await paddle.webhooks.unmarshal(rawBody, secret, signature);
  } catch (err) {
    console.error("[paddle webhook] signature verification failed", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  if (!event) {
    return NextResponse.json({ ok: true, ignored: "no event" });
  }

  if (event.eventType !== EventName.TransactionCompleted) {
    return NextResponse.json({ ok: true, ignored: event.eventType });
  }

  const txn = event.data;
  const customData = (txn.customData ?? {}) as {
    clerkId?: string;
    packId?: string;
  };

  if (!customData.clerkId || !customData.packId) {
    console.warn("[paddle webhook] transaction missing clerkId/packId in customData", {
      txnId: txn.id,
    });
    return NextResponse.json({ ok: true, skipped: "missing customData" });
  }

  const pack = CREDIT_PACKS.find((p) => p.id === customData.packId);
  if (!pack) {
    console.error("[paddle webhook] unknown packId in customData", customData.packId);
    return NextResponse.json({ error: "unknown packId" }, { status: 400 });
  }

  const user = await getUserByClerkId(customData.clerkId);
  if (!user) {
    console.error("[paddle webhook] user not found for clerkId", customData.clerkId);
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  const supabase = createServerClient();
  const { data: existing } = await supabase
    .from("credit_transactions")
    .select("id")
    .eq("user_id", user.id)
    .eq("type", "pack_purchase")
    .filter("metadata->>paddleTxnId", "eq", txn.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ ok: true, idempotent: true });
  }

  const quantity = txn.items?.[0]?.quantity ?? 1;
  const totalCredits = pack.credits * quantity;

  const result = await addCredits(user.id, totalCredits, "pack_purchase", {
    paddleTxnId: txn.id,
    packId: pack.id,
    quantity,
    amountUsd: txn.details?.totals?.total ?? null,
  });

  if (!result.success) {
    console.error("[paddle webhook] addCredits failed", result.reason);
    return NextResponse.json({ error: "credit grant failed" }, { status: 500 });
  }

  if (user.plan === "free") {
    const { error: planError } = await supabase
      .from("users")
      .update({ plan: "pro" })
      .eq("id", user.id);
    if (planError) {
      console.error("[paddle webhook] plan upgrade failed", planError);
    }
  }

  console.log(
    `[paddle webhook] +${totalCredits} credits to user ${user.id} (${pack.id}, txn ${txn.id})`
  );

  return NextResponse.json({
    ok: true,
    creditsAdded: totalCredits,
    newBalance: result.newBalance,
  });
}
