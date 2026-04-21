import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  webinar: { title: string, subtitle: string };
}

export default function CreateAssignmentStepper({ currentStep, webinar }: StepperProps) {
  const steps = [
    { num: 1, label: 'Assignment Basics' },
    { num: 2, label: 'Submission Rules' },
    { num: 3, label: 'Deadlines & Visibility' },
    { num: 4, label: 'Configuration' },
    { num: 5, label: 'Review' },
  ];

  return (
    <div className="bg-white rounded-[12px] p-6 lg:px-8 lg:py-6 shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
      <div className="max-w-[400px]">
        <h2 className="text-[18px] font-bold text-gray-900 mb-1 leading-tight">{webinar.title}</h2>
        <p className="text-gray-500 text-[13px]">{webinar.subtitle}</p>
      </div>

      <div className="flex-1 w-full lg:w-auto relative">
        <div className="flex justify-between items-start w-full relative z-10">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const isPending = currentStep < step.num;

            return (
              <div key={step.num} className="flex flex-col items-center relative flex-1">
                {/* Horizontal line connector */}
                {index !== 0 && (
                  <div className={`absolute top-[11px] right-[50%] w-full h-[2px] -z-10 ${isCompleted || isCurrent ? 'bg-[#3E73F8]' : 'bg-gray-200'}`}></div>
                )}
                
                <div className="flex flex-col items-center group cursor-default">
                  <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-colors mb-2 bg-white
                    ${isCompleted ? 'border-[#22C55E] text-[#22C55E]' : 
                      isCurrent ? 'border-[#3E73F8] bg-[#3E73F8] text-white' : 
                      'border-gray-300 text-gray-400'}`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-gray-400 mb-0.5 uppercase tracking-wider">STEP {step.num}</div>
                    <div className={`text-[12px] font-bold ${isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.label}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${
                      isCompleted ? 'text-[#22C55E] font-medium' : 
                      isCurrent ? 'text-[#3E73F8] font-medium' : 
                      'text-gray-400'
                    }`}>
                      {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
