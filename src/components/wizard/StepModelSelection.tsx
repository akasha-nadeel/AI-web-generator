"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizardStore";
import { useCreditsStore } from "@/stores/creditsStore";
import { MODEL_COSTS, type ModelKey, canUseModel } from "@/lib/constants";
import { detectIndustryFromPrompt } from "@/lib/ai/prompts/modules/classifier";
import { cn } from "@/lib/utils";
import { Sparkles, Lock, Zap, Gem, Crown, AlertTriangle, ArrowRight } from "lucide-react";
import { PricingPopup } from "@/components/billing/PricingPopup";

type ModelCard = {
  key: ModelKey;
  icon: typeof Zap;
  subtitle: string;
  tagline: string;
  color: string;
  badge?: string;
};

const MODEL_CARDS: ModelCard[] = [
  {
    key: "haiku",
    icon: Zap,
    subtitle: "Rapid Prototyping",
    tagline: "Anthropic's fastest model — quick drafts and clean simple layouts.",
    color: "#64748B",
    badge: "Fast",
  },
  {
    key: "sonnet",
    icon: Gem,
    subtitle: "Professional Choice",
    tagline: "Recommended — full design library and richer multi-section pages.",
    color: "#0284C7",
    badge: "Popular",
  },
  {
    key: "opus",
    icon: Crown,
    subtitle: "Masterpiece Engine",
    tagline: "Anthropic's flagship — maximum creative freedom and editorial polish.",
    color: "#7C3AED",
    badge: "Elite",
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

    // Industry source priority: explicit store value (URL pre-fill or
    // legacy chip) → auto-detect from description → "general" fallback.
    // Detection is rule-based regex, runs locally, costs nothing.
    const effectiveIndustry =
      industry || detectIndustryFromPrompt(description) || "general";

    // Build the prompt without an awkward double-space when industry is
    // the generic fallback ("Build a modern website for ...").
    const industryWord =
      effectiveIndustry && effectiveIndustry !== "general"
        ? `${effectiveIndustry} `
        : "";
    const prompt = `Build a ${overallFeel} ${industryWord}website for "${businessName}". ${description}`;

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
      industry: effectiveIndustry,
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
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-muted/50 border border-border/50 text-xs mt-1">
            <div className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-3 h-3 fill-orange-500 text-orange-500" />
            </div>
            <span className="text-muted-foreground ml-0.5">Balance:</span>
            <span className="text-foreground font-bold">{balance ?? "…"}</span>
            {plan === "free" && (
              <span className="ml-1 pl-2 border-l border-border/50 text-primary font-bold uppercase tracking-tighter text-[9px]">
                Free
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Model Cards */}
      <div className="space-y-4 pb-8">
        {MODEL_CARDS.map((card) => {
          const model = MODEL_COSTS[card.key];
          const isLocked = !canUseModel(plan, card.key);
          const canAffordCard = (balance ?? 0) >= model.credits;
          const Icon = card.icon;
          
          const isFlagship = card.key === "opus";

          return (
            <div
              key={card.key}
              className={cn(
                "group relative rounded-3xl p-5 transition-all duration-500 border-0 overflow-hidden",
                "text-white"
              )}
              style={{ 
                backgroundColor: card.color,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.15), 0 40px 50px -10px rgba(0, 0, 0, 0.25)"
              }}
            >
              {/* Subtle background glow for Flagship */}
              {isFlagship && (
                <div 
                  className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-colors opacity-30 bg-white"
                />
              )}

              {/* AI Watermark */}
              <Sparkles 
                className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-[0.08] -rotate-12 pointer-events-none" 
                strokeWidth={1}
              />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Icon Section */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                  style={{ 
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)" 
                  }}
                >
                  <Icon 
                    className="w-7 h-7 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" 
                    strokeWidth={1.5} 
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="text-3xl font-bold tracking-tight">
                      {model.name}
                    </h3>
                    {card.badge && (
                      <span 
                        className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-white/20 text-white"
                      >
                        {card.badge}
                      </span>
                    )}
                    {isLocked && (
                      <span className="px-2 py-0.5 rounded-md bg-black/20 text-white/80 text-[10px] font-bold flex items-center gap-1 border border-white/10">
                        <Lock className="w-2.5 h-2.5" />
                        PAID
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm font-medium text-white/90 mb-1">
                    {card.subtitle}
                  </p>
                  
                  <p className="text-[13px] text-white/70 leading-relaxed max-w-md">
                    {card.tagline}
                  </p>

                  <div className="mt-1 flex items-center gap-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[28px] font-black tracking-tighter">
                        {model.credits}
                      </span>
                      <span className="text-[11px] font-medium text-white/60 uppercase tracking-wider">
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
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-all border border-white/30 backdrop-blur-sm hover:scale-105 active:scale-95 cursor-pointer"
                      style={{ 
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)" 
                      }}
                    >
                      Upgrade Plan
                    </button>
                  ) : !canAffordCard ? (
                    <button
                      onClick={() => setPricingOpen(true)}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-black/10 text-white/50 font-bold text-sm cursor-not-allowed border border-white/10 flex items-center justify-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Add Credits
                    </button>
                  ) : (
                    <button
                      onClick={() => handleGenerate(card.key)}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 text-white border border-white/20 cursor-pointer hover:scale-105 active:scale-95"
                      style={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.25)",
                        backdropFilter: "blur(4px)",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)" 
                      }}
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

