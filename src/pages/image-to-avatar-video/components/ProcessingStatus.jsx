import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ProcessingStatus = ({ 
  status, 
  progress, 
  estimatedTime, 
  currentStage, 
  onCancel,
  projectName 
}) => {
  const statusConfig = {
    'queued': {
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/5',
      borderColor: 'border-warning/20',
      title: 'Queued for Processing',
      description: 'Your project is in the processing queue'
    },
    'processing': {
      icon: 'Loader2',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
      title: 'Processing Your Video',
      description: 'AI is working on your avatar video'
    },
    'completed': {
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/5',
      borderColor: 'border-success/20',
      title: 'Processing Complete',
      description: 'Your avatar video is ready!'
    },
    'failed': {
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/5',
      borderColor: 'border-error/20',
      title: 'Processing Failed',
      description: 'Something went wrong during processing'
    },
    'cancelled': {
      icon: 'XCircle',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/5',
      borderColor: 'border-muted/20',
      title: 'Processing Cancelled',
      description: 'The processing was cancelled by user'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.['queued'];

  const stages = [
    { id: 'upload', label: 'Image Upload', description: 'Uploading and validating image' },
    { id: 'analysis', label: 'Image Analysis', description: 'Analyzing facial features and structure' },
    { id: 'avatar', label: 'Avatar Creation', description: 'Creating 3D avatar model' },
    { id: 'animation', label: 'Animation Generation', description: 'Generating facial animations' },
    { id: 'voice', label: 'Voice Processing', description: 'Processing voice and lip sync' },
    { id: 'rendering', label: 'Video Rendering', description: 'Rendering final video output' },
    { id: 'finalization', label: 'Finalization', description: 'Preparing video for download' }
  ];

  const currentStageIndex = stages?.findIndex(stage => stage?.id === currentStage);

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <div className={`${config?.bgColor} ${config?.borderColor} border rounded-lg p-6`}>
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-full ${config?.bgColor}`}>
            <Icon 
              name={config?.icon} 
              size={24} 
              className={`${config?.color} ${status === 'processing' ? 'animate-spin' : ''}`} 
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {config?.title}
            </h3>
            <p className="text-muted-foreground mb-3">
              {config?.description}
            </p>
            
            {projectName && (
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="File" size={16} className="text-muted-foreground" />
                <span className="text-foreground font-medium">{projectName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar for Processing Status */}
        {(status === 'processing' || status === 'queued') && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground font-medium">
                {progress}% Complete
              </span>
              {estimatedTime && (
                <span className="text-muted-foreground">
                  {estimatedTime} remaining
                </span>
              )}
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {/* Processing Stages */}
      {(status === 'processing' || status === 'completed') && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Processing Stages</h4>
          <div className="space-y-4">
            {stages?.map((stage, index) => {
              const isCompleted = index < currentStageIndex || status === 'completed';
              const isCurrent = index === currentStageIndex && status === 'processing';
              const isPending = index > currentStageIndex && status !== 'completed';

              return (
                <div
                  key={stage?.id}
                  className={`flex items-start space-x-4 p-3 rounded-lg transition-all duration-200 ${
                    isCompleted
                      ? 'bg-success/5 border border-success/20'
                      : isCurrent
                      ? 'bg-primary/5 border border-primary/20' :'bg-muted/30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted
                      ? 'bg-success text-success-foreground'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : isCurrent ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className={`font-medium ${
                      isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {stage?.label}
                    </h5>
                    <p className={`text-sm ${
                      isCompleted || isCurrent ? 'text-muted-foreground' : 'text-muted-foreground/70'
                    }`}>
                      {stage?.description}
                    </p>
                  </div>
                  {isCurrent && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-xs text-primary font-medium">Active</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {status === 'processing' && (
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} />
              <span>Keep this tab open for real-time updates</span>
            </div>
          )}
          {status === 'completed' && (
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span>Processing completed successfully</span>
            </div>
          )}
          {status === 'failed' && (
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span>Processing failed - please try again</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {(status === 'processing' || status === 'queued') && onCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
          )}
          
          {status === 'failed' && (
            <Button
              variant="default"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
            >
              Retry Processing
            </Button>
          )}
          
          {status === 'completed' && (
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Download Video
            </Button>
          )}
        </div>
      </div>
      {/* Additional Information */}
      {status === 'processing' && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Processing Tips</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Processing time depends on video quality and duration settings</li>
                <li>• You'll receive an email notification when processing is complete</li>
                <li>• The video will be available for download for 30 days</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;