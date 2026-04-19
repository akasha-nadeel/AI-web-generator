import { create } from "zustand";

interface OutOfCreditsPayload {
  required: number;
  balance: number;
  model?: string;
}

interface CreditsState {
  balance: number | null;
  plan: string;
  hasEverPaid: boolean;
  outOfCredits: OutOfCreditsPayload | null;

  setBalance: (balance: number) => void;
  setPlan: (plan: string) => void;
  refresh: () => Promise<void>;
  openOutOfCredits: (payload: OutOfCreditsPayload) => void;
  closeOutOfCredits: () => void;
}

export const useCreditsStore = create<CreditsState>((set) => ({
  balance: null,
  plan: "free",
  hasEverPaid: false,
  outOfCredits: null,

  setBalance: (balance) => set({ balance }),
  setPlan: (plan) => set({ plan }),

  refresh: async () => {
    try {
      const res = await fetch("/api/credits/balance", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      set({
        balance: data.balance,
        plan: data.plan,
        hasEverPaid: data.hasEverPaid,
      });
    } catch {
      // ignore — counter stays stale rather than clobbering to null
    }
  },

  openOutOfCredits: (payload) => set({ outOfCredits: payload }),
  closeOutOfCredits: () => set({ outOfCredits: null }),
}));
