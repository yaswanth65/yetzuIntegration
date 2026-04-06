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
    <div className="min-h-screen bg-[#F9FAFB] p-1 font-['Inter']">
      {/* Breadcrumb & Tabs Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab("Webinar")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "Webinar" ? "bg-white text-gray-900 shadow-none" : "bg-transparent text-gray-500 hover:bg-gray-100"}`}
          >
            Webinar
          </button>
          <button
            onClick={() => setActiveTab("Mentorship")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "Mentorship" ? "bg-white text-gray-900 shadow-none" : "bg-transparent text-gray-500 hover:bg-gray-100"}`}
          >
            Mentorship
          </button>
        </div>
      </div>

      {activeTab === "Webinar" && (
        <>
          {/* Top Section: Hero + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
            {/* Hero / Upcoming Card */}
            <div className="lg:col-span-3 bg-white  rounded-[20px] p-6 shadow-none border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden relative border-2 border-white shadow-none">
                      <Image
                        src={upcomingWebinar.thumbnail}
                        alt={upcomingWebinar.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 leading-tight">
                        {upcomingWebinar.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {upcomingWebinar.educatorName}
                      </p>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 bg-[#EBF0FF] text-[#2F327D] text-xs font-semibold rounded-full">
                    Upcoming webinar
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-6 max-w-2xl leading-relaxed">
                  {upcomingWebinar.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-50 pt-6">
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={16} />
                    <span>Scheduled : {upcomingWebinar.scheduledDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock size={16} />
                    <span>Time: {upcomingWebinar.time}</span>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-28 py-1.5 bg-[#042BFD] hover:bg-[#0325D7] text-white font-medium rounded-lg text-sm transition-colors text-center">
                  Join
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-[#EBF0FF] rounded-[20px] p-6 shadow-none flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-center mb-4">
                {/* Placeholder illustration for correct "webinar/student" look */}
                <div className="relative w-28 h-24">
                  <Image
                    src="/images/illustrations/webinar-illustration.png" // We might need to assume a name or just use a generic one if available
                    alt="Webinar Illustration"
                    width={120}
                    height={100}
                    className="object-contain"
                    style={{
                      // Fallback style if image missing
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-end z-10">
                <p className="text-sm font-medium text-gray-700 leading-tight max-w-[120px]">
                  Total Webinar Attended
                </p>
                <p className="text-3xl font-bold text-[#021165]">6</p>
              </div>
            </div>
          </div>

          {/* Completed Webinars Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Completed Webinars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {completedWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="bg-white rounded-[20px] p-5 shadow-none border border-gray-100 flex flex-col gap-4 h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-200 flex-shrink-0 border border-gray-100">
                      <Image
                        src={webinar.thumbnail}
                        alt={webinar.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base truncate">
                        {webinar.title}
                      </h3>
                      <p className="text-gray-500 text-xs truncate">
                        {webinar.educatorName}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {webinar.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Calendar size={14} />
                      <span>Date of webinar : {webinar.date}</span>
                    </div>
                    <button className="w-full bg-white border border-[#042BFD] text-[#042BFD] hover:bg-[#042BFD] hover:text-white font-medium py-2 rounded-lg text-sm transition-colors">
                      Learn more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "Mentorship" && (
        <div className="space-y-6">
          {/* Mentor Details Card */}
          <div className="bg-white rounded-[20px] p-8 shadow-none border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Section */}
              <div className="flex flex-col items-center justify-center lg:border-r border-gray-100 pr-8">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white shadow-none">
                  <Image
                    src="/images/placeholder.png" // Replace with actual mentor image
                    alt="Mentor Name"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                  Mentor Name
                </h3>
                <p className="text-sm text-gray-400 text-center mb-6 max-w-[200px] leading-relaxed">
                  Short explanation of there designation
                </p>
                <div className="flex gap-12 w-full justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#021165]">60</p>
                    <p className="text-[10px] text-gray-500 font-medium leading-tight">
                      Total Webinar
                      <br />
                      Conducted
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#021165]">70</p>
                    <p className="text-[10px] text-gray-500 font-medium leading-tight">
                      Total Cohorts
                      <br />
                      Conducted
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Grid */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4 pl-0 lg:pl-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <h4 className="text-gray-500 font-medium mb-1">
                      Education
                    </h4>
                    <p className="text-gray-400 text-sm">Lorem ipsum</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Class Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Upcoming Class
              </h3>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[16px] p-5 shadow-none border border-gray-100"
                >
                  <h4 className="font-semibold text-gray-900 text-base mb-0.5">
                    Class Title
                  </h4>
                  <p className="text-gray-400 text-xs mb-4">Educator name</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Calendar size={14} />
                      <span>Scheduled : 23 Nov, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock size={14} />
                      <span>Time: 12:30 PM IST</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-2 text-[#042BFD] border border-[#042BFD] rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 bg-[#042BFD] text-white rounded-lg text-sm font-medium hover:bg-[#0325D7] transition-colors">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cohort Status & Attendance Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-[20px] p-6 shadow-none border border-gray-100 min-h-full flex flex-col justify-between">
                <h3 className="text-lg font-medium text-gray-600 mb-6">
                  Cohort Status
                </h3>

                <div className="flex justify-center gap-8 mb-6">
                  {/* Circular Progress 1 */}
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <Doughnut
                      data={totalJoinedData}
                      options={doughnutOptions}
                    />
                    <div className="absolute text-center pointer-events-none">
                      <span className="text-xl font-bold text-gray-900 block">
                        7
                      </span>
                      <span className="text-[10px] text-gray-500 leading-none">
                        Total Joined
                        <br />
                        Webinars
                      </span>
                    </div>
                  </div>
                  {/* Circular Progress 2 */}
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <Doughnut data={missedData} options={doughnutOptions} />
                    <div className="absolute text-center pointer-events-none">
                      <span className="text-xl font-bold text-gray-900 block">
                        4
                      </span>
                      <span className="text-[10px] text-gray-500 leading-none">
                        Missed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-8 px-2">
                  <div className="w-full bg-blue-100 rounded-full h-4 mb-2">
                    <div
                      className="bg-blue-300 h-4 rounded-full"
                      style={{ width: "93%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-center text-gray-500">
                    Your joining rate is reached at{" "}
                    <span className="text-gray-900 font-semibold">93%</span>
                  </p>
                </div>

                <div className="h-full">
                  <h4 className="text-gray-500">Monthly Attendance</h4>
                  <div className="w-full">
                    <Bar data={attendanceData} options={barOptions} />
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Box Column */}
            <div className="bg-white rounded-[20px] p-6 shadow-none border border-gray-100 flex flex-col h-[600px] lg:h-auto">
              <h3 className="text-lg font-medium text-gray-600 mb-4 border-b border-gray-100 pb-4">
                Chat Box
              </h3>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/placeholder.png"
                      alt="User"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#EBF0FF] p-3 rounded-2xl rounded-tl-none text-sm text-gray-700 max-w-[80%]">
                    Lorem Ipsum is free text to use when evey you want
                  </div>
                </div>

                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/placeholder.png"
                      alt="User"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-gray-200 p-3 rounded-2xl rounded-tr-none text-sm text-gray-700 max-w-[80%]">
                    Lorem Ipsum is free
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/placeholder.png"
                      alt="User"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#EBF0FF] px-4 py-2 rounded-2xl rounded-tl-none text-gray-500">
                    ...
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-xl flex items-center px-4 py-2 border border-gray-100">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder-gray-400"
                  />
                  <Mic size={18} className="text-gray-400 ml-2" />
                </div>
                <button className="w-10 h-10 bg-[#042BFD] rounded-xl flex items-center justify-center text-white hover:bg-[#0325D7] transition-colors flex-shrink-0">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
