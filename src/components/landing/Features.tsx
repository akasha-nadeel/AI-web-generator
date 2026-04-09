"use client";

import { useState, useRef } from "react";
import {
  Sparkles,
  Palette,
  MousePointerClick,
  MessageSquareText,
  Smartphone,
  Download,
  Image,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { fadeLeft, fadeRight, ease, viewport as vp } from "@/lib/animations";

const features: {
  icon?: any;
  title: string;
  description?: string;
  isLogo?: boolean;
}[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Describe your business and get a complete, professional website generated in seconds.",
  },
  {
    icon: Palette,
    title: "Smart Style Matching",
    description:
      "Upload design inspiration and our AI extracts colors, fonts, and layout preferences automatically.",
  },
  {
    icon: MousePointerClick,
    title: "Visual Editor",
    description:
      "Edit text, swap images, reorder sections, and fine-tune your design with drag-and-drop.",
  },
  {
    icon: MessageSquareText,
    title: "AI Chat Refinement",
    description:
      'Make changes with natural language. Just say "make the hero darker" or "add testimonials."',
  },
  {
    isLogo: true,
    title: "Weavo",
  },
  {
    icon: Image,
    title: "Unsplash Integration",
    description:
      "Access millions of high-quality stock photos directly within the editor.",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description:
      "Every generated site looks perfect on desktop, tablet, and mobile.",
  },
  {
    icon: Download,
    title: "Clean Export",
    description:
      "Download your site as pure HTML/CSS/JS. No framework lock-in — host anywhere.",
  },
  {
    icon: Layers,
    title: "Component Library",
    description:
      "Choose from dozens of professionally designed sections — heroes, pricing, and more.",
  },
];

export function Features() {
  const rows = [
    features.slice(0, 3),
    features.slice(3, 6),
    features.slice(6, 9),
  ];

  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
    visible: boolean;
    side: "left" | "right";
  }>({ text: "", x: 0, y: 0, visible: false, side: "right" });

  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent, description?: string) => {
    if (!description || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const isRightHalf = relX > rect.width / 2;
    setTooltip({
      text: description,
      x: relX + (isRightHalf ? -236 : 16),
      y: e.clientY - rect.top - 40,
      visible: true,
      side: isRightHalf ? "left" : "right",
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <SectionWrapper id="features">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Left side — heading + description + button */}
        <motion.div
          className="lg:w-[40%] flex-shrink-0"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeLeft}
          transition={ease.slow}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="text-sm text-white/40">Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-light leading-[1.1] tracking-tight mb-6">
            Everything You Need<br /> to Build Fast
          </h2>
          <p className="text-sm text-white/35 max-w-md leading-relaxed mb-8">
            Weavo combines AI generation, visual editing, and smart tools to help
            you create professional websites without writing a single line of code.
          </p>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
          >
            All Features
          </a>
        </motion.div>

        {/* Right side — icon grid with dashed separators */}
        <motion.div
          className="lg:w-[60%] w-full relative"
          ref={gridRef}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeRight}
          transition={ease.slow}
        >
          {/* Cursor-following tooltip */}
          <div
            className="pointer-events-none absolute z-50 max-w-[220px] px-3.5 py-2.5 rounded-lg bg-white text-black text-xs leading-relaxed font-medium shadow-lg transition-opacity duration-200"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              opacity: tooltip.visible ? 1 : 0,
            }}
          >
            {tooltip.text}
          </div>

          {rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div className="border-t border-dashed border-white/[0.08]" />

              <div className="grid grid-cols-3">
                {row.map((feature, colIndex) => (
                  <div
                    key={feature.title}
                    onMouseMove={(e) =>
                      handleMouseMove(e, feature.description)
                    }
                    onMouseLeave={handleMouseLeave}
                    className={`group flex flex-col items-center justify-center py-5 md:py-6 px-3 ${
                      colIndex < row.length - 1
                        ? "border-r border-dashed border-white/[0.08]"
                        : ""
                    } ${feature.description ? "cursor-pointer" : ""}`}
                  >
                    {feature.isLogo ? (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-xl md:text-2xl font-bold text-white">
                          Weavo
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-3 group-hover:bg-white/[0.1] group-hover:border-white/[0.15] transition-all duration-300">
                          <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-white/80 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-xs md:text-sm text-white/50 font-medium text-center group-hover:text-white/80 transition-colors duration-300">
                          {feature.title}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-dashed border-white/[0.08]" />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
