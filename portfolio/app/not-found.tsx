import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-bone dark:bg-night px-6 text-center">
      <span className="eyebrow">/ Error 404</span>
      <h1 className="mt-6 font-display text-[clamp(4rem,18vw,14rem)] font-extrabold leading-none tracking-tight">
        4<span className="text-vermillion">0</span>4
      </h1>
      <p className="mt-4 max-w-sm text-pretty text-muted dark:text-bone/55">
        This page wandered off the grid. Let&apos;s get you back to something that exists.
      </p>
      <Link
        href="/"
        data-cursor="home"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink dark:bg-bone px-7 py-3.5 text-sm font-medium text-bone dark:text-ink transition-colors hover:bg-vermillion dark:hover:bg-vermillion dark:hover:text-bone"
      >
        Back to home <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
