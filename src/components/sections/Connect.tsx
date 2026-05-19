"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeString from "@/components/ui/theme-switch-string";

import { CrowdCanvas } from "@/components/ui/crowd-canvas";
import { SlideUpButton } from "@/components/ui/slide-up-button";
import { PixelatedCursorTrail } from "@/components/ui/pixelated-cursor-trail";

gsap.registerPlugin(ScrollTrigger);

export function Connect() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Default to light mode (white mode) on every visit
    setIsDark(false);

    // Listen for theme changes emitted by ThemeString
    const handleThemeChange = () => {
      const theme = document.documentElement.getAttribute("toggle-theme");
      setIsDark(theme === "dark");
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        background: isDark ? "#0A0A0A" : "#ffffff", 
        color: isDark ? "#ffffff" : "#000000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "120px 24px 0",
        textAlign: "center",
        transition: "background-color 0.4s ease, color 0.4s ease"
      }}
    >
      <div style={{ position: "absolute", top: 0, right: "10%", zIndex: 100 }}>
        <ThemeString />
      </div>

      <PixelatedCursorTrail containerRef={sectionRef} trailColor={isDark ? "#ffffff" : "#000000"} pixelSize={6} trailSpacing={12} />
      <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} height="50%" paused={isDark} />
      
      <div className="connect-inner" style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "900px", margin: "0 auto" }}>
        <div className="reveal-text" style={{ position: "relative", marginBottom: "40px" }}>
          <div style={{ 
            fontFamily: "var(--font-script)", 
            fontSize: "clamp(2.5rem, 6vw, 4rem)", 
            color: isDark ? "#ffffff" : "#000000",
            marginBottom: "-10px",
            zIndex: 2,
            transition: "color 0.4s ease"
          }}>
            {"Connect on".split(" ").map((word, i) => <span key={`w1-${i}`} className="reveal-word" style={{ opacity: 0.1, filter: "blur(4px)", display: "inline-block", marginRight: "0.25em" }}>{word}</span>)}
          </div>
          <h2 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)", 
            fontWeight: 400,
            lineHeight: 0.9,
            margin: "0",
            letterSpacing: "-0.02em",
            color: isDark ? "#ffffff" : "#000000",
            transition: "color 0.4s ease"
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
          {"My professional sketchbook. A space for technical deep-dives, product insights, and networking.".split(" ").map((word, i) => <span key={`w3-${i}`} className="reveal-word" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)", opacity: 0.1, filter: "blur(4px)", display: "inline-block", marginRight: "0.25em", transition: "color 0.4s ease" }}>{word}</span>)}
        </p>

        <div style={{ 
          display: "flex", 
          gap: "16px", 
          justifyContent: "center", 
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "40px"
        }}>
          <SlideUpButton 
            title="GitHub" 
            href="https://github.com/moniljain18" 
            variant={isDark ? "light" : "dark"}
          />
          <SlideUpButton 
            title="Say Hello" 
            href="mailto:moniljain18112003@gmail.com" 
            variant={isDark ? "light" : "dark"}
          />
          <SlideUpButton 
            title="LinkedIn" 
            href="https://www.linkedin.com/in/monil-jain-50b6ab355/" 
            variant={isDark ? "light" : "dark"}
          />
        </div>
      </div>
    </section>
  );
}
