"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

export default function WorkGrid() {
  return (
    <section className="bg-bone dark:bg-night pb-28">
      <div className="container-x grid gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className={cn(i % 2 === 1 && "md:mt-20")}>
            <Link href={`/work/${p.slug}`} data-cursor="case study" className="group block">
              <TiltCard className="overflow-hidden rounded-2xl border border-ink/12 dark:border-bone/12">
                <div
                  className={cn(
                    "relative flex aspect-[4/3] flex-col justify-between bg-gradient-to-br p-7",
                    p.gradient
                  )}
                >
                  {p.shot && (
                    <>
                      <Image
                        src={p.shot}
                        alt={`${p.title} — screenshot of the live site`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={cn(
                          "transition-transform duration-700 group-hover:scale-[1.03]",
                          p.shotFit === "contain"
                            ? "object-contain p-8"
                            : "object-cover object-top"
                        )}
                      />
                      {/* keeps the overlaid labels legible on any screenshot */}
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 bg-gradient-to-t",
                          p.shotFit === "contain"
                            ? "from-ink/80 via-transparent to-transparent"
                            : "from-ink/85 via-ink/25 to-ink/45"
                        )}
                      />
                    </>
                  )}
                  <div className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-mono text-bone/85">
                    <span>{p.index}</span>
                    <span>{p.year}</span>
                  </div>
                  <div className="relative" style={{ transform: "translateZ(40px)" }}>
                    <h3 className="font-display text-[clamp(1.75rem,9vw,2.25rem)] font-extrabold tracking-tight text-bone md:text-5xl">
                      {p.title}
                    </h3>
                  </div>
                  <span className="absolute right-6 top-1/2 text-2xl text-bone opacity-0 transition-all duration-500 group-hover:right-5 group-hover:opacity-100">
                    ↗
                  </span>
                </div>
              </TiltCard>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-mono text-muted dark:text-bone/55">
                    {p.category}
                  </p>
                  <p className="mt-2 max-w-md text-pretty text-ink/80 dark:text-bone/80">{p.blurb}</p>
                </div>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-mono text-ink/60 dark:text-bone/65">
                  {p.role}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-ink/15 dark:border-bone/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/70 dark:text-bone/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>

            {/* links live outside the card link — nesting anchors is invalid */}
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-mono">
              <Link
                href={`/work/${p.slug}`}
                data-cursor="read"
                className="link-underline text-ink dark:text-bone"
              >
                Case study →
              </Link>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="visit"
                  className="link-underline text-muted dark:text-bone/60"
                >
                  Live site ↗
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="code"
                  className="link-underline text-muted dark:text-bone/60"
                >
                  Source ↗
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
