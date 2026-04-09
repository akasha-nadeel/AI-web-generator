"use client";

import { useState, useEffect } from "react";
import { AuthNavbar } from "@/components/dashboard/AuthNavbar";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientButton } from "@/components/shared/GradientButton";
import { CreditsBadge } from "@/components/dashboard/CreditsBadge";
import { PLANS } from "@/lib/constants";
import { Check, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<"free" | "pro" | "business">("free");
  const [credits, setCredits] = useState(3);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/sites");
        if (res.ok) {
          const data = await res.json();
          setCurrentPlan(data.plan || "free");
          setCredits(data.credits ?? 3);
        }
      } catch {}
    }
    loadData();
  }, []);

  const handleUpgrade = async (plan: "pro" | "business") => {
    setLoading(plan);
    try {
      const priceId =
        plan === "pro"
          ? process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
          : process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID;

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Handle error
    } finally {
      setLoading(null);
    }
  };

  const tiers = [
    { key: "free" as const, plan: PLANS.free, popular: false },
    { key: "pro" as const, plan: PLANS.pro, popular: true },
    { key: "business" as const, plan: PLANS.business, popular: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar />
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Billing</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your subscription and credits
            </p>
          </div>
          <CreditsBadge
            remaining={credits}
            total={PLANS[currentPlan].generations}
          />
        </div>

        {/* Current plan badge */}
        <GlassCard hover={false} className="mb-8 flex items-center gap-3">
          <Crown className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-sm font-medium">
              Current plan: <span className="text-purple-400 capitalize">{currentPlan}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {currentPlan === "free"
                ? "Upgrade to unlock more features"
                : "Thank you for supporting Weavo!"}
            </p>
          </div>
        </GlassCard>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map(({ key, plan, popular }) => (
            <GlassCard
              key={key}
              hover={false}
              className={cn(
                "relative flex flex-col",
                popular && "border-purple-500/30 bg-white/8",
                currentPlan === key && "ring-2 ring-purple-500/50"
              )}
            >
              {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground text-sm">/month</span>
                  )}
                </div>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {currentPlan === key ? (
                <div className="text-center py-3 rounded-xl border border-purple-500/30 text-sm text-purple-400 font-medium">
                  Current Plan
                </div>
              ) : key === "free" ? (
                <div className="text-center py-3 rounded-xl border border-white/10 text-sm text-muted-foreground">
                  Free Forever
                </div>
              ) : (
                <GradientButton
                  onClick={() => handleUpgrade(key)}
                  className={cn(
                    "w-full",
                    loading === key && "opacity-70 pointer-events-none"
                  )}
                  variant={popular ? "primary" : "secondary"}
                >
                  {loading === key ? "Redirecting..." : `Upgrade to ${plan.name}`}
                </GradientButton>
              )}
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  );
}
