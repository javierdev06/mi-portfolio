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
      ctx.fillText(tx.title, 400, 220)

      ctx.fillStyle = "rgba(0,255,65,0.8)"
      ctx.font = "16px monospace"
      ctx.fillText(tx.sub, 400, 260)

      ctx.fillStyle = "rgba(0,255,65,0.3)"
      ctx.fillRect(100, 280, 600, 1)

      ctx.fillStyle = "rgba(0,255,65,0.7)"
      ctx.font = "12px monospace"
      ctx.fillText(tx.stack, 400, 310)
      ctx.fillText(tx.location, 400, 335)

      blinkTimer++
      if (blinkTimer > 30) { blink = !blink; blinkTimer = 0 }
      if (blink) {
        ctx.fillStyle = "#00ff41"
        ctx.font = "14px monospace"
        ctx.fillText(tx.enter, 400, 420)
      }

      ctx.fillStyle = "rgba(0,255,65,0.25)"
      ctx.font = "11px monospace"
      ctx.fillText(tx.controls, 400, 560)
    }

    let animId: number
    const loop = () => { draw(); animId = requestAnimationFrame(loop) }
    loop()

    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") onStart()
    }
    window.addEventListener("keydown", handleEnter)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("keydown", handleEnter)
    }
  }, [tx, onStart])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ display: "block" }}
    />
  )
}