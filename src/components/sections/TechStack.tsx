"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Tech Stack Data ── */
const TECH_STACK = [
  { name: "Python", icon: "/images/tech/python.png", alt: "Python" },
  { name: "PyTorch", icon: "/images/tech/pytorch.png", alt: "PyTorch" },
  { name: "TensorFlow", icon: "/images/tech/tensorflow.png", alt: "TensorFlow" },
  { name: "OpenAI", icon: "/images/tech/openai.png", alt: "OpenAI" },
  { name: "LangChain", icon: "/images/tech/langchain.png", alt: "LangChain" },
  { name: "React", icon: "/images/tech/react.png", alt: "React" },
  { name: "Next.js", icon: "/images/tech/nextjs.png", alt: "Next.js" },
  { name: "Docker", icon: "/images/tech/docker.png", alt: "Docker" },
];

/* ── Config ── */
const CFG = {
  maxExpandRadius: 260,
  outerRingProgress: 0.55,   // progress when outer ring appears
  innerRingProgress: 0.2,    // progress when inner ring appears
  textFadeProgress: 0.5,     // progress when center text fades in
};

export function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => st.kill();
  }, [isClient]);

  const expandRadius = progress * CFG.maxExpandRadius;
  const rotationAngle = progress * Math.PI * 2;
  const angles = TECH_STACK.map((_, i) => (i * 2 * Math.PI) / TECH_STACK.length);

  const showOuterRing = progress > CFG.outerRingProgress;
  const showInnerRing = progress > CFG.innerRingProgress;
  const showText = progress > CFG.textFadeProgress;

  return (
    <section id="techstack" className="so-section" ref={sectionRef}>
      {/* Tall scroll area for ScrollTrigger */}
      <div className="so-scroll-area">
        <div className="so-sticky">
          <div className="so-orbit-wrapper">
            {/* Outer ring */}
            <div
              className="so-ring so-ring-outer"
              style={{
                borderColor: showOuterRing
                  ? "rgba(255, 255, 255, 0.08)"
                  : "transparent",
              }}
            >
              {/* Inner ring */}
              <div
                className="so-ring so-ring-inner"
                style={{
                  borderColor: showInnerRing
                    ? "rgba(200, 169, 126, 0.15)"
                    : "transparent",
                }}
              >
                {/* Gradient ring */}
                <div className="so-gradient-ring">
                  <div className="so-gradient-ring-fill">
                    {/* Orbiting icons */}
                    {TECH_STACK.map((tech, idx) => (
                      <div
                        key={tech.name}
                        className="so-icon-card"
                        style={{
                          transform: `translate(${
                            expandRadius * Math.cos(angles[idx] + rotationAngle)
                          }px, ${
                            expandRadius * Math.sin(angles[idx] + rotationAngle)
                          }px)`,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tech.icon}
                          alt={tech.alt}
                          className="so-icon-img"
                          draggable={false}
                        />
                      </div>
                    ))}

                    {/* Center text */}
                    <div
                      className="so-center-text"
                      style={{ opacity: showText ? 1 : 0 }}
                    >
                      <h2 className="so-title">Powered By</h2>
                      <h2 className="so-title so-title-gradient">Modern AI Stack</h2>
                      <p className="so-description">
                        Building production ML systems, intelligent UIs &amp; developer tools — from prototype to scale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
