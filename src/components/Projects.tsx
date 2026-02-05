import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Github, ExternalLink, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubLink: string | null;
  liveLink: string | null;
  year: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: "HABIBI MARKET",
    description: "A premium MERN e-commerce architecture.",
    longDescription: "Habibi Market is a fully featured e-commerce ecosystem designed for scale. It features advanced state management, secure payment integration, and a mobile-first responsive design.",
    image: '/img/Habibi_Market.png',
    technologies: ["MERN Stack", "Redux", "AWS", "JWT"],
    githubLink: null,
    liveLink: "https://staging.d2ejvdp70ucx64.amplifyapp.com/",
    year: "2024",
    highlights: ["Role-based access control", "Optimized image delivery", "Scalable REST architecture"],
  },
  {
    title: "CALMBOT AI",
    description: "AI-driven cognitive behavioral therapy assistant.",
    longDescription: "CalmBot leverages OpenAI and Google Gemini models to provide empathetic, therapeutic conversations. It's built with high privacy standards and a focus on user mental well-being.",
    image: '/img/CalmBot_image4.jpg',
    technologies: ["Next.js", "OpenAI", "Supabase", "Tailwind"],
    githubLink: "https://github.com/hasnain833/CalmBot",
    liveLink: "https://calmbot-ai.vercel.app/",
    year: "2024",
    highlights: ["Real-time AI interaction", "Emotion tracking analytics", "Encrypted session storage"],
  },
  {
    title: "RANGZEB STUDIO",
    description: "Premium studio portfolio & booking engine.",
    longDescription: "A high-performance business platform for a professional photography studio. Features a dynamic gallery, package management, and an integrated booking workflow.",
    image: '/img/Rangzeb.png',
    technologies: ["React", "Tailwind CSS", "PHP", "jQuery"],
    githubLink: "https://github.com/hasnain833/Rangzeb",
    liveLink: "https://rangzeb.netlify.app/",
    year: "2025",
    highlights: ["High-res gallery optimization", "Custom booking engine", "SEO-optimized architecture"],
  },
  {
    title: "INOTEBOOK",
    description: "Cloud-synced secure note architecture.",
    longDescription: "A full-stack note-taking ecosystem with end-to-end encryption and real-time syncing across devices. Built for high-speed content creation and organization.",
    image: '/img/iNoteBook.png',
    technologies: ["MongoDB", "Express", "React", "Node"],
    githubLink: "https://github.com/hasnain833/iNoteBook",
    liveLink: null,
    year: "2025",
    highlights: ["JWT secured architecture", "WebSocket real-time updates", "Rich content processing"],
  },
  {
    title: "DAILY NEWS",
    description: "Global news aggregation & analytics.",
    longDescription: "An interactive news intelligence dashboard that processes thousands of articles in real-time. Features advanced filtering, search, and trend visualization.",
    image: '/img/dailynews.png',
    technologies: ["React", "Bootstrap", "News API"],
    githubLink: "https://github.com/hasnain833/DailyNews",
    liveLink: null,
    year: "2025",
    highlights: ["Real-time stream processing", "Category intelligence", "Cross-platform optimization"],
  },
  {
    title: "PLANIFY",
    description: "Collaborative tour & travel orchestration.",
    longDescription: "A sophisticated booking platform for complex travel itineraries. Features team collaboration, real-time availability tracking, and integrated secure payments.",
    image: '/img/planify.png',
    technologies: ["React", "PHP", "MySQL", "JavaScript"],
    githubLink: "https://github.com/hasnain833/Planify",
    liveLink: null,
    year: "2024",
    highlights: ["Collaborative flow design", "Real-time state syncing", "Secure transaction layer"],
  },
  {
    title: "CREATIVE LANDING",
    description: "High-conversion agency entry point.",
    longDescription: "A precision-engineered landing page for creative agencies. Focused on visceral visual impact and lightning-fast performance across all viewport scales.",
    image: '/img/landingpage.png',
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/hasnain833/Landing-Page",
    liveLink: null,
    year: "2024",
    highlights: ["Visceral UI design", "Performance-first architecture", "Advanced layout dynamics"],
  },
  {
    title: "LEGACY PORTFOLIO",
    description: "Original portfolio architecture.",
    longDescription: "The initial iteration of this portfolio, serving as a clean, responsive showcase of foundational software engineering and design principles.",
    image: '/img/portfolio.png',
    technologies: ["React", "Tailwind CSS", "TypeScript"],
    githubLink: "https://github.com/hasnain833/Hasn-portfolio",
    liveLink: "https://hasn-portfolio.netlify.app/",
    year: "2024",
    highlights: ["Responsive core layout", "Smooth scroll orchestration", "Clean content strategy"],
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="projects" className="py-40 relative bg-[#020617] overflow-hidden min-h-screen flex flex-col justify-center">
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 w-full relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Work Archive v2025</span>
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-tight">
            SELECTED <br />
            <span
              className="text-white/5 border-t-2 border-b-2 border-white/20 italic"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
            >
              PROJECTS.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Cinematic Horizontal Strip */}
      <div className="relative w-full z-10">
        <div
          ref={containerRef}
          className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-8 px-[10vw] pb-20 pt-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center"
            >
              <div
                onClick={() => openModal(project)}
                className="group relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-700"
              >
                {/* Glassy Surface */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/5 transition-all duration-500 z-10" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-between z-20">
                  <div className="flex justify-between items-start">
                    <span className="text-4xl md:text-6xl font-black text-white/10 group-hover:text-blue-500/20 transition-colors duration-500">
                      0{index + 1}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                      <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase group-hover:italic transition-all">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base max-w-sm mb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="text-[10px] font-black text-blue-400 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subtle Refraction Line */}
                <div className="absolute top-0 right-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Progress Bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-20 mt-10">
          <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
            <motion.div
              style={{ scaleX: scrollXProgress }}
              className="absolute inset-0 bg-blue-500 origin-left"
            />
          </div>
        </div>
      </div>

      {/* Side Legend */}
      <div className="absolute bottom-10 right-10 flex items-center gap-6 z-20">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Interaction</span>
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">Drag to Explore</span>
        </div>
        <div className="w-[1px] h-10 bg-white/10" />
      </div>

      {/* Experimental Projects Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#020617]/98 backdrop-blur-3xl"
              onClick={closeModal}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-[#030816] rounded-[3rem] overflow-hidden border border-blue-500/20 flex flex-col md:flex-row shadow-[0_0_150px_rgba(59,130,246,0.1)]"
            >
              {/* Media Section */}
              <div className="md:w-3/5 relative h-72 md:min-h-[400px] overflow-hidden border-r border-white/5 bg-[#01040a]">
                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030816] via-transparent to-transparent hidden md:block w-40"></div>
              </div>

              {/* Data Section */}
              <div className="md:w-2/5 p-12 md:p-16 lg:p-20 overflow-y-auto flex flex-col relative hide-scrollbar text-white">
                <button
                  onClick={closeModal}
                  className="absolute top-12 right-12 text-slate-500 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest flex items-center gap-3 group"
                >
                  <span>CLOSE</span>
                  <X size={24} />
                </button>

                <div className="mb-20">
                  <div className="inline-flex items-center gap-4 px-4 py-2 bg-blue-600/10 rounded-full border border-blue-500/20 mb-10">
                    <span className="text-[10px] font-black text-blue-400 tracking-[0.4em] uppercase">YEAR_{selectedProject.year}</span>
                  </div>
                  <h3 className="text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="space-y-16 flex-grow">
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4 flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-slate-800"></span> BRIEF
                    </h5>
                    <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed border-l-2 border-blue-500/20 pl-10 italic">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  <div className="space-y-8">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4 flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-slate-800"></span> STACK
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-xl text-blue-400 text-[10px] font-black uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-20 pt-16 border-t border-white/5">
                  {selectedProject.liveLink && (
                    <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="group px-10 py-6 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center gap-6 hover:bg-blue-500 transition-all uppercase tracking-[0.4em] text-[11px] shadow-[0_20px_40px_rgba(59,130,246,0.2)]">
                      <ExternalLink size={20} /> VISIT_LIVE
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="px-10 py-6 border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-6 hover:bg-white/5 transition-all uppercase tracking-[0.4em] text-[11px]">
                      <Github size={20} /> VIEW_CODE
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
