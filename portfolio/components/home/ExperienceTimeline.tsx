"use client";

import Link from "next/link";
import { experience } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import MaskText from "@/components/ui/MaskText";
import TextScramble from "@/components/ui/TextScramble";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="bg-bone-2 py-24 dark:bg-night-2 md:py-36">
      <div className="container-x">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-vermillion" />
          <TextScramble
            text="/ 04 — EXPERIENCE"
            className="font-mono text-[11px] uppercase tracking-mono text-muted dark:text-bone/55"
          />
        </div>
        <h2 className="mt-6 font-display text-[clamp(2.2rem,6vw,5rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
          <MaskText lines={["The", "Journey"]} />
        </h2>

        <div className="mt-16">
          {experience.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group grid gap-4 border-t border-ink/12 py-9 transition-colors duration-500 hover:bg-bone dark:border-bone/12 dark:hover:bg-night md:grid-cols-[200px_1fr_auto] md:gap-10 md:px-4">
                <span className="font-mono text-sm text-muted dark:text-bone/55">{item.period}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-vermillion">{item.company}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted dark:text-bone/55">
                    {item.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:max-w-[200px] md:justify-end">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="h-fit rounded-full border border-ink/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/70 dark:border-bone/20 dark:text-bone/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-ink/12 dark:border-bone/12" />
        </div>

        <Reveal delay={0.1} className="mt-14">
          <Link
            href="/experience"
            data-cursor="full cv"
            className="link-underline font-mono text-sm uppercase tracking-mono text-ink dark:text-bone"
          >
            View full experience →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
