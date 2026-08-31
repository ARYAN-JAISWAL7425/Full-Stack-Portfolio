import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import ExperienceExtras from "@/components/experience/ExperienceExtras";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Web development internships at 3Skill and ShadowFox, four shipped products, and seven machine learning models — the track record so far.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        index="05 / 06"
        eyebrow="Experience"
        titleLines={["The", "Track Record"]}
description="Internships, shipped products and the models behind them — in order."
      />
      <ExperienceTimeline />
      <ExperienceExtras />
      <CTASection />
    </>
  );
}
