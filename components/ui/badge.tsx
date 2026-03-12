import * as React from "react";
import { cn } from "./utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] border-[var(--color-border-subtle)] bg-[rgba(18,18,20,0.92)] text-[var(--color-muted)]",
        className,
      )}
      {...props}
    />
  );
}

