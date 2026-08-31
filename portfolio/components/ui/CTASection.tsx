"use client";

import Link from "next/link";
import { site } from "@/lib/content";
import MaskText from "@/components/ui/MaskText";
import Magnetic from "@/components/ui/Magnetic";

export default function CTASection() {
  return (
    <section className="bg-ink py-24 text-bone md:py-32">
      <div className="container-x flex flex-col items-center text-center">
        <span className="eyebrow text-bone/50">/ Let&apos;s connect</span>
        <h2 className="mt-8 font-display text-[clamp(2.4rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
          <MaskText lines={["Have an idea?"]} />
          <MaskText lines={["Let's build and learn."]} className="text-vermillion" delay={0.08} />
        </h2>
        <p className="mt-8 max-w-md text-pretty text-bone/60">
          {site.availabilityLong} — tell me what you&apos;re building.
        </p>
        <Magnetic strength={0.4} className="mt-10">
          <Link
            href="/contact"
            data-cursor="hi"
            className="inline-flex items-center gap-2 rounded-full bg-vermillion px-8 py-4 text-sm font-medium text-bone-2 transition-opacity hover:opacity-90"
          >
            Say hello
            <span aria-hidden>→</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
