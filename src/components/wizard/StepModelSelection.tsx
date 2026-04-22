"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizardStore";
import { useCreditsStore } from "@/stores/creditsStore";
import { MODEL_COSTS, type ModelKey, canUseModel } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Sparkles, Lock, Zap, Gem, Crown, AlertTriangle, ArrowRight } from "lucide-react";
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
      } catch { /* storage full */ }
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
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Pick your AI engine
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/50 border border-border/50 text-xs mt-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-muted-foreground">Balance:</span>
            <span className="text-foreground font-bold">{balance ?? "…"}</span>
            {plan === "free" && (
              <span className="ml-1 pl-2 border-l border-border/50 text-primary font-bold uppercase tracking-tighter text-[9px]">
                Free
              </span>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
          Choose the intelligence level for your site. More advanced models deliver richer designs and smarter layouts.
        </p>
      </div>

      {/* Model Cards */}
      <div className="space-y-4">
        {MODEL_CARDS.map((card) => {
          const model = MODEL_COSTS[card.key];
          const isLocked = !canUseModel(plan, card.key);
          const canAffordCard = (balance ?? 0) >= model.credits;
          const Icon = card.icon;
          
          const isPremium = card.key === "sonnet";
          const isFlagship = card.key === "opus";

          return (
            <div
              key={card.key}
              className={cn(
                "group relative rounded-3xl p-5 transition-all duration-500 border overflow-hidden",
                "bg-card hover:bg-card/80",
                isFlagship 
                  ? "border-primary/20 shadow-[0_0_40px_-15px_rgba(212,255,0,0.15)] ring-1 ring-primary/5" 
                  : "border-border hover:border-border/80",
                "hover:-translate-y-1 hover:shadow-xl"
              )}
            >
              {/* Subtle background glow for Flagship */}
              {isFlagship && (
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors" />
              )}

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Icon Section */}
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110",
                  isFlagship ? "bg-primary text-black" : 
                  isPremium ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" : 
                  "bg-muted text-muted-foreground border border-border"
                )}>
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {model.name}
                    </h3>
                    {isFlagship && (
                      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                        Elite
                      </span>
                    )}
                    {isLocked && (
                      <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground/60 text-[10px] font-bold flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        PAID
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[13px] text-muted-foreground leading-relaxed max-w-md">
                    {card.tagline}
                  </p>

                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black tracking-tighter text-foreground">
                        {model.credits}
                      </span>
                      <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                        Credits
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Section */}
                <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                  {isLocked ? (
                    <button
                      onClick={() => setPricingOpen(true)}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-muted hover:bg-muted/80 text-foreground font-bold text-sm transition-all border border-border/50"
                    >
                      Upgrade Plan
                    </button>
                  ) : !canAffordCard ? (
                    <button
                      onClick={() => setPricingOpen(true)}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-muted text-muted-foreground/50 font-bold text-sm cursor-not-allowed border border-border/20 flex items-center justify-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Add Credits
                    </button>
                  ) : (
                    <button
                      onClick={() => handleGenerate(card.key)}
                      className={cn(
                        "w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95",
                        isFlagship 
                          ? "bg-primary text-black hover:opacity-90" 
                          : "bg-foreground text-background hover:bg-foreground/90"
                      )}
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 flex items-center justify-center pt-6 border-t border-border/50">
        <button
          onClick={() => setStep(4)}
          className="text-muted-foreground hover:text-foreground font-medium text-sm transition-colors flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to page selection
        </button>
      </div>

      <PricingPopup
        open={pricingOpen}
        onClose={() => setPricingOpen(false)}
        title="Elevate your site"
        subtitle="Upgrade to a premium model for industry-leading designs and creative polish."
      />
    </div>
  );
}

