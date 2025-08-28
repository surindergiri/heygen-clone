import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from 'components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import PortfolioCarousel from './components/PortfolioCarousel';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import MarketCarousels from './components/MarketCarousels';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      const href = e?.target?.getAttribute('href');
      if (href && href?.startsWith('#')) {
        e?.preventDefault();
        const element = document.getElementById(href?.substring(1));
        if (element) {
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>AvatarGen Studio - Transform Images into AI Avatar Videos</title>
        <meta 
          name="description" 
          content="Create professional avatar videos, compelling advertisements, and multilingual content in minutes with AI. No technical skills required. Start free today!" 
        />
        <meta name="keywords" content="AI avatar, video generation, image to video, video translation, AI ads, content creation" />
        <meta property="og:title" content="AvatarGen Studio - AI-Powered Video Generation Platform" />
        <meta property="og:description" content="Transform your ideas into stunning videos with AI avatars, automated ads, and video translation." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <PublicHeader />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Portfolio Showcase */}
          <PortfolioCarousel />

          {/* Features Section */}
          <FeaturesSection />

          {/* How It Works */}
          <HowItWorksSection />

          {/* Market-Specific Carousels */}
          <MarketCarousels />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Pricing */}
          <PricingSection />

          {/* Final CTA */}
          <CTASection />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="text-lg font-semibold text-foreground">AvatarGen Studio</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Democratizing professional video content creation with AI-powered tools for creators worldwide.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Features</a></li>
                  <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Pricing</a></li>
                  <li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">How It Works</a></li>
                  <li><a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Testimonials</a></li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">About Us</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Press</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Contact</a></li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Help Center</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">API Documentation</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} AvatarGen Studio. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <span className="text-xs text-muted-foreground">Made with ❤️ for creators worldwide</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;