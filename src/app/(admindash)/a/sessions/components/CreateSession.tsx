import React, { useState, useEffect } from "react";
import { AdminAPI, asArray } from "@/lib/api";
import toast from "react-hot-toast";

interface CreateSessionProps {
  onBack: () => void;
}

interface Educator {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  rating: number;
  availabilityStatus: string;
}

const stepsList = [
  "Session Type",
  "Schedule",
  "Pricing",
  "Educator",
  "Review",
];

const generateSessionCode = (type: string) => {
  const prefix = type === "Webinar" ? "WEB" : type === "Cohort" ? "COH" : "1NA";
  const num = Math.floor(Math.random() * 900) + 100;
  return `${prefix}-${num}`;
};

export default function CreateSession({ onBack }: CreateSessionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [educators, setEducators] = useState<Educator[]>([]);

  // Form State
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [description, setDescription] = useState("");
  const [sessionType, setSessionType] = useState("Webinar");
  const [category, setCategory] = useState("Writing");
  
  const [sessionDate, setSessionDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxStudents, setMaxStudents] = useState(50);
  const [minStudents, setMinStudents] = useState(5);
  const [sessionPlatform, setSessionPlatform] = useState("Zoom");
  const [mode, setMode] = useState("online");
  
  const [selectedEducator, setSelectedEducator] = useState("");
  
  const [pricingType, setPricingType] = useState("");
  const [priceAmount, setPriceAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  
  const [assignmentEnabled, setAssignmentEnabled] = useState(true);
  const [certificateEnabled, setCertificateEnabled] = useState(false);
  
  const [selectedBundleSessions, setSelectedBundleSessions] = useState<string[]>([]);
  const [paidSessions, setPaidSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const response = await AdminAPI.getUsers({ role: "educator" });
        const users = asArray(response).map((u: any) => ({
          id: u.id || u.userId,
          name: u.name || u.Name,
          qualification: u.qualification || "",
          specialization: u.specialization || "",
          rating: u.rating || 0,
          availabilityStatus: u.availabilityStatus || u.Status || "available",
        }));
        setEducators(users);
      } catch (error) {
        console.error("Error fetching educators:", error);
      }
    };
    fetchEducators();
  }, []);

  useEffect(() => {
    setSessionCode(generateSessionCode(sessionType));
  }, [sessionType]);

  useEffect(() => {
    const fetchPaidSessions = async () => {
      if (pricingType.toLowerCase() !== "bundle") return;
      try {
        const response = await AdminAPI.getSessions({ limit: 100 });
        const sessions = asArray(response).filter((s: any) => 
          s.pricingType?.toLowerCase() === "paid" || s.price > 0
        );
        setPaidSessions(sessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchPaidSessions();
  }, [pricingType]);

  const toggleBundleSession = (sessionId: string) => {
    setSelectedBundleSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && !sessionType) {
      toast.error("Please select a session type");
      return;
    }
    if (currentStep === 2) {
      if (!sessionTitle.trim()) {
        toast.error("Please enter a session title");
        return;
      }
      if (!description.trim()) {
        toast.error("Please enter a session description");
        return;
      }
      if (!sessionDate) {
        toast.error("Please select a date");
        return;
      }
      if (!startTime || !endTime) {
        toast.error("Please select start and end times");
        return;
      }
    }
    if (currentStep === 3) {
      if (!pricingType) {
        toast.error("Please select a pricing type");
        return;
      }
      if (pricingType.toLowerCase() === "paid" && !priceAmount) {
        toast.error("Please enter a price");
        return;
      }
      if (pricingType.toLowerCase() === "bundle" && selectedBundleSessions.length === 0) {
        toast.error("Please select at least one session for bundle");
        return;
      }
    }
    if (currentStep === 4 && !selectedEducator) {
      toast.error("Please select an educator");
      return;
    }
    if (currentStep < stepsList.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!sessionTitle.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    setIsSubmitting(true);
    try {
      // Ensure organizationId is provided if possible, else use a placeholder or empty string
      // Based on Postman, organizationId might be required
      const sessionData = {
        title: sessionTitle.trim(),
        description: description.trim(),
        sessionCode: sessionCode || generateSessionCode(sessionType),
        sessionType: sessionType.toLowerCase(),
        category: category.toLowerCase(),
        assignmentEnabled: assignmentEnabled ? "true" : "false",
        certificateEnabled: certificateEnabled ? "true" : "false",
        date: sessionDate,
        startTime,
        endTime,
        capacity: Number(maxStudents),
        maxStudents: Number(maxStudents),
        minStudents: Number(minStudents),
        pricingType: pricingType.toLowerCase(),
        price: pricingType.toLowerCase() === "paid" ? Number(priceAmount) : 0,
        billingInterval: "one_time",
        educatorId: selectedEducator,
        organizationId: "", // Should be fetched from context if available
      };
      
      const response = await AdminAPI.createSession(sessionData);
      if (response.success || response.id || response.sessionCode || response.message?.includes("success")) {
        toast.success("Session created successfully!");
        onBack();
      } else {
        toast.error(response.message || "Failed to create session");
      }
    } catch (error: any) {
      console.error("Create session error:", error);
      toast.error(error?.response?.data?.message || error?.message || "Error creating session");
    } finally {
      setIsSubmitting(false);
    }
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
                  {["Online", "Hybrid"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setMode(opt.toLowerCase())}
                      className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        mode === opt.toLowerCase()
                          ? "border-blue-600 text-blue-700 bg-white"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Toggles */}
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
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
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
                    value={sessionCode}
                    onChange={(e) => setSessionCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm focus:outline-none"
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                      type="date"
                      value={sessionDate}
                      onChange={(e) => setSessionDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                       type="time"
                       value={startTime}
                       onChange={(e) => setStartTime(e.target.value)}
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
                       type="time"
                       value={endTime}
                       onChange={(e) => setEndTime(e.target.value)}
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
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Min Students
                  </label>
                  <input
                    type="number"
                    value={minStudents}
                    onChange={(e) => setMinStudents(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                </div>
              </div>

              <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wider uppercase">
                Max Students
              </div>
              <div className="flex gap-3 mb-8">
                {[25, 50, 100, 200].map((num) => (
                  <button
                    key={num}
                    onClick={() => setMaxStudents(num)}
                    className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      maxStudents === num
                        ? "border-blue-600 text-blue-700 bg-white"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {num}
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

          {currentStep === 3 && pricingType === "Free" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Free Session</h2>
                <p className="text-sm text-gray-500">This session will be free for all students.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-2xl text-green-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Free Access</h3>
                <p className="text-sm text-gray-500">All students can access this session for free</p>
              </div>
            </div>
          )}

          {currentStep === 3 && pricingType === "Paid" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Paid Session</h2>
                <p className="text-sm text-gray-500">Set a one-time price for this session.</p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">Price</label>
                <div className="flex gap-3 items-center">
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-24 px-4 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                  </select>
                  <input type="number" value={priceAmount} onChange={(e) => setPriceAmount(e.target.value)} placeholder="0.00" className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && pricingType === "Bundle" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Bundle</h2>
                <p className="text-sm text-gray-500">Select sessions to include in this bundle.</p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">Select Sessions</label>
                {paidSessions.length === 0 ? (
                  <div className="border border-gray-200 rounded-xl p-6 text-center">
                    <p className="text-sm text-gray-500">No paid sessions available. Create paid sessions first.</p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr><th className="px-4 py-3 w-12"></th><th className="px-4 py-3 font-medium">Session</th><th className="px-4 py-3 font-medium">Price</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {paidSessions.map((session) => (
                          <tr key={session.id} className={`cursor-pointer ${selectedBundleSessions.includes(session.id) ? "bg-blue-50" : "hover:bg-gray-50"}`} onClick={() => toggleBundleSession(session.id)}>
                            <td className="px-4 py-3"><input type="checkbox" checked={selectedBundleSessions.includes(session.id)} onChange={() => {}} className="w-4 h-4" /></td>
                            <td className="px-4 py-3 font-medium">{session.title || session.type || "Session"}</td>
                            <td className="px-4 py-3 text-gray-500">${session.price || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
                      <th className="px-4 py-3 font-medium">Specialization</th>
                      <th className="px-4 py-3 font-medium text-center">Rating</th>
                      <th className="px-4 py-3 font-medium">Status</th>
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
                          {edu.specialization}
                        </td>
                        <td className="px-4 py-4 text-gray-500 text-center">
                          <span className="text-orange-400 mr-1">★</span>{edu.rating}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-sm font-medium ${
                              edu.availabilityStatus === "available"
                                ? "text-green-500"
                                : "text-red-400"
                            }`}
                          >
                            {edu.availabilityStatus}
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
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Review & Create</h2>
                <p className="text-sm text-gray-500">
                  Review session details before creating.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Title</p>
                    <p className="font-medium">{sessionTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Session Code</p>
                    <p className="font-medium">{sessionCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{sessionType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{sessionDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{startTime} - {endTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-medium">{maxStudents} students</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pricing</p>
                    <p className="font-medium">{pricingType} {pricingType === "Paid" && `$${priceAmount}`}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-auto pb-10">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`text-sm font-semibold text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors`}
            >
              &lt; Back
            </button>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
              <button onClick={onBack} className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={currentStep === 5 ? handleSubmit : handleNext}
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : currentStep === 5 ? "Create Session" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
