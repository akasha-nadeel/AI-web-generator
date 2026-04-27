"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeLeft, fadeUp, staggerContainer, ease, viewport as vp } from "@/lib/animations";

const steps = [
  {
    number: ".01",
    label: "Describe",
    title: "Describe Your Business",
    subtitle: "Tell us about your business, choose your industry, and upload any design inspiration.",
    image: null,
    bgImage: "/images/describe-vault.png",
  },
  {
    number: ".02",
    label: "AI Generation",
    title: "AI Generates Your Site",
    subtitle: "In seconds, Weavo builds a complete, professional website tailored to your business.",
    image: null,
    bgImage: "/images/ai-robot.png",
  },
  {
    number: ".03",
    label: "Refine & Ship",
    title: "Customize & Export",
    subtitle: "Refine with our visual editor or AI chat. Then export clean code ready to deploy.",
    image: null,
    bgImage: "/images/export-container.png",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="how-it-works"
      className="py-14 md:py-20 lg:py-28 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeLeft}
          transition={ease.smooth}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
            <span className="text-sm text-muted-foreground">How we work</span>
          </div>
          <h2 className="text-[clamp(45px,6vw,82px)] font-medium leading-[1.05] tracking-tight mb-4 text-foreground">
            Three Steps to Your<br /> Dream Website
          </h2>
          <p className="text-sm text-muted-foreground/70 max-w-md leading-relaxed">
            No coding, no design skills needed. Just describe what you want and
            let AI handle the rest.
          </p>
        </motion.div>

        {/* Expandable cards */}
        <motion.div
          className="hidden md:flex gap-3 h-[420px]"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={staggerContainer}
        >
          {steps.map((step, i) => {
            const isActive = active === i;

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={ease.smooth}
                onMouseEnter={() => setActive(i)}
                style={{
                  flex: isActive ? 2.5 : 1,
                  transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                className={`relative rounded-[20px] overflow-hidden cursor-pointer transition-colors ${
                  isActive
                    ? "bg-muted/30"
                    : "bg-muted/10 border border-border hover:bg-muted/20"
                }`}
              >
                {/* Full background image for cards that have bgImage */}
                {step.bgImage && (
                  <>
                    <Image
                      src={step.bgImage}
                      alt=""
                      fill
                      className="object-cover opacity-[0.15] dark:opacity-60 grayscale dark:grayscale-0 hover:grayscale-0 transition-all duration-700"
                    />
                    {/* Gradient overlay — Dark mode only for focus, hidden in light mode for cleanliness */}
                    <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                  </>
                )}

                <div className="relative z-10 h-full flex flex-col p-7">
                  {/* Label */}
                  <span className={`text-[11px] font-medium tracking-wide uppercase mb-3 text-foreground`}>
                    {step.label}
                  </span>

                  {/* Title */}
                  <h3 className={`text-lg lg:text-xl font-semibold leading-snug max-w-[220px] text-foreground`}>
                    {step.title}
                  </h3>

                  {/* Thumbnail image — revealed on active (only for cards without bgImage) */}
                  {step.image && (
                    <div
                      className="mt-auto transition-all duration-500 ease-in-out overflow-hidden"
                      style={{
                        opacity: isActive ? 1 : 0,
                        maxHeight: isActive ? "220px" : "0",
                        transform: isActive
                          ? "translateY(0)"
                          : "translateY(20px)",
                      }}
                    >
                      <div className="w-36 h-48 rounded-xl overflow-hidden mt-4 relative">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Subtitle — revealed on hover */}
                  <p
                    className={`absolute bottom-16 right-7 left-7 text-[13px] leading-relaxed text-right max-w-[220px] ml-auto transition-all duration-500 ease-in-out text-muted-foreground`}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                    }}
                  >
                    {step.subtitle}
                  </p>

                  {/* Step number */}
                  <span className="absolute bottom-5 right-7 text-8xl font-bold text-foreground/[0.04] leading-none select-none pointer-events-none">
                    {step.number}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile: stacked cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative rounded-[20px] overflow-hidden bg-muted/20 border border-border p-6"
            >
              <span className={`text-[11px] font-medium tracking-wide uppercase mb-2 block text-foreground`}>
                {step.label}
              </span>
              <h3 className={`text-lg font-semibold leading-snug mb-4 text-foreground`}>
                {step.title}
              </h3>
              {step.image && (
                <div className="w-28 h-36 rounded-xl overflow-hidden relative">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="absolute bottom-4 right-6 text-7xl font-bold text-foreground/[0.04] leading-none select-none pointer-events-none">
                {step.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
