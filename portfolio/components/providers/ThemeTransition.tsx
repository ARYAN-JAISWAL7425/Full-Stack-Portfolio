"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";

export type ThemeFx = {
  id: number;
  x: number;
  y: number;
  to: "light" | "dark";
};

/**
 * Theme-toggle transition — "halftone dissolve".
 *
 * A field of vermillion newsprint dots bursts from the toggle button and
 * spreads to a dense cover; the real theme is swapped underneath (timed by the
 * provider) and the dots then recede, revealing the new page through the gaps.
 * Risograph/print flavour that sits with the site's grain overlay.
 *
 * Reduced-motion users never reach here — the provider does a clean swap.
 * Visual is purely cosmetic (CSS vars driven by rAF); the provider owns the
 * theme swap + cleanup via timers, so a backgrounded/throttled tab can never
 * get stuck mid-transition.
 */
export default function ThemeTransition({ fx }: { fx: ThemeFx | null }) {
  if (!fx) return null;
  return <Burst key={fx.id} fx={fx} />;
}

const TILE = 22; // dot grid size (px)
const COVER = 430; // grow-to-cover (ms)
const REVEAL = 440; // dissolve-to-reveal (ms)
const PEAK = 72; // dot radius (% of tile) at densest — just past merge, keeps the dot texture

function Burst({ fx }: { fx: ThemeFx }) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = fx;

  const maxR = useMemo(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) * 1.06;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fx.id]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const eOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const eIn = (t: number) => t * t * t;
    let raf = 0;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const t = now - t0;
      let p: number;
      let m: number;
      if (t <= COVER) {
        const k = eOut(t / COVER);
        p = k * PEAK; // dots grow
        m = k * maxR; // reveal mask spreads from the toggle
      } else if (t <= COVER + REVEAL) {
        const k = eIn((t - COVER) / REVEAL);
        p = PEAK * (1 - k); // dots dissolve, revealing the new page
        m = maxR;
      } else {
        el.style.setProperty("--p", "0%");
        return;
      }
      el.style.setProperty("--p", `${p.toFixed(2)}%`);
      el.style.setProperty("--m", `${m.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fx.id, maxR]);

  const dotStyle = {
    "--p": "0%",
    "--m": "0px",
    backgroundImage:
      "radial-gradient(circle, #f23a1d 0%, #f23a1d var(--p), transparent calc(var(--p) + 0.5%))",
    backgroundSize: `${TILE}px ${TILE}px`,
    WebkitMaskImage: `radial-gradient(circle at ${x}px ${y}px, #000 var(--m), transparent calc(var(--m) + 16%))`,
    maskImage: `radial-gradient(circle at ${x}px ${y}px, #000 var(--m), transparent calc(var(--m) + 16%))`,
    willChange: "background-image, mask-image",
  } as CSSProperties;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden" aria-hidden>
      <div ref={ref} className="absolute inset-0" style={dotStyle} />
    </div>
  );
}
