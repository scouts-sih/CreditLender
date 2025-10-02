import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskAssessment = ({ riskData }) => {
  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'bg-success/10 border-success/20';
      case 'medium':
        return 'bg-warning/10 border-warning/20';
      case 'high':
        return 'bg-error/10 border-error/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const getRiskIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'Shield';
      case 'medium':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      default:
        return 'HelpCircle';
    }
  };

  const riskFactors = [
    {
      factor: 'Payment History',
      impact: riskData?.paymentHistoryRisk,
      description: 'Based on utility bill and recharge payment patterns',
      weight: 'High'
    },
    {
      factor: 'Income Stability',
      impact: riskData?.incomeStabilityRisk,
      description: 'Consistency of income over the past 6 months',
      weight: 'High'
    },
    {
      factor: 'Debt-to-Income Ratio',
      impact: riskData?.debtToIncomeRisk,
      description: 'Current debt obligations vs estimated income',
      weight: 'Medium'
    },
    {
      factor: 'Geographic Risk',
      impact: riskData?.geographicRisk,
      description: 'Location-based risk assessment',
      weight: 'Low'
    },
    {
      factor: 'Behavioral Patterns',
      impact: riskData?.behavioralRisk,
      description: 'Spending and payment behavior analysis',
      weight: 'Medium'
    }
  ];

  const mitigationStrategies = [
    {
      strategy: 'Collateral Requirement',
      applicable: riskData?.overallRisk === 'High',
      description: 'Require additional security for loan approval'
    },
    {
      strategy: 'Co-signer Requirement',
      applicable: riskData?.overallRisk === 'High' || riskData?.overallRisk === 'Medium',
      description: 'Additional guarantor to reduce default risk'
    },
    {
      strategy: 'Reduced Loan Amount',
      applicable: riskData?.overallRisk === 'Medium',
      description: 'Limit exposure by reducing approved amount'
    },
    {
      strategy: 'Shorter Tenure',
      applicable: riskData?.overallRisk === 'High',
      description: 'Reduce loan term to minimize risk exposure'
    },
    {
      strategy: 'Higher Interest Rate',
      applicable: riskData?.overallRisk === 'High' || riskData?.overallRisk === 'Medium',
      description: 'Risk-adjusted pricing for loan approval'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Risk Assessment
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            Last updated: {riskData?.lastUpdated}
          </span>
        </div>
      </div>
      {/* Overall Risk Summary */}
      <div className={`p-4 rounded-lg border-2 mb-6 ${getRiskBgColor(riskData?.overallRisk)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRiskBgColor(riskData?.overallRisk)}`}>
              <Icon 
                name={getRiskIcon(riskData?.overallRisk)} 
                size={24} 
                className={getRiskColor(riskData?.overallRisk)} 
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary">
                {riskData?.overallRisk} Risk
              </h4>
              <p className="text-sm text-text-secondary">
                Overall risk assessment for this applicant
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getRiskColor(riskData?.overallRisk)}`}>
              {riskData?.riskScore}%
            </div>
            <div className="text-sm text-text-secondary">Risk Score</div>
          </div>
        </div>
      </div>
      {/* Risk Factors Breakdown */}
      <div className="space-y-4 mb-6">
        <h4 className="text-md font-medium text-text-primary">Risk Factors Analysis</h4>
        {riskFactors?.map((factor, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h5 className="text-sm font-medium text-text-primary">
                  {factor?.factor}
                </h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  factor?.weight === 'High' ? 'bg-error/10 text-error' :
                  factor?.weight === 'Medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                }`}>
                  {factor?.weight} Impact
                </span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                factor?.impact === 'Low' ? 'bg-success/10 text-success' :
                factor?.impact === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
              }`}>
                {factor?.impact}
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              {factor?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Mitigation Strategies */}
      <div className="space-y-4 mb-6">
        <h4 className="text-md font-medium text-text-primary">Recommended Mitigation Strategies</h4>
        <div className="space-y-3">
          {mitigationStrategies?.map((strategy, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border ${
                strategy?.applicable 
                  ? 'border-primary bg-primary/5' :'border-border bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={strategy?.applicable ? "CheckCircle" : "Circle"} 
                    size={16} 
                    className={strategy?.applicable ? "text-primary" : "text-text-secondary"} 
                  />
                  <div>
                    <h5 className={`text-sm font-medium ${
                      strategy?.applicable ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {strategy?.strategy}
                    </h5>
                    <p className={`text-xs ${
                      strategy?.applicable ? 'text-text-secondary' : 'text-text-secondary/70'
                    }`}>
                      {strategy?.description}
                    </p>
                  </div>
                </div>
                {strategy?.applicable && (
                  <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                    Recommended
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">
              Default Probability
            </span>
          </div>
          <div className="text-xl font-bold text-text-primary">
            {riskData?.defaultProbability}%
          </div>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">
              Expected Loss
            </span>
          </div>
          <div className="text-xl font-bold text-text-primary">
            ₹{riskData?.expectedLoss?.toLocaleString('en-IN')}
          </div>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">
              Recovery Rate
            </span>
          </div>
          <div className="text-xl font-bold text-text-primary">
            {riskData?.recoveryRate}%
          </div>
        </div>
      </div>
      {/* Risk Alert */}
      {riskData?.overallRisk === 'High' && (
        <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-error mb-1">
                High Risk Alert
              </h5>
              <p className="text-sm text-text-secondary">
                This applicant has been flagged as high risk. Consider implementing multiple mitigation strategies before loan approval. Manual review is strongly recommended.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessment;