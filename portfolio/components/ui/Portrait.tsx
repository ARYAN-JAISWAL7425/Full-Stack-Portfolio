"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Circular portrait with a slowly rotating circular-text ring and a
 * vermillion accent arc. Used in hero, about and contact.
 */
export default function Portrait({
  className,
  ringText = "OPEN TO INTERNSHIPS — 2026 — FULL-STACK DEVELOPER — ",
  priority = false,
}: {
  className?: string;
  ringText?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative aspect-square overflow-hidden", className)}>
      {/* rotating circular text */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-spin-slow"
        aria-hidden
      >
        <defs>
          <path
            id="ring-path"
            d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
            fill="none"
          />
        </defs>
        <text className="fill-ink/55 font-mono text-[8.5px] uppercase tracking-[0.32em] dark:fill-bone/55">
          <textPath href="#ring-path" startOffset="0">
            {ringText}
          </textPath>
        </text>
      </svg>

      {/* photo disc */}
      <div className="absolute inset-[14%] overflow-hidden rounded-full border border-ink/10 bg-ink-2 shadow-[0_30px_80px_-30px_rgba(19,18,16,0.55)] dark:border-bone/15">
        <Image
          src="/profile.png"
          alt="Aryan Jaiswal, full-stack developer"
          fill
          priority={priority}
          sizes="(max-width: 768px) 60vw, 30vw"
          className="object-cover object-center grayscale-[0.15] transition-all duration-700 hover:grayscale-0"
        />
        {/* subtle inner ink veil at the bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
      </div>

      {/* vermillion accent arc */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#F23A1D"
          strokeWidth="2"
          strokeDasharray="120 460"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
