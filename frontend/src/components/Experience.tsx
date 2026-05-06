"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Front-End Development Intern",
    company: "Qskill Program, SR INDIA",
    date: "Jan 2026 - Feb 2026",
    description: "Built responsive web applications using React.js, JSX, and Tailwind CSS. Implemented dynamic routing with React Router DOM for seamless navigation. Integrated APIs via Rapid API and Axios to enable real-time data features. (Certificate ID: qsfnwd202601846)",
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center neon-text-cyan">
        <span className="text-white">02.</span> Experience
      </h2>
      
      <div className="relative border-l-2 border-accent-cyan/30 ml-3 md:ml-0 md:pl-8">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item mb-12 relative pl-8 md:pl-0">
            {/* Timeline Dot */}
            <div className="absolute -left-[11px] md:-left-[41px] bg-dark-100 border-4 border-accent-cyan w-5 h-5 rounded-full mt-1.5 shadow-[0_0_10px_#00f0ff]"></div>
            
            <div className="glass-card p-6 md:p-8 rounded-2xl hover:border-accent-cyan/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    {exp.role}
                  </h3>
                  <p className="text-lg text-accent-cyan flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4" /> {exp.company}
                  </p>
                </div>
                <div className="text-gray-400 flex items-center gap-2 text-sm bg-white/5 py-1 px-3 rounded-full w-fit">
                  <Calendar className="w-4 h-4" />
                  {exp.date}
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
