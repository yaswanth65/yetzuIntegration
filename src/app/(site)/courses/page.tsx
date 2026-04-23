"use client";

import { useGetCourses } from "@/lib/queries/courses/useCoursesService";
import CourseCard, { CourseCardSkeleton } from "./components/CourseCard";
import CoursesHero from "./components/CoursesHero";
import CourseFilters from "./components/CourseFilters";
import CertificationSection from "./components/CertificationSection";
import FAQSection from "@/components/shared/FAQSection";
import Testimonials from "@/components/TestimonialsSection";
import PromoCards from "./components/PromoCards";
import BookSlotSection from "@/app/(site)/contact-us/components/BookSlotSection";
import { Loader2, AlertCircle } from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import AvatarStack from "@/components/ui/AvatarStack";

export default function CoursesPage() {
    const [search, setSearch] = useState("");
    const [minCost, setMinCost] = useState<number | "">("");
    const [maxCost, setMaxCost] = useState<number | "">("");

    const debouncedSearch = useDebounce(search, 500);
    const debouncedMinCost = useDebounce(minCost, 500);
    const debouncedMaxCost = useDebounce(maxCost, 500);

    const { data: courses, isLoading, isError } = useGetCourses({
        search: debouncedSearch || undefined,
        minCost: debouncedMinCost === "" ? undefined : debouncedMinCost,
        maxCost: debouncedMaxCost === "" ? undefined : debouncedMaxCost,
    });

    return (
        <main className="min-h-screen bg-white pb-20">
            <CoursesHero />

            <section className="relative bg-[#F7F8FC]">
                <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] pb-16 md:pb-24">

                    <CourseFilters
                        search={search}
                        setSearch={setSearch}
                        minCost={minCost}
                        setMinCost={setMinCost}
                        maxCost={maxCost}
                        setMaxCost={setMaxCost}
                    />

                    <div className="mt-2">
                        {isLoading && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                            </div>
                        )}

                        {isError && (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-[#EEF0FB] p-8 text-center shadow-sm">
                                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                                    <AlertCircle className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Failed to load courses</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-6">
                                    We couldn't fetch the courses at this time. Please try again later.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {!isLoading && !isError && courses && courses.length === 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-full">
                                        <div
                                            className="
                                      bg-white 
                                      rounded-[32px]
                                      border border-[#EEF0FB]
                                      overflow-hidden
                                      flex flex-col
                                      h-full
                                      p-5
                                      shadow-sm
                                    "
                                        >
                                            <div className="relative rounded-[24px] overflow-hidden w-full h-[220px] mb-6 bg-gray-100">
                                                <div className="absolute top-3 right-3">
                                                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-[#021165] border border-[#EEF0FB]">
                                                        Sat 7:30pm
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-3 left-3">
                                                    <AvatarStack count={5} size={32} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col flex-grow gap-2 px-1">
                                                <h3 className="text-xl font-bold text-[#1B1B1B]">Loren Ipsum</h3>
                                                <p className="text-sm text-[#7A7A7A] leading-relaxed mb-2">
                                                    Loren Ipsum meta description is display here Loren Ipsum meta...
                                                </p>
                                                <div className="mb-6">
                                                    <span className="text-2xl font-bold text-[#252525]">₹500.01</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                                    <button className="!rounded-xl !h-[44px] !text-sm">Button</button>
                                                    <button className="!rounded-xl !h-[44px] !text-sm">Button</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!isLoading && !isError && courses && courses.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {courses.map((course) => (
                                    <div key={course._id} className="h-full">
                                        <CourseCard course={course} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Testimonials />
            <CertificationSection />
            <FAQSection />
            <PromoCards />
            <BookSlotSection />
        </main>
    );
}
