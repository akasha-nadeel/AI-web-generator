"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { CreditCounter } from "@/components/ui/CreditCounter";
import { useCreditsStore } from "@/stores/creditsStore";
import { PLANS, type PlanType } from "@/lib/constants";
import {
  ArrowLeft,
  Plus,
  Zap,
  CreditCard,
  ArrowUpRight,
  Receipt,
  RefreshCw,
} from "lucide-react";

const ACCENT = "#C8E600";

export default function BillingManagePage() {
  const { user } = useUser();
  const { balance, plan, refresh } = useCreditsStore();

  useEffect(() => {
    if (balance === null) refresh();
  }, [balance, refresh]);

  const planKey = (plan in PLANS ? plan : "free") as PlanType;
  const planConfig = PLANS[planKey];
  const credits = balance ?? 0;

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      {/* Top bar — Unified with main app branding */}
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-1 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Weavo Logo" className="h-5 w-auto object-contain opacity-95 dark:invert-0 invert" />
        </Link>

        <div className="flex items-center gap-2">
          <CreditCounter />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 md:px-8 pb-6 md:pb-8">
        {/* Breadcrumb / Back button relocated below nav */}
        <div className="mb-10 -mx-4 md:-mx-8 border-y border-border/60 bg-foreground/[0.01]">
          <div className="px-4 md:px-8 py-3.5">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to Workspace
            </Link>
          </div>
        </div>

        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Billing
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Manage your plan, payment method, and credit purchases.
          </p>
        </div>

        <div className="space-y-1">
            {/* Current plan row */}
            <Section>
              <div className="flex items-start gap-5 flex-wrap">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${ACCENT}1A`,
                    borderColor: `${ACCENT}40`,
                  }}
                >
                  <Zap className="w-6 h-6" style={{ color: ACCENT }} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-[240px]">
                  <div className="text-xl font-semibold text-foreground capitalize">
                    {planConfig.name} plan
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    Pay-as-you-go · No subscription
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    You currently have{" "}
                    <span className="text-foreground font-medium">{credits}</span>{" "}
                    {credits === 1 ? "credit" : "credits"} available.
                  </div>
                </div>
                <Link
                  href="/billing"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-border bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08] transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Adjust plan
                </Link>
              </div>
            </Section>

            <Divider />

            {/* Payment method */}
            <Section>
              <SectionHeader title="Payment" />
              <div className="flex items-center gap-4 flex-wrap">
                <div className="w-10 h-10 rounded-xl bg-foreground/[0.06] border border-border flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-foreground/70" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="text-sm text-foreground/90">No payment method on file</div>
                  <div className="text-xs text-muted-foreground/50 mt-0.5">
                    Add a card during your first credit pack purchase.
                  </div>
                </div>
                <Link
                  href="/billing"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-border bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08] transition-colors"
                >
                  Add card
                </Link>
              </div>
            </Section>

            <Divider />

            {/* Extra credits / top up */}
            <Section>
              <SectionHeader
                title="Extra credits"
                subtitle="Buy a pack so you can keep building when your balance runs low."
              />
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-foreground tabular-nums">
                      {credits}
                    </span>
                    <span className="text-sm text-muted-foreground">credits available</span>
                  </div>
                  <div className="text-xs text-muted-foreground/50 mt-0.5">Current balance</div>
                </div>
                <Link
                  href="/billing"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ACCENT, color: "#0a0a0a" }}
                >
                  Buy credits
                  <span
                    className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold"
                    style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                  >
                    Save 46%
                  </span>
                </Link>
              </div>
            </Section>

            <Divider />

            {/* Auto-reload */}
            <Section>
              <SectionHeader
                title="Auto-reload"
                subtitle="Automatically buy a Starter pack when your balance falls below 10 credits."
              />
              <div className="flex items-center gap-4 flex-wrap">
                <div className="w-10 h-10 rounded-xl bg-foreground/[0.06] border border-border flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 text-foreground/70" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="text-sm text-foreground/90">Auto-reload is off</div>
                  <div className="text-xs text-muted-foreground/50 mt-0.5">
                    Requires a saved payment method.
                  </div>
                </div>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-border bg-foreground/[0.02] text-muted-foreground/40 cursor-not-allowed"
                >
                  Turn on
                </button>
              </div>
            </Section>

            <Divider />

            {/* Purchase history */}
            <Section>
              <SectionHeader title="Purchase history" />
              <div className="flex items-center gap-4 py-2">
                <div className="w-10 h-10 rounded-xl bg-foreground/[0.06] border border-border flex items-center justify-center shrink-0">
                  <Receipt className="w-4 h-4 text-foreground/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground/90">No purchases yet</div>
                  <div className="text-xs text-muted-foreground/50 mt-0.5">
                    Your credit pack receipts will appear here once you make a purchase.
                  </div>
                </div>
              </div>
            </Section>

          {/* Account email footer */}
          <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground/40">
            Signed in as{" "}
            <span className="text-muted-foreground/60">
              {user?.primaryEmailAddress?.emailAddress ?? "—"}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="py-6">{children}</div>;
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <div className="text-base font-semibold text-foreground">{title}</div>
      {subtitle && (
        <div className="text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
          {subtitle}
        </div>
      )}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-border" />;
}
