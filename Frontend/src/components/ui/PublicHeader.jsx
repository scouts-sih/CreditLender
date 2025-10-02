import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background border-b border-border">
      <div className="flex items-center justify-between h-20 px-4 lg:px-6">
        {/* Logo */}
        <Link 
          to="/landing-page" 
          className="flex items-center space-x-3 transition-smooth hover:opacity-80"
          onClick={closeMobileMenu}
        >
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="CreditCard" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-text-primary">CreditLend</span>
            <span className="text-sm font-medium text-primary">Pro</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/landing-page"
            className={`text-sm font-medium transition-smooth hover:text-primary ${
              isActive('/landing-page') 
                ? 'text-primary' :'text-text-secondary'
            }`}
          >
            Home
          </Link>
          <Link
            to="/borrower-portal"
            className={`text-sm font-medium transition-smooth hover:text-primary ${
              isActive('/borrower-portal') 
                ? 'text-primary' :'text-text-secondary'
            }`}
          >
            Apply Now
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/admin-partner-login">
            <Button variant="outline" size="sm">
              Partner Login
            </Button>
          </Link>
          <Link to="/borrower-portal">
            <Button variant="default" size="sm">
              Check Eligibility
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted transition-smooth"
          aria-label="Toggle mobile menu"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 z-200 bg-background border-t border-border">
          <nav className="flex flex-col p-6 space-y-6">
            <Link
              to="/landing-page"
              onClick={closeMobileMenu}
              className={`text-base font-medium transition-smooth hover:text-primary ${
                isActive('/landing-page') 
                  ? 'text-primary' :'text-text-secondary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/borrower-portal"
              onClick={closeMobileMenu}
              className={`text-base font-medium transition-smooth hover:text-primary ${
                isActive('/borrower-portal') 
                  ? 'text-primary' :'text-text-secondary'
              }`}
            >
              Apply Now
            </Link>
            
            <div className="pt-6 border-t border-border space-y-4">
              <Link to="/admin-partner-login" onClick={closeMobileMenu}>
                <Button variant="outline" fullWidth>
                  Partner Login
                </Button>
              </Link>
              <Link to="/borrower-portal" onClick={closeMobileMenu}>
                <Button variant="default" fullWidth>
                  Check Eligibility
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;