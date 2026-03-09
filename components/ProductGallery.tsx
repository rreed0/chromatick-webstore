"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images.length) return null;

  const selectedImage = images[selectedIndex] ?? images[0];

  return (
    <div className="grid gap-4 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start">
      {images.length > 1 && (
        <div className="order-2 flex gap-2 overflow-x-auto pb-2 md:order-1 md:max-h-[36rem] md:flex-col md:overflow-x-hidden md:overflow-y-auto md:pb-0 md:pr-1">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition md:h-24 md:w-24 ${
                i === selectedIndex
                  ? "border-foreground/40 ring-1 ring-foreground/20"
                  : "border-foreground/10 hover:border-foreground/20"
              }`}
              aria-label={`Show ${name} image ${i + 1}`}
              aria-current={i === selectedIndex}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                width={200}
                height={200}
                className="h-full w-full object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      <div className="order-1 overflow-hidden rounded-[28px] border border-foreground/10 bg-foreground/[0.04] md:order-2">
        <div className="aspect-square">
          <Image
            src={selectedImage}
            alt={name}
            width={1400}
            height={1400}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
