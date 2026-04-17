import React from 'react';

interface SectionLabelProps {
  title: string;
}

export default function SectionLabel({ title }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
        {title}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}