"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";


 
export default function About() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const educators = [
    { image: '/Images/educator-1.jpg', quote: "Lorem ipsum stating the professor’s thoughts", name: "Name", expertise: "Expertise in subject", education: "Education" },
    { image: '/Images/educator-2.jpg', quote: "Lorem ipsum stating the professor’s thoughts", name: "Name", expertise: "Expertise in subject", education: "Education" },
    { image: '/Images/educator-3.jpg', quote: "Lorem ipsum stating the professor’s thoughts", name: "Name", expertise: "Expertise in subject", education: "Education" },
    { image: '/Images/educator-4.jpg', quote: "Lorem ipsum stating the professor’s thoughts", name: "Name", expertise: "Expertise in subject", education: "Education" },
    { image: '/Images/educator-5.jpg', quote: "Lorem ipsum stating the professor’s thoughts", name: "Name", expertise: "Expertise in subject", education: "Education" },
  ];

  const maxIndex = educators.length - 3; // 5 - 3 = 2

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      {/* === SECTION 1: ABOUT US HERO === */}
      <section>
        <div className="h-screen w-[1400px] mx-auto px-[108px] py-[80px] flex flex-col justify-between bg-[#D9D9D9]">
          {/* Top Row: About Us (left) + Info & Button (right) */}
          <div className="flex gap-[341px]">
            {/* Left: Heading */}
            <h1 className="text-6xl font-medium text-black min-w-max">
              About us
            </h1>

            {/* Right: Paragraph + Button */}
            <div className="flex flex-col gap-6 max-w-xl">
              <p className="text-lg font-normal text-black leading-relaxed">
                Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design. It is a perfect placeholder text for you to utilise.
              </p>
              <button className="self-start px-6 py-3 bg-[#042BFD] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Button
              </button>
            </div>
          </div>

          {/* Bottom: Image centered */}
          <div className="flex justify-center mt-10">
            <Image
              src="/Images/about-hero.jpg"
              alt="About Us Visual"
              width={1224}
              height={438}
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* === SECTION 2: FOUNDER HERO === */}
      <section className={`h-[655px] w-[1200px] mx-auto px-[108px] py-[120px] flex items-center gap-[32px] font-sans`}>
        {/* Left Content */}
        <div className="w-[602px] h-[415px] flex flex-col justify-between">
          {/* Subheading */}
          <p className="text-sm text-black font-normal">Founder story</p>

          {/* Founder Name (Inter, bold) */}
          <h2 className="text-5xl font-bold text-black leading-tight tracking-tight">
            Founder Name
          </h2>

          {/* Two Paragraphs */}
          <div className="space-y-4">
            <p className="text-base text-black leading-relaxed">
              Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
            </p>
            <p className="text-base text-black leading-relaxed">
              Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
            </p>
          </div>

          {/* Achievements Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-blue-600 text-sm font-medium"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M12 4L6 10L4 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Achievements
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Image */}
        <Image
          src="/Images/founder-image.jpg"
          alt="Founder Portrait"
          width={598}
          height={415}
          className="rounded-2xl object-cover"
          priority
        />
      </section>


        {/* === SECTION 3: FOUNDER HERO === */}
      <section className={`h-[655px] w-[1200px] mx-auto px-[108px] py-[120px] flex items-center gap-[32px] font-sans`}>
        {/* Left Content */}
         <Image
          src="/Images/founder-image.jpg"
          alt="Founder Portrait"
          width={598}
          height={415}
          className="rounded-2xl object-cover"
          priority
        />
      

        {/* Right Image */}
         <div className="w-[602px] h-[415px] flex flex-col justify-between">
          {/* Subheading */}
          <p className="text-sm text-black font-normal">Founder story</p>

          {/* Founder Name (Inter, bold) */}
          <h2 className="text-5xl font-bold text-black leading-tight tracking-tight">
            Founder Name
          </h2>

          {/* Two Paragraphs */}
          <div className="space-y-4">
            <p className="text-base text-black leading-relaxed">
              Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
            </p>
            <p className="text-base text-black leading-relaxed">
              Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
            </p>
          </div>

          {/* Achievements Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-blue-600 text-sm font-medium"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M12 4L6 10L4 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Achievements
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



  {/* === SECTION 4: FOUNDER HERO === */}
      <section className={`h-[655px] w-[1200px] mx-auto px-[108px] py-[120px] flex items-center gap-[32px] font-sans`}>
        {/* Left Content */}
        <div className="w-[602px] h-[415px] flex flex-col justify-between">
          {/* Subheading */}
          <p className="text-sm text-black font-normal">Founder story</p>

          {/* Founder Name (Inter, bold) */}
          <h2 className="text-5xl font-bold text-black leading-tight tracking-tight">
            Founder Name
          </h2>

          {/* Two Paragraphs */}
          <div className="space-y-4">
            <p className="text-base text-black leading-relaxed">
              Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
            </p>
            <p className="text-base text-black leading-relaxed">
              Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
            </p>
          </div>

          {/* Achievements Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-blue-600 text-sm font-medium"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M12 4L6 10L4 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Achievements
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Image */}
        <Image
          src="/Images/founder-image.jpg"
          alt="Founder Portrait"
          width={598}
          height={415}
          className="rounded-2xl object-cover"
          priority
        />
      </section>

 {/* === SECTION 5: MISSION AND VALUE === */}
  <section
      className={`h-[817px] w-[1200px] mx-auto px-[108px] py-[120px] flex flex-col items-center justify-between `}
    >
      {/* Top Heading */}
      <h2 className="text-4xl font-semibold text-[#021165] mb-12">
        Mission & Vision
      </h2>

      {/* Main Content: Left Image + Cards + Right Image */}
      <div className="flex w-full gap-8">
        {/* Left Image */}
        <div className="flex-1 h-[500px] rounded-2xl overflow-hidden">
          <Image
            src="/Images/mission-left.jpg"
            alt="Mission Background"
            width={600}
            height={500}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Middle Cards */}
        <div className="flex flex-col gap-8 w-[400px]">
          {/* Mission Card */}
          <div className="bg-indigo-50 p-6 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              {/* Blue Circle with Icon */}
              <div className="w-12 h-12 bg-[#042BFD] rounded-full flex items-center justify-center">
                <Image
                  src="/Images/mission-icon.png"
                  alt="Mission Icon"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mission</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
                </p>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-indigo-50 p-6 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              {/* Blue Circle with Icon */}
              <div className="w-12 h-12 bg-[#042BFD] rounded-full flex items-center justify-center">
                <Image
                  src="/Images/vision-icon.png"
                  alt="Vision Icon"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Vision</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 h-[500px] rounded-2xl overflow-hidden">
          <Image
            src="/Images/mission-right.jpg"
            alt="Vision Background"
            width={600}
            height={500}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </section>

   {/* === SECTION 7: Educator at Yetzu === */}
  <section
      className={`h-[956px] w-[1400px] mx-auto px-[108px] py-[120px] flex flex-col justify-between`}
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E7FF 50.01%, #FFFFFF 100%)',
      }}
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-semibold text-[#021165] mb-4">
            Educators<br />At Yetzu
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
          </p>
          <button className="px-6 py-2 border border-[#042BFD] text-[#042BFD] rounded-lg hover:bg-[#042BFD] hover:text-white transition-colors font-medium">
            Button
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Cards */}
        <div className="flex gap-6">
          {educators.slice(currentIndex, currentIndex + 3).map((edu, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[393px] h-[472px] bg-white rounded-2xl shadow-md"
              style={{
                borderRadius: '20px',
                padding: '28px 29px',
              }}
            >
              <div className="h-[280px] mb-4 overflow-hidden rounded-lg">
                <Image
                  src={edu.image}
                  alt={`Educator ${i + 1}`}
                  width={335}
                  height={280}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-700 italic">"{edu.quote}"</p>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>{edu.name}</span>
                <span>{edu.education}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{edu.expertise}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#042BFD] text-white hover:bg-blue-700'
            }`}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10 8l-4 4H4V4h2l4 4z" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              currentIndex === maxIndex
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#042BFD] text-white hover:bg-blue-700'
            }`}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 8l4-4h2v8h-2l-4-4z" />
            </svg>
          </button>
        </div>
      </div>
    </section>

 
      {/* === SECTION 8: Purpose & Belief === */}

 <section className={`h-[954px] w-[1200px] mx-auto px-[108px] py-[120px] flex flex-col justify-between `}>
      {/* Top Section: Heading + Purpose/Belief Cards */}
      <div className="flex justify-between items-start">
        {/* Left: Heading */}
        <div>
          <h2 className="text-4xl font-semibold text-[#021165] mb-6">
            Purpose & Belief
          </h2>
          <p className="text-sm text-black max-w-md leading-relaxed">
            Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
          </p>
        </div>

        {/* Right: Purpose & Belief Cards */}
        <div className="flex flex-col gap-6">
          {/* Our Purpose */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/Images/purpose-icon.png"
                alt="Purpose Icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Our Purpose</h3>
              <p className="text-sm text-black leading-relaxed max-w-xs">
                Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
              </p>
            </div>
          </div>

          {/* Core Belief */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/Images/belief-icon.png"
                alt="Belief Icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Core Belief</h3>
              <p className="text-sm text-black leading-relaxed max-w-xs">
                Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Large Image with Blue Border */}
      <div className="w-full h-[400px] rounded-2xl overflow-hidden">
        <Image
          src="/Images/purpose-belief-bg.jpg"
          alt="Purpose & Belief Visual"
          width={1200}
          height={400}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </section>

 {/* === SECTION 09: Our Impact === */}
  <section
      className={`h-[756px] w-[1400px] mx-auto px-[108px] py-[120px] flex flex-col items-center justify-between `}
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E7FF 50.01%, #FFFFFF 100%)',
      }}
    >
      {/* Top Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-[#021165] mb-4">
          Our Impact
        </h2>
        <p className="text-sm text-gray-600 max-w-md leading-relaxed mx-auto">
          Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text for you to utilise use whenever you want content for your design.
        </p>
      </div>

      {/* Image Cards Row */}
      <div className="flex justify-center gap-6">
        {[
          '/Images/impact-1.jpg',
          '/Images/impact-2.jpg',
          '/Images/impact-3.jpg',
          '/Images/impact-4.jpg',
        ].map((src, index) => (
          <div
            key={index}
            className="w-[288px] h-[288px] rounded-2xl overflow-hidden bg-white p-8 shadow-md"
            style={{
              borderRadius: '20px',
              padding: '32px',
            }}
          >
            <Image
              src={src}
              alt={`Impact Image ${index + 1}`}
              width={224} // 288 - 2*32 = 224
              height={224}
              className="w-full h-full object-cover rounded-lg"
              priority
            />
          </div>
        ))}
      </div>
    </section>

      {/* === SECTION 10: TRUSTED BY LEADERS === */}
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

