import React from 'react';
import { AlertCircle } from 'lucide-react';

type AdminDetailsProps = {
  data: {
    name: string;
    email: string;
    mobileNo: string;
    roleTitle: string;
    phoneCode: string;
  };
  onChange: (data: AdminDetailsProps['data']) => void;
  errors?: string[];
};

export default function AdminDetails({ data, onChange, errors }: AdminDetailsProps) {
  const update = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 space-y-6">
        {errors && errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-red-700">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-sm text-red-600 space-y-0.5">
                {errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          </div>
        )}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Admin Details</h2>
          <p className="text-sm text-gray-500 max-w-sm">Primary contact and administrator for the organization. (You can add more admins later in the settings)</p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Primary Admin Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Email *</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Phone Number</label>
            <input
              type="text"
              placeholder="+1 (555) 000-0000"
              value={data.mobileNo}
              onChange={(e) => update('mobileNo', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Admin Role</label>
            <select
              value={data.roleTitle}
              onChange={(e) => update('roleTitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-500 appearance-none"
            >
              <option value="" disabled>Select admin access level</option>
              <option value="super_admin">Super Admin</option>
              <option value="owner">Owner</option>
              <option value="manager">Manager</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
