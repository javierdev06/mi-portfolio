"use client"

import { useEffect, useRef } from "react"

type IntroProps = {
  lang: "es" | "en"
  onStart: () => void
}

const t = {
  es: {
    title: "JAVIER CORTES",
    sub: "full stack developer · portfolio",
    stack: "Python · Flask · JavaScript · React · Next.js",
    location: "Chile · disponible para proyectos",
    enter: "[ PRESIONA ENTER PARA COMENZAR ]",
    controls: "flechas mover   E interactuar   X cerrar",
  },
  en: {
    title: "JAVIER CORTES",
    sub: "full stack developer · portfolio",
    stack: "Python · Flask · JavaScript · React · Next.js",
    location: "Chile · available for projects",
    enter: "[ PRESS ENTER TO START ]",
    controls: "arrows move   E interact   X close",
  },
}

export default function Intro({ lang, onStart }: IntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tx = t[lang]

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let blink = true
    let blinkTimer = 0

    const draw = () => {
      const time = Date.now()

      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, 800, 600)

      // Grid
      for (let x = 0; x < 800; x += 40) {
        for (let y = 0; y < 600; y += 40) {
          ctx.strokeStyle = "rgba(255,255,255,0.02)"
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, 40, 40)
        }
      }

      // Glow central — cyan
      const glow = ctx.createRadialGradient(400, 280, 0, 400, 280, 320)
      glow.addColorStop(0, "rgba(0,229,255,0.05)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, 800, 600)

      // Titulo — blanco
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 52px monospace"
      ctx.textAlign = "center"
      ctx.fillText(tx.title, 400, 220)

      // Subrayado — magenta
      ctx.fillStyle = "rgba(255,0,170,0.6)"
      ctx.fillRect(160, 232, 480, 1)

      // Subtitulo — gris
      ctx.fillStyle = "#666"
      ctx.font = "15px monospace"
      ctx.fillText(tx.sub, 400, 262)

      // Stack — cyan
      ctx.fillStyle = "#00e5ff"
      ctx.font = "12px monospace"
      ctx.fillText(tx.stack, 400, 310)

      // Location — gris claro
      ctx.fillStyle = "#c8c8c8"
      ctx.font = "11px monospace"
      ctx.fillText(tx.location, 400, 334)

      // Enter — parpadeo verde
      blinkTimer++
      if (blinkTimer > 30) { blink = !blink; blinkTimer = 0 }
      if (blink) {
        ctx.fillStyle = "#00ff88"
        ctx.font = "13px monospace"
        ctx.fillText(tx.enter, 400, 420)
      }

      // Lineas decorativas — magenta
      const pulse = 0.3 + Math.sin(time / 800) * 0.15
      ctx.fillStyle = `rgba(255,0,170,${pulse})`
      ctx.fillRect(60, 220, 80, 1)
      ctx.fillRect(660, 220, 80, 1)

      // Controles — muy sutil
      ctx.fillStyle = "#333"
      ctx.font = "10px monospace"
      ctx.fillText(tx.controls, 400, 560)
    }

    let animId: number
    const loop = () => { draw(); animId = requestAnimationFrame(loop) }
    loop()

    const handleEnter = (e: KeyboardEvent) => { if (e.key === "Enter") onStart() }
    window.addEventListener("keydown", handleEnter)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("keydown", handleEnter)
    }
  }, [tx, onStart])

  return <canvas ref={canvasRef} width={800} height={600} style={{ display: "block" }} />
}