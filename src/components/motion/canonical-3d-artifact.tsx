"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "motion/react";

/**
 * Interactive 3D Canonical Gyroscope & Acoustic Core Widget.
 * Users can drag/tilt or hover to rotate the 3D rings in real-time.
 */
export function Canonical3DArtifact({
  label = "3D ACOUSTIC CORE // INTERACTIVE",
}: {
  label?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  const rotX = useSpring(18, { stiffness: 120, damping: 18 });
  const rotY = useSpring(-24, { stiffness: 120, damping: 18 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-ny * 75);
    rotY.set(nx * 95);
  };

  const handlePointerLeave = () => {
    setActive(false);
    rotX.set(18);
    rotY.set(-24);
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setActive(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="surface-glass relative flex flex-col items-center justify-between overflow-hidden rounded-3xl p-6 select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: "900px" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.22),transparent_70%)]" />

      <div className="relative z-10 flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[#85878D]">
        <span>{label}</span>
        <span className="flex items-center gap-1.5 text-red-400">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
          60FPS 3D
        </span>
      </div>

      {/* 3D Gyroscope Rings */}
      <div className="my-6 flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
        <motion.div
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: "preserve-3d",
          }}
          className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
        >
          {/* Outer Chrome Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-white/35 shadow-[0_0_30px_rgba(255,255,255,0.18)]"
            style={{ transform: "rotateX(65deg) rotateY(15deg)" }}
          />
          {/* Crimson Reactor Ring */}
          <div
            className="absolute inset-2 rounded-full border-2 border-red-500/65 shadow-[0_0_35px_rgba(220,38,38,0.45)]"
            style={{ transform: "rotateX(-55deg) rotateY(45deg)" }}
          />
          {/* Inner Gyro Ring */}
          <div
            className="absolute inset-6 rounded-full border border-white/50"
            style={{ transform: "rotateY(70deg) rotateZ(25deg)" }}
          />
          {/* Vertical Axis Ring */}
          <div
            className="absolute inset-9 rounded-full border border-red-400/50"
            style={{ transform: "rotateX(90deg)" }}
          />
          {/* Core Sphere */}
          <div
            className={`h-10 w-10 rounded-full bg-gradient-to-br from-white via-red-400 to-red-900 shadow-[0_0_35px_rgba(239,68,68,0.85)] transition-transform duration-300 ${
              active ? "scale-125" : "scale-100"
            }`}
          />
        </motion.div>
      </div>

      <p className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8E8E8]/80 text-center">
        TOUCH / MOVE CURSOR TO ROTATE 3D CORE
      </p>
    </div>
  );
}
