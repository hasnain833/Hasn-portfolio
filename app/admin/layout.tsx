'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard, Globe, Briefcase, Code2,
    BookOpen, LogOut, Terminal, ChevronRight
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Services', href: '/admin/dashboard/services', icon: Globe },
    { label: 'Projects', href: '/admin/dashboard/projects', icon: BookOpen },
    { label: 'Skills', href: '/admin/dashboard/skills', icon: Code2 },
    { label: 'Experience', href: '/admin/dashboard/experience', icon: Briefcase },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = async () => {
        await fetch('/api/admin/auth', { method: 'DELETE' });
        router.push('/admin');
    };

    if (pathname === '/admin') return <>{children}</>;

    return (
        <div className="min-h-screen bg-[#020617] flex">

            {/* Floating pill sidebar */}
            <aside
                className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col"
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >
                <div
                    className="
                        flex flex-col gap-1
                        glass-morphism rounded-[28px]
                        border border-white/10
                        shadow-2xl shadow-black/50
                        px-3 py-4
                        overflow-hidden
                        transition-[width] duration-300 ease-in-out
                    "
                    style={{ width: expanded ? '210px' : '58px' }}
                >
                    {/* Shimmer top */}
                    <div className="absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    {/* Brand */}
                    <div className="flex items-center gap-3 px-1 pb-2 overflow-hidden">
                        <Terminal size={18} className="text-blue-500 flex-shrink-0" />
                        <span
                            className="text-white font-black text-xs italic uppercase tracking-tight whitespace-nowrap transition-all duration-200"
                            style={{ opacity: expanded ? 1 : 0, transform: expanded ? 'translateX(0)' : 'translateX(6px)' }}
                        >
                            HASNAN
                        </span>
                    </div>

                    <div className="h-px w-full bg-white/10 mb-1 rounded-full" />

                    {/* Nav links */}
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={item.label}
                                className={`
                                    flex items-center gap-3
                                    px-2 py-2.5 rounded-2xl
                                    text-[10px] font-black uppercase tracking-widest
                                    whitespace-nowrap overflow-hidden
                                    transition-colors duration-200
                                    ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                        : 'text-slate-500 hover:text-white hover:bg-white/8'
                                    }
                                `}
                            >
                                <Icon size={17} className="flex-shrink-0" />
                                <span
                                    className="transition-all duration-200"
                                    style={{ opacity: expanded ? 1 : 0, transform: expanded ? 'translateX(0)' : 'translateX(6px)' }}
                                >
                                    {item.label}
                                </span>
                                {isActive && (
                                    <ChevronRight
                                        size={12}
                                        className="ml-auto flex-shrink-0 transition-opacity duration-200"
                                        style={{ opacity: expanded ? 1 : 0 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    <div className="h-px w-full bg-white/10 mt-1 rounded-full" />

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        title="Logout"
                        className="flex items-center gap-3 mt-0.5 px-2 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden text-red-500/60 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                    >
                        <LogOut size={17} className="flex-shrink-0" />
                        <span
                            className="transition-all duration-200"
                            style={{ opacity: expanded ? 1 : 0, transform: expanded ? 'translateX(0)' : 'translateX(6px)' }}
                        >
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main content — margin matches sidebar width + gap */}
            <main
                className="flex-1 p-8 min-h-screen transition-[padding] duration-300 ease-in-out"
                style={{ paddingLeft: expanded ? '234px' : '86px' }}
            >
                {children}
            </main>
        </div>
    );
}
