import React, { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function TiltCard({ children, className = "", id }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [shadow, setShadow] = useState("rgba(0, 0, 0, 0.4) 0px 4px 20px");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Cursor location coordinates relative to card bounds
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt angles based on center offset
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Cap rotation at +/- 12 degrees for refined feel
    const rotateX = Math.min(12, Math.max(-12, -(y - centerY) / (centerY / 10)));
    const rotateY = Math.min(12, Math.max(-12, (x - centerX) / (centerX / 10)));
    
    // Update transformation string
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    
    // Dynamic overlay glare/shadow shift
    const shadowX = -(x - centerX) / 6;
    const shadowY = -(y - centerY) / 6;
    setShadow(`rgba(0, 240, 255, 0.15) ${shadowX}px ${shadowY}px 25px, rgba(176, 38, 255, 0.15) ${-shadowX}px ${-shadowY}px 25px, rgba(0,0,0,0.5) 0px 10px 30px`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setShadow("rgba(0, 0, 0, 0.4) 0px 4px 20px");
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        boxShadow: shadow,
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        transformStyle: "preserve-3d"
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
