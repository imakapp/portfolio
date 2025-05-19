'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobilePreviewModal from './MobilePreviewModal';
import { MobileFrame } from './mobile-frame';

interface FeaturedProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  imageId: string;
  tags: string[];
  platforms: string[];
  featured?: boolean;
  appStore?: string;
  playStore?: string;
}

export default function FeaturedProjectCard({
  id,
  title,
  description,
  image,
  imageId,
  tags,
  platforms,
  featured = false,
  appStore,
  playStore
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
  const previewUrl = id === 'edulearn' 
    ? '@EduLearn'  // Use special tag for EduLearn
    : `/preview?image=${imageId}&project=${encodeURIComponent(title)}`;

  return (
    <>
      <div className="relative group bg-[#282562] rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all shadow-xl">
        {/* App Screenshot */}
        <div className="relative h-[360px] flex flex-col justify-end items-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <MobileFrame scale={0.55} isPortrait={true}>
              <Image 
                src={image}
                alt={appName}
                fill
                className="object-cover"
              />
            </MobileFrame>
          </div>
        </div>
        
        {/* Button Section */}
        <div className="p-3">
          {/* Live Preview Button */}
          <button 
            onClick={handleOpenPreview}
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white py-2.5 px-6 rounded-lg font-medium hover:from-[#7c4fe0] hover:to-[#d9418a] transition-all flex items-center justify-center"
          >
            <i className="fa-regular fa-eye mr-2"></i>
            Live Preview
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </button>
          
          {/* App/Play Store Buttons */}
          <div className="flex gap-2 mt-3">
            {platforms.includes('ios') && (
              id === 'vytal' && appStore ? (
                <a 
                  href={appStore} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 bg-[#191b3f] border border-gray-800 text-white py-1.5 px-3 rounded-lg text-xs hover:bg-[#232655] transition-all flex items-center justify-center"
                >
                  <i className="fa-brands fa-apple mr-2"></i>
                  App Store
                </a>
              ) : (
                <Link 
                  href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=ios`}
                  className="flex-1 bg-[#191b3f] border border-gray-800 text-white py-1.5 px-3 rounded-lg text-xs hover:bg-[#232655] transition-all flex items-center justify-center"
                >
                  <i className="fa-brands fa-apple mr-2"></i>
                  App Store
                </Link>
              )
            )}
            {platforms.includes('android') && (
              id === 'vytal' && playStore ? (
                <a 
                  href={playStore} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 bg-[#191b3f] border border-gray-800 text-white py-1.5 px-3 rounded-lg text-xs hover:bg-[#232655] transition-all flex items-center justify-center"
                >
                  <i className="fa-solid fa-play mr-2"></i>
                  Play Store
                </a>
              ) : (
                <Link 
                  href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=android`}
                  className="flex-1 bg-[#191b3f] border border-gray-800 text-white py-1.5 px-3 rounded-lg text-xs hover:bg-[#232655] transition-all flex items-center justify-center"
                >
                  <i className="fa-solid fa-play mr-2"></i>
                  Play Store
                </Link>
              )
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
          imageUrl={`https://storage.googleapis.com/uxpilot-auth.appspot.com/${imageId}`}
        />
      )}
    </>
  );
} 