import React, { useState, useRef, useEffect } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';


const VideoPreviewPanel = ({ 
  title, 
  videoSrc, 
  isProcessing = false, 
  processingProgress = 0,
  showControls = true,
  placeholder = "No video selected"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

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
  }, [videoSrc]);

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
    const newTime = pos * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef?.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container?.requestFullscreen) {
        container?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      <div ref={containerRef} className="relative bg-black aspect-video">
        {videoSrc ? (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-contain"
              onClick={togglePlay}
            />
            
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Processing Video...</p>
                  <p className="text-sm opacity-80">{processingProgress}% Complete</p>
                  <div className="w-48 bg-white/20 rounded-full h-2 mt-3">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {showControls && !isProcessing && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div
                  className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-white rounded-full transition-all duration-100"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20"
                      >
                        <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
                      </Button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-white/30 rounded-full appearance-none slider"
                      />
                    </div>

                    <span className="text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={16} />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <div className="text-center">
              <Icon name="Video" size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg opacity-80">{placeholder}</p>
            </div>
          </div>
        )}
      </div>

      {videoSrc && !isProcessing && (
        <div className="p-4 bg-muted/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium text-foreground">{formatTime(duration)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="FileVideo" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Format:</span>
                <span className="font-medium text-foreground">MP4</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPreviewPanel;