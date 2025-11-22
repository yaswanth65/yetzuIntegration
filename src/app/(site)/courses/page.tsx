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

            <section className="relative bg-white">
                <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] pb-16 md:pb-24">

                    <CourseFilters
                        search={search}
                        setSearch={setSearch}
                        minCost={minCost}
                        setMinCost={setMinCost}
                        maxCost={maxCost}
                        setMaxCost={setMaxCost}
                    />

                    <div className="mt-8">
                        {isLoading && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                            </div>
                        )}

                        {isError && (
                            <div className="flex flex-col items-center justify-center py-20 bg-white p-8 text-center">
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
                            <div className="text-center py-20 bg-white p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                                <p className="text-gray-500">Check back later for new content.</p>
                            </div>
                        )}

                        {!isLoading && !isError && courses && courses.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
