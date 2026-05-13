"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export const ProgressBar = ({ scrollRef }: { scrollRef: React.RefObject<HTMLElement> }) => {
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  });
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundColor = "var(--token-78972987-8b00-47d6-9224-6383875d03b0, rgb(221, 221, 221))";
  const fillColor = "var(--token-1737b7a9-5a83-42f3-983a-21ccf228491c, rgb(119, 11, 244))";

  return (
    <div
      style={{
        position: "relative",
        width: "2px",
        height: "100%",
        backgroundColor: "rgba(221, 221, 221, 0.1)", // muted background
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          width: "2px",
          height: height,
          backgroundColor: "#22c55e", // emerald green
        }}
      />
    </div>
  );
};
