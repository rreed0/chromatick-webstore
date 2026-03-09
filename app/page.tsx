import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold tracking-tight">Chromatick</div>
          <nav className="flex items-center gap-6 text-sm text-foreground/70">
            <Link href="/" className="hover:text-foreground">
              Shop
            </Link>
            <a href="#about" className="hover:text-foreground">
              About
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:pt-24">
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Digital, refined.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg">
          Handmade, custom-modified Casio watches.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-2 gap-6">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="group mx-auto w-full max-w-[24rem] overflow-hidden rounded-[28px] border border-foreground/10 bg-background/80 shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-foreground/[0.04]">
                <Image
                  src={p.thumbnail} 
                  alt={`${p.name} thumbnail`}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold tracking-tight">
                    {p.name}
                  </div>
                  <div className="text-sm text-foreground/60">
                    {p.priceDisplay}
                  </div>
                </div>
                <div className="mt-2 text-sm text-foreground/60 line-clamp-2">{p.short}</div>
                <div className="mt-3 text-sm text-foreground/60 group-hover:text-foreground">
                  View
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div id="about" className="mt-20 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/65">
            Chromatick builds small-run, custom-modified Casio watches. Each
            piece is assembled after purchase and inspected by hand.
          </p>
        </div>
      </section>
    </main>
  );
}


