/**
 * Professional onboarding flow
 * Multi-step form for creating professional profiles
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInfo from './steps/BasicInfo';
import Specialties from './steps/Specialties';
import Availability from './steps/Availability';
import Review from './steps/Review';
import ProgressBar from './components/ProgressBar';
import { ProfessionalFormData } from '../../types';

const STEPS = ['Basic Info', 'Specialties', 'Availability', 'Review'];

export default function ProfessionalOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProfessionalFormData>({
    name: '',
    title: '',
    bio: '',
    imageUrl: '',
    specialties: [],
    sessionTypes: [],
    availability: [],
    rate: '',
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(current => current + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting profile:', formData);
    navigate('/professional/dashboard');
  };

  const updateFormData = (data: Partial<ProfessionalFormData>) => {
    setFormData(current => ({ ...current, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo data={formData} onUpdate={updateFormData} />;
      case 1:
        return <Specialties data={formData} onUpdate={updateFormData} />;
      case 2:
        return <Availability data={formData} onUpdate={updateFormData} />;
      case 3:
        return <Review data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#111] py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">
          Create Your Professional Profile
        </h1>
        
        <ProgressBar steps={STEPS} currentStep={currentStep} />
        
        <div className="mt-8 bg-[#191919] rounded-lg shadow-lg p-6 border border-gray-800">
          {renderStep()}
          
          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                Back
              </button>
            )}
            
            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Complete Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}