class Line {

  constructor(params) {
    Object.assign(this, params)
    this.t = this.t || 1
    this.color = this.color || "black"
  }

  project2D(p) {
    const scaleProjected = PERSPECTIVE / (PERSPECTIVE + p[2])
    return [
      (p[0] * scaleProjected) + PROJECTION_CENTER_X,
      (p[1] * scaleProjected) + PROJECTION_CENTER_Y
    ]
  }

  draw() {
    const [ p1x, p1y ] = this.project2D( this.p1 )
    const [ p2x, p2y ] = this.project2D( this.p2 )
    ctx.beginPath()
    ctx.moveTo(p1x, p1y)
    ctx.lineTo(p2x, p2y)
    ctx.lineWidth = this.t
    ctx.strokeStyle = this.color
    ctx.stroke();
  }

}
