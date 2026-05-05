"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import { AdminAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface Section {
  img: string;
  title: string;
  description: string;
  button?: { label: string; link: string };
}

interface BlogFormProps {
  blog?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BlogForm({ blog, onSuccess, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    status: "published",
    tags: "",
  });
  const [sections, setSections] = useState<Section[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        status: blog.status || "published",
        tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      });
      setSections(Array.isArray(blog.sections) ? blog.sections : []);
    }
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: any = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
        sections: sections.length > 0 ? sections : undefined,
      };

      if (blog) {
        const blogId = blog.id || blog._id;
        await AdminAPI.updateBlog(blogId, payload);
        toast.success("Blog updated successfully");
      } else {
        await AdminAPI.createBlog(payload);
        toast.success("Blog created successfully");
      }

      onSuccess();
    } catch (error) {
      console.error("Failed to save blog:", error);
      toast.error("Failed to save blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSection = () => {
    setSections([...sections, { img: "", title: "", description: "", button: { label: "", link: "" } }]);
  };

  const updateSection = (index: number, field: keyof Section, value: any) => {
    const updated = [...sections];
    if (field === "button") {
      updated[index].button = value;
    } else {
      (updated[index] as any)[field] = value;
    }
    setSections(updated);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">{blog ? "Edit Blog" : "Create New Blog"}</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-900 transition-colors">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
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
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief summary of the blog post"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
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
        </div>

        {/* Sections */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold text-gray-800">
              Sections
              {sections.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">({sections.length})</span>
              )}
            </h3>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-1 text-sm bg-[#E6EAFF] text-[#042BFD] px-3 py-1.5 rounded-lg hover:bg-[#d4dcff] transition-colors"
            >
              <Plus size={14} /> Add Section
            </button>
          </div>

          {sections.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-sm text-gray-400">No sections yet. Click "Add Section" to create content sections.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <GripVertical size={14} className="text-gray-400" />
                      Section {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={section.img}
                        onChange={(e) => updateSection(index, "img", e.target.value)}
                        placeholder="https://cdn.example.com/blogs/image.jpg"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#042BFD]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(index, "title", e.target.value)}
                        placeholder="Section title"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#042BFD]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description *</label>
                      <textarea
                        value={section.description}
                        onChange={(e) => updateSection(index, "description", e.target.value)}
                        placeholder="Section description"
                        rows={2}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#042BFD]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Button Label</label>
                        <input
                          type="text"
                          value={section.button?.label || ""}
                          onChange={(e) => updateSection(index, "button", { ...section.button, label: e.target.value })}
                          placeholder="Read more"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#042BFD]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={section.button?.link || ""}
                          onChange={(e) => updateSection(index, "button", { ...section.button, link: e.target.value })}
                          placeholder="/blogs/my-post"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#042BFD]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#042BFD] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : (blog ? "Update Blog" : "Create Blog")}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
