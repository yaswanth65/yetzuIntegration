import React from 'react';

export default function ReviewCreate() {
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="py-5 border-b border-gray-100 last:border-0 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">{title}</h3>
        <button className="text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );

  const Row = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 pb-4">
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-bold text-slate-900">Review & Create</h2>
          <p className="text-sm text-gray-500">Review everything before finalizing.</p>
        </div>

        <Section title="Basic & Org Details">
          <Row label="Organization Name" value="Stanford Inst." />
          <Row label="Admin Email" value="john.doe@stanford.edu" />
        </Section>

        <Section title="Student Import">
          <Row label="Method" value="CSV Upload" />
        </Section>

        <Section title="Permissions">
          <Row label="Access level" value="Custom" />
        </Section>

        <Section title="Billing Information">
          <Row label="Plan" value="Flat Model" />
          <Row label="Billing Cycle" value="Monthly" />
        </Section>

        <Section title="Offer">
          <Row label="Type" value="Flat rate" />
          <Row label="Discount type" value="20%" />
        </Section>
      </div>

      <div className="bg-[#FAFAFA] p-8 border-t border-gray-100 flex items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">$50,000<span className="text-sm text-gray-500 font-semibold">/month</span></span>
      </div>
    </div>
  );
}
