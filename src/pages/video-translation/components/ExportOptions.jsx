import React from 'react';
import Select from 'components/ui/Select';
import { Checkbox } from 'components/ui/Checkbox';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const ExportOptions = ({ 
  exportSettings, 
  onExportSettingsChange, 
  onExport, 
  isExporting = false,
  disabled = false 
}) => {
  const formatOptions = [
    { value: 'mp4', label: 'MP4', description: 'Most compatible format' },
    { value: 'mov', label: 'MOV', description: 'High quality Apple format' },
    { value: 'avi', label: 'AVI', description: 'Windows compatible format' },
    { value: 'mkv', label: 'MKV', description: 'Open source format' }
  ];

  const qualityOptions = [
    { value: '720p', label: '720p HD', description: 'Good quality, smaller file size' },
    { value: '1080p', label: '1080p Full HD', description: 'High quality, balanced size' },
    { value: '1440p', label: '1440p 2K', description: 'Very high quality, larger file' },
    { value: '2160p', label: '2160p 4K', description: 'Ultra high quality, largest file' }
  ];

  const bitrateOptions = [
    { value: 'auto', label: 'Auto', description: 'Optimized for quality and size' },
    { value: '2000', label: '2 Mbps', description: 'Standard quality' },
    { value: '5000', label: '5 Mbps', description: 'High quality' },
    { value: '10000', label: '10 Mbps', description: 'Very high quality' },
    { value: '20000', label: '20 Mbps', description: 'Maximum quality' }
  ];

  const handleSettingChange = (key, value) => {
    onExportSettingsChange({
      ...exportSettings,
      [key]: value
    });
  };

  const getEstimatedFileSize = () => {
    const baseSize = 50; // Base size in MB
    const qualityMultiplier = {
      '720p': 1,
      '1080p': 2.2,
      '1440p': 4,
      '2160p': 8
    };
    const bitrateMultiplier = exportSettings?.bitrate === 'auto' ? 1 : 
      parseInt(exportSettings?.bitrate) / 5000;
    
    return Math.round(baseSize * qualityMultiplier?.[exportSettings?.quality] * bitrateMultiplier);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Export Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure output format and quality settings
        </p>
      </div>
      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <Select
            label="Output Format"
            description="Choose the video file format"
            placeholder="Select format..."
            options={formatOptions}
            value={exportSettings?.format}
            onChange={(value) => handleSettingChange('format', value)}
            disabled={disabled}
          />
        </div>

        {/* Quality Selection */}
        <div>
          <Select
            label="Video Quality"
            description="Higher quality means larger file size"
            placeholder="Select quality..."
            options={qualityOptions}
            value={exportSettings?.quality}
            onChange={(value) => handleSettingChange('quality', value)}
            disabled={disabled}
          />
        </div>

        {/* Bitrate Selection */}
        <div>
          <Select
            label="Bitrate"
            description="Controls video compression and quality"
            placeholder="Select bitrate..."
            options={bitrateOptions}
            value={exportSettings?.bitrate}
            onChange={(value) => handleSettingChange('bitrate', value)}
            disabled={disabled}
          />
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground">Additional Options</h4>
          </div>

          <div className="space-y-3 ml-6">
            <Checkbox
              label="Include Original Audio Track"
              description="Keep the original audio alongside translated audio"
              checked={exportSettings?.includeOriginalAudio}
              onChange={(e) => handleSettingChange('includeOriginalAudio', e?.target?.checked)}
              disabled={disabled}
            />

            <Checkbox
              label="Embed Subtitles"
              description="Burn subtitles directly into the video"
              checked={exportSettings?.embedSubtitles}
              onChange={(e) => handleSettingChange('embedSubtitles', e?.target?.checked)}
              disabled={disabled}
            />

            <Checkbox
              label="Generate Separate Subtitle File"
              description="Create a separate .srt file for subtitles"
              checked={exportSettings?.separateSubtitles}
              onChange={(e) => handleSettingChange('separateSubtitles', e?.target?.checked)}
              disabled={disabled}
            />

            <Checkbox
              label="Optimize for Web"
              description="Compress for faster web streaming"
              checked={exportSettings?.optimizeForWeb}
              onChange={(e) => handleSettingChange('optimizeForWeb', e?.target?.checked)}
              disabled={disabled}
            />
          </div>
        </div>

        {/* File Size Estimate */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="HardDrive" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Estimated file size:</span>
            </div>
            <span className="font-medium text-foreground">{getEstimatedFileSize()} MB</span>
          </div>
        </div>

        {/* Export Button */}
        <div className="pt-4">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onExport}
            disabled={disabled || isExporting}
            loading={isExporting}
          >
            {isExporting ? (
              <>
                <Icon name="Download" size={20} className="mr-2" />
                Exporting Video...
              </>
            ) : (
              <>
                <Icon name="Download" size={20} className="mr-2" />
                Export Translated Video
              </>
            )}
          </Button>
        </div>

        {/* Export Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">
                <strong>Export time:</strong> Typically 1-3 minutes depending on video length and quality settings.
              </p>
              <p>
                <strong>File delivery:</strong> Download link will be available immediately after processing completes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;