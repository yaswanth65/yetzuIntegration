"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Send, Mic } from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function WebinarsPage() {
  const [activeTab, setActiveTab] = useState<"Webinar" | "Mentorship">(
    "Webinar",
  );

  // Mock data for the "Featured/Upcoming" webinar
  const upcomingWebinar = {
    id: "upcoming-1",
    title: "Title of webinar",
    educatorName: "Educator name",
    description:
      "Loren Ipsum meta description is display here Loren Ipsum meta Loren Ipsum meta description is display here Loren Ipsum meta",
    scheduledDate: "23 Nov, 2025",
    time: "2:30PM IST",
    thumbnail: "/images/placeholder.png", // Replace with actual placeholder
  };

  // Mock data for completed webinars
  const completedWebinars = Array(4)
    .fill({
      id: "completed",
      title: "Title of webinar",
      educatorName: "Educator name",
      description:
        "Loren Ipsum meta description is display here Loren Ipsum ...",
      date: "23 Nov, 2025",
      thumbnail: "/images/placeholder.png",
    })
    .map((w, i) => ({ ...w, id: `completed-${i}` }));

  // Chart Data
  const totalJoinedData = {
    labels: ["Joined", "Remaining"],
    datasets: [
      {
        data: [7, 3], // Example: 7 joined, 3 remaining to make 10 or similar scale
        backgroundColor: ["#042BFD", "#F3F4F6"],
        borderWidth: 0,
        borderRadius: 20,
        cutout: "85%",
      },
    ],
  };

  const missedData = {
    labels: ["Missed", "Remaining"],
    datasets: [
      {
        data: [4, 6],
        backgroundColor: ["#EF4444", "#F3F4F6"],
        borderWidth: 0,
        borderRadius: 20,
        cutout: "85%",
      },
    ],
  };

  const doughnutOptions: any = {
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    rotation: 0,
    circumference: 360,
    maintainAspectRatio: false,
  };

  const attendanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Attendance",
        data: [9, 7, 4, 6, 12, 7],
        backgroundColor: "#042BFD",
        borderRadius: 8,
        barThickness: 24,
      },
    ],
  };

  const barOptions: any = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: "#9CA3AF", font: { size: 10 } },
      },
      y: {
        display: false, // Hide Y axis as per design
        grid: { display: false },
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="font-sans">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#021165] mb-6">Learning Hub</h1>
        
        <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("Webinar")}
            className={`px-6 sm:px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "Webinar" 
                ? "bg-white text-[#042BFD] shadow-sm scale-[1.02]" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Webinars
          </button>
          <button
            onClick={() => setActiveTab("Mentorship")}
            className={`px-6 sm:px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "Mentorship" 
                ? "bg-white text-[#042BFD] shadow-sm scale-[1.02]" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Mentorship
          </button>
        </div>
      </div>

      {activeTab === "Webinar" && (
        <div className="flex-1 space-y-12">
          {/* Top Section: Hero + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Hero / Upcoming Card */}
            <div className="lg:col-span-3 bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 overflow-hidden relative border border-blue-100 shadow-sm shrink-0">
                      <Image
                        src={upcomingWebinar.thumbnail}
                        alt={upcomingWebinar.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight truncate">
                        {upcomingWebinar.title}
                      </h2>
                      <p className="text-sm text-gray-500 font-medium mt-1">
                        Hosted by {upcomingWebinar.educatorName}
                      </p>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 bg-blue-50 text-[#042BFD] text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100">
                    Live Session
                  </span>
                </div>

                <p className="text-gray-600 text-sm md:text-base mb-8 max-w-3xl leading-relaxed">
                  {upcomingWebinar.description}
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-gray-50 pt-8 mt-auto">
                <div className="flex flex-wrap items-center gap-6 w-full sm:w-auto">
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <span>{upcomingWebinar.scheduledDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Clock size={16} className="text-gray-400" />
                    </div>
                    <span>{upcomingWebinar.time}</span>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-12 py-3.5 bg-[#021165] hover:bg-[#031a9c] text-white font-bold rounded-2xl text-sm transition-all active:scale-95 shadow-xl shadow-blue-900/20">
                  Join Live Webinar
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-[#EBF0FF] rounded-[32px] p-8 shadow-sm flex flex-col justify-between relative overflow-hidden border border-blue-100 group">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-center mb-6 relative z-10">
                <div className="relative w-32 h-28 transform group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src="/images/illustrations/webinar-illustration.png"
                    alt="Webinar Illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-between items-end relative z-10">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                    Progress
                  </p>
                  <p className="text-sm font-bold text-gray-700 leading-tight">
                    Total Webinars Attended
                  </p>
                </div>
                <p className="text-5xl font-black text-[#021165] ml-4 italic">6</p>
              </div>
            </div>
          </div>

          {/* Completed Webinars Section */}
          <div className="pb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Completed Webinars
              </h2>
              <button className="text-sm font-bold text-[#042BFD] hover:underline">
                View All History
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {completedWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative bg-gray-50 border border-gray-100 shrink-0">
                      <Image
                        src={webinar.thumbnail}
                        alt={webinar.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm truncate">
                        {webinar.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium truncate">
                        {webinar.educatorName}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs mb-6 line-clamp-2 leading-relaxed flex-grow">
                    {webinar.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                      <Calendar size={14} className="shrink-0" />
                      <span>{webinar.date}</span>
                    </div>
                    <button className="w-full bg-white border border-gray-200 text-gray-600 hover:border-[#042BFD] hover:text-[#042BFD] hover:bg-blue-50 font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95">
                      Watch Recording
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Mentorship" && (
        <div className="flex-1 space-y-8 pb-12">
          {/* Mentor Details Card */}
          <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-blue-100/50 transition-colors"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
              {/* Profile Section */}
              <div className="flex flex-col items-center justify-center lg:border-r border-gray-100 lg:pr-10">
                <div className="w-28 h-28 rounded-3xl overflow-hidden mb-6 ring-4 ring-white shadow-xl">
                  <Image
                    src="/images/placeholder.png"
                    alt="Mentor Name"
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Dr. Sarah Jenkins
                </h3>
                <p className="text-sm text-gray-400 text-center mb-8 max-w-[220px] font-medium leading-relaxed">
                  Senior Research Fellow & Academic Mentor
                </p>
                <div className="flex gap-10 w-full justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-black text-[#021165] italic leading-none mb-1">60</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-tight">
                      Webinars
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-[#021165] italic leading-none mb-1">70</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-tight">
                      Cohorts
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Grid */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 pl-0 lg:pl-6">
                {[
                  { label: "Education", value: "PhD in Cognitive Neuroscience, Stanford University" },
                  { label: "Expertise", value: "Human-Computer Interaction & AI Ethics" },
                  { label: "Experience", value: "12+ Years in Academic Research & Mentorship" },
                  { label: "Publications", value: "45+ Peer-reviewed journals and conferences" }
                ].map((item, i) => (
                  <div key={i} className="group/item">
                    <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2 group-hover/item:translate-x-1 transition-transform">
                      {item.label}
                    </h4>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Class Column */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Upcoming Classes</h3>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md">3 Next</span>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-base mb-1 group-hover:text-[#042BFD] transition-colors">
                          Advanced Thesis Writing
                        </h4>
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Dr. Sarah Jenkins</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3 text-gray-500 text-xs font-bold">
                        <Calendar size={14} className="text-gray-400" />
                        <span>23 Nov, 2025</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500 text-xs font-bold">
                        <Clock size={14} className="text-gray-400" />
                        <span>12:30 PM IST</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-4 py-2.5 text-[#042BFD] border border-gray-100 rounded-xl text-xs font-bold hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-95">
                        Reschedule
                      </button>
                      <button className="px-4 py-2.5 bg-[#021165] text-white rounded-xl text-xs font-bold hover:bg-[#031a9c] transition-all active:scale-95 shadow-lg shadow-blue-900/10">
                        Join Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cohort Status Column */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Performance Tracking</h3>
              
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
                  {/* Circular Progress 1 */}
                  <div className="relative w-36 h-36 flex items-center justify-center group">
                    <div className="absolute inset-0 bg-blue-50 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="w-full h-full relative z-10">
                      <Doughnut
                        data={totalJoinedData}
                        options={doughnutOptions}
                      />
                    </div>
                    <div className="absolute text-center pointer-events-none z-20">
                      <span className="text-3xl font-black text-gray-900 block leading-none italic">7</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                        Joined
                      </span>
                    </div>
                  </div>
                  {/* Circular Progress 2 */}
                  <div className="relative w-36 h-36 flex items-center justify-center group">
                    <div className="absolute inset-0 bg-red-50 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="w-full h-full relative z-10">
                      <Doughnut data={missedData} options={doughnutOptions} />
                    </div>
                    <div className="absolute text-center pointer-events-none z-20">
                      <span className="text-3xl font-black text-gray-900 block leading-none italic">4</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                        Missed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-10 px-2">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Joining Rate</span>
                    <span className="text-sm font-black text-blue-600">93%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000"
                      style={{ width: "93%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex-1 min-h-[200px]">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Attendance Trend</h4>
                  <div className="w-full h-40">
                    <Bar data={attendanceData} options={barOptions} />
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Box Column */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Cohort Community</h3>
              
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col h-[600px] lg:h-[calc(100%-44px)]">
                <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 overflow-hidden shrink-0 border border-blue-100">
                      <Image src="/images/placeholder.png" alt="User" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-1.5 max-w-[85%]">
                      <div className="bg-gray-50 p-4 rounded-[20px] rounded-tl-none text-sm text-gray-700 shadow-sm border border-gray-100">
                        Hey everyone! Ready for the session today?
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold px-1">10:15 AM</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 overflow-hidden shrink-0 border border-indigo-100">
                      <Image src="/images/placeholder.png" alt="User" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-1.5 items-end max-w-[85%]">
                      <div className="bg-[#021165] p-4 rounded-[20px] rounded-tr-none text-sm text-white shadow-lg shadow-blue-900/10">
                        Yes, Sarah! Can't wait for the thesis writing tips.
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold px-1">10:18 AM</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 overflow-hidden shrink-0 border border-blue-100">
                      <Image src="/images/placeholder.png" alt="User" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-1.5 max-w-[85%]">
                      <div className="bg-gray-50 p-4 rounded-[20px] rounded-tl-none text-sm text-gray-700 shadow-sm border border-gray-100 italic">
                        Typing...
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <div className="flex-1 bg-gray-50 rounded-2xl flex items-center px-4 py-3 border border-gray-100 group focus-within:border-blue-400 transition-colors">
                    <input
                      type="text"
                      placeholder="Share a thought..."
                      className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder-gray-400 font-medium"
                    />
                    <Mic size={20} className="text-gray-400 ml-2 cursor-pointer hover:text-blue-500 transition-colors" />
                  </div>
                  <button className="w-12 h-12 bg-[#042BFD] rounded-2xl flex items-center justify-center text-white hover:bg-[#0325D7] transition-all active:scale-95 shadow-lg shadow-blue-600/20 shrink-0">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
