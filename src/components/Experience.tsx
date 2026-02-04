import { Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Full-Stack Web Developer",
      company: "BitzSol",
      location: "Islamabad, Pakistan",
      period: "Aug 2025 – PRESENT",
      year: "2025",
      description: [
        "Architecting high-performance MERN stack applications using React, Next.js, and Node.js.",
        "Developing responsive, accessible front-end interfaces with Tailwind CSS and Framer Motion.",
        "Designing scalable RESTful APIs and optimizing MongoDB/MySQL query performance.",
        "Deploying and maintaining production environments on Vercel and AWS with CI/CD."
      ],
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind"],
      current: true
    },
    {
      title: "Junior Front-end Developer",
      company: "CafeVist@",
      location: "Islamabad, Pakistan",
      period: "SEPT 2024 – NOV 2024",
      year: "2024",
      description: [
        "Optimized user interfaces for core business platforms focusing on speed and accessibility.",
        "Collaborated with design teams to implement sophisticated UI/UX principles.",
        "Integrated dynamic API data streams to enhance platform interactivity."
      ],
      technologies: ["React", "JavaScript", "Redux", "Figma"],
      current: false
    },
    {
      title: "Front-end Developer Intern",
      company: "InternCareer",
      location: "Remote",
      period: "JUNE 2024 – AUG 2024",
      year: "2024",
      description: [
        "Engineered responsive components within an agile sprint environment.",
        "Hands-on experience with modern React architecture and state management.",
        "Debugged and optimized legacy frontend assets for cross-device compatibility."
      ],
      technologies: ["HTML", "CSS", "React", "JavaScript", "Git"],
      current: false
    }
  ];

  return (
    <section id="experience" className="py-40 relative bg-[#020617] overflow-hidden">

      {/* Structural Background Typography */}
      <div className="absolute top-20 right-0 text-[20rem] font-black text-white/[0.01] select-none leading-none tracking-tighter uppercase italic translate-x-1/2">
        History
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cinematic Header */}
        <div className="mb-32 animate-fade-in-left">
          <h2 className="text-sm font-black tracking-[0.5em] text-blue-500 uppercase mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-blue-500"></span>
            04 // PROFESSIONAL LOG
          </h2>
          <h3 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter uppercase italic">
            DIGITAL <br />
            <span className="text-gradient not-italic">EVOLUTION.</span>
          </h3>
        </div>

        <div className="space-y-40">
          {experiences.map((exp, index) => (
            <div key={index} className="relative grid lg:grid-cols-12 gap-12 group">

              {/* Massive Year Indicator */}
              <div className="lg:col-span-3">
                <div className="sticky top-40">
                  <div className="text-8xl md:text-[10rem] font-black text-white/5 tracking-tighter leading-none mb-4 group-hover:text-blue-500/10 transition-colors duration-700">
                    {exp.year}
                  </div>
                  <div className="flex items-center gap-3 text-blue-500/40 font-mono text-xs tracking-widest uppercase">
                    <span className="w-8 h-px bg-blue-500/20"></span>
                    {exp.period}
                  </div>
                </div>
              </div>

              {/* Log Entry */}
              <div className="lg:col-span-9 relative pl-12 border-l border-white/5 group-hover:border-blue-500/30 transition-colors duration-700">

                {/* Status Indicator */}
                <div className={`absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full ${exp.current ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`}></div>

                <div className="max-w-4xl">
                  {/* Meta Data */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="text-blue-500 font-black text-xs tracking-widest uppercase">
                      {exp.company}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">
                      {exp.location}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h4 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
                    {exp.title}
                  </h4>

                  {/* Execution Steps - Bullet Points */}
                  <div className="space-y-6 mb-12">
                    {exp.description.map((item, i) => (
                      <div key={i} className="flex gap-6 group/item">
                        <span className="text-xs font-mono text-blue-500/40 mt-1.5 group-hover/item:text-blue-500 transition-colors">
                          0{i + 1}
                        </span>
                        <p className="text-lg text-slate-400 leading-relaxed font-light group-hover/item:text-slate-300 transition-colors">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Technology Stream */}
                  <div className="flex flex-wrap gap-4">
                    {exp.technologies.map((tech) => (
                      <div key={tech} className="flex items-center gap-2 group/tech">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/20 group-hover/tech:bg-blue-500 transition-all"></span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover/tech:text-white transition-colors">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tactical Guideline (Bottom Shadow) */}
                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Background Kinetic Accents */}
      <div className="absolute bottom-1/4 left-10 text-blue-500/5 rotate-12">
        <Briefcase size={400} strokeWidth={1} />
      </div>
    </section>
  );
};

export default Experience;
