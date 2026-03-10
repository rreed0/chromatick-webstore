import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-[28px] border border-foreground/10 px-8 py-12 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Checkout canceled</h1>
          <p className="mt-4 text-sm leading-relaxed text-foreground/65">
            Your cart is still saved locally, so you can come back and check out
            when you are ready.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/cart"
              className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
            >
              Return to cart
            </Link>
            <Link
              href="/"
              className="rounded-full border border-foreground/15 px-5 py-3 text-sm font-medium"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
