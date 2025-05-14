'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface PhonePreviewProps {
  url: string;
  imageUrl?: string;
}

const PhonePreview = ({ url, imageUrl }: PhonePreviewProps) => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const phoneContainer = phoneRef.current;
    
    if (!phoneContainer) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = phoneContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const angleX = (mouseY - centerY) / 30;
      const angleY = (centerX - mouseX) / 30;
      
      phoneContainer.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    };
    
    const handleMouseLeave = () => {
      phoneContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    phoneContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      phoneContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Pan logic
  const PAN_STEP = 50; // px per arrow click
  const handlePan = (dx: number, dy: number) => {
    setOffset((prev: { x: number; y: number }) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-6">
        {/* Phone */}
        <div 
          ref={phoneRef} 
          className="phone-container w-[390px] h-[844px] bg-black rounded-[36px] border-4 border-gray-800 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-xl" />
          <div 
            ref={contentRef}
            className="w-full h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-gray-900 to-black"
            style={{ position: 'relative' }}
          >
            {imageUrl ? (
              <Image 
                src={imageUrl} 
                alt="Mobile app preview" 
                className="w-full h-full object-cover"
                width={390 * 2}
                height={844 * 2}
                style={{
                  position: 'absolute',
                  left: offset.x,
                  top: offset.y,
                  transition: 'left 0.2s, top 0.2s',
                  minWidth: '100%',
                  minHeight: '100%',
                }}
              />
            ) : (
              <iframe 
                src={url} 
                className="w-full h-full border-0" 
                title="Mobile preview"
                style={{
                  position: 'absolute',
                  left: offset.x,
                  top: offset.y,
                  transition: 'left 0.2s, top 0.2s',
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
          </div>
        </div>
        {/* Navigation Arrows */}
        <div className="flex flex-col items-center gap-2 select-none">
          <button
            onClick={() => handlePan(0, PAN_STEP)}
            className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-purple-600 transition"
            aria-label="Up"
          >
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 15 12 9 18 15"/></svg>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handlePan(PAN_STEP, 0)}
              className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-purple-600 transition"
              aria-label="Left"
            >
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18"/></svg>
            </button>
            <div className="w-12 h-12" />
            <button
              onClick={() => handlePan(-PAN_STEP, 0)}
              className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-purple-600 transition"
              aria-label="Right"
            >
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
          </div>
          <button
            onClick={() => handlePan(0, -PAN_STEP)}
            className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-purple-600 transition"
            aria-label="Down"
          >
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview; 