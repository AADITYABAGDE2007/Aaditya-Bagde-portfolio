"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: "Confusion Matrix Explained with Seaborn",
    date: "May 12, 2024",
    readTime: "5 min read",
    desc: "A deep dive into visualizing classification performance using Python, Seaborn, and why it matters more than simple accuracy."
  },
  {
    title: "Deploying ML Models with FastAPI & Next.js",
    date: "April 28, 2024",
    readTime: "8 min read",
    desc: "Step-by-step guide to bridging the gap between your Python predictive models and modern React frontends."
  },
  {
    title: "The Magic of GSAP in React Applications",
    date: "March 15, 2024",
    readTime: "4 min read",
    desc: "How to use GreenSock Animation Platform to create buttery smooth, complex timeline animations in modern web apps."
  }
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white neon-text-purple">
        <span className="text-accent-purple">06.</span> Knowledge Sharing
      </h2>

      <div className="flex flex-col gap-6">
        {articles.map((article, idx) => (
          <div key={idx} className="blog-card glass-card p-6 md:p-8 rounded-2xl group hover:bg-white/10 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 text-xs font-mono text-gray-400 mb-3">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-accent-purple"></span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-400">
                {article.desc}
              </p>
            </div>
            
            <div className="md:pl-6">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent-purple group-hover:bg-accent-purple/10 transition-all">
                <ArrowRight className="w-5 h-5 text-white group-hover:text-accent-purple" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button className="flex items-center gap-2 mx-auto text-accent-purple font-bold hover:text-white transition-colors">
          <BookOpen className="w-5 h-5" /> View All Articles
        </button>
      </div>
    </section>
  );
}
