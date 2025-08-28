import React from 'react';
import Select from 'components/ui/Select';
import { Checkbox } from 'components/ui/Checkbox';
import Icon from 'components/AppIcon';

const TranslationOptions = ({ 
  options, 
  onOptionsChange, 
  disabled = false 
}) => {
  const voiceOptions = [
    { value: 'neural-male-1', label: 'Neural Male Voice 1', description: 'Professional, clear tone' },
    { value: 'neural-male-2', label: 'Neural Male Voice 2', description: 'Warm, friendly tone' },
    { value: 'neural-female-1', label: 'Neural Female Voice 1', description: 'Professional, clear tone' },
    { value: 'neural-female-2', label: 'Neural Female Voice 2', description: 'Warm, friendly tone' },
    { value: 'neural-child', label: 'Neural Child Voice', description: 'Young, energetic tone' },
    { value: 'original-pitch', label: 'Match Original Pitch', description: 'Preserve original voice characteristics' }
  ];

  const speedOptions = [
    { value: '0.75', label: '0.75x (Slower)', description: 'Clearer pronunciation' },
    { value: '1.0', label: '1.0x (Normal)', description: 'Natural speaking pace' },
    { value: '1.25', label: '1.25x (Faster)', description: 'Quicker delivery' },
    { value: '1.5', label: '1.5x (Much Faster)', description: 'Rapid delivery' }
  ];

  const qualityOptions = [
    { value: 'standard', label: 'Standard Quality', description: 'Good quality, faster processing' },
    { value: 'high', label: 'High Quality', description: 'Better quality, slower processing' },
    { value: 'premium', label: 'Premium Quality', description: 'Best quality, longest processing' }
  ];

  const subtitleStyleOptions = [
    { value: 'modern', label: 'Modern', description: 'Clean, minimal design' },
    { value: 'classic', label: 'Classic', description: 'Traditional subtitle style' },
    { value: 'bold', label: 'Bold', description: 'High contrast, easy to read' },
    { value: 'elegant', label: 'Elegant', description: 'Stylish, professional look' }
  ];

  const handleOptionChange = (key, value) => {
    onOptionsChange({
      ...options,
      [key]: value
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Translation Options</h3>
        <p className="text-sm text-muted-foreground">
          Customize voice, speed, and subtitle settings
        </p>
      </div>
      <div className="space-y-6">
        {/* Voice Selection */}
        <div>
          <Select
            label="Voice Selection"
            description="Choose the voice for translated audio"
            placeholder="Select voice type..."
            options={voiceOptions}
            value={options?.voice}
            onChange={(value) => handleOptionChange('voice', value)}
            disabled={disabled}
          />
        </div>

        {/* Speed Control */}
        <div>
          <Select
            label="Playback Speed"
            description="Adjust the speaking speed"
            placeholder="Select playback speed..."
            options={speedOptions}
            value={options?.speed}
            onChange={(value) => handleOptionChange('speed', value)}
            disabled={disabled}
          />
        </div>

        {/* Audio Quality */}
        <div>
          <Select
            label="Audio Quality"
            description="Balance between quality and processing time"
            placeholder="Select audio quality..."
            options={qualityOptions}
            value={options?.quality}
            onChange={(value) => handleOptionChange('quality', value)}
            disabled={disabled}
          />
        </div>

        {/* Subtitle Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Subtitles" size={20} className="text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground">Subtitle Settings</h4>
          </div>

          <Checkbox
            label="Include Subtitles"
            description="Add translated subtitles to the video"
            checked={options?.includeSubtitles}
            onChange={(e) => handleOptionChange('includeSubtitles', e?.target?.checked)}
            disabled={disabled}
          />

          {options?.includeSubtitles && (
            <div className="ml-6 space-y-4">
              <Select
                label="Subtitle Style"
                description="Choose subtitle appearance"
                placeholder="Select subtitle style..."
                options={subtitleStyleOptions}
                value={options?.subtitleStyle}
                onChange={(value) => handleOptionChange('subtitleStyle', value)}
                disabled={disabled}
              />

              <Checkbox
                label="Show Original Subtitles"
                description="Display both original and translated subtitles"
                checked={options?.showOriginalSubtitles}
                onChange={(e) => handleOptionChange('showOriginalSubtitles', e?.target?.checked)}
                disabled={disabled}
              />
            </div>
          )}
        </div>

        {/* Advanced Options */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Settings" size={20} className="text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground">Advanced Options</h4>
          </div>

          <div className="space-y-3">
            <Checkbox
              label="Preserve Background Music"
              description="Keep original background audio while translating speech"
              checked={options?.preserveBackgroundMusic}
              onChange={(e) => handleOptionChange('preserveBackgroundMusic', e?.target?.checked)}
              disabled={disabled}
            />

            <Checkbox
              label="Auto-sync Timing"
              description="Automatically adjust timing to match original video"
              checked={options?.autoSyncTiming}
              onChange={(e) => handleOptionChange('autoSyncTiming', e?.target?.checked)}
              disabled={disabled}
            />

            <Checkbox
              label="Enhance Audio Quality"
              description="Apply noise reduction and audio enhancement"
              checked={options?.enhanceAudio}
              onChange={(e) => handleOptionChange('enhanceAudio', e?.target?.checked)}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationOptions;