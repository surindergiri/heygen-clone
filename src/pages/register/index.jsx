import React from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from 'components/ui/PublicHeader';
import RegistrationForm from './components/RegistrationForm';
import SocialSignup from './components/SocialSignup';
import FeatureHighlights from './components/FeatureHighlights';
import Icon from '../../components/AppIcon';


const Register = () => {
  return (
    <>
      <Helmet>
        <title>Create Account - AvatarGen Studio | AI Video Generation Platform</title>
        <meta 
          name="description" 
          content="Join AvatarGen Studio and start creating AI-powered avatar videos, advertisements, and video translations. Sign up for free and transform your content today." 
        />
        <meta name="keywords" content="AI video generation, avatar videos, video translation, ad creation, sign up, register" />
        <meta property="og:title" content="Create Account - AvatarGen Studio" />
        <meta property="og:description" content="Join thousands of creators using AI to transform their content. Create avatar videos, ads, and translate videos with ease." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/register" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <PublicHeader />
        
        <main className="pt-16">
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-8 lg:space-y-0 lg:space-x-12">
                
                {/* Left Side - Feature Highlights (Desktop Only) */}
                <div className="hidden lg:block flex-1">
                  <FeatureHighlights />
                </div>

                {/* Right Side - Registration Form */}
                <div className="w-full lg:flex-1 max-w-md lg:max-w-lg">
                  <div className="space-y-8">
                    {/* Social Signup Options */}
                    <SocialSignup />
                    
                    {/* Registration Form */}
                    <RegistrationForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Feature Highlights */}
        <section className="lg:hidden px-4 sm:px-6 py-12 bg-muted/30">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Why choose AvatarGen Studio?
              </h2>
              <p className="text-sm text-muted-foreground">
                Join thousands of creators transforming their content with AI
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="UserCircle" size={16} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground">AI Avatar Videos</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Transform images into talking avatars
                </p>
              </div>

              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Megaphone" size={16} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground">Smart Ad Creation</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Generate compelling advertisements
                </p>
              </div>

              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Languages" size={16} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground">Video Translation</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Translate to multiple languages
                </p>
              </div>

              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground">Lightning Fast</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Process videos in minutes
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={16} />
                  <span>50K+ Users</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span>4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} AvatarGen Studio. All rights reserved.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="/support" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;