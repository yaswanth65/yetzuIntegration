"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";

const sliderCards = [
  { id: 1, image: "/images/assg.png", label: "Assignments" },
  { id: 2, image: "/images/assignmentsimage.png", label: "Research" },
  { id: 3, image: "/images/Assignments-Hero.png", label: "Academic Work" },
  { id: 4, image: "/images/Success.png", label: "Achievements" },
  { id: 5, image: "/images/cert-banner.png", label: "Certification" },
];

export default function AssignmentsHero() {
    return (
        <section
            className="relative w-full pt-[140px] pb-[80px] lg:pt-[120px] lg:pb-[60px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex justify-center overflow-hidden z-10"
        >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_50.01%,#FFFFFF_100%)] z-0 pointer-events-none"></div>
            
            <div className="w-full max-w-[1340px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-8 relative z-10">
                
                {/* Left side content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col items-start gap-8 lg:gap-[32px] w-full lg:w-[630px] shrink-0"
                >
                    {/* Header Text Group */}
                    <div className="flex flex-col items-start gap-6 lg:gap-[24px]">
                        <h1 className="font-sans font-semibold text-[32px] sm:text-[38px] leading-[40px] sm:leading-[46px] tracking-[-0.007em] text-[#252525] text-left">
                            Assignments That Build Academic<br className="hidden md:inline" /> <span className="text-[#042BFD]">Mastery</span> Not Just Submissions
                        </h1>
                        
                        {/* Description */}
                        <p className="font-sans font-normal text-[16px] sm:text-[18px] leading-[22px] sm:leading-[21px] tracking-[-0.03em] text-[#252525] max-w-[530px] text-left">
                            Every webinar, cohort, and mentorship at Yetzu includes<br className="hidden md:inline" /> structured assignments designed to sharpen thinking, improve<br className="hidden md:inline" /> writing quality, and accelerate research readiness
                        </p>
                    </div>

                    {/* Buttons Group */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-[24px] w-full sm:w-auto">
                        <Button 
                            variant="primary" 
                            className="w-full sm:!w-[285px] !h-[52px] bg-[#042BFD] hover:bg-[#021DC0] shadow-[0px_2px_4px_rgba(31,30,130,0.04)] rounded-[12px] font-sans font-normal text-[16px] sm:text-[18px] leading-[21px] text-white flex items-center justify-center shrink-0 whitespace-nowrap"
                        >
                            Explore How Assignments Work
                        </Button>
                        <Button 
                            variant="secondary" 
                            className="w-full sm:!w-[150px] !h-[52px] border-[2px] border-[#0325D7] hover:bg-[#0325D7]/5 rounded-[12px] font-sans font-normal text-[16px] sm:text-[18px] leading-[21px] !text-[#021165] flex items-center justify-center shrink-0 whitespace-nowrap"
                        >
                            Join a Webinar
                        </Button>
                    </div>
                </motion.div>

                {/* Right side - Infinite Scroll Slider */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full lg:w-[540px] xl:w-[744px] h-[300px] sm:h-[380px] lg:h-[380px] xl:h-[525px] bg-[linear-gradient(180deg,#2145FF_0%,#5670FF_16.35%,#6E84FF_49.05%,#5670FF_81.74%,#2245FF_100%)] rounded-[20px] lg:rounded-r-none p-3 sm:p-5 lg:p-6 xl:p-8 flex items-center shrink-0 shadow-lg mt-8 lg:mt-0 overflow-hidden"
                    style={{ marginRight: "calc(50% - 50vw)" }}
                >
                    <div className="relative w-full h-full overflow-hidden rounded-[16px]">
                        <motion.div
                            className="flex gap-4"
                            style={{ width: "fit-content" }}
                            animate={{ x: "-50%" }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            {[...sliderCards, ...sliderCards].map((card, i) => (
                                <div
                                    key={i}
                                    className="relative w-[220px] sm:w-[260px] lg:w-[240px] xl:w-[280px] h-full shrink-0 rounded-[16px] overflow-hidden bg-white shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.12)]"
                                >
                                    <Image
                                        src={card.image}
                                        alt={card.label}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 sm:p-4">
                                        <span className="text-white font-inter font-medium text-[13px] sm:text-[15px] leading-[18px] tracking-[-0.03em]">
                                            {card.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
