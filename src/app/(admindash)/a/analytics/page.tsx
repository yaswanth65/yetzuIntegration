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

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <Header />

        {/* Stats Cards */}
        <StatsCards />

        {/* Growth & Revenue Section */}
        <SectionLabel title="Growth & Revenue" />
        <div className="grid grid-cols-2 gap-5 mb-6">
          <UserGrowthChart />
          <RevenueChart />
        </div>

        {/* Student Distribution + Revenue Breakdown */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div className="col-span-1">
            <StudentDistributionChart />
          </div>
          <div className="col-span-2">
            <RevenueBreakdownChart />
          </div>
        </div>

        {/* Learning Outcomes Section */}
        <SectionLabel title="Learning Outcomes" />
        <div className="mb-6">
          <AssignmentPerformanceChart />
        </div>

        {/* Educators & Content Section */}
        <SectionLabel title="Educators & Content" />
        <div className="mb-6">
          <EducatorsContent />
        </div>

        {/* Platform Insights Section */}
        <SectionLabel title="Platform Insights" />
        <div className="mb-6">
          <FeatureUsageChart />
        </div>

      </div>
    </div>
  );
}