"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_<>—";

/**
 * Decode/scramble effect for mono labels. Resolves to the final
 * string character-by-character when scrolled into view.
 */
export default function TextScramble({
  text,
  className,
  speed = 1.7,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    let raf = 0;
    const total = text.length;
    const run = () => {
      const revealed = Math.floor(frame / (3 / speed));
      let out = "";
      for (let i = 0; i < total; i++) {
        if (i < revealed || text[i] === " ") out += text[i];
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOutput(out);
      frame++;
      if (revealed <= total) raf = requestAnimationFrame(run);
      else setOutput(text);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, speed]);

  return (
    <span ref={ref} className={className}>
      {output}
    </span>
  );
}
