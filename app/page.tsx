"use client"

import { useRef, useState } from "react"
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
      alignItems: "flex-start",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#000",
      overflowY: "auto",
    }}>
    
      {/* Canvas principal */}
      <div style={{ position: "relative", flexShrink: 0, width: 800, height: 600, marginTop: "auto", marginBottom: "auto" }}>
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

        {/* Controles superiores */}
        <div style={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          zIndex: 40,
        }}>
          {/* Boton musica */}
          {started && (
            <button
              onClick={handleMute}
              title={muted ? "Activar música" : "Silenciar música"}
              style={{
                background: "rgba(0,0,0,0.7)",
                border: `1px solid ${muted ? "rgba(255,65,65,0.4)" : "rgba(0,255,65,0.3)"}`,
                color: muted ? "#ff4141" : "#00ff41",
                fontFamily: "monospace",
                fontSize: 16,
                width: 36,
                height: 36,
                borderRadius: 4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {muted ? "🔇" : "🔊"}
            </button>
          )}

          {/* Selector idioma */}
          <button
            onClick={() => setLang(l => l === "es" ? "en" : "es")}
            style={{
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(0,255,65,0.3)",
              color: "#00ff41",
              fontFamily: "monospace",
              fontSize: 10,
              padding: "4px 8px",
              borderRadius: 4,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {lang === "es" ? "ESP | ENG" : "ENG | ESP"}
          </button>
        </div>
      </div>

      {/* Panel Matrix lateral */}
      {started && (
        <div style={{
          width: "calc(100vw - 800px)",
          height: "100vh",
          borderLeft: "1px solid rgba(0,255,65,0.1)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <Matrix />
        </div>
      )}
    </main>
  )
}