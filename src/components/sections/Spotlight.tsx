"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

/* ── Scatter items: 1 feature card (idx 0) + 7 image tiles ── */
const SCATTER_COLORS = [
  "#242424", // feature card — handled separately
  "#2D1B4E", // deep purple
  "#1B3A4B", // ocean teal
  "#3B1F2B", // burgundy
  "#1A2F1A", // forest
  "#3B2F1A", // warm umber
  "#1A1A3B", // midnight
  "#2B2B2B", // charcoal
];

const SCATTER_IMAGES = [
  null, // idx 0 = feature card
  "/images/projects/procureai.png",
  "/images/projects/stackforge.png",
  "/images/projects/leetiq.png",
  "/images/projects/dentidoco.png",
  "/images/projects/sis-redesign-after.png",
  "/images/projects/sis-redesign-before.png",
  "/images/monil.png",
];

/* ── Radial scatter directions (top-first clockwise, 45° apart) ── */
const SCATTER_DIRS = Array.from({ length: 8 }, (_, i) => {
  const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
  return { x: Math.cos(angle), y: Math.sin(angle) };
});

/* ── Config ── */
const CFG = {
  scatterDist: 280,
  startSize: 300,
  endSize: 160,
  rotAngle: 360,
  radius: 60,
  scrollStart: 0.15,
  scrollEnd: 0.7,
};

export function Spotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* Hero text fades in after 60% scatter progress */
  const heroOpacity = useTransform(
    scrollYProgress,
    [CFG.scrollStart + (CFG.scrollEnd - CFG.scrollStart) * 0.55, CFG.scrollEnd],
    [0, 1]
  );
  const heroY = useTransform(
    scrollYProgress,
    [CFG.scrollStart + (CFG.scrollEnd - CFG.scrollStart) * 0.55, CFG.scrollEnd],
    [30, 0]
  );

  return (
    <section id="spotlight" className="scatter-section">
      <div ref={containerRef} className="scatter-scroll-area">
        <div className="scatter-sticky">
          {/* ── HERO TEXT (revealed underneath) ── */}
          <motion.div className="scatter-hero" style={{ opacity: heroOpacity, y: heroY }}>
            <h2 className="scatter-hero-headline">
              Impact beyond<br />the code.
            </h2>
            <p className="scatter-hero-sub">
              Talks, writing, open source, and community.
            </p>
            <a href="#connect" className="scatter-hero-cta">
              Let&apos;s Connect
            </a>
          </motion.div>

          {/* ── SCATTER ITEMS ── */}
          {SCATTER_DIRS.map((dir, idx) => (
            <ScatterItem
              key={idx}
              index={idx}
              dir={dir}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Individual scatter item ── */
function ScatterItem({
  index,
  dir,
  scrollYProgress,
}: {
  index: number;
  dir: { x: number; y: number };
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const totalItems = 8;
  const stagger = index * 0.012;
  const adjStart = Math.min(CFG.scrollStart + stagger, CFG.scrollEnd - 0.1);
  const adjEnd = Math.min(CFG.scrollEnd + stagger, 1);

  /* Front card (idx 0) scatters less */
  const dist = index === 0 ? CFG.scatterDist * 0.35 : CFG.scatterDist;

  const x = useTransform(scrollYProgress, [adjStart, adjEnd], [0, dir.x * dist]);
  const y = useTransform(scrollYProgress, [adjStart, adjEnd], [0, dir.y * dist]);
  const scale = useTransform(
    scrollYProgress,
    [adjStart, adjEnd],
    [1, CFG.endSize / CFG.startSize]
  );
  const rotate = useTransform(
    scrollYProgress,
    [adjStart, adjEnd],
    [0, ((CFG.rotAngle / totalItems) * index * (index % 2 === 0 ? 1 : -1))]
  );

  const isFeatureCard = index === 0;

  return (
    <motion.div
      className="scatter-item"
      style={{
        x,
        y,
        scale,
        rotate,
        width: CFG.startSize,
        height: CFG.startSize,
        borderRadius: CFG.radius,
        zIndex: totalItems - index,
        background: SCATTER_COLORS[index],
      }}
    >
      {isFeatureCard ? (
        <FeatureCard />
      ) : (
        SCATTER_IMAGES[index] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={SCATTER_IMAGES[index]!}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: CFG.radius,
            }}
          />
        )
      )}
    </motion.div>
  );
}

/* ── The dark feature card (item 0) ── */
function FeatureCard() {
  return (
    <div className="scatter-feature">
      <div className="scatter-feature-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      <h3 className="scatter-feature-title">Full-Stack AI Engineer</h3>
      <p className="scatter-feature-body">
        Building production ML systems, intelligent UIs, and developer tools — from prototype to scale.
      </p>
      <div className="scatter-feature-tags">
        <span className="scatter-tag">AI/ML</span>
        <span className="scatter-tag">React</span>
        <span className="scatter-tag">Node.js</span>
      </div>
    </div>
  );
}
