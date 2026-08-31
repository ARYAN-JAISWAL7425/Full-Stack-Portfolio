import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import WorkGrid from "@/components/work/WorkGrid";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Four full-stack products built and deployed by Aryan Jaiswal — a fitness accountability app, a travel marketplace, a MERN storefront and a real-time chat app.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        index="01 / 06"
        eyebrow="Selected Work"
        titleLines={["Selected", "Work"]}
description="Four products I built end to end and deployed — payments, real-time messaging, admin consoles and in-browser ML. Every one has a live URL and open source."
      />
      <WorkGrid />
      <CTASection />
    </>
  );
}
