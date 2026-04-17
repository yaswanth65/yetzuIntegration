import React, { useState } from "react";

export type Assignment = {
  id: string;
  title: string;
  type: string;
  description: string;
  dueDate: string;
  reviewDeadline: string;
  maxFileSize: number;
  maxAttempts: number;
  plagiarismCheck: boolean;
  grading: string;
  certificateRequired: boolean;
};

export default function AssignmentStep() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const handleAddAssignment = () => {
    setAssignments([
      ...assignments,
      {
        id: Date.now().toString(),
        title: "",
        type: "File Submission",
        description: "",
        dueDate: "",
        reviewDeadline: "",
        maxFileSize: 10,
        maxAttempts: 3,
        plagiarismCheck: false,
        grading: "Marks",
        certificateRequired: false,
      },
    ]);
  };

  const removeAssignment = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: any) => {
    setAssignments(
      assignments.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Assignments</h2>
          <p className="text-sm text-gray-500">
            Create assignments for this session.
          </p>
        </div>
        <button
          onClick={handleAddAssignment}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <i className="ri-add-line"></i> Add Assignment
        </button>
      </div>

      {assignments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-gray-200 rounded-xl bg-gray-50/30 min-h-[350px]">
          <p className="text-sm text-gray-500 font-medium text-center leading-relaxed">
            No assignments added yet.<br />
            Click 'Add Assignment' to create one.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {assignments.map((assignment, index) => (
            <div
              key={assignment.id}
              className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">
                  Assignment {index + 1}
                </h3>
                <div className="flex items-center gap-3 text-gray-400">
                  <button
                    onClick={() => removeAssignment(assignment.id)}
                    className="hover:text-red-500 transition-colors h-6 w-6 flex items-center justify-center"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                  <button className="hover:text-gray-600 transition-colors h-6 w-6 flex items-center justify-center">
                    <i className="ri-arrow-up-s-line text-lg"></i>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    value={assignment.title}
                    onChange={(e) => updateAssignment(assignment.id, "title", e.target.value)}
                    placeholder="Assignment title"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Type
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["File Submission", "Text Submission", "Quiz Submission", "Review Submission"].map(
                      (t) => (
                        <button
                          key={t}
                          onClick={() => updateAssignment(assignment.id, "type", t)}
                          className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                            assignment.type === t
                              ? "border-blue-600 text-blue-700 bg-white ring-1 ring-blue-600 outline-none shadow-sm"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {t}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={assignment.description}
                    onChange={(e) => updateAssignment(assignment.id, "description", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Due Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={assignment.dueDate}
                        onChange={(e) => updateAssignment(assignment.id, "dueDate", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                      />
                      <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Review Deadline
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={assignment.reviewDeadline}
                        onChange={(e) => updateAssignment(assignment.id, "reviewDeadline", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                      />
                      <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Max File Size (MB)
                    </label>
                    <input
                      type="number"
                      value={assignment.maxFileSize}
                      onChange={(e) => updateAssignment(assignment.id, "maxFileSize", parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Max Attempts
                    </label>
                    <input
                      type="number"
                      value={assignment.maxAttempts}
                      onChange={(e) => updateAssignment(assignment.id, "maxAttempts", parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                  </div>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Plagiarism Check
                    </span>
                    <button
                      onClick={() => updateAssignment(assignment.id, "plagiarismCheck", !assignment.plagiarismCheck)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        assignment.plagiarismCheck ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          assignment.plagiarismCheck ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Grading
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {["Marks", "Pass Fail", "Completion"].map((g) => (
                        <button
                          key={g}
                          onClick={() => updateAssignment(assignment.id, "grading", g)}
                          className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                            assignment.grading === g
                              ? "border-blue-600 text-blue-700 bg-white ring-1 ring-blue-600 outline-none shadow-sm"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-2">
                    <span className="text-sm font-medium text-gray-900">
                      Certificate Required
                    </span>
                    <button
                      onClick={() => updateAssignment(assignment.id, "certificateRequired", !assignment.certificateRequired)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        assignment.certificateRequired ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          assignment.certificateRequired ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
