"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import VariableProximity from "../VariableProximity";
import TrueFocus from "../TrueFocus";

// Face contour points (normalized 0-1, relative to image draw area)
// These define the silhouette of a head/face from front view
function getFaceContourX(t: number): number {
  // t = 0 (top of head) to 1 (neck/collar)
  // Returns half-width at that vertical position (symmetric)
  if (t < 0.05) return 0.15 + t * 4; // crown tip
  if (t < 0.15) return 0.35 + (t - 0.05) * 1.0; // top of head expands
  if (t < 0.35) return 0.45 + (t - 0.15) * 0.25; // forehead to temples
  if (t < 0.50) return 0.50 + (t - 0.35) * 0.07; // cheeks (widest)
  if (t < 0.65) return 0.51 - (t - 0.50) * 0.4; // jaw narrows
  if (t < 0.75) return 0.45 - (t - 0.65) * 1.2; // chin taper
  if (t < 0.82) return 0.33 - (t - 0.75) * 0.5; // chin to neck
  if (t < 0.90) return 0.29 + (t - 0.82) * 1.5; // neck widens to collar
  return 0.41 + (t - 0.90) * 2.0; // collar/shoulders expand
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealedImgRef = useRef<HTMLImageElement | null>(null);
  const coveredImgRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animFrameRef = useRef<number>(0);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleWrapRef = useRef<HTMLDivElement>(null);
  
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailRef = useRef<{x: number, y: number, age: number}[]>([]);
  const lastTimeRef = useRef<number>(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef({ drawX: 0, drawY: 0, drawW: 0, drawH: 0 });

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const covered = coveredImgRef.current;
    const revealed = revealedImgRef.current;
    if (!covered || !revealed || !covered.complete || !revealed.complete) {
      animFrameRef.current = requestAnimationFrame(renderCanvas);
      return;
    }

    const w = canvas.width;
    const h = canvas.height;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, w, h);

    const now = performance.now();
    if (lastTimeRef.current === 0) lastTimeRef.current = now;
    const dt = now - lastTimeRef.current;
    lastTimeRef.current = now;

    // Update liquid trail
    trailRef.current.forEach(p => p.age += dt);
    const MAX_AGE = 4500; // ms to fade out
    trailRef.current = trailRef.current.filter(p => p.age < MAX_AGE);

    if (mouseRef.current.active) {
      const lastPoint = trailRef.current[0];
      const dist = lastPoint ? Math.hypot(lastPoint.x - mouseRef.current.x, lastPoint.y - mouseRef.current.y) : 100;
      if (dist > 5) {
         trailRef.current.unshift({ x: mouseRef.current.x, y: mouseRef.current.y, age: 0 });
      } else if (lastPoint) {
         lastPoint.age = 0; // Keep fresh while hovering still
      } else {
         trailRef.current.unshift({ x: mouseRef.current.x, y: mouseRef.current.y, age: 0 });
      }
    }

    // ── Image sizing: Match first screenshot ──
    const imgAspect = covered.naturalWidth / covered.naturalHeight;
    const canvasAspect = w / h;
    const isMobileView = w / (window.devicePixelRatio || 1) < 768;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    drawH = h * (isMobileView ? 0.65 : 0.8);
    drawW = drawH * imgAspect;
    if (drawW > w * (isMobileView ? 0.95 : 0.8)) {
      drawW = w * (isMobileView ? 0.95 : 0.8);
      drawH = drawW / imgAspect;
    }
    drawX = (w - drawW) / 2;
    drawY = h - drawH; // Anchor to bottom

    layoutRef.current = { drawX, drawY, drawW, drawH };

    // ── Draw images with Liquid Ribbon Mask ──
    if (trailRef.current.length > 0) {
       if (!maskCanvasRef.current) {
          maskCanvasRef.current = document.createElement('canvas');
       }
       const mCanvas = maskCanvasRef.current;
       if (mCanvas.width !== w || mCanvas.height !== h) {
          mCanvas.width = w;
          mCanvas.height = h;
       }
       const mCtx = mCanvas.getContext('2d');
       if (mCtx) {
          mCtx.clearRect(0, 0, w, h);
          mCtx.lineCap = 'round';
          mCtx.lineJoin = 'round';
          
          const maxThickness = 160 * dpr;
          
          if (trailRef.current.length === 1) {
             const p1 = trailRef.current[0];
             const progress = p1.age / MAX_AGE;
             const thickness = maxThickness * Math.max(0, 1 - Math.pow(progress, 1.5));
             mCtx.beginPath();
             mCtx.arc(p1.x * dpr, p1.y * dpr, thickness / 2, 0, Math.PI * 2);
             mCtx.fillStyle = 'white';
             mCtx.fill();
          } else {
             for (let i = 0; i < trailRef.current.length - 1; i++) {
               const p1 = trailRef.current[i];
               const p2 = trailRef.current[i+1];
               const progress = p1.age / MAX_AGE;
               // Ribbon gets thinner as it ages
               const thickness = maxThickness * Math.max(0, 1 - Math.pow(progress, 1.5));
               
               mCtx.beginPath();
               mCtx.moveTo(p1.x * dpr, p1.y * dpr);
               mCtx.lineTo(p2.x * dpr, p2.y * dpr);
               mCtx.lineWidth = thickness;
               mCtx.strokeStyle = 'white';
               
               mCtx.shadowColor = 'black';
               mCtx.shadowBlur = 12 * dpr;
               
               mCtx.stroke();
             }
          }

          // Draw revealed image strictly inside the ribbon
          mCtx.globalCompositeOperation = 'source-in';
          mCtx.drawImage(revealed, drawX, drawY, drawW, drawH);
          mCtx.globalCompositeOperation = 'source-over'; 
          mCtx.shadowColor = 'transparent';
          mCtx.shadowBlur = 0;
       }

       ctx.drawImage(covered, drawX, drawY, drawW, drawH);
       ctx.drawImage(mCanvas, 0, 0);
    } else {
       ctx.drawImage(covered, drawX, drawY, drawW, drawH);
    }

    // ── Fade Edges to Background (hides hard borders and logo) ──
    const fadeThickness = 120 * dpr;

    // Bottom fade
    const fadeBottom = ctx.createLinearGradient(0, drawY + drawH - fadeThickness, 0, drawY + drawH);
    fadeBottom.addColorStop(0, 'rgba(10,10,10,0)');
    fadeBottom.addColorStop(1, 'rgba(10,10,10,1)');
    ctx.fillStyle = fadeBottom;
    ctx.fillRect(drawX - 10, drawY + drawH - fadeThickness, drawW + 20, fadeThickness + 2);

    // Top fade
    const fadeTop = ctx.createLinearGradient(0, drawY, 0, drawY + fadeThickness * 0.8);
    fadeTop.addColorStop(0, 'rgba(10,10,10,1)');
    fadeTop.addColorStop(1, 'rgba(10,10,10,0)');
    ctx.fillStyle = fadeTop;
    ctx.fillRect(drawX - 10, drawY - 2, drawW + 20, fadeThickness * 0.8 + 2);

    // Left fade
    const fadeLeft = ctx.createLinearGradient(drawX, 0, drawX + fadeThickness, 0);
    fadeLeft.addColorStop(0, 'rgba(10,10,10,1)');
    fadeLeft.addColorStop(1, 'rgba(10,10,10,0)');
    ctx.fillStyle = fadeLeft;
    ctx.fillRect(drawX - 2, drawY - 10, fadeThickness + 2, drawH + 20);

    // Right fade
    const fadeRight = ctx.createLinearGradient(drawX + drawW - fadeThickness, 0, drawX + drawW, 0);
    fadeRight.addColorStop(0, 'rgba(10,10,10,0)');
    fadeRight.addColorStop(1, 'rgba(10,10,10,1)');
    ctx.fillStyle = fadeRight;
    ctx.fillRect(drawX + drawW - fadeThickness, drawY - 10, fadeThickness + 2, drawH + 20);

    // ── 3D Face Contour Wireframe Grid ──
    const gridCycleMs = 4000;
    const phase = (now % gridCycleMs) / gridCycleMs;

    // Grid active during 40% of cycle
    if (phase < 0.4) {
      const sweepProgress = phase / 0.4;

      // Face region within the drawn image (relative to drawX/drawY/drawW/drawH)
      // Restricted to cover from head down to neck
      const faceLeft = drawX + drawW * 0.25;
      const faceRight = drawX + drawW * 0.75;
      const faceTop = drawY + drawH * 0.05;
      const faceBottom = drawY + drawH * 0.85;
      const faceCenterX = (faceLeft + faceRight) / 2;
      const faceW = faceRight - faceLeft;
      const faceH = faceBottom - faceTop;

      // Sweep band
      const bandHeight = faceH * 0.3;
      const sweepCenter = faceTop + faceH * sweepProgress;
      const bandTop = sweepCenter - bandHeight / 2;
      const bandBottom = sweepCenter + bandHeight / 2;

      const clampedTop = Math.max(faceTop, bandTop);
      const clampedBottom = Math.min(faceBottom, bandBottom);

      if (clampedBottom > clampedTop) {
        // Opacity peaks mid-sweep, fades at edges
        const globalOpacity = Math.sin(sweepProgress * Math.PI) * 1.0;

        ctx.save();
        ctx.globalAlpha = globalOpacity;

        const ROWS = 16;
        const COLS = 12;

        // Draw horizontal curved lines (follow face contour)
        for (let r = 0; r <= ROWS; r++) {
          const t = r / ROWS; // 0..1 vertical
          const y = faceTop + t * faceH;

          if (y < clampedTop || y > clampedBottom) continue;

          // Fade near band edges
          const distFromCenter = Math.abs(y - sweepCenter) / (bandHeight / 2);
          const lineAlpha = 1.0 - distFromCenter * distFromCenter;
          if (lineAlpha <= 0) continue;

          const halfW = getFaceContourX(t) * faceW;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha * 0.9})`;
          ctx.lineWidth = 1.5 * dpr;

          // Draw curved horizontal line following face shape
          const segments = 20;
          for (let s = 0; s <= segments; s++) {
            const u = s / segments; // 0..1 across
            const xNorm = u * 2 - 1; // -1..1

            // 3D curvature: face is a rounded surface
            const curvature = Math.sqrt(Math.max(0, 1 - xNorm * xNorm * 0.6));
            const px = faceCenterX + xNorm * halfW;
            // Slight vertical curve to simulate 3D wrap
            const depthOffset = (1 - curvature) * 8 * dpr;
            const py = y + depthOffset;

            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }

        // Draw vertical curved lines (meridian lines)
        for (let c = 0; c <= COLS; c++) {
          const u = c / COLS; // 0..1
          const xNorm = u * 2 - 1; // -1..1

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`;
          ctx.lineWidth = 1.5 * dpr;

          let started = false;
          for (let r = 0; r <= ROWS; r++) {
            const t = r / ROWS;
            const y = faceTop + t * faceH;

            if (y < clampedTop || y > clampedBottom) continue;

            const distFromCenter = Math.abs(y - sweepCenter) / (bandHeight / 2);
            const lineAlpha = 1.0 - distFromCenter * distFromCenter;
            if (lineAlpha <= 0) continue;

            const halfW = getFaceContourX(t) * faceW;

            // Check if this column falls within face width at this row
            const xPos = xNorm * halfW;
            if (Math.abs(xPos) > halfW) continue;

            const curvature = Math.sqrt(Math.max(0, 1 - xNorm * xNorm * 0.6));
            const px = faceCenterX + xPos;
            const depthOffset = (1 - curvature) * 8 * dpr;
            const py = y + depthOffset;

            if (!started) {
              ctx.moveTo(px, py);
              started = true;
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.stroke();
        }

        // Draw intersection dots for extra 3D mesh feel
        for (let r = 0; r <= ROWS; r++) {
          const t = r / ROWS;
          const y = faceTop + t * faceH;

          if (y < clampedTop || y > clampedBottom) continue;

          const distFromCenter = Math.abs(y - sweepCenter) / (bandHeight / 2);
          const dotAlpha = 1.0 - distFromCenter * distFromCenter;
          if (dotAlpha <= 0.2) continue;

          const halfW = getFaceContourX(t) * faceW;

          for (let c = 0; c <= COLS; c++) {
            const cU = c / COLS;
            const cXNorm = cU * 2 - 1;
            const xPos = cXNorm * halfW;
            if (Math.abs(xPos) > halfW) continue;

            const curvature = Math.sqrt(Math.max(0, 1 - cXNorm * cXNorm * 0.6));
            const px = faceCenterX + xPos;
            const depthOffset = (1 - curvature) * 8 * dpr;
            const py = y + depthOffset;

            ctx.beginPath();
            ctx.arc(px, py, 1.2 * dpr, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha * 0.5})`;
            ctx.fill();
          }
        }

        ctx.restore();
      }
    }

    animFrameRef.current = requestAnimationFrame(renderCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    // Load images
    const coveredImg = new Image();
    coveredImg.src = "/images/covered.png";
    coveredImgRef.current = coveredImg;

    const revealedImg = new Image();
    revealedImg.src = "/images/revealed.png";
    revealedImgRef.current = revealedImg;

    let imagesLoaded = 0;
    const onLoad = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) {
        resize();
        renderCanvas();
      }
    };
    coveredImg.onload = onLoad;
    revealedImg.onload = onLoad;

    // Mouse events
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      mouseRef.current.x = mouseX;
      mouseRef.current.y = mouseY;
      mouseRef.current.active = true;

      // Check if over face to hide tooltip
      // drawX/drawY/drawW/drawH are in canvas-pixel space (CSS * DPR), convert to CSS space
      const { drawX, drawY, drawW, drawH } = layoutRef.current;
      const dpr = window.devicePixelRatio || 1;
      const cssDrawX = drawX / dpr;
      const cssDrawY = drawY / dpr;
      const cssDrawW = drawW / dpr;
      const cssDrawH = drawH / dpr;

      let isOverFace = false;
      if (cssDrawW > 0 && cssDrawH > 0) {
        const relX = (mouseX - cssDrawX) / cssDrawW;
        const relY = (mouseY - cssDrawY) / cssDrawH;
        // Only detect face in the head/neck region (t < 0.78), ignore shoulders/collar
        if (relY >= 0 && relY < 0.78 && relX >= 0 && relX <= 1) {
          const halfWidth = Math.min(getFaceContourX(relY), 0.45);
          if (Math.abs(relX - 0.5) < halfWidth) {
            isOverFace = true;
          }
        }
      }

      // Move cursor label
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
        cursorRef.current.style.opacity = isOverFace ? '0' : '1';
      }
    };

    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    // Timeline for other elements if needed
    const tl = gsap.timeline({ delay: 1.3 });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
      tl.kill();
    };
  }, [renderCanvas]);

  return (
    <section id="hero" ref={sectionRef} className="hero-reveal">
      {/* "Hover to reveal" floating cursor label — corner bracket style */}
      <div
        ref={cursorRef}
        style={{
          position:      'fixed',
          pointerEvents: 'none',
          zIndex:        9999,
          opacity:       0,
          transform:     'translate(-50%, -50%)',
          transition:    'opacity 0.2s ease',
          background:    'rgba(15, 15, 15, 0.85)',
          padding:       '14px 28px',
          color:         '#fff',
          fontFamily:    '"Fira Code", monospace',
          fontSize:      '16px',
          fontWeight:    500,
          letterSpacing: '0.05em',
          whiteSpace:    'nowrap',
          boxShadow:     '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Corners */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderTop: '3px solid #fff', borderLeft: '3px solid #fff' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', borderTop: '3px solid #fff', borderRight: '3px solid #fff' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', borderBottom: '3px solid #fff', borderLeft: '3px solid #fff' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderBottom: '3px solid #fff', borderRight: '3px solid #fff' }} />
        Hover to reveal
      </div>

      {/* Canvas */}
      <div className="hero-reveal-canvas-wrapper">
        <canvas ref={canvasRef} className="hero-reveal-canvas" />
      </div>

      {/* Text overlay — sits on top of canvas */}
      <div className="hero-reveal-text absolute inset-0 z-10 flex flex-col items-center justify-start pt-32 px-6 text-center pointer-events-none">
        <div ref={nameRef} className="hero-reveal-name-wrap pointer-events-auto">
          <VariableProximity
            label="Hi, I'm Monil Jain"
            className="hero-proximity-name text-5xl md:text-8xl font-clash font-bold tracking-tight mb-4 text-white drop-shadow-xl"
            fromFontVariationSettings="'wght' 300"
            toFontVariationSettings="'wght' 800"
            containerRef={nameRef}
            radius={200}
            falloff="gaussian"
          />
        </div>
        <div ref={subtitleWrapRef} className="hero-reveal-subtitle-wrap mt-2 pointer-events-auto">
          <TrueFocus
            sentence="AI ENGINEER"
            manualMode={false}
            blurAmount={4}
            borderColor="#60A5FA"
            glowColor="rgba(96, 165, 250, 0.7)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.2}
            className="hero-true-focus"
          />
        </div>
      </div>
    </section>
  );
}
