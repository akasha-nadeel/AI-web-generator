"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

/* Dot line — vertical line of evenly spaced dots */
function DotLine({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-[10px] h-full ${className ?? ""}`}>
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} className="w-[4px] h-[4px] rounded-full bg-foreground/[0.15] shrink-0" />
      ))}
    </div>
  );
}

/* Cards for the bento columns */
const HERO_IMAGE_BASE = "/images/hero%20images/Untitled%20design%20";

const leftCards = [
  <div key="hero-3" className="rounded-2xl h-[clamp(10rem,15vw,14rem)] shrink-0 relative overflow-hidden">
    <Image src={`${HERO_IMAGE_BASE}(3).png`} alt="" fill className="object-cover object-center" />
  </div>,

  <div key="hero-4" className="rounded-2xl h-[clamp(13rem,19vw,18rem)] shrink-0 relative overflow-hidden">
    <Image src={`${HERO_IMAGE_BASE}(4).png`} alt="" fill className="object-cover object-center" />
  </div>,

  <div key="hero-5" className="rounded-2xl h-[clamp(10rem,15vw,14rem)] shrink-0 relative overflow-hidden">
    <Image src={`${HERO_IMAGE_BASE}(5).png`} alt="" fill className="object-cover object-center" />
  </div>,

  <div key="hero-6" className="rounded-2xl h-[clamp(11rem,16vw,15rem)] shrink-0 relative overflow-hidden">
    <Image src={`${HERO_IMAGE_BASE}(6).png`} alt="" fill className="object-cover object-center" />
  </div>,
];

const rightCards = [
  <div key="hero-7" className="rounded-2xl h-[clamp(11rem,16vw,15rem)] shrink-0 relative overflow-hidden">
    <Image src={`${HERO_IMAGE_BASE}(7).png`} alt="" fill className="object-cover object-center" />
  </div>,

  <div key="hero-8" className="rounded-2xl h-[clamp(10rem,15vw,14rem)] shrink-0 relative overflow-hidden">
    <Image src={`${HERO_IMAGE_BASE}(8).png`} alt="" fill className="object-cover object-center" />
  </div>,

  <div key="hero-9" className="rounded-2xl h-[clamp(13rem,19vw,18rem)] shrink-0 relative overflow-hidden">
    <Image src={`${HERO_IMAGE_BASE}(9).png`} alt="" fill className="object-cover object-center" />
  </div>,

  <div key="hero-10" className="rounded-2xl h-[clamp(10rem,15vw,14rem)] shrink-0 relative overflow-hidden">
    <Image src={`${HERO_IMAGE_BASE}(10).png`} alt="" fill className="object-cover object-center" />
  </div>,
];

const MOBILE_BG_IMAGES = [
  "/images/showcase-blog.png",
  "/images/showcase-restaurant.png",
  "/images/showcase-realestate.png",
  "/images/showcase-fitness.png",
  "/images/showcase-portfolio.png",
  "/images/ai-powered-card.jpg",
  "/images/auth-left-bg.png",
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
    <section id="hero" className="relative min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden pt-16">
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
            <h1 className="text-[clamp(45px,6vw,82px)] font-medium leading-[1.05] tracking-tight text-foreground mb-6">
              AI Websites
              <br />
              Built for Rapid
              <br />
              Growth
            </h1>

            {/* Description */}
            <p className="text-base lg:text-lg text-foreground/70 max-w-md mb-10 leading-relaxed">
              Describe your business, pick your style, and let AI generate a professional website in seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/sign-up"
                className="btn-metal-shine inline-flex items-center gap-2 bg-foreground text-background font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-sm"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#video-demo"
                className="inline-flex items-center gap-3 text-foreground hover:opacity-80 transition-opacity group"
              >
                <div className="w-11 h-11 rounded-full border border-foreground/30 flex items-center justify-center group-hover:border-foreground/50 transition-colors">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest block">Watch Demo</span>
                  <span className="text-[11px] text-foreground/60">2 min</span>
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
            <div className="w-[clamp(200px,21vw,295px)] shrink-0 mx-2 relative overflow-hidden h-full">
              <div className="animate-scroll-up flex flex-col gap-3">
                {/* Duplicate cards for seamless loop */}
                {leftCards}
                {leftCards}
              </div>
            </div>

            {/* Dot line 2 */}
            <DotLine className="mt-32 shrink-0" />

            {/* Right column — scrolls DOWN */}
            <div className="w-[clamp(200px,21vw,295px)] shrink-0 mx-2 relative overflow-hidden h-full">
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

      {/* Top & bottom gradient masks — Dark mode only for smooth fade */}
      <div className="hidden dark:block absolute top-16 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
      <div className="hidden dark:block absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
}
