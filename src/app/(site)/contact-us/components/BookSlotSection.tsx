"use client";

import MainHeading from "@/components/Typography/MainHeading";
import Paragraph from "@/components/Typography/Paragraph";

export default function BookSlotSection() {
    return (
        <section className="relative w-full py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex justify-center items-center overflow-hidden bg-white">
            {/* Background Concentric Circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                {/* Outer Circle */}
                <div className="w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] rounded-full border border-blue-50/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                {/* Middle Circle */}
                <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-blue-50/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                {/* Inner Circle */}
                <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-blue-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                {/* Decorative Dots */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-100 rounded-full blur-[1px]"></div>
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-blue-100 rounded-full blur-[2px]"></div>
                <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-200 rounded-full"></div>
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto bg-white/50 backdrop-blur-sm p-8 rounded-3xl">
                <h2 className="text-4xl md:text-5xl font-bold text-[#252525] mb-6 tracking-tight">
                    <span className="text-[#042BFD]">Book</span> Your Slot <span className="text-[#042BFD]">Today</span>
                </h2>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-sfpro">
                    Join a Thriving Community Dedicated to Academic Excellence Supported by
                    Cutting-Edge Technology and Expert Mentorship.
                </p>

                <button className="bg-[#042BFD] hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 text-base md:text-lg">
                    Get Invested in Your Academic Success
                </button>
            </div>
        </section>
    );
}
