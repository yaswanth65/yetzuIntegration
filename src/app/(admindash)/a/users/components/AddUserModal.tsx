import React, { useState } from "react";
import { X, Check, ChevronDown, Mail, Key, Info } from "lucide-react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const [addUserStep, setAddUserStep] = useState(1);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Student",
    institution: "",
    department: "",
    permissions: {
      manageSessions: false,
      manageAssignments: false,
      viewAnalytics: false,
      manageUsers: false,
      manageBilling: false,
      manageSettings: false,
    },
    inviteMethod: "email", // "email" or "temp"
  });

  const addUserSteps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Access Control" },
    { num: 3, label: "Permissions" },
    { num: 4, label: "Review" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Add New User</h2>
          <button
            onClick={() => {
              setAddUserStep(1);
              onClose();
            }}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between relative">
          <div className="absolute left-12 right-12 top-1/2 h-0.5 -mt-[1px] bg-slate-100 z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ width: `${((addUserStep - 1) / 3) * 100}%` }}
            />
          </div>
          {addUserSteps.map((step) => (
            <div
              key={step.num}
              className="flex items-center relative z-10 bg-white px-2"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2 transition-colors ${
                  addUserStep > step.num
                    ? "bg-emerald-100 text-emerald-600"
                    : addUserStep === step.num
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {addUserStep > step.num ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  addUserStep >= step.num
                    ? "text-slate-900"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="p-8 h-[380px] overflow-y-auto">
          {addUserStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Jane Doe"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="jane@example.com"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Role
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      setNewUser({ ...newUser, role: "Student" })
                    }
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      newUser.role === "Student"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    Student
                  </button>
                  <button
                    onClick={() =>
                      setNewUser({ ...newUser, role: "Educator" })
                    }
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      newUser.role === "Educator"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    Educator
                  </button>
                </div>
              </div>
            </div>
          )}

          {addUserStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select Institution
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-slate-200 rounded-md text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                    value={newUser.institution}
                    onChange={(e) =>
                      setNewUser({ ...newUser, institution: e.target.value })
                    }
                  >
                    <option value="">Select institution...</option>
                    <option value="YETZU University">YETZU University</option>
                    <option value="Global Tech">Global Tech</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select Department
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-slate-200 rounded-md text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                    value={newUser.department}
                    onChange={(e) =>
                      setNewUser({ ...newUser, department: e.target.value })
                    }
                  >
                    <option value="">Select department...</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {addUserStep === 3 && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-4">
                Permissions for {newUser.role}
              </h3>
              <div className="space-y-1 border border-slate-200 rounded-lg p-2 bg-slate-50">
                {[
                  { key: "manageSessions", label: "Manage Sessions" },
                  { key: "manageAssignments", label: "Manage Assignments" },
                  { key: "viewAnalytics", label: "View Analytics" },
                  { key: "manageUsers", label: "Manage Users" },
                  { key: "manageBilling", label: "Manage Billing" },
                  { key: "manageSettings", label: "Manage Settings" },
                ].map((perm) => (
                  <div
                    key={perm.key}
                    className="flex items-center justify-between px-4 py-3 bg-white border border-slate-100 rounded-md shadow-sm"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {perm.label}
                    </span>
                    <button
                      onClick={() =>
                        setNewUser({
                          ...newUser,
                          permissions: {
                            ...newUser.permissions,
                            [perm.key]:
                              !newUser.permissions[
                                perm.key as keyof typeof newUser.permissions
                              ],
                          },
                        })
                      }
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        newUser.permissions[
                          perm.key as keyof typeof newUser.permissions
                        ]
                          ? "bg-blue-600"
                          : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          newUser.permissions[
                            perm.key as keyof typeof newUser.permissions
                          ]
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {addUserStep === 4 && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                    Name
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    {newUser.name || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {newUser.email || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                    Role
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    {newUser.role}
                  </p>
                </div>
              </div>

              {/* Invite Method */}
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">
                  Invite method
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      setNewUser({ ...newUser, inviteMethod: "email" })
                    }
                    className={`p-4 rounded-lg border text-left transition-colors flex items-start gap-3 ${
                      newUser.inviteMethod === "email"
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Mail
                      className={`w-5 h-5 ${
                        newUser.inviteMethod === "email"
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          newUser.inviteMethod === "email"
                            ? "text-blue-700"
                            : "text-slate-700"
                        }`}
                      >
                        Email Invite
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      setNewUser({ ...newUser, inviteMethod: "temp" })
                    }
                    className={`p-4 rounded-lg border text-left transition-colors flex items-start gap-3 ${
                      newUser.inviteMethod === "temp"
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Key
                      className={`w-5 h-5 ${
                        newUser.inviteMethod === "temp"
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          newUser.inviteMethod === "temp"
                            ? "text-blue-700"
                            : "text-slate-700"
                        }`}
                      >
                        Temp Password
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Info Banner */}
              {newUser.inviteMethod === "email" && (
                <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3 text-blue-700">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-sm">
                    An invitation link will be sent to the user's email
                    address. They will be prompted to create a password.
                  </p>
                </div>
              )}
              {newUser.inviteMethod === "temp" && (
                <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-3 text-slate-700 border border-slate-100">
                  <Info className="w-5 h-5 text-slate-500 shrink-0" />
                  <p className="text-sm">
                    A temporary password will be generated and shown after
                    creation. You must share it with the user manually.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-xl">
          <div>
            {addUserStep === 1 ? (
              <button
                onClick={() => {
                  setAddUserStep(1);
                  onClose();
                }}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setAddUserStep((p) => Math.max(1, p - 1))}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                &lt; Back
              </button>
            )}
          </div>
          <div>
            {addUserStep < 4 ? (
              <button
                onClick={() => setAddUserStep((p) => Math.min(4, p + 1))}
                className="px-6 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 transition-colors shadow-sm"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => {
                  setAddUserStep(1);
                  onClose();
                  // In a real app, form submission happens here
                }}
                className="px-6 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 transition-colors shadow-sm"
              >
                Add User
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
