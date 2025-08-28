import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ImageToAds from './pages/image-to-ads';
import LandingPage from './pages/landing-page';
import ImageToAvatarVideo from './pages/image-to-avatar-video';
import Register from './pages/register';
import VideoTranslation from './pages/video-translation';
import Dashboard from './pages/dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ImageToAds />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/image-to-ads" element={<ImageToAds />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/image-to-avatar-video" element={<ImageToAvatarVideo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video-translation" element={<VideoTranslation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;