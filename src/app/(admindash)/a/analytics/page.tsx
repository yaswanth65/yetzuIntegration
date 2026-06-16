"use client";

import React, { useEffect, useMemo, useState } from "react";
import Header from '@/app/(admindash)/a/analytics/components/Header';
import StatsCards from '@/app/(admindash)/a/analytics/components/StatsCards';
import UserGrowthChart from '@/app/(admindash)/a/analytics/components/UserGrowthChart';
import RevenueChart from '@/app/(admindash)/a/analytics/components/RevenueChart';
import StudentDistributionChart from '@/app/(admindash)/a/analytics/components/StudentDistributionChart';
import RevenueBreakdownChart from '@/app/(admindash)/a/analytics/components/RevenueBreakdownChart';
import AssignmentPerformanceChart from '@/app/(admindash)/a/analytics/components/AssignmentPerformanceChart';
import EducatorsContent from '@/app/(admindash)/a/analytics/components/EducatorsContent';
import FeatureUsageChart from '@/app/(admindash)/a/analytics/components/FeatureUsageChart';
import SectionLabel from '@/app/(admindash)/a/analytics/components/SectionLabel';
import { AdminAPI } from "@/lib/api";
import type {
  AnalyticsActivityItem,
  AnalyticsApiResponse,
  AnalyticsChartBlock,
  AnalyticsEngagement,
  AnalyticsOverview,
  AnalyticsRangeDays,
  AnalyticsResponseData,
  AnalyticsTicket,
} from "./types";

const DEFAULT_RANGE: AnalyticsRangeDays = 30;

const safeBlock = (chart?: AnalyticsChartBlock) => chart || { labels: [], series: [] };

export default function AnalyticsPage() {
  const [rangeDays, setRangeDays] = useState<AnalyticsRangeDays>(DEFAULT_RANGE);
  const [data, setData] = useState<AnalyticsResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = (await AdminAPI.getAnalytics({ rangeDays })) as AnalyticsApiResponse | any;
        const payload = response?.data?.data ?? response?.data ?? response;
        if (!active) return;
        setData(payload || null);
      } catch (err: any) {
        if (!active) return;
        setError(err?.response?.data?.message || err?.message || "Failed to load analytics.");
        setData(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchAnalytics();
    return () => {
      active = false;
    };
  }, [rangeDays]);

  const overview: AnalyticsOverview = data?.overview || {};
  const charts = data?.charts || {};
  const activityFeed: AnalyticsActivityItem[] = Array.isArray(data?.activityFeed) ? data?.activityFeed : [];
  const engagement: AnalyticsEngagement = data?.engagement || {};
  const tickets: AnalyticsTicket[] = Array.isArray(data?.tickets) ? data?.tickets : [];

  const handleExport = async (format: "csv" | "json") => {
    try {
      setExporting(true);
      const response = await AdminAPI.exportAnalytics({
        rangeDays,
        format: format === "json" ? "json" : undefined,
      });

      if (format === "json") {
        const payload = response?.data?.data ?? response?.data ?? response;
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `analytics-${rangeDays}d.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        return;
      }

      const blob = response?.data instanceof Blob ? response.data : new Blob([response?.data], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics-${rangeDays}d.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      setError("Failed to export analytics.");
    } finally {
      setExporting(false);
    }
  };

  const userGrowth = useMemo(() => safeBlock(charts.userGrowth), [charts.userGrowth]);
  const revenue = useMemo(() => safeBlock(charts.revenue), [charts.revenue]);
  const revenueBreakdown = useMemo(() => safeBlock(charts.revenueBreakdown), [charts.revenueBreakdown]);
  const assignmentPerformance = useMemo(() => safeBlock(charts.assignmentPerformance), [charts.assignmentPerformance]);

  return (
    <div className="overflow-x-hidden w-full flex flex-col gap-6">
      <Header
        rangeDays={rangeDays}
        onRangeDaysChange={(value) => setRangeDays(value as AnalyticsRangeDays)}
        onExportCsv={() => handleExport("csv")}
        onExportJson={() => handleExport("json")}
        loading={loading || exporting}
      />

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <p className="text-sm text-gray-500">Loading analytics...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-xl border border-red-100 p-5">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : null}

      <StatsCards overview={overview} />

      <SectionLabel title="Growth & Revenue" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <UserGrowthChart data={userGrowth} />
        <RevenueChart data={revenue} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
        <div className="col-span-1">
          <StudentDistributionChart />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <RevenueBreakdownChart data={revenueBreakdown} />
        </div>
      </div>

      <SectionLabel title="Learning Outcomes" />
      <div className="w-full">
        <AssignmentPerformanceChart data={assignmentPerformance} />
      </div>

      <SectionLabel title="Educators & Content" />
      <div className="w-full">
        <EducatorsContent items={activityFeed} />
      </div>

      <SectionLabel title="Platform Insights" />
      <div className="w-full">
        <FeatureUsageChart tickets={tickets} />
      </div>
    </div>
  );
}
