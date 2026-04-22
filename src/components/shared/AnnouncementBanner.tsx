"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AnnouncementBannerProps {
    className?: string;
}

export function AnnouncementBanner({ className }: AnnouncementBannerProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has dismissed the banner before
        const isDismissed = localStorage.getItem("pixora_beta_banner_dismissed");
        if (!isDismissed) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("pixora_beta_banner_dismissed", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={cn(
                        "relative z-[100] w-full bg-background border-b border-primary/20 overflow-hidden",
                        className
                    )}
                >
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 animate-pulse" />
                    
                    <div className="max-w-7xl mx-auto px-4 py-2.5 relative flex items-center justify-between gap-4">
                        <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 text-center">
                            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30">
                                <Sparkles className="w-3 h-3 text-primary" />
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Beta</span>
                            </div>
                            
                            <p className="text-xs md:text-sm text-foreground/90 font-medium leading-tight">
                                <span className="hidden xs:inline">🚀 We're in testing phase! </span>
                                Get <span className="text-primary font-bold">Limited-Time Early Bird Pricing</span> on all credit packs.
                            </p>
                            
                            <Link 
                                href="/billing" 
                                className="flex items-center gap-1 text-xs font-bold text-primary hover:opacity-80 transition-all whitespace-nowrap group ml-1"
                            >
                                Get Discount
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <button
                            onClick={handleDismiss}
                            className="p-1 rounded-md text-foreground/40 hover:text-foreground/80 hover:bg-foreground/5 transition-all shrink-0"
                            aria-label="Dismiss"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
