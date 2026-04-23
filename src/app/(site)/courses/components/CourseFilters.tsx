import { Search, ChevronDown } from "lucide-react";

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
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#7A7A7A]" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-12 pr-4 py-3.5 border border-[#EEF0FB] rounded-xl leading-5 bg-[#F5F5F5] text-gray-900 placeholder-[#7A7A7A] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Search by"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative min-w-[180px]">
            <div className="flex items-center justify-between w-full px-4 py-3.5 bg-[#F5F5F5] border border-[#EEF0FB] rounded-xl text-[#7A7A7A] text-sm cursor-pointer hover:bg-gray-100 transition-colors">
              <span>Sort by</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <div className="relative min-w-[220px]">
            <div className="flex items-center justify-between w-full px-4 py-3.5 bg-[#F5F5F5] border border-[#EEF0FB] rounded-xl text-[#7A7A7A] text-sm cursor-pointer hover:bg-gray-100 transition-colors">
              <span>All category</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
