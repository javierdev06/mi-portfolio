type HUDProps = {
  visited: string[]
  lang: "es" | "en"
}

const t = {
  es: { mision: "MISIÓN", proyectos: "proyectos", sobreMi: "sobre mí", stack: "stack", controles: "FLECHAS · E INTERACTUAR · X CERRAR" },
  en: { mision: "MISSION", proyectos: "projects", sobreMi: "about me", stack: "stack", controles: "ARROWS · E INTERACT · X CLOSE" },
}

export default function HUD({ visited, lang }: HUDProps) {
  const tx = t[lang]
  const items = [
    { key: "proyectos", label: tx.proyectos },
    { key: "sobre mí", label: tx.sobreMi },
    { key: "stack", label: tx.stack },
  ]
  const done = items.filter(i => visited.includes(i.key)).length

  return (
    <>
      {/* Misión — arriba izquierda, DENTRO de la pared superior */}
      <div style={{
        position: "absolute",
        top: 6,
        left: 24,
        zIndex: 30,
        pointerEvents: "none",
        fontFamily: "monospace",
        fontSize: 10,
      }}>
        <p style={{ color: "#555", marginBottom: 3, fontSize: 9, letterSpacing: 1 }}>
          {tx.mision} {done}/3
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          {items.map(({ key, label }) => (
            <p key={key} style={{ color: visited.includes(key) ? "#00ff88" : "#333", fontSize: 10 }}>
              {visited.includes(key) ? "[x]" : "[ ]"} {label}
            </p>
          ))}
        </div>
      </div>

      {/* Controles — abajo centro */}
      <div style={{
        position: "absolute",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        pointerEvents: "none",
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 4,
        padding: "5px 16px",
        fontFamily: "monospace",
        fontSize: 10,
        color: "#444",
        whiteSpace: "nowrap",
        letterSpacing: 1,
      }}>
        {tx.controles}
      </div>
    </>
  )
}