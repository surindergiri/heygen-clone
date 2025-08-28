import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TemplateLibrary = ({ onTemplateSelect, selectedTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'Grid3X3' },
    { id: 'social', name: 'Social Media', icon: 'Share2' },
    { id: 'banner', name: 'Web Banners', icon: 'Monitor' },
    { id: 'print', name: 'Print Ads', icon: 'Printer' },
    { id: 'video', name: 'Video Ads', icon: 'Video' },
    { id: 'email', name: 'Email Marketing', icon: 'Mail' }
  ];

  const adSizes = [
    { id: 'all', name: 'All Sizes', dimensions: '' },
    { id: 'square', name: 'Square', dimensions: '1080x1080' },
    { id: 'landscape', name: 'Landscape', dimensions: '1920x1080' },
    { id: 'banner', name: 'Banner', dimensions: '728x90' }
  ];

  const templates = [
    {
      id: 1,
      name: 'Modern Product Showcase',
      category: 'social',
      size: 'square',
      dimensions: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=300&fit=crop',
      isPremium: false
    },
    {
      id: 2,
      name: 'Minimalist Brand Banner',
      category: 'banner',
      size: 'landscape',
      dimensions: '1920x1080',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=169&fit=crop',
      isPremium: true
    },
    {
      id: 3,
      name: 'Dynamic Sale Promotion',
      category: 'social',
      size: 'square',
      dimensions: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=300&fit=crop',
      isPremium: false
    },
    {
      id: 4,
      name: 'Professional Service Ad',
      category: 'print',
      size: 'landscape',
      dimensions: '1920x1080',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=169&fit=crop',
      isPremium: false
    },
    {
      id: 5,
      name: 'Compact Web Banner',
      category: 'banner',
      size: 'banner',
      dimensions: '728x90',
      thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=37&fit=crop',
      isPremium: true
    },
    {
      id: 6,
      name: 'Email Newsletter Header',
      category: 'email',
      size: 'landscape',
      dimensions: '1920x1080',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=169&fit=crop',
      isPremium: false
    },
    {
      id: 7,
      name: 'Instagram Story Template',
      category: 'social',
      size: 'square',
      dimensions: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=300&fit=crop',
      isPremium: false
    },
    {
      id: 8,
      name: 'Video Ad Overlay',
      category: 'video',
      size: 'landscape',
      dimensions: '1920x1080',
      thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=169&fit=crop',
      isPremium: true
    }
  ];

  const filteredTemplates = templates?.filter(template => {
    const categoryMatch = selectedCategory === 'all' || template?.category === selectedCategory;
    const sizeMatch = selectedSize === 'all' || template?.size === selectedSize;
    return categoryMatch && sizeMatch;
  });

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Template Library</h2>
        
        {/* Category Filter */}
        <div className="mb-4">
          <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
          <div className="space-y-1">
            {categories?.map(category => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                  selectedCategory === category?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={category?.icon} size={16} className="mr-2" />
                {category?.name}
              </button>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Ad Size</label>
          <div className="space-y-1">
            {adSizes?.map(size => (
              <button
                key={size?.id}
                onClick={() => setSelectedSize(size?.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                  selectedSize === size?.id
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>{size?.name}</span>
                {size?.dimensions && (
                  <span className="text-xs opacity-70">{size?.dimensions}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredTemplates?.map(template => (
            <div
              key={template?.id}
              onClick={() => onTemplateSelect(template)}
              className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedTemplate?.id === template?.id
                  ? 'border-primary shadow-lg'
                  : 'border-border hover:border-primary/50 hover:shadow-md'
              }`}
            >
              <div className="aspect-square relative">
                <Image
                  src={template?.thumbnail}
                  alt={template?.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                
                {/* Premium Badge */}
                {template?.isPremium && (
                  <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                    <Icon name="Crown" size={12} className="inline mr-1" />
                    Pro
                  </div>
                )}

                {/* Selected Indicator */}
                {selectedTemplate?.id === template?.id && (
                  <div className="absolute top-2 left-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-2">
                <h3 className="text-xs font-medium text-foreground truncate">
                  {template?.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {template?.dimensions}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No templates found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateLibrary;