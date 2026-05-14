"use client";

import React from "react";
import { motion } from "framer-motion";

interface SlideUpButtonProps {
  title?: string;
  href?: string;
  variant?: "dark" | "light";
}

export function SlideUpButton({ 
  title = "Say Hello", 
  href = "#", 
  variant = "dark" 
}: SlideUpButtonProps) {
  const isDark = variant === "dark";
  
  return (
    <div style={{ display: "inline-flex", justifyContent: "center" }}>
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: "inline-block" }}
      >
        <motion.div
          initial="initial"
          whileHover="hover"
          animate="initial"
          style={{
            display: "flex",
            flexDirection: "column",
            height: 44,
            minWidth: 140,
            overflow: "hidden",
            borderRadius: 999,
            background: isDark ? "#000000" : "#ffffff",
            border: `1px solid ${isDark ? "#000000" : "#e5e5e5"}`,
            cursor: "pointer",
            position: "relative",
          }}
        >
          {/* Top Content: Text */}
          <motion.div
            variants={{
              initial: { y: 0, scale: 1 },
              hover: { y: -44, scale: 0.8 }
            }}
            transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
            style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 24px",
              whiteSpace: "nowrap",
              flexShrink: 0
            }}
          >
            <span style={{ 
              color: isDark ? "#ffffff" : "#000000",
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "-0.01em"
            }}>
              {title}
            </span>
          </motion.div>
          
          {/* Bottom Content: Inset pill reveal */}
          <motion.div
            variants={{
              initial: { y: 0, scale: 0.8 },
              hover: { y: -44, scale: 1 }
            }}
            transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
            style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexShrink: 0,
              padding: "4px", // This creates the thickness of the visual border
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              borderRadius: 999,
              backgroundColor: isDark ? "#ffffff" : "#000000", // Opposite of container
            }}>
              <motion.svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={isDark ? "#000000" : "#ffffff"} // Match the text color of the button inverse
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </motion.svg>
            </div>
          </motion.div>
        </motion.div>
      </a>
    </div>
  );
}
