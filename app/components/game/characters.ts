export const drawCharacter = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dir: string,
  frame: number,
  bodyColor: string,
  headColor: string,
  capColor: string
) => {
  const f = frame % 2

  ctx.fillStyle = "rgba(0,0,0,0.3)"
  ctx.beginPath()
  ctx.ellipse(x, y + 12, 10, 4, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = bodyColor
  if (dir === "down" || dir === "up") {
    ctx.fillRect(x - 6, y, 5, 10)
    ctx.fillRect(x + 1, y, 5, 10)
    if (f === 1) ctx.fillRect(x - 6, y + 8, 5, 4)
    else ctx.fillRect(x + 1, y + 8, 5, 4)
  } else {
    ctx.fillRect(x - 4, y, 8, 10)
    if (f === 1) ctx.fillRect(x - 6, y + 6, 5, 6)
    else ctx.fillRect(x + 1, y + 6, 5, 6)
  }

  ctx.fillStyle = bodyColor
  ctx.fillRect(x - 8, y - 10, 16, 12)
  if (f === 0) {
    ctx.fillRect(x - 12, y - 8, 4, 8)
    ctx.fillRect(x + 8, y - 10, 4, 8)
  } else {
    ctx.fillRect(x - 12, y - 10, 4, 8)
    ctx.fillRect(x + 8, y - 8, 4, 8)
  }

  ctx.fillStyle = headColor
  ctx.fillRect(x - 6, y - 20, 12, 12)
  ctx.fillStyle = capColor
  ctx.fillRect(x - 7, y - 22, 14, 4)
  ctx.fillRect(x - 5, y - 26, 10, 4)

  ctx.fillStyle = "#000"
  if (dir === "down") {
    ctx.fillRect(x - 4, y - 16, 2, 2)
    ctx.fillRect(x + 2, y - 16, 2, 2)
  } else if (dir === "up") {
    ctx.fillRect(x - 3, y - 18, 2, 2)
    ctx.fillRect(x + 1, y - 18, 2, 2)
  } else if (dir === "left") {
    ctx.fillRect(x - 5, y - 16, 2, 2)
  } else if (dir === "right") {
    ctx.fillRect(x + 3, y - 16, 2, 2)
  }
}