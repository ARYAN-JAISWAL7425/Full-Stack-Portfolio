import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ServicesBody from "@/components/services/ServicesBody";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "Focus",
  description:
    "What I build: full-stack web apps, auth and payment flows, real-time features, admin dashboards and applied ML models.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        index="03 / 06"
        eyebrow="Focus"
        titleLines={["What I", "Explore"]}
description="The things I actually build, and the parts of a product I go out of my way to finish."
      />
      <ServicesBody />
      <CTASection />
    </>
  );
}
