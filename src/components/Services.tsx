import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Globe, Smartphone, Layout, Database, ArrowUpRight, Cpu, Sparkles, Code2, Server, Shield } from 'lucide-react';

interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    color: string;
    details: string[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
    Globe: <Globe size={32} />,
    Smartphone: <Smartphone size={32} />,
    Layout: <Layout size={32} />,
    Database: <Database size={32} />,
    Cpu: <Cpu size={32} />,
    Code2: <Code2 size={32} />,
    Server: <Server size={32} />,
    Shield: <Shield size={32} />,
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative group cursor-pointer"
        >
            <div className={`absolute -inset-2 bg-${service.color}-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative h-full glass-morphism border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-2xl bg-white/[0.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-${service.color}-500/10 border border-${service.color}-500/20 flex items-center justify-center text-${service.color}-400 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {ICON_MAP[service.icon] ?? <Globe size={32} />}
                    </div>
                </div>
                <div style={{ transform: 'translateZ(30px)' }} className="mt-12 space-y-4 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                        {service.title.split(' ')[0]} <span className="text-gradient not-italic">{service.title.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed line-clamp-3">{service.description}</p>
                </div>
                <div style={{ transform: 'translateZ(40px)' }} className="mt-10 flex items-end justify-between relative z-10">
                    <div className="flex flex-wrap gap-2">
                        {service.details.map((detail, i) => (
                            <span key={i} className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-0.5 rounded-full bg-white/5">{detail}</span>
                        ))}
                    </div>
                    <div className="w-10 h-10 rounded-full glass-morphism border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/20 transition-all duration-500 group-hover:scale-110">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
            </div>
        </motion.div>
    );
};

const Services: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        fetch('/api/admin/data/services')
            .then(r => r.json())
            .then(setServices)
            .catch(() => { });
    }, []);

    return (
        <section id="services" className="relative py-32 bg-[#020617] overflow-hidden px-6">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 p-1 px-4 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-mono text-[10px] uppercase tracking-[0.3em]"
                    >
                        <Sparkles size={12} />
                        Architectural Expertise
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                        MY <span className="text-gradient not-italic">SERVICES</span>.
                    </h2>
                    <p className="text-slate-500 font-light max-w-2xl text-lg md:text-xl">
                        I specialize in building complex, high-performance systems with a focus on editorial-grade user experience and technical scalability.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 flex flex-col items-center gap-6"
                >
                    <div className="flex items-center gap-4 text-slate-700">
                        <div className="h-px w-12 bg-white/5" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Engineered for Results</span>
                        <div className="h-px w-12 bg-white/5" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
