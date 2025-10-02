import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';

const AdminPartnerLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Navigation Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/landing-page" 
              className="flex items-center space-x-3 transition-smooth hover:opacity-80"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="CreditCard" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-text-primary">CreditLend</span>
                <span className="text-xs font-medium text-primary">Pro</span>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/borrower-portal">
                <Button variant="ghost" size="sm">
                  <Icon name="User" size={16} className="mr-2" />
                  Borrower Portal
                </Button>
              </Link>
              <Link to="/landing-page">
                <Button variant="outline" size="sm">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-2xl shadow-modal border border-border p-8">
                <LoginHeader />
                <LoginForm />
              </div>
            </div>

            {/* Right Column - Trust Signals */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-8 space-y-6">
                
                {/* Welcome Section */}
                <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto">
                      <Icon name="Shield" size={32} color="white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-text-primary">Secure Partner Access</h2>
                      <p className="text-text-secondary mt-2">
                        Access comprehensive beneficiary management, risk assessment tools, and loan approval workflows through our secure government platform.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Signals Component */}
                <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                  <TrustSignals />
                </div>

                {/* Statistics */}
                <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Platform Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">50K+</div>
                      <div className="text-xs text-text-secondary">Beneficiaries Served</div>
                    </div>
                    <div className="text-center p-3 bg-accent/5 rounded-lg">
                      <div className="text-2xl font-bold text-accent">₹2.5Cr</div>
                      <div className="text-xs text-text-secondary">Loans Sanctioned</div>
                    </div>
                    <div className="text-center p-3 bg-success/5 rounded-lg">
                      <div className="text-2xl font-bold text-success">95%</div>
                      <div className="text-xs text-text-secondary">Approval Rate</div>
                    </div>
                    <div className="text-center p-3 bg-warning/5 rounded-lg">
                      <div className="text-2xl font-bold text-warning">24/7</div>
                      <div className="text-xs text-text-secondary">System Uptime</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>© {new Date()?.getFullYear()} CreditLend Pro</span>
              <span>•</span>
              <span>Ministry of Finance, Government of India</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-text-secondary hover:text-primary transition-smooth">
                Privacy Policy
              </button>
              <button className="text-text-secondary hover:text-primary transition-smooth">
                Terms of Service
              </button>
              <button className="text-text-secondary hover:text-primary transition-smooth">
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminPartnerLogin;