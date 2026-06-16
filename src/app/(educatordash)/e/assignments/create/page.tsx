"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, Check, Lock, Upload, ChevronDown, Loader2 } from "lucide-react";
import { authApi } from "@/lib/axios";
import { EducatorAPI } from "@/lib/api";

type SessionOption = {
  value: string;
  label: string;
  sessionId: string;
  sessionCode: string;
  sessionType: string;
  studentsCount: number;
};

function CreateAssignmentContent() {
  const searchParams = useSearchParams();
  const preselectedSessionId = searchParams?.get("sessionId") || "";
  const hideFiles = searchParams?.get("hideFiles") === "true";

  const [step, setStep] = useState(1);
  const [sessions, setSessions] = useState<SessionOption[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    sessionId: preselectedSessionId,
    title: "",
    description: "",
    startDate: "",
    deadline: "",
    deadlineTime: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoadingSessions(true);
        const response = await authApi.get("/api/educator/assignments/session-options", {
          params: { onlyAssignable: true },
        });
        const raw = response?.data?.data || response?.data || response;
        const options = raw?.options || raw?.list || raw?.sessions || [];
        const mapped: SessionOption[] = (Array.isArray(options) ? options : []).map((s: any) => ({
          value: s.value || s.id || s.sessionId,
          label: s.label || s.title || "Session",
          sessionId: s.sessionId || s.id || s.value,
          sessionCode: s.sessionCode || "",
          sessionType: s.sessionType || "webinar",
          studentsCount: s.studentsCount || 0,
        }));
        setSessions(mapped);
      } catch {
        setSessions([]);
      } finally {
        setLoadingSessions(false);
      }
    };
    fetchSessions();
  }, []);

  const selectedSession = sessions.find(s => s.sessionId === formData.sessionId);

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);
    try {
      if (!formData.sessionId) throw new Error("Please select a session");
      if (!formData.title.trim()) throw new Error("Assignment title is required");
      if (!formData.deadline) throw new Error("Deadline is required");

      const payload = new FormData();
      payload.append("title", formData.title.trim());
      payload.append("description", formData.description.trim());
      payload.append("sessionType", selectedSession?.sessionType || "webinar");
      payload.append("dueDate", formData.deadline);
      payload.append("sessionId", formData.sessionId);
      const assignedStudents: string[] = [];
      payload.append("assignedStudents", JSON.stringify(assignedStudents));
      if (formData.startDate) payload.append("startDate", formData.startDate);
      if (formData.deadlineTime) payload.append("deadlineTime", formData.deadlineTime);
      if (selectedFile) payload.append("file", selectedFile);

      await EducatorAPI.createAssignment(payload);
      window.location.href = "/e/assignments";
    } catch (err: any) {
      setError(err?.message || "Failed to create assignment");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepper = () => (
    <div className="w-full md:w-64 shrink-0 space-y-2">
      <button onClick={() => setStep(1)} className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${step === 1 ? 'bg-gray-100/80' : 'hover:bg-gray-50'}`}>
        {step > 1 ? (
          <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <Check className="w-3.5 h-3.5" />
          </div>
        ) : (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step === 1 ? 'bg-green-50 text-green-600' : 'text-gray-400'}`}>
             {step === 1 ? <Check className="w-3.5 h-3.5" /> : "1"}
          </div>
        )}
        <span className={`text-[15px] ${step >= 1 ? 'text-gray-900 font-semibold' : 'text-gray-500 font-medium'}`}>Assignment Basics</span>
      </button>

      <button onClick={() => setStep(2)} className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${step === 2 ? 'bg-gray-100/80' : 'hover:bg-gray-50'}`}>
        {step > 2 ? (
          <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <Check className="w-3.5 h-3.5" />
          </div>
        ) : (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold ${step === 2 ? 'bg-gray-200 text-gray-900' : 'bg-transparent text-gray-400'}`}>
            2
          </div>
        )}
        <span className={`text-[15px] ${step >= 2 ? 'text-gray-900 font-semibold' : 'text-gray-500 font-medium'}`}>Submission Rules</span>
      </button>

      <button onClick={() => setStep(3)} className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${step === 3 ? 'bg-gray-100/80' : 'hover:bg-gray-50'}`}>
        {step === 3 ? (
           <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 text-[13px] font-bold">
            3
           </div>
        ) : (
           <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-50 text-gray-400">
             <Lock className="w-3.5 h-3.5" />
           </div>
        )}
        <span className={`text-[15px] ${step === 3 ? 'text-gray-900 font-semibold' : 'text-gray-400 font-medium'}`}>Review & Confirm</span>
      </button>
    </div>
  );

  const renderStep1 = () => (
    <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700">Select Session *</label>
          <div className="relative">
            {loadingSessions ? (
              <div className="w-full flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                <span className="text-gray-400">Loading sessions...</span>
              </div>
            ) : (
              <>
                  <select
                    value={formData.sessionId}
                    onChange={e => setFormData(prev => ({ ...prev, sessionId: e.target.value }))}
                  className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Select Session</option>
                  {sessions.map(s => (
                    <option key={s.sessionId} value={s.sessionId}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700">Assignment Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="E.g., Research Proposal Draft"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          />
        </div>
      </div>


      <div className="space-y-2">
        <label className="text-[13px] font-semibold text-gray-700">Description *</label>
        <textarea
          rows={5}
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter assignment instructions and guidelines..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 resize-none"
        />
      </div>

      {!hideFiles && (
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700">Attachments</label>
          <label className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer bg-gray-50/50">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3 shadow-sm">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">{selectedFile ? selectedFile.name : "Upload Files"}</p>
            <p className="text-[13px] text-gray-500">Drag and drop or browse to upload files</p>
            <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
          </label>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-10">

      <div className="space-y-5">
        <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase">SCHEDULE</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Start Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="date"
                value={formData.startDate}
                onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Dead Line <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="date"
                value={formData.deadline}
                onChange={e => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Deadline Time <span className="text-red-500">*</span></label>
            <input
              type="time"
              value={formData.deadlineTime}
              onChange={e => setFormData(prev => ({ ...prev, deadlineTime: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-[20px] font-bold text-gray-900">Review & Confirm</h2>
        <p className="text-sm text-gray-500 mt-1">Review all details before creating the assignment.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm">
        <div className="px-8 py-5 bg-gray-50/30 border-b border-gray-200">
          <h3 className="text-[15px] font-bold text-gray-900">Assignment Summary</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Session</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">{selectedSession?.label || formData.sessionId}</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Title</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">{formData.title || "-"}</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Description</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium leading-relaxed">{formData.description || "-"}</div>
          </div>
          {!hideFiles && (
            <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
              <div className="w-1/3 text-[13px] text-gray-500">Uploaded Resources</div>
              <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">{selectedFile ? "1 Attachment" : "None"}</div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm">
        <div className="px-8 py-5 bg-gray-50/30 border-b border-gray-200">
          <h3 className="text-[15px] font-bold text-gray-900">Submission Rules</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Start Date</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">{formData.startDate || "-"}</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">End Date</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">{formData.deadline || "-"}</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Deadline</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">{formData.deadlineTime || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#FAFAFA] min-h-screen relative pb-32">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
        <Link href="/e/assignments" className="w-10 h-10 flex items-center justify-center border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Create Assignment</h1>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10 lg:gap-14">
        {renderStepper()}

        <div className="flex-1 max-w-4xl">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-[#FAFAFA] p-6 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className={`flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl bg-white text-sm font-medium transition-colors shadow-sm ${step === 1 ? 'text-gray-300 cursor-not-allowed opacity-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            disabled={step === 1}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-3">
            {step < 3 ? (
              <>
                <Link href="/e/assignments" className="px-6 py-3 border border-gray-200 bg-white rounded-xl text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-colors">
                  Cancel
                </Link>
                <button
                  onClick={() => setStep(prev => Math.min(3, prev + 1))}
                  className="px-8 py-3 bg-[#0A0A0A] hover:bg-black text-white rounded-xl text-[13px] font-medium shadow-sm transition-colors"
                >
                  Next
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-3 bg-[#0A0A0A] hover:bg-black text-white rounded-xl text-[13px] font-medium shadow-sm transition-colors tracking-wide flex items-center gap-2 disabled:opacity-60"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? "Creating..." : "Create Assignment"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateAssignmentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      <CreateAssignmentContent />
    </Suspense>
  );
}
