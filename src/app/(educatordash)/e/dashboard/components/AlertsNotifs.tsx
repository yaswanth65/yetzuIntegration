import React from 'react';
import { AlertCircle, CalendarMinus, MessageSquare } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'overdue',
    icon: AlertCircle,
    iconColor: 'text-red-500',
    title: 'Overdue Assignment',
    isNew: true,
    message: "Pradhyumn Dhondi's Assignment #ASN-45637 was due yesterday",
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'reschedule',
    icon: CalendarMinus,
    iconColor: 'text-orange-500',
    title: 'Reschedule Request',
    isNew: true,
    message: "Diptish Gohane requested to rescheduled tomorrow's session",
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'message',
    icon: MessageSquare,
    iconColor: 'text-blue-500',
    title: 'Student Message',
    isNew: false,
    message: 'A. Kumar sent a message about thesis chapter feedback',
    time: '4 hours ago',
  },
  {
    id: 4,
    type: 'message',
    icon: MessageSquare,
    iconColor: 'text-blue-500',
    title: 'Student Message',
    isNew: false,
    message: 'A. Kumar sent a message about thesis chapter feedback',
    time: '4 hours ago',
  },
];

export default function AlertsNotifs() {
  return (
    <div className="w-full xl:w-[360px] shrink-0">
      <h2 className="text-[16px] font-bold text-gray-900 mb-4 px-1">Alerts & Notifications</h2>
      <div className="flex flex-col gap-3">
        {notifications.map((notif) => (
          <div key={notif.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-2.5">
              <div className="flex items-center gap-2">
                <notif.icon className={`w-4 h-4 ${notif.iconColor}`} />
                <span className="font-bold text-gray-900 text-sm">{notif.title}</span>
              </div>
              {notif.isNew && (
                <span className="bg-[#3B82F6] text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide">New</span>
              )}
            </div>
            <p className="text-[13px] text-gray-600 mb-3 leading-snug">
              {notif.message}
            </p>
            <div className="text-[11px] font-medium text-gray-400">
              {notif.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
