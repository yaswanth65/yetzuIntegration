"use client";

import Image from "next/image";
import { useGetCourses } from "@/lib/queries/courses/useCoursesService";

// Demo fallback data for frontend showcase
const DEMO_COURSES = [
  {
    _id: "demo-1",
    title: "Loren Ipsim",
    description:
      "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
  },
  {
    _id: "demo-2",
    title: "Loren Ipsim",
    description:
      "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
  },
  {
    _id: "demo-3",
    title: "Loren Ipsim",
    description:
      "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
  },
  {
    _id: "demo-4",
    title: "Loren Ipsim",
    description:
      "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
  },
  {
    _id: "demo-5",
    title: "Loren Ipsim",
    description:
      "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
  },
  {
    _id: "demo-6",
    title: "Loren Ipsim",
    description:
      "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
  },
];

export default function WebinarsSection() {
  const { data: courses, error, isLoading } = useGetCourses();

  // Use demo data if API fails or returns no data
  const displayCourses = courses && courses.length > 0 ? courses : DEMO_COURSES;

  return (
    <section
      className="w-full min-h-screen flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[100px] py-[40px] md:py-[60px]"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #E2E7FF 45%, #FFFFFF 100%)",
      }}
    >
      {/* Header Section - Fixed height */}
      <div className="flex flex-col items-center text-center mb-[32px] md:mb-[40px]">
        <h2
          className="font-inter font-medium text-[32px] md:text-[38px] lg:text-[46px] leading-[120%] tracking-[-0.06em] text-[#021165] mb-[12px]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Explore Expert-Led
          <br  /> Webinars & Programs
        </h2>
        <p
          className="font-['SF_Pro'] text-[14px] md:text-[16px] leading-[150%] tracking-[-0.03em] text-[#252525] max-w-[400px]"
          style={{ fontFamily: "var(--font-sfpro)" }}
        >
          Choose from a Rich Variety of Webinars Tailored to Accelerate your
          Academic Journey.
        </p>
      </div>

      {/* Cards Container - Takes remaining space */}
      <div className="flex flex-col items-center gap-[24px] w-full max-w-[1220px] mx-auto">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
          {displayCourses.slice(0, 3).map((course) => (
            <div
              key={course._id}
              className="w-full bg-white rounded-[16px] shadow-[0px_4px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full h-[200px] flex-shrink-0">
                <Image
                  src={
                    course.thumbnail.startsWith("/")
                      ? course.thumbnail
                      : `https://productionyetzuapi.yetzu.com${course.thumbnail}`
                  }
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                {/* Badge */}
                <div className="absolute top-[12px] right-[12px] bg-white rounded-[8px] px-[12px] py-[6px]">
                  <span
                    className="text-[#252525] text-[12px] leading-[14px] font-['SF_Pro']"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    Sat 7:30pm
                  </span>
                </div>

                {/* Avatar Group - Bottom Left */}
                <div className="absolute bottom-[12px] left-[12px] flex -space-x-2">
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-white overflow-hidden bg-gray-300">
                    <Image
                      src="https://i.pravatar.cc/150?img=1"
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-white overflow-hidden bg-gray-300">
                    <Image
                      src="https://i.pravatar.cc/150?img=2"
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-white overflow-hidden bg-gray-300">
                    <Image
                      src="https://i.pravatar.cc/150?img=3"
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-white bg-[#E6EAFF] flex items-center justify-center">
                    <span
                      className="text-[#021165] text-[11px] font-semibold"
                      style={{ fontFamily: "var(--font-sfpro)" }}
                    >
                      +2
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-[20px] flex flex-col gap-[16px]">
                {/* Title */}
                <h3
                  className="font-inter font-semibold text-[20px] leading-[24px] tracking-[-0.02em] text-[#252525]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {course.title}
                </h3>

                {/* Description */}
                <p
                  className="font-['SF_Pro'] text-[14px] leading-[150%] text-[#5C5C5C] line-clamp-2"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  {course.description}
                </p>

                {/* Price */}
                <p
                  className="font-['SF_Pro'] font-semibold text-[18px] leading-[21px] text-[#252525]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  ₹{course.cost}
                </p>

                {/* Buttons */}
                <div className="flex gap-[12px] mt-auto">
                  <button
                    className="flex-1 h-[40px] border border-[#042BFD] text-[#042BFD] bg-white rounded-[8px] text-[14px] leading-[16px] hover:bg-[#F0F2FF] transition-colors font-['SF_Pro']"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    Button
                  </button>
                  <button
                    className="flex-1 h-[40px] bg-[#042BFD] text-white rounded-[8px] text-[14px] leading-[16px] hover:bg-[#0325D7] transition-colors font-['SF_Pro']"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    Button
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
          {displayCourses.slice(3, 6).map((course) => (
            <div
              key={course._id}
              className="w-full bg-white rounded-[16px] shadow-[0px_4px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full h-[200px] flex-shrink-0">
                <Image
                  src={
                    course.thumbnail.startsWith("/")
                      ? course.thumbnail
                      : `https://productionyetzuapi.yetzu.com${course.thumbnail}`
                  }
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                {/* Badge */}
                <div className="absolute top-[12px] right-[12px] bg-white rounded-[8px] px-[12px] py-[6px]">
                  <span
                    className="text-[#252525] text-[12px] leading-[14px] font-['SF_Pro']"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    Sat 7:30pm
                  </span>
                </div>

                {/* Avatar Group - Bottom Left */}
                <div className="absolute bottom-[12px] left-[12px] flex -space-x-2">
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-white overflow-hidden bg-gray-300">
                    <Image
                      src="https://i.pravatar.cc/150?img=4"
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-white overflow-hidden bg-gray-300">
                    <Image
                      src="https://i.pravatar.cc/150?img=5"
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-white overflow-hidden bg-gray-300">
                    <Image
                      src="https://i.pravatar.cc/150?img=6"
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-white bg-[#E6EAFF] flex items-center justify-center">
                    <span
                      className="text-[#021165] text-[11px] font-semibold"
                      style={{ fontFamily: "var(--font-sfpro)" }}
                    >
                      +2
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-[20px] flex flex-col gap-[16px]">
                {/* Title */}
                <h3
                  className="font-inter font-semibold text-[20px] leading-[24px] tracking-[-0.02em] text-[#252525]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {course.title}
                </h3>

                {/* Description */}
                <p
                  className="font-['SF_Pro'] text-[14px] leading-[150%] text-[#5C5C5C] line-clamp-2"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  {course.description}
                </p>

                {/* Price */}
                <p
                  className="font-['SF_Pro'] font-semibold text-[18px] leading-[21px] text-[#252525]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  ₹{course.cost}
                </p>

                {/* Buttons */}
                <div className="flex gap-[12px] mt-auto">
                  <button
                    className="flex-1 h-[40px] border border-[#042BFD] text-[#042BFD] bg-white rounded-[8px] text-[14px] leading-[16px] hover:bg-[#F0F2FF] transition-colors font-['SF_Pro']"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    Button
                  </button>
                  <button
                    className="flex-1 h-[40px] bg-[#042BFD] text-white rounded-[8px] text-[14px] leading-[16px] hover:bg-[#0325D7] transition-colors font-['SF_Pro']"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    Button
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
