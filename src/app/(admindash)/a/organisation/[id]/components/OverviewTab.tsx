import React from 'react';

const StatCard = ({ value, label, valueColor }: { value: string | number, label: string, valueColor: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
    <div className={`text-2xl font-bold mb-1 ${valueColor}`}>{value}</div>
    <div className="text-xs text-gray-400 font-medium">{label}</div>
  </div>
);

export default function OverviewTab() {
  const activities = [
    { text: 'Organisation created', date: 'Jan 5, 2026' },
    { text: '320 students added', date: 'Jan 10, 2026' },
    { text: 'Premium plan activated', date: 'Jan 15, 2026' },
    { text: 'Payment received: $28,400', date: 'Feb 1, 2026' },
    { text: 'Access updated: Research Modules', date: 'Mar 1, 2026' },
    { text: 'New students batch: +45', date: 'Mar 15, 2026' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full pb-10">
      
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard value="320" label="Total Students" valueColor="text-blue-600" />
          <StatCard value="290" label="Active Students" valueColor="text-green-500" />
          <StatCard value="156" label="Sessions Joined" valueColor="text-purple-500" />
          <StatCard value="84%" label="Avg Completion Rate" valueColor="text-orange-500" />
          <StatCard value="$28,400" label="Total Revenue" valueColor="text-teal-500" />
          <StatCard value="47" label="Certificates Issued" valueColor="text-cyan-500" />
        </div>

        {/* Organization Activity */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex-1">
          <h3 className="text-base font-bold text-gray-900 mb-6">Organization Activity</h3>
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                  <span className="text-sm font-semibold text-gray-700">{activity.text}</span>
                </div>
                <span className="text-xs font-semibold text-gray-400">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        {/* Org Health Score */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-6">Org Health Score</h3>
          
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Circular gauge placeholder using SVG */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke="#10b981" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray="251" 
                  strokeDashoffset="10" 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">96%</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-green-500 mt-2">Excellent</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">Engagement</span>
                <span className="text-gray-900">88%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-900">84%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">Payment</span>
                <span className="text-gray-900">100%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500">Payment Status</span>
              <span className="text-xs font-semibold text-gray-900">Up to date</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500">Next Billing</span>
              <span className="text-xs font-semibold text-gray-900">May 1, 2026</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500">Contract End</span>
              <span className="text-xs font-semibold text-gray-900">Dec 31, 2026</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
