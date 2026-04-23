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
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { fadeLeft, ease, viewport as vp } from "@/lib/animations";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Describe your business and get a complete, professional website generated in seconds.",
    dir: { x: -80, y: -80 }, // Top Left
  },
  {
    icon: Palette,
    title: "Smart Style Matching",
    description: "Upload design inspiration and our AI extracts colors, fonts, and layout preferences automatically.",
    dir: { x: 0, y: -100 }, // Top Center
  },
  {
    icon: MousePointerClick,
    title: "Visual Editor",
    description: "Edit text, swap images, reorder sections, and fine-tune your design with drag-and-drop.",
    dir: { x: 80, y: -80 }, // Top Right
  },
  {
    icon: MessageSquareText,
    title: "AI Chat Refinement",
    description: 'Make changes with natural language. Just say "make the hero darker" or "add testimonials."',
    dir: { x: -100, y: 0 }, // Center Left
  },
  {
    isLogo: true,
    title: "Weavo",
    dir: { x: 0, y: 0 }, // Center
  },
  {
    icon: Image,
    title: "Unsplash Integration",
    description: "Access millions of high-quality stock photos directly within the editor.",
    dir: { x: 100, y: 0 }, // Center Right
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description: "Every generated site looks perfect on desktop, tablet, and mobile.",
    dir: { x: -80, y: 80 }, // Bottom Left
  },
  {
    icon: Download,
    title: "Clean Export",
    description: "Download your site as pure HTML/CSS/JS. No framework lock-in — host anywhere.",
    dir: { x: 0, y: 100 }, // Bottom Center
  },
  {
    icon: Layers,
    title: "Component Library",
    description: "Choose from dozens of professionally designed sections — heroes, pricing, and more.",
    dir: { x: 80, y: 80 }, // Bottom Right
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
      y: e.clientY - rect.top + 20,
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
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm text-muted-foreground font-bold tracking-widest uppercase">Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tighter mb-6 text-foreground">
            Everything You Need<br /> to Build Fast
          </h2>
          <p className="text-base text-muted-foreground/70 max-w-md leading-relaxed mb-8">
            Weavo combines AI generation, visual editing, and smart tools to help
            you create professional websites without writing a single line of code.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-foreground text-background text-sm font-bold rounded-full hover:bg-foreground/90 transition-all active:scale-95 shadow-lg"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Right side — icon grid with Converging Animation */}
        <div className="lg:w-[60%] w-full relative lg:-mt-14" ref={gridRef}>
          {/* Cursor-following tooltip */}
          <AnimatePresence>
            {tooltip.visible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="pointer-events-none absolute z-50 max-w-[200px] p-3 rounded-xl bg-background/90 backdrop-blur-2xl border-black/70 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                  borderWidth: "1.2px",
                }}
              >
                <div className="relative">
                  <div className="absolute -top-5 -left-1 text-[32px] font-serif text-primary/30 italic select-none">&ldquo;</div>
                  <p className="text-[12px] text-foreground font-medium leading-relaxed italic relative z-10">
                    {tooltip.text}
                  </p>
                  <div className="flex justify-end mt-1.5 opacity-60">
                    <Sparkles className="w-2.5 h-2.5 text-primary" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div className="border-t border-dashed border-border/60" />

              <div className="grid grid-cols-3">
                {row.map((feature, colIndex) => (
                  <div
                    key={feature.title}
                    onMouseMove={(e) =>
                      handleMouseMove(e, feature.description)
                    }
                    onMouseLeave={handleMouseLeave}
                    className={`group relative aspect-square md:aspect-auto md:py-8 px-3 flex flex-col items-center justify-center ${
                      colIndex < row.length - 1
                        ? "border-r border-dashed border-border/60"
                        : ""
                    } ${feature.description ? "cursor-pointer" : ""}`}
                  >
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        x: feature.dir.x, 
                        y: feature.dir.y,
                        scale: 0.8,
                        rotate: (feature.dir.x + feature.dir.y) / 12
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0, 
                        y: 0,
                        scale: 1,
                        rotate: 0
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 60,
                        delay: (rowIndex * 3 + colIndex) * 0.04,
                        duration: 1.2
                      }}
                      className="flex flex-col items-center justify-center w-full"
                    >
                      {feature.isLogo ? (
                        <div className="relative flex items-center justify-center h-full py-4 px-6 group-hover:scale-110 transition-transform duration-500">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src="/images/tot.png" 
                            alt="Weavo Logo" 
                            className="w-full max-w-[100px] md:max-w-[110px] h-auto object-contain brightness-0 drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.2)] transition-all duration-500" 
                          />
                          
                          {/* Shine Overlay */}
                          <motion.div
                            className="absolute inset-0 z-10 pointer-events-none"
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ 
                              x: ["100%", "-100%"],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeInOut",
                            }}
                            style={{
                              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                              maskImage: "url('/images/tot.png')",
                              maskSize: "contain",
                              maskRepeat: "no-repeat",
                              maskPosition: "center",
                              WebkitMaskImage: "url('/images/tot.png')",
                              WebkitMaskSize: "contain",
                              WebkitMaskRepeat: "no-repeat",
                              WebkitMaskPosition: "center",
                            }}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 md:w-[60px] md:h-[60px] rounded-2xl bg-foreground/[0.03] border border-border flex items-center justify-center mb-4 group-hover:bg-foreground/[0.06] group-hover:border-primary/20 group-hover:scale-110 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] shadow-md transition-all duration-500">
                            {feature.icon && <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-foreground/70 group-hover:text-primary transition-colors duration-500" />}
                          </div>
                          <span className="text-[10px] md:text-xs text-muted-foreground font-bold tracking-tight uppercase text-center group-hover:text-foreground transition-colors duration-300 max-w-[90px]">
                            {feature.title}
                          </span>
                        </>
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-dashed border-border/60" />
        </div>
      </div>
    </SectionWrapper>
  );
}
