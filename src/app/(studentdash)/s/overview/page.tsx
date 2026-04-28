"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Search,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Upload,
} from "lucide-react";
import useSession from "@/hooks/useSession";
import { StudentAPI, asArray } from "@/lib/api";
import {
  Webinar,
  Assignment,
  SubmittedAssignment,
} from "@/lib/queries/dashboard/types";
import { useGetStudentAssignments } from "@/lib/queries/assignments/useAssignments";
import Link from "next/link";
import AssignmentsTable from "./AssignmentsTable";
import UploadAssignmentModal from "./UploadAssignmentModal";

export default function StudentDashboardPage() {
  const { user } = useSession();
  const [overviewData, setOverviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: assignmentsData, isLoading: assignmentsLoading } =
    useGetStudentAssignments();

  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await StudentAPI.getOverview();
        setOverviewData(response?.data || response);
      } catch (error) {
        console.error("Overview fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOverview();
  }, []);

  // Use correct types and data sources
  const webinars = asArray(overviewData?.upcomingSessions || overviewData?.recentSessions || []);
  const dueAssignments = asArray(overviewData?.pendingAssignments || overviewData?.dueAssignments || []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-['Inter']">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#021165] mb-6 md:mb-8">
        Welcome Back, {user?.name || "Joy"}!
      </h1>

      {/* Webinars Section */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("Upcoming")}
            className={`px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeTab === "Upcoming"
                ? "bg-white text-[#021165] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming Webinars
          </button>
          <button
            onClick={() => setActiveTab("Past")}
            className={`px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeTab === "Past"
                ? "bg-white text-[#021165] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Past Webinars
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 rounded-[20px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white p-5 rounded-[20px] shadow-none border border-gray-100 flex flex-col gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-200 shrink-0">
                    <Image
                      src={webinar.thumbnail || "/images/placeholder.png"}
                      alt={webinar.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg leading-tight truncate">
                      {webinar.title}
                    </h3>
                    <p className="text-gray-500 text-xs truncate">
                      {webinar.educatorName}
                    </p>
                  </div>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2 h-10">
                  {webinar.description}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-gray-500 text-[11px] sm:text-xs">
                      <Calendar size={14} className="shrink-0" />
                      <span className="truncate">
                        Scheduled :{" "}
                        {webinar.scheduledDate
                          ? new Date(webinar.scheduledDate).toLocaleDateString()
                          : "TBA"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[11px] sm:text-xs">
                      <Clock size={14} className="shrink-0" />
                      <span className="truncate">Time: {webinar.time || "TBA"}</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#042BFD] hover:bg-[#0325D7] text-white font-medium py-2.5 rounded-xl text-sm transition-all active:scale-[0.98]">
                    Join Webinar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[32px] shadow-none border border-gray-100">
        {/* Assignments Section */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#021165] mb-6">
            Assignments
          </h2>

          <p className="text-gray-500 text-sm font-medium mb-4">Due Assignments</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {dueAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-[#F8F9FA] p-5 rounded-[24px] shadow-none border border-gray-100 flex flex-col gap-6"
              >
                <div className="flex gap-4">
                  <div className="w-[80px] h-[64px] rounded-xl overflow-hidden relative bg-gray-200 flex-shrink-0">
                    <Image
                      src={assignment.thumbnail || "/images/placeholder.png"}
                      alt={assignment.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg truncate">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-1">
                      {assignment.course}
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex justify-between items-center text-[11px] sm:text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Calendar size={14} className="shrink-0" />
                    <span>
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  {assignment.isOverdue ? (
                    <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-full">
                      Overdue
                    </span>
                  ) : (
                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">
                      Due soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments Section (Table) */}
        <div>
          {assignmentsLoading ? (
            <div className="p-10 text-center text-gray-500">
              <div className="animate-spin h-8 w-8 border-4 border-[#042BFD] border-t-transparent rounded-full mx-auto mb-4"></div>
              Loading assignments...
            </div>
          ) : !assignmentsData?.assignments ||
            assignmentsData.assignments.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl shadow-none border border-gray-100 p-8 md:p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-gray-400 shadow-sm">
                <Upload size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Assignments Submitted
              </h3>
              <p className="text-gray-500 text-sm mb-6 max-w-md">
                You haven&apos;t submitted any assignments yet. Upload your
                first assignment to get started.
              </p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-2 bg-[#042BFD] hover:bg-[#0325D7] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
              >
                <Upload size={16} />
                Upload Assignment
              </button>
            </div>
          ) : (
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-gray-900 font-semibold">Submitted Assignments</h3>
                  <p className="text-xs text-gray-500">View and track your previous submissions</p>
                </div>
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
                  <div className="relative flex-1 xs:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search assignments..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full xs:w-[200px] md:w-[240px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-[#042BFD] hover:bg-[#0325D7] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 whitespace-nowrap"
                  >
                    <Upload size={16} />
                    Upload New
                  </button>
                </div>
              </div>
              <div className="overflow-hidden">
                <AssignmentsTable
                  data={
                    assignmentsData?.assignments.filter((a) =>
                      a.title.toLowerCase().includes(searchTerm.toLowerCase()),
                    ) || []
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <UploadAssignmentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}
