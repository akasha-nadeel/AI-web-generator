"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale and Border Radius animation based on scroll
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.75, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.45], ["6rem", "2.5rem"]);
  const y = useTransform(scrollYProgress, [0, 0.45], [150, 0]);

  return (
    <section
      ref={containerRef}
      id="video-demo"
      className="relative pt-4 md:pt-6 pb-20 md:pb-32 overflow-hidden bg-background scroll-mt-20"
    >
      <div className="max-w-[1450px] mx-auto px-4 md:px-6">
        <motion.div
          style={{ 
            scale, 
            borderRadius,
            y
          }}
          className="relative aspect-video w-full bg-black shadow-2xl overflow-hidden border border-white/10"
        >
          {/* Video Placeholder or Video Element */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
            poster="/images/banner-bg.png"
          >
            <source src="/video-demo/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer">
             <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
             </div>
             
             <div className="absolute top-8 right-8">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white text-xs font-bold tracking-widest uppercase">Live Demo</span>
                </div>
             </div>

             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="max-w-md">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Experience the Future</h3>
                    <p className="text-white/60 text-sm md:text-base">Watch how Weavo transforms your ideas into professional websites in seconds.</p>
                </div>
                <div className="hidden md:flex gap-4">
                     <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">Time to Generate</p>
                        <p className="text-white text-xl font-bold">12.4s</p>
                     </div>
                     <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">Precision</p>
                        <p className="text-white text-xl font-bold">99.9%</p>
                     </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
