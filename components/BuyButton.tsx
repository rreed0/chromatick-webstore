"use client";

export function BuyButton({ label = "Buy" }: { label?: string }) {
  return (
    <button
      className="mt-8 w-full rounded-2xl bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90"
      onClick={() => alert("Next step: Stripe Checkout")}
    >
      {label}
    </button>
  );
}
