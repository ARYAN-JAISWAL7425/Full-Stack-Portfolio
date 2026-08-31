import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import MaskText from "@/components/ui/MaskText";
import CTASection from "@/components/ui/CTASection";
import ProjectLinks from "@/components/work/ProjectLinks";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.short,
    openGraph: {
      title: `${project.title} — ${project.category}`,
      description: project.short,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      {/* header */}
      <section className="bg-bone dark:bg-night pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+6rem)]">
        <div className="container-x">
          <Link
            href="/work"
            data-cursor="back"
            className="link-underline font-mono text-[11px] uppercase tracking-mono text-muted dark:text-bone/55"
          >
            ← All work
          </Link>

          <p className="eyebrow mt-10">
            / {project.index} — {project.category}
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.5rem,10vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
            <MaskText lines={[project.title]} />
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink/80 dark:text-bone/75">
            {project.blurb}
          </p>

          <ProjectLinks project={project} className="mt-10" />
        </div>
      </section>

      {/* visual */}
      <section className="bg-bone dark:bg-night pb-20">
        <div className="container-x">
          <Reveal>
            <div
              className={cn(
                "relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/12 bg-gradient-to-br dark:border-bone/12",
                project.gradient
              )}
            >
              {project.shot ? (
                <Image
                  src={project.shot}
                  alt={`${project.title} — screenshot of the live site`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1100px"
                  className={cn(
                    project.shotFit === "contain"
                      ? "object-contain p-6 md:p-10"
                      : "object-cover object-top"
                  )}
                />
              ) : (
                <span className="absolute bottom-6 left-7 font-display text-3xl font-extrabold uppercase tracking-tight text-bone/90">
                  {project.title}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* meta strip */}
      <section className="bg-bone dark:bg-night pb-20">
        <div className="container-x grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 dark:border-bone/12 dark:bg-bone/12 sm:grid-cols-3">
          {[
            { label: "Role", value: project.role },
            { label: "Built", value: project.year },
            { label: "Type", value: project.category },
          ].map((item) => (
            <div key={item.label} className="bg-bone px-7 py-9 dark:bg-night">
              <p className="eyebrow">/ {item.label}</p>
              <p className="mt-3 font-display text-lg font-bold tracking-tight">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="container-x mt-8 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/70 dark:border-bone/20 dark:text-bone/70"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* overview */}
      <section className="bg-bone-2 py-24 dark:bg-night-2 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-[220px_1fr]">
          <span className="eyebrow md:pt-2">/ What it is</span>
          <Reveal>
            <p className="max-w-3xl text-pretty text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.5] tracking-tight text-ink/85 dark:text-bone/80">
              {project.overview}
            </p>
          </Reveal>
        </div>
      </section>

      {/* highlights */}
      <section className="bg-bone py-24 dark:bg-night md:py-32">
        <div className="container-x">
          <span className="eyebrow">/ How it was built</span>
          <div className="mt-14 divide-y divide-ink/12 border-y border-ink/12 dark:divide-bone/12 dark:border-bone/12">
            {project.highlights.map((h, hi) => (
              <Reveal key={h.title} delay={hi * 0.05}>
                <div className="grid gap-4 py-10 md:grid-cols-[80px_320px_1fr] md:gap-10">
                  <span className="font-mono text-xs text-vermillion">
                    {String(hi + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl font-bold leading-tight tracking-tight">
                    {h.title}
                  </h2>
                  <p className="max-w-2xl text-pretty leading-relaxed text-muted dark:text-bone/60">
                    {h.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {project.notes && (
            <Reveal delay={0.1}>
              <ul className="mt-12 space-y-4">
                {project.notes.map((n) => (
                  <li key={n} className="flex gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vermillion" />
                    <span className="text-pretty leading-relaxed text-ink/75 dark:text-bone/70">
                      {n}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* next project */}
      <section className="bg-bone-2 py-20 dark:bg-night-2">
        <div className="container-x">
          <p className="eyebrow">/ Next project</p>
          <Link
            href={`/work/${next.slug}`}
            data-cursor="view"
            className="group mt-6 flex flex-wrap items-baseline justify-between gap-4"
          >
            <span className="font-display text-[clamp(2rem,7vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-vermillion">
              {next.title}
            </span>
            <span className="font-mono text-sm uppercase tracking-mono text-muted dark:text-bone/55">
              {next.category} →
            </span>
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
