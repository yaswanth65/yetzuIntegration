"use client";

import Image from "next/image";
import { Figma } from "lucide-react";
import Button from "@/components/ui/Button";
import Paragraph from "@/components/Typography/Paragraph";

export default function CertificationSection() {
  const steps = [
    {
      id: 1,
      title: "Lorem ipsum is a good way to start your design Loren",
      description:
        "Lorem ipsum is a good way to start your design Loren ipsum is a good way to start your design Loren ipsum is a good way to start your design",
    },
    {
      id: 2,
      title: "Lorem ipsum is a good way to start your design Loren",
      description:
        "Lorem ipsum is a good way to start your design Loren ipsum is a good way to start your design Loren ipsum is a good way to start your design",
    },
    {
      id: 3,
      title: "Lorem ipsum is a good way to start your design Loren",
      description:
        "Lorem ipsum is a good way to start your design Loren ipsum is a good way to start your design Loren ipsum is a good way to start your design",
    },
  ];

  return (
    <section className="relative px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-12 md:py-14 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_50.01%,#FFFFFF_100%)] z-0"></div>
      <div className="max-w-[1224px] mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-16 gap-4 md:gap-6">
          <h2 className="font-inter font-medium text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] max-w-full md:max-w-[658px] capitalize">
            Get certified by Yetzu
          </h2>
          <Button variant="primary" className="!w-fit px-8 !h-[48px] whitespace-nowrap">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#042BFD] text-white flex items-center justify-center shadow-none shadow-blue-500/20">
                  <Figma className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-inter font-medium text-[18px] md:text-[24px] leading-[1.2] md:leading-[30px] tracking-[-0.06em] text-[#021165] capitalize">{step.title}</h4>
                  <Paragraph
                    text={step.description}
                    className="text-gray-500 text-md"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-white/50 border border-white/50 shadow-none">
            <div className="absolute inset-0 bg-[url('https://placehold.co/600x400/png')] bg-cover bg-center opacity-10"></div>
            <Image
              src="/images/certification.jpg"
              alt="Certification"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
