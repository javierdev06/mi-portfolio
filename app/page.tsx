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

    const player = { x: 400, y: 300, speed: 3, dir: "down", moving: false, frame: 0 }
    const keys: Record<string, boolean> = {}
    let frameTimer = 0

    const objects = [
      { x: 150, y: 150, label: "proyectos" },
      { x: 400, y: 150, label: "sobre mi" },
      { x: 650, y: 150, label: "contacto" },
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

    const drawPlayer = (x: number, y: number, dir: string, frame: number) => {
      const f = frame % 2

      // Sombra
      ctx.fillStyle = "rgba(0,0,0,0.3)"
      ctx.beginPath()
      ctx.ellipse(x, y + 12, 10, 4, 0, 0, Math.PI * 2)
      ctx.fill()

      // Piernas animadas
      ctx.fillStyle = "#1a6b1a"
      if (dir === "down" || dir === "up") {
        ctx.fillRect(x - 6, y, 5, 10)
        ctx.fillRect(x + 1, y, 5, 10)
        if (f === 1) {
          ctx.fillRect(x - 6, y + 8, 5, 4)
        } else {
          ctx.fillRect(x + 1, y + 8, 5, 4)
        }
      } else {
        ctx.fillRect(x - 4, y, 8, 10)
        if (f === 1) {
          ctx.fillRect(x - 6, y + 6, 5, 6)
        } else {
          ctx.fillRect(x + 1, y + 6, 5, 6)
        }
      }

      // Cuerpo
      ctx.fillStyle = "#2d4a2d"
      ctx.fillRect(x - 8, y - 10, 16, 12)

      // Brazos
      ctx.fillStyle = "#1a6b1a"
      if (f === 0) {
        ctx.fillRect(x - 12, y - 8, 4, 8)
        ctx.fillRect(x + 8, y - 10, 4, 8)
      } else {
        ctx.fillRect(x - 12, y - 10, 4, 8)
        ctx.fillRect(x + 8, y - 8, 4, 8)
      }

      // Cabeza
      ctx.fillStyle = "#f5c5a3"
      ctx.fillRect(x - 6, y - 20, 12, 12)

      // Gorra
      ctx.fillStyle = "#00ff41"
      ctx.fillRect(x - 7, y - 22, 14, 4)
      ctx.fillRect(x - 5, y - 26, 10, 4)

      // Ojos
      ctx.fillStyle = "#000"
      if (dir === "down") {
        ctx.fillRect(x - 4, y - 16, 2, 2)
        ctx.fillRect(x + 2, y - 16, 2, 2)
      } else if (dir === "up") {
        ctx.fillRect(x - 3, y - 18, 2, 2)
        ctx.fillRect(x + 1, y - 18, 2, 2)
      } else if (dir === "left") {
        ctx.fillRect(x - 5, y - 16, 2, 2)
      } else if (dir === "right") {
        ctx.fillRect(x + 3, y - 16, 2, 2)
      }
    }

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

      // Luz jugador
      const lightGradient = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, 120)
      lightGradient.addColorStop(0, "rgba(0,255,65,0.07)")
      lightGradient.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = lightGradient
      ctx.fillRect(0, 0, 800, 600)

      // Luz objetos
      objects.forEach(obj => {
        const objLight = ctx.createRadialGradient(obj.x, obj.y, 0, obj.x, obj.y, 80)
        objLight.addColorStop(0, "rgba(0,255,65,0.04)")
        objLight.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = objLight
        ctx.fillRect(0, 0, 800, 600)
      })

      // Oscuridad esquinas
      const darkGradient = ctx.createRadialGradient(400, 300, 200, 400, 300, 500)
      darkGradient.addColorStop(0, "rgba(0,0,0,0)")
      darkGradient.addColorStop(1, "rgba(0,0,0,0.5)")
      ctx.fillStyle = darkGradient
      ctx.fillRect(0, 0, 800, 600)

      // Pared superior
      ctx.fillStyle = "#0d0d0d"
      ctx.fillRect(0, 0, 800, 80)

      // Nombre
      ctx.fillStyle = "#00ff41"
      ctx.font = "bold 18px monospace"
      ctx.textAlign = "center"
      ctx.fillText("JAVIER CORTÉS", 400, 35)
      ctx.fillStyle = "rgba(0,255,65,0.4)"
      ctx.font = "11px monospace"
      ctx.fillText("full stack developer · portfolio", 400, 55)
      ctx.fillStyle = "rgba(0,255,65,0.2)"
      ctx.fillRect(60, 30, 200, 1)
      ctx.fillRect(540, 30, 200, 1)

      // Borde pared
      ctx.fillStyle = "#00ff41"
      ctx.fillRect(0, 80, 800, 2)

      // Esquinas
      ctx.fillStyle = "#333"
      ctx.fillRect(0, 0, 20, 600)
      ctx.fillRect(780, 0, 20, 600)

      // Computador
      const drawPC = (x: number, y: number) => {
        ctx.fillStyle = "rgba(0,0,0,0.4)"
        ctx.fillRect(x - 18, y + 6, 40, 6)
        ctx.fillStyle = "#222"
        ctx.fillRect(x - 20, y - 24, 40, 28)
        ctx.fillStyle = "#0a2a0a"
        ctx.fillRect(x - 16, y - 20, 32, 20)
        ctx.fillStyle = "#00ff41"
        ctx.font = "6px monospace"
        ctx.textAlign = "center"
        ctx.fillText(">_", x, y - 8)
        ctx.fillStyle = "#333"
        ctx.fillRect(x - 4, y + 4, 8, 4)
        ctx.fillRect(x - 10, y + 8, 20, 3)
        ctx.fillStyle = "#ffffff"
        ctx.font = "10px monospace"
        ctx.fillText("proyectos", x, y + 24)
      }

      // Estantería
      const drawShelf = (x: number, y: number) => {
        ctx.fillStyle = "rgba(0,0,0,0.4)"
        ctx.fillRect(x - 20, y + 22, 44, 6)
        ctx.fillStyle = "#5c3d1e"
        ctx.fillRect(x - 22, y - 28, 44, 4)
        ctx.fillRect(x - 22, y - 4, 44, 4)
        ctx.fillRect(x - 22, y + 20, 44, 4)
        const books = ["#ff4444", "#4444ff", "#ffaa00", "#00ff41", "#ff44ff"]
        books.forEach((color, i) => {
          ctx.fillStyle = color
          ctx.fillRect(x - 18 + i * 9, y - 24, 7, 20)
        })
        ctx.fillStyle = "#ffffff"
        ctx.font = "10px monospace"
        ctx.textAlign = "center"
        ctx.fillText("sobre mi", x, y + 36)
      }

      // Teléfono
      const drawPhone = (x: number, y: number) => {
        ctx.fillStyle = "rgba(0,0,0,0.4)"
        ctx.fillRect(x - 10, y + 18, 24, 6)
        ctx.fillStyle = "#222"
        ctx.fillRect(x - 12, y - 24, 24, 40)
        ctx.fillStyle = "#001a33"
        ctx.fillRect(x - 9, y - 20, 18, 28)
        ctx.fillStyle = "#444"
        ctx.fillRect(x - 4, y + 12, 8, 4)
        ctx.fillStyle = "#00ff41"
        ctx.font = "8px monospace"
        ctx.textAlign = "center"
        ctx.fillText("@", x, y - 4)
        ctx.fillStyle = "#ffffff"
        ctx.font = "10px monospace"
        ctx.fillText("contacto", x, y + 26)
      }

      drawPC(150, 150)
      drawShelf(400, 150)
      drawPhone(650, 150)

      // Jugador
      drawPlayer(player.x, player.y, player.dir, player.frame)

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

      player.moving = false

      if (keys["ArrowLeft"]) { player.x -= player.speed; player.dir = "left"; player.moving = true }
      else if (keys["ArrowRight"]) { player.x += player.speed; player.dir = "right"; player.moving = true }
      if (keys["ArrowUp"]) { player.y -= player.speed; player.dir = "up"; player.moving = true }
      else if (keys["ArrowDown"]) { player.y += player.speed; player.dir = "down"; player.moving = true }

      // Animación frames
      if (player.moving) {
        frameTimer++
        if (frameTimer > 8) {
          player.frame++
          frameTimer = 0
        }
      } else {
        player.frame = 0
      }

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