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

      ctx.save();

      // Move to bottom-center and apply perspective rotation
      ctx.translate(w / 2, h);
      
      // Scale Y to simulate perspective (squish vertically)
      const perspectiveScale = 0.35;
      ctx.scale(1, perspectiveScale);

      // Draw grid lines going upward from bottom
      const gridW = w * 3;
      const gridH = h * 4;
      const startX = -gridW / 2;
      const animOffset = (offset % gridSize);

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = startX; x <= gridW / 2; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, -gridH);
        ctx.stroke();
      }

      // Horizontal lines (animated - scrolling toward viewer)
      for (let y = animOffset; y < gridH; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(startX, -y);
        ctx.lineTo(gridW / 2, -y);
        ctx.stroke();
      }

      ctx.restore();

      // Fade gradient from bottom (scene bg) to transparent at top
      const grad = ctx.createLinearGradient(0, h * 0.3, 0, h);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.7, fadeColor + "cc");
      grad.addColorStop(1, fadeColor);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Fade from top too
      const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.25);
      topGrad.addColorStop(0, fadeColor);
      topGrad.addColorStop(1, "transparent");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, h);

      offset += 0.3;
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
