import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [loadingMeeting, setLoadingMeeting] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [sessionData, setSessionData] = useState<Session | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loadingAssignments, setLoadingAssignments] = useState(false);

  const currentSession = sessionData || session;

  const getEducatorName = (educator: any): string => {
    if (!educator) return "Educator";
    if (typeof educator === 'string') return educator;
    if (typeof educator === 'object') {
      return educator.name || educator.full_name || educator.displayName || String(educator.id || "Educator");
    }
    return "Educator";
  };

  useEffect(() => {
    if (session) {
      setSessionData(session);
      setEditData({
        title: session.title,
        status: session.status,
        type: session.type,
        date: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
      });
      // Fetch fresh session details
      if (session.id) {
        fetchSessionDetails(session.id);
      }
    }
  }, [session]);

  const fetchSessionDetails = async (sessionId: string) => {
    setLoadingMeeting(true);
    try {
      const response = await AdminAPI.getSession(sessionId);
      const data = response?.data || response;
      setSessionData(data);
      setEditData({
        title: data?.title || session?.title,
        status: data?.status || session?.status,
        type: data?.type || session?.type,
        date: data?.date || session?.date,
        startTime: data?.startTime || session?.startTime,
        endTime: data?.endTime || session?.endTime,
      });
      setMeetingLink(data?.sessionLink || data?.webinerLink || data?.meetingLink || "");
      
      // Fetch assignments for this session
      if (data?.id) {
        fetchAssignments(data.id);
      }
    } catch (error) {
      console.error("Failed to fetch session details:", error);
    } finally {
      setLoadingMeeting(false);
    }
  };

  const fetchAssignments = async (sessionId: string) => {
    setLoadingAssignments(true);
    try {
      // Try to get assignments for this session
      const response = await AdminAPI.getSession(sessionId);
      const data = response?.data || response || {};
      const sessionAssignments = data?.assignments || data?.assignmentList || [];
      setAssignments(Array.isArray(sessionAssignments) ? sessionAssignments : []);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    } finally {
      setLoadingAssignments(false);
    }
  };

  const handleSave = async () => {
    if (!currentSession) return;
    setIsSaving(true);
    try {
      await AdminAPI.updateSession(currentSession.id, editData);
      toast.success("Session updated successfully");
      setIsEditing(false);
      // Refresh session data
      await fetchSessionDetails(currentSession.id);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to update session:", error);
      toast.error("Failed to update session");
    } finally {
      setIsSaving(false);
    }
  };
  
  const tabs: TabName[] = ["Overview", "Assignments", "Files", "Notes", "Activity Logs"];

  if (!currentSession) return null;

  return (
    <div className="bg-white h-screen flex flex-col border-l border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>

        <div className="text-xs font-semibold text-gray-500 mb-2">Session: {currentSession.sessionCode || currentSession.id}</div>
        <div className="flex items-center justify-between pr-8">
          {isEditing ? (
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="text-xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none w-full"
            />
          ) : (
            <h2 className="text-xl font-bold text-gray-900">{currentSession.title || "Untitled Session"}</h2>
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
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {activeTab === "Overview" && (
          <div className="space-y-6">
            {/* Session Details */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1 divide-y divide-gray-50">
              {[
                {
                  label: "Session Code",
                  value: currentSession.sessionCode || currentSession.id
                },
                {
                  label: "Status",
                  value: isEditing ? (
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      className="border rounded px-2 py-1 text-sm w-full"
                    >
                      <option value="draft">Draft</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Live">Live</option>
                      <option value="Completed">Completed</option>
                      <option value="Missed">Missed</option>
                    </select>
                  ) : (
                    <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${currentSession.status === "Live" ? "bg-green-100 text-green-700" : currentSession.status === "draft" ? "bg-gray-100 text-gray-600" : "bg-blue-100 text-blue-600"}`}>{currentSession.status}</span>
                  )
                },
                {
                  label: "Date",
                  value: isEditing ? (
                    <input
                      type="date"
                      value={typeof editData.date === 'string' && editData.date ? editData.date.split('T')[0] : editData.date}
                      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      className="border rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    currentSession.date || "TBD"
                  )
                },
                {
                  label: "Time",
                  value: `${currentSession.startTime || "N/A"} - ${currentSession.endTime || "N/A"}`
                },
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
                    currentSession.type
                  )
                },
                { label: "Delivery Method", value: currentSession.mode || "Online" },
                {
                  label: "Meeting Link",
                  value: loadingMeeting ? "Loading..." : meetingLink ? (
                    <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                      {meetingLink} <i className="ri-external-link-line text-xs"></i>
                    </a>
                  ) : currentSession.status === "draft" ? (
                    <span className="text-gray-400 text-sm">Session must be published to generate link</span>
                  ) : (
                    <span className="text-gray-400 text-sm">No meeting link available</span>
                  )
                },
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
                  <div className="text-sm font-bold text-gray-900">Student Enrollment</div>
                  <div className="text-xs text-gray-500">{currentSession.students} Students enrolled in this session</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Assignments" && (
          <div className="space-y-4">
            {loadingAssignments ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500">Loading assignments...</p>
              </div>
            ) : assignments.length > 0 ? (
              assignments.map((assignment, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <i className="ri-file-text-line text-lg"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">{assignment.title || "Untitled Assignment"}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-3">
                        <i className="ri-calendar-line"></i> Due: {assignment.dueDate || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm text-gray-500">No assignments created yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "Files" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm text-gray-500">
                File upload for admin sessions is handled via the assignment system. 
                Use the Assignments tab to create and manage session assignments.
              </p>
            </div>
          </div>
        )}

        {activeTab === "Notes" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm text-gray-500">No notes added yet</p>
            </div>
          </div>
        )}

        {activeTab === "Activity Logs" && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-sm text-gray-500">Activity logs will be loaded from the API</p>
          </div>
        )}

        {/* Educator Info - Real Data */}
        {currentSession.educator && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Primary Educator</div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gray-200 bg-gray-50 text-gray-400 flex items-center justify-center text-xl shadow-sm">
                <i className="ri-user-smile-line"></i>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{getEducatorName(currentSession.educator)}</h3>
                <div className="text-xs text-gray-500 mt-0.5">Educator</div>
              </div>
            </div>

            <button 
              onClick={() => router.push("/a/users")}
              className="mt-6 w-full py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
