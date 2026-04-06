"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import CalendarViews from "./CalendarViews";
import SlotsSidePanel from "./SlotsSidePanel";
import { TRENDING_SKILLS, CALENDAR_SESSIONS } from "../constants";
import { EducatorAPI } from "@/lib/api";
import useSession from "@/hooks/useSession";

const MySessions: React.FC = () => {
  const { user, accessToken } = useSession();
  // Calendar view mode state: day, week, or month
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  // Currently selected date for the calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Controls visibility of the date picker dropdown
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Currently selected month in the date picker (0-11 for Jan-Dec)
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth());
  // Currently selected year in the date picker
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  // All calendar sessions/slots
  const [allSessions, setAllSessions] = useState(CALENDAR_SESSIONS);
  // Sessions from API
  const [sessionCards, setSessionCards] = useState(TRENDING_SKILLS.slice(0, 2));
  const [loading, setLoading] = useState(true);

  // Fetch sessions from API
  useEffect(() => {
    const fetchSessions = async () => {
      if (!accessToken || !user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await EducatorAPI.getMySessions( );
        if (response?.data) {
          // Map API data to calendar format
          if (response.data.sessions && Array.isArray(response.data.sessions)) {
            const mappedSessions = response.data.sessions.map((s: any, idx: number) => ({
              id: s.id || s._id || idx,
              title: s.title || s.name || "Session",
              dayIndex: new Date(s.startDateTime || s.date).getDay(),
              startHour: new Date(s.startDateTime || s.date).getHours(),
              duration: s.duration || 1,
              color: ["blue", "green", "purple"][idx % 3],
              timeString: s.timeString || `${new Date(s.startDateTime || s.date).getHours()}:00`,
              participants: s.participants || s.enrolledStudents || 0,
            }));
            setAllSessions(mappedSessions.length > 0 ? mappedSessions : CALENDAR_SESSIONS);
          }
          
          // Map API data to session cards
          if (response.data.upcomingSessions && Array.isArray(response.data.upcomingSessions)) {
            const mappedCards = response.data.upcomingSessions.slice(0, 2).map((s: any, idx: number) => ({
              id: s.id || s._id || idx,
              title: s.title || s.name || "Session",
              description: s.description || "Join this session",
              participants: s.participants || s.enrolledStudents || 0,
              images: s.participantImages || TRENDING_SKILLS[idx]?.images || []
            }));
            if (mappedCards.length > 0) {
              setSessionCards(mappedCards);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [accessToken, user?.id]);

  // Creates a new session slot and adds it to the calendar
  // Maps the SlotsSidePanel slot format to the Calendar session format
  const handleCreateSlot = (slotData: any) => {
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

  // Handles date selection from the date picker
  // Switches to day view when a date is clicked
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setViewMode("day");
    setShowDatePicker(false);
  };

  // Formats the selected date for display with ordinal suffix (e.g., "7th Jan, 2026")
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

  // Returns the number of days in the given month and year
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Returns the first day of the month (0-6, where 0=Monday)
  // Converts from Sunday=0 to Monday=0 format
  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  // Array of month names for the date picker dropdown
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

  // Navigates to the previous month in the date picker
  const goToPreviousMonth = () => {
    if (pickerMonth === 0) {
      setPickerMonth(11);
      setPickerYear(pickerYear - 1);
    } else {
      setPickerMonth(pickerMonth - 1);
    }
  };

  // Navigates to the next month in the date picker
  const goToNextMonth = () => {
    if (pickerMonth === 11) {
      setPickerMonth(0);
      setPickerYear(pickerYear + 1);
    } else {
      setPickerMonth(pickerMonth + 1);
    }
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 max-w-[1600px] mx-auto">
      {/* Top: Calendar Section */}
      <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl flex flex-col shadow-none overflow-hidden">
        {/* Calendar Header */}
        <div className="shrink-0 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
          <div className="relative w-full sm:w-auto">
            <p className="text-[10px] sm:text-xs text-gray-500 font-semibold mb-1 sm:mb-1.5 uppercase tracking-wide">
              Calendar
            </p>
            {/* Date display with dropdown trigger */}
            <div
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {getDateDisplay()}
              </h2>
              <ChevronDown
                size={20}
                className="text-gray-400 group-hover:text-gray-900 transition-colors"
              />
            </div>

            {/* Mini Calendar Picker */}
            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-4 z-50 w-[280px] sm:w-[320px] animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Month/Year Header with Navigation */}
                <div className="mb-3 flex items-center justify-between">
                  {/* Month and year selectors */}
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
                  {/* Navigation buttons */}
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
                  {/* Day of week headers */}
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                    <div
                      key={d}
                      className="text-center text-[10px] font-bold text-gray-500 py-1"
                    >
                      {d}
                    </div>
                  ))}

                  {/* Empty cells for offset before first day of month */}
                  {Array.from({
                    length: getFirstDayOfMonth(pickerMonth, pickerYear),
                  }).map((_, i) => (
                    <div key={`empty-${i}`} className="py-2" />
                  ))}

                  {/* Day cells */}
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

          {/* Search and view mode controls */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Search button */}
            <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
              <Search size={16} className="sm:hidden" />
              <Search size={18} className="hidden sm:block" />
            </button>
            {/* View mode toggle buttons (Day/Week/Month) */}
            <div className="flex bg-gray-100 rounded-lg p-0.5 sm:p-1 gap-0.5">
              {(["day", "week", "month"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-semibold capitalize transition-all ${
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
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
        {/* Left Side: Session Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {loading ? (
            <div className="col-span-2 flex items-center justify-center py-10">
              <Loader2 className="animate-spin text-blue-600" size={24} />
            </div>
          ) : (
            sessionCards.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col"
              >
                {/* Gray Placeholder for session thumbnail/image */}
                <div className="bg-gray-200 h-32 sm:h-[60%] shrink-0 w-full"></div>

                <div className="p-4 sm:p-6 flex flex-col gap-2 sm:gap-3 flex-1">
                  {/* Session title, description, and join button */}
                  <div className="flex justify-between items-start gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <button className="bg-[#042BFD] text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-none shadow-blue-500/30 hover:bg-blue-700 transition-all whitespace-nowrap shrink-0">
                      Join In
                    </button>
                  </div>

                  {/* Participant avatars and reschedule button */}
                  <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
                    <div className="flex items-center -space-x-2">
                      {item.images.slice(0, 3).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt=""
                          className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-none"
                        />
                      ))}
                      <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-[7px] sm:text-[9px] font-bold text-blue-800 shadow-none">
                        +{item.participants || 4}
                      </div>
                    </div>

                    <button className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors group">
                      Reschedule
                      <ChevronRight
                        size={12}
                        className="sm:w-[14px] sm:h-[14px] group-hover:translate-x-0.5 transition-transform"
                      />
                    </button>
                  </div>
              </div>
            </div>
          ))
          )}
        </div>

        {/* Right Side: Slots Panel for creating new sessions - Now visible on all screens */}
        <div className="w-full xl:w-[360px] shrink-0">
          <SlotsSidePanel onAddSession={handleCreateSlot} />
        </div>
      </div>
    </div>
  );
};

export default MySessions;
