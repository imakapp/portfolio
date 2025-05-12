'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Crafting</span> 
                <span className="relative">
                  exceptional
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-500"></span>
                </span> 
                mobile experiences
              </h1>
              <p className="text-gray-300 text-xl mb-8">I transform complex ideas into intuitive, beautiful mobile applications that users love to engage with.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects" className="button primary-button">
                  View My Work
                  <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <a href="https://www.upwork.com/freelancers/~019779b29316047eb1?mp_source=share" target="_blank" className="button secondary-button">
                  <i className="fa-brands fa-upwork mr-2"></i>
                  Hire Me on Upwork
                </a>
              </div>
            </div>
            <div className="relative h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  ref={phoneRef}
                  className="w-[280px] h-[560px] bg-black rounded-[36px] border-4 border-gray-800 relative shadow-2xl shadow-purple-500/20 phone-container"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-xl"></div>
                  <div className="w-full h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-gray-900 to-black">
                    <Image 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0f177d83fc-1f8ede5823132e067399.png" 
                      alt="Mobile app UI design"
                      className="w-full h-full object-cover"
                      width={280}
                      height={560}
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-500 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-gray-900 py-20 relative">
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
          
          <div className="overflow-x-auto hide-scrollbar -mx-6 px-6">
            <div className="project-slider flex gap-6 py-4 min-w-max">
              {/* Project Card 1 */}
              <div className="project-card w-[340px] bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all">
                <div className="h-[380px] relative overflow-hidden group">
                  <Image 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ecfac37664-aaf002540768427d81c6.png" 
                    alt="FitTrack Pro" 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    width={340}
                    height={380}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">FitTrack Pro</h3>
                    <p className="text-gray-300 mb-4">Fitness tracking app with AI-powered workout recommendations</p>
                    <div className="flex gap-3">
                      <span className="tech-tag">React Native</span>
                      <span className="tech-tag">Firebase</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <Link href="/preview?image=ecfac37664-aaf002540768427d81c6.png&project=FitTrack+Pro" className="button primary-button w-full">
                    <i className="fa-solid fa-play"></i>
                    Live Preview
                  </Link>
                  <div className="flex gap-3">
                    <Link href="/preview?image=ecfac37664-aaf002540768427d81c6.png&project=FitTrack+Pro" className="button app-store-button flex-1">
                      <i className="fa-brands fa-apple text-xl"></i>
                    </Link>
                    <Link href="/preview?image=ecfac37664-aaf002540768427d81c6.png&project=FitTrack+Pro" className="button play-store-button flex-1">
                      <i className="fa-brands fa-google-play text-xl"></i>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Project Card 2 */}
              <div className="project-card w-[340px] bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all">
                <div className="h-[380px] relative overflow-hidden group">
                  <Image 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2bb554b93d-077ccd5a2cfb0b1469f9.png" 
                    alt="WealthWise" 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    width={340}
                    height={380}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">WealthWise</h3>
                    <p className="text-gray-300 mb-4">Personal finance management with investment tracking</p>
                    <div className="flex gap-3">
                      <span className="tech-tag">Flutter</span>
                      <span className="tech-tag">GraphQL</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <Link href="/preview?image=2bb554b93d-077ccd5a2cfb0b1469f9.png&project=WealthWise" className="button primary-button w-full">
                    <i className="fa-solid fa-play"></i>
                    Live Preview
                  </Link>
                  <div className="flex gap-3">
                    <Link href="/preview?image=2bb554b93d-077ccd5a2cfb0b1469f9.png&project=WealthWise" className="button app-store-button flex-1">
                      <i className="fa-brands fa-apple text-xl"></i>
                    </Link>
                    <Link href="/preview?image=2bb554b93d-077ccd5a2cfb0b1469f9.png&project=WealthWise" className="button play-store-button flex-1">
                      <i className="fa-brands fa-google-play text-xl"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/projects" className="button primary-button inline-flex items-center text-center">
              View All Projects
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
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
              <a href="https://www.upwork.com/freelancers/~019779b29316047eb1?mp_source=share" className="button secondary-button flex items-center justify-center" target="_blank">
                <i className="fa-brands fa-upwork mr-2"></i>
                Hire Me on Upwork
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 