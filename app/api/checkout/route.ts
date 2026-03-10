import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeCartItems, type CartItemInput } from "@/lib/cart";
import { getProductById } from "@/lib/products";
import { getStripeServer } from "@/lib/stripe";

function getBaseUrl(request: Request) {
  return process.env.NEXT_PUBLIC_APP_URL ?? request.headers.get("origin") ?? "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { items?: CartItemInput[] };
    const cartItems = sanitizeCartItems(body.items ?? []);

    if (!cartItems.length) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const orderItems = cartItems.map((item) => {
      const product = getProductById(item.productId);
      if (!product) {
        throw new Error("One of the selected products is no longer available.");
      }

      if (!product.stripePriceId) {
        throw new Error(`Missing Stripe price for ${product.name}.`);
      }

      return {
        product,
        quantity: item.quantity,
        lineTotal: product.unitAmount * item.quantity,
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const baseUrl = getBaseUrl(request);

    if (!baseUrl) {
      throw new Error("Missing NEXT_PUBLIC_APP_URL or request origin.");
    }

    const order = await prisma.order.create({
      data: {
        currency: "usd",
        amountSubtotal: subtotal,
        amountShipping: 0,
        amountTotal: subtotal,
        items: {
          create: orderItems.map((item) => ({
            productId: item.product.id,
            productSlug: item.product.slug,
            productName: item.product.name,
            quantity: item.quantity,
            unitAmount: item.product.unitAmount,
            stripePriceId: item.product.stripePriceId,
          })),
        },
      },
    });

    try {
      const stripe = getStripeServer();
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free US shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 2,
                },
                maximum: {
                  unit: "business_day",
                  value: 5,
                },
              },
            },
          },
        ],
        line_items: orderItems.map((item) => ({
          price: item.product.stripePriceId,
          quantity: item.quantity,
        })),
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout/cancel`,
        client_reference_id: order.id,
        metadata: {
          orderId: order.id,
        },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: {
          stripeCheckoutSessionId: session.id,
        },
      });

      return NextResponse.json({ url: session.url });
    } catch (error) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "FAILED",
        },
      });

      throw error;
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create checkout session.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
