import React, { useState, useEffect } from "react";
import { Globe, Compass, Activity, Zap } from "lucide-react";

interface MobileHeroSvgProps {
  initialMode?: "sphere" | "robot";
}

export default function MobileHeroSvg({ initialMode = "sphere" }: MobileHeroSvgProps) {
  const [mode, setMode] = useState<"sphere" | "robot">(initialMode);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleModeChange = (newMode: "sphere" | "robot") => {
    setMode(newMode);
  };

  // Simulating joint base angles for HUD
  const sphereX = (Math.sin(time * 0.05) * 1.5).toFixed(3);
  const sphereY = (Math.cos(time * 0.04) * 1.2).toFixed(3);
  const sphereZ = (Math.sin(time * 0.02) * 0.8).toFixed(3);

  const baseAngle = Math.round(Math.sin(time * 0.02) * 45);
  const shoulderAngle = Math.round(50 + Math.cos(time * 0.03) * 30);
  const elbowAngle = Math.round(-30 + Math.sin(time * 0.04) * 20);

  return (
    <div className="w-full h-full relative flex items-center justify-center p-3 overflow-hidden bg-black/10 select-none">
      
      {/* 2D Responsive SVG Viewport */}
      {mode === "sphere" ? (
        <svg 
          viewBox="0 0 400 400" 
          className="w-full max-w-[320px] h-auto drop-shadow-[0_0_25px_rgba(0,240,255,0.15)]"
        >
          {/* Neon Sphere Defs */}
          <defs>
            <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.15" />
              <stop offset="70%" stopColor="#b026ff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#b026ff" />
            </linearGradient>
            <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b026ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Central Glow */}
          <circle cx="200" cy="200" r="140" fill="url(#sphereGlow)" />

          {/* Core Wireframe Mesh Grid */}
          <circle 
            cx="200" 
            cy="200" 
            r="100" 
            fill="none" 
            stroke="#00f0ff" 
            strokeWidth="0.75" 
            strokeDasharray="4 6" 
            className="opacity-25"
          />
          <circle 
            cx="200" 
            cy="200" 
            r="70" 
            fill="none" 
            stroke="#b026ff" 
            strokeWidth="0.5" 
            strokeDasharray="3 4" 
            className="opacity-40"
          />

          {/* Crosshairs & Guides */}
          <line x1="200" y1="50" x2="200" y2="350" stroke="#00f0ff" strokeWidth="0.5" className="opacity-10" />
          <line x1="50" y1="200" x2="350" y2="200" stroke="#00f0ff" strokeWidth="0.5" className="opacity-10" />

          {/* Orbit Ring 1 (cyan) */}
          <ellipse 
            cx="200" 
            cy="200" 
            rx="130" 
            ry="45" 
            fill="none" 
            stroke="url(#orbitGrad1)" 
            strokeWidth="1.5" 
            transform={`rotate(${-time * 0.4} 200 200)`}
            className="opacity-80"
          />

          {/* Orbit Ring 2 (purple-fast) */}
          <ellipse 
            cx="200" 
            cy="200" 
            rx="145" 
            ry="30" 
            fill="none" 
            stroke="url(#orbitGrad2)" 
            strokeWidth="1.2" 
            transform={`rotate(${time * 0.6 + 45} 200 200)`}
            className="opacity-75"
          />

          {/* Orbit Ring 3 */}
          <ellipse 
            cx="200" 
            cy="200" 
            rx="110" 
            ry="60" 
            fill="none" 
            stroke="#00f0ff" 
            strokeWidth="1" 
            strokeDasharray="8 4"
            transform={`rotate(${time * 0.2 - 60} 200 200)`}
            className="opacity-40"
          />

          {/* Orbital nodes/satellites */}
          <circle cx={200 + 130 * Math.sin(time * 0.015)} cy={200 + 45 * Math.cos(time * 0.015)} r="4.5" fill="#00f0ff" className="glow-node animate-pulse" />
          <circle cx={200 - 145 * Math.cos(time * 0.02 + 0.5)} cy={200 + 30 * Math.sin(time * 0.02 + 0.5)} r="3.5" fill="#b026ff" />
          <circle cx={200 + 110 * Math.cos(time * 0.01)} cy={200 - 60 * Math.sin(time * 0.01)} r="2.5" fill="#ffffff" />
          
          {/* Animated Matrix Stream Dots */}
          {[1, 2, 3, 4, 5].map((i) => {
            const angle = (time * 0.01 + i * 1.25) % (Math.PI * 2);
            return (
              <circle
                key={`dot-${i}`}
                cx={200 + 100 * Math.cos(angle)}
                cy={200 + 70 * Math.sin(angle)}
                r="1.5"
                fill="#00f0ff"
                className="opacity-60"
              />
            );
          })}
        </svg>
      ) : (
        /* ROBOT ARM ANIMATED 2D VECTOR PORT */
        <svg 
          viewBox="0 0 400 400" 
          className="w-full max-w-[320px] h-auto drop-shadow-[0_0_25px_rgba(176,38,255,0.15)]"
        >
          <defs>
            <linearGradient id="robotArmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
          </defs>

          {/* Grid Background */}
          <g className="opacity-10">
            <line x1="50" y1="320" x2="350" y2="320" stroke="#b026ff" strokeWidth="1" />
            <circle cx="200" cy="320" r="160" fill="none" stroke="#b026ff" strokeWidth="0.5" strokeDasharray="5 5" />
            <circle cx="200" cy="320" r="110" fill="none" stroke="#b026ff" strokeWidth="0.5" strokeDasharray="3 3" />
          </g>

          {/* BASE ASSEMBLY */}
          <g transform="translate(200, 320)">
            {/* Pedestal */}
            <rect x="-45" y="-12" width="90" height="12" fill="url(#robotArmGrad)" stroke="#b026ff" strokeWidth="1.5" rx="3" />
            <ellipse cx="0" cy="-12" rx="35" ry="6" fill="#000" stroke="#00f0ff" strokeWidth="1" />
            <circle cx="0" cy="-12" r="10" fill="#b026ff" className="animate-pulse" />

            {/* SHOULDER JOINT */}
            {/* The whole arm rotates based on shoulder oscillations */}
            <g transform={`rotate(${baseAngle} 0 -12)`}>
              
              {/* ARM SECTION 1 */}
              <line x1="0" y1="-12" x2="0" y2="-110" stroke="url(#robotArmGrad)" strokeWidth="12" strokeLinecap="round" />
              <line x1="0" y1="-12" x2="0" y2="-110" stroke="#00f0ff" strokeWidth="1.5" className="opacity-60" />
              
              {/* ELBOW JOINT */}
              <circle cx="0" cy="-110" r="14" fill="#18181b" stroke="#b026ff" strokeWidth="1.5" />
              <circle cx="0" cy="-110" r="6" fill="#00f0ff" className="animate-ping" style={{ animationDuration: "3s" }} />

              {/* FOREARM SECTION 2 */}
              <g transform={`translate(0, -110) rotate(${elbowAngle} 0 0)`}>
                <line x1="0" y1="0" x2="0" y2="-85" stroke="url(#robotArmGrad)" strokeWidth="8" strokeLinecap="round" />
                <line x1="0" y1="0" x2="0" y2="-85" stroke="#b026ff" strokeWidth="1" className="opacity-50" strokeDasharray="4 4" />

                {/* WRIST AND GRIPPER ASSEMBLY */}
                <circle cx="0" cy="-85" r="8" fill="#111" stroke="#00f0ff" strokeWidth="1" />
                
                <g transform="translate(0, -85) rotate(15)">
                  {/* Effector Tool */}
                  <rect x="-8" y="-4" width="16" height="4" fill="#b026ff" />
                  
                  {/* Left Claw */}
                  <path d="M -6 -4 L -10 -15 L -6 -15" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Right Claw */}
                  <path d="M 6 -4 L 10 -15 L 6 -15" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Active Laser Line indicator */}
                  <line x1="0" y1="-4" x2="0" y2="-120" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 6" className="opacity-60" />
                </g>
              </g>

            </g>
          </g>
        </svg>
      )}

      {/* Cyber HUD diagnostics plate Overlay */}
      <div className="absolute top-2 left-2 z-10 pointer-events-none p-2 bg-black/60 border border-white/5 rounded-xl backdrop-blur-md max-w-[140px] text-[8px] font-mono leading-tight text-gray-400">
        <div className="flex items-center space-x-1 border-b border-white/10 pb-1 mb-1">
          <Activity size={8} className="text-cyan-glow animate-pulse" />
          <span className="text-white font-bold uppercase tracking-wider">LITE_TELEMETRY</span>
        </div>
        <div>
          <span className="text-gray-500">ENGINE:</span>{" "}
          <span className="text-cyan-glow font-bold">2D_SVG_LITE</span>
        </div>
        <div>
          <span className="text-gray-500">FPS_STABLE:</span>{" "}
          <span className="text-purple-glow font-bold">20 FPS</span>
        </div>
        <div className="mt-1 border-t border-white/5 pt-1 text-[7px] uppercase tracking-wide">
          <div className="text-gray-500 truncate">VECTORS:</div>
          <div className="text-white font-semibold truncate mt-0.5">
            {mode === "sphere" ? `[${sphereX}, ${sphereY}, ${sphereZ}]` : `[B:${baseAngle}°, S:${shoulderAngle}°, E:${elbowAngle}°]`}
          </div>
        </div>
      </div>

      {/* Mode Switches inside component */}
      <div className="absolute top-2 right-2 z-10 p-1 bg-black/60 border border-white/5 rounded-xl backdrop-blur-md flex flex-col gap-1">
        <button
          onClick={() => handleModeChange("sphere")}
          className={`flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono rounded-md transition-all ${
            mode === "sphere"
              ? "bg-cyan-glow/15 text-cyan-glow border border-cyan-glow/30"
              : "text-gray-400 hover:text-white border border-transparent"
          }`}
          title="Cosmic sphere"
        >
          <Globe size={10} />
          <span>CE_SPHERE</span>
        </button>
        
        <button
          onClick={() => handleModeChange("robot")}
          className={`flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono rounded-md transition-all ${
            mode === "robot"
              ? "bg-purple-glow/15 text-purple-glow border border-purple-glow/30"
              : "text-gray-400 hover:text-white border border-transparent"
          }`}
          title="Mechanical Arm"
        >
          <Compass size={10} />
          <span>CE_ARM</span>
        </button>
      </div>
    </div>
  );
}
