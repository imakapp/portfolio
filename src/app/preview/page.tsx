'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

function PreviewContent() {
  const searchParams = useSearchParams();
  const imageId = searchParams.get('image');
  const projectName = searchParams.get('project');
  const platform = searchParams.get('platform');
  
  const [imageUrl, setImageUrl] = useState<string>('');
  
  useEffect(() => {
    if (imageId) {
      setImageUrl(`https://storage.googleapis.com/uxpilot-auth.appspot.com/${imageId}`);
    }
  }, [imageId]);

  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <Link href="/projects" className="text-gray-400 hover:text-purple-400 transition-colors inline-flex items-center mb-6">
              <i className="fa-solid fa-arrow-left mr-2"></i>
              Back to Projects
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {projectName || 'App Preview'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mt-2 text-2xl">
                {platform === 'ios' ? 'iOS App' : platform === 'android' ? 'Android App' : 'Mobile App'}
              </span>
            </h1>
            
            <div className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 mt-8">
              <h2 className="text-xl font-bold text-white mb-4">Interactive Preview</h2>
              <p className="text-gray-300 mb-4">
                This preview gives you a close look at how the app appears on a mobile device. 
                Move your mouse over the phone to see the 3D effect.
              </p>
              <div className="flex gap-3 flex-wrap">
                <span className="tech-tag">Responsive Design</span>
                <span className="tech-tag">Interactive UI</span>
                <span className="tech-tag">Cross-Platform</span>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/projects" 
                className="button primary-button inline-flex items-center"
              >
                Back to Projects
                <i className="fa-solid fa-arrow-left ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Preview() {
  return (
    <PageLayout>
      <Suspense>
        <PreviewContent />
      </Suspense>
    </PageLayout>
  );
} 