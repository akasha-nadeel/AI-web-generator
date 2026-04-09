"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, HelpCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { fadeLeft, fadeRight, ease, viewport as vp } from "@/lib/animations";

const stats = [
  {
    target: 10,
    suffix: "K+",
    label: "Websites Built",
    desc: "Successfully",
  },
  {
    target: 98,
    suffix: "%",
    label: "Customer",
    desc: "Satisfaction Rate",
  },
  {
    target: 30,
    suffix: "s",
    label: "Average",
    desc: "Build Time",
  },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — Text + Stats */}
          <motion.div
            className="flex flex-col justify-between h-full order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fadeLeft}
            transition={ease.slow}
          >
            {/* Description */}
            <div className="mb-12">
              <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-sm">
                At Weavo, we offer more than just website building; we provide an
                unparalleled AI-powered experience tailored to meet your needs and
                exceed your expectations.
              </p>

              {/* Team avatars */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-3">
                  <Image src="/images/people/download (12).jfif" alt="" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] object-cover object-top" />
                  <Image src="/images/people/download (13).jfif" alt="" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] object-cover object-top" />
                  <Image src="/images/people/%23mensstyle %23fashion %23mensfashion %23affiliatelink %23sweaterweather.jfif" alt="" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] object-cover object-top" />
                  <Image src="/images/people/person-4.jfif" alt="" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] object-cover object-top" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80">Meet Our</p>
                  <p className="text-sm font-medium text-white/80">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-0">
              {stats.map((s, i) => (
                <div key={s.target}>
                  {i > 0 && <div className="h-px bg-white/[0.08]" />}
                  <div className="flex items-center gap-6 py-5">
                    <p className="text-4xl sm:text-5xl md:text-7xl font-light text-white min-w-[100px] sm:min-w-[120px] md:min-w-[150px] tracking-tight">
                      <CountUp target={s.target} suffix={s.suffix} />
                    </p>
                    <div>
                      <p className="text-sm md:text-base font-normal text-white/60">{s.label}</p>
                      <p className="text-sm md:text-base font-normal text-white/60">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Image with floating elements */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fadeRight}
            transition={ease.slow}
          >
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden relative aspect-[3/4] sm:aspect-[4/5]">
              <Image
                src="/images/testimonial-hero.png"
                alt="Weavo"
                fill
                className="object-cover"
              />

              {/* Contact Us Now — floating top right */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5">
                <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 sm:px-5 sm:py-2.5 shadow-lg">
                  <Phone className="w-4 h-4 text-[#0a0a0a]" />
                  <span className="text-sm font-semibold text-[#0a0a0a]">Contact Us Now</span>
                </div>
              </div>

              {/* Help icon — floating bottom right */}
              <div className="absolute bottom-28 right-5">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <HelpCircle className="w-5 h-5 text-[#0a0a0a]/60" />
                </div>
              </div>

              {/* Bottom overlay — tagline + consultation card */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-4">
                  {/* Left tagline */}
                  <p className="text-white font-semibold text-base sm:text-lg italic">Building Your Dreams</p>

                  {/* Consultation card */}
                  <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#0a0a0a]/50">Special Offer</p>
                      <p className="text-xs font-semibold text-[#0a0a0a] leading-tight">Get Started Free<br />With Weavo AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
