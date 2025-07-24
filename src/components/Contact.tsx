import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Linkedin, Github} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hasnainaftab87@gmail.com',
      link: 'mailto:hasnainaftab87@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+92 331 8787833',
      link: 'tel:+923318787833'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Islamabad, Pakistan',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, creative projects, or just having a chat about technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Let's Connect
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Whether you have a project in mind, want to collaborate, or just want to say hello,
              I'd love to hear from you. Feel free to reach out through any of the channels below.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <info.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/hasnain-aftab-043632302"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                  title="LinkedIn"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/hasnain833"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                  title="GitHub"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Github size={20} />
                </a>
                <a
                  href="mailto:hasnainaftab87@gmail.com"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                  title="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Message
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-800 dark:text-emerald-300">
                  Message sent successfully! I'll get back to you soon.
                </span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
                <span className="text-red-800 dark:text-red-300">
                  Something went wrong. Please try again.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;