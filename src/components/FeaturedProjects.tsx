import React, { useState, useEffect } from "react";
import { 
  Github, 
  ExternalLink, 
  Award, 
  CheckCircle2, 
  Shield, 
  Lock, 
  Cpu, 
  Plus, 
  Trash2, 
  ArrowUpRight, 
  RefreshCw, 
  Zap, 
  Layers, 
  ListTodo, 
  Calculator, 
  Eye, 
  BookOpen, 
  Check, 
  Sparkles, 
  Activity, 
  Compass 
} from "lucide-react";
import TiltCard from "./TiltCard";

export default function FeaturedProjects() {
  // Card 1: 3D Book Flip Animation States
  const [bookOpened, setBookOpened] = useState(false);

  // Card 2: Security System States
  const [encryptInput, setEncryptInput] = useState("CONFIDENTIAL_SYSTEM_ACCESS");
  const [encryptedValue, setEncryptedValue] = useState("V2VybGNvbWUgVG8gSGV4QXJtb3IgUG9seW1vcnBoaWM=");
  const [isScanning, setIsScanning] = useState(true);
  const [securityLevel, setSecurityLevel] = useState("Maximum");

  const handleEncrypt = () => {
    // Generate a quick cipher string for live feedback
    const arr = Array.from(encryptInput).map((c) => 
      String.fromCharCode(c.charCodeAt(0) + 3)
    ).join("");
    setEncryptedValue(btoa(arr || "EMPTY_BUFFER"));
  };

  // Card 3: Growth Mindset states
  const [habits, setHabits] = useState([
    { id: 1, text: "Explore Neural Nets concepts", completed: true },
    { id: 2, text: "Read 2 theory pages on kinematics solvers", completed: true },
    { id: 3, text: "Deploy daily edge security patches", completed: false },
    { id: 4, text: "Review user experience with creative design", completed: false }
  ]);
  const [streak, setStreak] = useState(14);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const getProgressPercent = () => {
    const completed = habits.filter(h => h.completed).length;
    return Math.round((completed / habits.length) * 100);
  };

  // Card 4: Ad Work & Branding States
  const [activeAdIndex, setActiveAdIndex] = useState(0);
  const brandingCampaigns = [
    {
      title: "Digital Planner Design",
      sub: "Creative Planners & Organizers",
      accent: "#00f0ff",
      gradient: "from-cyan-glow/20 to-zinc-900",
      stats: { reach: "Budget & Goals", conv: "Canva Models", uptime: "100% Done" }
    },
    {
      title: "Vector Merchandise Assets",
      sub: "T-Shirts, Pillows & Mobile/Book Covers",
      accent: "#b026ff",
      gradient: "from-purple-glow/20 to-zinc-900",
      stats: { reach: "Custom Art", conv: "Print Ready", uptime: "100% Quality" }
    },
    {
      title: "Corporate Pitch Presentations",
      sub: "PPT, KeyNote & Canva Decks",
      accent: "#10b981",
      gradient: "from-emerald-500/20 to-zinc-900",
      stats: { reach: "Polished Slides", conv: "Visual Delivery", uptime: "100% Feedback" }
    }
  ];

  // Card 5: Calculator States
  const [calcVal, setCalcVal] = useState("137.4");
  const [calcHistory, setCalcHistory] = useState("88.2 + 49.2");
  
  const handleCalcClick = (btn: string) => {
    if (btn === "C") {
      setCalcVal("");
      setCalcHistory("");
    } else if (btn === "=") {
      try {
        // Simple evaluation safely for specific calculator buttons representation
        // eslint-disable-next-line no-eval
        const result = eval(calcVal.replace(/×/g, "*").replace(/÷/g, "/"));
        setCalcHistory(calcVal);
        setCalcVal(Number(result).toFixed(2).replace(/\.00$/, ""));
      } catch {
        setCalcVal("ERROR");
      }
    } else {
      setCalcVal(prev => prev === "0" || prev === "137.4" ? btn : prev + btn);
    }
  };

  // Card 5: Todo App States
  const [todos, setTodos] = useState([
    { id: 1, text: "Review Embedded C++ firmware compilation bounds", completed: false },
    { id: 2, text: "Build 3D interactive portfolio section", completed: true },
    { id: 3, text: "Integrate neural core voice synthesizer", completed: false }
  ]);
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodoText, completed: false }]);
    setNewTodoText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-16">
      
      {/* 3D Projects Showcase Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 items-stretch">
        
        {/* ========= CARD 1: Agentic AI Engineering Course Portfolio (3 Columns) ========= */}
        <div className="lg:col-span-3 flex flex-col">
          <TiltCard className="flex-1 bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group h-full">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-glow/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-glow/10 transition-all duration-300" />
            
            <div className="space-y-4">
              {/* Card Header Labels */}
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.15)] animate-pulse">
                  <Award size={11} />
                  <span>Agentic AI Highlight</span>
                </span>
                <span className="text-[10px] font-mono text-gray-500">INITIATIVE: GIAIC_Q4</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-display font-medium text-white group-hover:text-cyan-glow transition-all">
                  Agentic AI & Intelligent Automations
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  Authoring study guides and prototypes focusing on spec-driven automation pipelines, stateful OpenAI/Gemini agent tools, and Docker layouts.
                </p>
              </div>

              {/* 3D BOOK-FLIP INTERACTIVE WORKSPACE */}
              <div 
                className="my-5 h-56 bg-black/40 border border-white/[0.04] rounded-2xl flex items-center justify-center relative cursor-pointer group/book overflow-hidden"
                onMouseEnter={() => setBookOpened(true)}
                onMouseLeave={() => setBookOpened(false)}
                onClick={() => setBookOpened(!bookOpened)}
              >
                {/* Instruction Indicator overlay */}
                <div className="absolute top-2.5 right-3 text-[9px] font-mono text-cyan-glow/60 bg-black/40 px-2 py-0.5 rounded border border-white/5 flex items-center gap-1 pointer-events-none">
                  <BookOpen size={10} className="animate-pulse" />
                  <span>{bookOpened ? "CLOSE_BOOK" : "HOVER_TO_OPEN"}</span>
                </div>

                {/* 3D Scene Wrapper with Perspective */}
                <div className="w-56 h-40 relative flex items-center justify-center [perspective:1200px]">
                  
                  {/* The actual Book element */}
                  <div 
                    className="w-36 h-48 relative shadow-2xl transition-all duration-700 ease-in-out"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: bookOpened ? "rotateY(-25deg) rotateX(12deg) scale(1.05)" : "rotateY(0deg) rotateX(0deg) scale(1)"
                    }}
                  >
                    {/* Inner Paper Pages (visible only when book spreads open) */}
                    <div className="absolute inset-y-1.5 right-1 w-[95%] bg-zinc-150 border-r border-zinc-300 rounded-r-md flex flex-col p-3 font-mono text-[6px] text-zinc-800 leading-normal pointer-events-none select-none shadow-md">
                      <div className="text-[8px] font-bold text-purple-950 border-b border-zinc-300 pb-1 mb-1 font-sans">
                        § 4 Agentic Workflows
                      </div>
                      <div className="font-semibold text-sky-900">{"// OpenAI Agents SDK"}</div>
                      <div>{"Engine = [ n8n -> Puppeteer ]"}</div>
                      <div>{"Task Effort Reduced By 60%"}</div>
                      <div className="mt-1.5 font-semibold text-sky-900">{"// GIAIC Prototypes"}</div>
                      <div>Engineers course content generation</div>
                      <div>using custom script agents.</div>
                      <div className="mt-2 border-t border-zinc-200 pt-1 text-[5px] text-zinc-500 italic flex justify-between">
                        <span>Agent_AIGuide.py</span>
                        <span>Page 142</span>
                      </div>
                    </div>

                    {/* Book Cover Cover (flips / rotates around left hinge) */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 rounded-r-lg flex flex-col justify-between p-3.5 origin-left transition-transform duration-700 ease-in-out select-none shadow-2xl"
                      style={{
                        transform: bookOpened ? "rotateY(-115deg)" : "rotateY(0deg)",
                        zIndex: 10
                      }}
                    >
                      {/* Spine decoration */}
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/40 rounded-r-sm" />
                      
                      <div className="space-y-2 mt-2 pl-2">
                        <div className="text-[7px] font-mono text-cyan-glow font-bold tracking-widest uppercase bg-cyan-glow/5 px-1 py-0.5 rounded border border-cyan-glow/10 w-fit">
                          GIAIC STUDY MODULE
                        </div>
                        <h4 className="text-[12px] leading-tight font-display font-black text-white text-shadow-sm uppercase">
                          Agentic AI Engineering
                        </h4>
                      </div>

                      <div className="pl-2 flex items-center justify-between">
                        <div className="text-[7px] font-mono text-gray-500">
                          VOL.4 // 2026
                        </div>
                        <div className="w-5 h-5 rounded-full bg-cyan-glow/20 border border-cyan-glow/30 flex items-center justify-center">
                          <Cpu size={9} className="text-cyan-glow" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Tags & Action Links */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-gray-400">
                <span className="bg-white/5 border border-white/5 rounded px-2 py-0.5">Agentic AI Workflows</span>
                <span className="bg-white/5 border border-white/5 rounded px-2 py-0.5">n8n Automation Pipeline</span>
                <span className="bg-white/5 border border-white/5 rounded px-2 py-0.5">FastAPI & Docker Deploy</span>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://github.com/leenBaksh" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white font-mono text-[11px] font-semibold text-center flex items-center justify-center gap-1.5 border border-white/5 hover:border-cyan-glow/30 transition-all"
                >
                  <Github size={12} />
                  <span>GitHub Repository</span>
                </a>
                <button 
                  onClick={() => setBookOpened(!bookOpened)}
                  className="flex-1 py-2 rounded-lg bg-cyan-glow text-dark-bg font-mono text-[11px] font-bold text-center flex items-center justify-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                >
                  <ExternalLink size={12} />
                  <span>Toggle Live Book</span>
                </button>
              </div>
            </div>

          </TiltCard>
        </div>

        {/* ========= CARD 2: Secure Data Encryption System (3 Columns) ========= */}
        <div className="lg:col-span-3 flex flex-col">
          <TiltCard className="flex-1 bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group h-full">
            
            {/* Laser scanning beam */}
            {isScanning && (
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-glow to-transparent shadow-[0_0_20px_#00f0ff] animate-[pulse_1.5s_infinite] pointer-events-none"
                   style={{
                     animationName: "grid-drift",
                     animationDuration: "4s",
                     animationIterationCount: "infinite",
                     animationTimingFunction: "linear",
                     height: "3px"
                   }} />
            )}

            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-1 bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase font-bold">
                  <Shield size={11} className="animate-spin-slow" />
                  <span>Secure Node Sandbox</span>
                </span>
                <span className="text-[10px] font-mono text-gray-500">Uptime: 100% Secure</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-display font-medium text-white group-hover:text-purple-glow transition-all">
                  Polymorphic Encryption Sandbox
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Advanced custom encryption engine converting text streams into rotating polymorphic byte shards safely within browser security constraints.
                </p>
              </div>

              {/* STREAMLIT STYLE UI PANEL WITH SCANNING LIGHT */}
              <div className="p-4 bg-black/45 border border-white/[0.03] rounded-2xl relative overflow-hidden font-mono text-[10px] text-gray-300 space-y-3.5 my-3">
                {/* Scanning sweep indicator line */}
                <div 
                  className="absolute inset-x-0 h-[1.5px] bg-cyan-glow/50 shadow-[0_0_8px_rgba(0,240,255,0.7)] pointer-events-none"
                  style={{
                    animation: "pulse 2s infinite"
                  }}
                />

                {/* Sidebar Mock Header / Streamlit Widgets Style */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-1.5 text-[9px] text-gray-500 uppercase">
                    <span>📁 ST_SIDEBAR_CONFIG</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                    <span className="text-green-400 font-bold">ST_ONLINE</span>
                  </div>
                </div>

                {/* Streamlit style controls */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-zinc-950/40 border border-white/3 p-2 rounded">
                      <div className="text-gray-500 uppercase text-[8px] tracking-wide mb-0.5">🔑 CIPHER_KEY</div>
                      <div className="text-white hover:text-cyan-glow transition-all overflow-hidden truncate">ROT128_SHARD_MODE</div>
                    </div>
                    <div className="bg-zinc-950/40 border border-white/3 p-2 rounded">
                      <div className="text-gray-500 uppercase text-[8px] tracking-wide mb-0.5">🔒 PARAMS</div>
                      <select 
                        value={securityLevel} 
                        onChange={(e) => setSecurityLevel(e.target.value)}
                        className="bg-zinc-950/20 text-cyan-glow font-bold outline-none cursor-pointer text-[10px] w-full"
                      >
                        <option value="Standard">Standard (ROT)</option>
                        <option value="Maximum">Polymorphic 128</option>
                        <option value="Quantum">Quantum Hardened</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 uppercase text-[8px] mb-1">💬 Plaintext Buffer Input</div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={encryptInput} 
                        onChange={(e) => setEncryptInput(e.target.value)} 
                        className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1 text-white outline-none focus:border-cyan-glow text-[10px]"
                      />
                      <button 
                        onClick={handleEncrypt}
                        className="bg-cyan-glow hover:bg-cyan-glow/85 text-dark-bg font-bold px-2.5 py-1 rounded text-[9px] uppercase tracking-wider transition-all"
                      >
                        ENCRYPT
                      </button>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-white/5 rounded p-2 overflow-x-auto select-all max-h-16">
                    <div className="text-[8px] text-gray-500 mb-0.5 uppercase tracking-wide">Output Encrypted Shards:</div>
                    <div className="text-purple-glow font-semibold break-all text-[9.5px]">
                      {encryptedValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer and tech labels */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-gray-400">
                <span className="bg-white/5 border border-white/5 rounded px-2 py-0.5">Streamlit Web UI</span>
                <span className="bg-white/5 border border-white/5 rounded px-2 py-0.5">AES ROT Module</span>
                <span className="bg-white/5 border border-white/5 rounded px-2 py-0.5">Cryptographical entropy</span>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://github.com/leenBaksh" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white font-mono text-[11px] font-semibold text-center flex items-center justify-center gap-1.5 border border-white/5 hover:border-cyan-glow/30 transition-all"
                >
                  <Github size={12} />
                  <span>GitHub Project</span>
                </a>
                <button 
                  onClick={() => setIsScanning(!isScanning)}
                  className={`flex-1 py-2 rounded-lg font-mono text-[11px] font-bold text-center flex items-center justify-center gap-1.5 transition-all ${
                    isScanning 
                      ? "bg-purple-glow/20 border border-purple-glow/30 text-purple-glow hover:bg-purple-glow/30" 
                      : "bg-zinc-800 hover:bg-zinc-750 text-gray-300 border border-white/5"
                  }`}
                >
                  <span>{isScanning ? "Deactivate Scanner" : "Activate Scanner"}</span>
                </button>
              </div>
            </div>

          </TiltCard>
        </div>

        {/* ========= CARD 3: Growth Mindset Challenge (2 Columns) ========= */}
        <div className="lg:col-span-2 flex flex-col">
          <TiltCard className="flex-1 bg-gradient-to-br from-indigo-950/40 via-zinc-900/90 to-zinc-950 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group h-full">
            
            {/* Background glowing circle */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all duration-305" />

            <div className="space-y-4">
              {/* Header Status */}
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase font-bold animate-pulse">
                  <Zap size={10} />
                  <span>Daily Streak: {streak} d</span>
                </span>
                <span className="text-[10px] font-mono text-gray-500">MINDSET_TRACK</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-display font-medium text-white group-hover:text-emerald-400 transition-all">
                  Growth Mindset Tracker
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Interactive progress-driven daily goals planner motivating self-growth metrics, computing levels dynamically as modules complete.
                </p>
              </div>

              {/* ACTIVE PROGRESS TRACKING ANIMATION */}
              <div className="space-y-4 my-2">
                <div className="flex items-center justify-between font-mono bg-zinc-900/50 p-3 rounded-xl border border-white/[0.03]">
                  <div className="relative w-16 h-16 shrink-0">
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-zinc-800"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-emerald-400 transition-all duration-500 ease-out"
                        strokeWidth="2.5"
                        strokeDasharray={`${getProgressPercent()}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                      {getProgressPercent()}%
                    </div>
                  </div>

                  <div className="space-y-1 ml-3 text-[10px]">
                    <div className="text-gray-500">CORE LEVEL STATUS:</div>
                    <div className="text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider">
                      {getProgressPercent() === 100 ? "PERFECT CORE ACTIVE" : "COGNITIVE STRETCH"}
                    </div>
                    <div className="text-gray-400 text-[9px]">
                      {habits.filter(h => h.completed).length} of {habits.length} blocks checked
                    </div>
                  </div>
                </div>

                {/* Checklist with clicks */}
                <div className="space-y-1.5 font-mono text-[9px] text-gray-300">
                  {habits.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => toggleHabit(h.id)}
                      className="w-full text-left p-2 bg-zinc-950/40 hover:bg-zinc-950 border border-white/3 rounded flex items-center gap-2 group/btn transition-all text-gray-300 hover:text-white"
                    >
                      <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 transition-all duration-150 ${
                        h.completed 
                          ? "bg-emerald-500/20 border-emerald-400 text-emerald-400" 
                          : "border-zinc-700 hover:border-zinc-500"
                      }`}>
                        {h.completed && <Check size={10} strokeWidth={3} />}
                      </span>
                      <span className={`truncate ${h.completed ? "line-through text-zinc-500" : ""}`}>
                        {h.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer details */}
            <div className="space-y-3.5 pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <a 
                  href="https://github.com/leenBaksh" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-1.5 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-white font-mono text-[10px] text-center flex items-center justify-center gap-1 border border-white/3 transition-all"
                >
                  <Github size={11} />
                  <span>GitHub</span>
                </a>
                <button 
                  onClick={() => setStreak(s => s + 1)}
                  className="flex-1 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono text-[10px] text-center flex items-center justify-center gap-1 border border-emerald-500/20 transition-all"
                >
                  <Sparkles size={11} />
                  <span>Log Streak</span>
                </button>
              </div>
            </div>

          </TiltCard>
        </div>

        {/* ========= CARD 4: Ad Work & Branding (2 Columns) ========= */}
        <div className="lg:col-span-2 flex flex-col">
          <TiltCard className="flex-1 bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group h-full">
            
            <div className="space-y-4">
              {/* Header Status */}
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-1 bg-purple-glow/15 text-purple-glow border border-purple-glow/20 rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase font-bold">
                  <Layers size={10} />
                  <span>Creative Digital Studio</span>
                </span>
                <span className="text-[10px] font-mono text-gray-500">Campaign {activeAdIndex + 1}/3</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-display font-medium text-white group-hover:text-cyan-glow transition-all">
                  Ad Work & Branding
                </h3>
                <p className="text-gray-450 text-xs leading-relaxed">
                  Interactive mini-gallery spotlighting strategic creative directions, high-converting digital assets, and elegant brand visual identity palettes.
                </p>
              </div>

              {/* MINI GALLERY SLIDES LAYOUT */}
              <div className="my-2 space-y-3">
                <div className={`p-4 rounded-2xl bg-gradient-to-tr ${brandingCampaigns[activeAdIndex].gradient} border border-white/5 relative overflow-hidden min-h-[110px] flex flex-col justify-between transition-all duration-300`}>
                  
                  {/* Subtle design decor elements */}
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandingCampaigns[activeAdIndex].accent }} />
                  
                  <div>
                    <span className="block font-mono text-[8px] uppercase tracking-widest opacity-65 text-gray-400">
                      {brandingCampaigns[activeAdIndex].sub}
                    </span>
                    <h4 className="text-md font-display font-black text-white mt-1 uppercase tracking-tight">
                      {brandingCampaigns[activeAdIndex].title}
                    </h4>
                  </div>

                  <div className="grid grid-cols-3 gap-1 border-t border-white/5 pt-2 mt-3 font-mono text-[8px]">
                    <div>
                      <span className="block text-gray-500">TRAFFIC</span>
                      <span className="text-white font-semibold">{brandingCampaigns[activeAdIndex].stats.reach}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">ENGAGEMENT</span>
                      <span className="text-white font-semibold">{brandingCampaigns[activeAdIndex].stats.conv}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">CONVERSION</span>
                      <span className="text-cyan-glow font-bold">{brandingCampaigns[activeAdIndex].stats.uptime}</span>
                    </div>
                  </div>
                </div>

                {/* Dot selectors to navigate slide items */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  {brandingCampaigns.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveAdIndex(idx)}
                      className={`w-6 h-1 rounded-full transition-all duration-200 ${
                        activeAdIndex === idx ? "bg-cyan-glow" : "bg-zinc-800 hover:bg-zinc-700"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tags and Live URL action buttons */}
            <div className="space-y-3.5 pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <a 
                  href="https://github.com/leenBaksh" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-1.5 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-white font-mono text-[10px] text-center flex items-center justify-center gap-1 border border-white/3 transition-all"
                >
                  <Github size={11} />
                  <span>GitHub</span>
                </a>
                <button 
                  onClick={() => setActiveAdIndex(prev => (prev + 1) % brandingCampaigns.length)}
                  className="flex-1 py-1.5 rounded-lg bg-cyan-glow text-dark-bg font-mono text-[10px] font-bold text-center flex items-center justify-center gap-1 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                >
                  <ExternalLink size={11} />
                  <span>Cycle Campaign</span>
                </button>
              </div>
            </div>

          </TiltCard>
        </div>

        {/* ========= CARD 5: Utility Tools (2 Columns - Neumorphic Calc + Glassmote To-Do) ========= */}
        <div className="lg:col-span-6 flex flex-col">
          <TiltCard className="flex-1 bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group h-full">
            
            <div className="space-y-4">
              {/* Card Header title */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase font-bold animate-pulse">
                    <Compass size={10} />
                    <span>Double Interactive Stack</span>
                  </span>
                  <h3 className="text-2xl font-display font-medium text-white group-hover:text-cyan-glow transition-all">
                    Mini Utility Tools Playground
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">CORE APPS V2</span>
                  <span className="text-[9px] font-mono text-green-400">STATUS: RE-ACTIVE</span>
                </div>
              </div>

              {/* Sub-grid of Calculator & Glass Todo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* A. REAL NEUMORPHIC CALCULATOR IN BLACK SLATE DESIGN */}
                <div className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex flex-col shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-gray-500 uppercase flex items-center gap-1">
                      <Calculator size={10} className="text-cyan-glow" />
                      <span>Neumorphic Calculator</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow"></span>
                  </div>

                  {/* Calculator Screen / Digital Display */}
                  <div className="bg-black/40 border border-zinc-800 rounded-lg p-2 md:p-3 text-right font-mono mb-3 relative overflow-hidden">
                    <div className="text-[8px] text-gray-500 h-3 truncate">{calcHistory || " "}</div>
                    <div className="text-sm md:text-md text-white font-bold tracking-tight truncate">{calcVal || "0"}</div>
                  </div>

                  {/* Neumorphic Button grid layouts */}
                  <div className="grid grid-cols-4 gap-2">
                    {["C", "÷", "×", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "0", ".", "="].map((btn) => {
                      const id = `calc-btn-${btn}`;
                      const isClear = btn === "C";
                      const isOperator = ["÷", "×", "-", "+", "="].includes(btn);
                      
                      return (
                        <button
                          key={id}
                          id={id}
                          onClick={() => handleCalcClick(btn)}
                          className={`aspect-square sm:aspect-auto rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all duration-200 cursor-pointer ${
                            isClear 
                              ? "bg-red-950/40 text-red-400 border border-red-900/30 hover:bg-red-900/40" 
                              : isOperator 
                              ? "bg-cyan-950/50 text-cyan-glow border border-cyan-500/20 hover:bg-cyan-950" 
                              : "bg-zinc-900/60 text-gray-300 hover:text-white border border-zinc-800 hover:bg-zinc-850"
                          } ${btn === "0" ? "col-span-2 py-2" : "py-2"}`}
                        >
                          {btn}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* B. GLASSMORPHISM TO-DO APP */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-gray-500 uppercase flex items-center gap-1">
                      <ListTodo size={10} className="text-purple-glow" />
                      <span>Glassmorphism To-Do</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-glow h-1.5 animate-pulse"></span>
                  </div>

                  {/* Todo mini input form */}
                  <form onSubmit={addTodo} className="flex gap-1.5 mb-3">
                    <input
                      type="text"
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                      placeholder="Add functional task..."
                      className="flex-1 bg-black/40 border border-white/10 hover:border-white/20 rounded-md px-2.5 py-1 text-[10px] text-white font-mono placeholder-gray-600 focus:outline-none focus:border-purple-glow transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-purple-glow/20 text-purple-glow hover:bg-purple-glow hover:text-white border border-purple-glow/30 p-1.5 rounded-md transition-all shrink-0 cursor-pointer"
                      aria-label="Add task"
                    >
                      <Plus size={12} />
                    </button>
                  </form>

                  {/* Scrollable listing */}
                  <div className="flex-1 space-y-1.5 overflow-y-auto max-h-36 pr-1 font-mono text-[9px]">
                    {todos.map((todo) => {
                      const tid = `todo-item-${todo.id}`;
                      return (
                        <div
                          key={tid}
                          id={tid}
                          className="flex items-center justify-between p-1.5 bg-black/20 hover:bg-black/40 rounded-md border border-white/[0.02] hover:border-white/[0.04] group/todo flex-wrap gap-1 transition-all"
                        >
                          <div className="flex items-center gap-2 max-w-[80%]">
                            <button
                              type="button"
                              onClick={() => toggleTodo(todo.id)}
                              className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                                todo.completed
                                  ? "bg-purple-glow/25 border-purple-glow text-purple-glow"
                                  : "border-zinc-700 hover:border-zinc-500"
                              }`}
                            >
                              {todo.completed && <Check size={8} strokeWidth={3} />}
                            </button>
                            <span className={`truncate text-gray-300 ${todo.completed ? "line-through text-zinc-500" : ""}`}>
                              {todo.text}
                            </span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => deleteTodo(todo.id)}
                            className="opacity-0 group-hover/todo:opacity-100 hover:text-red-400 p-0.5 rounded transition-all text-gray-500 cursor-pointer ml-auto"
                            title="Delete task"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      );
                    })}

                    {todos.length === 0 && (
                      <div className="text-center font-mono text-gray-600 italic py-6">
                        No outstanding telemetry tasks left!
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Master Action Links with Github + Demo */}
            <div className="space-y-4 pt-4 border-t border-white/5 mt-4">
              <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-gray-400">
                <span className="bg-white/5 border border-white/5 rounded px-2 py-0.5">Dual Module Sandbox</span>
                <span className="bg-white/5 border border-white/5 rounded px-2 py-0.5">Translucent Glass Glassmorphism</span>
                <span className="bg-white/5 border border-white/5 rounded px-2 py-0.5">Responsive Hooks Controller</span>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://github.com/leenBaksh" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-white font-mono text-[11px] font-semibold text-center flex items-center justify-center gap-1.5 border border-white/3 transition-all"
                >
                  <Github size={12} />
                  <span>GitHub Code Repository</span>
                </a>
                <a 
                  href="#projects" 
                  className="flex-1 py-2 rounded-lg bg-cyan-glow text-dark-bg font-mono text-[11px] font-bold text-center flex items-center justify-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                >
                  <ExternalLink size={12} />
                  <span>Interact Live Above</span>
                </a>
              </div>
            </div>

          </TiltCard>
        </div>

      </div>
    </div>
  );
}
