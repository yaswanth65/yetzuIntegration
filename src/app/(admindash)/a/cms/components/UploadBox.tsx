import React from "react";
import { Upload } from "lucide-react";

interface UploadBoxProps {
  label?: string;
  dimensions?: string;
  maxSize?: string;
}

export function UploadBox({
  label = "Drop a file or click to browse",
  dimensions = "36 x 36",
  maxSize = "10 MB",
}: UploadBoxProps) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-blue-300 rounded-xl p-6 h-[160px] w-full hover:bg-slate-50 transition-colors cursor-pointer bg-white">
      <Upload className="w-5 h-5 text-blue-600 mb-3" />
      <p className="text-[13px] text-slate-600 font-medium">{label}</p>
      <p className="text-xs text-slate-400 mt-1">
        {dimensions} ({maxSize} max)
      </p>
    </div>
  );
}
