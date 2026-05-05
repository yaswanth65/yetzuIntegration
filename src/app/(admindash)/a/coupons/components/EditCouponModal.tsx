import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { AdminAPI } from '@/lib/api';

interface EditCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  couponData: any | null;
  onSuccess?: () => void;
}

const applyToOptions = [
  { value: 'all-cohort', label: 'All Cohort' },
  { value: 'all-1-1', label: 'All 1-1 Session' },
  { value: 'all-webinar', label: 'All Webinar' },
  { value: 'all-workshop', label: 'All Workshop' },
  { value: 'specific-cohort', label: 'Specific Cohort' },
  { value: 'specific-1-1', label: 'Specific 1-1 Session' },
  { value: 'specific-webinar', label: 'Specific Webinar' },
  { value: 'specific-workshop', label: 'Specific Workshop' },
];

export default function EditCouponModal({ isOpen, onClose, couponData, onSuccess }: EditCouponModalProps) {
  const [applyTo, setApplyTo] = useState('all-cohort');
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState('');
  
  // Form state
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [discountType, setDiscountType] = useState('fixed');
  const [discountValue, setDiscountValue] = useState('');
  const [status, setStatus] = useState('active');
  
  const fetchSessions = useCallback(async (type: string) => {
    try {
      setSessionsLoading(true);
      let sessionType = '';
      
      if (type === 'specific-cohort') sessionType = 'cohort';
      else if (type === 'specific-1-1') sessionType = '1-1';
      else if (type === 'specific-webinar') sessionType = 'webinar';
      else if (type === 'specific-workshop') sessionType = 'workshop';
      
      const response = await AdminAPI.getSessions({ 
        page: 1, 
        limit: 100,
        ...(sessionType && { sessionType })
      });
      
      const sessionList = Array.isArray(response?.data) ? response.data :
                        Array.isArray(response) ? response : [];
      setSessions(sessionList);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      setSessions([]);
    } finally {
      setSessionsLoading(false);
    }
  }, []);

  // Update local state when couponData changes
  useEffect(() => {
    if (couponData) {
      setCode(couponData.code || '');
      setName(couponData.name || '');
      setDiscountType(couponData.discountType || 'fixed');
      setDiscountValue(couponData.discountValue?.toString() || '');
      setStatus(couponData.status || 'active');
      setApplyTo(couponData.applyTo || 'all-cohort');
      setSelectedSession(couponData.sessionId || '');
      
      if (couponData.type === 'Buy X Get Y Free' || couponData.discountType === 'bogo') {
        setApplyTo('specific-cohort');
      }
    }
  }, [couponData]);

  useEffect(() => {
    if (applyTo.startsWith('specific-')) {
      fetchSessions(applyTo);
    } else {
      setSessions([]);
      setSelectedSession('');
    }
  }, [applyTo, fetchSessions]);

  if (!isOpen || !couponData) return null;

  const isBuyXGetY = couponData.type === 'Buy X Get Y Free' || couponData.discountType === 'bogo';
  const couponTypeName = isBuyXGetY ? 'Buy X Get Y Coupon' : 
                         (couponData.name === 'First Order' ? 'Single Use Coupon' : 'Site Wide Coupon');

  const handleSave = async () => {
    try {
      setLoading(true);
      const couponId = couponData.id || couponData._id;
      
      // Map applyTo value to session type
      let sessionType = '';
      if (applyTo === 'all-cohort' || applyTo === 'specific-cohort') sessionType = 'cohort';
      else if (applyTo === 'all-1-1' || applyTo === 'specific-1-1') sessionType = '1-1';
      else if (applyTo === 'all-webinar' || applyTo === 'specific-webinar') sessionType = 'webinar';
      else if (applyTo === 'all-workshop' || applyTo === 'specific-workshop') sessionType = 'workshop';

      const payload = {
        name,
        code,
        discountType,
        discountValue: parseFloat(discountValue) || 0,
        status,
        applyTo,
        sessionType,
        ...(applyTo.startsWith('specific-') && selectedSession && { sessionId: selectedSession }),
      };

      await AdminAPI.updateCoupon(couponId, payload);
      
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Failed to update coupon:', error);
      alert('Failed to update coupon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this coupon?')) {
      return;
    }
    
    try {
      setLoading(true);
      const couponId = couponData.id || couponData._id;
      
      await AdminAPI.deleteCoupon(couponId);
      
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Failed to delete coupon:', error);
      alert('Failed to delete coupon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-xl font-semibold text-slate-800">Edit Coupon</h2>
            </div>
            <p className="text-sm font-medium text-gray-500">
              Coupon Type : <span className="text-slate-700">{couponTypeName}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors -mt-6"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-6">
             
            {/* Row1: Code and Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Coupon Code</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <CheckCircle2 className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Coupon Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Row 2: Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select 
                className="w-full md:w-1/2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            {/* Row 3: Apply To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Apply to</label>
                <select 
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={applyTo}
                  onChange={(e) => setApplyTo(e.target.value)}
                >
                  {applyToOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Sessions Dropdown for Specific Types */}
              {applyTo.startsWith('specific-') && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Select {applyToOptions.find(o => o.value === applyTo)?.label.replace('Specific ', '')}
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}
                    disabled={sessionsLoading}
                  >
                    <option value="">{sessionsLoading ? 'Loading sessions...' : 'Select a session'}</option>
                    {sessions.map(session => (
                      <option key={session.id || session._id} value={session.id || session._id}>
                        {session.title || session.name || 'Session'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

               {/* Remove old product search section - now using sessions */}
             </div>
             
            {/* Row 4: Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Active Dates</label>
                <p className="text-xs text-gray-500 mb-1 leading-5">Start Date</p>
                <input 
                  type="date" 
                  defaultValue="2024-03-09"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                />
              </div>
              <div className="space-y-1 pt-6 flex flex-col justify-end">
                <p className="text-xs text-gray-500 mb-1 leading-5">End Date</p>
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    defaultValue="2024-04-12"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Row 6: Limits */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  defaultChecked
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Limit to one use per customer</span>
              </label>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-[#FAFAFA] rounded-b-2xl">
          <button 
            onClick={handleDelete}
            disabled={loading}
            className="text-sm font-semibold text-red-500 hover:text-red-700 hover:underline transition-colors uppercase tracking-wider disabled:opacity-50"
          >
            Delete Coupon
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-[#0F172B] hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
