"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";

export function CartButton() {
  const { itemCount } = useCart();

  return (
    <Button asChild variant="outline" className="h-8 px-3 text-[10px]">
      <Link href="/cart">
        Cart
        <span className="ml-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent-green)]/10 text-[10px] font-mono text-[var(--accent-green)]">
          {itemCount}
        </span>
      </Link>
    </Button>
  );
}
