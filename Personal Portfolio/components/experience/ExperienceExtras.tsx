"use client";

import { certifications, achievements, socials } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

export default function ExperienceExtras() {
  return (
    <section className="bg-bone dark:bg-night py-24 md:py-32">
      <div className="container-x grid gap-16 md:grid-cols-2">
        {/* certifications */}
        <div>
          <span className="eyebrow">/ Credentials</span>
          <div className="mt-8 divide-y divide-ink/12 dark:divide-bone/12 border-y border-ink/12 dark:border-bone/12">
            {certifications.map((c, i) => (
              <Reveal key={`${c.issuer}-${c.title}`} delay={i * 0.06}>
                <div className="flex items-baseline justify-between gap-6 py-5">
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted dark:text-bone/55">{c.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-muted dark:text-bone/55">{c.year}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-mono">
              {socials
                .filter((s) => s.label === "GitHub" || s.label === "LeetCode")
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="visit"
                    className="link-underline text-ink dark:text-bone"
                  >
                    {s.label} {s.handle} ↗
                  </a>
                ))}
            </div>
          </Reveal>
        </div>

        {/* achievements */}
        <div>
          <span className="eyebrow">/ What that looked like</span>
          <ul className="mt-8 space-y-5">
            {achievements.map((a, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <li className="flex gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vermillion" />
                  <span className="text-pretty leading-relaxed text-ink/80 dark:text-bone/80">{a}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
