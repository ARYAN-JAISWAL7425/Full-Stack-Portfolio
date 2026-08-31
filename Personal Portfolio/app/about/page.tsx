import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import AboutBody from "@/components/about/AboutBody";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aryan Jaiswal — full-stack developer and B.Tech CSE (AI & ML) undergrad at VIT Bhopal, building and shipping MERN and Supabase products.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="02 / 06"
        eyebrow="About"
        titleLines={["The", "Person"]}
description="Full-stack developer, AI & ML undergrad, and a stubborn believer that a project only counts once it is deployed."
      />
      <AboutBody />
      <ExperienceTimeline />
      <CTASection />
    </>
  );
}
