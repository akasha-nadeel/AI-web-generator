"use client";

import { useState, useEffect } from "react";
import { useWizardStore } from "@/stores/wizardStore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
  const { user, isLoaded: userLoaded } = useUser();
  const router = useRouter();

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
    <main className="relative h-screen w-full bg-background overflow-hidden font-sans">
      <div className="h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
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
          
          <div className="absolute inset-0 bg-black/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Logo */}
          <div className="absolute top-6 left-8 z-20">
             <Link href="/dashboard" className="block">
                <img 
                  src="/images/logo.png" 
                  alt="Weavo" 
                  className="h-5 w-auto object-contain brightness-0 invert" 
                />
             </Link>
          </div>

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
        <div className="flex-1 flex flex-col relative h-full overflow-y-auto w-full bg-background custom-scrollbar">
          <style jsx>{`
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 5px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.3);
              border-radius: 20px;
              transition: background 0.2s;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.45);
            }
          `}</style>
          <div className="w-full max-w-[700px] mx-auto px-6 py-5 md:py-7 flex-1 flex flex-col">
            
            {/* Step Indicators */}
            <div className="grid grid-cols-5 gap-2 md:gap-4 mb-7 relative z-10 w-full max-w-[700px] mx-auto pt-14 lg:pt-0">
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

            {/* Content Area */}
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
      </div>
    </main>
  );
}
