export const SCREEN_W = 800
export const SCREEN_H = 600

export const REQUIRED_VISITS = ["proyectos", "sobre mí", "stack"]

export const INITIAL_OBJECTS = [
  { x: 150, y: 150, label: "proyectos" },
  { x: 400, y: 150, label: "sobre mí" },
  { x: 650, y: 150, label: "contacto" },
  { x: 300, y: 400, label: "npc" },
  { x: 760, y: 330, label: "stack" },
]

export const NPC_DIRS = [
  { dx: 2, dy: 0, dir: "right" },
  { dx: -2, dy: 0, dir: "left" },
  { dx: 0, dy: 2, dir: "down" },
  { dx: 0, dy: -2, dir: "up" },
]