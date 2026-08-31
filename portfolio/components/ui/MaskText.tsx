"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Masked line reveal — each line sits in an overflow-hidden box and its
 * content slides up into view. We observe a NON-translated wrapper with the
 * useInView hook (rather than whileInView on the translated span, which
 * watches the wrong position and can fail to fire near the page bottom).
 *
 * `mount` reveals on mount (for above-the-fold headings).
 */
export default function MaskText({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  once = true,
  mount = false,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  mount?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.1 });
  const show = mount || inView;

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-mask">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "110%" }}
            animate={{ y: show ? "0%" : "110%" }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
