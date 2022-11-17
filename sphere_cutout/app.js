const c = new canvas
const p = 10  // canvas padding
const w = 800 // canvas width
const h = 800 // canvas height

window.onload = () => {
  c.new('canvas', w+(p*2), h+(p*2))
  draw()
}

document.body.onkeyup = draw

function draw() {
  c.clear()
  const vd = (h*2)/Math.PI // Virtrual diameter in pixels
  const r = Number(radius.value)
  const vr = vd / 2 // Virtrual radius in pixels
  const vc = Math.PI * (vr*2) // Virtrual circumference in pixels
  const lonSlice = vc / Number(lon.value)
  const lineGap = (vc/2) / Number(lat.value)

  setValues(r,vc,vr,lonSlice)

  padLine(0+(lonSlice/2),0,0+(lonSlice/2),(vc/2),'rgba(255,0,0,0.5)',1)
  padLine(0,(vc/4),w,(vc/4),'rgba(0,0,255,0.5)',1)

  // Plot full latatude lines to locate values to lines
  for (var i = 0; i < Number(lat.value) + 1; i++) {
    const y = lineGap * i
    padLine(0,y,w,y,'rgba(0,0,0,0.1)',1)
  }

  // Plot slide widths and points.
  for (var i = 0; i < Number(lat.value) / 2 + 1; i++) {
    const y = lineGap * i
    const latChunk = (90/(Number(lat.value)/2)) * i
    const lineR = vr * Math.cos(toRadians(latChunk))
    const lineSlice = (Math.PI * (lineR*2)) / Number(lon.value)

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

    const converted_lineSlice = (r*lineSlice)/vr
    const converted_y = (r*y)/vr
    const round_ylable = Math.round((converted_lineSlice/2) * 10000) / 10000
    const round_xlable = Math.round((converted_y) * 10000) / 10000
    c.text(round_xlable+",   "+round_ylable, lonSlice+(p*2)+15, ey+15, 16, null, 'black')
  }

}

function setValues(r,vc,vr,lonSlice) {
  v_LonSlices.innerText = Number(lon.value)
  const cir_1_4 = Math.round(( (r*((vc / 4)))/vr) * 10000) / 10000
  v_cir_1_4.innerText = cir_1_4
  v_lonSlice.innerText = Math.round(((r*lonSlice)/vr) * 10000) / 10000
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
