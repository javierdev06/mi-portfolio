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

const WORLD_H = 1000
const DEAD_ZONE = { top: 180, bottom: 420 }

export default function Game({ visitedRef, onOpen, onClose, onVisit, lang }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    canvas.focus()

    const player = { x: 400, y: 350, speed: 3, dir: "down", moving: false, frame: 0 }
    const camera = { y: 0, targetY: 0 }
    const npc = { x: 200, y: 450, dir: "down", frame: 0, moveTimer: 0, dx: 1, dy: 0 }
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
            const allDone = ["proyectos", "sobre mí", "stack"].every(r => visitedRef.current.includes(r))
            if (!allDone) { onOpen("bloqueado"); return }
            else { playUnlock(); onVisit("contacto") }
          }
          if (near.label !== "contacto") onVisit(near.label)
          playOpen()
          onOpen(near.label)
        }
      }
      if ((e.key === "x" || e.key === "X") && isOpen()) { playClose(); onClose() }
    }

    const handleKeyUp = (e: KeyboardEvent) => { keys[e.key] = false }
    window.addEventListener("keydown", handleKey)
    window.addEventListener("keyup", handleKeyUp)

    const draw = () => {
      const time = Date.now()

      // Reset total del canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, 800, 600)

      // ===== MUNDO con cámara =====
      ctx.save()
      ctx.translate(0, -Math.round(camera.y))

      // Fondo
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 88, 800, WORLD_H)

      // Grid
      for (let x = 0; x < 800; x += 32) {
        for (let y = 88; y < WORLD_H; y += 32) {
          ctx.strokeStyle = "rgba(255,255,255,0.02)"
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, 32, 32)
        }
      }

      // Luz jugador
      const lg = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, 160)
      lg.addColorStop(0, "rgba(0,229,255,0.08)")
      lg.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = lg
      ctx.fillRect(0, 88, 800, WORLD_H)

      // Luz objetos
      objects.slice(0, 3).forEach(obj => {
        const ol = ctx.createRadialGradient(obj.x, obj.y, 0, obj.x, obj.y, 90)
        ol.addColorStop(0, "rgba(0,255,136,0.06)")
        ol.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = ol
        ctx.fillRect(0, 88, 800, WORLD_H)
      })

      // Viñeta
      const vg = ctx.createRadialGradient(400, player.y, 100, 400, player.y, 500)
      vg.addColorStop(0, "rgba(0,0,0,0)")
      vg.addColorStop(1, "rgba(0,0,0,0.65)")
      ctx.fillStyle = vg
      ctx.fillRect(0, 88, 800, WORLD_H)

      // Esquinas
      ctx.fillStyle = "#111"
      ctx.fillRect(0, 88, 20, WORLD_H)
      ctx.fillRect(780, 88, 20, WORLD_H)

      // Neon tubes
      const neonA = 0.15 + Math.sin(time / 900) * 0.06
      ctx.fillStyle = `rgba(0,229,255,${neonA})`
      ctx.fillRect(20, 92, 2, 300)
      ctx.fillStyle = `rgba(255,0,170,${neonA})`
      ctx.fillRect(778, 92, 2, 300)

      // Servidor
      ctx.fillStyle = "#141414"
      ctx.fillRect(28, 500, 52, 80)
      ctx.strokeStyle = "rgba(0,255,136,0.2)"
      ctx.lineWidth = 1
      ctx.strokeRect(28, 500, 52, 80)
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = i === 0 ? "#00ff88" : "#2a2a2a"
        ctx.fillRect(36, 512 + i * 16, 12, 5)
        ctx.fillStyle = i === 1 ? "#ff4444" : "#1a1a1a"
        ctx.fillRect(58, 512 + i * 16, 5, 5)
      }
      ctx.fillStyle = "#555"
      ctx.font = "8px monospace"
      ctx.textAlign = "center"
      ctx.fillText("SRV-01", 54, 572)

      // Terminal izquierda
      ctx.fillStyle = "#0c0c0c"
      ctx.fillRect(25, 92, 110, 70)
      ctx.strokeStyle = "rgba(0,229,255,0.15)"
      ctx.lineWidth = 1
      ctx.strokeRect(25, 92, 110, 70)
      ctx.fillStyle = "#141414"
      ctx.fillRect(25, 92, 110, 12)
      ctx.fillStyle = "#ff5f57"; ctx.beginPath(); ctx.arc(32, 98, 2.5, 0, Math.PI*2); ctx.fill()
      ctx.fillStyle = "#febc2e"; ctx.beginPath(); ctx.arc(40, 98, 2.5, 0, Math.PI*2); ctx.fill()
      ctx.fillStyle = "#28c840"; ctx.beginPath(); ctx.arc(48, 98, 2.5, 0, Math.PI*2); ctx.fill()
      ctx.fillStyle = "#00ff88"
      ctx.font = "7px monospace"
      ctx.textAlign = "left"
      ctx.fillText("> ok " + Math.floor(time/1000%9999) + "s", 28, 114)
      ctx.fillStyle = "#00e5ff"
      ctx.fillText("> cpu " + (20+Math.sin(time/1000)*10).toFixed(0) + "%", 28, 124)
      ctx.fillStyle = "#666"
      ctx.fillText("> mem 512mb", 28, 134)
      if (Math.floor(time/500)%2===0) { ctx.fillStyle = "#00ff88"; ctx.fillText("_", 28, 148) }

      // Caja PKG
      ctx.fillStyle = "#141414"
      ctx.fillRect(690, 700, 44, 34)
      ctx.strokeStyle = "rgba(255,0,170,0.25)"
      ctx.lineWidth = 1
      ctx.strokeRect(690, 700, 44, 34)
      ctx.fillStyle = "#ff00aa"
      ctx.font = "8px monospace"
      ctx.textAlign = "center"
      ctx.fillText("PKG", 712, 721)

      // Puerta
      const dl = ctx.createRadialGradient(779, 325, 0, 779, 325, 60)
      dl.addColorStop(0, "rgba(255,170,0,0.15)")
      dl.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = dl
      ctx.fillRect(0, 88, 800, WORLD_H)
      ctx.fillStyle = "#181008"
      ctx.fillRect(770, 270, 16, 120)
      ctx.strokeStyle = "rgba(255,170,0,0.35)"
      ctx.lineWidth = 1
      ctx.strokeRect(770, 270, 16, 120)
      ctx.fillStyle = "#ffaa00"
      ctx.beginPath(); ctx.arc(773, 330, 3, 0, Math.PI*2); ctx.fill()
      const doorDist = Math.sqrt((player.x-760)**2 + (player.y-330)**2)
      if (doorDist < 80) {
        ctx.fillStyle = "rgba(255,170,0,0.9)"
        ctx.font = "10px monospace"
        ctx.textAlign = "center"
        ctx.fillText("STACK", 725, 262)
      }

      // PC
      const drawPC = (x: number, y: number) => {
        const done = visitedRef.current.includes("proyectos")
        ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(x-28, y+10, 56, 6)
        ctx.fillStyle = "#181818"; ctx.fillRect(x-28, y-32, 56, 40)
        ctx.strokeStyle = done ? "rgba(0,255,136,0.5)" : "rgba(255,255,255,0.07)"
        ctx.lineWidth = 1; ctx.strokeRect(x-28, y-32, 56, 40)
        ctx.fillStyle = done ? "rgba(0,255,136,0.1)" : "#0d0d0d"; ctx.fillRect(x-22, y-26, 44, 28)
        ctx.fillStyle = done ? "#00ff88" : "#3a3a3a"
        ctx.font = "9px monospace"; ctx.textAlign = "center"
        ctx.fillText(done ? "[ OK ]" : ">_", x, y-10)
        ctx.fillStyle = "#181818"; ctx.fillRect(x-6, y+8, 12, 8); ctx.fillRect(x-16, y+14, 32, 4)
        ctx.fillStyle = done ? "#00ff88" : "#c8c8c8"
        ctx.font = "13px monospace"; ctx.fillText(lang === "es" ? "proyectos" : "projects", x, y+32)
      }

      // Estantería
      const drawShelf = (x: number, y: number) => {
        const done = visitedRef.current.includes("sobre mí")
        ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(x-32, y+30, 64, 6)
        ctx.fillStyle = "#241808"
        ctx.fillRect(x-32, y-38, 64, 6); ctx.fillRect(x-32, y-8, 64, 6); ctx.fillRect(x-32, y+24, 64, 6)
        const colors = done ? Array(6).fill("#00ff88") : ["#ff4444","#4488ff","#ffaa00","#00e5ff","#ff00aa","#88ff00"]
        colors.forEach((color, i) => { ctx.fillStyle = color; ctx.fillRect(x-28+i*10, y-32, 8, 26) })
        ctx.fillStyle = done ? "#00ff88" : "#c8c8c8"
        ctx.font = "13px monospace"; ctx.textAlign = "center"
        ctx.fillText(lang === "es" ? "sobre mí" : "about me", x, y+48)
      }

      // Teléfono
      const drawPhone = (x: number, y: number) => {
        const done = visitedRef.current.includes("contacto")
        const unlocked = ["proyectos","sobre mí","stack"].every(r => visitedRef.current.includes(r))
        ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(x-16, y+28, 32, 6)
        ctx.fillStyle = unlocked ? "#181818" : "#0d0d0d"; ctx.fillRect(x-16, y-34, 32, 60)
        ctx.strokeStyle = done ? "rgba(0,255,136,0.5)" : (unlocked ? "rgba(0,229,255,0.25)" : "rgba(255,255,255,0.05)")
        ctx.lineWidth = 1; ctx.strokeRect(x-16, y-34, 32, 60)
        ctx.fillStyle = done ? "rgba(0,255,136,0.1)" : (unlocked ? "rgba(0,229,255,0.05)" : "#080808")
        ctx.fillRect(x-12, y-28, 24, 42)
        ctx.fillStyle = "#1a1a1a"; ctx.fillRect(x-6, y+18, 12, 6)
        ctx.fillStyle = done ? "#00ff88" : (unlocked ? "#00e5ff" : "#444")
        ctx.font = "10px monospace"; ctx.textAlign = "center"; ctx.fillText(unlocked ? "@" : "X", x, y-6)
        ctx.fillStyle = done ? "#00ff88" : (unlocked ? "#c8c8c8" : "#555")
        ctx.font = "13px monospace"; ctx.fillText(lang === "es" ? "contacto" : "contact", x, y+46)
        if (!unlocked) { ctx.fillStyle = "#ff00aa"; ctx.font = "14px monospace"; ctx.fillText("[]", x, y-50) }
      }

      drawPC(150, 175)
      drawShelf(400, 175)
      drawPhone(650, 175)

      // NPC
      drawCharacter(ctx, npc.x, npc.y, npc.dir, npc.frame, "#334466", "#f5c5a3", "#ff00aa")
      const npcDist = Math.sqrt((player.x-npc.x)**2 + (player.y-npc.y)**2)
      if (npcDist < 70) {
        ctx.fillStyle = "rgba(0,0,0,0.88)"; ctx.fillRect(npc.x-50, npc.y-58, 100, 22)
        ctx.strokeStyle = "rgba(255,0,170,0.4)"; ctx.lineWidth = 1; ctx.strokeRect(npc.x-50, npc.y-58, 100, 22)
        ctx.fillStyle = "#ff00aa"; ctx.font = "11px monospace"; ctx.textAlign = "center"
        ctx.fillText("[ E ] hablar", npc.x, npc.y-43)
      }

      // Jugador
      drawCharacter(ctx, player.x, player.y, player.dir, player.frame, "#1a3a2a", "#f5c5a3", "#00e5ff")

      // ===== Fin mundo =====
      ctx.restore()

      // ===== UI FIJA — reset transform y dibuja encima =====
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, 800, 92)

      // Pared superior
      ctx.fillStyle = "#060606"
      ctx.fillRect(0, 0, 800, 86)

      // Título
      ctx.shadowColor = "rgba(0,255,136,0.5)"
      ctx.shadowBlur = 20
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 28px monospace"
      ctx.textAlign = "center"
      ctx.fillText("JAVIER CORTES", 400, 40)
      ctx.shadowBlur = 0

      ctx.fillStyle = "#888"
      ctx.font = "13px monospace"
      ctx.fillText("Full Stack Developer  ·  Portfolio", 400, 66)

      // Línea verde
      ctx.fillStyle = "#00ff88"
      ctx.fillRect(0, 86, 800, 2)
      ctx.fillStyle = "rgba(0,255,136,0.12)"
      ctx.fillRect(0, 88, 800, 4)

      // Magenta pulse
      const pulse = 0.4 + Math.sin(time / 700) * 0.2
      ctx.fillStyle = `rgba(255,0,170,${pulse})`
      ctx.fillRect(30, 40, 100, 1)
      ctx.fillRect(670, 40, 100, 1)

      // Hint abajo
      const near = objects.find(obj => {
        const dx = player.x - obj.x
        const dy = player.y - obj.y
        return Math.sqrt(dx*dx + dy*dy) < 70
      })
      if (near && !isOpen()) {
        ctx.fillStyle = "rgba(0,0,0,0.75)"; ctx.fillRect(180, 562, 440, 28)
        ctx.fillStyle = "#00ff88"; ctx.font = "14px monospace"; ctx.textAlign = "center"
        ctx.fillText(lang === "es" ? `[E] ver ${near.label}` : `[E] view ${near.label}`, 400, 581)
      }
    }

    const updateNPC = () => {
      npc.moveTimer++
      if (npc.moveTimer > 80) {
        npc.moveTimer = 0
        const chosen = NPC_DIRS[Math.floor(Math.random() * NPC_DIRS.length)]
        npc.dx = chosen.dx; npc.dy = chosen.dy; npc.dir = chosen.dir
      }
      npc.x += npc.dx; npc.y += npc.dy; npc.frame++
      if (npc.x < 30) { npc.x = 30; npc.dx = 2; npc.dir = "right" }
      if (npc.x > 450) { npc.x = 450; npc.dx = -2; npc.dir = "left" }
      if (npc.y < 100) { npc.y = 100; npc.dy = 2; npc.dir = "down" }
      if (npc.y > WORLD_H - 40) { npc.y = WORLD_H - 40; npc.dy = -2; npc.dir = "up" }
      objects[3].x = npc.x; objects[3].y = npc.y
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
        player.frame = 0; stepTimer = 0
      }

      updateNPC()

      if (player.x < 30) player.x = 30
      if (player.x > 770) player.x = 770
      if (player.y < 95) player.y = 95
      if (player.y > WORLD_H - 20) player.y = WORLD_H - 20

      // Dead zone camera
      const screenY = player.y - camera.y
      if (screenY < DEAD_ZONE.top) {
        camera.targetY = player.y - DEAD_ZONE.top
      } else if (screenY > DEAD_ZONE.bottom) {
        camera.targetY = player.y - DEAD_ZONE.bottom
      }

      camera.targetY = Math.max(0, Math.min(camera.targetY, WORLD_H - 600))
      camera.y += (camera.targetY - camera.y) * 0.06
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