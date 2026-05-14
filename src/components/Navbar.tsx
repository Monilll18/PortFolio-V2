"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
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
  const navRef = useRef<HTMLElement>(null);
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

  const handleIslandClick = () => {
    setMenuOpen(true);
  };

  // ── Floating island mode ─────────────────────────────────
  if (collapsed && !menuOpen) {
    return (
      <nav
        ref={navRef}
        className="navbar-island"
        onClick={handleIslandClick}
        style={{
          position: "fixed",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "#fff",
          cursor: "pointer",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          boxShadow: "0 0 20px 4px rgba(255,255,255,0.15), 0 0 60px 8px rgba(255,255,255,0.05)",
        }}
      />
    );
  }

  // ── Expanded island (after tap) ──────────────────────────
  if (collapsed && menuOpen) {
    return (
      <nav
        ref={navRef}
        onMouseLeave={() => setMenuOpen(false)}
        className="navbar-island-expanded"
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "9999px",
          padding: "12px 32px",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <a
          href="#hero"
          onClick={() => handleNavClick("#hero")}
          style={{
            color: "#fff",
            fontFamily: "var(--font-sans), Inter, sans-serif",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "1.1rem",
            letterSpacing: "-0.02em",
            textDecoration: "none",
            whiteSpace: "nowrap",
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
              whiteSpace: "nowrap",
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
            whiteSpace: "nowrap",
          }}
        >
          Resume
        </a>
      </nav>
    );
  }

  // ── Normal full navbar (hero section) ────────────────────
  return (
    <nav ref={navRef} className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        {/* Left Side: Logo */}
        <div className="navbar-logo-container">
          <a href="#hero" className="navbar-logo" onClick={() => handleNavClick("#hero")}>
            Monil
          </a>
        </div>

        {/* Center: GooeyNav */}
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

        {/* Right Side: Resume Button */}
        <div className="navbar-resume-container">
          <a href="https://drive.google.com/file/d/1VUaWYoOHlzfcxbLtjdBqTO2nAEwV5SUw/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="nav-resume">
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
