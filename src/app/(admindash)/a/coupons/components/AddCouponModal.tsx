import React, { useState } from 'react';
import { X, CheckCircle2, Calendar } from 'lucide-react';

interface AddCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCouponModal({ isOpen, onClose }: AddCouponModalProps) {
  const [promoType, setPromoType] = useState('₹ Discount');
  const [applyTo, setApplyTo] = useState('All Products');
  const [noEndDate, setNoEndDate] = useState(false);
  const [limitTotalUses, setLimitTotalUses] = useState(false);
  const [limitPerCustomer, setLimitPerCustomer] = useState(false);

  if (!isOpen) return null;

  const promoTypes = ['₹ Discount', '% Discount', 'Sale Price', 'Buy X Get Y Free'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-slate-800">New Coupon</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            
            {/* Promo Type Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Select the type of coupon you want to offer
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {promoTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setPromoType(type)}
                    className={`flex items-center justify-center py-2.5 px-2 rounded-lg border text-xs font-semibold tracking-wide transition-colors ${
                      promoType === type 
                        ? 'border-blue-500 bg-blue-50/50 text-blue-600' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {promoType === type && (
                      <div className="mr-2 rounded-full bg-blue-500 text-white w-3.5 h-3.5 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                    {promoType !== type && (
                      <div className="mr-2 rounded-full border border-gray-300 w-3.5 h-3.5" />
                    )}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 1: Code and Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Coupon Code</label>
                <div className="relative">
                  <input 
                    type="text" 
                    defaultValue="SUMMER50"
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium"
                  />
                  <CheckCircle2 className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Coupon Name</label>
                <input 
                  type="text" 
                  defaultValue="Summer Promo"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                />
              </div>
            </div>

            {/* Row 2: Discount / Offer Details */}
            {promoType === 'Buy X Get Y Free' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="block text-sm font-medium text-slate-700">Offer</label>
                     <div className="flex gap-2">
                        <select className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option>Quantity</option>
                        </select>
                        <input type="number" defaultValue="1" className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="block text-sm font-medium text-slate-700">Get</label>
                     <div className="flex gap-2">
                        <select className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option>Quantity</option>
                        </select>
                        <input type="number" defaultValue="1" className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                     </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Discount</label>
                <div className="relative w-full md:w-1/2 pr-3">
                  {promoType !== '% Discount' && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium border-r border-gray-200 pr-2">₹</span>
                  )}
                  <input 
                    type="number" 
                    defaultValue="500"
                    className={`w-full py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800 ${promoType !== '% Discount' ? 'pl-10 pr-4' : 'px-4'}`}
                  />
                  {promoType === '% Discount' && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
                  )}
                </div>
              </div>
            )}

            {/* Row 3: Apply To */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Apply To</label>
              <select 
                className="w-full md:w-1/2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={applyTo}
                onChange={(e) => setApplyTo(e.target.value)}
              >
                <option value="All Products">All Products</option>
                <option value="Specific Products">Specific Products</option>
                <option value="Specific Categories">Specific Categories</option>
              </select>
            </div>

            {/* Row 4: Valid Between */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-medium text-slate-700">Valid Between</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-500">Start Date</span>
                  <div className="relative">
                    <input 
                      type="date" 
                      defaultValue="2024-04-20"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-600 outline-none select-none [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-500">End Date</span>
                  <div className={`relative ${noEndDate ? 'opacity-50 pointer-events-none' : ''}`}>
                    <input 
                      type="date" 
                      disabled={noEndDate}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-600 outline-none select-none [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input 
                  type="checkbox" 
                  checked={noEndDate}
                  onChange={(e) => setNoEndDate(e.target.checked)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 bg-white"
                />
                <span className="text-sm text-slate-600">Don't set an end date</span>
              </label>
            </div>

            {/* Row 5: Limits */}
            <div className="space-y-3 pt-2">
               <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={limitTotalUses}
                      onChange={(e) => setLimitTotalUses(e.target.checked)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 bg-white mt-0.5"
                    />
                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                      <span className="text-sm text-slate-600">Limit the total number of uses for this coupon</span>
                      {limitTotalUses && (
                        <input 
                          type="number" 
                          placeholder="e.g. 100"
                          defaultValue="100"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    </div>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={limitPerCustomer}
                      onChange={(e) => setLimitPerCustomer(e.target.checked)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 bg-white"
                    />
                    <span className="text-sm text-slate-600">Limit to one use per customer</span>
                  </label>
               </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-[#FAFAFA] rounded-b-2xl">
          <button 
            onClick={onClose}
            className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#00A3FF] hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Create Coupon
          </button>
        </div>
        
      </div>
    </div>
  );
}
