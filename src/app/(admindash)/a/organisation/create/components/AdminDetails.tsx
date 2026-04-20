import React from 'react';

export default function AdminDetails() {
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 space-y-6">
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Email *</label>
            <input 
              type="email" 
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Phone Number</label>
            <input 
              type="text" 
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Admin Role</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-500 appearance-none">
              <option value="" disabled selected>Select admin access level</option>
              <option value="owner">Owner / Super Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
