# Chromatick Webstore

This storefront now includes:

- a client-side cart
- hosted Stripe Checkout
- free US-only shipping in Checkout
- Prisma with SQLite order storage
- Stripe webhook handling for payment status updates

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
3. Replace the placeholder `stripePriceId` values in `lib/products.ts` with real Stripe Price IDs from your Stripe dashboard.
4. Run `npm run prisma:generate`.
5. Run `npm run prisma:push`.
6. Start the app with `npm run dev`.

## Local Stripe Webhooks

Run the Stripe CLI in another terminal:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Use the webhook signing secret from that command for `STRIPE_WEBHOOK_SECRET`.

## Notes

- Prices are trusted from the server-side product catalog, not from the browser cart payload.
- Orders are stored as guest checkouts in SQLite.
- Checkout currently accepts only US shipping addresses.
