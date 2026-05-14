"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from "framer-motion";

interface SpringSwitchProps {
  width?: number;
  height?: number;
  radius?: number;
  autoSize?: boolean;
  string?: {
    lineColor?: string;
    darkLineColor?: string;
    stringLength?: number;
    stringThickness?: number;
  };
  threshold?: number;
  stiffness?: number;
  damping?: number;
  themeTransition?: number;
  lightSlot?: React.ReactNode;
  darkSlot?: React.ReactNode;
}

const changeTheme = (t: string) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const h = document.documentElement;
  const b = document.body;
  h.setAttribute("toggle-theme", t);
  b.setAttribute("toggle-theme", t);
  localStorage.setItem("theme", t);
  window.dispatchEvent(new Event("themeChange"));
};

function extractAndApplyThemeTokens() {
  if (typeof document === "undefined") return;
  let l: string[] = [];
  let d = "";
  for (let i = 0; i < document.styleSheets.length; i++) {
    try {
      const rules = document.styleSheets[i].cssRules || [];
      for (let k = 0; k < rules.length; k++) {
        const r = rules[k] as CSSStyleRule;
        if (r.selectorText === "body") {
          for (let j = 0; j < r.style.length; j++) {
            const p = r.style[j];
            if (p.includes("--token")) l.push(`${p}: ${r.style.getPropertyValue(p)};`);
          }
        } else if ((rules[k] as CSSMediaRule).conditionText === "(prefers-color-scheme: dark)") {
          const mRule = rules[k] as CSSMediaRule;
          if (mRule.cssRules.length > 0) d = (mRule.cssRules[0] as CSSStyleRule).cssText.replace("body", "").replace(/\s*{\s*/, "").replace(/\s*}\s*$/, "");
        }
      }
    } catch (e) {}
  }
  const id = "toggle-theme-styles";
  const old = document.getElementById(id);
  if (old) document.head.removeChild(old);
  const s = document.createElement("style");
  s.id = id;
  s.textContent = `
    body[toggle-theme="light"]{${l.join(" ")}} 
    body[toggle-theme="dark"]{${d}} 
    html[toggle-theme="light"]{color-scheme:light} 
    html[toggle-theme="dark"]{color-scheme:dark}
  `;
  document.head.appendChild(s);
}

export default function ThemeSwitchString({
  width = 60,
  height = 100,
  radius = 12,
  autoSize = false,
  string = {},
  threshold = 150,
  stiffness = 300,
  damping = 20,
  themeTransition = 0.4,
  lightSlot,
  darkSlot
}: SpringSwitchProps) {
  const {
    lineColor = "#333",
    darkLineColor = "#fff",
    stringLength = 200,
    stringThickness = 3
  } = string;

  const [isDark, setIsDark] = useState(false);
  const [, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    extractAndApplyThemeTokens();
    const saved = localStorage.getItem("theme");
    const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    let start = saved === "dark" || (!saved && sysDark);
    setIsDark(start);
    changeTheme(start ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "toggle-theme-transition-style";
    let s = document.getElementById(id);
    if (!s) {
      s = document.createElement("style");
      s.id = id;
      document.head.appendChild(s);
    }
    s.textContent = `body { transition: background-color ${themeTransition}s ease, color ${themeTransition}s ease; }`;
  }, [themeTransition]);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    changeTheme(newMode ? "dark" : "light");
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const path = useTransform([x, y], ([cx, cy]) => `M 50 0 L ${50 + (cx as number)} ${stringLength + (cy as number) + 1}`);

  const handleDragEnd = () => {
    setIsDragging(false);
    if (y.get() > threshold) toggleTheme();
    controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness, damping } });
  };

  const currentBg = isDark ? "#222" : "#fff";
  const currentLine = isDark ? darkLineColor : lineColor;
  const currentBorder = isDark ? "#fff" : lineColor;
  const currentIconColor = currentLine;

  const hasCustomSlots = lightSlot && darkSlot;
  const baseStyle: React.CSSProperties = {
    marginTop: stringLength,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "grab",
    pointerEvents: "auto",
    zIndex: 10,
    position: "relative"
  };
  const sizeStyle = autoSize ? { width: "auto", height: "auto", padding: 0 } : { width: width, height: height };
  const visualStyle = hasCustomSlots ? { backgroundColor: "transparent", boxShadow: "none", border: "none" } : {
    backgroundColor: currentBg,
    border: `3px solid ${currentBorder}`,
    borderRadius: radius,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    transition: `background-color ${themeTransition}s ease, border-color ${themeTransition}s ease`
  };

  return (
    <div style={{ width: 100, height: 400, position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-start", overflow: "visible", zIndex: 9999, pointerEvents: "none", lineHeight: 0 }}>
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", zIndex: 0 }}>
        <motion.path d={path} stroke={currentLine} strokeWidth={stringThickness} strokeLinecap="round" fill="none" style={{ transition: `stroke ${themeTransition}s ease` }} />
      </svg>
      <motion.div
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 300 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={controls}
        style={{ x, y, ...baseStyle, ...sizeStyle, ...visualStyle } as any}
        whileTap={{ cursor: "grabbing" }}
      >
        {/* Lanyard-style Grab it Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 6, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.85, y: 6, x: "-50%" }}
              transition={{ type: "spring", stiffness: 600, damping: 28 }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 12px)",
                left: "50%",
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.9)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                color: isDark ? "#000000" : "#ffffff",
                padding: "5px 10px",
                borderRadius: "8px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                boxShadow: isDark 
                  ? "0 4px 12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.2)" 
                  : "0 4px 12px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)",
                pointerEvents: "none",
                fontFamily: "var(--font-sans), Inter, sans-serif",
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                lineHeight: "1.2"
              }}
            >
              grab it
              {/* Triangle Arrow */}
              <div 
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderWidth: "4px",
                  borderStyle: "solid",
                  borderColor: `${isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.9)"} transparent transparent transparent`
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {hasCustomSlots ? (
          <div style={{ pointerEvents: "none", display: "flex" }}>
            {isDark ? darkSlot : lightSlot}
          </div>
        ) : (
          <div style={{ position: "relative", width: 24, height: 24 }}>
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={currentIconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
              style={{ position: "absolute", top: 0, left: 0, transition: `stroke ${themeTransition}s ease` }}
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.svg>
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={currentIconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
              style={{ position: "absolute", top: 0, left: 0, transition: `stroke ${themeTransition}s ease` }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>
          </div>
        )}
      </motion.div>
    </div>
  );
}
