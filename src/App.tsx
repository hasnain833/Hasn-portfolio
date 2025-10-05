import React, { useState, useEffect } from "react";
import { ChevronUp, Moon, Sun } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110 z-50 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}>
        <ChevronUp size={20} />
      </button>
      {/* Floating Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-20 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110 z-50"
        aria-label="Toggle dark mode">
        {darkMode ? (
          <Sun size={28} className="text-white" />
        ) : (
          <Moon size={28} className="text-gray-800" />
        )}
      </button>
    </div>
  );
}

export default App;
