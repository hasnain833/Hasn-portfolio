import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative bg-[#020617] border-t border-white/5 overflow-hidden">

      {/* Subtle Background Branding */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.02] select-none uppercase italic pointer-events-none tracking-tighter">
        Hasnain
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Left: Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-2xl font-black text-white uppercase italic tracking-tighter">
              HAS<span className="text-blue-500">NAIN.</span>
            </span>
            <div className="flex items-center gap-4 text-slate-600 text-[9px] font-black uppercase tracking-[0.4em]">
              © {currentYear} ALL ARCHIVES RESERVED
              <span className="w-4 h-[1px] bg-slate-800"></span>
            </div>
          </div>

          {/* Center: Social Links */}
          <div className="flex gap-3">
            {[
              { icon: Github, href: process.env.NEXT_PUBLIC_GITHUB_URL ?? '#' },
              { icon: Linkedin, href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '#' },
              { icon: Instagram, href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:border-blue-500/40 hover:bg-blue-600/10 transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Right: Return to Core */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-4 py-3 px-6 glass-morphism rounded-2xl border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] hover:text-white hover:border-blue-500/40 transition-all duration-500"
          >
            <span>Return to Core</span>
            <div className="w-8 h-8 rounded-full bg-blue-600/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>

        </div>
      </div>
    </footer>
  );
};

export default Footer;