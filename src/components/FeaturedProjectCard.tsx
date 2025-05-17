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
            <span className="bg-purple-500/20 text-purple-200 text-xs py-1 px-3 rounded-full border border-purple-500/30">
              Featured Project
            </span>
          </div>
          
          {/* Mobile Device Frame UI - styled to match screenshot */}
          <div className="relative bg-gradient-to-br from-[#2D3748] to-[#1E293B] rounded-[38px] shadow-xl border-4 border-[#23272f] overflow-hidden w-[200px] h-[420px] transition-transform hover:scale-[1.01] hover:rotate-1 hover:shadow-2xl hover:shadow-purple-500/20 translate-y-0 animate-float">
            {/* Notch / Dynamic Island */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-[#181C23] rounded-b-[18px] shadow-md z-10"></div>
            
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-10 flex justify-between items-center px-6 z-5 bg-[#0F172A80] backdrop-blur-md">
              <div className="text-white text-xs font-medium drop-shadow-md">{currentTime}</div>
              <div className="flex space-x-1">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" />
                </svg>
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" />
                </svg>
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                </svg>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="absolute inset-0 rounded-[32px] overflow-hidden bg-gradient-to-br from-[#23243a] to-[#181C23] shadow-inner shadow-purple-500/10 filter brightness-110 z-2">
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
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-[#444b5a] rounded-full opacity-70 z-10"></div>
            
            {/* Reflection effect */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 scale-y-[-1] w-4/5 h-10 bg-gradient-to-b from-white/10 to-transparent blur-md opacity-10 pointer-events-none z-1"></div>
            
            {/* Vignette effect */}
            <div className="pointer-events-none absolute inset-0 rounded-[38px] shadow-[0_0_120px_40px_#0F172A_inset,0_0_80px_20px_#1E293B_inset] z-[10]"></div>
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