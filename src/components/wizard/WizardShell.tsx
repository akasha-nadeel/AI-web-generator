"use client";

import { useWizardStore } from "@/stores/wizardStore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { number: 1, label: "Start" },
  { number: 2, label: "Inspiration" },
  { number: 3, label: "Style" },
  { number: 4, label: "Pages" },
  { number: 5, label: "Model" },
];

interface WizardShellProps {
  children: React.ReactNode;
}

export function WizardShell({ children }: WizardShellProps) {
  const { step } = useWizardStore();

  const leftPanelContent = {
    1: {
      title: (
        <>
          Build your dream site<br />
          with <span className="text-blue-400 font-extrabold">AI power</span>.
        </>
      ),
      subtitle: "Describe your business, pick your style, and let AI build your website in seconds.",
      image: "/images/wizard-hero-step1.jpg"
    },
    2: {
      title: (
        <>
          Guide the AI with<br />
          your <span className="text-blue-400 font-extrabold">inspiration</span>.
        </>
      ),
      subtitle: "Upload screenshots, logos, or brand assets to give our AI the perfect starting point.",
      image: "/images/wizard-hero.jpg"
    },
    3: {
      title: (
        <>
          Craft your unique<br />
          <span className="text-blue-400 font-extrabold">visual identity</span>.
        </>
      ),
      subtitle: "Select hand-picked color palettes, modern typography, and the overall feel of your brand.",
      image: "/images/wizard-hero-step3.jpg"
    },
    4: {
      title: (
        <>
          Structure your<br />
          <span className="text-blue-400 font-extrabold">digital home</span>.
        </>
      ),
      subtitle: "Choose the exact pages you need. Our AI will seamlessly interlink them for you.",
      image: "/images/wizard-hero-step4.jpg"
    },
    5: {
      title: (
        <>
          Pick the engine<br />
          that <span className="text-blue-400 font-extrabold">builds it</span>.
        </>
      ),
      subtitle: "Choose an AI model. Faster costs fewer credits, premium delivers richer designs.",
      image: "/images/wizard-hero-step5.jpg"
    }
  };

  const currentContent = leftPanelContent[step as keyof typeof leftPanelContent] || leftPanelContent[1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen bg-background flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left Panel */}
      <div className="lg:w-[42%] h-full relative overflow-hidden flex-col shrink-0 hidden lg:flex">
        {/* Background Image with Crossfade */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentContent.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentContent.image}
              alt="Weavo"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlays - We keep these somewhat dark to ensure white text remains readable on image */}
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

        {/* Brand */}
        <div className="absolute top-6 left-8 z-20 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Weavo Logo" className="w-8 h-8 object-contain opacity-90 scale-[1.7] origin-center" />
            <span className="text-xl font-bold text-white ml-1">Weavo</span>
          </Link>
        </div>

        {/* Dynamic Text Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute bottom-28 left-8 right-8 z-20"
          >
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
              {currentContent.title}
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              {currentContent.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col relative h-full overflow-y-auto w-full bg-background">
        <div className="w-full max-w-[700px] mx-auto px-6 py-5 md:py-7 flex-1 flex flex-col">
          
          {/* Step Indicators - Progress Bar Style */}
          <div className="grid grid-cols-5 gap-2 md:gap-4 mb-7 relative z-10 w-full max-w-[700px] mx-auto">
            {steps.map((s) => {
              const isActive = step === s.number;
              const isPast = step > s.number;
              return (
                <div key={s.number} className="flex flex-col gap-2">
                  <div className="h-1.5 w-full rounded-full bg-foreground/[0.06] overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700 ease-in-out",
                        isPast || isActive ? "bg-primary w-full" : "w-0"
                      )}
                    />
                  </div>
                  <span className={cn(
                    "text-xs md:text-sm font-medium text-center transition-colors duration-500",
                    isActive || isPast ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dynamic Step Content */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex flex-col min-h-0"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
