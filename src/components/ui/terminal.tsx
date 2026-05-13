"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface TerminalProps {
  commands: string[];
  outputs?: Record<number, string[]>;
  typingSpeed?: number;
  delayBetweenCommands?: number;
}

export function Terminal({
  commands,
  outputs = {},
  typingSpeed = 50,
  delayBetweenCommands = 1000,
}: TerminalProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentCommandIndex >= commands.length) {
      return;
    }

    const currentCommand = commands[currentCommandIndex];

    if (isTyping) {
      if (displayedText.length < currentCommand.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentCommand.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          setShowOutput(true);
          setTimeout(() => {
            setCurrentCommandIndex((prev) => prev + 1);
            setDisplayedText("");
            setShowOutput(false);
            setIsTyping(true);
          }, delayBetweenCommands);
        }, 300); // Small pause before showing output
      }
    }

    return () => clearTimeout(timeoutId);
  }, [
    currentCommandIndex,
    displayedText,
    isTyping,
    commands,
    typingSpeed,
    delayBetweenCommands,
  ]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "monospace",
        fontSize: "0.875rem",
        padding: "1rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f56" }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {commands.slice(0, currentCommandIndex).map((cmd, idx) => (
          <div key={idx}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4ade80" }}>
              <span>$</span>
              <span style={{ color: "#e2e8f0" }}>{cmd}</span>
            </div>
            {outputs[idx] && (
              <div style={{ color: "#94a3b8", marginTop: "0.25rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {outputs[idx].map((out, oidx) => (
                  <span key={oidx}>{out}</span>
                ))}
              </div>
            )}
          </div>
        ))}

        {currentCommandIndex < commands.length && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4ade80" }}>
              <span>$</span>
              <span style={{ color: "#e2e8f0" }}>
                {displayedText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "1em",
                      backgroundColor: "#e2e8f0",
                      marginLeft: "4px",
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </span>
            </div>
            {showOutput && outputs[currentCommandIndex] && (
              <div style={{ color: "#94a3b8", marginTop: "0.25rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {outputs[currentCommandIndex].map((out, oidx) => (
                  <span key={oidx}>{out}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
