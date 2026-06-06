import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { AdminAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface EditUserModalProps {
  isOpen: boolean;
  userId: string | null;
  onClose: () => void;
  onSaved?: () => void;
}

export function EditUserModal({ isOpen, userId, onClose, onSaved }: EditUserModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileno: "",
    role: "student",
    status: "active",
    metadata: {} as Record<string, any>,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isOpen || !userId) return;
    const fetchUser = async () => {
      setIsFetching(true);
      try {
        const res = await AdminAPI.getUserById(userId);
        const u = res?.data || res;
        setForm({
          name: u.name || "",
          email: u.email || "",
          mobileno: u.mobileno || u.mobileNo || "",
          role: (u.role || "student").toLowerCase(),
          status: (u.status || "active").toLowerCase(),
          metadata: u.metadata || {},
        });
      } catch {
        toast.error("Failed to load user details");
        onClose();
      } finally {
        setIsFetching(false);
      }
    };
    fetchUser();
  }, [isOpen, userId, onClose]);

  const handleSave = async () => {
    if (!userId) return;
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setIsLoading(true);
    try {
      await AdminAPI.updateUser({
        userId,
        name: form.name,
        email: form.email,
        mobileno: form.mobileno || undefined,
        role: form.role,
        status: form.status,
        metadata: Object.keys(form.metadata).length > 0 ? form.metadata : undefined,
      });
      toast.success("User updated successfully");
      onSaved?.();
      onClose();
    } catch {
      toast.error("Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Edit User</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {isFetching ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 size={28} className="animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mobile No.</label>
              <input type="text" value={form.mobileno} onChange={(e) => setForm({ ...form, mobileno: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="+919876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
              <div className="grid grid-cols-3 gap-3">
                {["student", "educator", "admin"].map((r) => (
                  <button key={r} onClick={() => setForm({ ...form, role: r })}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors capitalize ${
                      form.role === r
                        ? "border-blue-600 bg-blue-50/50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <div className="flex gap-4">
                {["active", "suspended"].map((s) => (
                  <button key={s} onClick={() => setForm({ ...form, status: s })}
                    className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors capitalize ${
                      form.status === s
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Metadata (JSON)</label>
              <textarea rows={3} value={JSON.stringify(form.metadata, null, 2)}
                onChange={(e) => {
                  try { setForm({ ...form, metadata: JSON.parse(e.target.value) }); }
                  catch { /* allow typing invalid JSON */ }
                }}
                className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
          </div>
        )}

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={isLoading || isFetching}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
