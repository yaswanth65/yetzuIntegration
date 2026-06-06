"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, CheckCircle2, Clock, ChevronLeft, ChevronRight, Eye, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { authApi } from "@/lib/axios";
import { shortenId } from "@/lib/utils/shortenId";

type Submission = {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentName: string;
  studentEmail: string;
  sessionTitle: string;
  sessionType: string;
  dueDate: string;
  status: string;
  submittedAt: string;
  submitted_url?: string;
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const normalizeStatus = (status: string) => {
  const s = status.toLowerCase();
  if (s === "review done" || s === "reviewed") return "Review Done";
  if (s === "submitted") return "Submitted";
  return "Pending";
};

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await authApi.get("/api/educator/assignments/submissions", {
          params: { page: 1, limit: 100 },
        });
        const data = response?.data?.data || response?.data || response;
        const list = data?.list || data?.submissions || data || [];
        const mapped: Submission[] = (Array.isArray(list) ? list : []).map((item: any) => ({
          id: item.id || item._id,
          assignmentId: item.assignmentId || item.assignment?.id || "-",
          assignmentTitle: item.assignmentTitle || item.assignment?.title || "Assignment",
          studentName: item.studentName || item.student?.name || "Student",
          studentEmail: item.studentEmail || item.student?.email || "",
          sessionTitle: item.sessionTitle || item.session?.title || item.assignment?.session?.title || "Session",
          sessionType: item.session?.sessionType || item.assignment?.session?.sessionType || item.sessionType || "Webinar",
          dueDate: item.assignment?.dueDate || item.dueDate || "",
          status: normalizeStatus(item.status),
          submittedAt: item.submittedAt || item.submissionDate || item.createdAt || "",
          submitted_url: item.submitted_url || item.fileUrl || item.documentUrl || "",
        }));
        setSubmissions(mapped);
      } catch {
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const filteredData = useMemo(() => {
    return submissions.filter(item => {
      if (activeTab === "Pending") return item.status === "Pending" || item.status === "Submitted";
      if (activeTab === "Completed") return item.status === "Review Done";
      return true;
    }).filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return item.assignmentId.toLowerCase().includes(q) ||
        item.assignmentTitle.toLowerCase().includes(q) ||
        item.sessionTitle.toLowerCase().includes(q) ||
        item.studentName.toLowerCase().includes(q);
    });
  }, [activeTab, searchQuery, submissions]);

  const pendingCount = submissions.filter(s => s.status === "Pending" || s.status === "Submitted").length;
  const completedCount = submissions.filter(s => s.status === "Review Done").length;

  const itemsPerPage = 8;
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const renderStatusBadge = (status: string) => {
    if (status === "Submitted") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-[13px] font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {status}
        </div>
      );
    }
    if (status === "Pending") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-200 bg-yellow-50 text-yellow-700 text-[13px] font-medium">
          <Clock className="w-3.5 h-3.5" />
          {status}
        </div>
      );
    }
    if (status === "Review Done") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-[13px] font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {status}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white min-h-screen space-y-6">
      <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Submissions</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200">
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleTabChange("Pending")}
            className={`flex items-center gap-2 pb-4 border-b-2 transition-colors -mb-[1px] ${activeTab === "Pending" ? "border-blue-600 text-gray-900 font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            Pending <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">{pendingCount}</span>
          </button>
          <button
            onClick={() => handleTabChange("Completed")}
            className={`flex items-center gap-2 pb-4 border-b-2 transition-colors -mb-[1px] ${activeTab === "Completed" ? "border-blue-600 text-gray-900 font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            Completed <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">{completedCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto pb-3">
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by assignment, session or student"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-[20px] overflow-hidden bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">ASSIGNMENT ID</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SESSION</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">STUDENT NAME</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SESSION TYPE</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">DUE DATE</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">STATUS</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SUBMISSION DATE</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 text-blue-600 font-medium" title={item.assignmentId}>{shortenId(item.assignmentId)}</td>
                      <td className="px-6 py-5 text-gray-900 font-medium max-w-[200px] truncate">{item.sessionTitle}</td>
                      <td className="px-6 py-5 text-gray-900 font-medium">{item.studentName}</td>
                      <td className="px-6 py-5">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[13px] font-medium">{item.sessionType}</span>
                      </td>
                      <td className="px-6 py-5 text-gray-500">{formatDate(item.dueDate)}</td>
                      <td className="px-6 py-5">{renderStatusBadge(item.status)}</td>
                      <td className="px-6 py-5 text-gray-600">{formatDate(item.submittedAt)}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4 text-gray-400">
                          <Link href={`/e/submissions/${item.id}`} className="hover:text-gray-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </Link>
                          {item.status !== "Pending" && item.submitted_url && (
                            <a href={item.submitted_url} target="_blank" rel="noreferrer" className="hover:text-gray-600 transition-colors">
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && Array.from({ length: 5 }).map((_, i) => (
                    <tr key={`empty-${i}`} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5">&nbsp;</td>
                      <td className="px-6 py-5">&nbsp;</td>
                      <td className="px-6 py-5">&nbsp;</td>
                      <td className="px-6 py-5">&nbsp;</td>
                      <td className="px-6 py-5">&nbsp;</td>
                      <td className="px-6 py-5">&nbsp;</td>
                      <td className="px-6 py-5">&nbsp;</td>
                      <td className="px-6 py-5">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}&ndash;{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} submissions
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[#021165] text-white"
                        : "border border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
