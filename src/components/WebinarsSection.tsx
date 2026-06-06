"use client";

import Image from "next/image";
import { useGetCourses } from "@/lib/queries/courses/useCoursesService";
import Button from "./ui/Button";
import { getImageUrl } from "@/lib/utils/imageUtils";
import Link from "next/link";

const DEMO_COURSES = [
  {
    _id: "demo-1",
    title: "Loren Ipsim",
    description: "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
    educator: "John Doe",
    startTime: "19:30",
    scheduleDate: "2026-06-07",
    enrolledCount: 5,
  },
  {
    _id: "demo-2",
    title: "Loren Ipsim",
    description: "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
    educator: "John Doe",
    startTime: "19:30",
    scheduleDate: "2026-06-07",
    enrolledCount: 5,
  },
  {
    _id: "demo-3",
    title: "Loren Ipsim",
    description: "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
    educator: "John Doe",
    startTime: "19:30",
    scheduleDate: "2026-06-07",
    enrolledCount: 5,
  },
  {
    _id: "demo-4",
    title: "Loren Ipsim",
    description: "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
    educator: "John Doe",
    startTime: "19:30",
    scheduleDate: "2026-06-07",
    enrolledCount: 5,
  },
  {
    _id: "demo-5",
    title: "Loren Ipsim",
    description: "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
    educator: "John Doe",
    startTime: "19:30",
    scheduleDate: "2026-06-07",
    enrolledCount: 5,
  },
  {
    _id: "demo-6",
    title: "Loren Ipsim",
    description: "Lorem ipsum main description is display here Loren Ipsum main...",
    thumbnail: "/images/Hero Section.png",
    cost: 500.01,
    educator: "John Doe",
    startTime: "19:30",
    scheduleDate: "2026-06-07",
    enrolledCount: 5,
  },
];

const formatSchedule = (scheduleDate: string, startTime: string) => {
  if (!scheduleDate) return "";
  const date = new Date(scheduleDate);
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  if (startTime) {
    const [h, m] = startTime.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "pm" : "am";
    const h12 = hour % 12 || 12;
    return `${day} ${h12}:${m}${ampm}`;
  }
  return day;
};

export default function WebinarsSection() {
  const { data: courses, error, isLoading } = useGetCourses();
  const displayCourses = courses && courses.length > 0 ? courses : DEMO_COURSES;

  return (
    <section
      className="w-full min-h-screen flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[100px] py-10 sm:py-12 md:py-16 lg:py-20"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #E2E7FF 45%, #FFFFFF 100%)",
      }}
    >
      <div className="flex flex-col items-center w-full max-w-[1220px] mx-auto mb-[32px] md:mb-[40px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 md:gap-6">
          <div>
            <h2
              className="font-inter font-semibold text-[32px] md:text-[38px] lg:text-[46px] leading-[120%] md:leading-[56px] tracking-[-0.06em] text-[#021165]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore Expert-Led
              <br /> Webinars & Programs
            </h2>
            <p
              className="font-['SF_Pro'] text-[14px] md:text-[16px] leading-[150%] tracking-[-0.03em] text-[#252525] max-w-[500px] mt-[12px]"
              style={{ fontFamily: "var(--font-sfpro)" }}
            >
              Choose from a Rich Variety of Webinars Tailored to Accelerate your
              Academic Journey.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Link href="/courses">
              <Button className="!w-full sm:!w-[160px]">Explore All</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[24px] w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full max-w-[1220px] mx-auto">
          {displayCourses.slice(0, 3).map((course) => (
            <div
              key={course._id}
              className="w-full bg-white rounded-[16px] shadow-[0px_4px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-[200px] flex-shrink-0">
                <Image
                  src={getImageUrl(course.thumbnail)}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-[12px] right-[12px] bg-white rounded-[8px] px-[12px] py-[6px]">
                  <span
                    className="text-[#252525] text-[12px] leading-[14px] font-['SF_Pro']"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    {formatSchedule(course.scheduleDate, course.startTime)}
                  </span>
                </div>
              </div>

              <div className="p-[20px] flex flex-col gap-[16px]">
                <h3
                  className="font-inter font-semibold text-[20px] leading-[24px] tracking-[-0.02em] text-[#252525] line-clamp-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {course.title}
                </h3>
                <p
                  className="font-['SF_Pro'] text-[14px] leading-[150%] text-[#5C5C5C] line-clamp-2"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  {course.description}
                </p>
                <div className="flex items-center gap-[8px] mb-[4px]">
                  <p
                    className="font-['SF_Pro'] text-[12px] leading-[14px] text-[#5C5C5C]"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    {course.educator || "Educator"}
                  </p>
                </div>
                <p
                  className="font-['SF_Pro'] font-semibold text-[18px] leading-[21px] text-[#252525] mt-[8px]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  {course.cost === 0 ? "Free" : `₹${course.cost}`}
                </p>
                <div className="flex gap-[12px] mt-auto">
                  <Link href={`/courses/${course._id}`} className="flex-1">
                    <button
                      className="w-full h-[40px] border border-[#042BFD] text-[#042BFD] bg-white rounded-[8px] text-[14px] leading-[16px] hover:bg-[#F0F2FF] transition-colors font-['SF_Pro']"
                      style={{ fontFamily: "var(--font-sfpro)" }}
                    >
                      View Details
                    </button>
                  </Link>
                  <Link href="/login" className="flex-1">
                    <button
                      className="w-full h-[40px] bg-[#042BFD] text-white rounded-[8px] text-[14px] leading-[16px] hover:bg-[#0325D7] transition-colors font-['SF_Pro']"
                      style={{ fontFamily: "var(--font-sfpro)" }}
                    >
                      Enrol
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full max-w-[1220px] mx-auto">
          {displayCourses.slice(3, 6).map((course) => (
            <div
              key={course._id}
              className="w-full bg-white rounded-[16px] shadow-[0px_4px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-[200px] flex-shrink-0">
                <Image
                  src={getImageUrl(course.thumbnail)}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-[12px] right-[12px] bg-white rounded-[8px] px-[12px] py-[6px]">
                  <span
                    className="text-[#252525] text-[12px] leading-[14px] font-['SF_Pro']"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    {formatSchedule(course.scheduleDate, course.startTime)}
                  </span>
                </div>
              </div>

              <div className="p-[20px] flex flex-col gap-[16px]">
                <h3
                  className="font-inter font-semibold text-[20px] leading-[24px] tracking-[-0.02em] text-[#252525] line-clamp-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {course.title}
                </h3>
                <p
                  className="font-['SF_Pro'] text-[14px] leading-[150%] text-[#5C5C5C] line-clamp-2"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  {course.description}
                </p>
                <div className="flex items-center gap-[8px] mb-[4px]">
                  <p
                    className="font-['SF_Pro'] text-[12px] leading-[14px] text-[#5C5C5C]"
                    style={{ fontFamily: "var(--font-sfpro)" }}
                  >
                    {course.educator || "Educator"}
                  </p>
                </div>
                <p
                  className="font-['SF_Pro'] font-semibold text-[18px] leading-[21px] text-[#252525] mt-[8px]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  {course.cost === 0 ? "Free" : `₹${course.cost}`}
                </p>
                <div className="flex gap-[12px] mt-auto">
                  <Link href={`/courses/${course._id}`} className="flex-1">
                    <button
                      className="w-full h-[40px] border border-[#042BFD] text-[#042BFD] bg-white rounded-[8px] text-[14px] leading-[16px] hover:bg-[#F0F2FF] transition-colors font-['SF_Pro']"
                      style={{ fontFamily: "var(--font-sfpro)" }}
                    >
                      View Details
                    </button>
                  </Link>
                  <Link href="/login" className="flex-1">
                    <button
                      className="w-full h-[40px] bg-[#042BFD] text-white rounded-[8px] text-[14px] leading-[16px] hover:bg-[#0325D7] transition-colors font-['SF_Pro']"
                      style={{ fontFamily: "var(--font-sfpro)" }}
                    >
                      Enrol
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
