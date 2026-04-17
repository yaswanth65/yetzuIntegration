import React, { useState } from "react";
import AssignmentStep from "./AssignmentStep";
import ReviewConfirmStep from "./ReviewConfirmStep";

interface CreateSessionProps {
  onBack: () => void;
}

const stepsList = [
  "Session Type",
  "Session Details",
  "Pricing",
  "Assign Educator",
  "Assignments",
  "Review & Confirm",
];

const educators = [
  { id: '1', name: "Dr. Sarah Chen", qualification: "PhD, Academic Writing", sessions: 124, rating: 4.9, status: "Available" },
  { id: '2', name: "Prof. James Wilson", qualification: "PhD, Research Methods", sessions: 98, rating: 4.8, status: "Available" },
  { id: '3', name: "Dr. Anita Roy", qualification: "PhD, Publication Ethics", sessions: 87, rating: 4.7, status: "Available" },
  { id: '4', name: "Dr. Liu Wei", qualification: "PhD, Data Science", sessions: 65, rating: 4.0, status: "Unavailable" },
  { id: '5', name: "Prof. Raj Patel", qualification: "PhD, Statistics", sessions: 112, rating: 4.8, status: "Available" },
];

export default function CreateSession({ onBack }: CreateSessionProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 States
  const [sessionType, setSessionType] = useState("Webinar");
  const [category, setCategory] = useState("Research");
  const [deliveryMode, setDeliveryMode] = useState("Online");
  const [assignmentEnabled, setAssignmentEnabled] = useState(true);
  const [certificateEnabled, setCertificateEnabled] = useState(false);

  // Step 2 States
  const [sessionPlatform, setSessionPlatform] = useState("Zoom");
  const [status, setStatus] = useState("Draft");

  // Step 3 States
  const [pricingType, setPricingType] = useState("Free");

  // Step 4 States
  const [selectedEducator, setSelectedEducator] = useState("");

  const handleNext = () => {
    if (currentStep < stepsList.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="w-full flex-1 flex flex-col pl-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors border border-gray-200"
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Create Session</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Save Draft
          </button>
          <button onClick={onBack} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            View Templates
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-12">
        {/* Left Sidebar Steps */}
        <div className="w-56 flex-shrink-0 border-r border-gray-100 pr-4 min-h-[500px]">
          <div className="flex flex-col gap-6">
            {stepsList.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;

              return (
                <div key={step} className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                      isCompleted
                        ? "bg-green-100 text-green-600"
                        : isActive
                        ? "bg-gray-100 text-gray-900"
                        : "bg-transparent text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <i className="ri-check-line text-lg"></i>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isActive
                        ? "font-semibold text-gray-900"
                        : "font-medium text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Form Content */}
        <div className="flex-1 max-w-4xl">
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Session Type</h2>
                <p className="text-sm text-gray-500">
                  Choose the type of learning session to create.
                </p>
              </div>

              {/* Session Type Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { id: "Webinar", desc: "One-to-many live session" },
                  { id: "Cohort", desc: "Multi-session batch program" },
                  { id: "1:1", desc: "Private mentoring session" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSessionType(type.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      sessionType === type.id
                        ? "border-blue-600 bg-blue-50/10 shadow-sm ring-1 ring-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`font-semibold mb-1 ${
                        sessionType === type.id ? "text-blue-700" : "text-gray-900"
                      }`}
                    >
                      {type.id}
                    </div>
                    <div className="text-xs text-gray-500">{type.desc}</div>
                  </button>
                ))}
              </div>

              {/* Category */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Category
                </label>
                <div className="flex gap-3">
                  {["Writing", "Research", "Mentorship"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        category === cat
                          ? "border-blue-600 text-blue-700 bg-white"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Mode */}
              <div className="mb-10">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Delivery Mode
                </label>
                <div className="flex gap-3">
                  {["Online", "Hybrid"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setDeliveryMode(mode)}
                      className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        deliveryMode === mode
                          ? "border-blue-600 text-blue-700 bg-white"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-5 border-t border-gray-100 pt-8 mb-12">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Assignment Enabled
                  </span>
                  <button
                    onClick={() => setAssignmentEnabled(!assignmentEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      assignmentEnabled ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        assignmentEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Certificate Enabled
                  </span>
                  <button
                    onClick={() => setCertificateEnabled(!certificateEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      certificateEnabled ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        certificateEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Session Details</h2>
                <p className="text-sm text-gray-500">
                  Configure the session information and schedule.
                </p>
              </div>

              <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wider">
                BASIC INFO
              </div>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter session title"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Session Code
                  </label>
                  <input
                    type="text"
                    defaultValue="WEB-500"
                    className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm focus:outline-none"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Thumbnail
                  </label>
                  <div className="border border-dashed border-blue-400 bg-blue-50/30 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center transition-colors hover:bg-blue-50/50 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                      <i className="ri-cloud-upload-line text-xl"></i>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-900">
                        Drag and Drop or Choose the file to be uploaded
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Only jpeg, jpg or png file up to 10 MB
                      </p>
                    </div>
                    <button className="mt-2 px-4 py-1.5 text-blue-600 text-sm font-medium bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                      Browse Files
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    placeholder="Session description..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wider">
                SCHEDULE
              </div>
              <div className="grid grid-cols-3 gap-5 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                    <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                       type="text"
                       placeholder="--:--"
                       className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                       type="text"
                       placeholder="--:--"
                       className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wider uppercase">
                Capacity
              </div>
              <div className="flex gap-5 mb-8">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Max Students
                  </label>
                  <input
                    type="number"
                    defaultValue={50}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Min Students
                  </label>
                  <input
                    type="number"
                    defaultValue={5}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                </div>
              </div>

              <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wider uppercase">
                Session Platform
              </div>
              <div className="flex gap-3 mb-8">
                {["Zoom", "Google Meet", "Custom"].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSessionPlatform(platform)}
                    className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      sessionPlatform === platform
                        ? "border-blue-600 text-blue-700 bg-white"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>

              <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wider uppercase">
                Status
              </div>
              <div className="flex gap-3 mb-10">
                {["Draft", "Private"].map((stat) => (
                  <button
                    key={stat}
                    onClick={() => setStatus(stat)}
                    className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      status === stat
                        ? "border-blue-600 text-blue-700 bg-white"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {stat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Pricing</h2>
                <p className="text-sm text-gray-500">
                  Set the pricing and payment configuration.
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Pricing Type
                </label>
                <div className="flex gap-3">
                  {["Free", "Paid", "Subscription", "Bundle"].map((ptype) => (
                    <button
                      key={ptype}
                      onClick={() => setPricingType(ptype)}
                      className={`flex-1 py-3 text-sm font-medium rounded-lg border transition-colors ${
                        pricingType === ptype
                          ? "border-blue-600 text-blue-700 bg-blue-50/10 shadow-sm ring-1 ring-blue-600 outline-none"
                          : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {ptype}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Assign Educator</h2>
                <p className="text-sm text-gray-500">
                  Select an educator for this session.
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white max-w-4xl">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 w-12 text-center"></th>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Qualification</th>
                      <th className="px-4 py-3 font-medium text-center">Sessions</th>
                      <th className="px-4 py-3 font-medium text-center">Rating</th>
                      <th className="px-4 py-3 font-medium">Availability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {educators.map((edu) => (
                      <tr 
                        key={edu.id} 
                        className={`transition-colors cursor-pointer ${
                          selectedEducator === edu.id ? "bg-blue-50/30" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedEducator(edu.id)}
                      >
                        <td className="px-4 py-4 text-center align-middle">
                          <input
                            type="radio"
                            name="educator"
                            checked={selectedEducator === edu.id}
                            onChange={() => setSelectedEducator(edu.id)}
                            className="w-4 h-4 text-blue-600 cursor-pointer border-gray-300 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-900">
                          {edu.name}
                        </td>
                        <td className="px-4 py-4 text-gray-500">
                          {edu.qualification}
                        </td>
                        <td className="px-4 py-4 text-gray-500 text-center">
                          {edu.sessions}
                        </td>
                        <td className="px-4 py-4 text-gray-500 text-center">
                          <span className="text-orange-400 mr-1">★</span>{edu.rating}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-sm font-medium ${
                              edu.status === "Available"
                                ? "text-green-500"
                                : "text-red-400"
                            }`}
                          >
                            {edu.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <AssignmentStep />
          )}

          {currentStep === 6 && (
            <ReviewConfirmStep />
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-auto pb-10">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`text-sm font-semibold text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors ${currentStep === 6 ? "invisible" : ""}`}
            >
              &lt; Back
            </button>
            <div className={`flex items-center gap-3 ${currentStep === 6 ? "w-full justify-end" : ""}`}>
              <button className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
              {currentStep !== 6 && (
                <button onClick={onBack} className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-6 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {currentStep === 6 ? "Create Session" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
