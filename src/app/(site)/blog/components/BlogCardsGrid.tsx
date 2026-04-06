"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title:
      "Loren ipsum , can be used for free any where for anything. Ir is effective tool so",
    description:
      "Loren ipsum , can be used for free any where for anything. Ir is effective tool so solve our...",
    date: "November 23, 2025",
    image: "/images/blog.png",
    featured: true,
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    description:
      "Loren ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog2.png",
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    description:
      "Loren ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog.png",
  },
  {
    id: 4,
    title: "Lorem Ipsum",
    description:
      "Loren ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog2.png",
  },
  {
    id: 5,
    title: "Lorem Ipsum",
    description:
      "Loren ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog.png",
  },
  {
    id: 6,
    title: "Lorem Ipsum",
    description:
      "Loren ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog2.png",
  },
  {
    id: 7,
    title: "Lorem Ipsum",
    description:
      "Loren ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog.png",
  },
  {
    id: 8,
    title: "Lorem Ipsum",
    description:
      "Loren ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog2.png",
  },
  {
    id: 9,
    title: "Lorem Ipsum",
    description:
      "Loren ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog.png",
  },
  {
    id: 10,
    title: "Lorem Ipsum",
    description:
      "Loren ipsum meta description is display here Loren ipsum meta...",
    date: "November 23, 2025",
    image: "/images/blog.png",
  },
];

export default function BlogCardsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [category, setCategory] = useState("all");

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured).slice(0, 10);

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-8 md:py-12">
      <div className="w-full max-w-[1224px] mx-auto">
        {/* Featured Blog Card */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.id}`}>
            <div className="mb-12 bg-white rounded-[24px] overflow-hidden shadow-none hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row md:min-h-[500px]">
                {/* Left Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-block px-4 py-1.5 bg-[#E6EAFF] text-[#042BFD] rounded-full text-sm font-medium mb-6 w-fit">
                    Our Latest
                  </span>
                  <h2 className="font-inter font-semibold text-[24px] md:text-[32px] lg:text-[36px] leading-[1.3] tracking-[-0.03em] text-[#252525] mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-[#7C7C7C] text-[14px] md:text-[16px] leading-[150%] mb-6">
                    {featuredPost.description}
                  </p>
                  <p className="text-[#7C7C7C] text-[14px]">
                    {featuredPost.date}
                  </p>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-[300px] relative">
            <input
              type="text"
              placeholder="Search by"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-[12px] border border-[#E0E0E0] bg-white focus:outline-none focus:ring-2 focus:ring-[#042BFD] focus:border-transparent text-[14px]"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7C7C7C]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 rounded-[12px] border border-[#E0E0E0] bg-white focus:outline-none focus:ring-2 focus:ring-[#042BFD] text-[14px] cursor-pointer min-w-[150px]"
              >
                <option value="date">Sort by</option>
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7C7C7C] pointer-events-none" />
            </div>

            {/* Category */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 rounded-[12px] border border-[#E0E0E0] bg-white focus:outline-none focus:ring-2 focus:ring-[#042BFD] text-[14px] cursor-pointer min-w-[150px]"
              >
                <option value="all">All category</option>
                <option value="tech">Technology</option>
                <option value="education">Education</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7C7C7C] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <div className="bg-white rounded-[16px] overflow-hidden shadow-none border border-[#E0E0E0] hover:bg-[#042BFD] hover:text-white transition-all duration-300 cursor-pointer group">
                {/* Image */}
                <div className="relative w-full h-[200px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[12px] text-[#7C7C7C] group-hover:text-white mb-2">
                    {post.date}
                  </p>
                  <h3 className="font-inter font-semibold text-[18px] leading-[1.4] tracking-[-0.02em] text-[#252525] group-hover:text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-[14px] text-[#7C7C7C] group-hover:text-white leading-[150%]">
                    {post.description}
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
