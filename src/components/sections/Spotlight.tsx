"use client";

import { ScrollScatter } from "@/components/ui/scroll-scatter";

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

  return (
    <section id="spotlight" className="spotlight">
      <div className="spotlight-inner" style={{ position: "relative", zIndex: 1, paddingBottom: 0 }}>
        <div className="section-label" style={{ position: "relative", zIndex: 10 }}>Spotlight</div>
        <p className="spotlight-intro" style={{ position: "relative", zIndex: 10 }}>
          Impact beyond the code — talks, writing, open source, and community.
        </p>

        <ScrollScatter scatterDistance={120} startScale={0.8} endScale={1} scrollStart={0.2} scrollEnd={0.8}>
          {SPOTLIGHT_ITEMS.map((item) => (
            <div key={item.title} className="spotlight-card" style={{ width: 300, background: "#fff", padding: 24, borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <div className="spotlight-card-icon" style={{ fontSize: "2rem", marginBottom: 16 }}>{item.icon}</div>
              <h3 className="spotlight-card-title" style={{ fontSize: "1.2rem", marginBottom: 8, fontWeight: 600 }}>{item.title}</h3>
              <p className="spotlight-card-desc" style={{ fontSize: "0.9rem", color: "#666", marginBottom: 16 }}>{item.desc}</p>
              <a href="#" className="spotlight-card-link" style={{ fontWeight: 500, color: "#000" }}>
                {item.link} →
              </a>
            </div>
          ))}
        </ScrollScatter>
      </div>
    </section>
  );
}
