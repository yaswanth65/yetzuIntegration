import React, { useState, useEffect } from "react";
import { Session } from "@/app/(admindash)/types/SessionType";
import { AdminAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface Props {
  session: Session | null;
  onClose: () => void;
  onUpdate?: () => void;
}

type TabName = "Overview" | "Assignments" | "Files" | "Notes" | "Activity Logs";

export default function SessionDetailsPanel({ session, onClose, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    if (session) {
      setEditData({
        title: session.title,
        status: session.status,
        type: session.type,
        date: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
      });
    }
  }, [session]);

  if (!session) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await AdminAPI.updateSession(session.id, editData);
      toast.success("Session updated successfully");
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to update session:", error);
      toast.error("Failed to update session");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs: TabName[] = ["Overview", "Assignments", "Files", "Notes", "Activity Logs"];

  return (
    <div className="bg-white h-screen flex flex-col border-l border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <i className="ri-close-h-line text-xl"></i>
        </button>

        <div className="text-xs font-semibold text-gray-500 mb-2">Session ID: {session.id}</div>
        <div className="flex items-center justify-between pr-8">
          {isEditing ? (
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="text-xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none w-full"
            />
          ) : (
            <h2 className="text-xl font-bold text-gray-900">{session.title || "Academic Writing Fundamentals"}</h2>
          )}
          
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isSaving}
            className={`ml-4 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              isEditing 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            {isSaving ? "Saving..." : (isEditing ? "Save" : "Edit")}
          </button>
          {isEditing && (
            <button 
              onClick={() => setIsEditing(false)}
              className="ml-2 px-4 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-6 gap-6 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 relative top-[1px] ${activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#fcfcfc]">
        {activeTab === "Overview" && (
          <div className="space-y-6">
            {/* Session Details */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1 divide-y divide-gray-50">
              {[
                { 
                  label: "Status", 
                  value: isEditing ? (
                    <select 
                      value={editData.status} 
                      onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      className="border rounded px-2 py-1 text-sm w-full"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Live">Live</option>
                      <option value="Completed">Completed</option>
                      <option value="Missed">Missed</option>
                    </select>
                  ) : (
                    <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${session.status === "Live" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{session.status}</span> 
                  )
                },
                { 
                  label: "Date", 
                  value: isEditing ? (
                    <input 
                      type="text" 
                      value={editData.date} 
                      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      className="border rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    session.date || "02-12-2024" 
                  )
                },
                { label: "Duration", value: "1hr 30m" },
                { 
                  label: "Type", 
                  value: isEditing ? (
                    <input 
                      type="text" 
                      value={editData.type} 
                      onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                      className="border rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    session.type 
                  )
                },
                { label: "Delivery Method", value: "Online" },
                { label: "Recording Link", value: <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">https://zoom.us/rec/play/123 <i className="ri-external-link-line text-xs"></i></a> },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center py-4 px-5">
                  <div className="w-40 text-sm font-medium text-gray-500">{item.label}</div>
                  <div className="flex-1 text-sm font-semibold text-gray-900">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Student Attendance */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <i className="ri-group-line text-lg"></i>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Student Attendance</div>
                  <div className="text-xs text-gray-500">{session.students} Students attended this session</div>
                </div>
              </div>
              <hr className="border-gray-50" />
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Session Materials</div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-file-pdf-2-line text-red-500 text-2xl"></i>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Syllabus_Overview.pdf</div>
                    <div className="text-xs text-gray-400">1.2 MB</div>
                  </div>
                  <i className="ri-download-2-line text-gray-400 hover:text-gray-900"></i>
                </div>
              </div>
            </div>

            {/* Educator Info */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Primary Educator</div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-gray-200 bg-gray-50 text-gray-400 flex items-center justify-center text-xl shadow-sm">
                  <i className="ri-user-smile-line"></i>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{session.educator}</h3>
                  <div className="text-xs text-gray-500 mt-0.5">Professor of Advanced Writing • 4.9 ★</div>
                </div>
              </div>

              <button className="mt-6 w-full py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === "Assignments" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 cursor-pointer hover:border-blue-200 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <i className="ri-file-text-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Advanced Writing Report</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-3">
                    <i className="ri-calendar-line"></i> Due: Jan 10, 2026, 11:59 PM
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">PDF ONLY</span>
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">15MB MAX</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 cursor-pointer hover:border-blue-200 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <i className="ri-file-search-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Literature Review Draft</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-3">
                    <i className="ri-calendar-line"></i> Due: Jan 15, 2026, 11:59 PM
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">DOCX ONLY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Activity Logs" && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">

              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></div>
                <div className="text-sm font-bold text-gray-900">Session Started</div>
                <div className="text-xs text-gray-500 mt-1">Today, 09:00 AM</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white"></div>
                <div className="text-sm font-bold text-gray-900">Educator Assigned: {session.educator}</div>
                <div className="text-xs text-gray-500 mt-1">Yesterday, 10:24 AM</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white"></div>
                <div className="text-sm font-bold text-gray-900">Session Created</div>
                <div className="text-xs text-gray-500 mt-1">Dec 01, 2025, 14:10 PM</div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
