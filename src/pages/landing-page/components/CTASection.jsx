import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/ui/Button';

import Icon from 'components/AppIcon';

const CTASection = () => {
  const benefits = [
    {
      icon: "Clock",
      title: "Save 90% Time",
      description: "Create videos in minutes, not days"
    },
    {
      icon: "DollarSign",
      title: "Reduce Costs",
      description: "No expensive equipment or teams needed"
    },
    {
      icon: "TrendingUp",
      title: "Boost Engagement",
      description: "AI videos get 3x more engagement"
    },
    {
      icon: "Globe",
      title: "Global Reach",
      description: "Create content in 50+ languages"
    }
  ];

  const testimonialHighlights = [
    {
      quote: "Increased our conversion rate by 340%",
      author: "Sarah Johnson, Marketing Director"
    },
    {
      quote: "Saved us $50,000 in production costs",
      author: "Michael Chen, HR Manager"
    },
    {
      quote: "Generated 2.5M video views in first month",
      author: "Emily Rodriguez, Content Creator"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Icon name="Rocket" size={16} className="mr-2" />
            Ready to Transform Your Content?
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Join 10,000+ Creators Using
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> AI Video Magic</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start creating professional avatar videos, compelling ads, and multilingual content today. 
            No credit card required for your free account.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button 
                variant="default" 
                size="xl"
                iconName="Play" 
                iconPosition="left"
                className="w-full sm:w-auto text-lg px-8 py-4"
              >
                Start Creating Free
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="xl"
              iconName="Video" 
              iconPosition="left"
              className="w-full sm:w-auto text-lg px-8 py-4"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CreditCard" size={16} className="text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-success" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits?.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <Icon name={benefit?.icon} size={28} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {benefit?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Social Proof Section */}
        <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/50">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-muted-foreground">
              See what our customers are saying about their results
            </p>
          </div>

          {/* Testimonial Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonialHighlights?.map((testimonial, index) => (
              <div key={index} className="text-center p-6 bg-background/50 rounded-xl border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Quote" size={20} className="text-primary" />
                </div>
                <blockquote className="text-foreground font-medium mb-3">
                  "{testimonial?.quote}"
                </blockquote>
                <cite className="text-sm text-muted-foreground">
                  {testimonial?.author}
                </cite>
              </div>
            ))}
          </div>

          {/* Company Logos */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by teams at leading companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Microsoft', 'Google', 'Amazon', 'Meta', 'Apple', 'Netflix']?.map((company) => (
                <div key={company} className="text-lg font-semibold text-muted-foreground">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Create Your First AI Video?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using AI to transform their content strategy. 
              Start your free account today and see the magic happen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="secondary" 
                  size="lg"
                  iconName="ArrowRight" 
                  iconPosition="right"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
                >
                  Get Started Now
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="lg"
                iconName="Play" 
                iconPosition="left"
                className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See It In Action
              </Button>
            </div>

            {/* Urgency Element */}
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
              <Icon name="Clock" size={16} />
              <span>Limited time: Free plan includes premium features</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;