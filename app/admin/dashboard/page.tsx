'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Globe, BookOpen, Code2, Briefcase, ArrowRight,
    Activity, ChevronRight, Zap, Database, Clock,
    LayoutDashboard, Sparkles, Shield
} from 'lucide-react';

const sections = [
    { label: 'Services', href: '/admin/dashboard/services', icon: <Globe size={22} />, color: 'blue', desc: 'Manage your core offerings and technical expertise categories.' },
    { label: 'Projects', href: '/admin/dashboard/projects', icon: <BookOpen size={22} />, color: 'emerald', desc: 'Curate your featured work archive and case studies.' },
    { label: 'Skills', href: '/admin/dashboard/skills', icon: <Code2 size={22} />, color: 'purple', desc: 'Orchestrate your tech stack and professional toolkit.' },
    { label: 'Experience', href: '/admin/dashboard/experience', icon: <Briefcase size={22} />, color: 'orange', desc: 'Document your professional evolution and career log.' },
];

export default function DashboardHome() {
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            setLoading(true);
            try {
                const results: Record<string, number> = {};
                for (const sec of ['services', 'projects', 'experience']) {
                    const res = await fetch(`/api/admin/data/${sec}`);
                    const data = await res.json();
                    results[sec] = Array.isArray(data) ? data.length : 0;
                }
                const skillsRes = await fetch('/api/admin/data/skills');
                const skillsData = await skillsRes.json();
                results['skills'] = skillsData.technologies?.length ?? 0;

                setCounts(results);
                setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCounts();
    }, []);

    const totalItems = Object.values(counts).reduce((acc, curr) => acc + curr, 0);

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            {/* ── Header Section ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">System Operational</span>
                        </div>
                        <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">v1.2.0-stable</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                            COMMAND <span className="text-gradient">CENTER</span>.
                        </h1>
                        <p className="text-slate-500 font-light text-lg max-w-xl">
                            Unified architectural control for <span className="text-white font-medium italic">HASNAIN.DEV</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-3xl p-4 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Clock size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Sync</p>
                        <p className="text-sm font-bold text-white">{lastUpdated || '--:--'}</p>
                    </div>
                </div>
            </div>

            {/* ── Quick Stats Grid ──────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Entities', value: totalItems, icon: <LayoutDashboard size={18} />, color: 'blue' },
                    { label: 'Core Projects', value: counts['projects'] || 0, icon: <Zap size={18} />, color: 'emerald' },
                    { label: 'Tech Nodes', value: counts['skills'] || 0, icon: <Database size={18} />, color: 'purple' },
                    { label: 'Secured Endpoints', value: '06', icon: <Shield size={18} />, color: 'orange' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 p-5 rounded-[2rem] flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-white italic">{loading ? '...' : stat.value}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main Section Grid ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {sections.map((sec) => (
                    <Link
                        key={sec.href}
                        href={sec.href}
                        className="group relative flex flex-col justify-between h-64 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-blue-500/30 rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500"
                    >
                        {/* Shimmer Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex justify-between items-start">
                            <div className={`w-14 h-14 rounded-2xl bg-${sec.color}-500/10 border border-${sec.color}-500/20 flex items-center justify-center text-${sec.color}-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                {sec.icon}
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-slate-700 group-hover:text-white group-hover:border-white/20 transition-all duration-500 group-hover:scale-110">
                                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{sec.label}</h2>
                                <div className="h-px flex-1 bg-white/5" />
                                <span className="text-[10px] font-black text-blue-500/60 font-mono">0{sections.indexOf(sec) + 1}</span>
                            </div>
                            <p className="text-slate-500 text-sm font-light max-w-[80%]">{sec.desc}</p>

                            <div className="mt-6 flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-[#020617] bg-white/5" />
                                    ))}
                                </div>
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-l border-white/10 pl-4">
                                    {counts[sec.label.toLowerCase()] || 0} active nodes
                                </span>
                            </div>
                        </div>

                        {/* Hover Decorative Accent */}
                        <div className={`absolute bottom-0 right-0 w-32 h-32 bg-${sec.color}-500/5 rounded-tl-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </Link>
                ))}
            </div>

            {/* ── System Status Bar ─────────────────────────────────────── */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/5 flex items-center justify-center text-blue-400">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Cloud Integration Active</p>
                        <p className="text-xs text-slate-500">All edits are instantly synchronized to the public production layer.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                        SSL Verified
                    </div>
                    <div className="px-4 py-2 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                        JSON DB Optimized
                    </div>
                </div>
            </div>
        </div>
    );
}
