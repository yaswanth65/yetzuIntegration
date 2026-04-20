"use client";

import React, { useState } from 'react';
import CouponHeader from './components/CouponHeader';
import CouponTable from './components/CouponTable';
import AddCouponModal from './components/AddCouponModal';
import EditCouponModal from './components/EditCouponModal';

export default function CouponsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any | null>(null);

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <CouponHeader onNewCoupon={() => setIsModalOpen(true)} />
        <CouponTable onEdit={(coupon) => setEditingCoupon(coupon)} />
      </div>

      <AddCouponModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <EditCouponModal 
        isOpen={editingCoupon !== null}
        couponData={editingCoupon}
        onClose={() => setEditingCoupon(null)}
      />
    </div>
  );
}
