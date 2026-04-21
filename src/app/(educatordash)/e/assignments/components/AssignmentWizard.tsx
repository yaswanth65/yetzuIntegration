import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Step1Basics from './wizard/Step1Basics';
import Step2Rules from './wizard/Step2Submission';
import Step3Deadlines from './wizard/Step3Deadlines';
import Step4Config from './wizard/Step4Configuration';

interface AssignmentWizardProps {
  onBackToOverview: () => void;
}

export default function AssignmentWizard({ onBackToOverview }: AssignmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Assignment Basics', desc: currentStep > 1 ? 'Completed' : 'In Progress' },
    { id: 2, title: 'Submissions Rules', desc: currentStep > 2 ? 'Completed' : 'Pending' },
    { id: 3, title: 'Deadlines & Visibility', desc: currentStep > 3 ? 'Completed' : 'Pending' },
    { id: 4, title: 'Configuration', desc: currentStep > 4 ? 'Completed' : 'Pending' },
    { id: 5, title: 'Review', desc: 'Pending' },
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else onBackToOverview();
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1: return <Step1Basics />;
      case 2: return <Step2Rules onNext={handleNext} onBack={handleBack} />;
      case 3: return <Step3Deadlines onNext={handleNext} onBack={handleBack} />;
      case 4: return <Step4Config onNext={handleNext} onBack={handleBack} />;
      default: return <div className="p-8 text-center text-gray-500 font-medium">Review Step (Placeholder)</div>;
    }
  };

  return (
    <div className="animate-in fade-in duration-300 w-full bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center text-[13px] text-gray-500 mb-6">
          <span onClick={onBackToOverview} className="cursor-pointer hover:text-gray-900 transition-colors">Assignments</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-bold text-gray-900">New Assignment</span>
        </div>
        
        <h1 className="text-[20px] font-bold text-gray-900 leading-tight mb-1">Advanced Statistical Analysis For Research</h1>
        <p className="text-gray-500 text-[13px] font-medium mb-8">Fall 2025 - Research Writing Batch</p>

        {/* Stepper */}
        <div className="flex items-center justify-between w-full relative mb-4 mt-2">
           <div className="absolute top-[11px] left-[30px] right-[30px] h-0.5 bg-gray-100 -z-10"></div>
           <div 
             className="absolute top-[11px] left-[30px] h-0.5 bg-green-500 -z-10 transition-all duration-300"
             style={{ width: `calc(${(currentStep - 1) / 4} * calc(100% - 60px))` }}
           ></div>
           
           {steps.map((step) => {
             const isCompleted = currentStep > step.id;
             const isCurrent = currentStep === step.id;
             const isPending = currentStep < step.id;
             
             let circleClass = "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border-2 bg-white";
             let textClass = "mt-3 text-center";
             
             if (isCompleted) {
               circleClass += " border-green-500 bg-green-500 text-white";
               textClass += " text-gray-900";
             } else if (isCurrent) {
               circleClass += " border-blue-600 bg-white text-blue-600";
               textClass += " text-gray-900";
             } else {
               circleClass += " border-gray-300 bg-white text-gray-400";
               textClass += " text-gray-400 opacity-70";
             }

             return (
               <div key={step.id} className="flex flex-col items-center shrink-0 w-24">
                 <div className={circleClass}>
                   {isCompleted ? (
                     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                   ) : (
                     step.id
                   )}
                 </div>
                 <div className={textClass}>
                   <div className={`text-[11px] font-bold leading-tight ${isPending ? 'text-gray-400' : 'text-gray-900'} mb-0.5 whitespace-nowrap`}>STEP {step.id}</div>
                   <div className={`text-[12px] font-bold leading-tight ${isPending ? 'text-gray-400' : 'text-gray-900'} mb-0.5`}>{step.title}</div>
                   <div className={`text-[10px] ${isCompleted ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>{step.desc}</div>
                 </div>
               </div>
             )
           })}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="p-6 md:p-8 min-h-[400px]">
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100 flex items-center justify-between">
        <button 
          onClick={handleBack}
          className="px-6 py-2 bg-white border border-gray-200 text-gray-600 text-[13px] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          Back
        </button>
        <button 
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white text-[13px] font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
        >
          Next {currentStep !== 5 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
