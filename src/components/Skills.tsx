import { useState, useEffect, useRef } from 'react';

interface Technology {
  name: string;
  level: string;
  fromColor: string;
  toColor: string;
  size: string;
}

interface SkillsData {
  technologies: Technology[];
  additionalSkills: string[];
}

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [skillsData, setSkillsData] = useState<SkillsData>({ technologies: [], additionalSkills: [] });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/api/admin/data/skills')
      .then(r => r.json())
      .then(setSkillsData)
      .catch(() => { });
  }, []);

  const { technologies, additionalSkills } = skillsData;

  return (
    <section ref={sectionRef} id="skills" className="py-40 relative overflow-hidden bg-[#020617]">
      {/* Background Kinetic Stream */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <div className="flex gap-20 animate-marquee rotate-[-8deg] scale-150 py-20">
          {Array(10).fill('HASNAIN_AFTAB_DEVELOPER_EXPERTISE_MATRIX_DEPLOYED').map((t, i) => (
            <span key={i} className="text-[6rem] md:text-[12rem] font-black whitespace-nowrap text-white">{t}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Cinematic Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-10">
          <div className="max-w-3xl animate-fade-in-left">
            <h2 className="text-sm font-black tracking-[0.5em] text-blue-500 uppercase mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-blue-500"></span>
              03 // EXPERTISE
            </h2>
            <h3 className="text-4xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
              MASTERING THE <br />
              <span className="text-gradient uppercase italic">STACK.</span>
            </h3>
          </div>
          <p className="text-slate-500 text-xl font-light italic border-l-2 border-blue-500/20 pl-8 max-w-sm animate-fade-in-right">
            &quot;We don&apos;t just use tools; we orchestrate them to create digital miracles.&quot;
          </p>
        </div>

        {/* The Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-40">
          {technologies.map((tech, i) => (
            <div
              key={i}
              className={`group relative p-10 glass-morphism rounded-[2.5rem] border border-white/5 hover:border-blue-500/40 transition-all duration-700 flex flex-col items-center justify-center text-center overflow-hidden
                 ${i % 4 === 1 ? 'lg:translate-y-20' : i % 4 === 3 ? 'lg:translate-y-10' : ''}
                 ${i % 4 === 2 ? 'lg:-translate-y-10' : ''}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-emerald-500/5 transition-all duration-700"></div>
              <div
                className="font-black mb-3 tracking-tighter transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${tech.fromColor}, ${tech.toColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <span className={`${tech.size} block`}>{tech.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-white/10 group-hover:w-8 group-hover:bg-blue-500/50 transition-all"></span>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 group-hover:text-white transition-colors">
                  {tech.level}
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent -translate-x-full group-hover:animate-scan-horizontal"></div>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-16 mt-60 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-y-1/2 pointer-events-none"></div>
          {[
            { label: 'Years Experience', value: '3+', watermark: 'Experience', color: 'blue' },
            { label: 'Successful Projects', value: '35+', watermark: 'Projects', color: 'emerald' },
            { label: 'Happy Partners', value: '20+', watermark: 'Partners', color: 'indigo' },
          ].map((stat, i) => (
            <div key={i} className="group relative h-[400px] flex flex-col items-center justify-center transition-all duration-700 hover:-translate-y-4">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-500/20 group-hover:border-blue-500 group-hover:w-20 group-hover:h-20 transition-all duration-500 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/5 group-hover:border-white/20 transition-all duration-500 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/5 group-hover:border-white/20 transition-all duration-500 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-emerald-500/20 group-hover:border-emerald-500 group-hover:w-20 group-hover:h-20 transition-all duration-500 rounded-br-lg"></div>
              <div className="absolute top-8 right-8 text-xs font-black text-white/10 tracking-[0.5em] group-hover:text-blue-500/40 transition-colors">{stat.watermark}</div>
              <div className="relative z-10 text-center">
                <div className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-700">{stat.value}</div>
                <div className="inline-flex items-center gap-3 px-4 py-2 glass-morphism rounded-full border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{stat.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <div className="mt-32 text-center relative z-10">
          <h3 className="text-sm font-black tracking-[0.5em] uppercase mb-12 flex flex-wrap items-center justify-center gap-3 md:gap-6">
            <span className="w-10 md:w-20 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-blue-500/60 rounded-full" />
            <span className="text-slate-500">THE</span>
            <span className="text-gradient">TOOLKIT</span>
            <span className="w-10 md:w-20 h-px bg-gradient-to-l from-transparent via-emerald-500/40 to-emerald-500/60 rounded-full" />
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {additionalSkills.map((tech, index) => (
              <span
                key={index}
                className="px-6 py-3 glass-morphism border border-white/5 rounded-full text-sm font-bold text-slate-400 hover:text-white hover:border-blue-500/40 hover:scale-110 transition-all duration-500 cursor-default shadow-lg hover:shadow-blue-500/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
