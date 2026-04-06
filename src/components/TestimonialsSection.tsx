"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sohab Alam",
      role: "Neurosurgeon",
      text: "Yetzu transformed my approach to studying with personalized mentorship that kept me focused and confident.",
      avatar: "/images/Avatar.png",
    },
    {
      name: "Ananya Sharma",
      role: "Medical Student",
      text: "The guidance I received was beyond academics — it shaped how I think and plan for success.",
      avatar: "/images/Avatar.png",
    },
    {
      name: "Rahul Mehta",
      role: "Engineering Graduate",
      text: "Yetzu's mentors were incredibly supportive and practical — helping me balance learning and life.",
      avatar: "/images/Avatar.png",
    },
    {
      name: "Priya Patel",
      role: "Business Analyst",
      text: "Loved how structured and insightful every mentorship session was. Highly recommend to all learners!",
      avatar: "/images/Avatar.png",
    },
    {
      name: "Amit Verma",
      role: "Data Scientist",
      text: "The entire learning journey felt personalized and truly empowering — a great experience overall.",
      avatar: "/images/Avatar.png",
    },
  ];

  // Extended testimonials array for mobile infinite scroll (show 4 at a time)
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  // Adjust scroll speeds per column (desktop)
  const speed = { left: 90, middle: 100, right: 90 };
  // Mobile marquee speed
  const mobileSpeed = 50;

  const measureRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const mobileMarqueeRef = useRef<HTMLDivElement>(null);
  const [colHeight, setColHeight] = useState([0, 0, 0]);
  const [mobileHeight, setMobileHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      const newHeights = measureRefs.map((r) =>
        r.current ? r.current.offsetHeight : 0
      );
      setColHeight(newHeights);
    };

    const measureMobile = () => {
      if (mobileMarqueeRef.current) {
        setMobileHeight(mobileMarqueeRef.current.offsetHeight);
      }
    };

    measure();
    measureMobile();

    const observers = measureRefs.map((r) => {
      if (!r.current || typeof ResizeObserver === "undefined") return null;
      const ro = new ResizeObserver(measure);
      ro.observe(r.current);
      return ro;
    });

    if (mobileMarqueeRef.current && typeof ResizeObserver !== "undefined") {
      const mobileObserver = new ResizeObserver(measureMobile);
      mobileObserver.observe(mobileMarqueeRef.current);
      observers.push(mobileObserver);
    }

    window.addEventListener("resize", () => {
      measure();
      measureMobile();
    });
    return () => {
      window.removeEventListener("resize", () => {
        measure();
        measureMobile();
      });
      observers.forEach((o) => o && o.disconnect());
    };
  }, []);

  const ColumnContent = ({ colIndex }: { colIndex: number }) => (
    <div ref={measureRefs[colIndex]} className="flex flex-col gap-6">
      {testimonials.map((t, i) => (
        <article
          key={`${t.name}-${i}-${colIndex}`}
          className="flex flex-col items-start gap-3 self-stretch w-full max-w-[390px] p-6 rounded-[20px] bg-[#E6EAFF] text-[#252525] text-[16px] leading-[120%] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.10)] h-[260px] overflow-hidden"
        >
          <div className="flex flex-col gap-3 w-full h-full">
            {/* Lucide Quote Icon (filled, smaller, top-left) */}
            <div className="text-[#AFC2FF]">
              <Quote
                size={30}
                strokeWidth={1.2}
                className="fill-[#95aaf0] text-[#AFC2FF] opacity-90"
              />
            </div>

            {/* Testimonial Text */}
            <p className="text-[#252525] text-[18px] leading-[21px] tracking-[-0.03em] line-clamp-4">
              {t.text}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-[#E6EAFF] flex items-center justify-center">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={52}
                  height={52}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#252525] text-[18px] leading-[21px] font-medium">
                  {t.name}
                </p>
                <p className="text-[#252525] text-[14px] leading-[17px] opacity-80">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <section className="relative bg-white px-6 md:px-12 lg:px-20 xl:px-[108px] py-20 flex flex-col items-center gap-10 overflow-hidden">
      {/* Background Blur Effects */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] rounded-full bg-[#E5EAFF]/40 blur-[120px] opacity-60" />
        <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-[#F3F6FF]/50 blur-[100px] opacity-50" />
        <div className="absolute bottom-[10%] left-[25%] w-[700px] h-[400px] rounded-full bg-white/25 blur-[150px]" />
        <div className="absolute top-[40%] left-[5%] w-[450px] h-[450px] rounded-full bg-[#9BAAFE]/20 blur-[90px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-[#F8F9FF]/30" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-4xl">
        <div className="inline-block bg-[#E1E4EA] rounded-full px-4 py-1 text-[#021165] text-sm mb-3">
          Testimonials
        </div>
        <h2 className="text-[#021165] text-3xl md:text-5xl font-semibold mb-3">
          Trusted by Students and Educators Worldwide
        </h2>
        <p className="text-[#333] max-w-3xl mx-auto">
          Explore stories from learners around the world on how Yetzu mentorship
          helped them reach their academic and career goals.
        </p>
      </div>

      {/* Scrolling Testimonial Columns - Desktop Only */}
      <div className="hidden md:grid relative z-10 w-full max-w-[1200px] mx-auto grid-cols-3 gap-8 mt-8">
        {[0, 1, 2].map((col) => {
          const heightPx = colHeight[col] || 0;
          // Middle column (col 1) scrolls DOWN, others scroll UP
          const yFrom = col === 1 ? 0 : -heightPx;
          const yTo = col === 1 ? -heightPx : 0;
          const shouldAnimate = heightPx > 0;
          const verticalOffset =
            col === 1 ? "translate-y-14 lg:translate-y-20" : "";

          return (
            <div
              key={col}
              className={`relative h-[640px] lg:h-[820px] overflow-hidden ${verticalOffset}`}
            >
              {/* Smoke fade gradient overlays */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

              {shouldAnimate ? (
                <motion.div
                  className="flex flex-col gap-6"
                  animate={{ y: [yFrom, yTo] }}
                  transition={{
                    duration:
                      col === 1
                        ? speed.middle
                        : col === 0
                          ? speed.left
                          : speed.right,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  style={{ willChange: "transform" }}
                >
                  <ColumnContent colIndex={col} />
                  <ColumnContent colIndex={col} />
                  <ColumnContent colIndex={col} />
                </motion.div>
              ) : (
                <div className="flex flex-col gap-6">
                  <ColumnContent colIndex={col} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Single Column Marquee - Mobile Only */}
      <div className="md:hidden relative z-10 w-full">
        <div className="relative h-[520px] overflow-hidden">
          {/* Fade overlays for top and bottom */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />

          <motion.div
            ref={mobileMarqueeRef}
            className="flex flex-col gap-6"
            animate={{ y: [-mobileHeight / 2, 0] }}
            transition={{
              duration: mobileSpeed,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ willChange: "transform" }}
          >
            {extendedTestimonials.map((t, i) => (
              <article
                key={`mobile-${i}`}
                className="flex flex-col items-start gap-3 self-stretch w-full max-w-full p-6 rounded-[20px] bg-[#E6EAFF] text-[#252525] text-[16px] leading-[120%] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.10)] h-[200px] overflow-hidden flex-shrink-0"
              >
                <div className="flex flex-col gap-3 w-full h-full">
                  {/* Lucide Quote Icon */}
                  <div className="text-[#AFC2FF]">
                    <Quote
                      size={24}
                      strokeWidth={1.2}
                      className="fill-[#95aaf0] text-[#AFC2FF] opacity-90"
                    />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-[#252525] text-[16px] leading-[19px] tracking-[-0.03em] line-clamp-3">
                    {t.text}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#E6EAFF] flex items-center justify-center flex-shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <p className="text-[#252525] text-[14px] leading-[17px] font-medium truncate">
                        {t.name}
                      </p>
                      <p className="text-[#252525] text-[12px] leading-[14px] opacity-80 truncate">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
