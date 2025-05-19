'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white font-bold text-xl mb-4 md:mb-0">IMAK.UK</div>
          <div className="text-gray-400 text-sm">© {new Date().getFullYear()} IMAK Developer. All rights reserved.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 