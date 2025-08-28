import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const VideoPreview = ({ 
  isProcessing, 
  processingProgress, 
  estimatedTime, 
  generatedVideo, 
  onDownload, 
  onShare,
  processingStage 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const processingStages = [
    { id: 'upload', label: 'Uploading Image', progress: 0 },
    { id: 'analysis', label: 'Analyzing Image', progress: 20 },
    { id: 'avatar', label: 'Creating Avatar', progress: 40 },
    { id: 'animation', label: 'Generating Animation', progress: 60 },
    { id: 'voice', label: 'Processing Voice', progress: 80 },
    { id: 'rendering', label: 'Final Rendering', progress: 95 },
    { id: 'complete', label: 'Complete', progress: 100 }
  ];

  const currentStageIndex = processingStages?.findIndex(stage => stage?.id === processingStage);
  const currentStageData = processingStages?.[currentStageIndex] || processingStages?.[0];

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video?.currentTime);
    const updateDuration = () => setDuration(video?.duration);
    const handleEnded = () => setIsPlaying(false);

    video?.addEventListener('timeupdate', updateTime);
    video?.addEventListener('loadedmetadata', updateDuration);
    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('timeupdate', updateTime);
      video?.removeEventListener('loadedmetadata', updateDuration);
      video?.removeEventListener('ended', handleEnded);
    };
  }, [generatedVideo]);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (!video) return;

    if (isPlaying) {
      video?.pause();
    } else {
      video?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    if (!video) return;

    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    video.currentTime = pos * duration;
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef?.current;
    if (!video) return;

    const newVolume = parseFloat(e?.target?.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  if (isProcessing) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Creating Your Avatar Video</h3>
          <p className="text-sm text-muted-foreground">
            Please wait while we process your image and generate the avatar video
          </p>
        </div>
        {/* Processing Animation */}
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="text-center space-y-6">
            {/* Animated Avatar Placeholder */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="User" size={48} className="text-primary animate-bounce" />
              </div>
              <div className="absolute -inset-2 border-2 border-primary/30 rounded-full animate-spin" 
                   style={{ animationDuration: '3s' }} />
            </div>

            {/* Current Stage */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">{currentStageData?.label}</h4>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {processingProgress}% complete • {estimatedTime} remaining
              </p>
            </div>

            {/* Processing Stages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {processingStages?.slice(0, -1)?.map((stage, index) => (
                <div
                  key={stage?.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    index <= currentStageIndex
                      ? 'bg-primary/5 border border-primary/20' :'bg-muted/50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index < currentStageIndex
                      ? 'bg-success text-success-foreground'
                      : index === currentStageIndex
                      ? 'bg-primary text-primary-foreground animate-pulse'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index < currentStageIndex ? (
                      <Icon name="Check" size={14} />
                    ) : index === currentStageIndex ? (
                      <Icon name="Loader2" size={14} className="animate-spin" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm ${
                    index <= currentStageIndex ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}>
                    {stage?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Processing Tips */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Processing Tips</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Keep this tab open for real-time updates</li>
                <li>• Higher quality settings take longer to process</li>
                <li>• You'll receive an email when processing is complete</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!generatedVideo) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Video Preview</h3>
          <p className="text-sm text-muted-foreground">
            Your generated avatar video will appear here
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg border-2 border-dashed border-border h-64 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No video generated yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload an image and customize settings to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Your Avatar Video</h3>
        <p className="text-sm text-muted-foreground">
          Preview and download your generated avatar video
        </p>
      </div>

      {/* Video Player */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={generatedVideo}
            className="w-full h-full object-contain"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
              >
                <Icon name="Play" size={24} className="text-gray-900 ml-1" />
              </button>
            </div>
          )}
        </div>

        {/* Video Controls */}
        <div className="p-4 space-y-3">
          {/* Progress Bar */}
          <div
            className="w-full h-2 bg-muted rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="p-1 rounded hover:bg-muted transition-colors duration-200"
                >
                  <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-muted rounded-full appearance-none cursor-pointer"
                />
              </div>

              <span className="text-sm text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onShare}
                iconName="Share2"
                iconPosition="left"
              >
                Share
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onDownload}
                iconName="Download"
                iconPosition="left"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Information */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Video Details</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium text-foreground">{formatTime(duration)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Quality</p>
            <p className="font-medium text-foreground">1080p HD</p>
          </div>
          <div>
            <p className="text-muted-foreground">Format</p>
            <p className="font-medium text-foreground">MP4</p>
          </div>
          <div>
            <p className="text-muted-foreground">Size</p>
            <p className="font-medium text-foreground">12.5 MB</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Video Generated Successfully!</h4>
            <p className="text-sm text-muted-foreground">
              Your avatar video has been created and is ready for download. The video will be available for 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;