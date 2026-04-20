import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle2 } from 'lucide-react';

interface EditCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  couponData: any | null;
}

export default function EditCouponModal({ isOpen, onClose, couponData }: EditCouponModalProps) {
  const [applyTo, setApplyTo] = useState('all');
  const [specificProducts, setSpecificProducts] = useState<string[]>([]);
  const [productSearch, setProductSearch] = useState('');
  
  // Update local state when couponData changes
  useEffect(() => {
    if (couponData) {
      // Mock some specific states based on type
      if (couponData.type === 'Buy X Get Y Free') {
        setApplyTo('specific');
      } else {
        setApplyTo('all');
        setSpecificProducts([]);
      }
    }
  }, [couponData]);

  if (!isOpen || !couponData) return null;

  // Derive logic from mock data type
  const isBuyXGetY = couponData.type === 'Buy X Get Y Free';
  const couponTypeName = isBuyXGetY ? 'Buy X Get Y Coupon' : 
                         (couponData.name === 'First Order' ? 'Single Use Coupon' : 'Site Wide Coupon');

  const handleAddProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && productSearch.trim() !== '') {
      e.preventDefault();
      setSpecificProducts([...specificProducts, productSearch.trim()]);
      setProductSearch('');
    }
  };

  const handleRemoveProduct = (index: number) => {
    setSpecificProducts(specificProducts.filter((_, i) => i !== index));
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
            
            {/* Row 1: Code and Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Coupon Code</label>
                <div className="relative">
                  <input 
                    type="text" 
                    defaultValue={couponData.code}
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <CheckCircle2 className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Coupon Name</label>
                <input 
                  type="text" 
                  defaultValue={couponData.name}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Row 2: Offers */}
            {!isBuyXGetY ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Offer Type</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    defaultValue={couponData.type === '% Discount' ? 'percentage' : 'fixed'}
                  >
                    <option value="percentage">Percentage Discount</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="shipping">Free Shipping</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Value</label>
                  <input 
                    type="number" 
                    defaultValue={couponData.type === '% Discount' ? '20' : '500'}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Offer</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-600 font-medium">Buy</span>
                      <input 
                        type="number" 
                        defaultValue="1"
                        className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Get</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-600 font-medium">Get</span>
                      <input 
                        type="number" 
                        defaultValue="1"
                        className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Discount Type on Get item</label>
                    <select 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      defaultValue="free"
                    >
                      <option value="free">Free</option>
                      <option value="percentage">Percentage</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Row 3: Apply To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Apply to</label>
                <select 
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={applyTo}
                  onChange={(e) => setApplyTo(e.target.value)}
                >
                  <option value="all">All Products</option>
                  <option value="specific">Specific Products</option>
                  <option value="categories">Specific Categories</option>
                </select>
              </div>

              {isBuyXGetY && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Get Item</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    defaultValue="specific"
                  >
                    <option value="all">All Products</option>
                    <option value="specific">Specific Products</option>
                  </select>
                </div>
              )}
            </div>

            {/* Row 4: Search Products */}
            {(applyTo === 'specific' || applyTo === 'categories') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-[13px] font-medium text-gray-500">Select Products</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search for products..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      onKeyDown={handleAddProduct}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {specificProducts.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs text-gray-500 mb-2">Selected:</p>
                      <div className="flex flex-wrap gap-2">
                        {specificProducts.map((prod, index) => (
                          <div key={index} className="flex items-center gap-1.5 bg-blue-50 text-[#00A3FF] px-3 py-1.5 rounded-md text-xs font-medium border border-blue-100">
                            {prod}
                            <button onClick={() => handleRemoveProduct(index)} className="hover:bg-blue-100 rounded-full p-0.5 transition-colors">
                              <X className="w-3 h-3 text-[#00A3FF]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {isBuyXGetY && (
                  <div className="space-y-3">
                    <label className="block text-[13px] font-medium text-gray-500">Select Get Products</label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="Search for products..."
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Row 5: Dates */}
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
                  <div className="w-12 border border-gray-200 rounded-lg flex items-center justify-center p-2 text-gray-500 bg-gray-50/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </div>
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
          <button className="text-sm font-semibold text-red-500 hover:text-red-700 hover:underline transition-colors uppercase tracking-wider">
            Delete Coupon
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-[#00A3FF] hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
