"use client";

import { motion } from "framer-motion";
import MaskText from "@/components/ui/MaskText";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageHeader({
  index,
  eyebrow,
  titleLines,
  description,
}: {
  index: string;
  eyebrow: string;
  titleLines: string[];
  description?: string;
}) {
  return (
    <header className="container-x pb-12 pt-[calc(var(--header-h)+2.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+4rem)]">
      <div className="flex items-center justify-between border-b border-ink/12 pb-5 font-mono text-[11px] uppercase tracking-mono text-muted dark:border-bone/12 dark:text-bone/55">
        <span>{eyebrow}</span>
        <span>{index}</span>
      </div>

      <h1 className="mt-7 font-display text-[clamp(2rem,8vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight break-words">
        {titleLines.map((line, i) => (
          <MaskText
            key={i}
            lines={[line]}
            mount
            delay={0.1 + i * 0.08}
            lineClassName={i === titleLines.length - 1 ? "text-vermillion" : ""}
          />
        ))}
      </h1>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted dark:text-bone/60 md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}
