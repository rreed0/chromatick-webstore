// Product data type
export type Product = {
    id: string;
    slug: string;
    name: string;
    priceDisplay: string;
    stripePriceId: string; // placeholder for Stripe price ID
    short: string;
    details: string[];
    thumbnail: string;
    images: string[];
  };
  
  // Product list
  export const products: Product[] = [
    {
      id: "p_lf20wg",
      slug: "lf-20w-green",
      name: "LF-20W (Green)",
      priceDisplay: "$79",
      stripePriceId: "price_PLACEHOLDER_79",
      short: "A modern take on the classic Casio LF-20W, featuring a green color scheme.",
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
    },
    {
      id: "p_f91wg",
      slug: "f91w-green",
      name: "F91W (Green)",
      priceDisplay: "$79",
      stripePriceId: "price_PLACEHOLDER_79",
      short: "A modern take on the classic Casio F-91W, featuring a green color scheme.",
      details: [
        "All-black F91W base",
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
    },
    {
      id: "p_lf20wr",
      slug: "lf-20w-red",
      name: "LF-20W (Red)",
      priceDisplay: "$79",
      stripePriceId: "price_PLACEHOLDER_79",
      short: "A modern take on the classic Casio LF-20W, featuring a red color scheme.",
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
    },
    {
      id: "p_f91wr",
      slug: "f91w-red",
      name: "F91W (Red)",
      priceDisplay: "$79",
      stripePriceId: "price_PLACEHOLDER_79",
      short: "A modern take on the classic Casio F-91W, featuring a red color scheme.",
      details: [
        "All-black F91W base",
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
    },
    {
      id: "p_f91wa",
      slug: "f91w-amber",
      name: "F91W (Amber)",
      priceDisplay: "$79",
      stripePriceId: "price_PLACEHOLDER_79",
      short: "A modern take on the classic Casio F-91W, featuring an amber color scheme.",
      details: [
        "All-black F91W base",
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
    },
  ];
  
  // Product lookup by ID
  export const productsById = Object.fromEntries(products.map((p) => [p.id, p]));
  