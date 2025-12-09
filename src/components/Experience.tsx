import React from "react";
import { Calendar, MapPin } from "lucide-react";

const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Full-Stack Web Developer",
      company: "BitzSol",
      location: "Islamabad, Pakistan",
      period: "May 2025 – Present",
      description: [
        "Building and maintaining full-stack web applications using the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js.",
        "Developing responsive, high-performance front-end interfaces with React.js, Next.js, and Tailwind CSS.",
        "Designing and implementing RESTful APIs and integrating third-party services to extend functionality.",
        "Managing databases with MongoDB and MySQL, ensuring scalability, reliability, and optimized queries.",
        "Collaborating with cross-functional teams to gather requirements, design solutions, and deliver client-focused products on time.",
        "Deploying and maintaining applications on cloud platforms (Vercel, Netlify, Render) with CI/CD workflows.",
      ],
      technologies: [
        "JavaScript (ES6+)",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "Tailwind CSS",
        "Git/GitHub",
      ],
    },
    {
      title: "Final Year Project – CalmBot (AI-Driven CBT Mobile App)",
      company: "NUML",
      location: "Islamabad, Pakistan",
      period: "Present",
      description: [
        "Currently working on an AI-powered mobile app offering personalized mental health support using chatbot interaction, biosensor integration, and CBT-based exercises.",
        "Utilizing Java for Android mobile development, integrating machine learning models for personalized user experiences.",
        "Implementing secure data handling and user authentication to ensure privacy and compliance with mental health standards.",
        "Collaborating with mental health professionals to validate content and ensure therapeutic effectiveness.",
      ],
      technologies: ["Java", "Firebase", "Python", "NLP", "Langchain", "Git"],
    },
    {
      title: "Junior Front-end Developer",
      company: "CafeVist@",
      location: "Islamabad, Pakistan",
      period: "Sept 2024 – Nov 2024",
      description: [
        "Developed and optimized user interfaces using HTML, CSS, and JavaScript. Focused on responsive design and enhancing UX across platforms.",
        "Collaborated with designers to implement modern UI/UX principles, ensuring accessibility and performance.",
        "Integrated RESTful APIs to fetch and display dynamic content, improving site interactivity.",
        "Participated in code reviews and contributed to team knowledge sharing, enhancing overall code quality.",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React", "Git", "Figma"],
    },

    {
      title: "Freelance Full-Stack Developer",
      company: "Self-Employed",
      location: "(Remote)",
      period: "Aug 2023 – Present",
      description: [
        "Delivered custom web solutions for clients across various industries, including e-commerce platforms and personal portfolio websites.",
        "Built and deployed responsive and scalable applications using React.js, Node.js, Express, and MongoDB.",
        "Integrated third-party APIs, implemented secure authentication, payment gateways, and developed admin dashboards for business operations.",
        "Collaborated with international clients on Upwork and Fiverr, delivering production-ready web applications with a strong focus on performance and user experience.",
      ],
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JavaScript",
        "HTML",
        "CSS",
        "Git",
        "Figma",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My professional journey and key achievements in software development
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-emerald-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10"></div>

                {/* Content Card */}
                <div
                  className={`ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  } md:w-1/2`}>
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                      <Calendar size={16} />
                      {exp.period}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {exp.company}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                        <MapPin size={14} />
                        {exp.location}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-gray-600 dark:text-gray-300 text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
