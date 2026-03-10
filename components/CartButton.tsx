"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="rounded-full border border-foreground/15 px-4 py-2 text-sm text-foreground/75 transition hover:border-foreground/30 hover:text-foreground"
    >
      Cart ({itemCount})
    </Link>
  );
}
