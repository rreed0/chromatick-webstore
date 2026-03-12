"use client";

import { Fragment } from "react";

const DURATION = 28;

type ScrollingBannerProps = {
  items: string[];
};

export function ScrollingBanner({ items }: ScrollingBannerProps) {
  const copies = 4;

  return (
    <div className="relative mt-4 w-full overflow-hidden rounded-lg border border-[var(--color-border-subtle)]/60 bg-[rgba(255,255,255,0.02)] py-2.5">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scrolling-banner {
              0% { transform: translateX(0); }
              100% { transform: translateX(-${100 / copies}%); }
            }
            .scrolling-banner-track {
              animation: scrolling-banner ${DURATION}s linear infinite;
            }
          `,
        }}
      />
      <div className="scrolling-banner-track flex w-max items-center py-0.5" aria-hidden>
        {Array.from({ length: copies }, (_, chunkIndex) => (
          <span
            key={chunkIndex}
            className="flex shrink-0 items-center whitespace-nowrap text-[11px] font-medium tracking-[0.2em] text-[var(--color-muted)]"
          >
            {items.map((item, i) => (
              <Fragment key={i}>
                {item}
                <span className="mx-2 text-[var(--color-accent)]/60" aria-hidden>
                  ·
                </span>
              </Fragment>
            ))}
          </span>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent"
        aria-hidden
      />
    </div>
  );
}
