import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import Input from 'components/ui/Input';
import { Checkbox } from 'components/ui/Checkbox';

const AvatarCustomization = ({ settings, onSettingsChange }) => {
  const [activeTab, setActiveTab] = useState('animation');

  const animationStyles = [
    { value: 'natural', label: 'Natural Movement', description: 'Subtle, realistic animations' },
    { value: 'expressive', label: 'Expressive', description: 'Dynamic facial expressions' },
    { value: 'professional', label: 'Professional', description: 'Corporate-friendly style' },
    { value: 'casual', label: 'Casual', description: 'Relaxed, friendly demeanor' },
    { value: 'energetic', label: 'Energetic', description: 'High-energy presentation' }
  ];

  const voiceOptions = [
    { value: 'female-1', label: 'Sarah (Female)', description: 'Professional, clear voice' },
    { value: 'male-1', label: 'David (Male)', description: 'Deep, authoritative voice' },
    { value: 'female-2', label: 'Emma (Female)', description: 'Warm, friendly voice' },
    { value: 'male-2', label: 'James (Male)', description: 'Casual, approachable voice' },
    { value: 'custom', label: 'Upload Custom Voice', description: 'Use your own voice recording' }
  ];

  const backgroundOptions = [
    { value: 'transparent', label: 'Transparent', description: 'No background' },
    { value: 'white', label: 'White', description: 'Clean white background' },
    { value: 'gradient-1', label: 'Blue Gradient', description: 'Professional blue gradient' },
    { value: 'gradient-2', label: 'Purple Gradient', description: 'Creative purple gradient' },
    { value: 'office', label: 'Office Setting', description: 'Professional office background' },
    { value: 'studio', label: 'Studio', description: 'Clean studio environment' }
  ];

  const qualityOptions = [
    { value: 'hd', label: 'HD (720p)', description: 'Standard quality, smaller file size' },
    { value: 'fhd', label: 'Full HD (1080p)', description: 'High quality, recommended' },
    { value: '4k', label: '4K (2160p)', description: 'Ultra high quality, large file size' }
  ];

  const tabs = [
    { id: 'animation', label: 'Animation', icon: 'Play' },
    { id: 'voice', label: 'Voice', icon: 'Mic' },
    { id: 'background', label: 'Background', icon: 'Image' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Customize Your Avatar</h3>
        <p className="text-sm text-muted-foreground">
          Fine-tune animation style, voice, and appearance
        </p>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'animation' && (
          <div className="space-y-4">
            <Select
              label="Animation Style"
              description="Choose how your avatar will move and express"
              options={animationStyles}
              value={settings?.animationStyle}
              onChange={(value) => handleSettingChange('animationStyle', value)}
            />
            
            <Input
              label="Animation Duration (seconds)"
              type="number"
              min="5"
              max="300"
              value={settings?.duration}
              onChange={(e) => handleSettingChange('duration', e?.target?.value)}
              description="Length of the generated video"
            />

            <div className="space-y-3">
              <Checkbox
                label="Enable Eye Tracking"
                description="Avatar will follow camera movement"
                checked={settings?.eyeTracking}
                onChange={(e) => handleSettingChange('eyeTracking', e?.target?.checked)}
              />
              
              <Checkbox
                label="Add Subtle Head Movement"
                description="Natural head gestures during speech"
                checked={settings?.headMovement}
                onChange={(e) => handleSettingChange('headMovement', e?.target?.checked)}
              />
              
              <Checkbox
                label="Lip Sync Optimization"
                description="Enhanced mouth movement accuracy"
                checked={settings?.lipSync}
                onChange={(e) => handleSettingChange('lipSync', e?.target?.checked)}
              />
            </div>
          </div>
        )}

        {activeTab === 'voice' && (
          <div className="space-y-4">
            <Select
              label="Voice Selection"
              description="Choose a voice for your avatar"
              options={voiceOptions}
              value={settings?.voice}
              onChange={(value) => handleSettingChange('voice', value)}
            />

            <Input
              label="Script Text"
              type="textarea"
              placeholder="Enter the text your avatar will speak..."
              value={settings?.scriptText}
              onChange={(e) => handleSettingChange('scriptText', e?.target?.value)}
              description="Maximum 500 characters"
              className="min-h-24"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Speech Speed"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings?.speechSpeed}
                onChange={(e) => handleSettingChange('speechSpeed', e?.target?.value)}
                description={`${settings?.speechSpeed}x speed`}
              />
              
              <Input
                label="Voice Pitch"
                type="range"
                min="-10"
                max="10"
                step="1"
                value={settings?.voicePitch}
                onChange={(e) => handleSettingChange('voicePitch', e?.target?.value)}
                description={settings?.voicePitch > 0 ? `+${settings?.voicePitch}` : settings?.voicePitch}
              />
            </div>

            {settings?.voice === 'custom' && (
              <div className="bg-muted/50 rounded-lg p-4">
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  fullWidth
                >
                  Upload Voice Recording
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Supported formats: MP3, WAV • Max duration: 5 minutes
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'background' && (
          <div className="space-y-4">
            <Select
              label="Background Style"
              description="Choose background for your avatar video"
              options={backgroundOptions}
              value={settings?.background}
              onChange={(value) => handleSettingChange('background', value)}
            />

            {settings?.background?.includes('gradient') && (
              <div className="space-y-3">
                <Input
                  label="Gradient Intensity"
                  type="range"
                  min="0"
                  max="100"
                  value={settings?.gradientIntensity}
                  onChange={(e) => handleSettingChange('gradientIntensity', e?.target?.value)}
                  description={`${settings?.gradientIntensity}% intensity`}
                />
              </div>
            )}

            <div className="space-y-3">
              <Checkbox
                label="Add Subtle Animation"
                description="Gentle background movement"
                checked={settings?.backgroundAnimation}
                onChange={(e) => handleSettingChange('backgroundAnimation', e?.target?.checked)}
              />
              
              <Checkbox
                label="Blur Background Edges"
                description="Soft focus around avatar"
                checked={settings?.backgroundBlur}
                onChange={(e) => handleSettingChange('backgroundBlur', e?.target?.checked)}
              />
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-4">
            <Select
              label="Video Quality"
              description="Choose output resolution and quality"
              options={qualityOptions}
              value={settings?.quality}
              onChange={(value) => handleSettingChange('quality', value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Frame Rate (FPS)"
                type="select"
                value={settings?.frameRate}
                onChange={(e) => handleSettingChange('frameRate', e?.target?.value)}
              >
                <option value="24">24 FPS (Cinematic)</option>
                <option value="30">30 FPS (Standard)</option>
                <option value="60">60 FPS (Smooth)</option>
              </Input>
              
              <Input
                label="Video Format"
                type="select"
                value={settings?.format}
                onChange={(e) => handleSettingChange('format', e?.target?.value)}
              >
                <option value="mp4">MP4 (Recommended)</option>
                <option value="mov">MOV (Apple)</option>
                <option value="webm">WebM (Web)</option>
              </Input>
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Include Watermark"
                description="Add AvatarGen Studio branding"
                checked={settings?.watermark}
                onChange={(e) => handleSettingChange('watermark', e?.target?.checked)}
              />
              
              <Checkbox
                label="Generate Thumbnail"
                description="Create preview image automatically"
                checked={settings?.generateThumbnail}
                onChange={(e) => handleSettingChange('generateThumbnail', e?.target?.checked)}
              />
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Zap" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Estimated Processing Time</p>
                  <p className="text-muted-foreground">
                    {settings?.quality === '4k' ? '15-20 minutes' : 
                     settings?.quality === 'fhd' ? '8-12 minutes' : '5-8 minutes'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarCustomization;