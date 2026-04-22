"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Compass, Briefcase, Paintbrush, Code, Search, GraduationCap, Sparkles, Megaphone, Users, Camera, ExternalLink, Play, MessageCircle, Globe } from "lucide-react";

type Step = 1 | 2 | "loading";

const ROLES = [
  { id: "creator", label: "Content Creator", icon: Sparkles },
  { id: "business", label: "Small Business Owner", icon: Briefcase },
  { id: "marketer", label: "Marketer", icon: Megaphone },
  { id: "pm", label: "Product Manager", icon: Compass },
  { id: "designer", label: "Designer", icon: Paintbrush },
  { id: "developer", label: "Developer", icon: Code },
  { id: "researcher", label: "Researcher", icon: Search },
  { id: "exploring", label: "Just Exploring", icon: Globe },
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "surprise", label: "Surprise Us", icon: MessageCircle },
];

const SOURCES = [
  { id: "google", label: "Google Search", icon: Search, color: "text-blue-400" },
  { id: "twitter", label: "X / Twitter", icon: Users, color: "text-white" },
  { id: "instagram", label: "Instagram", icon: Camera, color: "text-pink-500" },
  { id: "reddit", label: "Reddit", icon: MessageCircle, color: "text-orange-500" },
  { id: "linkedin", label: "LinkedIn", icon: ExternalLink, color: "text-blue-600" },
  { id: "youtube", label: "YouTube", icon: Play, color: "text-red-500" },
  { id: "friends", label: "Friends", icon: Users, color: "text-green-400" },
  { id: "surprise", label: "Surprise Us", icon: MessageCircle, color: "text-purple-400" },
];

export default function OnboardingFlow({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState<Step>(1);
  const [selection, setSelection] = useState<{ role: string; source: string }>({
    role: "",
    source: "",
  });

  const handleNext = () => {
    if (step === 1 && selection.role) setStep(2);
    else if (step === 2 && selection.source) {
      setStep("loading");
      // Simulate a small delay for a premium feel
      setTimeout(() => onComplete(selection), 2000);
    }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-6">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,transparent_100%)]"></div>
        <div className="absolute w-full h-full" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full max-w-2xl text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Who's entering the flow?
            </h1>
            <p className="text-zinc-400 mb-12 text-lg">Help us personalize your Weavo experience.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelection({ ...selection, role: role.id })}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                    selection.role === role.id
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800"
                  }`}
                >
                  <role.icon size={20} className={selection.role === role.id ? "text-black" : "text-zinc-500"} />
                  <span className="font-medium text-sm">{role.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selection.role}
              className={`px-12 py-4 rounded-full font-bold transition-all duration-300 ${
                selection.role 
                  ? "bg-white text-black hover:scale-105 active:scale-95" 
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full max-w-2xl text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              How did our paths cross?
            </h1>
            <p className="text-zinc-400 mb-12 text-lg">Let us know how you discovered Weavo.</p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {SOURCES.map((source) => (
                <button
                  key={source.id}
                  onClick={() => setSelection({ ...selection, source: source.id })}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-200 ${
                    selection.source === source.id
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800"
                  }`}
                >
                  <source.icon size={20} className={selection.source === source.id ? "text-black" : source.color} />
                  <span className="font-medium">{source.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selection.source}
              className={`px-12 py-4 rounded-full font-bold transition-all duration-300 ${
                selection.source 
                  ? "bg-white text-black hover:scale-105 active:scale-95" 
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              Finish Setup
            </button>
          </motion.div>
        )}

        {step === "loading" && (
          <motion.div
            key="loading"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <div className="w-16 h-16 border-4 border-zinc-800 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Personalizing Weavo for you...</h2>
            <p className="text-zinc-500">Preparing your workspace with style.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
