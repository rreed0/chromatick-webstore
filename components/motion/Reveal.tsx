"use client";

import type { ReactNode } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import { motionEase } from "@/components/motion/tokens";

type RevealProps = Omit<HTMLMotionProps<"div">, "children" | "transition"> & {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.55,
  y = 18,
  once = true,
  amount = 0.2,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: motionEase,
      }}
    >
      {children}
    </motion.div>
  );
}
