import { useState } from 'react';
import { Github, ExternalLink, X, ArrowRight, Maximize2 } from 'lucide-react';

// Project Images
import habibi from '../img/Habibi_Market.png';
import calmbot from '../img/CalmBot_image4.jpg';
import rangzeb from '../img/Rangzeb.png';
import dailynews from '../img/dailynews.png';
import inotebook from '../img/iNoteBook.png';
import landingpage from '../img/landingpage.png';
import planify from '../img/planify.png';
import portfolio from '../img/portfolio.png';

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

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const projects: Project[] = [
    {
      title: "HABIBI MARKET",
      description: "A premium MERN e-commerce architecture.",
      longDescription: "Habibi Market is a fully featured e-commerce ecosystem designed for scale. It features advanced state management, secure payment integration, and a mobile-first responsive design.",
      image: habibi,
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
      image: calmbot,
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
      image: rangzeb,
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
      image: inotebook,
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
      image: dailynews,
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
      image: planify,
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
      image: landingpage,
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
      image: portfolio,
      technologies: ["React", "Tailwind CSS", "TypeScript"],
      githubLink: "https://github.com/hasnain833/Hasn-portfolio",
      liveLink: "https://hasn-portfolio.netlify.app/",
      year: "2024",
      highlights: ["Responsive core layout", "Smooth scroll orchestration", "Clean content strategy"],
    }
  ];

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="projects" className="py-40 relative bg-[#020617]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cinematic Header - More Compact */}
        <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-10 mb-24 animate-fade-in-up">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black tracking-[0.6em] text-blue-500 uppercase mb-6 flex items-center gap-4">
              <span className="w-10 h-[1px] bg-blue-500/30"></span>
              ARCHIVE_05 // SELECTED WORK
            </h2>
            <h3 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase">
              SELECTED <br />
              <span className="text-gradient">GALLERY.</span>
            </h3>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-4 px-10 py-5 glass-morphism rounded-2xl border border-white/5 text-white font-black tracking-widest text-[10px] uppercase hover:bg-white/5 transition-all"
          >
            {showAll ? 'Collapse Archive' : 'Expand Archive'}
            <div className={`w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center transition-transform duration-500 ${showAll ? 'rotate-180' : ''}`}>
              <ArrowRight size={14} className="text-blue-500" />
            </div>
          </button>
        </div>

        {/* Panoramic Grid - 2 Column Balanced */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {(showAll ? projects : projects.slice(0, 4)).map((project, index) => (
            <div
              key={index}
              onClick={() => openModal(project)}
              className="group relative animate-fade-in-up [animation-delay:100ms] cursor-pointer"
            >
              {/* Image Card - Fixed Panoramic Aspect Ratio */}
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-700 group-hover:border-blue-500/40 group-hover:-translate-y-2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />

                {/* Tactical Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                {/* Floating Meta */}
                <div className="absolute top-8 left-8 flex items-center gap-3">
                  <div className="px-3 py-1 glass-morphism rounded-full border border-white/10 text-[9px] font-black text-white/60 tracking-widest uppercase">
                    {project.year}
                  </div>
                </div>

                {/* Hover Quick Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    <Maximize2 size={24} />
                  </div>
                </div>

                {/* Scan Line Detail */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-[100px] w-full -translate-y-full group-hover:translate-y-[800px] transition-transform duration-[3s] linear"></div>
              </div>

              {/* Text Info - Clean & Sophisticated */}
              <div className="mt-8 px-2 flex justify-between items-start">
                <div>
                  <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-light tracking-wide max-w-sm">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">
                    /STACK:0{index + 1}
                  </span>
                  <div className="flex gap-2">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span key={tech} className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Premium Analysis Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="absolute inset-0 bg-[#020617]/98 backdrop-blur-3xl" onClick={closeModal}></div>

          <div className="relative w-full max-w-6xl max-h-full bg-[#030816] rounded-[3rem] overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-[0_0_120px_rgba(0,0,0,1)] animate-scale-in">

            {/* Split Image Side */}
            <div className="md:w-3/5 relative h-64 md:h-auto overflow-hidden border-r border-white/5">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              {/* Decorative Corner */}
              <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-blue-500 opacity-20 pointer-events-none"></div>
            </div>

            {/* Split Info Side */}
            <div className="md:w-2/5 p-10 md:p-16 overflow-y-auto flex flex-col bg-gradient-to-br from-[#030816] to-[#01040a]">
              <button
                onClick={closeModal}
                className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center glass-morphism rounded-full text-slate-500 hover:text-white transition-all hover:rotate-90 group"
              >
                <X size={24} className="group-hover:scale-110" />
              </button>

              <div className="mb-14">
                <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-600/10 rounded-full border border-blue-500/20 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[9px] font-black text-blue-400 tracking-[0.3em] uppercase">SYSTEM_ANALYSIS_{selectedProject.year}</span>
                </div>
                <h3 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.85]">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="space-y-12 flex-grow">
                <div>
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-6">Briefing //</h5>
                  <p className="text-slate-400 text-lg font-light leading-relaxed italic border-l-2 border-blue-500/20 pl-8">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div>
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-6">Core Stack //</h5>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-blue-500/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-6">Capabilities //</h5>
                  <ul className="space-y-4">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex gap-4 items-center">
                        <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-tight">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-16 pt-12 border-t border-white/5">
                {selectedProject.liveLink && (
                  <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="group px-8 py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-4 hover:bg-blue-600 hover:text-white transition-all uppercase tracking-[0.3em] text-xs shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    <ExternalLink size={20} /> Launch Interface
                  </a>
                )}
                {selectedProject.githubLink && (
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="px-8 py-5 glass-morphism border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-4 hover:bg-white/10 transition-all uppercase tracking-[0.3em] text-xs">
                    <Github size={20} /> Access Logic
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
