import React, { useState, useEffect, useMemo } from 'react';
import { Download, Github, Linkedin, Instagram, Sparkles, ArrowRight } from 'lucide-react';
import profileImg from '../img/profile.jpg';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = useMemo(() => [
    'Full Stack Developer',
    'Software Engineer',
    'Problem Solver',
    'Innovation Specialist',
  ], []);

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

  const socialLinks = [
    { icon: <Github size={20} />, href: import.meta.env.VITE_GITHUB_URL, label: "GitHub" },
    { icon: <Linkedin size={20} />, href: import.meta.env.VITE_LINKEDIN_URL, label: "LinkedIn" },
    { icon: <Instagram size={20} />, href: import.meta.env.VITE_INSTAGRAM_URL, label: "Instagram" },
  ];

  return (
    <section id="hero" className="min-h-screen pt-40 md:pt-28 pb-10 flex flex-col items-center justify-center relative px-4 overflow-hidden bg-[#020617]">

      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">

        {/* Left Side: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-6 order-2 lg:order-1">

          {/* Top Badge */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 glass-morphism rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase">
              <Sparkles size={12} className="animate-pulse" />
              AVAILABLE FOR NEW PROJECTS
            </div>
          </div>

          {/* Main Title Group */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 leading-tight text-white uppercase italic">
              CRAFTING <br />
              <span className="text-gradient not-italic">DIGITAL EXCELLENCE.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 max-w-lg lg:mx-0 mx-auto leading-relaxed">
              Hi, I'm <span className="text-white font-bold">Hasnain Aftab</span>. I architect high-performance
              <span className="text-blue-400"> software ecosystems</span> that redefine modern user experiences.
            </p>
          </div>

          {/* Dynamic Role & Typing */}
          <div className="min-h-[1.5rem] animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <span className="text-lg md:text-xl font-mono text-slate-600">const specialize = </span>
            <span className="text-lg md:text-xl font-mono text-blue-400 border-b-2 border-blue-500/20 pb-0.5">
              "{displayText}"
              <span className="animate-pulse ml-1 inline-block w-2.5 h-5 bg-blue-500 translate-y-1"></span>
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-3.5 bg-white text-black font-black rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-3 group-hover:text-white uppercase tracking-widest text-xs">
                EXPLORE WORK <ArrowRight size={18} />
              </span>
            </button>

            <a
              href={import.meta.env.VITE_RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 glass-morphism border border-white/5 text-white font-black rounded-2xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 uppercase tracking-widest text-xs"
            >
              <Download size={18} className="text-blue-400" />
              GET RESUME
            </a>
          </div>
        </div>

        {/* Right Side: Profile Integration */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 lg:pr-16 animate-fade-in-right">

          <div className="absolute -inset-10 bg-gradient-to-tr from-blue-500/10 via-transparent to-emerald-500/10 rounded-full blur-[60px] opacity-40 animate-pulse"></div>

          <div className="relative group">
            {/* Corner Decorative Lines */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-blue-500/30 rounded-tl-2xl transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-emerald-500/30 rounded-br-2xl transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1"></div>

            {/* Profile Frame */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-[3.5rem] p-1 bg-gradient-to-tr from-white/10 via-white/5 to-white/10">
              <div className="w-full h-full rounded-[3.3rem] overflow-hidden border-4 border-[#020617] relative">
                <img
                  src={profileImg}
                  alt="Hasnain Aftab"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent"></div>
              </div>
            </div>

            {/* Social Floating Group - Pull focus in */}
            <div className="absolute -right-8 md:-right-12 lg:-right-14 top-1/2 -translate-y-1/2 flex flex-col gap-4">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 md:p-4 glass-morphism rounded-2xl text-slate-500 hover:text-white hover:border-blue-500/40 transition-all duration-300 hover:scale-110 shadow-2xl"
                  title={link.label}
                >
                  {React.cloneElement(link.icon as React.ReactElement, { size: 18 })}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
