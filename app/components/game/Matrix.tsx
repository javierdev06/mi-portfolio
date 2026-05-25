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
    const chars = "01{}[]<>/\\|=+-*&%$#@!?"

    const draw = () => {
      ctx.fillStyle = "rgba(10,10,10,0.06)"
      ctx.fillRect(0, 0, W, H)
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        const r = Math.random()
        if (r > 0.98) ctx.fillStyle = "#ff00aa"
        else if (r > 0.95) ctx.fillStyle = "#00e5ff"
        else ctx.fillStyle = `rgba(0,255,136,${Math.random() * 0.25 + 0.05})`
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
      background: "#0a0a0a",
      overflow: "hidden",
    }}>
      <canvas
        ref={canvasRef}
        width={400}
        height={600}
        style={{ width: "100%", height: "100%", opacity: 0.4 }}
      />
      <div style={{
        position: "absolute",
        top: 24,
        left: 24,
        right: 24,
        fontFamily: "monospace",
        fontSize: 11,
        lineHeight: 1.9,
        pointerEvents: "none",
      }}>
        <p style={{ color: "#00ff88", marginBottom: 10, fontSize: 12 }}>// sistema activo</p>
        <p style={{ color: "#c8c8c8" }}>usuario: <span style={{ color: "#00e5ff" }}>javier_cortes</span></p>
        <p style={{ color: "#c8c8c8" }}>rol: <span style={{ color: "#00e5ff" }}>full_stack_dev</span></p>
        <p style={{ color: "#c8c8c8" }}>estado: <span style={{ color: "#00ff88" }}>disponible</span></p>
        <br />
        <p style={{ color: "#666" }}>$ ping javier.dev</p>
        <p style={{ color: "#00ff88" }}>... conectando</p>
        <br />
        <p style={{ color: "#666" }}>$ ls skills/</p>
        <p style={{ color: "#c8c8c8" }}>python flask js react</p>
        <p style={{ color: "#c8c8c8" }}>sqlite railway vercel</p>
        <br />
        <p style={{ color: "#666" }}>$ git log --oneline</p>
        <p style={{ color: "#c8c8c8" }}><span style={{ color: "#ff00aa" }}>a1b2c3</span> deploy produccion</p>
        <p style={{ color: "#c8c8c8" }}><span style={{ color: "#ff00aa" }}>d4e5f6</span> feat: panel admin</p>
        <p style={{ color: "#c8c8c8" }}><span style={{ color: "#ff00aa" }}>g7h8i9</span> fix: inventario</p>
      </div>
    </div>
  )
}