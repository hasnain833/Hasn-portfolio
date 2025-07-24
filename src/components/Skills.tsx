import React, { useState, useEffect, useRef } from "react";

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React.js", level: 90 },
        { name: "CSS", level: 95 },
        { name: "Bootstrap", level: 80 },
        { name: "Tailwind CSS", level: 95 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Java", level: 85 },
        { name: "PHP", level: 75 },
        { name: "MongoDB", level: 78 },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git/GitHub", level: 92 },
        { name: "Firebase", level: 80 },
        { name: "MongoDB Compass", level: 80 },
        { name: "GraphQL", level: 85 },
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
              "JavaScript",
              "React.js",
              "Node.js",
              "Express.js",
              "MongoDB",
              "HTML5",
              "CSS3",
              "Tailwind CSS",
              "Bootstrap",
              "PHP",
              "MySQL",
              "TypeScript",
              "Next.js",
              "Java",
              "Firebase",
              "REST APIs",
              "GraphQL",
              "Postman",
              "Git/GitHub",
              "VS Code",
              "MongoDB Compass",
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
