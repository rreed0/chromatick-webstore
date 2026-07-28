"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";

export function CartButton() {
  const { itemCount } = useCart();

  return (
    <Button asChild variant="outline" className="h-9 px-4 text-[11px]">
      <Link href="/cart">
        <span className="inline-grid grid-cols-[auto_auto] items-center justify-center gap-2 text-center tracking-normal">
          <span className="grid place-items-center leading-none">Cart</span>
          <span className="grid size-[18px] place-items-center rounded-full bg-[var(--accent-green)]/10 text-[10px] leading-none font-mono tabular-nums text-[var(--accent-green)]">
            {itemCount}
          </span>
        </span>
      </Link>
    </Button>
  );
}
