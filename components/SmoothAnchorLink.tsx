"use client";

import Link from "next/link";
import * as React from "react";

type SmoothAnchorLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "href"
> & {
  href: string;
};

export const SmoothAnchorLink = React.forwardRef<
  HTMLAnchorElement,
  SmoothAnchorLinkProps
>(({ href, onClick, ...props }, ref) => {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const url = new URL(href, window.location.href);

    if (url.pathname !== window.location.pathname || !url.hash) {
      return;
    }

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));

    if (!target) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return <Link ref={ref} href={href} onClick={handleClick} {...props} />;
});

SmoothAnchorLink.displayName = "SmoothAnchorLink";
