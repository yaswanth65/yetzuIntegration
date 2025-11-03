"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ProgramsWebinarsSection from '../components/ProgramsWebinarsSection';
import WebinarsSection from "../components/WebinarsSection";
import TestimonalsSection from "../components/TestimonialsSection";

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
      className={`bg-indigo-100 rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? "shadow-md" : "hover:shadow-sm"
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
     {/* HERO SECTION */}
{/* HERO SECTION */}
<section className="relative text-center py-[60px] md:py-[80px] px-6 sm:px-8 md:px-[60px] lg:px-[80px] xl:px-[108px] overflow-hidden bg-gradient-to-b from-[#F8FAFF] to-white">
  {/* Background Gradient Behind Hero Image */}
  <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_50.01%,#FFFFFF_100%)] z-0"></div>

  {/* Avatars + Student count */}
  <div className="flex justify-center items-center gap-2 mb-6 relative z-10 flex-wrap">
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
    <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-0">150+ Students Enrolled</p>
  </div>

  {/* Main Heading */}
  <h1 className="font-inter font-semibold text-[28px] sm:text-[34px] md:text-[52px] lg:text-[68px] leading-[1.2] tracking-[-0.04em] text-[#252525] max-w-[95%] md:max-w-4xl mx-auto relative z-10">
    Your Ultimate Academic{" "}
    <span className="block text-[#042BFD] text-[26px] sm:text-[32px] md:text-[52px] lg:text-[62px]">
      Mentorship & Learning Ecosystem
    </span>
  </h1>

  {/* Subheading */}
  <p className="mt-4 md:mt-6 text-gray-600 max-w-[90%] sm:max-w-2xl md:max-w-3xl mx-auto text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed font-sfpro font-normal relative z-10">
    Unlock Your Potential with Personalized Mentorship, Milestone-Based
    Assignments, and Expert Academic Support all in one intuitive
    platform.
  </p>


  {/* Hero Image */}
  <div className="flex justify-center mt-8 md:mt-12 relative z-10">
    <Image
      src="/images/Hero Section.png"
      alt="Mentors"
      width={850}
      height={500}
      className="w-[95%] sm:w-[85%] md:w-[750px] lg:w-[850px] object-contain"
    />
  </div>

  {/* Stats Section */}
  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 bg-[#252525] text-white rounded-2xl py-6 sm:py-8 px-4 sm:px-6 max-w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto -mt-10 md:-mt-16 shadow-lg relative z-10">
    {[
      { num: "200+", label: "Community Members" },
      { num: "24+", label: "Institutes Affiliated" },
      { num: "30k+", label: "Mentorship Hours" },
      { num: "100+", label: "Students Mentored" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex flex-col items-center justify-center w-[140px] sm:w-[160px] md:w-40 lg:w-48 h-[100px] sm:h-[110px] md:h-28 bg-white rounded-xl shadow-md transition-transform"
      >
        <h3 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold text-[#021165]">
          {item.num}
        </h3>
        <p className="text-black text-xs sm:text-sm text-center px-2">{item.label}</p>
      </div>
    ))}
  </div>
</section>




{/* Video Section */}
<section
  className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-[60px] lg:px-[80px] xl:px-[108px] py-[60px] md:py-[100px] lg:py-[120px] flex flex-col items-center justify-between bg-white"
>
  {/* Top Heading */}
  <h2 className="font-inter text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] font-semibold text-[#021165] mb-6 md:mb-8 text-center leading-tight">
    Lorem Ipsum Dolor Self Amet
  </h2>

  {/* Video Placeholder */}
  <div
    className="w-full max-w-[1224px] h-[220px] sm:h-[350px] md:h-[480px] lg:h-[650px] rounded-2xl overflow-hidden shadow-lg"
    style={{
      borderRadius: '20px',
    }}
  >
    {/* YouTube Education Video Placeholder */}
    <iframe
      src="https://www.youtube.com/watch?v=VCPGMjCW0is"
      title="Educational Video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    ></iframe>
  </div>
</section>



       <WebinarsSection />


      {/* 1:1 Mentorship Section */}
     <section className="py-[120px] px-[108px] bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
      <div>
       <h2 className="text-3xl md:text-4xl font-interbold font-bold text-[#021165] leading-tight">
          1:1 Mentorship & Expert 
        <span className="hidden md:inline"><br /></span>
        Academic Guidance
        </h2>

        <p className="mt-4 font-sfpro font-normal text-[16px] md:text-[18px] leading-relaxed text-[#252525] opacity-80 max-w-3xl">
          Experience Personalized Coaching and Strategic Academic Support that Adapts to your Unique Goals and Challenges for Measurable Growth and Confidence.
        </p>
      </div>
      <button className="mt-6 md:mt-0 px-6 py-3 bg-[#042BFD] text-white rounded-lg transition-colors font-inter font-medium">
        button
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
       title: "Customized Mentorship Sessions",
       desc: "One-on-one sessions focused on your personal academic needs and growth",
       bgColor: "bg-[#E6EAFF]",  
        iconBg: "bg-[#9BAAFE]",   
        iconSrc: "/images/icon.png",
        titleClass: "font-inter font-semibold text-[#252525]",
          descClass: "font-sfpro font-normal text-[#252525]",
       },
        {
          title: "Milestone-Based Progress Tracking",
          desc: "Regular feedback loops track your development and keep you motivated.",
          bgColor: "bg-[#506BFE]",
          iconBg: "bg-[#E6EAFF]",
          iconSrc: "/images/icon.png",
          textColor: "font-inter font-semibold text-white",
          descColor: "font-sfpro font-normal text-white/90",
        },
        {
          title: "Direct Mentor Engagement",
          desc: "Seamless communication channels for real-time support and clarifications.",
          bgColor: "bg-[#E6EAFF]",  
          iconBg: "bg-[#9BAAFE]",
          iconSrc: "/images/icon.png",
          titleClass: "font-inter font-semibold text-[#252525]",
          descClass: "font-sfpro font-normal text-[#252525]",
        },
        {
          title: "Comprehensive Academic Support",
          desc: "Including assignment reviews, proofreading, and publication readiness and assistance.",
           bgColor: "bg-[#506BFE]",
          iconBg: "bg-[#E6EAFF]",
          iconSrc: "/images/icon.png",
          textColor: "font-inter font-semibold text-white",
          descColor: "font-sfpro font-normal text-white/90",
        },
      ].map((item, index) => (
        <div
          key={index}
          className={`rounded-xl p-6 ${item.bgColor} shadow-md transition-transform`}
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
    {/* How Yetzu Supports Assignments Section */}
<section className="py-[80px] px-6 sm:px-[60px] md:px-[80px] lg:px-[108px] bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_50.01%,#FFFFFF_100%)]">
  <div className="max-w-7xl mx-auto">
    {/* Heading + Button Row */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
      <div>
        <h2
          className="font-inter font-medium text-[#021165] text-[32px] sm:text-[38px] md:text-[46px] leading-[100%] tracking-[-0.06em] w-full md:w-3/5"
        >
          How Yetzu Supports Your Academic Assignments
        </h2>
      </div>
      <button
        className="mt-6 md:mt-0 px-6 py-3 bg-[#042BFD] text-white rounded-lg transition-colors font-medium text-[16px]"
      >
        Submit Now
      </button>
    </div>

    {/* Cards Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {[
        {
          title: "Assignment Submission & Reception",
          desc: "Students submit their assignments directly on Yetzu, initiating their academic task journey.",
          image: "/Images/Assignment Submission Card.png",
        },
        {
          title: "Structured Feedback & Mentorship",
          desc: "Assignments undergo detailed review including proofreading, with students engaging mentors for clarifications and targeted guidance.",
          image: "/Images/assignment.png",
        },
        {
          title: "Progress Tracking & Finalization",
          desc: "Students track their assignment progress transparently, refining their work based on feedback until ready for submission.",
          image: "/Images/Progress Tracking Image.png",
        },
        {
          title: "Certification & Recognition",
          desc: "Upon final approval, students receive official recognition or certification from Yetzu, validating their academic achievement.",
          image: "/Images/Certificates Visual.png",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden p-6 flex flex-col md:flex-row items-stretch gap-6 hover:shadow-xl transition-shadow"
        >
          {/* Text Content */}
          <div className="md:w-1/2 flex flex-col justify-end space-y-3">
            <h3 className="font-inter font-semibold text-[#252525] text-[20px] sm:text-[22px] leading-[100%] tracking-[-0.06em]">
              {item.title}
            </h3>
            <p className="font-sfpro font-normal text-[#252525] text-[14px] leading-[100%] tracking-[0%]">
              {item.desc}
            </p>
          </div>

          {/* Image */}
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
      <TestimonalsSection/>

      {/* Join Learners & Educators Section */}
   <section className="bg-gradient-to-b from-white via-[#E2E7FF] to-white py-[120px] px-[108px]">
  <div className="max-w-7xl mx-auto">
    <div className="rounded-3xl overflow-hidden shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 bg-[#252525]">
      
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h2 className="font-[Inter] font-medium text-[46px] leading-[100%] tracking-[-0.06em] text-white">
          Join Thousands of <br /> Successful
          <span className="text-[#9BAAFE]">  Learners &</span> <br />
          <span className="text-[#9BAAFE]">Educators</span>
        </h2>

        <p className="font-[SF Pro] text-[#FFFFFFCC] text-[16px] leading-[150%] tracking-[-0.03em] max-w-[500px] mx-auto md:mx-0 font-normal">
          Lorem ipsum, can be used for free any where for anything. It is an
          effective tool to solve text-related problems. It can be used freely
          and efficiently for learning and education.
        </p>

        <button className="px-4 md:px-6 py-3 bg-[#E6EAFF] text-[#021165] rounded-[12px] hover:bg-[#d9e0ff] transition-colors font-medium flex items-center justify-center gap-2 mx-auto md:mx-0">
          Get started today
        </button>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/Images/Success.png"
            alt="Join Our Community"
            width={384}
            height={395}
            className="w-[384px] h-[395px] object-cover opacity-100"
          />
        </div>
      </div>
    </div>
  </div>
</section>


{/* Programs & Webinars Section */}
<ProgramsWebinarsSection />

      {/* Resources Section */}
     <section className="bg-gradient-to-b from-white via-[#E2E7FF] to-white py-[120px] px-[108px]">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-[52px]">
      <div className="md:w-3/4">
        <h2 className="font-[Inter] font-medium text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165]">
          Resources
        </h2>
        <p className="mt-4 text-[#252525] text-base font-[SF Pro] max-w-2xl">
          Access comprehensive knowledge hubs featuring learning guides, research articles,
          and self-paced resources to support continuous academic growth.
        </p>
      </div>
      <button className="mt-6 md:mt-0 px-6 py-3 bg-[#042BFD] text-white rounded-[12px] hover:bg-[#021DC0] transition-colors font-medium">
        Check the Resource
      </button>
    </div>

    {/* Featured Blog Section */}
    <div className="bg-white rounded-[20px] shadow-lg overflow-hidden mb-[52px] flex flex-col md:flex-row justify-between p-[16px] md:p-[19px] gap-6 hover:shadow-xl transition-shadow">
      {/* Left */}
      <div className="md:w-1/2 p-6">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full mb-4">
          Our Latest
        </span>
        <h3 className="font-[Inter] font-semibold text-[22px] leading-[100%] tracking-[-0.06em] text-[#252525] mb-3">
          Lorem ipsum, can be used for free any where for anything. It is effective tool so
        </h3>
        <p className="font-[SF Pro] font-normal text-[14px] leading-[150%] text-[#252525CC] mb-6">
          Lorem ipsum, can be used for free any where for anything. It is an effective tool
          to solve our text-related problems...
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
            <p className="text-sm font-medium text-[#252525]">John Doe</p>
            <p className="text-xs text-gray-500">Saturday 9:00PM</p>
          </div>
        </div>
      </div>

      {/* Right */}
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

    {/* Blog Grid Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
      {[
        {
          title: "Lorem ipsum, can be used for free any where",
          excerpt:
            "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/Images/blog2.png",
          avatar: "/Images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
        {
          title: "Lorem ipsum, can be used for free any where",
          excerpt:
            "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/Images/blog2.png",
          avatar: "/Images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
        {
          title: "Lorem ipsum, can be used for free any where",
          excerpt:
            "Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems...",
          image: "/Images/blog2.png",
          avatar: "/Images/Avatar (1).png",
          author: "John Doe",
          date: "Saturday 9:00PM",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
            <h4 className="font-[Inter] font-semibold text-[22px] leading-[100%] tracking-[-0.06em] text-[#252525] mb-2">
              {item.title}
            </h4>
            <p className="font-[SF Pro] text-[14px] font-normal text-[#252525CC] mb-4 line-clamp-3">
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
                <p className="text-sm font-medium text-[#252525]">{item.author}</p>
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
    <section className="py-[120px] px-[108px] bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-between space-y-12">
        <div>
          <h2 className="text-[46px] font-medium text-[#021165] leading-[100%] tracking-[-0.06em] font-['Inter']">
            FAQ
          </h2>
          <p className="mt-4 text-[#5C5C5C] font-['SF Pro'] text-[18px] font-normal leading-[100%] tracking-[-0.03em]">
            Know answers to all of your questions
          </p>
        </div>

        {/* Still Have Questions Card */}
        <div className="bg-[#F5F6FF] p-6 rounded-[12px] shadow-md border border-[#F0F0FC] space-y-4 w-3/4">
          <h3 className="text-[22px] font-semibold text-[#021165] font-['Inter'] tracking-[-0.06em] leading-[100%]">
            Still have questions?
          </h3>
          <p className="text-[#252525] text-[12px] font-normal font-['SF Pro'] leading-[100%] tracking-[0%]">
            Can't find the answer to your questions? Send us an email and we'll
            get back to you as soon as possible.
          </p>
          <button className="mt-2 bg-[#042BFD] text-white rounded-[8px] px-4 py-2 font-medium text-[14px] font-['SF Pro'] hover:bg-[#021165] transition-colors">
            Ask Here
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - Accordion */}
      <div className="space-y-4">
        {[
          {
            question: "Your Question goes here?",
            answer:
              "Accordion description goes here, try to keep it under 2 lines so it looks good and minmal",
          },
          {
            question: "Your Question goes here?",
            answer:
              "Accordion description goes here, try to keep it under 2 lines so it looks good and minmal",
          },
          {
            question: "Your Question goes here?",
            answer:
              "Accordion description goes here, try to keep it under 2 lines so it looks good and minimal.",
          },
          {
            question: "Your Question goes here?",
            answer:
              "Accordion description goes here, try to keep it under 2 lines so it looks good and minmal",
          },
          {
            question: "Your Question goes here?",
            answer:
              "Accordion description goes here, try to keep it under 2 lines so it looks good and minmal",
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
    </>
  );
}
