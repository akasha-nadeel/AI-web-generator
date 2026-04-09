"use client";

import { useWizardStore } from "@/stores/wizardStore";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const steps = [
  { number: 1, label: "Business Info" },
  { number: 2, label: "Inspiration" },
  { number: 3, label: "Style" },
  { number: 4, label: "Pages" },
];

interface WizardShellProps {
  children: React.ReactNode;
}

export function WizardShell({ children }: WizardShellProps) {
  const { step } = useWizardStore();

  return (
    <div className="min-h-screen bg-background bg-gradient-mesh">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-12">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 md:mb-12">
          {steps.map((s, i) => (
            <div key={s.number} className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all",
                    step > s.number
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                      : step === s.number
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                      : "glass-card text-muted-foreground"
                  )}
                >
                  {step > s.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    s.number
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm hidden sm:block",
                    step >= s.number
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-6 sm:w-12 h-px",
                    step > s.number
                      ? "bg-gradient-to-r from-purple-500 to-blue-500"
                      : "bg-white/10"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="glass-panel p-4 sm:p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
