"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  MoreHorizontal,
  Mail,
  Calendar,
  BookOpen,
  FileText,
  Award,
  AlertCircle,
  Clock,
  Download,
  ChevronUp,
  File,
  CheckCircle2,
  RefreshCw,
  Send
} from "lucide-react";
import { AdminAPI } from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// Helper components
const Badge = ({ children, colorClass }: { children: React.ReactNode, colorClass: string }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
    {children}
  </span>
);

const arr = (value: any) => (Array.isArray(value) ? value : []);
const num = (value: any) => Number(value || 0);

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.id;
  
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await AdminAPI.getUserById(userId);
        const data = response?.data || response;
        if (!data || !data.id) {
          throw new Error(data?.message || "User not found");
        }
        setUserData(data);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err?.response?.data?.message || err?.message || "Failed to load user");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        {error || "User not found"}
      </div>
    );
  }

  const u = userData;
  const s = u.summary || {};
  const initials = u.name ? u.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() : "U";
  const engagementSeries = arr(u.engagementOverview?.series);
  const engagementLabels = arr(u.engagementOverview?.labels);
  const chartData = engagementSeries.length > 0 && engagementLabels.length > 0
    ? engagementLabels.map((label: string, i: number) => ({
        name: String(label).split(' ')[0],
        sessions: num(engagementSeries[0]?.data?.[i]),
        usage: num(engagementSeries[1]?.data?.[i]),
      }))
    : [];

  const programs = arr(u.programsAndSessions);
  const assignments = arr(u.assignmentsAndDocuments);
  const payments = arr(u.billingAndPayments?.transactions);
  const activeCohort = u.activeCohort || null;
  const dueAssignments = arr(u.dueAssignments);
  const activeProgramsCount = num(s.activePrograms);
  const pendingAssignmentsCount = num(s.pendingAssignments);
  const totalSpendLabel = s.totalSpendLabel || "0";

  return (
    <div className="flex flex-col gap-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/a/users" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
          <ChevronLeft className="w-4 h-4" />
          Back to User Management
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium">{u.name}</span>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-semibold">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-gray-900">{u.name}</h1>
                <Badge colorClass="bg-green-100 text-green-700 border border-green-200">
                  {String(u.status || 'Active').charAt(0).toUpperCase() + String(u.status || 'Active').slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail className="w-4 h-4" />
                {u.email || "N/A"}
              </div>
            </div>
          </div>
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <hr className="my-5 border-gray-100" />

        <div className="flex items-center divide-x divide-gray-200 text-sm">
          <div className="pr-6">
            <span className="text-gray-500">Joined: </span>
            <span className="font-medium text-gray-900">{u.joinedLabel || "N/A"}</span>
          </div>
          <div className="px-6">
            <span className="text-gray-500">Last Active: </span>
            <span className="font-medium text-gray-900">{u.lastActiveLabel || "N/A"}</span>
          </div>
          <div className="px-6">
            <span className="text-gray-500">Total Spend: </span>
            <span className="font-medium text-gray-900 text-blue-600">{totalSpendLabel}</span>
          </div>
          <div className="pl-6">
            <span className="text-gray-500">Active Programs: </span>
            <span className="font-medium text-gray-900">{activeProgramsCount}</span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-0.5">Sessions Attended</div>
            <div className="text-2xl font-semibold text-gray-900">{s.sessionsAttended ?? 0}</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-0.5">Active Enrollments</div>
            <div className="text-2xl font-semibold text-gray-900">{s.activeEnrollments ?? 0}</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-0.5">Assignment Completion</div>
            <div className="text-2xl font-semibold text-gray-900">{s.assignmentCompletion ?? "0%"}</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-0.5">Certificates Earned</div>
            <div className="text-2xl font-semibold text-gray-900">{s.certificatesEarned ?? 0}</div>
          </div>
        </div>
      </div>

      {/* Middle Section: Chart + 3 Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Engagement Overview</h2>
            <p className="text-sm text-gray-500">Sessions attended & platform usage – last 6 months</p>
          </div>
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend 
                  iconType="circle" 
                  iconSize={8} 
                  wrapperStyle={{ fontSize: '12px', color: '#6B7280', paddingTop: '20px' }}
                />
                <Line type="monotone" name="Sessions Attended" dataKey="sessions" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: '#3B82F6' }} activeDot={{ r: 5 }} />
                <Line type="monotone" name="Usage Hours" dataKey="usage" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3, fill: '#8B5CF6' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Active Cohort</h3>
                <p className="text-xs text-gray-500">{activeCohort?.educator?.name || "N/A"}</p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900 mb-2">{activeCohort?.title || "N/A"}</div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Next: {activeCohort?.startDateTime || "N/A"}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm relative">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Pending Assignments</h3>
                  <p className="text-xs text-orange-500">Requires attention</p>
                </div>
              </div>
              <span className="text-3xl font-semibold text-orange-500">{pendingAssignmentsCount}</span>
            </div>
            <div className="text-xs text-gray-600 mt-4">
              Next due: <span className="font-medium text-gray-900">{dueAssignments[0]?.dueDate || "N/A"} - {dueAssignments[0]?.title || "N/A"}</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Upcoming Deadlines</h3>
            </div>
            <div className="space-y-3">
              {dueAssignments.length > 0 ? dueAssignments.slice(0, 3).map((item: any) => (
                <div key={item.id || item.assignmentId || item.title} className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">{item.title || "N/A"}</span>
                  <span className="text-gray-400">{item.dueDate || "N/A"}</span>
                </div>
              )) : (
                <div className="text-xs text-gray-500">No upcoming deadlines.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Programs & Sessions Section */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Programs & Sessions</h2>
            <Badge colorClass="bg-blue-50 text-blue-700">{programs.length}</Badge>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50">
              <Calendar className="w-4 h-4" /> Assign Session
            </button>
            <ChevronUp className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Program Name</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Educator</th>
                <th className="px-5 py-4 font-medium">Sessions</th>
                <th className="px-5 py-4 font-medium">Attendance</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {programs.length > 0 ? programs.map((p: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">{p.programName || p.title || "N/A"}</div>
                    <div className="text-xs text-gray-500 mt-1">Started {p.startDate || "N/A"}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      <BookOpen className="w-3.5 h-3.5" /> {p.type || "N/A"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{p.educatorName || p.educator?.name || "N/A"}</td>
                  <td className="px-5 py-4 text-gray-600">{p.sessions ?? 0}/{p.sessionCount ?? 0}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.attendance || 0}%` }}></div>
                      </div>
                      <span className="text-xs font-medium text-green-600">{p.attendance || 0}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge colorClass={p.status === "Active" ? "bg-green-50 text-green-700 border border-green-100" : "bg-gray-100 text-gray-600 border border-gray-200"}>
                      {p.status || "N/A"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600"><FileText className="w-4 h-4" /></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td className="px-5 py-6 text-sm text-gray-500" colSpan={7}>
                    No programs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignments & Documents Section */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Assignments & Documents</h2>
            <Badge colorClass="bg-orange-50 text-orange-600 border border-orange-100">{pendingAssignmentsCount} pending</Badge>
          </div>
          <ChevronUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Assignment</th>
                <th className="px-5 py-4 font-medium">Related Session</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Last Updated</th>
                <th className="px-5 py-4 font-medium">Reviewer</th>
                <th className="px-5 py-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.length > 0 ? assignments.map((a: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${a.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                        <File className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {a.title || "N/A"}
                          {a.version && <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-medium">{a.version}</span>}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Due {a.dueDate || "N/A"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{a.relatedSessionTitle || "N/A"}</td>
                  <td className="px-5 py-4">
                    <Badge colorClass="bg-gray-100 text-gray-600">{a.type || "N/A"}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge colorClass={
                      a.status === 'Completed' ? "bg-green-50 text-green-700" :
                      a.status === 'In Review' ? "bg-yellow-50 text-yellow-700" :
                      "bg-gray-100 text-gray-600"
                    }>
                      {a.status || "N/A"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {a.lastUpdated || "N/A"}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{a.reviewer || "N/A"}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600"><Download className="w-4 h-4" /></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td className="px-5 py-6 text-sm text-gray-500" colSpan={7}>
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="p-4 text-center border-t border-gray-100">
            <button className="text-blue-600 text-sm font-medium hover:underline">View All {assignments.length} Assignments</button>
          </div>
        </div>
      </div>

      {/* Payments & Billing Section */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Payments & Billing</h2>
            <Badge colorClass="bg-green-50 text-green-700 border border-green-100">{payments.length > 0 ? "Active" : "N/A"}</Badge>
          </div>
          <ChevronUp className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Total Paid</div>
              <div className="text-lg font-semibold text-blue-600">{totalSpendLabel}</div>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Last Payment</div>
              <div className="text-sm font-semibold text-gray-900">{u.billingAndPayments?.lastPaymentDate || "N/A"}</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Invoice ID</th>
                <th className="px-5 py-4 font-medium">Plan / Service</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Method</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.length > 0 ? payments.map((p: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4 text-blue-600 font-medium">{p.orderId || "N/A"}</td>
                  <td className="px-5 py-4 text-gray-900">{p.plan || "N/A"}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">{p.amount ?? 0}</td>
                  <td className="px-5 py-4">
                    <Badge colorClass="bg-green-50 text-green-700">{p.status || "N/A"}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.methodType === 'visa' ? 'bg-blue-900 text-white' : p.methodType === 'mastercard' ? 'bg-orange-500 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        {p.methodType ? p.methodType.toUpperCase() : "N/A"}
                      </div>
                      <span className="text-gray-600">{p.method || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{p.date || "N/A"}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 text-gray-400">
                      <button className="hover:text-gray-600"><Send className="w-4 h-4" /></button>
                      <button className="hover:text-gray-600"><Download className="w-4 h-4" /></button>
                      <button className="hover:text-gray-600"><RefreshCw className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td className="px-5 py-6 text-sm text-gray-500" colSpan={7}>
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
