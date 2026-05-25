"use client"

import { useEffect, useRef } from "react"

export default function Matrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const W = canvas.width
    const H = canvas.height
    const fontSize = 12
    const cols = Math.floor(W / fontSize)
    const drops = Array(cols).fill(1)
    const chars = "01アイウエオカキクケコ{}[]<>/\\|=+-*&%$#@!?"

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)"
      ctx.fillRect(0, 0, W, H)
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        if (Math.random() > 0.95) {
          ctx.fillStyle = "#ffffff"
        } else {
          ctx.fillStyle = `rgba(0,255,65,${Math.random() * 0.4 + 0.1})`
        }

        ctx.fillText(char, x, y)

        if (y > H && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      background: "#000",
      overflow: "hidden",
    }}>
      <canvas
        ref={canvasRef}
        width={400}
        height={600}
        style={{ width: "100%", height: "100%", opacity: 0.6 }}
      />
      <div style={{
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        fontFamily: "monospace",
        fontSize: 11,
        color: "rgba(0,255,65,0.6)",
        lineHeight: 1.8,
        pointerEvents: "none",
      }}>
        <p style={{ color: "#00ff41", marginBottom: 8 }}>// sistema activo</p>
        <p>usuario: javier_cortes</p>
        <p>rol: full_stack_dev</p>
        <p>estado: disponible</p>
        <br />
        <p style={{ color: "rgba(0,255,65,0.4)" }}>$ ping javier.dev</p>
        <p style={{ color: "rgba(0,255,65,0.3)" }}>... conectando</p>
        <br />
        <p style={{ color: "rgba(0,255,65,0.4)" }}>$ ls skills/</p>
        <p style={{ color: "rgba(0,255,65,0.3)" }}>python flask js react</p>
        <p style={{ color: "rgba(0,255,65,0.3)" }}>sqlite railway vercel</p>
        <br />
        <p style={{ color: "rgba(0,255,65,0.4)" }}>$ git log --oneline</p>
        <p style={{ color: "rgba(0,255,65,0.3)" }}>a1b2c3 deploy produccion</p>
        <p style={{ color: "rgba(0,255,65,0.3)" }}>d4e5f6 feat: panel admin</p>
        <p style={{ color: "rgba(0,255,65,0.3)" }}>g7h8i9 fix: inventario</p>
      </div>
    </div>
  )
}