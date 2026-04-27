"use client";

import { Check, Zap, Sparkles, Gem, Lock, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { MODEL_COSTS, type ModelKey } from "@/lib/constants";
import { cn } from "@/lib/utils";
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
  color: string;
};

const PACK_COLORS: Record<string, string> = {
  free: "#64748B", // Slate
  starter: "#0284C7", // Sky
  popular: "#4F46E5", // Indigo
  studio: "#1E1B4B", // Navy
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
    color: PACK_COLORS.free,
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
      "Lifetime Pro access included",
      "100 AI credits",
      "Credits never expire",
      "All three models available",
      "Unlimited code exports",
      "Unsplash integration",
    ],
    color: PACK_COLORS.starter,
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
      "Lifetime Pro access included",
      "300 AI credits",
      "Credits never expire",
      "All three models available",
      "Unlimited code exports",
      "Unsplash integration",
      "Priority generation",
    ],
    color: PACK_COLORS.popular,
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
      "Lifetime Pro access included",
      "800 AI credits",
      "Credits never expire",
      "All three models available",
      "Unlimited code exports",
      "Unsplash integration",
      "Priority generation",
      "Early access to new features",
    ],
    color: PACK_COLORS.studio,
  },
];

export function PricingCards() {
  return (
    <SectionWrapper id="pricing" variants={fadeDown}>
      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
        <h2 className="text-[clamp(45px,6vw,82px)] font-medium leading-[1.05] tracking-tight text-foreground">
          Transparent pricing<br className="hidden sm:block" /> for everyone
        </h2>
        <p className="text-[15px] md:text-base text-muted-foreground mt-5 max-w-xl mx-auto leading-relaxed">
          A fraction of the cost of hiring a designer. Pay only for credits —
          no subscriptions, no surprises.
        </p>
        
        {/* Cost breakdown pill */}
        <div className="mt-8 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-foreground/[0.03] border border-border">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-600 shrink-0">
            Why credits
          </span>
          <div className="w-px h-3 bg-border mx-1" />
          <span className="text-[12.5px] text-muted-foreground leading-none">
            Sites cost us <span className="text-foreground/85 font-semibold">$0.07–$1.05</span> in AI compute.
          </span>
        </div>
      </div>

      {/* 4 cards */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
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
            className={cn(
              "relative flex flex-col rounded-[2.5rem] p-7 md:p-8 transition-all border-0 overflow-hidden",
              "text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300"
            )}
            style={{ 
              backgroundColor: card.color,
              boxShadow: `0 20px 40px -15px ${card.color}66`
            }}
          >
            {/* Name + badge */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-xl font-bold">{card.name}</h3>
              {card.badge && (
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-white/20 text-white backdrop-blur-sm">
                  {card.badge}
                </span>
              )}
            </div>
            <p className="text-[13px] text-white/70 mb-8 min-h-[20px]">
              {card.tagline}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-1.5 mb-8">
              <span className="text-4xl md:text-[3rem] font-black leading-none tracking-tighter">
                {card.price}
              </span>
              {card.priceSuffix && (
                <span className="text-sm text-white/60 font-medium">
                  /{card.priceSuffix}
                </span>
              )}
            </div>

            {/* CTA */}
            <a
              href="/sign-up"
              className="flex items-center justify-center w-full py-4 rounded-2xl bg-white text-black font-bold text-sm mb-8 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{ color: card.color }}
            >
              {card.ctaLabel}
            </a>

            {/* Features */}
            <ul className="space-y-4 text-[13.5px]">
              {card.features.map((f) => {
                const numberMatch = f.match(/^(\d+)(.*)/);
                return (
                  <li key={f} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
                    </div>
                    <span className="text-white/80 leading-snug font-medium">
                      {numberMatch ? (
                        <>
                          <span className="text-[20px] font-black text-white mr-1 inline-block align-middle -mt-1 tracking-tighter">
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

            {/* Decorative Icon */}
            <Sparkles 
              className="absolute -right-12 -bottom-12 w-48 h-48 text-white opacity-[0.07] -rotate-12 pointer-events-none" 
              strokeWidth={1}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Model cost breakdown */}
      <ModelCostTable />
    </SectionWrapper>
  );
}

const modelRows: Array<{
  key: ModelKey;
  icon: typeof Zap;
  blurb: string;
  color: string;
  badge: string;
  subtitle: string;
}> = [
  {
    key: "haiku",
    icon: Zap,
    subtitle: "Rapid Prototyping",
    blurb: "Anthropic's fastest model — quick drafts and clean simple layouts.",
    color: "#64748B",
    badge: "Fast",
  },
  {
    key: "sonnet",
    icon: Gem,
    subtitle: "Professional Choice",
    blurb: "Recommended — full design library and richer multi-section pages.",
    color: "#0284C7",
    badge: "Popular",
  },
  {
    key: "opus",
    icon: Crown,
    subtitle: "Masterpiece Engine",
    blurb: "Anthropic's flagship — maximum creative freedom and editorial polish.",
    color: "#7C3AED",
    badge: "Elite",
  },
];

function ModelCostTable() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={fadeDown}
      className="max-w-6xl mx-auto mt-24 md:mt-32"
    >
      <div className="mb-12 md:mb-16 text-center">
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
          Choose your model per generation
        </h3>
        <p className="text-[15px] text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
          All three available to every user. Lower credits for fast drafts,
          higher for premium quality.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 md:gap-6">
        {modelRows.map(({ key, icon: Icon, blurb, color, badge, subtitle }) => {
          const model = MODEL_COSTS[key];
          return (
            <div
              key={key}
              className="group relative rounded-[2rem] p-7 md:p-8 transition-all border-0 overflow-hidden text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300"
              style={{ 
                backgroundColor: color,
                boxShadow: `0 20px 40px -15px ${color}66`
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-white/20 text-white backdrop-blur-sm">
                  {badge}
                </span>
              </div>

              <h4 className="text-2xl font-black tracking-tight">{model.name}</h4>
              <p className="text-sm font-bold text-white/90 mt-1">{subtitle}</p>
              <p className="text-[13px] text-white/70 mt-2 leading-relaxed">
                {blurb}
              </p>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-baseline gap-2">
                <span className="text-4xl font-black leading-none tracking-tighter">
                  {model.credits}
                </span>
                <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">
                  credits / generation
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {!model.requiresPayment ? (
                  <div className="px-3 py-1.5 rounded-xl bg-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
                    <Check className="w-3 h-3" strokeWidth={4} />
                    AVAILABLE ON FREE TIER
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded-xl bg-black/10 text-white/50 text-[11px] font-bold flex items-center gap-1.5 border border-white/5">
                    <Lock className="w-3 h-3" />
                    PACK REQUIRED
                  </div>
                )}
              </div>

              {/* Decorative Background Icon */}
              <Sparkles 
                className="absolute -right-10 -bottom-10 w-40 h-40 text-white opacity-[0.06] -rotate-12 pointer-events-none" 
                strokeWidth={1}
              />
            </div>
          );
        })}
      </div>

      {/* Math example strip */}
      <div className="mt-8 rounded-[2rem] bg-[#F0F7FF] border border-blue-100 p-8 md:p-10 relative overflow-hidden">
        {/* Subtle decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="relative z-10">
          <div className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600/70 mb-8 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-blue-200" />
            What 300 credits looks like
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col group">
              <span className="text-4xl font-black tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors duration-300">60</span>
              <span className="text-[13px] font-bold text-slate-500 uppercase tracking-tight mt-1">Haiku generations</span>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">Fast drafts & rapid ideas</p>
            </div>
            <div className="flex flex-col group">
              <span className="text-4xl font-black tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors duration-300">20</span>
              <span className="text-[13px] font-bold text-slate-500 uppercase tracking-tight mt-1">Sonnet generations</span>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">Refined, professional builds</p>
            </div>
            <div className="flex flex-col group">
              <span className="text-4xl font-black tracking-tighter text-indigo-600">7</span>
              <span className="text-[13px] font-bold text-slate-500 uppercase tracking-tight mt-1">Opus generations</span>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">Ultimate creative masterpieces</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
