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
}

export default function FeaturedProjectCard({
  id,
  title,
  description,
  image,
  imageId,
  tags,
  platforms,
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

  return (
    <>
      <div className="w-full bg-[#1A1A4A] rounded-xl overflow-hidden transition-all group">
        {/* Background and Image */}
        <div className="relative h-[240px] bg-gradient-to-b from-[#27234B] to-[#1A1A4A]">
          <Image
            src={image}
            alt={appName}
            fill
            className="object-contain p-4"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A4A] via-[#1A1A4A]/50 to-transparent pointer-events-none"></div>
          
          {/* Text Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-6 text-left">
            <h2 className="text-2xl font-bold text-white mb-1">{appName}</h2>
            <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
        
        {/* Tags Section */}
        <div className="p-4 pb-0">
          <div className="flex flex-wrap gap-3 mb-5">
            {tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-sm bg-[#322E5C] text-purple-200 py-1.5 px-4 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Buttons Section */}
        <div className="p-4 pt-0">
          {/* Live Preview Button */}
          <button 
            onClick={handleOpenPreview}
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center"
          >
            <i className="fa-regular fa-eye mr-2"></i>
            Live Preview
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </button>
          
          {/* App/Play Store Buttons */}
          <div className="flex gap-3 mt-4 justify-center">
            {platforms.includes('ios') && (
              <Link 
                href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=ios`}
                className="bg-[#0D0D1A] border border-gray-800 text-white py-2 px-4 rounded-lg text-sm hover:bg-[#151530] transition-all flex items-center justify-center flex-1"
              >
                <i className="fa-brands fa-apple mr-2"></i>
                App Store
              </Link>
            )}
            {platforms.includes('android') && (
              <Link 
                href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=android`}
                className="bg-[#0D0D1A] border border-gray-800 text-white py-2 px-4 rounded-lg text-sm hover:bg-[#151530] transition-all flex items-center justify-center flex-1"
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
          projectUrl={`/preview?image=${imageId}&project=${encodeURIComponent(title)}`}
          projectTitle={title}
          imageUrl={`https://storage.googleapis.com/uxpilot-auth.appspot.com/${imageId}`}
        />
      )}
    </>
  );
} 