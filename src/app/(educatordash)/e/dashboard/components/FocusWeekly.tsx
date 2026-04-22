import React from 'react';
import { ChevronLeft, ChevronRight, Video, FileText, User, Users, Calendar, Clock } from 'lucide-react';

const focusData = [
  {
    id: 1,
    title: "Webinar: Major Insights on Human Nervous System with Dr. Rao",
    badgeLabel: "TODAY",
    badgeColor: "bg-[#7C3AED] text-white",
    watermarkIcon: <Video className="w-32 h-32" />,
    watermarkColor: "text-[#7C3AED]/10",
    date: "22 Feb, 2026",
    time: "3:00 PM",
    buttonText: "Join Now",
    buttonType: "solid",
    gradientFrom: "from-[#F3E8FF]",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor self amet consectetur",
    badgeLabel: "DUE IN 2 DAYS",
    badgeColor: "bg-[#FEF3C7] text-[#D97706]",
    watermarkIcon: <FileText className="w-32 h-32" />,
    watermarkColor: "text-[#10B981]/10",
    date: "Due on: 24 Feb, 2026",
    time: null,
    buttonText: "View Details",
    buttonType: "outline",
    gradientFrom: "from-[#D1FAE5]", // emerald-100
  },
  {
    id: 3,
    title: "Lorem ipsum dolor self amet consectetur",
    badgeLabel: null,
    badgeColor: "",
    watermarkIcon: <User className="w-32 h-32" />,
    watermarkColor: "text-[#F97316]/10",
    date: "26 Feb, 2026",
    time: "7:00 PM",
    buttonText: "View Details",
    buttonType: "outline",
    gradientFrom: "from-[#FFEDD5]", // orange-100
  },
  {
    id: 4,
    title: "Lorem ipsum dolor self amet consectetur",
    badgeLabel: null,
    badgeColor: "",
    watermarkIcon: <Users className="w-32 h-32" />,
    watermarkColor: "text-[#0EA5E9]/10",
    date: "27 Feb, 2026",
    time: "7:00 PM",
    buttonText: "View Details",
    buttonType: "outline",
    gradientFrom: "from-[#E0F2FE]", // sky-100
  }
];

export default function FocusWeekly() {
  return (
    <div className="mt-8 mb-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Focus for this week</h2>
        <div className="flex gap-2">
          <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {focusData.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 flex flex-col h-[280px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group">
            {/* Background Gradient */}
            <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${item.gradientFrom} to-white opacity-60 pointer-events-none`}></div>
            
            {/* Watermark Icon */}
            <div className={`absolute -top-4 -left-4 ${item.watermarkColor} pointer-events-none`}>
               {item.watermarkIcon}
            </div>

            <div className="p-5 flex flex-col justify-between h-full relative z-10">
              <div>
                <div className="flex justify-end items-start mb-6 h-6">
                  {item.badgeLabel && (
                    <span className={`text-[9px] font-bold px-2.5 py-1 uppercase rounded-full ${item.badgeColor}`}>
                      {item.badgeLabel}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-[15px] mb-2 leading-snug h-[44px] overflow-hidden line-clamp-2">
                  {item.title}
                </h3>
              </div>
              
              <div>
                <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium mb-5">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.date}</span>
                  </div>
                  {item.time && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.time}</span>
                    </div>
                  )}
                </div>
                
                {item.buttonType === 'solid' ? (
                  <button className="w-full bg-[#111827] text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-black transition-colors">
                    {item.buttonText}
                  </button>
                ) : (
                  <button className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors">
                    {item.buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
