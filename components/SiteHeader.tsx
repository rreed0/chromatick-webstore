import Link from "next/link";
import Image from "next/image";
import { CartButton } from "@/components/CartButton";
import { SmoothAnchorLink } from "@/components/SmoothAnchorLink";

export function SiteHeader() {
  return (
    <header className="relative left-1/2 z-40 mb-6 w-screen -translate-x-1/2 border-b border-[var(--color-border-subtle)]/80 bg-[rgba(5,5,6,0.96)] px-3 py-2 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/chromatick-logo-removebg-preview.png"
            alt="Chromatick logo"
            width={86}
            height={56}
            className="object-contain"
            priority
          />
        </Link>

        <nav className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <SmoothAnchorLink
            href="/#catalog"
            className="rounded-full px-3.5 py-2 text-[11px] hover:bg-[rgba(22,22,24,0.96)] hover:text-[var(--color-accent)]"
          >
            Watches
          </SmoothAnchorLink>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
