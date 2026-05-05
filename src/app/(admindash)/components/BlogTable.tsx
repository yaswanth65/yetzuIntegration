"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AdminAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface Blog {
  id?: string;
  _id?: string;
  title: string;
  status: string;
  tags?: string[];
  createdAt?: string;
  created_at?: string;
  sections?: any[];
  excerpt?: string;
  content?: string;
}

interface Props {
  data: Blog[];
  showHeader?: boolean;
  title?: string;
  onRowClick?: (blog: Blog) => void;
  selectedBlogId?: string;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blogId: string) => void;
  className?: string;
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-4 h-4"
    >
      <path
        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    published: "bg-green-100 text-green-800",
    draft: "bg-gray-100 text-gray-600",
    archived: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
}

export default function BlogTable({ data, showHeader = true, title, onRowClick, selectedBlogId, onEdit, onDelete, className = "mt-10" }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, blogId: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setDeletingId(blogId);
    try {
      await AdminAPI.deleteBlog(blogId);
      toast.success("Blog deleted successfully");
      if (onDelete) onDelete(blogId);
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (e: React.MouseEvent, blog: Blog) => {
    e.stopPropagation();
    if (onEdit) onEdit(blog);
  };

  const getBlogId = (blog: Blog) => blog.id || blog._id || "";

  return (
    <div className={`bg-white rounded-2xl border-2 border-gray-100 overflow-hidden w-full ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between p-6">
          <h1 className="font-semibold">{title || "All Blogs"}</h1>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="bg-gray-100 border-b border-t border-gray-200">
              {["Title", "Status", "Tags", "Created Date", "Actions"].map((col, idx) => (
                <th key={idx} className="font-medium text-[14px] text-gray-600 px-7 py-4 text-left">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {(!data || data.length === 0) ? (
              <tr>
                <td colSpan={5} className="px-7 py-8 text-center text-gray-500">
                  No blogs found
                </td>
              </tr>
            ) : data.map((item, idx) => {
              const blogId = getBlogId(item);
              return (
                <tr
                  key={blogId || idx}
                  className={`transition-colors hover:bg-gray-50 cursor-pointer ${selectedBlogId === blogId ? "bg-blue-50/50" : ""}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  <td className="px-7 py-4">
                    <div className="font-semibold text-sm text-gray-900">{item.title || "Untitled"}</div>
                    {item.excerpt && (
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1">{item.excerpt}</div>
                    )}
                  </td>
                  <td className="px-7 py-4">
                    <StatusBadge status={item.status || "draft"} />
                  </td>
                  <td className="px-7 py-4">
                    <div className="flex flex-wrap gap-1">
                      {item.tags && item.tags.length > 0 ? (
                        item.tags.slice(0, 3).map((tag: string, i: number) => (
                          <span key={i} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                      {item.tags && item.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{item.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-7 py-4 text-gray-500 text-sm">
                    {item.createdAt || item.created_at
                      ? new Date(item.createdAt || item.created_at!).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-7 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onRowClick) onRowClick(item);
                        }}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <EyeIcon />
                      </button>
                      <button
                        onClick={(e) => handleEdit(e, item)}
                        className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, blogId)}
                        disabled={deletingId === blogId}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
