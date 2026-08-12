export type Product = {
  id: string;
  slug: string;
  name: string;
  unitAmount: number;
  priceDisplay: string;
  stripePriceId: string;
  short: string;
  details: string[];
  thumbnail: string;
  images: string[];
};

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

function createProduct(product: Omit<Product, "priceDisplay">): Product {
  return {
    ...product,
    priceDisplay: formatUsd(product.unitAmount),
  };
}

export const products: Product[] = [
  createProduct({
    id: "p_lf20wg",
    slug: "lf-20w-green",
    name: "Radar Green — LF-20W",
    unitAmount: 7900,
    stripePriceId: "price_1T9DZJC43iSsvnqNp1zivn6z",
    short: "Inspired by vintage radar screens and green phosphor CRT displays.",
    details: [
      "All-black LF-20W base",
      "Always-on green tinted display",
      "World time, alarms, stopwatch, timer, LED backlight",
      "Lightweight resin case and strap",
    ],
    thumbnail: "/images/lf20wg/lf20wg-thumbnail.JPG",
    images: [
      "/images/lf20wg/lf20wg-thumbnail.JPG",
      "/images/lf20wg/lf20wg-1.JPG",
      "/images/lf20wg/lf20wg-2.jpg",
      "/images/lf20wg/lf20wg-3.JPG",
      "/images/lf20wg/lf20wg-4.JPG",
      "/images/lf20wg/lf20wg-5.JPG",
      "/images/lf20wg/lf20wg-6.JPG",
    ],
  }),
  createProduct({
    id: "p_f91wg",
    slug: "f91w-green",
    name: "Radar Green — F-91W",
    unitAmount: 7900,
    stripePriceId: "price_1Td0oCC43iSsvnqNWCF1xDhX",
    short: "Inspired by vintage radar screens and green phosphor CRT displays.",
    details: [
      "All-black F-91W base",
      "Always-on green tinted display",
      "Stopwatch, alarm, LED backlight",
      "Lightweight resin case and strap",
    ],
    thumbnail: "/images/f91wg/f91wg-thumbnail.JPG",
    images: [
      "/images/f91wg/f91wg-thumbnail.JPG",
      "/images/f91wg/f91wg-1.jpg",
      "/images/f91wg/f91wg-2.JPG",
      "/images/f91wg/f91wg-3.JPG",
      "/images/f91wg/f91wg-4.JPG",
      "/images/f91wg/f91wg-5.JPG",
    ],
  }),
  createProduct({
    id: "p_lf20wr",
    slug: "lf-20w-red",
    name: "Infrared — LF-20W",
    unitAmount: 7900,
    stripePriceId: "price_1Td0qMC43iSsvnqNp3UgPPkm",
    short: "Inspired by red LED displays and digital instrumentation.",
    details: [
      "All-black LF-20W base",
      "Always-on red tinted display",
      "World time, alarms, stopwatch, timer, LED backlight",
      "Lightweight resin case and strap",
    ],
    thumbnail: "/images/lf20wr/lf20wr-thumbnail.JPG",
    images: [
      "/images/lf20wr/lf20wr-thumbnail.JPG",
      "/images/lf20wr/lf20wr-1.JPG",
      "/images/lf20wr/lf20wr-2.JPG",
      "/images/lf20wr/lf20wr-3.JPG",
      "/images/lf20wr/lf20wr-4.JPG",
      "/images/lf20wr/lf20wr-5.JPG",
      "/images/lf20wr/lf20wr-6.JPG",
      "/images/lf20wr/lf20wr-7.JPG",
    ],
  }),
  createProduct({
    id: "p_f91wr",
    slug: "f91w-red",
    name: "Infrared — F-91W",
    unitAmount: 7900,
    stripePriceId: "price_1Td0t1C43iSsvnqNSAyInIbc",
    short: "Inspired by red LED displays and digital instrumentation.",
    details: [
      "All-black F-91W base",
      "Always-on red tinted display",
      "Stopwatch, alarm, LED backlight",
      "Lightweight resin case and strap",
    ],
    thumbnail: "/images/f91wr/f91wr-thumbnail.JPG",
    images: [
      "/images/f91wr/f91wr-thumbnail.JPG",
      "/images/f91wr/f91wr-1.JPG",
      "/images/f91wr/f91wr-2.JPG",
      "/images/f91wr/f91wr-3.JPG",
      "/images/f91wr/f91wr-4.JPG",
      "/images/f91wr/f91wr-5.JPG",
      "/images/f91wr/f91wr-6.JPG",
      "/images/f91wr/f91wr-7.JPG",
    ],
  }),
  createProduct({
    id: "p_f91wa",
    slug: "f91w-amber",
    name: "Vintage Amber — F-91W",
    unitAmount: 7900,
    stripePriceId: "price_1Td0tbC43iSsvnqNwUHDUL6q",
    short: "Inspired by early computer terminals.",
    details: [
      "All-black F-91W base",
      "Always-on amber tinted display",
      "Stopwatch, alarm, LED backlight",
      "Lightweight resin case and strap",
    ],
    thumbnail: "/images/f91wa/f91w-thumbnail.JPG",
    images: [
      "/images/f91wa/f91w-thumbnail.JPG",
      "/images/f91wa/f91w-1.JPG",
      "/images/f91wa/f91w-2.JPG",
      "/images/f91wa/f91w-3.JPG",
      "/images/f91wa/f91w-4.JPG",
    ],
  }),
];

export const productsById = Object.fromEntries(
  products.map((product) => [product.id, product]),
) as Record<string, Product>;

export const productsBySlug = Object.fromEntries(
  products.map((product) => [product.slug, product]),
) as Record<string, Product>;

export function getProductById(productId: string) {
  return productsById[productId];
}

export function getProductBySlug(slug: string) {
  return productsBySlug[slug];
}
  
