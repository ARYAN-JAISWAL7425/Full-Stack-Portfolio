import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import About from "@/components/home/About";
import Work from "@/components/home/Work";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <About />
      <ExperienceTimeline />
      <Contact />
    </>
  );
}
