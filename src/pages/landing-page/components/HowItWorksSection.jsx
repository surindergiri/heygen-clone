import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/ui/Button';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Upload Your Content",
      description: "Simply upload an image for avatar creation, product photos for ads, or videos for translation. Our AI accepts multiple formats and optimizes them automatically.",
      icon: "Upload",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      details: [
        "Drag & drop interface",
        "Multiple file formats supported",
        "Automatic quality optimization",
        "Batch upload capability"
      ]
    },
    {
      id: 2,
      title: "Customize & Configure",
      description: "Choose your avatar style, voice, language, or ad template. Our intuitive interface makes customization simple with real-time previews.",
      icon: "Settings",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=400&h=300&fit=crop",
      details: [
        "Real-time preview",
        "Voice selection",
        "Style customization",
        "Brand integration"
      ]
    },
    {
      id: 3,
      title: "AI Processing",
      description: "Our advanced AI algorithms work their magic, creating realistic avatars, compelling ads, or accurate translations in minutes, not hours.",
      icon: "Brain",
      image: "https://images.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg?w=400&h=300&fit=crop",
      details: [
        "Advanced AI algorithms",
        "Real-time processing",
        "Quality assurance",
        "Progress tracking"
      ]
    },
    {
      id: 4,
      title: "Download & Share",
      description: "Get your professional-quality video in multiple formats. Share directly to social media or download for your marketing campaigns.",
      icon: "Download",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      details: [
        "Multiple export formats",
        "HD quality output",
        "Direct social sharing",
        "Cloud storage integration"
      ]
    }
  ];

  const features = [
    {
      icon: "Clock",
      title: "10x Faster",
      description: "Create videos in minutes instead of hours"
    },
    {
      icon: "DollarSign",
      title: "90% Cost Savings",
      description: "Eliminate expensive production costs"
    },
    {
      icon: "Users",
      title: "No Team Required",
      description: "One person can create professional content"
    },
    {
      icon: "Globe",
      title: "Global Reach",
      description: "Create content in 50+ languages"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Icon name="PlayCircle" size={16} className="mr-2" />
            How It Works
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Create Professional Videos in
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> 4 Simple Steps</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process makes video creation accessible to everyone. 
            No technical expertise required – just follow these simple steps.
          </p>
        </div>

        {/* Steps Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {steps?.map((step, index) => (
            <button
              key={step?.id}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeStep === index
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card hover:bg-muted text-foreground'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activeStep === index ? 'bg-white/20' : 'bg-primary/10'
              }`}>
                <Icon 
                  name={step?.icon} 
                  size={16} 
                  className={activeStep === index ? 'text-white' : 'text-primary'} 
                />
              </div>
              <span className="font-medium hidden sm:block">
                Step {step?.id}: {step?.title}
              </span>
              <span className="font-medium sm:hidden">
                {step?.id}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Icon name={steps?.[activeStep]?.icon} size={32} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-primary font-medium mb-1">
                  Step {steps?.[activeStep]?.id} of 4
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {steps?.[activeStep]?.title}
                </h3>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground">
              {steps?.[activeStep]?.description}
            </p>

            {/* Step Details */}
            <div className="space-y-3">
              {steps?.[activeStep]?.details?.map((detail, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                  <span className="text-foreground">{detail}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="pt-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round(((activeStep + 1) / steps?.length) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((activeStep + 1) / steps?.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="aspect-video bg-background rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={steps?.[activeStep]?.image}
                  alt={steps?.[activeStep]?.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Step Badge */}
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                  Step {steps?.[activeStep]?.id}
                </div>
              </div>
              
              {/* Floating Animation */}
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
                ✨ In Progress
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-card">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Why Choose Our Process?
            </h3>
            <p className="text-muted-foreground">
              Experience the benefits of AI-powered video creation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features?.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                  <Icon name={feature?.icon} size={28} className="text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {feature?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground">
              Join thousands of creators who are already using AI to transform their content
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                variant="default" 
                size="lg"
                iconName="Rocket" 
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Start Free Trial
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg"
              iconName="Play" 
              iconPosition="left"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;