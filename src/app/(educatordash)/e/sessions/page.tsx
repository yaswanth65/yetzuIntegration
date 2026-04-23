"use client";

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import SessionsList from './components/SessionsList';
import CalendarView from './components/CalendarView';
import SessionDetailsDrawer from './components/SessionDetailsDrawer';
import { sessionData } from './dummyData';
import { Session } from './types';

export default function EducatorSessionsPage() {
    const [activeTab, setActiveTab] = useState<'All' | 'Upcoming' | 'Completed' | 'Missed'>('All');
    const [activeView, setActiveView] = useState<'Sessions List' | 'Calendar View'>('Sessions List');

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);

    const handleViewDetails = (session: Session) => {
        setSelectedSession(session);
        setIsDrawerOpen(true);
    };
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSessions = useMemo(() => {
        return sessionData.filter(session => {
            // 1. Filter by Tab
            if (activeTab === 'Upcoming' && session.status !== 'Scheduled' && session.status !== 'Live') return false;
            if (activeTab === 'Completed' && session.status !== 'Completed') return false;
            if (activeTab === 'Missed' && session.status !== 'Missed') return false;

            // 2. Filter by Search
            if (searchQuery.trim() !== '') {
                const query = searchQuery.toLowerCase();
                if (!session.id.toLowerCase().includes(query) && !session.educator.toLowerCase().includes(query)) {
                    return false;
                }
            }
            return true;
        });
    }, [activeTab, searchQuery]);

    const tabs = [
        { name: 'All', count: sessionData.length },
        { name: 'Upcoming', count: sessionData.filter(s => s.status === 'Scheduled' || s.status === 'Live').length },
        { name: 'Completed', count: sessionData.filter(s => s.status === 'Completed').length },
        { name: 'Missed', count: sessionData.filter(s => s.status === 'Missed').length },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6 lg:p-6 font-sans">
            <div className="max-w-[1550px] mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Sessions</h1>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    {/* Tabs */}
                    <div className="flex items-center gap-6 border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name as any)}
                                className={`pb-4 text-sm font-medium transition-colors relative flex items-center gap-2 ${activeTab === tab.name
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                                    }`}
                            >
                                {tab.name}
                                <span className="text-gray-400 bg-gray-100 rounded-full px-2 lg:px-2.5 py-0.5 text-xs">
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by session ID or educator"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                        />
                    </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 inline-flex mb-2">
                    <button
                        onClick={() => setActiveView('Sessions List')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeView === 'Sessions List' ? 'bg-[#F2F5FF] text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        Sessions List
                    </button>
                    <button
                        onClick={() => setActiveView('Calendar View')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeView === 'Calendar View' ? 'bg-[#F2F5FF] text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Calendar View
                    </button>
                </div>

                {/* Content */}
                {activeView === 'Sessions List' ? (
                    <SessionsList sessions={filteredSessions} onViewDetails={handleViewDetails} />
                ) : (
                    <CalendarView sessions={filteredSessions} />
                )}
            </div>

            <SessionDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                session={selectedSession}
            />
        </div>
    );
}
