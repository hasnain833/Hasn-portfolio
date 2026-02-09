import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-5xl ${isScrolled ? 'top-4' : 'top-6'
        }`}
    >
      <nav className={`glass-morphism rounded-full px-6 py-3 flex justify-between items-center ${isScrolled ? 'shadow-2xl' : 'shadow-lg'
        }`}>
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('#hero')}>
          <span className="text-xl font-bold tracking-tight text-white">
            HAS<span className="text-blue-400">NAIN</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeSection === item.href.slice(1)
                ? 'bg-white/10 text-white shadow-inner'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <button
            onClick={() => scrollToSection('#contact')}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] animate-pulse hover:animate-none"
          >
            Let&apos;s Talk
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 mt-4 glass-morphism rounded-3xl overflow-hidden transition-all duration-500 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`block w-full text-left px-6 py-3 text-base font-medium rounded-xl transition-all ${activeSection === item.href.slice(1)
                ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500'
                : 'text-gray-300 hover:bg-white/5'
                }`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="w-full mt-4 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl"
          >
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;