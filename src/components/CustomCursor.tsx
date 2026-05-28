import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursorContainerRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentDotX = useRef(0);
  const currentDotY = useRef(0);
  const currentRingX = useRef(0);
  const currentRingY = useRef(0);
  const isInitialized = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Check if user has a fine pointing device (mouse, trackpad) rather than pure touch
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (!isInitialized.current) {
        // Teleport immediately to initial coordinate to prevent awkward slide-in from (0,0)
        currentDotX.current = e.clientX;
        currentDotY.current = e.clientY;
        currentRingX.current = e.clientX;
        currentRingY.current = e.clientY;
        isInitialized.current = true;
      }

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener to check what the user is hovering over
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest(".cursor-pointer") !== null ||
        target.getAttribute("role") === "button";

      const isInputField = 
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input") !== null ||
        target.closest("textarea") !== null;

      setIsHovered(isInteractive);
      setIsInput(isInputField);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    // Dynamic animation loop for lag-free performance
    let rafId: number;
    const updateCursor = () => {
      if (isInitialized.current) {
        // High-fidelity central dot tracking
        const lerpDot = 0.22;
        currentDotX.current += (mouseX.current - currentDotX.current) * lerpDot;
        currentDotY.current += (mouseY.current - currentDotY.current) * lerpDot;

        // Elegant dragging inertia lag for the outer targeting ring
        const lerpRing = 0.10;
        currentRingX.current += (mouseX.current - currentRingX.current) * lerpRing;
        currentRingY.current += (mouseY.current - currentRingY.current) * lerpRing;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${currentDotX.current}px, ${currentDotY.current}px, 0) translate3d(-50%, -50%, 0)`;
        }

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${currentRingX.current}px, ${currentRingY.current}px, 0) translate3d(-50%, -50%, 0)`;
        }
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isFinePointer, isVisible]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorContainerRef}
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer Tactical Targeting Scope */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          isClicking
            ? "w-7 h-7 border-2 bg-cyan-glow/20 border-cyan-glow/90 scale-75"
            : isHovered
            ? "w-14 h-14 border border-dashed border-cyan-glow bg-cyan-glow/5 animate-[spin_12s_linear_infinite]"
            : isInput
            ? "w-4 h-8 border-l border-r border-t-0 border-b-0 border-purple-glow/65 rounded-none"
            : "w-8 h-8 border border-cyan-glow/25 bg-cyan-glow/[0.01]"
        }`}
        style={{
          boxShadow: isClicking
            ? "0 0 18px var(--cyan-glow)"
            : isHovered 
            ? "0 0 15px var(--cyan-glow)" 
            : "none"
        }}
      >
        {/* Target notches / cardinal ticks */}
        {!isInput && !isClicking && (
          <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none">
            {/* Top tick */}
            <span className={`absolute top-0 w-0.5 h-1 transition-colors duration-300 ${isHovered ? "bg-cyan-glow" : "bg-cyan-glow/40"}`} />
            {/* Bottom tick */}
            <span className={`absolute bottom-0 w-0.5 h-1 transition-colors duration-300 ${isHovered ? "bg-cyan-glow" : "bg-cyan-glow/40"}`} />
            {/* Left tick */}
            <span className={`absolute left-0 w-1 h-0.5 transition-colors duration-300 ${isHovered ? "bg-cyan-glow" : "bg-cyan-glow/40"}`} />
            {/* Right tick */}
            <span className={`absolute right-0 w-1 h-0.5 transition-colors duration-300 ${isHovered ? "bg-cyan-glow" : "bg-cyan-glow/40"}`} />
          </div>
        )}
      </div>

      {/* Center Tactical Dot/Laser Point */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full transition-all duration-150 ${
          isClicking
            ? "w-1 h-1 bg-white"
            : isHovered
            ? "w-2.5 h-2.5 bg-cyan-glow animate-ping"
            : isInput
            ? "w-0.5 h-4 bg-purple-glow"
            : "w-1.5 h-1.5 bg-cyan-glow"
        }`}
        style={{
          boxShadow: isClicking
            ? "0 0 8px var(--cyan-glow)"
            : isHovered
            ? "0 0 14px var(--cyan-glow)"
            : "0 0 8px var(--cyan-glow)"
        }}
      />
    </div>
  );
}
