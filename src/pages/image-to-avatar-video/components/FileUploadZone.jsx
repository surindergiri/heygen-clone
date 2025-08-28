import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const FileUploadZone = ({ onFileSelect, uploadProgress, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const supportedFormats = ['JPG', 'PNG', 'JPEG', 'WEBP'];
  const maxFileSize = 10; // MB

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
    if (files?.length > 0) {
      handleFileSelection(files?.[0]);
    }
  };

  const handleFileSelection = (file) => {
    if (!file) return;

    // Validate file type
    const fileExtension = file?.name?.split('.')?.pop()?.toUpperCase();
    if (!supportedFormats?.includes(fileExtension)) {
      alert(`Unsupported file format. Please use: ${supportedFormats?.join(', ')}`);
      return;
    }

    // Validate file size
    if (file?.size > maxFileSize * 1024 * 1024) {
      alert(`File size too large. Maximum size is ${maxFileSize}MB`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    handleFileSelection(file);
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Your Image</h3>
        <p className="text-sm text-muted-foreground">
          Transform your static image into a dynamic avatar video
        </p>
      </div>
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5'
            : selectedFile
            ? 'border-success bg-success/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="Check" size={32} className="text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedFile?.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile?.size / (1024 * 1024))?.toFixed(2)} MB
              </p>
            </div>
            {isUploading && (
              <div className="space-y-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={removeFile}
              disabled={isUploading}
              iconName="X"
              iconPosition="left"
            >
              Remove File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drag & drop your image here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse files
              </p>
              <Button
                variant="outline"
                onClick={handleBrowseClick}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Browse Files
              </Button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Supported formats:</p>
            <p className="text-muted-foreground">
              {supportedFormats?.join(', ')} • Max size: {maxFileSize}MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;