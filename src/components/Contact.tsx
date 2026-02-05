import { useState } from 'react';
import { Mail, Send, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS credentials missing in .env");
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey)
      .then(() => {
        setIsSubmitting(false);
        setSuccess(true);
        e.currentTarget.reset();
        setTimeout(() => setSuccess(false), 5000);
      }, (error: any) => {
        console.error('Email transmission failed:', error);
        setIsSubmitting(false);
        alert("Transmission failed. Please check console for details.");
      });
  };

  return (
    <section id="contact" className="py-24 relative bg-[#020617] overflow-hidden border-t border-white/5">

      {/* Subtle Orbital Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/5 rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Compact Info */}
          <div className="space-y-12 animate-fade-in-left">
            <div>
              <h2 className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase mb-6">
                06 // CONTACT
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase italic mb-8">
                GET IN <br />
                <span className="text-gradient">TOUCH.</span>
              </h3>
              <p className="text-slate-500 text-lg font-light italic border-l-2 border-blue-500/20 pl-6 max-w-sm">
                Ready to architect your next digital masterpiece.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: process.env.NEXT_PUBLIC_EMAIL ?? '',
                  href: `mailto:${process.env.NEXT_PUBLIC_EMAIL ?? ''}`
                },
                {
                  icon: MessageSquare,
                  label: 'Whatsapp',
                  value: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
                  href: `https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\+/g, '').replace(/\s/g, '')}`
                }
              ].map((item, i) => (
                <a key={i} href={item.href} className="group">
                  <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {item.value}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Condensed Form */}
          <div className="animate-fade-in-right">
            <div className="p-1 glass-morphism rounded-[2.5rem] border border-white/5">
              <form onSubmit={handleSubmit} className="bg-[#030816] rounded-[2.3rem] p-8 md:p-12 space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      name="from_name"
                      placeholder="NAME"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white font-bold placeholder:text-slate-800 focus:outline-none focus:border-blue-500 transition-colors uppercase text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      name="from_email"
                      placeholder="EMAIL"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white font-bold placeholder:text-slate-800 focus:outline-none focus:border-blue-500 transition-colors uppercase text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Message</label>
                  <textarea
                    rows={2}
                    name="message"
                    placeholder="DESCRIBE THE PROJECT"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white font-bold placeholder:text-slate-800 focus:outline-none focus:border-blue-500 transition-colors resize-none uppercase text-xs"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-white group-hover:bg-blue-600 transition-colors duration-500"></div>
                  <div className="relative py-4 px-8 flex items-center justify-center gap-3 text-black group-hover:text-white transition-colors duration-500 font-black uppercase tracking-widest text-[10px]">
                    {isSubmitting ? 'Sending...' : success ? 'Sent!' : (
                      <>Send Message <Send size={14} /></>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;