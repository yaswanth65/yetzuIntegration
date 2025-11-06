"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ProgramsWebinarsSection from "../../components/ProgramsWebinarsSection";
import WebinarsSection from "../../components/WebinarsSection";
import TestimonalsSection from "../../components/TestimonialsSection";
import AccordionItem from "@/components/AccordionItem";
import { useRenewAccessTokenMutation } from "@/lib/queries/identityService/useIdentityService";
// Accordion Item Component (with black answer text)

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionData = [
    {
      question: "Your Question goes here?",
      answer:
        "Accordion description goes here, try to keep it under 2 lines so it looks good and minimal.",
    },
    {
      question: "Your Question goes here?",
      answer:
        "Accordion description goes here, try to keep it under 2 lines so it looks good and minimal.",
    },
    {
      question: "Your Question goes here?",
      answer:
        "Accordion description goes here, try to keep it under 2 lines so it looks good and minimal.",
    },
    {
      question: "Your Question goes here?",
      answer:
        "Accordion description goes here, try to keep it under 2 lines so it looks good and minimal.",
    },
    {
      question: "Your Question goes here?",
      answer:
        "Accordion description goes here, try to keep it under 2 lines so it looks good and minimal.",
    },
  ];
  return (
    <>
      {/* HERO SECTION */}
      {/* HERO SECTION */}
      <section className="relative text-center min-h-[calc(100vh-80px)] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] overflow-hidden bg-gradient-to-b from-[#F8FAFF] to-white py-4 md:py-6">
        {/* Background Gradient Behind Hero Image */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_50.01%,#FFFFFF_100%)] z-0"></div>

        {/* Avatars + Student count */}
        <div className="flex justify-center items-center gap-2 mb-3 relative z-10 flex-wrap">
          <div className="flex -space-x-2">
            <Image
              src="/images/Avatar (1).png"
              alt="Student 1"
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
            />
            <Image
              src="/images/Avatar (2).png"
              alt="Student 2"
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
            />
            <Image
              src="/images/Avatar.png"
              alt="Student 3"
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
            />
          </div>
          <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-0">
            150+ Students Enrolled
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="font-inter font-semibold text-[28px] sm:text-[34px] md:text-[52px] lg:text-[68px] leading-[1.2] tracking-[-0.04em] text-[#252525] max-w-[95%] md:max-w-4xl mx-auto relative z-10 mb-3">
          Your Ultimate Academic{" "}
          <span className="block text-[#042BFD] text-[26px] sm:text-[32px] md:text-[52px] lg:text-[62px]">
            Mentorship & Learning Ecosystem
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 max-w-[90%] sm:max-w-2xl md:max-w-3xl mx-auto text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed font-sfpro font-normal relative z-10">
          Unlock Your Potential with Personalized Mentorship, Milestone-Based
          Assignments, and Expert Academic Support all in one intuitive
          platform.
        </p>

        {/* Hero Image - Made Bigger and Wider */}
        <div className="flex justify-center mt-4 md:mt-6 relative z-10">
          <Image
            src="/images/Hero Section.png"
            alt="Mentors"
            width={1100}
            height={600}
            className="w-full sm:w-[95%] md:w-[950px] lg:w-[1100px] object-contain scale-110 md:scale-105"
          />
        </div>

        {/* Stats Section - Moved Up More */}
        <div className="flex flex-nowrap justify-center gap-4 sm:gap-6 bg-[#252525] text-white rounded-2xl py-6 sm:py-8 px-4 sm:px-6 w-full overflow-x-auto max-w-[1220px] mx-auto -mt-20 md:-mt-32 lg:-mt-40 shadow-lg relative z-20">
          {[
            { num: "200+", label: "Community Members" },
            { num: "24+", label: "Institutes Affiliated" },
            { num: "30k+", label: "Mentorship Hours" },
            { num: "100+", label: "Students Mentored" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 w-[267px] min-w-[267px] flex-shrink-0 h-[164px] bg-white rounded-[16px] shadow-md transition-transform p-[24px]"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px",
                gap: "8px",
              }}
            >
              <h3
                className="font-inter font-semibold text-[56px] leading-[68px] text-center tracking-[-0.02em] text-[#021165]"
                style={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "56px",
                  lineHeight: "68px",
                  textAlign: "center",
                  letterSpacing: "-0.02em",
                  color: "#021165",
                }}
              >
                {item.num}
              </h3>
              <p
                className="font-inter font-semibold text-[22px] leading-[27px] text-center tracking-[-0.06em] text-[#252525]"
                style={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "22px",
                  lineHeight: "27px",
                  textAlign: "center",
                  letterSpacing: "-0.06em",
                  color: "#252525",
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section
        className="w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] 
             flex flex-col items-center justify-center gap-8 md:gap-12 
             bg-white py-8 md:py-12"
        style={{
          // Navbar takes ~75px; make the rest full height dynamically
          minHeight: "calc(100vh - 75px)",
        }}
      >
        {/* Heading */}
        <h2 className="font-inter text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] font-semibold text-[#021165] text-center leading-tight">
          Lorem Ipsum Dolor Self Amet
        </h2>

        {/* Video Wrapper */}
        <div
          className="w-full max-w-[1224px] rounded-2xl overflow-hidden shadow-lg relative"
          style={{
            // Responsive 16:9 aspect ratio — fallback-friendly
            aspectRatio: "16/9",
            borderRadius: "20px",
            maxHeight: "calc(100vh - 200px)", // avoid overflow on small screens
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/VCPGMjCW0is?rel=0&modestbranding=1"
            title="Educational Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </section>


      <WebinarsSection />

      {/* 1:1 Mentorship Section */}
      <section className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] gap-[32px] md:gap-[52px] bg-white w-full py-8 md:py-12">
        <div className="flex flex-col justify-center items-start gap-[24px] w-full max-w-[1224px]">
          {/* Header & Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 md:gap-0">
            <h2 className="font-inter font-medium text-[28px] md:text-[36px] lg:text-[46px] leading-[120%] md:leading-[56px] tracking-[-0.06em] text-[#021165] max-w-full md:max-w-[658px]">
              1:1 Mentorship & Expert Academic Guidance
            </h2>

            <button className="flex flex-row justify-center items-center gap-[8px] px-[16px] py-[8px] w-full sm:w-[174px] h-[52px] bg-[#042BFD] shadow-[0px_2px_4px_rgba(31,30,130,0.04)] rounded-[12px] font-sfpro text-[16px] md:text-[18px] leading-[21px] tracking-[-0.03em] text-white hover:bg-[#021DC0] transition-colors">
              Button
            </button>
          </div>

          {/* Subtext */}
          <p className="font-sfpro font-normal text-[16px] md:text-[18px] leading-[150%] md:leading-[21px] tracking-[-0.03em] text-[#252525] w-full max-w-full md:max-w-[860px]">
            Experience Personalized Coaching and Strategic Academic Support that
            Adapts to your Unique Goals and Challenges for Measurable Growth and
            Confidence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] md:gap-[24px] w-full max-w-[1224px]">
          {[
            {
              title: "Customized Mentorship Sessions",
              desc: "One-on-one sessions focused on your personal academic needs and growth",
              bgColor: "bg-[#E6EAFF]",
              iconBg: "bg-[#9BAAFE]",
              titleColor: "text-[#252525]",
              descColor: "text-[#252525]",
            },
            {
              title: "Milestone-Based Progress Tracking",
              desc: "Regular feedback loops track your development and keep you motivated.",
              bgColor: "bg-[#506BFE]",
              iconBg: "bg-[#E6EAFF]",
              titleColor: "text-white",
              descColor: "text-white",
            },
            {
              title: "Direct Mentor Engagement",
              desc: "Seamless communication channels for real-time support and clarifications.",
              bgColor: "bg-[#E6EAFF]",
              iconBg: "bg-[#9BAAFE]",
              titleColor: "text-[#252525]",
              descColor: "text-[#252525]",
            },
            {
              title: "Comprehensive Academic Support",
              desc: "Including assignment reviews, proofreading, and publication readiness and assistance.",
              bgColor: "bg-[#506BFE]",
              iconBg: "bg-[#E6EAFF]",
              titleColor: "text-white",
              descColor: "text-white",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between items-start p-[20px] md:p-[24px] gap-[20px] w-full min-h-[280px] md:min-h-[288px] ${item.bgColor} shadow-[0px_16px_32px_-12px_rgba(31,30,130,0.1)] rounded-[16px]`}
            >
              {/* Icon */}
              <div
                className={`flex flex-row items-center justify-center p-[16px] gap-[24px] w-[52px] h-[52px] ${item.iconBg} rounded-full flex-shrink-0`}
              >
                <Image
                  src="/images/icon.png"
                  alt="Feature Icon"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px]"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col items-start gap-[8px] w-full">
                <h3
                  className={`font-inter font-semibold text-[18px] md:text-[22px] leading-[130%] md:leading-[27px] tracking-[-0.06em] ${item.titleColor}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`font-sfpro font-normal text-[14px] md:text-[16px] leading-[150%] md:leading-[19px] tracking-[-0.03em] ${item.descColor}`}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Yetzu Supports Assignments Section */}
      {/* How Yetzu Supports Assignments Section */}
      <section className="flex justify-center bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_45%,#FFFFFF_100%)] py-[60px] md:py-[80px] lg:py-[100px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
        <div className="w-full max-w-[1224px]">
          {/* ===== Header Row ===== */}
          <div className="flex flex-col md:flex-row items-start justify-between mb-[40px] md:mb-[60px] gap-4">
            <h2 className="font-inter font-medium text-[#021165] text-[28px] md:text-[36px] lg:text-[46px] leading-[120%] md:leading-[56px] tracking-[-0.06em] max-w-full md:max-w-[640px]">
              How Yetzu Supports Your Academic Assignments
            </h2>
            <button className="mt-2 px-6 md:px-8 py-3 bg-[#042BFD] text-white rounded-[10px] text-[14px] md:text-[16px] font-medium shadow-[0_3px_8px_rgba(4,43,253,0.3)] hover:bg-[#001EE5] transition-all w-full sm:w-auto">
              Submit Now
            </button>
          </div>

          {/* ===== Cards Grid ===== */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 md:gap-6">
              {/* Left Large Card */}
              <div className="relative w-full min-h-[320px] md:min-h-[377px] rounded-[20px] bg-white shadow-[0_20px_40px_-12px_rgba(31,30,130,0.1)] p-6 md:p-8 flex flex-col justify-end overflow-hidden">
                <img
                  src="/images/Assignment Submission Card.png"
                  alt="Assignment Submission"
                  className="absolute top-0 right-0 w-[240px] md:w-[360px] h-[240px] md:h-[360px] object-contain"
                />
                <div className="relative z-10 max-w-full md:max-w-[330px]">
                  <h3 className="font-inter font-semibold text-[#252525] text-[18px] md:text-[22px] leading-[140%] md:leading-[27px] tracking-[-0.06em] mb-2 md:mb-3">
                    Assignment Submission &<br /> Reception
                  </h3>
                  <p className="font-sfpro text-[#5C5C5C] text-[13px] md:text-[14px] leading-[150%] md:leading-[20px]">
                    Students submit their assignments directly on Yetzu,
                    initiating their academic task journey.
                  </p>
                </div>
              </div>

              {/* Right Small Card */}
              <div className="relative w-full min-h-[320px] md:min-h-[377px] rounded-[20px] bg-white shadow-[0_20px_40px_-12px_rgba(31,30,130,0.1)] p-6 md:p-8 flex flex-col justify-end overflow-hidden">
                <img
                  src="/images/assignment.png"
                  alt="Structured Feedback"
                  className="absolute top-[8px] right-[8px] w-[180px] md:w-[260px] h-[230px] md:h-[330px] object-contain"
                />
                <div className="relative z-10 max-w-full md:max-w-[330px]">
                  <h3 className="font-inter font-semibold text-[#252525] text-[18px] md:text-[22px] leading-[140%] md:leading-[27px] tracking-[-0.06em] mb-2 md:mb-3">
                    Structured Feedback &<br /> Mentorship
                  </h3>
                  <p className="font-sfpro text-[#5C5C5C] text-[13px] md:text-[14px] leading-[150%] md:leading-[20px]">
                    Assignments undergo detailed review including proofreading,
                    with students engaging mentors for clarifications and
                    targeted guidance.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4 md:gap-6">
              {/* Left Small Card */}
              <div className="relative w-full min-h-[320px] md:min-h-[377px] rounded-[20px] bg-white shadow-[0_20px_40px_-12px_rgba(31,30,130,0.1)] p-6 md:p-8 flex flex-col justify-end overflow-hidden">
                <img
                  src="/images/Progress Tracking Image.png"
                  alt="Progress Tracking"
                  className="absolute top-[8px] right-[16px] w-[180px] md:w-[260px] h-[230px] md:h-[330px] object-contain"
                />
                <div className="relative z-10 max-w-full md:max-w-[330px]">
                  <h3 className="font-inter font-semibold text-[#252525] text-[18px] md:text-[22px] leading-[140%] md:leading-[27px] tracking-[-0.06em] mb-2 md:mb-3">
                    Progress Tracking &<br /> Finalization
                  </h3>
                  <p className="font-sfpro text-[#5C5C5C] text-[13px] md:text-[14px] leading-[150%] md:leading-[20px]">
                    Students track their assignment progress transparently,
                    refining their work based on feedback until ready for
                    submission.
                  </p>
                </div>
              </div>

              {/* Right Large Card */}
              <div className="relative w-full min-h-[320px] md:min-h-[377px] rounded-[20px] bg-white shadow-[0_20px_40px_-12px_rgba(31,30,130,0.1)] p-6 md:p-8 flex flex-col justify-end overflow-hidden">
                <img
                  src="/images/Certificates Visual.png"
                  alt="Certificates"
                  className="absolute top-[4px] right-[8px] w-[240px] md:w-[340px] h-[230px] md:h-[330px] object-contain"
                />
                <div className="relative z-10 max-w-full md:max-w-[330px]">
                  <h3 className="font-inter font-semibold text-[#252525] text-[18px] md:text-[22px] leading-[140%] md:leading-[27px] tracking-[-0.06em] mb-2 md:mb-3">
                    Certification & Recognition
                  </h3>
                  <p className="font-sfpro text-[#5C5C5C] text-[13px] md:text-[14px] leading-[150%] md:leading-[20px]">
                    Upon final approval, students receive official recognition
                    or certification from Yetzu, validating their academic
                    achievement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Success Section */}
      {/* <section className="py-[80px] px-[108px] bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 leading-tight">
              Proven Success,<br />Recognized Excellence
            </h2>
            <p className="text-gray-600">
              Celebrate real milestones with Yetzu’s impactful success stories, achievement stats, and institutional endorsements that demonstrate the platform’s transformative academic power.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Button
            </button>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="rounded-xl overflow-hidden shadow-lg max-w-full">
              <Image
                src="/Images/Success.png"
                alt="Success Story - Students Collaborating"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <TestimonalsSection />

      {/* Join Learners & Educators Section */}
      {/* Join Learners & Educators Section */}
      <section className="bg-gradient-to-b from-white via-[#E2E7FF] to-white min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-12">
        <div className="w-full max-w-[1224px] mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-xl md:p-[64px_76px_64px_83px] p-6 flex flex-col md:flex-row items-center md:gap-[101px] gap-8 bg-[#252525] md:h-[523px]">
            {/* Left Content */}
            <div className="w-full md:w-[571px] md:h-[333px] flex flex-col md:gap-[40px] gap-6 text-center md:text-left">
              <div className="flex flex-col md:gap-[16px] gap-4 md:h-[241px]">
                <h2 className="font-[Inter] font-medium text-[28px] md:text-[36px] lg:text-[46px] md:leading-[56px] leading-[120%] tracking-[-0.06em] text-white md:h-[168px]">
                  Join Thousands of <br /> Successful
                  <span className="text-[#9BAAFE]"> Learners &</span> <br />
                  <span className="text-[#9BAAFE]">Educators</span>
                </h2>

                <p className="font-[SF Pro] text-[#E6EAFF] text-[14px] md:text-[16px] md:leading-[19px] leading-[150%] tracking-[-0.03em] md:w-[519px] md:h-[57px] mx-auto md:mx-0 font-normal">
                  Lorem ipsum, can be used for free any where for anything. It
                  is an effective tool to solve text-related problems. It can be
                  used freely and efficiently for learning and education.
                </p>
              </div>

              <div className="md:h-[52px]">
                <button className="px-4 py-3 bg-[#E6EAFF] text-[#021165] rounded-[12px] border-2 border-[#0325D7] hover:bg-[#d9e0ff] transition-colors font-[SF Pro] text-[18px] leading-[21px] tracking-[-0.03em] flex items-center justify-center gap-2 mx-auto md:mx-0 w-full sm:w-auto md:w-[172px] md:h-[52px]">
                  Get started today
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-[384px] md:h-[395px] flex justify-center md:justify-end">
              <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-[384px]">
                <Image
                  src="/images/Success.png"
                  alt="Join Our Community"
                  width={384}
                  height={395}
                  className="w-full h-auto object-cover opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Webinars Section */}
      <ProgramsWebinarsSection />

      <section className="bg-gradient-to-b from-white via-[#E2E7FF] to-white py-[60px] md:py-[80px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
        <div className="w-full max-w-[1224px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-[40px] md:mb-[52px] gap-4">
            <div className="w-full md:w-3/4">
              <h2 className="font-[Inter] font-medium text-[28px] md:text-[36px] lg:text-[46px] leading-[120%] lg:leading-[100%] tracking-[-0.06em] text-[#021165]">
                Resources
              </h2>
              <p className="mt-4 text-[#252525] text-[14px] md:text-base font-[SF Pro] max-w-full md:max-w-2xl">
                Access comprehensive knowledge hubs featuring learning guides,
                research articles, and self-paced resources to support
                continuous academic growth.
              </p>
            </div>
            <button className="mt-4 md:mt-0 px-4 md:px-6 py-3 bg-[#042BFD] text-white rounded-[12px] hover:bg-[#021DC0] transition-colors font-medium w-full sm:w-auto">
              Check the Resource
            </button>
          </div>

          <div className="bg-white rounded-[20px] shadow-lg overflow-hidden mb-[40px] md:mb-[52px] flex flex-col md:flex-row justify-between p-[16px] md:p-[19px] gap-4 md:gap-6 hover:shadow-xl transition-shadow">
            <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full mb-3 md:mb-4">
                  Our Latest
                </span>
                <h3 className="font-[Inter] font-semibold text-[18px] md:text-[22px] leading-[120%] lg:leading-[100%] tracking-[-0.06em] text-[#252525] mb-2 md:mb-3">
                  Lorem ipsum, can be used for free any where for anything. It
                  is effective tool so
                </h3>
                <p className="font-[SF Pro] font-normal text-[13px] md:text-[14px] leading-[150%] text-[#252525CC]">
                  Lorem ipsum, can be used for free any where for anything. It
                  is an effective tool to solve our text-related problems...
                </p>
              </div>

              <div className="flex items-end gap-3 mt-6 md:mt-8">
                <Image
                  src="/images/Avatar (1).png"
                  alt="Author"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-[#252525]">John Doe</p>
                  <p className="text-xs text-gray-500">Saturday 9:00PM</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 min-h-[200px] md:min-h-0">
              <Image
                src="/images/blog.png"
                alt="Featured Resource"
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[24px]">
            {[
              {
                title: "Lorem ipsum, can be used for free any where",
                excerpt:
                  "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
                image: "/images/blog2.png",
                avatar: "/images/Avatar (1).png",
                author: "John Doe",
                date: "Saturday 9:00PM",
              },
              {
                title: "Lorem ipsum, can be used for free any where",
                excerpt:
                  "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
                image: "/images/blog2.png",
                avatar: "/images/Avatar (1).png",
                author: "John Doe",
                date: "Saturday 9:00PM",
              },
              {
                title: "Lorem ipsum, can be used for free any where",
                excerpt:
                  "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
                image: "/images/blog2.png",
                avatar: "/images/Avatar (1).png",
                author: "John Doe",
                date: "Saturday 9:00PM",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-40 md:h-48 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h4 className="font-[Inter] font-semibold text-[18px] md:text-[22px] leading-[120%] lg:leading-[100%] tracking-[-0.06em] text-[#252525] mb-2">
                    {item.title}
                  </h4>
                  <p className="font-[SF Pro] text-[13px] md:text-[14px] font-normal text-[#252525CC] mb-3 md:mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#252525]">
                        {item.author}
                      </p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-[60px] md:py-[80px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] bg-white min-h-[calc(100vh-80px)] flex items-center">
        <div className="w-full max-w-[1224px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* LEFT SIDE */}
            <div className="flex flex-col justify-between space-y-8 md:space-y-12">
              <div>
                <h2 className="text-[32px] md:text-[38px] lg:text-[46px] font-medium text-[#021165] leading-[120%] lg:leading-[100%] tracking-[-0.06em] font-['Inter']">
                  FAQ
                </h2>
                <p className="mt-4 text-[#5C5C5C] font-['SF Pro'] text-[16px] md:text-[18px] font-normal leading-[150%] lg:leading-[100%] tracking-[-0.03em]">
                  Know answers to all of your questions
                </p>
              </div>

              {/* Still Have Questions Card */}
              <div className="bg-[#F5F6FF] p-4 md:p-6 rounded-[12px] shadow-md border border-[#F0F0FC] space-y-3 md:space-y-4 w-full lg:w-3/4">
                <h3 className="text-[18px] md:text-[22px] font-semibold text-[#021165] font-['Inter'] tracking-[-0.06em] leading-[120%] lg:leading-[100%]">
                  Still have questions?
                </h3>
                <p className="text-[#252525] text-[11px] md:text-[12px] font-normal font-['SF Pro'] leading-[150%] lg:leading-[100%] tracking-[0%]">
                  Can't find the answer to your questions? Send us an email and
                  we'll get back to you as soon as possible.
                </p>
                <button className="mt-2 bg-[#042BFD] text-white rounded-[8px] px-4 py-2 font-medium text-[13px] md:text-[14px] font-['SF Pro'] hover:bg-[#021165] transition-colors w-full sm:w-auto">
                  Ask Here
                </button>
              </div>
            </div>

            {/* RIGHT SIDE - Accordion */}
            <div className="space-y-4">
              {accordionData.map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Leaders Section - Single Image + Text + Rounded Container */}
       <section className="py-[60px] md:py-[80px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] min-h-[calc(100vh-80px)] flex items-center justify-center bg-[linear-gradient(180deg,_#FFFFFF_0%,_#F8FAFF_40%,_#F5F8FF_60%,_#FFFFFF_100%)]">
      <div className="w-full max-w-[1224px] mx-auto rounded-3xl overflow-hidden shadow-lg relative">
        {/* Main Combined Image - 16:9 Aspect Ratio */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src="/images/testimonals.png"
            alt="Trusted by Leaders from Diverse Educational Institutions and Industries"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for fog effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none"></div>
        </div>

        {/* Content: Headline + Subtext + Button - Overlapping the image */}
        <div className="relative -mt-20 md:-mt-24 lg:-mt-28 pt-0 pb-6 px-6 md:pb-8 md:px-8 lg:pb-12 lg:px-12 text-center bg-white">
          <h2 className="text-[22px] md:text-[32px] lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            Trusted by <span className="text-blue-600">Leaders</span> From
            Diverse
            <br className="hidden md:block" />
            Educational{" "}
            <span className="text-blue-600">
              Institutions And Industries.
            </span>
          </h2>

          <p className="text-gray-600 text-[14px] md:text-base max-w-full md:max-w-2xl mx-auto mb-6 md:mb-8 mt-3 md:mt-5">
            Join a Thriving Community Dedicated to Academic Excellence
            Supported by Cutting-Edge Technology and Expert Mentorship.
          </p>

          <button className="px-6 md:px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium w-full sm:w-auto text-[14px] md:text-base">
            Get Invested in Your Academic Success
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
