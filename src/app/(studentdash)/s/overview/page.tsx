"use client";

import { useState } from "react";
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
import { useGetStudentOverview } from "@/lib/queries/dashboard/useDashboard";
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
  const { data: overviewData, isLoading } = useGetStudentOverview();
  const { data: assignmentsData, isLoading: assignmentsLoading } =
    useGetStudentAssignments();

  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Use correct types and data sources
  const webinars = overviewData?.webinars || [];
  const dueAssignments = overviewData?.dueAssignments || [];

  return (
    <div className="p-1 bg-[#F9FAFB] min-h-screen font-['Inter']">
      {/* Header */}
      <h1 className="text-4xl font-medium text-[#021165] mb-8">
        Welcome Back, {user?.name || "Joy"}!
      </h1>

      {/* Webinars Section */}
      <div className="mb-10">
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("Upcoming")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "Upcoming"
                ? "bg-white text-[#021165] shadow-none"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming Webinars
          </button>
          <button
            onClick={() => setActiveTab("Past")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "Past"
                ? "bg-white text-[#021165] shadow-none"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Past Webinars
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 rounded-[20px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white p-5 rounded-[20px] shadow-none border border-gray-100 flex flex-col gap-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-200">
                    <Image
                      src={webinar.thumbnail || "/images/placeholder.png"}
                      alt={webinar.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {webinar.title}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {webinar.educatorName}
                    </p>
                  </div>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2">
                  {webinar.description}
                </p>

                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar size={14} />
                    <span>
                      Scheduled :{" "}
                      {webinar.scheduledDate
                        ? new Date(webinar.scheduledDate).toLocaleDateString()
                        : "TBA"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Clock size={14} />
                    <span>Time: {webinar.time || "TBA"}</span>
                  </div>
                  <button className="w-full bg-[#042BFD] hover:bg-[#0325D7] text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-5 rounded-[20px] shadow-none border border-gray-100">
        {/* Assignments Section */}
        <div className="mb-10 ">
          <h2 className="text-3xl font-bold text-[#021165] mb-6">
            Assignments
          </h2>

          <p className="text-gray-500 mb-4">Due Assignments</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dueAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white p-5 rounded-[20px] shadow-none border border-gray-100 flex flex-col gap-6"
              >
                <div className="flex gap-4">
                  <div className="w-[100px] h-[80px] rounded-lg overflow-hidden relative bg-gray-200 flex-shrink-0">
                    <Image
                      src={assignment.thumbnail || "/images/placeholder.png"}
                      alt={assignment.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                      {assignment.course}
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Calendar size={14} />
                    <span>
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  {assignment.isOverdue ? (
                    <span className="text-red-500 font-medium">
                      Overdue by {assignment.daysOverdue} days
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">Due soon</span>
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
              Loading assignments...
            </div>
          ) : !assignmentsData?.assignments ||
            assignmentsData.assignments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-none border border-gray-100 p-10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
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
                className="flex items-center gap-2 bg-[#042BFD] hover:bg-[#0325D7] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <Upload size={16} />
                Upload Assignment
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 mb-4">Submitted Assignments</h3>
                <div className="flex items-center gap-3 ml-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[240px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center gap-2 bg-[#042BFD] hover:bg-[#0325D7] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Upload size={16} />
                    Upload Assignment
                  </button>
                </div>
              </div>
              <AssignmentsTable
                data={
                  assignmentsData?.assignments.filter((a) =>
                    a.title.toLowerCase().includes(searchTerm.toLowerCase()),
                  ) || []
                }
              />
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
