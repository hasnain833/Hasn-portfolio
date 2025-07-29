import React, { useState } from "react";
import { Github, X, Calendar, Code } from "lucide-react";
import newsapp from './img/Daily-News.png';
import planify from './img/Planify.png';
import portfolio from './img/Portfolio.png'; 
import landingPage from './img/Landing-Page.png';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const viewMoreRef = React.useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "CalmBot – AI-Driven CBT App",
      description: "AI-driven cognitive behavioral therapy app for mental wellness",
      longDescription:
        "Developed an AI-driven cognitive behavioral therapy (CBT) application that provides personalized mental wellness support. The app uses natural language processing to analyze user input and offer tailored CBT exercises, mood tracking, and progress monitoring.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [
        "Java",
        "Firebase",
        "Python",
        "NLP",
        "Langchain",
        "Git",
      ],
      githubLink: "https://github.com/hasnain833/CalmBot",
      year: "2025",
      highlights: [
        "AI-driven personalized CBT exercises",
        "Mood tracking and progress monitoring",
        "User-friendly interface with Flutter",
        "Real-time data synchronization with Firebase",
      ],
    },
    {
      title: "iNoteBook – Full Stack Note Taking Web App",
      description: "A full-stack note-taking application with modern UI/UX",
      longDescription:
        "Built a comprehensive note-taking application with user authentication, CRUD operations, and a responsive design. The app allows users to create, edit, delete, and organize notes with rich text formatting and tagging features.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "Tailwind CSS",
      ],
      githubLink: "https://github.com/hasnain833/iNoteBook",
      year: "2025",
      highlights: [
        "User authentication with JWT",
        "Rich text editor integration",
        "Responsive design with Tailwind CSS",
        "Real-time updates with WebSockets",
      ],
    },

    {
      title: "News App - Interactive Dashboard",
      description: "Interactive dashboard for news articles and trends",
      longDescription:
        "Created an interactive news dashboard that aggregates articles from various sources. The app features a clean and modern UI, allowing users to filter news by categories, search for specific topics, and view trending articles. It utilizes a third-party news API for real-time updates.",
      image:
        newsapp,
      technologies: ["React.js", "CSS", "Bootstrap", "News API"],
      githubLink: "https://github.com/hasnain833/DailyNews",
      year: "2025",
      highlights: [
        "Real-time news updates",
        "Category filtering",
        "Search functionality",
        "Responsive design with Bootstrap",
      ],
    },
    {
      title: "Planify- Tour Booking Web App",
      description:
        "Collaborative tour booking application with real-time updates",
      longDescription:
        "Developed a comprehensive tour booking application that allows users to search, book, and manage tours. The app features a collaborative interface for team bookings, real-time availability updates, and a user-friendly dashboard for managing bookings and payments.",
      image:
        planify,
      technologies: ["HTML", "CSS", "JavaScript", "React", "PHP", "MySQL"],
      githubLink: "https://github.com/hasnain833/Planify",
      year: "2024",
      highlights: [
        "Collaborative booking features",
        "Real-time availability updates",
        "User-friendly dashboard",
        "Secure payment integration",
      ],
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing projects and skills",
      longDescription:
        "Developed a personal portfolio website to showcase my projects, skills, and experience. The site features a modern design, responsive layout, and smooth scrolling animations. It highlights my work in web development, including case studies and links to live projects.",
      image:
        portfolio,
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Tailwind CSS",
        "TypeScript",
      ],
      githubLink: "https://github.com/hasnain833/Hasn-portfolio",
      year: "2024",
      highlights: [
        "Modern design and layout",
        "Responsive across devices",
        "Smooth scrolling animations",
        "Showcase of web development skills",
      ],
    },
    {
      title: "Creative Services Landing Page",
      description: "Landing page for a creative services agency",
      longDescription:
        "Designed and developed a landing page for a creative services agency. The page features a modern design, engaging visuals, and clear calls to action. It showcases the agency's services, portfolio, and client testimonials.",
      image:
        landingPage,
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Tailwind CSS",
      ],
      githubLink: "https://github.com/hasnain833/Landing-Page",
      year: "2024",
      highlights: [
        "Modern and engaging design",
        "Responsive layout",
        "Clear calls to action",
        "Showcase of services and portfolio",
      ],
    },
    {
      title: "Flutter To-Do App",
      description: "A simple to-do app built with Flutter",
      longDescription:
        "Developed a cross-platform to-do application using Flutter. The app allows users to create, update, and delete tasks, with a clean and intuitive interface. It showcases the capabilities of Flutter for building responsive and performant mobile applications.",
      image:
        "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "Provider",
        "GetX",
        "SQLite",
      ],
      githubLink: "#",
      year: "2024",
      highlights: [
        "Cross-platform functionality",
        "Real-time data synchronization with Firebase",
        "Intuitive user interface",
        "State management with Provider and GetX",
        "Local storage with SQLite",
      ],
    },
  ];

  const openModal = (index: number) => {
    setSelectedProject(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>

        <div 
          style={{ transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s cubic-bezier(0.4,0,0.2,1)', maxHeight: showAll ? '3000px' : '1200px', opacity: showAll ? 1 : 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 overflow-hidden"
        >
          {(showAll ? projects : projects.slice(0, 4)).map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => openModal(index)}>
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover object-top transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-sm font-medium">
                  {project.year}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubLink, "_blank");
                    }}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Github size={16} />
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* View More / View Less Button */}
        {projects.length > 4 && (
          <div className="flex justify-center mt-8" ref={viewMoreRef}>
            <button
              onClick={() => {
                if (showAll && viewMoreRef.current) {
                  setShowAll(false);
                  setTimeout(() => {
                    viewMoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 500);
                } else {
                  setShowAll(true);
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            >
              {showAll ? 'View Less' : 'View More'}
            </button>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject !== null && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  className="w-full h-100 object-cover object-top"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-900 transition-colors duration-200">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects[selectedProject].title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Calendar size={16} />
                    {projects[selectedProject].year}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {projects[selectedProject].longDescription}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Code size={18} />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].technologies.map(
                      (tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Key Highlights
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {projects[selectedProject].highlights.map(
                      (highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                          {highlight}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      window.open(
                        projects[selectedProject].githubLink,
                        "_blank"
                      )
                    }
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Github size={18} />
                    View Source Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
