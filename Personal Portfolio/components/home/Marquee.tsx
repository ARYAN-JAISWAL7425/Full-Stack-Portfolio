"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";

const ITEMS = [
  "Full-Stack Builds",
  "MERN Apps",
  "Real-Time Systems",
  "Payments Integration",
  "Admin Dashboards",
  "Applied ML",
  "Shipped to Production",
];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export default function Marquee({
  baseVelocity = -2.6,
}: {
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) dir.current = -1;
    else if (velocityFactor.get() > 0) dir.current = 1;
    moveBy += dir.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="overflow-hidden border-y border-ink/10 bg-ink-2 py-5 text-bone md:py-7">
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {ITEMS.map((item) => (
              <span key={item} className="flex items-center">
                <span className="px-6 font-display text-2xl font-bold uppercase tracking-tight md:text-4xl">
                  {item}
                </span>
                <span className="text-xl text-vermillion md:text-2xl">✶</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
