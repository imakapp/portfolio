'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobilePreviewModal from './MobilePreviewModal';
import { MobileFrame } from './mobile-frame';

interface ProjectCardProps {
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

const ProjectCard = ({
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
}: ProjectCardProps) => {
  // Extract just the app name without any additional text
  const appName = title.split(':')[0].trim();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const handleOpenPreview = (e: React.MouseEvent) => {
    // Prevent navigation
    e.preventDefault();
    e.stopPropagation();
    setIsPreviewOpen(true);
  };
  
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };
  
  // Define a special URL for FitTrack Pro, EduLearn, and TravelCompanion
  const previewUrl = id === 'fittrack' 
    ? '@FitTrackPro'  // Use special tag for FitTrack Pro
    : id === 'edulearn'
    ? '@EduLearn'  // Use special tag for EduLearn
    : id === 'travelcompanion'
    ? '@TravelCompanion' // Use special tag for TravelCompanion
    : `/preview?image=${imageId}&project=${encodeURIComponent(title)}`;
  
  return (
    <>
      <div className="group bg-[#282562] rounded-2xl overflow-hidden border border-purple-500/30 hover:border-purple-500/70 transition-all">
        <div className="relative h-[400px] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <MobileFrame scale={0.65} isPortrait={true}>
              <div className="relative w-full h-full" style={{ minHeight: 0, minWidth: 0 }}>
                <Image 
                  src={image}
                  alt={title}
                  fill
                  style={{ objectFit: 'cover', borderRadius: 32 }}
                  sizes="(max-width: 390px) 100vw, 390px"
                  priority={false}
                />
              </div>
            </MobileFrame>
          </div>
          <div className="absolute top-6 left-6">
            {featured && (
              <span className="bg-purple-500/20 text-purple-200 text-xs py-1 px-3 rounded-full border border-purple-500/30">
                Featured Project
              </span>
            )}
          </div>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{appName}</h3>
              <p className="text-gray-200 leading-relaxed">{description}</p>
            </div>
            <span className="text-purple-300 text-2xl transform group-hover:rotate-45 transition-transform">
              <i className="fa-solid fa-arrow-up-right"></i>
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag: string) => {
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
                <span key={tag} className="tech-tag bg-purple-500/20 border border-purple-500/40 px-3 py-1 rounded-full text-purple-100 text-sm">
                  <i className={`${icon} mr-2`}></i>
                  {tag}
                </span>
              );
            })}
          </div>
          
          <button 
            onClick={handleOpenPreview}
            className="button w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#7c4fe0] hover:to-[#d9418a] transition-all flex items-center justify-center"
          >
            <i className="fa-solid fa-eye mr-2"></i>
            Live Preview
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </button>
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
          imageUrl={id === 'fittrack' ? '/AppUI/FitTrackPro/FitTrackPro.JPG' : id === 'travelcompanion' ? undefined : `https://storage.googleapis.com/uxpilot-auth.appspot.com/${imageId}`}
        />
      )}
    </>
  );
};

export default ProjectCard;