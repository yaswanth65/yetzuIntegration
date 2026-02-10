import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const MentorDashboard = () => {
  return (
    <div className="md:block hidden bg-[#f9fafb] px-8 font-sans">
      {/* Welcome Header */}
      <div className="flex items-center justify-between max-w-[1001px] mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#1e40af]">Welcome Kushagra!</h1>
          <p className="text-gray-500 text-sm">Here's a list of your Assignments for this month</p>
        </div>
 
      </div>

      <div className="flex gap-[20px] items-start">
        {/* Left Big Card */}
        <div 
          style={{ width: '700px', height: '181px' }}
          className="relative overflow-hidden rounded-[20px] bg-[#003fc7] p-8 text-white flex flex-col justify-center"
        >
          {/* Stars 80x80 */}
          <div className="absolute right-[10%] top-[-10px] opacity-20">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          <div className="absolute right-[-10px] bottom-[-20px] opacity-10">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-90">1:1 Mentorship</p>
          <h2 className="text-[24px] font-bold leading-tight max-w-[500px] mb-4">
            Sharpen Your Skills With Professional Online Mentorship Programme
          </h2>
          
          <button className="flex items-center gap-2 bg-[#171717] hover:bg-black text-white px-4 py-2 rounded-full w-fit transition-all text-sm font-medium">
            Join Now 
            <div className="bg-white rounded-full p-0.5">
              <ArrowRight size={14} className="text-black" />
            </div>
          </button>
        </div>

        {/* Right Small Card */}
        <div 
          style={{ width: '281px', height: '181px' }}
          className="relative rounded-[20px] bg-gradient-to-b from-[#003ab7] to-[#5285f5] p-5 text-white flex flex-col justify-between"
        >
          {/* Popular Badge */}
          <div className="absolute -top-2 -right-1 bg-[#fbbf24] text-black text-[10px] font-bold px-3 py-1 rounded-md uppercase">
            Popular
          </div>

          <div>
            <h3 className="text-[16px] font-bold mb-3">Publish with Confidence.</h3>
            <ul className="space-y-2">
              {[
                "Verified Academic Mentors",
                "Step-by-Step Research Framework",
                "Publication-Ready Outcomes"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px] font-medium">
                  <div className="bg-white rounded-sm flex items-center justify-center w-3.5 h-3.5">
                    <Check size={10} className="text-[#2563eb] stroke-[4]" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full bg-[#003ab7] hover:bg-[#1e40af] text-white text-xs font-bold py-2.5 rounded-lg transition-colors">
            Apply for Cohort
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;