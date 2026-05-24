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
        <h2 style={{ color: "#00ff41", fontFamily: "monospace", marginBottom: 16 }}>// proyectos</h2>
        <div style={{ border: "1px solid rgba(0,255,65,0.2)", padding: 16, borderRadius: 4, marginBottom: 12 }}>
          <p style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 14 }}>Provisiones El Retiro</p>
          <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 12, marginTop: 4 }}>E-commerce · Python · Flask · Railway</p>
        </div>
      </div>
    ),
    "sobre mi": (
      <div>
        <h2 style={{ color: "#00ff41", fontFamily: "monospace", marginBottom: 16 }}>// sobre mi</h2>
        <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 14, lineHeight: 1.8 }}>
          Javier Cortés — Full Stack Developer de Chile.<br/><br/>
          1.5 años construyendo productos reales.<br/>
          Python · Flask · JavaScript · React
        </p>
      </div>
    ),
    "contacto": (
      <div>
        <h2 style={{ color: "#00ff41", fontFamily: "monospace", marginBottom: 16 }}>// contacto</h2>
        <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 14, marginBottom: 8 }}>javier.dev06@gmail.com</p>
        <p style={{ color: "#7a9e7a", fontFamily: "monospace", fontSize: 14 }}>github.com/javierdev06</p>
      </div>
    ),
  }

  return (
    <div style={{
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
        padding: 32,
        width: 400,
        position: "relative"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#7a9e7a",
            fontFamily: "monospace",
            fontSize: 12,
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          [X] cerrar
        </button>
        {content[section]}
      </div>
    </div>
  )
}