"use client"

import React, { useEffect, useRef } from "react"

interface MeteorsProps {
  number?: number
  angle?: number
}

export const Meteors = ({ number = 25, angle = 215 }: MeteorsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const parent = canvas.parentElement
    if (!parent) return

    let animId: number
    const angleRad = (-angle * Math.PI) / 180

    interface Meteor {
      x: number
      y: number
      length: number
      speed: number
      opacity: number
      size: number
    }

    let meteors: Meteor[] = []

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawnMeteor = (w: number, h: number): Meteor => ({
      x: Math.random() * w * 1.5,
      y: -20 - Math.random() * h * 0.3,
      length: 40 + Math.random() * 80,
      speed: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.7,
      size: 0.5 + Math.random() * 1.2,
    })

    resize()
    window.addEventListener("resize", resize)

    const rect = parent.getBoundingClientRect()
    meteors = Array.from({ length: number }, () =>
      spawnMeteor(rect.width, rect.height)
    )
    // Scatter initial positions so they don't all start from top
    meteors.forEach((m) => {
      m.y = Math.random() * rect.height
      m.x = Math.random() * rect.width
    })

    const draw = () => {
      const w = parent.getBoundingClientRect().width
      const h = parent.getBoundingClientRect().height
      ctx.clearRect(0, 0, w, h)

      const dx = Math.cos(angleRad)
      const dy = -Math.sin(angleRad)

      for (const m of meteors) {
        // Move
        m.x += dx * m.speed
        m.y += dy * m.speed

        // Reset if out of bounds
        if (m.y > h + 50 || m.x < -100 || m.x > w + 100) {
          Object.assign(m, spawnMeteor(w, h))
        }

        // Draw tail (gradient line)
        const tailX = m.x - dx * m.length
        const tailY = m.y - dy * m.length

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y)
        grad.addColorStop(0, `rgba(148, 163, 184, 0)`)
        grad.addColorStop(1, `rgba(148, 163, 184, ${m.opacity})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(m.x, m.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = m.size
        ctx.lineCap = "round"
        ctx.stroke()

        // Draw head (bright dot)
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.size + 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 210, 230, ${m.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [number, angle])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  )
}
