"use client";
import React, { useEffect, useRef, useState } from "react";
import { MotionValue, motion, useScroll, useTransform } from "motion/react";

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
  children,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, isMobile ? 1 : 1.5]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, isMobile ? 1 : 1.5]);
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, 800]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 1]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        minHeight: "200vh",
        flexShrink: 0,
        transform: isMobile ? "scale(0.35)" : "scale(1)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: isMobile ? 0 : "20rem",
        paddingBottom: isMobile ? 0 : "5rem",
        perspective: "800px",
      }}
    >
      <motion.h2
        style={{
          translateY: textTransform,
          marginBottom: "5rem",
          textAlign: "center",
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 800,
          color: "#ffffff",
          textShadow: "0 0 30px rgba(255,255,255,0.35), 0 0 60px rgba(255,255,255,0.15)",
          letterSpacing: "-0.02em",
          lineHeight: 1.4,
        }}
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>

      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      >
        {children}
      </Lid>

      {/* Base area */}
      <div
        style={{
          position: "relative",
          zIndex: -1,
          height: "22rem",
          width: "32rem",
          overflow: "hidden",
          borderRadius: "1rem",
          backgroundColor: "#272729",
        }}
      >
        {/* above keyboard bar */}
        <div style={{ position: "relative", height: "2.5rem", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              height: "1rem",
              width: "80%",
              backgroundColor: "#050505",
            }}
          />
        </div>
        <div style={{ position: "relative", display: "flex" }}>
          <div style={{ margin: "0 auto", height: "100%", width: "10%", overflow: "hidden" }}>
            <SpeakerGrid />
          </div>
          <div style={{ margin: "0 auto", height: "100%", width: "80%" }}>
            <Keypad />
          </div>
          <div style={{ margin: "0 auto", height: "100%", width: "10%", overflow: "hidden" }}>
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            margin: "0 auto",
            height: "0.5rem",
            width: "5rem",
            borderTopLeftRadius: "1.5rem",
            borderTopRightRadius: "1.5rem",
            background: "linear-gradient(to top, #272729, #050505)",
          }}
        />
        {showGradient && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              height: "10rem",
              width: "100%",
              background: "linear-gradient(to top, #000000, #000000 50%, transparent)",
            }}
          />
        )}
        {badge && (
          <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
  children,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div style={{ position: "relative", perspective: "800px" }}>
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
          position: "relative",
          height: "12rem",
          width: "32rem",
          borderRadius: "1rem",
          backgroundColor: "#010101",
          padding: "0.5rem",
        }}
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px #171717 inset",
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.5rem",
            backgroundColor: "#010101",
          }}
        >

        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
          position: "absolute",
          inset: 0,
          height: "24rem",
          width: "32rem",
          borderRadius: "1rem",
          backgroundColor: "#010101",
          padding: "0.5rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "0.5rem",
            backgroundColor: "#272729",
            overflow: "hidden",
          }}
        >
          {src && !children && (
            <img
              src={src}
              alt="macbook screen"
              style={{
                position: "absolute",
                inset: 0,
                height: "100%",
                width: "100%",
                borderRadius: "0.5rem",
                objectFit: "cover",
                objectPosition: "left top",
              }}
            />
          )}
          {children}
        </div>
      </motion.div>
    </div>
  );
};

/* ── Trackpad ── */
export const Trackpad = () => {
  return (
    <div
      style={{
        margin: "0.25rem auto",
        height: "8rem",
        width: "40%",
        borderRadius: "0.75rem",
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    />
  );
};

/* ── Keypad ── */
export const Keypad = () => {
  return (
    <div
      style={{
        margin: "0 0.25rem",
        height: "100%",
        transform: "translateZ(0)",
        borderRadius: "0.375rem",
        backgroundColor: "#050505",
        padding: "0.25rem",
        willChange: "transform",
      }}
    >
      {/* Row 1: Function keys */}
      <Row>
        <KBtn w="2.5rem" align="start">esc</KBtn>
        <KBtn>F1</KBtn><KBtn>F2</KBtn><KBtn>F3</KBtn><KBtn>F4</KBtn>
        <KBtn>F5</KBtn><KBtn>F6</KBtn><KBtn>F7</KBtn><KBtn>F8</KBtn>
        <KBtn>F9</KBtn><KBtn>F10</KBtn><KBtn>F11</KBtn><KBtn>F12</KBtn>
        <KBtn>
          <div style={{
            width: "1rem", height: "1rem", borderRadius: "50%",
            background: "linear-gradient(to bottom, #171717 20%, #000 50%, #171717 95%)",
            padding: "1px",
          }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#000" }} />
          </div>
        </KBtn>
      </Row>
      {/* Row 2: Numbers */}
      <Row>
        <KBtn>~</KBtn><KBtn>1</KBtn><KBtn>2</KBtn><KBtn>3</KBtn><KBtn>4</KBtn>
        <KBtn>5</KBtn><KBtn>6</KBtn><KBtn>7</KBtn><KBtn>8</KBtn><KBtn>9</KBtn>
        <KBtn>0</KBtn><KBtn>-</KBtn><KBtn>=</KBtn>
        <KBtn w="2.5rem" align="end">del</KBtn>
      </Row>
      {/* Row 3: QWERTY */}
      <Row>
        <KBtn w="2.5rem" align="start">tab</KBtn>
        <KBtn>Q</KBtn><KBtn>W</KBtn><KBtn>E</KBtn><KBtn>R</KBtn><KBtn>T</KBtn>
        <KBtn>Y</KBtn><KBtn>U</KBtn><KBtn>I</KBtn><KBtn>O</KBtn><KBtn>P</KBtn>
        <KBtn>[</KBtn><KBtn>]</KBtn><KBtn>\</KBtn>
      </Row>
      {/* Row 4: ASDF */}
      <Row>
        <KBtn w="2.8rem" align="start">caps</KBtn>
        <KBtn>A</KBtn><KBtn>S</KBtn><KBtn>D</KBtn><KBtn>F</KBtn><KBtn>G</KBtn>
        <KBtn>H</KBtn><KBtn>J</KBtn><KBtn>K</KBtn><KBtn>L</KBtn>
        <KBtn>;</KBtn><KBtn>&apos;</KBtn>
        <KBtn w="2.85rem" align="end">ret</KBtn>
      </Row>
      {/* Row 5: ZXCV */}
      <Row>
        <KBtn w="3.65rem" align="start">shift</KBtn>
        <KBtn>Z</KBtn><KBtn>X</KBtn><KBtn>C</KBtn><KBtn>V</KBtn><KBtn>B</KBtn>
        <KBtn>N</KBtn><KBtn>M</KBtn><KBtn>,</KBtn><KBtn>.</KBtn><KBtn>/</KBtn>
        <KBtn w="3.65rem" align="end">shift</KBtn>
      </Row>
      {/* Row 6: Bottom */}
      <Row>
        <KBtn>fn</KBtn><KBtn>ctrl</KBtn><KBtn>opt</KBtn>
        <KBtn w="2rem">⌘</KBtn>
        <KBtn w="8.2rem">{""}</KBtn>
        <KBtn w="2rem">⌘</KBtn>
        <KBtn>opt</KBtn>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", marginTop: "2px", width: "4.9rem" }}>
          <KBtn h="0.75rem" w="1.5rem">▲</KBtn>
          <div style={{ display: "flex" }}>
            <KBtn h="0.75rem" w="1.5rem">◀</KBtn>
            <KBtn h="0.75rem" w="1.5rem">▼</KBtn>
            <KBtn h="0.75rem" w="1.5rem">▶</KBtn>
          </div>
        </div>
      </Row>
    </div>
  );
};

/* ── Row helper ── */
const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", width: "100%", flexShrink: 0, gap: "2px", marginBottom: "2px" }}>
    {children}
  </div>
);

/* ── Single Key Button ── */
export const KBtn = ({
  children,
  w,
  h,
  align,
}: {
  children?: React.ReactNode;
  w?: string;
  h?: string;
  align?: "start" | "end";
}) => {
  return (
    <div
      style={{
        transform: "translateZ(0)",
        borderRadius: "4px",
        padding: "0.5px",
        willChange: "transform",
        backgroundColor: "rgba(255,255,255,0.2)",
        boxShadow: "0 1px 2px rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          height: h || "1.5rem",
          width: w || "1.5rem",
          alignItems: "center",
          justifyContent: align === "start" ? "flex-start" : align === "end" ? "flex-end" : "center",
          borderRadius: "3.5px",
          backgroundColor: "#0A090D",
          boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
          padding: "0 4px",
        }}
      >
        <span style={{ fontSize: "5px", color: "#ffffff", textAlign: "center", width: "100%", lineHeight: 1.3 }}>
          {children}
        </span>
      </div>
    </div>
  );
};

/* ── Speaker Grid ── */
export const SpeakerGrid = () => {
  return (
    <div
      style={{
        marginTop: "0.5rem",
        display: "flex",
        height: "10rem",
        gap: "2px",
        padding: "0 0.5px",
        backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
};

/* ── Apple-style Logo ── */

