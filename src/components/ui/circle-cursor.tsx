"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"

interface CircleCursorProps {
  dotSize?: number
  dotColor?: string
  ringSize?: number
  ringColor?: string
  ringBorderWidth?: number
  hoverScale?: number
  clickScale?: number
  animationDuration?: number
  blendMode?: string
  opacity?: number
}

export function CircleCursor({
  dotSize = 6,
  dotColor = "#ffffff",
  ringSize = 32,
  ringColor = "#ffffff",
  ringBorderWidth = 1,
  hoverScale = 1.5,
  clickScale = 0.75,
  animationDuration = 200,
  blendMode = "difference",
  opacity = 1,
}: CircleCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [linkHovered, setLinkHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const isInBounds = useCallback((e: MouseEvent) => {
    const container = containerRef.current?.parentElement
    if (!container) return false
    const rect = container.getBoundingClientRect()
    return (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    )
  }, [])

  useEffect(() => {
    // Only desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) return

    const onMouseMove = (e: MouseEvent) => {
      if (isInBounds(e)) {
        setPosition({ x: e.clientX, y: e.clientY })
        setHidden(false)
      } else {
        setHidden(true)
      }
    }

    const onMouseLeave = () => setHidden(true)
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    document.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    // Link hover detection
    const updateLinkHover = () => {
      const container = containerRef.current?.parentElement
      if (!container) return
      container
        .querySelectorAll("a, button, [role='button']")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setLinkHovered(true))
          el.addEventListener("mouseleave", () => setLinkHovered(false))
        })
    }
    updateLinkHover()
    const observer = new MutationObserver(updateLinkHover)
    const container = containerRef.current?.parentElement
    if (container) {
      observer.observe(container, { childList: true, subtree: true })
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      observer.disconnect()
    }
  }, [isInBounds])

  const currentScale = linkHovered ? hoverScale : clicked ? clickScale : 1
  const transitionSpeed = `${animationDuration}ms`

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50 }}>
      {/* Dot */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
          borderRadius: "50%",
          transform: `translate(${position.x - dotSize / 2}px, ${position.y - dotSize / 2}px)`,
          pointerEvents: "none",
          zIndex: 10001,
          mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
          opacity: hidden ? 0 : opacity,
          transition: `opacity ${transitionSpeed} ease`,
        }}
      />
      {/* Ring */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `${ringBorderWidth}px solid ${ringColor}`,
          borderRadius: "50%",
          transform: `translate(${position.x - ringSize / 2}px, ${position.y - ringSize / 2}px) scale(${currentScale})`,
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
          opacity: hidden ? 0 : opacity,
          transition: `all ${transitionSpeed} ease`,
          backgroundColor: "transparent",
        }}
      />
    </div>
  )
}
