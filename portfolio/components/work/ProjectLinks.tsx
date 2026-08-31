"use client";

import { useState } from "react";
import type { Project } from "@/lib/content";
import Magnetic from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

/**
 * Live / source buttons plus, when the app needs an account, the demo
 * credentials — so a visitor never hits a login wall with no way through.
 */
export default function ProjectLinks({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { live, repo, demo } = project;

  const copy = async () => {
    if (!demo) return;
    try {
      await navigator.clipboard.writeText(`${demo.user} / ${demo.password}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the values are visible on screen anyway */
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-wrap items-center gap-3">
        {live && (
          <Magnetic strength={0.4}>
            <a
              href={live}
              target="_blank"
              rel="noreferrer"
              data-cursor="visit"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-vermillion dark:bg-bone dark:text-ink dark:hover:bg-vermillion dark:hover:text-bone"
            >
              Open the live site
              <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        )}
        {repo && (
          <Magnetic strength={0.4}>
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              data-cursor="code"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink dark:border-bone/25 dark:hover:border-bone"
            >
              Source code
              <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        )}
      </div>

      {demo && (
        <div className="max-w-md rounded-xl border border-ink/15 bg-bone-2 p-5 dark:border-bone/15 dark:bg-night-2">
          <p className="eyebrow">/ Demo account</p>
          <dl className="mt-3 space-y-1 font-mono text-sm">
            <div className="flex gap-3">
              <dt className="text-muted dark:text-bone/50">login</dt>
              <dd className="break-all">{demo.user}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-muted dark:text-bone/50">pass</dt>
              <dd className="break-all">{demo.password}</dd>
            </div>
          </dl>
          {demo.note && (
            <p className="mt-3 text-sm leading-relaxed text-muted dark:text-bone/55">
              {demo.note}
            </p>
          )}
          <button
            type="button"
            onClick={copy}
            data-cursor="copy"
            className="link-underline mt-4 font-mono text-[11px] uppercase tracking-mono text-ink dark:text-bone"
          >
            {copied ? "Copied ✓" : "Copy credentials"}
          </button>
        </div>
      )}
    </div>
  );
}
