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

// Onboarding steps configuration
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

  /**
   * Navigate to next step in onboarding flow
   */
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(current => current + 1);
    }
  };

  /**
   * Navigate to previous step in onboarding flow
   */
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
    }
  };

  /**
   * Handle form submission
   * Would integrate with backend in production
   */
  const handleSubmit = async () => {
    console.log('Submitting profile:', formData);
    navigate('/professional/dashboard');
  };

  /**
   * Update form data from step components
   */
  const updateFormData = (data: Partial<ProfessionalFormData>) => {
    setFormData(current => ({ ...current, ...data }));
  };

  /**
   * Render current step component
   */
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create Your Professional Profile
        </h1>
        
        {/* Progress indicator */}
        <ProgressBar steps={STEPS} currentStep={currentStep} />
        
        {/* Form content */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          {renderStep()}
          
          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
            )}
            
            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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