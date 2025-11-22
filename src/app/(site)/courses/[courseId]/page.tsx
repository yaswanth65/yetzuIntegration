"use client";

import { useParams } from "next/navigation";
import { useGetCourseById, useGetCourses } from "@/lib/queries/courses/useCoursesService";
import Image from "next/image";
import { Loader2, AlertCircle, Clock, Users, Calendar, Award, CheckCircle, ChevronDown, Figma, Activity, Check, Flag, Mail, Linkedin, Play } from "lucide-react";
import Link from "next/link";
import BadgePill from "@/components/BadgePill";
import CourseTopicsAccordion, { TopicItem } from "@/components/CourseTopicsAccordion";
import CourseCard, { CourseCardSkeleton } from "@/app/(site)/courses/components/CourseCard";
import { useMemo } from "react";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/shared/FAQSection";
import MentorCard from "@/components/MentorCard";
import { getImageUrl } from "@/lib/utils/imageUtils";
import Button from "@/components/ui/Button";
import MainHeading from "@/components/Typography/MainHeading";
import AvatarStack from "@/components/ui/AvatarStack";
import SubHeading from "@/components/Typography/SubHeading";

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params?.courseId as string;

    const { data: course, isLoading, isError } = useGetCourseById(courseId);
    const { data: allCourses, isLoading: isCoursesLoading } = useGetCourses();

    const randomCourses = useMemo(() => {
        if (!allCourses || !courseId) return [];
        const otherCourses = allCourses.filter(c => c._id !== courseId);
        const shuffled = [...otherCourses].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    }, [allCourses, courseId, Math.random()])

    if (isLoading) {
        return <CoursePageSkeleton />
    }

    if (isError || !course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                    We couldn't find the course you're looking for. It may have been removed or doesn't exist.
                </p>
                <Link
                    href="/courses"
                    className="px-6 py-3 bg-[#042BFD] text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                    Back to Courses
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <section className="relative bg-[#F8FAFF] pt-10 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-3">
                            <MainHeading text={course?.title} className="text-[#021165]" />

                            <h2 className="text-2xl font-semibold text-[#252525]">
                                {course?.subtitle || "One-on-one sessions focused on your personal academic needs and growth"}
                            </h2>

                            <p className="text-gray-600 text-md leading-relaxed">
                                {course?.description || "All educational materials, course content, documentation, and tools are protected by copyright. It is an offense to embed a filtration, and tools exclusive license to use this material solely for your personal, non-commercial educational purposes."}
                            </p>

                            <div className="flex flex-wrap gap-6 pt-1">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#021165]" />
                                    <span className="text-md text-[#252525]">
                                        <span className="font-medium">Starts:</span> {new Date(course.startDateTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#021165]" />
                                    <span className="text-md text-[#252525]">
                                        <span className="font-medium">Duration:</span> {course.duration}
                                    </span>
                                </div>
                            </div>
                            <div className="pt-4">
                                <p className="text-md text-gray-600 mb-3">Already joined</p>
                                <div className="flex items-center gap-2">
                                    <AvatarStack count={course.enrolledCount || 5} />
                                </div>
                            </div>
                        </div>

                        <div className="relative w-full aspect-video h-full rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={getImageUrl(course.thumbnail)}
                                alt={course.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-[#042BFD]" fill="#042BFD" opacity={0.6} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
                        <div className="space-y-14">
                            <div>
                                <SubHeading text="What You Will Learn" level={3} />
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {course.benefits && course.benefits.slice(0, 6).map((benefit, index) => (
                                        <div key={index} className="bg-[#E6EAFF] p-6 rounded-xl">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                                                <Figma className="w-8 h-8 text-[#021165]" />
                                            </div>
                                            <h3 className="font-bold text-[#021165] mb-2 text-lg">Lorem Ipsum</h3>
                                            <p className="text-md text-gray-600">Lorem ipsum is a good way to start your design</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {course?.syllabus?.length > 0 && (
                                <div>
                                    <SubHeading text="Topics To Be Covered" level={3} />
                                    <CourseTopicsAccordion
                                        items={course?.syllabus || []}
                                        firstExpanded={true}
                                    />
                                </div>
                            )}
                            <div>
                                <SubHeading text="Next Steps" level={3} />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="flex items-start gap-4">
                                            <Activity className="w-6 h-6 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-semibold text-[#021165] mb-1">Lorem ipsum</h4>
                                                <p className="text-sm text-gray-600">Lorem ipsum is a good way to start your design Lorem</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <SubHeading text="Things You'll Get" level={3} />
                                <div className="flex flex-wrap gap-3">
                                    <BadgePill text="Certificate" icon={<Check className="w-4 h-4" />} />
                                    <BadgePill text="PDF Summary" icon={<Check className="w-4 h-4" />} />
                                    <BadgePill text="Templates" icon={<Check className="w-4 h-4" />} />
                                    <BadgePill text="13 Q&A Session" icon={<Check className="w-4 h-4" />} />
                                </div>
                            </div>
                            <div>
                                <SubHeading text="Value You'll Receive" level={3} />
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                    {[...course?.outcomes, ...course?.benefits].map((item) => (
                                        <div key={item} className="border border-gray-200 rounded-xl p-5">
                                            <div className="flex items-start gap-3 flex-wrap">
                                                <Activity className="w-6 h-6 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="font-semibold text-black">{item}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <SubHeading text="Who Is This For" level={3} />
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        Lorem ipsum is a good way to start your design Loren ipsum is a good way for your design Lorem ipsum is a good way to start your design Loren ipsum is a good way for your design Lorem ipsum is a good way to start your design Loren ipsum is a good way for your design Lorem ipsum is a good way to start your design Loren ipsum is a good way for your design
                                    </p>
                                    <ul className="space-y-2">
                                        {[1, 2, 3, 4].map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="text-[#042BFD] mt-1.5">•</span>
                                                <span className="text-gray-700">Lorem ipsum</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white shadow-sm rounded-2xl px-4 py-3 sticky top-24 space-y-4">
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                    <Image
                                        src={getImageUrl(course.thumbnail)}
                                        alt={course.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                                            <Play className="w-6 h-6 text-[#042BFD]" fill="#042BFD" opacity={0.6} />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-3xl font-bold text-[#172B85]">
                                        {course.cost === 0 ? "Free" : `₹${course.cost.toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
                                        <Clock className="w-4 h-4 text-[#5C5C5C]" />
                                        <span>Starts: {new Date(course.startDateTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
                                        <Calendar className="w-4 h-4 text-[#5C5C5C]" />
                                        <span>Duration: {course.duration}</span>
                                    </div>
                                </div>
                                <Button className="w-full" disabled={!course.isActive}>Buy Now</Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-26">
                        <SubHeading text="View Similar Courses" level={1} className="mb-10" />
                        {isCoursesLoading && (
                            <>
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                            </>
                        )}
                        {!isCoursesLoading && randomCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {randomCourses.map((randomCourse) => (
                                    <CourseCard key={randomCourse._id} course={randomCourse} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No similar courses available.</p>
                        )}
                    </div>

                    <div className="mt-24">
                        <MentorCard educatorId="dr-yethindra" />
                    </div>
                </div>
            </section>
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}


const CoursePageSkeleton = () => {
    return (
        <main className="min-h-screen bg-white">
            <section className="relative bg-[#F8FAFF] pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6 animate-pulse">
                            <div className="h-12 bg-gray-200 rounded-lg w-3/4"></div>
                            <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
                            <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
                            <div className="flex gap-6 pt-2">
                                <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
                                <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
                            </div>
                            <div className="pt-4 space-y-3">
                                <div className="h-4 bg-gray-200 rounded-lg w-24"></div>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-full aspect-video bg-gray-200 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
            </section>
            <section className="relative py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
                        <div className="space-y-12 animate-pulse">
                            <div>
                                <div className="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="bg-gray-100 p-6 rounded-xl h-32"></div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="h-8 bg-gray-200 rounded-lg w-56 mb-6"></div>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="h-14 bg-gray-100 rounded-lg"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="animate-pulse">
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
                                <div className="w-full aspect-video bg-gray-200 rounded-xl"></div>
                                <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                                <div className="space-y-3">
                                    <div className="h-6 bg-gray-200 rounded-lg"></div>
                                    <div className="h-6 bg-gray-200 rounded-lg"></div>
                                </div>
                                <div className="h-12 bg-gray-200 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}