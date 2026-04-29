import React, { useState, useEffect } from 'react';
import { X, FileText, Paperclip, Calendar, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { Session } from '../types';
import { EducatorAPI } from '@/lib/api';

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

  useEffect(() => {
    if (isOpen) {
      setActiveTab('Session Info');
      setShowReschedule(false);
      setRescheduleSuccess(false);
      setRescheduleError("");
      setRescheduleDate('');
      setRescheduleTime('');
      setRescheduleReason('');
    }
  }, [isOpen]);

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

  if (!isOpen || !session) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[100]" onClick={onClose} />
      <div className={`fixed inset-y-0 right-0 z-[101] w-full max-w-[480px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {session.id} - {session.type}
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
            <div className="space-y-3">
              {(session as any).assignments && (session as any).assignments.length > 0 ? (session as any).assignments.map((assignment: any, i: number) => (
                <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-white hover:border-gray-200 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 text-gray-500">
                    <FileText size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                    <p className="text-xs text-gray-500">
                      Due {assignment.due || assignment.dueDate} <span className="mx-1">•</span> Status : {assignment.status || 'Needs Assessment'}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="text-sm text-gray-500 text-center py-4">No assignments yet.</div>
              )}
            </div>
          )}

          {activeTab === 'Files' && (
            <div className="space-y-3">
              {(session as any).resources && (session as any).resources.length > 0 ? (session as any).resources.map((file: any, i: number) => (
                <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-white hover:border-gray-200 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 text-gray-500">
                    <Paperclip size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{file.name || file.title}</h3>
                    <p className="text-xs text-gray-500">
                      {file.size || 'PDF'} <span className="mx-1">•</span> Uploaded {file.date || 'Recently'}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="text-sm text-gray-500 text-center py-4">No files uploaded yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
