"use client";

import Image from "next/image";

const resources = [
    {
        id: 1,
        image: "https://placehold.co/600x400",
        title: "Loren ipsym, can be used for free any where",
        description:
            "Loren ipsym, can be used for free any where for anything. It is effective tool to solve our text relate problems...",
    },
    {
        id: 2,
        image: "https://placehold.co/600x400",
        title: "Loren ipsym, can be used for free any where",
        description:
            "Loren ipsym, can be used for free any where for anything. It is effective tool to solve our text relate problems...",
    },
    {
        id: 3,
        image: "https://placehold.co/600x400",
        title: "Loren ipsym, can be used for free any where",
        description:
            "Loren ipsym, can be used for free any where for anything. It is effective tool to solve our text relate problems...",
    },
];

export default function ResourceCards() {
    return (
        <section className="w-full bg-gradient-to-b from-blue-50 to-white py-10 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3">
                    Explore Our Resources
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                    Learn from our curated collection of materials and guides. These resources can
                    help you master new concepts or explore advanced topics with ease.
                </p>
            </div>

            {/* Responsive Card Grid */}
            <div className="flex flex-wrap justify-center gap-6">
                {resources.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 w-full sm:w-[48%] lg:w-[30%] flex flex-col"
                    >
                        <div className="relative h-48 w-full">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed flex-1">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
