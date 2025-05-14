'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Joystick } from 'react-joystick-component';

interface PhonePreviewProps {
  url: string;
  imageUrl?: string;
}

const PhonePreview = ({ url, imageUrl }: PhonePreviewProps) => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const handleJoystickMove = (e: any) => {
    if (!e.direction) return;
    setPosition(prev => {
      const step = 20;
      let { x, y } = prev;
      switch (e.direction) {
        case 'FORWARD':
          y -= step;
          break;
        case 'BACKWARD':
          y += step;
          break;
        case 'LEFT':
          x -= step;
          break;
        case 'RIGHT':
          x += step;
          break;
        default:
          break;
      }
      return { x, y };
    });
  };

  const handleJoystickStop = () => {
    // No action needed for now
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-row gap-6">
      {/* Joystick on the left */}
      <div className="hidden sm:flex flex-col items-center justify-center">
        <Joystick
          size={80}
          baseColor="#23272f"
          stickColor="#8B5CF6"
          move={handleJoystickMove}
          stop={handleJoystickStop}
        />
      </div>
      {/* Phone Preview */}
      <div 
        ref={phoneRef} 
        className="phone-container w-[390px] h-[844px] bg-black rounded-[36px] border-4 border-gray-800 relative"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-xl" />
        <div className="w-full h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-gray-900 to-black">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt="Mobile app preview" 
              className="w-full h-full object-cover"
              width={390}
              height={844}
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