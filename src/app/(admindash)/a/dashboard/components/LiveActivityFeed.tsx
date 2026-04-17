import { div } from "framer-motion/client";
import Image from "next/image";
import React from "react";

interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  minutesAgo: number;
}

// JSON Data replace with supabase

const activityData: ActivityItem[] = [
  {
    id: "1",
    message: "Priya Sharma joined webinar 'Academic Writing Fundamentals'",
    timestamp: "2 min ago",
    minutesAgo: 2,
  },
  {
    id: "2",
    message: "Assignment 'Research Methodology Paper' submitted by Rahul K.",
    timestamp: "5 min ago",
    minutesAgo: 5,
  },
  {
    id: "3",
    message: "Certificate issued to Aisha M. for 'Publication Ethics'",
    timestamp: "8 min ago",
    minutesAgo: 8,
  },
  {
    id: "4",
    message: "New user registered: Dr. James Wilson",
    timestamp: "12 min ago",
    minutesAgo: 12,
  },
  {
    id: "5",
    message: "Cohort 'Research Methods Batch 12' session started",
    timestamp: "15 min ago",
    minutesAgo: 15,
  },
  {
    id: "6",
    message: "Assignment graded: 'Literature Review' – 87/100",
    timestamp: "18 min ago",
    minutesAgo: 18,
  },
  {
    id: "7",
    message: "Student Maria L. completed 1:1 mentoring session",
    timestamp: "22 min ago",
    minutesAgo: 22,
  },
];

export default function LiveActivityFeed() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm border-gray-100 p-4 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image
            width={20}
            height={20}
            src="/admin-dashboard/ad-Live-Activity.svg"
            alt="live"
          />
          <h3 className="font-semibold">Live Activity Feed</h3>
        </div>
        <span className="text-gray-400 text-sm">Auto-updating</span>
      </div>
      <div className="w-[calc(100%+3rem)] -mx-6 h-px bg-gray-200 my-3"></div>

      <div className="mt-2">
        {activityData.map((data, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="flex flex-col items-center mt-2 gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6574E6]"></div>
              {idx < activityData.length - 1 && (
                <div className="w-px h-6 border border-r-[px] border-dashed border-[#6574E6] "></div>
              )}
            </div>
            <div className="flex justify-between w-full">
              <p className="text-base text-gray-800">{data.message}</p>
              <p className="text-base text-gray-400">
                {data.minutesAgo}min ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
