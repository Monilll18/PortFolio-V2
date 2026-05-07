"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONNECT_ITEMS = [
  {
    icon: "in",
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    icon: "gh",
    label: "GitHub",
    href: "https://github.com",
  },
  {
    icon: "💬",
    label: "1:1 Chat",
    href: "#",
  },
];

export function Connect() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".connect-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
          delay: i * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="connect" ref={sectionRef} className="connect">
      <div className="connect-inner">
        <div className="section-label">Connect</div>
        <p className="connect-intro">
          No gatekeepers — just open channels. Whether it&apos;s a project idea,
          collaboration, or just a conversation about tech, I&apos;m always reachable.
        </p>
        <div className="connect-cards">
          {CONNECT_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="connect-card" target="_blank" rel="noopener noreferrer">
              <div className="connect-card-icon">{item.icon}</div>
              <span className="connect-card-label">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
