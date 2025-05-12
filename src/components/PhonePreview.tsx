'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

interface PhonePreviewProps {
  url: string;
  imageUrl?: string;
}

const PhonePreview = ({ url, imageUrl }: PhonePreviewProps) => {
  const phoneRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        ref={phoneRef} 
        className="phone-container w-[280px] h-[560px] bg-black rounded-[36px] border-4 border-gray-800 relative shadow-2xl shadow-purple-500/20"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-xl" />
        <div className="w-full h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-gray-900 to-black">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt="Mobile app preview" 
              className="w-full h-full object-cover"
              width={280}
              height={560}
            />
          ) : (
            <iframe 
              src={url} 
              className="w-full h-full border-0" 
              title="Mobile preview"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PhonePreview; 