import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step4Configuration({ onNext, onBack }: Step4Props) {
  return (
    <div className="bg-white rounded-[12px] p-6 lg:p-10 shadow-sm border border-gray-100">
      <form className="space-y-8 max-w-4xl" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        
        <div className="space-y-6">
          <div className="space-y-2 max-w-md">
            <label className="block text-[13px] font-bold text-gray-900">
              Review Type
            </label>
            <div className="relative">
              <select 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
                defaultValue="Both"
              >
                <option value="Both">Both</option>
                <option value="Manual">Manual</option>
                <option value="Automated">Automated</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2 max-w-md">
            <label className="block text-[13px] font-bold text-gray-900">
              Feedback Visibility
            </label>
            <div className="relative">
              <select 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
                defaultValue="Private to Student"
              >
                <option value="Private to Student">Private to Student</option>
                <option value="Public">Public</option>
                <option value="Cohort Only">Cohort Only</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
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
