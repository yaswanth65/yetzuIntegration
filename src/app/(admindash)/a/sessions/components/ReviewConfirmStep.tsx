import React from "react";

export default function ReviewConfirmStep() {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Review & Confirm</h2>
        <p className="text-sm text-gray-500">
          Review all details before creating the session.
        </p>
      </div>

      <div className="space-y-6">
        {/* Session Summary */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-gray-50/80 px-5 py-3.5 border-b border-gray-200 text-sm font-semibold text-gray-900">
            Session Summary
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { label: "Type", value: "Webinar" },
              { label: "Title", value: "Session" },
              { label: "Category", value: "Research" },
              { label: "Delivery", value: "Not Set" },
              { label: "Date", value: "2026-02-10" },
              { label: "Time", value: "12:12 - 22:23" },
              { label: "Status", value: "Draft" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between px-5 py-3.5">
                <span className="text-sm font-medium text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-gray-50/80 px-5 py-3.5 border-b border-gray-200 text-sm font-semibold text-gray-900">
            Pricing Summary
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { label: "Type", value: "Free" },
              { label: "Visibility", value: "Public" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between px-5 py-3.5">
                <span className="text-sm font-medium text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Educator Summary */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-gray-50/80 px-5 py-3.5 border-b border-gray-200 text-sm font-semibold text-gray-900">
            Educator Summary
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { label: "Name", value: "Prof. James Wilson" },
              { label: "Role", value: "Primary" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between px-5 py-3.5">
                <span className="text-sm font-medium text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments Summary */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-gray-50/80 px-5 py-3.5 border-b border-gray-200 text-sm font-semibold text-gray-900">
            Assignments Summary
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { label: "Assignment 1", value: "This Is The Title" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between px-5 py-3.5">
                <span className="text-sm font-medium text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
