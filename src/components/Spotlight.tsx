"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPOTLIGHT_ITEMS = [
  {
    icon: "🎤",
    title: "AI in Production — Tech Talk",
    desc: "Spoke about real-world challenges of deploying AI models at scale, covering latency optimization, model serving, and cost management strategies.",
    link: "Watch recording",
  },
  {
    icon: "📝",
    title: "Building Intelligent UIs",
    desc: "Deep-dive blog post on integrating LLM capabilities into React applications — from prompt engineering to streaming responses and error handling.",
    link: "Read article",
  },
  {
    icon: "🛠️",
    title: "Open Source: AI Toolkit",
    desc: "Created and maintained a toolkit for rapid AI prototyping — pre-built components for chat interfaces, document processing, and vector search.",
    link: "View on GitHub",
  },
  {
    icon: "🏆",
    title: "Hackathon Winner — AI Track",
    desc: "Built an AI-powered procurement assistant in 48 hours that won first place. Judges praised the production-quality UI and intelligent automation.",
    link: "View project",
  },
  {
    icon: "👥",
    title: "Community Mentorship",
    desc: "Mentoring junior developers in AI/ML and full-stack development. Running weekly code reviews and architecture discussions.",
    link: "Connect",
  },
  {
    icon: "🔬",
    title: "Research: Edge AI",
    desc: "Exploring deployment of transformer models on edge devices — quantization, pruning, and knowledge distillation for resource-constrained environments.",
    link: "Read paper",
  },
];

export function Spotlight() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".spotlight-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: "power2.out",
          delay: i * 0.1,
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="spotlight" className="spotlight">
      <div ref={gridRef} className="spotlight-inner">
        <div className="section-label">Spotlight</div>
        <p className="spotlight-intro">
          Impact beyond the code — talks, writing, open source, and community.
        </p>

        <div className="spotlight-grid">
          {SPOTLIGHT_ITEMS.map((item) => (
            <div key={item.title} className="spotlight-card">
              <div className="spotlight-card-icon">{item.icon}</div>
              <h3 className="spotlight-card-title">{item.title}</h3>
              <p className="spotlight-card-desc">{item.desc}</p>
              <a href="#" className="spotlight-card-link">
                {item.link} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
