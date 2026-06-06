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
import { useDebounce } from "@/hooks/useDebounce";
import { useMemo, useState } from "react";
import AvatarStack from "@/components/ui/AvatarStack";
import Button from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";
import { Course } from "@/lib/queries/courses/types";

export default function CoursesPage() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [category, setCategory] = useState("");
    const [sessionType, setSessionType] = useState("");

    const { data: courses, isLoading, isError } = useGetCourses();
    const debouncedSearch = useDebounce(search, 300);

    const categories = useMemo(() => {
      if (!courses) return [];
      const vals = new Set(courses.map((c: any) => c.category).filter(Boolean));
      return [...vals] as string[];
    }, [courses]);

    const sessionTypes = useMemo(() => {
      if (!courses) return [];
      const vals = new Set(courses.map((c: any) => c.sessionType).filter(Boolean));
      return [...vals] as string[];
    }, [courses]);

    const filtered = useMemo(() => {
      if (!courses) return [];
      let list = [...courses] as any[];

      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        list = list.filter(c =>
          (c.title || "").toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q)
        );
      }

      if (sessionType) {
        list = list.filter(c => c.sessionType === sessionType);
      }

      if (category) {
        list = list.filter(c => c.category === category);
      }

      if (sortBy === "price-asc") list.sort((a, b) => (a.finalPrice ?? a.cost ?? 0) - (b.finalPrice ?? b.cost ?? 0));
      else if (sortBy === "price-desc") list.sort((a, b) => (b.finalPrice ?? b.cost ?? 0) - (a.finalPrice ?? a.cost ?? 0));
      else if (sortBy === "date-asc") list.sort((a, b) => new Date(a.startDateTime || 0).getTime() - new Date(b.startDateTime || 0).getTime());
      else if (sortBy === "date-desc") list.sort((a, b) => new Date(b.startDateTime || 0).getTime() - new Date(a.startDateTime || 0).getTime());
      else if (sortBy === "title-asc") list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      else if (sortBy === "title-desc") list.sort((a, b) => (b.title || "").localeCompare(a.title || ""));

      return list;
    }, [courses, debouncedSearch, sortBy, category, sessionType]);

    return (
        <main className="min-h-screen bg-white pb-20">
            <CoursesHero />

            <section className="relative bg-[#F7F8FC]">
                <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] pb-16 md:pb-24">

                    <CourseFilters
                        search={search}
                        setSearch={setSearch}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        category={category}
                        setCategory={setCategory}
                        categories={categories}
                        sessionTypes={sessionTypes}
                        sessionType={sessionType}
                        setSessionType={setSessionType}
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

                        {!isLoading && !isError && filtered.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-[#EEF0FB] p-8 text-center shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No courses found</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Try adjusting your search or filter criteria.
                                </p>
                            </div>
                        )}

                        {!isLoading && !isError && filtered.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {filtered.map((course) => (
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
