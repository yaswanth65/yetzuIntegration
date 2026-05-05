"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import BlogDetailsHeader from "../components/BlogDetailsHeader";
import BlogContentSection from "../components/BlogContentSection";
import ReadMoreSection from "../components/ReadMoreSection";
import BookYourSlot from "../components/BookYourSlot";
import { StudentAPI } from "@/lib/api";

interface BlogData {
  id?: string;
  _id?: string;
  title: string;
  excerpt?: string;
  content: string;
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
  author?: {
    name: string;
    avatar?: string;
    time?: string;
  };
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "N/A";
  try {
    const date = new Date(dateStr);
    const day = date.getDate();
    const suffix = (day: number) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day}${suffix(day)}${month},${year}`;
  } catch {
    return "N/A";
  }
}

interface BlogDetailsPageProps {
  params: Promise<{ blogId: string }>;
}

export default function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { blogId } = use(params);
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await StudentAPI.getBlogById(blogId);
        const data = res?.data || res;
        setBlogData(data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Failed to load blog post");
      } finally {
        setIsLoading(false);
      }
    };
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading blog post...</p>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || "Blog post not found"}</p>
        <a href="/blog" className="text-blue-600 hover:underline">
          Back to Blogs
        </a>
      </div>
    );
  }

  return (
    <>
      <BlogDetailsHeader
        title={blogData.title}
        subtitle={blogData.excerpt || ""}
        date={formatDate(blogData.createdAt || blogData.created_at)}
        author={{
          name: blogData.author?.name || "Admin",
          avatar: blogData.author?.avatar || "/images/Avatar.png",
          time: blogData.author?.time || formatDate(blogData.createdAt || blogData.created_at),
        }}
      />

      {/* Render sections with sidebar navigation */}
      <BlogContentSection
        sections={blogData.sections}
        content={blogData.content}
      />

      <ReadMoreSection />
      <BookYourSlot />
    </>
  );
}
