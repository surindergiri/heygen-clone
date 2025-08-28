import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

const AdPreview = ({ selectedTemplate, uploadedImage, customizations, onImageUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    if (imageFiles?.length > 0) {
      handleFileUpload(imageFiles?.[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            const reader = new FileReader();
            reader.onload = (e) => {
              onImageUpload(e?.target?.result);
            };
            reader?.readAsDataURL(file);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Ad Preview</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RotateCcw">
              Reset
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Preview Area */}
      <div className="flex-1 p-6 flex items-center justify-center">
        {!selectedTemplate ? (
          <div className="text-center">
            <Icon name="Image" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Select a Template</h3>
            <p className="text-muted-foreground">
              Choose a template from the library to start creating your ad
            </p>
          </div>
        ) : (
          <div className="relative max-w-full max-h-full">
            {/* Template Preview Container */}
            <div 
              className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                selectedTemplate?.size === 'square' ? 'aspect-square w-80' :
                selectedTemplate?.size === 'landscape'? 'aspect-video w-96' : 'w-96 h-24'
              }`}
            >
              {/* Background Template */}
              <Image
                src={selectedTemplate?.thumbnail}
                alt={selectedTemplate?.name}
                className="w-full h-full object-cover"
              />

              {/* Uploaded Image Overlay */}
              {uploadedImage && (
                <div className="absolute inset-4 rounded-lg overflow-hidden border-2 border-white/50">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded content"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Text Overlays */}
              {customizations?.text && (
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ 
                    color: customizations?.textColor || '#ffffff',
                    fontSize: customizations?.fontSize || '24px',
                    fontFamily: customizations?.fontFamily || 'Inter'
                  }}
                >
                  <div className="text-center px-4">
                    <h2 className="font-bold drop-shadow-lg">
                      {customizations?.text}
                    </h2>
                  </div>
                </div>
              )}

              {/* Processing Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-2" />
                    <p className="text-sm">Processing your ad...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="mt-4 text-center">
              <h3 className="font-medium text-foreground">{selectedTemplate?.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedTemplate?.dimensions}</p>
            </div>
          </div>
        )}
      </div>
      {/* Upload Area */}
      {selectedTemplate && !uploadedImage && (
        <div className="p-6 border-t border-border">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
              isDragOver
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Upload Your Image
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop an image here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, GIF up to 10MB
            </p>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Quick Actions */}
      {uploadedImage && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-center space-x-3">
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Replace Image
            </Button>
            <Button variant="default" size="sm" iconName="Wand2">
              Generate Ad
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdPreview;