"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { CreditCounter } from "@/components/ui/CreditCounter";
import { useCreditsStore } from "@/stores/creditsStore";
import { CREDIT_PACKS, MODEL_COSTS, type ModelKey } from "@/lib/constants";
import { ArrowLeft, Check, Zap, Sparkles, Gem, Plus, X, Lock, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaddleCheckoutModal } from "@/components/billing/PaddleCheckoutModal";

type CreditPack = (typeof CREDIT_PACKS)[number];

const PADDLE_PRICE_IDS: Record<string, string | undefined> = {
  starter: process.env.NEXT_PUBLIC_PADDLE_PRICE_STARTER,
  popular: process.env.NEXT_PUBLIC_PADDLE_PRICE_POPULAR,
  studio: process.env.NEXT_PUBLIC_PADDLE_PRICE_STUDIO,
};

const ACCENT = "#4F46E5"; // Default to indigo

const PACK_COLORS: Record<string, string> = {
  free: "#64748B", // Matches Haiku
  starter: "#0284C7", // Matches Sonnet
  popular: "#4F46E5", // Indigo 600
  studio: "#1E1B4B", // Deep Navy
};

type PackCard = {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  ctaLabel: string;
  popular: boolean;
  features: string[];
  color: string;
};

const FREE_CARD: PackCard = {
  id: "free",
  name: "Free",
  tagline: "Ideal for getting started",
  price: "Free",
  priceSuffix: "",
  ctaLabel: "Current",
  popular: false,
  features: [
    "30 AI credits (one-time)",
    "Haiku model only (fast drafts)",
    "Unlock Sonnet & Opus with any pack",
    "Export as ZIP",
  ],
  color: PACK_COLORS.free,
};

const PACK_FEATURES: Record<string, string[]> = {
  starter: [
    "Lifetime Pro access included",
    "100 AI credits",
    "Credits never expire",
    "All three models available",
    "Unlimited code exports",
    "Unsplash integration",
  ],
  popular: [
    "Lifetime Pro access included",
    "300 AI credits",
    "Credits never expire",
    "All three models available",
    "Unlimited code exports",
    "Unsplash integration",
    "Priority generation",
  ],
  studio: [
    "Lifetime Pro access included",
    "800 AI credits",
    "Credits never expire",
    "All three models available",
    "Unlimited code exports",
    "Unsplash integration",
    "Priority generation",
    "Early access to new features",
  ],
};

const PACK_BADGES: Record<string, string> = {
  starter: "Early Bird",
  popular: "Save 29%",
  studio: "Save 46%",
};

const PACK_TAGLINES: Record<string, string> = {
  starter: "For casual builders",
  popular: "For creators who build often",
  studio: "For heavy builders",
};

type PurchaseSuccess = { credits: number; packName: string };

async function pollForNewCredits(
  refresh: () => Promise<void>
): Promise<number | null> {
  const startBalance = useCreditsStore.getState().balance ?? 0;
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    await refresh();
    const next = useCreditsStore.getState().balance ?? 0;
    if (next > startBalance) return next - startBalance;
    await new Promise((r) => setTimeout(r, 1500));
  }
  return null;
}

export default function BillingPage() {
  const { balance, plan, refresh } = useCreditsStore();
  const { user: clerkUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [paddleError, setPaddleError] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<PurchaseSuccess | null>(null);
  const [activeCheckout, setActiveCheckout] = useState<{ pack: CreditPack; priceId: string; color: string } | null>(null);
  const pollingRef = useRef(false);
  const lastPackIdRef = useRef<string | null>(null);

  const startPolling = () => {
    if (pollingRef.current) return;
    pollingRef.current = true;
    const toastId = toast.loading("Adding credits to your account…");
    pollForNewCredits(refresh)
      .then((added) => {
        if (added !== null) {
          toast.dismiss(toastId);
          const packId = lastPackIdRef.current;
          const pack = packId ? CREDIT_PACKS.find((p) => p.id === packId) : null;
          setPurchaseSuccess({
            credits: added,
            packName: pack?.name ?? "Credit pack",
          });
        } else {
          toast.error("Credits not received yet — refresh in a moment.", { id: toastId });
        }
      })
      .finally(() => {
        pollingRef.current = false;
      });
  };

  useEffect(() => {
    if (balance === null) refresh();
  }, [balance, refresh]);

  // Fallback: if user lands on /billing?purchase=success directly, poll too
  useEffect(() => {
    if (searchParams.get("purchase") !== "success") return;
    startPolling();
    router.replace("/billing", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env = process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
      ? "production"
      : "sandbox";

    if (!token) {
      setPaddleError("Payments not configured.");
      return;
    }

    initializePaddle({
      token,
      environment: env,
      eventCallback: (data) => {
        if (data.name === "checkout.completed") {
          startPolling();
          setActiveCheckout(null);
        }
      },
    })
      .then((instance) => {
        if (instance) setPaddle(instance);
        else setPaddleError("Paddle failed to load.");
      })
      .catch((err) => {
        console.error("Paddle init failed", err);
        setPaddleError("Payments unavailable. Try again later.");
      });
  }, [refresh]);

  const cards: PackCard[] = [
    FREE_CARD,
    ...CREDIT_PACKS.map((p) => ({
      id: p.id,
      name: p.name,
      badge: PACK_BADGES[p.id],
      tagline: PACK_TAGLINES[p.id] ?? "",
      price: `$${p.price}`,
      priceSuffix: "one-time",
      ctaLabel: `Buy ${p.name}`,
      popular: p.popular,
      features: PACK_FEATURES[p.id] ?? [],
      color: PACK_COLORS[p.id] ?? ACCENT,
    })),
  ];

  const handleBuy = (packId: string) => {
    if (!paddle) {
      alert(paddleError ?? "Payments are still loading. Try again in a moment.");
      return;
    }
    if (!clerkUser) {
      alert("Please sign in to buy credits.");
      return;
    }
    const priceId = PADDLE_PRICE_IDS[packId];
    if (!priceId) {
      alert(`Pack "${packId}" is not configured.`);
      return;
    }
    const pack = CREDIT_PACKS.find((p) => p.id === packId);
    if (!pack) return;

    setLoadingId(packId);
    lastPackIdRef.current = packId;
    setActiveCheckout({ pack, priceId, color: PACK_COLORS[packId] ?? ACCENT });
    setLoadingId(null);
  };

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

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-8 pb-6 md:pb-8">
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

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8 md:mb-10 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Billing</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Pay only for credits — no subscriptions, no surprises.
            </p>
          </div>
        </div>

        {/* Free users: prominent upgrade hero. Pro users: small cost-rationale strip. */}
        {plan === "free" ? (
          <div
            className="mb-8 rounded-3xl p-7 md:p-9 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden bg-card border border-border"
          >
            {/* Soft accent glow */}
            <div
              className="absolute -right-24 -top-24 w-72 h-72 rounded-full opacity-[0.12] blur-3xl pointer-events-none"
              style={{ background: ACCENT }}
            />

            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 mb-2.5">
                <Zap className="w-5 h-5 fill-orange-500 text-orange-500" strokeWidth={2.5} />
                <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                  Unlock all AI models — for life
                </h2>
              </div>
              <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
                Buy any pack to upgrade to Pro. Use Sonnet and Opus on every generation, forever — even if your credits run out, your Pro access never does.
              </p>
            </div>

            <a
              href="#packs"
              className="shrink-0 inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold text-black hover:opacity-90 transition-opacity whitespace-nowrap relative z-10"
              style={{ backgroundColor: ACCENT }}
            >
              View packs
            </a>
          </div>
        ) : null}

        {/* Pricing cards */}
        <div id="packs" className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "relative flex flex-col rounded-[2rem] p-6 md:p-8 transition-all border-0 overflow-hidden",
                "text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300"
              )}
              style={{ 
                backgroundColor: card.color,
                boxShadow: `0 20px 40px -15px ${card.color}66`
              }}
            >
              {/* Name + badge */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-lg font-bold">{card.name}</h3>
                {card.badge && (
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-white/20 text-white backdrop-blur-sm"
                  >
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-white/70 mb-7 min-h-[20px]">
                {card.tagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-4xl md:text-[2.75rem] font-bold leading-none tracking-tight">
                  {card.price}
                </span>
                {card.priceSuffix && (
                  <span className="text-sm text-white/60 leading-tight">
                    /{card.priceSuffix}
                  </span>
                )}
              </div>

              {/* CTA */}
              {card.id === "free" ? (
                <div className="flex items-center justify-center w-full py-3.5 rounded-2xl font-bold text-sm mb-6 bg-white/10 text-white/80 border border-white/10 backdrop-blur-sm">
                  Current plan
                </div>
              ) : (
                <button
                  onClick={() => handleBuy(card.id)}
                  disabled={loadingId === card.id}
                  className={cn(
                    "flex items-center justify-center w-full py-3.5 rounded-2xl font-bold text-sm mb-6 transition-all bg-white shadow-lg hover:bg-white/90 active:scale-[0.98]",
                    loadingId === card.id && "opacity-60 cursor-wait"
                  )}
                  style={{ color: card.color }}
                >
                  {loadingId === card.id ? "Loading…" : card.ctaLabel}
                </button>
              )}

              {/* Features */}
              <ul className="space-y-4 text-[13.5px]">
                {card.features.map((f) => {
                  const numberMatch = f.match(/^(\d+)(.*)/);
                  return (
                    <li key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-[1px]">
                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                      </div>
                      <span className="text-white/80 leading-snug">
                        {numberMatch ? (
                          <>
                            <span className="text-[22px] font-black text-white mr-1.5 inline-block align-middle -mt-1.5">
                              {numberMatch[1]}
                            </span>
                            {numberMatch[2]}
                          </>
                        ) : (
                          f
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* AI Watermark Effect */}
              <Sparkles 
                className="absolute -right-8 -bottom-8 w-40 h-40 text-white opacity-10 -rotate-12 pointer-events-none" 
                strokeWidth={1}
              />
            </div>
          ))}
        </div>

        {/* Model cost breakdown */}
        <ModelCostBreakdown />
      </main>

      {activeCheckout && paddle && clerkUser && (
        <PaddleCheckoutModal
          paddle={paddle}
          pack={activeCheckout.pack}
          priceId={activeCheckout.priceId}
          customerEmail={clerkUser.primaryEmailAddress?.emailAddress ?? null}
          clerkId={clerkUser.id}
          onClose={() => setActiveCheckout(null)}
          packColor={activeCheckout.color}
        />
      )}

      {purchaseSuccess && (
        <PurchaseSuccessModal
          credits={purchaseSuccess.credits}
          packName={purchaseSuccess.packName}
          newBalance={balance ?? 0}
          onClose={() => setPurchaseSuccess(null)}
        />
      )}
    </div>
  );
}


function PurchaseSuccessModal({
  credits,
  packName,
  newBalance,
  onClose,
}: {
  credits: number;
  packName: string;
  newBalance: number;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border bg-popover backdrop-blur-xl p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200"
        style={{ borderColor: `${ACCENT}40` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: `${ACCENT}26`, border: `2px solid ${ACCENT}` }}
        >
          <Check className="w-8 h-8" strokeWidth={3} style={{ color: ACCENT }} />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">Payment successful</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Your <span className="text-foreground font-semibold">{packName}</span> pack is ready to use.
        </p>

        <div
          className="rounded-2xl p-5 mb-6 border"
          style={{ backgroundColor: `${ACCENT}0A`, borderColor: `${ACCENT}33` }}
        >
          <div className="flex items-baseline justify-center gap-2 mb-1">
            <span className="text-4xl font-bold tracking-tight" style={{ color: ACCENT }}>
              +{credits}
            </span>
            <span className="text-sm text-muted-foreground font-medium">credits added</span>
          </div>
          <div className="text-[12px] text-muted-foreground">
            New balance: <span className="text-foreground/80 font-semibold">{newBalance} credits</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-foreground/[0.06] hover:bg-foreground/[0.12] text-foreground/80 transition-colors border border-border"
          >
            Stay here
          </button>
          <Link
            href="/wizard"
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-black transition-opacity hover:opacity-90 inline-flex items-center justify-center"
            style={{ backgroundColor: ACCENT }}
          >
            Start building
          </Link>
        </div>
      </div>
    </div>
  );
}

const modelRows: Array<{
  key: ModelKey;
  icon: typeof Zap;
  blurb: string;
  color: string;
  badge?: string;
}> = [
  {
    key: "haiku",
    icon: Zap,
    blurb: "Quick drafts and simple landing pages. Fast output.",
    color: "#64748B",
    badge: "Fast",
  },
  {
    key: "sonnet",
    icon: Gem,
    blurb: "Full design library and patterns. Recommended default.",
    color: "#0284C7",
    badge: "Popular",
  },
  {
    key: "opus",
    icon: Crown,
    blurb: "Maximum design intelligence. Premium quality.",
    color: "#7C3AED",
    badge: "Elite",
  },
];

function ModelCostBreakdown() {
  return (
    <div className="mt-16 md:mt-20">
      <div className="mb-8 md:mb-10 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
          What each model costs
        </h3>
        <p className="text-[15px] text-muted-foreground mt-2 max-w-lg mx-auto md:mx-0">
          All three available to every paid user. Lower credits for fast drafts,
          higher for premium quality.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {modelRows.map(({ key, icon: Icon, blurb, color, badge }) => {
          const model = MODEL_COSTS[key];
          return (
            <div
              key={key}
              className={cn(
                "group relative rounded-[2rem] p-7 md:p-8 transition-all border-0 overflow-hidden",
                "text-white shadow-xl"
              )}
              style={{ 
                backgroundColor: color,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.15), 0 40px 50px -10px rgba(0, 0, 0, 0.25)"
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                    style={{ 
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)" 
                    }}
                  >
                    <Icon 
                      className="w-6 h-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" 
                      strokeWidth={1.5} 
                    />
                  </div>
                  {badge && (
                    <span 
                      className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/20 text-white backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  )}
                </div>

                <h4 className="text-2xl font-bold tracking-tight mb-2">
                  {model.name}
                </h4>
                <p className="text-[13px] text-white/70 leading-relaxed min-h-[40px]">
                  {blurb}
                </p>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-baseline gap-1.5">
                  <span className="text-[32px] font-black leading-none tracking-tighter">
                    {model.credits}
                  </span>
                  <span className="text-[11px] font-medium text-white/60 uppercase tracking-wider">
                    credits / generation
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[11px] font-bold">
                  {model.requiresPayment ? (
                    <div className="px-2.5 py-1 rounded-md bg-black/20 text-white/80 border border-white/10 flex items-center gap-1.5 backdrop-blur-sm">
                      <Lock className="w-3 h-3" strokeWidth={2.5} />
                      PACK REQUIRED
                    </div>
                  ) : (
                    <div className="px-2.5 py-1 rounded-md bg-white/20 text-white border border-white/10 flex items-center gap-1.5 backdrop-blur-sm">
                      <Check className="w-3 h-3" strokeWidth={3} />
                      AVAILABLE ON FREE TIER
                    </div>
                  )}
                </div>
              </div>

              {/* AI Watermark Effect */}
              <Sparkles 
                className="absolute -right-8 -bottom-8 w-48 h-48 text-white opacity-[0.08] -rotate-12 pointer-events-none" 
                strokeWidth={1}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
