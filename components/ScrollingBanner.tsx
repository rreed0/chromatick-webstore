"use client";

import { Fragment } from "react";

const DURATION = 28;

type ScrollingBannerProps = {
  items: string[];
};

export function ScrollingBanner({ items }: ScrollingBannerProps) {
  const copies = 4;

  return (
    <div className="relative mt-4 w-full overflow-hidden rounded-xl border border-white/12 bg-[rgba(6,7,8,0.94)] py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-[var(--accent-green)]/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
        aria-hidden
      />
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
            className="flex shrink-0 items-center whitespace-nowrap text-[11px] font-semibold tracking-[0.22em] text-white/88"
          >
            {items.map((item, i) => (
              <Fragment key={i}>
                {item}
                <span className="mx-2 text-[var(--accent-green)]/80" aria-hidden>
                  ·
                </span>
              </Fragment>
            ))}
          </span>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[rgba(6,7,8,0.98)] via-[rgba(6,7,8,0.88)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[rgba(6,7,8,0.98)] via-[rgba(6,7,8,0.88)] to-transparent"
        aria-hidden
      />
    </div>
  );
}
