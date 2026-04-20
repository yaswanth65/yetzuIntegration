import React from 'react';
import { X, Mail } from 'lucide-react';

interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactData: any | null;
}

export default function ContactDetailsModal({ isOpen, onClose, contactData }: ContactDetailsModalProps) {
  if (!isOpen || !contactData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Contact Query Details</h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              {contactData.user.name} - {contactData.user.email}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:px-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="space-y-4">
            
            {/* Row 1: Inquiry Type & Submitted Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
                 <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">INQUIRY TYPE</p>
                 <p className="text-sm font-bold text-slate-800">{contactData.inquiry}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
                 <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">SUBMITTED</p>
                 <p className="text-sm font-bold text-slate-800">{contactData.submittedDate}</p>
              </div>
            </div>

            {/* Row 2: Phone & Institution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
                 <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                 <p className="text-sm font-bold text-slate-800">{contactData.user.phone}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
                 <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Institution</p>
                 <p className="text-sm font-bold text-slate-800">{contactData.user.institution}</p>
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
               <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">MESSAGE</p>
               <p className="text-sm text-slate-800 leading-relaxed font-medium">{contactData.message}</p>
            </div>

            {/* Reply Section */}
            <div className="pt-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Reply Through Mail</h3>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="w-full md:w-3/4 space-y-2">
                  <label className="block text-sm font-bold text-slate-800">Template</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white relative"
                    defaultValue="Acknowledgement"
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em 1.2em' }}
                  >
                    <option value="Acknowledgement">Acknowledgement</option>
                  </select>
                  <p className="text-xs font-medium text-gray-500">Confirms receipt and follow-up.</p>
                </div>
                
                <div className="w-full md:w-1/4 flex items-center md:justify-end mt-4 md:mt-0">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-bold text-slate-700">Mark as resolved</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-sm font-bold text-slate-800">Additional Notes</label>
                <textarea 
                  placeholder="Add optional context before sending the template response"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-none font-medium"
                />
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 items-center p-6 md:px-8 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Close
          </button>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#00A3FF] hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-colors"
          >
            <Mail className="w-4 h-4" />
            Send Reply
          </button>
        </div>
        
      </div>
    </div>
  );
}
