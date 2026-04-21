import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Step1Basics() {
  return (
    <div className="w-full max-w-[800px] animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Assignment Title *</label>
          <input 
            type="text" 
            defaultValue="Ch. 7 Results Section Draft Review"
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            placeholder="e.g., Results Section Draft Review"
          />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Assignment Type *</label>
          <div className="relative">
            <select className="w-full appearance-none px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer">
              <option>Review Type</option>
              <option>Submission Type</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Description / Instructions *</label>
        <textarea 
          rows={5}
          className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 resize-none leading-relaxed"
          placeholder="Provide clear instructions for students..."
          defaultValue="Provide clear instructions for students..."
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Virtual Event Guidance <span className="text-gray-400 font-medium">(Optional)</span></label>
          <input 
            type="text" 
            defaultValue=""
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            placeholder="Meet @ p... 3:00"
          />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-gray-900 mb-1.5 opacity-0 invisible hidden md:block">Max Limits</label>
          <input 
            type="text" 
            defaultValue=""
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            placeholder="Max limits (e.g., 1000)"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Reference Resources <span className="text-gray-400 font-medium">(Optional)</span></label>
        <input 
          type="text" 
          defaultValue=""
          className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Add references URL or files names..."
        />
      </div>
    </div>
  );
}
