import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { createServerClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServerClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const priceId = subscription.items.data[0]?.price?.id;

        // Determine plan from price ID
        const plan =
          priceId === process.env.STRIPE_PRO_PRICE_ID
            ? "pro"
            : priceId === process.env.STRIPE_BUSINESS_PRICE_ID
            ? "business"
            : "free";

        const credits = plan === "pro" ? 50 : plan === "business" ? 150 : 3;

        // Update user
        await supabase
          .from("users")
          .update({ plan, credits_remaining: credits })
          .eq("id", userId);

        // Create subscription record
        const periodEnd = subscription.items.data[0]?.current_period_end;
        await supabase.from("subscriptions").upsert(
          {
            user_id: userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            plan,
            status: "active",
            current_period_end: periodEnd
              ? new Date(periodEnd * 1000).toISOString()
              : null,
          },
          { onConflict: "stripe_subscription_id" }
        );
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionRef = invoice.parent?.subscription_details?.subscription;
      const subscriptionId = typeof subscriptionRef === "string"
        ? subscriptionRef
        : subscriptionRef?.id;

      if (subscriptionId) {
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("user_id, plan")
          .eq("stripe_subscription_id", subscriptionId)
          .single();

        if (sub) {
          const credits = sub.plan === "pro" ? 50 : sub.plan === "business" ? 150 : 3;
          await supabase
            .from("users")
            .update({ credits_remaining: credits })
            .eq("id", sub.user_id);
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      if (sub) {
        await supabase
          .from("users")
          .update({ plan: "free", credits_remaining: 3 })
          .eq("id", sub.user_id);

        await supabase
          .from("subscriptions")
          .update({ status: "canceled" })
          .eq("stripe_subscription_id", subscription.id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
