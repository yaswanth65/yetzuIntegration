"use client";

import React from "react";
import { CALENDAR_SESSIONS } from "../constants";

interface CalendarViewProps {
  view: "day" | "week" | "month";
  selectedDate?: number;
  onDateClick?: (date: number) => void;
}

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const WEEK_DAYS = [
  { name: "Monday", date: 7 },
  { name: "Tuesday", date: 8 },
  { name: "Wednesday", date: 9 },
  { name: "Thursday", date: 10 },
  { name: "Friday", date: 11 },
];

const formatTime = (hour: number) => {
  if (hour === 12) return "12 PM";
  if (hour > 12) return `${hour - 12} PM`;
  return `${hour} AM`;
};

interface CalendarViewProps {
  view: "day" | "week" | "month";
  selectedDate?: number;
  onDateClick?: (date: number) => void;
  sessions?: any[];
}

interface WeekViewProps {
  onDateClick?: (date: number) => void;
  sessions?: any[];
}

const WeekView: React.FC<WeekViewProps> = ({ onDateClick, sessions }) => {
  const getSessionStyle = (session: any) => {
    // Default values for existing data
    const startH = session.startHour;
    const startM = session.startMinute || 0;
    const durationM = session.durationMinutes || session.duration * 60;

    // 9 AM is start of day
    const startOffsetHours = startH - 9 + startM / 60;
    const heightHours = durationM / 60;

    return {
      top: `${startOffsetHours * 100}px`,
      height: `${heightHours * 100}px`,
      position: "absolute" as const,
      left: "4px",
      right: "4px",
      zIndex: 10,
    };
  };

  return (
    <div className="w-full bg-gray-50/30 flex flex-col">
      {/* Header Row */}
      <div className="flex border-b border-gray-200 sticky top-0 bg-white z-20">
        <div className="w-[70px] shrink-0 py-4 border-r border-gray-200"></div>
        {WEEK_DAYS.map((day) => (
          <div
            key={day.name}
            onClick={() => onDateClick?.(day.date)}
            className="flex-1 py-4 text-center border-r border-gray-200 last:border-0 cursor-pointer hover:bg-blue-50/80 transition-colors"
          >
            <div className="text-xl font-bold text-gray-900 mb-1">
              {day.date}
            </div>
            <div className="text-[11px] text-gray-500 uppercase font-semibold tracking-wider">
              {day.name}
            </div>
          </div>
        ))}
      </div>

      {/* Grid Body */}
      <div className="flex relative overflow-y-auto">
        {/* Time Sidebar */}
        <div className="w-[70px] shrink-0 bg-white/50 border-r border-gray-200">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="h-[100px] border-b border-gray-200 p-2 text-xs text-gray-500 text-right pr-3 font-medium"
            >
              {formatTime(hour)}
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {WEEK_DAYS.map((day, dayIndex) => {
          // Filter sessions for this day
          const daySessions =
            sessions?.filter((s) => s.dayIndex === dayIndex) || [];

          return (
            <div
              key={dayIndex}
              className="flex-1 relative border-r border-gray-200 last:border-0 min-h-[900px]"
            >
              {/* Background Lines */}
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="h-[100px] border-b border-gray-200 w-full"
                />
              ))}

              {/* Events Layer */}
              {daySessions.map((session: any) => (
                <div
                  key={session.id}
                  style={getSessionStyle(session)}
                  className={`
                    rounded-lg p-2.5 flex flex-col gap-1 border-l-4 shadow-sm hover:shadow-md transition-all overflow-hidden
                    ${session.color === "blue" ? "bg-blue-50/90 border-blue-500" : ""}
                    ${session.color === "purple" ? "bg-purple-50/90 border-purple-500" : ""}
                    ${session.color === "green" ? "bg-green-50/90 border-green-500" : ""}
                  `}
                >
                  <h4
                    className={`text-xs font-bold leading-tight truncate ${
                      session.color === "blue"
                        ? "text-blue-900"
                        : session.color === "purple"
                          ? "text-purple-900"
                          : "text-green-900"
                    }`}
                  >
                    {session.title}
                  </h4>
                  <div
                    className={`flex items-center gap-1 text-[10px] font-medium truncate ${
                      session.color === "blue"
                        ? "text-blue-700"
                        : session.color === "purple"
                          ? "text-purple-700"
                          : "text-green-700"
                    }`}
                  >
                    {session.timeString}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface DayViewProps {
  selectedDate?: number;
  sessions?: any[];
}

const DayView: React.FC<DayViewProps> = ({
  selectedDate = 7,
  sessions = [],
}) => {
  const dayIndex = WEEK_DAYS.findIndex((d) => d.date === selectedDate);
  const daySessions = sessions.filter((s) => s.dayIndex === dayIndex);

  const getSessionStyle = (session: any) => {
    const startH = session.startHour;
    const startM = session.startMinute || 0;
    const durationM = session.durationMinutes || session.duration * 60;
    const startOffsetHours = startH - 9 + startM / 60;
    const heightHours = durationM / 60;

    return {
      top: `${startOffsetHours * 100}px`,
      height: `${heightHours * 100}px`,
      position: "absolute" as const,
      left: "4px",
      right: "4px",
      zIndex: 10,
    };
  };

  return (
    <div className="w-full h-full p-0 flex flex-col">
      <div className="py-4 px-6 border-b border-gray-200 bg-white sticky top-0 z-20">
        <h3 className="text-lg font-bold text-gray-900">
          {WEEK_DAYS.find((d) => d.date === selectedDate)?.name || "Monday"},
          January {selectedDate}
        </h3>
      </div>

      <div className="flex relative flex-1 min-h-[600px]">
        {/* Time Sidebar */}
        <div className="w-[70px] shrink-0 border-r border-gray-200 bg-white/50">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="h-[100px] border-b border-gray-200 p-2 text-xs text-gray-500 text-right pr-3 font-medium"
            >
              {formatTime(hour)}
            </div>
          ))}
        </div>

        {/* Day Column */}
        <div className="flex-1 relative bg-gray-50/10">
          {/* Background Lines */}
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="h-[100px] border-b border-gray-200 w-full"
            />
          ))}

          {/* Events */}
          {daySessions.map((session: any) => (
            <div
              key={session.id}
              style={getSessionStyle(session)}
              className={`
                rounded-lg p-4 flex flex-col justify-center gap-1 border-l-4 shadow-sm hover:shadow-md transition-all overflow-hidden
                ${session.color === "blue" ? "bg-blue-50/90 border-blue-500" : ""}
                ${session.color === "purple" ? "bg-purple-50/90 border-purple-500" : ""}
                ${session.color === "green" ? "bg-green-50/90 border-green-500" : ""}
              `}
            >
              <h4
                className={`text-sm font-bold ${
                  session.color === "blue"
                    ? "text-blue-900"
                    : session.color === "purple"
                      ? "text-purple-900"
                      : "text-green-900"
                }`}
              >
                {session.title}
              </h4>
              <p
                className={`text-xs font-medium flex items-center gap-2 ${
                  session.color === "blue"
                    ? "text-blue-700"
                    : session.color === "purple"
                      ? "text-purple-700"
                      : "text-green-700"
                }`}
              >
                {session.timeString}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface MonthViewProps {
  onDateClick?: (date: number) => void;
  selectedDate?: number;
  sessions?: any[];
}

const MonthView: React.FC<MonthViewProps> = ({ onDateClick, selectedDate }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden shadow-none">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="bg-gray-50 p-2 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider"
          >
            {d}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            onClick={() => onDateClick?.(day)}
            className={`bg-white min-h-[60px] p-2 hover:bg-blue-50 transition-colors flex flex-col gap-1 cursor-pointer ${
              selectedDate === day ? "ring-2 ring-blue-500 ring-inset" : ""
            }`}
          >
            <span
              className={`text-xs font-semibold p-0.5 ${
                selectedDate === day ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {day}
            </span>
            {day === 7 && (
              <div className="mt-0.5 text-[8px] bg-blue-50 text-blue-700 px-1 py-0.5 rounded font-medium truncate border border-blue-100">
                Webinar
              </div>
            )}
            {day === 8 && (
              <div className="mt-0.5 text-[8px] bg-blue-50 text-blue-700 px-1 py-0.5 rounded font-medium truncate border border-blue-100">
                2 Sessions
              </div>
            )}
            {day === 10 && (
              <div className="mt-0.5 text-[8px] bg-purple-50 text-purple-700 px-1 py-0.5 rounded font-medium truncate border border-purple-100">
                Mentorship
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CalendarViews: React.FC<CalendarViewProps> = ({
  view,
  selectedDate,
  onDateClick,
  sessions,
}) => {
  if (view === "day")
    return <DayView selectedDate={selectedDate} sessions={sessions} />;
  if (view === "month")
    return (
      <MonthView
        onDateClick={onDateClick}
        selectedDate={selectedDate}
        sessions={sessions}
      />
    );
  return <WeekView onDateClick={onDateClick} sessions={sessions} />;
};

export default CalendarViews;
