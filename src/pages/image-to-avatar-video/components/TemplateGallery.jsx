import React, { useState } from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const TemplateGallery = ({ onTemplateSelect, selectedTemplate }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const templates = [
    {
      id: 'professional-1',
      name: 'Corporate Presenter',
      category: 'professional',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      description: 'Perfect for business presentations and corporate communications',
      features: ['Professional attire', 'Office background', 'Formal gestures'],
      duration: '30-120 seconds',
      popularity: 95
    },
    {
      id: 'professional-2',
      name: 'Executive Speaker',
      category: 'professional',
      thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop',
      description: 'Ideal for executive announcements and leadership messages',
      features: ['Executive presence', 'Clean background', 'Confident posture'],
      duration: '30-180 seconds',
      popularity: 88
    },
    {
      id: 'casual-1',
      name: 'Friendly Educator',
      category: 'casual',
      thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop',
      description: 'Great for educational content and tutorials',
      features: ['Approachable style', 'Warm expressions', 'Teaching gestures'],
      duration: '60-300 seconds',
      popularity: 92
    },
    {
      id: 'casual-2',
      name: 'Content Creator',
      category: 'casual',
      thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop',
      description: 'Perfect for social media and creative content',
      features: ['Dynamic expressions', 'Trendy background', 'Engaging gestures'],
      duration: '15-120 seconds',
      popularity: 89
    },
    {
      id: 'marketing-1',
      name: 'Product Showcase',
      category: 'marketing',
      thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=200&fit=crop',
      description: 'Designed for product demonstrations and sales pitches',
      features: ['Sales-focused', 'Product highlighting', 'Persuasive gestures'],
      duration: '30-90 seconds',
      popularity: 85
    },
    {
      id: 'marketing-2',
      name: 'Brand Ambassador',
      category: 'marketing',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop',
      description: 'Perfect for brand storytelling and testimonials',
      features: ['Brand alignment', 'Authentic feel', 'Story-driven'],
      duration: '45-150 seconds',
      popularity: 91
    },
    {
      id: 'creative-1',
      name: 'Artistic Presenter',
      category: 'creative',
      thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=200&fit=crop',
      description: 'Ideal for creative projects and artistic content',
      features: ['Creative flair', 'Artistic background', 'Expressive movements'],
      duration: '30-180 seconds',
      popularity: 78
    },
    {
      id: 'creative-2',
      name: 'Innovation Speaker',
      category: 'creative',
      thumbnail: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&h=200&fit=crop',
      description: 'Great for tech talks and innovation presentations',
      features: ['Modern aesthetic', 'Tech-savvy', 'Forward-thinking'],
      duration: '60-240 seconds',
      popularity: 82
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', count: templates?.length },
    { id: 'professional', label: 'Professional', count: templates?.filter(t => t?.category === 'professional')?.length },
    { id: 'casual', label: 'Casual', count: templates?.filter(t => t?.category === 'casual')?.length },
    { id: 'marketing', label: 'Marketing', count: templates?.filter(t => t?.category === 'marketing')?.length },
    { id: 'creative', label: 'Creative', count: templates?.filter(t => t?.category === 'creative')?.length }
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates?.filter(template => template?.category === activeCategory);

  const sortedTemplates = filteredTemplates?.sort((a, b) => b?.popularity - a?.popularity);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Choose Avatar Template</h3>
        <p className="text-sm text-muted-foreground">
          Select a pre-designed template to get started quickly
        </p>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            {category?.label} ({category?.count})
          </button>
        ))}
      </div>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {sortedTemplates?.map((template) => (
          <div
            key={template?.id}
            className={`group relative bg-card border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-card ${
              selectedTemplate?.id === template?.id
                ? 'border-primary ring-2 ring-primary/20' :'border-border hover:border-primary/50'
            }`}
            onClick={() => onTemplateSelect(template)}
          >
            {/* Template Image */}
            <div className="relative h-32 overflow-hidden">
              <Image
                src={template?.thumbnail}
                alt={template?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <Icon name="Play" size={20} className="text-gray-900 ml-1" />
                </div>
              </div>

              {/* Popularity Badge */}
              {template?.popularity >= 90 && (
                <div className="absolute top-2 right-2 bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium">
                  Popular
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {template?.name}
                </h4>
                {selectedTemplate?.id === template?.id && (
                  <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {template?.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} className="mr-1" />
                  <span>{template?.duration}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {template?.features?.slice(0, 2)?.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {template?.features?.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{template?.features?.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Selected Template Info */}
      {selectedTemplate && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {selectedTemplate?.name} Selected
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {selectedTemplate?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate?.features?.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Custom Template Option */}
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
        <Icon name="Plus" size={32} className="text-muted-foreground mx-auto mb-3" />
        <h4 className="font-medium text-foreground mb-2">Create Custom Template</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Don't see what you're looking for? Create your own template from scratch
        </p>
        <Button
          variant="outline"
          size="sm"
          iconName="Wand2"
          iconPosition="left"
        >
          Start Custom Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateGallery;