"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";

/**
 * Staggered line/word reveal inspired by Lusion & Active Theory.
 * Uses GPU-accelerated translate3d / y-percent transforms for locked 60fps.
 */
export function RevealHeading({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <Tag className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0 pb-[0.06em]"
        >
          <motion.span
            initial={{ y: "112%", rotateZ: 2.5, opacity: 0 }}
            whileInView={{ y: "0%", rotateZ: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{
              duration: 0.82,
              delay: delay + index * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Multi-axis Scroll Parallax container with spring physics + subtle scale/rotation.
 */
export function ParallaxSection({
  children,
  offset = 55,
  scaleRange = [0.97, 1.02],
  className = "",
}: {
  children: React.ReactNode;
  offset?: number;
  scaleRange?: [number, number];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [
    scaleRange[0],
    scaleRange[1],
    scaleRange[0],
  ]);

  const y = useSpring(rawY, { stiffness: 105, damping: 26, mass: 0.35 });
  const scale = useSpring(rawScale, { stiffness: 105, damping: 26, mass: 0.35 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y, scale }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Fade, slide, and subtle blur-to-crisp reveal on scroll.
 */
export function FadeUpBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: 0.78,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Curtain & Zoom Image/Card Reveal on scroll.
 */
export function RevealCardMedia({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(14% 6% 14% 6% round 24px)", scale: 1.06 }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: 0.95,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Interactive 3D Perspective Tilt Card (reacts to pointer on Desktop & Touch drag on Mobile).
 */
export function Interactive3DTilt({
  children,
  className = "",
  intensity = 10,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const [hovered, setHovered] = useState(false);

  const springRotateX = useSpring(rotateX, { stiffness: 160, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 160, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * intensity * 2);
    rotateX.set((0.5 - py) * intensity * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: "1100px" }} className={className}>
      <motion.div
        ref={ref}
        onPointerEnter={() => setHovered(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative will-change-transform"
      >
        {children}
        {hovered && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.25), rgba(255, 255, 255, 0.1), transparent 70%)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Interactive magnetic wrapper for desktop CTAs.
 */
export function MagneticWrap({
  children,
  strength = 0.22,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.innerWidth < 768) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
