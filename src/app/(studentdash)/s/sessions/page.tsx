"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Clock, 
  ArrowRight, 
  MoreVertical, 
  Send 
} from "lucide-react";
import { ASSIGNMENTS_DATA } from "../../constants";

// --- MOCK DATA ---
const MENTORSHIP_COURSE_DATA = {
  id: "mentorship-1",
  banner: {
    title: "Welcome Alan!",
    text: "Track your progress, connect with your mentor, and achieve your goals."
  },
  courseDetails: {
    title: "Human Anatomy & Physiology",
    description: [
      "Human Anatomy & Physiology forms the foundation of medical science, focusing on the structure and function of the human body. This course provides a system-wise understanding of organs, tissues, and cells, helping students visualize how the human body is organized and how each component contributes to normal physiological function.",
      "Through detailed explanations, diagrams, and clinically relevant examples, students will learn to correlate anatomical structures with physiological processes. Emphasis is placed on key systems including musculoskeletal, cardiovascular, respiratory, nervous, and endocrine systems.",
      "Designed for medical students, this course integrates clinical correlations, case-based discussions, and exam-oriented content."
    ]
  },
  modules: [
    { id: 1, title: "Introduction to Anatomy & Physiology", desc: "Understand the basic concepts of human anatomy and physiology, including anatomical terminology, body planes, levels." },
    { id: 2, title: "Musculoskeletal System", desc: "Study the structure and function of bones, joints, and muscles. Learn about movements, muscle contractions, and clinical correlations." },
    { id: 3, title: "Cardiovascular System", desc: "Explore the anatomy of the heart and blood vessels along with the physiology of blood circulation. Emphasis is placed on cardiac cycle." },
    { id: 4, title: "Respiratory System", desc: "Learn the structure of the respiratory tract and the physiology of breathing. This chapter covers gas exchange, regulation of respiration." },
    { id: 5, title: "Nervous System", desc: "Understand the organization and function of the central and peripheral nervous systems. Topics include neurons, nerve impulses, brain." }
  ],
  assignments: [
    { id: "123456", title: "Anatomy Basics Quiz", date: "14-01-2026" },
    { id: "123457", title: "Bone Structure Diagram", date: "18-01-2026" },
    { id: "123458", title: "Heart Dissection Report", date: "22-01-2026" },
    { id: "123459", title: "Neuron Function Analysis", date: "25-01-2026" },
    { id: "123460", title: "Respiratory Volume Chart", date: "28-01-2026" },
  ],
  mentor: {
    name: "Dr. Amit Ahuja",
    role: "Human Anatomy & Physiology Specialist",
    image: "https://picsum.photos/60/60?random=100"
  },
  sideCard: {
    title: "The Trending AI Skills In The Medical Industry",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "23-10-26",
    time: "10:30AM - 11:30AM",
    image: "/Images/embryology-hero.jpg",
    participants: 4
  }
};

export default function MySessionsPage() {
  const [activeTab, setActiveTab] = useState<"Webinar" | "Mentorship">("Webinar");
  const router = useRouter();

  // Logic for empty states
  const hasWebinars = ASSIGNMENTS_DATA && ASSIGNMENTS_DATA.length > 0;
  const hasMentorship = true; // Toggle to false to see Empty State

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] p-2 md:p-4 font-['Inter']">
      
      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setActiveTab("Webinar")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "Webinar"
              ? "bg-[#042BFD] text-white shadow-md shadow-blue-200"
              : "bg-white text-gray-500 hover:text-gray-900 border border-transparent hover:border-gray-200"
          }`}
        >
          Webinar
        </button>
        <button
          onClick={() => setActiveTab("Mentorship")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "Mentorship"
              ? "bg-[#042BFD] text-white shadow-md shadow-blue-200"
              : "bg-white text-gray-500 hover:text-gray-900 border border-transparent hover:border-gray-200"
          }`}
        >
          Mentorship
        </button>
      </div>

      <div className="w-full">
        
        {/* ================= WEBINAR TAB ================= */}
        {activeTab === "Webinar" && (
          hasWebinars ? (
            <div className="flex flex-col gap-6">
              {ASSIGNMENTS_DATA.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-gray-200 rounded-[20px] p-6 flex flex-col-reverse md:flex-row gap-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center -space-x-2 mb-4">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                         ))}
                         <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-xs font-bold text-[#042BFD]">
                           +4
                         </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {item.webinar.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 font-medium mb-6">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span>{item.webinar.date}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span>{item.webinar.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-auto">
                      <button className="bg-[#042BFD] text-white text-sm font-medium px-8 py-2.5 rounded-lg shadow-md shadow-blue-500/20 hover:bg-[#0325D7] transition-colors">
                        Join
                      </button>
                      <button 
                        onClick={() => router.push(`/s/assignments/${item.slug}`)}
                        className="bg-white border border-gray-300 text-gray-600 text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 hover:text-[#021165] hover:border-[#021165] transition-all flex items-center gap-2"
                      >
                        View More <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-[350px] h-48 md:h-[220px] shrink-0 relative rounded-xl overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.webinar.heroImage} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState type="Webinar" />
          )
        )}

        {/* ================= MENTORSHIP TAB ================= */}
        {activeTab === "Mentorship" && (
          hasMentorship ? (
            // FIX: added 'items-start' to make sticky work
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Main Content (Scrolls naturally with the page) */}
              <div className="flex-1 flex flex-col gap-8 w-full min-w-0">
                
                {/* 1. SEPARATE BLUE BANNER */}
                <div className="bg-[#042BFD] rounded-[20px] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-lg shadow-blue-200 w-full">
                   <div className="relative z-10 max-w-lg">
                     <div className="flex items-center gap-2 mb-2">
                       <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                       <div className="w-2 h-2 bg-white rounded-full opacity-100"></div>
                     </div>
                     <h2 className="text-2xl font-bold mb-2">{MENTORSHIP_COURSE_DATA.banner.title}</h2>
                     <p className="text-sm text-blue-100 leading-relaxed">
                       {MENTORSHIP_COURSE_DATA.banner.text}
                     </p>
                   </div>
                   <div className="hidden md:block w-32 h-32 relative">
                      <div className="absolute right-0 bottom-[-20px] text-6xl">🎓</div>
                   </div>
                </div>

                {/* 2. MAIN CONTENT CARD (Description + Modules + Assignments) */}
                <div className="bg-white rounded-[20px] p-8 border border-gray-200 shadow-sm w-full">
                  
                  {/* --- Section A: Description --- */}
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-[#021165] mb-4">{MENTORSHIP_COURSE_DATA.courseDetails.title}</h3>
                    <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-justify">
                      {MENTORSHIP_COURSE_DATA.courseDetails.description.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-100 mb-10" />

                  {/* --- Section B: Modules (Standalone Points, No Lines) --- */}
                  <div className="mb-10">
                     <div className="flex flex-col gap-4">
                        {MENTORSHIP_COURSE_DATA.modules?.map((mod) => (
                          <div key={mod.id} className="bg-[#F9FAFB] rounded-xl p-5 border border-gray-100 flex gap-5 items-start">
                            {/* Number Badge - Standalone */}
                            <div className="shrink-0">
                              <div className="w-10 h-10 rounded-full bg-[#042BFD] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                {String(mod.id).padStart(2, '0')}
                              </div>
                            </div>
                            {/* Text */}
                            <div>
                              <h4 className="text-base font-bold text-[#021165] mb-1">{mod.title}</h4>
                              <p className="text-sm text-gray-500 leading-relaxed">
                                {mod.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-100 mb-10" />

                  {/* --- Section C: Assignments Table --- */}
                  <div>
                    <h3 className="text-lg font-bold text-[#021165] mb-6">Assignments</h3>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      {MENTORSHIP_COURSE_DATA.assignments?.map((assign, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group cursor-pointer">
                           <div className="flex items-center gap-4 md:gap-8">
                             <span className="text-sm text-gray-400 font-medium w-20">{assign.id}</span>
                             <span className="text-sm text-gray-800 font-semibold group-hover:text-[#042BFD] transition-colors">{assign.title}</span>
                           </div>
                           <div className="flex items-center gap-6">
                             <span className="text-sm text-gray-500 hidden sm:block">{assign.date}</span>
                             <button className="p-2 hover:bg-gray-100 rounded-full">
                               <MoreVertical size={16} className="text-gray-400" />
                             </button>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Sidebar (STICKY Behavior) */}
              {/* FIX: added 'sticky top-8' to prevent scrolling with main content */}
              <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6 sticky top-8 h-fit">
                
                {/* Mentor Card */}
                <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
                   <div className="flex items-center gap-4 mb-5">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img 
                       src={MENTORSHIP_COURSE_DATA.mentor.image} 
                       alt="Mentor" 
                       className="w-14 h-14 rounded-full object-cover border border-gray-200"
                     />
                     <div>
                       <h4 className="font-bold text-[#021165] text-base">{MENTORSHIP_COURSE_DATA.mentor.name}</h4>
                       <p className="text-xs text-gray-500 leading-tight mt-1">
                         {MENTORSHIP_COURSE_DATA.mentor.role}
                       </p>
                     </div>
                   </div>
                   
                   <div className="relative">
                     <input 
                       type="text" 
                       placeholder="Chat with your Mentor" 
                       className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#042BFD] focus:ring-1 focus:ring-[#042BFD] transition-all"
                     />
                     <Send size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#042BFD] cursor-pointer" />
                   </div>
                </div>

                {/* Side Promo Card */}
                <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                   <div className="h-40 bg-gray-200 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={MENTORSHIP_COURSE_DATA.sideCard.image} 
                        alt="Course"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-[#042BFD]">
                        +{MENTORSHIP_COURSE_DATA.sideCard.participants}
                      </div>
                   </div>
                   <div className="p-5">
                     <h4 className="font-bold text-[#021165] mb-2 text-base leading-tight">
                        {MENTORSHIP_COURSE_DATA.sideCard.title}
                     </h4>
                     <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                       {MENTORSHIP_COURSE_DATA.sideCard.description}
                     </p>
                     <div className="flex items-center text-[10px] text-gray-400 mb-5 font-medium">
                       <Clock size={12} className="mr-1.5" />
                       <span>{MENTORSHIP_COURSE_DATA.sideCard.date}</span>
                       <span className="mx-2">|</span>
                       <span>{MENTORSHIP_COURSE_DATA.sideCard.time}</span>
                     </div>
                     <button className="w-full bg-[#042BFD] text-white py-2.5 rounded-lg text-xs font-bold hover:bg-[#0325D7] transition-colors shadow-md shadow-blue-100">
                       Join
                     </button>
                   </div>
                </div>

              </div>
            </div>
          ) : (
            <EmptyState type="Mentorship" />
          )
        )}
      </div>
    </div>
  );
}

// --- EMPTY STATE COMPONENT ---
function EmptyState({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
      
      {/* Watermark Image Container */}
      <div className="mb-6 relative w-64 h-64 flex items-center justify-center">
         {/* Using the specific image requested */}
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img 
            src="/Images/no_webinars_watermark.png" 
            alt="No Sessions" 
            className="w-full h-full object-contain opacity-90"
         />
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">No {type}</h2>
      <p className="text-sm text-gray-500 mb-8 font-medium">
        You have not purchased any {type.toLowerCase()}
      </p>

      <button className="flex items-center gap-2 bg-[#042BFD] text-white text-sm font-medium px-10 py-3 rounded-lg shadow-md shadow-blue-500/20 hover:bg-[#0325D7] transition-colors">
        Explore <ArrowRight size={16} />
      </button>
    </div>
  );
}
