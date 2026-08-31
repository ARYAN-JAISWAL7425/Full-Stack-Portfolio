import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SkillsBody from "@/components/skills/SkillsBody";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "The stack behind the shipped work — React, TypeScript, Node, Express, MongoDB, Supabase, Socket.IO, Razorpay, Stripe and Python ML.",
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        index="04 / 06"
        eyebrow="Skills & Stack"
        titleLines={["The", "Toolkit"]}
description="Everything listed here is something I have shipped with, not something I have only read about."
      />
      <SkillsBody />
      <CTASection />
    </>
  );
}
