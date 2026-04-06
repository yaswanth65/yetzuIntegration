"use client";

import Image from "next/image";
import Link from "next/link";

const relatedBlogs = [
  {
    id: 10,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog.png",
  },
  {
    id: 11,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog2.png",
  },
  {
    id: 12,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog.png",
  },
];

export default function ReadMoreSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-12 md:py-16">
      <div className="w-full max-w-[1224px] mx-auto">
        {/* Section Title */}
        <h2 className="font-inter font-bold text-[32px] md:text-[42px] leading-[1.2] tracking-[-0.04em] text-[#042BFD] mb-10">
          Read more
        </h2>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedBlogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <div className="bg-white rounded-[16px] overflow-hidden shadow-none border border-[#E0E0E0] hover:shadow-md transition-all duration-300 cursor-pointer">
                {/* Image */}
                <div className="relative w-full h-[200px]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[12px] text-[#7C7C7C] mb-2">{blog.date}</p>
                  <h3 className="font-inter font-semibold text-[18px] leading-[1.4] tracking-[-0.02em] text-[#252525] mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-[14px] text-[#7C7C7C] leading-[150%]">
                    {blog.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
