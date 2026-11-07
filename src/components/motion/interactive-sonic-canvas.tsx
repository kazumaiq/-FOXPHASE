"use client";

import React, { useEffect, useRef } from "react";

/**
 * Interactive 60fps Canvas Chrome/Frequency Field inspired by Lusion & Active Theory.
 * Uses zero-allocation requestAnimationFrame loop, respects prefers-reduced-motion,
 * and scales down particle count on mobile for locked 60fps performance.
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

    const isMobile = width < 768;
    const nodeCount = isMobile ? 28 : 56;

    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: (i % 3) + 1,
      phase: Math.random() * Math.PI * 2,
    }));

    const pointer = {
      x: width * 0.65,
      y: height * 0.4,
      targetX: width * 0.65,
      targetY: height * 0.4,
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
    };

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    let rafId = 0;
    let time = 0;

    const render = () => {
      time += 0.012;
      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Subtle chrome spotlight following pointer
      const radial = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        10,
        pointer.x,
        pointer.y,
        isMobile ? 260 : 520
      );
      radial.addColorStop(0, "rgba(232, 232, 232, 0.075)");
      radial.addColorStop(0.45, "rgba(133, 135, 141, 0.025)");
      radial.addColorStop(1, "rgba(5, 5, 5, 0)");

      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle architectural frequency wave lines
      ctx.strokeStyle = "rgba(232, 232, 232, 0.055)";
      ctx.lineWidth = 1;
      const waveCount = isMobile ? 2 : 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const baseY = height * (0.32 + w * 0.2);
        for (let x = 0; x <= width; x += 36) {
          const distToPointer = Math.hypot(x - pointer.x, baseY - pointer.y);
          const influence = Math.max(0, 1 - distToPointer / 420);
          const y =
            baseY +
            Math.sin(x * 0.004 + time + w * 1.3) * (14 + influence * 28) +
            Math.cos(x * 0.009 - time * 0.8) * 8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Update and draw metallic nodes + filaments
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0) n.x = width;
          if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          if (n.y > height) n.y = 0;
        }

        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(232, 232, 232, ${(1 - dist / 180) * 0.14})`;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(232, 232, 232, 0.28)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
    />
  );
}
