import { LegalPageType } from "@/app/(legal)/utils";
import React from "react";

const LegalPages = ({ data }: { data: LegalPageType }) => (
    <div className="flex flex-col lg:flex-row justify-between gap-10 lg:mx-20 lg:gap-30 mx-8 my-10">
        <aside className="lg:w-[20%] lg:sticky lg:top-20 self-start">
            <h1 className="text-5xl font-semibold leading-tight text-[#021165]">{data.title}</h1>
            <p className="mt-2 text-sm">Effective Date:</p>
            <p className="text-sm text-gray-500">{data.date}</p>
        </aside>

        <main className="lg:w-[50%]">
            <p className="text-base text-gray-700 leading-relaxed">
                {data.introduction}
            </p>

            <div className="mt-12">
                {data.content.map((section, sectionIndex) => (
                    <section
                        key={sectionIndex}
                        className={sectionIndex > 0 ? "mt-12" : ""}
                    >
                        <h2 className="text-4xl font-semibold text-gray-900">{section.section}</h2>
                        {section.description &&
                            <p className="mt-6 text-base text-gray-700 leading-relaxed">
                                {section.description}
                            </p>
                        }
                        <div className="mt-6 space-y-8">
                            {section.items.map((item, itemIndex) => (
                                <article key={itemIndex}>
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {String.fromCharCode(97 + itemIndex)}. {item.title}
                                    </h3>
                                    <p className="mt-2 text-base text-gray-700 leading-relaxed">
                                        {item.body}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    </div>
);

export default LegalPages;
