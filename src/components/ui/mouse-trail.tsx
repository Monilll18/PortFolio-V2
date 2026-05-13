"use client";
import React, { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

interface Point {
  x: number;
  y: number;
  life: number;
}

interface MouseTrailProps {
  /** Spring-animated cursor X (MotionValue from SmoothCursor) */
  cursorX: MotionValue<number>;
  /** Spring-animated cursor Y (MotionValue from SmoothCursor) */
  cursorY: MotionValue<number>;
}

export const MouseTrail = ({ cursorX, cursorY }: MouseTrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Point[] = [];
    let animationFrameId: number;
    let lastTime = performance.now();
    let prevX = cursorX.get();
    let prevY = cursorY.get();

    // Trail config
    const trailLength = 30;
    const lineWidth = 3.5;
    const color = { r: 59, g: 130, b: 246 }; // blue
    const fadeDuration = 0.6;
    const minDist = 2; // minimum distance between points to avoid clumping

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Sample the spring-animated cursor position (this is what the SVG cursor follows)
      const cx = cursorX.get();
      const cy = cursorY.get();

      // Only add a new point if cursor has moved enough
      const dx = cx - prevX;
      const dy = cy - prevY;
      if (Math.hypot(dx, dy) > minDist) {
        points.push({ x: cx, y: cy, life: 1 });
        prevX = cx;
        prevY = cy;
      }

      // Trim length
      if (points.length > trailLength) {
        points.splice(0, points.length - trailLength);
      }

      // Age points
      if (points.length > 0) {
        const decay = dt / fadeDuration;
        for (let i = points.length - 1; i >= 0; i--) {
          points[i].life -= decay;
          if (points[i].life <= 0) {
            points.splice(i, 1);
          }
        }
      }

      // Draw trail
      if (points.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];

          // Position-based + life-based alpha for natural fade
          const t = i / (points.length - 1);
          const alpha = p2.life * (t * t); // quadratic ramp for smoother tail
          const widthScale = 0.3 + 0.7 * alpha;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
          ctx.lineWidth = Math.max(0.5, lineWidth * widthScale);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorX, cursorY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 99, // just below the cursor SVG (z100)
      }}
    />
  );
};
