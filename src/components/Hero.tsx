import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Download, Mail } from 'lucide-react';
import profileImg from './img/profile.jpg';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = useMemo(() => [
    'Full Stack Developer',
    'Software Engineer',
    'Mobile App Developer',
    'UI/UX Designer',
  ], []);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const currentRole = roles[currentIndex];
    let timer: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayText.length < currentRole.length) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 100);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 50);
    } else if (isDeleting && displayText.length === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % roles.length);
      }, 400);
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, roles]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-[100vh] flex items-center justify-center relative pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 animate-fade-in-up mx-auto">
          {/* Left Side: Picture */}
          <div className="flex-1 flex justify-center md:justify-end items-center mt-8 md:mt-0">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden relative group border-4 border-white dark:border-blue-500">
              <img src={profileImg} alt="Hasnain Aftab" className="w-full h-full object-cover rounded-full" />
              {/* Border shadow for both modes */}
              <div className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500 group-hover:scale-105
                shadow-[0_0_24px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_0_32px_8px_rgba(59,130,246,0.5),0_0_48px_16px_rgba(16,185,129,0.3)] dark:shadow-blue-600/40">
              </div>
            </div>
          </div>

          {/* Right Side: Text and Buttons */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left justify-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="block text-gray-900 dark:text-white">Hi, my name's</span>
              <span className="block bg-gradient-to-r from-blue-600 via-emerald-600 to-orange-500 bg-clip-text text-transparent">
                Hasnain Aftab
              </span>
            </h1>
            <div className="text-lg sm:text-xl lg:text-2xl text-blue-600 dark:text-blue-400 font-semibold min-w-[200px] text-left mb-2">
              I'm a {displayText}
              <span className="animate-pulse">|</span>
            </div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Passionate about creating innovative solutions and building exceptional digital experiences. Let's collaborate to bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-start items-center">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 text-base"
              >
                <Mail size={18} />
                Get In Touch
              </button>
              <a
                href="https://drive.google.com/file/d/16Tl2UqB4Dp1IH8vLndjE0LOtjr7-g2HF/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 text-base"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <button
            onClick={scrollToAbout}
            className="fixed bottom-8 right-8 md:bottom-12 md:right-12 animate-bounce text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 z-50 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2"
            aria-label="Scroll to About"
          >
            <ChevronDown size={32} />
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
