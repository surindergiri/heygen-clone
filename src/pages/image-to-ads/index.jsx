import React, { useState, useEffect } from 'react';
import AuthenticatedSidebar from 'components/ui/AuthenticatedSidebar';
import UserProfileHeader from 'components/ui/UserProfileHeader';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import TemplateLibrary from './components/TemplateLibrary';
import AdPreview from './components/AdPreview';
import CustomizationPanel from './components/CustomizationPanel';
import ProcessingStatus from './components/ProcessingStatus';

const ImageToAds = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customizations, setCustomizations] = useState({
    text: '',
    subtext: '',
    fontFamily: 'Inter',
    fontSize: 24,
    textColor: '#ffffff',
    backgroundColor: '#000000',
    overlayOpacity: 0,
    textAlign: 'center',
    textEffect: 'shadow',
    animation: 'none',
    borderRadius: 0,
    exportFormat: 'png',
    quality: 'high',
    customWidth: '',
    customHeight: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('uploading');

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomizations(prev => ({
      ...prev,
      text: template?.name,
      subtext: `Professional ${template?.category} advertisement`
    }));
  };

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
  };

  const handleCustomizationChange = (newCustomizations) => {
    setCustomizations(newCustomizations);
  };

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessingStatus('uploading');

    // Simulate processing steps
    const steps = [
      { status: 'uploading', duration: 1000, progress: 20 },
      { status: 'analyzing', duration: 2000, progress: 40 },
      { status: 'generating', duration: 3000, progress: 60 },
      { status: 'optimizing', duration: 2000, progress: 80 },
      { status: 'finalizing', duration: 1000, progress: 95 },
      { status: 'complete', duration: 500, progress: 100 }
    ];

    let currentStep = 0;
    const processStep = () => {
      if (currentStep < steps?.length) {
        const step = steps?.[currentStep];
        setProcessingStatus(step?.status);
        
        const progressInterval = setInterval(() => {
          setProcessingProgress(prev => {
            const increment = (step?.progress - (currentStep > 0 ? steps?.[currentStep - 1]?.progress : 0)) / 10;
            const newProgress = Math.min(prev + increment, step?.progress);
            
            if (newProgress >= step?.progress) {
              clearInterval(progressInterval);
              currentStep++;
              setTimeout(processStep, 200);
            }
            
            return newProgress;
          });
        }, step?.duration / 10);
      }
    };

    processStep();
  };

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setProcessingProgress(0);
    setProcessingStatus('uploading');
  };

  const handleCompleteProcessing = () => {
    setIsProcessing(false);
    setProcessingProgress(0);
    setProcessingStatus('uploading');
    // Here you would typically download the generated ad
    console.log('Downloading generated ad...');
  };

  // Auto-start processing when image is uploaded and template is selected
  useEffect(() => {
    if (uploadedImage && selectedTemplate && !isProcessing) {
      const timer = setTimeout(() => {
        handleStartProcessing();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [uploadedImage, selectedTemplate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AuthenticatedSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      } pb-16 lg:pb-0`}>
        {/* Header */}
        <UserProfileHeader />

        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          <div className="p-4 sm:p-6">
            {/* Breadcrumbs */}
            <Breadcrumbs />

            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Image to Ads
              </h1>
              <p className="text-muted-foreground">
                Transform your images into compelling advertisements with AI-powered templates and customization tools.
              </p>
            </div>

            {/* Three-Panel Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
              {/* Template Library - Left Panel (25%) */}
              <div className="lg:col-span-1 h-full">
                <TemplateLibrary
                  onTemplateSelect={handleTemplateSelect}
                  selectedTemplate={selectedTemplate}
                />
              </div>

              {/* Ad Preview - Center Panel (50%) */}
              <div className="lg:col-span-2 h-full">
                <AdPreview
                  selectedTemplate={selectedTemplate}
                  uploadedImage={uploadedImage}
                  customizations={customizations}
                  onImageUpload={handleImageUpload}
                  isProcessing={isProcessing}
                />
              </div>

              {/* Customization Panel - Right Panel (25%) */}
              <div className="lg:col-span-1 h-full">
                <CustomizationPanel
                  customizations={customizations}
                  onCustomizationChange={handleCustomizationChange}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Processing Status Modal */}
      <ProcessingStatus
        isVisible={isProcessing}
        progress={processingProgress}
        status={processingStatus}
        onCancel={handleCancelProcessing}
        onComplete={handleCompleteProcessing}
      />
    </div>
  );
};

export default ImageToAds;