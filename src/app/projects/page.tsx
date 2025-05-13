'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

const projectsData = [
  {
    id: 'vytal',
    title: 'Vytal',
    description: 'Be the change. Every single day.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ecfac37664-aaf002540768427d81c6.png',
    imageId: 'ecfac37664-aaf002540768427d81c6.png',
    tags: ['Sustainability', 'Food & Drink', 'Reusable Packaging'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: true,
    latest: true,
    playStore: 'https://play.google.com/store/apps/details?id=com.vytal.vytalconsumerapp',
    appStore: 'https://apps.apple.com/us/app/vytal/id1476201142'
  },
  {
    id: 'vero',
    title: 'Vero - Smarter Drives. Powered by AI',
    description: 'Smarter driving experience powered by AI.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ecfac37664-aaf002540768427d81c6.png',
    imageId: 'ecfac37664-aaf002540768427d81c6.png',
    tags: ['React Native', 'Firebase', 'Machine Learning'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: true,
    latest: false
  },
  {
    id: 'edulearn',
    title: 'EduLearn: E-Learning Platform',
    description: 'Comprehensive e-learning platform for modern education.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2bb554b93d-077ccd5a2cfb0b1469f9.png',
    imageId: '2bb554b93d-077ccd5a2cfb0b1469f9.png',
    tags: ['Flutter', 'GraphQL', 'AWS'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: true,
    latest: true
  },
  {
    id: 'fooddash',
    title: 'FoodDash: Restaurant & Food Delivery Service',
    description: 'Restaurant and food delivery service app.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/71d137bc6c-9f5e0c36af283f7999d6.png',
    imageId: '71d137bc6c-9f5e0c36af283f7999d6.png',
    tags: ['Swift UI', 'ARKit', 'Core ML'],
    category: 'mobile',
    platforms: ['ios'],
    featured: true,
    latest: false
  },
  {
    id: 'fittrack-pro',
    title: 'FitTrack Pro: Fitness & Wellness Platform',
    description: 'A comprehensive fitness tracking application with AI-powered workout recommendations.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ecfac37664-aaf002540768427d81c6.png',
    imageId: 'ecfac37664-aaf002540768427d81c6.png',
    tags: ['React Native', 'Firebase', 'Machine Learning'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: true,
    latest: false
  },
  {
    id: 'travelcompanion',
    title: 'TravelCompanion: Travel & Hospitality Platform',
    description: 'Travel and hospitality platform for seamless journeys.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/462c96fa40-33b75d535524da8fbf78.png',
    imageId: '462c96fa40-33b75d535524da8fbf78.png',
    tags: ['Kotlin', 'MongoDB', 'AR Core'],
    category: 'mobile',
    platforms: ['android'],
    featured: false,
    latest: false
  },
  {
    id: 'eventhub',
    title: 'EventHub: Event Management Solution',
    description: 'Event management solution for organizers and attendees.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0f177d83fc-1f8ede5823132e067399.png',
    imageId: '0f177d83fc-1f8ede5823132e067399.png',
    tags: ['React Native', 'JavaScript', 'Redux'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: false,
    latest: false
  },
  {
    id: 'propertypulse',
    title: 'PropertyPulse: Comprehensive Real Estate Management System',
    description: 'Comprehensive real estate management system.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/71d137bc6c-9f5e0c36af283f7999d6.png',
    imageId: '71d137bc6c-9f5e0c36af283f7999d6.png',
    tags: ['Swift', 'HealthKit', 'CloudKit'],
    category: 'mobile',
    platforms: ['ios'],
    featured: false,
    latest: false,
    client: true
  },
  {
    id: 'healthconnect',
    title: 'HealthConnect: Telemedicine Platform with Admin Dashboard',
    description: 'Telemedicine platform with admin dashboard.',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0f177d83fc-1f8ede5823132e067399.png',
    imageId: '0f177d83fc-1f8ede5823132e067399.png',
    tags: ['React Native', 'JavaScript', 'Redux'],
    category: 'mobile',
    platforms: ['ios', 'android'],
    featured: false,
    latest: false
  }
];

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
            {visibleProjects.map(project => (
              <div 
                key={project.id} 
                className="group bg-[#0F0F23] rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all"
              >
                <div className="relative h-[400px]">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F23] via-[#0F0F23]/70 to-transparent"></div>
                  {project.featured && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-purple-500/10 text-purple-300 text-xs py-1 px-3 rounded-full border border-purple-500/20">Featured Project</span>
                    </div>
                  )}
                  {project.latest && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-pink-500/20 text-pink-300 text-sm py-1 px-4 rounded-full">Latest Project</span>
                    </div>
                  )}
                  {project.client && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-blue-500/20 text-blue-300 text-sm py-1 px-4 rounded-full">Client Project</span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4">
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
                        project.id === 'vytal' ? (
                          <a 
                            href={project.appStore} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="button flex-1 bg-transparent border border-[rgba(139,92,246,0.5)] text-[#A78BFA] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(139,92,246,0.1)] transition-all flex items-center justify-center"
                          >
                            <i className="fa-brands fa-apple mr-2"></i>
                            App Store
                          </a>
                        ) : (
                          <Link 
                            href={`/preview?image=${project.imageId}&project=${encodeURIComponent(project.title)}&platform=ios`} 
                            className="button flex-1 bg-transparent border border-[rgba(139,92,246,0.5)] text-[#A78BFA] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(139,92,246,0.1)] transition-all flex items-center justify-center"
                          >
                            <i className="fa-brands fa-apple mr-2"></i>
                            App Store
                          </Link>
                        )
                      )}
                      {project.platforms.includes('android') && (
                        project.id === 'vytal' ? (
                          <a 
                            href={project.playStore} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="button flex-1 bg-transparent border border-[rgba(236,72,153,0.5)] text-[#F472B6] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(236,72,153,0.1)] transition-all flex items-center justify-center"
                          >
                            <i className="fa-brands fa-google-play mr-2"></i>
                            Play Store
                          </a>
                        ) : (
                          <Link 
                            href={`/preview?image=${project.imageId}&project=${encodeURIComponent(project.title)}&platform=android`} 
                            className="button flex-1 bg-transparent border border-[rgba(100,116,139,0.5)] text-[#94A3B8] py-2 px-4 rounded-lg text-sm hover:bg-[rgba(100,116,139,0.1)] transition-all flex items-center justify-center"
                          >
                            <i className="fa-brands fa-google-play mr-2"></i>
                            Play Store
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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