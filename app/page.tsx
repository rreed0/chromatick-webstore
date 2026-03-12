import Image from "next/image";
import Link from "next/link";
import { HeroWatchShowcase } from "@/components/HeroWatchShowcase";
import { ScrollingBanner } from "@/components/ScrollingBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { getAccentForProductId } from "@/lib/accent-colors";
import { products } from "@/lib/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <SiteHeader showAboutLink />

      <div className="space-y-10 pb-10 pt-4 md:space-y-12 md:pb-14">
        <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Retro digital Casios,
              <span className="block text-[var(--accent-green)]">
                rebuilt for the present.
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-[var(--accent-muted)] md:text-base">
              Chromatick takes classic LF‑20W and F‑91W cases and rebuilds them
              with new colors, displays, and finishing, then hand-assembles
              every piece after you order.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-10 px-5 text-xs md:text-sm">
                <Link href="#catalog">Browse the catalog</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-10 px-4 text-[11px] md:text-xs"
              >
                <Link href="#about">How the mods are built</Link>
              </Button>
            </div>
            <ScrollingBanner
              items={[
                "HAND-ASSEMBLED",
                "MADE TO ORDER",
                "FREE US SHIPPING",
                "EVERYDAY-READY BUILDS",
              ]}
            />
          </div>

          <Card className="relative overflow-hidden">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--accent-muted)]">
                <span>Featured Watches</span>
                <span className="text-[var(--accent-green)]">Auto Showcase</span>
              </div>
              <HeroWatchShowcase />
            </CardContent>
          </Card>
        </section>

        <section id="catalog" className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
                Catalog
              </h2>
              <p className="mt-2 text-sm text-[var(--accent-muted)]">
                LF‑20W and F‑91W builds in three color systems.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => {
              const accent = getAccentForProductId(p.id);
              return (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className={`group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--card-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] product-card-accent-${accent}`}
                >
                  <Card className={`product-card product-card-accent-${accent} relative h-full overflow-hidden border-[var(--border-subtle)] bg-[rgba(9,9,10,0.96)] transition-all duration-300 hover:-translate-y-1.5`}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-[rgba(14,14,15,0.96)]">
                      <Image
                        src={p.thumbnail}
                        alt={`${p.name} thumbnail`}
                        fill
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.08] group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                    <CardContent className="space-y-3 p-4 sm:p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold tracking-tight text-[var(--foreground)]">
                          {p.name}
                        </h3>
                        <span
                          className="text-sm font-medium tabular-nums"
                          style={{ color: "#7ee787" }}
                        >
                          {p.priceDisplay}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--color-muted)]">
                        {p.short}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-muted)]">
                          View build
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.07] group-hover:translate-x-0.5">
                          Details
                          <span
                            aria-hidden
                            className="text-white/55 transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section
          id="about"
          className="grid gap-6 rounded-[28px] border border-[var(--border-subtle)] bg-[rgba(7,7,8,0.96)] px-6 py-6 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:px-7 md:py-7"
        >
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
              About Chromatick
            </h2>
            <p className="text-sm leading-relaxed text-[var(--accent-muted)]">
              Subtext placeholder
            </p>
          </div>
          <div className="space-y-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--accent-muted)]">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[rgba(12,12,13,0.96)] px-4 py-3">
              <div className="mb-1 text-[10px] text-[var(--accent-green)]">
                Placeholder
              </div>
                <div>Placeholder</div>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[rgba(12,12,13,0.96)] px-4 py-3">
              <div className="mb-1 text-[10px] text-[var(--accent-green)]">
                Placeholder
              </div>
                <div>Placeholder</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


