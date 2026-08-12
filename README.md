# Chromatick

Chromatick is a modern e-commerce storefront for custom-modified Casio watches.

## Overview

The storefront is designed to feel premium and product-focused on the frontend while remaining practical to operate as a small made-to-order business. The current implementation includes a curated product catalog, client-side cart, hosted Stripe checkout, and a server-side order record backed by Prisma.

## Current Status

- Stripe is configured in test mode by default; live purchases require switching Stripe to live mode and updating the keys.
- Frontend and backend are under active development.
- The codebase represents an active development build rather than a production launch state.

## Features

- Product catalog and product detail pages
- Animated homepage showcase with dynamic accent theming
- Client-side shopping cart
- Hosted Stripe Checkout
- Stripe webhook handling for payment status updates
- Order persistence with Prisma and PostgreSQL
- US-only shipping restriction in checkout
- Made-to-order storefront copy and small-brand presentation

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion / Motion
- Prisma ORM
- PostgreSQL (see `DATABASE_URL` in the .env example)
- Stripe Checkout + webhooks

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the required variables. This project uses Prisma with a PostgreSQL datasource by default — set `DATABASE_URL` to a PostgreSQL connection string (for local development you can use a local Postgres instance or Docker):

```env
# Example for a local Postgres instance
DATABASE_URL="postgresql://postgres:password@localhost:5432/chromatick_dev"

# Public URL used by Stripe for redirects in dev
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Stripe keys (use test keys while developing)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

If you prefer to use SQLite for quick prototypes, update `prisma/schema.prisma` datasource and the `DATABASE_URL` accordingly; the current schema is configured for PostgreSQL.

3. Generate the Prisma client:

```bash
npm run prisma:generate
```

4. Push the database schema (creates tables in the configured database):

```bash
npm run prisma:push
```

5. Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:3000.

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

The Prisma schema in `prisma/schema.prisma` models Order and OrderItem and is currently set up to use PostgreSQL.

## Implementation Notes

- Pricing is trusted from the server-side catalog rather than the browser cart payload.
- Checkout currently accepts only United States shipping addresses.
- Order records are updated from Stripe webhook events after checkout completes.
- Stripe Checkout is integrated in test mode by default; real transactions require switching to live mode and providing live Stripe keys.
