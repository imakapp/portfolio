'use client';

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { Joystick } from 'react-joystick-component';
import styles from './MobilePreviewModal.module.css';

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
  const [position, setPosition] = useState({ x: 0, y: 0 }); // joystick movement state
  const modalRef = useRef<HTMLDivElement>(null);
  // For HealthConnect Patient App interactive prototype navigation
  const [patientAppScreen, setPatientAppScreen] = useState<'splash' | 'dashboard'>('splash');
  // For FitTrack Pro interactive prototype navigation
  const [fitTrackScreen, setFitTrackScreen] = useState<'splash' | 'dashboard'>('splash');
  // Track current FitTrack Pro iframe src for joystick scrolling
  const [fitTrackIframeSrc, setFitTrackIframeSrc] = useState<string>('/AppUI/FitTrackPro/Splash.html');
  // For TravelCompanion interactive prototype navigation
  const [travelCompanionScreen, setTravelCompanionScreen] = useState<'splash' | 'home' | 'itinerary'>('splash');
  const [travelCompanionIframeSrc, setTravelCompanionIframeSrc] = useState<string>('/AppUI/TravelCompanion.html/index.html');
  
  // Determine if this is the FitTrack Pro special case
  const isFitTrackPro = projectUrl === '@FitTrackPro' || projectTitle === 'FitTrack Pro';
  // Determine if this is the EduLearn special case
  const isEduLearn = projectUrl === '@EduLearn' || projectTitle === 'EduLearn';
  // Determine if this is the TravelCompanion special case
  const isTravelCompanion = projectUrl === '@TravelCompanion' || projectTitle === 'TravelCompanion';

  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Set mounted state when component mounts
  useEffect(() => {
    setMounted(true);
    
    // Reset FitTrack Pro screen to splash every time modal is opened
    if (isOpen && isFitTrackPro) {
      setFitTrackScreen('splash');
      setFitTrackIframeSrc('/AppUI/FitTrackPro/Splash.html');
    }
    
    // Register escape key listener
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // If the projectUrl is '@FitTrackPro', this is a special case
    if (projectUrl === '@FitTrackPro' && projectTitle !== 'FitTrack Pro') {
      // Force the title to be FitTrack Pro
      projectTitle = 'FitTrack Pro';
    }
    
    // Only add event listener when modal is open
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      // Listen for FitTrack Pro navigation messages
      const handleMessage = (event: MessageEvent) => {
        if (isFitTrackPro && event.data && event.data.type === 'fittrackpro_navigate') {
          if (event.data.screen === 'dashboard') {
            setFitTrackScreen('dashboard');
            setFitTrackIframeSrc('/AppUI/FitTrackPro/Dashboard.html');
          }
          // Support navigation to other screens via postMessage
        }
      };
      window.addEventListener('message', handleMessage);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
        // Re-enable body scrolling when modal is closed
        document.body.style.overflow = '';
        window.removeEventListener('message', handleMessage);
      };
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, isFitTrackPro]);

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
    transition: 'transform 0.2s ease'
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Joystick handlers
  const handleJoystickMove = (e: any) => {
    if (!e.direction) return;
    const step = 40;
    let dx = 0, dy = 0;
    switch (e.direction) {
      case 'FORWARD': dy = -step; break;
      case 'BACKWARD': dy = step; break;
      case 'LEFT': dx = -step; break;
      case 'RIGHT': dx = step; break;
      default: break;
    }
    // If iframe is present, scroll its content
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.scrollBy(dx, dy);
      } catch (err) {}
    }
    // If image wrapper is present, scroll it
    if (contentWrapperRef.current) {
      contentWrapperRef.current.scrollBy({ left: dx, top: dy, behavior: 'smooth' });
    }
  };
  const handleJoystickStop = () => {};

  // --- ORIENTATION LOGIC ---
  // isPortrait: true = portrait, false = landscape
  // .landscapeMode class is applied to modal container and modalContent in landscape
  // .rotated class is applied to deviceFrame in landscape

  return (
    <div className={
      `${styles.modalContainer} ${styles.modalBackdrop} ${!isPortrait ? styles.landscapeMode : ''}`
    } onClick={handleBackdropClick} aria-modal="true" role="dialog">
      <div 
        ref={modalRef}
        className={`${styles.modalContent} ${!isPortrait ? styles.landscapeMode : ''}`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* Joystick on the left */}
        <div className={styles.joystickPanel}>
          <Joystick
            size={80}
            baseColor="#23272f"
            stickColor="#8B5CF6"
            move={handleJoystickMove}
            stop={handleJoystickStop}
          />
        </div>
        {/* Mobile Device Frame */}
        <div 
          style={deviceContainerStyles} 
          className={
            `${styles.deviceFrame} ${isPortrait ? styles.portrait : styles.landscape} ${styles.floating} ${!isPortrait ? styles.rotated : ''}`
          }
        >
          {/* Notch / Dynamic Island */}
          <div className={styles.deviceNotch} />
          {/* Status Bar */}
          <div className={styles.statusBar} style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className={styles.statusTime} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>{currentTime}</div>
            <div className={styles.statusIcons}>
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
          {/* Content Area (scrollable) */}
          <div
            ref={contentWrapperRef}
            className={styles.deviceScreen}
            style={{ WebkitOverflowScrolling: 'touch', fontFamily: 'Inter, sans-serif', padding: '0', boxSizing: 'border-box' }}
          >
            {projectTitle === 'HealthConnect Patient App' ? (
              <iframe
                ref={iframeRef}
                src={patientAppScreen === 'splash' ? '/AppUI/HealthConnectPatientApp/splash.html' : '/AppUI/HealthConnectPatientApp/dashboard.html'}
                className="w-full h-full border-0"
                title="HealthConnect Patient App Interactive Prototype"
              />
            ) : isFitTrackPro ? (
              <iframe
                ref={iframeRef}
                src={fitTrackIframeSrc}
                className="w-full h-full border-0"
                title="FitTrack Pro Interactive Prototype"
                onLoad={() => {
                  // Listen for navigation changes inside the iframe
                  if (iframeRef.current && iframeRef.current.contentWindow) {
                    try {
                      const iframePath = iframeRef.current.contentWindow.location.pathname;
                      if (iframePath.startsWith('/AppUI/FitTrackPro/')) {
                        setFitTrackIframeSrc(iframePath);
                      }
                    } catch (err) {}
                  }
                }}
              />
            ) : isEduLearn ? (
              <iframe
                ref={iframeRef}
                src="/AppUI/EduLearn/Onboarding.html"
                className="w-full h-full border-0"
                title="EduLearn Interactive Prototype"
              />
            ) : isTravelCompanion ? (
              <iframe
                ref={iframeRef}
                src={travelCompanionIframeSrc}
                className="w-full h-full border-0"
                title="TravelCompanion Interactive Prototype"
                onLoad={() => {
                  // Listen for navigation changes inside the iframe (future: postMessage or manual navigation)
                  if (iframeRef.current && iframeRef.current.contentWindow) {
                    try {
                      const iframePath = iframeRef.current.contentWindow.location.pathname;
                      if (iframePath.startsWith('/AppUI/TravelCompanion.html/')) {
                        setTravelCompanionIframeSrc(iframePath);
                      }
                    } catch (err) {}
                  }
                }}
              />
            ) : imageUrl ? (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Mobile app preview"
                  className="object-cover"
                  style={{ minWidth: '100%', minHeight: '100%' }}
                />
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={projectUrl}
                className="w-full h-full border-0"
                title="Mobile preview"
              />
            )}
          </div>
          {/* Navigation for HealthConnect Patient App */}
          {projectTitle === 'HealthConnect Patient App' && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              {patientAppScreen === 'dashboard' && (
                <button
                  onClick={() => setPatientAppScreen('splash')}
                  className={`${styles.controlButton} ${styles.interFont} ${styles.textShadow} bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition`}
                >
                  Back
                </button>
              )}
              {patientAppScreen === 'splash' && (
                <button
                  onClick={() => setPatientAppScreen('dashboard')}
                  className={`${styles.controlButton} ${styles.interFont} ${styles.textShadow} bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition`}
                >
                  Next
                </button>
              )}
            </div>
          )}
          {/* Home Indicator */}
          <div className={styles.homeIndicator} />
          {/* Reflection */}
          <div className={styles.reflection} />
        </div>
        {/* Controls Panel */}
        <div className={styles.controlsPanel} style={{ fontFamily: 'Inter, sans-serif' }}>
          <button 
            onClick={toggleOrientation}
            className={`${styles.controlButton} ${styles.modalButton} ${styles.interFont} ${styles.textShadow}`}
            aria-label="Rotate device"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          
          <button 
            onClick={zoomIn}
            className={`${styles.controlButton} ${styles.modalButton} ${styles.interFont} ${styles.textShadow}`}
            aria-label="Zoom in"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3h-6" />
            </svg>
          </button>
          
          <button 
            onClick={zoomOut}
            className={`${styles.controlButton} ${styles.modalButton} ${styles.interFont} ${styles.textShadow}`}
            aria-label="Zoom out"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          
          <button 
            onClick={sharePreview}
            className={`${styles.controlButton} ${styles.modalButton} ${styles.interFont} ${styles.textShadow}`}
            aria-label="Share"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          
          <button 
            onClick={takeScreenshot}
            className={`${styles.controlButton} ${styles.modalButton} ${styles.interFont} ${styles.textShadow}`}
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
          className={`${styles.closeButton} ${styles.interFont} ${styles.textShadow}`}
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Vignette and Particles */}
        <div className={styles.vignette} />
        <div className={styles.particles} />
      </div>
    </div>
  );
};

export default MobilePreviewModal; 