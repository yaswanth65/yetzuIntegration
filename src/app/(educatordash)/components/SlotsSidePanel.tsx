"use client";

import React, { useState } from "react";
import { Calendar, X, Plus } from "lucide-react";

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
  duration: string;
}

const DAYS = [
  { day: "Mon", date: "12" },
  { day: "Tue", date: "13" },
  { day: "Wed", date: "14" },
  { day: "Thu", date: "15" },
  { day: "Fri", date: "16" },
  { day: "Sat", date: "17" },
  { day: "Sun", date: "18" },
];

interface SlotsSidePanelProps {
  onAddSession?: (session: any) => void;
}

const SlotsSidePanel: React.FC<SlotsSidePanelProps> = ({ onAddSession }) => {
  const [view, setView] = useState<"empty" | "create" | "list">("empty");
  const [selectedDay, setSelectedDay] = useState(0);
  const [slots, setSlots] = useState<Slot[]>([]);

  const [startHour, setStartHour] = useState("10");
  const [startMin, setStartMin] = useState("30");
  const [startAmPm, setStartAmPm] = useState("AM");
  const [endHour, setEndHour] = useState("11");
  const [endMin, setEndMin] = useState("00");
  const [endAmPm, setEndAmPm] = useState("AM");

  const handleCreateSlot = () => {
    // Parse time for calculation
    let sH = parseInt(startHour);
    if (startAmPm === "PM" && sH !== 12) sH += 12;
    if (startAmPm === "AM" && sH === 12) sH = 0;

    let eH = parseInt(endHour);
    if (endAmPm === "PM" && eH !== 12) eH += 12;
    if (endAmPm === "AM" && eH === 12) eH = 0;

    const startTotalMins = sH * 60 + parseInt(startMin);
    const endTotalMins = eH * 60 + parseInt(endMin);
    const durationMins = endTotalMins - startTotalMins;

    const newSlot: Slot = {
      id: Date.now().toString(),
      startTime: `${startHour}:${startMin} ${startAmPm}`,
      endTime: `${endHour}:${endMin} ${endAmPm}`,
      duration: `${durationMins} mins`,
    };
    setSlots([...slots, newSlot]);

    // Add to Calendar View
    if (onAddSession) {
      onAddSession({
        dayIndex: selectedDay,
        startHour: sH,
        startMinute: parseInt(startMin),
        durationMinutes: durationMins,
        timeString: `${startHour}:${startMin} ${startAmPm} - ${endHour}:${endMin} ${endAmPm}`,
      });
    }

    setView("list");
  };

  const handleRemoveSlot = (id: string) => {
    const updated = slots.filter((s) => s.id !== id);
    setSlots(updated);
    if (updated.length === 0) setView("empty");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl w-full h-full flex flex-col shadow-none">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center border-b border-gray-200 shrink-0 bg-white">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Calendar
            size={18}
            className="sm:w-5 sm:h-5 text-gray-900"
            strokeWidth={2}
          />
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            Slots
          </h3>
        </div>
        {view === "list" && (
          <button
            onClick={() => setView("create")}
            className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            <Plus size={16} strokeWidth={2.5} /> Add slot
          </button>
        )}
      </div>

      {/* Date Strip */}
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 shrink-0 bg-gray-50/50">
        <div className="flex justify-between items-center gap-0.5 sm:gap-1">
          {DAYS.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex flex-col items-center justify-center w-8 h-10 sm:w-10 sm:h-12 rounded-lg transition-all duration-200 text-[8px] sm:text-[10px] font-semibold ${
                selectedDay === index
                  ? "bg-gray-900 text-white shadow-none scale-105"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="font-medium opacity-80">{day.day}</span>
              <span className="font-bold">{day.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-4 sm:p-6 overflow-hidden min-h-0">
        {view === "empty" && (
          <div className="flex flex-col items-center justify-center py-4 sm:py-6 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50/80 rounded-full flex items-center justify-center mb-2 sm:mb-3 relative">
              <Calendar
                size={20}
                className="sm:w-6 sm:h-6 text-blue-600 relative z-10"
              />
              <div className="absolute top-3 sm:top-4 right-4 sm:right-5 w-1 h-1 bg-blue-300 rounded-full"></div>
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 w-1 h-1 bg-blue-300 rounded-full"></div>
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
              No Slots For Today?
            </h3>
            <p className="text-[8px] sm:text-[9px] text-gray-400 mb-3 sm:mb-4 max-w-[140px] sm:max-w-[160px] leading-snug">
              Please create slots for Class Schedule
            </p>
            <button
              onClick={() => setView("create")}
              className="bg-[#042BFD] hover:bg-blue-700 text-white text-[10px] sm:text-xs font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg w-fit transition-all shadow-md shadow-blue-600/20"
            >
              Create Slot
            </button>
          </div>
        )}

        {view === "create" && (
          <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300 h-full">
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 mb-3 text-sm">
              {/* Start Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Start Time
                </label>

                <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white w-fit shadow-none">
                  <button
                    onClick={() => setStartAmPm("AM")}
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] transition-colors ${startAmPm === "AM" ? "bg-[#042BFD] text-white" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setStartAmPm("PM")}
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] transition-colors ${startAmPm === "PM" ? "bg-[#042BFD] text-white" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    PM
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    className="w-9 h-8 border border-blue-600 rounded-lg text-center text-base font-semibold text-gray-900 outline-none ring-1 ring-blue-100"
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                  />
                  <span className="font-bold text-gray-400">:</span>
                  <input
                    type="text"
                    className="w-9 h-8 bg-gray-100 border border-transparent rounded-lg text-center text-base font-semibold text-gray-900 outline-none focus:bg-white focus:border-blue-400 transition-colors"
                    value={startMin}
                    onChange={(e) => setStartMin(e.target.value)}
                  />
                </div>
              </div>

              {/* End Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  End Time
                </label>

                <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white w-fit shadow-none">
                  <button
                    onClick={() => setEndAmPm("AM")}
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] transition-colors ${endAmPm === "AM" ? "bg-[#042BFD] text-white" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setEndAmPm("PM")}
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] transition-colors ${endAmPm === "PM" ? "bg-[#042BFD] text-white" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    PM
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    className="w-9 h-8 bg-gray-100 border border-transparent rounded-lg text-center text-base font-semibold text-gray-900 outline-none focus:bg-white focus:border-blue-400 transition-colors"
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                  />
                  <span className="font-bold text-gray-400">:</span>
                  <input
                    type="text"
                    className="w-9 h-8 bg-gray-100 border border-transparent rounded-lg text-center text-base font-semibold text-gray-900 outline-none focus:bg-white focus:border-blue-400 transition-colors"
                    value={endMin}
                    onChange={(e) => setEndMin(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <p className="text-[9px] text-gray-500 text-center mb-3">
              Your session should be{" "}
              <span className="font-bold text-gray-900">60 mins</span> long
            </p>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={handleCreateSlot}
                className="flex-1 bg-[#042BFD] hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-all shadow-md shadow-blue-600/20"
              >
                Save
              </button>
              <button
                onClick={() => setView(slots.length > 0 ? "list" : "empty")}
                className="flex-1 bg-[#A1A5B7] hover:bg-gray-500 text-white text-xs font-bold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {view === "list" && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col gap-2 mb-3 overflow-y-auto pr-1">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-[#042BFD] text-white rounded-lg px-3 py-2 flex items-center justify-between shadow-none shadow-blue-600/25 relative group shrink-0"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide">
                    <span>{slot.startTime}</span>
                    <span className="opacity-70">→</span>
                    <span>{slot.endTime}</span>
                    <span className="font-medium opacity-70 text-[8px]">
                      ({slot.duration})
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveSlot(slot.id)}
                    className="text-white/70 hover:text-white p-0.5 rounded-full transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {slots.length < 2 && (
                <>
                  <div className="bg-[#042BFD] text-white rounded-lg px-3 py-2 flex items-center justify-between shadow-none shadow-blue-600/25 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide">
                      <span>10:30 AM</span>
                      <span className="opacity-70">→</span>
                      <span>11:00 AM</span>
                      <span className="font-medium opacity-70 text-[8px]">
                        (30 mins)
                      </span>
                    </div>
                    <button className="text-white/70 hover:text-white p-0.5 rounded-full transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="bg-[#042BFD] text-white rounded-lg px-3 py-2 flex items-center justify-between shadow-none shadow-blue-600/25 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide">
                      <span>10:30 AM</span>
                      <span className="opacity-70">→</span>
                      <span>11:00 AM</span>
                      <span className="font-medium opacity-70 text-[8px]">
                        (30 mins)
                      </span>
                    </div>
                    <button className="text-white/70 hover:text-white p-0.5 rounded-full transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="mt-auto text-center pt-1.5 border-t border-gray-50">
              <p className="text-[9px] text-gray-500">
                Your sessions for today are{" "}
                <span className="font-bold text-gray-900">1 hr 30 mins</span>{" "}
                long
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotsSidePanel;
