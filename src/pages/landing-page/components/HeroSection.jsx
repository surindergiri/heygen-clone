import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/ui/Button';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Icon name="Sparkles" size={16} className="mr-2" />
                AI-Powered Video Generation
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Your
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Ideas </span>
                Into Stunning Videos
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Create professional avatar videos, compelling advertisements, and multilingual content in minutes. 
                No technical skills required – just upload, customize, and generate.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register">
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="Play" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Start Creating Free
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                iconName="Video" 
                iconPosition="left"
                className="w-full sm:w-auto"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4]?.map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background"></div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">10,000+ creators trust us</span>
              </div>
              
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5]?.map((i) => (
                  <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Video */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="aspect-video bg-background rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop"
                  alt="AI Avatar Video Generation Demo"
                  className="w-full h-full object-cover"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-300 cursor-pointer group">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Play" size={32} className="text-primary ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                ✨ AI Generated
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm font-medium">Generated in 2 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;