"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface FlappyBirdProps {
  width?: number;
  height?: number;
}

export function FlappyBird({ width = 600, height = 300 }: FlappyBirdProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<{
    bird: { x: number; y: number; vy: number; radius: number };
    pipes: { x: number; topH: number; gap: number; scored: boolean }[];
    score: number;
    started: boolean;
    dead: boolean;
    frame: number;
    animId: number | null;
  }>({
    bird: { x: 80, y: 150, vy: 0, radius: 12 },
    pipes: [],
    score: 0,
    started: false,
    dead: false,
    frame: 0,
    animId: null,
  });
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [dead, setDead] = useState(false);

  const GRAVITY = 0.35;
  const JUMP = -5.5;
  const PIPE_WIDTH = 40;
  const PIPE_GAP = 100;
  const PIPE_SPEED = 2;
  const PIPE_INTERVAL = 120;
  const GROUND_H = 0;

  const resetGame = useCallback(() => {
    const g = gameRef.current;
    g.bird = { x: 80, y: height / 2, vy: 0, radius: 12 };
    g.pipes = [];
    g.score = 0;
    g.started = false;
    g.dead = false;
    g.frame = 0;
    setScore(0);
    setStarted(false);
    setDead(false);
  }, [height]);

  const flap = useCallback(() => {
    const g = gameRef.current;
    if (g.dead) {
      resetGame();
      return;
    }
    if (!g.started) {
      g.started = true;
      setStarted(true);
    }
    g.bird.vy = JUMP;
  }, [resetGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const g = gameRef.current;

    const drawBird = () => {
      const { x, y, radius } = g.bird;
      // Body
      ctx.save();
      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      // Eye
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x + 4, y - 3, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(x + 5, y - 3, 2, 0, Math.PI * 2);
      ctx.fill();
      // Beak
      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + radius + 8, y + 2);
      ctx.lineTo(x + radius, y + 5);
      ctx.closePath();
      ctx.fill();
      // Wing
      ctx.fillStyle = "#eab308";
      ctx.beginPath();
      ctx.ellipse(x - 4, y + 2, 7, 5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawPipe = (pipe: { x: number; topH: number; gap: number }) => {
      ctx.fillStyle = "#22c55e";
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topH);
      // Top pipe cap
      ctx.fillStyle = "#16a34a";
      ctx.fillRect(pipe.x - 3, pipe.topH - 16, PIPE_WIDTH + 6, 16);

      // Bottom pipe
      const bottomY = pipe.topH + pipe.gap;
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, height - bottomY - GROUND_H);
      // Bottom pipe cap
      ctx.fillStyle = "#16a34a";
      ctx.fillRect(pipe.x - 3, bottomY, PIPE_WIDTH + 6, 16);
    };

    const drawStars = () => {
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      const positions = [
        [50, 30], [150, 60], [250, 20], [350, 50], [450, 35],
        [100, 80], [300, 70], [400, 25], [500, 55], [200, 45],
      ];
      positions.forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Background gradient — dark theme
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#0c0c14");
      bg.addColorStop(1, "#111827");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      drawStars();

      // Ground line
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height - GROUND_H);
      ctx.lineTo(width, height - GROUND_H);
      ctx.stroke();

      if (g.started && !g.dead) {
        g.bird.vy += GRAVITY;
        g.bird.y += g.bird.vy;
        g.frame++;

        // Spawn pipes
        if (g.frame % PIPE_INTERVAL === 0) {
          const topH = 40 + Math.random() * (height - PIPE_GAP - 80 - GROUND_H);
          g.pipes.push({ x: width, topH, gap: PIPE_GAP, scored: false });
        }

        // Move pipes
        for (let i = g.pipes.length - 1; i >= 0; i--) {
          g.pipes[i].x -= PIPE_SPEED;
          if (g.pipes[i].x + PIPE_WIDTH < 0) {
            g.pipes.splice(i, 1);
          }
        }

        // Collision
        const { x, y, radius } = g.bird;
        if (y + radius > height - GROUND_H || y - radius < 0) {
          g.dead = true;
          setDead(true);
        }

        for (const pipe of g.pipes) {
          if (
            x + radius > pipe.x &&
            x - radius < pipe.x + PIPE_WIDTH
          ) {
            if (y - radius < pipe.topH || y + radius > pipe.topH + pipe.gap) {
              g.dead = true;
              setDead(true);
            }
          }
          // Score
          if (!pipe.scored && pipe.x + PIPE_WIDTH < x) {
            pipe.scored = true;
            g.score++;
            setScore(g.score);
          }
        }
      }

      // Draw pipes
      g.pipes.forEach(drawPipe);

      // Draw bird
      drawBird();

      // Idle animation
      if (!g.started) {
        g.bird.y = height / 2 + Math.sin(Date.now() / 300) * 8;
      }

      // Score
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px 'Inter', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${g.score}`, width - 16, 28);

      // Prompt
      if (!g.started) {
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.font = "13px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Click or press Space to play", width / 2, height - 20);
      }

      if (g.dead) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 22px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", width / 2, height / 2 - 12);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "13px 'Inter', sans-serif";
        ctx.fillText("Click to restart", width / 2, height / 2 + 16);
      }

      g.animId = requestAnimationFrame(loop);
    };

    g.animId = requestAnimationFrame(loop);

    return () => {
      if (g.animId) cancelAnimationFrame(g.animId);
    };
  }, [width, height]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flap]);

  return (
    <canvas
      ref={canvasRef}
      onClick={flap}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        cursor: "pointer",
        borderRadius: "12px",
      }}
    />
  );
}
