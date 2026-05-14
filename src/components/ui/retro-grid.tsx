"use client";

import React, { useEffect, useRef } from "react";

interface RetroGridProps {
  angle?: number;
  lineColor?: string;
  fadeColor?: string;
}

export function RetroGrid({
  angle = 65,
  lineColor = "rgba(255,255,255,0.12)",
  fadeColor = "#080810",
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const gridSize = 60;
    let offset = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const draw = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Fill solid background
      ctx.fillStyle = fadeColor;
      ctx.fillRect(0, 0, w, h);

      ctx.save();

      const animOffset = (offset % gridSize);

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Draw vertical lines spanning full width/height
      for (let x = animOffset; x <= w + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Draw horizontal lines spanning full width/height
      for (let y = animOffset; y <= h + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();

      // Soft radial vignette from center to ensure high readability in the center,
      // while maintaining grid visibility across the entire background.
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.9);
      grad.addColorStop(0, "rgba(8, 8, 16, 0)");
      grad.addColorStop(0.8, "rgba(8, 8, 16, 0.4)");
      grad.addColorStop(1, fadeColor);
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      offset += 0.25; // slow, ambient scroll speed
      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [angle, lineColor, fadeColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
