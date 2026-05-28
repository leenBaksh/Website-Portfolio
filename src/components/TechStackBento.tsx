import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { 
  Cpu, 
  Sparkles, 
  Globe, 
  Server, 
  Terminal, 
  Cloud, 
  Palette, 
  Figma, 
  Layers, 
  Award,
  Zap,
  CheckCircle,
  Lightbulb,
  Workflow
} from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
  icon: React.ElementType;
  brandColor: string; // Tailwind glow class/shadow
  accentHex: string;  // inline styling accent
  desc: string;
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accent: string;
  colSpanClass: string;
  skills: SkillItem[];
}

export default function TechStackBento() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bentoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bentoRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { damping: 28, stiffness: 85, mass: 0.15 };

  const y0 = useSpring(useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [35, -40]), springConfig);
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-15, 20]), springConfig);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [25, -30]), springConfig);
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-20, 15]), springConfig);

  const parallaxY = [y0, y1, y2, y3];

  const categories: Category[] = [
    {
      id: "ai-systems",
      title: "AI & Agentic Systems",
      subtitle: "Autonomous reasoning & agent-based engineering",
      icon: Cpu,
      accent: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      colSpanClass: "lg:col-span-3",
      skills: [
        { 
          name: "OpenAI Agents SDK", 
          level: 93, 
          icon: Workflow, 
          brandColor: "group-hover:text-[#10a37f] group-hover:border-[#10a37f]/40 group-hover:bg-[#10a37f]/5", 
          accentHex: "#10a37f",
          desc: "Multi-agent systems & spec-driven dev"
        },
        { 
          name: "Gemini API", 
          level: 95, 
          icon: Sparkles, 
          brandColor: "group-hover:text-[#8e75ff] group-hover:border-[#8e75ff]/40 group-hover:bg-[#8e75ff]/5", 
          accentHex: "#8e75ff",
          desc: "Multi-modal vision & structured data outputs" 
        },
        { 
          name: "Prompt Engineering", 
          level: 94, 
          icon: Cpu, 
          brandColor: "group-hover:text-[#139c85] group-hover:border-[#139c85]/40 group-hover:bg-[#139c85]/5", 
          accentHex: "#139c85",
          desc: "Advanced logic layouts for Claude & Qwen" 
        }
      ]
    },
    {
      id: "full-stack",
      title: "Frontend & Interface",
      subtitle: "Scalable interactive web applications",
      icon: Globe,
      accent: "text-cyan-glow border-cyan-glow/20 bg-cyan-glow/5",
      colSpanClass: "lg:col-span-3",
      skills: [
        { 
          name: "Next.js 15 & React", 
          level: 95, 
          icon: Globe, 
          brandColor: "group-hover:text-[#ffffff] group-hover:border-white/40 group-hover:bg-white/5", 
          accentHex: "#ffffff",
          desc: "RSC rendering frameworks & SPA routing" 
        },
        { 
          name: "TypeScript", 
          level: 94, 
          icon: Server, 
          brandColor: "group-hover:text-[#007acc] group-hover:border-[#007acc]/40 group-hover:bg-[#007acc]/5", 
          accentHex: "#007acc",
          desc: "Strict type safety & modular architecture" 
        },
        { 
          name: "ShadCN & Aceternity UI", 
          level: 91, 
          icon: Layers, 
          brandColor: "group-hover:text-[#00f0ff] group-hover:border-cyan-glow/40 group-hover:bg-cyan-glow/5", 
          accentHex: "#00f0ff",
          desc: "Modern responsive client UI styling with Tailwind" 
        }
      ]
    },
    {
      id: "devops",
      title: "DevOps & Automations",
      subtitle: "Automated pipelines & safe scaling",
      icon: Terminal,
      accent: "text-purple-glow border-purple-glow/20 bg-purple-glow/5",
      colSpanClass: "lg:col-span-3",
      skills: [
        { 
          name: "FastAPI & Node.js", 
          level: 92, 
          icon: Terminal, 
          brandColor: "group-hover:text-[#009688] group-hover:border-[#009688]/40 group-hover:bg-[#009688]/5", 
          accentHex: "#009688",
          desc: "Asynchronous backend APIs routing" 
        },
        { 
          name: "Docker & Kubernetes", 
          level: 88, 
          icon: Cloud, 
          brandColor: "group-hover:text-[#0db7ed] group-hover:border-[#0db7ed]/40 group-hover:bg-[#0db7ed]/5", 
          accentHex: "#0db7ed",
          desc: "Container deployments & Google GKE basics" 
        },
        { 
          name: "n8n & Puppeteer", 
          level: 93, 
          icon: Zap, 
          brandColor: "group-hover:text-[#ff6a00] group-hover:border-[#ff6a00]/40 group-hover:bg-[#ff6a00]/5", 
          accentHex: "#ff6a00",
          desc: "AI workflow systems reducing task effort by 60%" 
        }
      ]
    },
    {
      id: "design",
      title: "Creative Design & Databases",
      subtitle: "Visual brand assets & information stacks",
      icon: Palette,
      accent: "text-pink-500 border-pink-500/20 bg-pink-500/5",
      colSpanClass: "lg:col-span-3",
      skills: [
        { 
          name: "Canva, Figma, Adobe Suite", 
          level: 95, 
          icon: Figma, 
          brandColor: "group-hover:text-[#f24e1e] group-hover:border-[#f24e1e]/40 group-hover:bg-[#f24e1e]/5", 
          accentHex: "#f24e1e",
          desc: "Illustrator, Photoshop, layouts & digital planners" 
        },
        { 
          name: "PowerPoint & Keynote", 
          level: 92, 
          icon: Palette, 
          brandColor: "group-hover:text-[#ff0000] group-hover:border-[#ff0000]/40 group-hover:bg-[#ff0000]/5", 
          accentHex: "#ff0000",
          desc: "Pitch presentations, Google Slides & design materials" 
        },
        { 
          name: "MongoDB, SQLite, Sanity CMS", 
          level: 89, 
          icon: Layers, 
          brandColor: "group-hover:text-[#47a248] group-hover:border-[#47a248]/40 group-hover:bg-[#47a248]/5", 
          accentHex: "#47a248",
          desc: "Document storage, SQL, and Excel budget analysis" 
        }
      ]
    }
  ];

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: any = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 110,
      },
    },
  };

  return (
    <div className="space-y-8">
      
      {/* Hybrid Thinker Design Highlight Ribbon */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-gradient-to-r from-cyan-glow/10 via-zinc-900 to-purple-glow/10 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-cyan-glow/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-purple-glow/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 text-center md:text-left max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-extrabold max-w-fit shadow-[0_0_15px_rgba(0,240,255,0.15)] animate-pulse">
            <Award size={11} />
            <span>Design Thinking Badge</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight">
            Creative-Dev Hybrid Architecture
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Pioneering a hybrid paradigm that bridges scientific engineering with refined design craftsmanship. Every single project is designed from the pixel level up to dynamic server loops with symmetric visual rigor.
          </p>
        </div>

        <div className="shrink-0 flex items-center justify-center bg-zinc-950/40 border border-white/[0.04] rounded-xl p-4 md:p-5 w-full md:w-auto relative group">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-xl bg-purple-glow/10 border border-purple-glow/20 flex items-center justify-center text-purple-glow group-hover:scale-110 transition-transform">
              <Lightbulb size={24} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-500 uppercase">Hybrid Score</div>
              <div className="text-lg font-bold text-white font-mono flex items-center gap-1">
                <span>99.9% Dual Core</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-ping"></span>
              </div>
              <div className="text-[9px] font-mono text-purple-glow uppercase tracking-wider font-semibold">
                Aesthetic & Logic Spliced
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div 
        ref={bentoRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
      >
        
        {categories.map((category, idx) => {
          const CatIcon = category.icon;
          const catY = parallaxY[idx % parallaxY.length];
          return (
            <motion.div
              key={category.id}
              variants={itemVariants}
              style={{ y: catY }}
              className={`${category.colSpanClass} bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_10px_35px_rgba(0,240,255,0.03)] h-full`}
            >
              <div className="space-y-6">
                
                {/* Header info */}
                <div className="flex items-start justify-between border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-zinc-950/40 border border-white/5 text-gray-400 group-hover:text-cyan-glow transition-all">
                        <CatIcon size={14} />
                      </div>
                      <h4 className="text-sm font-display font-semibold text-white tracking-wide uppercase">
                        {category.title}
                      </h4>
                    </div>
                    <p className="text-gray-500 text-[10px] font-mono">
                      {category.subtitle}
                    </p>
                  </div>
                  <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase">
                    Core_04
                  </span>
                </div>

                {/* Interactive Skills Cards Stack */}
                <div className="space-y-3">
                  {category.skills.map((skill, sIdx) => {
                    const SkillIcon = skill.icon;
                    const isHovered = hoveredSkill === skill.name;
                    
                    return (
                      <div
                        key={`skill-card-${category.id}-${skill.name}-${sIdx}`}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`p-3 bg-zinc-950/30 hover:bg-zinc-950/80 rounded-xl border transition-all duration-300 flex flex-col gap-2.5 group cursor-pointer ${
                          isHovered 
                            ? "border-opacity-30 translate-x-1" 
                            : "border-white/[0.02]"
                        }`}
                        style={{
                          borderColor: isHovered ? skill.accentHex : "rgba(255, 255, 255, 0.02)",
                          boxShadow: isHovered ? `0 0 15px ${skill.accentHex}15` : "none"
                        }}
                      >
                        {/* Title, Icon and metric progress */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div 
                              className={`p-1.5 rounded-lg bg-zinc-900 border border-white/5 text-gray-500 transition-all ${skill.brandColor}`}
                            >
                              <SkillIcon size={12} />
                            </div>
                            <div>
                              <span className="block font-mono text-[11px] text-gray-300 transition-all font-semibold"
                                    style={{
                                      color: isHovered ? skill.accentHex : undefined
                                    }}>
                                {skill.name}
                              </span>
                              <span className="block text-gray-500 text-[9px] font-mono">
                                {skill.desc}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <span 
                              className="font-mono text-[10px] font-bold text-gray-500 block transition-all"
                              style={{
                                color: isHovered ? skill.accentHex : undefined
                              }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Animated slider bar */}
                        <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden relative">
                          <motion.div
                            className="h-full rounded-full transition-colors duration-300"
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, margin: "-10px" }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            style={{
                              backgroundColor: isHovered ? skill.accentHex : "#18181b",
                              backgroundImage: isHovered ? "none" : "linear-gradient(90deg, #00f0ff, #b026ff)"
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Verified array status tag */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-gray-500">
                <span className="uppercase tracking-widest">Stack Certified</span>
                <div className="flex items-center gap-1">
                  <CheckCircle size={10} className="text-cyan-glow" />
                  <span className="text-zinc-400 font-bold">READY</span>
                </div>
              </div>
            </motion.div>
          );
        })}

      </motion.div>
    </div>
  );
}
