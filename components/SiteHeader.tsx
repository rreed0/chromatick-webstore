import Link from "next/link";
import { CartButton } from "@/components/CartButton";

type SiteHeaderProps = {
  showAboutLink?: boolean;
};

export function SiteHeader({ showAboutLink = false }: SiteHeaderProps) {
  return (
    <header className="relative left-1/2 z-40 mb-6 w-screen -translate-x-1/2 border-b border-[var(--color-border-subtle)]/80 bg-[rgba(5,5,6,0.96)] px-3 py-2 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border-subtle)] bg-[rgba(16,16,17,0.96)] text-[11px] font-mono font-semibold tracking-[0.18em] text-[var(--color-accent)]">
            CT
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Chromatick
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[rgba(148,163,184,0.95)]">
              Custom Digital Casio Mods
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 text-[10px] hover:bg-[rgba(22,22,24,0.96)] hover:text-[var(--color-accent)]"
          >
            Shop
          </Link>
          {showAboutLink ? (
            <Link
              href="/#about"
              className="hidden rounded-full px-3 py-1.5 text-[10px] hover:bg-[rgba(22,22,24,0.96)] hover:text-[var(--color-accent)] md:inline-flex"
            >
              About
            </Link>
          ) : null}
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
