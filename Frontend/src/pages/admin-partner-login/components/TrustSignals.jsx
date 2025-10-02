import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustElements = [
    {
      icon: 'Shield',
      title: 'Government Secured',
      description: 'Ministry of Finance approved platform'
    },
    {
      icon: 'Lock',
      title: 'Bank-Grade Security',
      description: '256-bit SSL encryption & compliance'
    },
    {
      icon: 'CheckCircle',
      title: 'RBI Compliant',
      description: 'Regulatory guidelines adherence'
    }
  ];

  const certifications = [
    'ISO 27001 Certified',
    'PCI DSS Compliant',
    'GDPR Ready',
    'SOC 2 Type II'
  ];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="grid grid-cols-1 gap-4">
        {trustElements?.map((element, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full flex-shrink-0">
              <Icon name={element?.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">{element?.title}</h4>
              <p className="text-xs text-text-secondary mt-1">{element?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Compliance Badges */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Security Certifications</h4>
        <div className="grid grid-cols-2 gap-2">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-success/5 border border-success/20 rounded-md">
              <Icon name="Award" size={12} className="text-success" />
              <span className="text-xs text-success font-medium">{cert}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Ministry Logo Section */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
          <Icon name="Building2" size={24} className="text-primary" />
          <div className="text-center">
            <p className="text-sm font-semibold text-text-primary">Ministry of Finance</p>
            <p className="text-xs text-text-secondary">Government of India</p>
          </div>
        </div>
      </div>
      {/* Support Information */}
      <div className="text-center space-y-2">
        <p className="text-xs text-text-secondary">
          Need help accessing your account?
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs">
          <button className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth">
            <Icon name="Phone" size={12} />
            <span>1800-XXX-XXXX</span>
          </button>
          <button className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth">
            <Icon name="Mail" size={12} />
            <span>support@creditlend.gov</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;