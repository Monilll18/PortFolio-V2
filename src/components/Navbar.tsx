"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import GooeyNav from "./GooeyNav";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Connect", href: "#connect" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroThreshold = useRef(0);

  useEffect(() => {
    // Calculate where the hero section ends
    const heroEl = document.querySelector("#hero");
    if (heroEl) {
      heroThreshold.current = heroEl.getBoundingClientRect().height * 0.85;
    }

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 72);

      // Collapse into floating island when past hero
      if (y > heroThreshold.current && heroThreshold.current > 0) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
        setMenuOpen(false); // reset when back in hero
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Recalculate hero height on resize
    const onResize = () => {
      const heroEl = document.querySelector("#hero");
      if (heroEl) {
        heroThreshold.current = heroEl.getBoundingClientRect().height * 0.85;
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <motion.nav
        layout
        onClick={() => {
          if (collapsed && !menuOpen) setMenuOpen(true);
        }}
        onMouseLeave={() => {
          if (collapsed && menuOpen) setMenuOpen(false);
        }}
        style={{
          pointerEvents: "auto",
          cursor: collapsed && !menuOpen ? "pointer" : "default",
          overflow: "hidden",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        initial={false}
        animate={{
          y: collapsed && !menuOpen ? 24 : collapsed && menuOpen ? 16 : scrolled ? 12 : 16,
          borderRadius: 9999,
          // Always keep the parent background dark to prevent the ugly white color interpolation flash
          background: collapsed && menuOpen 
            ? "rgba(0,0,0,0.85)" 
            : scrolled 
              ? "rgba(5, 5, 5, 0.7)" 
              : "rgba(10, 10, 10, 0.45)",
          boxShadow: collapsed && !menuOpen 
            ? "0 0 20px 4px rgba(255,255,255,0.15), 0 0 60px 8px rgba(255,255,255,0.05)"
            : collapsed && menuOpen
              ? "0 8px 32px rgba(0,0,0,0.4)"
              : scrolled
                ? "0 12px 40px 0 rgba(0, 0, 0, 0.5)"
                : "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
          border: collapsed && !menuOpen 
            ? "1px solid rgba(255, 255, 255, 0)" 
            : collapsed && menuOpen 
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : scrolled
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid rgba(255, 255, 255, 0.08)"
        }}
        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
      >
        {/* State 1: Collapsed Dot */}
        <motion.div
          layout
          animate={{ opacity: collapsed && !menuOpen ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: collapsed && !menuOpen ? "relative" : "absolute",
            width: 16,
            height: 16,
            background: "#fff", // White dot is contained inside, fades out instantly
            borderRadius: 9999,
          }}
        />

        {/* State 2: Expanded Island */}
        <motion.div
          layout
          animate={{ 
            opacity: collapsed && menuOpen ? 1 : 0, 
            pointerEvents: collapsed && menuOpen ? "auto" : "none" 
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: collapsed && menuOpen ? "relative" : "absolute",
            height: 56,
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            whiteSpace: "nowrap",
          }}
        >
          {/* Expanded Links */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            style={{
              color: "#fff",
              fontFamily: "var(--font-sans), Inter, sans-serif",
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: "1.1rem",
              letterSpacing: "-0.02em",
              textDecoration: "none",
            }}
          >
            Monil
          </a>
          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.15)" }} />
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              {item.label}
            </a>
          ))}
          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.15)" }} />
          <a
            href="https://drive.google.com/file/d/1VUaWYoOHlzfcxbLtjdBqTO2nAEwV5SUw/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#000",
              background: "#fff",
              fontSize: "0.8rem",
              fontWeight: 600,
              textDecoration: "none",
              padding: "6px 16px",
              borderRadius: "9999px",
            }}
          >
            Resume
          </a>
        </motion.div>

        {/* State 3: Full Navbar */}
        <motion.div
          layout
          animate={{ 
            opacity: !collapsed ? 1 : 0, 
            pointerEvents: !collapsed ? "auto" : "none" 
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: !collapsed ? "relative" : "absolute",
            width: "90vw",
            maxWidth: 1200,
            height: 64,
            padding: "0 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="navbar-logo-container">
            <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}>
              Monil
            </a>
          </div>

          <div className="navbar-center-container">
            <GooeyNav
              items={NAV_ITEMS}
              particleCount={15}
              particleDistances={[60, 10]}
              particleR={80}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          <div className="navbar-resume-container">
            <a href="https://drive.google.com/file/d/1VUaWYoOHlzfcxbLtjdBqTO2nAEwV5SUw/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="nav-resume">
              Resume
            </a>
          </div>
        </motion.div>
      </motion.nav>
    </div>
  );
}
