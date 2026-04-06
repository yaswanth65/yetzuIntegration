"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

export default function MentorshipSection() {
  return (
    <section className="flex flex-col justify-center items-center min-h-auto px-4 sm:px-6 md:px-12 lg:px-[108px] gap-6 sm:gap-8 md:gap-10 lg:gap-12 bg-white w-full py-12 md:py-14 lg:py-16">
      <div className="flex flex-col justify-center items-start gap-6 md:gap-8 w-full max-w-[1224px]">
        {/* Header & Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 md:gap-6">
          <h2 className="font-inter font-semibold text-[38px] sm:text-[38px] md:text-[40px] lg:text-[46px] leading-[100%] md:leading-[56px] tracking-[-0.7%] text-[#021165] max-w-full md:max-w-[658px]">
            1:1 Mentorship & Expert Academic Guidance
          </h2>

          <Button
            variant="primary"
            className="!w-fit px-8 !h-[48px] whitespace-nowrap"
          >
            Learn More
          </Button>
        </div>

        {/* Subtext */}
        <p className="font-sfpro font-normal text-[16px] md:text-[18px] leading-[150%] md:leading-[21px] tracking-[-0.03em] text-[#252525] w-full max-w-full md:max-w-[860px]">
          Experience Personalized Coaching and Strategic Academic Support that
          Adapts to your Unique Goals and Challenges for Measurable Growth and
          Confidence.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-[1224px]">
        {[
          {
            title: "Customized Mentorship Sessions",
            desc: "One-on-one sessions focused on your personal academic needs and growth",
            bgColor: "bg-[#E6EAFF]",
            iconBg: "bg-[#9BAAFE]",
            titleColor: "text-[#252525]",
            descColor: "text-[#252525]",
          },
          {
            title: "Milestone Based Progress Tracking",
            desc: "Regular feedback loops track your development and keep you motivated.",
            bgColor: "bg-[#506BFE]",
            iconBg: "bg-[#E6EAFF]",
            titleColor: "text-white",
            descColor: "text-white",
          },
          {
            title: "Direct Mentor Engagement",
            desc: "Seamless communication channels for real-time support and clarifications.",
            bgColor: "bg-[#E6EAFF]",
            iconBg: "bg-[#9BAAFE]",
            titleColor: "text-[#252525]",
            descColor: "text-[#252525]",
          },
          {
            title: "Comprehensive Academic Support",
            desc: "Including assignment reviews, proofreading, and publication readiness and assistance.",
            bgColor: "bg-[#506BFE]",
            iconBg: "bg-[#E6EAFF]",
            titleColor: "text-white",
            descColor: "text-white",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between items-start p-5 md:p-6 gap-4 md:gap-5 w-full min-h-[260px] md:min-h-[288px] ${item.bgColor} shadow-[0px_16px_32px_-12px_rgba(31,30,130,0.1)] rounded-[16px]`}
          >
            {/* Icon */}
            <div
              className={`flex flex-row items-center justify-center p-[16px] gap-[24px] w-[52px] h-[52px] ${item.iconBg} rounded-full flex-shrink-0`}
            >
              <Image
                src="/images/Icon.png"
                alt="Feature Icon"
                width={20}
                height={20}
                className="w-[20px] h-[20px]"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col items-start gap-[8px] w-full">
              <h3
                className={`font-inter font-semibold text-[18px] md:text-[22px] leading-[130%] md:leading-[27px] tracking-[-0.06em] ${item.titleColor}`}
              >
                {item.title}
              </h3>
              <p
                className={`font-sfpro font-normal text-[14px] md:text-[16px] leading-[150%] md:leading-[19px] tracking-[-0.03em] ${item.descColor}`}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
