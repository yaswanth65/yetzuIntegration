import { Search } from "lucide-react";

interface CourseFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
  sessionTypes: string[];
  sessionType: string;
  setSessionType: (value: string) => void;
}

export default function CourseFilters({
  search,
  setSearch,
  sortBy,
  setSortBy,
  category,
  setCategory,
  categories,
  sessionTypes,
  sessionType,
  setSessionType,
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
            placeholder="Search by title or description..."
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative min-w-[180px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#F5F5F5] border border-[#EEF0FB] rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A7A7A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat',
                paddingRight: '36px'
              }}
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="date-asc">Date: Earliest</option>
              <option value="date-desc">Date: Latest</option>
              <option value="title-asc">Name: A-Z</option>
              <option value="title-desc">Name: Z-A</option>
            </select>
          </div>
          <div className="relative min-w-[180px]">
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#F5F5F5] border border-[#EEF0FB] rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A7A7A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat',
                paddingRight: '36px'
              }}
            >
              <option value="">All Types</option>
              {sessionTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="relative min-w-[180px]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#F5F5F5] border border-[#EEF0FB] rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A7A7A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat',
                paddingRight: '36px'
              }}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
