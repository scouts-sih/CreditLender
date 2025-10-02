import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customItems = null }) => {
  const location = useLocation();
  
  const getDefaultBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [
      { label: 'Dashboard', path: '/admin-dashboard', icon: 'Home' }
    ];

    // Map path segments to readable labels
    const pathMap = {
      'admin-dashboard': { label: 'Dashboard', path: '/admin-dashboard' },
      'beneficiary-detail-view': { label: 'Beneficiaries', path: '/beneficiary-detail-view' },
      'reports': { label: 'Reports', path: '/reports' },
      'settings': { label: 'Settings', path: '/settings' },
      'export': { label: 'Export', path: '/export' }
    };

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      if (pathMap?.[segment] && index > 0) {
        breadcrumbs?.push({
          label: pathMap?.[segment]?.label,
          path: currentPath
        });
      } else if (index > 0) {
        // Handle dynamic segments (like IDs)
        const isLastSegment = index === pathSegments?.length - 1;
        breadcrumbs?.push({
          label: isLastSegment ? 'Details' : segment?.charAt(0)?.toUpperCase() + segment?.slice(1),
          path: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = customItems || getDefaultBreadcrumbs();
  
  // Don't show breadcrumbs if we're on the dashboard root
  if (location?.pathname === '/admin-dashboard' && !customItems) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-text-secondary flex-shrink-0" 
            />
          )}
          
          <div className="flex items-center space-x-2 min-w-0">
            {index === 0 && item?.icon && (
              <Icon 
                name={item?.icon} 
                size={16} 
                className="text-text-secondary flex-shrink-0" 
              />
            )}
            
            {index === breadcrumbs?.length - 1 ? (
              <span className="font-medium text-text-primary truncate">
                {item?.label}
              </span>
            ) : (
              <Link
                to={item?.path}
                className="text-text-secondary hover:text-primary transition-smooth truncate"
              >
                {item?.label}
              </Link>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbTrail;