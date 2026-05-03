import React, { useState, useEffect } from 'react';
import { X, FileText, Paperclip, Calendar, Clock, Loader2, CheckCircle2, Plus, Send, File, Download, Trash2 } from 'lucide-react';
import { Session } from '../types';
import { EducatorAPI, asArray } from '@/lib/api';
import { shortenId } from '@/lib/utils/shortenId';
import { toast } from 'react-hot-toast';

interface SessionDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
}

export default function SessionDetailsDrawer({ isOpen, onClose, session }: SessionDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'Session Info' | 'Assignments' | 'Files'>('Session Info');
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);
  const [rescheduleError, setRescheduleError] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [assignmentCreating, setAssignmentCreating] = useState(false);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [assignmentDetails, setAssignmentDetails] = useState<any[]>([]);
  const [loadingAssignments, setLoadingAssignments] = useState(false);

  const getDownloadUrl = (url?: string, path?: string) => {
    const raw = url || path;
    if (!raw) return '';
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://rvleyzlrzxdkgfyqrvzy.supabase.co/storage/v1/object/public/${String(raw).replace(/^\/+/, '')}`;
  };

  const normalizeAssignmentsForSession = (items: any[]) => {
    const sessionId = String(session?.id || '');
    if (!sessionId) return [];

    return items
      .map((assignment: any) => {
        const id = String(assignment?.id || assignment?._id || assignment?.assignmentId || '');
        if (!id) return null;

        const linkedSessionId = String(
          assignment?.courseId || assignment?.sessionId || assignment?.course?._id || assignment?.course?.id || '',
        );

        const matchesSession = linkedSessionId === sessionId;

        return matchesSession
          ? {
              ...assignment,
              id,
              title: assignment?.title || assignment?.assignmentTitle || 'Assignment',
              dueDate: assignment?.dueDate || assignment?.deadline || assignment?.due || '',
              status: assignment?.status || 'Needs Assessment',
              documentUrl: assignment?.documentUrl || assignment?.fileUrl || assignment?.url,
              documentPath: assignment?.documentPath || assignment?.path,
            }
          : null;
      })
      .filter(Boolean);
  };

  useEffect(() => {
    if (isOpen) {
      setActiveTab('Session Info');
      setShowReschedule(false);
      setRescheduleSuccess(false);
      setRescheduleError("");
      setRescheduleDate('');
      setRescheduleTime('');
      setRescheduleReason('');
      setShowCreateAssignment(false);
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentDueDate('');
      setAssignmentFile(null);
      setAssignmentCreating(false);
      setAssignmentDetails([]);
      setLoadingAssignments(false);
    }
  }, [isOpen]);

  const refreshAssignments = async () => {
    if (!session?.id) return;

    setLoadingAssignments(true);
    try {
      // Source of truth: POST /api/educator/assignments/list (Postman)
      const response: any = await EducatorAPI.getAssignments();
      const list = asArray(response?.data || response);
      setAssignmentDetails(normalizeAssignmentsForSession(list));
    } catch (err: any) {
      console.error('Failed to fetch assignment details', err);
      setAssignmentDetails([]);
    } finally {
      setLoadingAssignments(false);
    }
  };

  // Fetch assignment details when Assignments tab is clicked
  useEffect(() => {
    if (activeTab === 'Assignments' && session?.id) {
      refreshAssignments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, session?.id]);

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (!assignmentId) return;
    try {
      await EducatorAPI.deleteAssignment(assignmentId);
      toast.success('Assignment deleted.');
      await refreshAssignments();
    } catch (err: any) {
      console.error('Failed to delete assignment', err);
      toast.error(err?.message || 'Failed to delete assignment.');
    }
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRescheduleError("");

    if (!session?.id) {
      setRescheduleError("This session is missing an ID, so the reschedule request cannot be submitted.");
      return;
    }

    if (!rescheduleDate || !rescheduleTime || !rescheduleReason.trim()) {
      setRescheduleError("Date, time, and reason are required.");
      return;
    }

    const proposedDateTime = new Date(`${rescheduleDate}T${rescheduleTime}`);
    if (Number.isNaN(proposedDateTime.getTime())) {
      setRescheduleError("Please choose a valid date and time.");
      return;
    }

    if (proposedDateTime.getTime() <= Date.now()) {
      setRescheduleError("Please choose a future date and time for the reschedule request.");
      return;
    }

    setRescheduleLoading(true);
    try {
      await EducatorAPI.rescheduleSession({
        sessionId: session.id,
        proposedDate: rescheduleDate,
        proposedTime: rescheduleTime,
        reason: rescheduleReason.trim()
      });
      setRescheduleSuccess(true);
      setTimeout(() => {
        setShowReschedule(false);
        setRescheduleSuccess(false);
        setRescheduleDate('');
        setRescheduleTime('');
        setRescheduleReason('');
        setRescheduleError("");
      }, 2000);
    } catch (error: any) {
      console.error("Educator reschedule request failed", error);
      setRescheduleError(error?.message || "Failed to submit reschedule request.");
    } finally {
      setRescheduleLoading(false);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.id) {
      toast.error("Session ID is missing.");
      return;
    }
    if (!assignmentTitle.trim() || !assignmentDescription.trim() || !assignmentDueDate) {
      toast.error("Title, description, and due date are required.");
      return;
    }

    setAssignmentCreating(true);
    try {
      const formData = new FormData();
      formData.append('title', assignmentTitle.trim());
      formData.append('description', assignmentDescription.trim());
      formData.append('dueDate', assignmentDueDate);
      formData.append('sessionId', session.id);
      formData.append('sessionType', session.type);
      if (assignmentFile) {
        formData.append('file', assignmentFile);
      }

      await EducatorAPI.createAssignment(formData);
      toast.success("Assignment created successfully.");
      setShowCreateAssignment(false);
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentDueDate('');
      setAssignmentFile(null);
      await refreshAssignments();
    } catch (error: any) {
      console.error("Failed to create assignment", error);
      toast.error(error?.message || "Failed to create assignment.");
    } finally {
      setAssignmentCreating(false);
    }
  };

  const handleFileUpload = async () => {
    if (!session?.id) {
      toast.error("Session ID is missing.");
      return;
    }
    if (!uploadTitle.trim() || !uploadFile) {
      toast.error("Title and file are required.");
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', uploadTitle.trim());
      formData.append('file', uploadFile);
      
      await EducatorAPI.uploadSessionResource(session.id, formData);
      toast.success("File uploaded successfully.");
      setShowUploadFile(false);
      setUploadTitle('');
      setUploadFile(null);
      // Refresh session data (you might want to call a refresh function here)
    } catch (error: any) {
      console.error("Failed to upload file", error);
      toast.error(error?.message || "Failed to upload file.");
    } finally {
      setUploadLoading(false);
    }
  };

  if (!isOpen || !session) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[100]" onClick={onClose} />
      <div className={`fixed inset-y-0 right-0 z-[101] w-full max-w-[480px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {shortenId(session.id)} - {session.type}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full">
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 pr-8">{session.title}</h2>
          
          <div className="flex items-center gap-6 mt-6">
            {['Session Info', 'Assignments', 'Files'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors relative top-[1px] ${
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === 'Session Info' && (
            <div className="space-y-1">
              <div className="flex justify-between items-center py-3 border-b border-gray-50 gap-4">
                <span className="text-sm text-gray-500">Status</span>
                <div className="flex items-center gap-2">
                  {session.status === 'Live' && <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>}
                  {session.status === 'Scheduled' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                  {session.status === 'Completed' && <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>}
                  {session.status === 'Missed' && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                  <span className={`text-sm font-medium ${
                    session.status === 'Live' ? 'text-green-600' :
                    session.status === 'Scheduled' ? 'text-blue-600' :
                    session.status === 'Completed' ? 'text-gray-600' : 'text-red-600'
                  }`}>
                    {session.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50 gap-4">
                <span className="text-sm text-gray-500">Students</span>
                <span className="text-sm font-medium text-gray-900">{session.attendees} Attendees</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50 gap-4">
                <span className="text-sm text-gray-500">Date</span>
                <span className="text-sm font-medium text-gray-900">{session.date}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50 gap-4">
                <span className="text-sm text-gray-500">Time</span>
                <span className="text-sm font-medium text-gray-900">{session.startTime} - {session.endTime}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50 gap-4">
                <span className="text-sm text-gray-500 whitespace-nowrap">Type</span>
                <span className="text-sm font-medium text-gray-900">{session.type}</span>
              </div>

              {session.status === 'Scheduled' && (
                <button
                  onClick={() => setShowReschedule(true)}
                  className="w-full mt-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar size={16} />
                  Request Reschedule
                </button>
              )}

              {showReschedule && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  {rescheduleSuccess ? (
                    <div className="flex items-center justify-center gap-2 py-4 text-green-600">
                      <CheckCircle2 size={20} />
                      <span className="font-medium">Reschedule request submitted!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleRescheduleSubmit} className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Request Reschedule</h4>
                      {rescheduleError ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                          {rescheduleError}
                        </div>
                      ) : null}
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">New Date</label>
                        <input
                          type="date"
                          required
                          value={rescheduleDate}
                          onChange={(e) => {
                            setRescheduleDate(e.target.value);
                            if (rescheduleError) setRescheduleError("");
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">New Time</label>
                        <input
                          type="time"
                          required
                          value={rescheduleTime}
                          onChange={(e) => {
                            setRescheduleTime(e.target.value);
                            if (rescheduleError) setRescheduleError("");
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Reason</label>
                          <textarea
                            required
                            value={rescheduleReason}
                            onChange={(e) => {
                              setRescheduleReason(e.target.value);
                              if (rescheduleError) setRescheduleError("");
                            }}
                            placeholder="Please provide a reason for reschedule..."
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none h-20"
                          />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowReschedule(false)}
                          className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={rescheduleLoading}
                          className="flex-1 py-2 bg-[#111827] text-white rounded-lg text-sm font-medium hover:bg-gray-900 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {rescheduleLoading && <Loader2 size={14} className="animate-spin" />}
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'Assignments' && (
            <div className="space-y-4">
              {!showCreateAssignment && (
                <button
                  onClick={() => setShowCreateAssignment(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#111827] text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  <Plus size={16} />
                  Create Assignment
                </button>
              )}

              {showCreateAssignment && (
                <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 text-sm">New Assignment</h4>
                    <button onClick={() => setShowCreateAssignment(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={16} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      placeholder="Assignment title"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Description</label>
                    <textarea
                      required
                      value={assignmentDescription}
                      onChange={(e) => setAssignmentDescription(e.target.value)}
                      placeholder="Instructions for students"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none h-16"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Due Date</label>
                    <input
                      type="date"
                      required
                      value={assignmentDueDate}
                      onChange={(e) => setAssignmentDueDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Attachment (optional)</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setAssignmentFile(e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowCreateAssignment(false)}
                      className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateAssignment}
                      disabled={assignmentCreating || !assignmentTitle.trim() || !assignmentDescription.trim() || !assignmentDueDate}
                      className="flex-1 py-2 bg-[#111827] text-white rounded-lg text-sm font-medium hover:bg-gray-900 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {assignmentCreating && <Loader2 size={14} className="animate-spin" />}
                      {assignmentCreating ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </div>
              )}

              {loadingAssignments ? (
                <div className="flex justify-center py-4">
                  <Loader2 size={20} className="animate-spin text-gray-400" />
                </div>
              ) : assignmentDetails && assignmentDetails.length > 0 ? (
                assignmentDetails.map((assignment: any, i: number) => (
                  <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-white hover:border-gray-200 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 text-gray-500">
                      <FileText size={20} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                      <p className="text-xs text-gray-500">
                        Due {assignment.dueDate || assignment.due} <span className="mx-1">•</span> Status : {assignment.status || 'Needs Assessment'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {(assignment.documentUrl || assignment.documentPath) ? (
                        <a
                          href={getDownloadUrl(assignment.documentUrl, assignment.documentPath)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-3 py-2 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Download size={14} />
                          Download
                        </a>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => handleDeleteAssignment(String(assignment.id))}
                        className="flex items-center gap-1 px-3 py-2 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : !showCreateAssignment && (
                <div className="text-sm text-gray-500 text-center py-4">No assignments yet. Create one above.</div>
              )}
            </div>
          )}

          {activeTab === 'Files' && (
            <div className="space-y-3">
              {!showUploadFile && (
                <button
                  onClick={() => setShowUploadFile(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#111827] text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  <Plus size={16} />
                  Upload File
                </button>
              )}

              {showUploadFile && (
                <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 text-sm">Upload New File</h4>
                    <button onClick={() => setShowUploadFile(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={16} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="File title"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">File</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowUploadFile(false)}
                      className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleFileUpload}
                      disabled={uploadLoading || !uploadTitle.trim() || !uploadFile}
                      className="flex-1 py-2 bg-[#111827] text-white rounded-lg text-sm font-medium hover:bg-gray-900 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {uploadLoading && <Loader2 size={14} className="animate-spin" />}
                      {uploadLoading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                </div>
              )}

              {(session as any).resources && (session as any).resources.length > 0 ? (session as any).resources.map((file: any, i: number) => (
                <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-white hover:border-gray-200 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 text-gray-500">
                    <Paperclip size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{file.name || file.title}</h3>
                    <p className="text-xs text-gray-500">
                      {file.size || 'PDF'} <span className="mx-1">•</span> Uploaded {file.date || 'Recently'}
                    </p>
                  </div>
                  {file.url ? (
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-2 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Download size={14} />
                      Download
                    </a>
                  ) : file.path ? (
                    <a
                      href={`https://rvleyzlrzxdkgfyqrvzy.supabase.co/storage/v1/object/public/${file.path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-2 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Download size={14} />
                      Download
                    </a>
                  ) : null}
                </div>
              )) : !showUploadFile && (
                <div className="text-sm text-gray-500 text-center py-4">No files uploaded yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
