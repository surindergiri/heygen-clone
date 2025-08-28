import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const ProcessingStatus = ({ 
  isProcessing, 
  progress, 
  currentStep, 
  estimatedTime, 
  onCancel,
  onStartTranslation,
  canStart = false
}) => {
  const processingSteps = [
    { id: 'upload', label: 'Uploading Video', icon: 'Upload' },
    { id: 'analysis', label: 'Analyzing Audio', icon: 'Waveform' },
    { id: 'transcription', label: 'Transcribing Speech', icon: 'FileText' },
    { id: 'translation', label: 'Translating Content', icon: 'Languages' },
    { id: 'synthesis', label: 'Generating Audio', icon: 'Mic' },
    { id: 'rendering', label: 'Rendering Video', icon: 'Video' },
    { id: 'complete', label: 'Processing Complete', icon: 'CheckCircle' }
  ];

  const getCurrentStepIndex = () => {
    return processingSteps?.findIndex(step => step?.id === currentStep);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (!isProcessing && !canStart) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Play" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Translate</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Upload a video and configure your translation settings to get started
          </p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Clock" size={14} />
              <span>Estimated processing time: 2-5 minutes</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Zap" size={14} />
              <span>High-quality AI translation</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isProcessing && canStart) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Rocket" size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Start</h3>
          <p className="text-sm text-muted-foreground mb-6">
            All settings configured. Click below to begin translation process.
          </p>
          
          <Button 
            variant="default" 
            size="lg" 
            onClick={onStartTranslation}
            className="mb-4"
          >
            <Icon name="Play" size={20} className="mr-2" />
            Start Translation
          </Button>

          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} />
              <span>Est. 3-7 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} />
              <span>Secure processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={14} />
              <span>AI-powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={14} />
              <span>HD quality output</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Processing Translation</h3>
        <p className="text-sm text-muted-foreground">
          Please wait while we translate your video
        </p>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Processing Steps */}
      <div className="space-y-3 mb-6">
        {processingSteps?.map((step, index) => {
          const currentIndex = getCurrentStepIndex();
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div
              key={step?.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                isCompleted ? 'bg-success/10' : isCurrent ?'bg-primary/10': 'bg-muted/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-success text-success-foreground' :
                isCurrent ? 'bg-primary text-primary-foreground': 'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : isCurrent ? (
                  <div className="w-3 h-3 bg-current rounded-full animate-pulse" />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <span className={`text-sm font-medium ${
                isCompleted ? 'text-success' : isCurrent ?'text-primary': 'text-muted-foreground'
              }`}>
                {step?.label}
              </span>
              {isCurrent && (
                <div className="ml-auto">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Time Estimate */}
      {estimatedTime > 0 && (
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Estimated time remaining:</span>
          </div>
          <span className="font-medium text-foreground">{formatTime(estimatedTime)}</span>
        </div>
      )}
      {/* Cancel Button */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={onCancel}>
          <Icon name="X" size={16} className="mr-2" />
          Cancel Translation
        </Button>
      </div>
    </div>
  );
};

export default ProcessingStatus;