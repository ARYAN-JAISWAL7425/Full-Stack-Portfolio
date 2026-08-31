"use client";

import Link from "next/link";
import { capabilities, stats } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";
import CountUp from "@/components/ui/CountUp";
import TextScramble from "@/components/ui/TextScramble";

export default function About() {
  return (
    <section id="about" className="bg-bone py-24 dark:bg-night md:py-36">
      <div className="container-x">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-vermillion" />
          <TextScramble
            text="/ 02 — APPROACH"
            className="font-mono text-[11px] uppercase tracking-mono text-muted dark:text-bone/55"
          />
        </div>

        {/* big statement */}
        <h2 className="mt-10 max-w-5xl font-display text-[clamp(1.9rem,4.6vw,4.2rem)] font-bold leading-[1.05] tracking-tight">
          <SplitWords
            text="I build full-stack products end to end — auth, payments, real-time, admin — and I ship every one of them to a URL you can open."
            highlight={["end to end", "ship"]}
          />
        </h2>

        <Reveal delay={0.1} className="mt-8 max-w-xl">
          <p className="text-pretty text-base leading-relaxed text-muted dark:text-bone/60 md:text-lg">
            I&apos;m an AI &amp; ML undergrad at VIT Bhopal who builds on the web. Four products
            live in production, two web development internships behind me, and seven machine
            learning models trained along the way.
          </p>
        </Reveal>

        {/* capability cards */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 dark:border-bone/12 dark:bg-bone/12 md:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.no} delay={i * 0.08}>
              <div
                data-cursor=""
                className="group flex h-full flex-col justify-between gap-10 bg-bone p-7 transition-colors duration-500 hover:bg-bone-2 dark:bg-night dark:hover:bg-night-2 md:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted dark:text-bone/50">{cap.no}</span>
                  <span className="h-2 w-2 rounded-full bg-ink/20 transition-colors duration-500 group-hover:bg-vermillion dark:bg-bone/25" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted dark:text-bone/55">{cap.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cap.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/70 dark:border-bone/20 dark:text-bone/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* stats */}
        <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-ink/12 pt-12 dark:border-bone/12 md:grid-cols-4 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div>
                <div className="font-display text-[clamp(1.9rem,9.5vw,3rem)] font-extrabold tracking-tight md:text-[clamp(2.25rem,5.6vw,3.75rem)]">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 max-w-[12rem] text-sm text-muted dark:text-bone/55">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <Link
            href="/about"
            data-cursor="more"
            className="link-underline font-mono text-sm uppercase tracking-mono text-ink dark:text-bone"
          >
            More about me →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
