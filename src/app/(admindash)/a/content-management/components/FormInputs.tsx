"use client";

import React from "react";
import { Upload } from "lucide-react";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 bg-gray-50"
      />
    </div>
  );
};

interface TextAreaInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  onChange?: (value: string) => void;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  placeholder,
  value,
  rows = 3,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 resize-none bg-gray-50"
      />
    </div>
  );
};

interface ImageUploadProps {
  label: string;
  maxSizeMB?: number;
  dimensions?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  maxSizeMB = 10,
  dimensions,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white">
        <div className="flex flex-col items-center gap-2">
          <Upload size={24} className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">
              Drop a file or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {dimensions || `1013 × 835 (${maxSizeMB} MB max)`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  collapsible?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  collapsible = false,
}) => {
  return (
    <div className="py-4 border-b border-gray-200">
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
    </div>
  );
};

interface NumberInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 bg-gray-50"
      />
    </div>
  );
};

interface ButtonInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const ButtonInput: React.FC<ButtonInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 bg-gray-50"
      />
    </div>
  );
};
