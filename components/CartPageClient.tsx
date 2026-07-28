"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";
import { productsById } from "@/lib/products";

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

export function CartPageClient() {
  const { items, removeItem, setQuantity } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cartItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = productsById[item.productId];
          if (!product) return null;

          return {
            ...item,
            product,
            lineTotal: product.unitAmount * item.quantity,
          };
        })
        .filter((item) => item !== null),
    [items],
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  async function handleCheckout() {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const payload = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Unable to start checkout.");
      }

      window.location.href = payload.url;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to start checkout.",
      );
      setIsSubmitting(false);
    }
  }

  if (!cartItems.length) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-[28px] border border-foreground/10 px-8 py-12 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Your cart is empty</h1>
          <p className="mt-4 text-sm text-foreground/65">
            Add a watch from the shop to start checkout.
          </p>
          <Button asChild variant="secondary" className="mt-6 px-5 py-3">
            <Link href="/#catalog">Continue shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="grid gap-4 rounded-[28px] border border-foreground/10 p-4 md:grid-cols-[7rem_minmax(0,1fr)_auto]"
          >
            <div className="overflow-hidden rounded-2xl bg-foreground/[0.04]">
              <Image
                src={item.product.thumbnail}
                alt={item.product.name}
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <Link
                href={`/product/${item.product.slug}`}
                className="text-lg font-semibold tracking-tight hover:underline"
              >
                {item.product.name}
              </Link>
              <p className="mt-2 text-sm text-foreground/60">{item.product.short}</p>
              <p className="mt-12 text-sm text-foreground/60">
                {item.product.priceDisplay} each
              </p>
            </div>
            <div className="flex h-full flex-col items-end justify-between gap-3">
              <label className="text-sm text-foreground/60">
                Qty
                <select
                  value={item.quantity}
                  onChange={(event) =>
                    setQuantity(item.product.id, Number(event.target.value))
                  }
                  className="ml-3 rounded-full border border-foreground/15 bg-[var(--surface-elevated)] px-3 py-2 text-sm text-foreground outline-none transition hover:border-foreground/25 focus:border-foreground/25 focus:ring-0"
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                    <option
                      key={value}
                      value={value}
                      className="bg-[var(--surface-elevated)] text-foreground"
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => removeItem(item.product.id)}
                aria-label={`Remove ${item.product.name} from cart`}
                title="Remove"
                className="grid size-10 place-items-center rounded-full border border-red-400/40 bg-red-600 text-white shadow-[0_8px_18px_rgba(220,38,38,0.28)] transition duration-300 hover:-translate-y-0.3 hover:border-red-300/70 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v5" />
                  <path d="M14 11v5" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-[28px] border border-foreground/10 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Summary</h2>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-foreground/65">Subtotal</span>
            <span>{formatUsd(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground/65">Shipping</span>
            <span className="text-[#7ee787]">Free</span>
          </div>
          <div className="flex items-center justify-between border-t border-foreground/10 pt-3 text-base font-semibold">
            <span>Total</span>
            <span>{formatUsd(subtotal)}</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-foreground/60">
          US shipping addresses only.
        </p>

        {errorMessage ? (
          <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
        ) : null}

        <Button
          type="button"
          variant="secondary"
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="mt-6 w-full border-blue-500/70 bg-blue-600 px-5 py-3 text-white shadow-[0_10px_22px_rgba(37,99,235,0.35)] hover:border-blue-400 hover:bg-blue-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Redirecting..." : "Checkout"}
        </Button>
      </aside>
    </section>
  );
}
