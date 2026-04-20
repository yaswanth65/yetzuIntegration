import React from 'react';
import { Building2, CheckCircle, Users, DollarSign, TrendingUp } from 'lucide-react';

const statsData = [
  {
    title: 'TOTAL ORGANISATIONS',
    value: '47',
    change: '+8.2%',
    icon: Building2,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    chartColor: 'bg-purple-500',
    metrics: [40, 60, 50, 70, 60, 80]
  },
  {
    title: 'ACTIVE ORGANISATIONS',
    value: '42',
    change: '+4.1%',
    icon: CheckCircle,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    chartColor: 'bg-green-500',
    metrics: [50, 45, 60, 55, 75, 80]
  },
  {
    title: 'TOTAL STUDENTS (B2B)',
    value: '3,847',
    change: '+12.5%',
    icon: Users,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    chartColor: 'bg-blue-500',
    metrics: [30, 40, 50, 60, 70, 90]
  },
  {
    title: 'REVENUE FROM ORGANISATIONS',
    value: '$127,400',
    change: '+22.1%',
    icon: DollarSign,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100',
    chartColor: 'bg-orange-500',
    metrics: [40, 50, 60, 50, 70, 95]
  }
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat, i) => (
        <div key={i} className="bg-white rounded-2xl border  border-gray-100 p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
              <h3 className="text-[10px] sm:text-xs font-semibold text-gray-400 mb-2 truncate">{stat.title}</h3>
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-2">{stat.value}</h2>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">
                  <TrendingUp size={12} strokeWidth={3} /> {stat.change}
                </div>
                <span className="text-gray-400 font-medium">vs last month</span>
              </div>
            </div>
            <div className={`p-1.5 sm:p-2 rounded-lg ${stat.iconBg}`}>
              <stat.icon size={16} className={stat.iconColor} />
            </div>
          </div>
          
          {/* Mini Bar Chart */}
          <div className="flex items-end justify-between h-10 gap-1 mt-2">
            {stat.metrics.map((val, idx) => {
              const isLast = idx === stat.metrics.length - 1;
              return (
                <div key={idx} className="w-full flex flex-col justify-end items-center h-full gap-1">
                  <div 
                    className={`w-full rounded-[2px] ${isLast ? stat.chartColor : stat.iconBg}`} 
                    style={{ height: `${val}%`, minHeight: '4px' }}
                  />
                  {idx === 0 && <span className="text-[9px] text-gray-300 font-medium leading-none">Oct</span>}
                  {isLast && <span className="text-[9px] text-gray-300 font-medium leading-none">Mar</span>}
                  {idx !== 0 && !isLast && <span className="text-[9px] opacity-0 leading-none">-</span>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
