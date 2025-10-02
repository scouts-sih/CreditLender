import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-6 mb-8">
      {/* Logo and Brand */}
      <Link 
        to="/landing-page" 
        className="inline-flex items-center space-x-3 transition-smooth hover:opacity-80"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-card">
          <Icon name="CreditCard" size={28} color="white" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-2xl font-bold text-text-primary">CreditLend</span>
          <span className="text-sm font-semibold text-primary">Pro</span>
        </div>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary">
          Partner Portal Access
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Secure login for financial institutions, administrators, and lending officers to access the comprehensive dashboard system.
        </p>
      </div>

      {/* Status Indicator */}
      <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-success">System Online</span>
      </div>

      {/* Quick Access Info */}
      <div className="bg-muted/50 rounded-lg p-4 text-left">
        <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          Quick Access Guide
        </h3>
        <div className="space-y-1 text-xs text-text-secondary">
          <p>• Use your official institutional email address</p>
          <p>• Contact IT support for password reset requests</p>
          <p>• Multi-factor authentication may be required</p>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;