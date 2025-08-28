import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticatedSidebar from 'components/ui/AuthenticatedSidebar';
import UserProfileHeader from 'components/ui/UserProfileHeader';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import VideoUploadPanel from './components/VideoUploadPanel';
import LanguageSelector from './components/LanguageSelector';
import TranslationOptions from './components/TranslationOptions';
import VideoPreviewPanel from './components/VideoPreviewPanel';
import ProcessingStatus from './components/ProcessingStatus';
import ExportOptions from './components/ExportOptions';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const VideoTranslation = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('upload');
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [translatedVideoSrc, setTranslatedVideoSrc] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const [translationOptions, setTranslationOptions] = useState({
    voice: 'neural-female-1',
    speed: '1.0',
    quality: 'high',
    includeSubtitles: true,
    subtitleStyle: 'modern',
    showOriginalSubtitles: false,
    preserveBackgroundMusic: true,
    autoSyncTiming: true,
    enhanceAudio: false
  });

  const [exportSettings, setExportSettings] = useState({
    format: 'mp4',
    quality: '1080p',
    bitrate: 'auto',
    includeOriginalAudio: false,
    embedSubtitles: true,
    separateSubtitles: false,
    optimizeForWeb: true
  });

  // Mock video sources for demonstration
  const mockOriginalVideo = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";
  const mockTranslatedVideo = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4";

  const handleVideoUpload = (file) => {
    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleStartTranslation = () => {
    if (!selectedFile || !sourceLanguage || !targetLanguage) {
      alert('Please upload a video and select both source and target languages.');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    setCurrentStep('analysis');
    setEstimatedTime(300); // 5 minutes

    // Simulate processing steps
    const steps = ['analysis', 'transcription', 'translation', 'synthesis', 'rendering', 'complete'];
    let currentStepIndex = 0;

    const processingInterval = setInterval(() => {
      setProcessingProgress(prev => {
        const newProgress = prev + 2;
        
        // Update current step based on progress
        const stepProgress = Math.floor(newProgress / (100 / steps?.length));
        if (stepProgress < steps?.length) {
          setCurrentStep(steps?.[stepProgress]);
        }

        // Update estimated time
        setEstimatedTime(prev => Math.max(0, prev - 3));

        if (newProgress >= 100) {
          clearInterval(processingInterval);
          setIsProcessing(false);
          setCurrentStep('complete');
          setTranslatedVideoSrc(mockTranslatedVideo);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setProcessingProgress(0);
    setCurrentStep('upload');
    setEstimatedTime(0);
  };

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger a download
      alert('Video exported successfully! Download will begin shortly.');
    }, 3000);
  };

  const canStartTranslation = selectedFile && sourceLanguage && targetLanguage && !isUploading && !isProcessing;

  return (
    <>
      <Helmet>
        <title>Video Translation - AvatarGen Studio</title>
        <meta name="description" content="Translate your videos to multiple languages while maintaining audio synchronization and visual quality with AI-powered technology." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AuthenticatedSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <UserProfileHeader />
          
          <main className="pt-16 pb-20 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Breadcrumbs />
              
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Languages" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Video Translation</h1>
                    <p className="text-muted-foreground">
                      Translate your videos to multiple languages with AI-powered technology
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-card rounded-lg border border-border p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Globe" size={20} className="text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Supported Languages</p>
                        <p className="text-lg font-semibold text-foreground">20+</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={20} className="text-success" />
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Processing Time</p>
                        <p className="text-lg font-semibold text-foreground">3-7 min</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Zap" size={20} className="text-warning" />
                      <div>
                        <p className="text-sm text-muted-foreground">AI Accuracy</p>
                        <p className="text-lg font-semibold text-foreground">95%+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                {/* Left Panel - Upload & Settings */}
                <div className="xl:col-span-2 space-y-6">
                  <VideoUploadPanel
                    onVideoUpload={handleVideoUpload}
                    uploadProgress={uploadProgress}
                    isUploading={isUploading}
                  />
                  
                  <LanguageSelector
                    sourceLanguage={sourceLanguage}
                    targetLanguage={targetLanguage}
                    onSourceLanguageChange={setSourceLanguage}
                    onTargetLanguageChange={setTargetLanguage}
                    disabled={isProcessing}
                  />
                  
                  <TranslationOptions
                    options={translationOptions}
                    onOptionsChange={setTranslationOptions}
                    disabled={isProcessing}
                  />
                </div>

                {/* Center Panel - Processing Status */}
                <div className="xl:col-span-1">
                  <div className="sticky top-24">
                    <ProcessingStatus
                      isProcessing={isProcessing}
                      progress={processingProgress}
                      currentStep={currentStep}
                      estimatedTime={estimatedTime}
                      onCancel={handleCancelProcessing}
                      onStartTranslation={handleStartTranslation}
                      canStart={canStartTranslation}
                    />
                  </div>
                </div>

                {/* Right Panel - Video Previews & Export */}
                <div className="xl:col-span-2 space-y-6">
                  <VideoPreviewPanel
                    title="Original Video"
                    videoSrc={selectedFile ? mockOriginalVideo : null}
                    placeholder="Upload a video to preview"
                    showControls={true}
                  />
                  
                  <VideoPreviewPanel
                    title="Translated Video"
                    videoSrc={translatedVideoSrc}
                    isProcessing={isProcessing}
                    processingProgress={processingProgress}
                    placeholder="Translated video will appear here"
                    showControls={!isProcessing}
                  />
                  
                  {translatedVideoSrc && !isProcessing && (
                    <ExportOptions
                      exportSettings={exportSettings}
                      onExportSettingsChange={setExportSettings}
                      onExport={handleExport}
                      isExporting={isExporting}
                    />
                  )}
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-12 bg-muted/50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="HelpCircle" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our video translation feature uses advanced AI to translate speech while preserving timing and emotion. 
                      For best results, ensure clear audio and minimal background noise.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="FileText" size={16} className="mr-2" />
                        Documentation
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        Contact Support
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Play" size={16} className="mr-2" />
                        Watch Tutorial
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default VideoTranslation;