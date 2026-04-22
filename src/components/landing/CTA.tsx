"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, zoomIn, ease, viewport as vp } from "@/lib/animations";

export function CTA() {
  const { isSignedIn } = useAuth();
  const ctaHref = isSignedIn ? "/dashboard" : "/sign-up";

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {/* Full background image */}
      <Image
        src="/images/banner-bg.png"
        alt=""
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={fadeUp}
        transition={ease.slow}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl leading-tight">
          Ready to Build Your Website?
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-8 text-base md:text-lg">
          Join thousands of creators who trust Weavo to build their online
          presence. Start free — no credit card required.
        </p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-8 py-4 rounded-full hover:bg-foreground/90 transition-colors text-sm"
        >
          {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
