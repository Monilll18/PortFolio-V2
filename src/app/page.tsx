"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import {
  Hero,
  About,
  Projects,
  Experience,
  TechStack,
  Connect,
  FAQ,
  Footer,
} from "@/components/sections";
import { WordsPreloader } from "@/components/WordsPreloader";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Force scroll to top on reload to prevent browser from snapping to previously cached scroll positions or pinned GSAP sections
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main>
      {/* Words preloader — unmounts itself via display:none when complete */}
      <WordsPreloader onComplete={() => {
        setPreloaderDone(true);
        // Give the layout one frame to paint at opacity:1, then recalculate all scroll positions
        setTimeout(() => ScrollTrigger.refresh(), 150);
      }} />

      {/* Main content — always rendered underneath (avoids layout flicker) */}
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: preloaderDone ? "auto" : "none",
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Connect />
        <Footer />
      </div>
    </main>
  );
}
