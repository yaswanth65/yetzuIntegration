"use client";

import React, { useState } from 'react';
import { AlertCircle, Download, Plus, X } from 'lucide-react';
import { AdminAPI } from '@/lib/api';

type PaymentForm = {
  invoiceId: string;
  amount: string;
  currency: string;
  paymentDate: string;
  paymentMethod: string;
  billingCycle: string;
  planType: string;
  paymentStatus: string;
  nextBillingDate: string;
  transactionRef: string;
  notes: string;
};

const SummaryCard = ({ value, label, valueColor }: { value: string | number; label: string; valueColor: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
    <div className={`text-2xl font-bold mb-1 ${valueColor}`}>{value}</div>
    <div className="text-xs text-gray-500 font-medium">{label}</div>
  </div>
);

const formatMoney = (amount: number, currency = 'INR') => {
  if (!Number.isFinite(amount)) return `${currency} 0`;
  return `${currency} ${amount.toLocaleString()}`;
};

const toInputDate = (value?: string) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};

const toDisplayDate = (value?: string) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const buildDefaultForm = (): PaymentForm => ({
  invoiceId: `INV-${Date.now()}`,
  amount: '',
  currency: 'INR',
  paymentDate: toInputDate(),
  paymentMethod: 'credit',
  billingCycle: 'monthly',
  planType: '',
  paymentStatus: 'paid',
  nextBillingDate: '',
  transactionRef: '',
  notes: '',
});

const downloadInvoiceFile = (payload: PaymentForm) => {
  const lines = [
    `Invoice ID: ${payload.invoiceId}`,
    `Amount: ${payload.currency} ${payload.amount}`,
    `Payment Date: ${payload.paymentDate}`,
    `Payment Method: ${payload.paymentMethod}`,
    `Billing Cycle: ${payload.billingCycle}`,
    `Plan Type: ${payload.planType || 'N/A'}`,
    `Status: ${payload.paymentStatus}`,
    `Next Billing Date: ${payload.nextBillingDate || 'N/A'}`,
    `Transaction Ref: ${payload.transactionRef || 'N/A'}`,
    `Notes: ${payload.notes || 'N/A'}`,
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${payload.invoiceId || 'invoice'}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
};

export default function BillingTab({
  organizationId,
  billingCycle,
  revenue,
  invoices: propInvoices,
  payments: propPayments,
  onRecordPayment,
}: {
  organizationId?: string;
  billingCycle?: string;
  revenue?: number;
  invoices?: any[];
  payments?: any[];
  onRecordPayment?: () => void;
}) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSavingPayment, setIsSavingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentForm, setPaymentForm] = useState<PaymentForm>(buildDefaultForm);

  const invoices = Array.isArray(propInvoices) && propInvoices.length > 0 ? propInvoices : [];
  const payments = Array.isArray(propPayments) && propPayments.length > 0 ? propPayments : [];
  const summaryCurrency = invoices[0]?.currency || payments[0]?.currency || 'INR';

  const pendingAmount = invoices.reduce((sum: number, inv: any) => {
    const amount = Number(inv?.amount || inv?.Amount || 0);
    const status = String(inv?.paymentStatus || inv?.status || 'pending').toLowerCase();
    return status === 'paid' ? sum : sum + amount;
  }, 0);

  const latestPayment = [...payments, ...invoices].find((entry: any) => String(entry?.paymentStatus || entry?.status || '').toLowerCase() === 'paid')
    || payments[0]
    || invoices[0];

  const openPaymentModal = () => {
    setPaymentForm(buildDefaultForm());
    setPaymentError('');
    setShowPaymentModal(true);
  };

  const handleDownload = () => {
    const parsedAmount = Number(paymentForm.amount);
    if (!paymentForm.invoiceId.trim()) {
      setPaymentError('Invoice ID is required before download.');
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setPaymentError('Amount must be greater than 0 before download.');
      return;
    }
    downloadInvoiceFile(paymentForm);
  };

  const handleSubmitPayment = async () => {
    if (!organizationId) {
      setPaymentError('Organization ID is missing.');
      return;
    }

    const parsedAmount = Number(paymentForm.amount);
    if (!paymentForm.invoiceId.trim()) {
      setPaymentError('Invoice ID is required.');
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setPaymentError('Amount must be greater than 0.');
      return;
    }

    try {
      setIsSavingPayment(true);
      setPaymentError('');
      await AdminAPI.recordBillingPayment(organizationId, {
        invoiceId: paymentForm.invoiceId.trim(),
        amount: parsedAmount,
        currency: paymentForm.currency || summaryCurrency,
        paymentDate: paymentForm.paymentDate || undefined,
        paymentMethod: paymentForm.paymentMethod || undefined,
        billingCycle: paymentForm.billingCycle || undefined,
        planType: paymentForm.planType || undefined,
        paymentStatus: paymentForm.paymentStatus || 'paid',
        nextBillingDate: paymentForm.nextBillingDate || undefined,
        transactionRef: paymentForm.transactionRef || undefined,
        notes: paymentForm.notes || undefined,
      });
      downloadInvoiceFile(paymentForm);
      setShowPaymentModal(false);
      onRecordPayment?.();
    } catch (error: any) {
      console.error('Failed to record payment:', error);
      setPaymentError(error?.message || 'Failed to record payment.');
    } finally {
      setIsSavingPayment(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard value={formatMoney(Number(revenue || 0), summaryCurrency)} label="Total Revenue" valueColor="text-green-500" />
        <SummaryCard value={formatMoney(pendingAmount, summaryCurrency)} label="Pending Payment" valueColor="text-orange-500" />
        <SummaryCard value={latestPayment ? formatMoney(Number(latestPayment?.amount || latestPayment?.Amount || 0), String(latestPayment?.currency || summaryCurrency)) : 'N/A'} label="Last Payment" valueColor="text-blue-500" />
        <SummaryCard value={(billingCycle || 'N/A').charAt(0).toUpperCase() + (billingCycle || '').slice(1)} label="Billing Cycle" valueColor="text-purple-500" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center p-6 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Invoices</h3>
            <p className="text-xs text-gray-500 mt-0.5">Review billing history and add a new payment record.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors" type="button">
              <Download className="w-4 h-4" />
              Download Invoices
            </button>
            <button
              onClick={openPaymentModal}
              className="flex items-center gap-2 bg-[#0A0A0A] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
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
              {invoices.length > 0 ? invoices.map((inv: any, idx: number) => {
                const id = inv.invoiceId || inv.id || inv.Id || inv.invoice_id || `INV-${idx + 1}`;
                const amount = Number(inv.amount || inv.Amount || 0);
                const currency = inv.currency || inv.Currency || summaryCurrency;
                const status = inv.paymentStatus || inv.status || inv.Status || 'Pending';
                const issueDate = inv.invoiceDate || inv.issueDate || inv.IssueDate || inv.createdAt || '';
                const dueDate = inv.dueDate || inv.DueDate || inv.paymentDate || '';

                return (
                  <tr key={id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">{id}</td>
                    <td className="py-4 px-6 text-sm font-bold text-gray-900">{formatMoney(amount, currency)}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-semibold px-2 py-1 rounded inline-flex ${
                        String(status).toLowerCase() === 'paid' ? 'text-green-500 bg-green-50' : 'text-orange-500 bg-orange-50'
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">{toDisplayDate(issueDate)}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{toDisplayDate(dueDate)}</td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-gray-400 hover:text-gray-900 transition-colors inline-block" type="button">
                        <Download className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-500">No invoices found for this organization.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Record Payment</h3>
                <p className="text-sm text-gray-500">Add a new billing record and download the generated invoice.</p>
              </div>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500" type="button">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-medium">{paymentError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Invoice ID">
                  <input value={paymentForm.invoiceId} onChange={(e) => setPaymentForm((current) => ({ ...current, invoiceId: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </Field>
                <Field label="Amount">
                  <input type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm((current) => ({ ...current, amount: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </Field>
                <Field label="Currency">
                  <input value={paymentForm.currency} onChange={(e) => setPaymentForm((current) => ({ ...current, currency: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </Field>
                <Field label="Payment Date">
                  <input type="date" value={paymentForm.paymentDate} onChange={(e) => setPaymentForm((current) => ({ ...current, paymentDate: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </Field>
                <Field label="Payment Method">
                  <select value={paymentForm.paymentMethod} onChange={(e) => setPaymentForm((current) => ({ ...current, paymentMethod: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                    <option value="credit">Credit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                  </select>
                </Field>
                <Field label="Billing Cycle">
                  <select value={paymentForm.billingCycle} onChange={(e) => setPaymentForm((current) => ({ ...current, billingCycle: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </Field>
                <Field label="Payment Status">
                  <select value={paymentForm.paymentStatus} onChange={(e) => setPaymentForm((current) => ({ ...current, paymentStatus: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </Field>
                <Field label="Plan Type">
                  <input value={paymentForm.planType} onChange={(e) => setPaymentForm((current) => ({ ...current, planType: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </Field>
                <Field label="Next Billing Date">
                  <input type="date" value={paymentForm.nextBillingDate} onChange={(e) => setPaymentForm((current) => ({ ...current, nextBillingDate: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </Field>
              </div>

              <Field label="Transaction Reference">
                <input value={paymentForm.transactionRef} onChange={(e) => setPaymentForm((current) => ({ ...current, transactionRef: e.target.value }))} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </Field>

              <Field label="Notes">
                <textarea value={paymentForm.notes} onChange={(e) => setPaymentForm((current) => ({ ...current, notes: e.target.value }))} rows={3} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none" />
              </Field>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-6 py-4 bg-gray-50">
              <button type="button" onClick={handleDownload} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-white">
                Download Invoice
              </button>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-white">
                  Cancel
                </button>
                <button type="button" onClick={handleSubmitPayment} disabled={isSavingPayment} className="px-5 py-2 rounded-lg bg-[#0A0A0A] text-white text-sm font-semibold hover:bg-black disabled:opacity-60">
                  {isSavingPayment ? 'Saving...' : 'Save Payment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
      {children}
    </label>
  );
}
