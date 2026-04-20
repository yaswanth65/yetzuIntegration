import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function StudentImport() {
  const [selectedOption, setSelectedOption] = useState<'manual' | 'csv'>('manual');

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Student Import</h2>
          <p className="text-sm text-gray-500">Choose how to import students. You can also skip this step.</p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Option 1 */}
          <div 
            onClick={() => setSelectedOption('manual')}
            className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${
              selectedOption === 'manual' 
                ? 'border-blue-500 bg-blue-50/50' 
                : 'border-gray-100 hover:border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex flex-shrink-0 items-center justify-center ${
                selectedOption === 'manual' ? 'border-blue-500' : 'border-gray-300'
              }`}>
                {selectedOption === 'manual' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${selectedOption === 'manual' ? 'text-blue-700' : 'text-slate-700'}`}>
                  Option 1
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  Add students manually later
                </span>
              </div>
            </div>
          </div>

          {/* Option 2 */}
          <div 
            onClick={() => setSelectedOption('csv')}
            className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${
              selectedOption === 'csv' 
                ? 'border-blue-500 bg-blue-50/50' 
                : 'border-gray-100 hover:border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex flex-shrink-0 items-center justify-center ${
                selectedOption === 'csv' ? 'border-blue-500' : 'border-gray-300'
              }`}>
                {selectedOption === 'csv' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
              </div>
              <div className="flex flex-col w-full">
                <span className={`text-sm font-bold ${selectedOption === 'csv' ? 'text-blue-700' : 'text-slate-700'}`}>
                  Option 2
                </span>
                <span className="text-sm text-gray-500 mt-1 mb-4">
                  Import via CSV now
                </span>
                
                {selectedOption === 'csv' && (
                  <div className="w-full border border-dashed border-blue-200 bg-white rounded-xl p-8 flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-800 font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-blue-600 font-medium cursor-pointer hover:underline mt-1">Select file</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
