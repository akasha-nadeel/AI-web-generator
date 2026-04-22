"use client";

import React, { useState } from "react";
import OnboardingFlow from "@/components/generation/OnboardingFlow";
import { motion } from "framer-motion";

export default function OnboardingTestPage() {
  const [completedData, setCompletedData] = useState<any>(null);

  const handleComplete = (data: any) => {
    console.log("Onboarding Data Collected:", data);
    setCompletedData(data);
  };

  return (
    <main className="min-h-screen bg-black">
      {!completedData ? (
        <OnboardingFlow onComplete={handleComplete} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center max-w-md w-full"
          >
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Setup Complete!</h1>
            <p className="text-zinc-400 mb-8">The onboarding UI worked perfectly. Here is the data collected:</p>
            
            <div className="bg-black/50 rounded-2xl p-4 text-left font-mono text-sm border border-zinc-800 mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-500">Role:</span>
                <span className="text-white">{completedData.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Source:</span>
                <span className="text-white">{completedData.source}</span>
              </div>
            </div>

            <button 
              onClick={() => setCompletedData(null)}
              className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors"
            >
              Restart Test
            </button>
          </motion.div>
        </div>
      )}
    </main>
  );
}
