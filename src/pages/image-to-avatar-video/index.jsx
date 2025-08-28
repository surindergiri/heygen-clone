import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticatedSidebar from 'components/ui/AuthenticatedSidebar';
import UserProfileHeader from 'components/ui/UserProfileHeader';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import FileUploadZone from './components/FileUploadZone';
import ImagePreview from './components/ImagePreview';
import AvatarCustomization from './components/AvatarCustomization';
import TemplateGallery from './components/TemplateGallery';
import VideoPreview from './components/VideoPreview';
import ProcessingStatus from './components/ProcessingStatus';

const ImageToAvatarVideo = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('upload');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [projectName, setProjectName] = useState('');

  const [avatarSettings, setAvatarSettings] = useState({
    animationStyle: 'natural',
    duration: 30,
    voice: 'female-1',
    scriptText: 'Hello! Welcome to our presentation. I\'m excited to share this information with you today.',
    speechSpeed: 1.0,
    voicePitch: 0,
    background: 'white',
    gradientIntensity: 50,
    backgroundAnimation: false,
    backgroundBlur: false,
    quality: 'fhd',
    frameRate: '30',
    format: 'mp4',
    watermark: true,
    generateThumbnail: true,
    eyeTracking: true,
    headMovement: true,
    lipSync: true
  });

  // Mock processing simulation
  useEffect(() => {
    if (isProcessing) {
      const stages = ['upload', 'analysis', 'avatar', 'animation', 'voice', 'rendering'];
      let currentIndex = 0;
      let progress = 0;

      const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
          progress = 100;
          setProcessingProgress(100);
          setProcessingStage('complete');
          setIsProcessing(false);
          setGeneratedVideo('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
          setEstimatedTime('');
          clearInterval(interval);
          return;
        }

        const stageProgress = progress / 100 * stages?.length;
        const newStageIndex = Math.floor(stageProgress);
        
        if (newStageIndex !== currentIndex && newStageIndex < stages?.length) {
          currentIndex = newStageIndex;
          setProcessingStage(stages?.[currentIndex]);
        }

        setProcessingProgress(Math.min(progress, 100));
        
        // Update estimated time
        const remainingProgress = 100 - progress;
        const estimatedMinutes = Math.ceil(remainingProgress / 10);
        setEstimatedTime(`${estimatedMinutes} minute${estimatedMinutes !== 1 ? 's' : ''}`);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    if (file) {
      setProjectName(`Avatar Video - ${file?.name?.split('.')?.[0]}`);
      // Simulate upload progress
      setIsUploading(true);
      setUploadProgress(0);
      
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            setIsUploading(false);
            clearInterval(uploadInterval);
            return 100;
          }
          return prev + Math.random() * 20;
        });
      }, 500);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleSettingsChange = (newSettings) => {
    setAvatarSettings(newSettings);
  };

  const handleStartProcessing = () => {
    if (!selectedFile) {
      alert('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessingStage('upload');
    setGeneratedVideo(null);
  };

  const handleDownload = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = generatedVideo;
    link.download = `${projectName}.mp4`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleShare = () => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: projectName,
        text: 'Check out my avatar video created with AvatarGen Studio!',
        url: generatedVideo
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard?.writeText(generatedVideo);
      alert('Video URL copied to clipboard!');
    }
  };

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setProcessingProgress(0);
    setProcessingStage('upload');
    setEstimatedTime('');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <Helmet>
        <title>Image to Avatar Video - AvatarGen Studio</title>
        <meta name="description" content="Transform static images into dynamic avatar videos with AI-powered animation technology. Create professional talking avatars for presentations, marketing, and content creation." />
        <meta name="keywords" content="avatar video, image to video, AI animation, talking avatar, video generation, presentation avatar" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AuthenticatedSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
        />
        
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <UserProfileHeader />
          
          <main className="pt-16 pb-20 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Breadcrumbs />
              
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      Image to Avatar Video
                    </h1>
                    <p className="text-muted-foreground">
                      Transform your static images into dynamic avatar videos with AI-powered animation
                    </p>
                  </div>
                  
                  {selectedFile && !isProcessing && !generatedVideo && (
                    <Button
                      variant="default"
                      size="lg"
                      onClick={handleStartProcessing}
                      iconName="Play"
                      iconPosition="left"
                      className="hidden sm:flex"
                    >
                      Generate Avatar Video
                    </Button>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Panel - Upload & Customization */}
                <div className="lg:col-span-2 space-y-8">
                  {/* File Upload */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <FileUploadZone
                      onFileSelect={handleFileSelect}
                      uploadProgress={uploadProgress}
                      isUploading={isUploading}
                    />
                  </div>

                  {/* Image Preview */}
                  {selectedFile && (
                    <div className="bg-card border border-border rounded-lg p-6">
                      <ImagePreview
                        selectedFile={selectedFile}
                        onRemove={() => setSelectedFile(null)}
                      />
                    </div>
                  )}

                  {/* Template Gallery */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <TemplateGallery
                      onTemplateSelect={handleTemplateSelect}
                      selectedTemplate={selectedTemplate}
                    />
                  </div>

                  {/* Avatar Customization */}
                  {selectedFile && (
                    <div className="bg-card border border-border rounded-lg p-6">
                      <AvatarCustomization
                        settings={avatarSettings}
                        onSettingsChange={handleSettingsChange}
                      />
                    </div>
                  )}
                </div>

                {/* Right Panel - Preview & Processing */}
                <div className="lg:col-span-3 space-y-8">
                  {/* Processing Status */}
                  {isProcessing && (
                    <div className="bg-card border border-border rounded-lg p-6">
                      <ProcessingStatus
                        status="processing"
                        progress={processingProgress}
                        estimatedTime={estimatedTime}
                        currentStage={processingStage}
                        onCancel={handleCancelProcessing}
                        projectName={projectName}
                      />
                    </div>
                  )}

                  {/* Video Preview */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <VideoPreview
                      isProcessing={isProcessing}
                      processingProgress={processingProgress}
                      estimatedTime={estimatedTime}
                      processingStage={processingStage}
                      generatedVideo={generatedVideo}
                      onDownload={handleDownload}
                      onShare={handleShare}
                    />
                  </div>

                  {/* Project Actions */}
                  {generatedVideo && (
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Project Actions
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          fullWidth
                          iconName="Save"
                          iconPosition="left"
                        >
                          Save to Dashboard
                        </Button>
                        <Button
                          variant="outline"
                          fullWidth
                          iconName="Copy"
                          iconPosition="left"
                        >
                          Create New Version
                        </Button>
                        <Button
                          variant="outline"
                          fullWidth
                          iconName="Share2"
                          iconPosition="left"
                          onClick={handleShare}
                        >
                          Share Project
                        </Button>
                        <Button
                          variant="outline"
                          fullWidth
                          iconName="Settings"
                          iconPosition="left"
                        >
                          Export Settings
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Generate Button */}
              {selectedFile && !isProcessing && !generatedVideo && (
                <div className="fixed bottom-20 left-4 right-4 lg:hidden">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleStartProcessing}
                    iconName="Play"
                    iconPosition="left"
                    fullWidth
                  >
                    Generate Avatar Video
                  </Button>
                </div>
              )}

              {/* Help Section */}
              <div className="mt-12 bg-muted/50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="HelpCircle" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Need Help Getting Started?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Learn how to create amazing avatar videos with our step-by-step guide and best practices.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" iconName="BookOpen" iconPosition="left">
                        View Tutorial
                      </Button>
                      <Button variant="outline" size="sm" iconName="Video" iconPosition="left">
                        Watch Demo
                      </Button>
                      <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                        Get Support
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

export default ImageToAvatarVideo;