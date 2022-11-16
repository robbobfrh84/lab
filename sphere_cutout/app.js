const c = new canvas
const p = 10  // canvas padding
const w = 400 // canvas width
const h = 800 // canvas height

window.onload = () => {
  c.new('canvas', w+(p*2), h+(p*2))
  draw()
}

generate.onclick = draw

function draw() {
  c.clear()
  const vd = w // Virtrual diameter in pixels
  const vr = vd / 2 // Virtrual radius in pixels
  const vc = Math.PI * (vr*2) // Virtrual circumference in pixels
  const slice = vc / lon.value
  const lineGap = (vc/2) / lat.value
  console.log("vr :", vr)
  console.log("slice :", slice)
  console.log("lineGap :", lineGap)

  for (var i = 0; i < lat.value / 2; i++) {
    const y = lineGap * i
    padLine(0,y,slice,y,'rgba(0,0,0,0.1)',1)
  }

  console.log(" 🚨 your hight is radius! not 1/4 circumference")
  console.log(" 🚨 where the 1/4 circumference is devided does NOT match where the lines are drawn on flattened surface!")

  for (var i = 0; i < lat.value / 2; i++) {
    const y = lineGap * i
    const lineR = Math.sqrt( (vr * vr) - (y * y) )
    const lineSlice = (Math.PI * (lineR*2)) / lon.value
    console.log("lineSlice :", lineSlice)
    padLine(
      slice / 2,
      (vc/4) - y,
      (slice / 2)+(lineSlice / 2),
      (vc/4) - y,
      'purple',2
    )
    padCir(
      (slice / 2)+(lineSlice / 2),
      vr - y,
      3,'red'
    )
  }

  padLine(0+(slice/2),0,0+(slice/2),(vc/2),'rgba(255,0,0,0.5)',1)
  padLine(0,(vc/4),slice,(vc/4),'rgba(0,0,255,0.5)',1)

}

function padLine(sx,sy,ex,ey,color,stroke) {
  c.line( sx+p, sy+p, ex+p, ey+p, color, stroke)
}

function padCir(sx,sy,r,color) {
  c.cir( sx+p, sy+p, r, color )
}
