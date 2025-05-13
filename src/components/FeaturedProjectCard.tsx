'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  tags,
  platforms,
}: FeaturedProjectCardProps) {
  return (
    <div className="w-full h-[280px] relative overflow-hidden rounded-xl group">
      {/* Project Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image}
          alt={title}
          width={400}
          height={280}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        {/* Platform Tags */}
        <div className="flex gap-2 mb-2">
          {platforms.includes('ios') && (
            <span className="text-xs bg-gray-800/80 py-1 px-2 rounded-full flex items-center">
              <i className="fa-brands fa-apple mr-1"></i> iOS
            </span>
          )}
          {platforms.includes('android') && (
            <span className="text-xs bg-gray-800/80 py-1 px-2 rounded-full flex items-center">
              <i className="fa-brands fa-android mr-1"></i> Android
            </span>
          )}
        </div>
        
        {/* Project Title */}
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="text-xs bg-purple-500/20 text-purple-300 py-1 px-2 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Preview Button */}
        <Link href={`/projects/${id}`} className="button primary-button-sm w-full py-2 text-center text-sm flex justify-center items-center">
          View Details
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </Link>
      </div>
    </div>
  );
} 