"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site, socials } from "@/lib/content";
import Magnetic from "@/components/ui/Magnetic";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-colors duration-500",
          scrolled
            ? "border-b border-ink/10 bg-bone/80 backdrop-blur-md dark:border-bone/10 dark:bg-night/80"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="container-x flex h-[var(--header-h)] items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2"
            data-cursor="home"
          >
            <span className="h-2 w-2 rounded-full bg-vermillion transition-transform duration-500 group-hover:scale-150" />
            <span className="font-display text-lg font-bold tracking-tight dark:text-bone">
              Aryan<span className="text-vermillion">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1.5 text-sm font-medium"
                  >
                    <span className="font-mono text-[10px] text-muted dark:text-bone/45">
                      {item.index}
                    </span>
                    <span
                      className={cn(
                        "link-underline transition-colors",
                        active ? "text-vermillion" : "text-ink dark:text-bone"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + availability + theme toggle */}
          <div className="hidden items-center gap-5 lg:flex">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-mono text-muted dark:text-bone/45">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermillion opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-vermillion" />
              </span>
              {site.availability}
            </span>
            <a
              href={site.resume}
              download
              data-cursor="resume"
              className="link-underline text-sm font-medium text-ink dark:text-bone"
            >
              Résumé ↓
            </a>
            <ThemeToggle />
            <Magnetic strength={0.45}>
              <Link
                href="/contact"
                data-cursor="say hi"
                className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bone transition-colors hover:bg-vermillion dark:bg-bone dark:text-ink dark:hover:bg-vermillion dark:hover:text-bone"
              >
                Say hello
              </Link>
            </Magnetic>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-ink dark:text-bone"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "h-px w-6 bg-current transition-all duration-300",
                  open && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-current transition-all duration-300",
                  open && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-bone lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease: EASE, duration: 0.6 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-3 border-b border-bone/10 py-4"
                  >
                    <span className="font-mono text-xs text-bone/40">
                      {item.index}
                    </span>
                    <span className="font-display text-4xl font-bold">
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-mono text-bone/60">
              <a href={site.resume} download className="text-vermillion-soft">
                Résumé ↓
              </a>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
