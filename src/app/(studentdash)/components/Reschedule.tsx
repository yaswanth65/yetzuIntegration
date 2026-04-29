"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, Clock, X, Monitor } from "lucide-react";
import { StudentAPI } from "@/lib/api";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId?: string;
  sessionTitle?: string;
  sessionDate?: string;
  sessionTime?: string;
  mentorName?: string;
  sessionStartIso?: string;
}

interface SuggestedSlot {
  id: number;
  date: string;
  time: string;
  proposedDate: string;
}

const formatSlotDate = (value: Date) =>
  value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatSlotTime = (start: Date, end: Date) =>
  `${start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })} - ${end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;

const createSuggestedSlots = (sessionStartIso?: string): SuggestedSlot[] => {
  const start = sessionStartIso ? new Date(sessionStartIso) : new Date();
  const baseStart = Number.isNaN(start.getTime()) ? new Date() : start;
  const normalizedBase = new Date(baseStart);

  if (Number.isNaN(normalizedBase.getTime())) {
    normalizedBase.setHours(10, 0, 0, 0);
  }

  const offsets = [
    { days: 1, hours: 0 },
    { days: 1, hours: 1 },
    { days: 2, hours: 0 },
    { days: 2, hours: 1 },
    { days: 3, hours: 0 },
  ];

  return offsets.map((offset, index) => {
    const slotStart = new Date(normalizedBase);
    slotStart.setDate(normalizedBase.getDate() + offset.days);
    slotStart.setHours(normalizedBase.getHours() + offset.hours);

    const slotEnd = new Date(slotStart);
    slotEnd.setHours(slotStart.getHours() + 1);

    return {
      id: index + 1,
      date: formatSlotDate(slotStart),
      time: formatSlotTime(slotStart, slotEnd),
      proposedDate: slotStart.toISOString(),
    };
  });
};

export default function RescheduleModal({
  isOpen,
  onClose,
  courseId,
  sessionTitle = "Session",
  sessionDate = "TBD",
  sessionTime = "TBD",
  mentorName = "Educator",
  sessionStartIso,
}: RescheduleModalProps) {
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [reason, setReason] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const touchStartY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const currentTranslate = useRef(0);

  const suggestedSlots = useMemo(() => createSuggestedSlots(sessionStartIso), [sessionStartIso]);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedSlots([]);
    setReason("");
    setAdditionalMessage("");
    setError("");
    if (sheetRef.current) {
      sheetRef.current.style.transform = "translateY(0)";
      sheetRef.current.style.transition = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    currentTranslate.current = 0;
    isDragging.current = true;
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta < 0) return;
    currentTranslate.current = delta;
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    const dragDistance = currentTranslate.current;

    if (sheetRef.current) {
      if (dragDistance > 100) {
        sheetRef.current.style.transition = "transform 0.3s ease";
        sheetRef.current.style.transform = "translateY(100%)";
        setTimeout(() => {
          onClose();
        }, 280);
      } else {
        sheetRef.current.style.transition = "transform 0.3s ease";
        sheetRef.current.style.transform = "translateY(0)";
      }
    }

    currentTranslate.current = 0;
  };

  const toggleSlot = (id: number) => {
    setSelectedSlots((prev) => (prev.includes(id) ? prev.filter((slotId) => slotId !== id) : [...prev, id]));
    setError("");
  };

  const handleConfirm = async () => {
    if (!courseId) {
      setError("This session is missing a course reference, so rescheduling cannot be submitted yet.");
      return;
    }

    if (!reason.trim()) {
      setError("Please provide a reason before submitting your reschedule request.");
      return;
    }

    if (!selectedSlots.length) {
      setError("Please select at least one suggested time slot.");
      return;
    }

    const selectedSlot = suggestedSlots.find((slot) => slot.id === selectedSlots[0]);

    if (!selectedSlot) {
      setError("Please choose a valid time slot.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const combinedReason = additionalMessage.trim()
        ? `${reason}\n\nAdditional Message: ${additionalMessage}`
        : reason;

      await StudentAPI.rescheduleCourse({
        courseId,
        reason: combinedReason,
        proposedDate: selectedSlot.proposedDate,
      });

      onClose();
    } catch (requestError: any) {
      console.error("Student reschedule request failed", requestError);
      setError(requestError?.message || "Unable to submit the reschedule request right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end font-sans">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div
        ref={sheetRef}
        className="
          fixed bottom-0 left-0 z-[101] flex h-[92vh] w-full flex-col rounded-t-[24px] bg-white shadow-2xl
          animate-in slide-in-from-bottom duration-300
          md:relative md:h-full md:w-full md:max-w-[480px] md:rounded-none md:slide-in-from-right
        "
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="shrink-0 flex justify-center pt-3 pb-1 md:hidden touch-none">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 md:px-8 md:py-8">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 shadow-sm md:h-11 md:w-11">
              <Monitor size={20} className="text-gray-700" />
            </div>
            <button onClick={onClose} className="hidden -mr-1 p-1 text-gray-400 transition-colors hover:text-gray-900 md:flex">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <h2 className="mb-5 text-[18px] font-semibold text-gray-900 md:text-[22px]">Reschedule Session</h2>

          <div className="mb-6 rounded-[14px] border border-gray-100 bg-[#F9FAFB] p-4">
            <p className="mb-1.5 text-[14px] font-semibold uppercase tracking-wide text-gray-400">Current Session</p>
            <h3 className="mb-2.5 text-[18px] font-semibold leading-snug text-gray-900">{sessionTitle}</h3>
            <div className="mb-1.5 flex items-center gap-4 text-[14px] text-gray-600">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-gray-400" />
                <span>{sessionDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-gray-400" />
                <span>{sessionTime}</span>
              </div>
            </div>
            <p className="text-[12px] text-gray-500">with {mentorName}</p>
          </div>

          {error ? (
            <div className="mb-6 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          ) : null}

          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-medium text-gray-900">
              Reason for Rescheduling <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
              rows={4}
              className="w-full resize-none rounded-[12px] border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 transition-all focus:border-[#042BFD] focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20"
              placeholder="Please provide a brief explanation for the student..."
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-medium text-gray-900">
              Suggest Alternative Times <span className="text-red-500">*</span>
            </label>
            <div className="mb-2 grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {suggestedSlots.map((slot) => {
                const isSelected = selectedSlots.includes(slot.id);
                return (
                  <div
                    key={slot.id}
                    onClick={() => toggleSlot(slot.id)}
                    className={`cursor-pointer select-none rounded-[12px] border px-4 py-3 transition-all ${
                      isSelected
                        ? "border-[#042BFD] bg-[#F0F2FF]"
                        : "border-gray-200 bg-white hover:border-[#042BFD]/40 hover:bg-[#F5F6FF]/50"
                    }`}
                  >
                    <p className={`mb-0.5 text-[16px] font-semibold ${isSelected ? "text-[#042BFD]" : "text-gray-900"}`}>
                      {slot.date}
                    </p>
                    <p className={`text-[14px] ${isSelected ? "font-medium text-[#042BFD]/70" : "text-gray-500"}`}>
                      {slot.time}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-[14px] text-gray-400">Select one or more time slots to offer the educator.</p>
          </div>

          <div className="mb-2">
            <label className="mb-2 block text-[14px] font-medium text-gray-900">
              Additional Message <span className="font-normal text-gray-400">(Optional)</span>
            </label>
            <textarea
              value={additionalMessage}
              onChange={(e) => setAdditionalMessage(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-[12px] border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 transition-all focus:border-[#042BFD] focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20"
              placeholder="Add any additional context for the educator..."
            />
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-100 bg-white px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:px-8 md:py-6">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 rounded-[10px] border border-gray-200 bg-white py-3 text-[14px] font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 rounded-[10px] bg-[#042BFD] py-3 text-[14px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
