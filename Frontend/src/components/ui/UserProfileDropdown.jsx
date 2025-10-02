import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileDropdown = ({ user = null, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const defaultUser = {
    name: 'Admin User',
    email: 'admin@creditlend.gov',
    role: 'System Administrator',
    avatar: null
  };

  const currentUser = user || defaultUser;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    closeDropdown();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event?.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen]);

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'User',
      path: '/profile',
      description: 'Manage your account'
    },
    {
      label: 'Preferences',
      icon: 'Settings',
      path: '/preferences',
      description: 'App settings and preferences'
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      path: '/help',
      description: 'Get help and documentation'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User profile menu"
      >
        <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full flex-shrink-0">
          {currentUser?.avatar ? (
            <img 
              src={currentUser?.avatar} 
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="white" />
          )}
        </div>
        
        <div className="hidden md:flex flex-col items-start min-w-0">
          <span className="text-sm font-medium text-text-primary truncate">
            {currentUser?.name}
          </span>
          <span className="text-xs text-text-secondary truncate">
            {currentUser?.role}
          </span>
        </div>
        
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-modal z-200 animate-slide-up">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full flex-shrink-0">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser?.avatar} 
                    alt={currentUser?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} color="white" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-popover-foreground truncate">
                  {currentUser?.name}
                </span>
                <span className="text-xs text-text-secondary truncate">
                  {currentUser?.email}
                </span>
                <span className="text-xs text-primary font-medium">
                  {currentUser?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeDropdown}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-muted transition-smooth"
              >
                <Icon name={item?.icon} size={16} className="text-text-secondary" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-popover-foreground">
                    {item?.label}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {item?.description}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Logout Section */}
          <div className="border-t border-border p-2">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={handleLogout}
              className="justify-start text-error hover:text-error hover:bg-error/10"
            >
              <Icon name="LogOut" size={16} className="mr-3" />
              Sign Out
            </Button>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border bg-muted/50">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Shield" size={14} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">
                Ministry of Finance - Secure Portal
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;