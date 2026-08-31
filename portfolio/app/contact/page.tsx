import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Contact from "@/components/home/Contact";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Aryan Jaiswal about internships, freelance full-stack work, or collaboration on a build.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index="06 / 06"
        eyebrow="Contact"
        titleLines={["Say", "Hello"]}
        description="Drop a note with feedback, ideas, or opportunities — I read everything."
      />

      <section className="bg-bone dark:bg-night pb-16">
        <div className="container-x grid gap-px overflow-hidden rounded-2xl border border-ink/12 dark:border-bone/12 bg-ink/12 dark:bg-bone/12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Email", value: site.email, href: `mailto:${site.email}` },
            { label: "Based in", value: site.location },
            { label: "Availability", value: site.availability },
            { label: "Résumé", value: "Download PDF", href: site.resume },
          ].map((item) => (
            <div key={item.label} className="bg-bone dark:bg-night px-7 py-12 md:px-9 md:py-16">
              <p className="eyebrow">/ {item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  data-cursor="email"
                  className="link-underline mt-3 block font-display text-lg font-bold tracking-tight"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-3 font-display text-lg font-bold tracking-tight">
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Contact />
    </>
  );
}
