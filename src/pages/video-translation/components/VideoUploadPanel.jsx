import React, { useState, useRef } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const VideoUploadPanel = ({ onVideoUpload, uploadProgress, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { format: 'MP4', description: 'Most common video format' },
    { format: 'MOV', description: 'Apple QuickTime format' },
    { format: 'AVI', description: 'Audio Video Interleave' },
    { format: 'MKV', description: 'Matroska video format' },
    { format: 'WMV', description: 'Windows Media Video' }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      const file = e?.dataTransfer?.files?.[0];
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file) => {
    const validTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/x-msvideo', 'video/quicktime', 'video/x-ms-wmv'];
    
    if (!validTypes?.includes(file?.type)) {
      alert('Please select a valid video file (MP4, MOV, AVI, MKV, WMV)');
      return;
    }

    if (file?.size > 500 * 1024 * 1024) { // 500MB limit
      alert('File size must be less than 500MB');
      return;
    }

    setSelectedFile(file);
    onVideoUpload(file);
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileSelection(e?.target?.files?.[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Source Video</h3>
        <p className="text-sm text-muted-foreground">
          Upload your video file to begin the translation process
        </p>
      </div>
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drop your video here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports MP4, MOV, AVI, MKV, WMV up to 500MB
              </p>
            </div>
            
            <Button variant="outline" onClick={openFileDialog}>
              <Icon name="FolderOpen" size={18} className="mr-2" />
              Choose File
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Video" size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {selectedFile?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile?.size)} • {selectedFile?.type}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedFile(null);
                fileInputRef.current.value = '';
              }}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uploading...</span>
                <span className="text-foreground font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Supported Formats</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {supportedFormats?.map((format) => (
            <div key={format?.format} className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="font-medium text-foreground">{format?.format}</span>
              <span className="text-muted-foreground">- {format?.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoUploadPanel;