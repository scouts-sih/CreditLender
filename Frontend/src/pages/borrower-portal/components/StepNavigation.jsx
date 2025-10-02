import React from 'react';
import Button from '../../../components/ui/Button';


const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  onSubmit,
  isNextDisabled = false,
  isSubmitting = false,
  className = '' 
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={`flex items-center justify-between pt-6 border-t border-border ${className}`}>
      <div>
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onPrevious}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={16}
          >
            Previous
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-text-secondary">
          Step {currentStep} of {totalSteps}
        </span>
        
        {isLastStep ? (
          <Button
            variant="default"
            onClick={onSubmit}
            disabled={isNextDisabled}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
            iconSize={16}
          >
            Submit Application
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={onNext}
            disabled={isNextDisabled}
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={16}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;