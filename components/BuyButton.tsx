"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";

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
      <Button
        type="button"
        className="w-full rounded-2xl px-5 py-3"
        onClick={handleClick}
      >
        {wasAdded ? "Added to cart" : label}
      </Button>
      <Button asChild variant="outline" className="w-full rounded-2xl px-5 py-3">
        <Link href="/cart">View cart</Link>
      </Button>
    </div>
  );
}
