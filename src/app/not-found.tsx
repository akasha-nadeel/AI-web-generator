"use client";

import Link from "next/link";
import { MoveLeft, Frown } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-[#fcfcfc] flex items-center justify-center px-4 font-sans overflow-hidden">
      <div className="flex flex-col items-center text-center max-w-2xl w-full py-8">
        
        {/* 1. Large Face Icon - Scaled down slightly */}
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 md:mb-8"
        >
            <Frown className="w-32 h-32 md:w-40 md:h-40 text-[#888888]" strokeWidth={1.2} />
        </motion.div>

        {/* 2. Massive 404 Text - Scaled down slightly */}
        <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-[100px] md:text-[120px] font-medium text-[#555555] leading-none tracking-tight mb-2"
        >
          404
        </motion.h1>

        {/* 3. Page Not Found Title */}
        <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-normal text-[#999999] mb-8 md:mb-10"
        >
          Page not found
        </motion.h2>
        
        {/* 4. Small Description - Tightened spacing */}
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="space-y-1 mb-10 md:mb-12"
        >
            <p className="text-[13px] md:text-[14px] text-[#888888] font-medium leading-relaxed">
              The page you are looking for doesn&apos;t exist or another error occurred.
            </p>
            <p className="text-[13px] md:text-[14px] text-[#888888] font-medium leading-relaxed">
              Go back, or head over to <Link href="/" className="text-black hover:underline">weavo.com</Link> to choose a new direction.
            </p>
        </motion.div>

        {/* 5. Back Button */}
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-10 py-3.5 rounded-full bg-black text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-black/90 transition-all active:scale-95 shadow-lg"
            >
              <MoveLeft className="w-4 h-4" />
              Back to Home
            </Link>
        </motion.div>
      </div>
    </div>
  );
}
