"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import BlogTable from "@/app/(admindash)/components/BlogTable";
import BlogForm from "@/app/(admindash)/a/blogs/components/BlogForm";
import { AdminAPI, asArray } from "@/lib/api";
import { toast } from "react-hot-toast";

interface Blog {
  id?: string;
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  status: string;
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
}

export default function AdminBlogsPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [viewingBlog, setViewingBlog] = useState<Blog | null>(null);
  const [isViewPanelOpen, setIsViewPanelOpen] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await AdminAPI.getBlogs();
      const blogsList = asArray(response?.data || response?.blogs || response);
      setBlogs(blogsList);
    } catch (error) {
      console.error("Failed to load blogs:", error);
      toast.error("Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleCreateNew = () => {
    setEditingBlog(null);
    setShowForm(true);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowForm(true);
    setIsViewPanelOpen(false);
  };

  const handleView = async (blog: Blog) => {
    const blogId = blog.id || blog._id;
    if (!blogId) return;

    try {
      const res = await AdminAPI.getBlogById(blogId);
      const blogData = res?.data || res;
      setViewingBlog(blogData);
      setIsViewPanelOpen(true);
    } catch (error) {
      console.error("Failed to fetch blog details:", error);
      toast.error("Failed to load blog details");
    }
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await AdminAPI.deleteBlog(blogId);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBlog(null);
    fetchBlogs();
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <p className="text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#021165] tracking-tight">Blogs</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage and monitor all blog posts</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center justify-center gap-2 bg-[#042BFD] text-white px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#0325D7] transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          Create Blog
        </button>
      </div>

      {/* Blog Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#021165]/40 backdrop-blur-sm" onClick={() => { setShowForm(false); setEditingBlog(null); }} />
          <div className="relative bg-white rounded-[32px] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <BlogForm
              blog={editingBlog}
              onSuccess={handleFormSuccess}
              onCancel={() => { setShowForm(false); setEditingBlog(null); }}
            />
          </div>
        </div>
      )}

      {/* Blog Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <BlogTable
          data={blogs}
          showHeader={true}
          title="All Blogs"
          onRowClick={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* View Panel Overlay */}
      {isViewPanelOpen && viewingBlog && (
        <>
          <div
            className="fixed inset-0 bg-[#021165]/40 backdrop-blur-sm z-[60] transition-opacity"
            onClick={() => {
              setIsViewPanelOpen(false);
              setViewingBlog(null);
            }}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[500px] bg-white z-[70] shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
            <BlogViewPanel
              blog={viewingBlog}
              onClose={() => {
                setIsViewPanelOpen(false);
                setViewingBlog(null);
              }}
              onEdit={() => {
                setIsViewPanelOpen(false);
                handleEdit(viewingBlog);
              }}
            />
          </div>
        </>
      )}

      <div className="pb-10" />
    </div>
  );
}

function BlogViewPanel({ blog, onClose, onEdit }: {
  blog: Blog;
  onClose: () => void;
  onEdit: () => void;
}) {
  const getBlogId = (b: Blog): string => b.id || b._id || "";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="text-xs font-semibold text-gray-500 mb-2">Blog: {getBlogId(blog)}</div>
        <div className="flex items-center justify-between pr-8">
          <h2 className="text-xl font-bold text-gray-900">{blog.title || "Untitled Blog"}</h2>
          <button
            onClick={onEdit}
            className="ml-4 px-4 py-1.5 rounded-lg text-sm font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
        {/* Status & Meta */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Status</div>
              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${
                blog.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}>
                {blog.status}
              </span>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Created</div>
              <div className="text-sm font-semibold text-gray-900">
                {blog.createdAt || blog.created_at
                  ? new Date(blog.createdAt || blog.created_at!).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            {blog.tags && blog.tags.length > 0 && (
              <div className="col-span-2">
                <div className="text-xs font-medium text-gray-500 mb-1">Tags</div>
                <div className="flex flex-wrap gap-1">
                  {blog.tags.map((tag: string, i: number) => (
                    <span key={i} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-medium text-gray-500 mb-2">Excerpt</div>
            <p className="text-sm text-gray-700 leading-relaxed">{blog.excerpt}</p>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="text-xs font-medium text-gray-500 mb-2">Content</div>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.content}</p>
        </div>

        {/* Sections */}
        {blog.sections && blog.sections.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-medium text-gray-500 mb-4">Sections ({blog.sections.length})</div>
            <div className="space-y-4">
              {blog.sections.map((section: any, idx: number) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  {section.img && (
                    <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                      <img src={section.img} alt={section.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">{section.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{section.description}</p>
                  {section.button && section.button.label && (
                    <a
                      href={section.button.link || "#"}
                      className="inline-block px-6 py-3 bg-[#042BFD] text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {section.button.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
