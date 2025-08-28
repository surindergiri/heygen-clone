import React, { useState, useEffect, useRef } from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const MarketCarousels = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const marketingCarouselItems = [
    {
      id: 1,
      title: "Product Launch Campaign",
      description: "AI avatar presenting new product features with compelling storytelling",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=300&h=200&fit=crop",
      category: "Marketing",
      engagement: "95%"
    },
    {
      id: 2,
      title: "Brand Awareness Video",
      description: "Personalized brand message delivered by custom avatar spokesperson",
      image: "https://images.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg?w=300&h=200&fit=crop",
      category: "Ads",
      engagement: "87%"
    },
    {
      id: 3,
      title: "Social Media Content",
      description: "Engaging short-form content optimized for social platforms",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      category: "Content",
      engagement: "92%"
    },
    {
      id: 4,
      title: "Email Marketing Video",
      description: "Personalized video messages to boost email campaign performance",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=300&h=200&fit=crop",
      category: "Marketing",
      engagement: "89%"
    },
    {
      id: 5,
      title: "Influencer Collaboration",
      description: "AI-generated influencer content for authentic brand partnerships",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
      category: "Ads",
      engagement: "94%"
    }
  ];

  const hrEventCarouselItems = [
    {
      id: 1,
      title: "Employee Onboarding",
      description: "Interactive onboarding experience with AI HR representative",
      image: "https://images.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg?w=300&h=200&fit=crop",
      category: "HR",
      satisfaction: "96%"
    },
    {
      id: 2,
      title: "Virtual Event Host",
      description: "Professional AI host for corporate events and webinars",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop",
      category: "Event Marketing",
      satisfaction: "91%"
    },
    {
      id: 3,
      title: "Training Modules",
      description: "Consistent training delivery across global teams",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=300&h=200&fit=crop",
      category: "HR",
      satisfaction: "88%"
    },
    {
      id: 4,
      title: "Conference Presentation",
      description: "Dynamic conference presentations with AI-powered speakers",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      category: "Event Marketing",
      satisfaction: "93%"
    },
    {
      id: 5,
      title: "Company Announcements",
      description: "Important company updates delivered by executive avatars",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=300&h=200&fit=crop",
      category: "HR",
      satisfaction: "90%"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => observer?.disconnect();
  }, []);

  const CarouselRow = ({ items, direction = 'left', title, subtitle }) => {
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="relative overflow-hidden">
          <div 
            className={`flex gap-6 ${isVisible ? 'animate-scroll-' + direction : ''}`}
            style={{
              width: 'fit-content',
              animation: isVisible ? `scroll-${direction} 30s linear infinite` : 'none'
            }}
          >
            {/* Duplicate items for seamless loop */}
            {[...items, ...items]?.map((item, index) => (
              <div 
                key={`${item?.id}-${index}`}
                className="flex-shrink-0 w-80 bg-card rounded-xl overflow-hidden shadow-card hover:shadow-floating transition-all duration-300 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {item?.category}
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Icon name="Play" size={20} className="text-primary ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {item?.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item?.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={16} className="text-success" />
                      <span className="text-sm font-medium text-success">
                        {item?.engagement || item?.satisfaction} success rate
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-warning">
                      {[1, 2, 3, 4, 5]?.map((star) => (
                        <Icon key={star} name="Star" size={14} className="fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            <Icon name="Target" size={16} className="mr-2" />
            Industry Solutions
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tailored for Every
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"> Industry</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From marketing campaigns to HR training, our AI avatars adapt to your specific industry needs 
            with proven results across different sectors.
          </p>
        </div>

        {/* Marketing & Ads Carousel (Left to Right) */}
        <CarouselRow 
          items={marketingCarouselItems}
          direction="left"
          title="Marketing & Advertising Excellence"
          subtitle="Drive engagement and conversions with AI-powered marketing content"
        />

        {/* HR & Events Carousel (Right to Left) */}
        <CarouselRow 
          items={hrEventCarouselItems}
          direction="right"
          title="HR & Event Management Solutions"
          subtitle="Streamline communications and create memorable experiences"
        />
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default MarketCarousels;