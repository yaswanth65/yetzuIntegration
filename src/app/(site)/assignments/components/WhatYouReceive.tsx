"use client";
import React from "react";
import Button from "@/components/ui/Button";

const receiveCards = [
  {
    title: "Minimum Viable Product",
    description: "Produce a MVP based on your learnings.",
  },
  {
    title: "Peer Learning",
    description: "Engage in constructive peer reviews and learn from a community of driven learners.",
  },
  {
    title: "Personalized Mentor Feedback",
    description: "Get actionable feedback from industry experts to polish your work.",
  },
  {
    title: "Academic Readiness & Career",
    description: "Build a portfolio of assignments that prove your competency.",
  },
];

export default function WhatYouReceive() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex flex-col items-center">
      <div className="w-full max-w-[1224px] flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-full md:max-w-[700px]">
          <h2 className="font-inter font-medium text-[28px] md:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] mb-4 capitalize">
            What You Receive
          </h2>
          <p className="font-sfpro font-normal text-[15px] md:text-[18px] leading-[100%] tracking-[-0.03em] text-gray-600">
            Assignments are more than just tasks; they are stepping stones to your academic and professional success.
          </p>
        </div>
        <Button variant="primary" className="!w-fit px-8 !h-[48px] whitespace-nowrap bg-[#042BFD] hover:bg-[#021DC0] text-white rounded-xl">
          Try it out!
        </Button>
      </div>

      <div className="w-full max-w-[1224px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {receiveCards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between items-start p-6 gap-5 isolation-isolate w-full h-[380px] bg-[#E6EAFF] shadow-[0px_16px_32px_-12px_rgba(31,30,130,0.1)] rounded-2xl"
          >
            <div className="flex flex-col justify-between gap-2 w-full h-full">
              <h3 className="font-inter font-semibold text-[22px] leading-[27px] tracking-[-0.06em] text-[#252525]">
                {card.title}
              </h3>
              <p className="font-sfpro font-normal text-[16px] leading-[19px] tracking-[-0.03em] text-[#252525]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full mt-4">
        <h5 
          className="font-inter font-bold text-[32px] leading-[39px] text-center max-w-[460px]"
          style={{
            background: "linear-gradient(180deg, #1B5ED5 7.65%, #266BDA 21.63%, #4E89E3 45.19%, #5A92E4 72.12%, #356FD0 94.71%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent"
          }}
        >
          Assignments are not marked.<br />
          They are <span style={{ WebkitTextFillColor: "initial", color: "#021165" }}>refined</span>
        </h5>
      </div>
    </section>
  );
}
