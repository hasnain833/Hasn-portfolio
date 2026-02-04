import { useState, useEffect, useRef } from "react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const technologies = [
    { name: "React.js", level: "Expert", color: "from-blue-400 to-cyan-500", size: "text-2xl md:text-3xl" },
    { name: "Node.js", level: "Infrastructure", color: "from-green-400 to-emerald-500", size: "text-xl md:text-2xl" },
    { name: "Next.js", level: "Architecture", color: "from-slate-200 to-slate-400", size: "text-3xl md:text-4xl" },
    { name: "TypeScript", level: "Strict Logic", color: "from-blue-500 to-indigo-600", size: "text-lg md:text-xl" },
    { name: "Python", level: "Data/AI", color: "from-yellow-400 to-blue-500", size: "text-xl md:text-2xl" },
    { name: "MongoDB", level: "Deep Storage", color: "from-green-500 to-emerald-700", size: "text-2xl md:text-3xl" },
    { name: "Tailwind", level: "Visual Ops", color: "from-cyan-400 to-blue-500", size: "text-lg md:text-xl" },
    { name: "AWS", level: "Cloud Core", color: "from-orange-400 to-yellow-600", size: "text-2xl md:text-3xl" },
    { name: "GraphQL", level: "Data Mesh", color: "from-pink-500 to-purple-600", size: "text-xl" },
    { name: "Three.js", level: "Reality", color: "from-slate-100 to-slate-500", size: "text-2xl" },
    { name: "PHP", level: "Legacy Ops", color: "from-indigo-400 to-indigo-600", size: "text-lg" },
    { name: "Git", level: "Version Control", color: "from-orange-500 to-red-600", size: "text-xl" },
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-40 relative overflow-hidden bg-[#020617]">
      {/* Background Kinetic Stream */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <div className="flex gap-20 animate-marquee rotate-[-8deg] scale-150 py-20">
          {Array(10).fill("HASNAIN_AFTAB_DEVELOPER_EXPERTISE_MATRIX_DEPLOYED").map((t, i) => (
            <span key={i} className="text-[12rem] font-black whitespace-nowrap text-white">{t}</span>
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
            <h3 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
              MASTERING THE <br />
              <span className="text-gradient uppercase italic">STACK.</span>
            </h3>
          </div>
          <p className="text-slate-500 text-xl font-light italic border-l-2 border-blue-500/20 pl-8 max-w-sm animate-fade-in-right">
            "We don't just use tools; we orchestrate them to create digital miracles."
          </p>
        </div>

        {/* The Matrix - Dynamic Asymmetrical Mesh */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-40">
          {technologies.map((tech, i) => (
            <div
              key={i}
              className={`group relative p-10 glass-morphism rounded-[2.5rem] border border-white/5 hover:border-blue-500/40 transition-all duration-700 flex flex-col items-center justify-center text-center overflow-hidden
                 ${i % 4 === 1 ? 'lg:translate-y-20' : i % 4 === 3 ? 'lg:translate-y-10' : ''}
                 ${i % 4 === 2 ? 'lg:-translate-y-10' : ''}
               `}
            >
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-emerald-500/5 transition-all duration-700"></div>

              <div className={`text-transparent bg-clip-text bg-gradient-to-br ${tech.color} font-black mb-3 tracking-tighter transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3`}>
                <span className={`${tech.size} block`}>{tech.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-white/10 group-hover:w-8 group-hover:bg-blue-500/50 transition-all"></span>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 group-hover:text-white transition-colors">
                  {tech.level}
                </div>
              </div>

              {/* Reactive Scan Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent -translate-x-full group-hover:animate-scan-horizontal"></div>
            </div>
          ))}
        </div>

        {/* Impact Stats - Tactical Data Hubs (Deconstructed Design) */}
        <div className="grid md:grid-cols-3 gap-16 mt-60 relative">

          {/* Connecting Circuit Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-y-1/2 pointer-events-none"></div>

          {[
            { label: "Years Experience", value: "3+", watermark: "Experience", color: "blue" },
            { label: "Successful Projects", value: "35+", watermark: "Projects", color: "emerald" },
            { label: "Happy Partners", value: "20+", watermark: "Partners", color: "indigo" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative h-[400px] flex flex-col items-center justify-center transition-all duration-700 hover:-translate-y-4"
            >
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-500/20 group-hover:border-blue-500 group-hover:w-20 group-hover:h-20 transition-all duration-500 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/5 group-hover:border-white/20 transition-all duration-500 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/5 group-hover:border-white/20 transition-all duration-500 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-emerald-500/20 group-hover:border-emerald-500 group-hover:w-20 group-hover:h-20 transition-all duration-500 rounded-br-lg"></div>

              {/* Scrolling Data Feed Background */}
              <div className="absolute inset-4 overflow-hidden opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <div className="flex flex-col gap-2 font-mono text-[10px] animate-data-feed">
                  {Array(20).fill(0).map((_, j) => (
                    <div key={j} className="whitespace-nowrap">
                      0x{Math.random().toString(16).slice(2, 10).toUpperCase()} FB_DATA_PACKET_{i}{j} SUCCESS
                    </div>
                  ))}
                </div>
              </div>

              {/* Watermark Branding */}
              <div className="absolute top-8 right-8 text-xs font-black text-white/10 tracking-[0.5em] group-hover:text-blue-500/40 transition-colors">
                {stat.watermark}
              </div>

              {/* Central Value */}
              <div className="relative z-10 text-center">
                <div className="text-8xl font-black text-white tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-700">
                  {stat.value}
                </div>
                <div className="inline-flex items-center gap-3 px-4 py-2 glass-morphism rounded-full border border-white/5 sm:translate-x-0">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    {stat.label}
                  </span>
                </div>
              </div>

              {/* Tactical Crosshair (Hover Only) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-40 h-40 border border-blue-500/20 rounded-full animate-ping"></div>
                <div className="absolute w-64 h-[1px] bg-blue-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                <div className="absolute h-64 w-[1px] bg-blue-500/10 scale-y-0 group-hover:scale-y-100 transition-transform duration-700"></div>
              </div>

              {/* Base Info Bar */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-white/5 overflow-hidden">
                <div className="h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-1000 delay-300"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
