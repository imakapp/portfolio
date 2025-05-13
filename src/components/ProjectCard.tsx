'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  imageId: string;
  tags: string[];
  platforms: string[];
  featured?: boolean;
  latest?: boolean;
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
  latest = false,
  appStore,
  playStore
}: ProjectCardProps) => {
  // Extract just the app name without any additional text
  const appName = title.split(':')[0].trim();
  
  return (
    <div className="group bg-[#0F0F23] rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all">
      <div className="relative h-[400px]">
        <Image 
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          width={400}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F23] via-[#0F0F23]/70 to-transparent"></div>
        <div className="absolute top-6 left-6">
          {featured && (
            <span className="bg-purple-500/10 text-purple-300 text-xs py-1 px-3 rounded-full border border-purple-500/20">
              Featured Project
            </span>
          )}
          {latest && (
            <div className="mt-2">
              <span className="bg-pink-500/20 text-pink-300 text-xs py-1 px-3 rounded-full">
                Latest Project
              </span>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{appName}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <Link 
          href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}`} 
          className="button w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#7c4fe0] hover:to-[#d9418a] transition-all flex items-center justify-center"
        >
          <i className="fa-solid fa-eye mr-2"></i>
          Live Preview
          <i className="fa-solid fa-arrow-right ml-3"></i>
        </Link>
        <div className="flex gap-4 mt-4">
          {platforms.includes('ios') && (
            id === 'vytal' && appStore ? (
              <a 
                href={appStore} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="button flex-1 bg-transparent border border-[#654fa3] text-[#654fa3] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(139,92,246,0.1)] transition-all flex items-center justify-center"
              >
                <i className="fa-brands fa-apple mr-2"></i>
                App Store
              </a>
            ) : (
              <Link 
                href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=ios`} 
                className="button flex-1 bg-transparent border border-[#654fa3] text-[#654fa3] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(139,92,246,0.1)] transition-all flex items-center justify-center"
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
                className="button flex-1 bg-transparent border border-[#654fa3] text-[#654fa3] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(139,92,246,0.1)] transition-all flex items-center justify-center"
              >
                <i className="fa-brands fa-google-play mr-2"></i>
                Play Store
              </a>
            ) : (
              <Link 
                href={`/preview?image=${imageId}&project=${encodeURIComponent(title)}&platform=android`} 
                className="button flex-1 bg-transparent border border-[#654fa3] text-[#654fa3] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(139,92,246,0.1)] transition-all flex items-center justify-center"
              >
                <i className="fa-brands fa-google-play mr-2"></i>
                Play Store
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 