import { Code } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-40 relative overflow-hidden bg-[#020617]">
      {/* Structural Background Typography */}
      <div className="absolute top-20 -left-20 text-[10rem] md:text-[20rem] font-black text-white/[0.02] select-none leading-none tracking-tighter uppercase italic">
        Story
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Narrative Split Layout */}
        <div className="grid lg:grid-cols-2 gap-24 items-start">

          {/* Left Column: Structural Identity */}
          <div className="space-y-32">
            <div className="animate-fade-in-left">
              <h2 className="text-sm font-black tracking-[0.5em] text-blue-500 uppercase mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-blue-500"></span>
                01 // ORIGINS
              </h2>
              <h3 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-10">
                THE MAN BEHIND <br />
                <span className="text-gradient italic">THE CODE.</span>
              </h3>
              <p className="text-2xl text-slate-400 leading-relaxed font-light max-w-xl">
                I don't just build websites; I architect <span className="text-white font-bold italic">digital ecosystems</span> that breathe life into visionary ideas.
              </p>
            </div>

            {/* Phase 02: Philosophy - Floating Segment */}
            <div className="animate-fade-in-left [animation-delay:400ms] relative pl-12">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-transparent"></div>
              <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-6">Designing for Humans.</h4>
              <p className="text-lg text-slate-400 leading-relaxed">
                Clean code is my baseline, but human experience is my obsession. I bridge the gap between heavy technical debt and high-end design strategy, ensuring every pixel serves a purpose.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Detail */}
          <div className="lg:pt-48 space-y-32">

            {/* Mission Segment */}
            <div className="animate-fade-in-right [animation-delay:200ms]">
              <h2 className="text-sm font-black tracking-[0.5em] text-emerald-500 uppercase mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-emerald-500"></span>
                02 // MISSION
              </h2>
              <div className="space-y-8">
                <p className="text-xl text-slate-300 leading-relaxed italic border-l-4 border-blue-500/20 pl-8">
                  "Excellence is not an act, but a habit. I make excellence my standard by obsessing over the details others miss."
                </p>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Driven by a deep passion for the <span className="text-white font-bold">MERN stack</span> and <span className="text-white font-bold">Next.js</span>, I've dedicated my career to mastering the art of high-performance software orchestration. From secure fintech foundations to AI-driven cognitive assistants, my work is a testament to the power of precision.
                </p>
              </div>
            </div>

            {/* Quick Stats / Tags - Floating without boxes */}
            <div className="animate-fade-in-right [animation-delay:600ms]">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-10 ">Current Specializations</h4>
              <div className="flex flex-col gap-4">
                {[
                  { title: "MERN ARCHITECT", code: "01" },
                  { title: "AI INTEGRATION", code: "02" },
                  { title: "PERFORMANCE OPS", code: "03" },
                  { title: "UX STRATEGIST", code: "04" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center group cursor-default">
                    <span className="text-[10px] font-mono text-blue-500 mr-6 opacity-40 group-hover:opacity-100 transition-opacity">{spec.code}</span>
                    <span className="text-2xl font-black text-white tracking-widest group-hover:text-blue-400 group-hover:translate-x-3 transition-all">
                      {spec.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Decorative Floating Icon Elements */}
      <div className="absolute bottom-1/4 -right-10 md:right-10 text-blue-500/10 animate-orbit">
        <Code size={120} className="md:w-[200px] md:h-[200px]" strokeWidth={1} />
      </div>
    </section>
  );
};

export default About;