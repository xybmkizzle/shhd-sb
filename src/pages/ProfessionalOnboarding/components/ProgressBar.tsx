/**
 * Progress bar component for multi-step forms
 */

interface Props {
  steps: string[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: Props) {
  return (
    <div className="relative">
      {/* Progress bar line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 -translate-y-1/2" />
      
      {/* Step indicators */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 
                ${index <= currentStep
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400'
                }`}
            >
              {index + 1}
            </div>
            <span className={`mt-2 text-sm ${
              index <= currentStep ? 'text-gray-300' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}