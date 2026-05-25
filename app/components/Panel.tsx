import React from "react"

type PanelProps = {
  section: string | null
  onClose: () => void
  allVisited: boolean
  lang: "es" | "en"
}

export default function Panel({ section, onClose, allVisited, lang }: PanelProps) {
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
              {lang === "es" ? "producción" : "production"}
            </span>
          </div>
          <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 12, marginBottom: 8, lineHeight: 1.6 }}>
            {lang === "es"
              ? "E-commerce full stack para minimarket local. Panel admin, inventario, WhatsApp."
              : "Full stack e-commerce for local grocery store. Admin panel, inventory, WhatsApp."
            }
          </p>
          <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 11, opacity: 0.6 }}>
            Python · Flask · SQLite · Railway
          </p>
        </div>
        <div style={{ border: "1px solid rgba(255,255,255,0.05)", padding: 16, borderRadius: 4, opacity: 0.4 }}>
          <p style={{ color: "#fff", fontFamily: "monospace", fontSize: 13 }}>
            {lang === "es" ? "Próximo Proyecto" : "Next Project"}
          </p>
          <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 11, marginTop: 4 }}>
            {lang === "es" ? "En construcción..." : "In progress..."}
          </p>
        </div>
      </div>
    ),
    "sobre mí": (
      <div>
        <p style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 11, marginBottom: 16, opacity: 0.5 }}>
          $ cat javier.json
        </p>
        <div style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 2 }}>
          <p><span style={{ color: "#7a9e7a" }}>"nombre"</span><span style={{ color: "#fff" }}>: </span><span style={{ color: "#ce9178" }}>"Javier Cortes"</span></p>
          <p><span style={{ color: "#7a9e7a" }}>"rol"</span><span style={{ color: "#fff" }}>: </span><span style={{ color: "#ce9178" }}>"Full Stack Developer"</span></p>
          <p><span style={{ color: "#7a9e7a" }}>"ubicación"</span><span style={{ color: "#fff" }}>: </span><span style={{ color: "#ce9178" }}>"Chile"</span></p>
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
            <span style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 16 }}>@</span>
            <div>
              <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 10, marginBottom: 2 }}>email</p>
              <p style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 13 }}>javier.dev06@gmail.com</p>
            </div>
          </a>
          <a href="https://github.com/javierdev06" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, textDecoration: "none" }}>
            <span style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 16 }}>#</span>
            <div>
              <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 10, marginBottom: 2 }}>github</p>
              <p style={{ color: "#e8ffe8", fontFamily: "monospace", fontSize: 13 }}>github.com/javierdev06</p>
            </div>
          </a>
        </div>
      </div>
    ),
    "bloqueado": (
      <div>
        <p style={{ color: "#ff4444", fontFamily: "monospace", fontSize: 11, marginBottom: 16, opacity: 0.7 }}>
          $ ./contacto --open
        </p>
        <p style={{ color: "#ff4444", fontFamily: "monospace", fontSize: 14, marginBottom: 12 }}>
          {lang === "es" ? "acceso denegado" : "access denied"}
        </p>
        <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 13, lineHeight: 1.8 }}>
          {lang === "es"
            ? "Primero explora la habitación:\n\n- Ve al computador\n- Lee la estantería\n- Revisa la puerta del stack\n\nLuego el contacto se desbloqueará."
            : "First explore the room:\n\n- Check the computer\n- Read the shelf\n- Open the stack door\n\nThen contact will unlock."
          }
        </p>
      </div>
    ),
    "npc": (
      <div>
        <p style={{ color: "#ffaa00", fontFamily: "monospace", fontSize: 11, marginBottom: 16, opacity: 0.7 }}>
          $ ./asistente --talk
        </p>
        <p style={{ color: "#ffaa00", fontFamily: "monospace", fontSize: 14, marginBottom: 12 }}>
          {allVisited
            ? (lang === "es" ? "Misión completada." : "Mission complete.")
            : (lang === "es" ? "Hola, soy el asistente de Javier." : "Hi, I'm Javier's assistant.")}
        </p>
        <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 13, lineHeight: 1.8 }}>
          {allVisited
            ? (lang === "es"
                ? "Ya exploraste todo. Ahora puedes contactar a Javier."
                : "You've explored everything. You can now contact Javier.")
            : (lang === "es"
                ? "Explora la habitación antes de contactar a Javier:\n\n- Computador: proyectos\n- Estantería: sobre mí\n- Puerta derecha: stack\n\nCuando los visites, el contacto se desbloqueará."
                : "Explore the room before contacting Javier:\n\n- Computer: projects\n- Shelf: about me\n- Right door: stack\n\nVisit them all to unlock contact.")
          }
        </p>
      </div>
    ),
    "stack": (
      <div>
        <p style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 11, marginBottom: 16, opacity: 0.5 }}>
          $ cat stack.txt
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <p style={{ color: "#4444ff", fontFamily: "monospace", fontSize: 11, marginBottom: 8, opacity: 0.8 }}>frontend</p>
            <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 2, color: "#7a9e7a" }}>
              <p>HTML / CSS</p>
              <p>JavaScript</p>
              <p style={{ color: "#e8c46a" }}>React</p>
              <p style={{ color: "#e8c46a" }}>Next.js</p>
              <p style={{ color: "#e8c46a" }}>Tailwind</p>
            </div>
          </div>
          <div>
            <p style={{ color: "#00aa44", fontFamily: "monospace", fontSize: 11, marginBottom: 8, opacity: 0.8 }}>backend</p>
            <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 2, color: "#7a9e7a" }}>
              <p>Python</p>
              <p>Flask</p>
              <p>REST APIs</p>
              <p>SQLite</p>
              <p>Supabase</p>
            </div>
          </div>
          <div>
            <p style={{ color: "#ff6600", fontFamily: "monospace", fontSize: 11, marginBottom: 8, opacity: 0.8 }}>deploy</p>
            <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 2, color: "#7a9e7a" }}>
              <p>Railway</p>
              <p>Vercel</p>
              <p>Git / GitHub</p>
              <p>Linux / CLI</p>
            </div>
          </div>
          <div>
            <p style={{ color: "#ff44ff", fontFamily: "monospace", fontSize: 11, marginBottom: 8, opacity: 0.8 }}>
              {lang === "es" ? "aprendiendo" : "learning"}
            </p>
            <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 2, color: "#e8c46a" }}>
              <p>TypeScript</p>
              <p>React</p>
              <p>Next.js</p>
              <p>Tailwind</p>
            </div>
          </div>
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
    }}>
      <div style={{
        background: "#0a0a0a",
        border: `1px solid ${section === "bloqueado" ? "rgba(255,65,65,0.4)" : "rgba(0,255,65,0.3)"}`,
        borderRadius: 6,
        width: 420,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: "#0d0d0d",
          borderBottom: `1px solid ${section === "bloqueado" ? "rgba(255,65,65,0.2)" : "rgba(0,255,65,0.1)"}`,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ color: "rgba(0,255,65,0.3)", fontFamily: "monospace", fontSize: 11, marginLeft: 8 }}>
            ~/{section}
          </span>
          <span style={{ marginLeft: "auto", color: "#7a9e7a", fontFamily: "monospace", fontSize: 10 }}>
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