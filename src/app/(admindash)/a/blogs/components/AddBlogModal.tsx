import React, { useState } from 'react';
import { X, Link as LinkIcon, Plus } from 'lucide-react';

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBlogModal({ isOpen, onClose }: AddBlogModalProps) {
  const [sections, setSections] = useState([{ id: 1, heading: '', content: '' }]);

  if (!isOpen) return null;

  const handleAddSection = () => {
    if (sections.length < 3) {
      setSections([...sections, { id: sections.length + 1, heading: '', content: '' }]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[24px] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-900">New Blog Post</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:px-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">Blog Title *</label>
              <input 
                type="text" 
                placeholder="Enter blog title"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
              />
            </div>

            {/* Cover Image URL */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">Cover Image URL</label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Introduction */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">Introduction *</label>
              <textarea 
                placeholder="Write a compelling introduction..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-y"
              />
            </div>

            {/* Sections */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-bold text-slate-800">Sections (up to 3)</label>
                <button 
                  onClick={handleAddSection}
                  disabled={sections.length >= 3}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div key={section.id} className="p-5 border border-gray-100 bg-[#FCFCFD] rounded-2xl space-y-4">
                    <h4 className="text-sm font-bold text-slate-800">Section {index + 1}</h4>
                    <input 
                      type="text" 
                      placeholder="Section heading..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 bg-white"
                    />
                    <textarea 
                      placeholder="Section content..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-y bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 items-center p-6 md:px-8 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#00A3FF] hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Publish
          </button>
        </div>
        
      </div>
    </div>
  );
}
