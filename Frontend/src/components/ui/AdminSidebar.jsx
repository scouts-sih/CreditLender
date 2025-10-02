import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  const isActive = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path);
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and analytics'
    },
    {
      label: 'Beneficiaries',
      path: '/beneficiary-detail-view',
      icon: 'Users',
      description: 'Manage loan applications'
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: 'FileText',
      description: 'Generate and export reports'
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      description: 'System configuration'
    }
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center px-4' : 'justify-between px-6'} py-6 border-b border-border`}>
        {(!isCollapsed || isMobile) && (
          <Link 
            to="/admin-dashboard" 
            className="flex items-center space-x-3 transition-smooth hover:opacity-80"
            onClick={isMobile ? closeMobile : undefined}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
              <Icon name="CreditCard" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-text-primary">CreditLend</span>
              <span className="text-xs font-medium text-primary">Pro Admin</span>
            </div>
          </Link>
        )}
        
        {isCollapsed && !isMobile && (
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
            <Icon name="CreditCard" size={20} color="white" />
          </div>
        )}

        {!isMobile && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted transition-smooth"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </button>
        )}

        {isMobile && (
          <button
            onClick={closeMobile}
            className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted transition-smooth"
            aria-label="Close mobile menu"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            onClick={isMobile ? closeMobile : undefined}
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-smooth group ${
              isActive(item?.path)
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-primary hover:bg-muted'
            } ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
            title={isCollapsed && !isMobile ? item?.label : ''}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              className={`flex-shrink-0 ${
                isActive(item?.path) ? 'text-primary-foreground' : ''
              }`}
            />
            {(!isCollapsed || isMobile) && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">{item?.label}</span>
                {!isCollapsed && (
                  <span className="text-xs opacity-75">{item?.description}</span>
                )}
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className={`px-4 py-4 border-t border-border ${isCollapsed && !isMobile ? 'px-2' : ''}`}>
        <div className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth cursor-pointer ${
          isCollapsed && !isMobile ? 'justify-center' : ''
        }`}>
          <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full flex-shrink-0">
            <Icon name="User" size={16} color="white" />
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-text-primary truncate">Admin User</span>
              <span className="text-xs text-text-secondary truncate">admin@creditlend.gov</span>
            </div>
          )}
        </div>
        
        {(!isCollapsed || isMobile) && (
          <div className="mt-3 space-y-2">
            <Button variant="ghost" size="sm" fullWidth className="justify-start">
              <Icon name="Settings" size={16} className="mr-2" />
              Account Settings
            </Button>
            <Button variant="ghost" size="sm" fullWidth className="justify-start text-error hover:text-error">
              <Icon name="LogOut" size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>

      {/* Government Logo */}
      <div className={`px-6 py-4 border-t border-border ${isCollapsed && !isMobile ? 'px-4' : ''}`}>
        <div className={`flex items-center space-x-2 ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
          <Icon name="Shield" size={16} className="text-text-secondary" />
          {(!isCollapsed || isMobile) && (
            <span className="text-xs text-text-secondary">Ministry of Finance</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-100 lg:flex-col bg-background border-r border-border transition-all duration-300 ${
        isCollapsed ? 'lg:w-20' : 'lg:w-80'
      }`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed bottom-6 right-6 z-300 p-4 bg-primary text-primary-foreground rounded-full shadow-modal transition-smooth hover:scale-105"
        aria-label="Open navigation menu"
      >
        <Icon name="Menu" size={24} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 z-200 bg-black bg-opacity-50 transition-opacity"
            onClick={closeMobile}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 z-300 w-80 bg-background border-r border-border transform transition-transform">
            <SidebarContent isMobile={true} />
          </aside>
        </>
      )}
    </>
  );
};

export default AdminSidebar;