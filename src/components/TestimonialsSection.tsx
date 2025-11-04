"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sohab Alam",
      role: "Neurosurgeon",
      text: "Yetzu transformed my approach to studying with personalized mentorship that kept me focused and confident.",
      avatar: "/images/avatar1.png",
    },
    {
      name: "Ananya Sharma",
      role: "Medical Student",
      text: "The guidance I received was beyond academics — it shaped how I think and plan for success.",
      avatar: "/images/avatar2.png",
    },
    {
      name: "Rahul Mehta",
      role: "Engineering Graduate",
      text: "Yetzu’s mentors were incredibly supportive and practical — helping me balance learning and life.",
      avatar: "/images/avatar3.png",
    },
    {
      name: "Priya Patel",
      role: "Business Analyst",
      text: "Loved how structured and insightful every mentorship session was. Highly recommend to all learners!",
      avatar: "/images/avatar4.png",
    },
    {
      name: "Amit Verma",
      role: "Data Scientist",
      text: "The entire learning journey felt personalized and truly empowering — a great experience overall.",
      avatar: "/images/avatar5.png",
    },
  ];

  return (
    <section className="relative bg-white px-[108px] py-[120px] flex flex-col items-center gap-[52px] overflow-hidden">
      {/* Background Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180.84deg, #FFFFFF 3.15%, rgba(255, 255, 255, 0.4) 28.58%, rgba(255, 255, 255, 0) 47.53%, rgba(255, 255, 255, 0.4) 80.35%, #FFFFFF 99.29%)",
          opacity: 0.8,
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center">
        <div className="inline-block bg-[#E1E4EA] rounded-[132px] px-[15px] py-[4px] text-[#021165] text-[14px] font-medium mb-4">
          Testimonials
        </div>
        <h2 className="text-[#021165] text-[46px] font-[600] leading-[100%] tracking-[-0.06em] font-[Inter] mb-4">
          Trusted by Students and Educators Worldwide
        </h2>
        <p className="text-[#252525] text-[16px] font-[SF Pro] font-[400] tracking-[-0.03em] text-center max-w-4xl mx-auto">
          Explore stories from learners around the world — how Yetzu mentorship helped them reach their academic and career goals.
        </p>
      </div>

      {/* Animated Testimonials Columns */}
      <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {[0, 1, 2].map((col) => (
          <div key={col} className="relative h-[900px] overflow-hidden flex flex-col gap-6">
            {/* Infinite scroll motion container */}
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ["0%", "-50%"] }} // scrolls halfway because we duplicate list
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {/* Duplicate testimonials list for seamless loop */}
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={`${t.name}-${i}-${col}`}
                  className="relative bg-[#E6EAFF] p-6 rounded-2xl shadow-md text-[#252525] font-[SF Pro] text-[18px] tracking-[-0.03em] leading-[100%] overflow-hidden"
                >
                  {/* Card gradient overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180.84deg, #FFFFFF 3.15%, rgba(255,255,255,0.4) 28.58%, rgba(255,255,255,0) 47.53%, rgba(255,255,255,0.4) 80.35%, #FFFFFF 99.29%)",
                      opacity: 0.75,
                    }}
                  />

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="text-[#9BAAFE] text-4xl font-bold mb-3 leading-none">“</div>
                    <p className="text-[#252525] mb-4">{t.text}</p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-[#252525] text-[18px] font-[SF Pro] font-[400] leading-[100%] tracking-[-0.03em]">
                          {t.name}
                        </p>
                        <p className="text-[#9BAAFE] text-[16px] font-[SF Pro] font-[400] leading-[100%] tracking-[-0.03em]">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
