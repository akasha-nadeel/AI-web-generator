"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizardStore";
import { useCreditsStore } from "@/stores/creditsStore";
import { MODEL_COSTS, type ModelKey, canUseModel } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Sparkles, Lock, Zap, Gem, Crown, AlertTriangle } from "lucide-react";
import { PricingPopup } from "@/components/billing/PricingPopup";

const LIME = "#d4ff00";

type ModelCard = {
  key: ModelKey;
  icon: typeof Zap;
  tagline: string;
  cardBg?: string;
  darkLimeBorder?: boolean;
  darkTheme?: boolean;
};

const MODEL_CARDS: ModelCard[] = [
  {
    key: "haiku",
    icon: Zap,
    tagline: "Anthropic's fastest model — quick drafts and clean simple layouts.",
    darkTheme: true,
  },
  {
    key: "sonnet",
    icon: Gem,
    tagline: "Recommended — full design library and richer multi-section pages.",
    darkLimeBorder: true,
  },
  {
    key: "opus",
    icon: Crown,
    tagline: "Anthropic's flagship — maximum creative freedom and editorial polish.",
    cardBg: LIME,
  },
];

export function StepModelSelection() {
  const router = useRouter();
  const {
    setModelKey,
    setStep,
    businessName,
    industry,
    description,
    overallFeel,
    selectedPages,
    inspirationImages,
  } = useWizardStore();

  const { balance, plan, refresh } = useCreditsStore();
  const [pricingOpen, setPricingOpen] = useState(false);

  useEffect(() => {
    if (balance === null) refresh();
  }, [balance, refresh]);

  const handleGenerate = (key: ModelKey) => {
    const model = MODEL_COSTS[key];
    if (!canUseModel(plan, key)) return;
    if ((balance ?? 0) < model.credits) return;

    setModelKey(key);

    const prompt = `Build a ${overallFeel} ${industry} website for "${businessName}". ${description}`;

    if (inspirationImages.length > 0) {
      try {
        sessionStorage.setItem(
          "pixora_inspiration_images",
          JSON.stringify(inspirationImages)
        );
      } catch { /* storage full — proceed without images */ }
    }

    const params = new URLSearchParams({
      prompt: prompt.trim(),
      industry,
      mood: overallFeel || "modern",
      pages: selectedPages.join(","),
      model: key,
    });

    router.push(`/generate/new?${params.toString()}`);
  };

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-white">
        Pick your AI model
      </h2>
      <p className="text-white/60 text-base mb-7 leading-relaxed max-w-lg">
        Pick the engine that builds your site. Faster models cost fewer credits — premium models deliver richer designs.
      </p>

      {/* Balance badge */}
      <div className="mb-5 inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/70">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        Your balance: <span className="text-white font-medium">{balance ?? "…"}</span> credits
        {plan === "free" && (
          <span className="ml-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] uppercase tracking-wide text-white/50">Free plan</span>
        )}
      </div>

      {/* Model cards — stacked rows with icon | content | CTA */}
      <div className="space-y-3">
        {MODEL_CARDS.map((card) => {
          const model = MODEL_COSTS[card.key];
          const isLocked = !canUseModel(plan, card.key);
          const canAffordCard = (balance ?? 0) >= model.credits;
          const Icon = card.icon;
          const isLight = !card.cardBg && !card.darkLimeBorder && !card.darkTheme;
          const isLimePack = !!card.cardBg;
          const isDark = !isLight && !isLimePack;
          const shortBy = Math.max(0, model.credits - (balance ?? 0));

          return (
            <div
              key={card.key}
              style={
                card.cardBg
                  ? { backgroundColor: card.cardBg }
                  : card.darkLimeBorder
                    ? {
                        backgroundColor: "#0d0d0d",
                        borderColor: LIME,
                        boxShadow: `0 0 0 1px ${LIME}, 0 18px 50px -18px ${LIME}55`,
                      }
                    : card.darkTheme
                      ? { backgroundColor: "#0d0d0d" }
                      : undefined
              }
              className={cn(
                "rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 relative group border",
                isLight && "bg-white",
                card.darkLimeBorder
                  ? "border-transparent hover:-translate-y-0.5"
                  : card.darkTheme
                    ? "border-white/10 hover:border-white/25 hover:-translate-y-0.5"
                    : "border-black/5 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.45)] hover:border-black/15 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-18px_rgba(0,0,0,0.55)]"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]",
                  card.cardBg
                    ? "bg-black border border-black"
                    : card.darkLimeBorder || card.darkTheme
                      ? "bg-white/[0.04] border border-white/10"
                      : "bg-white border border-black/10"
                )}
              >
                <Icon
                  className="w-5 h-5"
                  strokeWidth={2}
                  style={
                    card.cardBg
                      ? { color: card.cardBg }
                      : card.darkLimeBorder
                        ? { color: LIME }
                        : card.darkTheme
                          ? { color: "#fff" }
                          : { color: "#000" }
                  }
                />
              </div>

              {/* Content: title + tagline + credits */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3
                    className={cn(
                      "text-base font-bold tracking-tight",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    {model.name}
                  </h3>
                  {isLocked && (
                    <span
                      className={cn(
                        "text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded",
                        isDark ? "bg-amber-400/10 text-amber-300/90" : "bg-amber-500/15 text-amber-700/90"
                      )}
                    >
                      Paid only
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "text-[13px] leading-snug truncate",
                    isDark ? "text-white/55" : "text-black/55"
                  )}
                >
                  {card.tagline}
                </p>
                <span
                  className={cn(
                    "text-[10px] font-medium mt-1 flex items-baseline gap-1.5",
                    isDark ? "text-white/45" : "text-black/45"
                  )}
                >
                  <span className={cn(
                    "text-[32px] font-bold leading-none tracking-tighter",
                    isDark ? "text-white/95" : "text-black/95"
                  )}>
                    {model.credits}
                  </span>
                  <span>credits / generation</span>
                </span>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                {isLocked ? (
                  <button
                    onClick={() => setPricingOpen(true)}
                    className={cn(
                      "inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors whitespace-nowrap",
                      isDark
                        ? "bg-white/[0.06] text-white/80 hover:bg-white/[0.12] border border-white/10"
                        : "bg-black/[0.06] text-black/80 hover:bg-black/[0.12] border border-black/10"
                    )}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Unlock
                  </button>
                ) : !canAffordCard ? (
                  <button
                    onClick={() => setPricingOpen(true)}
                    className={cn(
                      "inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors whitespace-nowrap",
                      isDark
                        ? "bg-white/[0.06] text-white/70 hover:bg-white/[0.12] border border-white/10"
                        : "bg-black/[0.06] text-black/70 hover:bg-black/[0.12] border border-black/10"
                    )}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Need {shortBy}
                  </button>
                ) : (
                  <button
                    onClick={() => handleGenerate(card.key)}
                    className={cn(
                      "inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all hover:scale-[1.02] whitespace-nowrap",
                      isLimePack
                        ? "bg-black text-white hover:bg-black/90"
                        : card.darkLimeBorder
                          ? "text-black hover:opacity-90"
                          : isDark
                            ? "bg-white text-black hover:bg-white/90"
                            : "bg-black text-white hover:bg-black/90"
                    )}
                    style={card.darkLimeBorder ? { backgroundColor: LIME } : undefined}
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer — Back only */}
      <div className="mt-8 flex justify-between items-center pt-5 border-t border-white/5 shrink-0">
        <button
          onClick={() => setStep(4)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/10 bg-transparent text-white hover:bg-white/5"
        >
          Back
        </button>
      </div>

      <PricingPopup
        open={pricingOpen}
        onClose={() => setPricingOpen(false)}
        title="Unlock premium models"
        subtitle="Pick a credit pack to use Sonnet and Opus. Credits never expire."
      />
    </div>
  );
}
