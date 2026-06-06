import React, { useState } from "react";
import { X, Check, Info, Mail, KeyRound } from "lucide-react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (user: {
    name: string;
    email: string;
    password?: string;
    mobileno?: string;
    role: string;
    status: string;
    inviteMethod: "email_invite" | "temp_password";
    organizationId?: string;
    sendCredentialsEmail?: boolean;
    sendInviteEmail?: boolean;
    metadata?: Record<string, any>;
  }) => Promise<void> | void;
}

export function AddUserModal({ isOpen, onClose, onSubmit }: AddUserModalProps) {
  const [addUserStep, setAddUserStep] = useState(1);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    mobileno: "",
    role: "Student",
    status: "active",
    organizationId: "",
    inviteMethod: "email_invite" as "email_invite" | "temp_password",
  });

  const addUserSteps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Access Control" },
    { num: 3, label: "Review" },
  ];

  const resetForm = () => {
    setAddUserStep(1);
    setNewUser({
      name: "",
      email: "",
      password: "",
      mobileno: "",
      role: "Student",
      status: "active",
      organizationId: "",
      inviteMethod: "email_invite",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Add New User</h2>
          <button
            onClick={() => { resetForm(); onClose(); }}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between relative">
          <div className="absolute left-12 right-12 top-1/2 h-0.5 -mt-[1px] bg-slate-100 z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ width: `${((addUserStep - 1) / 2) * 100}%` }}
            />
          </div>
          {addUserSteps.map((step) => (
            <div key={step.num} className="flex items-center relative z-10 bg-white px-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2 transition-colors ${
                  addUserStep > step.num
                    ? "bg-emerald-100 text-emerald-600"
                    : addUserStep === step.num
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {addUserStep > step.num ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
              </div>
              <span className={`text-sm font-medium ${addUserStep >= step.num ? "text-slate-900" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="p-8 h-[380px] overflow-y-auto">
          {addUserStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Yashwanth Kancharla"
                  value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="yashwanth@example.com"
                  value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mobile No.</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="+919876543210"
                  value={newUser.mobileno} onChange={(e) => setNewUser({ ...newUser, mobileno: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setNewUser({ ...newUser, role: "Student" })}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${newUser.role === "Student" ? "border-blue-600 bg-blue-50/50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}>
                    Student
                  </button>
                  <button onClick={() => setNewUser({ ...newUser, role: "Educator" })}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${newUser.role === "Educator" ? "border-blue-600 bg-blue-50/50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}>
                    Educator
                  </button>
                </div>
              </div>
            </div>
          )}

          {addUserStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">Account Status</h3>
                <div className="flex gap-4">
                  {["Active", "Suspended"].map((s) => {
                    const val = s.toLowerCase();
                    return (
                      <button key={s} onClick={() => setNewUser({ ...newUser, status: val })}
                        className={`px-6 py-3 rounded-lg border text-sm font-medium transition-colors flex-1 ${newUser.status === val ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">Invite Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setNewUser({ ...newUser, inviteMethod: "email_invite" })}
                    className={`py-4 px-4 rounded-lg border text-sm font-medium transition-colors flex flex-col items-center gap-2 ${
                      newUser.inviteMethod === "email_invite"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Mail className={`w-5 h-5 ${newUser.inviteMethod === "email_invite" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>Email Invite</span>
                  </button>
                  <button
                    onClick={() => setNewUser({ ...newUser, inviteMethod: "temp_password" })}
                    className={`py-4 px-4 rounded-lg border text-sm font-medium transition-colors flex flex-col items-center gap-2 ${
                      newUser.inviteMethod === "temp_password"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <KeyRound className={`w-5 h-5 ${newUser.inviteMethod === "temp_password" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>Temp Password</span>
                  </button>
                </div>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-blue-700">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    {newUser.inviteMethod === "email_invite"
                      ? "An invitation link will be sent to the user's email address. They will be prompted to create a password."
                      : "A temporary password will be generated and displayed in the review step. You can share it with the user securely."}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Organization ID</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. 11111111-1111-1111-1111-111111111111"
                  value={newUser.organizationId} onChange={(e) => setNewUser({ ...newUser, organizationId: e.target.value })} />
              </div>

              {newUser.inviteMethod === "temp_password" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Custom Password (optional)</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Leave blank to auto-generate"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>
              )}
            </div>
          )}

          {addUserStep === 3 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Name</p>
                  <p className="text-sm font-medium text-slate-900">{newUser.name || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm font-medium text-slate-900 truncate">{newUser.email || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Mobile</p>
                  <p className="text-sm font-medium text-slate-900">{newUser.mobileno || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Role</p>
                  <p className="text-sm font-medium text-slate-900">{newUser.role}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Organization</p>
                  <p className="text-sm font-medium text-slate-900">{newUser.organizationId || "-"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">Invite Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setNewUser({ ...newUser, inviteMethod: "email_invite" })}
                    className={`py-4 px-4 rounded-lg border text-sm font-medium transition-colors flex flex-col items-center gap-2 ${
                      newUser.inviteMethod === "email_invite"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Mail className={`w-5 h-5 ${newUser.inviteMethod === "email_invite" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>Email Invite</span>
                  </button>
                  <button
                    onClick={() => setNewUser({ ...newUser, inviteMethod: "temp_password" })}
                    className={`py-4 px-4 rounded-lg border text-sm font-medium transition-colors flex flex-col items-center gap-2 ${
                      newUser.inviteMethod === "temp_password"
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <KeyRound className={`w-5 h-5 ${newUser.inviteMethod === "temp_password" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>Temp Password</span>
                  </button>
                </div>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-blue-700">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    {newUser.inviteMethod === "email_invite"
                      ? "An invitation link will be sent to the user's email address. They will be prompted to create a password."
                      : "A temporary password will be generated and displayed in the review step. You can share it with the user securely."}
                  </p>
                </div>
              </div>

              {newUser.inviteMethod === "temp_password" && (
                <div className="bg-emerald-50 p-4 rounded-lg flex items-center gap-3 text-emerald-700">
                  <KeyRound className="w-5 h-5 text-emerald-500 shrink-0" />
                  <p className="text-sm">
                    {newUser.password
                      ? `Custom password: ${newUser.password}`
                      : "A random password will be auto-generated."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-xl">
          <div>
            {addUserStep === 1 ? (
              <button onClick={() => { resetForm(); onClose(); }}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                Cancel
              </button>
            ) : (
              <button onClick={() => setAddUserStep((p) => Math.max(1, p - 1))}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                &lt; Back
              </button>
            )}
          </div>
          <div>
            {addUserStep < 3 ? (
              <button onClick={() => setAddUserStep((p) => Math.min(3, p + 1))}
                className="px-6 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 transition-colors shadow-sm">
                Continue
              </button>
            ) : (
              <button
                onClick={async () => {
                  const payload: Record<string, any> = {
                    name: newUser.name,
                    email: newUser.email,
                    mobileno: newUser.mobileno || undefined,
                    role: newUser.role.toLowerCase(),
                    status: newUser.status,
                    inviteMethod: newUser.inviteMethod,
                    organizationId: newUser.organizationId || undefined,
                  };

                  if (newUser.inviteMethod === "temp_password") {
                    payload.password = newUser.password || `Temp@${Date.now().toString(36).toUpperCase()}`;
                    payload.sendCredentialsEmail = true;
                    payload.metadata = { source: "admin_panel" };
                  } else {
                    payload.sendInviteEmail = true;
                    payload.metadata = { invitedBy: "admin" };
                  }

                  await onSubmit?.(payload as any);
                  resetForm();
                  onClose();
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
