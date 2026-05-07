"use client";

import { useState } from "react";

const FAQ_DATA = [
  {
    q: "What tech stack do you work with?",
    a: "Primarily Next.js, React, TypeScript on the frontend, with Python/FastAPI and Node.js on the backend. For AI/ML, I work with OpenAI APIs, LangChain, TensorFlow, and various vector databases. Always picking the right tool for the job.",
  },
  {
    q: "Are you open to freelance or contract work?",
    a: "Yes — I take on select projects that align with my expertise in AI-powered applications and full-stack development. If you have something interesting, let's talk.",
  },
  {
    q: "How fast can you ship?",
    a: "Fast. I believe in rapid iteration — get to an MVP quickly, gather feedback, and refine. Most projects go from concept to deployed prototype within 2-4 weeks.",
  },
  {
    q: "Do you mentor junior developers?",
    a: "Absolutely. I regularly mentor developers in AI/ML, full-stack architecture, and career growth. Reach out through the Connect section if you're interested.",
  },
  {
    q: "What's your approach to AI integration?",
    a: "Pragmatic. I focus on real business value over hype — choosing between fine-tuned models, RAG pipelines, or simple prompt engineering based on what actually solves the problem. Production-readiness is non-negotiable.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="faq">
      <div className="faq-inner">
        <div className="section-label">FAQ</div>
        {FAQ_DATA.map((item, i) => (
          <div key={item.q} className="faq-item">
            <button className="faq-question" onClick={() => toggle(i)}>
              <span>{item.q}</span>
              <svg
                className={`faq-chevron ${openIndex === i ? "open" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`faq-answer ${openIndex === i ? "open" : ""}`}>
              <p className="faq-answer-text">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
