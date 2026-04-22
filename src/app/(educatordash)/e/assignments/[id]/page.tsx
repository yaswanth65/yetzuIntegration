"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CloudUpload, 
  FileText, 
  DownloadCloud, 
  ChevronRight, 
  Send,
  Trash2,
  Download
} from 'lucide-react';
import Image from 'next/image';

export default function EducatorAssignmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // We simulate 3 states matching the 3 images provided by user:
  // 1: initial empty state
  // 2: file selected but not submitted
  // 3: submitted
  const [submissionState, setSubmissionState] = useState<1 | 2 | 3>(1);
  const [commentText, setCommentText] = useState('');
  
  // Dummy comments history
  const [comments, setComments] = useState<any[]>([
    {
      id: 1,
      author: 'HelloQwerty',
      date: '11 Jan 2024, 04:31 PM',
      text: 'The inputs for those modules indicated are missing required variables for proper processing as referenced in standard practices. There is a margin of potential payload for varying degrees of offset parameters common in wide testing arrays.'
    }
  ]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments([...comments, {
        id: Date.now(),
        author: 'Prashant Oawal',
        date: new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        text: commentText
      }]);
      setCommentText('');
    }
  };

  return (
    <div className="min-h-screen bg-white rounded-tl-[30px] p-6 lg:p-10 font-sans border border-gray-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-8 font-medium">
          <Link href="/e/sessions" className="hover:text-gray-900 transition-colors">
            Sessions
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-900 truncate max-w-lg">
            Wellness Management of Acute Coronary Syndromes: Evidence-Based Guidelines
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column (Title, Description, Upload Area) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header / Title */}
            <div>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">
                  Advanced Insights into Cardiac Arrhythmias
                </h1>
                {submissionState === 2 && (
                  <span className="px-2.5 py-1 bg-orange-50 text-orange-600 outline outline-1 outline-orange-200 text-[10px] font-bold rounded uppercase tracking-wider">
                    UNDER REVIEW
                  </span>
                )}
                {submissionState === 3 && (
                  <span className="px-2.5 py-1 bg-red-50 text-red-600 outline outline-1 outline-red-200 text-[10px] font-bold rounded uppercase tracking-wider">
                    REVIEW DONE
                  </span>
                )}
              </div>

              {/* Educator Profile */}
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100">
                  <Image src="https://i.pravatar.cc/150?img=68" alt="Prashant Oawal" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">Prashant Oawal</h3>
                  <p className="text-[13px] text-gray-500">educator</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                DESCRIPTION
              </h4>
              <p className="text-[13px] text-gray-700 leading-[1.8] max-w-3xl text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Upload Area / States */}
            <div className="pt-6 border-t border-gray-100 max-w-2xl">
              
              {submissionState === 1 && (
                <>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-4">Upload Your submission here</h4>
                  <div className="border border-blue-200 border-dashed rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                        <CloudUpload size={22} />
                      </div>
                      <div>
                        <h5 className="text-[13px] font-bold text-gray-900">Drag and drop or choose file to be uploaded</h5>
                        <p className="text-[11px] text-gray-500 mt-1 font-medium">• Only .docs or .pdf files up to 10 MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSubmissionState(2)} 
                      className="whitespace-nowrap px-6 py-2.5 bg-white text-blue-600 border border-blue-100 rounded-xl text-[13px] font-bold hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      Browse Files
                    </button>
                  </div>
                </>
              )}

              {submissionState === 2 && (
                <>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-4">Upload Your submission here</h4>
                  <div className="border border-blue-200 border-dashed rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC] mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                        <CloudUpload size={22} />
                      </div>
                      <div>
                        <h5 className="text-[13px] font-bold text-gray-900">Drag and drop or choose file to be uploaded</h5>
                        <p className="text-[11px] text-gray-500 mt-1 font-medium">• Only .docs or .pdf files up to 10 MB</p>
                      </div>
                    </div>
                    <button className="whitespace-nowrap px-6 py-2.5 bg-white text-blue-600 border border-blue-100 rounded-xl text-[13px] font-bold shadow-sm opacity-50 cursor-not-allowed">
                      Browse Files
                    </button>
                  </div>

                  {/* Pending file */}
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl mb-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50/80 text-blue-600 rounded-lg shrink-0">
                        <FileText size={20} />
                      </div>
                      <span className="text-[13px] font-bold text-gray-900">Session Article.pdf</span>
                    </div>
                    <button onClick={() => setSubmissionState(1)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={() => setSubmissionState(3)}
                      className="px-8 py-2.5 bg-[#000520] text-white rounded-[12px] text-[13px] font-bold hover:bg-gray-900 transition-all shadow-sm"
                    >
                      Submit Assignment
                    </button>
                  </div>
                </>
              )}

              {submissionState === 3 && (
                <>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-4">Your submissions</h4>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-blue-50/80 text-blue-600 rounded-lg shrink-0">
                            <FileText size={20} />
                          </div>
                          <span className="text-[13px] font-bold text-gray-900">Reviewed Article.pdf</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <DownloadCloud size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Debug state control link - barely visible to not ruin UI but helpful */}
                  <button onClick={() => setSubmissionState(1)} className="mt-8 text-[10px] text-white hover:text-gray-300">reset</button>
                </>
              )}
            </div>

          </div>

          {/* Right Column (Uploaded Assignments & Comments) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Uploaded Assignments Box */}
            <div className="bg-[#FAFAFA] border border-gray-100 rounded-[24px] p-6">
              <h3 className="text-[13px] font-bold text-gray-900 mb-5 flex items-center justify-between">
                Uploaded Assignments :
              </h3>
              
              <div className="space-y-3">
                {/* File 1 */}
                <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 bg-blue-50/80 text-blue-600 rounded-lg shrink-0 flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <span className="text-[13px] font-bold text-gray-900 truncate pr-4">Session Reading Material V...</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors pr-1 shrink-0">
                    <ChevronRight size={16} className="-rotate-90" />
                  </button>
                </div>

                {/* File 2 */}
                <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 bg-blue-50/80 text-blue-600 rounded-lg shrink-0 flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <span className="text-[13px] font-bold text-gray-900 truncate pr-4">Reference Article.pdf</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors pr-1 shrink-0">
                    <ChevronRight size={16} className="-rotate-90" />
                  </button>
                </div>

                {/* File 3 */}
                <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 bg-blue-50/80 text-blue-600 rounded-lg shrink-0 flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <span className="text-[13px] font-bold text-gray-900 truncate pr-4">Insights into Coronary.pdf</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors pr-1 shrink-0">
                    <ChevronRight size={16} className="-rotate-90" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add Private Comment Box */}
            <div className="bg-[#FAFAFA] border border-gray-100 rounded-[24px] p-6">
              <h3 className="text-[13px] font-bold text-gray-900 mb-5">Add Private Comment</h3>

              {submissionState === 3 && comments.map(c => (
                <div key={c.id} className="bg-white border border-gray-100 rounded-xl p-4 mb-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="font-bold text-[13px] text-gray-900">{c.author}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{c.date}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                    {c.text}
                  </p>
                </div>
              ))}

              <div className="relative">
                <input 
                  type="text" 
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                  placeholder="Enter here" 
                  className="w-full text-[13px] font-medium border border-gray-200 rounded-[12px] py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500 bg-white placeholder-gray-400" 
                />
                <button 
                  onClick={handleAddComment}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-3.5 flex items-start gap-1 font-medium">
                Private Comment are only visible to you and your mentor.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
