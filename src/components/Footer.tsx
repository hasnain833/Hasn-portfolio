import React from 'react';
import { Heart, ArrowUp, Linkedin, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Hasnain Aftab
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Passionate full-stack developer creating innovative digital solutions.
              Always learning, always building.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Let's Connect</h4>
            <p className="text-gray-400 mb-4">
              Follow me on social media for updates and insights.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/hasnain-aftab-043632302"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                title="LinkedIn"
                target="_blank" rel="noopener noreferrer"
              >
                <Linkedin size={20} className="text-white" />
              </a>
              <a
                href="https://github.com/hasnain833"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                title="GitHub"
                target="_blank" rel="noopener noreferrer"
              >
                <Github size={20} className="text-white" />
              </a>
              <a
                href="mailto:hasnainaftab87@gmail.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                title="Email"
              >
                <Mail size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart size={16} className="text-red-500" /> by Hasnain Aftab
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                © 2024 Hasnain Aftab. All rights reserved.
              </p>
              <button
                onClick={scrollToTop}
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                title="Back to top"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;