"use client";

import React, { useState } from 'react';
import BlogHeader from './components/BlogHeader';
import BlogTable from './components/BlogTable';
import AddBlogModal from './components/AddBlogModal';

export default function BlogsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <BlogHeader onNewBlog={() => setIsModalOpen(true)} />
        <BlogTable />
      </div>

      <AddBlogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
