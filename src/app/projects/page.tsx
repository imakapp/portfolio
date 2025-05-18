'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import ProjectCard from '@/components/ProjectCard';
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
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">My Projects</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore my portfolio of mobile and web applications, featuring UI/UX design and development work
            </p>

            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Projects
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'ios' ? 'active' : ''}`}
                onClick={() => setActiveFilter('ios')}
              >
                <i className="fa-brands fa-apple mr-2"></i>
                iOS Projects
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'android' ? 'active' : ''}`}
                onClick={() => setActiveFilter('android')}
              >
                <i className="fa-brands fa-android mr-2"></i>
                Android Projects
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map(project => (
              <ProjectCard 
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                imageId={project.imageId}
                tags={project.tags}
                platforms={project.platforms}
                featured={project.featured}
                appStore={project.appStore}
                playStore={project.playStore}
              />
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
                    <i className="fa-solid fa-arrow-down"></i>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
} 