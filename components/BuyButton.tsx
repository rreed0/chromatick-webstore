"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

type BuyButtonProps = {
  productId: string;
  label?: string;
};

export function BuyButton({ productId, label = "Add to cart" }: BuyButtonProps) {
  const { addItem } = useCart();
  const [wasAdded, setWasAdded] = useState(false);

  function handleClick() {
    addItem(productId, 1);
    setWasAdded(true);
    window.setTimeout(() => setWasAdded(false), 1500);
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        className="w-full rounded-2xl bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90"
        onClick={handleClick}
      >
        {wasAdded ? "Added to cart" : label}
      </button>
      <Link
        href="/cart"
        className="w-full rounded-2xl border border-foreground/15 px-5 py-3 text-center text-sm font-medium text-foreground hover:border-foreground/30"
      >
        View cart
      </Link>
    </div>
  );
}
