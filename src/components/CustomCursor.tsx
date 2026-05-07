"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Hide on mobile
    if (window.matchMedia("(max-width: 768px)").matches) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => dot.classList.add("hovering");
    const onMouseLeave = () => dot.classList.remove("hovering");

    document.addEventListener("mousemove", onMouseMove);

    // Add hover effect to interactive elements
    const hoverTargets = document.querySelectorAll(
      "a, button, .project-card, .connect-card, .spotlight-card, .faq-question"
    );
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" />;
}
