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

      {/* Slider Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: "4px",
          backgroundColor: "white",
          transform: "translateX(-50%)",
          cursor: "ew-resize",
          pointerEvents: "none",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          zIndex: 10,
        }}
      >
        {/* Slider Handle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "white",
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
    github: "#",
    demo: "https://ai-website-builder-blue.vercel.app/",
  },
  {
    title: "Procure AI",
    desc: "An intelligent procurement platform designed for strategic sourcing. Features AI-driven purchase orders, inventory tracking, supplier portals, and a custom voice assistant for hands-free operations.",
    tags: ["Next.js", "ElevenLabs", "Clerk Auth", "PostgreSQL"],
    color: "#1f1f22",
    image: "/images/projects/procureai.png",
    github: "#",
    demo: "https://procureai-two.vercel.app/",
  },
  {
    title: "LEET iq",
    desc: "A real-time collaborative coding and interview platform. Featuring live video chat, synchronized code editors, and multi-language support to seamlessly run and evaluate technical interviews.",
    tags: ["Next.js", "WebRTC", "Socket.io", "Tailwind CSS"],
    color: "#27272a",
    image: "/images/projects/leetiq.png",
    github: "#",
    demo: "https://leet-iq.vercel.app/",
  },
  {
    title: "Dentidoco AI",
    desc: "A production-ready AI-powered dental assistant that automates patient booking, voice-based scheduling, payments, and email notifications — all built with modern full-stack tools.",
    tags: ["Next.js", "Vapi AI", "Stripe", "Supabase"],
    color: "#18181b",
    image: "/images/projects/dentidoco.png",
    github: "#",
    demo: "#",
  },
  {
    title: "SIS Website Redesign",
    desc: "An AI vs Human redesign challenge showcasing our modernized, high-converting aesthetic compared to the client's broken AI-generated layout. Drag the slider to reveal the profound impact of strategic design.",
    tags: ["Next.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    color: "#18181b",
    image: "/images/projects/sis-redesign-after.png",
    imageBefore: "/images/projects/sis-redesign-before.png",
    isComparison: true,
    github: null,
    demo: "https://sislanding.mohammadaman.in/",
    demoText: "Our Redesign",
    clientSite: "https://siswit.pages.dev/",
    clientSiteText: "Client Site",
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
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
            // end: () => "+=" + track.offsetWidth,
            end: () => `+=${window.innerWidth * (sections.length - 1)}`,
          },
        });
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
      <TargetCursor targetSelector=".cursor-target" parallaxOn={true} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#1e3a8a"
          gridScale={0.1}
          scanColor="#60a5fa"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>
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
              className="project-panel-left"
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
                  background: "rgba(15, 20, 30, 0.4)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "24px",
                  padding: "2.5rem",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
                  marginTop: "-2.5rem", /* Offset the padding slightly */
                  marginLeft: "-2.5rem",
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
                  className="cursor-target"
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    fontFamily: "var(--font-sans), Inter, sans-serif",
                    marginTop: "0.5rem",
                    display: "inline-block"
                  }}
                >
                  {project.title}
                </h2>
                <p
                  className="cursor-target"
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: 1.6,
                    color: "#9ca3af",
                    fontWeight: 400,
                    marginTop: "1.5rem"
                  }}
                >
                  {project.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    marginTop: "1.5rem",
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="cursor-target"
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "100px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        fontSize: "0.875rem",
                        color: "#e5e7eb",
                        display: "inline-block"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem" }}>
                  <a
                    href={project.demo}
                    className="cursor-target"
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
                    {(project as any).demoText || "Live Demo"} <span>↗</span>
                  </a>
                  {(project as any).clientSite && (
                    <a
                      href={(project as any).clientSite}
                      className="cursor-target"
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
                      {(project as any).clientSiteText || "Client Site"} <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Project Landing Page / Preview */}
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
