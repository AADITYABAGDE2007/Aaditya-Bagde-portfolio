"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    type: "Certification",
    title: "Python for Data Science",
    desc: "Scored 71% in the certification exam conducted by NPTEL (IIT Madras).",
    icon: Award,
    color: "cyan"
  },
  {
    type: "Certification",
    title: "C++ Programming Basics",
    desc: "Completed foundational and advanced programming concepts from Simplilearn.",
    icon: Award,
    color: "purple"
  },
  {
    type: "Certification",
    title: "Web Essentials",
    desc: "HTML, CSS & JavaScript Essential certification from Cisco Networking Academy.",
    icon: Award,
    color: "green"
  },
  {
    type: "Milestone",
    title: "Project Development",
    desc: "Built 10+ important DSA algorithms, 8+ web projects, and 10+ Python-based ML models.",
    icon: Trophy,
    color: "cyan"
  }
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".achieve-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white">
        <span className="text-accent-cyan">05.</span> Achievements & Certifications
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`achieve-card glass-card p-6 rounded-2xl flex flex-col items-center text-center group border-b-2 hover:-translate-y-2 transition-transform duration-300`} style={{ borderBottomColor: `var(--${item.color}-glow, ${item.color === 'cyan' ? '#00f0ff' : item.color === 'purple' ? '#b026ff' : '#00ff9d'})` }}>
              <div className={`p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" style={{ color: item.color === 'cyan' ? '#00f0ff' : item.color === 'purple' ? '#b026ff' : '#00ff9d' }} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">{item.type}</span>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  );
}
