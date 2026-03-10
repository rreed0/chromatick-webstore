import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripeServer, getStripeWebhookSecret } from "@/lib/stripe";

function getOrderIdFromSession(session: Stripe.Checkout.Session) {
  const metadataOrderId = session.metadata?.orderId;

  if (metadataOrderId) return metadataOrderId;
  if (session.client_reference_id) return session.client_reference_id;

  return null;
}

async function updateOrderFromSession(
  session: Stripe.Checkout.Session,
  status: "PAID" | "EXPIRED",
) {
  const orderId = getOrderIdFromSession(session);
  const shippingDetails = session.collected_information?.shipping_details;
  const shipping = shippingDetails?.address;

  if (!orderId) {
    throw new Error("Missing order reference in Stripe session.");
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      stripeCustomerEmail: session.customer_details?.email ?? null,
      shippingCountry: shipping?.country ?? null,
      shippingName: shippingDetails?.name ?? null,
      shippingLine1: shipping?.line1 ?? null,
      shippingLine2: shipping?.line2 ?? null,
      shippingCity: shipping?.city ?? null,
      shippingState: shipping?.state ?? null,
      shippingPostalCode: shipping?.postal_code ?? null,
    },
  });
}

export async function POST(request: Request) {
  const stripe = getStripeServer();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  try {
    const payload = await request.text();
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      getStripeWebhookSecret(),
    );

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await updateOrderFromSession(
          event.data.object as Stripe.Checkout.Session,
          "PAID",
        );
        break;
      case "checkout.session.expired":
        await updateOrderFromSession(
          event.data.object as Stripe.Checkout.Session,
          "EXPIRED",
        );
        break;
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        await prisma.order.updateMany({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: { status: "FAILED" },
        });
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId =
          typeof charge.payment_intent === "string" ? charge.payment_intent : null;

        if (paymentIntentId) {
          await prisma.order.updateMany({
            where: { stripePaymentIntentId: paymentIntentId },
            data: { status: "REFUNDED" },
          });
        }
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to handle webhook.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
