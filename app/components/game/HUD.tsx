type HUDProps = {
  visited: string[]
  lang: "es" | "en"
}

const t = {
  es: {
    mision: "misión",
    proyectos: "proyectos",
    sobreMi: "sobre mí",
    stack: "stack",
    controles: "flechas · E interactuar · X cerrar",
  },
  en: {
    mision: "mission",
    proyectos: "projects",
    sobreMi: "about me",
    stack: "stack",
    controles: "arrows · E interact · X close",
  },
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
      {/* Mision — arriba derecha, debajo de los botones */}
      <div style={{
        position: "absolute",
        top: 8,
        left: 25,
        zIndex: 30,
        pointerEvents: "none",
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(0,255,65,0.2)",
        borderRadius: 4,
        padding: "6px 10px",
        fontFamily: "monospace",
        fontSize: 9,
      }}>
        <p style={{ color: "rgba(0,255,65,0.5)", marginBottom: 4 }}>
          // {tx.mision} {done}/3
        </p>
        {items.map(({ key, label }) => (
          <p key={key} style={{
            color: visited.includes(key) ? "#00ff41" : "#444",
            lineHeight: 1.6,
          }}>
            {visited.includes(key) ? "[x]" : "[ ]"} {label}
          </p>
        ))}
      </div>

      {/* Controles — abajo centro */}
      <div style={{
        position: "absolute",
        bottom: 8,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        pointerEvents: "none",
        background: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(0,255,65,0.08)",
        borderRadius: 4,
        padding: "4px 12px",
        fontFamily: "monospace",
        fontSize: 9,
        color: "rgba(0,255,65,0.3)",
        whiteSpace: "nowrap",
      }}>
        {tx.controles}
      </div>
    </>
  )
}