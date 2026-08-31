"use client";

import { services } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

const process = [
  { no: "01", title: "Scope", body: "Pick a real problem and cut it to the smallest version that is still worth using." },
  { no: "02", title: "Build", body: "Data model first, then the hard flow — auth, payments or real-time — before any polish." },
  { no: "03", title: "Ship", body: "Deploy it, put the URL in public, and document what worked and what didn’t." },
  { no: "04", title: "Iterate", body: "Fix what real use exposes, then pick the next project around the skill I want next." },
];

export default function ServicesBody() {
  return (
    <>
      <section className="bg-bone dark:bg-night pb-24">
        <div className="container-x grid gap-px overflow-hidden rounded-2xl border border-ink/12 dark:border-bone/12 bg-ink/12 dark:bg-bone/12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.no} delay={(i % 3) * 0.06}>
              <div className="group flex h-full flex-col justify-between gap-12 bg-bone dark:bg-night p-7 transition-colors duration-500 hover:bg-ink hover:text-bone dark:hover:bg-bone dark:hover:text-ink">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted dark:text-bone/55 group-hover:text-bone/50 dark:group-hover:text-ink/50">
                    {s.no}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-ink/20 dark:bg-bone/25 transition-colors duration-500 group-hover:bg-vermillion" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted dark:text-bone/55 group-hover:text-bone/70 dark:group-hover:text-ink/70">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-bone-2 dark:bg-night-2 py-24 md:py-32">
        <div className="container-x">
          <span className="eyebrow">/ How I build</span>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
            Scope it small, build the hard part first, ship it, then go again.
          </h2>
          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.no} delay={i * 0.08}>
                <div className="border-t border-ink/15 dark:border-bone/20 pt-6">
                  <span className="font-mono text-sm text-vermillion">{p.no}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted dark:text-bone/55">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
