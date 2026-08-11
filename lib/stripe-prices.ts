import "server-only";

const stripePrices: Record<string, string | undefined> = {
  p_lf20wg: process.env.STRIPE_PRICE_LF20W_GREEN,
  p_f91wg: process.env.STRIPE_PRICE_F91W_GREEN,
  p_lf20wr: process.env.STRIPE_PRICE_LF20W_RED,
  p_f91wr: process.env.STRIPE_PRICE_F91W_RED,
  p_f91wa: process.env.STRIPE_PRICE_F91W_AMBER,
};

export function getStripePriceId(productId: string) {
  const priceId = stripePrices[productId];

  if (!priceId) {
    throw new Error(`Missing Stripe price ID for product ${productId}.`);
  }

  return priceId;
}