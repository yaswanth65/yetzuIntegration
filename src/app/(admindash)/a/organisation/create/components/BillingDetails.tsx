import React, { useState } from 'react';
import { CreditCard, Landmark, Bitcoin, CheckCircle2 } from 'lucide-react';

export default function BillingDetails() {
  const [model, setModel] = useState('flat');
  const [paymentMethod, setPaymentMethod] = useState('credit');

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Billing Setup</h2>
          <p className="text-sm text-gray-500">Configure billing details and subscription plan.</p>
        </div>

        <div className="space-y-6 pt-2">
          
          {/* Model Selection */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'flat', label: 'Flat Model' },
              { id: 'per_user', label: 'Per User Model' },
              { id: 'custom', label: 'Custom' }
            ].map(m => (
              <button 
                key={m.id}
                onClick={() => setModel(m.id)}
                className={`py-3 px-2 text-xs font-bold rounded-xl border-2 transition-colors ${
                  model === m.id ? 'border-blue-500 bg-blue-50/50 text-blue-700' : 'border-gray-100 text-gray-600 hover:border-gray-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
             <label className="block text-sm font-semibold text-slate-800">Pricing Type</label>
             <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-500 appearance-none">
               <option value="fixed">Fixed Plan</option>
               <option value="variable">Variable Plan</option>
             </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
               <label className="block text-sm font-semibold text-slate-800">Base Price</label>
               <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                 <input 
                   type="text" 
                   defaultValue="50,000"
                   className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 font-medium"
                 />
               </div>
            </div>
            <div className="space-y-1.5">
               <label className="block text-sm font-semibold text-slate-800">Billing Cycle</label>
               <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-800 appearance-none font-medium">
                 <option value="monthly">Monthly</option>
                 <option value="yearly">Yearly</option>
               </select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 pt-2">
            <label className="block text-sm font-semibold text-slate-800">Payment Method</label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: 'credit', label: 'Credit Card', icon: <CreditCard className="w-4 h-4 mb-2" /> },
                { id: 'bank', label: 'Bank Transfer', icon: <Landmark className="w-4 h-4 mb-2" /> },
                { id: 'crypto', label: 'Crypto', icon: <Bitcoin className="w-4 h-4 mb-2" /> }
              ].map(pm => (
                <button
                   key={pm.id}
                   onClick={() => setPaymentMethod(pm.id)}
                   className={`relative p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-colors ${
                     paymentMethod === pm.id ? 'border-blue-500 bg-blue-50/50 text-blue-700' : 'border-gray-100 text-gray-500 hover:border-gray-200'
                   }`}
                >
                   {paymentMethod === pm.id && <CheckCircle2 className="w-4 h-4 text-blue-500 absolute top-2 right-2" />}
                   {pm.icon}
                   <span className="text-xs font-bold">{pm.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info inside card */}
        <div className="pt-4 flex justify-between items-end border-t border-gray-50">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">CALCULATED TOTAL</span>
          <span className="text-2xl font-bold text-slate-900">$50,000<span className="text-sm text-gray-500 font-semibold">/month</span></span>
        </div>
      </div>
    </div>
  );
}
