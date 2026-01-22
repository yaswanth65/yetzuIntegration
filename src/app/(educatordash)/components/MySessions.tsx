"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import CalendarViews from "./CalendarViews";
import SlotsSidePanel from "./SlotsSidePanel";
import { TRENDING_SKILLS, CALENDAR_SESSIONS } from "../constants";

const MySessions: React.FC = () => {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 7)); // Full Date object
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMonth, setPickerMonth] = useState(0); // 0-11 for Jan-Dec
  const [pickerYear, setPickerYear] = useState(2026);
  const [allSessions, setAllSessions] = useState(CALENDAR_SESSIONS);

  const handleCreateSlot = (slotData: any) => {
    // Map SlotsSidePanel format to Calendar format
    // SlotData comes as { dayIndex, startHour, startMinute, durationMinutes, ... }
    const newSession = {
      id: Date.now(),
      title: "New Session",
      color: "blue",
      participants: 0,
      timeString: slotData.timeString,
      ...slotData,
    };
    setAllSessions((prev) => [...prev, newSession]);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setViewMode("day");
    setShowDatePicker(false);
  };

  const getDateDisplay = () => {
    const day = selectedDate.getDate();
    const month = selectedDate.toLocaleString("en-US", { month: "short" });
    const year = selectedDate.getFullYear();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
            ? "rd"
            : "th";
    return `${day}${suffix} ${month}, ${year}`;
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday=0 to Monday=0
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const goToPreviousMonth = () => {
    if (pickerMonth === 0) {
      setPickerMonth(11);
      setPickerYear(pickerYear - 1);
    } else {
      setPickerMonth(pickerMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (pickerMonth === 11) {
      setPickerMonth(0);
      setPickerYear(pickerYear + 1);
    } else {
      setPickerMonth(pickerMonth + 1);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto">
      {/* Top: Calendar Section */}
      <div className="bg-white border border-gray-200 rounded-2xl flex flex-col shadow-none overflow-hidden">
        {/* Calendar Header */}
        <div className="shrink-0 px-6 py-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
          <div className="relative">
            <p className="text-xs text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">
              Calendar
            </p>
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <h2 className="text-2xl font-bold text-gray-900">
                {getDateDisplay()}
              </h2>
              <ChevronDown
                size={20}
                className="text-gray-400 group-hover:text-gray-900 transition-colors"
              />
            </div>

            {/* Mini Calendar Picker */}
            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-50 w-[320px] animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Month/Year Header with Navigation */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <select
                      value={pickerMonth}
                      onChange={(e) => setPickerMonth(Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm font-bold text-gray-900 bg-transparent border-none outline-none cursor-pointer hover:text-blue-600"
                    >
                      {monthNames.map((month, idx) => (
                        <option key={idx} value={idx}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      value={pickerYear}
                      onChange={(e) => setPickerYear(Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm font-bold text-gray-900 bg-transparent border-none outline-none cursor-pointer hover:text-blue-600"
                    >
                      {Array.from({ length: 21 }, (_, i) => 2020 + i).map(
                        (year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPreviousMonth();
                      }}
                      className="p-1 text-gray-400 hover:text-gray-900 transition-colors rounded hover:bg-gray-100"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNextMonth();
                      }}
                      className="p-1 text-gray-400 hover:text-gray-900 transition-colors rounded hover:bg-gray-100"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDatePicker(false);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-900 transition-colors rounded hover:bg-gray-100"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                    <div
                      key={d}
                      className="text-center text-[10px] font-bold text-gray-500 py-1"
                    >
                      {d}
                    </div>
                  ))}

                  {/* Empty cells for offset */}
                  {Array.from({
                    length: getFirstDayOfMonth(pickerMonth, pickerYear),
                  }).map((_, i) => (
                    <div key={`empty-${i}`} className="py-2" />
                  ))}

                  {/* Days */}
                  {Array.from(
                    { length: getDaysInMonth(pickerMonth, pickerYear) },
                    (_, i) => i + 1,
                  ).map((day) => {
                    const dateObj = new Date(pickerYear, pickerMonth, day);
                    const isSelected =
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === pickerMonth &&
                      selectedDate.getFullYear() === pickerYear;

                    return (
                      <button
                        key={day}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDateClick(dateObj);
                        }}
                        className={`text-xs font-semibold py-2 rounded-lg transition-all hover:bg-blue-50 ${
                          isSelected
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
              <Search size={18} />
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1 gap-0.5">
              {(["day", "week", "month"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                    viewMode === mode
                      ? "bg-white text-gray-900 shadow-none"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar View Container */}
        <div className="relative">
          <CalendarViews
            view={viewMode}
            selectedDate={selectedDate.getDate()}
            onDateClick={(day) =>
              handleDateClick(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  day,
                ),
              )
            }
            sessions={allSessions}
          />
        </div>
      </div>

      {/* Bottom: Session Cards + Slots Panel */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Side: Session Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRENDING_SKILLS.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col"
            >
              {/* Gray Placeholder */}
              <div className="bg-gray-200 h-[60%] shrink-0 w-full"></div>

              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <button className="bg-[#042BFD] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all whitespace-nowrap shrink-0">
                    Join In
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center -space-x-2">
                    {item.images.slice(0, 4).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        className="w-7 h-7 rounded-full border-2 border-white shadow-none"
                      />
                    ))}
                    <div className="w-7 h-7 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-[9px] font-bold text-blue-800 shadow-none">
                      +4
                    </div>
                  </div>

                  <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors group">
                    Reschedule
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Slots Panel */}
        <div className="w-full xl:w-[360px] shrink-0 hidden lg:block">
          <SlotsSidePanel onAddSession={handleCreateSlot} />
        </div>
      </div>
    </div>
  );
};

export default MySessions;
