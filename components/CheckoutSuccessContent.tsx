"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";

export function CheckoutSuccessContent() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-[28px] border border-foreground/10 px-8 py-12 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Order received</h1>
        <p className="mt-4 text-sm leading-relaxed text-foreground/65">
          Thanks for your purchase. You will receive your receipt from Stripe, and
          your order has been recorded on the backend.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
          >
            Back to shop
          </Link>
          <Link
            href="/cart"
            className="rounded-full border border-foreground/15 px-5 py-3 text-sm font-medium"
          >
            View cart
          </Link>
        </div>
      </div>
    </section>
  );
}
