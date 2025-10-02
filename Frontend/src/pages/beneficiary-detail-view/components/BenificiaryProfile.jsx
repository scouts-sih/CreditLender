import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BeneficiaryProfile = ({ beneficiary }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'rejected':
        return 'bg-error text-error-foreground';
      case 'under review':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskBandColor = (riskBand) => {
    switch (riskBand?.toLowerCase()) {
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

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
              {beneficiary?.avatar ? (
                <Image 
                  src={beneficiary?.avatar} 
                  alt={beneficiary?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={32} className="text-text-secondary" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-1">
              {beneficiary?.name}
            </h2>
            <p className="text-sm text-text-secondary mb-2">
              ID: {beneficiary?.id}
            </p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(beneficiary?.status)}`}>
              <Icon name="Circle" size={8} className="mr-2 fill-current" />
              {beneficiary?.status}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {beneficiary?.creditScore}
          </div>
          <div className="text-sm text-text-secondary mb-2">Credit Score</div>
          <div className={`text-sm font-medium ${getRiskBandColor(beneficiary?.riskBand)}`}>
            {beneficiary?.riskBand} Risk
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-primary border-b border-border pb-2">
            Personal Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {beneficiary?.phone}
                </div>
                <div className="text-xs text-text-secondary">Mobile Number</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {beneficiary?.email}
                </div>
                <div className="text-xs text-text-secondary">Email Address</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {beneficiary?.address}
                </div>
                <div className="text-xs text-text-secondary">Address</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-primary border-b border-border pb-2">
            Financial Details
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="IndianRupee" size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  ₹{beneficiary?.estimatedIncome?.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-text-secondary">Monthly Income</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  ₹{beneficiary?.loanAmount?.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-text-secondary">Requested Amount</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {beneficiary?.loanTenure} months
                </div>
                <div className="text-xs text-text-secondary">Loan Tenure</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-primary border-b border-border pb-2">
            Application Timeline
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {beneficiary?.applicationDate}
                </div>
                <div className="text-xs text-text-secondary">Application Date</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {beneficiary?.lastUpdated}
                </div>
                <div className="text-xs text-text-secondary">Last Updated</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="User" size={16} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {beneficiary?.assignedOfficer}
                </div>
                <div className="text-xs text-text-secondary">Assigned Officer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryProfile;