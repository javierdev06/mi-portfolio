"use client"

import { useEffect, useRef, useState } from "react"
import Panel from "./components/Panel"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const player = { x: 400, y: 300, size: 20, speed: 3 }
    const keys: Record<string, boolean> = {}

    const objects = [
      { x: 150, y: 150, size: 40, color: "#4444ff", label: "proyectos" },
      { x: 400, y: 150, size: 40, color: "#ffaa00", label: "sobre mi" },
      { x: 650, y: 150, size: 40, color: "#ff4444", label: "contacto" },
    ]

    window.addEventListener("keydown", (e) => {
      keys[e.key] = true
      if (e.key === "e" || e.key === "E") {
        const near = objects.find(obj => {
          const dx = player.x - obj.x
          const dy = player.y - obj.y
          return Math.sqrt(dx*dx + dy*dy) < 70
        })
        if (near) setActiveSection(near.label)
      }
    })

    window.addEventListener("keyup", (e) => { keys[e.key] = false })

    const draw = () => {
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, 800, 600)

      ctx.strokeStyle = "rgba(0,255,65,0.08)"
      ctx.lineWidth = 1
      for (let x = 0; x < 800; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 600); ctx.stroke()
      }
      for (let y = 0; y < 600; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(800, y); ctx.stroke()
      }

      objects.forEach(obj => {
        ctx.fillStyle = obj.color
        ctx.fillRect(obj.x - obj.size/2, obj.y - obj.size/2, obj.size, obj.size)
        ctx.fillStyle = "#ffffff"
        ctx.font = "10px monospace"
        ctx.textAlign = "center"
        ctx.fillText(obj.label, obj.x, obj.y + obj.size/2 + 16)
      })

      ctx.fillStyle = "#00ff41"
      ctx.fillRect(player.x - 12, player.y - 12, 24, 24)

      const near = objects.find(obj => {
        const dx = player.x - obj.x
        const dy = player.y - obj.y
        return Math.sqrt(dx*dx + dy*dy) < 70
      })

      if (near) {
        ctx.fillStyle = "#00ff41"
        ctx.font = "14px monospace"
        ctx.textAlign = "center"
        ctx.fillText(`[E] ver ${near.label}`, 400, 570)
      }
    }

    const update = () => {
      if (keys["ArrowLeft"]) player.x -= player.speed
      if (keys["ArrowRight"]) player.x += player.speed
      if (keys["ArrowUp"]) player.y -= player.speed
      if (keys["ArrowDown"]) player.y += player.speed
    }

    let animId: number
    const loop = () => {
      update()
      draw()
      animId = requestAnimationFrame(loop)
    }

    loop()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <main className="flex items-center justify-center min-h-screen bg-black">
      <div style={{ position: "relative" }}>
        <canvas ref={canvasRef} width={800} height={600} />
        <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
          <Panel section={activeSection} onClose={() => setActiveSection(null)} />
        </div>
      </div>
    </main>
  )
}