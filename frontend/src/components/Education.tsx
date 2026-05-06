"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: "Bachelor of Technology in Artificial Intelligence and Machine Learning",
    institution: "Bansal Institute of Science and Technology",
    location: "Bhopal, Madhya Pradesh",
    date: "2024 - 2028",
    description: "Branch: AIML | CGPA: 7.7 till 2nd Semester",
  },
  {
    degree: "Higher Secondary Education (Class XII)",
    institution: "Govt. Excellence School",
    location: "Pandhurna, MP",
    date: "2023 - 2024",
    description: "Board: NCERT | Percentage: 73%",
  },
  {
    degree: "High School (Class X)",
    institution: "Govt. High School",
    location: "Bhuli, MP",
    date: "2021 - 2022",
    description: "Board: NCERT | Percentage: 71%",
  }
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".edu-timeline-item", {
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
    <section id="education" ref={sectionRef} className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center neon-text-cyan">
        <span className="text-white">01.5.</span> Education
      </h2>
      
      <div className="relative border-l-2 border-accent-cyan/30 ml-3 md:ml-0 md:pl-8">
        {education.map((edu, index) => (
          <div key={index} className="edu-timeline-item mb-12 relative pl-8 md:pl-0">
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] md:-left-[41px] bg-dark-100 border-4 border-accent-cyan w-5 h-5 rounded-full mt-1.5 shadow-[0_0_10px_#00f0ff]"></div>
            
            <div className="glass-card p-6 md:p-8 rounded-2xl hover:border-accent-cyan/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-start gap-2 max-w-lg">
                    {edu.degree}
                  </h3>
                  <p className="text-lg text-accent-cyan flex items-center gap-2 mt-2">
                    <GraduationCap className="w-4 h-4 min-w-[16px]" /> {edu.institution}
                  </p>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 min-w-[16px]" /> {edu.location}
                  </p>
                </div>
                <div className="text-gray-400 flex items-center gap-2 text-sm bg-white/5 py-1 px-3 rounded-full w-fit whitespace-nowrap">
                  <Calendar className="w-4 h-4" />
                  {edu.date}
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mt-4 bg-white/5 p-3 rounded-lg border border-white/10 inline-block">
                {edu.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
