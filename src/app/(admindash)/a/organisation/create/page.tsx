"use client";

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import ProgressBar from './components/ProgressBar';
import BasicInfo from './components/BasicInfo';
import AdminDetails from './components/AdminDetails';
import StudentImport from './components/StudentImport';
import AccessPermissions from './components/AccessPermissions';
import BillingDetails from './components/BillingDetails';
import ReviewCreate from './components/ReviewCreate';

export default function CreateOrganizationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(c => c + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <BasicInfo />;
      case 2: return <AdminDetails />;
      case 3: return <StudentImport />;
      case 4: return <AccessPermissions />;
      case 5: return <BillingDetails />;
      case 6: return <ReviewCreate />;
      default: return <BasicInfo />;
    }
  };

  return (
    <div className="w-full flex flex-col relative pb-24">
      {/* Header */}
      <div className="w-full px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white">
        <Link href="/a/organisation" className="flex items-center gap-2 text-slate-800 font-bold hover:text-blue-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-lg">Create Organisation</span>
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white border-b border-gray-100">
        <ProgressBar currentStep={currentStep} />
      </div>

      {/* Form Content Wrapper */}
      <div className="flex-1 w-full bg-[#fcfcfc] py-8 px-4">
        {renderStep()}
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 right-0 md:left-[260px] left-0 bg-white border-t border-gray-100 p-4 md:px-8 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center w-full">
          <div>
            {currentStep > 1 && (
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-white border border-gray-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
              Save Draft
            </button>
            
            {currentStep === totalSteps ? (
              <button className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-colors">
                Create Organization
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="px-8 py-2.5 bg-[#0A0A0A] hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
