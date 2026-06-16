import React from 'react';

const StatCard = ({ value, label, valueColor }: { value: string | number, label: string, valueColor: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
    <div className={`text-2xl font-bold mb-1 ${valueColor}`}>{value}</div>
    <div className="text-xs text-gray-400 font-medium">{label}</div>
  </div>
);

const formatCurrency = (amount: number) => `$${(amount || 0).toLocaleString()}`;

const healthLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Attention';
};

const healthColor = (score: number) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-blue-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
};

const gaugeColor = (score: number) => {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#3b82f6';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
};

export default function OverviewTab({
  organization,
  orgHealthScore = 0,
  engagementScore = 0,
  progressScore = 0,
  paymentScore = 0,
  sessionsJoined = 0,
  quickStats = {},
}: {
  organization?: any;
  orgHealthScore?: number;
  engagementScore?: number;
  progressScore?: number;
  paymentScore?: number;
  sessionsJoined?: number;
  quickStats?: any;
}) {
  const o = organization || {};
  const totalStudents = Number(o.totalStudents || o.studentCount || o.students?.length || 0);
  const educatorCount = Number(o.educatorCount || 0);
  const sessionCount = Number(o.sessionCount || sessionsJoined || 0);
  const revenue = Number(o.revenueGenerated || o.revenue || 0);
  const createdAt = o.createdDate || o.createdAt
    ? new Date(o.createdDate || o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'N/A';
  const billingCycle = o.billingCycle || 'N/A';

  const activities = [
    { text: 'Organisation created', date: createdAt },
    { text: `${totalStudents} students onboarded`, date: createdAt },
    { text: `${educatorCount} educators assigned`, date: createdAt },
    { text: `Billing cycle: ${billingCycle}`, date: createdAt },
  ];

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (orgHealthScore / 100) * circumference;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full pb-10">
      
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard value={totalStudents} label="Total Students" valueColor="text-blue-600" />
          <StatCard value={educatorCount} label="Educators" valueColor="text-green-500" />
          <StatCard value={sessionCount} label="Sessions" valueColor="text-purple-500" />
          <StatCard value={formatCurrency(revenue)} label="Total Revenue" valueColor="text-teal-500" />
          <StatCard value="—" label="Certificates Issued" valueColor="text-cyan-500" />
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
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke={gaugeColor(orgHealthScore)}
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{orgHealthScore}%</span>
              </div>
            </div>
            <span className={`text-sm font-semibold ${healthColor(orgHealthScore)} mt-2`}>{healthLabel(orgHealthScore)}</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">Engagement</span>
                <span className="text-gray-900">{engagementScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${engagementScore}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-900">{progressScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progressScore}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">Payment</span>
                <span className="text-gray-900">{paymentScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${paymentScore}%` }}></div>
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
              <span className="text-xs font-semibold text-gray-900">{quickStats?.paymentStatus || 'Up to date'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500">Next Billing</span>
              <span className="text-xs font-semibold text-gray-900">{quickStats?.nextBilling || '—'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500">Contract End</span>
              <span className="text-xs font-semibold text-gray-900">{quickStats?.contractEnd || '—'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500">Sessions Joined</span>
              <span className="text-xs font-semibold text-gray-900">{sessionsJoined}</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
