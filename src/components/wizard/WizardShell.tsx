"use client";

import { useWizardStore } from "@/stores/wizardStore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

const steps = [
  { number: 1, label: "Start" },
  { number: 2, label: "Inspiration" },
  { number: 3, label: "Style" },
  { number: 4, label: "Pages" },
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
      subtitle: "Describe your business, pick your style, and let AI build your website in seconds."
    },
    2: {
      title: (
        <>
          Guide the AI with<br />
          your <span className="text-blue-400 font-extrabold">inspiration</span>.
        </>
      ),
      subtitle: "Upload screenshots, logos, or brand assets to give our AI the perfect starting point."
    },
    3: {
      title: (
        <>
          Craft your unique<br />
          <span className="text-blue-400 font-extrabold">visual identity</span>.
        </>
      ),
      subtitle: "Select hand-picked color palettes, modern typography, and the overall feel of your brand."
    },
    4: {
      title: (
        <>
          Structure your<br />
          <span className="text-blue-400 font-extrabold">digital home</span>.
        </>
      ),
      subtitle: "Choose the exact pages you need. Our AI will seamlessly interlink them for you."
    }
  };

  const currentContent = leftPanelContent[step as keyof typeof leftPanelContent] || leftPanelContent[1];

  return (
    <div className="h-screen bg-[#0a0a0a] flex flex-col lg:flex-row overflow-hidden">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[42%] h-full relative overflow-hidden flex-col shrink-0">
        {/* Background Image */}
        <Image
          src="/images/wizard-hero.jpg"
          alt="Weavo"
          fill
          className="object-cover"
          priority
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-[#0a0a0a]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />

        {/* Brand & BETA Badge */}
        <div className="absolute top-6 left-8 z-20 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Weavo Logo" className="w-8 h-8 object-contain opacity-90 scale-[1.7] origin-center" />
          </Link>
          <div className="px-2 py-0.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-wider text-white/70">
            BETA
          </div>
        </div>

        {/* Dynamic Text Content */}
        <div className="absolute bottom-28 left-8 right-8 z-20 transition-all duration-500">
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            {currentContent.title}
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Chat Bubble Widget (Mock) */}
        <div className="absolute bottom-6 left-8 z-20">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5 text-black fill-black" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col relative h-full overflow-y-auto w-full">
        <div className="max-w-[700px] w-full mx-auto px-6 py-10 md:py-14 flex-1 flex flex-col">
          
          {/* Step Indicators - Progress Bar Style */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-16">
            {steps.map((s, i) => {
              const isActive = step === s.number;
              const isPast = step > s.number;
              return (
                <div key={s.number} className="flex flex-col gap-2">
                  <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500 ease-in-out",
                        isPast || isActive ? "bg-white w-full" : "w-0"
                      )} 
                    />
                  </div>
                  <span className={cn(
                    "text-xs md:text-sm font-medium text-center transition-colors",
                    isActive || isPast ? "text-white" : "text-white/40"
                  )}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dynamic Step Content */}
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
