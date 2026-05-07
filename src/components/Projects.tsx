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
  },
  {
    title: "Real-Time Analytics Dashboard",
    desc: "High-performance data visualization framework processing millions of events with sub-second latency. Interactive charts, anomaly detection, and automated reporting.",
    tags: ["React", "D3.js", "WebSocket", "Redis"],
  },
  {
    title: "AI Voice Assistant",
    desc: "Conversational AI integration with natural language understanding, real-time speech processing, and context-aware responses for enterprise workflows.",
    tags: ["ElevenLabs", "LangChain", "Python", "WebRTC"],
  },
  {
    title: "E-Commerce Platform",
    desc: "Scalable marketplace with ML-powered recommendations, dynamic pricing engine, and seamless payment processing handling thousands of concurrent transactions.",
    tags: ["Next.js", "Stripe", "TensorFlow", "MongoDB"],
  },
  {
    title: "Developer Portfolio",
    desc: "Precision-crafted showcase built with cinematic animations, custom cursor physics, and pixel-perfect dark luxury aesthetic. The site you're looking at.",
    tags: ["Next.js", "GSAP", "Framer Motion", "Lenis"],
  },
  {
    title: "Open Source Contributions",
    desc: "Active contributions to developer tooling, UI component libraries, and AI/ML frameworks. Building tools that empower the community.",
    tags: ["TypeScript", "Python", "Rust", "OSS"],
  },
];

export function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.1,
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects">
      <div ref={gridRef}>
        <div className="container" style={{ paddingBottom: 0 }}>
          <div className="section-label">Selected Work</div>
        </div>
        <div className="projects-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          {PROJECTS.map((project) => (
            <div key={project.title} className="project-card">
              <div className="project-card-image">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 50%, #181818 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      opacity: 0.06,
                      color: "#F5F5F5",
                      userSelect: "none",
                    }}
                  >
                    {project.title.split(" ").map(w => w[0]).join("")}
                  </span>
                </div>
              </div>
              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.desc}</p>
                <div className="project-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="project-card-cta">View details →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
