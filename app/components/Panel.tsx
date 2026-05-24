import React from "react"

type PanelProps = {
  section: string | null
  onClose: () => void
}

export default function Panel({ section, onClose }: PanelProps) {
  if (!section) return null

  const content: Record<string, React.ReactNode> = {
    "proyectos": (
      <div>
        <p style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 11, marginBottom: 16, opacity: 0.5 }}>
          $ ls ~/projects
        </p>
        <div style={{ border: "1px solid rgba(0,255,65,0.2)", padding: 16, borderRadius: 4, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <p style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 14, fontWeight: "bold" }}>
              Provisiones El Retiro
            </p>
            <span style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,255,65,0.3)", padding: "2px 8px", borderRadius: 3 }}>
              producción
            </span>
          </div>
          <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 12, marginBottom: 8, lineHeight: 1.6 }}>
            E-commerce full stack para minimarket local. Panel admin, inventario, WhatsApp.
          </p>
          <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 11, opacity: 0.6 }}>
            Python · Flask · SQLite · Railway
          </p>
        </div>
        <div style={{ border: "1px solid rgba(255,255,255,0.05)", padding: 16, borderRadius: 4, opacity: 0.4 }}>
          <p style={{ color: "#fff", fontFamily: "monospace", fontSize: 13 }}>Próximo proyecto</p>
          <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 11, marginTop: 4 }}>En construcción...</p>
        </div>
      </div>
    ),
    "sobre mi": (
      <div>
        <p style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 11, marginBottom: 16, opacity: 0.5 }}>
          $ cat javier.json
        </p>
        <div style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 2 }}>
          <p><span style={{ color: "#7a9e7a" }}>"nombre"</span><span style={{ color: "#fff" }}>: </span><span style={{ color: "#ce9178" }}>"Javier Cortés"</span></p>
          <p><span style={{ color: "#7a9e7a" }}>"rol"</span><span style={{ color: "#fff" }}>: </span><span style={{ color: "#ce9178" }}>"Full Stack Developer"</span></p>
          <p><span style={{ color: "#7a9e7a" }}>"ubicación"</span><span style={{ color: "#fff" }}>: </span><span style={{ color: "#ce9178" }}>"Chile 🇨🇱"</span></p>
          <p><span style={{ color: "#7a9e7a" }}>"experiencia"</span><span style={{ color: "#fff" }}>: </span><span style={{ color: "#00ff41" }}>"1.5 años"</span></p>
          <p><span style={{ color: "#7a9e7a" }}>"stack"</span><span style={{ color: "#fff" }}>: </span><span style={{ color: "#e8c46a" }}>["Python", "Flask", "JS", "React"]</span></p>
          <p><span style={{ color: "#7a9e7a" }}>"disponible"</span><span style={{ color: "#fff" }}>: </span><span style={{ color: "#00ff41" }}>true</span></p>
        </div>
      </div>
    ),
    "contacto": (
      <div>
        <p style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 11, marginBottom: 16, opacity: 0.5 }}>
          $ cat contacto.txt
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a href="mailto:javier.dev06@gmail.com" style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid rgba(0,255,65,0.2)", borderRadius: 4, textDecoration: "none" }}>
            <span style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 16 }}>✉</span>
            <div>
              <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 10, marginBottom: 2 }}>email</p>
              <p style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 13 }}>javier.dev06@gmail.com</p>
            </div>
          </a>
          <a href="https://github.com/javierdev06" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, textDecoration: "none" }}>
            <span style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 16 }}>◈</span>
            <div>
              <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 10, marginBottom: 2 }}>github</p>
              <p style={{ color: "#e8ffe8", fontFamily: "monospace", fontSize: 13 }}>github.com/javierdev06</p>
            </div>
          </a>
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
      background: "rgba(0,0,0,0.85)"
    }}>
      <div style={{
        background: "#0a0a0a",
        border: "1px solid rgba(0,255,65,0.3)",
        borderRadius: 6,
        width: 420,
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Barra titulo terminal */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: "#0d0d0d",
          borderBottom: "1px solid rgba(0,255,65,0.1)"
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ color: "rgba(0,255,65,0.3)", fontFamily: "monospace", fontSize: 11, marginLeft: 8 }}>
            ~/{section}
          </span>
          <span style={{ marginLeft: "auto", color: "#7a9e7a", fontFamily: "monospace", fontSize: 10 }}>
            presiona X para cerrar
          </span>
        </div>

        {/* Contenido */}
        <div style={{ padding: 24 }}>
          {content[section]}
        </div>
      </div>
    </div>
  )
}