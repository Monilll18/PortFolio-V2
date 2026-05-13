"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ScrollTimeline } from "@/components/ui/scroll-timeline";
import { HoverTextHighlight } from "@/components/ui/hover-text-highlight";
import { CircleCursor } from "@/components/ui/circle-cursor";

const MacbookScroll = dynamic(
  () => import("@/components/ui/macbook-scroll").then((mod) => ({ default: mod.MacbookScroll })),
  { ssr: false }
);

const ShaderFlow = dynamic(
  () => import("@/components/ui/shader-flow").then(mod => mod.ShaderFlow),
  { ssr: false }
);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="experience" ref={sectionRef} className="experience">
      {/* MacBook with timeline preview image inside the screen */}
      <div
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          overflow: "hidden",
          background: "#080810",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
            <ShaderFlow style={{ width: "100%", height: "100%" }} />
        </div>
        <CircleCursor />
        <MacbookScroll
          title={
            <span style={{ 
              color: "#ffffff", 
              fontWeight: 800,
              fontFamily: "var(--font-sans), Inter, sans-serif",
              display: "inline-block",
              mixBlendMode: "difference"
            }}>
              <HoverTextHighlight effectColor="#ffffff">Life is a Journey</HoverTextHighlight> <br />
              <HoverTextHighlight effectColor="#ffffff">Experiences define our path.</HoverTextHighlight>
            </span>
          }
          src="/images/quote-wallpaper.png"
          showGradient={false}
        />
      </div>

      {/* Scroll-linked Timeline */}
      <ScrollTimeline />
    </section>
  );
}
