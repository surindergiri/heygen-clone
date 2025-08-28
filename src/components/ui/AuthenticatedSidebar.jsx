import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';

const AuthenticatedSidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and project management'
    },
    {
      label: 'Image to Avatar Video',
      path: '/image-to-avatar-video',
      icon: 'UserCircle',
      description: 'Transform images into talking avatars'
    },
    {
      label: 'Image to Ads',
      path: '/image-to-ads',
      icon: 'Megaphone',
      description: 'Create compelling ad content from images'
    },
    {
      label: 'Video Translation',
      path: '/video-translation',
      icon: 'Languages',
      description: 'Translate videos to multiple languages'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-999 lg:flex lg:flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      } bg-card border-r border-border`}>
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo Section */}
          <div className="flex items-center h-16 px-4 border-b border-border">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Video" size={20} color="white" />
              </div>
              {!isCollapsed && (
                <span className="text-lg font-semibold text-foreground truncate">
                  AvatarGen Studio
                </span>
              )}
            </Link>
            {onToggle && (
              <button
                onClick={onToggle}
                className={`ml-auto p-1.5 rounded-lg hover:bg-muted transition-colors duration-200 ${
                  isCollapsed ? 'ml-0' : ''
                }`}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item?.label : item?.description}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`flex-shrink-0 ${
                    isActivePath(item?.path) ? 'text-primary-foreground' : ''
                  }`}
                />
                {!isCollapsed && (
                  <span className="ml-3 truncate">{item?.label}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex-shrink-0 p-4 border-t border-border">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} />
              </div>
              {!isCollapsed && (
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    john@example.com
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-1000 bg-card border-t border-border">
        <nav className="flex items-center justify-around px-2 py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={isActivePath(item?.path) ? 'text-primary' : ''}
              />
              <span className="text-xs mt-1 text-center leading-tight">
                {item?.label?.split(' ')?.slice(0, 2)?.join(' ')}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AuthenticatedSidebar;