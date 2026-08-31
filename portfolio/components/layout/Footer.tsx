"use client";

import Link from "next/link";
import { nav, site, socials } from "@/lib/content";
import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-2 text-bone">
      <div className="container-x pb-10 pt-20 md:pt-28">
        {/* top row */}
        <div className="grid gap-12 border-b border-bone/10 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="eyebrow text-bone/50">/ Get in touch</p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="email"
              className="link-underline mt-5 block font-display text-3xl font-bold tracking-tight md:text-4xl"
            >
              {site.email}
            </a>
            <p className="mt-6 max-w-sm text-bone/60">
              Have a project in mind or a role to fill?{" "}
              <span className="text-vermillion-soft">{site.availabilityLong}</span>.
            </p>
          </div>

          <div>
            <p className="eyebrow text-bone/50">/ Sitemap</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-bone/80">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-bone/50">/ Elsewhere</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a href={site.resume} download className="link-underline text-bone/80">
                  Résumé (PDF)
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-bone/80"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom row */}
        <div className="flex flex-col-reverse items-start justify-between gap-6 pt-8 font-mono text-[11px] uppercase tracking-mono text-bone/45 md:flex-row md:items-center">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>{site.location} · {site.availability}</span>
          <Magnetic strength={0.4}>
            <button
              onClick={() => window.__lenis?.scrollTo(0, { duration: 1.4 })}
              data-cursor="top"
              className="text-bone/70 transition-colors hover:text-vermillion"
            >
              ↑ Back to top
            </button>
          </Magnetic>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="pointer-events-none select-none px-2">
        <h2 className="whitespace-nowrap text-center font-display text-[19vw] font-extrabold leading-[0.8] tracking-tighter text-bone/[0.05]">
          ARYAN JAISWAL
        </h2>
      </div>
    </footer>
  );
}
