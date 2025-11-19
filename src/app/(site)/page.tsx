"use client";

import HeroSection from "./components/home/HeroSection";
import VideoSection from "./components/home/VideoSection";
import WebinarsSection from "../../components/WebinarsSection";
import MentorshipSection from "./components/home/MentorshipSection";
import AssignmentSupportSection from "./components/home/AssignmentSupportSection";
import TestimonalsSection from "../../components/TestimonialsSection";
import JoinCommunity from "../../components/shared/JoinCommunity";
import ProgramsWebinarsSection from "../../components/ProgramsWebinarsSection";
import ResourcesSection from "./components/home/ResourcesSection";
import FAQSection from "../../components/shared/FAQSection";
import TrustedByLeaders from "../../components/shared/TrustedByLeaders";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VideoSection />
      <WebinarsSection />
      <MentorshipSection />
      <AssignmentSupportSection />
      <TestimonalsSection />
      <JoinCommunity />
      <ProgramsWebinarsSection />
      <ResourcesSection />
      <FAQSection />
      <TrustedByLeaders />
    </>
  );
}
