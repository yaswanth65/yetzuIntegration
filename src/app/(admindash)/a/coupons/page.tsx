"use client";

import React, { useState, useEffect, useCallback } from 'react';
import CouponHeader from './components/CouponHeader';
import CouponTable from './components/CouponTable';
import AddCouponModal from './components/AddCouponModal';
import EditCouponModal from './components/EditCouponModal';
import { AdminAPI } from '@/lib/api';

export default function CouponsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any | null>(null);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await AdminAPI.getCoupons({ page: 1, limit: 100 });
      const couponList = Array.isArray(response?.data) ? response.data :
                        Array.isArray(response) ? response : [];
      setCoupons(couponList);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleCouponCreated = () => {
    setIsModalOpen(false);
    fetchCoupons();
  };

  const handleCouponUpdated = () => {
    setEditingCoupon(null);
    fetchCoupons();
  };

  return (
    <div className="w-full p-4 md:p-8">
      <CouponHeader onNewCoupon={() => setIsModalOpen(true)} />
      <CouponTable 
        coupons={coupons} 
        loading={loading}
        onEdit={(coupon) => setEditingCoupon(coupon)} 
      />

      <AddCouponModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCouponCreated}
      />

      <EditCouponModal 
        isOpen={editingCoupon !== null}
        couponData={editingCoupon}
        onClose={() => setEditingCoupon(null)}
        onSuccess={handleCouponUpdated}
      />
    </div>
  );
}
