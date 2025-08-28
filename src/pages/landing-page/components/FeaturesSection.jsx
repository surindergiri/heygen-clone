import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/ui/Button';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Image to Avatar Video",
      description: "Transform any photo into a talking avatar with realistic lip-sync and natural expressions. Perfect for personalized marketing, training content, and social media.",
      icon: "UserCircle",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      benefits: [
        "Realistic lip-sync technology",
        "Natural facial expressions",
        "Multiple voice options",
        "HD video output"
      ],
      route: "/image-to-avatar-video",
      color: "primary"
    },
    {
      id: 2,
      title: "Image to Ads",
      description: "Create compelling advertisements from any image with AI-powered copywriting and professional templates. Generate multiple ad variations in seconds.",
      icon: "Megaphone",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=500&h=300&fit=crop",
      benefits: [
        "Professional ad templates",
        "AI-powered copywriting",
        "Multiple size formats",
        "Brand customization"
      ],
      route: "/image-to-ads",
      color: "secondary"
    },
    {
      id: 3,
      title: "Video Translation",
      description: "Translate your videos into 50+ languages while preserving the original voice tone and timing. Expand your global reach effortlessly.",
      icon: "Languages",
      image: "https://images.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg?w=500&h=300&fit=crop",
      benefits: [
        "50+ supported languages",
        "Voice tone preservation",
        "Accurate subtitles",
        "Cultural adaptation"
      ],
      route: "/video-translation",
      color: "accent"
    }
  ];

  const additionalFeatures = [
    {
      icon: "Zap",
      title: "Lightning Fast",
      description: "Generate professional videos in minutes, not hours"
    },
    {
      icon: "Shield",
      title: "Enterprise Security",
      description: "Bank-level encryption and data protection"
    },
    {
      icon: "Palette",
      title: "Full Customization",
      description: "Brand colors, fonts, and styling options"
    },
    {
      icon: "Download",
      title: "Multiple Formats",
      description: "Export in MP4, MOV, GIF, and more"
    },
    {
      icon: "Users",
      title: "Team Collaboration",
      description: "Share projects and collaborate in real-time"
    },
    {
      icon: "BarChart3",
      title: "Analytics Dashboard",
      description: "Track performance and engagement metrics"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            <Icon name="Sparkles" size={16} className="mr-2" />
            Powerful Features
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Create
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"> Amazing Videos</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools makes professional video creation accessible to everyone. 
            No technical skills required – just upload, customize, and generate.
          </p>
        </div>

        {/* Main Features */}
        <div className="space-y-20 mb-20">
          {features?.map((feature, index) => (
            <div key={feature?.id} className={`grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className={`w-16 h-16 bg-${feature?.color}/10 rounded-2xl flex items-center justify-center`}>
                  <Icon name={feature?.icon} size={32} className={`text-${feature?.color}`} />
                </div>
                
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {feature?.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {feature?.description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {feature?.benefits?.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3">
                      <div className={`w-5 h-5 bg-${feature?.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Icon name="Check" size={12} color="white" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link to={feature?.route}>
                    <Button 
                      variant="default" 
                      size="lg"
                      iconName="ArrowRight" 
                      iconPosition="right"
                      className="w-full sm:w-auto"
                    >
                      Try {feature?.title}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="aspect-video bg-background rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={feature?.image}
                      alt={feature?.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Feature Badge */}
                    <div className="absolute top-4 left-4 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Icon name={feature?.icon} size={16} className={`text-${feature?.color}`} />
                        <span className="text-sm font-medium">{feature?.title}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className={`absolute -top-4 -right-4 bg-${feature?.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}>
                    ✨ AI Powered
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="bg-muted/30 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Plus Many More Features
            </h3>
            <p className="text-muted-foreground">
              Discover all the tools and capabilities that make AvatarGen Studio the complete solution
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures?.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                  <Icon name={feature?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
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
          <Link to="/register">
            <Button 
              variant="default" 
              size="xl"
              iconName="Rocket" 
              iconPosition="left"
            >
              Start Creating Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;