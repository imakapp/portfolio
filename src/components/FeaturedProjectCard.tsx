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

  return (
    <>
      <div className="w-full bg-[#1a1a4a] rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all group">
        {/* Project Image in Phone Frame */}
        <div className="relative h-[240px] flex items-center justify-center bg-gradient-to-br from-[#27234b] to-[#140f34]">
          <div className="relative w-[140px] h-[230px] overflow-hidden rounded-3xl border-8 border-gray-800 bg-black shadow-lg shadow-purple-500/20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-5 bg-black rounded-b-xl z-10"></div>
            <Image
              src={image}
              alt={title}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-500 rounded-full"></div>
          </div>
        </div>
        
        {/* Project Info */}
        <div className="p-5 pt-4 text-center">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-sm bg-purple-500/20 text-purple-300 py-1 px-3 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Live Preview Button */}
          <button 
            onClick={handleOpenPreview}
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white py-2.5 px-6 rounded-lg font-medium hover:from-[#7c4fe0] hover:to-[#d9418a] transition-all flex items-center justify-center"
          >
            <i className="fa-solid fa-eye mr-2"></i>
            Live Preview
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </button>
          
          {/* App/Play Store Buttons */}
          <div className="flex gap-3 mt-4 justify-center">
            {platforms.includes('ios') && (
              <Link 
                href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=ios`}
                className="bg-transparent border border-gray-700 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-800 transition-all flex items-center justify-center w-[110px]"
              >
                <i className="fa-brands fa-apple mr-2 text-white"></i>
                App Store
              </Link>
            )}
            {platforms.includes('android') && (
              <Link 
                href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=android`}
                className="bg-transparent border border-gray-700 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-800 transition-all flex items-center justify-center w-[110px]"
              >
                <i className="fa-brands fa-google-play mr-2 text-white"></i>
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