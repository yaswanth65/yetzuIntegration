"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Check } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  title: string;
  type: "checkboxes" | "text" | "number-range" | "select";
  options?: FilterOption[];
  placeholder?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, any>) => void;
  onReset: () => void;
  sections: FilterSection[];
  activeFilters: Record<string, any>;
}

export default function FilterPanel({
  isOpen,
  onClose,
  onApply,
  onReset,
  sections,
  activeFilters,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<Record<string, any>>(activeFilters);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleCheckboxChange = (sectionTitle: string, value: string, checked: boolean) => {
    setFilters((prev) => {
      const currentValues = prev[sectionTitle] || [];
      if (checked) {
        return { ...prev, [sectionTitle]: [...currentValues, value] };
      } else {
        return { ...prev, [sectionTitle]: currentValues.filter((v: string) => v !== value) };
      }
    });
  };

  const handleTextChange = (sectionTitle: string, value: string) => {
    setFilters((prev) => ({ ...prev, [sectionTitle]: value }));
  };

  const handleNumberRangeChange = (
    sectionTitle: string,
    field: "min" | "max",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [sectionTitle]: { ...(prev[sectionTitle] || {}), [field]: value },
    }));
  };

  const handleSelectChange = (sectionTitle: string, value: string) => {
    setFilters((prev) => ({ ...prev, [sectionTitle]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
    onReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 z-50">
      <div
        ref={panelRef}
        className="w-[480px] bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Filters</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                {section.title}
              </h4>

              {/* Checkboxes */}
              {section.type === "checkboxes" && section.options && (
                <div className="grid grid-cols-2 gap-2">
                  {section.options.map((option) => {
                    const isChecked = (filters[section.title] || []).includes(option.value);
                    return (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                          isChecked
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                        onClick={() =>
                          handleCheckboxChange(section.title, option.value, !isChecked)
                        }
                      >
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                            isChecked
                              ? "border-blue-500 bg-blue-500 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span className="text-sm font-medium">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Text Input */}
              {section.type === "text" && (
                <input
                  type="text"
                  placeholder={section.placeholder || "Search..."}
                  value={filters[section.title] || ""}
                  onChange={(e) => handleTextChange(section.title, e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              )}

              {/* Number Range */}
              {section.type === "number-range" && (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder={section.minPlaceholder || "Min"}
                    value={(filters[section.title] || {}).min || ""}
                    onChange={(e) =>
                      handleNumberRangeChange(section.title, "min", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder={section.maxPlaceholder || "Max"}
                    value={(filters[section.title] || {}).max || ""}
                    onChange={(e) =>
                      handleNumberRangeChange(section.title, "max", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Select */}
              {section.type === "select" && section.options && (
                <select
                  value={filters[section.title] || ""}
                  onChange={(e) => handleSelectChange(section.title, e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="">All</option>
                  {section.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
