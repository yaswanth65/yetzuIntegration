"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { StudentAPI } from "@/lib/api";
import { asArray } from "@/lib/api";

interface BlogPost {
  id?: string;
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  status?: string;
  tags?: string[];
  sections?: Array<{
    img?: string;
    title: string;
    description: string;
    button?: { label: string; link: string };
  }>;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  image?: string;
}

function getBlogId(blog: BlogPost): string {
  return blog.id || blog._id || "";
}

function getBlogImage(blog: BlogPost): string {
  // Try to get image from sections first
  if (blog.sections && blog.sections.length > 0 && blog.sections[0]?.img) {
    return blog.sections[0].img;
  }
  return blog.image || "/images/blog.png";
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "N/A";
  }
}

export default function BlogCardsGrid() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await StudentAPI.getBlogs();
        const blogsList = asArray(res?.data || res?.blogs || res);
        setBlogs(blogsList);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const res = await StudentAPI.getBlogs({ search: query });
        const blogsList = asArray(res?.data || res?.blogs || res);
        setBlogs(blogsList);
      } catch (error) {
        console.error("Search failed:", error);
      }
    } else {
      // Reload all blogs when search is cleared
      try {
        const res = await StudentAPI.getBlogs();
        const blogsList = asArray(res?.data || res?.blogs || res);
        setBlogs(blogsList);
      } catch (error) {
        console.error("Failed to reload blogs:", error);
      }
    }
  };

  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = [...blogs];

    // Filter by category/tags
    if (category !== "all") {
      filtered = filtered.filter(
        (blog) =>
          blog.tags &&
          Array.isArray(blog.tags) &&
          blog.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "recent") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.created_at || 0).getTime();
        const dateB = new Date(b.createdAt || b.created_at || 0).getTime();
        return dateB - dateA;
      });
    }

    return filtered;
  }, [blogs, category, sortBy]);

  const featuredPost = filteredAndSortedBlogs.length > 0 ? filteredAndSortedBlogs[0] : null;
  const regularPosts = filteredAndSortedBlogs.length > 1 ? filteredAndSortedBlogs.slice(1) : [];

  if (isLoading) {
    return (
      <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-8 md:py-12">
        <div className="w-full max-w-[1224px] mx-auto text-center">
          <p className="text-gray-500">Loading blogs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-8 md:py-12">
      <div className="w-full max-w-[1224px] mx-auto">
        {/* Featured Blog Card */}
        {featuredPost && (
          <Link href={`/blog/${getBlogId(featuredPost)}`}>
            <div className="mb-12 bg-white rounded-[24px] overflow-hidden shadow-none hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row md:min-h-[500px]">
                {/* Left Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-block px-4 py-1.5 bg-[#E6EAFF] text-[#042BFD] rounded-full text-sm font-medium mb-6 w-fit">
                    Featured
                  </span>
                  <h2 className="font-inter font-semibold text-[24px] md:text-[32px] lg:text-[36px] leading-[1.3] tracking-[-0.03em] text-[#252525] mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-[#7C7C7C] text-[14px] md:text-[16px] leading-[150%] mb-6">
                    {featuredPost.excerpt || featuredPost.content?.substring(0, 150) + "..." || "No description available"}
                  </p>
                  <p className="text-[#7C7C7C] text-[14px]">
                    {formatDate(featuredPost.createdAt || featuredPost.created_at)}
                  </p>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
                  <Image
                    src={getBlogImage(featuredPost)}
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
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-[12px] border border-[#E0E0E0] bg-white focus:outline-none focus:ring-2 focus:ring-[#042BFD] focus:border-transparent text-[14px]"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7C7C7C]"
            />
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
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="writing">Writing</option>
                <option value="tips">Tips</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7C7C7C] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Blog Cards Grid */}
        {regularPosts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-[24px]">
            <p className="text-gray-500">No blogs found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => {
              const postId = getBlogId(post);
              return (
                <Link key={postId} href={`/blog/${postId}`}>
                  <div className="bg-white rounded-[16px] overflow-hidden shadow-none border border-[#E0E0E0] hover:bg-[#042BFD] hover:text-white transition-all duration-300 cursor-pointer group">
                    {/* Image */}
                    <div className="relative w-full h-[200px]">
                      <Image
                        src={getBlogImage(post)}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-[12px] text-[#7C7C7C] group-hover:text-white mb-2">
                        {formatDate(post.createdAt || post.created_at)}
                      </p>
                      <h3 className="font-inter font-semibold text-[18px] leading-[1.4] tracking-[-0.02em] text-[#252525] group-hover:text-white mb-3">
                        {post.title}
                      </h3>
                      <p className="text-[14px] text-[#7C7C7C] group-hover:text-white leading-[150%]">
                        {post.excerpt || post.content?.substring(0, 100) + "..." || "No description available"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
