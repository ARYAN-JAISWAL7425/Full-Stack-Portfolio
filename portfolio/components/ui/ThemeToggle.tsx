"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * Light ⇄ dark switch. Icons swap via `dark:` CSS variants so the correct
 * glyph shows before JS hydrates; the click handler reads the live DOM class,
 * so it's accurate regardless of mount timing.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      data-cursor="theme"
      aria-label="Toggle light / dark theme"
      title="Toggle theme"
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center rounded-full border transition-[colors,transform] duration-300 active:scale-90",
        "border-ink/20 text-ink hover:border-ink",
        "dark:border-bone/25 dark:text-bone dark:hover:border-vermillion dark:hover:text-vermillion",
        className
      )}
    >
      {/* Sun — light mode */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[18px] w-[18px] transition-transform duration-500 group-hover:rotate-90 dark:hidden"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>

      {/* Moon — dark mode */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden h-[18px] w-[18px] transition-transform duration-500 group-hover:-rotate-12 dark:block"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    </button>
  );
}
