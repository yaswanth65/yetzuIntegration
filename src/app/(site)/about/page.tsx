"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHeroSection from "./components/AboutHeroSection";
import FounderStory from "./components/FounderStory";
import TeamSection from "./components/TeamSection";
import MissionVisionSection from "./components/MissionVisionSection";
import InitiativesSection from "./components/InitiativesSection";
import PurposeBeliefSection from "./components/PurposeBeliefSection";
import OurImpactSection from "./components/OurImpactSection";
import TrustedByLeaders from "@/components/shared/TrustedByLeaders";

export default function About() {
  return (
    <>
      <Navbar />
      <AboutHeroSection />
      <FounderStory />
      <TeamSection />
      <MissionVisionSection />
      <InitiativesSection />
      <PurposeBeliefSection />
      <OurImpactSection />
      <TrustedByLeaders />
    </>
  );
}
