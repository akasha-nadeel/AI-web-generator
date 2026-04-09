"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { fadeLeft, fadeRight, ease, viewport as vp } from "@/lib/animations";

const faqs = [
  {
    question: "How does Weavo's AI website builder work?",
    answer: "Simply describe your business, choose a style, and our AI generates a fully designed, responsive website in seconds. You can then customize it with our visual editor.",
  },
  {
    question: "What are the payment options available?",
    answer: "We offer monthly and annual billing through Stripe. You can pay with any major credit card. Annual plans come with a discount.",
  },
  {
    question: "Can I export and host my website anywhere?",
    answer: "Yes. Weavo lets you export clean HTML files that you can upload to any hosting provider — no lock-in, no proprietary frameworks.",
  },
  {
    question: "What templates and industries are supported?",
    answer: "We support 12+ industries including Restaurant, Portfolio, Agency, E-Commerce, Real Estate, Fitness, Education, and more — with 50+ components available.",
  },
  {
    question: "Is there a free plan available?",
    answer: "Yes, you can get started for free with no credit card required. The free plan includes AI generation, basic templates, and single-page export.",
  },
  {
    question: "Can I use my own domain with Weavo?",
    answer: "Absolutely. You can connect your custom domain or export the site files and host them on your own server with your existing domain.",
  },
  {
    question: "How do I get support if I need help?",
    answer: "You can reach us through our contact form, email at support@weavo.com, or check our help center for guides and tutorials.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section
      id="faq"
      className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
          {/* Left — Title */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fadeLeft}
            transition={ease.slow}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <span className="text-sm text-white/50">Explore Our Advantages</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6 relative">
              Frequent Asked<br />
              <span className="relative inline-block">
                Question<span className="relative">s
                  <svg viewBox="0 0 80 80" className="absolute -top-16 -right-8 w-20 h-20 pointer-events-none select-none -rotate-[15deg]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Left upper wing */}
                    <path d="M36 36C30 22 16 10 10 16C4 22 12 34 22 38C26 39 32 38 36 36Z" fill="#f59e0b" />
                    <path d="M36 36C32 26 22 16 16 18C12 20 16 30 26 36" fill="#fbbf24" opacity="0.6" />
                    <path d="M34 34C30 26 22 20 20 22" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.3" />
                    <path d="M32 35C28 28 22 22 18 24" stroke="#0a0a0a" strokeWidth="0.4" opacity="0.2" />
                    <circle cx="18" cy="20" r="2" fill="#fff" opacity="0.3" />
                    <circle cx="14" cy="24" r="1.5" fill="#fff" opacity="0.2" />
                    {/* Left lower wing */}
                    <path d="M36 40C28 46 16 56 18 62C20 68 32 58 36 48C37 44 37 42 36 40Z" fill="#ef4444" />
                    <path d="M36 42C30 48 24 56 26 58C28 60 34 52 36 46" fill="#f87171" opacity="0.5" />
                    <path d="M35 44C30 50 26 54 24 56" stroke="#0a0a0a" strokeWidth="0.4" opacity="0.2" />
                    <circle cx="24" cy="56" r="1.5" fill="#fff" opacity="0.2" />
                    {/* Right upper wing */}
                    <path d="M44 36C50 22 64 10 70 16C76 22 68 34 58 38C54 39 48 38 44 36Z" fill="#f59e0b" />
                    <path d="M44 36C48 26 58 16 64 18C68 20 64 30 54 36" fill="#fbbf24" opacity="0.6" />
                    <path d="M46 34C50 26 58 20 60 22" stroke="#0a0a0a" strokeWidth="0.5" opacity="0.3" />
                    <path d="M48 35C52 28 58 22 62 24" stroke="#0a0a0a" strokeWidth="0.4" opacity="0.2" />
                    <circle cx="62" cy="20" r="2" fill="#fff" opacity="0.3" />
                    <circle cx="66" cy="24" r="1.5" fill="#fff" opacity="0.2" />
                    {/* Right lower wing */}
                    <path d="M44 40C52 46 64 56 62 62C60 68 48 58 44 48C43 44 43 42 44 40Z" fill="#ef4444" />
                    <path d="M44 42C50 48 56 56 54 58C52 60 46 52 44 46" fill="#f87171" opacity="0.5" />
                    <path d="M45 44C50 50 54 54 56 56" stroke="#0a0a0a" strokeWidth="0.4" opacity="0.2" />
                    <circle cx="56" cy="56" r="1.5" fill="#fff" opacity="0.2" />
                    {/* Wing edges */}
                    <path d="M36 36C30 22 16 10 10 16C4 22 12 34 22 38C26 39 32 38 36 36Z" stroke="#d97706" strokeWidth="0.6" fill="none" />
                    <path d="M44 36C50 22 64 10 70 16C76 22 68 34 58 38C54 39 48 38 44 36Z" stroke="#d97706" strokeWidth="0.6" fill="none" />
                    <path d="M36 40C28 46 16 56 18 62C20 68 32 58 36 48Z" stroke="#dc2626" strokeWidth="0.6" fill="none" />
                    <path d="M44 40C52 46 64 56 62 62C60 68 48 58 44 48Z" stroke="#dc2626" strokeWidth="0.6" fill="none" />
                    {/* Body */}
                    <ellipse cx="40" cy="40" rx="2.5" ry="10" fill="#1a1a1a" />
                    <ellipse cx="40" cy="40" rx="1.5" ry="9" fill="#2a2a2a" />
                    {/* Head */}
                    <circle cx="40" cy="29" r="3" fill="#1a1a1a" />
                    <circle cx="39" cy="28.5" r="0.8" fill="#fff" opacity="0.4" />
                    <circle cx="41" cy="28.5" r="0.8" fill="#fff" opacity="0.4" />
                    {/* Antennae */}
                    <path d="M39 27C35 20 30 14 26 12" stroke="#333" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                    <path d="M41 27C45 20 50 14 54 12" stroke="#333" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                    <circle cx="26" cy="12" r="1.5" fill="#f59e0b" />
                    <circle cx="54" cy="12" r="1.5" fill="#f59e0b" />
                    {/* Body segments */}
                    <line x1="38" y1="34" x2="42" y2="34" stroke="#444" strokeWidth="0.4" />
                    <line x1="38" y1="37" x2="42" y2="37" stroke="#444" strokeWidth="0.4" />
                    <line x1="38" y1="40" x2="42" y2="40" stroke="#444" strokeWidth="0.4" />
                    <line x1="38" y1="43" x2="42" y2="43" stroke="#444" strokeWidth="0.4" />
                    <line x1="38" y1="46" x2="42" y2="46" stroke="#444" strokeWidth="0.4" />
                  </svg>
                </span>
              </span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              At Weavo, we offer more than just website building; we provide an unparalleled experience tailored to meet your needs and exceed your expectations.
            </p>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fadeRight}
            transition={ease.slow}
          >
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/[0.08]">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                    {open === i ? (
                      <Minus className="w-4 h-4 text-white/40" />
                    ) : (
                      <Plus className="w-4 h-4 text-white/40" />
                    )}
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: open === i ? "200px" : "0",
                    opacity: open === i ? 1 : 0,
                  }}
                >
                  <p className="text-sm text-white/40 leading-relaxed pb-5 pr-10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
