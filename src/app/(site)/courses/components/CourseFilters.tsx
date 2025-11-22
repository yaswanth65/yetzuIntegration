"use client";

import { Search } from "lucide-react";

interface CourseFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    minCost: number | "";
    setMinCost: (value: number | "") => void;
    maxCost: number | "";
    setMaxCost: (value: number | "") => void;
}

export default function CourseFilters({
    search,
    setSearch,
    minCost,
    setMinCost,
    maxCost,
    setMaxCost,
}: CourseFiltersProps) {
    return (
        <div className="w-full bg-white py-4 sticky top-[68px] z-30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:max-w-xs border-1 border-gray-400 rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 px-3 border-none rounded-lg leading-5 bg-[#F5F5F5] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        placeholder="Search by title..."
                    />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 whitespace-nowrap">Price Range:</span>
                        <input
                            type="number"
                            placeholder="Min"
                            value={minCost}
                            // onChange={(e) => setMinCost(e.target.value ? Number(e.target.value) : "")}
                            className="w-24 px-3 py-2 bg-[#F5F5F5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxCost}
                            // onChange={(e) => setMaxCost(e.target.value ? Number(e.target.value) : "")}
                            className="w-24 px-3 py-2 bg-[#F5F5F5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
