import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

// Lazy proxy so the Stripe client isn't instantiated at import time (build time)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stripe: Stripe = new Proxy({} as any, {
  get(_, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getStripe() as any)[prop];
  },
});
