"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  cost: number;
}

export default function WebinarsSection() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses", { cache: "no-store" });
        const data = await res.json();
        setCourses(data?.courses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen px-[60px] py-[120px] bg-gradient-to-b from-white via-[#E2E7FF] to-white">
      {/* Heading */}
      <div className="text-center mb-[52px]">
        <h1 className="font-inter font-medium text-[46px] text-[#021165] leading-[100%] tracking-[-0.06em]">
          Explore Expert-Led <br /> Webinars & Programs
        </h1>
        <p className="mt-[24px] text-[#252525] text-[16px] tracking-[-0.03em] font-['SF Pro']">
          Choose from a Rich Variety of Webinars Tailored to Accelerate your Academic Journey.
        </p>
      </div>

      {/* Cards Grid with exact 24px gap */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-x-[24px]
          gap-y-[24px]
          justify-items-center
        "
      >
        {courses.map((course) => (
          <div
            key={course._id}
            className="w-full max-w-[392px] h-[452px] bg-white rounded-[16px] p-[12px] shadow-md flex flex-col"
          >
            {/* Image */}
            <div className="relative w-full h-[220px] rounded-[12px] overflow-hidden">
              <Image
                src={`https://productionyetzuapi.yetzu.com${course.thumbnail}`}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 bg-[#E6EAFF] text-[#021165] text-[12px] px-2 py-1 rounded-md">
                Sat 7:30pm
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-[24px] mt-[20px] flex-grow">
              <div>
                <h2 className="text-[22px] font-inter font-semibold text-[#252525] tracking-[-0.05em]">
                  {course.title}
                </h2>
                <p className="text-[16px] text-[#5C5C5C] font-['SF Pro'] mt-1 line-clamp-2">
                  {course.description}
                </p>
              </div>

              <p className="text-[#252525] font-['SF Pro'] text-[18px]">₹{course.cost}</p>

              {/* Buttons */}
              <div className="flex justify-between mt-auto gap-[24px]">
                <button className="w-[160px] h-[40px] border border-[#294BFD] text-[#042BFD] bg-white rounded-[8px] font-['SF Pro'] text-[16px]">
                  Button
                </button>
                <button className="w-[160px] h-[40px] bg-[#042BFD] text-white rounded-[8px] font-['SF Pro'] text-[16px]">
                  Button
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
