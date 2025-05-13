'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { projectsData } from '@/data/projects';

export default function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ios') return project.platforms.includes('ios');
    if (activeFilter === 'android') return project.platforms.includes('android');
    return true;
  });
  
  const visibleProjects = showAllProjects 
    ? filteredProjects 
    : filteredProjects.slice(0, 3);

  return (
    <PageLayout>
      <main className="bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Project Gallery
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mt-2">Mobile App Portfolio</span>
              </h1>
              <p className="text-gray-400">Each project is a testament to my dedication to crafting exceptional mobile experiences that push the boundaries of design and functionality.</p>
            </div>
            
            <div className="flex gap-4 mt-6 md:mt-0">
              <button 
                className={`filter-btn button ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn button ${activeFilter === 'ios' ? 'active' : ''}`}
                onClick={() => setActiveFilter('ios')}
              >
                iOS
              </button>
              <button 
                className={`filter-btn button ${activeFilter === 'android' ? 'active' : ''}`}
                onClick={() => setActiveFilter('android')}
              >
                Android
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map(project => {
              // Extract just the app name without any additional text
              const appName = project.title.split(':')[0].trim();
              
              return (
                <div 
                  key={project.id} 
                  className="group bg-[#0F0F23] rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all"
                >
                  <div className="relative h-[480px]">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      width={400}
                      height={480}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F23] via-[#0F0F23]/70 to-transparent"></div>
                    {project.featured && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-purple-500/10 text-purple-300 text-xs py-1 px-3 rounded-full border border-purple-500/20">Featured Project</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full p-8">
                      <h3 className="text-3xl font-bold text-white mb-3">{appName}</h3>
                      <p className="text-gray-300 mb-6 text-lg">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="tech-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <Link 
                      href={`/preview?image=${project.imageId}&project=${encodeURIComponent(project.title)}`} 
                      className="button w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#7c4fe0] hover:to-[#d9418a] transition-all flex items-center justify-center"
                    >
                      <i className="fa-solid fa-eye mr-2"></i>
                      Live Preview
                      <i className="fa-solid fa-arrow-right ml-3"></i>
                    </Link>
                    <div className="flex gap-4 mt-4">
                      {project.platforms.includes('ios') && (
                        project.id === 'vytal' && project.appStore ? (
                          <a 
                            href={project.appStore} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="button flex-1 bg-transparent border border-[#654fa3] text-[#654fa3] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(139,92,246,0.1)] transition-all flex items-center justify-center"
                          >
                            <i className="fa-brands fa-apple mr-2"></i>
                            App Store
                          </a>
                        ) : (
                          <Link 
                            href={`/preview?image=${project.imageId}&project=${encodeURIComponent(project.title)}&platform=ios`} 
                            className="button flex-1 bg-transparent border border-[#654fa3] text-[#654fa3] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(139,92,246,0.1)] transition-all flex items-center justify-center"
                          >
                            <i className="fa-brands fa-apple mr-2"></i>
                            App Store
                          </Link>
                        )
                      )}
                      {project.platforms.includes('android') && (
                        project.id === 'vytal' && project.playStore ? (
                          <a 
                            href={project.playStore} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="button flex-1 bg-transparent border border-[#EC4899] text-[#EC4899] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(236,72,153,0.1)] transition-all flex items-center justify-center"
                          >
                            <i className="fa-brands fa-google-play mr-2"></i>
                            Play Store
                          </a>
                        ) : (
                          <Link 
                            href={`/preview?image=${project.imageId}&project=${encodeURIComponent(project.title)}&platform=android`} 
                            className="button flex-1 bg-transparent border border-[#EC4899] text-[#EC4899] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(236,72,153,0.1)] transition-all flex items-center justify-center"
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
            })}
          </div>

          {filteredProjects.length > 3 && (
            <div className="mt-16 flex justify-center">
              <button 
                className="button primary-button inline-flex items-center justify-center gap-2"
                onClick={() => setShowAllProjects(!showAllProjects)}
              >
                {showAllProjects ? (
                  <>
                    Show Less
                    <i className="fa-solid fa-arrow-up"></i>
                  </>
                ) : (
                  <>
                    View More Projects
                    <i className="fa-solid fa-arrow-right"></i>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
} 