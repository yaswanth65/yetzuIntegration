import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Step5Props {
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step5Review({ onSubmit, onBack }: Step5Props) {
  return (
    <div className="bg-white rounded-[12px] p-6 lg:p-10 shadow-sm border border-gray-100">
      <div className="max-w-4xl space-y-8">
        
        <div>
          <h2 className="text-[16px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Assignment Basics</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Title</label>
                <div className="text-[14px] font-medium text-gray-900">Lorem ipsum dolor sit amet consectetur</div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Assignment Type</label>
                <span className="inline-block px-2.5 py-1 bg-[#dcfce7] text-[#166534] text-[12px] font-bold rounded-md">
                  Draft/Final Review
                </span>
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
              <p className="text-[14px] text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-[16px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Deadline</h2>
            <div className="text-[14px] font-medium text-gray-900">12/01/2026, 22:20:00 PM</div>
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Assigned to</h2>
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-gray-900">12 Students:</span>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-[16px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">File Types</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[12px] font-bold rounded-md">DOCX</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[12px] font-bold rounded-md">PDF</span>
            </div>
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Review Settings</h2>
            <div className="text-[14px] font-medium text-gray-900">Both</div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3 mt-6">
          <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-[#3E73F8] focus:ring-[#3E73F8] cursor-pointer" />
          <p className="text-[13px] text-gray-600 leading-relaxed cursor-pointer select-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
          <button type="button" onClick={onBack} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button type="button" onClick={onSubmit} className="px-6 py-2.5 bg-[#3E73F8] text-white rounded-lg text-[14px] font-bold hover:bg-blue-600 transition-colors flex items-center">
            Submit Assignment <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
