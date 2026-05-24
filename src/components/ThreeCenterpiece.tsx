import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sliders, Cpu, Shield, HelpCircle, Activity, Globe, Compass, Zap } from "lucide-react";

interface ThreeCenterpieceProps {
  initialMode?: "sphere" | "robot";
}

export default function ThreeCenterpiece({ initialMode = "sphere" }: ThreeCenterpieceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"sphere" | "robot">(initialMode);
  
  // Robot Arm joint control state (for manual mode override)
  const [manualControl, setManualControl] = useState<boolean>(false);
  const [baseRot, setBaseRot] = useState<number>(0);
  const [shoulderRot, setShoulderRot] = useState<number>(45);
  const [elbowRot, setElbowRot] = useState<number>(-30);
  const [wristRot, setWristRot] = useState<number>(15);

  // Stats for telemetry panel
  const [fps, setFps] = useState<number>(60);
  const [targetCoord, setTargetCoord] = useState<{ x: string; y: string; z: string }>({ x: "0.0", y: "0.0", z: "0.0" });
  const [angles, setAngles] = useState<{ b: string; s: string; e: string }>({ b: "0°", s: "45°", e: "-30°" });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 400;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    // Dark background matching portfolio theme
    scene.background = null; 

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x0f172a, 3.0);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x00f0ff, 4.0);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.DirectionalLight(0xb026ff, 3.5);
    purpleLight.position.set(-5, -5, 2);
    scene.add(purpleLight);

    // ----------------- OBJECT 1: CYBER MESH SPHERE -----------------
    const sphereGroup = new THREE.Group();

    // Core Wireframe Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphereGroup.add(coreSphere);

    // Outer Latitudinal Rings
    const ringMat1 = new THREE.LineBasicMaterial({ color: 0xb026ff, transparent: true, opacity: 0.35 });
    const ringMat2 = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 });
    
    const ringGeo1 = new THREE.RingGeometry(2.3, 2.33, 64);
    const ring1 = new THREE.LineLoop(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    sphereGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(2.5, 2.52, 64);
    const ring2 = new THREE.LineLoop(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    sphereGroup.add(ring2);

    const ringGeo3 = new THREE.RingGeometry(2.7, 2.71, 64);
    const ring3 = new THREE.LineLoop(ringGeo3, ringMat1);
    ring3.rotation.z = Math.PI / 6;
    sphereGroup.add(ring3);

    // Orbiter Satellites / Nodes
    const satelliteCount = 30;
    const satellites: THREE.Mesh[] = [];
    const satelliteAngles: number[] = [];
    const satelliteSpeeds: number[] = [];
    const satelliteRadius: number[] = [];
    const satelliteAxes: THREE.Vector3[] = [];

    const satGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const cyanSatMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const purpleSatMat = new THREE.MeshBasicMaterial({ color: 0xb026ff });

    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(satGeo, i % 2 === 0 ? cyanSatMat : purpleSatMat);
      sphereGroup.add(sat);
      satellites.push(sat);
      satelliteAngles.push(Math.random() * Math.PI * 2);
      satelliteSpeeds.push((Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1));
      satelliteRadius.push(1.8 + Math.random() * 1.0);
      
      const axis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      satelliteAxes.push(axis);
    }

    // Interactive Star Dust / Flying Particles
    const dustCount = 150;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSpeeds: number[] = [];

    for (let i = 0; i < dustCount; i++) {
      // Position inside a larger spherical volume
      const radius = 2.5 + Math.random() * 2.5;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      dustPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      dustPositions[i * 3 + 2] = radius * Math.cos(phi);

      // Gradient color between cyan and purple
      const mix = Math.random();
      dustColors[i * 3] = mix * 0.7 + 0.3; // r (cyan: 0, purple: 0.7)
      dustColors[i * 3 + 1] = (1 - mix) * 0.9 + 0.1; // g (cyan: 0.9, purple: 0.1)
      dustColors[i * 3 + 2] = 1.0; // b

      dustSpeeds.push(Math.random() * 0.003 + 0.001);
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    sphereGroup.add(dustPoints);

    // Add sphere to scene if that is current mode
    if (mode === "sphere") {
      scene.add(sphereGroup);
    }

    // ----------------- OBJECT 2: HUMANOID KINEMATIC ROBOT ARM -----------------
    const robotGroup = new THREE.Group();
    robotGroup.position.y = -2.2; // ground the base at the bottom

    // Metallic Base Platform
    const baseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.4, 24);
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.3,
      metalness: 0.9,
    });
    const basePlate = new THREE.Mesh(baseGeo, darkMetalMat);
    robotGroup.add(basePlate);

    // Glowing Base Center ring
    const ringGeo = new THREE.TorusGeometry(0.9, 0.06, 8, 32);
    const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const baseGlowRing = new THREE.Mesh(ringGeo, neonCyanMat);
    baseGlowRing.rotation.x = Math.PI / 2;
    baseGlowRing.position.y = 0.21;
    robotGroup.add(baseGlowRing);

    // Robot Shoulder pivot
    const shoulderGroup = new THREE.Group();
    shoulderGroup.position.y = 0.2;
    robotGroup.add(shoulderGroup);

    const shoulderPivotGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const shoulderPivot = new THREE.Mesh(shoulderPivotGeo, darkMetalMat);
    shoulderGroup.add(shoulderPivot);

    // Joint glowing core
    const neonPurpleMat = new THREE.MeshBasicMaterial({ color: 0xb026ff });
    const shoulderCore = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 12), neonPurpleMat);
    shoulderGroup.add(shoulderCore);

    // Arm Link 1 (Humorous / Upper arm)
    const arm1Length = 1.8;
    const link1Group = new THREE.Group();
    shoulderGroup.add(link1Group);

    const link1Geo = new THREE.CylinderGeometry(0.2, 0.28, arm1Length, 12);
    // Offset segment geometry so rotation pivot points from base of cylinder
    link1Geo.translate(0, arm1Length / 2, 0);
    const link1Mesh = new THREE.Mesh(link1Geo, darkMetalMat);
    link1Mesh.rotation.z = 0;
    link1Group.add(link1Mesh);

    // Accent light running down Link 1
    const stripeGeo1 = new THREE.BoxGeometry(0.06, arm1Length - 0.2, 0.22);
    stripeGeo1.translate(0, arm1Length / 2, 0);
    const stripe1 = new THREE.Mesh(stripeGeo1, neonCyanMat);
    stripe1.position.z = 0.15;
    link1Group.add(stripe1);

    // Elbow Pivot
    const elbowGroup = new THREE.Group();
    elbowGroup.position.y = arm1Length;
    link1Group.add(elbowGroup);

    const elbowPivotGeo = new THREE.SphereGeometry(0.38, 16, 16);
    const elbowPivot = new THREE.Mesh(elbowPivotGeo, darkMetalMat);
    elbowGroup.add(elbowPivot);

    const elbowCore = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), neonCyanMat);
    elbowGroup.add(elbowCore);

    // Arm Link 2 (Forearm)
    const arm2Length = 1.4;
    const link2Group = new THREE.Group();
    elbowGroup.add(link2Group);

    const link2Geo = new THREE.CylinderGeometry(0.14, 0.2, arm2Length, 12);
    link2Geo.translate(0, arm2Length / 2, 0);
    const link2Mesh = new THREE.Mesh(link2Geo, darkMetalMat);
    link2Group.add(link2Mesh);

    // Accent light stripes for Forearm
    const stripeGeo2 = new THREE.BoxGeometry(0.04, arm2Length - 0.2, 0.16);
    stripeGeo2.translate(0, arm2Length / 2, 0);
    const stripe2 = new THREE.Mesh(stripeGeo2, neonPurpleMat);
    stripe2.position.z = 0.11;
    link2Group.add(stripe2);

    // Wrist Pivot
    const wristGroup = new THREE.Group();
    wristGroup.position.y = arm2Length;
    link2Group.add(wristGroup);

    const wristPivotGeo = new THREE.SphereGeometry(0.24, 12, 12);
    const wristPivot = new THREE.Mesh(wristPivotGeo, darkMetalMat);
    wristGroup.add(wristPivot);

    const wristCore = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), neonCyanMat);
    wristGroup.add(wristCore);

    // Hand End-effector / Gripper mechanism
    const handGroup = new THREE.Group();
    wristGroup.add(handGroup);

    const handBaseGeo = new THREE.BoxGeometry(0.32, 0.16, 0.32);
    const handBase = new THREE.Mesh(handBaseGeo, darkMetalMat);
    handBase.position.y = 0.12;
    handGroup.add(handBase);

    // Mini glowing tip / laser indicator
    const laserTipGeo = new THREE.CylinderGeometry(0.02, 0.05, 0.15, 8);
    const laserTip = new THREE.Mesh(laserTipGeo, neonCyanMat);
    laserTip.position.y = 0.22;
    laserTip.rotation.x = Math.PI / 2;
    handGroup.add(laserTip);

    // Left gripper finger
    const fingerGeo = new THREE.BoxGeometry(0.05, 0.3, 0.1);
    fingerGeo.translate(-0.08, 0.15, 0);
    const leftFinger = new THREE.Mesh(fingerGeo, darkMetalMat);
    leftFinger.position.set(-0.06, 0.15, 0);
    leftFinger.rotation.z = 0.1;
    handGroup.add(leftFinger);

    // Right gripper finger
    const rightFinger = new THREE.Mesh(fingerGeo, darkMetalMat);
    // Flip left finger around to mirror it
    rightFinger.scale.x = -1;
    rightFinger.position.set(0.06, 0.15, 0);
    rightFinger.rotation.z = -0.1;
    handGroup.add(rightFinger);

    // Laser sight line
    const laserLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 10, 0)
    ]);
    const laserLineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5,
    });
    const laserLine = new THREE.Line(laserLineGeo, laserLineMat);
    laserLine.position.y = 0.25;
    handGroup.add(laserLine);

    if (mode === "robot") {
      scene.add(robotGroup);
    }

    // ----------------- INTERACTIVE RAYCAST / MOUSE CONTROLS -----------------
    const tempMouse = new THREE.Vector2();
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Normalize coordinates
      tempMouse.x = (x / rect.width) * 2 - 1;
      tempMouse.y = -(y / rect.height) * 2 + 1;

      // Map mouse to 3D space targets
      targetX = tempMouse.x * 3.5;
      targetY = tempMouse.y * 3.0 + 0.5;
      targetZ = Math.sin(Date.now() * 0.001) * 1.5; // oscillate in Z
    };

    window.addEventListener("mousemove", handleMouseMove);

    // For keeping track of performance
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdateTime = 0;

    // ----------------- ANIMATION LOOP -----------------
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      
      // Calculate FPS
      const now = performance.now();
      frameCount++;
      if (now - lastFpsUpdateTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdateTime)));
        frameCount = 0;
        lastFpsUpdateTime = now;
      }
      lastTime = now;

      // 1. ANIME MESH SPHERE
      if (mode === "sphere") {
        // Core rotates slowly
        coreSphere.rotation.y = time * 0.12;
        coreSphere.rotation.x = time * 0.08;

        // Accent outer rings rotate conversely
        ring1.rotation.z = time * 0.15;
        ring2.rotation.x = -time * 0.20;
        ring3.rotation.y = time * 0.10;

        // Move satellites in their orbit pathways
        for (let i = 0; i < satelliteCount; i++) {
          satelliteAngles[i] += satelliteSpeeds[i];
          const angle = satelliteAngles[i];
          const radius = satelliteRadius[i];
          
          // Vector rotation around axis
          const axis = satelliteAxes[i];
          const originalPosition = new THREE.Vector3(
            radius * Math.cos(angle),
            radius * Math.sin(angle),
            0
          );
          originalPosition.applyAxisAngle(axis, time * 0.3);
          
          satellites[i].position.copy(originalPosition);
        }

        // Swirl dust with magnetic target drag
        const positions = dustGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < dustCount; i++) {
          const idx = i * 3;
          let px = positions[idx];
          let py = positions[idx + 1];
          let pz = positions[idx + 2];

          // Rotate dust in Z plane
          const speed = dustSpeeds[i];
          const cosS = Math.cos(speed);
          const sinS = Math.sin(speed);

          const nx = px * cosS - py * sinS;
          const ny = py * cosS + px * sinS;

          positions[idx] = nx;
          positions[idx + 1] = ny;

          // Pull slightly toward target coordinates dynamically mapped to mouse pose
          positions[idx] += (targetX - nx) * 0.001;
          positions[idx + 1] += (targetY - ny) * 0.001;
        }
        dustGeometry.attributes.position.needsUpdate = true;

        // Sway entire group with global camera track mouse
        sphereGroup.rotation.y += (targetX * 0.35 - sphereGroup.rotation.y) * 0.05;
        sphereGroup.rotation.x += (targetY * -0.2 - sphereGroup.rotation.x) * 0.05;

        // Live stats matching
        setTargetCoord({
          x: targetX.toFixed(3),
          y: targetY.toFixed(3),
          z: targetZ.toFixed(3),
        });
      }

      // 2. ANIME ROBOT ARM SIMULATION
      if (mode === "robot") {
        if (!manualControl) {
          // AUTO CODES: Tracking Mouse Coordinate with inverse kinematics approximations
          // Map targets to reasonable boundaries
          const clampedX = Math.min(Math.max(targetX, -2.5), 2.5);
          const clampedY = Math.min(Math.max(targetY - 1.0, 0), 4.0); // Offset baseline y

          // Angle for entire base rotation mapped to mouse X/Z aspect
          const targetBase = Math.atan2(clampedX, 4.0);
          
          // Approximated arm joint calculations for nice smooth interactive movement
          // Standard reach kinematic approximation
          const reach = Math.sqrt(clampedX * clampedX + clampedY * clampedY);
          const targetShoulder = Math.min(Math.max((reach / 4.5) * 80, 20), 110) * (Math.PI / 180);
          const targetElbow = Math.min(Math.max(-40 + Math.sin(time * 0.8) * 15, -90), 10) * (Math.PI / 180);
          const targetWrist = Math.sin(time * 2.0) * 0.2; // oscillate slightly

          // Damp rotation speeds for organic smooth flow transition
          robotGroup.rotation.y += (targetBase - robotGroup.rotation.y) * 0.08;
          link1Group.rotation.z += (targetShoulder - link1Group.rotation.z) * 0.07;
          link2Group.rotation.z += (targetElbow - link2Group.rotation.z) * 0.07;
          wristGroup.rotation.z += (targetWrist - wristGroup.rotation.z) * 0.1;
          
          // Symmetrical wrist spin for cool factor
          handGroup.rotation.y = time * 1.5;

          // Live stats matching
          const baseDeg = Math.round(robotGroup.rotation.y * (180 / Math.PI));
          const shoulderDeg = Math.round(link1Group.rotation.z * (180 / Math.PI));
          const elbowDeg = Math.round(link2Group.rotation.z * (180 / Math.PI));

          setAngles({
            b: `${baseDeg}°`,
            s: `${shoulderDeg}°`,
            e: `${elbowDeg}°`
          });
          setTargetCoord({
            x: clampedX.toFixed(3),
            y: clampedY.toFixed(3),
            z: targetZ.toFixed(3)
          });
        } else {
          // MANUAL COEFFICIENTS: Slider inputs drive rotation mechanics
          // Converge to custom slide settings
          robotGroup.rotation.y += ((baseRot * Math.PI) / 180 - robotGroup.rotation.y) * 0.1;
          link1Group.rotation.z += ((shoulderRot * Math.PI) / 180 - link1Group.rotation.z) * 0.1;
          link2Group.rotation.z += ((elbowRot * Math.PI) / 180 - link2Group.rotation.z) * 0.1;
          wristGroup.rotation.z += ((wristRot * Math.PI) / 180 - wristGroup.rotation.z) * 0.1;
          handGroup.rotation.y = time * 0.8;

          setAngles({
            b: `${baseRot}°`,
            s: `${shoulderRot}°`,
            e: `${elbowRot}°`
          });
          setTargetCoord({
            x: "MANUAL",
            y: "MANUAL",
            z: "MANUAL"
          });
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // ----------------- HANDLE WINDOW RESIZE -----------------
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    // ----------------- CLEANUP METADATA -----------------
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      
      // Clean up ThreeJS constructs
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringGeo3.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      cyanSatMat.dispose();
      purpleSatMat.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();

      baseGeo.dispose();
      darkMetalMat.dispose();
      ringGeo.dispose();
      neonCyanMat.dispose();
      shoulderPivotGeo.dispose();
      neonPurpleMat.dispose();
      link1Geo.dispose();
      stripeGeo1.dispose();
      elbowPivotGeo.dispose();
      link2Geo.dispose();
      stripeGeo2.dispose();
      wristPivotGeo.dispose();
      handBaseGeo.dispose();
      laserTipGeo.dispose();
      fingerGeo.dispose();
      laserLineGeo.dispose();
      laserLineMat.dispose();

      renderer.dispose();
    };
  }, [mode, manualControl, baseRot, shoulderRot, elbowRot, wristRot]);

  // Handle Mode Change transitions
  const handleModeChange = (newMode: "sphere" | "robot") => {
    setMode(newMode);
  };

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
      {/* Three Renderer Canvas */}
      <canvas ref={canvasRef} className="w-full h-full absolute inset-0 z-0 block cursor-crosshair" />

      {/* Cyberpunk HUD Diagnostics Plate Overlays */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none p-3 select-none bg-black/45 border border-white/5 rounded-xl backdrop-blur-md max-w-[200px] text-[10px] font-mono leading-relaxed text-gray-400">
        <div className="flex items-center space-x-1.5 border-b border-white/10 pb-1.5 mb-1.5">
          <Activity size={10} className="text-cyan-glow animate-pulse" />
          <span className="text-white font-bold tracking-widest uppercase">System Telemetry</span>
        </div>
        <div>
          <span className="text-gray-500">RENDER_API:</span>{" "}
          <span className="text-cyan-glow font-bold">WEBGL_2.0</span>
        </div>
        <div>
          <span className="text-gray-500">RESOLUTION:</span>{" "}
          <span>{canvasRef.current ? `${canvasRef.current.width}x${canvasRef.current.height}` : "DETECTING"}</span>
        </div>
        <div>
          <span className="text-gray-500">FPS_STABLE:</span> <span className="text-purple-glow font-bold">{fps} FPS</span>
        </div>
        <div className="mt-1 border-t border-white/5 pt-1 text-[9px] uppercase tracking-wide">
          <div className="text-gray-500 truncate">TARGET VECTOR X/Y/Z:</div>
          <div className="text-white font-semibold text-[11px] truncate mt-0.5">
            [{targetCoord.x}, {targetCoord.y}, {targetCoord.z}]
          </div>
        </div>
        
        {mode === "robot" && (
          <div className="mt-1 border-t border-white/5 pt-1 text-[9px] uppercase tracking-wide">
            <div className="text-gray-500">ACTUATOR ANGLES:</div>
            <div className="text-cyan-glow font-semibold mt-0.5">
              B:{angles.b} | S:{angles.s} | E:{angles.e}
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10 p-2 bg-black/45 hover:bg-black/60 transition-all border border-white/5 rounded-xl backdrop-blur-md flex flex-col gap-1.5">
        <button
          onClick={() => handleModeChange("sphere")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg transition-all ${
            mode === "sphere"
              ? "bg-cyan-glow/15 text-cyan-glow border border-cyan-glow/30"
              : "text-gray-400 hover:text-white border border-transparent"
          }`}
          title="Switch to Cosmic wireframe sphere"
        >
          <Globe size={13} className={mode === "sphere" ? "animate-spin-slow" : ""} />
          <span>CYBER_SPHERE</span>
        </button>
        
        <button
          onClick={() => handleModeChange("robot")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg transition-all ${
            mode === "robot"
              ? "bg-purple-glow/15 text-purple-glow border border-purple-glow/30"
              : "text-gray-400 hover:text-white border border-transparent"
          }`}
          title="Switch to Robotic telemetry manipulator"
        >
          <Compass size={13} className={mode === "robot" ? "animate-bounce" : ""} />
          <span>ROBOT_ACTUATOR</span>
        </button>
      </div>

      {/* Manual interactive slider panel for robot joint mode */}
      {mode === "robot" && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-10 p-3 bg-black/55 border border-white/5 rounded-xl backdrop-blur-md sm:max-w-[240px] text-[10px] font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
            <span className="text-gray-300 font-bold uppercase tracking-wider">Actuator Override</span>
            <button
              onClick={() => setManualControl(!manualControl)}
              className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-extrabold transition-all border ${
                manualControl 
                  ? "bg-purple-950 text-purple-glow border-purple-glow/40" 
                  : "bg-zinc-800 text-gray-500 border-zinc-700"
              }`}
            >
              {manualControl ? "MANUAL_ACTIVE" : "AUTO_IK"}
            </button>
          </div>

          {manualControl ? (
            <div className="space-y-2 text-gray-400">
              <div>
                <div className="flex justify-between mb-0.5">
                  <span>BASE ROTATION (deg)</span>
                  <span className="text-white">{baseRot}°</span>
                </div>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  value={baseRot}
                  onChange={(e) => setBaseRot(parseInt(e.target.value))}
                  className="w-full accent-cyan-glow"
                />
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span>SHOULDER AXIS (deg)</span>
                  <span className="text-white">{shoulderRot}°</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={shoulderRot}
                  onChange={(e) => setShoulderRot(parseInt(e.target.value))}
                  className="w-full accent-purple-glow"
                />
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span>ELBOW ANGLE (deg)</span>
                  <span className="text-white">{elbowRot}°</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="20"
                  value={elbowRot}
                  onChange={(e) => setElbowRot(parseInt(e.target.value))}
                  className="w-full accent-cyan-glow"
                />
              </div>
              
              <div className="text-[9px] text-gray-500 leading-normal border-t border-white/5 pt-1">
                Drag sliders to manually adjust the custom embedded step-motor joints.
              </div>
            </div>
          ) : (
            <div className="text-gray-400 space-y-1">
              <div className="flex items-center gap-1 text-cyan-glow font-semibold mb-1">
                <Zap size={11} className="animate-pulse" />
                <span>ACTIVE TRACKING STATE</span>
              </div>
              <p className="leading-normal text-gray-500 text-[9px]">
                The cybernetic arm currently tracks your mouse in real-time. Move your cursor over the canvas space to invoke dynamic kinematics solvers!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
