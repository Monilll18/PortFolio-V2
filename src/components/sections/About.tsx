"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import VariableProximity from "../VariableProximity";
import { SmoothCursor } from "../SmoothCursor";

gsap.registerPlugin(ScrollTrigger);

const DotGrid = dynamic(() => import("../DotGrid"), { ssr: false });
const Lanyard = dynamic(() => import("../Lanyard"), { ssr: false });

const ITEMS = [
  "AI Agents",
  "Neural Networks",
  "Full-Stack Apps",
  "Vector Databases",
  "Deep Learning",
  "Autonomous Systems",
  "MERN Architectures",
  "Next.js Frontends",
];

const ITEM_H    = 88;
const VISIBLE   = 5;
const WINDOW_H  = ITEM_H * VISIBLE;
const SCROLL_PX = ITEMS.length * 260;

const LANYARD_POSITION: [number, number, number] = [0, 0, 20];
const LANYARD_GRAVITY: [number, number, number] = [0, -40, 0];

export function About() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLUListElement>(null);
  const itemRefs   = useRef<(HTMLLIElement | null)[]>([]);
  const headerRef  = useRef<HTMLDivElement>(null);
  const cursorRef  = useRef<HTMLDivElement>(null);
  const [mouseActive, setMouseActive] = useState(false);
  const [tooltipText, setTooltipText] = useState("Swipe to see");
  const [inAboutSection, setInAboutSection] = useState(false);

  // Track whether the viewport is inside the About section
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInAboutSection(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Tooltip trailing cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && mouseActive) {
        gsap.to(cursorRef.current, {
          x: e.clientX + 20,
          y: e.clientY + 20,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseActive]);

  // Scroll-triggered text animation
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const list    = listRef.current;
    if (!wrapper || !list) return;

    const n              = ITEMS.length;
    const totalTranslate = (n - 1) * ITEM_H;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity:    i === 0 ? 1 : 0.25,
        filter:     i === 0 ? "blur(0px)" : "blur(1.5px)",
        fontWeight: i === 0 ? 800 : 400,
        color:      i === 0 ? "#ffffff" : "#4b5563",
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start:   "top top",
        end:     "bottom bottom",
        scrub:   1.4,
      },
    });

    tl.to(list, { y: -totalTranslate, ease: "none", duration: n - 1 }, 0);

    ITEMS.forEach((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return;
      tl.to(el, {
        opacity: 1, filter: "blur(0px)", fontWeight: 800,
        color: "#ffffff", duration: 0.55, ease: "power2.out",
      }, i === 0 ? 0 : i - 0.55);
      if (i < n - 1) {
        tl.to(el, {
          opacity: 0.25, filter: "blur(1.5px)", fontWeight: 400,
          color: "#4b5563", duration: 0.55, ease: "power2.in",
        }, i + 0.55);
      }
    });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="about"
      style={{ height: `calc(100vh + ${SCROLL_PX}px)`, position: "relative" }}
      onMouseEnter={() => setMouseActive(true)}
      onMouseLeave={() => setMouseActive(false)}
    >
      {/* SmoothCursor with blue trail — only active in About section */}
      {inAboutSection && <SmoothCursor />}

      {/* Tooltip cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: mouseActive ? 1 : 0,
          left: 0,
          top: 0,
          transition: "opacity 0.2s ease",
          background: "rgba(15, 15, 15, 0.85)",
          padding: "14px 28px",
          color: "#fff",
          fontFamily: '"Fira Code", monospace',
          fontSize: "16px",
          fontWeight: 500,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "12px", height: "12px", borderTop: "3px solid #fff", borderLeft: "3px solid #fff" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "12px", borderTop: "3px solid #fff", borderRight: "3px solid #fff" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "12px", height: "12px", borderBottom: "3px solid #fff", borderLeft: "3px solid #fff" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "12px", height: "12px", borderBottom: "3px solid #fff", borderRight: "3px solid #fff" }} />
        {tooltipText}
      </div>

      {/* Sticky viewport panel */}
      <div
        style={{
          position:   "sticky",
          top:        0,
          height:     "100vh",
          width:      "100%",
          background: "#080810",
          display:    "flex",
          alignItems: "center",
        }}
      >
        {/* DotGrid background */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <DotGrid
            dotSize={2}
            gap={20}
            baseColor="#2a2a4f"
            activeColor="#60A5FA"
            proximity={120}
            shockRadius={170}
            shockStrength={10}
            resistance={350}
            returnDuration={1.5}
          />
        </div>

        {/* Top Middle Header */}
        <div
          ref={headerRef}
          style={{
            position: "absolute",
            top: "4rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            pointerEvents: "auto",
          }}
        >
          <VariableProximity
            label="About Me"
            className="hero-proximity-name text-5xl md:text-7xl font-clash font-bold tracking-tight text-white drop-shadow-xl"
            fromFontVariationSettings="'wght' 300"
            toFontVariationSettings="'wght' 800"
            containerRef={headerRef}
            radius={200}
            falloff="gaussian"
          />
        </div>

        {/* Two-column layout — text left only */}
        <div
          className="about-two-column"
          style={{
            position:      "relative",
            zIndex:        2,
            width:         "100%",
            maxWidth:      "1400px",
            margin:        "0 auto",
            padding:       "0 4rem",
            display:       "flex",
            flexDirection: "row",
            alignItems:    "center",
            boxSizing:     "border-box",
            marginTop:     "4rem",
            pointerEvents: "none",
          }}
        >
          {/* LEFT COLUMN: "I Build" + scrolling list */}
          <div
            className="about-left-col"
            style={{
              flex:          "0 1 auto",
              display:       "flex",
              flexDirection: "row",
              alignItems:    "center",
              gap:           "1.5em",
              pointerEvents: "auto",
            }}
          >
            <span
              className="about-i-build"
              style={{
                flexShrink:    0,
                fontSize:      "clamp(2.6rem, 5vw, 4.5rem)",
                fontWeight:    800,
                color:         "#ffffff",
                fontFamily:    "var(--font-sans), Inter, sans-serif",
                letterSpacing: "-0.03em",
                lineHeight:    `${ITEM_H}px`,
                whiteSpace:    "nowrap",
                userSelect:    "none",
              }}
            >
              I Build
            </span>

            <div
              style={{
                width:           "max-content",
                height:          `${WINDOW_H}px`,
                overflow:        "hidden",
                position:        "relative",
                maskImage:       "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
              }}
            >
              <ul
                ref={listRef}
                style={{
                  listStyle:     "none",
                  margin:        0,
                  padding:       0,
                  display:       "flex",
                  flexDirection: "column",
                  willChange:    "transform",
                  paddingTop:    `${(WINDOW_H - ITEM_H) / 2}px`,
                  paddingBottom: `${(WINDOW_H - ITEM_H) / 2}px`,
                }}
              >
                {ITEMS.map((item, i) => (
                  <li
                    key={i}
                    ref={el => { itemRefs.current[i] = el; }}
                    style={{
                      height:        `${ITEM_H}px`,
                      display:       "flex",
                      alignItems:    "center",
                      fontSize:      "clamp(2.6rem, 5vw, 4.5rem)",
                      fontFamily:    "var(--font-serif), serif",
                      fontStyle:     "italic",
                      letterSpacing: "-0.03em",
                      lineHeight:    `${ITEM_H}px`,
                      whiteSpace:    "nowrap",
                      userSelect:    "none",
                      paddingLeft:   "0.15em",
                      wordSpacing:   "0.15em",
                      willChange:    "opacity, filter, color",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lanyard — full viewport overlay so card can swing freely */}
        <div
          style={{
            position:      "absolute",
            top:           0,
            left:          0,
            width:         "100%",
            height:        "100%",
            zIndex:        1,
            pointerEvents: "none",
          }}
        >
          <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
            <Lanyard
              position={LANYARD_POSITION}
              gravity={LANYARD_GRAVITY}
              fov={15}
              onHover={(hovering) => setTooltipText(hovering ? "Grab it" : "Swipe to see")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
