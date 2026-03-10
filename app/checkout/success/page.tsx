import { CheckoutSuccessContent } from "@/components/CheckoutSuccessContent";
import { SiteHeader } from "@/components/SiteHeader";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <CheckoutSuccessContent />
    </main>
  );
}
