import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, ExternalLink, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Portal from './ui/Portal';

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

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    const [imgSrc, setImgSrc] = useState<string>('');

    useEffect(() => {
        if (project) {
            setImgSrc(project.image);
        }
    }, [project]);

    if (!project) return null;

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
                            onClick={onClose}
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-[#030816] rounded-3xl md:rounded-[3rem] overflow-hidden border border-blue-500/20 shadow-2xl flex flex-col md:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button (Mobile & Desktop) */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all md:top-8 md:right-8 group"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Image Section (Top on Mobile, Left on Desktop) */}
                            <div className="h-[40%] md:h-full md:w-3/5 relative bg-[#01040a] overflow-hidden group">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/img/portfolio.png'; // Direct DOM manipulation for fallback to avoid state loop
                                    }}
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030816] md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#030816] opacity-80 md:opacity-100" />
                            </div>

                            {/* Content Section (Bottom on Mobile, Right on Desktop) */}
                            <div className="h-[60%] md:h-full md:w-2/5 flex flex-col relative bg-[#030816]">
                                <div className="p-6 md:p-12 lg:p-16 overflow-y-auto hide-scrollbar flex-grow">

                                    {/* Header Info */}
                                    <div className="mb-8 md:mb-12">
                                        <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
                                            <span className="text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase">
                                                EST. {project.year}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none tracking-tight mb-4">
                                            {project.title}
                                        </h2>
                                        <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                                Brief
                                            </h4>
                                            <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed border-l-2 border-blue-500/30 pl-4">
                                                {project.longDescription}
                                            </p>
                                        </div>

                                        {/* Highlights */}
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">
                                                Highlights
                                            </h4>
                                            <ul className="grid grid-cols-1 gap-2">
                                                {project.highlights.map((highlight, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Tech Stack */}
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">
                                                Technologies
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech) => (
                                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-blue-200 font-medium font-mono">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="p-6 md:p-8 bg-[#030816]/95 border-t border-white/5 backdrop-blur-md">
                                    <div className="grid grid-cols-2 gap-4">
                                        {project.liveLink ? (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-bold text-xs tracking-widest uppercase shadow-lg shadow-blue-900/20"
                                            >
                                                <ExternalLink size={16} /> Live Demo
                                            </a>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 py-4 bg-white/5 text-slate-500 rounded-xl cursor-not-allowed font-bold text-xs tracking-widest uppercase">
                                                Not Available
                                            </div>
                                        )}

                                        {project.githubLink ? (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 py-4 border border-white/10 hover:bg-white/5 text-white rounded-xl transition-all font-bold text-xs tracking-widest uppercase"
                                            >
                                                <Github size={16} /> Source
                                            </a>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 py-4 border border-white/5 text-slate-600 rounded-xl cursor-not-allowed font-bold text-xs tracking-widest uppercase">
                                                Private
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export default ProjectModal;
