import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const CustomizationPanel = ({ customizations, onCustomizationChange, selectedTemplate }) => {
  const [activeTab, setActiveTab] = useState('text');

  const tabs = [
    { id: 'text', name: 'Text', icon: 'Type' },
    { id: 'colors', name: 'Colors', icon: 'Palette' },
    { id: 'effects', name: 'Effects', icon: 'Sparkles' },
    { id: 'export', name: 'Export', icon: 'Download' }
  ];

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Playfair Display', label: 'Playfair Display' },
    { value: 'Oswald', label: 'Oswald' }
  ];

  const colorPresets = [
    { name: 'Primary Blue', color: '#2563EB' },
    { name: 'Success Green', color: '#10B981' },
    { name: 'Warning Orange', color: '#F59E0B' },
    { name: 'Error Red', color: '#EF4444' },
    { name: 'Purple', color: '#7C3AED' },
    { name: 'Pink', color: '#EC4899' },
    { name: 'Teal', color: '#14B8A6' },
    { name: 'Indigo', color: '#6366F1' }
  ];

  const exportFormats = [
    { value: 'png', label: 'PNG (High Quality)', description: 'Best for web and print' },
    { value: 'jpg', label: 'JPG (Compressed)', description: 'Smaller file size' },
    { value: 'pdf', label: 'PDF (Vector)', description: 'Scalable format' },
    { value: 'svg', label: 'SVG (Vector)', description: 'Web optimized' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low (Fast)' },
    { value: 'medium', label: 'Medium (Balanced)' },
    { value: 'high', label: 'High (Best Quality)' },
    { value: 'ultra', label: 'Ultra (Premium)' }
  ];

  const handleInputChange = (field, value) => {
    onCustomizationChange({
      ...customizations,
      [field]: value
    });
  };

  const handleColorSelect = (color) => {
    onCustomizationChange({
      ...customizations,
      textColor: color
    });
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Customize</h2>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} className="mr-2" />
              {tab?.name}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'text' && (
          <div className="space-y-6">
            <div>
              <Input
                label="Headline Text"
                type="text"
                placeholder="Enter your headline"
                value={customizations?.text || ''}
                onChange={(e) => handleInputChange('text', e?.target?.value)}
                description="Main text that will appear on your ad"
              />
            </div>

            <div>
              <Input
                label="Subtext"
                type="text"
                placeholder="Enter subtext (optional)"
                value={customizations?.subtext || ''}
                onChange={(e) => handleInputChange('subtext', e?.target?.value)}
                description="Secondary text below the headline"
              />
            </div>

            <div>
              <Select
                label="Font Family"
                options={fontOptions}
                value={customizations?.fontFamily || 'Inter'}
                onChange={(value) => handleInputChange('fontFamily', value)}
                description="Choose the font for your text"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Font Size
              </label>
              <input
                type="range"
                min="12"
                max="72"
                value={customizations?.fontSize || 24}
                onChange={(e) => handleInputChange('fontSize', e?.target?.value)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>12px</span>
                <span>{customizations?.fontSize || 24}px</span>
                <span>72px</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Text Alignment
              </label>
              <div className="flex space-x-2">
                {['left', 'center', 'right']?.map(align => (
                  <button
                    key={align}
                    onClick={() => handleInputChange('textAlign', align)}
                    className={`flex-1 p-2 rounded-lg border transition-colors duration-200 ${
                      customizations?.textAlign === align
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon 
                      name={align === 'left' ? 'AlignLeft' : align === 'center' ? 'AlignCenter' : 'AlignRight'} 
                      size={16} 
                      className="mx-auto"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Text Color
              </label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {colorPresets?.map(preset => (
                  <button
                    key={preset?.color}
                    onClick={() => handleColorSelect(preset?.color)}
                    className={`w-full aspect-square rounded-lg border-2 transition-all duration-200 ${
                      customizations?.textColor === preset?.color
                        ? 'border-foreground scale-110'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    style={{ backgroundColor: preset?.color }}
                    title={preset?.name}
                  />
                ))}
              </div>
              <Input
                type="color"
                label="Custom Color"
                value={customizations?.textColor || '#ffffff'}
                onChange={(e) => handleInputChange('textColor', e?.target?.value)}
              />
            </div>

            <div>
              <Input
                type="color"
                label="Background Overlay"
                value={customizations?.backgroundColor || '#000000'}
                onChange={(e) => handleInputChange('backgroundColor', e?.target?.value)}
                description="Add a colored overlay to your image"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Overlay Opacity
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={customizations?.overlayOpacity || 0}
                onChange={(e) => handleInputChange('overlayOpacity', e?.target?.value)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>{customizations?.overlayOpacity || 0}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Text Effects
              </label>
              <div className="space-y-2">
                {[
                  { id: 'shadow', name: 'Drop Shadow', icon: 'Shadow' },
                  { id: 'glow', name: 'Text Glow', icon: 'Zap' },
                  { id: 'outline', name: 'Text Outline', icon: 'Square' },
                  { id: 'gradient', name: 'Gradient Text', icon: 'Palette' }
                ]?.map(effect => (
                  <button
                    key={effect?.id}
                    onClick={() => handleInputChange('textEffect', effect?.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg border transition-colors duration-200 ${
                      customizations?.textEffect === effect?.id
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon name={effect?.icon} size={16} className="mr-3" />
                    {effect?.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Animation
              </label>
              <Select
                options={[
                  { value: 'none', label: 'No Animation' },
                  { value: 'fadeIn', label: 'Fade In' },
                  { value: 'slideUp', label: 'Slide Up' },
                  { value: 'bounce', label: 'Bounce' },
                  { value: 'pulse', label: 'Pulse' }
                ]}
                value={customizations?.animation || 'none'}
                onChange={(value) => handleInputChange('animation', value)}
                placeholder="Select animation"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Border Radius
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={customizations?.borderRadius || 0}
                onChange={(e) => handleInputChange('borderRadius', e?.target?.value)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0px</span>
                <span>{customizations?.borderRadius || 0}px</span>
                <span>50px</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-6">
            <div>
              <Select
                label="Export Format"
                options={exportFormats}
                value={customizations?.exportFormat || 'png'}
                onChange={(value) => handleInputChange('exportFormat', value)}
                description="Choose the file format for your ad"
              />
            </div>

            <div>
              <Select
                label="Quality"
                options={qualityOptions}
                value={customizations?.quality || 'high'}
                onChange={(value) => handleInputChange('quality', value)}
                description="Higher quality means larger file size"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Custom Dimensions
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Width"
                  value={customizations?.customWidth || ''}
                  onChange={(e) => handleInputChange('customWidth', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Height"
                  value={customizations?.customHeight || ''}
                  onChange={(e) => handleInputChange('customHeight', e?.target?.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to use template dimensions
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <Button variant="default" fullWidth iconName="Download" size="lg">
                Export Ad
              </Button>
              <Button variant="outline" fullWidth iconName="Share2" className="mt-2">
                Share Preview
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      {selectedTemplate && (
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" fullWidth iconName="Eye">
              Preview
            </Button>
            <Button variant="default" size="sm" fullWidth iconName="Save">
              Save Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;