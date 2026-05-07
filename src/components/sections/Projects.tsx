"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "StackForge AI",
    desc: "An AI-powered application generator that transforms plain English descriptions into production-ready code, instantly deploying full-stack architectures in under 2 minutes.",
    tags: ["Next.js", "AI Models", "Antigravity", "Node.js"],
    color: "#18181b",
    image: "/images/projects/stackforge.png",
    github: "#",
    demo: "#",
  },
  {
    title: "Procure AI",
    desc: "An intelligent procurement platform designed for strategic sourcing. Features AI-driven purchase orders, inventory tracking, supplier portals, and a custom voice assistant for hands-free operations.",
    tags: ["Next.js", "ElevenLabs", "Antigravity", "Clerk"],
    color: "#1f1f22",
    image: "/images/projects/procureai.png",
    github: "#",
    demo: "#",
  },
  {
    title: "LEET iq",
    desc: "A real-time collaborative coding and interview platform. Featuring live video chat, synchronized code editors, and multi-language support to seamlessly run and evaluate technical interviews.",
    tags: ["Next.js", "WebRTC", "Socket.io", "CodeMirror"],
    color: "#27272a",
    image: "/images/projects/leetiq.png",
    github: "#",
    demo: "#",
  },
  {
    title: "Dentidoco AI",
    desc: "A production-ready AI-powered dental assistant that automates patient booking, voice-based scheduling, payments, and email notifications — all built with modern full-stack tools.",
    tags: ["Next.js", "Stripe", "Vapi Voice AI", "Supabase"],
    color: "#18181b",
    image: "/images/projects/dentidoco.png",
    github: "#",
    demo: "#",
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
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#080810",
                    background: "#ffffff",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "100px",
                    textDecoration: "none",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Live Demo <span>↗</span>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "100px",
                    textDecoration: "none",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")}
                >
                  GitHub <span>↗</span>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
