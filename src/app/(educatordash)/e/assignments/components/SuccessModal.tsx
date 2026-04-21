import React from 'react';
import { Check, Copy, TrendingUp } from 'lucide-react';

interface SuccessModalProps {
  onClose: () => void;
  onDashboard: () => void;
}

export default function SuccessModal({ onClose, onDashboard }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-[16px] w-full max-w-[440px] p-8 shadow-xl flex flex-col items-center text-center">
        
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center mb-4">
          <Check className="w-6 h-6 text-[#166534]" />
        </div>

        <h2 className="text-[20px] font-bold text-gray-900 mb-2">Assignment Submitted</h2>
        <p className="text-[13px] text-gray-500 mb-6">
          Congratulations, students will be notified and the assignment info is generated.
        </p>

        {/* ID Box */}
        <div className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100 mb-6">
          <div className="text-left">
            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Official Assignment ID</span>
            <span className="block text-[16px] font-bold text-gray-900 tracking-wide">A3F4-88J91</span>
          </div>
          <button className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Copy className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <p className="text-[13px] text-gray-600 leading-relaxed mb-6">
          Your assignment has been successfully submitted and you can track student submission in your dashboard matrix. Students will be able to see this info.
        </p>

        {/* Progress Box */}
        <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 flex items-start gap-4 mb-8 text-left">
          <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0 mt-0.5">
            <TrendingUp className="w-4 h-4 text-[#3E73F8]" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-gray-900 mb-1">Mentor Progress</div>
            <div className="text-[12px] text-gray-500 leading-relaxed">
              Normal current time in due schedule timeline.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg border border-gray-200 text-gray-700 text-[13px] font-bold hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            View Assignment Details
          </button>
          <button 
            onClick={onDashboard}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#3E73F8] text-white text-[13px] font-bold hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
