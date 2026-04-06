"use client";

import Paragraph from "@/components/Typography/Paragraph";
import SubHeading from "@/components/Typography/SubHeading";
import Image from "next/image";
import Link from "next/link";

export default function PromoCards() {
    const cards = [
        {
            id: 1,
            theme: "light",
            title: "Loren ipsum is free course now",
            description: "Loren Ipsum meta description is display here, so you can lern and grwp with us , can lern and grwp with us",
        },
        {
            id: 2,
            theme: "dark",
            title: "Loren ipsum is free course now",
            description: "Loren Ipsum meta description is display here, so you can lern and grwp with us , can lern and grwp with us",
        },
        {
            id: 3,
            theme: "light",
            title: "Loren ipsum is free course now",
            description: "Loren Ipsum meta description is display here, so you can lern and grwp with us , can lern and grwp with us",
        },
    ];

    return (
        <section className="py-10 md:py-16 bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
            <div className="w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative rounded-[32px] p-8 h-[520px] flex flex-col justify-between overflow-hidden transition-transform hover:scale-[1.02] duration-300 ${card.theme === "dark"
                                ? "bg-[#042BFD] text-white"
                                : "bg-[#fff] text-[#252525]"
                                }`}
                        >
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full border opacity-20 ${card.theme === 'dark' ? 'border-white' : 'border-blue-200'}`}></div>
                                <div className={`absolute -bottom-10 -right-10 w-48 h-48 rounded-full border opacity-20 ${card.theme === 'dark' ? 'border-white' : 'border-blue-200'}`}></div>
                                <div className={`absolute bottom-10 right-10 w-2 h-2 rounded-full ${card.theme === 'dark' ? 'bg-white' : 'bg-blue-300'} opacity-50`}></div>
                                <div className={`absolute bottom-32 left-10 w-1.5 h-1.5 rounded-full ${card.theme === 'dark' ? 'bg-white' : 'bg-blue-300'} opacity-40`}></div>
                            </div>

                            <div className="relative z-10">
                                <div className="mb-2">
                                    <Image
                                        src="/images/Logo.png"
                                        alt="Logo"
                                        width={140}
                                        height={140}
                                    />
                                </div>
                                <SubHeading text={card.title} level={3} className={`${card.theme === 'dark' ? 'text-white' : 'text-[#042BFD]'}`} />
                                <Paragraph text={card.description} className="mb-2" />
                                <Link
                                    href="#"
                                    className={`text-sm hover:underline ${card.theme === 'dark' ? 'text-white' : 'text-[#042BFD]'}`}
                                >
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
