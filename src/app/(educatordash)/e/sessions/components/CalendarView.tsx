"use client";

import React, { useState, useMemo, useRef } from 'react';
import { Session } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CalendarViewType = 'Day' | 'Week' | 'Month';

interface CalendarViewProps {
  sessions: Session[];
}

const HOUR_HEIGHT = 80;
const FIRST_HOUR = 7;
const LAST_HOUR = 20;

export default function CalendarView({ sessions }: CalendarViewProps) {
  const [viewType, setViewType] = useState<CalendarViewType>('Week');
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  const viewTypes: CalendarViewType[] = ['Day', 'Week', 'Month'];

  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: Date[] = [];
    const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    for (let i = startPadding - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push(d);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatTime = (time: string) => {
    const [hourStr, ampm] = time.split(' ');
    let hour = parseInt(hourStr);
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return hour;
  };

  const parseSessionTimes = (session: Session) => {
    const startHour = formatTime(session.startTime);
    const endHour = formatTime(session.endTime);
    const duration = endHour - startHour;
    return { startHour, duration: duration > 0 ? duration : 1 };
  };

  const formatDateHeader = () => {
    if (viewType === 'Day') {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } else if (viewType === 'Week') {
      const days = getWeekDays(currentDate);
      const start = days[0];
      const end = days[6];
      if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
      } else {
        return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()} - ${end.toLocaleDateString('en-US', { month: 'short' })} ${end.getDate()}, ${end.getFullYear()}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewType === 'Day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewType === 'Week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      if (!session.dateTime) return false;
      const sessionDate = new Date(session.dateTime);
      
      if (viewType === 'Day') {
        return sessionDate.toDateString() === currentDate.toDateString();
      } else if (viewType === 'Week') {
        const days = getWeekDays(currentDate);
        return sessionDate >= days[0] && sessionDate <= days[6];
      } else {
        return sessionDate.getMonth() === currentDate.getMonth() && 
               sessionDate.getFullYear() === currentDate.getFullYear();
      }
    });
  }, [sessions, viewType, currentDate]);

  // Organize sessions by hour for each day - for overlap handling
  const sessionsByDayHour = useMemo(() => {
    const map: Record<string, { session: Session; index: number }[]> = {};
    filteredSessions.forEach((session, idx) => {
      if (!session.dateTime) return;
      const sessionDate = new Date(session.dateTime);
      const dayKey = sessionDate.toDateString();
      const hour = sessionDate.getHours();
      const key = `${dayKey}-${hour}`;
      if (!map[key]) map[key] = [];
      map[key].push({ session, index: idx });
    });
    return map;
  }, [filteredSessions]);

  const hours = Array.from({ length: LAST_HOUR - FIRST_HOUR + 1 }, (_, i) => FIRST_HOUR + i);

  const getSessionColor = (type: string) => {
    switch (type) {
      case 'Webinar':
        return 'bg-blue-100/70 border-blue-500';
      case 'Cohort':
        return 'bg-green-100/50 border-green-500';
      case 'Workshop':
        return 'bg-purple-100/50 border-purple-500';
      default:
        return 'bg-blue-100/70 border-blue-500';
    }
  };

  const renderTimeLine = (hour: number) => {
    return (
      <div 
        key={hour} 
        className="border-b border-gray-100 relative"
        style={{ height: HOUR_HEIGHT }}
      >
        <div className="absolute top-0 left-0 -translate-x-full pr-2 text-[10px] text-gray-400 text-right w-[40px]">
          {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
        </div>
      </div>
    );
  };

  const renderSessionCard = (session: Session, parentHeight: number) => {
    const { duration } = parseSessionTimes(session);
    const height = duration * HOUR_HEIGHT - 8;
    const colorClass = getSessionColor(session.type);
    
    return (
      <div
        key={session.id}
        className={`absolute left-1 right-1 ${colorClass} border-l-4 rounded-r-lg p-2 z-10 overflow-hidden`}
        style={{
          top: 4,
          height: height,
        }}
      >
        <div className="font-semibold text-[10px] text-gray-800 truncate">{session.id}</div>
        <div className="text-[9px] text-gray-600 truncate mt-0.5">{session.title}</div>
        <div className="text-[9px] text-gray-500 mt-0.5">{session.attendees} Students</div>
        <div className="text-[9px] text-gray-500">{session.startTime} - {session.endTime}</div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayKey = currentDate.toDateString();
    
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-[60px_1fr] border-b border-gray-100">
          <div className="py-3 px-2 text-center text-xs font-medium text-gray-500 border-r border-gray-100 bg-gray-50">Time</div>
          <div className="py-3 px-4 text-left text-xs font-semibold text-gray-900 bg-gray-50">Sessions</div>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          {hours.map(hour => {
            const hourKey = `${dayKey}-${hour}`;
            const hourSessions = sessionsByDayHour[hourKey] || [];
            
            return (
              <div key={hour} className="grid grid-cols-[60px_1fr] border-b border-gray-100 last:border-b-0">
                <div className="py-4 px-2 text-center text-sm text-gray-500 border-r border-gray-100">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </div>
                <div className="py-3 px-4 relative">
                  {hourSessions.length > 0 ? (
                    hourSessions.map(({ session }) => 
                      renderSessionCard(session, HOUR_HEIGHT)
                    )
                  ) : (
                    <div className="h-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-100">
          <div className="py-3 border-r border-gray-100 bg-gray-50"></div>
          {weekDays.map((day, idx) => {
            const isToday = day.toDateString() === today.toDateString();
            return (
              <div key={idx} className={`py-3 text-center border-r border-gray-100 last:border-r-0 ${isToday ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <div className="text-xs text-gray-500 font-medium">{getDayName(day)}</div>
                <div className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>{day.getDate()}</div>
              </div>
            );
          })}
        </div>
        
        <div 
          ref={containerRef}
          className="relative overflow-y-auto"
          style={{ height: hours.length * HOUR_HEIGHT }}
        >
          {hours.map(hour => {
            return (
              <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-100 last:border-b-0">
                <div className="py-6 px-2 text-center text-[10px] text-gray-400 border-r border-gray-100">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </div>
                {weekDays.map((day, dayIdx) => {
                  const dayKey = new Date(day).toDateString();
                  const hourKey = `${dayKey}-${hour}`;
                  const hourSessions = sessionsByDayHour[hourKey] || [];
                  
                  return (
                    <div key={dayIdx} className="relative border-r border-gray-100 last:border-r-0">
{hourSessions.map(({ session }) => 
                    renderSessionCard(session, HOUR_HEIGHT)
                  )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthDays = getMonthDays(currentDate);
    const weeks: Date[][] = [];
    for (let i = 0; i < monthDays.length; i += 7) {
      weeks.push(monthDays.slice(i, i + 7));
    }
    
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-100">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 bg-gray-50 border-r border-gray-100 last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        
        <div className="max-h-[500px] overflow-y-auto">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7 border-b border-gray-100 last:border-b-0">
              {week.map((day, dayIdx) => {
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const isToday = day.toDateString() === today.toDateString();
                const daySessions = filteredSessions.filter(s => {
                  if (!s.dateTime) return false;
                  return new Date(s.dateTime).toDateString() === day.toDateString();
                });
                
                return (
                  <div 
                    key={dayIdx} 
                    className={`min-h-[100px] p-2 border-r border-gray-100 last:border-r-0 ${!isCurrentMonth ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${!isCurrentMonth ? 'text-gray-400' : isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {daySessions.slice(0, 2).map(session => (
                        <div key={session.id} className={`p-1 text-[10px] truncate rounded ${getSessionColor(session.type).split(' ')[0]}`}>
                          <span className="font-medium">{session.id}</span>
                        </div>
                      ))}
                      {daySessions.length > 2 && (
                        <div className="text-[10px] text-gray-500">+{daySessions.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-4 md:p-6 mt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => navigateDate('prev')}
              className="p-1.5 hover:bg-white rounded-md transition-colors"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => navigateDate('next')}
              className="p-1.5 hover:bg-white rounded-md transition-colors"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 min-w-[200px]">{formatDateHeader()}</h3>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          {viewTypes.map(type => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                viewType === type
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {viewType === 'Day' && renderDayView()}
      {viewType === 'Week' && renderWeekView()}
      {viewType === 'Month' && renderMonthView()}
    </div>
  );
}