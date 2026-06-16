'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Edit2, Pause, MoreHorizontal } from 'lucide-react';
import { AdminAPI } from '@/lib/api';
import OverviewTab from './components/OverviewTab';
import StudentsTab from './components/StudentsTab';
import PermissionsTab from './components/PermissionsTab';
import SessionsTab from './components/SessionsTab';
import BillingTab from './components/BillingTab';

const isUuidLike = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const normalizeOrganizationResponse = (response: any) => {
  const root = response?.data?.organization || response?.organization || response?.data || response || {};
  const nested = response?.data || response || {};
  const organizationId = root?.id || root?.organizationId || nested?.id || nested?.organizationId || '';
  const orgCode = root?.orgId || root?.organizationCode || root?.code || nested?.orgId || nested?.organizationCode || nested?.code || '';

  return {
    ...root,
    id: organizationId,
    organizationId,
    orgId: orgCode,
    organizationCode: orgCode,
    sessions: nested?.sessions || root?.sessions || [],
    students: nested?.students || root?.students || [],
    invoices: nested?.invoices || root?.invoices || [],
    payments: nested?.payments || root?.payments || [],
    orgHealthScore: nested?.orgHealthScore ?? root?.orgHealthScore ?? 0,
    engagementScore: nested?.engagementScore ?? root?.engagementScore ?? 0,
    progressScore: nested?.progressScore ?? root?.progressScore ?? 0,
    paymentScore: nested?.paymentScore ?? root?.paymentScore ?? 0,
    avgCompletionRate: nested?.avgCompletionRate ?? root?.avgCompletionRate ?? 0,
    sessionsJoined: nested?.sessionsJoined ?? root?.sessionsJoined ?? 0,
    quickStats: nested?.quickStats ?? root?.quickStats ?? {},
  };
};

export default function OrganizationProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [organizationId, setOrganizationId] = useState('');
  const [organization, setOrganization] = useState<any>(null);
  const [sessionsList, setSessionsList] = useState<any[]>([]);
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [invoicesList, setInvoicesList] = useState<any[]>([]);
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [orgHealthScore, setOrgHealthScore] = useState<number>(0);
  const [engagementScore, setEngagementScore] = useState<number>(0);
  const [progressScore, setProgressScore] = useState<number>(0);
  const [paymentScore, setPaymentScore] = useState<number>(0);
  const [avgCompletionRate, setAvgCompletionRate] = useState<number>(0);
  const [sessionsJoined, setSessionsJoined] = useState<number>(0);
  const [quickStats, setQuickStats] = useState<any>({});

  const loadOrganization = useCallback(async () => {
    try {
      const resolvedParams = await Promise.resolve(params);
      setOrganizationId(resolvedParams.id);
      if (!isUuidLike(resolvedParams.id)) {
        console.warn('Skipping organization fetch because the route id is not a UUID:', resolvedParams.id);
        setOrganization(null);
        return;
      }
      const response = await AdminAPI.getOrganization(resolvedParams.id);
      const org = normalizeOrganizationResponse(response);
      const allData = org;
      setOrganization(org);
      setSessionsList(allData.sessions || []);
      setStudentsList(allData.students || []);
      setInvoicesList(allData.invoices || []);
      setPaymentsList(allData.payments || []);
      setOrgHealthScore(allData.orgHealthScore || 0);
      setEngagementScore(allData.engagementScore || 0);
      setProgressScore(allData.progressScore || 0);
      setPaymentScore(allData.paymentScore || 0);
      setAvgCompletionRate(allData.avgCompletionRate || 0);
      setSessionsJoined(allData.sessionsJoined || 0);
      setQuickStats(allData.quickStats || {});
    } catch (error) {
      console.error('Failed to fetch organization:', error);
    }
  }, [params]);

  useEffect(() => {
    loadOrganization();
  }, [loadOrganization]);

  const status = String(organization?.status || 'active').toLowerCase();
  const displayStatus = status === 'suspended' ? 'Suspended' : status === 'inactive' ? 'Inactive' : 'Active';
  const resolvedOrganizationId = organization?.id || organization?.organizationId || organizationId;
  const organizationCode = organization?.orgId || organization?.organizationCode || organization?.code || '';
  const totalStudents = studentsList.length || Number(organization?.studentCount || organization?.totalStudents || 0);
  const totalSessions = sessionsList.length || Number(organization?.sessionCount || 0);

  const handleSuspend = async () => {
    if (!resolvedOrganizationId || !isUuidLike(resolvedOrganizationId)) return;

    try {
      await AdminAPI.updateOrganization(resolvedOrganizationId, { status: 'suspended' });
      setOrganization((current: any) => ({ ...(current || {}), status: 'suspended' }));
    } catch (error) {
      console.error('Failed to suspend organization:', error);
    }
  };

  return (
    <div className="md:p-8 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/a/organisation" className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </Link>
            <h1 className="text-2xl font-medium text-[#021165] sm:text-3xl md:text-4xl">{organization?.name || organization?.organizationName || 'Organization'}</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981]">
              {displayStatus}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 ml-9">
            <span>{organization?.type || organization?.organizationType || 'Institution'}</span>
            <span>•</span>
            <span>{totalStudents} students</span>
            <span>•</span>
            <span>{organizationCode || resolvedOrganizationId}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={resolvedOrganizationId ? `/a/organisation/create?mode=edit&id=${encodeURIComponent(resolvedOrganizationId)}` : '/a/organisation/create?mode=edit'}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit Organisation
          </Link>
          <button onClick={handleSuspend} className="flex items-center gap-2 px-4 py-2 border border-red-200 bg-red-50 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors shadow-sm">
            <Pause className="w-4 h-4" />
            Suspend
          </button>
          <button className="p-2 border border-gray-200 text-gray-500 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 min-w-max">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'students', label: 'Students', badge: String(totalStudents) },
            { id: 'permissions', label: 'Access & Permissions' },
            { id: 'sessions', label: 'Sessions', badge: String(totalSessions) },
            { id: 'billing', label: 'Billing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-3 text-sm font-semibold transition-colors relative flex items-center gap-2
                ${activeTab === tab.id 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.label}
              {tab.badge && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.id ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-500'}`}>
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 'overview' && (
          <OverviewTab
            organization={organization}
            orgHealthScore={orgHealthScore}
            engagementScore={engagementScore}
            progressScore={progressScore}
            paymentScore={paymentScore}
            sessionsJoined={sessionsJoined}
            quickStats={quickStats}
          />
        )}
        {activeTab === 'students' && <StudentsTab students={studentsList} />}
        {activeTab === 'permissions' && <PermissionsTab permissions={organization?.accessPermissions || organization?.permissions} />}
        {activeTab === 'sessions' && <SessionsTab sessions={sessionsList} />}
        {activeTab === 'billing' && (
          <BillingTab
            organizationId={resolvedOrganizationId}
            billingCycle={organization?.billingCycle}
            revenue={organization?.revenueGenerated || organization?.revenue || 0}
            invoices={invoicesList}
            payments={paymentsList}
            onRecordPayment={loadOrganization}
          />
        )}
      </div>
    </div>
  );
}
