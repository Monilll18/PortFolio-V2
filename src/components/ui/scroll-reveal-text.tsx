"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/* Each word is its own component so useTransform is called at top level */
function RevealWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity, display: "inline-block" }}>
      {word}
    </motion.span>
  );
}

export function ScrollRevealText({ text, className, style }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 45%"],
  });

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.3em",
      }}
    >
      {words.map((word, i) => (
        <RevealWord
          key={i}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}
