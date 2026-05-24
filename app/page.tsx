"use client"

import { useEffect, useRef } from "react"

export default function Home() {
  const gameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let game: any

    const initGame = async () => {
      const Phaser = (await import("phaser")).default

      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current!,
        backgroundColor: "#0a0a0a",
        scene: {
          cursors: null as any,
          player: null as any,

          create() {
            const scene = this as any

            // Piso con grid
            const graphics = scene.add.graphics()
            graphics.lineStyle(1, 0x00ff41, 0.1)
            for (let x = 0; x < 800; x += 32) {
              graphics.lineBetween(x, 0, x, 600)
            }
            for (let y = 0; y < 600; y += 32) {
              graphics.lineBetween(0, y, 800, y)
            }

            // Jugador
            scene.player = scene.add.rectangle(400, 300, 24, 24, 0x00ff41)

            // Texto instrucciones
            scene.add.text(16, 16, "usa las flechas para moverte", {
              color: "#00ff41",
              fontFamily: "monospace",
              fontSize: "12px",
              alpha: 0.5,
            })

            // Teclas
            scene.cursors = scene.input.keyboard.createCursorKeys()
          },

          update() {
            const scene = this as any
            const speed = 3

            if (scene.cursors.left.isDown) {
              scene.player.x -= speed
            } else if (scene.cursors.right.isDown) {
              scene.player.x += speed
            }

            if (scene.cursors.up.isDown) {
              scene.player.y -= speed
            } else if (scene.cursors.down.isDown) {
              scene.player.y += speed
            }
          }
        }
      }

      game = new Phaser.Game(config)
    }

    initGame()
    return () => game?.destroy(true)
  }, [])

  return (
    <main className="flex items-center justify-center min-h-screen bg-black">
      <div ref={gameRef} />
    </main>
  )
}