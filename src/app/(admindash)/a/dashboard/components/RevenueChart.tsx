"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Filter } from "lucide-react";

interface RevenueItem {
  month: string;
  amount: number;
}

interface RevenueChartProps {
  revenueBreakdown: RevenueItem[];
}

const formatMonth = (month: string) => {
  if (!month) return "";
  const [year, monthNum] = month.split("-");
  if (!year || !monthNum) return month;
  const date = new Date(Number(year), Number(monthNum) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function RevenueChart({ revenueBreakdown }: RevenueChartProps) {
  const data = useMemo(
    () =>
      (revenueBreakdown || []).map((item) => ({
        month: formatMonth(item.month),
        amount: Number(item.amount || 0),
      })),
    [revenueBreakdown]
  );

  const totalRevenue = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 sm:p-8 w-full group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-blue-50 text-[#042BFD] rounded-xl">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Revenue Breakdown
            </h2>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Live revenue from the overview response
          </p>
        </div>
        <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#021165] hover:bg-blue-50 rounded-xl border border-transparent hover:border-blue-100 transition-all ml-auto sm:ml-0">
          <Filter size={20} />
        </button>
      </div>

      <div className="h-[350px] w-full mt-4">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-500">
            No revenue data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#042BFD" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#042BFD" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 700 }}
                tickLine={false}
                axisLine={false}
                dy={15}
              />
              <YAxis
                tickFormatter={(v) => `₹${v}`}
                tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 700 }}
                tickLine={false}
                axisLine={false}
                width={60}
              />
              <Tooltip
                formatter={(value) => [`₹${Number(value || 0)}`, "Revenue"]}
                cursor={{ stroke: "#021165", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#042BFD"
                strokeWidth={3}
                fill="url(#revenue-gradient)"
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0, fill: "#042BFD" }}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-gray-50 mt-4">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full shadow-[0_0_8px_currentColor] bg-[#042BFD]" />
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Revenue</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Total: ₹{totalRevenue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
