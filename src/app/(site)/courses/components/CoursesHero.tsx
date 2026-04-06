"use client";

import MainHeading from "@/components/Typography/MainHeading";
import Paragraph from "@/components/Typography/Paragraph";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function CoursesHero() {
    return (
        <section className="relative w-full bg-[#F8FAFF] pt-20 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] overflow-hidden flex items-center min-h-[600px]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                <div className="flex flex-col items-start space-y-6 z-10">
                    <MainHeading text="Choose your Ideal Course" highlights={["Ideal", "Course"]} />
                    <Paragraph text="Explore courses tailored to your level and goals." />
                    <div className="flex flex-wrap gap-4 w-full max-w-md mt-4">
                        <Button variant="secondary" style={{ width: 'fit-content' }}>Medical</Button>
                        <Button style={{ width: 'fit-content' }}>Engineering</Button>
                    </div>
                </div>
                <div className="relative flex justify-center lg:justify-end z-10">
                    <div className="relative w-full max-w-[600px] aspect-[4/3] flex items-center justify-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#F0F2F9] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10"></div>

                        <Image
                            src="/images/Hero Section.png"
                            alt="Course Illustration"
                            width={600}
                            height={450}
                            className="object-contain relative z-10 drop-shadow-xl"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
