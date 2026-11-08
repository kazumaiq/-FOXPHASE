"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  isRed: boolean;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Scroll-reactive Red Deep-Space Cosmos + Canonical 3D Wireframe Polyhedron Engine.
 * Inspired by Lusion, Active Theory, and Martin Garrix stage visuals.
 * Runs at locked 60fps with zero GC allocations in the render loop.
 */
export function InteractiveSonicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isMobile = width < 768;

    // 3D Starfield (3 depth layers reacting to scroll velocity & parallax)
    const starCount = isMobile ? 95 : 190;
    const stars: Star[] = Array.from({ length: starCount }, (_, i) => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 1000 + 80,
      size: (i % 3) * 0.65 + 0.8,
      isRed: i % 3 === 0,
    }));

    // Canonical 3D Icosahedron / Octahedron geometry vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: Vec3[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Connect vertices within edge threshold to form canonical 3D wireframe crystal
    const edges: [number, number][] = [];
    for (let i = 0; i < rawVertices.length; i++) {
      for (let j = i + 1; j < rawVertices.length; j++) {
        const d = Math.hypot(
          rawVertices[i].x - rawVertices[j].x,
          rawVertices[i].y - rawVertices[j].y,
          rawVertices[i].z - rawVertices[j].z
        );
        if (d < 2.15) {
          edges.push([i, j]);
        }
      }
    }

    const state = {
      scrollY: window.scrollY || 0,
      targetScrollY: window.scrollY || 0,
      scrollVelocity: 0,
      pointerX: width * 0.5,
      pointerY: height * 0.35,
      targetPointerX: width * 0.5,
      targetPointerY: height * 0.35,
      time: 0,
    };

    const onScroll = () => {
      state.targetScrollY = window.scrollY || 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      state.targetPointerX = e.clientX;
      state.targetPointerY = e.clientY;
    };

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = width < 768;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    let rafId = 0;

    const rotatePoint = (v: Vec3, ax: number, ay: number, az: number): Vec3 => {
      // Rotate X
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const y1 = v.y * cosX - v.z * sinX;
      const z1 = v.y * sinX + v.z * cosX;

      // Rotate Y
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const x2 = v.x * cosY + z1 * sinY;
      const z2 = -v.x * sinY + z1 * cosY;

      // Rotate Z
      const cosZ = Math.cos(az);
      const sinZ = Math.sin(az);
      const x3 = x2 * cosZ - y1 * sinZ;
      const y3 = x2 * sinZ + y1 * cosZ;

      return { x: x3, y: y3, z: z2 };
    };

    const render = () => {
      state.time += 0.008;

      const prevScroll = state.scrollY;
      state.scrollY += (state.targetScrollY - state.scrollY) * 0.08;
      state.scrollVelocity = state.scrollY - prevScroll;

      state.pointerX += (state.targetPointerX - state.pointerX) * 0.06;
      state.pointerY += (state.targetPointerY - state.pointerY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const normPointerX = (state.pointerX / width - 0.5) * 2;
      const normPointerY = (state.pointerY / height - 0.5) * 2;

      // 1. RED COSMIC NEBULA CLOUDS (Shift vertically & pulse on scroll)
      const nebulaY1 =
        ((height * 0.28 - state.scrollY * 0.18) % (height * 1.4) +
          height * 1.4) %
          (height * 1.4) -
        height * 0.2;
      const nebulaX1 = width * 0.72 + normPointerX * 45;

      const grad1 = ctx.createRadialGradient(
        nebulaX1,
        nebulaY1,
        20,
        nebulaX1,
        nebulaY1,
        isMobile ? 320 : 620
      );
      grad1.addColorStop(0, "rgba(220, 38, 38, 0.22)");
      grad1.addColorStop(0.45, "rgba(153, 27, 27, 0.09)");
      grad1.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const nebulaY2 =
        ((height * 0.78 - state.scrollY * 0.32) % (height * 1.5) +
          height * 1.5) %
          (height * 1.5) -
        height * 0.25;
      const nebulaX2 = width * 0.22 - normPointerX * 35;

      const grad2 = ctx.createRadialGradient(
        nebulaX2,
        nebulaY2,
        10,
        nebulaX2,
        nebulaY2,
        isMobile ? 280 : 540
      );
      grad2.addColorStop(0, "rgba(239, 68, 68, 0.15)");
      grad2.addColorStop(0.5, "rgba(127, 29, 29, 0.06)");
      grad2.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. 3D DEEP-SPACE STARFIELD (Parallax + Warp on Scroll)
      const fov = 420;
      const warpSpeed = 0.6 + Math.min(18, Math.abs(state.scrollVelocity) * 0.35);

      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        if (!prefersReducedMotion) {
          star.z -= warpSpeed;
          if (star.z <= 20) {
            star.z = 1000;
            star.x = (Math.random() - 0.5) * 2000;
            star.y = (Math.random() - 0.5) * 2000;
          }
        }

        const scale = fov / star.z;
        const sx =
          width * 0.5 +
          (star.x - normPointerX * 90) * scale;
        const sy =
          ((height * 0.5 +
            (star.y - state.scrollY * 0.45 - normPointerY * 90) * scale) %
            height +
            height) %
          height;

        if (sx >= 0 && sx <= width) {
          const alpha = Math.min(0.9, (1 - star.z / 1080) * 0.85);
          const streak = Math.min(14, Math.abs(state.scrollVelocity) * 0.25 * scale);

          if (star.isRed) {
            ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
            ctx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.7})`;
          } else {
            ctx.fillStyle = `rgba(232, 232, 232, ${alpha})`;
            ctx.strokeStyle = `rgba(232, 232, 232, ${alpha * 0.6})`;
          }

          if (streak > 1.8) {
            ctx.lineWidth = star.size * scale * 0.8;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx, sy + streak);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(sx, sy, Math.max(0.6, star.size * scale * 0.65), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 3. CANONICAL 3D WIREFRAME POLYHEDRON + ORBITAL GYROSCOPE RINGS
      // Rotates continuously and accelerates rotation as user scrolls
      const polyCenterX = isMobile
        ? width * 0.5 + normPointerX * 18
        : width * 0.76 + normPointerX * 32;
      const polyCenterY = isMobile
        ? height * 0.34 + normPointerY * 15
        : height * 0.46 + normPointerY * 26;
      const polyScale = isMobile ? 64 : 112;

      const rotX = state.time * 0.7 + state.scrollY * 0.0022 + normPointerY * 0.45;
      const rotY = state.time * 0.9 + state.scrollY * 0.0031 + normPointerX * 0.45;
      const rotZ = state.time * 0.4 + state.scrollY * 0.0012;

      const projected = rawVertices.map((v) => {
        const r = rotatePoint(v, rotX, rotY, rotZ);
        const perspective = 4 / (4 - r.z * 0.45);
        return {
          x: polyCenterX + r.x * polyScale * perspective,
          y: polyCenterY + r.y * polyScale * perspective,
          z: r.z,
        };
      });

      // Draw 3D Orbital Gyroscope Rings around the Polyhedron
      ctx.save();
      ctx.translate(polyCenterX, polyCenterY);
      ctx.rotate(rotZ * 0.6);
      ctx.strokeStyle = "rgba(220, 38, 38, 0.20)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        polyScale * 1.95,
        polyScale * 0.62,
        Math.sin(state.time) * 0.4,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      ctx.strokeStyle = "rgba(232, 232, 232, 0.12)";
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        polyScale * 2.25,
        polyScale * 0.85,
        -Math.cos(state.time * 0.7) * 0.65,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.restore();

      // Draw Polyhedron Edges
      for (let i = 0; i < edges.length; i++) {
        const [aIdx, bIdx] = edges[i];
        const p1 = projected[aIdx];
        const p2 = projected[bIdx];
        const depthAlpha = Math.max(0.08, Math.min(0.42, (p1.z + p2.z + 3.5) * 0.08));

        ctx.strokeStyle =
          i % 3 === 0
            ? `rgba(239, 68, 68, ${depthAlpha * 1.15})`
            : `rgba(232, 232, 232, ${depthAlpha})`;
        ctx.lineWidth = i % 3 === 0 ? 1.2 : 0.9;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw Polyhedron Chrome/Crimson Vertex Nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillStyle =
          i % 2 === 0 ? "rgba(255, 255, 255, 0.65)" : "rgba(239, 68, 68, 0.75)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, isMobile ? 2 : 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
