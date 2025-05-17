'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobilePreviewModal from './MobilePreviewModal';

interface FeaturedProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  imageId: string;
  tags: string[];
  platforms: string[];
  featured?: boolean;
}

export default function FeaturedProjectCard({
  id,
  title,
  description,
  image,
  imageId,
  tags,
  platforms,
  featured = false
}: FeaturedProjectCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const handleOpenPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPreviewOpen(true);
  };
  
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  // Extract app name without additional text
  const appName = title.split(':')[0].trim();

  // Define preview URL based on project ID
  const previewUrl = id === 'fittrack' 
    ? '@FitTrackPro'  // Use special tag for FitTrack Pro
    : id === 'edulearn'
    ? '@EduLearn'  // Use special tag for EduLearn
    : id === 'travelcompanion'
    ? '@TravelCompanion' // Use special tag for TravelCompanion
    : `/preview?image=${imageId}&project=${encodeURIComponent(title)}`;
    
  // Determine content for mobile frame
  const isFitTrackPro = id === 'fittrack';
  const isEduLearn = id === 'edulearn';
  const isTravelCompanion = id === 'travelcompanion';
  const isHealthConnectPatient = id === 'healthconnect-patient';
  
  // Determine appropriate launch screen source
  const getLaunchScreenSrc = () => {
    if (isFitTrackPro) {
      return '/AppUI/FitTrackPro/FitTrackPro.JPG';
    } else if (isEduLearn) {
      return '/AppUI/EduLearn/Onboarding.html';
    } else if (isTravelCompanion) {
      return '/AppUI/TravelCompanion.html/index.html';
    } else if (isHealthConnectPatient) {
      return '/AppUI/HealthConnectPatientApp/splash.html';
    } else {
      return image;
    }
  };
  
  // Current time for status bar
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <>
      <div className="relative group bg-[#282562] rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all shadow-xl">
        {/* Mobile Device Frame */}
        <div className="relative h-[360px] bg-gradient-to-br from-[#181C23] to-[#0F172A] flex items-center justify-center">
          {/* Featured Project badge */}
          <div className="absolute top-3 left-3 z-30">
            <span className="bg-purple-900/40 text-purple-200 text-xs py-1 px-3 rounded-full border border-purple-500/30">
              Featured Project
            </span>
          </div>
          
          {/* Mobile Device Frame UI - styled to match screenshot */}
          <div className="relative bg-white/5 rounded-[38px] shadow-xl border border-white/20 overflow-hidden w-[220px] h-[440px] transition-transform hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/20">
            {/* Phone shape - outer rim */}
            <div className="absolute inset-0 rounded-[38px] bg-gradient-to-r from-gray-300/20 to-white/30 p-[1px] overflow-hidden">
              {/* Screen area */}
              <div className="bg-gradient-to-b from-[#131836] to-[#151a30] h-full w-full rounded-[36px] overflow-hidden relative">
                {/* Content Area */}
                <div className="absolute inset-0 overflow-hidden">
                  {isFitTrackPro || isTravelCompanion || isEduLearn || isHealthConnectPatient ? (
                    <iframe
                      src={getLaunchScreenSrc()}
                      className="w-full h-full border-0"
                      title={`${title} Launch Screen`}
                    />
                  ) : (
                    <img
                      src={getLaunchScreenSrc()}
                      alt={appName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/50 rounded-full opacity-70 z-10"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-[#1d1d46]">
          <h3 className="text-xl font-bold text-white">{appName}</h3>
          <p className="text-gray-200 mt-1 text-sm line-clamp-2">{description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="bg-[#523dbe]/40 py-1 px-3 rounded-full text-purple-200 text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Live Preview Button */}
          <button 
            onClick={handleOpenPreview}
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white py-2.5 px-6 rounded-lg font-medium hover:from-[#7c4fe0] hover:to-[#d9418a] transition-all flex items-center justify-center mt-4"
          >
            <i className="fa-regular fa-eye mr-2"></i>
            Live Preview
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </button>
          
          {/* App/Play Store Buttons */}
          <div className="flex gap-2 mt-3">
            {platforms.includes('ios') && (
              <Link 
                href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=ios`}
                className="flex-1 bg-[#191b3f] border border-gray-800 text-white py-1.5 px-3 rounded-lg text-xs hover:bg-[#232655] transition-all flex items-center justify-center"
              >
                <i className="fa-brands fa-apple mr-2"></i>
                App Store
              </Link>
            )}
            {platforms.includes('android') && (
              <Link 
                href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=android`}
                className="flex-1 bg-[#191b3f] border border-gray-800 text-white py-1.5 px-3 rounded-lg text-xs hover:bg-[#232655] transition-all flex items-center justify-center"
              >
                <i className="fa-solid fa-play mr-2"></i>
                Play Store
              </Link>
            )}
          </div>
        </div>

      </div>

      {isPreviewOpen && (
        <MobilePreviewModal 
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          projectUrl={previewUrl}
          projectTitle={title}
          imageUrl={id === 'fittrack' ? '/AppUI/FitTrackPro/FitTrackPro.JPG' : id === 'travelcompanion' ? undefined : `https://storage.googleapis.com/uxpilot-auth.appspot.com/${imageId}`}
        />
      )}
    </>
  );
} 