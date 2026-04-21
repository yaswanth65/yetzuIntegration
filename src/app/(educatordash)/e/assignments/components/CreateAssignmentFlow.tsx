import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import CreateAssignmentStepper from './CreateAssignmentStepper';
import Step1Basics from './Step1Basics';
import Step2Submission from './wizard/Step2Submission';
import Step3Deadlines from './wizard/Step3Deadlines';
import Step4Configuration from './wizard/Step4Configuration';
import Step5Review from './Step5Review';
import SuccessModal from './SuccessModal';

interface CreateAssignmentFlowProps {
  webinar: { title: string, subtitle: string };
  onBack: () => void;
}

export default function CreateAssignmentFlow({ webinar, onBack }: CreateAssignmentFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Minimal state placeholders for forms
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };
  
  const handleSubmit = () => {
    setShowSuccessModal(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Basics onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <Step2Submission onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3Deadlines onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4Configuration onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5Review onSubmit={handleSubmit} onBack={handleBack} />;
      default:
        return <Step1Basics onNext={handleNext} onBack={handleBack} />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center text-[13px] text-gray-500 mb-6">
        <span className="hover:text-gray-700 cursor-pointer transition-colors" onClick={onBack}>Assignments</span>
        <ChevronRight className="w-3.5 h-3.5 mx-2" />
        <span className="font-bold text-gray-900">New Assignment</span>
      </div>

      <CreateAssignmentStepper 
        currentStep={currentStep} 
        webinar={webinar} 
      />

      <div className="mt-6">
        {renderStep()}
      </div>
      
      {showSuccessModal && (
        <SuccessModal 
          onClose={() => setShowSuccessModal(false)} 
          onDashboard={onBack} 
        />
      )}
    </div>
  );
}
