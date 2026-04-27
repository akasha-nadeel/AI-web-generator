"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { fadeUp, zoomIn, ease, viewport as vp } from "@/lib/animations";

export function CTA() {
  const { isSignedIn } = useAuth();
  const ctaHref = isSignedIn ? "/dashboard" : "/sign-up";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.45], [0.75, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.45], ["6rem", "2.5rem"]);
  const y = useTransform(scrollYProgress, [0, 0.45], [150, 0]);

  return (
    <section ref={containerRef} className="pt-4 pb-20 md:pb-32 px-1.5 md:px-2 bg-background overflow-hidden">
      <motion.div
        style={{ scale, opacity, borderRadius, y }}
        className="max-w-[1450px] mx-auto relative h-[600px] md:h-[800px] overflow-hidden border border-border/50 shadow-xl"
      >
        {/* Full background image */}
        <Image
          src="/images/banner-bg.png"
          alt=""
          fill
          className="object-cover scale-110"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeUp}
          transition={ease.slow}
        >
          <h2 className="text-[clamp(45px,6vw,82px)] font-medium text-white mb-4 max-w-3xl leading-[1.05] tracking-tight">
            Ready to Build Your Website?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-base md:text-lg font-medium leading-relaxed">
            Join thousands of creators who trust Weavo to build their online
            presence. Start free — no credit card required.
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-all shadow-lg text-sm md:text-base group"
          >
            {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
