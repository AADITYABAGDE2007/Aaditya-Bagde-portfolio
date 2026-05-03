"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Code2, BrainCircuit } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center neon-text-purple">
        <span className="text-white">01.</span> About Me
      </h2>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="about-item space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            I&apos;m Aaditya Bagde, currently pursuing my B.Tech in Artificial Intelligence and Machine Learning (2024-2028) at Bansal Institute of Science and Technology, Bhopal.
          </p>
          <p>
            My journey involves building web applications using React.js and Tailwind CSS, and implementing dynamic data handling and API integrations. I&apos;ve developed numerous projects ranging from interactive browser games to functional translation apps.
          </p>
          <p>
            I am highly focused on improving my technical expertise, applying problem-solving skills in real projects, and delivering efficient, scalable software and AI-based applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="about-item glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <BrainCircuit className="w-12 h-12 text-accent-cyan mb-4" />
            <h3 className="text-xl font-bold mb-2">Machine Learning</h3>
            <p className="text-sm text-gray-400">Predictive Modeling, Data Analytics, NLP</p>
          </div>
          
          <div className="about-item glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <Code2 className="w-12 h-12 text-accent-purple mb-4" />
            <h3 className="text-xl font-bold mb-2">Web Development</h3>
            <p className="text-sm text-gray-400">React, Next.js, Tailwind CSS, Typescript</p>
          </div>
          
          <div className="about-item glass-card p-6 rounded-2xl sm:col-span-2 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <Terminal className="w-12 h-12 text-accent-green mb-4" />
            <h3 className="text-xl font-bold mb-2">Backend & Ops</h3>
            <p className="text-sm text-gray-400">Python, FastAPI, Flask, Docker, CI/CD</p>
          </div>
        </div>
      </div>
    </section>
  );
}
