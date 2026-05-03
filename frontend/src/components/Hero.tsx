"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Download, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-button",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.8, stagger: 0.2, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene />
      
      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="hero-text text-accent-cyan font-mono text-sm md:text-xl mb-4 tracking-wider">
          Hello World, I am
        </h2>
        <h1 className="hero-text text-5xl md:text-8xl font-extrabold mb-6 tracking-tight neon-text-cyan">
          Aaditya Bagde
        </h1>
        <h3 className="hero-text text-2xl md:text-4xl font-bold text-gray-300 mb-6">
          AI/ML Undergraduate & Front-End Developer
        </h3>
        <p className="hero-text text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Motivated AIML undergraduate seeking opportunities to apply programming, data handling, and problem-solving skills in real projects. Interested in software development, full-stack basics, and AI-based applications.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="hero-button group flex items-center gap-2 bg-accent-cyan text-dark-100 font-bold py-3 px-8 rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            View Projects
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/resume.pdf" download className="hero-button flex items-center gap-2 glass-card text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-all">
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </div>
        
      </div>
    </section>
  );
}
