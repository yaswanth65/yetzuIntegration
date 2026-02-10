"use client"

import StatsGrid from '@/app/(studentdash)/components/StatsGrid'
import TrendingSection from '@/app/(studentdash)/components/TrendingSection'
import React from 'react'
 import AssignmentsTable from '@/app/(studentdash)/components/AssignmentsTable'
import DashboardHeader from '../../components/DashboardHeader'

export default function page() {
  return (
    < >
    <main className="p-2 max-w-[1600px] font-inter mx-auto flex flex-col gap-6">
              <DashboardHeader />
              <StatsGrid />

              <TrendingSection />

              <div className="flex flex-col lg:flex-row gap-6">
                <AssignmentsTable />
               </div>
            </main>
    </>
  )
}

