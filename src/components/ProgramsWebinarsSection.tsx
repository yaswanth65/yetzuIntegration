"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  cost: number;
  educator?: string;
}

export default function ProgramsWebinarsSection() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses", { cache: "no-store" });
        const data = await res.json();
        setCourses(data?.courses || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white px-[108px] py-[120px] flex flex-col">
      {/* Heading */}
      <div className="text-center mb-[48px]">
        <h3 className="font-inter font-medium text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165]">
          Programs & Webinars
        </h3>
        <p className="mt-[24px] font-['SF Pro'] text-[16px] text-[#252525] tracking-[-0.03em] leading-[140%] text-center max-w-[820px] mx-auto">
          Stay Ahead with Our Expert-Led Webinars and Live Events Designed to Provide
          Actionable Academic Insights and Mentorship Opportunities.
        </p>
      </div>

      {/* FLEX ROW: Left Big Card + Right Grid */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-[24px]">
        {/* LEFT: Big Image Card */}
        {courses[0] && (
          <div className="relative w-full lg:w-[598px] h-[790px] rounded-[20px] overflow-hidden shadow-lg flex-shrink-0">
            <Image
              src={`https://productionyetzuapi.yetzu.com${courses[0].thumbnail}`}
              alt={courses[0].title}
              fill
              className="object-cover"
            />

            {/* Date Capsule (Top Right Corner) */}
            <div className="absolute top-[20px] right-[20px] bg-white/90 text-[#252525] text-[15px] font-['SF Pro'] px-[20px] py-[10px] rounded-full shadow-sm border border-[#E2E2E2]">
              19 Oct, 2024 Sat 7:30pm - 10:00pm
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[276px] p-[32px] bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end">
              <div>
                <p className="text-white font-['SF Pro'] text-[16px] opacity-80">
                  {courses[0].educator || "John Doe"} • Saturday 9:00PM
                </p>
                <h2 className="font-inter text-white text-[36px] font-semibold leading-tight tracking-[-0.04em] mt-3">
                  {courses[0].title}
                </h2>
              </div>

              {/* Button */}
              <button className="w-full mt-[24px] h-[52px] rounded-[12px] bg-[#0E66FE] text-white font-['SF Pro'] text-[16px] hover:bg-[#084bcb] transition shadow-md">
                Join Now
              </button>
            </div>
          </div>
        )}

        {/* RIGHT: 2×2 Grid */}
        <div
          className="grid grid-cols-2 grid-rows-2 gap-[24px]"
          style={{ width: "598px", height: "790px" }}
        >
          {courses.slice(1, 4).map((course) => (
            <div
              key={course._id}
              className="relative bg-white rounded-[16px] shadow-md overflow-hidden"
            >
              <Image
                src={
                  course.thumbnail
                    ? `https://productionyetzuapi.yetzu.com${course.thumbnail}`
                    : "/placeholder.png"
                }
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#E6EAFF] text-[#021165] text-[12px] font-['SF Pro'] px-3 py-1 rounded-md">
                Coming soon
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[100px] p-[20px] bg-gradient-to-t from-[#252525] to-transparent flex flex-col justify-end">
                <h3 className="font-inter text-[18px] font-semibold text-white leading-[120%]">
                  {course.title}
                </h3>
                <p className="font-['SF Pro'] text-[14px] text-white opacity-80 mt-1">
                  {course.educator || "John Doe"} • Saturday 9:00PM
                </p>
              </div>
            </div>
          ))}

          {/* View All Webinars Card */}
          <div className="bg-[#E6EAFF] rounded-[16px] flex justify-center items-center hover:bg-[#d9e0ff] cursor-pointer transition">
            <p className="text-center text-[#042BFD] font-inter font-semibold text-[22px] tracking-[-0.04em]">
              View All Webinars
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
