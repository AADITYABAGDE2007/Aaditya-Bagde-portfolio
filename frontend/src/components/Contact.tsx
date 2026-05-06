"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Code2, Mail, FileText, Send, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-elem", {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "1d8950f0-fdc9-48c2-8df3-de2add4d0b7e",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Form submission failed:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white neon-text-cyan">
        <span className="text-accent-cyan">07.</span> Get In Touch
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="contact-elem">
          <h3 className="text-3xl font-bold text-white mb-6">Let&apos;s build something amazing together.</h3>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            I&apos;m currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
          </p>
          
          <div className="flex flex-col gap-4 mb-8">
            <a href="mailto:bagdeaaditya507@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-accent-cyan transition-colors group w-fit">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-lg">bagdeaaditya507@gmail.com</span>
            </a>
            
            <a href="tel:+917722912906" className="flex items-center gap-4 text-gray-300 hover:text-accent-cyan transition-colors group w-fit">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-lg">+91 7722912906</span>
            </a>
            
            <a href="/resume.pdf" download className="flex items-center gap-4 text-gray-300 hover:text-accent-cyan transition-colors group w-fit">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-lg">Download Resume (PDF)</span>
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/AADITYABAGDE2007" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-cyan hover:text-dark-100 transition-all shadow-none hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]">
              <Code2 className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/aaditya-bagde/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0a66c2] transition-all shadow-none hover:shadow-[0_0_15px_rgba(10,102,194,0.5)]">
              <Globe className="w-5 h-5" />
            </a>
            <a href="https://leetcode.com/u/aadityabagde/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-bold font-serif hover:bg-[#ffa116] hover:text-dark-100 transition-all shadow-none hover:shadow-[0_0_15px_rgba(255,161,22,0.5)]">
              LC
            </a>
          </div>
        </div>
        
        <div className="contact-elem glass-card p-8 rounded-2xl border-t-4 border-accent-cyan">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label>
              <input 
                type="text" 
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                placeholder="Aaditya Bagde"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                placeholder="aaditya@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
              <textarea 
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-accent-cyan text-dark-100 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-dark-100 border-t-transparent rounded-full animate-spin"></div>
              ) : submitted ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
