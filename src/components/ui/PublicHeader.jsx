import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    if (location?.pathname === '/landing-page') {
      const element = document.getElementById(sectionId);
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeMobileMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/landing-page" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Video" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">AvatarGen Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Testimonials
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/register">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-1001 bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="px-4 py-6 space-y-6">
            <nav className="space-y-4">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-lg text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left text-lg text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-lg text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-lg text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Testimonials
              </button>
            </nav>
            
            <div className="pt-6 border-t border-border space-y-4">
              <Link to="/register" onClick={closeMobileMenu}>
                <Button variant="ghost" fullWidth>
                  Sign In
                </Button>
              </Link>
              <Link to="/register" onClick={closeMobileMenu}>
                <Button variant="default" fullWidth>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;