import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const alertsData = [
  {
    id: 1,
    title: '5 subscriptions expiring this month',
    type: 'warning',
  },
  {
    id: 2,
    title: 'Payment overdue: Stanford Institute',
    type: 'error',
  },
  {
    id: 3,
    title: 'Cambridge College over capacity (105%)',
    type: 'warning',
  },
  {
    id: 4,
    title: '2 organizations inactive > 30 days',
    type: 'info',
  },
];

export default function AlertsAndIssues() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <Info size={14} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={14} className="text-amber-500" />;
      case 'info':
        return <Info size={14} className="text-cyan-500" />;
      default:
        return <Info size={14} />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-amber-50';
      case 'info':
        return 'bg-cyan-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm border-gray-100 p-6 col-span-1 h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h3 className="font-semibold text-[#0A0A0A] text-sm sm:text-base">Alerts & Issues</h3>
        <span className="flex items-center justify-center w-[22px] h-[22px] bg-[#EF4444] text-white rounded-full text-[11px] font-bold">
          4
        </span>
      </div>

      <div className="flex flex-col gap-4 flex-grow justify-start">
        {alertsData.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3">
            <div className={`p-1.5 rounded-full mt-0 ${getIconBg(alert.type)}`}>
              {getIcon(alert.type)}
            </div>
            <p className="text-[13px] text-gray-600 leading-snug pt-0.5">
              {alert.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
