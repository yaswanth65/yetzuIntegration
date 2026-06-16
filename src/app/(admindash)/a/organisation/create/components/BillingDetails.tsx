import React from 'react';
import { Calendar, CreditCard, IndianRupee, AlertCircle } from 'lucide-react';

type BillingData = {
  model: string;
  pricingType: string;
  basePrice: number;
  currency: string;
  billingCycle: string;
  paymentMethod: string;
};

type BillingDetailsProps = {
  data: BillingData;
  onChange: (data: BillingData) => void;
  errors?: string[];
};

export default function BillingDetails({ data, onChange, errors }: BillingDetailsProps) {
  const update = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const cycleMeta = (() => {
    switch (data.billingCycle) {
      case 'quarterly':
        return { label: 'quarter', multiplier: 3 };
      case 'yearly':
        return { label: 'year', multiplier: 12 };
      default:
        return { label: 'month', multiplier: 1 };
    }
  })();

  const estimatedTotal = (data.basePrice || 0) * cycleMeta.multiplier;

  const cycles = [
    { id: 'monthly', label: 'Monthly', desc: 'Billed every month' },
    { id: 'quarterly', label: 'Quarterly', desc: 'Billed every 3 months' },
    { id: 'yearly', label: 'Yearly', desc: 'Billed once a year' },
  ];

  const paymentMethods = [
    { id: 'credit', label: 'Credit Card', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'bank', label: 'Bank Transfer', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'upi', label: 'UPI', icon: <IndianRupee className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 space-y-6">
        {errors && errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-red-700">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-sm text-red-600 space-y-0.5">
                {errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Billing Setup</h2>
          <p className="text-sm text-gray-500">Configure billing details and subscription plan.</p>
        </div>

        <div className="space-y-6 pt-2">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Base Price</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                <IndianRupee className="w-4 h-4" />
              </span>
              <input
                type="number"
                value={data.basePrice}
                onChange={(e) => update('basePrice', Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-800">Billing Cycle</label>
            <div className="grid grid-cols-3 gap-3">
              {cycles.map((c) => (
                <button
                  key={c.id}
                  onClick={() => update('billingCycle', c.id)}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-1 transition-colors ${
                    data.billingCycle === c.id
                      ? 'border-blue-500 bg-blue-50/50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <Calendar className={`w-4 h-4 ${data.billingCycle === c.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-bold ${data.billingCycle === c.id ? 'text-blue-700' : 'text-slate-700'}`}>{c.label}</span>
                  <span className="text-[10px] text-gray-400">{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-sm font-semibold text-slate-800">Payment Method</label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => update('paymentMethod', pm.id)}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-colors ${
                    data.paymentMethod === pm.id
                      ? 'border-blue-500 bg-blue-50/50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`${data.paymentMethod === pm.id ? 'text-blue-600' : 'text-gray-400'}`}>{pm.icon}</div>
                  <span className={`text-xs font-bold ${data.paymentMethod === pm.id ? 'text-blue-700' : 'text-slate-700'}`}>{pm.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-between items-end border-t border-gray-50">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ESTIMATED TOTAL</span>
          <span className="text-2xl font-bold text-slate-900">
            ₹{estimatedTotal.toLocaleString()}
            <span className="text-sm text-gray-500 font-semibold">
              /{cycleMeta.label}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
