"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["C", "C++", "Python", "Data Structures", "Algorithms"],
    color: "cyan"
  },
  {
    title: "Web Technologies",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "JSX", "Tailwind CSS"],
    color: "purple"
  },
  {
    title: "Database & Tools",
    skills: ["MySQL", "Visual Studio Code", "Git", "GitHub"],
    color: "green"
  },
  {
    title: "AI & APIs",
    skills: ["Python-based Models", "Data Handling", "Axios", "RapidAPI"],
    color: "cyan"
  }
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      });
      
      // Infinite slow scroll for skills if needed, or simple hover animations
      gsap.utils.toArray(".skill-badge").forEach((badge: any) => {
        badge.addEventListener("mouseenter", () => {
          gsap.to(badge, { scale: 1.1, duration: 0.2, ease: "power1.out" });
        });
        badge.addEventListener("mouseleave", () => {
          gsap.to(badge, { scale: 1, duration: 0.2, ease: "power1.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center neon-text-green">
        <span className="text-white">03.</span> Tech Stack
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="skill-card glass-card p-8 rounded-2xl border-t-4" style={{ borderTopColor: `var(--${category.color}-glow, ${category.color === 'cyan' ? '#00f0ff' : category.color === 'purple' ? '#b026ff' : '#00ff9d'})` }}>
            <h3 className="text-2xl font-bold mb-6 text-white">{category.title}</h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className={`skill-badge px-4 py-2 rounded-full text-sm font-semibold cursor-default bg-white/5 border border-white/10 hover:border-accent-${category.color} hover:bg-white/10 hover:text-white transition-colors text-gray-300`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
