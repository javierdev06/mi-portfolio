"use client"

import { useEffect, useRef } from "react"

export default function Home() {
  const gameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let game: any

    const initGame = async () => {
      const Phaser = (await import("phaser")).default

      const objects = [
        { x: 150, y: 150, color: 0x4444ff, label: "proyectos" },
        { x: 400, y: 150, color: 0xffaa00, label: "sobre mi" },
        { x: 650, y: 150, color: 0xff4444, label: "contacto" },
      ]

      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current!,
        backgroundColor: "#0a0a0a",
        scene: {
          cursors: null as any,
          player: null as any,
          nearObject: null as any,
          hint: null as any,

          create() {
            const scene = this as any

            // Grid
            const graphics = scene.add.graphics()
            graphics.lineStyle(1, 0x00ff41, 0.08)
            for (let x = 0; x < 800; x += 32) graphics.lineBetween(x, 0, x, 600)
            for (let y = 0; y < 600; y += 32) graphics.lineBetween(0, y, 800, y)

            // Objetos
            scene.objects = objects.map(obj => {
              const rect = scene.add.rectangle(obj.x, obj.y, 48, 48, obj.color)
              const text = scene.add.text(obj.x, obj.y + 36, obj.label, {
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "10px",
              }).setOrigin(0.5)
              return { rect, label: obj.label }
            })

            // Jugador
            scene.player = scene.add.rectangle(400, 300, 24, 24, 0x00ff41)

            // Hint [E]
            scene.hint = scene.add.text(400, 560, "", {
              color: "#00ff41",
              fontFamily: "monospace",
              fontSize: "14px",
            }).setOrigin(0.5)

            // Teclas
            scene.cursors = scene.input.keyboard.createCursorKeys()
            scene.eKey = scene.input.keyboard.addKey("E")
          },

          update() {
            const scene = this as any
            const speed = 3

            if (scene.cursors.left.isDown) scene.player.x -= speed
            else if (scene.cursors.right.isDown) scene.player.x += speed
            if (scene.cursors.up.isDown) scene.player.y -= speed
            else if (scene.cursors.down.isDown) scene.player.y += speed

            // Detectar si está cerca de un objeto
            scene.nearObject = null
            for (const obj of scene.objects) {
              const dist = Phaser.Math.Distance.Between(
                scene.player.x, scene.player.y,
                obj.rect.x, obj.rect.y
              )
              if (dist < 70) {
                scene.nearObject = obj
              }
            }

            if (scene.nearObject) {
              scene.hint.setText(`[E] ver ${scene.nearObject.label}`)
            } else {
              scene.hint.setText("")
            }

            // Interacción
            if (Phaser.Input.Keyboard.JustDown(scene.eKey) && scene.nearObject) {
              alert(`abriendo: ${scene.nearObject.label}`)
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