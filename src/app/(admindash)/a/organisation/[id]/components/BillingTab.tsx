import React from 'react';
import { Download, Plus } from 'lucide-react';

const SummaryCard = ({ value, label, valueColor }: { value: string, label: string, valueColor: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
    <div className={`text-2xl font-bold mb-1 ${valueColor}`}>{value}</div>
    <div className="text-xs text-gray-500 font-medium">{label}</div>
  </div>
);

export default function BillingTab() {
  const invoices = [
    { id: 'INV-001', amount: '$24,000', status: 'Paid', issueDate: 'Jan 1, 2026', dueDate: 'Jan 15, 2026' },
    { id: 'INV-002', amount: '$24,000', status: 'Paid', issueDate: 'Feb 1, 2026', dueDate: 'Feb 15, 2026' },
    { id: 'INV-003', amount: '$24,000', status: 'Pending', issueDate: 'Mar 1, 2026', dueDate: 'Mar 15, 2026' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard value="$48,000" label="Total Paid" valueColor="text-green-500" />
        <SummaryCard value="$24,000" label="Pending Payment" valueColor="text-orange-500" />
        <SummaryCard value="Feb 1, 2026" label="Last Payment" valueColor="text-blue-500" />
        <SummaryCard value="May 1, 2026" label="Next Billing Date" valueColor="text-purple-500" />
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Invoices</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
              Download Invoices
            </button>
            <button className="flex items-center gap-2 bg-[#0A0A0A] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              <Plus className="w-4 h-4" />
              Record Payment
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[15%]">Invoice ID</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[20%]">Amount</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[15%]">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[20%]">Issue Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[20%]">Due Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 w-[10%] text-center">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                    {inv.id}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">
                    {inv.amount}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-semibold ${
                      inv.status === 'Paid' ? 'text-green-500 bg-green-50' : 'text-orange-500 bg-orange-50'
                    } px-2 py-1 rounded inline-flex`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {inv.issueDate}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {inv.dueDate}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-gray-400 hover:text-gray-900 transition-colors inline-block">
                      <Download className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
