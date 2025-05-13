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

  return (
    <>
      <div className="group bg-[#0F0F23] rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all">
        {/* Image Section */}
        <div className="relative h-[400px]">
          <Image 
            src={image}
            alt={appName}
            fill
            className="w-full h-full object-cover"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F23] via-[#0F0F23]/70 to-transparent"></div>
          
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-6 left-6">
              <span className="bg-purple-500/10 text-purple-300 text-xs py-1 px-3 rounded-full border border-purple-500/20">
                Featured Project
              </span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{appName}</h3>
              <p className="text-gray-400 leading-relaxed">{description}</p>
            </div>
            <span className="text-purple-400 text-2xl transform group-hover:rotate-45 transition-transform">
              <i className="fa-solid fa-arrow-up-right"></i>
            </span>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {tags.map((tag, index) => {
              let icon = 'fa-code';
              if (tag.toLowerCase().includes('react')) {
                icon = 'fa-brands fa-react';
              } else if (tag.toLowerCase().includes('firebase')) {
                icon = 'fa-solid fa-fire';
              } else if (tag.toLowerCase().includes('machine')) {
                icon = 'fa-solid fa-brain';
              } else if (tag.toLowerCase().includes('swift')) {
                icon = 'fa-brands fa-swift';
              } else if (tag.toLowerCase().includes('flutter')) {
                icon = 'fa-brands fa-flutter';
              }
              
              return (
                <span key={index} className="tech-tag bg-transparent border border-purple-500/30 px-3 py-1 rounded-full text-purple-200 text-sm">
                  <i className={`${icon} mr-2`}></i>
                  {tag}
                </span>
              );
            })}
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleOpenPreview}
              className="button w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#7c4fe0] hover:to-[#d9418a] transition-all flex items-center justify-center"
            >
              <i className="fa-solid fa-eye mr-2"></i>
              Live Preview
              <i className="fa-solid fa-arrow-right ml-3"></i>
            </button>
            
            <div className="flex gap-4 mt-4 button-container">
              {platforms.includes('ios') && (
                <Link 
                  href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=ios`}
                  className="button flex-1 bg-transparent border border-[rgba(139,92,246,0.5)] text-[#A78BFA] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(139,92,246,0.1)] transition-all flex items-center justify-center"
                >
                  <i className="fa-brands fa-apple mr-2"></i>
                  App Store
                </Link>
              )}
              {platforms.includes('android') && (
                <Link 
                  href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=android`}
                  className="button flex-1 bg-transparent border border-[rgba(100,116,139,0.5)] text-[#94A3B8] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(100,116,139,0.1)] transition-all flex items-center justify-center"
                >
                  <i className="fa-brands fa-google-play mr-2"></i>
                  Play Store
                </Link>
              )}
            </div>
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