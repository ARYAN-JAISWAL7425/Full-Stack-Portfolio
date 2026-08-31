"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Word-by-word reveal for body statements. Each word fades + rises with a
 * stagger when the block scrolls into view. We observe a stable wrapper via
 * useInView (not whileInView on the translated words) so it fires reliably.
 */
export default function SplitWords({
  text,
  className,
  highlight = [],
  delay = 0,
  stagger = 0.018,
  once = true,
}: {
  text: string;
  className?: string;
  highlight?: string[];
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.1 });
  const words = text.split(" ");
  const isHot = (w: string) =>
    highlight.some((h) => w.replace(/[.,—]/g, "").toLowerCase() === h.toLowerCase());

  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={cn("inline-block", isHot(word) && "text-vermillion")}
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
          {/* space lives between wrappers so inline-block whitespace is kept */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
