# Chromatick

Chromatick is a modern e-commerce storefront for custom-modified Casio watches.

## Overview

The storefront is designed to feel premium and product-focused on the frontend while remaining practical to operate as a small made-to-order business. The current implementation includes a curated product catalog, animated merchandising on the homepage, a cart and checkout flow, and order persistence backed by Stripe and Prisma.

## Current Status

- Stripe is currently configured in test mode, so live purchases are not yet enabled.
- Frontend and backend are still in progress.
- The current codebase represents an active development build rather than a production launch state.

## Features

- Product catalog and product detail pages
- Animated homepage showcase with dynamic accent theming
- Client-side shopping cart
- Hosted Stripe Checkout
- Stripe webhook handling for payment status updates
- Order persistence with Prisma and SQLite
- US-only shipping restriction in checkout
- Made-to-order storefront copy and small-brand presentation

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion / Motion
- Prisma ORM
- SQLite
- Stripe Checkout + webhooks

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the required variables:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
```

3. Generate the Prisma client:

```bash
npm run prisma:generate
```

4. Push the database schema:

```bash
npm run prisma:push
```

5. Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Local Stripe Webhooks

Use the Stripe CLI to forward events to the local webhook endpoint:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret from the Stripe CLI output into `STRIPE_WEBHOOK_SECRET`.

## Data Model

Orders are stored as guest checkouts and include:

- order status
- pricing totals
- shipping details
- Stripe checkout/payment identifiers
- individual line items

## Implementation Notes

- Pricing is trusted from the server-side catalog rather than the browser cart payload.
- Checkout currently accepts only United States shipping addresses.
- Order records are updated from Stripe webhook events after checkout completes.
- Stripe Checkout is integrated, but real transactions are not available until live mode is configured.


