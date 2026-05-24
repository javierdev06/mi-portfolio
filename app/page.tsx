"use client"

import { useEffect, useRef, useState } from "react"
import Panel from "./components/Panel"

let closePanelFn: (() => void) | null = null
let openPanelFn: ((s: string) => void) | null = null

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  closePanelFn = () => setActiveSection(null)
  openPanelFn = (s: string) => setActiveSection(s)

  useEffect(() => {
    if (started) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    let blink = true
    let blinkTimer = 0

    const drawIntro = () => {
      ctx.fillStyle = "#060606"
      ctx.fillRect(0, 0, 800, 600)

      for (let x = 0; x < 800; x += 32) {
        for (let y = 0; y < 600; y += 32) {
          ctx.strokeStyle = "rgba(0,255,65,0.04)"
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, 32, 32)
        }
      }

      const glow = ctx.createRadialGradient(400, 300, 0, 400, 300, 300)
      glow.addColorStop(0, "rgba(0,255,65,0.08)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, 800, 600)

      ctx.fillStyle = "#00ff41"
      ctx.font = "bold 48px monospace"
      ctx.textAlign = "center"
      ctx.fillText("JAVIER CORTES", 400, 220)

      ctx.fillStyle = "rgba(0,255,65,0.8)"
      ctx.font = "16px monospace"
      ctx.fillText("full stack developer · portfolio", 400, 260)

      ctx.fillStyle = "rgba(0,255,65,0.3)"
      ctx.fillRect(100, 280, 600, 1)

      ctx.fillStyle = "rgba(0,255,65,0.7)"
      ctx.font = "12px monospace"
      ctx.fillText("Python · Flask · JavaScript · React · Next.js", 400, 310)
      ctx.fillText("Chile · disponible para proyectos", 400, 335)

      blinkTimer++
      if (blinkTimer > 30) { blink = !blink; blinkTimer = 0 }

      if (blink) {
        ctx.fillStyle = "#00ff41"
        ctx.font = "14px monospace"
        ctx.fillText("[ PRESS ENTER TO START ]", 400, 420)
      }

      ctx.fillStyle = "rgba(0,255,65,0.25)"
      ctx.font = "11px monospace"
      ctx.fillText("flechas mover   E interactuar   X cerrar", 400, 560)
    }

    let animId: number
    const loop = () => { drawIntro(); animId = requestAnimationFrame(loop) }
    loop()

    const handleEnter = (e: KeyboardEvent) => { if (e.key === "Enter") setStarted(true) }
    window.addEventListener("keydown", handleEnter)

    return () => { cancelAnimationFrame(animId); window.removeEventListener("keydown", handleEnter) }
  }, [started])

  useEffect(() => {
    if (!started) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    canvas.focus()

    const player = { x: 400, y: 300, speed: 3, dir: "down", moving: false, frame: 0 }
    const npc = { x: 600, y: 400, dir: "down", frame: 0, moveTimer: 0, dx: 1, dy: 0 }
    const keys: Record<string, boolean> = {}
    let frameTimer = 0

    const objects = [
      { x: 150, y: 150, label: "proyectos" },
      { x: 400, y: 150, label: "sobre mi" },
      { x: 650, y: 150, label: "contacto" },
      { x: 600, y: 400, label: "npc" },
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
      if ((e.key === "x" || e.key === "X") && isOpen()) closePanelFn?.()
    })

    window.addEventListener("keyup", (e) => { keys[e.key] = false })

    const drawCharacter = (
      x: number, y: number, dir: string, frame: number,
      bodyColor: string, headColor: string, capColor: string
    ) => {
      const f = frame % 2

      ctx.fillStyle = "rgba(0,0,0,0.3)"
      ctx.beginPath()
      ctx.ellipse(x, y + 12, 10, 4, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = bodyColor
      if (dir === "down" || dir === "up") {
        ctx.fillRect(x - 6, y, 5, 10)
        ctx.fillRect(x + 1, y, 5, 10)
        if (f === 1) ctx.fillRect(x - 6, y + 8, 5, 4)
        else ctx.fillRect(x + 1, y + 8, 5, 4)
      } else {
        ctx.fillRect(x - 4, y, 8, 10)
        if (f === 1) ctx.fillRect(x - 6, y + 6, 5, 6)
        else ctx.fillRect(x + 1, y + 6, 5, 6)
      }

      ctx.fillStyle = bodyColor
      ctx.fillRect(x - 8, y - 10, 16, 12)

      if (f === 0) {
        ctx.fillRect(x - 12, y - 8, 4, 8)
        ctx.fillRect(x + 8, y - 10, 4, 8)
      } else {
        ctx.fillRect(x - 12, y - 10, 4, 8)
        ctx.fillRect(x + 8, y - 8, 4, 8)
      }

      ctx.fillStyle = headColor
      ctx.fillRect(x - 6, y - 20, 12, 12)

      ctx.fillStyle = capColor
      ctx.fillRect(x - 7, y - 22, 14, 4)
      ctx.fillRect(x - 5, y - 26, 10, 4)

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
      ctx.fillStyle = "#1a1208"
      ctx.fillRect(0, 0, 800, 600)

      for (let x = 0; x < 800; x += 32) {
        for (let y = 0; y < 600; y += 32) {
          ctx.strokeStyle = "rgba(255,200,100,0.06)"
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, 32, 32)
        }
      }

      const lightGradient = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, 120)
      lightGradient.addColorStop(0, "rgba(0,255,65,0.07)")
      lightGradient.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = lightGradient
      ctx.fillRect(0, 0, 800, 600)

      objects.slice(0, 3).forEach(obj => {
        const objLight = ctx.createRadialGradient(obj.x, obj.y, 0, obj.x, obj.y, 80)
        objLight.addColorStop(0, "rgba(0,255,65,0.04)")
        objLight.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = objLight
        ctx.fillRect(0, 0, 800, 600)
      })

      const darkGradient = ctx.createRadialGradient(400, 300, 200, 400, 300, 500)
      darkGradient.addColorStop(0, "rgba(0,0,0,0)")
      darkGradient.addColorStop(1, "rgba(0,0,0,0.5)")
      ctx.fillStyle = darkGradient
      ctx.fillRect(0, 0, 800, 600)

      ctx.fillStyle = "#0d0d0d"
      ctx.fillRect(0, 0, 800, 80)

      ctx.fillStyle = "#00ff41"
      ctx.font = "bold 18px monospace"
      ctx.textAlign = "center"
      ctx.fillText("JAVIER CORTES", 400, 35)
      ctx.fillStyle = "rgba(0,255,65,0.7)"
      ctx.font = "11px monospace"
      ctx.fillText("full stack developer · portfolio", 400, 55)
      ctx.fillStyle = "rgba(0,255,65,0.2)"
      ctx.fillRect(60, 30, 200, 1)
      ctx.fillRect(540, 30, 200, 1)

      ctx.fillStyle = "#00ff41"
      ctx.fillRect(0, 80, 800, 2)

      ctx.fillStyle = "#333"
      ctx.fillRect(0, 0, 20, 600)
      ctx.fillRect(780, 0, 20, 600)

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

      // NPC
      drawCharacter(npc.x, npc.y, npc.dir, npc.frame, "#4444aa", "#f5c5a3", "#ffaa00")

      // Burbuja NPC
      const npcDist = Math.sqrt((player.x - npc.x) ** 2 + (player.y - npc.y) ** 2)
      if (npcDist < 70) {
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(npc.x - 40, npc.y - 50, 80, 20)
        ctx.fillStyle = "#ffaa00"
        ctx.font = "9px monospace"
        ctx.textAlign = "center"
        ctx.fillText("[ E ] hablar", npc.x, npc.y - 36)
      }

      // Jugador
      drawCharacter(player.x, player.y, player.dir, player.frame, "#2d4a2d", "#f5c5a3", "#00ff41")

      // Hint objetos
      const near = objects.slice(0, 3).find(obj => {
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

    const updateNPC = () => {
      npc.moveTimer++
      if (npc.moveTimer > 60) {
        npc.moveTimer = 0
        const dirs = [
          { dx: 2, dy: 0, dir: "right" },
          { dx: -2, dy: 0, dir: "left" },
          { dx: 0, dy: 2, dir: "down" },
          { dx: 0, dy: -2, dir: "up" },
        ]
        const chosen = dirs[Math.floor(Math.random() * dirs.length)]
        npc.dx = chosen.dx
        npc.dy = chosen.dy
        npc.dir = chosen.dir
      }

      npc.x += npc.dx
      npc.y += npc.dy
      npc.frame++

      if (npc.x < 50) { npc.x = 50; npc.dx = 2; npc.dir = "right" }
      if (npc.x > 750) { npc.x = 750; npc.dx = -2; npc.dir = "left" }
      if (npc.y < 100) { npc.y = 100; npc.dy = 2; npc.dir = "down" }
      if (npc.y > 560) { npc.y = 560; npc.dy = -2; npc.dir = "up" }

      objects[3].x = npc.x
      objects[3].y = npc.y
    }

    const update = () => {
      if (isOpen()) return

      player.moving = false

      if (keys["ArrowLeft"]) { player.x -= player.speed; player.dir = "left"; player.moving = true }
      else if (keys["ArrowRight"]) { player.x += player.speed; player.dir = "right"; player.moving = true }
      if (keys["ArrowUp"]) { player.y -= player.speed; player.dir = "up"; player.moving = true }
      else if (keys["ArrowDown"]) { player.y += player.speed; player.dir = "down"; player.moving = true }

      if (player.moving) {
        frameTimer++
        if (frameTimer > 8) { player.frame++; frameTimer = 0 }
      } else {
        player.frame = 0
      }

      updateNPC()

      if (player.x < 30) player.x = 30
      if (player.x > 770) player.x = 770
      if (player.y < 95) player.y = 95
      if (player.y > 580) player.y = 580
    }

    let animId: number
    const loop = () => { update(); draw(); animId = requestAnimationFrame(loop) }
    loop()

    return () => cancelAnimationFrame(animId)
  }, [started])

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