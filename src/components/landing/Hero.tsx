"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Sparkles, Send, Users, Box, Wallet, Settings, MapPin } from "lucide-react";
import Link from "next/link";

/* Dot line — vertical line of evenly spaced dots */
function DotLine({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-[10px] h-full ${className ?? ""}`}>
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} className="w-[4px] h-[4px] rounded-full bg-white/[0.15] shrink-0" />
      ))}
    </div>
  );
}

/* Cards for the bento columns */
const leftCards = [
  /* Stats card */
  <div key="stats" className="rounded-2xl h-[clamp(10rem,15vw,14rem)] shrink-0 relative overflow-hidden">
    <Image src="/images/growth-card.jpg" alt="Growth" fill className="object-cover object-center" />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-10">
      <p className="text-white text-sm font-medium">+42% Growth</p>
      <p className="text-white/50 text-xs mt-1">This month</p>
    </div>
  </div>,

  /* Menu/Nav card */
  <div key="menu" className="bg-[#f5f0e8] rounded-2xl p-5 shrink-0">
    <div className="w-9 h-9 rounded-lg bg-[#0a0a0a]/10 flex items-center justify-center mb-5">
      <MapPin className="w-4 h-4 text-[#0a0a0a]" />
    </div>
    <div className="space-y-1">
      {[
        { icon: Send, label: "Templates", active: false },
        { icon: Users, label: "AI Builder", active: true },
        { icon: Box, label: "Components", active: false },
        { icon: Wallet, label: "Export", active: false },
        { icon: Settings, label: "Settings", active: false },
      ].map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${item.active
            ? "bg-[#0a0a0a]/[0.06] font-semibold text-[#0a0a0a]"
            : "text-[#0a0a0a]/50"
            }`}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </div>
      ))}
    </div>
  </div>,

  /* Color card */
  <div key="color" className="rounded-2xl h-[clamp(13rem,19vw,18rem)] shrink-0 overflow-hidden relative">
    <Image src="/images/beautiful-themes-card.jfif" alt="Beautiful Themes" fill className="object-cover object-[center_80%]" />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-12">
      <p className="text-white/90 text-sm font-medium">Beautiful Themes</p>
      <p className="text-white/50 text-xs mt-1">12+ color palettes</p>
    </div>
  </div>,

  /* Monthly stats card */
  <div key="monthly" className="bg-[#d4f700] rounded-2xl p-5 shrink-0">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-medium text-[#0a0a0a]/80">Monthly Rate</p>
      <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#0a0a0a]/15 text-[#0a0a0a]/50">Full stats</span>
    </div>
    <p className="text-3xl font-bold text-[#0a0a0a] mb-1">10,432</p>
    <p className="text-xs text-[#0a0a0a]/40">Sites built this month</p>
  </div>,
];

const rightCards = [
  /* Income/feature card */
  <div key="income" className="bg-[#d4f700] rounded-2xl p-5 shrink-0">
    <p className="text-lg font-semibold text-[#0a0a0a]/80 mb-1">Template Categories</p>
    <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#0a0a0a]/[0.06] text-[#0a0a0a]/60 inline-block mb-3">12 Industries</span>
    <p className="text-3xl font-bold text-[#0a0a0a] mb-1">
      50<span className="text-[#0a0a0a]/30">+</span>
    </p>
    <p className="text-xs text-[#0a0a0a]/40 mb-4">Components available</p>
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {[
        { color: "bg-[#0a0a0a]", label: "Restaurant" },
        { color: "bg-[#0a0a0a]/40", label: "Portfolio" },
        { color: "bg-[#0a0a0a]/60", label: "SaaS" },
        { color: "bg-[#7cb342]", label: "E-Commerce" },
      ].map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-2 h-4 rounded-sm ${item.color}`} />
          <span className="text-sm text-[#0a0a0a]/70">{item.label}</span>
        </div>
      ))}
    </div>
  </div>,

  /* Person/feature card */
  <div key="person" className="rounded-2xl h-[clamp(13rem,19vw,18rem)] shrink-0 relative overflow-hidden">
    <Image src="/images/ai-powered-card.jfif" alt="AI Powered" fill className="object-cover" />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
      <p className="text-white text-sm font-semibold">AI-Powered</p>
    </div>
    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    </div>
  </div>,

  /* Badge card */
  <div key="badge" className="bg-[#f5f0e8] rounded-2xl p-5 shrink-0">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <span className="text-sm font-semibold text-[#0a0a0a]">Made with Weavo</span>
    </div>
    <div className="flex gap-2 mb-3">
      <div className="h-2 w-16 rounded-full bg-[#0a0a0a]/10" />
      <div className="h-2 w-10 rounded-full bg-[#0a0a0a]/[0.06]" />
    </div>
    <div className="flex gap-2">
      <div className="h-2 w-12 rounded-full bg-[#0a0a0a]/[0.06]" />
      <div className="h-2 w-14 rounded-full bg-[#0a0a0a]/10" />
    </div>
    <div className="flex items-center gap-1.5 mt-4">
      {["bg-purple-500", "bg-blue-500", "bg-cyan-500"].map((c, i) => (
        <div key={i} className={`w-3 h-3 rounded-full ${c}`} />
      ))}
      <span className="text-[11px] text-[#0a0a0a]/40 ml-1">3 styles applied</span>
    </div>
  </div>,

  /* Warm gradient card */
  <div key="warm" className="rounded-2xl h-[clamp(9rem,12vw,11rem)] shrink-0 relative overflow-hidden">
    <Image src="/images/export-card.jfif" alt="Export Anywhere" fill className="object-cover object-center" />
    <div className="absolute inset-0 bg-black/15" />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-10">
      <p className="text-white/90 text-sm font-medium">Export Anywhere</p>
      <p className="text-white/50 text-xs mt-1">HTML, Next.js, and more</p>
    </div>
  </div>,
];

const MOBILE_BG_IMAGES = [
  "/images/ai-powered-card.jfif",
  "/images/auth-left-bg.png",
  "/images/ai-robot.png",
];

export function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % MOBILE_BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden pt-16">
      {/* Subtle background — desktop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.04),transparent_50%)]" />

      {/* Background image slideshow — mobile only */}
      <div className="lg:hidden absolute inset-0 z-[2]">
        <AnimatePresence mode="sync">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={MOBILE_BG_IMAGES[bgIndex]}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={bgIndex === 0}
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 z-[3]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 flex items-center min-h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-center w-full py-12 lg:py-0">
          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 lg:pr-8"
          >
            {/* Heading */}
            <h1 className="text-[clamp(48px,6.5vw,88px)] font-medium leading-[1.05] tracking-tight text-[#f5f0e8] mb-6">
              AI Websites
              <br />
              Built for Rapid
              <br />
              Growth
            </h1>

            {/* Decorative arrow */}
            <Image src="/images/hero-arrow.png" alt="" width={80} height={80} className="hidden lg:block absolute right-0 top-[55%] invert opacity-80 -rotate-[30deg]" />

            {/* Description */}
            <p className="text-base lg:text-lg text-[#f5f0e8]/50 max-w-md mb-10 leading-relaxed">
              Describe your business, pick your style, and let AI generate a professional website in seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 bg-[#f5f0e8] text-[#0a0a0a] font-semibold px-8 py-4 rounded-full hover:bg-white transition-colors text-sm"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-3 text-[#f5f0e8]/50 hover:text-[#f5f0e8]/80 transition-colors group"
              >
                <div className="w-11 h-11 rounded-full border border-[#f5f0e8]/20 flex items-center justify-center group-hover:border-[#f5f0e8]/40 transition-colors">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest block">Watch Demo</span>
                  <span className="text-[11px] text-[#f5f0e8]/30">2 min</span>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Right — Animated Bento Columns */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex items-start gap-0 col-span-2 h-[calc(100vh-64px)] overflow-hidden"
          >
            {/* Dot line 1 */}
            <DotLine className="mt-20 shrink-0" />

            {/* Left column — scrolls UP */}
            <div className="w-[clamp(180px,20vw,280px)] shrink-0 mx-2 relative overflow-hidden h-full">
              <div className="animate-scroll-up flex flex-col gap-3">
                {/* Duplicate cards for seamless loop */}
                {leftCards}
                {leftCards}
              </div>
            </div>

            {/* Dot line 2 */}
            <DotLine className="mt-32 shrink-0" />

            {/* Right column — scrolls DOWN */}
            <div className="w-[clamp(170px,18.5vw,260px)] shrink-0 mx-2 relative overflow-hidden h-full">
              <div className="animate-scroll-down flex flex-col gap-3">
                {/* Duplicate cards for seamless loop */}
                {rightCards}
                {rightCards}
              </div>
            </div>

            {/* Dot line 3 */}
            <DotLine className="mt-16 shrink-0" />
          </motion.div>
        </div>
      </div>

      {/* Top & bottom gradient masks for smooth fade */}
      <div className="absolute top-16 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
