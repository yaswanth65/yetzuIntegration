import OverviewPage from '@/app/(studentdash)/s/dashboard/page'
import React from 'react'
import OverViewStats from './components/OverViewStats'
import RevenueChart from './components/RevenueChart'


export default function page() {
  return (
    <div className='bg-gray-100 p-6 min-h-screen'>
      <h1 className='text-[#0A0A0A] text-3xl font-semibold'>Overview</h1>
      <div className=''>
        <OverViewStats />
        <RevenueChart />
      </div>
    </div>
  )
}
