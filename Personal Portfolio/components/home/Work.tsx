"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { projects } from "@/lib/content";
import MaskText from "@/components/ui/MaskText";
import TextScramble from "@/components/ui/TextScramble";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 22, mass: 0.5 });
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section id="work" className="relative bg-ink py-24 text-bone md:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-vermillion" />
              <TextScramble
                text="/ 01 — SELECTED WORK"
                className="font-mono text-[11px] uppercase tracking-mono text-bone/50"
              />
            </div>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,7vw,6rem)] font-extrabold uppercase leading-[0.85] tracking-tight break-words">
              <MaskText lines={["Selected", "Work"]} />
            </h2>
          </div>
          <Link
            href="/work"
            data-cursor="all"
            className="link-underline font-mono text-sm uppercase tracking-mono text-bone/70"
          >
            View all projects →
          </Link>
        </div>

        {/* list */}
        <div
          ref={wrapRef}
          onMouseMove={onMove}
          className="relative mt-14"
        >
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              data-cursor="case study"
              className="group relative block border-t border-bone/12 last:border-b"
            >
              <div className="flex items-center justify-between gap-6 py-7 transition-all duration-500 group-hover:px-4 md:py-9">
                <div className="flex items-baseline gap-5 md:gap-10">
                  <span className="font-mono text-xs text-bone/40">{p.index}</span>
                  <h3
                    className={cn(
                      "font-display text-3xl font-bold tracking-tight transition-colors duration-300 md:text-6xl",
                      active === i ? "text-vermillion" : "text-bone"
                    )}
                  >
                    {p.title}
                  </h3>
                </div>
                <div className="flex items-center gap-6 text-right md:gap-12">
                  <span className="hidden max-w-[12rem] text-sm text-bone/55 md:block">
                    {p.category}
                  </span>
                  <span className="font-mono text-xs text-bone/40">{p.year}</span>
                  <span
                    className={cn(
                      "hidden text-xl transition-transform duration-500 md:block",
                      active === i ? "translate-x-1 text-vermillion" : "text-bone/40"
                    )}
                  >
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* floating preview */}
          <motion.div
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={cn(
                    "relative h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-bone/15 bg-gradient-to-br shadow-2xl",
                    projects[active].gradient
                  )}
                >
                  {projects[active].shot && (
                    <>
                      <Image
                        src={projects[active].shot!}
                        alt=""
                        fill
                        sizes="320px"
                        className={cn(
                          projects[active].shotFit === "contain"
                            ? "object-contain p-4"
                            : "object-cover object-top"
                        )}
                      />
                      <div className="absolute inset-0 bg-ink/55" />
                    </>
                  )}
                  <div className="relative flex h-full flex-col justify-between p-5">
                    <span className="font-mono text-[10px] uppercase tracking-mono text-bone/80">
                      {projects[active].role}
                    </span>
                    <div>
                      <p className="text-pretty text-sm text-bone/90">
                        {projects[active].short}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {projects[active].stack.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-ink/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-bone/90"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
