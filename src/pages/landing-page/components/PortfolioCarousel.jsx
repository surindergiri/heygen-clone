import React, { useState, useRef, useEffect } from 'react';
import Button from 'components/ui/Button';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const PortfolioCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(null);
  const carouselRef = useRef(null);

  const portfolioItems = [
    {
      id: 1,
      title: "Corporate Training Avatar",
      description: "Professional avatar for employee onboarding and training modules",
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=400&h=300&fit=crop",
      category: "Corporate",
      duration: "2:45",
      views: "12.5K"
    },
    {
      id: 2,
      title: "Marketing Campaign Video",
      description: "Engaging avatar presentation for product launch campaign",
      thumbnail: "https://images.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg?w=400&h=300&fit=crop",
      category: "Marketing",
      duration: "1:30",
      views: "8.2K"
    },
    {
      id: 3,
      title: "Educational Content",
      description: "Interactive learning experience with AI-generated instructor",
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      category: "Education",
      duration: "5:12",
      views: "15.7K"
    },
    {
      id: 4,
      title: "Sales Presentation",
      description: "Compelling sales pitch delivered by customized avatar",
      thumbnail: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=400&h=300&fit=crop",
      category: "Sales",
      duration: "3:20",
      views: "9.8K"
    },
    {
      id: 5,
      title: "Customer Support",
      description: "24/7 customer service avatar for common inquiries",
      thumbnail: "https://images.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg?w=400&h=300&fit=crop",
      category: "Support",
      duration: "1:45",
      views: "6.3K"
    },
    {
      id: 6,
      title: "Event Announcement",
      description: "Dynamic event promotion with personalized avatar host",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      category: "Events",
      duration: "2:10",
      views: "11.4K"
    }
  ];

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4
  };

  const getItemsPerView = () => {
    if (window.innerWidth >= 1024) return itemsPerView?.desktop;
    if (window.innerWidth >= 768) return itemsPerView?.tablet;
    return itemsPerView?.mobile;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, portfolioItems?.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handlePlayVideo = (id) => {
    setIsPlaying(isPlaying === id ? null : id);
  };

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Icon name="Play" size={16} className="mr-2" />
            Portfolio Showcase
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            See What's Possible with
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> AI Avatars</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our gallery of AI-generated avatar videos across different industries and use cases. 
            Each video was created in minutes, not hours.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={carouselRef}>
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {portfolioItems?.map((item) => (
                <div 
                  key={item?.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-floating transition-all duration-300 group">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item?.thumbnail}
                        alt={item?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Play Button Overlay */}
                      <div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        onClick={() => handlePlayVideo(item?.id)}
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                          <Icon 
                            name={isPlaying === item?.id ? "Pause" : "Play"} 
                            size={24} 
                            className="text-primary ml-1" 
                          />
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                        {item?.category}
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
                        {item?.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                        {item?.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item?.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          <span>{item?.views} views</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Icon name="ThumbsUp" size={14} />
                          <span>98% liked</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 })?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;