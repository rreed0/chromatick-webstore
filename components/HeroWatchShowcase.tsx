"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccentColor } from "@/components/AccentColorProvider";
import type { AccentName } from "@/lib/accent-colors";
import { products } from "@/lib/products";

type ShowcaseItem = {
  id: string;
  name: string;
  priceDisplay: string;
  image: string;
  accent: AccentName;
};

/** Image keys to cycle through (e.g. "lf20wg-5"). Shown in random order. */
const SHOWCASE_IMAGE_KEYS = [
  "lf20wg-5",
  "lf20wg-3",
  "f91wg-1",
  "f91wg-2",
  "lf20wr-4",
  "lf20wr-7",
  "lf20wr-6",
  "lf20wr-3",
  "f91wr-5",
  "f91wr-6",
  "f91wr-7",
  "f91wr-4",
  "f91w-1",
  "f91w-4",
];

function imageKeyToPath(key: string): string {
  const [model, num] = key.split("-");
  const folder = model === "f91w" ? "f91wa" : model;
  const extension = key === "f91wg-1" ? "jpg" : "JPG";
  return `/images/${folder}/${model}-${num}.${extension}`;
}

function imageKeyToAccent(key: string): AccentName {
  const model = key.split("-")[0];
  if (model === "lf20wr" || model === "f91wr") return "red";
  if (model === "f91w") return "amber";
  return "green";
}

function imageKeyToProductId(key: string): string {
  const model = key.split("-")[0];
  if (model === "f91w") return "p_f91wa";
  return `p_${model}`;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildShowcaseItems(): ShowcaseItem[] {
  const productById = new Map(products.map((p) => [p.id, p]));
  return shuffle(SHOWCASE_IMAGE_KEYS).map((key, index) => {
    const productId = imageKeyToProductId(key);
    const product = productById.get(productId);
    return {
      id: `showcase-${key}-${index}`,
      name: product?.name ?? "Chromatick Watch",
      priceDisplay: product?.priceDisplay ?? "",
      image: imageKeyToPath(key),
      accent: imageKeyToAccent(key),
    };
  });
}

type HeroWatchShowcaseProps = {
  items?: ShowcaseItem[];
};

const AUTO_ADVANCE_MS = 6500;

export function HeroWatchShowcase({ items }: HeroWatchShowcaseProps) {
  const { setAccent } = useAccentColor();
  const internalItems = useMemo(() => buildShowcaseItems(), []);
  const showcaseItems = items !== undefined && items.length > 0 ? items : internalItems;

  const [activeIndex, setActiveIndex] = useState(0);
  const [countdownCycle, setCountdownCycle] = useState(0);
  const activeItem = showcaseItems[activeIndex] ?? showcaseItems[0];
  const hasMultipleItems = showcaseItems.length > 1;

  const showPreviousItem = useCallback(() => {
    if (!hasMultipleItems) return;

    setActiveIndex((current) =>
      current === 0 ? showcaseItems.length - 1 : current - 1,
    );
    setCountdownCycle((cycle) => cycle + 1);
  }, [hasMultipleItems, showcaseItems.length]);

  const showNextItem = useCallback(() => {
    if (!hasMultipleItems) return;

    setActiveIndex((current) => (current + 1) % showcaseItems.length);
    setCountdownCycle((cycle) => cycle + 1);
  }, [hasMultipleItems, showcaseItems.length]);

  function showItem(index: number) {
    setActiveIndex(index);
    setCountdownCycle((cycle) => cycle + 1);
  }

  useEffect(() => {
    setAccent(activeItem.accent);
  }, [activeItem.accent, setAccent]);

  useEffect(() => {
    if (!hasMultipleItems) return;

    const id = window.setTimeout(showNextItem, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(id);
  }, [countdownCycle, hasMultipleItems, showNextItem]);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[rgba(10,10,11,0.96)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeItem.image}
              alt={activeItem.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {hasMultipleItems ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
            <button
              type="button"
              onClick={showPreviousItem}
              aria-label="Show previous watch photo"
              className="pointer-events-auto grid size-10 place-items-center rounded-full border border-white/15 bg-black/45 text-white shadow-[0_10px_24px_rgba(0,0,0,0.45)] backdrop-blur transition duration-300 hover:-translate-x-0.5 hover:border-white/35 hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={showNextItem}
              aria-label="Show next watch photo"
              className="pointer-events-auto grid size-10 place-items-center rounded-full border border-white/15 bg-black/45 text-white shadow-[0_10px_24px_rgba(0,0,0,0.45)] backdrop-blur transition duration-300 hover:translate-x-0.5 hover:border-white/35 hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        ) : null}

        {hasMultipleItems ? (
          <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-black/45">
            <motion.div
              key={countdownCycle}
              className="h-full bg-[var(--color-accent)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: AUTO_ADVANCE_MS / 1000,
                ease: "linear",
              }}
            />
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-sm font-medium text-white">{activeItem.name}</div>
          <div className="text-xs text-white/75">{activeItem.priceDisplay}</div>
        </div>
      </div>

      {hasMultipleItems ? (
        <div className="flex items-center justify-center gap-2">
          {showcaseItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => showItem(index)}
              aria-label={`Show ${item.name}`}
              className={`h-1.5 w-6 rounded-full transition ${
                index === activeIndex
                  ? "bg-[var(--color-accent)]"
                  : "bg-[var(--color-border-subtle)] hover:bg-[var(--color-border-strong)]"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

