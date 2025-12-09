import React, { useState, useEffect, useRef } from "react";
import { FaClock, FaUsers } from "react-icons/fa6";
import { FaProjectDiagram } from "react-icons/fa";

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React.js", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "JavaScript (ES6+)", level: 92 },
        { name: "HTML5 & CSS3", level: 96 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 88 },
        { name: "MongoDB", level: 85 },
        { name: "RESTful APIs", level: 92 },
        { name: "Authentication (JWT, OAuth)", level: 87 },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git & GitHub", level: 92 },
        { name: "Firebase", level: 80 },
        { name: "GraphQL", level: 82 },
        { name: "Docker (Basics)", level: 70 },
        { name: "Cloud Deployment (Vercel/Netlify)", level: 85 },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to
            life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                        }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              // Core Languages
              "JavaScript (ES6+)",
              "TypeScript",
              "HTML5",
              "CSS3",

              // Frontend
              "React.js",
              "Next.js",
              "Tailwind CSS",
              "Bootstrap",

              // Backend
              "Node.js",
              "Express.js",
              "PHP",
              "Java",

              // Database
              "MongoDB",
              "MySQL",
              "Firebase",

              // APIs & Data
              "REST APIs",
              "GraphQL",

              // Tools
              "Git/GitHub",
              "Postman",
              "Cloud Deployment (Vercel/Netlify)",
              "AWS (Basics)",
              "Docker",
              "CI/CD",
              
              // Others
              "Agile Methodologies",
              "Unit Testing",
              "Jest",
              "Cypress",

            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Static Stats Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white">
              <FaUsers size={28} />
            </div>
            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              20+
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Happy Clients
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white">
              <FaProjectDiagram size={28} />
            </div>
            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              35+
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Projects Completed
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white">
              <FaClock size={28} />
            </div>
            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              3+
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Years of Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
