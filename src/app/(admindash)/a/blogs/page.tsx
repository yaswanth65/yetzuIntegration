"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, BookOpen, Calendar, Tag } from "lucide-react";
import { AdminAPI } from "@/lib/api";
import { asArray } from "@/lib/api";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [formData, setFormData] = useState({ title: "", excerpt: "", content: "", status: "published", tags: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadBlogs = async () => {
    try {
      const res = await AdminAPI.getBlogs();
      const blogsList = asArray(res?.data || res?.blogs || res);
      setBlogs(blogsList);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map((t: string) => t.trim()) : [],
      };
      
      if (editingBlog) {
        await AdminAPI.updateBlog(editingBlog.id || editingBlog._id, payload);
      } else {
        await AdminAPI.createBlog(payload);
      }
      
      setFormData({ title: "", excerpt: "", content: "", status: "published", tags: "" });
      setShowForm(false);
      setEditingBlog(null);
      loadBlogs();
    } catch (error) {
      console.error("Failed to save blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      status: blog.status || "published",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
    });
    setShowForm(true);
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await AdminAPI.deleteBlog(blogId);
      loadBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <p className="text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingBlog(null);
            setFormData({ title: "", excerpt: "", content: "", status: "published", tags: "" });
          }}
          className="flex items-center gap-2 bg-[#042BFD] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Create Blog
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 mb-6">
          <h2 className="text-lg font-bold mb-4">{editingBlog ? "Edit Blog" : "Create New Blog"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <input
                type="text"
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                required
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g. writing, tips, education"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD]"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#042BFD] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : (editingBlog ? "Update Blog" : "Create Blog")}
            </button>
          </div>
        </form>
      )}

      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No blogs yet. Create your first blog!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: any) => (
            <div key={blog.id || blog._id} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-gray-900">{blog.title}</h2>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    blog.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}>
                    {blog.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{blog.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(blog.createdAt || blog.created_at).toLocaleDateString()}
                  </span>
                  {blog.tags && blog.tags.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      {blog.tags.slice(0, 2).join(", ")}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id || blog._id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
