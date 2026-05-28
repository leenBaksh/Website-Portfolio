import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal as TerminalIcon, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Pause, 
  Play, 
  Maximize2, 
  Minimize2, 
  Activity,
  CheckCircle2,
  Lock,
  AlertTriangle,
  User,
  AudioLines
} from "lucide-react";
import { SystemLog, addSystemLog } from "../utils/logger";
import { cyberAudio } from "../utils/audio";

export default function FloatingTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load initial simulated system handshake logs
  useEffect(() => {
    const start = Date.now();
    const mockInitialLogs: SystemLog[] = [
      {
        id: "boot-1",
        timestamp: new Date(start - 4000).toISOString(),
        timeString: "16:24:00.001",
        text: "CORE_DAEMON_ONLINE: Telemetry stack ready.",
        type: "info"
      },
      {
        id: "boot-2",
        timestamp: new Date(start - 3000).toISOString(),
        timeString: "16:24:00.125",
        text: "SECURE_CHANNEL: Handshake established (cipher: TLS_AES_256_GCM).",
        type: "auth"
      },
      {
        id: "boot-3",
        timestamp: new Date(start - 2000).toISOString(),
        timeString: "16:24:01.402",
        text: "BENTO_TRANSFORM: Staggered parallax scrolling offsets loaded successfully.",
        type: "success"
      },
      {
        id: "boot-4",
        timestamp: new Date().toISOString(),
        timeString: "16:24:02.810",
        text: "SYS_STATUS: Tracking active terminal clicks & viewport transitions.",
        type: "info"
      }
    ];
    setLogs(mockInitialLogs);
  }, []);

  // Sync state transitions of window logging events
  useEffect(() => {
    const handleNewLog = (e: Event) => {
      if (isPaused) return;
      const customEvent = e as CustomEvent<SystemLog>;
      if (customEvent.detail) {
        setLogs(prev => {
          // Limit total logs to prevent overloading DOM (e.g., max 50 logs)
          const updated = [...prev, customEvent.detail];
          if (updated.length > 50) {
            return updated.slice(updated.length - 50);
          }
          return updated;
        });
      }
    };

    window.addEventListener("system-log", handleNewLog);
    return () => window.removeEventListener("system-log", handleNewLog);
  }, [isPaused]);

  // Autoscroll logging feed
  useEffect(() => {
    if (scrollContainerRef.current && !isPaused) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs, isOpen, isMinimized, isPaused]);

  const handleToggleOpen = () => {
    cyberAudio.playTick();
    setIsOpen(!isOpen);
    // If opening, make sure it is not minimized
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const handleToggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberAudio.playTick();
    setIsMinimized(!isMinimized);
  };

  const handleClearLogs = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberAudio.playClick();
    setLogs([]);
    addSystemLog("SYSTEM: Telemetry buffer flushed.", "warning");
  };

  const handleTogglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberAudio.playTick();
    setIsPaused(!isPaused);
  };

  const getBadgeStyle = (type: SystemLog["type"]) => {
    switch (type) {
      case "success": return "text-[#02e5c8] bg-[#02e5c8]/10 border-[#02e5c8]/20";
      case "warning": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "auth": return "text-[#9d4edd] bg-[#9d4edd]/10 border-[#9d4edd]/20";
      case "action": return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
      default: return "text-gray-400 bg-zinc-800/40 border-zinc-700/30";
    }
  };

  const getBadgeLabel = (type: SystemLog["type"]) => {
    switch (type) {
      case "success": return "SUCCESS";
      case "warning": return "WARNING";
      case "auth": return "SECURE ";
      case "action": return "ACTION ";
      default: return "SYSTEM ";
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-mono text-[10px] sm:text-xs">
      <AnimatePresence>
        {!isOpen ? (
          // Hoverable Launcher Badge
          <motion.button
            id="terminal-launcher"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            whileHover={{ scale: 1.03, y: -2 }}
            onClick={handleToggleOpen}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#0c0a13]/90 border border-white/10 hover:border-[#02e5c8]/45 text-[#02e5c8] shadow-[0_5px_15px_rgba(0,0,0,0.5)] cursor-pointer select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#02e5c8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#02e5c8]"></span>
            </span>
            <TerminalIcon size={14} className="animate-pulse" />
            <span className="tracking-wider uppercase font-semibold text-[10px]">SYS_LOGGER</span>
            <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-gray-400">
              {logs.length}
            </span>
          </motion.button>
        ) : (
          // Active Console Window
          <motion.div
            id="floating-terminal-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "260px",
              width: "min(420px, 90vw)"
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="glass-panel border border-white/10 rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col"
          >
            {/* Header Controls Bar */}
            <div 
              onClick={handleToggleMinimize}
              className="bg-[#0c0a13]/95 border-b border-white/5 px-3.5 py-2.5 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-center space-x-2 text-gray-300">
                <TerminalIcon size={13} className="text-[#02e5c8]" />
                <span className="font-bold tracking-wider uppercase text-[10px] text-white">SYS_COURIER_DAEMON v1.1</span>
                <span className="w-1.5 h-1.5 bg-[#02e5c8] rounded-full animate-pulse shrink-0" />
              </div>

              {/* Window Tools */}
              <div className="flex items-center space-x-1">
                {/* Pause/Resume Logger Toggle */}
                <button
                  onClick={handleTogglePause}
                  title={isPaused ? "Resume Live Updates" : "Freeze Updates"}
                  className={`p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer ${isPaused ? "text-amber-400" : ""}`}
                >
                  {isPaused ? <Play size={11} className="text-amber-300" /> : <Pause size={11} />}
                </button>

                {/* Flush Buffer Buffer Button */}
                <button
                  onClick={handleClearLogs}
                  title="Flushes Logs Telemetry Stack"
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 size={11} />
                </button>

                {/* Minimize Window Accent */}
                <button
                  onClick={handleToggleMinimize}
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isMinimized ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                {/* Close Overlay Widget altogether */}
                <button
                  onClick={handleToggleOpen}
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-red-400 font-bold ml-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable logs viewport */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-[#060509]/95 flex flex-col flex-1 overflow-hidden"
                >
                  {/* Dynamic interactive warnings when logs match */}
                  {isPaused && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400/90 text-[9px] px-2.5 py-1.5 rounded mb-2 flex items-center space-x-2 shrink-0 animate-pulse">
                      <AlertTriangle size={10} />
                      <span className="uppercase tracking-wider">TELEMETRY_STREAM_FROZEN // NO INPUT DETECTED</span>
                    </div>
                  )}

                  {/* Logs Scroller Body */}
                  <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent custom-syslogs-scroll"
                  >
                    {logs.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2 select-none">
                        <Activity className="animate-pulse opacity-40" size={16} />
                        <span className="text-[9px] uppercase tracking-widest text-gray-600">log buffer is empty</span>
                      </div>
                    ) : (
                      logs.map((log) => (
                        <div 
                          key={log.id} 
                          className="flex items-start font-mono leading-relaxed tracking-tight group hover:bg-white/[0.02] p-0.5 rounded transition-colors text-[10px]"
                        >
                          {/* Log Time stamp */}
                          <span className="text-zinc-600 mr-2 select-none shrink-0 font-light font-sans">
                            [{log.timeString}]
                          </span>

                          {/* Type badge custom prefix */}
                          <span className={`inline-flex items-center px-1 py-px rounded border text-[8px] font-bold shrink-0 mr-2 select-none ${getBadgeStyle(log.type)}`}>
                            {getBadgeLabel(log.type)}
                          </span>

                          {/* Log description */}
                          <span className="text-gray-300 break-all select-all selection:bg-[#02e5c8]/30 selection:text-white">
                            {log.text}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Typing placeholder line */}
                  <div className="border-t border-white/5 pt-2 mt-1.5 flex items-center space-x-1 select-none shrink-0">
                    <span className="text-[#02e5c8] font-bold">&gt;</span>
                    <span className="text-gray-400 text-[9px] uppercase tracking-wider">
                      {isPaused ? "STREAM PAUSED" : "awaiting user signals_"}
                    </span>
                    <span className="w-1.5 h-3 bg-[#02e5c8] animate-pulse shrink-0" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
