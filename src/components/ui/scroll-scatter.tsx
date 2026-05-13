"use client";

import React, { useRef, useState, useCallback, Children } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface ScrollScatterProps {
  children: React.ReactNode;
  scatterDistance?: number;
  startScale?: number;
  endScale?: number;
  scrollStart?: number;
  scrollEnd?: number;
  animationEasing?: "spring" | "easeIn" | "easeOut" | "easeInOut" | "linear";
  style?: React.CSSProperties;
}

export function ScrollScatter(props: ScrollScatterProps) {
  const {
    children,
    scatterDistance = 150,
    startScale = 1,
    endScale = 1,
    scrollStart = 0,
    scrollEnd = 1,
    animationEasing = "spring",
  } = props;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedImageIndex, setFocusedImageIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scatterData = [
    { x: -350, y: -250, rotate: -5 },
    { x: 350, y: -200, rotate: 7 },
    { x: -380, y: 150, rotate: -6 },
    { x: 380, y: 220, rotate: 4 },
    { x: -150, y: 350, rotate: -4 },
    { x: 150, y: 380, rotate: 6 },
    { x: 0, y: -380, rotate: 3 },
    { x: 0, y: 450, rotate: -3 },
  ];

  const scatterMultiplier = scatterDistance / 100;

  const getTransition = (delay: number): import("framer-motion").Transition => {
    if (animationEasing === "spring") {
      return { type: "spring", stiffness: 100, damping: 20, delay };
    }
    return { type: "tween", ease: animationEasing as any, duration: 0.6, delay };
  };

  const childrenArray = Children.toArray(children).slice(0, 8);
  const totalImages = childrenArray.length;

  const handleImageKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (index + 1) % totalImages;
        setFocusedImageIndex(nextIndex);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (index - 1 + totalImages) % totalImages;
        setFocusedImageIndex(prevIndex);
      }
    },
    [totalImages]
  );

  return (
    <div
      ref={containerRef}
      style={{
        ...props.style,
        position: "relative",
        width: "100%",
        minHeight: "150vh", // Extra height to allow scrolling while scattering
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
      role="region"
      aria-label="Scatter effect container"
    >
      <div
        style={{
          position: "sticky",
          top: "50%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
        role="group"
      >
        {childrenArray.map((child, index) => {
          const scatter = scatterData[index];
          const staggerDelay = index * 0.05;

          const staggerAmount = staggerDelay * 0.15;
          const adjustedStart = Math.min(scrollStart + staggerAmount, scrollEnd - 0.1);
          const adjustedEnd = Math.min(scrollEnd + staggerAmount, 1);

          const x = useTransform(scrollYProgress, [adjustedStart, adjustedEnd], [0, scatter.x * scatterMultiplier]);
          const y = useTransform(scrollYProgress, [adjustedStart, adjustedEnd], [0, scatter.y * scatterMultiplier]);
          const scale = useTransform(scrollYProgress, [adjustedStart, adjustedEnd], [startScale, endScale]);
          const rotate = useTransform(scrollYProgress, [adjustedStart, adjustedEnd], [0, scatter.rotate]);

          return (
            <motion.div
              key={index}
              id={`scatter-item-${index}`}
              tabIndex={0}
              onKeyDown={(e) => handleImageKeyDown(e, index)}
              onFocus={() => setFocusedImageIndex(index)}
              onBlur={() => setFocusedImageIndex(null)}
              style={{
                position: "absolute",
                x,
                y,
                scale,
                rotate,
                cursor: "pointer",
                pointerEvents: "auto",
                zIndex: totalImages - index,
              }}
              transition={getTransition(staggerDelay)}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
