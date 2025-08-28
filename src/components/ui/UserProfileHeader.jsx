import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const UserProfileHeader = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const profileMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: 'Video processing complete',
      message: 'Your avatar video is ready for download',
      time: '2 minutes ago',
      isRead: false,
      type: 'success'
    },
    {
      id: 2,
      title: 'Translation in progress',
      message: 'Your video is being translated to Spanish',
      time: '15 minutes ago',
      isRead: false,
      type: 'info'
    },
    {
      id: 3,
      title: 'Ad campaign created',
      message: 'Your image-to-ads project has been generated',
      time: '1 hour ago',
      isRead: true,
      type: 'success'
    }
  ];

  const unreadCount = notifications?.filter(n => !n?.isRead)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef?.current && !profileMenuRef?.current?.contains(event?.target)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationsRef?.current && !notificationsRef?.current?.contains(event?.target)) {
        setIsNotificationsOpen(false);
      }
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsNotificationsOpen(false);
    setIsSearchOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsProfileMenuOpen(false);
    setIsNotificationsOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-1000 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center lg:hidden">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
            <Icon name="Video" size={20} color="white" />
          </div>
          <span className="text-lg font-semibold text-foreground">AvatarGen Studio</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block" ref={searchRef}>
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search projects, templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-10 pr-4"
                autoFocus
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </form>
          ) : (
            <button
              onClick={toggleSearch}
              className="w-full flex items-center px-3 py-2 text-sm text-muted-foreground bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
            >
              <Icon name="Search" size={18} className="mr-2" />
              <span>Search projects, templates...</span>
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search */}
          <button
            onClick={toggleSearch}
            className="sm:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Search"
          >
            <Icon name="Search" size={20} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={toggleNotifications}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              aria-label="Notifications"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal animate-slide-down">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors duration-200 ${
                        !notification?.isRead ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification?.type === 'success' ? 'bg-success' :
                          notification?.type === 'info' ? 'bg-primary' : 'bg-warning'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {notification?.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" fullWidth>
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-muted transition-colors duration-200"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <Icon name="ChevronDown" size={16} className="hidden sm:block" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal animate-slide-down">
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
                <div className="py-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="Settings" size={16} className="mr-3" />
                    Settings
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="CreditCard" size={16} className="mr-3" />
                    Billing
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </Link>
                </div>
                <div className="py-2 border-t border-border">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200">
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-4 animate-slide-down" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search projects, templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default UserProfileHeader;