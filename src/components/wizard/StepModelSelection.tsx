"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useWizardStore } from "@/stores/wizardStore";
import { useCreditsStore } from "@/stores/creditsStore";
import { MODEL_COSTS, type ModelKey, canUseModel } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Sparkles, Lock, Zap, Gem, Crown, Check, AlertTriangle } from "lucide-react";

const MODEL_CARDS: Array<{
  key: ModelKey;
  icon: typeof Zap;
  tagline: string;
  quality: string;
  bestFor: string;
  accent: string;
}> = [
  {
    key: "haiku",
    icon: Zap,
    tagline: "Fast & free to try",
    quality: "Good",
    bestFor: "Drafts, simple layouts, first try before you commit",
    accent: "from-emerald-500/10 border-emerald-500/20 text-emerald-300",
  },
  {
    key: "sonnet",
    icon: Gem,
    tagline: "Recommended",
    quality: "Great",
    bestFor: "Real production sites — full design library, richer sections",
    accent: "from-blue-500/10 border-blue-500/20 text-blue-300",
  },
  {
    key: "opus",
    icon: Crown,
    tagline: "Premium quality",
    quality: "Best",
    bestFor: "Flagship sites, complex layouts, maximum creative freedom",
    accent: "from-purple-500/10 border-purple-500/20 text-purple-300",
  },
];

export function StepModelSelection() {
  const router = useRouter();
  const {
    modelKey,
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

  useEffect(() => {
    if (balance === null) refresh();
  }, [balance, refresh]);

  const selectedModel = MODEL_COSTS[modelKey];
  const canAfford = balance === null ? true : balance >= selectedModel.credits;
  const planAllowsModel = canUseModel(plan, modelKey);
  const canGenerate = canAfford && planAllowsModel;
  const creditsShort = Math.max(0, selectedModel.credits - (balance ?? 0));

  const handleGenerate = () => {
    if (!canGenerate) return;

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
      model: modelKey,
    });

    router.push(`/generate/new?${params.toString()}`);
  };

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Choose your AI model</h2>
      <p className="text-white/60 text-base mb-8 leading-relaxed max-w-lg">
        Pick the engine that builds your site. Faster models cost fewer credits — premium models deliver richer designs.
      </p>

      {/* Balance badge */}
      <div className="mb-6 inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/70">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        Your balance: <span className="text-white font-medium">{balance ?? "…"}</span> credits
        {plan === "free" && (
          <span className="ml-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] uppercase tracking-wide text-white/50">Free plan</span>
        )}
      </div>

      <div className="flex-1 space-y-3">
        {MODEL_CARDS.map((card) => {
          const model = MODEL_COSTS[card.key];
          const isLocked = !canUseModel(plan, card.key);
          const isSelected = modelKey === card.key;
          const Icon = card.icon;

          return (
            <button
              key={card.key}
              onClick={() => !isLocked && setModelKey(card.key)}
              disabled={isLocked}
              className={cn(
                "w-full text-left rounded-2xl border p-5 transition-all flex items-start gap-4 relative overflow-hidden",
                isSelected
                  ? "border-white/30 bg-white/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
                isLocked && "opacity-60 cursor-not-allowed"
              )}
            >
              {/* Accent gradient */}
              <div
                className={cn(
                  "shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br border",
                  card.accent
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-base font-semibold text-white">{model.name}</span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50">
                    {card.tagline}
                  </span>
                  {isLocked && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      <Lock className="w-2.5 h-2.5" /> Paid only
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/50 mb-2">
                  <span className="text-white/70">Quality:</span> {card.quality} &middot;{" "}
                  <span className="text-white/70">Best for:</span> {card.bestFor}
                </p>
              </div>

              <div className="shrink-0 text-right flex flex-col items-end gap-1">
                <div className="text-xl font-bold text-white tabular-nums">{model.credits}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">credits / site</div>
                {isSelected && !isLocked && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-emerald-300">
                    <Check className="w-3 h-3" /> Selected
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Affordability / gating notices */}
      {!planAllowsModel && (
        <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4 text-sm text-amber-200/90 flex items-start gap-3">
          <Lock className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-medium text-amber-200">This model needs a credit pack</div>
            <div className="text-amber-200/70 text-xs mt-0.5">
              Free accounts can generate with Haiku. Buy a credit pack to unlock Sonnet and Opus.
            </div>
          </div>
          <Link
            href="/billing"
            className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-medium transition-colors"
          >
            View packs
          </Link>
        </div>
      )}

      {planAllowsModel && !canAfford && (
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4 text-sm text-red-200/90 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-medium text-red-200">
              Need {creditsShort} more credit{creditsShort !== 1 ? "s" : ""}
            </div>
            <div className="text-red-200/70 text-xs mt-0.5">
              This model costs {selectedModel.credits} credits and you have {balance ?? 0}. Pick Haiku or top up.
            </div>
          </div>
          <Link
            href="/billing"
            className="shrink-0 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-medium transition-colors"
          >
            Get credits
          </Link>
        </div>
      )}

      {/* Footer buttons */}
      <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/5 shrink-0">
        <button
          onClick={() => setStep(4)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/10 bg-transparent text-white hover:bg-white/5"
        >
          Back
        </button>
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={cn(
            "px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
            canGenerate
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/10 text-white/40 cursor-not-allowed"
          )}
        >
          <Sparkles className="w-4 h-4" />
          Generate with {selectedModel.name.replace("Claude ", "")}
        </button>
      </div>
    </div>
  );
}
