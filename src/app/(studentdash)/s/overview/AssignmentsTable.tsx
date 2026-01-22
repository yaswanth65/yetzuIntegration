"use strict";
import { useState, useMemo, useEffect, useRef } from "react";
import {
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  FileText,
  MessageSquare,
  User,
  ExternalLink,
  X,
  Mail,
  Info,
} from "lucide-react";
import { Assignment, Educator } from "@/lib/queries/assignments/types";
import Link from "next/link";

interface AssignmentsTableProps {
  data: Assignment[];
}

type SortKey = keyof Assignment | "uploadDate";
type SortDirection = "asc" | "desc";

export default function AssignmentsTable({ data = [] }: AssignmentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  } | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedEducator, setSelectedEducator] = useState<Educator | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);

  const pageSize = 5;

  // Click outside handler for menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      let aValue: any = a[sortConfig.key as keyof Assignment];
      let bValue: any = b[sortConfig.key as keyof Assignment];

      // Handle special cases or derived values
      if (sortConfig.key === "uploadDate") {
        aValue = new Date(a.submittedAt).getTime();
        bValue = new Date(b.submittedAt).getTime();
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const currentData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "graded":
        return "bg-green-50 text-green-700 border-green-200";
      case "submitted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "overdue":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "graded":
        return <CheckCircle size={12} />;
      case "submitted":
        return <CheckCircle size={12} />;
      case "pending":
        return <Clock size={12} />;
      case "overdue":
        return <AlertCircle size={12} />;
      default:
        return null;
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">No assignments found.</div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-none border border-gray-100 overflow-hidden relative min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#EBF0FF] text-left">
              <tr>
                <th
                  className="px-6 py-4 text-sm font-semibold text-[#2F327D] cursor-pointer hover:bg-[#dde4fb] transition-colors"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center gap-2">
                    Assignment Title
                    <ArrowUpDown size={14} className="opacity-50" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-sm font-semibold text-[#2F327D] cursor-pointer hover:bg-[#dde4fb] transition-colors"
                  onClick={() => handleSort("submittedAt" as any)}
                >
                  <div className="flex items-center gap-2">
                    Upload Date
                    <ArrowUpDown size={14} className="opacity-50" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-sm font-semibold text-[#2F327D] cursor-pointer hover:bg-[#dde4fb] transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-2">
                    Status
                    <ArrowUpDown size={14} className="opacity-50" />
                  </div>
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-[#2F327D]">
                  Remarks
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-[#2F327D] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentData.map((assignment) => (
                <tr
                  key={assignment._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {assignment.title}
                        </p>
                        <p className="text-xs text-gray-400 line-clamp-1">
                          {assignment.courseId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(assignment.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(assignment.status)}`}
                    >
                      {getStatusIcon(assignment.status)}
                      <span className="capitalize">{assignment.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {assignment.comments || "-"}
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={(e) => toggleMenu(assignment._id, e)}
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenuId === assignment._id && (
                      <div
                        ref={menuRef}
                        className="absolute right-8 top-8 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50 text-left overflow-hidden ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-100 origin-top-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1">
                          {assignment.documentUrl && (
                            <Link
                              href={assignment.documentUrl}
                              target="_blank"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#021165] transition-colors"
                            >
                              <FileText size={16} />
                              View Document
                            </Link>
                          )}
                          {assignment.feedbackUrl && (
                            <Link
                              href={assignment.feedbackUrl}
                              target="_blank"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#021165] transition-colors"
                            >
                              <MessageSquare size={16} />
                              View Feedback
                            </Link>
                          )}
                          <button
                            className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#021165] transition-colors border-t border-gray-50"
                            onClick={() => {
                              setSelectedEducator(assignment.educator);
                              setActiveMenuId(null);
                            }}
                          >
                            <User size={16} />
                            Educator Details
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">
              {Math.min((currentPage - 1) * pageSize + 1, data.length)}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, data.length)}
            </span>{" "}
            of <span className="font-medium">{data.length}</span> results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Educator Details Modal */}
      {selectedEducator && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedEducator(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#021165] p-6 text-white relative">
              <button
                onClick={() => setSelectedEducator(null)}
                className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-3 border-2 border-white/30 backdrop-blur-md">
                  {selectedEducator.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold">{selectedEducator.name}</h3>
                <p className="text-blue-200 text-sm">Educator</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                    Email Address
                  </p>
                  <a
                    href={`mailto:${selectedEducator.email}`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors truncate block"
                  >
                    {selectedEducator.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                  <Info size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                    Status
                  </p>
                  <p className="text-sm font-medium text-gray-900">Active</p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedEducator(null)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
