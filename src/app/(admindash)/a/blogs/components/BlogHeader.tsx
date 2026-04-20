import React from 'react';
import { Plus } from 'lucide-react';

interface BlogHeaderProps {
  onNewBlog: () => void;
}

export default function BlogHeader({ onNewBlog }: BlogHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 pb-6 border-b border-gray-100">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Home</span>
          <span>&gt;</span>
          <span className="font-semibold text-slate-900">Blogs</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Blogs</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create, edit, and manage blog posts for the public site.
        </p>
      </div>
      
      <button 
        onClick={onNewBlog}
        className="flex items-center gap-2 bg-[#00A3FF] hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        New Blog Post
      </button>
    </div>
  );
}
