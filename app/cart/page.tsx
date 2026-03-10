import { CartPageClient } from "@/components/CartPageClient";
import { SiteHeader } from "@/components/SiteHeader";

export default function CartPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <CartPageClient />
    </main>
  );
}
