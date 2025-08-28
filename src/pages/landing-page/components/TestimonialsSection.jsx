import React, { useState, useEffect } from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: `AvatarGen Studio transformed our marketing campaigns completely. We went from spending weeks on video production to creating professional avatar videos in minutes. Our engagement rates increased by 340% and our production costs dropped by 80%. The AI avatars are so realistic that our customers can't tell the difference!`,
      rating: 5,
      videoViews: "2.5M",
      campaignSuccess: "340%"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "HR Manager",
      company: "Global Dynamics Inc",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: `Our employee onboarding process was revolutionized with AI avatars. New hires love the interactive training modules, and we've seen a 95% completion rate compared to 60% with traditional methods. The consistency across all training materials is incredible, and we've saved thousands in production costs.`,
      rating: 5,
      videoViews: "850K",
      campaignSuccess: "95%"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Content Creator",
      company: "Creative Studios",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: `As a freelance content creator, AvatarGen Studio has been a game-changer. I can now offer my clients professional avatar videos without the overhead of hiring actors or renting studios. My client base has tripled, and I'm delivering projects 10x faster than before. The ROI is incredible!`,
      rating: 5,
      videoViews: "1.2M",
      campaignSuccess: "300%"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Sales Director",
      company: "Enterprise Solutions",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: `Our sales presentations have never been more engaging. The AI avatars deliver our pitch perfectly every time, and we can customize them for different markets and languages. Our conversion rates improved by 250%, and our sales team loves how easy it is to create personalized content.`,
      rating: 5,
      videoViews: "3.1M",
      campaignSuccess: "250%"
    }
  ];

  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: "Users" },
    { label: "Videos Created", value: "500K+", icon: "Video" },
    { label: "Time Saved", value: "2M+ Hours", icon: "Clock" },
    { label: "Success Rate", value: "98%", icon: "TrendingUp" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-muted/30 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
            <Icon name="MessageSquare" size={16} className="mr-2" />
            Customer Success Stories
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent"> 10,000+ </span>
            Creators Worldwide
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how businesses and creators are transforming their content strategy with AI-powered avatar videos. 
            Real results from real customers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-xl shadow-card hover:shadow-floating transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-floating p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Icon name="Quote" size={32} className="text-primary" />
              </div>

              {/* Testimonial Content */}
              <div className="mb-8">
                <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-6">
                  "{testimonials?.[currentTestimonial]?.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon key={star} name="Star" size={20} className="text-warning fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">5.0 out of 5</span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={16} className="text-primary" />
                    <span className="text-sm font-medium">{testimonials?.[currentTestimonial]?.videoViews} video views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="text-sm font-medium">{testimonials?.[currentTestimonial]?.campaignSuccess} improvement</span>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonials?.[currentTestimonial]?.avatar}
                      alt={testimonials?.[currentTestimonial]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-lg">
                      {testimonials?.[currentTestimonial]?.name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials?.[currentTestimonial]?.role}
                    </div>
                    <div className="text-primary font-medium">
                      {testimonials?.[currentTestimonial]?.company}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial 
                    ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Microsoft', 'Google', 'Amazon', 'Meta', 'Apple', 'Netflix']?.map((company) => (
              <div key={company} className="text-lg font-semibold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;