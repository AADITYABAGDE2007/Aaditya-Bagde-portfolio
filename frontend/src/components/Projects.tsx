"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Code2, Play, X, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "hr-analytics",
    title: "HR Analytics Dashboard",
    desc: "Attrition prediction and salary analysis using machine learning.",
    stack: ["Python", "FastAPI", "React", "Scikit-Learn"],
    github: "https://github.com/AADITYABAGDE2007",
    live: "#",
    hasDemo: true,
  },
  {
    id: "mood-music",
    title: "Mood-based Music Recommender",
    desc: "KNN-based recommendation engine connecting to Spotify API.",
    stack: ["Flask API", "React", "KNN", "Pandas"],
    github: "https://github.com/AADITYABAGDE2007",
    live: "#",
    hasDemo: true,
  },
  {
    id: "text-translator",
    title: "Text Translator App",
    desc: "A Translator app built using React, JavaScript, Axios, and RapidAPI, featuring a random string generator.",
    stack: ["React", "Tailwind CSS", "JavaScript", "RapidAPI", "Axios"],
    github: "https://github.com/AADITYABAGDE2007",
    live: "#",
    hasDemo: false,
    image: "/Screenshot 2026-05-03 150101.png"
  },
  {
    id: "rps-game",
    title: "Rock-Paper-Scissors Game",
    desc: "An interactive browser-based game with clean, responsive UI and core game logic implemented in JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/AADITYABAGDE2007",
    live: "#",
    hasDemo: false,
    image: "/Screenshot 2026-05-03 150549.png"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // Demo States
  const [hrData, setHrData] = useState({ age: 30, income: 5000, satisfaction: 3, years: 5 });
  const [hrResult, setHrResult] = useState<any>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePredictHR = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/predict/hr-attrition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: hrData.age,
          monthly_income: hrData.income,
          job_satisfaction: hrData.satisfaction,
          years_at_company: hrData.years
        })
      });
      const data = await res.json();
      setHrResult(data);
    } catch (error) {
      console.error(error);
      setHrResult({ prediction: "Error", probability: "0%", key_factors: ["Backend not running"] });
    }
  };

  const [musicMood, setMusicMood] = useState("happy");
  const [musicResult, setMusicResult] = useState<any>(null);

  const handlePredictMusic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/predict/music-recommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: musicMood })
      });
      const data = await res.json();
      setMusicResult(data);
    } catch (error) {
      console.error(error);
      setMusicResult({ mood_detected: "Error", recommended_songs: ["Backend not running"], confidence_score: "0%" });
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center neon-text-purple">
        <span className="text-white">04.</span> Featured Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card glass-card rounded-2xl overflow-hidden group flex flex-col h-full">
            <div className="h-48 bg-dark-300 relative overflow-hidden flex items-center justify-center border-b border-white/10">
               {project.image ? (
                 <img 
                   src={project.image} 
                   alt={project.title} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
               ) : (
                 <Activity className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform duration-500" />
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent opacity-60 pointer-events-none"></div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">{project.title}</h3>
              <p className="text-gray-400 mb-6 flex-grow">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech, tIdx) => (
                  <span key={tIdx} className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                {project.hasDemo && (
                  <button 
                    onClick={() => setActiveDemo(project.id)}
                    className="flex items-center gap-2 text-sm font-bold bg-white text-dark-100 px-4 py-2 rounded hover:bg-accent-cyan transition-colors"
                  >
                    <Play className="w-4 h-4" /> Live Demo
                  </button>
                )}
                <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
                  <Code2 className="w-6 h-6" />
                </a>
                <a href={project.live} className="text-gray-400 hover:text-white transition-colors">
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Modal for HR */}
      {activeDemo === "hr-analytics" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8 relative border-accent-cyan/50">
            <button onClick={() => setActiveDemo(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-2">HR Attrition Prediction Model</h3>
            <p className="text-gray-400 mb-8">Test the FastAPI backend live. Adjust parameters to see attrition probability.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <form onSubmit={handlePredictHR} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Age ({hrData.age})</label>
                  <input type="range" min="18" max="65" value={hrData.age} onChange={(e) => setHrData({...hrData, age: parseInt(e.target.value)})} className="w-full accent-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Monthly Income ${hrData.income}</label>
                  <input type="range" min="2000" max="20000" step="500" value={hrData.income} onChange={(e) => setHrData({...hrData, income: parseInt(e.target.value)})} className="w-full accent-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Job Satisfaction (1-5): {hrData.satisfaction}</label>
                  <input type="range" min="1" max="5" value={hrData.satisfaction} onChange={(e) => setHrData({...hrData, satisfaction: parseInt(e.target.value)})} className="w-full accent-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Years at Company: {hrData.years}</label>
                  <input type="range" min="0" max="20" value={hrData.years} onChange={(e) => setHrData({...hrData, years: parseInt(e.target.value)})} className="w-full accent-cyan-400" />
                </div>
                
                <button type="submit" className="w-full py-3 bg-accent-cyan text-dark-100 font-bold rounded hover:bg-cyan-300 transition-colors mt-4 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                  Run Prediction
                </button>
              </form>
              
              <div className="bg-black/30 rounded-xl p-6 border border-white/5 flex flex-col justify-center items-center text-center">
                {hrResult ? (
                  <div className="w-full">
                    <h4 className="text-gray-400 mb-2">Attrition Risk</h4>
                    <div className={`text-6xl font-black mb-4 ${hrResult.prediction === 'Yes' ? 'text-red-500 neon-text-red' : 'text-green-500'}`}>
                      {hrResult.probability}
                    </div>
                    <p className="text-xl text-white mb-6">Prediction: <span className="font-bold">{hrResult.prediction}</span></p>
                    
                    <div className="text-left">
                      <p className="text-sm text-gray-400 mb-2">Key Drivers:</p>
                      <ul className="list-disc pl-5 text-sm text-gray-300">
                        {hrResult.key_factors.map((f: string, i: number) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 flex flex-col items-center">
                    <Activity className="w-12 h-12 mb-4 opacity-20" />
                    <p>Adjust parameters and run prediction to see results</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Simple Recharts Demo for metrics visualization */}
            <div className="mt-12">
              <h4 className="text-white font-bold mb-4">Model Performance Metrics (Mock Data)</h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Accuracy', score: 92, fill: '#00f0ff' },
                    { name: 'Precision', score: 88, fill: '#b026ff' },
                    { name: 'Recall', score: 85, fill: '#00ff9d' },
                    { name: 'F1 Score', score: 86, fill: '#e94560' },
                  ]}>
                    <XAxis dataKey="name" stroke="#a0aec0" />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#1a1a2e', borderColor: '#3b82f6'}} />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Demo Modal for Music */}
      {activeDemo === "mood-music" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8 relative border-accent-purple/50">
            <button onClick={() => setActiveDemo(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-2">Music Recommender</h3>
            <p className="text-gray-400 mb-8">Select a mood to get song recommendations from the ML backend.</p>
            
            <form onSubmit={handlePredictMusic} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">How are you feeling?</label>
                <select 
                  value={musicMood} 
                  onChange={(e) => setMusicMood(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-colors"
                >
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="energetic">Energetic</option>
                  <option value="calm">Calm</option>
                </select>
              </div>
              
              <button type="submit" className="w-full py-3 bg-accent-purple text-white font-bold rounded hover:bg-purple-400 transition-colors mt-4 shadow-[0_0_10px_rgba(176,38,255,0.3)]">
                Get Recommendations
              </button>
            </form>
            
            <div className="mt-8 bg-black/30 rounded-xl p-6 border border-white/5">
              {musicResult ? (
                <div>
                  <h4 className="text-accent-purple font-bold mb-4 flex justify-between items-center">
                    Recommended Songs
                    <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">
                      Confidence: {musicResult.confidence_score}
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    {musicResult.recommended_songs.map((song: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg">
                        <Play className="w-4 h-4 text-accent-purple" />
                        {song}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">
                  Select a mood to generate a playlist
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
}
