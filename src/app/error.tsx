"use client";

import { useEffect } from "react";
import { RefreshCcw, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center px-4 font-sans overflow-hidden">
      <div className="flex flex-col items-center text-center max-w-2xl w-full">
        
        {/* Lamp Illustration SVG */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-12"
        >
          <svg width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Blob */}
            <path d="M240 60C280 80 300 140 260 180C220 220 120 210 80 170C40 130 60 70 120 50C180 30 200 40 240 60Z" fill="#FEE2E2" fillOpacity="0.6"/>
            
            {/* Lamp Stand */}
            <path d="M110 190L160 190" stroke="#111827" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M120 190L140 180L135 170L115 180L120 190Z" fill="#111827"/>
            <path d="M135 170L110 130L120 125L145 165" stroke="#111827" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M110 130L150 90L160 100L120 140" stroke="#111827" strokeWidth="2" strokeLinejoin="round"/>
            
            {/* Lamp Joints */}
            <circle cx="135" cy="170" r="4" fill="white" stroke="#111827" strokeWidth="2"/>
            <circle cx="110" cy="130" r="4" fill="white" stroke="#111827" strokeWidth="2"/>
            <circle cx="150" cy="90" r="4" fill="white" stroke="#111827" strokeWidth="2"/>

            {/* Red Lampshade */}
            <path d="M150 90L190 60L240 120L180 140L150 90Z" fill="#EF4444"/>
            <path d="M190 60L240 120L180 140L150 90" stroke="#111827" strokeWidth="2" strokeLinejoin="round"/>
            
            {/* Broken Bulb */}
            <circle cx="210" cy="170" r="18" stroke="#111827" strokeWidth="2" fill="white"/>
            <path d="M205 155C208 160 212 160 215 155" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M200 170L220 170M205 175L215 175" stroke="#111827" strokeWidth="1.5"/>
            <path d="M210 188L210 195" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
            
            {/* Cracks/Sparks */}
            <path d="M215 140L220 130" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M225 150L235 145" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
            
            {/* Surprise marks on lamp */}
            <path d="M175 40L182 30L190 38" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M215 65L225 60L220 72" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 tracking-tight"
        >
          Something went wrong
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-[#4B5563] text-lg mb-10 font-medium"
        >
          Please try again or report an issue to support
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-full bg-[#3B82F6] text-white font-bold text-sm hover:bg-[#2563EB] transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <RefreshCcw className="w-4 h-4" />
            Try again
          </button>
          
          <button
            onClick={() => window.open('/contact', '_blank')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-full border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-sm hover:bg-[#3B82F6]/5 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            Report an issue
          </button>
        </motion.div>
      </div>
    </div>
  );
}
