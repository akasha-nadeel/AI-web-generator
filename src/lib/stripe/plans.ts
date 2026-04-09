export const STRIPE_PLANS = {
  pro: {
    name: "Pro",
    priceId: process.env.STRIPE_PRO_PRICE_ID || "",
    credits: 50,
    sites: 5,
    price: 9,
  },
  business: {
    name: "Business",
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || "",
    credits: 150,
    sites: -1,
    price: 19,
  },
};
