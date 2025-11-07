"use client";

import MainHeading from "@/components/Typography/MainHeading";
import Paragraph from "@/components/Typography/Paragraph";
import Image from "next/image";

export default function BookSlotSection() {
    return (
        <section className="relative w-full py-20 px-4 sm:px-6 flex justify-center items-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/book-slot-bg.png"
                    alt="Decorative Background"
                    fill
                    className="object-cover md:object-contain opacity-90 transition-all duration-700 md:scale-100 scale-150"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white/90 backdrop-blur-sm" />
            </div>

            <div className="text-center max-w-2xl mx-auto">
                <MainHeading text="Book Your Slot Today" highlights={['Book', 'Today']} />
                <Paragraph text="Join a Thriving Community Dedicated to Academic Excellence Supported by
                    Cutting-Edge Technology and Expert Mentorship."/>

                <button className="bg-[#164CFF] hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 text-sm sm:text-base">
                    Get Invested in Your Academic Success
                </button>
            </div>
        </section>
    );
}
