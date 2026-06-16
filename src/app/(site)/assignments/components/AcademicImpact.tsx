"use client";
import React from "react";
import Button from "@/components/ui/Button";

const listItems = [
  { num: "01", text: "Improve writing precision" },
  { num: "02", text: "Reduce manuscript rejection risk" },
  { num: "03", text: "Increase publication readiness" },
  { num: "04", text: "Develop structured thinking" },
  { num: "05", text: "Gain confidence in academic communication" },
];

const statsCards = [
  { value: "3.2×", label: "Higher publication acceptance rate" },
  { value: "89%", label: "Report improved academic confidence" },
  { value: "2× Faster", label: "Research output improvement" },
];

export default function AcademicImpact() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex flex-col items-center">
      <div className="w-full max-w-[1224px] flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-full md:max-w-[700px]">
          <h2 className="font-inter font-medium text-[28px] md:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] mb-4 capitalize">
            Academic Impact
          </h2>
          <p className="font-sfpro font-normal text-[15px] md:text-[18px] leading-[100%] tracking-[-0.03em] text-gray-600">
            Experience measurable improvements in your academic journey and professional capabilities.
          </p>
        </div>
        <Button variant="primary" className="!w-fit px-8 !h-[48px] whitespace-nowrap bg-[#042BFD] hover:bg-[#021DC0] text-white rounded-xl">
          Try it out!
        </Button>
      </div>

      <div 
        className="w-full max-w-[1224px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-10 py-10 px-4 sm:px-12 rounded-[18px]"
        style={{ background: "linear-gradient(93.35deg, #F9F9F9 1.02%, #F0F0FC 47.1%, #F9F9F9 99.81%)" }}
      >
        {/* Left Side List */}
        <div className="flex flex-col w-full lg:max-w-[500px]">
          <div className="flex flex-col border-t border-[#A5BDFC]">
            {listItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center p-4 sm:p-[24px] gap-[10px] border-b border-[#A5BDFC] w-full"
              >
                <div className="flex flex-row justify-center items-center w-[30px] h-[33px]">
                  <span 
                    className="font-inter font-bold text-[22px] leading-[33px]"
                    style={{
                      background: "linear-gradient(180deg, #2145FF 0%, #5670FF 16.35%, #6E84FF 49.05%, #5670FF 81.74%, #2245FF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent"
                    }}
                  >
                    {item.num}
                  </span>
                </div>
                <span className="font-inter font-medium text-[16px] sm:text-[18px] leading-snug sm:leading-[27px] text-[#021165]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Stats */}
        <div className="flex flex-col items-start lg:items-end gap-4 w-full lg:max-w-[500px]">
          {statsCards.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-end items-start p-6 gap-1 w-full lg:max-w-[381px] h-auto min-h-[124px] rounded-[20px] box-border"
              style={{
                background: "linear-gradient(249.14deg, #E6EAFF 4.16%, #FFFFFF 98.15%)",
                border: "2px solid #FFFFFF",
                boxShadow: "0px 16px 32px -12px rgba(31, 30, 130, 0.1)"
              }}
            >
              <h5 className="font-inter font-bold text-[28px] sm:text-[32px] leading-tight text-[#021165]">
                {stat.value}
              </h5>
              <p className="font-inter font-normal text-[14px] leading-[21px] text-[#252525]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
