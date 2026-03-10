import Link from "next/link";
import { CartButton } from "@/components/CartButton";

type SiteHeaderProps = {
  showAboutLink?: boolean;
};

export function SiteHeader({ showAboutLink = false }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Chromatick
        </Link>
        <nav className="flex items-center gap-3 text-sm text-foreground/70">
          <Link href="/" className="hover:text-foreground">
            Shop
          </Link>
          {showAboutLink ? (
            <Link href="/#about" className="hover:text-foreground">
              About
            </Link>
          ) : null}
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
