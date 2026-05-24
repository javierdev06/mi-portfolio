"use client"

import { useEffect, useRef, useState } from "react"
import Panel from "./components/Panel"

let closePanelFn: (() => void) | null = null
let openPanelFn: ((s: string) => void) | null = null

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  closePanelFn = () => setActiveSection(null)
  openPanelFn = (s: string) => setActiveSection(s)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    canvas.focus()

    const player = { x: 400, y: 300, size: 20, speed: 3, dir: "down" }
    const keys: Record<string, boolean> = {}

    const objects = [
      { x: 150, y: 150, size: 40, color: "#4444ff", label: "proyectos" },
      { x: 400, y: 150, size: 40, color: "#ffaa00", label: "sobre mi" },
      { x: 650, y: 150, size: 40, color: "#ff4444", label: "contacto" },
    ]

    const isOpen = () => document.querySelector("[data-panel]") !== null

    window.addEventListener("keydown", (e) => {
      keys[e.key] = true

      if ((e.key === "e" || e.key === "E") && !isOpen()) {
        const near = objects.find(obj => {
          const dx = player.x - obj.x
          const dy = player.y - obj.y
          return Math.sqrt(dx*dx + dy*dy) < 70
        })
        if (near) openPanelFn?.(near.label)
      }

      if ((e.key === "x" || e.key === "X") && isOpen()) {
        closePanelFn?.()
      }
    })

    window.addEventListener("keyup", (e) => { keys[e.key] = false })

    const draw = () => {
      // Piso
      ctx.fillStyle = "#1a1208"
      ctx.fillRect(0, 0, 800, 600)

      // Textura piso
      for (let x = 0; x < 800; x += 32) {
        for (let y = 0; y < 600; y += 32) {
          ctx.strokeStyle = "rgba(255,200,100,0.06)"
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, 32, 32)
        }
      }

      // Pared superior
      ctx.fillStyle = "#0d0d0d"
      ctx.fillRect(0, 0, 800, 80)

      // Borde pared
      ctx.fillStyle = "#00ff41"
      ctx.fillRect(0, 80, 800, 2)

      // Esquinas
      ctx.fillStyle = "#333"
      ctx.fillRect(0, 0, 20, 600)
      ctx.fillRect(780, 0, 20, 600)

      // Objetos
      objects.forEach(obj => {
        ctx.fillStyle = obj.color
        ctx.fillRect(obj.x - obj.size/2, obj.y - obj.size/2, obj.size, obj.size)
        ctx.fillStyle = "#ffffff"
        ctx.font = "10px monospace"
        ctx.textAlign = "center"
        ctx.fillText(obj.label, obj.x, obj.y + obj.size/2 + 16)
      })

      // Cuerpo jugador
      ctx.fillStyle = "#00ff41"
      ctx.fillRect(player.x - 8, player.y - 8, 16, 20)

      // Cabeza
      ctx.fillStyle = "#00cc33"
      ctx.fillRect(player.x - 6, player.y - 18, 12, 12)

      // Ojos según dirección
      ctx.fillStyle = "#000"
      if (player.dir === "down") {
        ctx.fillRect(player.x - 4, player.y - 14, 3, 3)
        ctx.fillRect(player.x + 1, player.y - 14, 3, 3)
      } else if (player.dir === "up") {
        ctx.fillRect(player.x - 4, player.y - 16, 3, 3)
        ctx.fillRect(player.x + 1, player.y - 16, 3, 3)
      } else if (player.dir === "left") {
        ctx.fillRect(player.x - 5, player.y - 14, 3, 3)
      } else if (player.dir === "right") {
        ctx.fillRect(player.x + 2, player.y - 14, 3, 3)
      }

      // Hint
      const near = objects.find(obj => {
        const dx = player.x - obj.x
        const dy = player.y - obj.y
        return Math.sqrt(dx*dx + dy*dy) < 70
      })

      if (near && !isOpen()) {
        ctx.fillStyle = "#00ff41"
        ctx.font = "14px monospace"
        ctx.textAlign = "center"
        ctx.fillText(`[E] ver ${near.label}`, 400, 580)
      }
    }

    const update = () => {
      if (isOpen()) return

      if (keys["ArrowLeft"]) { player.x -= player.speed; player.dir = "left" }
      else if (keys["ArrowRight"]) { player.x += player.speed; player.dir = "right" }
      if (keys["ArrowUp"]) { player.y -= player.speed; player.dir = "up" }
      else if (keys["ArrowDown"]) { player.y += player.speed; player.dir = "down" }

      // Límites habitación
      if (player.x < 30) player.x = 30
      if (player.x > 770) player.x = 770
      if (player.y < 95) player.y = 95
      if (player.y > 580) player.y = 580
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
        <canvas ref={canvasRef} width={800} height={600} tabIndex={0} style={{ display: "block" }} />
        {activeSection && (
          <Panel section={activeSection} onClose={() => closePanelFn?.()} />
        )}
      </div>
    </main>
  )
}