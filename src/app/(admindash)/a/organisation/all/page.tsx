"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal,
  Eye,
  Edit2,
  Pause,
  Trash2,
  X
} from 'lucide-react';
import { shortenId } from "@/lib/utils/shortenId";
import { AdminAPI, asArray } from '@/lib/api';

type OrganizationRow = {
  id: string;
  code: string;
  name: string;
  type: string;
  students: number;
  active: number;
  activePercent: number;
  plan: string;
  revenue: string;
  status: string;
  date: string;
};

const toTitle = (value: any, fallback = 'N/A') => {
  const text = String(value || fallback).replace(/[-_]/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const toStatus = (status: any) => {
  const value = String(status || 'active').toLowerCase();
  if (value === 'suspended') return 'Suspended';
  if (value === 'inactive') return 'Inactive';
  return 'Active';
};

const formatDate = (value: any) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const csvEscape = (value: any) => {
  const text = String(value ?? '');
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
};

const mapOrganization = (org: any, index: number): OrganizationRow => {
  const id = org.id || org._id || org.organizationId || org.orgId || '';
  const code = org.orgId || org.code || org.organizationCode || org.orgCode || `ORG-${index + 1}`;
  const students = Number(org.students || org.totalStudents || org.studentCount || org.studentsCount || 0);
  const active = Number(org.active || org.activeStudents || org.activeUsers || 0);
  const activePercent = Number(org.activePercent ?? org.activePercentage ?? (students ? Math.round((active / students) * 100) : 0));

  return {
    id,
    code,
    name: org.name || org.organizationName || org.title || 'Untitled Organization',
    type: toTitle(org.type || org.organizationType || 'institution'),
    students,
    active,
    activePercent,
    plan: toTitle(org.plan || org.billingCycle || 'Basic'),
    revenue: org.revenue || org.revenueGenerated || '$0',
    status: toStatus(org.status),
    date: formatDate(org.createdAt || org.created_at || org.date),
  };
};

export default function AllOrganizationsPage() {
  const [activeTab, setActiveTab] = useState('All Organizations');
  const [showFilters, setShowFilters] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [planFilter, setPlanFilter] = useState('All Plan');
  const [tempStatusFilter, setTempStatusFilter] = useState('All Status');
  const [tempPlanFilter, setTempPlanFilter] = useState('All Plan');
  const [organizationsData, setOrganizationsData] = useState<OrganizationRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const filterRef = useRef<HTMLDivElement>(null);

  const fetchOrganizations = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await AdminAPI.getOrganizations({ page: 1, limit: 100 });
      setOrganizationsData(asArray(response).map(mapOrganization));
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
      setOrganizationsData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
         setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPercentColor = (percent: number) => {
    if (percent > 100) return 'text-[#F59E0B]'; // orange
    if (percent > 50) return 'text-[#10B981]'; // green
    if (percent > 0) return 'text-[#10B981]'; // light green? from design 27% is green
    return 'text-[#10B981]'; // placeholder, all look green except 105% which is orange
  };

  const getPlanBadge = (plan: string) => {
    switch(plan) {
      case 'Premium': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#E0E7FF] text-[#4F46E5]">{plan}</span>;
      case 'Custom': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F3E8FF] text-[#9333EA]">{plan}</span>;
      case 'Basic': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#64748B]">{plan}</span>;
      default: return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#64748B]">{plan}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <span className="px-2.5 py-1 text-xs font-medium text-[#10B981] bg-emerald-50 rounded-full">Active</span>;
      case 'Inactive': return <span className="px-2.5 py-1 text-xs font-medium text-[#6B7280] bg-gray-100 rounded-full">Inactive</span>;
      case 'Suspended': return <span className="px-2.5 py-1 text-xs font-medium text-[#EF4444] bg-red-50 rounded-full">Suspended</span>;
      default: return null;
    }
  };

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  useEffect(() => {
    const handleOutsideMenuClick = () => setActiveDropdown(null);
    if (activeDropdown) {
      document.addEventListener("click", handleOutsideMenuClick);
    }
    return () => document.removeEventListener("click", handleOutsideMenuClick);
  }, [activeDropdown]);

  const handleApplyFilters = () => {
    setStatusFilter(tempStatusFilter);
    setPlanFilter(tempPlanFilter);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setStatusFilter('All Status');
    setPlanFilter('All Plan');
    setTempStatusFilter('All Status');
    setTempPlanFilter('All Plan');
    setShowFilters(false);
  };

  const handleSuspendOrganization = async (org: OrganizationRow) => {
    try {
      await AdminAPI.updateOrganization(org.id, { status: 'suspended' });
      setOrganizationsData((current) => current.map((item) => item.id === org.id ? { ...item, status: 'Suspended' } : item));
      setActiveDropdown(null);
    } catch (error) {
      console.error('Failed to suspend organization:', error);
    }
  };

  const handleDeleteOrganization = async (org: OrganizationRow) => {
    if (!confirm('Are you sure you want to delete this organization?')) return;

    try {
      await AdminAPI.deleteOrganization(org.id);
      setOrganizationsData((current) => current.filter((item) => item.id !== org.id));
      setActiveDropdown(null);
    } catch (error) {
      console.error('Failed to delete organization:', error);
    }
  };

  const handleExportOrganizations = () => {
    if (filteredData.length === 0) {
      alert('No organizations available to export.');
      return;
    }

    const headers = ['Org ID', 'Organisation Code', 'Organisation Name', 'Type', 'Total Students', 'Active Students', 'Active %', 'Access Plan', 'Revenue Generated', 'Subscription', 'Created Date'];
    const rows = filteredData.map((org) => ([
      org.id,
      org.code,
      org.name,
      org.type,
      org.students,
      org.active,
      `${org.activePercent}%`,
      org.plan,
      org.revenue,
      org.status,
      org.date,
    ]));

    const csv = [headers, ...rows]
      .map((row) => row.map(csvEscape).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `organisations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredData = organizationsData.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          org.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // For Tabs: specific to Active/Inactive/Suspended based on the tab selection
    const matchesTab = activeTab === 'All Organizations' || org.status === activeTab;
    
    // For Global Modal Filter
    const matchesStatus = statusFilter === 'All Status' || org.status === statusFilter;
    const matchesPlan = planFilter === 'All Plan' || org.plan === planFilter;

    return matchesSearch && matchesTab && matchesStatus && matchesPlan;
  });

  return (
    <div className="w-full">
        <Link href="/a/organisation" className="flex items-center text-sm text-gray-500 font-medium mb-4 hover:text-black transition-colors w-fit">
          <ChevronLeft className="w-4 h-4 mr-1" /> Organizations
        </Link>

        {/* Top Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex justify-between items-center w-full md:w-auto">
             <div className="flex bg-white px-[18px] py-2 rounded-lg border border-gray-200 w-full md:w-[350px] items-center gap-2">
                <Search className="w-[18px] h-[18px] text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search organizations..." 
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative" ref={filterRef}>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
              
              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute top-12 left-0 md:right-0 md:left-auto w-[320px] bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 z-50 p-4">
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-sm">Filters</h3>
                      <button onClick={() => setShowFilters(false)}><X className="w-4 h-4 text-gray-500 hover:text-black"/></button>
                   </div>
                   
                   <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Subscription Status</label>
                      <select 
                        value={tempStatusFilter}
                        onChange={(e) => setTempStatusFilter(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg p-2.5 outline-none appearance-none bg-white focus:border-blue-500"
                      >
                         <option>All Status</option>
                         <option>Active</option>
                         <option>Inactive</option>
                         <option>Suspended</option>
                      </select>
                   </div>
                   
                   <div className="mb-5">
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Access Plan</label>
                      <select 
                        value={tempPlanFilter}
                        onChange={(e) => setTempPlanFilter(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg p-2.5 outline-none appearance-none bg-white focus:border-blue-500"
                      >
                         <option>All Plan</option>
                         <option>Premium</option>
                         <option>Custom</option>
                         <option>Basic</option>
                      </select>
                   </div>
                   
                   <div className="flex items-center justify-end gap-3 pt-2">
                       <button onClick={handleClearFilters} className="text-sm font-semibold text-gray-700 hover:text-black">Clear All</button>
                       <button onClick={handleApplyFilters} className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">Apply</button>
                   </div>
                </div>
              )}
            </div>

            <button onClick={handleExportOrganizations} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <Link href="/a/organisation/create" className="flex items-center gap-2 bg-[#0A0A0A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/90 transition-colors ml-auto md:ml-0 whitespace-nowrap">
              <Plus className="w-4 h-4" /> Create Organization
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-6 overflow-x-auto border-b border-gray-200 hide-scrollbar px-1">
           {['All Organizations', 'Active', 'Inactive', 'Suspended'].map((tab) => {
             const getCount = (t: string) => {
               if (t === 'All Organizations') return organizationsData.length;
               return organizationsData.filter(org => org.status === t).length;
             };
             const isActive = activeTab === tab;
             return (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`flex items-center gap-2 pb-3 border-b-2 transition-colors whitespace-nowrap ${isActive ? 'border-[#3B82F6] text-[#0A0A0A] font-semibold' : 'border-transparent text-gray-500 font-medium hover:text-gray-700'}`}
               >
                 <span className="text-sm">{tab}</span>
                 <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>{getCount(tab)}</span>
               </button>
             )
           })}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border shadow-sm border-gray-100 w-full overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-gray-100">
                  <th className="py-4 px-5 w-12"><input type="checkbox" className="rounded text-blue-600 border-gray-300 w-[14px] h-[14px]" /></th>
                  <th className="py-4 pr-5 text-[13px] font-semibold text-gray-500">Org ID</th>
                  <th className="py-4 px-5 text-[13px] font-semibold text-gray-500">Organisation Name</th>
                  <th className="py-4 px-5 text-[13px] font-semibold text-gray-500">Total Students</th>
                  <th className="py-4 px-5 text-[13px] font-semibold text-gray-500">Active Students</th>
                  <th className="py-4 px-5 text-[13px] font-semibold text-gray-500">Access Plan</th>
                  <th className="py-4 px-5 text-[13px] font-semibold text-gray-500">Revenue Generated</th>
                  <th className="py-4 px-5 text-[13px] font-semibold text-gray-500">Subscription</th>
                  <th className="py-4 px-5 text-[13px] font-semibold text-gray-500">Created Date</th>
                  <th className="py-4 px-5 text-[13px] font-semibold text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={10} className="py-10 text-center text-gray-500 font-medium">Loading organizations...</td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((org) => (
                    <tr key={org.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-5 w-12"><input type="checkbox" className="rounded text-blue-600 border-gray-300 w-[14px] h-[14px]" /></td>
                      <td className="py-4 pr-5 text-[13px] font-medium text-gray-500" title={org.id || org.code}>{shortenId(org.code || org.id)}</td>
                      <td className="py-4 px-5">
                        <Link href={org.id ? `/a/organisation/${org.id}` : '#'} className="flex flex-col hover:opacity-80">
                          <span className="text-[14px] font-semibold text-blue-600 hover:underline leading-tight">{org.name}</span>
                          <span className="text-[12px] font-medium text-gray-400 mt-0.5">{org.type}</span>
                        </Link>
                      </td>
                      <td className="py-4 px-5 text-[14px] font-medium text-gray-600">{org.students}</td>
                      <td className="py-4 px-5 text-[14px] font-medium text-gray-600">
                         <div className="flex items-center gap-1">
                             {org.active} <span className={`text-[11px] font-semibold ml-1 ${getPercentColor(org.activePercent)}`}>{org.activePercent}%</span>
                         </div>
                      </td>
                      <td className="py-4 px-5">
                         {getPlanBadge(org.plan)}
                      </td>
                      <td className="py-4 px-5 text-[14px] font-semibold text-[#0A0A0A]">{org.revenue}</td>
                      <td className="py-4 px-5">
                         {getStatusBadge(org.status)}
                      </td>
                      <td className="py-4 px-5 text-[13px] font-medium text-gray-500">{org.date}</td>
                      <td className="py-4 px-5 text-center relative">
                        <button 
                          onClick={(e) => toggleDropdown(org.id, e)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        
                        {activeDropdown === org.id && (
                          <div className="absolute right-8 top-10 w-40 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.12)] border border-gray-50 py-1.5 z-[60]">
                             <Link href={org.id ? `/a/organisation/${org.id}` : '#'} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[13px] font-medium text-gray-700 transition-colors">
                                <Eye className="w-4 h-4 text-gray-400" /> View Details
                             </Link>
                              <Link href={org.id ? `/a/organisation/create?mode=edit&id=${encodeURIComponent(String(org.id))}` : '#'} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[13px] font-medium text-gray-700 transition-colors">
                                 <Edit2 className="w-4 h-4 text-gray-400" /> Edit
                              </Link>
                              <button onClick={() => handleSuspendOrganization(org)} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[13px] font-medium text-gray-700 transition-colors">
                                 <Pause className="w-4 h-4 text-gray-400" /> Suspend
                              </button>
                              <button onClick={() => handleDeleteOrganization(org)} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-[13px] font-medium text-red-600 transition-colors">
                                 <Trash2 className="w-4 h-4" /> Delete
                              </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="py-10 text-center text-gray-500 font-medium">No organizations found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between p-5 border-t border-gray-100">
             <p className="text-[13px] font-medium text-blue-500 hover:text-blue-600 cursor-pointer underline-offset-2 underline decoration-blue-500/30">
               Showing {filteredData.length > 0 ? 1 : 0}-{filteredData.length} of {organizationsData.length}
             </p>
             <div className="flex items-center gap-1">
                <button className="p-1 text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-50" disabled>
                   <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-900">
                   1
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-50" disabled>
                   <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
             </div>
           </div>
         </div>
    </div>
  );
}
