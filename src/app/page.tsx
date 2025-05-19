'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import FeaturedProjectCard from '@/components/FeaturedProjectCard';
import { projectsData } from '@/data/projects';

// Get featured projects for the home page
const featuredProjects = projectsData.filter(project => project.featured || project.latest).slice(0, 4);

export default function Home() {
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
      phoneContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32 pb-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,40,200,0.15),transparent_40%)]"></div>
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white max-w-xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 block">Crafting</span> 
                <span className="relative inline-block">
                  exceptional
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-500"></span>
                </span> 
                <span className="block">mobile</span>
                <span className="block">experiences</span>
              </h1>
              <p className="text-gray-300 text-xl mb-8">I transform complex ideas into intuitive, beautiful mobile applications that users love to engage with.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects" className="button primary-button">
                  View My Work
                  <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px]" data-aos="fade-left">
              <div id="phone-mockup" className="absolute inset-0 flex items-center justify-center">
                <div 
                  ref={phoneRef}
                  className="w-[380px] h-[760px] bg-black rounded-[36px] border-4 border-purple-500/30 relative shadow-2xl shadow-purple-500/20 phone-container backdrop-blur-xl"
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-xl flex items-center justify-center">
                    <div className="w-16 h-4 bg-gray-900 rounded-full mt-2 flex items-center px-2">
                      <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                      <div className="w-6 h-1 bg-gray-800 rounded-full ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute -right-3 top-20 w-1 h-8 bg-purple-500/30 rounded-l-lg"></div>
                  <div className="absolute -left-3 top-16 w-1 h-6 bg-purple-500/30 rounded-r-lg"></div>
                  <div className="absolute -left-3 top-24 w-1 h-10 bg-purple-500/30 rounded-r-lg"></div>
                  <div className="w-full h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-gray-900 to-black relative">
                    <Image 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/31fad7e9ae-c7954902137019f36dfc.png" 
                      alt="Mobile app UI design"
                      className="w-full h-full object-cover transform scale-105"
                      width={280}
                      height={560}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute bottom-6 left-0 w-full px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <i className="text-purple-400 fa-solid fa-play"></i>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <i className="text-purple-400 fa-solid fa-heart"></i>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center pulse-animation">
                          <i className="text-white fa-solid fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-500 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>

      {/* Featured Projects Section */}
      <section id="portfolio" className="bg-black py-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
              <p className="text-gray-400 max-w-xl">Explore a selection of my most impactful mobile applications, each designed with purpose and precision.</p>
            </div>
            <Link href="/projects" className="hidden md:flex button outline-button items-center justify-center">
              View All Projects
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map(project => (
              <FeaturedProjectCard 
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

          <div className="mt-16 text-center">
            <Link href="/projects" className="button primary-button inline-flex items-center text-center">
              View More Projects
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section id="skills" className="bg-black py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,40,200,0.15),transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical Expertise</h2>
            <p className="text-gray-400 max-w-xl mx-auto">I leverage cutting-edge technologies to create seamless, high-performing mobile applications.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* UI/UX Design */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-pink-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-pen-ruler"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">UI/UX Design</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">HTML</span>
                <span className="tech-tag">CSS</span>
                <span className="tech-tag">JavaScript</span>
              </div>
            </div>
            
            {/* Flutter */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-blue-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-flutter"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Flutter</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">Dart</span>
                <span className="tech-tag">Material 3</span>
              </div>
            </div>
            
            {/* React Native */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-purple-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-react"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">React Native</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">TypeScript</span>
              </div>
            </div>
            
            {/* Swift */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-blue-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-swift"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Swift</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">SwiftUI</span>
                <span className="tech-tag">UIKit</span>
              </div>
            </div>
            
            {/* Kotlin */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-green-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-android"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Kotlin</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">Jetpack</span>
                <span className="tech-tag">Material</span>
              </div>
            </div>
            
            {/* Backend Frameworks */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-yellow-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-yellow-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-server"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Backend Frameworks</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">Express.js</span>
                <span className="tech-tag">Node.js</span>
              </div>
            </div>
            
            {/* REST APIs */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-blue-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-code"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">REST APIs</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">GraphQL</span>
                <span className="tech-tag">WebSockets</span>
              </div>
            </div>
            
            {/* Database & Cloud */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-green-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-database"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Database & Cloud</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Firebase</span>
              </div>
            </div>
            
            {/* Supabase */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-blue-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-database"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Supabase</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">Redis</span>
              </div>
            </div>
            
            {/* Frontend */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-cyan-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-cyan-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-react"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Frontend</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Next.js</span>
              </div>
            </div>
            
            {/* Redux */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-blue-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-code"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Redux</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">Tailwind CSS</span>
                <span className="tech-tag">TypeScript</span>
              </div>
            </div>
            
            {/* Authentication & Security */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-red-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-lock"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Authentication & Security</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">JWT</span>
                <span className="tech-tag">OAuth2</span>
                <span className="tech-tag">Firebase Auth</span>
              </div>
            </div>
            
            {/* DevOps */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-orange-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-gears"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">DevOps</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">CI/CD Pipeline</span>
              </div>
            </div>
            
            {/* Docker */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-blue-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-docker"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Docker</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">Kubernetes</span>
                <span className="tech-tag">GitHub Actions</span>
              </div>
            </div>
            
            {/* AI & ML */}
            <div className="bg-gray-900/70 p-8 rounded-xl hover:bg-gray-800/70 transition-all text-center group">
              <div className="w-16 h-16 bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-9 h-9 bg-purple-600/70 text-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-brain"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">AI & ML</h3>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="tech-tag">OpenAI API</span>
                <span className="tech-tag">Google Cloud AI</span>
                <span className="tech-tag">AWS ML</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section id="process" className="bg-gray-900 py-20 relative">
        <div className="container mx-auto px-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">My Development Process</h2>
            <p className="text-gray-400 mb-12">A strategic approach to transforming concepts into exceptional mobile experiences.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* UI/UX & Design */}
              <div className="bg-gray-900/70 border border-gray-800 p-8 rounded-xl hover:border-purple-500/30 transition-all">
                <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-5">
                  <div className="w-9 h-9 bg-purple-600/70 text-white rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">UI/UX & Design</h3>
                <p className="text-gray-300 mb-6">Creating intuitive, visually stunning interfaces that prioritize user experience while aligning with brand identity.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">User research & persona development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">Wireframing & information architecture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">Visual design & interactive prototyping</span>
                  </li>
                </ul>
              </div>
              
              {/* Backend & Database Setup */}
              <div className="bg-gray-900/70 border border-gray-800 p-8 rounded-xl hover:border-purple-500/30 transition-all">
                <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-5">
                  <div className="w-9 h-9 bg-purple-600/70 text-white rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-code"></i>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Backend & Database Setup</h3>
                <p className="text-gray-300 mb-6">Building robust, scalable server architecture and database systems that power your application securely and efficiently.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">API development & implementation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">Database design & optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">Security implementation & testing</span>
                  </li>
                </ul>
              </div>
              
              {/* Mobile App & Admin Panel */}
              <div className="bg-gray-900/70 border border-gray-800 p-8 rounded-xl hover:border-purple-500/30 transition-all">
                <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-5">
                  <div className="w-9 h-9 bg-purple-600/70 text-white rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-mobile-screen"></i>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Mobile App & Admin Panel</h3>
                <p className="text-gray-300 mb-6">Developing feature-rich mobile applications with powerful admin panels for complete control and management.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">Cross-platform compatibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">Responsive admin dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">Integration of analytics & reporting</span>
                  </li>
                </ul>
              </div>
              
              {/* Testing & Deployment */}
              <div className="bg-gray-900/70 border border-gray-800 p-8 rounded-xl hover:border-purple-500/30 transition-all">
                <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-5">
                  <div className="w-9 h-9 bg-purple-600/70 text-white rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-rocket"></i>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Testing & Deployment</h3>
                <p className="text-gray-300 mb-6">Ensuring thorough quality assurance and smooth deployment of both admin panels and mobile applications.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">Comprehensive testing across devices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">App store submission & optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-check text-purple-500 mt-1"></i>
                    <span className="text-gray-300">Server deployment & continuous integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-gradient-to-br from-purple-900 via-black to-gray-900 py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,40,200,0.3),transparent_70%)]"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Something Amazing?</h2>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">Let's collaborate to build a mobile experience that delights your users and drives your business forward.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="button primary-button flex items-center justify-center group">
                Start a Project
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 