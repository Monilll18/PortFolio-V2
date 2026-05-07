"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import "./WordsPreloader.css";

/**
 * Skiper8-style "Words Preloader"
 * Inspired by dennissnellenberg.com
 *
 * Cycles through words in multiple languages with a clipping-mask reveal,
 * animated counter, and exits with a curved SVG wipe.
 */

const WORDS = [
  { text: "Hello",      lang: "en" },
  { text: "Bonjour",    lang: "fr" },
  { text: "Hola",       lang: "es" },
  { text: "こんにちは",   lang: "ja" },
  { text: "مرحبا",      lang: "ar" },
  { text: "Ciao",       lang: "it" },
];

const WORD_DUR   = 0.5;   // how long each word is visible
const WORD_DELAY = 0.22;  // gap between words
const CLIP_DUR   = 0.42;  // clip reveal/hide duration
const TOTAL_DUR  = WORDS.length * (WORD_DUR + WORD_DELAY); // ~4.3s

interface WordsPreloaderProps {
  onComplete?: () => void;
}

export function WordsPreloader({ onComplete }: WordsPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const curveRef     = useRef<SVGPathElement>(null);
  const counterRef   = useRef<HTMLSpanElement>(null);

  // Animated counter 0 → 100
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Tick counter from 0 → 100 over TOTAL_DUR seconds
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: TOTAL_DUR,
      ease: "power1.inOut",
      onUpdate() {
        setCount(Math.round(obj.val));
      },
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // ── Cycle through each word ───────────────────────────────────────
    WORDS.forEach((_, i) => {
      const el = wordRefs.current[i];
      if (!el) return;
      const t = i * (WORD_DUR + WORD_DELAY);

      // Reveal from bottom via clipPath
      tl.fromTo(
        el,
        { clipPath: "inset(110% 0% 0% 0%)", y: 30 },
        { clipPath: "inset(0% 0% 0% 0%)",   y: 0,  duration: CLIP_DUR },
        t
      );

      // Hide upward (not last word)
      if (i < WORDS.length - 1) {
        tl.to(
          el,
          { clipPath: "inset(0% 0% 110% 0%)", y: -30, duration: CLIP_DUR },
          t + WORD_DUR
        );
      }
    });

    // ── Exit: curved SVG wipe sweeps overlay upward ───────────────────
    const EXIT = TOTAL_DUR;
    const W = typeof window !== "undefined" ? window.innerWidth  : 1920;
    const H = typeof window !== "undefined" ? window.innerHeight : 1080;

    const flatPath   = `M 0 0 L ${W} 0 L ${W} ${H} Q ${W / 2} ${H} 0 ${H} Z`;
    const curvedPath = `M 0 0 L ${W} 0 L ${W} ${H} Q ${W / 2} ${H * 0.55} 0 ${H} Z`;
    const gonePath   = `M 0 0 L ${W} 0 L ${W} 0 Q ${W / 2} ${H * -0.25} 0 0 Z`;

    const pathEl = curveRef.current;
    if (pathEl) {
      gsap.set(pathEl, { attr: { d: flatPath } });

      tl.to(pathEl, {
        attr: { d: curvedPath },
        duration: 0.5,
        ease: "power2.in",
      }, EXIT);

      tl.to(pathEl, {
        attr: { d: gonePath },
        duration: 0.75,
        ease: "power3.inOut",
        onComplete: () => {
          onComplete?.();
          if (container) container.style.display = "none";
        },
      }, EXIT + 0.45);
    }

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="words-preloader">
      {/* SVG overlay for curved exit wipe */}
      <svg
        className="words-preloader__svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path ref={curveRef} fill="#f5f4f0" />
      </svg>

      {/* Words stack */}
      <div className="words-preloader__words">
        {WORDS.map((w, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            className="words-preloader__word"
            lang={w.lang}
            style={{ clipPath: "inset(110% 0% 0% 0%)" }}
          >
            {w.text}
          </span>
        ))}
      </div>

      {/* Bottom-left counter */}
      <div className="words-preloader__counter">
        <span ref={counterRef}>{String(count).padStart(2, "0")}</span>%
      </div>

      {/* Bottom-right label */}
      <div className="words-preloader__label">Portfolio</div>
    </div>
  );
}
