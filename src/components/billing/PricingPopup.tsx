"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { CREDIT_PACKS } from "@/lib/constants";
import { useCreditsStore } from "@/stores/creditsStore";
import { cn } from "@/lib/utils";
import { PaddleCheckoutModal } from "./PaddleCheckoutModal";

const ACCENT = "#C8E600";

type CreditPack = (typeof CREDIT_PACKS)[number];

const PADDLE_PRICE_IDS: Record<string, string | undefined> = {
  starter: process.env.NEXT_PUBLIC_PADDLE_PRICE_STARTER,
  popular: process.env.NEXT_PUBLIC_PADDLE_PRICE_POPULAR,
  studio: process.env.NEXT_PUBLIC_PADDLE_PRICE_STUDIO,
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

async function pollForNewCredits(refresh: () => Promise<void>): Promise<number | null> {
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

export function PricingPopup({
  open,
  onClose,
  title = "Unlock premium models",
  subtitle = "Pick a pack — credits never expire.",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}) {
  const { user: clerkUser } = useUser();
  const { refresh } = useCreditsStore();
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [paddleError, setPaddleError] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeCheckout, setActiveCheckout] = useState<{ pack: CreditPack; priceId: string } | null>(null);
  const pollingRef = useRef(false);

  const startPolling = () => {
    if (pollingRef.current) return;
    pollingRef.current = true;
    const toastId = toast.loading("Adding credits to your account…");
    pollForNewCredits(refresh)
      .then((added) => {
        if (added !== null) {
          toast.success(`+${added} credits added`, { id: toastId });
          onClose();
        } else {
          toast.error("Credits not received yet — refresh in a moment.", { id: toastId });
        }
      })
      .finally(() => {
        pollingRef.current = false;
      });
  };

  useEffect(() => {
    if (!open || paddle) return;
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env = process.env.NEXT_PUBLIC_PADDLE_ENV === "production" ? "production" : "sandbox";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !activeCheckout) onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, activeCheckout]);

  if (!open) return null;

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
      toast.error(paddleError ?? "Payments are still loading.");
      return;
    }
    if (!clerkUser) {
      toast.error("Please sign in to buy credits.");
      return;
    }
    const priceId = PADDLE_PRICE_IDS[packId];
    if (!priceId) {
      toast.error(`Pack "${packId}" is not configured.`);
      return;
    }
    const pack = CREDIT_PACKS.find((p) => p.id === packId);
    if (!pack) return;

    setLoadingId(packId);
    setActiveCheckout({ pack, priceId });
    setLoadingId(null);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200 px-4 py-10"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-[1280px] rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 bg-white/[0.06] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.14] transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>

          <div className="mb-7 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
              {title}
            </h2>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={cn(
                  "relative flex flex-col rounded-2xl p-5 md:p-6 transition-all",
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
                <p className="text-[13px] text-white/55 mb-5 min-h-[20px]">{card.tagline}</p>

                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="text-3xl md:text-[2.25rem] font-bold leading-none text-white tracking-tight">
                    {card.price}
                  </span>
                  {card.priceSuffix && (
                    <span className="text-sm text-white/50 leading-tight">/{card.priceSuffix}</span>
                  )}
                </div>

                {card.id === "free" ? (
                  <div className="flex items-center justify-center w-full py-2.5 rounded-xl font-semibold text-sm mb-5 bg-white/[0.04] text-white/50 border border-white/[0.08]">
                    Current plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleBuy(card.id)}
                    disabled={loadingId === card.id}
                    className={cn(
                      "flex items-center justify-center w-full py-2.5 rounded-xl font-semibold text-sm mb-5 transition-all",
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

                <ul className="space-y-2.5 text-[13px]">
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
        </div>
      </div>

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
    </>
  );
}
