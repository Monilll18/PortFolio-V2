"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridScan from "../GridScan";
import TargetCursor from "../TargetCursor";

gsap.registerPlugin(ScrollTrigger);

function ComparisonSlider({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Before Image (AI Generated) */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <img
          src={beforeImage}
          alt="Before Redesign"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        {/* Label: AI Generated (Right side) */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontWeight: 600,
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.1)',
          pointerEvents: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          🤖 AI Generated (Client's Site)
        </div>
      </div>

      {/* After Image (Our Redesign) */}
      <div style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%",
        clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
      }}>
        <img
          src={afterImage}
          alt="After Redesign"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        {/* Label: Our Redesign (Left side) */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontWeight: 600,
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.1)',
          pointerEvents: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          ✨ Our Redesign
        </div>
      </div>

      {/* Slider Handle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: "4px",
          background: "white",
          transform: "translateX(-50%)",
          zIndex: 10,
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40px",
            height: "40px",
            background: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8l4 4-4 4M6 8l-4 4 4 4" />
          </svg>
        </div>
      </div>

      {/* Range Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "ew-resize",
          zIndex: 20,
        }}
      />
    </div>
  );
}

const PROJECTS = [
  {
    title: "StackForge AI",
    desc: "An AI-powered application generator that transforms plain English descriptions into production-ready code, instantly deploying full-stack architectures in under 2 minutes.",
    tags: ["Next.js", "Gemini Pro", "Tailwind CSS", "TypeScript"],
    color: "#18181b",
    image: "/images/projects/stackforge.png",
    link: "https://stackforge.ai",
  },
  {
    title: "SIS Website Redesign",
    desc: "A high-fidelity transformation of a legacy AI website. Improved load times by 40% and conversion by 25% through modern GSAP animations and a dark-themed premium aesthetic.",
    tags: ["GSAP", "Three.js", "React", "Next.js"],
    color: "#0f172a",
    image: "/images/projects/sis-after.png",
    imageBefore: "/images/projects/sis-before.png",
    isComparison: true,
    link: "https://sis.ai",
  },
  {
    title: "Procure AI",
    desc: "An intelligent procurement platform designed for strategic sourcing. Features AI-driven purchase orders, inventory tracking, supplier portals, and a custom voice assistant for hands-free operations.",
    tags: ["Next.js", "ElevenLabs", "Clerk Auth", "PostgreSQL"],
    color: "#1f1f22",
    image: "/images/projects/procure.png",
    link: "https://procure.ai",
  },
  {
    title: "LEET iq",
    desc: "A gamified competitive programming platform. Includes real-time battle modes, personalized skill roadmaps, and an AI tutor that helps users optimize their code for complexity.",
    tags: ["React", "Express", "MongoDB", "Socket.io"],
    color: "#27272a",
    image: "/images/projects/leet.png",
    link: "https://leetiq.com",
  },
  {
    title: "Dentidoco",
    desc: "An AI dental assistant that provides instant answers to oral health questions, schedules appointments, and offers personalized care recommendations using custom-trained medical LLMs.",
    tags: ["Next.js", "OpenAI", "Supabase", "Framer Motion"],
    color: "#1c1917",
    image: "/images/projects/dentidoco.png",
    link: "https://dentidoco.com",
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".project-panel");
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          start: "top top",
          end: () => `+=${trackRef.current?.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{
        overflow: "hidden",
        backgroundColor: "#080810",
        position: "relative",
      }}
    >
      {/* Background Grid Scan Effect */}
      <GridScan />
      
      {/* Target Cursor Effect */}
      <TargetCursor />

      <div
        ref={trackRef}
        className="projects-track"
        style={{
          display: "flex",
          width: `${PROJECTS.length * 100}vw`,
          height: "100vh",
          willChange: "transform",
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            className="project-panel"
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 10vw",
              gap: "5vw",
              flexShrink: 0,
            }}
          >
            {/* Left Content */}
            <div
              className="project-panel-left"
              style={{
                flex: "0 0 35%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                color: "white",
              }}
            >
              <span style={{ 
                fontFamily: "var(--font-fira-code)", 
                color: "#60A5FA",
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: "0.1em"
              }}>
                0{i + 1} / 05
              </span>
              <h2 style={{ 
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0
              }}>
                {project.title}
              </h2>
              <p style={{ 
                fontSize: "1.125rem", 
                lineHeight: 1.6, 
                color: "#94a3b8",
                maxWidth: "100%",
                margin: 0
              }}>
                {project.desc}
              </p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "100px",
                      fontSize: "0.875rem",
                      color: "#cbd5e1",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: "1rem" }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem 2rem",
                    background: "white",
                    color: "black",
                    borderRadius: "100px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Live Demo
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Mockup */}
            <div
              className="project-panel-right"
              style={{
                flex: "1",
                height: "70vh",
                background: project.color,
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {(project as any).isComparison ? (
                <ComparisonSlider beforeImage={(project as any).imageBefore} afterImage={project.image} />
              ) : (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
