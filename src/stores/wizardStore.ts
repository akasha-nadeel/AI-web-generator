import { create } from "zustand";
import type { ModelKey } from "@/lib/constants";

interface WizardState {
  step: number;
  businessName: string;
  industry: string;
  description: string;
  inspirationImages: string[];
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
  };
  fontStyle: string;
  overallFeel: string;
  selectedPages: string[];
  modelKey: ModelKey;
  isGenerating: boolean;

  setStep: (step: number) => void;
  setBusinessInfo: (name: string, industry: string, description: string) => void;
  addInspirationImage: (url: string) => void;
  removeInspirationImage: (url: string) => void;
  setColorPalette: (palette: WizardState["colorPalette"]) => void;
  setFontStyle: (style: string) => void;
  setOverallFeel: (feel: string) => void;
  setSelectedPages: (pages: string[]) => void;
  togglePage: (page: string) => void;
  setModelKey: (key: ModelKey) => void;
  setIsGenerating: (generating: boolean) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  businessName: "",
  industry: "",
  description: "",
  inspirationImages: [],
  colorPalette: {
    primary: "#7c3aed",
    secondary: "#4c1d95",
    accent: "#a78bfa",
    bg: "#0f0f23",
    text: "#eef2ff",
  },
  fontStyle: "modern",
  overallFeel: "minimal",
  selectedPages: ["Home"],
  modelKey: "haiku" as ModelKey,
  isGenerating: false,
};

export const useWizardStore = create<WizardState>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  setBusinessInfo: (businessName, industry, description) =>
    set({ businessName, industry, description }),

  addInspirationImage: (url) =>
    set((state) => ({
      inspirationImages: [...state.inspirationImages, url],
    })),

  removeInspirationImage: (url) =>
    set((state) => ({
      inspirationImages: state.inspirationImages.filter((img) => img !== url),
    })),

  setColorPalette: (colorPalette) => set({ colorPalette }),

  setFontStyle: (fontStyle) => set({ fontStyle }),

  setOverallFeel: (overallFeel) => set({ overallFeel }),

  setSelectedPages: (selectedPages) => set({ selectedPages }),

  togglePage: (page) =>
    set((state) => ({
      selectedPages: state.selectedPages.includes(page)
        ? state.selectedPages.filter((p) => p !== page)
        : [...state.selectedPages, page],
    })),

  setModelKey: (modelKey) => set({ modelKey }),

  setIsGenerating: (isGenerating) => set({ isGenerating }),

  reset: () => set(initialState),
}));
