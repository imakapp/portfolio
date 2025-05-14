'use client';

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import Image from 'next/image';

interface MobilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectUrl: string;
  projectTitle: string;
  imageUrl?: string;
}

const MobilePreviewModal = ({ 
  isOpen, 
  onClose, 
  projectUrl, 
  projectTitle, 
  imageUrl 
}: MobilePreviewModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const [scale, setScale] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  // Set mounted state when component mounts
  useEffect(() => {
    setMounted(true);
    
    // Register escape key listener
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Only add event listener when modal is open
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Don't render anything until mounted and modal is open
  if (!mounted || !isOpen) return null;

  const toggleOrientation = () => {
    setIsPortrait(!isPortrait);
  };

  const zoomIn = () => {
    setScale((prev: number) => Math.min(prev + 0.1, 1.5));
  };

  const zoomOut = () => {
    setScale((prev: number) => Math.max(prev - 0.1, 0.6));
  };

  const sharePreview = () => {
    if (navigator.share) {
      navigator.share({
        title: `${projectTitle} - Mobile Preview`,
        url: projectUrl
      }).catch((err: Error) => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(projectUrl);
      alert('URL copied to clipboard!');
    }
  };

  const takeScreenshot = () => {
    // In a real implementation, this would use html2canvas or a similar library
    alert('Screenshot feature would capture the current device view');
  };

  // Format time for status bar
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  
  const deviceContainerStyles = {
    transform: `scale(${scale})`,
    width: isPortrait ? '360px' : '640px',
    height: isPortrait ? '640px' : '360px',
    transition: 'width 0.3s ease, height 0.3s ease, transform 0.2s ease'
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="relative flex items-center animate-fade-in" 
      >
        {/* Mobile Device Frame */}
        <div 
          style={deviceContainerStyles} 
          className="bg-black rounded-[36px] border-4 border-gray-800 relative overflow-hidden"
        >
          {/* Notch / Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-xl z-10" />
          
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-[44px] px-6 flex justify-between items-center z-[5] bg-black/50 backdrop-blur-sm">
            <div className="text-white text-xs font-medium">{currentTime}</div>
            <div className="flex space-x-1.5">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0-10c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
                <path d="M6.18 7.82a7.915 7.915 0 0 0-2.24 5.62c0 4.41 3.58 8 7.99 8 1.98 0 3.81-.73 5.21-1.93l-1.42-1.42a5.956 5.956 0 0 1-3.8 1.35c-3.31 0-6-2.69-6-6 0-1.4.5-2.68 1.31-3.69l-1.05-.93z" />
                <path d="M17.79 7.21c.7.98 1.2 2.11 1.2 3.37 0 1.02-.29 1.96-.78 2.77l1.28 1.13c.73-1.14 1.15-2.47 1.15-3.89 0-1.57-.53-3.03-1.43-4.2l-1.42.82z" />
              </svg>
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <svg className="w-5 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z" />
              </svg>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="w-full h-full rounded-[30px] bg-white overflow-auto">
            {imageUrl ? (
              <Image 
                src={imageUrl} 
                alt="Mobile app preview" 
                className="w-full h-full object-cover"
                width={640}
                height={640}
                priority
              />
            ) : (
              <iframe 
                src={projectUrl} 
                className="w-full h-full border-0" 
                title="Mobile preview"
              />
            )}
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-500 rounded-full z-10" />
        </div>
        
        {/* Controls Panel */}
        <div className="bg-gray-900/90 rounded-2xl p-2 ml-6 border border-gray-800 flex flex-col gap-5">
          <button 
            onClick={toggleOrientation}
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
            aria-label="Rotate device"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          
          <button 
            onClick={zoomIn}
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
            aria-label="Zoom in"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3h-6" />
            </svg>
          </button>
          
          <button 
            onClick={zoomOut}
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
            aria-label="Zoom out"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          
          <button 
            onClick={sharePreview}
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
            aria-label="Share"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          
          <button 
            onClick={takeScreenshot}
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
            aria-label="Take screenshot"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobilePreviewModal; 