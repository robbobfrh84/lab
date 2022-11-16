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
  innerTextLonSlices.innerText = lon.value
  c.clear()
  const vd = w // Virtrual diameter in pixels
  const vr = vd / 2 // Virtrual radius in pixels
  const vc = Math.PI * (vr*2) // Virtrual circumference in pixels
  const lonSlice = vc / lon.value
  const lineGap = (vc/2) / lat.value

  padLine(0+(lonSlice/2),0,0+(lonSlice/2),(vc/2),'rgba(255,0,0,0.5)',1)
  padLine(0,(vc/4),w,(vc/4),'rgba(0,0,255,0.5)',1)

  // Plot full latatude lines to locate values to lines
  for (var i = 0; i < Number(lat.value) + 1; i++) {
    const y = lineGap * i
    padLine(0,y,w,y,'rgba(0,0,0,0.1)',1)
  }

  // Plot slide widths and points.
  for (var i = 0; i < lat.value / 2 + 1; i++) {
    const y = lineGap * i
    const latChunk = (90/(lat.value/2)) * i
    const lineR = 200 * Math.cos(toRadians(latChunk))
    const lineSlice = (Math.PI * (lineR*2)) / lon.value

    const sx = lonSlice / 2
    const sy = (vc/4) - y
    const ex = (lonSlice / 2)+(lineSlice / 2)
    const nex = (lonSlice / 2)-(lineSlice / 2)
    const ey = (vc/4) - y
    const ny = (vc/4) + y
    padLine(sx,sy,ex,ey,'purple',2)     // Top Right
    padLine(sx,sy,nex,ey,'purple',2)    // Top Left
    padLine(sx,ny,ex,ny,'purple',2)     // Bottom Right
    padLine(sx,ny,nex,ny,'purple',2)    // Bottom Right

    padCir(ex,ey,3,'red')
    padCir(nex,ey,3,'red')
    padCir(ex,ny,3,'red')
    padCir(nex,ny,3,'red')

    c.text(nex, w-100, y+10, 16, null, 'black')


  }

}

function padLine(sx,sy,ex,ey,color,stroke) {
  c.line( sx+p, sy+p, ex+p, ey+p, color, stroke)
}

function padCir(sx,sy,r,color) {
  c.cir( sx+p, sy+p, r, color )
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}
