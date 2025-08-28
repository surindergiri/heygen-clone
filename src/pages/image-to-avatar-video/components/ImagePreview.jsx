import React from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ImagePreview = ({ selectedFile, onRemove }) => {
  if (!selectedFile) {
    return (
      <div className="bg-muted/30 rounded-lg border-2 border-dashed border-border h-64 flex items-center justify-center">
        <div className="text-center">
          <Icon name="ImageIcon" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No image selected</p>
        </div>
      </div>
    );
  }

  const imageUrl = URL.createObjectURL(selectedFile);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">Image Preview</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          iconName="X"
          iconPosition="left"
        >
          Remove
        </Button>
      </div>
      <div className="relative bg-muted/30 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt="Selected image preview"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">File Name</p>
            <p className="font-medium text-foreground truncate">{selectedFile?.name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">File Size</p>
            <p className="font-medium text-foreground">
              {(selectedFile?.size / (1024 * 1024))?.toFixed(2)} MB
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="font-medium text-foreground uppercase">
              {selectedFile?.type?.split('/')?.[1]}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="font-medium text-success">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;