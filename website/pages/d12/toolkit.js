const TAU = Zdog.TAU
const ROOT5 = Math.sqrt(5)
const PHI = ( 1 + ROOT5 ) / 2

const getPoints = function(radius, points, startX, startY) {
  const angleStep = (2 * Math.PI) / points;
  const result = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep - Math.PI / 2
    let x = startX + radius * Math.cos(angle)
    let y = startY + radius * Math.sin(angle)
    if (Math.abs(x) < 1e-10) x = 0
    if (Math.abs(y) < 1e-10) y = 0
    result.push({ x, y })
  }
  result.push({ ...result[0] })
  return result
}

const random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
