"use client";

import React, { useEffect, useState, useRef, startTransition } from "react";

interface PixelatedCursorTrailProps {
  pixelCount?: number;
  pixelSize?: number;
  trailColor?: string;
  fadeOut?: boolean;
  trailSpacing?: number;
  stiffness?: number;
  damping?: number;
  pixelShape?: "square" | "circle";
  blur?: number;
  scaleVariation?: boolean;
  trailDuration?: number;
  trailStyle?: "solid" | "dashed" | "dotted" | "wave" | "zigzag";
  animationPreset?: "none" | "fadeInOut" | "pulse" | "strobe" | "rainbow" | "wave";
  presetSpeed?: number;
  containerRef?: React.RefObject<HTMLElement | null>; // Optional bounding container
}

export function PixelatedCursorTrail({
  pixelCount = 30,
  pixelSize = 8,
  trailColor = "#000000",
  fadeOut = true,
  trailSpacing = 15,
  stiffness = 0.2,
  damping = 0.5,
  pixelShape = "square",
  blur = 0,
  scaleVariation = true,
  trailDuration = 5,
  trailStyle = "solid",
  animationPreset = "none",
  presetSpeed = 1,
  containerRef,
}: PixelatedCursorTrailProps) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const cursorPos = useRef({ x: -1000, y: -1000 });
  const lastCursorPos = useRef({ x: -1000, y: -1000 });
  const animationFrameId = useRef<number | null>(null);
  const lastMoveTime = useRef(Date.now());
  const activityLevel = useRef(1);
  const animationTime = useRef(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const target = containerRef?.current || window;

    const handleMouseMove = (e: any) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      const dx = clientX - lastCursorPos.current.x;
      const dy = clientY - lastCursorPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      cursorPos.current = { x: clientX, y: clientY };
      lastCursorPos.current = { x: clientX, y: clientY };

      if (distance > 0.5) {
        lastMoveTime.current = Date.now();
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      activityLevel.current = 1;
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      // Instantly drop activity
      activityLevel.current = 0;
      cursorPos.current = { x: -1000, y: -1000 };
    };

    if (containerRef?.current) {
      const node = containerRef.current;
      node.addEventListener("mousemove", handleMouseMove);
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        node.removeEventListener("mousemove", handleMouseMove);
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    } else {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [containerRef]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize trail
    const initialTrail = Array.from({ length: pixelCount }, () => ({
      x: cursorPos.current.x,
      y: cursorPos.current.y,
      vx: 0,
      vy: 0,
    }));
    setTrail(initialTrail);

    const animate = () => {
      animationTime.current += 0.016 * presetSpeed;
      const timeSinceMove = Date.now() - lastMoveTime.current;
      
      // Only "moving" if actually inside the target container if bounded
      const isMoving = timeSinceMove < 100;

      // Smoothly update activity level
      const targetLevel = isMoving ? 1 : 0;
      const step = isMoving ? 0.016 / 0.2 : 0.016 / trailDuration;

      if (activityLevel.current < targetLevel) {
        activityLevel.current = Math.min(targetLevel, activityLevel.current + step);
      } else if (activityLevel.current > targetLevel) {
        activityLevel.current = Math.max(targetLevel, activityLevel.current - step);
      }

      startTransition(() => {
        setTrail((prevTrail) => {
          if (prevTrail.length === 0) return prevTrail;
          const newTrail = prevTrail.map((p) => ({ ...p }));

          // First point follows cursor
          if (newTrail.length > 0) {
            const dx = cursorPos.current.x - newTrail[0].x;
            const dy = cursorPos.current.y - newTrail[0].y;
            newTrail[0].vx += dx * stiffness;
            newTrail[0].vy += dy * stiffness;
            newTrail[0].vx *= damping;
            newTrail[0].vy *= damping;
            newTrail[0].x += newTrail[0].vx;
            newTrail[0].y += newTrail[0].vy;
          }

          // Each point follows the previous one
          for (let i = 1; i < newTrail.length; i++) {
            const prev = newTrail[i - 1];
            const curr = newTrail[i];
            const dx = prev.x - curr.x;
            const dy = prev.y - curr.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Spring physics
            curr.vx += dx * stiffness;
            curr.vy += dy * stiffness;
            curr.vx *= damping;
            curr.vy *= damping;
            curr.x += curr.vx;
            curr.y += curr.vy;

            // Maintain spacing
            if (dist > trailSpacing) {
              const diff = dist - trailSpacing;
              const ratio = diff / dist;
              const offsetX = dx * ratio * 0.5;
              const offsetY = dy * ratio * 0.5;
              curr.x += offsetX;
              curr.y += offsetY;
            }
          }
          return newTrail;
        });
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [pixelCount, trailSpacing, stiffness, damping, presetSpeed, trailDuration]);

  const fadeMultiplier = activityLevel.current;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {trail.map((point, index) => {
        const progress = index / pixelCount;
        let opacity = fadeOut ? 1 - progress : 1;
        let scale = scaleVariation ? 1 - progress * 0.5 : 1;

        // Apply fade when activity decays
        opacity *= fadeMultiplier;
        scale *= fadeMultiplier;

        let backgroundColor = trailColor;

        // Animation presets
        if (animationPreset !== "none") {
          const time = animationTime.current;
          const indexOffset = index * 0.1;
          switch (animationPreset) {
            case "fadeInOut":
              opacity *= (Math.sin(time + indexOffset) + 1) / 2;
              break;
            case "pulse":
              scale *= 1 + Math.sin(time + indexOffset) * 0.3;
              break;
            case "strobe":
              opacity *= Math.sin(time * 5 + indexOffset) > 0 ? 1 : 0.2;
              break;
            case "rainbow":
              const hue = (time * 50 + index * 10) % 360;
              backgroundColor = `hsl(${hue}, 70%, 60%)`;
              break;
            case "wave":
              const waveValue = (Math.sin(time + indexOffset * 2) + 1) / 2;
              opacity *= 0.3 + waveValue * 0.7;
              scale *= 0.7 + waveValue * 0.6;
              break;
          }
        }

        // Style variants
        let isVisible = true;
        if (trailStyle === "dashed") {
          isVisible = index % 5 < 3;
        } else if (trailStyle === "dotted") {
          isVisible = index % 3 === 0;
        }

        let offsetX = 0;
        let offsetY = 0;

        if (trailStyle === "wave" && index > 0) {
          const prev = trail[index - 1];
          const dx = point.x - prev.x;
          const dy = point.y - prev.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          if (length > 0) {
            const perpX = -dy / length;
            const perpY = dx / length;
            const waveOffset = Math.sin(index * 0.3) * pixelSize * 2;
            offsetX = perpX * waveOffset;
            offsetY = perpY * waveOffset;
          }
        } else if (trailStyle === "zigzag" && index > 0) {
          const prev = trail[index - 1];
          const dx = point.x - prev.x;
          const dy = point.y - prev.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          if (length > 0) {
            const perpX = -dy / length;
            const perpY = dx / length;
            const zigzagOffset = (index % 2 === 0 ? 1 : -1) * pixelSize * 1.5;
            offsetX = perpX * zigzagOffset;
            offsetY = perpY * zigzagOffset;
          }
        }

        if (!isVisible || opacity < 0.01) return null;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${point.x + offsetX}px`,
              top: `${point.y + offsetY}px`,
              width: `${pixelSize * scale}px`,
              height: `${pixelSize * scale}px`,
              backgroundColor,
              opacity,
              transform: "translate(-50%, -50%)",
              imageRendering: "pixelated",
              borderRadius: pixelShape === "circle" ? "50%" : "0",
              filter: blur > 0 ? `blur(${blur}px)` : "none",
            }}
          />
        );
      })}
    </div>
  );
}
