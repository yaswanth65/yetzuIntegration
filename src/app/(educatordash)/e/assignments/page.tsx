"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, X, Loader2 } from 'lucide-react';
import AssignmentList from './components/AssignmentList';
import { EducatorAPI, EducatorChatAPI, asArray } from '@/lib/api';
import { Assignment, SessionType } from './types';

interface Student {
  id: string;
  name: string;
}

interface Session {
  id: string;
  title: string;
}

export default function EducatorAssignmentsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await EducatorAPI.getAssignments();
        const apiAssignments = asArray(response).map((item: any, index: number) => ({
          id: item.id || item._id || item.assignmentId || String(index),
          assignmentId: item.assignmentId || item.id || item._id || `ASSIGN-${index + 1}`,
          sessionTitle: item.sessionTitle || item.courseTitle || item.title || "Assignment",
          studentName: item.studentName || item.student?.name || item.assignedToName || "Student",
          sessionType: item.sessionType || item.type || "Webinar",
          dueDate: item.dueDate || item.deadline || "TBD",
          status: item.status === "reviewed" || item.status === "Review Done" ? "Review Done" : item.status === "submitted" || item.status === "Submitted" ? "Submitted" : "Pending",
          submissionDate: item.submissionDate || item.submittedAt || "-",
          hasDownload: Boolean(item.hasDownload || item.fileUrl || item.documentUrl),
        }));
        if (apiAssignments.length > 0) {
          setAssignments(apiAssignments as Assignment[]);
        } else {
          setAssignments([]);
        }
      } catch {
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      if (activeTab === 'Pending' && assignment.status !== 'Pending') return false;
      if (activeTab === 'Completed' && assignment.status !== 'Review Done' && assignment.status !== 'Submitted') {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        if (
          !assignment.assignmentId.toLowerCase().includes(query) &&
          !assignment.sessionTitle.toLowerCase().includes(query) &&
          !assignment.studentName.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [activeTab, searchQuery, assignments]);

  const allCount = assignments.length;
  const pendingCount = assignments.filter(a => a.status === 'Pending').length;
  const completedCount = assignments.filter(a => a.status !== 'Pending').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-8 font-sans">
      <div className="max-w-[1550px] mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Assignments</h1>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-200 pb-0 lg:pb-0">
          <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar pt-2">
            <button
              onClick={() => setActiveTab('All')}
              className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 whitespace-nowrap ${activeTab === 'All'
                  ? 'text-blue-600 border-b-2 border-blue-600 z-10'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                }`}
            >
              All
              <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === 'All' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                }`}>
                {allCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('Pending')}
              className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 whitespace-nowrap ${activeTab === 'Pending'
                  ? 'text-blue-600 border-b-2 border-blue-600 z-10'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                }`}
            >
              Pending
              <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === 'Pending' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                }`}>
                {pendingCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('Completed')}
              className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 whitespace-nowrap ${activeTab === 'Completed'
                  ? 'text-blue-600 border-b-2 border-blue-600 z-10'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                }`}
            >
              Completed
              <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === 'Completed' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                }`}>
                {completedCount}
              </span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4 lg:mb-0">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[42px] pl-10 pr-4 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              />
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 bg-[#000520] hover:bg-gray-900 text-white px-5 h-[42px] rounded-[12px] text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus size={18} />
              New Assignment
            </button>
          </div>
        </div>

        <AssignmentList assignments={filteredAssignments} loading={loading} />
      </div>

      {showModal && (
        <CreateAssignmentModal 
          onClose={() => setShowModal(false)} 
          onSuccess={(newAssignment) => {
            setAssignments(prev => [newAssignment, ...prev]);
            setShowModal(false);
          }} 
        />
      )}
    </div>
  );
}

function CreateAssignmentModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (assignment: Assignment) => void }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    sessionId: '',
    studentId: '',
    sessionType: 'Webinar',
    dueDate: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [studentsRes, sessionsRes] = await Promise.all([
          EducatorChatAPI.getStudents(),
          EducatorAPI.getSessions()
        ]);

        const studentsData = asArray(studentsRes).map((item: any) => ({
          id: item.id || item._id || item.userId || item.studentId,
          name: item.name || item.Name || item.studentName || "Student"
        }));

        const sessionsData = asArray(sessionsRes).map((item: any) => ({
          id: item.id || item._id || item.sessionId,
          title: item.title || item.sessionTitle || item.courseTitle || "Session"
        }));

        setStudents(studentsData);
        setSessions(sessionsData);
      } catch {
        setStudents([]);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const selectedStudent = students.find(s => s.id === formData.studentId);
      const selectedSession = sessions.find(s => s.id === formData.sessionId);

      const payload = new FormData();
      payload.append('title', selectedSession?.title || 'Assignment');
      payload.append('description', `${formData.sessionType} assignment`);
      payload.append('sessionType', formData.sessionType);
      payload.append('dueDate', formData.dueDate);
      payload.append('sessionId', formData.sessionId);
      payload.append('assignedStudents', JSON.stringify([formData.studentId]));

      await EducatorAPI.createAssignment(payload);

      const newAssignment: Assignment = {
        id: `ASSIGN-${Date.now()}`,
        assignmentId: `ASSIGN-${Date.now()}`,
        sessionTitle: selectedSession?.title || "Assignment",
        studentName: selectedStudent?.name || "Student",
        sessionType: formData.sessionType as SessionType,
        dueDate: formData.dueDate || 'TBD',
        status: 'Pending',
        submissionDate: '-',
        hasDownload: false
      };
      onSuccess(newAssignment);
    } catch (err: any) {
      setError(err.message || 'Failed to create assignment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            <span className="text-sm text-gray-500 mt-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Create New Assignment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Student *</label>
            <select
              required
              value={formData.studentId}
              onChange={e => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
            {students.length === 0 && (
              <p className="text-xs text-gray-400 mt-1">No students available</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Session *</label>
            <select
              required
              value={formData.sessionId}
              onChange={e => setFormData(prev => ({ ...prev, sessionId: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a session</option>
              {sessions.map(session => (
                <option key={session.id} value={session.id}>{session.title}</option>
              ))}
            </select>
            {sessions.length === 0 && (
              <p className="text-xs text-gray-400 mt-1">No sessions available</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
            <select
              value={formData.sessionType}
              onChange={e => setFormData(prev => ({ ...prev, sessionType: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Webinar">Webinar</option>
              <option value="Cohort">Cohort</option>
              <option value="Workshop">Workshop</option>
              <option value="Mentorship">Mentorship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !formData.studentId || !formData.sessionId || !formData.dueDate}
              className="flex-1 px-4 py-2 bg-[#000520] text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? 'Creating...' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
