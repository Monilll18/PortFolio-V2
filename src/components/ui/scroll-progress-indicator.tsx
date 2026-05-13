"use client";

import React, { useEffect, useRef, useState, startTransition } from "react";

interface ScrollProgressIndicatorProps {
  fillType?: "solid" | "gradient";
  solidColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  height?: number;
  background?: string;
  borderRadius?: number;
  velocityBased?: boolean;
  celebrationEffect?: boolean;
  style?: React.CSSProperties;
  progressValue?: number; // Optional prop to override window scroll
}

export function ScrollProgressIndicator({
  fillType = "gradient",
  solidColor = "#22c55e",
  gradientStart = "#22c55e",
  gradientEnd = "#86efac",
  height = 6,
  background = "rgba(255, 255, 255, 0.05)",
  borderRadius = 0,
  velocityBased = true,
  celebrationEffect = true,
  style,
  progressValue,
}: ScrollProgressIndicatorProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const hasReachedEndRef = useRef(false);
  const celebrationTimeoutRef = useRef<number | null>(null);

  const progress = progressValue !== undefined ? progressValue : internalProgress;

  useEffect(() => {
    if (progressValue !== undefined) {
      if (celebrationEffect && progressValue >= 1 && !hasReachedEndRef.current) {
        hasReachedEndRef.current = true;
        startTransition(() => setShowCelebration(true));
        celebrationTimeoutRef.current = window.setTimeout(() => {
          startTransition(() => setShowCelebration(false));
        }, 2000);
      }
      if (progressValue < 0.95) {
        hasReachedEndRef.current = false;
      }
      return;
    }

    if (typeof window === "undefined") return;

    function updateProgress() {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

      if (celebrationEffect && percent >= 1 && !hasReachedEndRef.current) {
        hasReachedEndRef.current = true;
        startTransition(() => setShowCelebration(true));
        celebrationTimeoutRef.current = window.setTimeout(() => {
          startTransition(() => setShowCelebration(false));
        }, 2000);
      }

      if (percent < 0.95) {
        hasReachedEndRef.current = false;
      }

      startTransition(() => setInternalProgress(percent));
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      if (celebrationTimeoutRef.current) clearTimeout(celebrationTimeoutRef.current);
    };
  }, [celebrationEffect, progressValue]);

  const fillStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    height,
    width: `${progress * 100}%`,
    borderRadius,
    transition: velocityBased ? "width 0.25s cubic-bezier(0.4,0,0.2,1)" : "none",
    background: fillType === "solid" ? solidColor : `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`,
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height,
    background,
    borderRadius,
    overflow: "visible",
    ...style,
  };

  return (
    <div
      style={containerStyle}
      aria-label="Scroll progress bar"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div style={fillStyle} />
      {celebrationEffect && showCelebration && (
        <>
          <div
            style={{
              position: "absolute",
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              borderRadius: borderRadius + 4,
              background: fillType === "solid" ? solidColor : `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`,
              opacity: 0.8,
              filter: "blur(8px)",
              animation: "celebrationGlow 1.5s ease-out",
              pointerEvents: "none",
            }}
          />
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const distance = 30 + (i % 3) * 10;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            return (
              <div
                key={i}
                style={
                  {
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: fillType === "solid" ? solidColor : gradientEnd,
                    transform: "translate(-50%, -50%)",
                    animation: `celebrationParticle 1.5s ease-out`,
                    animationDelay: `${i * 0.05}s`,
                    opacity: 0,
                    pointerEvents: "none",
                    "--particle-x": `${x}px`,
                    "--particle-y": `${y}px`,
                  } as React.CSSProperties
                }
              />
            );
          })}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius,
              background: fillType === "solid" ? solidColor : `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`,
              animation: "celebrationPulse 1.5s ease-out",
              pointerEvents: "none",
            }}
          />
        </>
      )}
      <style>{`
        @keyframes celebrationGlow {
          0% { opacity: 0; transform: scale(1); }
          30% { opacity: 0.8; transform: scale(1.15); }
          100% { opacity: 0; transform: scale(1.3); }
        }
        @keyframes celebrationPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }
        @keyframes celebrationParticle {
          0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) translate(0, 0) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) translate(var(--particle-x), var(--particle-y)) scale(0); 
          }
        }
      `}</style>
    </div>
  );
}
