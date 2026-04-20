import React, { useState } from 'react';

export default function AccessPermissions() {
  const [permissions, setPermissions] = useState({
    analytics: true,
    resourceLibrary: true,
    cmsAccess: true,
    contactSubmissions: false,
    reportGeneration: false,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleItem = ({ label, field, checked }: { label: string, field: keyof typeof permissions, checked: boolean }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <button 
        onClick={() => togglePermission(field)}
        className={`w-[36px] h-5 rounded-full relative transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <div className={`w-[14px] h-[14px] rounded-full bg-white absolute top-[3px] transition-all shadow-sm ${checked ? 'left-[19px]' : 'left-[3px]'}`} />
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Access & Permissions</h2>
          <p className="text-sm text-gray-500">Set default permissions for the organization's users.</p>
        </div>

        <div className="space-y-2 pt-2">
          <ToggleItem label="Analytics" field="analytics" checked={permissions.analytics} />
          <ToggleItem label="Resource Library" field="resourceLibrary" checked={permissions.resourceLibrary} />
          <ToggleItem label="CMS Access" field="cmsAccess" checked={permissions.cmsAccess} />
          <ToggleItem label="Contact Submissions" field="contactSubmissions" checked={permissions.contactSubmissions} />
          <ToggleItem label="Report Generation" field="reportGeneration" checked={permissions.reportGeneration} />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-bold text-slate-800 mb-4">App/Module access</h3>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
               <label className="block text-[13px] font-semibold text-gray-500 uppercase tracking-wider">SELECT MODULES THE ORG CAN ACCESS</label>
               <input 
                  type="text" 
                  placeholder="Select app/module"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 bg-gray-50/50"
               />
            </div>
            <div className="space-y-1.5">
               <label className="block text-[13px] font-semibold text-gray-500 uppercase tracking-wider">TAGS (OPTIONAL)</label>
               <input 
                  type="text" 
                  placeholder="Add tags..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 bg-gray-50/50"
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
