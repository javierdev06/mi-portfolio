import React from "react"

type PanelProps = {
  section: string | null
  onClose: () => void
  allVisited: boolean
  lang: "es" | "en"
}

export default function Panel({ section, onClose, allVisited, lang }: PanelProps) {
  if (!section) return null

  const isLocked = section === "bloqueado"

  const content: Record<string, React.ReactNode> = {
    "proyectos": (
      <div>
        <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 16 }}>
          $ ls ~/projects
        </p>

        {/* Ghost Night */}
        <a href="https://ghost-night.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", border: "1px solid rgba(0,255,136,0.2)", padding: 16, borderRadius: 6, marginBottom: 12, background: "rgba(0,255,136,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ color: "#fff", fontFamily: "monospace", fontSize: 13, fontWeight: "bold" }}>
              Ghost Night
            </p>
            <span style={{ color: "#00ff88", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,255,136,0.3)", padding: "2px 8px", borderRadius: 3 }}>
              {lang === "es" ? "en línea" : "live"}
            </span>
          </div>
          <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 12, marginBottom: 10, lineHeight: 1.6 }}>
            {lang === "es"
              ? "Juego web de terror. Explorá la oscuridad y sobreviví la noche."
              : "Web horror game. Explore the dark and survive the night."
            }
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["JavaScript", "Three.js", "Vercel"].map(t => (
              <span key={t} style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,229,255,0.2)", padding: "2px 6px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
        </a>

        {/* Mudanzas */}
        <a href="https://mudanzas-three.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", border: "1px solid rgba(0,255,136,0.2)", padding: 16, borderRadius: 6, marginBottom: 12, background: "rgba(0,255,136,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ color: "#fff", fontFamily: "monospace", fontSize: 13, fontWeight: "bold" }}>
              Mudanzas
            </p>
            <span style={{ color: "#00ff88", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,255,136,0.3)", padding: "2px 8px", borderRadius: 3 }}>
              {lang === "es" ? "en línea" : "live"}
            </span>
          </div>
          <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 12, marginBottom: 10, lineHeight: 1.6 }}>
            {lang === "es"
              ? "Experiencia web en 3D construida con Three.js."
              : "3D web experience built with Three.js."
            }
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Three.js", "Vite", "Vercel"].map(t => (
              <span key={t} style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,229,255,0.2)", padding: "2px 6px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
        </a>

        {/* Forgotten Depths — en construcción */}
        <div style={{ border: "1px solid rgba(255,170,0,0.2)", padding: 16, borderRadius: 6, background: "rgba(255,170,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ color: "#fff", fontFamily: "monospace", fontSize: 13, fontWeight: "bold" }}>
              Forgotten Depths
            </p>
            <span style={{ color: "#ffaa00", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(255,170,0,0.3)", padding: "2px 8px", borderRadius: 3 }}>
              {lang === "es" ? "en construcción" : "in progress"}
            </span>
          </div>
          <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 12, marginBottom: 10, lineHeight: 1.6 }}>
            {lang === "es"
              ? "Juego de terror 3D en el navegador: exploración de cuevas con modelos y texturas PBR."
              : "3D browser horror game: cave exploration with PBR models and textures."
            }
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Three.js", "Vite", "Vanilla JS"].map(t => (
              <span key={t} style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,229,255,0.2)", padding: "2px 6px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* FGAL Construcciones */}
        <a href="https://fgalconstrucciones.com" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", border: "1px solid rgba(0,255,136,0.2)", padding: 16, borderRadius: 6, marginTop: 12, background: "rgba(0,255,136,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ color: "#fff", fontFamily: "monospace", fontSize: 13, fontWeight: "bold" }}>
              FGAL Construcciones
            </p>
            <span style={{ color: "#00ff88", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,255,136,0.3)", padding: "2px 8px", borderRadius: 3 }}>
              {lang === "es" ? "en línea" : "live"}
            </span>
          </div>
          <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 12, marginBottom: 10, lineHeight: 1.6 }}>
            {lang === "es"
              ? "Sitio web corporativo para empresa constructora chilena."
              : "Corporate website for a Chilean construction company."
            }
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["HTML", "CSS", "JavaScript"].map(t => (
              <span key={t} style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,229,255,0.2)", padding: "2px 6px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
        </a>
      </div>
    ),
    "sobre mí": (
      <div>
        <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 16 }}>
          $ cat javier.json
        </p>
        <div style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 2 }}>
          <p><span style={{ color: "#555" }}>"nombre"</span><span style={{ color: "#888" }}>: </span><span style={{ color: "#00e5ff" }}>"Javier Cortes"</span></p>
          <p><span style={{ color: "#555" }}>"rol"</span><span style={{ color: "#888" }}>: </span><span style={{ color: "#00e5ff" }}>"Full Stack Developer"</span></p>
          <p><span style={{ color: "#555" }}>"ubicación"</span><span style={{ color: "#888" }}>: </span><span style={{ color: "#00e5ff" }}>"Chile"</span></p>
          <p><span style={{ color: "#555" }}>"experiencia"</span><span style={{ color: "#888" }}>: </span><span style={{ color: "#00ff88" }}>"1.5 años"</span></p>
          <p><span style={{ color: "#555" }}>"stack"</span><span style={{ color: "#888" }}>: </span><span style={{ color: "#ff00aa" }}>["Python", "Flask", "JS", "React"]</span></p>
          <p><span style={{ color: "#555" }}>"disponible"</span><span style={{ color: "#888" }}>: </span><span style={{ color: "#00ff88" }}>true</span></p>
        </div>
      </div>
    ),
    "contacto": (
      <div>
        <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 16 }}>
          $ cat contacto.txt
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="mailto:javier.dev06@gmail.com" style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, border: "1px solid rgba(0,255,136,0.2)", borderRadius: 6, textDecoration: "none", background: "rgba(0,255,136,0.04)" }}>
            <span style={{ color: "#00ff88", fontFamily: "monospace", fontSize: 20 }}>@</span>
            <div>
              <p style={{ color: "#555", fontFamily: "monospace", fontSize: 10, marginBottom: 3 }}>email</p>
              <p style={{ color: "#00ff88", fontFamily: "monospace", fontSize: 13 }}>javier.dev06@gmail.com</p>
            </div>
          </a>
          <a href="https://github.com/javierdev06" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, border: "1px solid rgba(0,229,255,0.15)", borderRadius: 6, textDecoration: "none", background: "rgba(0,229,255,0.03)" }}>
            <span style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: 20 }}>#</span>
            <div>
              <p style={{ color: "#555", fontFamily: "monospace", fontSize: 10, marginBottom: 3 }}>github</p>
              <p style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: 13 }}>github.com/javierdev06</p>
            </div>
          </a>
        </div>
      </div>
    ),
    "bloqueado": (
      <div>
        <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 16 }}>
          $ ./contacto --open
        </p>
        <p style={{ color: "#ff00aa", fontFamily: "monospace", fontSize: 14, marginBottom: 12 }}>
          {lang === "es" ? "ACCESO DENEGADO" : "ACCESS DENIED"}
        </p>
        <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 12, lineHeight: 1.9 }}>
          {lang === "es"
            ? "Primero explora la habitación:\n\n→ Computador → proyectos\n→ Estantería → sobre mí\n→ Puerta → stack\n\nLuego el contacto se desbloqueará."
            : "First explore the room:\n\n→ Computer → projects\n→ Shelf → about me\n→ Door → stack\n\nThen contact will unlock."
          }
        </p>
      </div>
    ),
    "npc": (
      <div>
        <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 16 }}>
          $ ./asistente --talk
        </p>
        <p style={{ color: "#ff00aa", fontFamily: "monospace", fontSize: 13, marginBottom: 12 }}>
          {allVisited
            ? (lang === "es" ? "MISIÓN COMPLETADA." : "MISSION COMPLETE.")
            : (lang === "es" ? "Hola, soy el asistente de Javier." : "Hi, I'm Javier's assistant.")}
        </p>
        <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 12, lineHeight: 1.9 }}>
          {allVisited
            ? (lang === "es"
                ? "Ya exploraste todo.\nAhora puedes contactar a Javier."
                : "You've explored everything.\nYou can now contact Javier.")
            : (lang === "es"
                ? "Explora la habitación:\n\n→ Computador → proyectos\n→ Estantería → sobre mí\n→ Puerta → stack\n\nVísitalos para desbloquear el contacto."
                : "Explore the room:\n\n→ Computer → projects\n→ Shelf → about me\n→ Door → stack\n\nVisit them all to unlock contact.")
          }
        </p>
      </div>
    ),
    "stack": (
      <div>
        <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 16 }}>
          $ cat stack.txt
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { label: "frontend", color: "#00e5ff", items: ["HTML / CSS", "JavaScript", "React*", "Next.js*", "Tailwind*"] },
            { label: "backend", color: "#00ff88", items: ["Python", "Flask", "REST APIs", "SQLite", "Supabase"] },
            { label: "deploy", color: "#ff00aa", items: ["Railway", "Vercel", "Git / GitHub", "Linux / CLI"] },
            { label: lang === "es" ? "aprendiendo" : "learning", color: "#ffaa00", items: ["TypeScript", "React", "Next.js", "Tailwind"] },
          ].map(({ label, color, items }) => (
            <div key={label}>
              <p style={{ color, fontFamily: "monospace", fontSize: 11, marginBottom: 10, letterSpacing: 1 }}>{label}</p>
              <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1.9 }}>
                {items.map(item => (
                  <p key={item} style={{ color: item.includes("*") ? "#ffaa00" : "#c8c8c8" }}>
                    {item.replace("*", "")}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }

  return (
    <div data-panel="true" style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.92)",
      backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "#111",
        border: `1px solid ${isLocked ? "rgba(255,0,170,0.4)" : "rgba(0,255,136,0.25)"}`,
        borderRadius: 8,
        width: 420,
        maxHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: isLocked
          ? "0 0 30px rgba(255,0,170,0.1)"
          : "0 0 30px rgba(0,255,136,0.08)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: "#0d0d0d",
          borderBottom: `1px solid ${isLocked ? "rgba(255,0,170,0.15)" : "rgba(255,255,255,0.06)"}`,
          borderRadius: "8px 8px 0 0",
          flexShrink: 0,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ color: "#444", fontFamily: "monospace", fontSize: 11, marginLeft: 8 }}>
            ~/{section}
          </span>
          <span style={{ marginLeft: "auto", color: "#444", fontFamily: "monospace", fontSize: 10 }}>
            {lang === "es" ? "Presiona X para cerrar" : "Press X to close"}
          </span>
        </div>

        {/* Contenido scrolleable */}
        <div style={{ padding: 24, overflowY: "auto" }}>
          {content[section]}
        </div>
      </div>
    </div>
  )
}