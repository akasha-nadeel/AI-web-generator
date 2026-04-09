"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { PLANS } from "@/lib/constants";
import { fadeDown, flipUp, staggerContainerSlow, ease, viewport as vp } from "@/lib/animations";

const tiers = [
  {
    plan: PLANS.free,
    key: "free",
    popular: false,
    description: "Perfect for trying out Weavo.",
    featurePrefix: "Includes:",
  },
  {
    plan: PLANS.pro,
    key: "pro",
    popular: true,
    description: "For creators who need more power.",
    featurePrefix: "Everything in Free plus....",
  },
  {
    plan: PLANS.business,
    key: "business",
    popular: false,
    description: "Advanced features + unlimited sites.",
    featurePrefix: "Everything in Pro plus....",
  },
];

export function PricingCards() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <SectionWrapper id="pricing" variants={fadeDown}>
      {/* Left-aligned heading — matching reference layout */}
      <div className="mb-10 md:mb-14 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-light leading-[1.15] tracking-tight max-w-3xl mx-auto">
          We&rsquo;ve got a plan<br />that&rsquo;s perfect for you
        </h2>
      </div>

      {/* Billing toggle — centered above Pro card */}
      <div className="mb-10 md:mb-14 flex justify-center">
        <div className="inline-flex rounded-xl p-1 bg-white/[0.04] border border-white/[0.08]">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-[10px] text-sm font-medium transition-all duration-200 cursor-pointer ${
              billing === "monthly"
                ? "bg-white text-black shadow-sm"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            Monthly billing
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`px-5 py-2 rounded-[10px] text-sm font-medium transition-all duration-200 cursor-pointer ${
              billing === "annual"
                ? "bg-white text-black shadow-sm"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            Annual billing
          </button>
        </div>
      </div>

      {/* Pricing cards grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={staggerContainerSlow}
      >
        {tiers.map(({ plan, key, popular, description, featurePrefix }) => {
          const monthlyPrice = plan.price;
          const annualPrice = Math.round(plan.price * 0.8);
          const price = billing === "annual" ? annualPrice : monthlyPrice;

          return (
            <motion.div
              key={key}
              variants={flipUp}
              transition={ease.smooth}
              className={`group relative flex flex-col rounded-[18px] transition-all duration-300 ${
                popular
                  ? "bg-[#C8E600] md:scale-[1.02] shadow-xl shadow-[#C8E600]/8"
                  : "border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-white/[0.14] hover:bg-white/[0.05]"
              }`}
            >
              {/* ---- Top section: Plan info + CTA ---- */}
              <div className="p-5 lg:p-6">
                {/* Plan name + badge */}
                <div className="flex items-center gap-2.5 mb-4">
                  <h3
                    className={`text-base font-semibold ${
                      popular ? "text-black" : "text-white"
                    }`}
                  >
                    {plan.name} plan
                  </h3>
                  {popular && (
                    <span className="bg-black text-white text-[10px] font-semibold px-2.5 py-[2px] rounded-full tracking-wide">
                      Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span
                    className={`text-4xl md:text-[2.5rem] font-bold leading-none tracking-tight ${
                      popular ? "text-black" : ""
                    }`}
                  >
                    {price === 0 ? "Free" : `$${price}`}
                  </span>
                  {price > 0 && (
                    <div
                      className={`text-sm leading-tight ${
                        popular ? "text-black/60" : "text-muted-foreground"
                      }`}
                    >
                      <div>per month</div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p
                  className={`text-[13px] mb-5 leading-relaxed ${
                    popular ? "text-black/60" : "text-muted-foreground"
                  }`}
                >
                  {description}
                </p>

                {/* CTA Button */}
                <a
                  href="/sign-up"
                  className={`flex items-center justify-center w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    popular
                      ? "bg-black text-white hover:bg-black/85"
                      : "bg-white/[0.08] text-white border border-white/[0.1] hover:bg-white/[0.14]"
                  }`}
                >
                  Get started
                </a>
              </div>

              {/* Divider */}
              <div
                className={`mx-5 lg:mx-6 border-t ${
                  popular ? "border-black/10" : "border-white/[0.08]"
                }`}
              />

              {/* ---- Bottom section: Features ---- */}
              <div className="p-5 lg:p-6 flex-1">
                <p
                  className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 ${
                    popular ? "text-black" : "text-white/90"
                  }`}
                >
                  Features
                </p>
                <p
                  className={`text-[12px] mb-4 ${
                    popular ? "text-black/60" : "text-muted-foreground"
                  }`}
                >
                  {featurePrefix}
                </p>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-[13px]"
                    >
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                          popular
                            ? "bg-black/10"
                            : "bg-emerald-500/15"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            popular ? "text-black" : "text-emerald-400"
                          }`}
                          strokeWidth={2.5}
                        />
                      </span>
                      <span
                        className={
                          popular ? "text-black/80" : "text-muted-foreground"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
