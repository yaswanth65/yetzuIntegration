import React from 'react';
import { Search, RefreshCw, Trash2 } from 'lucide-react';

const mockBlogs = [
  {
    id: 1,
    title: 'How to Optimize Your Workflow for Maximum Productivity',
    author: 'Sarah Jenkins',
    status: 'Published',
    date: 'Apr 15, 2026',
  },
  {
    id: 2,
    title: 'Understanding the New Web Design Trends of 2026',
    author: 'David Chen',
    status: 'Published',
    date: 'Apr 14, 2026',
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Project Management Tools',
    author: 'Elena Rodriguez',
    status: 'Draft',
    date: 'Apr 10, 2026',
  },
];

export default function BlogTable() {
  return (
    <div className="bg-white rounded-[20px] border border-gray-200 mt-8 w-full shadow-sm overflow-hidden p-6 pb-12">
      {/* Table Toolbar */}
      <div className="flex justify-start items-center gap-4 mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by title..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#FAFAFA] border-y border-gray-100">
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider w-[45%]">TITLE</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider w-[20%]">AUTHOR</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider w-[10%]">STATUS</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider w-[12%]">DATE</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider w-[13%]">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockBlogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-6 px-6 text-sm font-semibold text-slate-800">
                  {blog.title}
                </td>
                <td className="py-6 px-6 text-sm text-slate-600">
                  {blog.author}
                </td>
                <td className="py-6 px-6 text-sm text-slate-600">
                  {blog.status}
                </td>
                <td className="py-6 px-6 text-sm text-slate-600 font-medium">
                  {blog.date}
                </td>
                <td className="py-6 px-6">
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors">
                      View
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
