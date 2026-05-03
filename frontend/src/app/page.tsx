import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import { ChevronUp, Code2, Globe } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-100 selection:bg-accent-cyan selection:text-dark-100">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      
      <footer className="relative pt-16 pb-8 border-t border-white/10 mt-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent-cyan/10 blur-[100px] -z-10 rounded-full"></div>
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
            {/* Logo area */}
            <div className="text-center md:text-left">
              <a href="/" className="text-2xl font-black text-white tracking-tighter">
                Aaditya<span className="text-accent-cyan">.</span>
              </a>
              <p className="text-gray-400 mt-2 text-sm max-w-xs mx-auto md:mx-0">
                Building intelligent systems and modern web experiences.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400">
              <a href="#about" className="hover:text-accent-cyan transition-colors">About</a>
              <a href="#experience" className="hover:text-accent-cyan transition-colors">Experience</a>
              <a href="#projects" className="hover:text-accent-cyan transition-colors">Projects</a>
              <a href="#contact" className="hover:text-accent-cyan transition-colors">Contact</a>
            </div>
            
            {/* Socials & Top */}
            <div className="flex items-center justify-center md:justify-end gap-4">
              <a href="https://github.com/AADITYABAGDE2007" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-cyan hover:text-dark-100 transition-all text-gray-400">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/aaditya-bagde/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0a66c2] hover:text-white transition-all text-gray-400">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://leetcode.com/u/aadityabagde/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ffa116] hover:text-dark-100 font-bold font-serif transition-all text-gray-400 text-sm">
                LC
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Aaditya Bagde. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-sm flex items-center gap-1">
                Built with <span className="text-accent-cyan animate-pulse">&hearts;</span> using Next.js
              </p>
              <a href="#" aria-label="Back to top" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <ChevronUp className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
