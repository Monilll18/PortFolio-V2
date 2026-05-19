"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from "motion/react";
import { CircleCursor } from "@/components/ui/circle-cursor";
import { RetroGrid } from "@/components/ui/retro-grid";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { ScrollProgressIndicator } from "@/components/ui/scroll-progress-indicator";

/* ── Responsive CSS injected once ── */
const TIMELINE_RESPONSIVE_CSS = `
@keyframes timelinePing {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; border-width: 2px; }
  100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; border-width: 1px; }
}
@keyframes timelineConfetti {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) translate(0, 0) scale(1) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(var(--c-x), var(--c-y)) scale(0.3) rotate(360deg);
  }
}
@media (max-width: 768px) {
  .stl-track { left: 20px !important; transform: none !important; }
  .stl-dot  { left: 20px !important; }
  .stl-card { width: 100% !important; margin-left: 48px !important; margin-right: 0 !important; }
}
`;

/* ── Timeline Data ── */
const JOURNEY_DATA = [
  {
    year: "2010 – 2016",
    title: "School",
    desc: "Foundation years — curiosity, creativity, and the first lines of code.",
    tag: "Early education",
    active: false,
  },
  {
    year: "2016 – 2020",
    title: "Bachelor's Degree",
    desc: "Computer Science & Design — built the technical foundation for everything that followed.",
    tag: "B.Tech / B.Sc",
    active: false,
  },
  {
    year: "2020 – 2022",
    title: "Master's Degree",
    desc: "Specialized in UI/UX & Human-Computer Interaction. Thesis on AI-driven design systems.",
    tag: "M.Tech / M.Des",
    active: false,
  },
  {
    year: "2021 – 2022",
    title: "Video Editor",
    desc: "Freelance motion graphics and video production — storytelling through frames and cuts.",
    tag: "Adobe Premiere · After Effects",
    active: false,
  },
  {
    year: "2022 – 2023",
    title: "Digital Architect",
    desc: "Designed end-to-end digital experiences — from wireframes to high-fidelity systems at scale.",
    tag: "Figma · Systems Design",
    active: false,
  },
  {
    year: "2023 – 2024",
    title: "Tops Technologies",
    desc: "Full-stack developer building SaaS products. Led frontend architecture for 3 major releases.",
    tag: "React · Node.js · Next.js",
    active: false,
  },
  {
    year: "2024 – Present",
    title: "Neweb AI",
    desc: "Building StackForge — an AI-powered web builder that turns prompts into production-ready apps.",
    tag: "Founder · AI Builder",
    active: true,
  },
];

/* ── Node Dot ── */
const TimelineDot = ({ progress, index, total, active }: { progress: number; index: number; total: number; active: boolean }) => {
  const threshold = index / (total - 1);
  const reached = progress >= threshold - 0.02;
  const scale = reached ? 1.35 : 1;
  const bg = active
    ? "#ffffff"
    : reached
    ? "#ffffff"
    : "rgba(255,255,255,0.25)";
  const border = active
    ? "2px solid rgba(255, 255, 255, 0.8)"
    : reached
    ? "2px solid rgba(255, 255, 255, 0.7)"
    : "2px solid rgba(255,255,255,0.15)";
  const glow = active
    ? "0 0 18px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.25)"
    : reached
    ? "0 0 10px rgba(255, 255, 255, 0.5)"
    : "none";

  const isLast = index === total - 1;

  return (
    <>
      <div
        className="stl-dot"
        style={{
          position: "absolute",
          left: "50%",
          top: `${threshold * 100}%`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: bg,
          border: border,
          boxShadow: glow,
          zIndex: 5,
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      {reached && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: `${threshold * 100}%`,
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid #fff",
            animation: "timelinePing 1s cubic-bezier(0, 0, 0.2, 1) forwards",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />
      )}
      {isLast && reached && (
        <div style={{ position: "absolute", left: "50%", top: `${threshold * 100}%`, pointerEvents: "none", zIndex: 10 }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.25;
            const distance = 25 + Math.random() * 35;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const delay = Math.random() * 0.08;
            const size = 3 + Math.random() * 4;
            const colors = ["#ffffff", "#f8fafc", "#cbd5e1", "#e2e8f0", "#94a3b8"];
            const color = colors[i % colors.length];
            return (
              <div
                key={i}
                style={
                  {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: size,
                    height: size,
                    borderRadius: i % 2 === 0 ? "50%" : "0%",
                    background: color,
                    transform: "translate(-50%, -50%)",
                    animation: `timelineConfetti 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`,
                    animationDelay: `${delay}s`,
                    opacity: 0,
                    "--c-x": `${x}px`,
                    "--c-y": `${y}px`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      )}
    </>
  );
};

/* ── Glassmorphic Card ── */
const TimelineCard = ({
  entry,
  index,
  side,
}: {
  entry: (typeof JOURNEY_DATA)[0];
  index: number;
  side: "left" | "right";
}) => {
  const isActive = entry.active;
  return (
    <motion.div
      className="stl-card"
      initial={{ opacity: 0, x: side === "left" ? -60 : 60, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        position: "relative",
        width: "calc(50% - 48px)",
        marginLeft: side === "left" ? 0 : "auto",
        marginRight: side === "right" ? 0 : "auto",
        padding: "28px 28px 24px",
        borderRadius: 12,
        background: isActive
          ? "rgba(255, 255, 255, 0.12)"
          : "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isActive
          ? "1px solid rgba(255, 255, 255, 0.4)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: isActive
          ? "0 0 30px rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0,0,0,0.3)"
          : "0 4px 24px rgba(0, 0, 0, 0.2)",
        marginBottom: 0,
      }}
    >
      {/* Year badge pill */}
      <div
        style={{
          display: "inline-block",
          padding: "4px 14px",
          borderRadius: 20,
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          background: isActive
            ? "rgba(255, 255, 255, 0.25)"
            : "rgba(255, 255, 255, 0.08)",
          color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
          border: isActive
            ? "1px solid rgba(255, 255, 255, 0.5)"
            : "1px solid rgba(255,255,255,0.1)",
          marginBottom: 16,
        }}
      >
        {entry.year}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.35rem",
          fontWeight: 600,
          color: isActive ? "#ffffff" : "#ffffff",
          letterSpacing: "-0.02em",
          marginBottom: 10,
          lineHeight: 1.3,
        }}
      >
        {entry.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "0.95rem",
          color: "rgba(255, 255, 255, 0.55)",
          lineHeight: 1.65,
          marginBottom: 16,
        }}
      >
        {entry.desc}
      </p>

      {/* Tech / role tag */}
      <div
        style={{
          fontSize: "0.8rem",
          color: isActive ? "#ffffff" : "rgba(255,255,255,0.35)",
          fontWeight: 500,
          letterSpacing: "0.02em",
          ...(isActive
            ? {
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: 8,
                background: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }
            : {}),
        }}
      >
        {entry.tag}
      </div>
    </motion.div>
  );
};

/* ── Main Timeline Component ── */
export function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-10% 0px -10% 0px" });
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "120px 0 100px",
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100, pointerEvents: "none" }}
      >
        <ScrollProgressIndicator 
          progressValue={progress} 
          fillType="solid"
          solidColor="#ffffff"
          gradientStart="#ffffff"
          gradientEnd="#ffffff"
        />
      </motion.div>
      
      {/* Inject animated grid background scrolling keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes timelineGridBgScroll {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        .timeline-full-grid-bg {
          animation: timelineGridBgScroll 20s linear infinite;
        }
      ` }} />
      
      {/* Complete background grid spanning the full absolute height from top:0 to bottom:0 */}
      <div 
        className="timeline-full-grid-bg"
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          overflow: "hidden", 
          zIndex: 0, 
          pointerEvents: "none",
          backgroundColor: "#0A0A0A",
          backgroundImage: `
            radial-gradient(ellipse at center, rgba(255, 255, 255, 0.06) 0%, transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          // Smoothly blend the grid edges on top and bottom
          maskImage: "linear-gradient(to bottom, transparent 0%, black 150px, black calc(100% - 150px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 150px, black calc(100% - 150px), transparent 100%)",
        }} 
      />
      
      <CircleCursor />
      {/* Inject responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: TIMELINE_RESPONSIVE_CSS }} />
      
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 16,
          }}
        >
          Journey
        </div>
        <ScrollRevealText
          text="From school to building the future"
          style={{
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.85)",
            fontStyle: "italic",
            fontFamily: "var(--font-serif), Georgia, serif",
          }}
        />
      </div>

      {/* Central track wrapper */}
      <div style={{ position: "relative" }}>
        {/* 2px track background */}
        <div
          className="stl-track"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            transform: "translateX(-50%)",
            background: "rgba(255, 255, 255, 0.07)",
            borderRadius: 2,
            zIndex: 2,
          }}
        >
          {/* Gradient fill */}
          <motion.div
            style={{
              width: "100%",
              height: lineHeight,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.6), #ffffff)",
              borderRadius: 2,
              boxShadow: "0 0 12px rgba(255, 255, 255, 0.4), 0 0 24px rgba(255, 255, 255, 0.15)",
            }}
          />
        </div>

        {/* Dots */}
        {JOURNEY_DATA.map((entry, i) => (
          <TimelineDot
            key={i}
            progress={progress}
            index={i}
            total={JOURNEY_DATA.length}
            active={entry.active}
          />
        ))}

          {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 64, position: "relative", zIndex: 3 }}>
          {JOURNEY_DATA.map((entry, i) => (
            <TimelineCard
              key={i}
              entry={entry}
              index={i}
              side={i % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
