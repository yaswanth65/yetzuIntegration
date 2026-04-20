import React from 'react';
import { Download, Plus } from 'lucide-react';

export default function OrganizationHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h1 className="text-[#0A0A0A] text-2xl md:text-3xl font-semibold mb-4 sm:mb-0">Organizations</h1>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm bg-white font-medium hover:bg-gray-50 transition-colors">
          <Download size={16} /> Export
        </button>
        <button className="flex items-center gap-2 bg-[#0A0A0A] text-white px-4 py-2 rounded-lg text-sm font-medium  hover:bg-gray-800 transition-colors">
          <Plus size={16} /> Create Organization
        </button>
      </div>
    </div>
  );
}
