import React from "react";
import { UploadBox } from "./UploadBox";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

export function TextField({ label, value, onChange, multiline, placeholder }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600 min-h-[80px] resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600"
        />
      )}
    </div>
  );
}

interface ImageUploadProps {
  label: string;
  dimensions?: string;
  maxSize?: string;
}

export function ImageUpload({ label, dimensions = "36 x 36", maxSize = "10 MB" }: ImageUploadProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <UploadBox dimensions={dimensions} maxSize={maxSize} />
    </div>
  );
}

interface ArrayFieldProps {
  label: string;
  items: Array<{ title: string; description: string }>;
  onChange: (items: Array<{ title: string; description: string }>) => void;
  titleLabel?: string;
  descLabel?: string;
}

export function ArrayField({ label, items, onChange, titleLabel = "Title", descLabel = "Description" }: ArrayFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-3">{label}</label>
      {items.map((item, idx) => (
        <div key={idx} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
          <input
            type="text"
            value={item.title}
            onChange={(e) => {
              const newItems = [...items];
              newItems[idx].title = e.target.value;
              onChange(newItems);
            }}
            placeholder={titleLabel}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <textarea
            value={item.description}
            onChange={(e) => {
              const newItems = [...items];
              newItems[idx].description = e.target.value;
              onChange(newItems);
            }}
            placeholder={descLabel}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="mt-2 text-xs text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, { title: "", description: "" }])}
        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
      >
        + Add Item
      </button>
    </div>
  );
}

interface StatsFieldProps {
  items: Array<{ num: string; label: string }>;
  onChange: (items: Array<{ num: string; label: string }>) => void;
}

export function StatsField({ items, onChange }: StatsFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-3">Stats</label>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <input
              type="text"
              value={item.num}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx].num = e.target.value;
                onChange(newItems);
              }}
              placeholder="Number (e.g. 200+)"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <input
              type="text"
              value={item.label}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx].label = e.target.value;
                onChange(newItems);
              }}
              placeholder="Label"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface CardFieldProps {
  items: Array<{
    title: string;
    desc: string;
    bgColor: string;
    iconBg: string;
    titleColor: string;
    descColor: string;
  }>;
  onChange: (items: any[]) => void;
}

export function CardField({ items, onChange }: CardFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-3">Cards</label>
      {items.map((item, idx) => (
        <div key={idx} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
          <input
            type="text"
            value={item.title}
            onChange={(e) => {
              const newItems = [...items];
              newItems[idx].title = e.target.value;
              onChange(newItems);
            }}
            placeholder="Title"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <textarea
            value={item.desc}
            onChange={(e) => {
              const newItems = [...items];
              newItems[idx].desc = e.target.value;
              onChange(newItems);
            }}
            placeholder="Description"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 mb-2"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={item.bgColor}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx].bgColor = e.target.value;
                onChange(newItems);
              }}
              placeholder="BG Color (e.g. bg-[#E6EAFF])"
              className="px-3 py-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <input
              type="text"
              value={item.iconBg}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx].iconBg = e.target.value;
                onChange(newItems);
              }}
              placeholder="Icon BG (e.g. bg-[#9BAAFE])"
              className="px-3 py-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
