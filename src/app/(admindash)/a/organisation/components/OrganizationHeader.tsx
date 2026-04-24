import React from 'react';
import { Download, Plus } from 'lucide-react';
import Link from 'next/link';

export default function OrganizationHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-[#021165] tracking-tight">Organizations</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Manage partner institutions and corporate entities</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
          <Download size={16} /> Export Data
        </button>
        <Link 
          href="/a/organisation/create" 
          className="flex items-center justify-center gap-2 bg-[#042BFD] text-white px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#0325D7] transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> Create Organization
        </Link>
      </div>
    </div>
  );
}
