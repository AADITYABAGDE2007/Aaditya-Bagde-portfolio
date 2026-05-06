"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-dark-100/80 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="/" className="text-2xl font-black text-white tracking-tighter hover:text-accent-cyan transition-colors">
          PORT<span className="text-accent-cyan">FOLIO</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-accent-cyan transition-colors">
              {link.name}
            </a>
          ))}
          <a href="/resume.pdf" download className="text-sm font-bold bg-white/10 border border-accent-cyan/50 text-accent-cyan px-4 py-2 rounded hover:bg-accent-cyan hover:text-dark-100 transition-all">
            Resume
          </a>
        </div>
        
        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-200 border-b border-white/10 shadow-xl py-4 flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-accent-cyan w-full text-center py-2"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
