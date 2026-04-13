"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/* ===== GENERATION PROGRESS — Both styles ===== */

const GENERATION_PHASES = [
    { label: "Thinking", delay: 0 },
    { label: "Designing", delay: 4000 },
    { label: "Blueprinting", delay: 9000 },
    { label: "Coding", delay: 15000 },
    { label: "Tweaking", delay: 22000 },
    { label: "Polishing", delay: 30000 },
];

const GENERATION_STEPS = [
    { label: "Analyzing your prompt and requirements", delay: 0 },
    { label: "Selecting optimal layout and structure", delay: 3000 },
    { label: "Designing responsive components", delay: 7000 },
    { label: "Applying design tokens and typography", delay: 11000 },
    { label: "Building interactive elements and animations", delay: 16000 },
    { label: "Generating production-ready code", delay: 22000 },
    { label: "Running quality checks and optimization", delay: 28000 },
];

function GenerationProgress({ startTime }: { startTime: number }) {
    const [currentPhase, setCurrentPhase] = useState(GENERATION_PHASES[0].label);
    const [visibleSteps, setVisibleSteps] = useState(0);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now() - startTime;
            setElapsed(now);

            let phase = GENERATION_PHASES[0].label;
            for (const p of GENERATION_PHASES) {
                if (now >= p.delay) phase = p.label;
            }
            setCurrentPhase(phase);

            let count = 0;
            for (const step of GENERATION_STEPS) {
                if (now >= step.delay) count++;
            }
            setVisibleSteps(count);
        }, 300);

        return () => clearInterval(timer);
    }, [startTime]);

    return (
        <div className="space-y-3">
            {/* Model name + elapsed time */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-foreground/70 font-medium">Weavo AI</span>
                <span>•</span>
                <span className="text-foreground/50">Running for {Math.floor(elapsed / 1000)}s</span>
            </div>

            {/* Animated phase word — single line like Google */}
            <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentPhase}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-foreground/60"
                    >
                        {currentPhase}...
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Step-by-step checklist */}
            <div className="space-y-1.5 pl-1 pt-1 border-t border-white/[0.04]">
                {GENERATION_STEPS.slice(0, visibleSteps).map((step, i) => {
                    const isLast = i === visibleSteps - 1;
                    const isCompleted = i < visibleSteps - 1;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex items-center gap-2"
                        >
                            {isCompleted ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"
                                >
                                    <svg className="w-2 h-2 text-emerald-400" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M2 6l3 3 5-5" />
                                    </svg>
                                </motion.div>
                            ) : (
                                <svg className="w-3.5 h-3.5 animate-spin text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="50 14" />
                                </svg>
                            )}

                            <span className={cn(
                                "text-xs",
                                isCompleted ? "text-foreground/40" : isLast ? "text-foreground/70" : "text-foreground/40"
                            )}>
                                {step.label}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Progress bar */}
            <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min((visibleSteps / GENERATION_STEPS.length) * 100, 95)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

/* ===== DEMO PAGE ===== */

export default function GenerateDemoPage() {
    const [startTime, setStartTime] = useState(Date.now());
    const [running, setRunning] = useState(true);

    const handleRestart = () => {
        setRunning(false);
        setTimeout(() => {
            setStartTime(Date.now());
            setRunning(true);
        }, 100);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
            <div className="w-full max-w-[400px] space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-xl font-semibold text-foreground">Generation Progress Demo</h1>
                    <p className="text-sm text-muted-foreground">No API calls — just UI preview</p>
                </div>

                {/* Simulated chat area */}
                <div className="rounded-xl bg-[rgba(10,10,25,0.5)] border border-white/[0.06] overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">Weavo AI</span>
                        <span className="text-[11px] text-amber-400 font-medium ml-auto">Generating...</span>
                    </div>

                    {/* User prompt */}
                    <div className="p-3 space-y-3">
                        <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                            <p className="text-sm text-foreground/90 leading-relaxed">
                                A modern portfolio for a creative designer with dark theme and smooth animations
                            </p>
                        </div>

                        {/* Generation progress */}
                        {running && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3"
                            >
                                <GenerationProgress startTime={startTime} />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Restart button */}
                <div className="text-center">
                    <button
                        onClick={handleRestart}
                        className="h-9 px-5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                    >
                        Restart Animation
                    </button>
                </div>
            </div>
        </div>
    );
}
