"use client";

import React from "react";
import { DinoGame } from "@/components/ui/dino-game";

export function Footer() {
  return (
    <footer style={{
      position: "relative",
      overflow: "hidden",
      background: "#1a1a2e",
      height: "260px",
    }}>
      {/* Dino game fills entire footer as background */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}>
        <DinoGame />
      </div>

      {/* Footer text at bottom-left, below the dino ground line so no overlap */}
      <div style={{
        position: "absolute",
        bottom: "12px",
        left: "40px",
        zIndex: 2,
        pointerEvents: "none",
      }}>
        <p style={{
          margin: "0 0 4px 0",
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: "0.95rem",
          fontWeight: 500,
          lineHeight: 1.5,
        }}>
          Built with ☕, curiosity, and a lot of commits.
        </p>
        <p style={{
          margin: 0,
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.85rem",
        }}>
          © 2026 Monil Jain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
