"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    date: "Apr 2024 — Present",
    role: "AI Full Stack Developer",
    company: "Independent / Contract",
    desc: "Architecting AI-powered applications from concept to deployment. Building intelligent procurement systems, voice assistants, and data analytics platforms using cutting-edge ML models and modern web frameworks.",
  },
  {
    date: "Jan 2023 — Mar 2024",
    role: "Full Stack Developer",
    company: "Tech Startup",
    desc: "Led development of customer-facing products serving 10k+ users. Implemented real-time data pipelines, microservice architecture, and CI/CD workflows that reduced deployment time by 60%.",
  },
  {
    date: "Jun 2022 — Dec 2022",
    role: "Frontend Developer",
    company: "Digital Agency",
    desc: "Crafted pixel-perfect interfaces for high-profile clients. Specialized in performance optimization, accessibility, and animation engineering using React and GSAP.",
  },
  {
    date: "Jan 2022 — May 2022",
    role: "Software Engineering Intern",
    company: "Enterprise SaaS",
    desc: "Contributed to core platform features, built internal tooling, and developed automated testing suites. First exposure to production-scale systems and agile workflows.",
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line drawing
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
          scaleY: 0,
          transformOrigin: "top",
        });
      }

      // Stagger items
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: -30,
          duration: 0.5,
          ease: "power2.out",
          delay: i * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience">
      <div className="experience-inner">
        <div className="section-label">Experience</div>
        <p className="experience-intro">
          Building at the intersection of AI, product engineering, and design — each
          role sharpening a different edge of the craft.
        </p>

        <div className="timeline">
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              left: 3,
              top: 8,
              bottom: 8,
              width: 1,
              background: "var(--border)",
            }}
          />
          {TIMELINE_DATA.map((item) => (
            <div key={item.date} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">{item.date}</div>
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-company">{item.company}</div>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
