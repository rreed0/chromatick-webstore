import { notFound } from "next/navigation";
import { BuyButton } from "@/components/BuyButton";
import { ProductGallery } from "@/components/ProductGallery";
import { SiteHeader } from "@/components/SiteHeader";
import { getProductBySlug } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const galleryImages = product.images.length
    ? product.images
    : [product.thumbnail || "/images/placeholder.svg"];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader showAboutLink />

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-start">
          <ProductGallery key={product.slug} name={product.name} images={galleryImages} />

          <div>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-foreground/65">
              {product.short}
            </p>

            <div className="mt-6 flex items-end gap-4">
              <div className="text-2xl font-semibold tracking-tight">
                {product.priceDisplay}
              </div>
              <div className="pb-1 text-sm text-foreground/60">
                Made-to-order &middot; Ships in 2-5 business days
              </div>
            </div>

            <BuyButton productId={product.id} />

            <div className="mt-10 grid gap-3 text-sm text-foreground/65">
              <div className="flex items-start gap-3">
                <span className="mt-[7px] size-1.5 rounded-full bg-foreground/30" />
                <span>Custom-modified and assembled after purchase</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-[7px] size-1.5 rounded-full bg-foreground/30" />
                <span>Inspected by hand before shipping</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-[7px] size-1.5 rounded-full bg-foreground/30" />
                <span>Not affiliated with Casio</span>
              </div>
            </div>

            <div className="mt-10 divide-y divide-foreground/10 rounded-[28px] border border-foreground/10">
              <details className="group p-6" open>
                <summary className="cursor-pointer list-none text-sm font-semibold">
                  Details
                  <span className="float-right text-foreground/40 group-open:rotate-180">
                    &#9662;
                  </span>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-foreground/65">
                  <ul className="list-disc space-y-1 pl-5">
                    {product.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="group p-6">
                <summary className="cursor-pointer list-none text-sm font-semibold">
                  Shipping &amp; Returns
                  <span className="float-right text-foreground/40 group-open:rotate-180">
                    &#9662;
                  </span>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-foreground/65">
                <p>&#9662; Ships in 2-5 business days</p>
                <p>&#9662; Free domestic shipping</p>
                <p>&#9662; Shipping addresses must be within the United States</p>
                <p>&#9662; Buyer is responsible for return shipping costs and any loss
                in value if an item is not returned in original condition</p>
                </div>
              </details>

              <details className="group p-6">
                <summary className="cursor-pointer list-none text-sm font-semibold">
                  Disclaimer
                  <span className="float-right text-foreground/40 group-open:rotate-180">
                    &#9662;
                  </span>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-foreground/65">
                  Not affiliated with Casio. Watches are custom-modified by
                  Chromatick.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

