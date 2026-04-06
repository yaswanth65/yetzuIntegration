"use client";

import { use } from "react";
import Image from "next/image";
import BlogDetailsHeader from "../components/BlogDetailsHeader";
import BlogContentSection from "../components/BlogContentSection";
import ReadMoreSection from "../components/ReadMoreSection";
import BookYourSlot from "../components/BookYourSlot";

// Mock blog data - in real app, this would come from an API
const getBlogData = (id: string) => {
  return {
    id,
    title: "Lorem ipsum is a course to do everything",
    subtitle:
      "One-on-one sessions focused on your personal academic needs and growth",
    date: "25th November,2025",
    author: {
      name: "John Doe",
      avatar: "/images/Avatar.png",
      time: "Saturday 9:00PM",
    },
    image: "/images/blog.png",
    content: {
      overview: `The intellectual property rights to any research data, findings, original manuscripts, or publications you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work. you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work. you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work.`,
      procedure: `The intellectual property rights to any research data, findings, original manuscripts, or publications you develop while using the mentorship services remain solely with you and your affiliated institution.

• The Company and its mentors claim no ownership over your original research work. you develop while using the mentorship services remain solely with you and your affiliated institution.
• The Company and its mentors claim no ownership over your original research work.you develop while using the mentorship services remain solely with you and your affiliated institution.
• The Company and its mentors claim no ownership over your original research work.you develop while using the mentorship services remain solely with you and your affiliated institution.
• The Company and its mentors claim no ownership over your original research work.you develop while using the mentorship services remain solely with you and your affiliated institution.`,
      explanation: `The intellectual property rights to any research data, findings, original manuscripts, or publications you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work. you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work. you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work.`,
      conclusion: `The intellectual property rights to any research data, findings, original manuscripts, or publications you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work. you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work.you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work.you develop while using the mentorship services remain solely with you and your affiliated institution.`,
    },
  };
};

interface BlogDetailsPageProps {
  params: Promise<{ blogId: string }>;
}

export default function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { blogId } = use(params);
  const blogData = getBlogData(blogId);

  return (
    <>
      <BlogDetailsHeader
        title={blogData.title}
        subtitle={blogData.subtitle}
        date={blogData.date}
        author={blogData.author}
      />
      <BlogContentSection content={blogData.content} />
      <ReadMoreSection />
      <BookYourSlot />
    </>
  );
}
