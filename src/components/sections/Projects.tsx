"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "AI Procurement System",
    desc: "Intelligent procurement platform with AI-powered supplier matching, three-way invoice matching, and predictive analytics for enterprise supply chain optimization.",
    tags: ["Next.js", "FastAPI", "GPT-4", "PostgreSQL"],
    color: "#18181b",
  },
  {
    title: "Real-Time Analytics Dashboard",
    desc: "High-performance data visualization framework processing millions of events with sub-second latency. Interactive charts, anomaly detection, and automated reporting.",
    tags: ["React", "D3.js", "WebSocket", "Redis"],
    color: "#1f1f22",
  },
  {
    title: "AI Voice Assistant",
    desc: "Conversational AI integration with natural language understanding, real-time speech processing, and context-aware responses for enterprise workflows.",
    tags: ["ElevenLabs", "LangChain", "Python", "WebRTC"],
    color: "#27272a",
  },
  {
    title: "E-Commerce Platform",
    desc: "Scalable marketplace with ML-powered recommendations, dynamic pricing engine, and seamless payment processing handling thousands of concurrent transactions.",
    tags: ["Next.js", "Stripe", "TensorFlow", "MongoDB"],
    color: "#18181b",
  },
  {
    title: "Developer Portfolio",
    desc: "Precision-crafted showcase built with cinematic animations, custom cursor physics, and pixel-perfect dark luxury aesthetic. The site you're looking at.",
    tags: ["Next.js", "GSAP", "Framer Motion", "Lenis"],
    color: "#1f1f22",
  },
  {
    title: "Open Source Contributions",
    desc: "Active contributions to developer tooling, UI component libraries, and AI/ML frameworks. Building tools that empower the community.",
    tags: ["TypeScript", "Python", "Rust", "OSS"],
    color: "#27272a",
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const sections = gsap.utils.toArray(".project-panel");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          // end: () => "+=" + track.offsetWidth,
          end: () => `+=${window.innerWidth * (sections.length - 1)}`,
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
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: `${PROJECTS.length * 100}vw`,
          height: "100vh",
          willChange: "transform",
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.title}
            className="project-panel"
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "4rem 6rem",
              gap: "4rem",
              boxSizing: "border-box",
            }}
          >
            {/* Left: Project Description */}
            <div
              style={{
                flex: "0 0 35%",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                color: "#ffffff",
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#60A5FA",
                  fontWeight: 600,
                }}
              >
                0{i + 1} / 0{PROJECTS.length}
              </div>
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 4vw, 4rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-sans), Inter, sans-serif",
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                  color: "#9ca3af",
                  fontWeight: 400,
                }}
              >
                {project.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginTop: "1rem",
                }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "100px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      fontSize: "0.875rem",
                      color: "#e5e7eb",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    textDecoration: "none",
                    borderBottom: "1px solid #ffffff",
                    paddingBottom: "0.25rem",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  View details <span>→</span>
                </a>
              </div>
            </div>

            {/* Right: Project Landing Page / Preview */}
            <div
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
              {/* Placeholder for the landing page image/content */}
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  opacity: 0.1,
                  color: "#ffffff",
                  userSelect: "none",
                }}
              >
                {project.title.split(" ").map(w => w[0]).join("")}
              </div>
              {/* Example structural lines to make it look like a mockup */}
              <div style={{ position: "absolute", top: "1rem", left: "1rem", right: "1rem", height: "1rem", display: "flex", gap: "0.5rem" }}>
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
