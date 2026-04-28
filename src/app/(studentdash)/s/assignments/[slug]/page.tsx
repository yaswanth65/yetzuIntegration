// "use client";

// import React, { useState, useRef } from "react";
// import Link from "next/link";
// import { 
//   ChevronRight, 
//   Download, 
//   UploadCloud, 
//   Send,
//   X
// } from "lucide-react";

// // --- MOCK DATA ---
// const ASSIGNMENT_DATA = {
//   title: "Advanced Insights into Cardiac Arrhythmias",
//   // Change this date to test the badge colors (e.g., set to a past date for Red)
//   dueDate: new Date(Date.now() + 86400000 * 1).toISOString(), // Sets mock date to tomorrow (1 day left)
//   mentor: {
//     name: "Dr. Sophia Tyler",
//     session: "Webinar: Breakthroughs in Cognitive Neurosciencebinar",
//     avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
//   },
//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   resources: [
//     { id: 1, name: "Session Reading Material fo..." },
//     { id: 2, name: "Reference Article.pdf" },
//     { id: 3, name: "Insights into Coronary.pdf" },
//   ]
// };

// // --- HELPER FUNCTION FOR BADGE LOGIC ---
// const getBadgeDetails = (dueDateStr: string) => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   const due = new Date(dueDateStr);
//   due.setHours(0, 0, 0, 0);

//   const diffTime = due.getTime() - today.getTime();
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   const formattedDate = due.toLocaleDateString('en-GB', { 
//     day: 'numeric', month: 'short', year: 'numeric' 
//   }).toUpperCase();

//   if (diffDays < 0) {
//     return { text: `OVERDUE: ${formattedDate}`, color: "bg-[#FFF0F2] text-[#E11D48]" };
//   } else if (diffDays <= 2) {
//     return { text: `DUE IN ${diffDays} DAY${diffDays > 1 ? 'S' : ''}`, color: "bg-[#FFF7ED] text-[#EA580C]" };
//   } else {
//     return { text: `DUE: ${formattedDate}`, color: "bg-[#F1F5F9] text-[#64748B]" };
//   }
// };

// export default function AssignmentSlugPage() {
//   // State to manage files and UI phases
//   const [uploadedFiles, setUploadedFiles] = useState<{id: string, file: File}[]>([]);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // --- DYNAMIC BADGE LOGIC ---
//   const badge = getBadgeDetails(ASSIGNMENT_DATA.dueDate);

//   // --- FILE UPLOAD HANDLERS ---
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files).map(file => ({
//         id: Math.random().toString(36).substr(2, 9),
//         file
//       }));
//       setUploadedFiles(prev => [...prev, ...newFiles]);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files) {
//       const newFiles = Array.from(e.dataTransfer.files).map(file => ({
//         id: Math.random().toString(36).substr(2, 9),
//         file
//       }));
//       setUploadedFiles(prev => [...prev, ...newFiles]);
//     }
//   };

//   const handleRemoveFile = (id: string) => {
//     setUploadedFiles(prev => prev.filter(f => f.id !== id));
//   };

//   const handleSubmit = () => {
//     if (uploadedFiles.length > 0) {
//       setIsSubmitted(true);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#F8F9FA] p-4 md:p-8 mt-2 font-sans">
//       <div className="max-w-[1600px] mx-auto">
        
//         {/* --- BREADCRUMBS --- */}
//         <div className="flex items-center gap-2 text-[13px] font-medium mb-6 px-2 text-gray-500">
//           <Link href="/s/sessions" className="hover:text-gray-900 transition-colors">
//             Sessions
//           </Link>
//           <ChevronRight size={14} className="text-gray-400" />
//           <span className="text-gray-500 truncate">
//             Webinar: Management of Acute Coronary Syndromes: Evidence-Based Updates
//           </span>
//         </div>

//         {/* --- MAIN GRID --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* ================= LEFT COLUMN (Col span 2) ================= */}
//           <div className="lg:col-span-2 flex flex-col gap-6">
            
//             {/* 1. Assignment Details Card */}
//             <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 md:p-8">
              
//               {/* Header Row with Dynamic Badge */}
//               <div className="flex flex-col md:flex-row md:items-start justify-start gap-4 mb-6">
//                 <h1 className="text-[22px] md:text-[24px] font-bold text-gray-900 leading-snug">
//                   {ASSIGNMENT_DATA.title}
//                 </h1>
//                 <span className={`shrink-0 ${badge.color} text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mt-1`}>
//                   {badge.text}
//                 </span>
//               </div>

//               {/* Mentor Info */}
//               <div className="flex items-center gap-3 mb-8">
//                 <img 
//                   src={ASSIGNMENT_DATA.mentor.avatar} 
//                   alt={ASSIGNMENT_DATA.mentor.name} 
//                   className="w-11 h-11 rounded-full object-cover shrink-0" 
//                 />
//                 <div>
//                   <h3 className="text-[15px] font-bold text-gray-900">
//                     {ASSIGNMENT_DATA.mentor.name}
//                   </h3>
//                   <p className="text-[13px] text-gray-500">
//                     {ASSIGNMENT_DATA.mentor.session}
//                   </p>
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
//                   DESCRIPTION
//                 </h4>
//                 <p className="text-[14px] text-gray-600 leading-[1.6]">
//                   {ASSIGNMENT_DATA.description}
//                 </p>
//               </div>

//             </div>

//             {/* 2. Submissions Card (Dynamic State) */}
//             <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 md:p-8">
              
//               <h2 className="text-[18px] font-bold text-gray-900 mb-6">
//                 {isSubmitted ? "Your Submissions" : "Upload Your Submissions Here"}
//               </h2>

//               {/* Hidden File Input */}
//               <input 
//                 type="file" 
//                 multiple 
//                 className="hidden" 
//                 ref={fileInputRef} 
//                 onChange={handleFileChange}
//                 accept=".pdf,.docx,.doc"
//               />

//               {/* State A & B: Upload Area */}
//               {!isSubmitted && (
//                 <>
//                   {/* Interactive Drag & Drop Zone */}
//                   <div 
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                     className={`border-2 border-dashed rounded-[16px] p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
//                       isDragging ? "border-[#042BFD] bg-[#EEF2FF]" : "border-[#C7D2FE] bg-white "
//                     }`}
//                   >  
//                     <div className="invisible" >Dummy</div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
//                        <img src="/images/upload.svg" alt="Upload" />
//                       </div>
//                       <div>
//                         <h4 className="text-[15px] font-bold text-gray-900 mb-1">
//                           Drag and Drop or Choose the file to be uploaded
//                         </h4>
//                         <p className="text-[13px] text-gray-500">
//                           • Only .docx, or .pdf file up to 20 MB
//                         </p>
//                       </div>
//                     </div>
//                     <button 
//                       onClick={() => fileInputRef.current?.click()}
//                       className="w-full md:w-auto bg-[#f6f8ff]    border border-[#C7D2FE] text-[#042BFD] text-[14px] font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-100 transition-colors shrink-0 shadow-sm"
//                     >
//                       Browse Files
//                     </button>
//                   </div>

//                   {/* Uploaded File List (Pre-submit) */}
//                   {uploadedFiles.length > 0 && (
//                     <div className="mt-4 flex flex-col gap-3">
//                       {uploadedFiles.map((fileObj) => (
//                         <div key={fileObj.id} className="border border-gray-200 rounded-[16px] p-4 flex items-center justify-between gap-4 bg-white">
//                           <div className="flex items-center gap-4 min-w-0">
//                             <div className="w-11 h-11 bg-[#F5F7FF] text-[#042BFD] rounded-[12px] flex items-center justify-center text-[11px] font-bold tracking-wider shrink-0 border border-[#E0E7FF]">
//                               {fileObj.file.name.endsWith('.pdf') ? 'PDF' : 'DOC'}
//                             </div>
//                             <h4 className="text-[14px] font-medium text-gray-900 truncate pr-4">
//                               {fileObj.file.name}
//                             </h4>
//                           </div>
//                           <button 
//                             onClick={() => handleRemoveFile(fileObj.id)}
//                             className="p-2 text-gray-400 hover:text-red-500 transition-colors"
//                           >
//                             <X size={18} />
//                           </button>
//                         </div>
//                       ))}

//                       {/* Submit Button */}
//                       <div className="flex justify-end mt-2">
//                         <button 
//                           onClick={handleSubmit}
//                           className="bg-[#111111] hover:bg-black text-white text-[14px] font-semibold px-8 py-3 rounded-xl transition-colors shadow-md"
//                         >
//                           Submit Assignment
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               )}

//               {/* State C: Submitted Files List */}
//               {isSubmitted && (
//                 <div className="flex flex-col gap-4">
//                   {uploadedFiles.map((fileObj) => (
//                     <div key={fileObj.id} className="border border-gray-200 rounded-[16px] p-4 flex items-center justify-between gap-4 bg-white hover:border-gray-300 transition-colors cursor-pointer">
//                       <div className="flex items-center gap-4 min-w-0">
//                         <div className="w-11 h-11 bg-[#F5F7FF] text-[#042BFD] rounded-[12px] flex items-center justify-center text-[11px] font-bold tracking-wider shrink-0 border border-[#E0E7FF]">
//                           {fileObj.file.name.endsWith('.pdf') ? 'PDF' : 'DOC'}
//                         </div>
//                         <h4 className="text-[14px] font-medium text-gray-900 truncate pr-4">
//                           {fileObj.file.name}
//                         </h4>
//                       </div>
//                       <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shrink-0">
//                         <Download size={20} strokeWidth={1.5} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//             </div>
//           </div>

//           {/* ================= RIGHT COLUMN (Col span 1) ================= */}
//           <div className="flex flex-col gap-6">
            
//             {/* 3. Resources Card */}
//             <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 md:p-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <h2 className="text-[18px] font-bold text-gray-900">Assignment Resources</h2>
//                 <span className="bg-[#F1F5F9] text-gray-600 text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
//                   {ASSIGNMENT_DATA.resources.length}
//                 </span>
//               </div>

//               <div className="flex flex-col gap-3">
//                 {ASSIGNMENT_DATA.resources.map((resource) => (
//                   <div key={resource.id} className="border border-gray-200 rounded-[16px] p-3 flex items-center justify-between gap-3 bg-white hover:border-gray-300 transition-colors cursor-pointer">
//                     <div className="flex items-center gap-3 min-w-0">
//                       <div className="w-10 h-10 bg-[#F5F7FF] text-[#042BFD] rounded-[10px] flex items-center justify-center text-[10px] font-bold tracking-wider shrink-0 border border-[#E0E7FF]">
//                         PDF
//                       </div>
//                       <h4 className="text-[13px] font-semibold text-gray-900 truncate">
//                         {resource.name}
//                       </h4>
//                     </div>
//                     <button className="text-gray-400 hover:text-gray-900 transition-colors shrink-0 pr-1">
//                       <Download size={18} strokeWidth={1.5} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* 4. Comments Card */}
//             <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col h-full">
//               <h2 className="text-[18px] font-bold text-gray-900 mb-6">Add Private Comment</h2>

//               {/* Dynamic Comments List (Only visible after submission for the mock) */}
//               <div className="flex-1 flex flex-col justify-end min-h-[100px] mb-4">
//                 {isSubmitted && (
//                   <div className="bg-[#F8FAFC] rounded-[16px] p-4 border border-gray-100">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-[13px] font-bold text-gray-900">Nikhil Kamath</span>
//                       <span className="text-[11px] text-gray-400">15 Jan 2025, 04:30 PM</span>
//                     </div>
//                     <p className="text-[13px] text-gray-600 italic leading-relaxed">
//                       This is a sample comment provided for testing purposes to gather feedback. This is a sample comment provided for testing purposes to gather feedback. comment provided testing purposes.
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Comment Input */}
//               <div className="mt-auto">
//                 <div className="relative">
//                   <input 
//                     type="text" 
//                     placeholder="Enter here" 
//                     className="w-full border border-gray-200 rounded-[14px] pl-4 pr-12 py-3.5 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#042BFD] transition-all"
//                   />
//                   <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#042BFD] transition-colors rounded-lg">
//                     <Send size={18} strokeWidth={2} />
//                   </button>
//                 </div>
//                 <p className="text-[11px] text-gray-400 mt-2.5 pl-1">
//                   Private Comment are only visible to you and your mentor
//                 </p>
//               </div>

//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ChevronRight, 
  Download, 
  UploadCloud, 
  Send,
  X,
  ArrowLeft,
  File
} from "lucide-react";
import { StudentAPI } from "@/lib/api";

// --- MOCK DATA ---
const ASSIGNMENT_DATA = {
  title: "Advanced Insights into Cardiac Arrhythmias",
  dueDate: new Date(Date.now() + 86400000 * 1).toISOString(), 
  mentor: {
    name: "Dr. Sophia Tyler",
    session: "Webinar: Breakthroughs in Cognitive Neurosciencebinar",
    avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
  },
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  resources: [
    { id: 1, name: "Pre-Session Reading Material.pdf" },
    { id: 2, name: "Reference Article.pdf" },
    { id: 3, name: "Insights into Coronary.pdf" },
  ]
};

// --- HELPER FUNCTION FOR BADGE LOGIC ---
const getBadgeDetails = (dueDateStr: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formattedDate = due.toLocaleDateString('en-GB', { 
    day: 'numeric', month: 'short', year: 'numeric' 
  }).toUpperCase();

  if (diffDays < 0) {
    return { text: `OVERDUE: ${formattedDate}`, color: "bg-[#FFF0F2] text-[#E11D48]" };
  } else if (diffDays <= 2) {
    return { text: `DUE: ${formattedDate}`, color: "bg-[#F1F5F9] text-[#64748B]" };
  } else {
    return { text: `DUE: ${formattedDate}`, color: "bg-[#F1F5F9] text-[#64748B]" };
  }
};

export default function AssignmentSlugPage() {
  const params = useParams();
  const assignmentId = String(params?.slug || "");
  const [uploadedFiles, setUploadedFiles] = useState<{id: string, file: File}[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [comment, setComment] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const badge = getBadgeDetails(ASSIGNMENT_DATA.dueDate);

  // --- FILE UPLOAD HANDLERS ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length > 0 && assignmentId) {
      setIsSubmitting(true);
      try {
        await StudentAPI.submitAssignment(assignmentId, uploadedFiles[0].file);
        setIsSubmitted(true);
      } catch {
        alert("Unable to submit assignment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSendComment = async () => {
    if (!comment.trim() || !assignmentId) return;
    try {
      await StudentAPI.addAssignmentComment({ assignmentId, comment });
      setComment("");
    } catch {
      alert("Unable to add comment. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white md:bg-[#F8F9FA] md:p-8 md:mt-2 font-sans pb-18 md:pb-8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- MOBILE HEADER --- */}
        <div className="flex md:hidden items-center gap-2 mb-2 px-4 pt-6">
          <Link href="/s/assignments" className="text-gray-900 flex items-center gap-2 font-semibold text-[16px] md:text-[18px]">
            <ArrowLeft size={20} /> Assignments
          </Link>
        </div>

        {/* --- DESKTOP BREADCRUMBS --- */}
        <div className="hidden md:flex items-center gap-2 text-[13px] font-medium mb-6 px-2 text-gray-500">
          <Link href="/s/sessions" className="hover:text-gray-900 transition-colors">
            Sessions
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-500 truncate">
            {ASSIGNMENT_DATA.mentor.session}
          </span>
        </div>

        {/* --- RESPONSIVE MAIN GRID --- 
            On Mobile: Flex Column (Order 1, 2, 3, 4)
            On Desktop: Grid with 3 columns 
        */}
        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-6 bg-white md:bg-transparent">
          
          {/* ================= 1. ASSIGNMENT DETAILS (Mobile: Top, Desktop: Left) ================= */}
          <div className="order-1 md:col-span-2 bg-white md:rounded-[24px]  *:md:shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-4 md:p-8 border-b border-gray-200 md:border-none">
            
            {/* Header Row with Dynamic Badge */}
            <div className="flex flex-col md:flex-row md:items-start justify-start gap-4 mb-5 md:mb-6">
              <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-900 leading-snug inline-block">
                {ASSIGNMENT_DATA.title}
                {/* Mobile Inline Badge */}
                <span className={`md:hidden inline-flex ml-2 align-middle ${badge.color} text-[11px] font-semibold px-2 py-1 rounded-full uppercase tracking-wider`}>
                  {badge.text}
                </span>
              </h1>
              {/* Desktop Floated Badge */}
              <span className={`hidden md:inline-flex shrink-0 ${badge.color} text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mt-1`}>
                {badge.text}
              </span>
            </div>

            {/* Mentor Info */}
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <img 
                src={ASSIGNMENT_DATA.mentor.avatar} 
                alt={ASSIGNMENT_DATA.mentor.name} 
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover shrink-0" 
              />
              <div>
                <h3 className="text-[14px] md:text-[15px] font-medium text-gray-900">
                  {ASSIGNMENT_DATA.mentor.name}
                </h3>
                <p className="text-[12px] md:text-[13px] text-gray-500 line-clamp-1 md:line-clamp-none">
                  {ASSIGNMENT_DATA.mentor.session}
                </p>
              </div>
            </div>

            {/* Description */}
            <div  >
              <h4 className="text-[12px] font-normal text-gray-500 uppercase tracking-wider mb-2 md:mb-3">
                DESCRIPTION
              </h4>
              <p className="text-[14px] md:text-[14px] text-gray-600 leading-[1.6]">
                {ASSIGNMENT_DATA.description}
              </p>
            </div>
            
          </div>

         
          {/* ================= 2. RESOURCES (Mobile: Middle, Desktop: Right Top) ================= */}
          <div className="order-2 md:col-span-1 md:col-start-3 md:row-start-1 bg-white md:rounded-[24px] md:border border-gray-100 md:shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-4 md:p-8 border-b border-gray-100 md:border-none">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <h2 className="text-[16px] md:text-[18px] font-medium text-gray-900">Assignment Resources</h2>
              <span className="bg-[#F1F5F9] text-gray-600 text-[11px] md:text-[12px] font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full">
                {ASSIGNMENT_DATA.resources.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {ASSIGNMENT_DATA.resources.map((resource) => (
                <div key={resource.id} className="border border-gray-200 rounded-[16px] p-3 flex items-center justify-between gap-3 bg-white hover:border-gray-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-[#EEF2FF] text-[#042BFD] rounded-[10px] flex items-center justify-center text-[10px] font-bold tracking-wider shrink-0 border border-[#E0E7FF]">
                      PDF
                    </div>
                    <h4 className="text-[14px] font-medium md:font-semibold text-gray-900 truncate">
                      {resource.name}
                    </h4>
                  </div>
                  <button className="text-gray-400 hover:text-gray-900 transition-colors shrink-0 pr-1">
                    <Download size={18} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ================= 3. SUBMISSIONS (Mobile: Bottom-Mid, Desktop: Left Bottom) ================= */}
          <div className="order-3 md:col-span-2 md:row-start-2 bg-white md:rounded-[24px] md:border border-gray-100 md:shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-4 md:p-8 border-b border-gray-100 md:border-none">
            
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <h2 className="text-[16px] md:text-[18px] font-semibold text-gray-900">
                {isSubmitted ? "Your Submissions" : (window?.innerWidth < 768 ? "Your submissions" : "Upload Your Submissions Here")}
              </h2>
              <span className="md:hidden bg-gray-100 text-gray-500 text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {uploadedFiles.length}
              </span>
            </div>

            {/* Hidden File Input */}
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc"
            />

            {/* State A & B: Upload Area */}
            {!isSubmitted && (
              <>
                {/* --- DESKTOP: Interactive Drag & Drop Zone --- */}
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`hidden md:flex border-2 border-dashed rounded-[16px] p-6 flex-col md:flex-row items-center justify-between gap-4 transition-all ${
                    isDragging ? "border-[#042BFD] bg-[#EEF2FF]" : "border-[#C7D2FE] bg-white "
                  }`}
                >  
                  <div className="invisible">Dummy</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                     <img src="/images/upload.svg" alt="Upload" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900 mb-1">
                        Drag and Drop or Choose the file to be uploaded
                      </h4>
                      <p className="text-[13px] text-gray-500">
                        • Only .docx, or .pdf file up to 20 MB
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full md:w-auto bg-[#f6f8ff] border border-[#C7D2FE] text-[#042BFD] text-[14px] font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-100 transition-colors shrink-0 shadow-sm"
                  >
                    Browse Files
                  </button>
                </div>

                {/* --- MOBILE: Empty State (Click to upload) --- */}
                {uploadedFiles.length === 0 && (
                  <div 
                    className="flex md:hidden flex-col items-center justify-center py-6 cursor-pointer" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <File size={32} strokeWidth={1} className="text-gray-300 mb-2" />
                    <p className="text-[12px] text-gray-500">All your submissions will appear here</p>
                  </div>
                )}

                {/* Uploaded File List (Pre-submit) */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-2 md:mt-4 flex flex-col gap-3">
                    {uploadedFiles.map((fileObj) => (
                      <div key={fileObj.id} className="border border-gray-200 rounded-[16px] p-4 flex items-center justify-between gap-4 bg-white">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-11 h-11 bg-[#EEF2FF] text-[#042BFD] rounded-[12px] flex items-center justify-center text-[11px] font-bold tracking-wider shrink-0 border border-[#E0E7FF]">
                            {fileObj.file.name.endsWith('.pdf') ? 'PDF' : 'DOC'}
                          </div>
                          <h4 className="text-[14px] md:text-[14px] font-medium text-gray-900 truncate pr-4">
                            {fileObj.file.name}
                          </h4>
                        </div>
                        <button 
                          onClick={() => handleRemoveFile(fileObj.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}

                    {/* Desktop Submit Button */}
                    <div className="hidden md:flex justify-end mt-2">
                      <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-[#111111] hover:bg-black text-white text-[14px] font-semibold px-8 py-3 rounded-xl transition-colors shadow-md"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Assignment"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* State C: Submitted Files List */}
            {isSubmitted && (
              <div className="flex flex-col gap-3 md:gap-4">
                {uploadedFiles.map((fileObj) => (
                  <div key={fileObj.id} className="border border-gray-200 rounded-[16px] p-4 flex items-center justify-between gap-4 bg-white hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 bg-[#EEF2FF] text-[#042BFD] rounded-[12px] flex items-center justify-center text-[11px] font-bold tracking-wider shrink-0 border border-[#E0E7FF]">
                        {fileObj.file.name.endsWith('.pdf') ? 'PDF' : 'DOC'}
                      </div>
                      <h4 className="text-[13px] md:text-[14px] font-medium text-gray-900 truncate pr-4">
                        {fileObj.file.name}
                      </h4>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shrink-0">
                      <Download size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= 4. COMMENTS & MOBILE SUBMIT (Mobile: Bottom, Desktop: Right Bottom) ================= */}
          <div className="order-4 md:col-span-1 md:col-start-3 md:row-start-2 bg-white md:rounded-[24px] md:border border-gray-100 md:shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-4 md:p-8 flex flex-col h-full">
            <h2 className="text-[16px] md:text-[18px] font-medium text-gray-900 mb-4 md:mb-6">Add Private Comment</h2>

            {/* Dynamic Comments List (Only visible after submission for the mock) */}
            <div className="flex-1 hidden md:flex flex-col justify-end min-h-[50px] md:min-h-[100px] mb-4">
              {isSubmitted && (
                <div className="bg-[#F8FAFC] rounded-[16px] p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[13px] font-bold text-gray-900">Natalia</span>
                    <span className="text-[11px] text-gray-400">Just now</span>
                  </div>
                  <p className="text-[14px] text-gray-600 italic leading-relaxed">
                    Submitted my assignment successfully. Let me know if revisions are needed.
                  </p>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div className="mt-auto mb-2 md:mb-0">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter here" 
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSendComment()}
                  className="w-full border border-gray-200 rounded-[14px] pl-4 pr-12 py-3 md:py-3.5 text-[13px] md:text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#042BFD] transition-all"
                />
                <button onClick={handleSendComment} className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#042BFD] transition-colors rounded-lg">
                  <Send size={18} strokeWidth={2} />
                </button>
              </div>
              <p className="text-[12px] md:text-[11px] text-gray-400 mt-2 pl-1">
                Private Comment are only visible to you and your mentor
              </p>
            </div>
            
            {/* --- MOBILE SUBMIT BUTTON (Hidden on Desktop) --- */}
            {!isSubmitted && (
              <div className="md:hidden mt-6 w-full">
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] hover:bg-black text-white text-[18px] font-normal py-3.5 rounded-xl transition-colors shadow-md"
                >
                  {isSubmitting ? "Submitting..." : "Submit Assignment"}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
