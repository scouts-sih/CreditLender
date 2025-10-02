import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressStepper = ({ currentStep, steps, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Progress Bar */}
      <div className="hidden md:flex items-center justify-between mb-8">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth ${
                    isCompleted
                      ? 'bg-success border-success text-success-foreground'
                      : isActive
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-background border-border text-text-secondary'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                <div className="text-center">
                  <p
                    className={`text-sm font-medium ${
                      isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'
                    }`}
                  >
                    {step?.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">{step?.description}</p>
                </div>
              </div>
              {index < steps?.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-0.5 transition-smooth ${
                      stepNumber < currentStep ? 'bg-success' : 'bg-border'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Mobile Progress Bar */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Step {currentStep} of {steps?.length}
          </h2>
          <span className="text-sm text-text-secondary">
            {Math.round((currentStep / steps?.length) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-border rounded-full h-2 mb-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / steps?.length) * 100}%` }}
          />
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep <= steps?.length ? 'bg-primary text-primary-foreground' : 'bg-success text-success-foreground'
              }`}
            >
              {currentStep <= steps?.length ? (
                <span className="text-sm font-semibold">{currentStep}</span>
              ) : (
                <Icon name="Check" size={16} />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {steps?.[currentStep - 1]?.title || 'Complete'}
              </p>
              <p className="text-xs text-text-secondary">
                {steps?.[currentStep - 1]?.description || 'All steps completed'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;