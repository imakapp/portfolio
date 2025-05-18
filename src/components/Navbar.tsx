'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const staticText = "HI, I'M AEJAZ KHAN. I SPECIALIZE IN ";
  const dynamicTexts = [
    "FULL STACK DEVELOPMENT",
    "MOBILE APP SOLUTIONS",
    "INTUITIVE USER INTERFACES",
    "POWERFUL ADMIN PANELS",
    "END-TO-END DIGITAL PRODUCTS"
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const typingSpeed = 70; // ms per character
    const deletingSpeed = 40; // ms per character
    const pauseAfterTyping = 1200; // ms to pause after full sentence
    const pauseAfterDeleting = 400; // ms to pause after deleting

    if (isTyping) {
      if (charIndex < dynamicTexts[currentTextIndex].length) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex + 1);
          setTypewriterText(dynamicTexts[currentTextIndex].substring(0, charIndex + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseAfterTyping);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex - 1);
          setTypewriterText(dynamicTexts[currentTextIndex].substring(0, charIndex - 1));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true);
          setCurrentTextIndex((currentTextIndex + 1) % dynamicTexts.length);
        }, pauseAfterDeleting);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, currentTextIndex, isTyping]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      <header className="fixed w-full z-50 bg-black bg-opacity-90 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-xl">
              {staticText}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {typewriterText}
              </span>
              {cursorVisible ? '|' : ''}
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/#hero" className="text-white hover:text-purple-400 transition-colors cursor-pointer">
                Home
              </Link>
              <Link href="/#skills" className="text-white hover:text-purple-400 transition-colors cursor-pointer">
                Skills
              </Link>
              <Link href="/#process" className="text-white hover:text-purple-400 transition-colors cursor-pointer">
                Process
              </Link>
              <Link href="/projects" className="text-white hover:text-purple-400 transition-colors cursor-pointer">
                Projects
              </Link>
            </nav>
            
            <button 
              className="md:hidden text-white" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col justify-center items-center">
          <button 
            className="absolute top-6 right-6 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
          <nav className="flex flex-col space-y-8 text-center">
            <Link 
              href="/#hero" 
              className="text-white hover:text-purple-400 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/#skills" 
              className="text-white hover:text-purple-400 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </Link>
            <Link 
              href="/#process" 
              className="text-white hover:text-purple-400 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </Link>
            <Link 
              href="/projects" 
              className="text-white hover:text-purple-400 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar; 