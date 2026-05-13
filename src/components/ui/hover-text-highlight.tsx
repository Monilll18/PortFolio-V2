"use client";

import React from "react";
import { motion } from "framer-motion";

interface HoverTextHighlightProps {
  text?: React.ReactNode;
  children?: React.ReactNode;
  effectColor?: string;
  wipeDirection?: "leftToRight" | "rightToLeft";
}

export function HoverTextHighlight({
  text,
  children,
  effectColor = "#ffffff", // Default to white
  wipeDirection = "leftToRight",
}: HoverTextHighlightProps) {
  const content = text || children;
  const isLeftToRight = wipeDirection === "leftToRight";
  
  const transition = { duration: 0.3, ease: "easeInOut" };

  const origins = {
    rest: isLeftToRight ? "bottom right" : "bottom left",
    hover: isLeftToRight ? "bottom left" : "bottom right",
  };

  const wipeVariants = {
    rest: { scaleX: 0, transformOrigin: origins.rest, transition },
    hover: { scaleX: 1, transformOrigin: origins.hover, transition },
  };

  return (
    <motion.div
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        cursor: "pointer",
        padding: "0 0.1em", // Small padding so edge text doesn't touch the wipe border
      }}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <motion.div
        variants={wipeVariants}
        style={{
          position: "absolute",
          inset: 0,
          background: effectColor,
          willChange: "transform",
          zIndex: 0,
        }}
      />
      <motion.span
        variants={{
          rest: { color: "inherit", textShadow: "none" },
          hover: { color: "#000000", textShadow: "none" }
        }}
        transition={transition}
        style={{ position: "relative", zIndex: 1 }}
      >
        {content}
      </motion.span>
    </motion.div>
  );
}
