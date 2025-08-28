import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';

const Breadcrumbs = () => {
  const location = useLocation();
  
  const pathMap = {
    '/dashboard': 'Dashboard',
    '/image-to-avatar-video': 'Image to Avatar Video',
    '/image-to-ads': 'Image to Ads',
    '/video-translation': 'Video Translation'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard for authenticated routes
    if (location?.pathname !== '/dashboard' && pathMap?.[location?.pathname]) {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        isActive: false
      });
    }

    // Add current page
    const currentPath = location?.pathname;
    if (pathMap?.[currentPath]) {
      breadcrumbs?.push({
        label: pathMap?.[currentPath],
        path: currentPath,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground/60" 
              />
            )}
            {breadcrumb?.isActive ? (
              <span className="font-medium text-foreground truncate max-w-xs sm:max-w-none">
                {breadcrumb?.label}
              </span>
            ) : (
              <Link
                to={breadcrumb?.path}
                className="hover:text-foreground transition-colors duration-200 truncate max-w-xs sm:max-w-none"
              >
                {breadcrumb?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;