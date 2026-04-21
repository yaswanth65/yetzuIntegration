import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Deadlines({ onNext, onBack }: Step3Props) {
  return (
    <div className="bg-white rounded-[12px] p-6 lg:p-10 shadow-sm border border-gray-100">
      <form className="space-y-8 max-w-4xl" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        
        <div className="space-y-2 max-w-md">
          <label className="block text-[13px] font-bold text-gray-900">
            Submission Deadline
          </label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="dd/mm/yyyy hh:mm" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
            />
            {/* Calendar Icon could go here if needed, but keeping it simple based on typical inputs */}
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-50 pb-6 max-w-2xl">
          <div>
            <div className="text-[14px] font-bold text-gray-900 mb-1">Late Submission Allowed</div>
            <div className="text-[13px] text-gray-500">24 hour grace period</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3E73F8]"></div>
          </label>
        </div>

        <div className="space-y-2 max-w-md pt-2">
          <label className="block text-[13px] font-bold text-gray-900">
            Visible To
          </label>
          <div className="relative">
            <select 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
              defaultValue="Github/Cohort"
            >
              <option value="" disabled className="text-gray-400">Select Cohort...</option>
              <option value="Github/Cohort">Github/Cohort</option>
              <option value="Design Cohort">Design Cohort</option>
              <option value="Marketing Cohort">Marketing Cohort</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
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
