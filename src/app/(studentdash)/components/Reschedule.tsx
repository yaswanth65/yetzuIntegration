// "use client";

// import React, { useState } from "react";
// import { Calendar, Clock, X, Monitor } from "lucide-react";
// import { StudentAPI } from "@/lib/api";

// interface RescheduleModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   courseId?: string;
// }

// // Mock Data localized to this component as requested
// const SESSION_DATA = {
//   title: "Research Methodology Session",
//   mentor: {
//     name: "Pradhyumn Dhondi",
//   },
//   stats: {
//     date: "2026-02-11",
//     time: "10:30 - 11:30",
//   }
// };

// const MOCK_TIME_SLOTS = [
//   { id: 1, date: "Feb 13, 2026", time: "10:00 AM - 11:00 AM" },
//   { id: 2, date: "Feb 13, 2026", time: "02:00 PM - 03:00 PM" },
//   { id: 3, date: "Feb 14, 2026", time: "11:00 AM - 12:00 PM" },
//   { id: 4, date: "Feb 13, 2026", time: "03:30 PM - 04:30 PM" },
//   { id: 5, date: "Feb 14, 2026", time: "10:30 AM - 11:30 PM" },
// ];

// export default function RescheduleModal({ isOpen, onClose, courseId }: RescheduleModalProps) {
//   const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
//   const [reason, setReason] = useState("");
//   const [additionalMessage, setAdditionalMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   if (!isOpen) return null;

//   const toggleSlot = (id: number) => {
//     setSelectedSlots((prev) => 
//       prev.includes(id) ? prev.filter((slotId) => slotId !== id) : [...prev, id]
//     );
//   };

//   const handleConfirm = async () => {
//     if (!reason.trim() || selectedSlots.length === 0) {
//       alert("Please provide a reason and select at least one alternative time slot.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("token") || "";
//       const userId = localStorage.getItem("userId") || "";
//       const targetCourseId = courseId || "a21abe85-019f-426e-ba37-a942c2d39849";

//       // Grab the first selected slot to build the proposed date
//       const selectedSlot = MOCK_TIME_SLOTS.find(s => s.id === selectedSlots[0]);
//       let proposedDateIso = new Date().toISOString();

//       if (selectedSlot) {
//         const timeStart = selectedSlot.time.split(" - ")[0]; 
//         const dateString = `${selectedSlot.date} ${timeStart}`;
//         proposedDateIso = new Date(dateString).toISOString();
//       }

//       const combinedReason = additionalMessage.trim() 
//         ? `${reason}\n\nAdditional Message: ${additionalMessage}`
//         : reason;

//       await StudentAPI.rescheduleCourse(token, userId, {
//         courseId: targetCourseId,
//         reason: combinedReason,
//         proposedDate: proposedDateIso
//       });

//       // Reset form and close
//       setReason("");
//       setAdditionalMessage("");
//       setSelectedSlots([]);
//       onClose();
//     } catch (error) {
//       console.error("Failed to submit reschedule request:", error);
//       alert("An error occurred while submitting your request. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex justify-end font-sans">
      
//       {/* Overlay (makes the rest of the screen dull) */}
//       <div 
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
//         onClick={onClose}
//       ></div>
      
//       {/* Slide-over Content */}
//       <div className="relative bg-white w-full max-w-[480px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
//         <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          
//           {/* Header Icon & Close */}
//           <div className="flex justify-between items-start mb-6">
//             <div className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
//               <Monitor size={20} className="text-gray-700" />
//             </div>
//             <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 transition-colors -mr-2">
//               <X size={22} strokeWidth={1.5} />
//             </button>
//           </div>

//           <h2 className="text-[22px] font-bold text-gray-900 mb-6">Reschedule Session</h2>

//           {/* Current Session Box */}
//           <div className="bg-[#F8FAFC] border border-gray-100 rounded-[12px] p-5 mb-8">
//             <p className="text-[12px] text-gray-500 mb-2 font-medium">Current Session</p>
//             <h3 className="text-[16px] font-bold text-gray-900 mb-2.5 leading-snug">
//               {SESSION_DATA.title}
//             </h3>
//             <div className="flex items-center gap-4 text-[13px] text-gray-700 mb-2">
//               <div className="flex items-center gap-1.5">
//                 <Calendar size={14} className="text-gray-500"/> {SESSION_DATA.stats.date}
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <Clock size={14} className="text-gray-500"/> {SESSION_DATA.stats.time}
//               </div>
//             </div>
//             <p className="text-[13px] text-gray-500">with {SESSION_DATA.mentor.name}</p>
//           </div>

//           {/* Reason Textarea */}
//           <div className="mb-8">
//             <label className="block text-[13px] font-bold text-gray-900 mb-3">
//               Reason for Rescheduling <span className="text-red-500">*</span>
//             </label>
//             <textarea 
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="w-full border border-gray-200 rounded-[12px] p-4 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20 focus:border-[#042BFD] min-h-[110px] resize-none transition-all"
//               placeholder="Please provide a brief explanation for the student..."
//             ></textarea>
//           </div>

//           {/* Suggest Alternative Times Grid */}
//           <div className="mb-8">
//             <label className="block text-[13px] font-bold text-gray-900 mb-3">
//               Suggest Alternative Times <span className="text-red-500">*</span>
//             </label>
//             <div className="grid grid-cols-2 gap-3 mb-3">
//               {MOCK_TIME_SLOTS.map((slot) => {
//                 const isSelected = selectedSlots.includes(slot.id);
//                 return (
//                   <div 
//                     key={slot.id}
//                     onClick={() => toggleSlot(slot.id)}
//                     className={`border rounded-[12px] p-3.5 cursor-pointer transition-all ${
//                       isSelected 
//                         ? 'border-[#042BFD] bg-[#F5F6FF]' 
//                         : 'border-gray-200 hover:border-[#042BFD] hover:bg-[#F5F6FF]/50'
//                     }`}
//                   >
//                     <p className={`text-[14px] font-bold mb-1.5 ${isSelected ? 'text-[#042BFD]' : 'text-gray-900'}`}>
//                       {slot.date}
//                     </p>
//                     <p className={`text-[13px] ${isSelected ? 'text-[#042BFD]/80 font-medium' : 'text-gray-500'}`}>
//                       {slot.time}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//             <p className="text-[13px] text-gray-500">Select one or more time slots to offer the student</p>
//           </div>

//           {/* Additional Message Textarea */}
//           <div className="mb-4">
//             <label className="block text-[13px] font-bold text-gray-900 mb-3">
//               Additional Message (Optional)
//             </label>
//             <textarea 
//               value={additionalMessage}
//               onChange={(e) => setAdditionalMessage(e.target.value)}
//               className="w-full border border-gray-200 rounded-[12px] p-4 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20 focus:border-[#042BFD] min-h-[100px] resize-none transition-all"
//               placeholder="Add any additional context for the student..."
//             ></textarea>
//           </div>

//         </div>

//         {/* Footer Buttons */}
//         <div className="p-6 md:p-8 flex items-center gap-4 border-t border-gray-100 bg-white shrink-0">
//           <button 
//             onClick={onClose}
//             disabled={isSubmitting}
//             className="flex-1 py-3.5 border border-gray-200 rounded-[10px] text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={handleConfirm}
//             disabled={isSubmitting}
//             className="flex-1 py-3.5 bg-[#042BFD] rounded-[10px] text-[14px] font-bold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
//           >
//             {isSubmitting ? "Submitting..." : "Confirm"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import { Calendar, Clock, X, Monitor } from "lucide-react";
// import { StudentAPI } from "@/lib/api";

// interface RescheduleModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   courseId?: string;
//   sessionTitle?: string;
//   sessionDate?: string;
//   sessionTime?: string;
//   mentorName?: string;
// }

// // Keeping fallback mock data for slots since the API doesn't provide them yet
// const MOCK_TIME_SLOTS = [
//   { id: 1, date: "Feb 13, 2026", time: "10:00 AM - 11:00 AM" },
//   { id: 2, date: "Feb 13, 2026", time: "02:00 PM - 03:00 PM" },
//   { id: 3, date: "Feb 14, 2026", time: "11:00 AM - 12:00 PM" },
//   { id: 4, date: "Feb 13, 2026", time: "03:30 PM - 04:30 PM" },
//   { id: 5, date: "Feb 14, 2026", time: "10:30 AM - 11:30 PM" },
// ];

// export default function RescheduleModal({ 
//   isOpen, 
//   onClose, 
//   courseId,
//   sessionTitle = "Research Methodology Session",
//   sessionDate = "2026-02-11",
//   sessionTime = "10:30 - 11:30",
//   mentorName = "Pradhyumn Dhondi" 
// }: RescheduleModalProps) {
//   const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
//   const [reason, setReason] = useState("");
//   const [additionalMessage, setAdditionalMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Swipe-to-close logic for mobile
//   const [touchY, setTouchY] = useState(0);
//   const [touchEndY, setTouchEndY] = useState(0);

//   if (!isOpen) return null;

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchY(e.touches[0].clientY);
//     setTouchEndY(e.touches[0].clientY);
//   };
  
//   const handleTouchMove = (e: React.TouchEvent) => {
//     setTouchEndY(e.touches[0].clientY);
//   };
  
//   const handleTouchEnd = () => {
//     // If swiped down by more than 70px, close the modal
//     if (touchEndY > touchY + 70) {
//       onClose(); 
//     }
//   };

//   const toggleSlot = (id: number) => {
//     setSelectedSlots((prev) => 
//       prev.includes(id) ? prev.filter((slotId) => slotId !== id) : [...prev, id]
//     );
//   };

//   const handleConfirm = async () => {
//     if (!reason.trim() || selectedSlots.length === 0) {
//       alert("Please provide a reason and select at least one alternative time slot.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("token") || "";
//       const userId = localStorage.getItem("userId") || "";
//       const targetCourseId = courseId || "a21abe85-019f-426e-ba37-a942c2d39849";

//       // Grab the first selected slot to build the proposed date
//       const selectedSlot = MOCK_TIME_SLOTS.find(s => s.id === selectedSlots[0]);
//       let proposedDateIso = new Date().toISOString();

//       if (selectedSlot) {
//         const timeStart = selectedSlot.time.split(" - ")[0]; 
//         const dateString = `${selectedSlot.date} ${timeStart}`;
//         proposedDateIso = new Date(dateString).toISOString();
//       }

//       const combinedReason = additionalMessage.trim() 
//         ? `${reason}\n\nAdditional Message: ${additionalMessage}`
//         : reason;

//       await StudentAPI.rescheduleCourse(token, userId, {
//         courseId: targetCourseId,
//         reason: combinedReason,
//         proposedDate: proposedDateIso
//       });

//       // Reset form and close
//       setReason("");
//       setAdditionalMessage("");
//       setSelectedSlots([]);
//       onClose();
//     } catch (error) {
//       console.error("Failed to submit reschedule request:", error);
//       alert("An error occurred while submitting your request. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex justify-end font-sans">
      
//       {/* Overlay (Click to close) */}
//       <div 
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
//         onClick={onClose}
//       ></div>
      
//       {/* Slide-over Content 
//           Mobile: Bottom Sheet (sliding up from bottom, rounded top, 90vh)
//           Desktop: Right drawer (sliding from right, full height, 480px width)
//       */}
//       <div 
//         className="fixed z-[101] bottom-0 left-0 w-full h-[90vh] bg-white rounded-t-[24px] md:relative md:rounded-none md:h-full md:w-full md:max-w-[480px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-full md:slide-in-from-right duration-300"
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
        
//         {/* Mobile Drag Handle (Hidden on Desktop) */}
//         <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-3 mb-1 md:hidden shrink-0" />
        
//         {/* Scrollable Form Content */}
//         <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
          
//           {/* Header Icon & Desktop Close Button */}
//           <div className="flex justify-between items-start mb-4 md:mb-6">
//             <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
//               <Monitor size={20} className="text-gray-700" />
//             </div>
//             <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 transition-colors -mr-2 hidden md:block shrink-0">
//               <X size={22} strokeWidth={1.5} />
//             </button>
//           </div>

//           <h2 className="text-[18px] md:text-[22px] font-bold text-gray-900 mb-5 md:mb-6">Reschedule Session</h2>

//           {/* Current Session Box */}
//           <div className="bg-[#F9FAFB] border border-gray-100 rounded-[12px] p-4 md:p-5 mb-6 md:mb-8">
//             <p className="text-[12px] text-gray-500 mb-1.5 md:mb-2 font-medium">Current Session</p>
//             <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 mb-2.5 leading-snug">
//               {sessionTitle}
//             </h3>
//             <div className="flex items-center gap-3 md:gap-4 text-[12px] md:text-[13px] text-gray-700 mb-2">
//               <div className="flex items-center gap-1.5 shrink-0">
//                 <Calendar size={14} className="text-gray-500"/> {sessionDate}
//               </div>
//               <div className="flex items-center gap-1.5 shrink-0">
//                 <Clock size={14} className="text-gray-500"/> {sessionTime}
//               </div>
//             </div>
//             <p className="text-[12px] md:text-[13px] text-gray-500 truncate">with {mentorName}</p>
//           </div>

//           {/* Reason Textarea */}
//           <div className="mb-6 md:mb-8">
//             <label className="block text-[13px] font-bold text-gray-900 mb-2.5">
//               Reason for Rescheduling <span className="text-gray-900">*</span>
//             </label>
//             <textarea 
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="w-full border border-gray-200 rounded-[12px] p-4 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20 focus:border-[#042BFD] min-h-[110px] resize-none transition-all"
//               placeholder="Please provide a brief explanation for the student..."
//             ></textarea>
//           </div>

//           {/* Suggest Alternative Times Grid */}
//           <div className="mb-6 md:mb-8">
//             <label className="block text-[13px] font-bold text-gray-900 mb-2.5">
//               Suggest Alternative Times <span className="text-gray-900">*</span>
//             </label>
            
//             {/* Mobile: 1 Column | Desktop: 2 Columns */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2.5">
//               {MOCK_TIME_SLOTS.map((slot) => {
//                 const isSelected = selectedSlots.includes(slot.id);
//                 return (
//                   <div 
//                     key={slot.id}
//                     onClick={() => toggleSlot(slot.id)}
//                     className={`border rounded-[12px] p-3.5 cursor-pointer transition-all ${
//                       isSelected 
//                         ? 'border-[#042BFD] bg-[#F5F6FF]' 
//                         : 'border-gray-200 hover:border-[#042BFD] hover:bg-[#F5F6FF]/50'
//                     }`}
//                   >
//                     <p className={`text-[13px] md:text-[14px] font-bold mb-1 ${isSelected ? 'text-[#042BFD]' : 'text-gray-900'}`}>
//                       {slot.date}
//                     </p>
//                     <p className={`text-[12px] md:text-[13px] ${isSelected ? 'text-[#042BFD]/80 font-medium' : 'text-gray-500'}`}>
//                       {slot.time}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//             <p className="text-[12px] md:text-[13px] text-gray-500">Select one or more time slots to offer the student</p>
//           </div>

//           {/* Additional Message Textarea */}
//           <div className="mb-4">
//             <label className="block text-[13px] font-bold text-gray-900 mb-2.5">
//               Additional Message (Optional)
//             </label>
//             <textarea 
//               value={additionalMessage}
//               onChange={(e) => setAdditionalMessage(e.target.value)}
//               className="w-full border border-gray-200 rounded-[12px] p-4 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20 focus:border-[#042BFD] min-h-[90px] md:min-h-[100px] resize-none transition-all"
//               placeholder="Add any additional context for the student..."
//             ></textarea>
//           </div>

//         </div>

//         {/* Footer Buttons */}
//         <div className="p-5 md:p-8 flex items-center gap-3 md:gap-4 border-t border-gray-100 bg-white shrink-0 pb-safe">
//           <button 
//             onClick={onClose}
//             disabled={isSubmitting}
//             className="flex-1 py-3 md:py-3.5 border border-gray-200 bg-white rounded-[10px] text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={handleConfirm}
//             disabled={isSubmitting}
//             className="flex-1 py-3 md:py-3.5 bg-[#042BFD] rounded-[10px] text-[14px] font-bold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
//           >
//             {isSubmitting ? "Submitting..." : "Confirm"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, Clock, X, Monitor } from "lucide-react";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId?: string;
  sessionTitle?: string;
  sessionDate?: string;
  sessionTime?: string;
  mentorName?: string;
}

const MOCK_TIME_SLOTS = [
  { id: 1, date: "Feb 13, 2026", time: "10:00 AM - 11:00 AM" },
  { id: 2, date: "Feb 13, 2026", time: "02:00 PM - 03:00 PM" },
  { id: 3, date: "Feb 14, 2026", time: "11:00 AM - 12:00 PM" },
  { id: 4, date: "Feb 13, 2026", time: "03:30 PM - 04:30 PM" },
  { id: 5, date: "Feb 14, 2026", time: "10:30 AM - 11:30 AM" },
];

export default function RescheduleModal({
  isOpen,
  onClose,
  courseId,
  sessionTitle = "Research Methodology Session",
  sessionDate = "2026-02-11",
  sessionTime = "10:30 - 11:30",
  mentorName = "Pradhyumn Dhondi",
}: RescheduleModalProps) {
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [reason, setReason] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Swipe-to-close using refs (not state) for reliable sync reads ---
  const touchStartY = useRef<number>(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const currentTranslate = useRef(0);

  // Reset transform when modal opens
  useEffect(() => {
    if (isOpen && sheetRef.current) {
      sheetRef.current.style.transform = "translateY(0)";
      sheetRef.current.style.transition = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    currentTranslate.current = 0;
    isDragging.current = true;
    if (sheetRef.current) {
      // Remove transition during drag for instant follow
      sheetRef.current.style.transition = "none";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    // Only allow downward drag
    if (delta < 0) return;
    currentTranslate.current = delta;
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    const dragDistance = currentTranslate.current;

    if (sheetRef.current) {
      if (dragDistance > 100) {
        // Animate sheet sliding out, then close
        sheetRef.current.style.transition = "transform 0.3s ease";
        sheetRef.current.style.transform = "translateY(100%)";
        setTimeout(() => {
          onClose();
        }, 280);
      } else {
        // Snap back to original position
        sheetRef.current.style.transition = "transform 0.3s ease";
        sheetRef.current.style.transform = "translateY(0)";
      }
    }
    currentTranslate.current = 0;
  };

  const toggleSlot = (id: number) => {
    setSelectedSlots((prev) =>
      prev.includes(id) ? prev.filter((slotId) => slotId !== id) : [...prev, id]
    );
  };

  const handleConfirm = async () => {
    if (!reason.trim() || selectedSlots.length === 0) {
      alert("Please provide a reason and select at least one alternative time slot.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // mock delay
      setReason("");
      setAdditionalMessage("");
      setSelectedSlots([]);
      onClose();
    } catch (error) {
      console.error("Failed to submit reschedule request:", error);
      alert("An error occurred while submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/*
        Mobile: bottom sheet — fixed, slides up from bottom, 90vh, rounded top
        Desktop: right drawer — relative to flex container, full height, 480px wide
      */}
      <div
        ref={sheetRef}
        className="
          fixed bottom-0 left-0 w-full h-[92vh] bg-white rounded-t-[24px] z-[101]
          shadow-2xl flex flex-col
          animate-in slide-in-from-bottom duration-300
          md:relative md:rounded-none md:h-full md:w-full md:max-w-[480px]
          md:animate-in md:slide-in-from-right md:duration-300
        "
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle — mobile only */}
        <div className="shrink-0 flex justify-center pt-3 pb-1 md:hidden touch-none">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 md:px-8 md:py-8">

          {/* Header row */}
          <div className="flex justify-between items-start mb-5">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
              <Monitor size={20} className="text-gray-700" />
            </div>
            <button
              onClick={onClose}
              className="hidden md:flex p-1 text-gray-400 hover:text-gray-900 transition-colors -mr-1"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <h2 className="text-[18px] md:text-[22px] font-semibold text-gray-900 mb-5">
            Reschedule Session
          </h2>

          {/* Current session box */}
          <div className="bg-[#F9FAFB] border border-gray-100 rounded-[14px] p-4 mb-6">
            <p className="text-[14px] text-gray-400 mb-1.5 font-semibold uppercase tracking-wide">
              Current Session
            </p>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2.5 leading-snug">
              {sessionTitle}
            </h3>
            <div className="flex items-center gap-4 text-[14px] text-gray-600 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-gray-400" />
                <span>{sessionDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-gray-400" />
                <span>{sessionTime}</span>
              </div>
            </div>
            <p className="text-[12px] text-gray-500">with {mentorName}</p>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium text-gray-900 mb-2">
              Reason for Rescheduling <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20 focus:border-[#042BFD] resize-none transition-all"
              placeholder="Please provide a brief explanation for the student..."
            />
          </div>

          {/* Time slots */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium text-gray-900 mb-2">
              Suggest Alternative Times <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-2">
              {MOCK_TIME_SLOTS.map((slot) => {
                const isSelected = selectedSlots.includes(slot.id);
                return (
                  <div
                    key={slot.id}
                    onClick={() => toggleSlot(slot.id)}
                    className={`border rounded-[12px] px-4 py-3 cursor-pointer transition-all select-none ${
                      isSelected
                        ? "border-[#042BFD] bg-[#F0F2FF]"
                        : "border-gray-200 bg-white hover:border-[#042BFD]/40 hover:bg-[#F5F6FF]/50"
                    }`}
                  >
                    <p
                      className={`text-[16px] font-semibold mb-0.5 ${
                        isSelected ? "text-[#042BFD]" : "text-gray-900"
                      }`}
                    >
                      {slot.date}
                    </p>
                    <p
                      className={`text-[14px] ${
                        isSelected ? "text-[#042BFD]/70 font-medium" : "text-gray-500"
                      }`}
                    >
                      {slot.time}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-[14px] text-gray-400">
              Select one or more time slots to offer the student
            </p>
          </div>

          {/* Additional message */}
          <div className="mb-2">
            <label className="block text-[14px] font-medium text-gray-900 mb-2">
              Additional Message{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={additionalMessage}
              onChange={(e) => setAdditionalMessage(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20 focus:border-[#042BFD] resize-none transition-all"
              placeholder="Add any additional context for the student..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-4 md:px-8 md:py-6 border-t border-gray-100 bg-white flex gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-3 border border-gray-200 rounded-[10px] text-[14px] font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-[#042BFD] rounded-[10px] text-[14px] font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}