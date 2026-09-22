"use client";

import { useEffect, useState } from "react";
import UniverseCanvas from "@/components/3d/UniverseCanvas";
import HUD from "@/components/ui/HUD";
import Terminal from "@/components/ui/Terminal";
import AIChat from "@/components/ui/AIChat";
import Section from "@/components/ui/Section";
import CommandPalette from "@/components/ui/CommandPalette";
import FloatingNav from "@/components/ui/FloatingNav";
import ParticleCursor from "@/components/ui/ParticleCursor";
import ScrollProgressRing from "@/components/ui/ScrollProgressRing";
import ThemeCustomizer from "@/components/ui/ThemeCustomizer";
import { portfolioData } from "@/data/data";
import Lenis from "lenis";
import { useAppStore } from "@/store/useAppStore";
import { Code, Briefcase, Mail, ExternalLink, Award, GraduationCap, Users, X } from "lucide-react";
import { motion } from "framer-motion";

const getSkillLink = (skill: string) => {
  const customLinks: Record<string, string> = {
    "Python": "https://docs.python.org/3/tutorial/index.html",
    "C++": "https://cplusplus.com/doc/tutorial/",
    "C": "https://devdocs.io/c/",
    "SQL": "https://dev.mysql.com/doc/refman/8.0/en/tutorial.html",
    "Machine Learning": "https://developers.google.com/machine-learning/crash-course",
    "Deep Learning": "https://d2l.ai/",
    "Computer Vision": "https://docs.opencv.org/master/d9/df8/tutorial_root.html",
    "Generative AI": "https://developers.google.com/machine-learning/resources/generative-ai",
    "PyTorch": "https://pytorch.org/tutorials/",
    "scikit-learn": "https://scikit-learn.org/stable/tutorial/index.html",
    "OpenCV": "https://docs.opencv.org/master/",
    "dlib": "http://dlib.net/python/index.html",
    "LangChain": "https://python.langchain.com/docs/get_started/introduction",
    "NLP": "https://huggingface.co/docs/transformers/",
    "LLMs": "https://huggingface.co/docs/transformers/index",
    "RAG": "https://research.ibm.com/blog/retrieval-augmented-generation-RAG",
    "Ollama": "https://ollama.com/",
    "MySQL": "https://dev.mysql.com/doc/",
    "PostgreSQL": "https://www.postgresql.org/docs/",
    "Supabase": "https://supabase.com/docs",
    "Pinecone": "https://docs.pinecone.io/",
    "ChromaDB": "https://docs.trychroma.com/",
    "Flask": "https://flask.palletsprojects.com/",
    "React": "https://react.dev/",
    "Next.js": "https://nextjs.org/docs",
    "Tailwind CSS": "https://tailwindcss.com/docs",
    "Git": "https://git-scm.com/doc",
    "GitHub": "https://docs.github.com/",
    "GitHub Actions": "https://docs.github.com/en/actions",
    "CI/CD": "https://www.redhat.com/en/topics/devops/what-is-ci-cd",
    "VS Code": "https://code.visualstudio.com/docs",
    "Linux": "https://www.kernel.org/doc/html/latest/",
    "Docker": "https://docs.docker.com/",
    "AWS": "https://docs.aws.amazon.com/",
    "Vercel": "https://vercel.com/docs",
    "NumPy": "https://numpy.org/doc/stable/",
    "Pandas": "https://pandas.pydata.org/docs/",
    "Matplotlib": "https://matplotlib.org/stable/users/index.html",
    "Data Science": "https://www.ibm.com/topics/data-science",
    "Agentic AI": "https://www.ibm.com/think/topics/ai-agents",
    "OOP": "https://cplusplus.com/doc/tutorial/classes/",
    "VGG19": "https://pytorch.org/vision/main/models/generated/torchvision.models.vgg19.html",
    "AdaIN": "https://arxiv.org/abs/1703.06868",
    "Resemblyzer": "https://github.com/resemble-ai/Resemblyzer",
    "Streamlit": "https://docs.streamlit.io/",
    "Agno": "https://docs.agno.com/"
  };
  
  // Fallback to a google search for documentation if exact match isn't found
  return customLinks[skill] || `https://www.google.com/search?q=${encodeURIComponent(skill + " official documentation")}`;
};

export default function Home() {
  const { fastMode } = useAppStore();
  const [wormholeActive, setWormholeActive] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  useEffect(() => {
    // Slower scroll setting
    const lenis = new Lenis({
      duration: 2.0, // Increased duration for smoother, slower scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Konami Code
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setWormholeActive(true);
          setTimeout(() => setWormholeActive(false), 5000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      lenis.destroy();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Framer motion variants for sequential staggered reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className={`relative bg-space-black min-h-[1600vh] transition-all duration-1000 ${wormholeActive ? 'hue-rotate-[180deg] scale-110 blur-sm' : ''}`}>
      {!fastMode && <UniverseCanvas />}
      <ParticleCursor />
      <ScrollProgressRing />
      <CommandPalette />
      <FloatingNav />
      <ThemeCustomizer />
      <HUD />
      <Terminal />
      <AIChat />

      {/* 2D Content Layer */}
      <div className="relative z-10 flex flex-col gap-[100vh] pb-[50vh]">
        
        {/* Section 1: Home */}
        <Section id="home" className="mt-0">
          <div className="text-center pt-20 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-4 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {portfolioData.personal.name}
            </h1>
            <p className="text-xl md:text-3xl font-light text-cosmic-blue mb-8">
              {portfolioData.personal.tagline}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#projects" className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all font-semibold">
                View Projects
              </a>
              <a href={portfolioData.personal.links.resume} target="_blank" rel="noreferrer" download="Gurnoor_Singh_Resume.pdf" className="px-6 py-3 bg-magenta-glow/80 hover:bg-magenta-glow backdrop-blur-md rounded-full text-white transition-all font-semibold shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                Download Resume
              </a>
            </div>
          </div>
        </Section>

        {/* Section 1.5: About */}
        <Section id="about">
          <div className="max-w-4xl mx-auto bg-black/40 hover:bg-black/50 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:-translate-y-2 transition-all duration-500">
            <h2 className="text-4xl font-display font-bold text-white mb-6 flex items-center gap-4">
              About Me
            </h2>
            <p className="text-xl leading-relaxed text-slate-300">
              {portfolioData.personal.about}
            </p>
          </div>
        </Section>

        {/* Section 2: Technical Skills */}
        <Section id="skills">
          <div className="max-w-4xl w-full bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
            <h2 className="text-4xl font-display font-bold text-magenta-glow mb-8 flex items-center gap-4">
              <Code size={36} /> Technical Skills
            </h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10%" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-cosmic-blue font-semibold uppercase tracking-wider text-sm mb-3">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {portfolioData.skills.languages.map(s => (
                    <a key={s} href={getSkillLink(s)} target="_blank" rel="noreferrer" className="px-4 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-full text-sm text-slate-200 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                      {s}
                    </a>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-cosmic-blue font-semibold uppercase tracking-wider text-sm mb-3">AI/ML & Data Science</h3>
                <div className="flex flex-wrap gap-3">
                  {portfolioData.skills.ai_ml.map(s => (
                    <a key={s} href={getSkillLink(s)} target="_blank" rel="noreferrer" className="px-4 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-full text-sm text-slate-200 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                      {s}
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-cosmic-blue font-semibold uppercase tracking-wider text-sm mb-3">Frameworks & Libraries</h3>
                <div className="flex flex-wrap gap-3">
                  {portfolioData.skills.frameworks.map(s => (
                    <a key={s} href={getSkillLink(s)} target="_blank" rel="noreferrer" className="px-4 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-full text-sm text-slate-200 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                      {s}
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-cosmic-blue font-semibold uppercase tracking-wider text-sm mb-3">Databases & Tools</h3>
                <div className="flex flex-wrap gap-3">
                  {[...portfolioData.skills.databases, ...portfolioData.skills.tools].map(s => (
                    <a key={s} href={getSkillLink(s)} target="_blank" rel="noreferrer" className="px-4 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-full text-sm text-slate-200 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
                      {s}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Section>

        {/* Section 3: Education */}
        <Section id="education">
          <div className="max-w-4xl w-full bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 ml-auto">
            <h2 className="text-4xl font-display font-bold text-cosmic-blue mb-8 flex items-center gap-4">
              <GraduationCap size={36} /> Education
            </h2>
            <div className="space-y-8">
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-cosmic-blue/50 hover:border-cosmic-blue pl-6 relative group transition-colors duration-300">
                  <div className="absolute w-4 h-4 bg-cosmic-blue rounded-full -left-[9px] top-1 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300"></div>
                  <div className="bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-lg text-slate-300">{edu.institution} — {edu.location}</p>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10 text-sm text-slate-400 font-mono">
                      <span className="text-cosmic-blue font-semibold">{edu.metrics}</span>
                      <span>{edu.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 4: Interpersonal Skills */}
        <Section id="interpersonal">
          <div className="max-w-3xl w-full bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 mx-auto text-center">
            <h2 className="text-4xl font-display font-bold text-teal-accent mb-8 flex justify-center items-center gap-4">
              <Users size={36} /> Interpersonal Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {portfolioData.interpersonal.map((skill, idx) => (
                <div key={idx} className="px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/20 border border-white/10 hover:border-white/30 rounded-xl text-lg font-medium text-slate-200 hover:text-white shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-default">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 5: Projects */}
        <Section id="projects">
          <div className="max-w-5xl w-full mx-auto">
            <h2 className="text-5xl font-display font-bold text-white mb-12 text-center drop-shadow-md">
              Featured Projects
            </h2>
            <div className="space-y-16">
              {portfolioData.projects.map((project, idx) => (
                <div key={idx} className="bg-black/60 hover:bg-black/70 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/10 hover:border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.05)] hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] transition-all duration-500 hover:-translate-y-2 group">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                      <h3 className="text-3xl font-bold text-white group-hover:text-cosmic-blue transition-colors duration-300">{project.title}</h3>
                      <p className="text-xl text-slate-400 font-light mt-1">{project.subtitle}</p>
                    </div>
                    <a href={project.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10 hover:border-cosmic-blue">
                      Live Link <ExternalLink size={16} />
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <a 
                        key={t} 
                        href={getSkillLink(t)} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs font-mono px-3 py-1.5 bg-magenta-glow/10 hover:bg-magenta-glow/30 text-magenta-glow rounded-md border border-magenta-glow/20 transition-colors cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
                      >
                        {t}
                      </a>
                    ))}
                  </div>
                  
                  <p className="text-lg text-slate-300 mb-6">{project.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Key Features</h4>
                      <ul className="list-disc list-inside text-slate-400 space-y-2">
                        {project.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Purpose</h4>
                        <p className="text-slate-400">{project.purpose}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">What I Learned</h4>
                        <p className="text-slate-400">{project.learnings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 6: Certifications */}
        <Section id="certifications">
          <div className="max-w-4xl w-full bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
            <h2 className="text-4xl font-display font-bold text-magenta-glow mb-8 flex items-center gap-4">
              <Award size={36} /> Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.certifications.map((cert, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedCert(cert.url)} 
                  className="block text-left w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-magenta-glow/50 p-6 rounded-2xl hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-magenta-glow transition-colors">{cert.title}</h3>
                    <ExternalLink size={16} className="text-white/30" />
                  </div>
                  <div className="flex justify-between items-center text-slate-400 text-sm mt-4 pt-4 border-t border-white/5">
                    <span>{cert.issuer}</span>
                    <span className="font-mono text-magenta-glow/70">{cert.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 7: Academic Achievements */}
        <Section id="achievements">
          <div className="max-w-4xl w-full bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 ml-auto">
            <h2 className="text-4xl font-display font-bold text-cosmic-blue mb-8 flex items-center gap-4">
              <Award size={36} /> Academic Achievements
            </h2>
            <div className="space-y-6">
              {portfolioData.achievements.map((ach, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${ach.highlight ? 'bg-cosmic-blue/10 hover:bg-cosmic-blue/20 border-cosmic-blue shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/30 hover:shadow-xl'}`}>
                  <h3 className={`text-xl font-bold mb-3 ${ach.highlight ? 'text-cosmic-blue' : 'text-white'}`}>
                    {ach.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 8: Contact */}
        <Section id="contact">
          <div className="max-w-md mx-auto text-center bg-black/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(15,23,42,0.8)]">
            <h2 className="text-4xl font-display font-bold text-white mb-8">Enter the Black Hole</h2>
            <p className="text-slate-300 mb-8">Ready to pull me into your next big project?</p>
            
            <div className="flex justify-center gap-6 mb-8">
              <a href={portfolioData.personal.links.github} target="_blank" rel="noreferrer" className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white border border-white/10 hover:border-cosmic-blue hover:text-cosmic-blue" title="GitHub">
                <Code size={24} />
              </a>
              <a href={portfolioData.personal.links.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white border border-white/10 hover:border-cosmic-blue hover:text-cosmic-blue" title="LinkedIn">
                <Briefcase size={24} />
              </a>
              <a href={`mailto:${portfolioData.personal.links.email}`} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white border border-white/10 hover:border-cosmic-blue hover:text-cosmic-blue" title="Gmail">
                <Mail size={24} />
              </a>
            </div>
            
            {/* Swapped out dead form for a direct mailto action */}
            <a 
              href={`mailto:${portfolioData.personal.links.email}?subject=Excited to work together!`}
              className="block w-full py-4 bg-cosmic-blue hover:bg-cosmic-blue/80 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              Launch Message (Open Email)
            </a>
          </div>
        </Section>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setSelectedCert(null)}
          data-lenis-prevent="true"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-5xl h-[80vh] bg-neutral-900 rounded-2xl border border-white/20 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.3)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/50">
              <h3 className="text-xl font-bold text-white">Certificate View</h3>
              <button 
                onClick={() => setSelectedCert(null)}
                className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 w-full bg-white">
              <iframe 
                src={selectedCert} 
                className="w-full h-full border-none"
                title="Certificate PDF"
              />
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
