"use client"

import { useRef, useState } from "react"
import { IconVolume, IconVolumeOff } from "@tabler/icons-react"
import Intro from "./components/game/Intro"
import Game from "./components/game/Game"
import Matrix from "./components/game/Matrix"
import HUD from "./components/game/HUD"
import Panel from "./components/Panel"
import { initAudio, startMusic, toggleMusic } from "./components/game/audio"

export default function Home() {
  const [started, setStarted] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [visited, setVisited] = useState<string[]>([])
  const [muted, setMuted] = useState(false)
  const [lang, setLang] = useState<"es" | "en">("es")
  const visitedRef = useRef<string[]>([])

  const required = ["proyectos", "sobre mí", "stack"]
  const allVisited = required.every(r => visited.includes(r))

  const handleStart = () => {
    const ctx = initAudio()
    startMusic(ctx)
    setStarted(true)
  }

  const handleVisit = (label: string) => {
    if (!visitedRef.current.includes(label)) {
      visitedRef.current = [...visitedRef.current, label]
      setVisited([...visitedRef.current])
    }
  }

  const handleMute = () => {
    toggleMusic(!muted)
    setMuted(m => !m)
  }

  return (
    <main style={{
      display: "flex",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      background: "#0a0a0a",
      alignItems: "center",
    }}>
      <div style={{
        position: "relative",
        width: 800,
        height: 600,
        flexShrink: 0,
      }}>
        {!started
          ? <Intro lang={lang} onStart={handleStart} />
          : <>
            <Game
              visitedRef={visitedRef}
              onOpen={setActiveSection}
              onClose={() => setActiveSection(null)}
              onVisit={handleVisit}
              lang={lang}
            />
            <HUD visited={visited} lang={lang} />
          </>
        }

        {activeSection && (
          <Panel
            section={activeSection}
            onClose={() => setActiveSection(null)}
            allVisited={allVisited}
            lang={lang}
          />
        )}

        {/* Idioma — izquierda */}
        <div style={{
          position: "absolute",
          top: 55,
          left: 8,
          zIndex: 40,
        }}>
          <button
            onClick={() => setLang(l => l === "es" ? "en" : "es")}
            style={{
              background: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#c8c8c8",
              fontFamily: "monospace",
              fontSize: 10,
              padding: "4px 10px",
              borderRadius: 4,
              cursor: "pointer",
              height: 26,
            }}
          >
            {lang === "es" ? "ESP | ENG" : "ENG | ESP"}
          </button>
        </div>

        {/* Volumen — derecha, un poco más abajo */}
        {started && (
          <div style={{
            position: "absolute",
            top: 55,
            right: 8,
            zIndex: 40,
          }}>
            <button
              onClick={handleMute}
              title={muted ? "Activar música" : "Silenciar música"}
              style={{
                background: "rgba(0,0,0,0.8)",
                border: `1px solid ${muted ? "rgba(255,0,170,0.3)" : "rgba(255,255,255,0.1)"}`,
                color: muted ? "#ff00aa" : "#c8c8c8",
                width: 26,
                height: 26,
                borderRadius: 4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              {muted ? <IconVolumeOff size={14} /> : <IconVolume size={14} />}
            </button>
          </div>
        )}
      </div>

      {/* Matrix lateral */}
      {started && (
        <div style={{
          flex: 1,
          height: "100vh",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}>
          <Matrix />
        </div>
      )}
    </main>
  )
}