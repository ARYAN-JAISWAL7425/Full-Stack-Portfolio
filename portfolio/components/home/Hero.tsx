"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { site } from "@/lib/content";
import Portrait from "@/components/ui/Portrait";
import Magnetic from "@/components/ui/Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;
const SIZE = "text-[clamp(2.75rem,9.6vw,9.25rem)]";

export default function Hero() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Start the entrance the moment the intro lifts (or immediately if the
  // intro is skipped / reduced motion).
  useEffect(() => {
    if (reduce) {
      setReady(true);
      return;
    }
    if (typeof window !== "undefined" && window.__introDone) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("intro:done", on);
    const t = setTimeout(() => setReady(true), 2600); // safety fallback
    return () => {
      window.removeEventListener("intro:done", on);
      clearTimeout(t);
    };
  }, [reduce]);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const line = (delay: number) => ({
    initial: { y: "115%" },
    animate: ready ? { y: "0%" } : { y: "115%" },
    transition: { duration: 0.95, delay, ease: EASE },
  });
  const rise = (delay: number, y = 20) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-[calc(var(--header-h)+8px)]"
    >
      {/* atmosphere: soft warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[5%] top-[8%] -z-10 h-[55vw] w-[55vw] rounded-full bg-vermillion/[0.07] blur-[120px] md:h-[40vw] md:w-[40vw]"
      />

      {/* top meta row */}
      <motion.div
        {...rise(0.15, 0)}
        className="container-x flex flex-wrap items-center justify-between gap-y-2 border-b border-ink/10 pb-5 font-mono text-[11px] uppercase tracking-mono text-muted dark:border-bone/12 dark:text-bone/55"
      >
        <span>{site.role}</span>
        <span className="hidden sm:block">{site.location}</span>
        <span>Portfolio — &apos;26</span>
      </motion.div>

      {/* center: headline + portrait */}
      <div className="container-x relative flex flex-1 flex-col items-start justify-center gap-7 md:flex-row md:items-center md:justify-start md:gap-0">
        {/* mobile portrait — stacks above the name; sized to fill the section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
          className="pointer-events-none z-20 w-[58vw] max-w-[260px] self-center md:hidden"
        >
          <Portrait priority className="w-full" />
        </motion.div>

        <motion.h1
          style={{ y: headlineY }}
          className="relative z-10 font-display font-extrabold uppercase leading-[0.82] tracking-tight"
        >
          <span className="reveal-mask">
            <motion.span {...line(0)} className={`block ${SIZE}`}>
              Aryan
            </motion.span>
          </span>
          <span className="reveal-mask">
            <motion.span {...line(0.1)} className={`block ${SIZE} text-vermillion`}>
              Jaiswal
            </motion.span>
          </span>
        </motion.h1>

        {/* floating portrait */}
        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ delay: 0.25, duration: 1, ease: EASE }}
          className="pointer-events-none absolute right-0 top-[45%] z-20 hidden w-[clamp(160px,17vw,250px)] -translate-y-1/2 md:block"
        >
          <Portrait priority className="w-full" />
        </motion.div>
      </div>

      {/* bottom: intro + CTAs + scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="container-x grid gap-8 border-t border-ink/10 pt-8 dark:border-bone/12 md:grid-cols-[1fr_auto] md:items-end"
      >
        <motion.p
          {...rise(0.32)}
          className="max-w-md text-pretty text-base leading-relaxed text-ink/80 dark:text-bone/75 md:text-lg"
        >
          {site.tagline}
        </motion.p>

        <motion.div {...rise(0.42)} className="flex flex-wrap items-center gap-3">
          <Magnetic strength={0.4}>
            <Link
              href="/work"
              data-cursor="view"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-vermillion dark:bg-bone dark:text-ink dark:hover:bg-vermillion dark:hover:text-bone"
            >
              See my projects
              <span aria-hidden>→</span>
            </Link>
          </Magnetic>
          <Magnetic strength={0.4}>
            <Link
              href="/about"
              data-cursor="story"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink dark:border-bone/25 dark:hover:border-bone"
            >
              Read my story
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        {...rise(0.55, 0)}
        style={{ opacity: fade }}
        className="container-x mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-mono text-muted dark:text-bone/55"
      >
        <span className="relative block h-8 w-px overflow-hidden bg-ink/20 dark:bg-bone/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-vermillion"
            animate={{ y: [-12, 32] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Scroll to explore
      </motion.div>
    </section>
  );
}
