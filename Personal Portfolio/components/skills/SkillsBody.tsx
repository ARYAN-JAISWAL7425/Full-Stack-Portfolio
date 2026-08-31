"use client";

import { skillGroups } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SkillsBody() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="bg-bone dark:bg-night pb-28">
      <div className="container-x">
        <div className="divide-y divide-ink/12 dark:divide-bone/12 border-y border-ink/12 dark:border-bone/12">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.05}>
              <div className="grid gap-6 py-10 md:grid-cols-[280px_1fr] md:gap-12 md:py-12">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-vermillion">
                    0{gi + 1}
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {group.title}
                  </h2>
                </div>
                <ul className="flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span
                        onMouseEnter={() => setHover(item)}
                        onMouseLeave={() => setHover(null)}
                        data-cursor=""
                        className={cn(
                          "inline-flex cursor-default items-center rounded-full border px-4 py-2 text-sm transition-all duration-300",
                          hover === item
                            ? "border-vermillion bg-vermillion text-bone-2"
                            : "border-ink/15 dark:border-bone/20 text-ink/80 dark:text-bone/80 hover:border-ink dark:hover:border-bone"
                        )}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 max-w-2xl text-pretty text-lg leading-relaxed text-muted dark:text-bone/55">
            Every tool on this list earned its place in a project that went to production.
            When something new is the right call, I pick it up the same way — by building
            with it until it ships.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
