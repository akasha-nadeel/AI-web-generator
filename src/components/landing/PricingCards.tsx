"use client";

import { Check, Zap, Sparkles, Gem, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { MODEL_COSTS, type ModelKey } from "@/lib/constants";
import {
  fadeDown,
  flipUp,
  staggerContainerSlow,
  ease,
  viewport as vp,
} from "@/lib/animations";

type CardData = {
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

const cards: CardData[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Ideal for getting started",
    price: "Free",
    priceSuffix: "",
    ctaLabel: "Start free",
    popular: false,
    features: [
      "30 AI credits (one-time)",
      "Haiku model only (fast drafts)",
      "Unlock Sonnet & Opus with any pack",
      "Export as ZIP",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    badge: "Early Bird",
    tagline: "For casual builders",
    price: "$7",
    priceSuffix: "one-time",
    ctaLabel: "Buy Starter",
    popular: false,
    features: [
      "100 AI credits",
      "Credits never expire",
      "All three models available",
      "Unlimited code exports",
      "Unsplash integration",
    ],
  },
  {
    id: "popular",
    name: "Popular",
    badge: "Save 29%",
    tagline: "For creators who build often",
    price: "$15",
    priceSuffix: "one-time",
    ctaLabel: "Buy Popular",
    popular: true,
    features: [
      "300 AI credits",
      "Credits never expire",
      "All three models available",
      "Unlimited code exports",
      "Unsplash integration",
      "Priority generation",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    badge: "Save 46%",
    tagline: "For heavy builders",
    price: "$30",
    priceSuffix: "one-time",
    ctaLabel: "Buy Studio",
    popular: false,
    features: [
      "800 AI credits",
      "Credits never expire",
      "All three models available",
      "Unlimited code exports",
      "Unsplash integration",
      "Priority generation",
      "Early access to new features",
    ],
  },
];

export function PricingCards() {
  return (
    <SectionWrapper id="pricing" variants={fadeDown}>
      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
          Transparent pricing<br className="hidden sm:block" /> for everyone
        </h2>
        <p className="text-[15px] md:text-base text-muted-foreground mt-5 max-w-xl mx-auto leading-relaxed">
          A fraction of the cost of hiring a designer. Pay only for credits —
          no subscriptions, no surprises.
        </p>
        {/* Honest cost-breakdown strip — builds trust */}
        <div className="mt-6 inline-flex items-start gap-2.5 px-4 py-2.5 rounded-full bg-muted/20 border border-border max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C8E600] shrink-0 mt-[1px]">
            Why credits
          </span>
          <span className="text-[12.5px] text-muted-foreground leading-snug text-left">
            Each site costs us <span className="text-foreground/80 font-semibold">$0.07–$1.05</span> in AI compute. Packs cover that plus hosting and payment fees — no hidden markup.
          </span>
        </div>
      </div>

      {/* 4 cards */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={staggerContainerSlow}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            variants={flipUp}
            transition={ease.smooth}
            className={`relative flex flex-col rounded-2xl p-6 md:p-7 glass-card transition-all ${
              card.popular
                ? "border-2 border-[#C8E600] bg-[#C8E600]/[0.04] shadow-lg shadow-[#C8E600]/15"
                : "border-border hover:border-foreground/20 hover:bg-muted/10"
            }`}
          >
            {/* Name + badge */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-lg font-bold text-foreground">{card.name}</h3>
              {card.badge && (
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                    card.popular
                      ? "bg-[#C8E600]/20 text-[#C8E600] border border-[#C8E600]/50"
                      : "bg-[#C8E600]/10 text-[#C8E600] border border-[#C8E600]/30"
                  }`}
                >
                  {card.badge}
                </span>
              )}
            </div>
            <p className="text-[13px] text-muted-foreground mb-7 min-h-[20px]">
              {card.tagline}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-1.5 mb-6">
              <span className="text-4xl md:text-[2.75rem] font-bold leading-none text-foreground tracking-tight">
                {card.price}
              </span>
              {card.priceSuffix && (
                <span className="text-sm text-muted-foreground/60 leading-tight">
                  /{card.priceSuffix}
                </span>
              )}
            </div>

            {/* CTA */}
            <a
              href="/sign-up"
              className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm mb-6 transition-all ${
                card.popular
                  ? "bg-[#C8E600] text-black hover:bg-[#d4ef1a] shadow-sm"
                  : "bg-foreground/10 text-foreground/90 hover:bg-foreground/15 border border-border"
              }`}
            >
              {card.ctaLabel}
            </a>

            {/* Features */}
            <ul className="space-y-3 text-[13.5px]">
              {card.features.map((f) => {
                const numberMatch = f.match(/^(\d+)(.*)/);
                return (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 text-[#C8E600] shrink-0 mt-[2px]"
                      strokeWidth={3}
                    />
                    <span className="text-muted-foreground leading-snug">
                      {numberMatch ? (
                        <>
                          <span className="text-[20px] font-bold text-foreground mr-1 inline-block align-middle -mt-1">
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
          </motion.div>
        ))}
      </motion.div>

      {/* Model cost breakdown */}
      <ModelCostTable />
    </SectionWrapper>
  );
}

/* ───────────────────────────────────────────────────────────────
 * Model cost breakdown — matches the light "pricing island".
 * Shows per-generation credit cost for each model so users understand
 * how credits convert into output.
 * ─────────────────────────────────────────────────────────────── */

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

function ModelCostTable() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={fadeDown}
      className="max-w-6xl mx-auto mt-20 md:mt-24"
    >
      <div className="mb-8 md:mb-10 text-center">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Choose your model per generation
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
          All three available to every user. Lower credits for fast drafts,
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
              className={`rounded-2xl p-6 md:p-7 glass-card transition-all ${
                isPremium
                  ? "border-2 border-[#C8E600] bg-[#C8E600]/[0.04] shadow-lg shadow-[#C8E600]/15"
                  : "border-border hover:border-foreground/15 hover:bg-muted/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isPremium
                      ? "bg-[#C8E600]/20 text-[#C8E600]"
                      : "bg-muted text-foreground/80"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
                  {model.label}
                </span>
              </div>

              <div className="text-lg font-bold text-foreground leading-tight">
                {model.name}
              </div>
              <div className="text-[13px] text-muted-foreground mt-1 leading-relaxed">
                {blurb}
              </div>

              <div className="mt-6 pt-5 border-t border-border flex items-baseline gap-1.5">
                <span
                  className={`text-3xl font-bold leading-none tracking-tight ${
                    isPremium ? "text-[#C8E600]" : "text-foreground"
                  }`}
                >
                  {model.credits}
                </span>
                <span className="text-sm text-muted-foreground/60">
                  credits / generation
                </span>
              </div>

              <div
                className={`mt-3 flex items-center gap-1.5 text-[11px] font-semibold ${
                  model.requiresPayment
                    ? "text-muted-foreground/50"
                    : "text-[#C8E600]"
                }`}
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

      {/* Math example strip */}
      <div className="mt-5 rounded-2xl bg-muted/5 border border-border glass p-5 md:p-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3">
          What 300 credits looks like
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13.5px]">
          <div className="text-muted-foreground">
            <span className="text-foreground font-bold">60</span> Haiku generations
          </div>
          <div className="text-muted-foreground">
            <span className="text-foreground font-bold">20</span> Sonnet generations
          </div>
          <div className="text-muted-foreground">
            <span className="text-[#C8E600] font-bold">7</span> Opus generations
          </div>
        </div>
      </div>

    </motion.div>
  );
}
