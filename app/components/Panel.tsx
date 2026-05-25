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
        <div style={{ border: "1px solid rgba(0,255,136,0.2)", padding: 16, borderRadius: 6, marginBottom: 12, background: "rgba(0,255,136,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ color: "#fff", fontFamily: "monospace", fontSize: 14, fontWeight: "bold" }}>
              Provisiones El Retiro
            </p>
            <span style={{ color: "#00ff88", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,255,136,0.3)", padding: "2px 8px", borderRadius: 3 }}>
              {lang === "es" ? "producción" : "production"}
            </span>
          </div>
          <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 12, marginBottom: 10, lineHeight: 1.6 }}>
            {lang === "es"
              ? "E-commerce full stack para minimarket local. Panel admin, inventario, WhatsApp."
              : "Full stack e-commerce for local grocery store. Admin panel, inventory, WhatsApp."
            }
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Python", "Flask", "SQLite", "Railway"].map(t => (
              <span key={t} style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: 10, border: "1px solid rgba(0,229,255,0.2)", padding: "2px 6px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ border: "1px solid rgba(255,255,255,0.06)", padding: 16, borderRadius: 6, opacity: 0.4 }}>
          <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 13 }}>
            {lang === "es" ? "Próximo Proyecto" : "Next Project"}
          </p>
          <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginTop: 4 }}>
            {lang === "es" ? "En construcción..." : "In progress..."}
          </p>
        </div>
      </div>
    ),
    "sobre mí": (
      <div>
        <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 16 }}>
          $ cat javier.json
        </p>
        <div style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 2 }}>
          <p><span style={{ color: "#666" }}>"nombre"</span><span style={{ color: "#c8c8c8" }}>: </span><span style={{ color: "#00e5ff" }}>"Javier Cortes"</span></p>
          <p><span style={{ color: "#666" }}>"rol"</span><span style={{ color: "#c8c8c8" }}>: </span><span style={{ color: "#00e5ff" }}>"Full Stack Developer"</span></p>
          <p><span style={{ color: "#666" }}>"ubicación"</span><span style={{ color: "#c8c8c8" }}>: </span><span style={{ color: "#00e5ff" }}>"Chile"</span></p>
          <p><span style={{ color: "#666" }}>"experiencia"</span><span style={{ color: "#c8c8c8" }}>: </span><span style={{ color: "#00ff88" }}>"1.5 años"</span></p>
          <p><span style={{ color: "#666" }}>"stack"</span><span style={{ color: "#c8c8c8" }}>: </span><span style={{ color: "#ff00aa" }}>["Python", "Flask", "JS", "React"]</span></p>
          <p><span style={{ color: "#666" }}>"disponible"</span><span style={{ color: "#c8c8c8" }}>: </span><span style={{ color: "#00ff88" }}>true</span></p>
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
            <span style={{ color: "#00ff88", fontFamily: "monospace", fontSize: 18 }}>@</span>
            <div>
              <p style={{ color: "#666", fontFamily: "monospace", fontSize: 10, marginBottom: 3 }}>email</p>
              <p style={{ color: "#00ff88", fontFamily: "monospace", fontSize: 13 }}>javier.dev06@gmail.com</p>
            </div>
          </a>
          <a href="https://github.com/javierdev06" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, border: "1px solid rgba(0,229,255,0.15)", borderRadius: 6, textDecoration: "none", background: "rgba(0,229,255,0.03)" }}>
            <span style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: 18 }}>#</span>
            <div>
              <p style={{ color: "#666", fontFamily: "monospace", fontSize: 10, marginBottom: 3 }}>github</p>
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
          {lang === "es" ? "acceso denegado" : "access denied"}
        </p>
        <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 13, lineHeight: 1.8 }}>
          {lang === "es"
            ? "Primero explora la habitación:\n\n- Computador → proyectos\n- Estantería → sobre mí\n- Puerta → stack\n\nLuego el contacto se desbloqueará."
            : "First explore the room:\n\n- Computer → projects\n- Shelf → about me\n- Door → stack\n\nThen contact will unlock."
          }
        </p>
      </div>
    ),
    "npc": (
      <div>
        <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 16 }}>
          $ ./asistente --talk
        </p>
        <p style={{ color: "#ff00aa", fontFamily: "monospace", fontSize: 14, marginBottom: 12 }}>
          {allVisited
            ? (lang === "es" ? "Misión completada." : "Mission complete.")
            : (lang === "es" ? "Hola, soy el asistente de Javier." : "Hi, I'm Javier's assistant.")}
        </p>
        <p style={{ color: "#c8c8c8", fontFamily: "monospace", fontSize: 13, lineHeight: 1.8 }}>
          {allVisited
            ? (lang === "es"
                ? "Ya exploraste todo. Ahora puedes contactar a Javier."
                : "You've explored everything. You can now contact Javier.")
            : (lang === "es"
                ? "Explora la habitación:\n\n- Computador → proyectos\n- Estantería → sobre mí\n- Puerta → stack\n\nVisítalos para desbloquear el contacto."
                : "Explore the room:\n\n- Computer → projects\n- Shelf → about me\n- Door → stack\n\nVisit them all to unlock contact.")
          }
        </p>
      </div>
    ),
    "stack": (
      <div>
        <p style={{ color: "#666", fontFamily: "monospace", fontSize: 11, marginBottom: 16 }}>
          $ cat stack.txt
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "frontend", color: "#00e5ff", items: ["HTML / CSS", "JavaScript", "React *", "Next.js *", "Tailwind *"] },
            { label: "backend", color: "#00ff88", items: ["Python", "Flask", "REST APIs", "SQLite", "Supabase"] },
            { label: "deploy", color: "#ff00aa", items: ["Railway", "Vercel", "Git / GitHub", "Linux / CLI"] },
            { label: lang === "es" ? "aprendiendo" : "learning", color: "#ffaa00", items: ["TypeScript", "React", "Next.js", "Tailwind"] },
          ].map(({ label, color, items }) => (
            <div key={label}>
              <p style={{ color, fontFamily: "monospace", fontSize: 11, marginBottom: 8 }}>{label}</p>
              <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 2 }}>
                {items.map(item => (
                  <p key={item} style={{ color: item.includes("*") ? "#ffaa00" : "#c8c8c8" }}>
                    {item.replace(" *", "")}
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
        width: 440,
        position: "relative",
        overflow: "hidden",
        boxShadow: isLocked
          ? "0 0 30px rgba(255,0,170,0.1)"
          : "0 0 30px rgba(0,255,136,0.08)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: "#0d0d0d",
          borderBottom: `1px solid ${isLocked ? "rgba(255,0,170,0.15)" : "rgba(255,255,255,0.06)"}`,
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
        <div style={{ padding: 24 }}>
          {content[section]}
        </div>
      </div>
    </div>
  )
}