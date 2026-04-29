"use client";

import React, { useEffect, useMemo, useState } from "react";
import { User, Mail, Phone, CreditCard, Edit3, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { StudentAPI } from "@/lib/api";
import useSession from "@/hooks/useSession";
import { toast } from "react-hot-toast";

const buildAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Student")}&background=94b9ff&color=1e1e1e`;

export default function ProfilePage() {
  const { user, setUser } = useSession();
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    country: "",
    autoPayout: false,
    notifyPayments: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await StudentAPI.getProfile();
        const profile = response?.user || response?.data?.user || user;

        setFormData({
          fullName: profile?.name || "",
          email: profile?.email || "",
          phone: profile?.mobileno || "",
        });
        setPaymentData((current) => ({
          ...current,
          cardHolder: profile?.name || "",
        }));
      } catch (fetchError: any) {
        console.error("Student profile fetch failed", fetchError);
        setError(fetchError?.message || "Unable to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const avatarUrl = useMemo(() => buildAvatar(formData.fullName || user?.name || "Student"), [formData.fullName, user?.name]);

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    setIsSaving(true);
    try {
      await StudentAPI.editProfile({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        mobileno: formData.phone.trim(),
      });

      setUser((current) => ({
        ...current,
        name: formData.fullName.trim(),
        email: formData.email.trim(),
      }));
      setPaymentData((current) => ({
        ...current,
        cardHolder: formData.fullName.trim(),
      }));
      toast.success("Profile updated successfully.");
    } catch (saveError: any) {
      console.error("Student profile update failed", saveError);
      toast.error(saveError?.message || "Unable to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-xl font-bold text-[#1e1e1e] mb-2">Unable to load profile</h2>
          <p className="text-sm text-[#666666]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-[180px] md:h-[220px] bg-gradient-to-r from-[#ffffff] via-[#94b9ff] to-[#042BFD]">
        <div className="absolute -bottom-15 md:-bottom-20 left-6 md:left-12 flex items-center md:items-end gap-4 md:gap-6">
          <div className="relative w-[100px] h-[100px] md:w-[160px] md:h-[160px] shrink-0">
            <div className="w-full h-full rounded-full border-[4px] md:border-[6px] border-white overflow-hidden shadow-sm bg-gray-100">
              <img src={avatarUrl} alt={formData.fullName || "Profile"} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="mb-0 md:mb-4">
            <h1 className="text-[20px] md:text-[28px] mt-6 md:mb-0 font-bold text-[#1e1e1e] leading-tight">
              {formData.fullName || "Student"}
            </h1>
            <p className="text-[#666666] text-[14px] md:text-base">{formData.email || "student@example.com"}</p>
          </div>
        </div>

        <button className="absolute top-4 right-4 md:top-auto md:-bottom-15 md:right-10 bg-[#003fc7] text-white p-2.5 md:px-6 md:py-2.5 rounded-full md:rounded-xl flex items-center gap-2 font-bold text-[14px] shadow-lg">
          <Edit3 size={18} />
          <span className="hidden md:inline">Live Profile</span>
        </button>
      </div>

      <div className="mt-20 md:mt-24 px-6 md:px-12 flex gap-2 md:gap-4">
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 md:px-8 py-2 md:py-2.5 rounded-lg font-bold text-[12px] md:text-[14px] transition-all ${
            activeTab === "personal" ? "bg-[#003fc7] text-white shadow-md" : "text-[#666666] hover:bg-gray-50"
          }`}
        >
          Personal
        </button>
        <button
          onClick={() => setActiveTab("payment")}
          className={`px-4 md:px-8 py-2 md:py-2.5 rounded-lg font-bold text-[12px] md:text-[14px] transition-all ${
            activeTab === "payment" ? "bg-[#003fc7] text-white shadow-md" : "text-[#666666] hover:bg-gray-50"
          }`}
        >
          Payment
        </button>
      </div>

      <div className="mx-6 md:mx-12 mt-4 border-t border-[#f0f0f0]" />

      <div className="px-6 md:px-12 py-6 md:py-10">
        {activeTab === "personal" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 md:gap-y-8">
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-[#1e1e1e]">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(event) => setFormData((current) => ({ ...current, fullName: event.target.value }))}
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 rounded-xl border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-[#003fc7]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-[#1e1e1e]">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 rounded-xl border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-[#003fc7]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-[#1e1e1e]">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 rounded-xl border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-[#003fc7]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-[#1e1e1e]">Connections</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-600">P</span>
                  </div>
                </div>
                <select className="w-full pl-12 pr-10 py-3 md:py-3.5 rounded-xl border border-[#e5e5e5] text-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#003fc7]">
                  <option>{formData.email || "Primary account"}</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999]" size={18} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-20">
              <div className="flex items-start gap-4">
                <div className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={paymentData.autoPayout}
                    onChange={() => setPaymentData((current) => ({ ...current, autoPayout: !current.autoPayout }))}
                  />
                  <div className="w-11 h-6 bg-[#e5e5e5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003fc7]" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#1e1e1e]">Enable Auto Payout</p>
                  <p className="text-[12px] text-[#999999]">Preference saved locally until a payment settings API is available.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={paymentData.notifyPayments}
                    onChange={() => setPaymentData((current) => ({ ...current, notifyPayments: !current.notifyPayments }))}
                  />
                  <div className="w-11 h-6 bg-[#e5e5e5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003fc7]" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#1e1e1e]">Notify New Payments</p>
                  <p className="text-[12px] text-[#999999]">Preference saved locally until a payment settings API is available.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-[#1e1e1e]">Credit Card</label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(event) => setPaymentData((current) => ({ ...current, cardNumber: event.target.value }))}
                    placeholder="No payment card on file"
                    className="w-full px-4 py-3.5 rounded-full border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[#cccccc]">
                    {paymentData.cardNumber ? "CARD" : "EMPTY"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-[#1e1e1e]">Card Holder Name</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
                  <input
                    type="text"
                    value={paymentData.cardHolder}
                    onChange={(event) => setPaymentData((current) => ({ ...current, cardHolder: event.target.value }))}
                    className="w-full pl-12 pr-4 py-3.5 rounded-full border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-[#1e1e1e]">Country</label>
                <div className="relative flex items-center w-full">
                  <div className="absolute left-4 flex items-center gap-1">
                    <span className="text-[18px]">🌍</span>
                    <ChevronDown size={14} className="text-[#999999]" />
                  </div>
                  <input
                    type="text"
                    value={paymentData.country}
                    onChange={(event) => setPaymentData((current) => ({ ...current, country: event.target.value }))}
                    placeholder="Add your country"
                    className="w-full pl-16 pr-4 py-3.5 rounded-full border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 flex justify-end gap-4">
          <button
            onClick={() => setActiveTab("personal")}
            className="px-6 md:px-10 py-3 rounded-xl border border-[#e5e5e5] text-[#666666] font-bold text-[14px] hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 md:px-12 py-3 rounded-xl bg-[#003fc7] text-white font-bold text-[14px] shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all disabled:opacity-60 flex items-center gap-2"
          >
            {isSaving && <Loader2 size={16} className="animate-spin" />}
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}
