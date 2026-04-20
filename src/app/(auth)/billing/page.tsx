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
import { ArrowLeft, Check, Zap, Sparkles, Gem, Plus, X, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaddleCheckoutModal } from "@/components/billing/PaddleCheckoutModal";

type CreditPack = (typeof CREDIT_PACKS)[number];

const PADDLE_PRICE_IDS: Record<string, string | undefined> = {
  starter: process.env.NEXT_PUBLIC_PADDLE_PRICE_STARTER,
  popular: process.env.NEXT_PUBLIC_PADDLE_PRICE_POPULAR,
  studio: process.env.NEXT_PUBLIC_PADDLE_PRICE_STUDIO,
};

const ACCENT = "#C8E600";

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
};

const PACK_FEATURES: Record<string, string[]> = {
  starter: [
    "100 AI credits",
    "Credits never expire",
    "All three models available",
    "Unlimited code exports",
    "Unsplash integration",
  ],
  popular: [
    "300 AI credits",
    "Credits never expire",
    "All three models available",
    "Unlimited code exports",
    "Unsplash integration",
    "Priority generation",
  ],
  studio: [
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
  const [activeCheckout, setActiveCheckout] = useState<{ pack: CreditPack; priceId: string } | null>(null);
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
    setActiveCheckout({ pack, priceId });
    setLoadingId(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-14 border-b border-white/[0.06] bg-[rgba(10,10,25,0.6)] backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shrink-0">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-white/10 bg-white/[0.04] text-sm text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <CreditCounter />
          <Link
            href="/wizard"
            className="hidden sm:flex items-center gap-2 h-9 px-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
            New Site
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8 md:mb-10 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Billing</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Pay only for credits — no subscriptions, no surprises.
            </p>
          </div>
          <div className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-300" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-base font-semibold text-white leading-tight">
                {balance ?? "…"} credits
              </div>
              <div className="text-[11px] text-white/50 capitalize leading-tight">
                {plan} plan
              </div>
            </div>
          </div>
        </div>

        {/* Why credits strip */}
        <div className="mb-8 inline-flex items-start gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] max-w-2xl">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.14em] shrink-0 mt-[1px]"
            style={{ color: ACCENT }}
          >
            Why credits
          </span>
          <span className="text-[12.5px] text-white/60 leading-snug text-left">
            Each site costs us{" "}
            <span className="text-white/85 font-semibold">$0.07–$1.05</span> in AI
            compute. Packs cover that plus hosting and payment fees — no hidden
            markup.
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "relative flex flex-col rounded-2xl p-6 md:p-7 backdrop-blur-xl transition-all",
                card.popular
                  ? "border-2 shadow-lg"
                  : "border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.16] hover:bg-white/[0.05]"
              )}
              style={
                card.popular
                  ? {
                      borderColor: ACCENT,
                      backgroundColor: `${ACCENT}0A`,
                      boxShadow: `0 10px 30px -10px ${ACCENT}26`,
                    }
                  : undefined
              }
            >
              {/* Name + badge */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-lg font-bold text-white">{card.name}</h3>
                {card.badge && (
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap border"
                    style={{
                      color: ACCENT,
                      borderColor: card.popular ? `${ACCENT}80` : `${ACCENT}4D`,
                      backgroundColor: card.popular ? `${ACCENT}33` : `${ACCENT}1A`,
                    }}
                  >
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-white/55 mb-7 min-h-[20px]">
                {card.tagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-4xl md:text-[2.75rem] font-bold leading-none text-white tracking-tight">
                  {card.price}
                </span>
                {card.priceSuffix && (
                  <span className="text-sm text-white/50 leading-tight">
                    /{card.priceSuffix}
                  </span>
                )}
              </div>

              {/* CTA */}
              {card.id === "free" ? (
                <div className="flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm mb-6 bg-white/[0.04] text-white/50 border border-white/[0.08]">
                  Current plan
                </div>
              ) : (
                <button
                  onClick={() => handleBuy(card.id)}
                  disabled={loadingId === card.id}
                  className={cn(
                    "flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm mb-6 transition-all",
                    card.popular
                      ? "text-black shadow-sm hover:opacity-90"
                      : "bg-white/[0.08] text-white/90 hover:bg-white/[0.14] border border-white/[0.08]",
                    loadingId === card.id && "opacity-60 cursor-wait"
                  )}
                  style={card.popular ? { backgroundColor: ACCENT } : undefined}
                >
                  {loadingId === card.id ? "Loading…" : card.ctaLabel}
                </button>
              )}

              {/* Features */}
              <ul className="space-y-3 text-[13.5px]">
                {card.features.map((f) => {
                  const numberMatch = f.match(/^(\d+)(.*)/);
                  return (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 shrink-0 mt-[2px]"
                        strokeWidth={3}
                        style={{ color: ACCENT }}
                      />
                      <span className="text-white/70 leading-snug">
                        {numberMatch ? (
                          <>
                            <span className="text-[20px] font-bold text-white mr-1 inline-block align-middle -mt-1">
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
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border bg-[rgba(15,15,30,0.95)] backdrop-blur-xl p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200"
        style={{ borderColor: `${ACCENT}40` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
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

        <h2 className="text-2xl font-bold text-white mb-2">Payment successful</h2>
        <p className="text-sm text-white/60 mb-6">
          Your <span className="text-white font-semibold">{packName}</span> pack is ready to use.
        </p>

        <div
          className="rounded-2xl p-5 mb-6 border"
          style={{ backgroundColor: `${ACCENT}0A`, borderColor: `${ACCENT}33` }}
        >
          <div className="flex items-baseline justify-center gap-2 mb-1">
            <span className="text-4xl font-bold tracking-tight" style={{ color: ACCENT }}>
              +{credits}
            </span>
            <span className="text-sm text-white/60 font-medium">credits added</span>
          </div>
          <div className="text-[12px] text-white/50">
            New balance: <span className="text-white/80 font-semibold">{newBalance} credits</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-white/80 transition-colors border border-white/10"
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
}> = [
  {
    key: "haiku",
    icon: Zap,
    blurb: "Quick drafts and simple landing pages. Fast output.",
  },
  {
    key: "sonnet",
    icon: Sparkles,
    blurb: "Full design library and patterns. Recommended default.",
  },
  {
    key: "opus",
    icon: Gem,
    blurb: "Maximum design intelligence. Premium quality.",
  },
];

function ModelCostBreakdown() {
  return (
    <div className="mt-16 md:mt-20">
      <div className="mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          What each model costs
        </h3>
        <p className="text-sm text-white/55 mt-1.5 max-w-lg">
          All three available to every paid user. Lower credits for fast drafts,
          higher for premium quality.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 md:gap-4">
        {modelRows.map(({ key, icon: Icon, blurb }) => {
          const model = MODEL_COSTS[key];
          const isPremium = key === "opus";
          return (
            <div
              key={key}
              className={cn(
                "rounded-2xl p-6 md:p-7 backdrop-blur-xl transition-all",
                isPremium
                  ? "border-2 shadow-lg"
                  : "border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.16] hover:bg-white/[0.05]"
              )}
              style={
                isPremium
                  ? {
                      borderColor: ACCENT,
                      backgroundColor: `${ACCENT}0A`,
                      boxShadow: `0 10px 30px -10px ${ACCENT}26`,
                    }
                  : undefined
              }
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    !isPremium && "bg-white/[0.06] text-white/80"
                  )}
                  style={
                    isPremium
                      ? { backgroundColor: `${ACCENT}33`, color: ACCENT }
                      : undefined
                  }
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                  {model.label}
                </span>
              </div>

              <div className="text-lg font-bold text-white leading-tight">
                {model.name}
              </div>
              <div className="text-[13px] text-white/55 mt-1 leading-relaxed">
                {blurb}
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-baseline gap-1.5">
                <span
                  className="text-3xl font-bold leading-none tracking-tight"
                  style={isPremium ? { color: ACCENT } : { color: "#fff" }}
                >
                  {model.credits}
                </span>
                <span className="text-sm text-white/50">credits / generation</span>
              </div>

              <div
                className={cn(
                  "mt-3 flex items-center gap-1.5 text-[11px] font-semibold",
                  model.requiresPayment && "text-white/40"
                )}
                style={!model.requiresPayment ? { color: ACCENT } : undefined}
              >
                {model.requiresPayment ? (
                  <>
                    <Lock className="w-3 h-3" strokeWidth={2.5} />
                    Pack required
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3" strokeWidth={3} />
                    Available on free tier
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
