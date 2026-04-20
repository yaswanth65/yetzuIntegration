import React from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';

const mockCoupons = [
  {
    id: 1,
    name: 'First Order',
    discountTitle: '₹500.00 OFF',
    discountSubtitle: 'on orders over ₹999.00',
    type: '₹ Discount',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Active',
  },
  {
    id: 2,
    name: 'First Order',
    discountTitle: '20% OFF',
    discountSubtitle: 'on orders over 2,499.00',
    type: '% Discount',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Expired',
  },
  {
    id: 3,
    name: 'First Order',
    discountTitle: 'Only ₹500',
    discountSubtitle: '',
    type: 'Sale Price',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Active',
  },
  {
    id: 4,
    name: 'April Fools',
    discountTitle: 'Buy 1 Get 1 Free',
    discountSubtitle: 'All products',
    type: 'Buy X Get Y Free',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Active',
  },
  {
    id: 5,
    name: 'April Fools',
    discountTitle: '₹500.00 OFF',
    discountSubtitle: 'on orders over ₹999.00',
    type: '₹ Discount',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Expired',
  },
  {
    id: 6,
    name: 'April Fools',
    discountTitle: 'Buy 1 Get 1 Free',
    discountSubtitle: 'All products',
    type: 'Buy X Get Y Free',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Active',
  },
  {
    id: 7,
    name: 'April Fools',
    discountTitle: '₹500.00 OFF',
    discountSubtitle: 'on orders over ₹999.00',
    type: '₹ Discount',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Active',
  },
  {
    id: 8,
    name: 'April Fools',
    discountTitle: 'Buy 1 Get 1 Free',
    discountSubtitle: 'All products',
    type: 'Buy X Get Y Free',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Active',
  },
  {
    id: 9,
    name: 'April Fools',
    discountTitle: '₹500.00 OFF',
    discountSubtitle: 'on orders over ₹999.00',
    type: '₹ Discount',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Expired',
  },
  {
    id: 10,
    name: 'April Fools',
    discountTitle: 'Only ₹500',
    discountSubtitle: '',
    type: 'Sale Price',
    code: 'SUBMIT500',
    uses: '0',
    status: 'Active',
  },
];

interface CouponTableProps {
  onEdit: (coupon: any) => void;
}

export default function CouponTable({ onEdit }: CouponTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 mt-6 w-full">
      {/* Top Search & Filter */}
      <div className="flex justify-between items-center p-4">
        <div className="relative w-full max-w-[280px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full border-t border-gray-100">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-gray-100">
              <th className="py-3.5 px-6 text-sm font-semibold text-slate-800 w-[15%]">Name</th>
              <th className="py-3.5 px-6 text-sm font-semibold text-slate-800 w-[20%]">Discount</th>
              <th className="py-3.5 px-6 text-sm font-semibold text-slate-800 w-[15%]">Type</th>
              <th className="py-3.5 px-6 text-sm font-semibold text-slate-800 w-[15%]">Code</th>
              <th className="py-3.5 px-6 text-sm font-semibold text-slate-800 w-[10%]">Uses</th>
              <th className="py-3.5 px-6 text-sm font-semibold text-slate-800 w-[15%]">Status</th>
              <th className="py-3.5 px-6 text-sm font-semibold text-slate-800 w-[10%] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockCoupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium text-slate-700">
                  {coupon.name}
                </td>
                <td className="py-4 px-6 text-sm text-slate-600">
                  <div className="flex flex-col">
                    <span>{coupon.discountTitle}</span>
                    {coupon.discountSubtitle && (
                      <span className="text-gray-400">{coupon.discountSubtitle}</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-slate-600">
                  {coupon.type}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-slate-700">
                  {coupon.code}
                </td>
                <td className="py-4 px-6 text-sm text-slate-600">
                  {coupon.uses}
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    coupon.status === 'Active' 
                      ? 'bg-[#ECFDF5] text-[#10B981]' 
                      : 'bg-[#FEF2F2] text-[#EF4444]'
                  }`}>
                    {coupon.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button 
                    onClick={() => onEdit(coupon)}
                    className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors inline-flex justify-center items-center"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
