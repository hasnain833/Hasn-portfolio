import React from 'react';
import { Code, Lightbulb, Users, Target } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'Proficient in modern technologies and best practices'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Creative problem-solving with cutting-edge solutions'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Strong team player with excellent communication skills'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Focused on delivering high-quality, impactful solutions'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a passionate software developer with over 5 years of experience in creating
              digital solutions that make a difference. My journey in technology has been driven
              by curiosity and a constant desire to learn and grow.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I specialize in full-stack development, with expertise in modern frameworks and
              technologies. I believe in writing clean, maintainable code and creating user
              experiences that are both functional and delightful.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to
              open-source projects, or sharing knowledge with the developer community.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
                Team Player
              </span>
              <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium">
                Continuous Learner
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <highlight.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;