import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Submission({ onNext, onBack }: Step2Props) {
  return (
    <div className="bg-white rounded-[12px] p-6 lg:p-10 shadow-sm border border-gray-100">
      <form className="space-y-8 max-w-4xl" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        
        <div className="space-y-3">
          <label className="block text-[13px] font-bold text-gray-900">
            Accepted File Types <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3E73F8] focus:ring-[#3E73F8]" defaultChecked />
              <span className="text-[14px] text-gray-700">Word (.docx)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3E73F8] focus:ring-[#3E73F8]" defaultChecked />
              <span className="text-[14px] text-gray-700">PDF (.pdf)</span>
            </label>
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <label className="block text-[13px] font-bold text-gray-900">
            Max File Size (MB) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
              required
              defaultValue="10"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between py-2 border-b border-gray-50 pb-4">
            <div>
              <div className="text-[14px] font-bold text-gray-900 mb-1">Multiple Uploads</div>
              <div className="text-[13px] text-gray-500">Allow Students to upload multiple files</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3E73F8]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-[14px] font-bold text-gray-900 mb-1">Tracked Changes Required</div>
              <div className="text-[13px] text-gray-500">Require Word tracked changes</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3E73F8]"></div>
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
          <button type="button" onClick={onBack} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button type="submit" className="px-6 py-2.5 bg-[#3E73F8] text-white rounded-lg text-[14px] font-bold hover:bg-blue-600 transition-colors flex items-center">
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
