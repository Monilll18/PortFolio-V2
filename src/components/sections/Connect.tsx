"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CrowdCanvas } from "@/components/ui/crowd-canvas";
import { SlideUpButton } from "@/components/ui/slide-up-button";
import { PixelatedCursorTrail } from "@/components/ui/pixelated-cursor-trail";

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

      const textBlocks = gsap.utils.toArray<HTMLElement>(".reveal-text");
      textBlocks.forEach((block) => {
        const words = block.querySelectorAll(".reveal-word");
        gsap.fromTo(words, 
          { opacity: 0.1, filter: "blur(4px)" },
          {
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              end: "bottom 40%",
              scrub: 1,
            },
            opacity: 1,
            filter: "blur(0px)",
            color: "#000000",
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="connect" 
      ref={sectionRef} 
      className="connect" 
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        background: "#ffffff", 
        color: "#000000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "120px 24px 0",
        textAlign: "center"
      }}
    >
      <PixelatedCursorTrail containerRef={sectionRef} trailColor="#000000" pixelSize={6} trailSpacing={12} />
      <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} height="50%" />
      
      <div className="connect-inner" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "900px", margin: "0 auto" }}>
        <div className="reveal-text" style={{ position: "relative", marginBottom: "40px" }}>
          <div style={{ 
            fontFamily: "var(--font-script)", 
            fontSize: "clamp(2.5rem, 6vw, 4rem)", 
            color: "#000000",
            marginBottom: "-10px",
            zIndex: 2
          }}>
            {"Connect on".split(" ").map((word, i) => <span key={`w1-${i}`} className="reveal-word" style={{ opacity: 0.1, filter: "blur(4px)", display: "inline-block", marginRight: "0.25em" }}>{word}</span>)}
          </div>
          <h2 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)", 
            fontWeight: 400,
            lineHeight: 0.9,
            margin: "0",
            letterSpacing: "-0.02em"
          }}>
            {"Social media.".split(" ").map((word, i) => <span key={`w2-${i}`} className="reveal-word" style={{ opacity: 0.1, filter: "blur(4px)", display: "inline-block" }}>{word}</span>)}
          </h2>
        </div>

        <p className="reveal-text" style={{ 
          fontSize: "clamp(1rem, 2vw, 1.25rem)", 
          maxWidth: "600px", 
          margin: "0 auto 48px",
          lineHeight: 1.6 
        }}>
          {"My professional sketchbook. A space for technical deep-dives, product insights, and networking.".split(" ").map((word, i) => <span key={`w3-${i}`} className="reveal-word" style={{ color: "rgba(0,0,0,0.6)", opacity: 0.1, filter: "blur(4px)", display: "inline-block", marginRight: "0.25em" }}>{word}</span>)}
        </p>

        <SlideUpButton 
          title="Say Hello" 
          href="https://linkedin.com" 
          variant="dark"
        />

      </div>
    </section>
  );
}
