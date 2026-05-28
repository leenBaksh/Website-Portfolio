import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Bot, Terminal } from "lucide-react";

export default function TypingIndicator() {
  const [statusText, setStatusText] = useState("ROUTING SIGNALS");
  const [telemetryVal, setTelemetryVal] = useState("0.00");

  const statuses = [
    "ESTABLISHING SECURE PORT",
    "ANALYZING PORTFOLIO DATA",
    "RESOLVING SYSTEM SCHEMATIC",
    "GENERATING RESPONSE SYNAPSE",
    "OPTIMIZING AUTOMATION FLOW",
    "FINALIZING ENCRYPTED PACKETS",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setStatusText(statuses[index]);
    }, 1100);

    const telemetryInterval = setInterval(() => {
      setTelemetryVal((Math.random() * 100).toFixed(2));
    }, 150);

    return () => {
      clearInterval(interval);
      clearInterval(telemetryInterval);
    };
  }, []);

  return (
    <div id="ai-typing-indicator" className="flex items-start space-x-3 my-2 font-mono">
      <div className="w-6 h-6 rounded bg-purple-glow/10 border border-purple-glow/20 flex items-center justify-center shrink-0">
        <Bot size={12} className="text-purple-glow animate-pulse" />
      </div>
      
      <div className="flex-1 bg-zinc-950/85 border border-purple-glow/20 rounded-xl p-3 shadow-[0_0_15px_rgba(168,85,247,0.05)] text-[10px] space-y-2 max-w-[85%] relative overflow-hidden">
        {/* Ambient Background Grid Pattern or Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
        
        <div className="flex items-center justify-between text-[9px] text-purple-glow/60 border-b border-purple-glow/10 pb-1.5 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Terminal size={10} className="animate-pulse text-purple-glow" />
            <span>AI_COGNITION_CORE</span>
          </span>
          <span>VOLTS: {telemetryVal}%</span>
        </div>

        <div className="flex flex-col space-y-1">
          {/* Dynamic status line with glowing neon details */}
          <div className="flex items-center justify-between text-gray-300">
            <span className="flex items-center text-gray-300">
              <span className="text-purple-glow mr-1.5 animate-pulse font-extrabold">&gt;&gt;</span>
              {statusText}
            </span>
            
            {/* 3 Synchronated Pulsing Cyberspace Dots */}
            <div className="flex items-center space-x-1">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: 0 }}
                className="w-1.5 h-1.5 rounded-full bg-purple-glow shadow-[0_0_5px_#a855f7]"
              />
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: 0.3 }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-glow shadow-[0_0_5px_#00f0ff]"
              />
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: 0.6 }}
                className="w-1.5 h-1.5 rounded-full bg-purple-glow shadow-[0_0_5px_#a855f7]"
              />
            </div>
          </div>

          {/* Graphical scan bar simulation */}
          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden relative border border-white/[0.02]">
            <motion.div
              animate={{ left: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-glow/55 to-transparent shadow-[0_0_8px_rgba(0,240,255,0.5)]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[8px] text-gray-500 font-semibold pt-0.5 border-t border-white/[0.02]">
          <span>ENCRYPTION: AES_256</span>
          <span className="animate-pulse">STREAMING_READY...</span>
        </div>
      </div>
    </div>
  );
}
