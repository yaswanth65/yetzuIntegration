import React from 'react';

const SummaryCard = ({ value, label, valueColor }: { value: string, label: string, valueColor: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex justify-between items-center shadow-sm">
    <div className="flex flex-col">
      <div className={`text-2xl font-bold mb-1 ${valueColor}`}>{value}</div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
  </div>
);

export default function ProgressTab() {
  const topPerformers = [
    { rank: 1, name: 'James Wilson', progress: 98, certs: 4 },
    { rank: 2, name: 'Priya Sharma', progress: 78, certs: 2 },
    { rank: 3, name: 'Aisha Mohammed', progress: 64, certs: 1 },
    { rank: 4, name: 'Rahul Kumar', progress: 45, certs: 1 },
    { rank: 5, name: 'Maria Lopez', progress: 25, certs: 0 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard value="67%" label="Avg Progress" valueColor="text-blue-600" />
        <SummaryCard value="82 students" label="On Track" valueColor="text-green-500" />
        <SummaryCard value="18 students" label="At Risk" valueColor="text-red-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horizontal Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex-1">
          <h3 className="text-sm font-bold text-gray-900 mb-6">Student Progress Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 w-16 text-right">Excellent</span>
              <div className="flex-1 h-6 bg-gray-100 rounded-sm overflow-hidden flex items-center">
                <div className="h-full bg-blue-500" style={{ width: '45%' }}></div>
              </div>
              <span className="text-xs text-gray-400 w-6">45</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 w-16 text-right">Good</span>
              <div className="flex-1 h-6 bg-gray-100 rounded-sm overflow-hidden flex items-center">
                <div className="h-full bg-blue-500" style={{ width: '70%' }}></div>
              </div>
              <span className="text-xs text-gray-400 w-6">70</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 w-16 text-right">Average</span>
              <div className="flex-1 h-6 bg-gray-100 rounded-sm overflow-hidden flex items-center">
                <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
              </div>
              <span className="text-xs text-gray-400 w-6">60</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 w-16 text-right">Poor</span>
              <div className="flex-1 h-6 bg-gray-100 rounded-sm overflow-hidden flex items-center">
                <div className="h-full bg-blue-500" style={{ width: '15%' }}></div>
              </div>
              <span className="text-xs text-gray-400 w-6">15</span>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex-1">
          <h3 className="text-sm font-bold text-gray-900 mb-6">Completion Rate Trend</h3>
          <div className="relative w-full h-40 mt-4">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* Grid Lines */}
              <line x1="0" y1="100" x2="100" y2="100" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="0" x2="100" y2="0" stroke="#f3f4f6" strokeWidth="1" />
              
              {/* Line */}
              <polyline 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="2" 
                points="0,80 25,75 50,70 75,60 100,55" 
              />
              {/* Dots */}
              <circle cx="0" cy="80" r="2.5" fill="#10b981" />
              <circle cx="25" cy="75" r="2.5" fill="#10b981" />
              <circle cx="50" cy="70" r="2.5" fill="#10b981" />
              <circle cx="75" cy="60" r="2.5" fill="#10b981" />
              <circle cx="100" cy="55" r="2.5" fill="#10b981" />
            </svg>
            <div className="absolute inset-x-0 -bottom-6 flex justify-between text-[10px] text-gray-400">
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-2">
        <h3 className="text-sm font-bold text-gray-900 p-6 border-b border-gray-100">Top Performers</h3>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 w-[10%]">Rank</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 w-[30%]">Student Name</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 w-[40%]">Progress %</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 w-[20%] text-center">Certificates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topPerformers.map((student, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-6 text-sm text-gray-400 font-semibold">
                    {student.rank}
                  </td>
                  <td className="py-3 px-6 text-sm font-semibold text-gray-900">
                    {student.name}
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[200px]">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 w-8">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-900 font-medium text-center">
                    {student.certs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
