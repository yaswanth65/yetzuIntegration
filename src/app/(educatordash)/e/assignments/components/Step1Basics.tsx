import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Step1Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step1Basics({ onNext, onBack }: Step1Props) {
  return (
    <div className="bg-white rounded-[12px] p-6 lg:p-10 shadow-sm border border-gray-100">
      <form className="space-y-6 max-w-4xl" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[13px] font-bold text-gray-900">
              Assignment Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g., Results Section Draft Review" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[13px] font-bold text-gray-900">
              Assignment Type <span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
              required
              defaultValue=""
            >
              <option value="" disabled className="text-gray-400">Select Type</option>
              <option value="draft">Draft Submission</option>
              <option value="final">Final Submission</option>
              <option value="review">Peer Review</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-gray-900">
            Description / Instructions <span className="text-red-500">*</span>
          </label>
          <textarea 
            rows={5}
            placeholder="Provide clear instructions for students..." 
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-gray-900">
            Word Count Guidance <span className="text-gray-500 font-medium">(Optional)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="number" 
              placeholder="Min (e.g., 500)" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
            />
            <input 
              type="number" 
              placeholder="Max (e.g., 1200)" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-gray-900">
            Reference/Resources <span className="text-gray-500 font-medium">(Optional)</span>
          </label>
          <input 
            type="text" 
            placeholder="Add resource links or file names..." 
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E73F8]/20 focus:border-[#3E73F8] transition-all"
          />
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
