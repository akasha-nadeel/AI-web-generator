"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useWizardStore } from "@/stores/wizardStore";
import { WizardShell } from "@/components/wizard/WizardShell";
import { StepBusinessInfo } from "@/components/wizard/StepBusinessInfo";
import { StepInspiration } from "@/components/wizard/StepInspiration";
import { StepStylePreferences } from "@/components/wizard/StepStylePreferences";
import { StepPageSelection } from "@/components/wizard/StepPageSelection";

function WizardContent() {
  const searchParams = useSearchParams();
  const { step, industry, setBusinessInfo } = useWizardStore();

  // Pre-populate industry from URL param (e.g., /wizard?industry=restaurant)
  useEffect(() => {
    const industryParam = searchParams.get("industry");
    if (industryParam && !industry) {
      setBusinessInfo("", industryParam, "");
    }
  }, [searchParams, industry, setBusinessInfo]);

  return (
    <WizardShell>
      {step === 1 && <StepBusinessInfo />}
      {step === 2 && <StepInspiration />}
      {step === 3 && <StepStylePreferences />}
      {step === 4 && <StepPageSelection />}
    </WizardShell>
  );
}

export default function WizardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      }>
        <WizardContent />
      </Suspense>
    </div>
  );
}
