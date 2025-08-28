import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ProcessingStatus = ({ isVisible, progress, status, onCancel, onComplete }) => {
  const statusConfig = {
    uploading: {
      icon: 'Upload',
      title: 'Uploading Image',
      description: 'Preparing your image for processing...',
      color: 'text-primary'
    },
    analyzing: {
      icon: 'Search',
      title: 'Analyzing Content',
      description: 'AI is analyzing your image content...',
      color: 'text-secondary'
    },
    generating: {
      icon: 'Wand2',
      title: 'Generating Ad',
      description: 'Creating your personalized advertisement...',
      color: 'text-accent'
    },
    optimizing: {
      icon: 'Zap',
      title: 'Optimizing Quality',
      description: 'Enhancing image quality and applying effects...',
      color: 'text-success'
    },
    finalizing: {
      icon: 'CheckCircle',
      title: 'Finalizing',
      description: 'Adding finishing touches to your ad...',
      color: 'text-success'
    },
    complete: {
      icon: 'Check',
      title: 'Complete!',
      description: 'Your ad has been generated successfully.',
      color: 'text-success'
    },
    error: {
      icon: 'AlertCircle',
      title: 'Processing Failed',
      description: 'There was an error processing your image.',
      color: 'text-error'
    }
  };

  const currentStatus = statusConfig?.[status] || statusConfig?.uploading;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1001 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-md w-full p-6 animate-slide-up">
        {/* Status Icon */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center ${
            status === 'complete' ? 'bg-success/10' : 
            status === 'error' ? 'bg-error/10' : 'bg-primary/10'
          }`}>
            <Icon 
              name={currentStatus?.icon} 
              size={32} 
              className={`${currentStatus?.color} ${
                status !== 'complete' && status !== 'error' ? 'animate-pulse' : ''
              }`}
            />
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {currentStatus?.title}
          </h3>
          <p className="text-muted-foreground">
            {currentStatus?.description}
          </p>
        </div>

        {/* Progress Bar */}
        {status !== 'complete' && status !== 'error' && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Estimated Time */}
        {status !== 'complete' && status !== 'error' && (
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              Estimated time remaining: {Math.max(1, Math.ceil((100 - progress) / 20))} minutes
            </p>
          </div>
        )}

        {/* Processing Steps */}
        {status !== 'complete' && status !== 'error' && (
          <div className="space-y-3 mb-6">
            {[
              { step: 'uploading', label: 'Upload Image', completed: progress > 20 },
              { step: 'analyzing', label: 'Analyze Content', completed: progress > 40 },
              { step: 'generating', label: 'Generate Ad', completed: progress > 60 },
              { step: 'optimizing', label: 'Optimize Quality', completed: progress > 80 },
              { step: 'finalizing', label: 'Finalize', completed: progress > 95 }
            ]?.map((item, index) => (
              <div key={item?.step} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item?.completed 
                    ? 'bg-success text-success-foreground' 
                    : status === item?.step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {item?.completed ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`text-sm ${
                  item?.completed ? 'text-foreground' : 
                  status === item?.step ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}>
                  {item?.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {status === 'complete' ? (
            <>
              <Button variant="outline" fullWidth onClick={onCancel}>
                Create Another
              </Button>
              <Button variant="default" fullWidth onClick={onComplete} iconName="Download">
                Download Ad
              </Button>
            </>
          ) : status === 'error' ? (
            <>
              <Button variant="outline" fullWidth onClick={onCancel}>
                Try Again
              </Button>
              <Button variant="default" fullWidth onClick={onCancel}>
                Go Back
              </Button>
            </>
          ) : (
            <Button variant="outline" fullWidth onClick={onCancel} iconName="X">
              Cancel Processing
            </Button>
          )}
        </div>

        {/* Additional Info */}
        {status !== 'complete' && status !== 'error' && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium mb-1">Processing Tips:</p>
                <ul className="space-y-1">
                  <li>• Keep this tab open for best results</li>
                  <li>• Higher quality images take longer to process</li>
                  <li>• You'll be notified when complete</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingStatus;