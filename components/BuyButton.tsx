"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

type BuyButtonProps = {
  productId: string;
  label?: string;
};

export function BuyButton({ productId, label = "Add to cart" }: BuyButtonProps) {
  const { addItem } = useCart();
  const [wasAdded, setWasAdded] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  function handleClick() {
    addItem(productId, 1);
    setWasAdded(true);
    setAnimationKey((current) => current + 1);

    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setWasAdded(false);
    }, 1500);
  }

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:items-start">
      <div className="space-y-3">
        <Button
          type="button"
          className={cn(
            "group relative w-full overflow-hidden rounded-2xl px-5 py-3 active:scale-[0.98]",
            wasAdded && "animate-cart-button-success",
          )}
          onClick={handleClick}
        >
          {wasAdded ? (
            <span
              key={`spark-${animationKey}`}
              className="pointer-events-none absolute inset-0 animate-cart-button-sheen bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.34)_45%,transparent_72%)]"
              aria-hidden
            />
          ) : null}
          <span className="relative inline-grid h-5 place-items-center overflow-hidden">
            <span
              className={cn(
                "col-start-1 row-start-1 transition duration-200",
                wasAdded
                  ? "-translate-y-5 opacity-0"
                  : "translate-y-0 opacity-100",
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "col-start-1 row-start-1 transition duration-200",
                wasAdded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0",
              )}
            >
              Added to cart
            </span>
          </span>
        </Button>
        <div
          key={`confirm-${animationKey}`}
          className={cn(
            "min-h-5 text-center text-xs font-medium text-[var(--accent-green)]",
            wasAdded && "animate-cart-confirmation",
          )}
          aria-live="polite"
        >
          {wasAdded ? "Your cart has been updated." : ""}
        </div>
      </div>
      <Button
        asChild
        variant="outline"
        className="w-full rounded-2xl px-5 py-3"
      >
        <Link href="/cart">View cart</Link>
      </Button>
    </div>
  );
}
