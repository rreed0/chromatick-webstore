import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
}

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-[rgba(10,10,11,1)] disabled:pointer-events-none disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--color-accent)]/70 bg-[var(--color-accent)] text-slate-950 shadow-[0_10px_22px_rgba(var(--accent-glow),0.4)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(var(--accent-glow),0.55)]",
  secondary:
    "bg-[var(--surface-elevated)] text-[var(--foreground)] border border-[var(--color-border-subtle)] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)]",
  ghost:
    "bg-transparent text-[var(--foreground)] hover:bg-[rgba(20,20,22,0.94)] hover:-translate-y-0.5",
  outline:
    "bg-transparent text-[var(--foreground)] border border-[var(--color-border-subtle)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[rgba(20,20,22,0.9)]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant = "primary", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

