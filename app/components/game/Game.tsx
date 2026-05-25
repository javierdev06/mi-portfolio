"use client"

import { useEffect, useRef } from "react"
import { drawCharacter } from "./characters"
import { playStep, playOpen, playClose, playUnlock } from "./audio"
import { INITIAL_OBJECTS, NPC_DIRS } from "./constants"

type GameProps = {
  visitedRef: React.MutableRefObject<string[]>
  onOpen: (section: string) => void
  onClose: () => void
  onVisit: (label: string) => void
  lang: "es" | "en"
}

export default function Game({ visitedRef, onOpen, onClose, onVisit, lang }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    canvas.focus()

    const player = { x: 400, y: 300, speed: 3, dir: "down", moving: false, frame: 0 }
    const npc = { x: 300, y: 400, dir: "down", frame: 0, moveTimer: 0, dx: 1, dy: 0 }
    const keys: Record<string, boolean> = {}
    let frameTimer = 0
    let stepTimer = 0

    const objects = INITIAL_OBJECTS.map(o => ({ ...o }))

    const isOpen = () => document.querySelector("[data-panel]") !== null

    const handleKey = (e: KeyboardEvent) => {
      keys[e.key] = true
      if ((e.key === "e" || e.key === "E") && !isOpen()) {
        const near = objects.find(obj => {
          const dx = player.x - obj.x
          const dy = player.y - obj.y
          return Math.sqrt(dx*dx + dy*dy) < 70
        })
        if (near) {
          if (near.label === "contacto") {
            const allDone = ["proyectos", "sobre mí", "stack"].every(r =>
              visitedRef.current.includes(r)
            )
            if (!allDone) { onOpen("bloqueado"); return }
            else { playUnlock(); onVisit("contacto") }
          }
          if (near.label !== "contacto") onVisit(near.label)
          playOpen()
          onOpen(near.label)
        }
      }
      if ((e.key === "x" || e.key === "X") && isOpen()) {
        playClose()
        onClose()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => { keys[e.key] = false }

    window.addEventListener("keydown", handleKey)
    window.addEventListener("keyup", handleKeyUp)

    const draw = () => {
      // Piso
      ctx.fillStyle = "#1a1208"
      ctx.fillRect(0, 0, 800, 600)

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
      objects.slice(0, 3).forEach(obj => {
        const objLight = ctx.createRadialGradient(obj.x, obj.y, 0, obj.x, obj.y, 80)
        objLight.addColorStop(0, "rgba(0,255,65,0.04)")
        objLight.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = objLight
        ctx.fillRect(0, 0, 800, 600)
      })

      // Oscuridad
      const dark = ctx.createRadialGradient(400, 300, 200, 400, 300, 500)
      dark.addColorStop(0, "rgba(0,0,0,0)")
      dark.addColorStop(1, "rgba(0,0,0,0.5)")
      ctx.fillStyle = dark
      ctx.fillRect(0, 0, 800, 600)

      // Pared superior
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

      // Esquinas
      ctx.fillStyle = "#333"
      ctx.fillRect(0, 0, 20, 600)
      ctx.fillRect(780, 0, 20, 600)

      // Puerta
      const doorLight = ctx.createRadialGradient(780, 315, 0, 780, 315, 60)
      doorLight.addColorStop(0, "rgba(255,180,50,0.15)")
      doorLight.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = doorLight
      ctx.fillRect(0, 0, 800, 600)
      ctx.fillStyle = "#3a2a0a"
      ctx.fillRect(770, 255, 20, 120)
      ctx.fillStyle = "#5c3d1e"
      ctx.fillRect(772, 257, 16, 116)
      ctx.fillStyle = "#ffaa00"
      ctx.beginPath()
      ctx.arc(774, 315, 3, 0, Math.PI * 2)
      ctx.fill()

      // PC
      const drawPC = (x: number, y: number) => {
        const done = visitedRef.current.includes("proyectos")
        ctx.fillStyle = "rgba(0,0,0,0.4)"
        ctx.fillRect(x - 18, y + 6, 40, 6)
        ctx.fillStyle = "#222"
        ctx.fillRect(x - 20, y - 24, 40, 28)
        ctx.fillStyle = done ? "#0a3a0a" : "#0a2a0a"
        ctx.fillRect(x - 16, y - 20, 32, 20)
        ctx.fillStyle = done ? "#00ff41" : "#005511"
        ctx.font = "6px monospace"
        ctx.textAlign = "center"
        ctx.fillText(done ? "OK" : ">_", x, y - 8)
        ctx.fillStyle = "#333"
        ctx.fillRect(x - 4, y + 4, 8, 4)
        ctx.fillRect(x - 10, y + 8, 20, 3)
        ctx.fillStyle = done ? "#00ff41" : "#ffffff"
        ctx.font = "10px monospace"
        ctx.fillText(lang === "es" ? "proyectos" : "projects", x, y + 24)
      }

      // Estanteria
      const drawShelf = (x: number, y: number) => {
        const done = visitedRef.current.includes("sobre mí")
        ctx.fillStyle = "rgba(0,0,0,0.4)"
        ctx.fillRect(x - 20, y + 22, 44, 6)
        ctx.fillStyle = done ? "#3d2a0a" : "#5c3d1e"
        ctx.fillRect(x - 22, y - 28, 44, 4)
        ctx.fillRect(x - 22, y - 4, 44, 4)
        ctx.fillRect(x - 22, y + 20, 44, 4)
        const books = ["#ff4444", "#4444ff", "#ffaa00", "#00ff41", "#ff44ff"]
        books.forEach((color, i) => {
          ctx.fillStyle = done ? "#00ff41" : color
          ctx.fillRect(x - 18 + i * 9, y - 24, 7, 20)
        })
        ctx.fillStyle = done ? "#00ff41" : "#ffffff"
        ctx.font = "10px monospace"
        ctx.textAlign = "center"
        ctx.fillText(lang === "es" ? "sobre mí" : "about me", x, y + 36)
      }

      // Telefono
      const drawPhone = (x: number, y: number) => {
        const done = visitedRef.current.includes("contacto")
        const unlocked = ["proyectos", "sobre mí", "stack"].every(r => visitedRef.current.includes(r))
        ctx.fillStyle = "rgba(0,0,0,0.4)"
        ctx.fillRect(x - 10, y + 18, 24, 6)
        ctx.fillStyle = unlocked ? "#222" : "#111"
        ctx.fillRect(x - 12, y - 24, 24, 40)
        ctx.fillStyle = done ? "#001a33" : (unlocked ? "#001a33" : "#0a0a0a")
        ctx.fillRect(x - 9, y - 20, 18, 28)
        ctx.fillStyle = "#444"
        ctx.fillRect(x - 4, y + 12, 8, 4)
        ctx.fillStyle = done ? "#00ff41" : (unlocked ? "#00ff41" : "#333")
        ctx.font = "8px monospace"
        ctx.textAlign = "center"
        ctx.fillText(unlocked ? "@" : "X", x, y - 4)
        ctx.fillStyle = done ? "#00ff41" : (unlocked ? "#ffffff" : "#444")
        ctx.font = "10px monospace"
        ctx.fillText(lang === "es" ? "contacto" : "contact", x, y + 26)
        if (!unlocked) {
          ctx.fillStyle = "#ff4444"
          ctx.font = "12px monospace"
          ctx.fillText("[]", x, y - 36)
        }
      }

      drawPC(150, 150)
      drawShelf(400, 150)
      drawPhone(650, 150)

      // NPC
      drawCharacter(ctx, npc.x, npc.y, npc.dir, npc.frame, "#4444aa", "#f5c5a3", "#ffaa00")
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
      drawCharacter(ctx, player.x, player.y, player.dir, player.frame, "#2d4a2d", "#f5c5a3", "#00ff41")

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
        ctx.fillText(
          lang === "es" ? `[E] ver ${near.label}` : `[E] view ${near.label}`,
          400, 580
        )
      }
    }

    const updateNPC = () => {
      npc.moveTimer++
      if (npc.moveTimer > 60) {
        npc.moveTimer = 0
        const chosen = NPC_DIRS[Math.floor(Math.random() * NPC_DIRS.length)]
        npc.dx = chosen.dx
        npc.dy = chosen.dy
        npc.dir = chosen.dir
      }
      npc.x += npc.dx
      npc.y += npc.dy
      npc.frame++
      if (npc.x < 30) { npc.x = 30; npc.dx = 2; npc.dir = "right" }
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
        stepTimer++
        if (stepTimer > 20) { playStep(); stepTimer = 0 }
      } else {
        player.frame = 0
        stepTimer = 0
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

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("keydown", handleKey)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [lang])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      tabIndex={0}
      style={{ display: "block" }}
    />
  )
}