import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationStatusPanel = ({ 
  status = 'pending', 
  estimatedIncome = null, 
  compositeScore = null,
  className = '' 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          title: 'Verification Pending',
          description: 'Please upload all required documents to begin verification',
          icon: 'Clock',
          iconColor: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
      case 'in-progress':
        return {
          title: 'Verification in Progress',
          description: 'Our AI system is analyzing your documents and financial data',
          icon: 'Loader2',
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          animated: true
        };
      case 'completed':
        return {
          title: 'Verification Complete',
          description: 'Your documents have been successfully verified and scored',
          icon: 'CheckCircle',
          iconColor: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'failed':
        return {
          title: 'Verification Failed',
          description: 'Some documents need to be re-uploaded or corrected',
          icon: 'XCircle',
          iconColor: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20'
        };
      default:
        return {
          title: 'Status Unknown',
          description: 'Please refresh the page or contact support',
          icon: 'HelpCircle',
          iconColor: 'text-text-secondary',
          bgColor: 'bg-muted',
          borderColor: 'border-border'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="space-y-6">
        {/* Status Header */}
        <div className={`${statusConfig?.bgColor} ${statusConfig?.borderColor} border rounded-lg p-4`}>
          <div className="flex items-center space-x-3">
            <div className={`${statusConfig?.animated ? 'animate-spin' : ''}`}>
              <Icon 
                name={statusConfig?.icon} 
                size={24} 
                className={statusConfig?.iconColor} 
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {statusConfig?.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {statusConfig?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        {status === 'in-progress' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Document Analysis</span>
                <span className="text-sm text-success">Complete</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-success h-2 rounded-full w-full transition-all duration-1000" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Income Verification</span>
                <span className="text-sm text-primary">In Progress</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-1000" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Credit Scoring</span>
                <span className="text-sm text-text-secondary">Pending</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-text-secondary h-2 rounded-full w-1/4 transition-all duration-1000" />
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {(estimatedIncome || compositeScore) && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-md font-semibold text-text-primary">Assessment Results</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {estimatedIncome && (
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="TrendingUp" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-text-primary">Estimated Income Band</span>
                  </div>
                  <p className="text-lg font-semibold text-primary">₹{estimatedIncome}</p>
                  <p className="text-xs text-text-secondary mt-1">Monthly income range</p>
                </div>
              )}
              
              {compositeScore && (
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Target" size={16} className="text-accent" />
                    <span className="text-sm font-medium text-text-primary">Composite Score</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-semibold text-accent">{compositeScore}/100</p>
                    <div className="flex-1 bg-border rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${compositeScore}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">Credit worthiness score</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Items */}
        {status === 'failed' && (
          <div className="bg-error/5 border border-error/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-error mb-2">Action Required</h5>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Re-upload electricity bill with clear text</li>
                  <li>• Provide recent mobile recharge screenshot</li>
                  <li>• Ensure Aadhaar document is not blurred</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Estimated Timeline */}
        {status === 'in-progress' && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} className="text-primary" />
              <div>
                <h5 className="text-sm font-medium text-primary">Estimated Completion</h5>
                <p className="text-sm text-text-secondary">2-5 minutes remaining</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationStatusPanel;