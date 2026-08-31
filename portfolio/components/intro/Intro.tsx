"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.83, 0, 0.17, 1] as const;

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

function finish() {
  window.__introDone = true;
  window.dispatchEvent(new Event("intro:done"));
}

export default function Intro() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("intro:seen");

    // Skip on reduced-motion or if already shown this session.
    if (reduce || seen) {
      setDone(true);
      finish();
      return;
    }
    sessionStorage.setItem("intro:seen", "1");

    document.body.style.overflow = "hidden";
    const start = performance.now();
    const dur = 1000;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t = setTimeout(() => {
      setDone(true);
      finish();
      document.body.style.overflow = "";
    }, dur + 250);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink-2 px-6 py-6 text-bone md:px-10 md:py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-mono text-bone/60">
            <span>Aryan Jaiswal©</span>
            <span>GenAI & Full-Stack</span>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[10.5vw] font-extrabold leading-none tracking-tight md:text-[11vw]"
            >
              ARYAN <span className="text-vermillion">JAISWAL</span>
            </motion.h1>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-mono text-[11px] uppercase tracking-mono text-bone/50">
              Loading story
            </span>
            <span className="font-display text-5xl font-bold tabular-nums md:text-7xl">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-vermillion"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
