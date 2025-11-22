"use client";

import Image from "next/image";
import { Figma } from "lucide-react";
import SubHeading from "@/components/Typography/SubHeading";
import Button from "@/components/ui/Button";
import Paragraph from "@/components/Typography/Paragraph";

export default function CertificationSection() {
    const steps = [
        {
            id: 1,
            title: "Lorem ipsum is a good way to start your design Loren",
            description: "Lorem ipsum is a good way to start your design Loren ipsum is a good way to start your design Loren ipsum is a good way to start your design",
        },
        {
            id: 2,
            title: "Lorem ipsum is a good way to start your design Loren",
            description: "Lorem ipsum is a good way to start your design Loren ipsum is a good way to start your design Loren ipsum is a good way to start your design",
        },
        {
            id: 3,
            title: "Lorem ipsum is a good way to start your design Loren",
            description: "Lorem ipsum is a good way to start your design Loren ipsum is a good way to start your design Loren ipsum is a good way to start your design",
        },
    ];

    return (
        <section className="relative px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_50.01%,#FFFFFF_100%)] z-0"></div>
            <div className="max-w-7xl mx-auto py-10 relative">

                <div className="flex flex-col md:flex-row md:items-end justify-between items-center gap-6 mb-16">
                    <SubHeading text="Get certified by Yetzu" level={1} />
                    <Button variant="secondary" style={{ width: "180px" }}>Learn More</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <div className="space-y-12">
                        {steps.map((step) => (
                            <div key={step.id} className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#042BFD] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Figma className="w-6 h-6" />
                                </div>
                                <div>
                                    <SubHeading text={step.title} level={4} />
                                    <Paragraph text={step.description} className="text-gray-500 text-md" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-white/50 border border-white/50 shadow-sm">
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
