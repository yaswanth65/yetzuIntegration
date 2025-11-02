"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
// import ProgramsWebinarsSection from './components/ProgramsWebinarsSection';
// import WebinarsSection from "./components/WebinarsSection";
// import TestimonalsSection from "./components/TestimonialsSection";

// Accordion Item Component (with black answer text)
const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-indigo-100 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "shadow-md" : "hover:shadow-sm"
        }`}
    >
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-indigo-800">{question}</span>
        <span className="text-indigo-600 text-xl font-bold">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-800 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F8FAFF] to-white text-center py-[80px] px-[108px] relative overflow-hidden">
        {/* Avatars + Student count */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="flex -space-x-2">
            <Image
              src="/images/Avatar (1).png"
              alt="Student 1"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <Image
              src="/images/Avatar (2).png"
              alt="Student 2"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <Image
              src="/images/Avatar.png"
              alt="Student 3"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
          <p className="text-sm text-gray-500">150+ Students Enrolled</p>
        </div>

        {/* Main Heading */}
        <h1 className="font-inter font-semibold text-[40px] md:text-[68px] leading-[1.2] tracking-[-0.04em] text-gray-900 max-w-5xl mx-auto">
          Your Ultimate Academic{" "}
          <span className="block text-blue-600 md:text-[62px]">
            Mentorship & Learning Ecosystem
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-[16px] md:text-[18px] leading-relaxed font-sfpro font-normal">
          Unlock Your Potential with Personalized Mentorship, Milestone-Based
          Assignments, and Expert Academic Support — all in one intuitive
          platform.
        </p>


        {/* Hero Image */}
        <div className="flex justify-center mt-12">
          <Image
            src="/images/Hero Section.png"
            alt="Mentors"
            width={850}
            height={500}
            className="w-[90%] md:w-[850px] object-contain"
          />
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-6 bg-[#252525] text-white rounded-2xl py-8 px-6 max-w-4xl mx-auto -mt-16 shadow-lg relative z-10">
          {[
            { num: "200+", label: "Community Members" },
            { num: "24+", label: "Institutes Affiliated" },
            { num: "30k+", label: "Mentorship Hours" },
            { num: "100+", label: "Students Mentored" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center w-40 md:w-48 h-28 bg-white rounded-xl shadow-md transition-transform hover:scale-105"
            >
              <h3 className="text-[36px] md:text-[40px] font-semibold text-[#021165]">
                {item.num}
              </h3>
              <p className="text-black text-sm text-center">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* <WebinarsSection /> */}

      {/* 1:1 Mentorship Section */}
      <section className="py-[80px] px-[108px] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-inter font-bold text-[var(--Colors-Neutral-900,#252525)] leading-tight">
                1:1 Mentorship & Expert
                <span className="hidden md:inline"><br /></span>
                Academic Guidance
              </h2>

              <p className="mt-4 font-sfpro font-normal text-[16px] md:text-[18px] leading-relaxed text-[var(--Colors-Neutral-900,#252525)] opacity-80 max-w-3xl">
                Experience Personalized Coaching and Strategic Academic Support that Adapts to your Unique Goals and Challenges for Measurable Growth and Confidence.
              </p>
            </div>
            <button className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-inter font-medium">
              button
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Customized Mentorship Sessions",
                desc: "One-on-one sessions focused on your personal academic needs and growth",
                bgColor: "bg-[#E6EAFF]",
                iconBg: "bg-indigo-200",
                iconSrc: "/images/icon.png",
                textColor: "text-[var(--Colors-Neutral-900,#252525)]",
                descColor: "text-[var(--Colors-Neutral-900,#252525)]/80",
              },
              {
                title: "Milestone-Based Progress Tracking",
                desc: "Regular feedback loops track your development and keep you motivated.",
                bgColor: "bg-[#506BFE]",
                iconBg: "bg-white",
                iconSrc: "/images/icon.png",
                textColor: "text-white",
                descColor: "text-white/90",
              },
              {
                title: "Direct Mentor Engagement",
                desc: "Seamless communication channels for real-time support and clarifications.",
                bgColor: "bg-indigo-50",
                iconBg: "bg-indigo-200",
                iconSrc: "/images/icon.png",
                textColor: "text-[var(--Colors-Neutral-900,#252525)]",
                descColor: "text-[var(--Colors-Neutral-900,#252525)]/80",
              },
              {
                title: "Comprehensive Academic Support",
                desc: "Including assignment reviews, proofreading, and publication readiness and assistance.",
                bgColor: "bg-blue-500",
                iconBg: "bg-white",
                iconSrc: "/images/icon.png",
                textColor: "text-white",
                descColor: "text-white/90",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 ${item.bgColor} shadow-md transition-transform hover:scale-105`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center mb-6`}
                >
                  <Image
                    src={item.iconSrc}
                    alt="Feature Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className={`font-inter font-semibold ${item.textColor} mb-2`}>
                  {item.title}
                </h3>
                <p className={`font-sfpro font-normal text-sm ${item.descColor} leading-relaxed`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* How Yetzu Supports Assignments Section */}
      <section className="py-[80px] px-[108px] bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 leading-tight w-3/5">
                How Yetzu Supports Your Academic Assignments
              </h2>
            </div>
            <button className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Submit Now
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                title: "Assignment Submission & Reception",
                desc: "Students submit their assignments directly on Yetzu, initiating their academic task journey.",
                image: "/Images/Main Container.png",
              },
              {
                title: "Structured Feedback & Mentorship",
                desc: "Assignments undergo detailed review including proofreading, with students engaging mentors for clarifications and targeted guidance.",
                image: "/Images/assignment.png",
              },
              {
                title: "Progress Tracking & Finalization",
                desc: "Students track their assignment progress transparently, refining their work based on feedback until ready for submission.",
                image: "/Images/Progress tracking.png",
              },
              {
                title: "Certification & Recognition",
                desc: "Upon final approval, students receive official recognition or certification from Yetzu, validating their academic achievement.",
                image: "/Images/Certification.png",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden p-6 flex flex-col md:flex-row items-stretch gap-6 hover:shadow-xl transition-shadow"
              >
                <div className="md:w-1/2 flex flex-col justify-end space-y-3">
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>

                <div className="md:w-1/2 flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={150}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Success Section */}
      <section className="py-[80px] px-[108px] bg-white">
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
      </section>

      {/* Testimonials Section */}
      {/* <TestimonalsSection/> */}

      {/* Join Learners & Educators Section */}
      <section className="py-[80px] px-[108px] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Join Thousands of<br />
                <span className="text-blue-300">Successful Learners &</span><br />
                <span className="text-blue-300">Educators</span>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem ipsum, can be used for free any where for anything. It is effective tool so solve our text relate problems.
                can be used for free any where for anything. It is effective tool so solve our text relate problems.
              </p>
              <button className="px-6 py-3 bg-transparent border border-blue-400 text-blue-300 rounded-lg hover:bg-blue-500 hover:text-white transition-colors font-medium">
                Get started today
              </button>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-xl overflow-hidden shadow-lg max-w-full">
                <Image
                  src="/Images/Success.png"
                  alt="Join Our Community"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Webinars Section */}
      {/* <ProgramsWebinarsSection /> */}

      {/* Resources Section */}
      <section className="py-[80px] px-[108px] bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">Resources</h2>
              <p className="mt-4 text-gray-600 max-w-2xl">
                Access comprehensive knowledge hubs featuring learning guides, research articles, and self-paced resources to support continuous academic growth.
              </p>
            </div>
            <button className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Check the Resource
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12 flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full mb-4">
                Our Latest
              </span>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Lorem ipsum, can be used for free any where for anything. Ir is effective tool so
              </h3>
              <p className="text-gray-600 mb-6">
                Lorem ipsum, can be used for free any where for anything. Ir is effective tool so solve our...
              </p>
              <div className="flex items-center gap-3 mt-6">
                <Image
                  src="/Images/Avatar (1).png"
                  alt="Author"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">Saturday 9:00PM</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/Images/blog.png"
                alt="Featured Resource"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Lorem ipsym, can be used for free any where",
                excerpt: "Lorem ipsym, can be used for free any where for anything. Ir is effectove tool so solve our text relate problems...",
                image: "/Images/blog2.png",
                avatar: "/Images/Avatar (1).png",
                author: "John Doe",
                date: "Saturday 9:00PM",
              },
              {
                title: "Lorem ipsym, can be used for free any where",
                excerpt: "Lorem ipsym, can be used for free any where for anything. Ir is effectove tool so solve our text relate problems...",
                image: "/Images/blog2.png",
                avatar: "/Images/Avatar (1).png",
                author: "John Doe",
                date: "Saturday 9:00PM",
              },
              {
                title: "Lorem ipsym, can be used for free any where",
                excerpt: "Lorem ipsym, can be used for free any where for anything. Ir is effectove tool so solve our text relate problems...",
                image: "/Images/blog2.png",
                avatar: "/Images/Avatar (1).png",
                author: "John Doe",
                date: "Saturday 9:00PM",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.author}</p>
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
      <section className="py-[80px] px-[108px] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-indigo-900">FAQ</h2>
                <p className="mt-2 text-gray-600">
                  Know answers to all of your questions
                </p>
              </div>

              <div className="bg-indigo-50 p-6 rounded-xl shadow-lg border border-indigo-100">
                <h3 className="text-xl font-semibold text-gray-800">
                  Still have questions?
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Can't find the answer to your questions? Send us an email and
                  we'll get back to you as soon as possible.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                  Ask Here
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Your Question goes here?",
                  answer:
                    "Answer goes here. Keep it concise and helpful for users.",
                },
                {
                  question: "Your Question goes here?",
                  answer:
                    "This is where the detailed explanation or solution will appear when expanded.",
                },
                {
                  question: "Your Question goes here?",
                  answer:
                    "Accordion description goes here, try to keep it under 2 lines so it looks good and minimal.",
                },
                {
                  question: "Your Question goes here?",
                  answer:
                    "Provide clear, actionable advice or next steps for the user.",
                },
                {
                  question: "Your Question goes here?",
                  answer:
                    "Keep answers short, scannable, and user-focused to improve UX.",
                },
              ].map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Trusted by Leaders Section - Single Image + Text + Rounded Container */}
      <section className="py-[80px] px-[108px]">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-lg bg-white">
          {/* Main Combined Image */}
          <div className="relative">
            <Image
              src="/Images/testimonals.png"
              alt="Trusted by Leaders from Diverse Educational Institutions and Industries"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Content: Headline + Subtext + Button */}
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 mt-[-52]">
              Trusted by <span className="text-blue-600">Leaders</span> From Diverse<br />
              Educational <span className="text-blue-600">Institutions And Industries.</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Join a Thriving Community Dedicated to Academic Excellence Supported by Cutting-Edge Technology and Expert Mentorship.
            </p>

            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Invested in Your Academic Success
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}



