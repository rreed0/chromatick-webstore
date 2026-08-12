# Chromatick

Chromatick is a full-stack e-commerce storefront for custom-modified Casio watches.

## Overview

Chromatick combines a product-focused shopping experience with a production-ready checkout and order-processing backend.

Customers can browse custom watch colorways, manage a cart, and complete purchases through Stripe Checkout. Orders are stored in PostgreSQL via Prisma and synchronized with Stripe through signed webhook events.

## Features

- Responsive product catalog and product pages
- Client-side shopping cart
- Stripe-hosted Checkout
- Live payment processing
- Stripe webhook verification
- PostgreSQL order persistence
- Prisma ORM and migrations
- Server-controlled product pricing
- Separate Stripe test and production environments
- US-only shipping
- Checkout success and cancellation flows
- Vercel deployment

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion
- Prisma ORM
- PostgreSQL / Prisma Postgres
- Stripe Checkout
- Stripe Webhooks
- Vercel

## Architecture

    Customer
       |
       v
    Next.js Storefront
       |
       +----> Prisma ----> PostgreSQL
       |
       +----> Stripe Checkout
                  |
                  v
               Payment
                  |
                  v
            Stripe Webhook
                  |
                  v
            Order Update

Checkout creates a `PENDING` order before redirecting the customer to Stripe. Webhook events then update the order based on the resulting payment state.

## Order States

    PENDING
    PAID
    EXPIRED
    FAILED
    REFUNDED

A successful order follows:

    PENDING -> PAID

## Environment Variables

Create a `.env` file for local development:

    DATABASE_URL="your_postgres_connection_string"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"

    STRIPE_SECRET_KEY="sk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."

    STRIPE_PRICE_LF20W_GREEN="price_..."
    STRIPE_PRICE_F91W_GREEN="price_..."
    STRIPE_PRICE_LF20W_RED="price_..."
    STRIPE_PRICE_F91W_RED="price_..."
    STRIPE_PRICE_F91W_AMBER="price_..."

Local development uses Stripe test credentials and test Price IDs. Production uses separate live credentials and live Price IDs configured in Vercel.

## Local Development

Install dependencies:

    npm install

Generate the Prisma client:

    npx prisma generate

Apply migrations:

    npx prisma migrate dev

Start the development server:

    npm run dev

The app will be available at:

    http://localhost:3000

## Stripe Webhooks

For local webhook testing:

    stripe listen --forward-to localhost:3000/api/stripe/webhook

Add the generated signing secret to:

    STRIPE_WEBHOOK_SECRET="whsec_..."

The webhook handles:

    checkout.session.completed
    checkout.session.async_payment_succeeded
    checkout.session.expired
    payment_intent.payment_failed
    charge.refunded

## Database

The application uses PostgreSQL hosted with Prisma Postgres.

Primary models:

- `Order`
- `OrderItem`

Inspect the database with:

    npx prisma studio

Orders store payment status, totals, customer email, shipping information, Stripe identifiers, and purchased line items.

## Payment Flow

    Cart
      |
      v
    POST /api/checkout
      |
      v
    Create PENDING Order
      |
      v
    Create Stripe Checkout Session
      |
      v
    Customer Pays
      |
      v
    Stripe Webhook
      |
      v
    Update Order to PAID

Product pricing is resolved on the server rather than trusted from the browser.

Stripe Price IDs are supplied through environment variables, allowing local development to remain in test mode while production uses live Stripe objects.

## Deployment

Chromatick is deployed on Vercel with:

- Prisma Postgres
- Stripe live-mode credentials
- Production webhook configuration
- Environment-specific Stripe Price IDs

Database schema changes are tracked with Prisma migrations.

## Project Status

The core commerce flow is operational end to end:

    Storefront
      -> Cart
      -> Checkout
      -> Stripe Payment
      -> Webhook
      -> PostgreSQL Order Update

Planned improvements include merchant order notifications, customer confirmation emails, and expanded order-management tooling.
