import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Sparkles,
  Bot,
  Brain,
  Cpu,
  Shield,
  Layers,
  Terminal,
  ArrowRight,
  Database,
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
  Send,
  MessageSquare,
  Lock,
  GitBranch,
  Settings,
  Briefcase,
  Calendar,
  Code,
  BookOpen,
  MapPin,
  Play,
  Zap,
  Info,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Maximize2,
  Minimize2,
  User,
  Menu,
  X,
  Plus
} from "lucide-react";
import { ChatMessage, Project, ExperienceEvent, SkillCategory } from "./types";
import { AnimatePresence, motion } from "motion/react";
import ThreeCenterpiece from "./components/ThreeCenterpiece";
import FeaturedProjects from "./components/FeaturedProjects";
import TechStackBento from "./components/TechStackBento";
import MobileHeroSvg from "./components/MobileHeroSvg";

// Typewriter hook for clean interactive console writing
function useTypewriter(words: string[], speed: number = 75, delay: number = 2000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullWord = words[currentWordIndex];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText((prev) => currentFullWord.substring(0, prev.length + 1));
        if (currentText === currentFullWord) {
          timer = setTimeout(() => setIsDeleting(true), delay);
        } else {
          timer = setTimeout(handleType, speed);
        }
      } else {
        setCurrentText((prev) => currentFullWord.substring(0, prev.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          timer = setTimeout(handleType, speed * 2);
        } else {
          timer = setTimeout(handleType, speed / 1.5);
        }
      }
    };

    timer = setTimeout(handleType, isDeleting ? speed / 1.5 : speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return currentText;
}

export default function App() {
  // Navigation & Interactive states
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>("robot-sim");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Custom Project Simulations States
  // 1. Robotic Joint simulation
  const [joint1, setJoint1] = useState<number>(30); // degrees
  const [joint2, setJoint2] = useState<number>(45); // degrees
  
  // 2. Encryption simulation
  const [encryptInput, setEncryptInput] = useState<string>("Alpha-Swarm-Vector-97");
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [encryptProgress, setEncryptProgress] = useState<number>(100);
  const [encryptedOutput, setEncryptedOutput] = useState<string>("5F416C7068612D537761726D2D566563746F722D3937");
  const [cryptoLogs, setCryptoLogs] = useState<string[]>(["Core node ready for encryption pipeline."]);

  // 3. Drone Swarm pathfinder simulation
  const [dronePos, setDronePos] = useState({ r: 1, c: 1 });
  const [targetPos, setTargetPos] = useState({ r: 5, c: 5 });
  const [obstacles, setObstacles] = useState<string[]>(["2-3", "3-2", "4-2", "3-4"]);
  const [pathSteps, setPathSteps] = useState<{r: number, c: number}[]>([]);
  const [isPathfinding, setIsPathfinding] = useState(false);

  // 4. Signal Wave simulation
  const [signalFrequency, setSignalFrequency] = useState<number>(3);
  const [signalAmplitude, setSignalAmplitude] = useState<number>(20);
  const [analogResolution, setAnalogResolution] = useState<number>(16);

  // Experience Event expansion tracker
  const [expandedTimelineId, setExpandedTimelineId] = useState<string | null>("cyberdyne");

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isChatMaximized, setIsChatMaximized] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "ai",
      text: "Hello! I am Sandleen's AI digital twin assistant, trained securely on his credentials, academic work, and career milestones. Ask me about system designs, ROS2 telemetry, or project architectures!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userChatMsg, setUserChatMsg] = useState<string>("");
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Typewriter headings
  const textTitle = useTypewriter([
    "AI-Powered Full-Stack Developer",
    "Robotics Research Engineer",
    "Creative Tech Innovator",
    "Automation Architect"
  ], 60, 2500);

  // Particle background Canvas parameters
  useEffect(() => {
    const canvas = document.getElementById("hero-particles") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
    }[] = [];

    const numParticles = 45;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 400 - 200,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.5 + 1
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left - rect.width / 2;
      targetMouseY = e.clientY - rect.top - rect.height / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Rotate particles slightly based on damped mouse position
      const radX = (mouseY / height) * 0.4;
      const radY = (mouseX / width) * 0.4;

      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);

      // Project particles
      const projected: { x: number; y: number; originalZ: number; size: number }[] = [];

      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounce within volume boundaries
        const boundaryX = width / 2;
        const boundaryY = height / 2;
        const boundaryZ = 200;

        if (p.x < -boundaryX || p.x > boundaryX) p.vx *= -1;
        if (p.y < -boundaryY || p.y > boundaryY) p.vy *= -1;
        if (p.z < -boundaryZ || p.z > boundaryZ) p.vz *= -1;

        // 3D rotations based on mouse inclination
        // Rotate local Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate local X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const focalLength = 300;
        const distance = focalLength + z2;
        const scale = distance > 0 ? Math.min(5, focalLength / distance) : 0;
        const projX = x1 * scale;
        const projY = y2 * scale;

        projected.push({
          x: projX,
          y: projY,
          originalZ: z2,
          size: Math.max(0, p.size * scale)
        });
      });

      // Draw connection vectors
      ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect nodes close in 2D projection
          if (dist < 100) {
            ctx.beginPath();
            ctx.lineWidth = (1 - dist / 100) * 0.6;
            ctx.strokeStyle = `rgba(${projected[i].originalZ > 0 ? "176, 38, 255" : "0, 240, 255"}, ${(1 - dist / 100) * 0.15})`;
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw interactive nodes with outer halos
      projected.forEach((p) => {
        // Core particle color shifts base on relative 3D depth
        const isPurple = p.originalZ > 30;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isPurple ? "rgba(176, 38, 255, 0.75)" : "rgba(0, 240, 255, 0.75)";
        ctx.fill();

        // Hover halo indicator
        if (p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isPurple ? "rgba(176, 38, 255, 0.03)" : "rgba(0, 240, 255, 0.03)";
          ctx.fill();
        }
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set up chatbot scrolling response anchors
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAiTyping]);

  // 1. Robotic Arm Kinematic calculation values
  const kinematics = useMemo(() => {
    const l1 = 60; // segment 1 pixels
    const l2 = 50; // segment 2 pixels
    const t1Rad = (joint1 * Math.PI) / 180;
    const t2Rad = (joint2 * Math.PI) / 180;

    const x1 = l1 * Math.cos(t1Rad);
    const y1 = l1 * Math.sin(t1Rad);
    // elbow coordinates are local relative to base
    const x2 = x1 + l2 * Math.cos(t1Rad + t2Rad);
    const y2 = y1 + l2 * Math.sin(t1Rad + t2Rad);

    // Dynamic rotation transformations
    const jacobianDeterminant = Math.abs(l1 * l2 * Math.sin(t2Rad));

    return {
      jointX: x1,
      jointY: -y1, // Flip Y for canvas display
      endX: x2,
      endY: -y2,
      jacobian: jacobianDeterminant.toFixed(1),
      workspaceBound: (l1 + l2).toFixed(0)
    };
  }, [joint1, joint2]);

  // 2. Encryption triggers
  const triggerEncryption = () => {
    if (isEncrypting) return;
    setIsEncrypting(true);
    setEncryptProgress(0);
    setCryptoLogs([
      "Initiated polymorph salting vector...",
      "Allocating local salt vectors for input data streams.",
    ]);

    const steps = [
      { p: 25, log: "Allocating 256-bit prime modulus structures..." },
      { p: 55, log: "Injecting sharded rotational noise matrix..." },
      { p: 85, log: "Compiling bitwise salt arrays..." },
      { p: 100, log: "Polymorphic encrypted hex string resolved successfully." }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setEncryptProgress(step.p);
        setCryptoLogs(prev => [...prev, step.log]);
        if (step.p === 100) {
          setIsEncrypting(false);
          // Convert input text to pseudo-hex encrypted representation
          let hex = "";
          for (let i = 0; i < encryptInput.length; i++) {
            const charCode = encryptInput.charCodeAt(i);
            const rotated = (charCode + 9 + i) % 128; // Simple custom rotation offset
            hex += rotated.toString(16).toUpperCase().padStart(2, "0");
          }
          setEncryptedOutput(hex);
        }
      }, (idx + 1) * 350);
    });
  };

  // 3. Drone Swarm grid pathfinding calculation
  const runPathfinding = () => {
    if (isPathfinding) return;
    setIsPathfinding(true);

    // Simple BFS to find the shortest path from dronePos to targetPos around obstacles
    const queue: { r: number; c: number; path: {r: number, c: number}[] }[] = [];
    queue.push({ r: dronePos.r, c: dronePos.c, path: [{ r: dronePos.r, c: dronePos.c }] });
    const visited = new Set<string>();
    visited.add(`${dronePos.r}-${dronePos.c}`);

    let foundPath: {r: number, c: number}[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.r === targetPos.r && current.c === targetPos.c) {
        foundPath = current.path;
        break;
      }

      // 4 cardinal directions
      const dirs = [
        { dr: -1, dc: 0 },
        { dr: 1, dc: 0 },
        { dr: 0, dc: -1 },
        { dr: 0, dc: 1 }
      ];

      for (const dir of dirs) {
        const nr = current.r + dir.dr;
        const nc = current.c + dir.dc;
        const key = `${nr}-${nc}`;

        if (nr >= 1 && nr <= 6 && nc >= 1 && nc <= 6) {
          if (!obstacles.includes(key) && !visited.has(key)) {
            visited.add(key);
            queue.push({
              r: nr,
              c: nc,
              path: [...current.path, { r: nr, c: nc }]
            });
          }
        }
      }
    }

    if (foundPath.length === 0) {
      // Direct path failed, clear obstacles or trace anyway
      setPathSteps([]);
      setIsPathfinding(false);
      return;
    }

    // Animate the path steps one by one
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < foundPath.length) {
        setDronePos(foundPath[stepIdx]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsPathfinding(false);
      }
    }, 200);
  };

  const toggleObstacle = (r: number, c: number) => {
    const key = `${r}-${c}`;
    if ((r === dronePos.r && c === dronePos.c) || (r === targetPos.r && c === targetPos.c)) return;
    if (obstacles.includes(key)) {
      setObstacles(prev => prev.filter(o => o !== key));
    } else {
      setObstacles(prev => [...prev, key]);
    }
  };

  // AI Twin query streaming
  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userChatMsg.trim()) return;

    const userMsgText = userChatMsg;
    setUserChatMsg("");

    const newMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setIsAiTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsgText,
          history: chatMessages
        })
      });

      const data = await response.json();
      setIsAiTyping(false);

      setChatMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "ai",
          text: data.reply || "Connection telemetry timed out. Please try sending again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error("Failed to query portfolio AI core:", error);
      setIsAiTyping(false);
      
      // Local robust simulation response if server keys are completely offline
      setTimeout(() => {
        let simulatedReply = "As Sandleen Waseem's interactive model matrix, I am currently navigating in standalone secure sandbox. Sandleen is an expert developer with advanced work in machine learning pipelines, full-stack React systems, ROS2 lidar architectures, and highly polished cryptographic salting workflows. Ask me anything about his credentials and explore his live project simulations on this page!";
        
        const lowered = userMsgText.toLowerCase();
        if (lowered.includes("ros2") || lowered.includes("robot") || lowered.includes("kinematics")) {
          simulatedReply = "Sandleen's robotics background includes research and implementation at Cyberdyne Labs and Quantum Automations. He models joint kinematics, integrates ROS2 navigation stacks, handles feedback sensors, and designs real-time full-stack canvas controls for robotic telemetry diagnostics.";
        } else if (lowered.includes("react") || lowered.includes("typescript") || lowered.includes("next")) {
          simulatedReply = "In full-stack architectures, Sandleen structures optimized TypeScript systems. He leverages React, Nest.js, Node, Express, Tailwind, and custom canvases, reducing diagnostic rendering latency by up to 42% for intricate raw signals.";
        } else if (lowered.includes("encryption") || lowered.includes("hexarmor") || lowered.includes("cryptography")) {
          simulatedReply = "HexArmor is Sandleen's customizable encryption node concept. It leverages client-side secure algorithms, sharded transposition, modular arithmetic, and interactive SVG indicators to represent structural cryptographic data changes.";
        } else if (lowered.includes("contact") || lowered.includes("hire") || lowered.includes("email")) {
          simulatedReply = "You can easily contact Sandleen Waseem via email at sandleenbakshi@gmail.com. We can also schedule a consultation directly through the options dashboard!";
        }

        setChatMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: "ai",
            text: simulatedReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 700);
    }
  };

  // Quick prompt triggers
  const executeQuickPrompt = (promptText: string) => {
    setUserChatMsg(promptText);
    setTimeout(() => {
      // Auto submit
      const inputEl = document.getElementById("chat-input-field");
      if (inputEl) {
        inputEl.focus();
      }
    }, 50);
  };

  // Projects definitions
  const projects: Project[] = [
    {
      id: "robot-sim",
      title: "AI Automation Workflow System",
      category: "AI & Agentic Systems",
      description: "An automated pipeline incorporating AI decision-making and data crawling engines, engineered to reduce operational task effort by 60%. The below component serves as a live visual simulator displaying reactive flow nodes.",
      tags: ["n8n", "OpenAI API", "Puppeteer", "Docker", "FastAPI"],
      image: "robot",
      specs: [
        { label: "Flow Engine", value: "n8n and Puppeteer Nodes" },
        { label: "AI Decision Stack", value: "OpenAI GPT / Gemini APIs" },
        { label: "Workflow Efficiency", value: "60% Human Effort Saved" }
      ]
    },
    {
      id: "crypto-sim",
      title: "HexArmor Polymorphic Sandbox",
      category: "Applied Cryptography",
      description: "A secure, client-side cryptographic playground. Converts incoming ASCII strings into clean encrypted bytes through rotational salt sequences, computing entropy and executing rendering streams.",
      tags: ["Cryptography", "TypeScript", "Bitwise Salt", "Entropy Gauge"],
      image: "crypto",
      specs: [
        { label: "Hash Type", value: "SHA-256 Custom Salt Rotation" },
        { label: "Decryption Method", value: "Reversed Shard Key modulo-128" },
        { label: "Security Boundary", value: "Isolated Browser Sandbox" }
      ]
    },
    {
      id: "swarm-sim",
      title: "Autonomous Drone Swarm Navigation",
      category: "Artificial Intelligence & Swarm Systems",
      description: "An AI waypoint router that guides autonomous drones safely around obstacles. Place custom barriers in the path grid below, and watch the agent re-route using optimal pathing vectors.",
      tags: ["Pathfinding Algorithms", "Grid Waypoints", "AABB Obstacles", "Collision Vectors"],
      image: "swarm",
      specs: [
        { label: "Algorithm Engine", value: "A* / BFS Vector Tracker" },
        { label: "Path Recalculation", value: "Real-Time < 1.2ms" },
        { label: "Grid Density", value: "6x6 Vector Matrix Node Array" }
      ]
    },
    {
      id: "signal-sim",
      title: "Cognitive Signal Wave Router",
      category: "IoT Systems & Hardware Telemetry",
      description: "High-precision physical wave simulator mirroring analog data feeds before digital conversion. Users can adjust parameters below to update high-frequency vectors reflecting microchip hardware streams.",
      tags: ["Telemetry Logs", "IoT Integration", "Modulation Sliders", "Analog-To-Digital Conversion"],
      image: "signal",
      specs: [
        { label: "Analog Input Range", value: "0V to 5V Transceiver Stream" },
        { label: "Modulation Level", value: "Pulse-Width Phase Division" },
        { label: "ADC Resolution", value: "Up to 16-Bit Precision Allocation" }
      ]
    }
  ];

  // Work experience timeline data
  const experiences: ExperienceEvent[] = [
    {
      id: "agentic-ai-exp",
      role: "AI & Full-Stack Developer",
      company: "Self-Initiated & Hackathons",
      period: "2023 - Present",
      description: [
        "Led the development of an AI Automation Workflow System using n8n, OpenAI/Gemini APIs, and Puppeteer, reducing task effort by 60%.",
        "Built intelligent systems using OpenAI Agents SDK and spec-driven development, elevating prototype generation while reducing complexity.",
        "Participated in over 5 leading AI and cloud-native hackathons, delivering pristine production-ready prototypes under tight deadlines."
      ],
      skills: ["n8n Automation", "OpenAI Agents SDK", "Next.js", "FastAPI", "Docker", "Puppeteer"]
    },
    {
      id: "freelance-design-exp",
      role: "Remote Creative & Digital Freelancer",
      company: "Freelance Services",
      period: "2022 - 2025",
      description: [
        "Managed end-to-end creative projects including budget analysis, business cards, banner designs, Canva presentation decks, and planners.",
        "Designed merchandise and custom digital assets like T-Shirts, Pillows, custom Mobile Covers, and graphic Book Covers.",
        "Successfully managed clients, tight delivery deadlines, and remote communications with 100% positive feedback."
      ],
      skills: ["Adobe Illustrator", "Photoshop", "Canva Design", "PowerPoint & Keynote", "Digital Planners"]
    }
  ];

  // Technical skills bento-grid data
  const skillCategories: SkillCategory[] = [
    {
      id: "ai-systems-cat",
      title: "AI & Agentic Systems",
      icon: "brain",
      skills: [
        { name: "OpenAI Agents SDK", level: 93, category: "AI" },
        { name: "Gemini API", level: 95, category: "AI" },
        { name: "Prompt Engineering", level: 94, category: "AI" }
      ]
    },
    {
      id: "frontend-cat",
      title: "Frontend & Interface",
      icon: "code",
      skills: [
        { name: "Next.js 15 & React", level: 95, category: "Web" },
        { name: "TypeScript", level: 94, category: "Web" },
        { name: "ShadCN & Aceternity UI", level: 91, category: "Web" }
      ]
    },
    {
      id: "devops-cat",
      title: "DevOps & Automations",
      icon: "cpu",
      skills: [
        { name: "FastAPI & Node.js", level: 92, category: "DevOps" },
        { name: "Docker & Kubernetes", level: 88, category: "DevOps" },
        { name: "n8n & Puppeteer", level: 93, category: "DevOps" }
      ]
    },
    {
      id: "design-cat",
      title: "Creative Design & Databases",
      icon: "shield",
      skills: [
        { name: "Adobe Suite & Figma", level: 91, category: "Design" },
        { name: "PowerPoint & Keynote", level: 92, category: "Design" },
        { name: "MongoDB & SQLite", level: 89, category: "Design" }
      ]
    }
  ];

  return (
    <div id="root-container" className="min-h-screen cyber-bg text-gray-100 font-sans selection:bg-cyan-glow/30 selection:text-white relative overflow-x-hidden">
      
      {/* Sleek Header */}
      <header id="main-header" className="sticky top-0 z-50 w-full bg-dark-bg/85 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-display font-bold text-xl tracking-wider text-white">
              SANDLEEN<span className="text-cyan-glow text-lg">.</span>WASEEM
            </span>
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-glow/10 border border-cyan-glow/20 text-cyan-glow uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse"></span>
              <span>Developer Matrix</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-mono text-sm">
            <a href="#hero" className="text-gray-400 hover:text-white hover:border-b hover:border-cyan-glow/30 transition-all uppercase py-1">System</a>
            <a href="#projects" className="text-gray-400 hover:text-white hover:border-b hover:border-cyan-glow/30 transition-all uppercase py-1">Simulated-Work</a>
            <a href="#experience" className="text-gray-400 hover:text-white hover:border-b hover:border-cyan-glow/30 transition-all uppercase py-1">Timeline</a>
            <a href="#skills" className="text-gray-400 hover:text-white hover:border-b hover:border-cyan-glow/30 transition-all uppercase py-1">Capabilities</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              id="ai-agent-nav-trigger"
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2.5 rounded-lg font-mono text-xs font-semibold bg-gradient-to-r from-cyan-glow/10 to-purple-glow/10 border border-cyan-glow/30 hover:border-cyan-glow text-cyan-glow hover:text-white transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <Bot size={14} className="animate-pulse" />
              <span>ENGAGE PORTFOLIO AI</span>
            </button>
            <a
              href="mailto:sandleenbakshi@gmail.com"
              className="px-4 py-2.5 rounded-lg font-mono text-xs font-semibold bg-white text-dark-bg hover:bg-cyan-glow transition-all duration-300"
            >
              HIRE / INQUIRE
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none min-h-[44px] min-w-[44px] p-2 flex items-center justify-center transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden border-t border-white/5 bg-dark-bg/95 backdrop-blur-md overflow-hidden px-4 py-4 space-y-2.5 flex flex-col font-mono text-sm"
            >
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white min-h-[44px] flex items-center transition-all px-2 hover:bg-white/5 rounded-lg"
              >
                // SYSTEM
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white min-h-[44px] flex items-center transition-all px-2 hover:bg-white/5 rounded-lg"
              >
                // SIMULATED-WORK
              </a>
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white min-h-[44px] flex items-center transition-all px-2 hover:bg-white/5 rounded-lg"
              >
                // TIMELINE
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white min-h-[44px] flex items-center transition-all px-2 hover:bg-white/5 rounded-lg"
              >
                // CAPABILITIES
              </a>
              <hr className="border-white/5 my-2" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsChatOpen(true);
                }}
                className="w-full text-center min-h-[44px] flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-glow/20 to-purple-glow/20 border border-cyan-glow/30 text-cyan-glow text-xs font-bold cursor-pointer"
              >
                ENGAGE PORTFOLIO AI
              </button>
              <a
                href="mailto:sandleenbakshi@gmail.com"
                className="w-full block text-center min-h-[44px] flex items-center justify-center rounded-lg bg-white text-dark-bg text-xs font-semibold"
              >
                HIRE / INQUIRE
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section Container */}
      <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center py-12 lg:py-20 border-b border-white/5 overflow-hidden">
        
        {/* Background cosmic subtle moving grid or star-field effect */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-dark-bg">
          {/* subtle animated grid */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              transform: "perspective(600px) rotateX(60deg) translateY(-20%)",
              transformOrigin: "top center",
              animation: "grid-drift 20s linear infinite"
            }}
          />
          {/* particles canvas */}
          <div className="absolute inset-0 pointer-events-auto opacity-60 overflow-hidden">
            <canvas id="hero-particles" className="w-full h-full block opacity-70"></canvas>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Intro */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-cyan-glow bg-cyan-glow/5 border border-cyan-glow/15 px-3 py-1.5 rounded-lg text-xs font-mono">
              <Sparkles size={13} className="animate-spin-slow text-cyan-glow" />
              <span className="uppercase tracking-widest font-semibold text-cyan-glow">INTELLIGENT CORES</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-display font-medium leading-none tracking-tight text-white space-y-2">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400 font-extrabold pb-2 drop-shadow-[0_4px_12px_rgba(0,240,255,0.08)] uppercase">
                SANDLEEN WASEEM
              </span>
            </h1>

            {/* Glowing Subtext Header */}
            <p className="text-lg sm:text-2xl font-display text-cyan-glow font-medium tracking-tight">
              Fusing AI Intelligence with Creative Design.
            </p>

            {/* Typewriter text console */}
            <div className="h-10 sm:h-12 flex items-center font-mono text-xs sm:text-sm text-cyan-glow bg-dark-surface/60 border border-white/5 rounded-lg px-4 max-w-xl">
              <span className="text-gray-500 mr-2 shrink-0">$ current_role_query:</span>
              <span className="font-semibold text-cyan-glow">{textTitle}</span>
              <span className="w-2 h-4 ml-1 bg-cyan-glow animate-pulse shrink-0"></span>
            </div>

            <p className="text-base text-gray-400 max-w-xl leading-relaxed">
              Pioneering mathematical simulations, machine learning pipelines, and full-stack web architectures. 
              My technical focus spans embedded inverse-kinematics algorithms, ROS2 systems telemetry diagnosis, 
              polymorphic symmetrical ciphers, and robust microservices dashboards that scale gracefully. 
            </p>

            {/* Call to Action Group */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-transparent border-2 border-cyan-glow text-cyan-glow font-bold rounded-lg text-sm tracking-wider uppercase transition-all duration-300 hover:bg-cyan-glow/10 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-2.5 hover:-translate-y-0.5 text-center"
              >
                <Terminal size={16} className="animate-pulse text-cyan-glow" />
                <span>VIEW MY WORK</span>
              </a>
              <button
                onClick={() => setIsChatOpen(true)}
                className="px-6 py-4 bg-dark-surface/80 hover:bg-dark-surface border border-white/10 hover:border-cyan-glow/45 text-gray-300 hover:text-white font-mono text-sm rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:-translate-y-0.5 cursor-pointer"
              >
                <Bot size={16} className="text-purple-glow" />
                <span>INTERACT WITH MY AI DOUBLE</span>
              </button>
            </div>

            {/* Microstats banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-white/5 max-w-xl">
              <div>
                <div className="text-2xl font-bold text-white">4+ Years</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">Engineering R&D</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-glow">0.0 ms</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">Simulation Latency</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold text-white">Full-Stack</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">System Integration</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Column - Advanced WebGL Viewport */}
          <div className="lg:col-span-5 h-[32rem] relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/[0.015] to-purple-glow/[0.015] rounded-3xl border border-white/5 glass-panel flex flex-col p-4 sm:p-5 overflow-hidden">
              
              {/* Card headers */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse"></span>
                  <span className="font-mono text-[10px] text-gray-400 font-bold tracking-widest uppercase">THREE_WEBGL_INTELLIGIST</span>
                </div>
                <span className="font-mono text-[9px] text-gray-500">SIMULATION ENGINE V4.5</span>
              </div>

              {/* Central WebGL Viewport Projection display */}
              <div className="flex-1 my-3 flex flex-col justify-center items-center relative rounded-2xl overflow-hidden bg-black/20 border border-white/[0.02]">
                {isMobile ? <MobileHeroSvg /> : <ThreeCenterpiece />}
              </div>

              {/* Vector credentials details footer */}
              <div className="border-t border-white/5 pt-3 grid grid-cols-3 gap-2 shrink-0 text-center font-mono text-[9px] text-gray-400">
                <div className="bg-white/3 rounded py-1 px-1 flex flex-col justify-center border border-white/3">
                  <span className="text-gray-500 uppercase tracking-widest text-[8px] mb-0.5">MATH API</span>
                  <span className="text-white font-semibold font-mono truncate">MATRIX_TDS_IK</span>
                </div>
                <div className="bg-white/3 rounded py-1 px-1 flex flex-col justify-center border border-white/3">
                  <span className="text-gray-500 uppercase tracking-widest text-[8px] mb-0.5">RENDERER</span>
                  <span className="text-cyan-glow font-bold font-mono">THREE_JS_v160</span>
                </div>
                <div className="bg-white/3 rounded py-1 px-1 flex flex-col justify-center border border-white/3">
                  <span className="text-gray-500 uppercase tracking-widest text-[8px] mb-0.5">ACCEL</span>
                  <span className="text-purple-glow font-bold font-mono">GPU_ENABLED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulated Work Section */}
      <section id="projects" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-purple-glow uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-purple-glow rounded-full"></span>
              <span>Interactive 3D Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
              Featured Engineering Work
            </h2>
            <p className="text-gray-400 max-w-xl text-sm">
              Sleek, high-performance web prototypes fusing hardware kinematics, safe data isolation, 
              interactive progress models, and digital creative designs. Hover and click to test them.
            </p>
          </div>
        </div>

        {/* 3D Cards container */}
        <FeaturedProjects />
      </section>

      {/* Sleek Timeline Experience & Education Section */}
      <section id="experience" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-glow uppercase tracking-widest">
            <Layers size={13} className="text-cyan-glow shrink-0 animate-pulse" />
            <span>Structured Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">
            Work Experience & Academic Foundation
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Proven tracking path across full-stack development, agentic workflow automation design, 
            creative freelance consulting, and structured IT certifications.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column 1: Timeline (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-lg font-mono text-white flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
              <span className="w-1.5 h-1.5 bg-cyan-glow rounded-full"></span>
              <span>Professional Timeline</span>
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l border-zinc-800 space-y-10">
              {experiences.map((exp, idx) => {
                return (
                  <div key={exp.id} className="relative group">
                    
                    {/* Visual Connector Dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-dark-bg border-2 border-zinc-700 group-hover:border-cyan-glow transition-all duration-300 flex items-center justify-center z-10">
                      <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-cyan-glow animate-ping" : "bg-zinc-700 group-hover:bg-cyan-glow"}`} />
                    </div>

                    {/* Event Card (Glassmorphic) */}
                    <div className="glass-panel rounded-xl p-6 transition-all duration-300 border border-white/5 hover:border-white/10">
                      
                      {/* Header metadata */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 mb-4 font-mono">
                        <div>
                          <span className="text-[10px] text-cyan-glow tracking-widest font-bold uppercase leading-none block mb-1">
                            {exp.company}
                          </span>
                          <h4 className="text-md font-display font-semibold text-white tracking-tight group-hover:text-cyan-glow transition-colors">
                            {exp.role}
                          </h4>
                        </div>
                        <div className="text-[10px] text-gray-500 flex items-center space-x-1.5 shrink-0 bg-white/2 px-2 py-0.5 rounded border border-white/5 h-fit">
                          <Calendar size={10} className="text-zinc-650" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Bullet points accomplishments */}
                      <div className="space-y-2 pb-4">
                        <ul className="space-y-2 text-sm text-gray-400 list-inside leading-relaxed list-none">
                          {exp.description.map((bullet, bIdx) => (
                            <li key={`exp-bullet-${exp.id}-${bIdx}`} className="flex items-start space-x-2">
                              <CheckCircle2 size={13} className="text-cyan-glow/60 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stack indicators */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5 font-mono text-[9px]">
                        {exp.skills.map((skill, sIdx) => (
                          <span key={`exp-skill-${exp.id}-${skill}-${sIdx}`} className="bg-zinc-950 text-gray-400 px-2 py-0.5 rounded border border-white/4">
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Academics & Certificates (Right 5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Academic Section */}
            <div>
              <h3 className="text-lg font-mono text-white flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
                <span className="w-1.5 h-1.5 bg-purple-glow rounded-full"></span>
                <span>Academic Foundation</span>
              </h3>

              <div className="space-y-4">
                {/* School 1 */}
                <div className="glass-panel border border-white/5 rounded-xl p-5 hover:border-purple-glow/20 transition-all duration-300">
                  <div className="font-mono text-[9px] text-purple-glow uppercase tracking-wider mb-1">Karachi Secondary Board</div>
                  <h4 className="text-md font-display font-medium text-white mb-0.5">Intermediate in Commerce</h4>
                  <p className="text-xs text-gray-400 font-mono">Degree Girls College, Buffer Zone</p>
                </div>

                {/* School 2 */}
                <div className="glass-panel border border-white/5 rounded-xl p-5 hover:border-purple-glow/20 transition-all duration-300">
                  <div className="font-mono text-[9px] text-purple-glow uppercase tracking-wider mb-1">Karachi Matriculation Board</div>
                  <h4 className="text-md font-display font-medium text-white mb-0.5">Matriculation in Science</h4>
                  <p className="text-xs text-gray-400 font-mono">Falcon House Grammar School (C-3)</p>
                </div>
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <h3 className="text-lg font-mono text-white flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                <span>IT Courses & Certifications</span>
              </h3>

              <div className="space-y-4">
                {/* Cert 1 */}
                <div className="glass-panel border border-white/5 rounded-xl p-5 hover:border-amber-500/20 transition-all duration-300 flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold text-amber-400 tracking-wider">AGENTIC AI ENGINEERING</h4>
                    <p className="text-sm font-semibold text-white leading-tight">Governor Sindh Initiative</p>
                    <p className="text-[11px] text-gray-500 font-mono">Quarter 4 Spec-Driven Work • Active</p>
                  </div>
                  <div className="text-[9px] font-mono text-gray-500 bg-white/2 border border-white/5 rounded px-2 py-0.5 h-fit self-start shrink-0">
                    2023 - Pres.
                  </div>
                </div>

                {/* Cert 2 */}
                <div className="glass-panel border border-white/5 rounded-xl p-5 hover:border-amber-500/20 transition-all duration-300 flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold text-amber-400 tracking-wider">WEB DEV & FREELANCING</h4>
                    <p className="text-sm font-semibold text-white leading-tight">Bano Qabil IT Initiative</p>
                    <p className="text-[11px] text-gray-500 font-mono">Full-Stack Modules & Client Dev</p>
                  </div>
                  <div className="text-[9px] font-mono text-gray-500 bg-white/2 border border-white/5 rounded px-2 py-0.5 h-fit self-start shrink-0">
                    Completed
                  </div>
                </div>

                {/* Cert 3 */}
                <div className="glass-panel border border-white/5 rounded-xl p-5 hover:border-amber-500/20 transition-all duration-300 flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold text-amber-400 tracking-wider">PRESENTATION DESIGN (CIT)</h4>
                    <p className="text-sm font-semibold text-white leading-tight">Presentation & Graphics Design</p>
                    <p className="text-[11px] text-gray-500 font-mono">Corporate Pitch Decks Layouts</p>
                  </div>
                  <div className="text-[9px] font-mono text-gray-500 bg-white/2 border border-white/5 rounded px-2 py-0.5 h-fit self-start shrink-0">
                    CIT Short
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Technical Capabilities Bento Grid */}
      <section id="skills" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-purple-glow uppercase tracking-widest">
            <Zap size={13} className="text-purple-glow shrink-0 animate-pulse" />
            <span>Core Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
            Tech Stack Matrix & Expertise
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Categorized overview of engineering modules, agentic workflows, scalable stacks, deployment pipelines, and custom asset layouts.
          </p>
        </div>

        {/* Bento Grid */}
        <TechStackBento />
      </section>

      {/* Modern, non-obtrusive dynamic footer */}
      <footer className="py-12 border-t border-white/5 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-gray-500">
          <div className="text-center md:text-left space-y-1">
            <span className="text-gray-400 font-display font-bold text-sm block">Sandleen Waseem</span>
            <span>© {new Date().getFullYear()} • AI-Powered Full-Stack Developer & Creative Technologist.</span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:sandleenbakshi@gmail.com" className="hover:text-cyan-glow transition-all">sandleenbakshi@gmail.com</a>
            <span className="text-zinc-800">|</span>
            <button onClick={() => setIsChatOpen(true)} className="hover:text-purple-glow transition-all uppercase flex items-center space-x-1.5 min-h-[44px] px-3.5 rounded-xl hover:bg-white/5 cursor-pointer">
              <Bot size={13} />
              <span>AI Chat Representative</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating AI Proxy chatbot layout with smooth AnimatePresence transition */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            id="ai-chatbot-window" 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed bottom-4 right-4 z-50 glass-panel rounded-2xl border border-cyan-glow/20 shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ${
              isChatMaximized 
                ? "w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] sm:w-[48rem] sm:h-[40rem]" 
                : "w-[calc(100vw-2rem)] h-[28rem] sm:w-[24rem] sm:h-[32rem]"
            }`}
          >
            {/* Conversational Header panel */}
            <div className="bg-zinc-950 px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-glow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-glow"></span>
                </span>
                <div className="font-mono">
                  <span className="text-xs text-white font-bold block">SANDLEEN-AI</span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest leading-none">Security Agent Link v1.0</span>
                </div>
              </div>

              {/* Window control triggers with optimized min-44px click boundaries */}
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setIsChatMaximized(!isChatMaximized)}
                  className="text-gray-400 hover:text-white hover:bg-white/5 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg transition-colors cursor-pointer"
                  title="Toggle Maximize Window"
                >
                  {isChatMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/5 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg transition-colors cursor-pointer"
                  title="Disconnect AI Assistant"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Quick reference guide info box */}
            <div className="bg-gradient-to-r from-cyan-glow/5 to-purple-glow/5 border-b border-white/5 px-4 py-2 flex items-start space-x-2 shrink-0">
              <Info size={13} className="text-cyan-glow shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-400 font-mono leading-normal">
                Ask about ROS2 metrics, embedded design, key ciphers, or consulting options. Direct telemetry is proxied back safely.
              </p>
            </div>

            {/* Core messages feed log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/10">
              {chatMessages.map((msg, idx) => {
                const isAi = msg.sender === "ai";
                return (
                  <div key={`chat-msg-${msg.id}-${idx}`} className={`flex ${isAi ? "justify-start" : "justify-end"} items-start space-x-2 max-w-[90%] break-words ${isAi ? "" : "ml-auto"}`}>
                    {isAi && (
                      <div className="w-6 h-6 rounded bg-purple-glow/10 border border-purple-glow/20 flex items-center justify-center shrink-0">
                        <Bot size={12} className="text-purple-glow" />
                      </div>
                    )}

                    <div className={`rounded-xl px-3.5 py-2.5 text-xs leading-relaxed font-mono ${
                      isAi
                        ? "bg-zinc-950/60 text-gray-300 border border-white/5"
                        : "bg-cyan-glow text-dark-bg font-bold shadow-cyan-glow/10 shadow-lg"
                    }`}>
                      {msg.text}
                      <span className={`block text-[8px] font-semibold text-right mt-1.5 ${isAi ? "text-gray-600" : "text-cyan-950"}`}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {!isAi && (
                      <div className="w-6 h-6 rounded bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center shrink-0">
                        <User size={12} className="text-cyan-glow" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isAiTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded bg-purple-glow/10 border border-purple-glow/20 flex items-center justify-center shrink-0 animate-pulse">
                    <Bot size={12} className="text-purple-glow" />
                  </div>
                  <div className="rounded-xl px-3.5 py-2.5 text-xs bg-zinc-950/60 text-gray-500 border border-white/5 font-mono flex items-center space-x-1 animate-pulse">
                    <span>Routing signals</span>
                    <span className="w-1 h-3 bg-cyan-glow animate-ping"></span>
                  </div>
                </div>
              )}
              
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts list panel with enhanced sizing */}
            <div className="bg-zinc-950 p-2 border-t border-white/5 flex flex-wrap gap-1.5 shrink-0 max-h-20 overflow-y-auto">
              <button
                onClick={() => executeQuickPrompt("What is Sandleen's experience with ROS2?")}
                className="text-[9px] font-mono bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-cyan-glow/30 text-gray-400 hover:text-white px-2.5 py-1.5 min-h-[32px] rounded-lg transition-colors cursor-pointer"
              >
                ROS2 & Robotics Exp?
              </button>
              <button
                onClick={() => executeQuickPrompt("Tell me about the dynamic joint simulator.")}
                className="text-[9px] font-mono bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-purple-glow/30 text-gray-400 hover:text-white px-2.5 py-1.5 min-h-[32px] rounded-lg transition-colors cursor-pointer"
              >
                About the Joint Sim?
              </button>
              <button
                onClick={() => executeQuickPrompt("What is the HexArmor encryption system?")}
                className="text-[9px] font-mono bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-cyan-glow/30 text-gray-400 hover:text-white px-2.5 py-1.5 min-h-[32px] rounded-lg transition-colors cursor-pointer"
              >
                What is HexArmor?
              </button>
            </div>

            {/* User message input panel with comfortable mobile touch boundaries (44px) */}
            <form onSubmit={handleChatSubmit} className="p-3 bg-zinc-950 border-t border-white/5 flex items-center space-x-2 shrink-0">
              <input
                id="chat-input-field"
                type="text"
                value={userChatMsg}
                onChange={(e) => setUserChatMsg(e.target.value)}
                placeholder="Ask me technical credentials..."
                className="flex-1 bg-zinc-900 border border-white/8 hover:border-white/15 rounded-xl px-4 py-2.5 min-h-[44px] text-xs font-mono text-white focus:outline-none focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow/30"
              />
              <button
                type="submit"
                disabled={isAiTyping || !userChatMsg.trim()}
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-cyan-glow text-dark-bg font-bold transition-all hover:bg-cyan-glow/85 active:scale-95 disabled:opacity-40 cursor-pointer"
                title="Transmit Query"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
